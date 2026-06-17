"use client";

import { useEffect, useMemo, useState } from "react";

import HeaderBox from "@/components/HeaderBox";
import TransactionsTable from "@/components/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBanking } from "@/components/banking-provider";
import { formatAmount, formatDateTime } from "@/lib/utils";

type AccountDraft = {
  name: string;
  officialName: string;
  mask: string;
  institution: string;
  subtype: string;
  status: Account["status"];
  currentBalance: string;
  availableBalance: string;
  interestRate: string;
};

type TransactionDraft = {
  name: string;
  merchant: string;
  amount: string;
  date: string;
  category: string;
  paymentChannel: string;
  type: Transaction["type"];
  statusLabel: "Posted" | "Pending";
  balanceAfter: string;
  note: string;
  accountId: string;
};

type NewTransactionDraft = {
  accountId: string;
  name: string;
  merchant: string;
  amount: string;
  category: string;
  paymentChannel: string;
  type: Transaction["type"];
  date: string;
  note: string;
};

const AdminDashboardPage = () => {
  const { state, actions } = useBanking();
  const [selectedAccountId, setSelectedAccountId] = useState(
    state.accounts[0]?.appwriteItemId || "",
  );
  const [selectedTransactionId, setSelectedTransactionId] = useState(
    state.transactions[0]?.id || "",
  );
  const [accountDraft, setAccountDraft] = useState<AccountDraft>({
    name: "",
    officialName: "",
    mask: "",
    institution: "",
    subtype: "",
    status: "active",
    currentBalance: "",
    availableBalance: "",
    interestRate: "",
  });
  const [userDraft, setUserDraft] = useState({
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    address1: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [transactionDraft, setTransactionDraft] = useState<TransactionDraft>({
    name: "",
    merchant: "",
    amount: "",
    date: "",
    category: "",
    paymentChannel: "bank",
    type: "debit" as Transaction["type"],
    statusLabel: "Posted" as "Posted" | "Pending",
    balanceAfter: "",
    note: "",
    accountId: "",
  });
  const [newTransaction, setNewTransaction] = useState<NewTransactionDraft>({
    accountId: state.accounts[0]?.appwriteItemId || "",
    name: "Admin Adjustment",
    merchant: "Admin Console",
    amount: "0",
    category: "Transfer",
    paymentChannel: "bank",
    type: "debit" as Transaction["type"],
    date: new Date().toISOString().slice(0, 16),
    note: "Created from admin dashboard",
  });
  const [statusMessage, setStatusMessage] = useState("");

  const selectedAccount = useMemo(
    () =>
      state.accounts.find((account) => account.appwriteItemId === selectedAccountId) ||
      state.accounts[0],
    [selectedAccountId, state.accounts],
  );

  const selectedTransaction = useMemo(
    () => state.transactions.find((tx) => tx.id === selectedTransactionId),
    [selectedTransactionId, state.transactions],
  );

  useEffect(() => {
    const account = selectedAccount;
    if (!account) return;

    setAccountDraft({
      name: account.name,
      officialName: account.officialName,
      mask: account.mask,
      institution: account.institution || "",
      subtype: account.subtype,
      status: account.status || "active",
      currentBalance: String(account.currentBalance),
      availableBalance: String(account.availableBalance),
      interestRate: String(account.interestRate ?? 0),
    });
  }, [selectedAccount]);

  useEffect(() => {
    const transaction = selectedTransaction;
    if (!transaction) {
      setTransactionDraft({
        name: "",
        merchant: "",
        amount: "",
        date: "",
        category: "",
        paymentChannel: "bank",
        type: "debit",
        statusLabel: "Posted",
        balanceAfter: "",
        note: "",
        accountId: "",
      });
      return;
    }

    setTransactionDraft({
      name: transaction.name,
      merchant: transaction.merchant || "",
      amount: String(transaction.amount),
      date: transaction.date.slice(0, 16),
      category: transaction.category,
      paymentChannel: transaction.paymentChannel,
      type: transaction.type as Transaction["type"],
      statusLabel: transaction.statusLabel || "Posted",
      balanceAfter: transaction.balanceAfter !== undefined ? String(transaction.balanceAfter) : "",
      note: transaction.note || "",
      accountId: transaction.accountId,
    });
  }, [selectedTransaction]);

  useEffect(() => {
    setNewTransaction((current) => ({
      ...current,
      accountId: state.accounts[0]?.appwriteItemId || current.accountId,
    }));
  }, [state.accounts]);

  useEffect(() => {
    if (
      selectedTransactionId &&
      !state.transactions.some((transaction) => transaction.id === selectedTransactionId)
    ) {
      setSelectedTransactionId(state.transactions[0]?.id || "");
    }
  }, [selectedTransactionId, state.transactions]);

  const syncProfileFromState = () => {
    setUserDraft({
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      name: state.user.name,
      email: state.user.email,
      address1: state.user.address1,
      city: state.user.city,
      state: state.user.state,
      postalCode: state.user.postalCode,
    });
  };

  useEffect(() => {
    syncProfileFromState();
  }, [state.user]);

  const saveUser = () => {
    actions.updateUser(userDraft);
    setStatusMessage("Profile updated in real time.");
  };

  const saveAccount = () => {
    actions.updateAccount(selectedAccountId, {
      ...accountDraft,
      currentBalance: Number(accountDraft.currentBalance),
      availableBalance: Number(accountDraft.availableBalance),
      interestRate: Number(accountDraft.interestRate),
      status: accountDraft.status,
    });
    setStatusMessage(`Updated ${selectedAccount?.name || "account"} in real time.`);
  };

  const saveTransaction = () => {
    if (!selectedTransaction) return;

    actions.updateTransaction(selectedTransaction.id, {
      ...transactionDraft,
      amount: Number(transactionDraft.amount),
      balanceAfter:
        transactionDraft.balanceAfter.trim().length > 0
          ? Number(transactionDraft.balanceAfter)
          : undefined,
      type: transactionDraft.type,
      statusLabel: transactionDraft.statusLabel,
    });
    setStatusMessage("Transaction updated instantly across the app.");
  };

  const addTransaction = () => {
    const account = state.accounts.find(
      (item) => item.appwriteItemId === newTransaction.accountId,
    );

    if (!account) return;

    const now = new Date(newTransaction.date || new Date().toISOString());
    actions.addTransaction({
      name: newTransaction.name,
      merchant: newTransaction.merchant,
      amount: Number(newTransaction.amount),
      category: newTransaction.category,
      date: now.toISOString(),
      paymentChannel: newTransaction.paymentChannel,
      type: newTransaction.type,
      accountId: account.appwriteItemId,
      accountName: account.name,
      pending: false,
      image: "",
      method: newTransaction.paymentChannel === "bill" ? "bill" : "bank",
      note: newTransaction.note,
      statusLabel: "Posted",
      balanceAfter: undefined,
    });
    setStatusMessage("New transaction added to the mock ledger.");
  };

  const liveTransactions = state.transactions
    .filter((transaction) => transaction.accountId === selectedAccount?.appwriteItemId)
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          title="Admin dashboard"
          subtext="Edit mock banking data, and the consumer dashboard updates immediately because everything reads from the same local state."
        />

        {statusMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-25 p-4 text-14 text-emerald-900">
            {statusMessage}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">User</p>
            <p className="mt-2 text-18 font-semibold text-gray-900">
              {state.user.name}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Accounts</p>
            <p className="mt-2 text-18 font-semibold text-gray-900">{state.accounts.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Transactions</p>
            <p className="mt-2 text-18 font-semibold text-gray-900">
              {state.transactions.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Live balance</p>
            <p className="mt-2 text-18 font-semibold text-gray-900">
              {formatAmount(selectedAccount?.currentBalance || 0)}
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-20 font-semibold text-gray-900">Profile editor</h2>
                  <p className="text-14 text-gray-600">
                    Changes here update the authenticated user profile immediately.
                  </p>
                </div>
                <Button variant="secondary" onClick={syncProfileFromState}>
                  Reload
                </Button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  value={userDraft.firstName}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, firstName: event.target.value }))
                  }
                  className="input-class"
                  placeholder="First name"
                />
                <Input
                  value={userDraft.lastName}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, lastName: event.target.value }))
                  }
                  className="input-class"
                  placeholder="Last name"
                />
                <Input
                  value={userDraft.name}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Display name"
                />
                <Input
                  value={userDraft.email}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, email: event.target.value }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Email"
                />
                <Input
                  value={userDraft.address1}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, address1: event.target.value }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Address"
                />
                <Input
                  value={userDraft.city}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, city: event.target.value }))
                  }
                  className="input-class"
                  placeholder="City"
                />
                <Input
                  value={userDraft.state}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, state: event.target.value }))
                  }
                  className="input-class"
                  placeholder="State"
                />
                <Input
                  value={userDraft.postalCode}
                  onChange={(event) =>
                    setUserDraft((current) => ({ ...current, postalCode: event.target.value }))
                  }
                  className="input-class"
                  placeholder="Postal code"
                />
              </div>

              <Button className="mt-4" onClick={saveUser}>
                Save profile
              </Button>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-20 font-semibold text-gray-900">Account editor</h2>
                  <p className="text-14 text-gray-600">
                    Choose an account and change the details the dashboard renders.
                  </p>
                </div>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                  <SelectTrigger className="w-56 input-class">
                    {selectedAccount?.name || "Select account"}
                  </SelectTrigger>
                  <SelectContent>
                    {state.accounts.map((account) => (
                      <SelectItem key={account.appwriteItemId} value={account.appwriteItemId}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  value={accountDraft.name}
                  onChange={(event) =>
                    setAccountDraft((current) => ({ ...current, name: event.target.value }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Account name"
                />
                <Input
                  value={accountDraft.officialName}
                  onChange={(event) =>
                    setAccountDraft((current) => ({
                      ...current,
                      officialName: event.target.value,
                    }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Official name"
                />
                <Input
                  value={accountDraft.mask}
                  onChange={(event) =>
                    setAccountDraft((current) => ({ ...current, mask: event.target.value }))
                  }
                  className="input-class"
                  placeholder="Mask"
                />
                <Input
                  value={accountDraft.subtype}
                  onChange={(event) =>
                    setAccountDraft((current) => ({ ...current, subtype: event.target.value }))
                  }
                  className="input-class"
                  placeholder="Subtype"
                />
                <Input
                  value={accountDraft.institution}
                  onChange={(event) =>
                    setAccountDraft((current) => ({
                      ...current,
                      institution: event.target.value,
                    }))
                  }
                  className="input-class md:col-span-2"
                  placeholder="Institution"
                />
                <Input
                  value={accountDraft.currentBalance}
                  onChange={(event) =>
                    setAccountDraft((current) => ({
                      ...current,
                      currentBalance: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Current balance"
                  type="number"
                />
                <Input
                  value={accountDraft.availableBalance}
                  onChange={(event) =>
                    setAccountDraft((current) => ({
                      ...current,
                      availableBalance: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Available balance"
                  type="number"
                />
                <Input
                  value={accountDraft.interestRate}
                  onChange={(event) =>
                    setAccountDraft((current) => ({
                      ...current,
                      interestRate: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Interest rate"
                  type="number"
                  step="0.01"
                />
                <Select
                  value={accountDraft.status}
                  onValueChange={(value) =>
                    setAccountDraft((current) => ({
                      ...current,
                      status: value as Account["status"],
                    }))
                  }
                >
                  <SelectTrigger className="input-class">
                    {accountDraft.status}
                  </SelectTrigger>
                  <SelectContent>
                    {["active", "linked", "new"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="mt-4" onClick={saveAccount}>
                Save account
              </Button>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-20 font-semibold text-gray-900">
                    Transaction editor
                  </h2>
                  <p className="text-14 text-gray-600">
                    Edit a ledger row and the consumer views refresh instantly.
                  </p>
                </div>
                <Select value={selectedTransactionId} onValueChange={setSelectedTransactionId}>
                  <SelectTrigger className="w-56 input-class">
                    {selectedTransaction?.name || "Select transaction"}
                  </SelectTrigger>
                  <SelectContent>
                    {state.transactions.map((transaction) => (
                      <SelectItem key={transaction.id} value={transaction.id}>
                        {transaction.name} · {formatDateTime(new Date(transaction.date)).dateOnly}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Input
                  value={transactionDraft.name}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Transaction title"
                />
                <Input
                  value={transactionDraft.merchant}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      merchant: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Merchant"
                />
                <Input
                  value={transactionDraft.amount}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Amount"
                  type="number"
                />
                <Input
                  value={transactionDraft.balanceAfter}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      balanceAfter: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Balance after"
                  type="number"
                />
                <Input
                  value={transactionDraft.date}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="input-class md:col-span-2"
                  type="datetime-local"
                />
                <Input
                  value={transactionDraft.category}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Category"
                />
                <Select
                  value={transactionDraft.type}
                  onValueChange={(value) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      type: value as Transaction["type"],
                    }))
                  }
                >
                  <SelectTrigger className="input-class">
                    {transactionDraft.type}
                  </SelectTrigger>
                  <SelectContent>
                    {["debit", "credit"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={transactionDraft.statusLabel}
                  onValueChange={(value) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      statusLabel: value as "Posted" | "Pending",
                    }))
                  }
                >
                  <SelectTrigger className="input-class">
                    {transactionDraft.statusLabel}
                  </SelectTrigger>
                  <SelectContent>
                    {["Posted", "Pending"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={transactionDraft.note}
                  onChange={(event) =>
                    setTransactionDraft((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  className="input-class md:col-span-2 min-h-24"
                  placeholder="Note"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button onClick={saveTransaction} disabled={!selectedTransaction}>
                  Save transaction
                </Button>
                <Button
                  variant="secondary"
                  disabled={!selectedTransaction}
                  onClick={() => actions.removeTransaction(selectedTransaction?.id || "")}
                >
                  Delete transaction
                </Button>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-20 font-semibold text-gray-900">
                Add transaction
              </h2>
              <p className="mt-1 text-14 text-gray-600">
                Create a new ledger entry and it will show up in the dashboard immediately.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Select
                  value={newTransaction.accountId}
                  onValueChange={(value) =>
                    setNewTransaction((current) => ({ ...current, accountId: value }))
                  }
                >
                  <SelectTrigger className="input-class">
                    {state.accounts.find((account) => account.appwriteItemId === newTransaction.accountId)?.name || "Account"}
                  </SelectTrigger>
                  <SelectContent>
                    {state.accounts.map((account) => (
                      <SelectItem key={account.appwriteItemId} value={account.appwriteItemId}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={newTransaction.name}
                  onChange={(event) =>
                    setNewTransaction((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Transaction title"
                />
                <Input
                  value={newTransaction.merchant}
                  onChange={(event) =>
                    setNewTransaction((current) => ({
                      ...current,
                      merchant: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Merchant"
                />
                <Input
                  value={newTransaction.amount}
                  onChange={(event) =>
                    setNewTransaction((current) => ({
                      ...current,
                      amount: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Amount"
                  type="number"
                />
                <Input
                  value={newTransaction.category}
                  onChange={(event) =>
                    setNewTransaction((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                  className="input-class"
                  placeholder="Category"
                />
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) =>
                    setNewTransaction((current) => ({
                      ...current,
                      type: value as Transaction["type"],
                    }))
                  }
                >
                  <SelectTrigger className="input-class">
                    {newTransaction.type}
                  </SelectTrigger>
                  <SelectContent>
                    {["debit", "credit"].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={newTransaction.date}
                  onChange={(event) =>
                    setNewTransaction((current) => ({
                      ...current,
                      date: event.target.value,
                    }))
                  }
                  className="input-class md:col-span-2"
                  type="datetime-local"
                />
              </div>

              <Button className="mt-4" onClick={addTransaction}>
                Add transaction
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-20 font-semibold text-gray-900">Live preview</h2>
              <p className="mt-1 text-14 text-gray-600">
                This is the exact state the consumer dashboard reads from.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                    Holder
                  </p>
                  <p className="mt-2 text-16 font-semibold text-gray-900">
                    {state.user.name}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                    Primary balance
                  </p>
                  <p className="mt-2 text-16 font-semibold text-gray-900">
                    {formatAmount(selectedAccount?.currentBalance || 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-20 font-semibold text-gray-900">
                    Transaction feed
                  </h2>
                  <p className="text-14 text-gray-600">
                    Live ledger items for the selected account.
                  </p>
                </div>
                <span className="rounded-full bg-blue-25 px-3 py-1 text-12 font-semibold text-blue-700">
                  Real time
                </span>
              </div>
              <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <TransactionsTable
                  transactions={liveTransactions}
                  onTransactionSelect={(transaction) =>
                    setSelectedTransactionId(transaction.id)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
