"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionDetailsSheet from "@/components/TransactionDetailsSheet";
import TransactionsTable from "@/components/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useBanking } from "@/components/banking-provider";
import { formatAmount } from "@/lib/utils";

const rowsPerPage = 10;

const TransactionHistory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { state, actions } = useBanking();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [accountId, setAccountId] = useState(
    searchParams.get("id") || state.accounts[0]?.appwriteItemId || ""
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [statement, setStatement] = useState<ReturnType<
    typeof actions.generateStatement
  > | null>(null);
  const page = Number(searchParams.get("page")) || 1;

  const resetPaging = (nextId = accountId) => {
    const query = new URLSearchParams();
    if (nextId) query.set("id", nextId);

    router.replace(
      query.toString() ? `${pathname}?${query.toString()}` : pathname,
      { scroll: false }
    );
  };

  const selectedAccount = useMemo(
    () =>
      state.accounts.find((account) => account.appwriteItemId === accountId) ||
      state.accounts[0],
    [accountId, state.accounts]
  );

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(state.transactions.map((transaction) => transaction.category))
      ),
    ];
  }, [state.transactions]);

  const filteredTransactions = useMemo(() => {
    return state.transactions
      .filter((transaction) =>
        accountId ? transaction.accountId === accountId : true
      )
      .filter((transaction) =>
        category === "All" ? true : transaction.category === category
      )
      .filter((transaction) => {
        if (status === "All") return true;
        if (status === "Credit") return transaction.type === "credit";
        if (status === "Debit") return transaction.type === "debit";
        return transaction.pending ? status === "Pending" : status === "Posted";
      })
      .filter((transaction) =>
        [transaction.name, transaction.merchant, transaction.category]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [accountId, category, search, state.transactions, status]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * rowsPerPage;
  const visibleTransactions = filteredTransactions.slice(pageStart, pageStart + rowsPerPage);

  const credits = filteredTransactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const debits = filteredTransactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const budgetHealth =
    state.budgets.reduce((sum, budget) => sum + budget.limit, 0) /
    Math.max(1, state.budgets.reduce((sum, budget) => sum + budget.spent, 0));

  return (
    <div className="transactions min-w-0">
      <div className="transactions-header">
      <HeaderBox
        title="Transaction History"
        subtext="Search, filter, and inspect the full ledger with downloadable statements."
      />

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setStatement(actions.generateStatement("This month"))}>
            Generate statement
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setStatus("All");
              resetPaging();
            }}
          >
            Reset filters
          </Button>
        </div>
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Selected account</p>
          <p className="mt-2 text-18 font-semibold text-gray-900">{selectedAccount?.name}</p>
          <p className="text-14 text-gray-600">{selectedAccount?.officialName}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Credits</p>
          <p className="mt-2 text-24 font-semibold text-emerald-600">{formatAmount(credits)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Debits</p>
          <p className="mt-2 text-24 font-semibold text-rose-600">{formatAmount(debits)}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Budget health</p>
          <p className="mt-2 text-24 font-semibold text-gray-900">{budgetHealth.toFixed(2)}x</p>
          <Progress value={Math.min(100, budgetHealth * 40)} className="mt-3 h-2 bg-gray-200" />
        </div>
      </div>

      {statement && (
        <div className="rounded-[28px] bg-blue-25 p-5 text-blue-950">
          <p className="text-16 font-semibold">{statement.periodLabel}</p>
          <p className="mt-1 text-14">{statement.summary}</p>
          <p className="mt-2 text-14">
            Credits {formatAmount(statement.totalCredits)} | Debits {formatAmount(statement.totalDebits)}
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search merchants, notes, or categories"
          className="input-class md:col-span-2"
        />
        <Select value={accountId} onValueChange={(value) => {
          setAccountId(value);
          resetPaging(value);
        }}>
          <SelectTrigger className="input-class">
            {selectedAccount?.name || "Select account"}
          </SelectTrigger>
          <SelectContent>
            {state.accounts.map((account) => (
              <SelectItem key={account.id} value={account.appwriteItemId}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="input-class">{status}</SelectTrigger>
          <SelectContent>
            {["All", "Credit", "Debit", "Pending", "Posted"].map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setCategory(item);
              resetPaging();
            }}
            className={`rounded-full border px-4 py-2 text-14 font-medium ${
              category === item ? "border-blue-600 bg-blue-600 text-white" : "border-gray-200 bg-white text-gray-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
        {visibleTransactions.length > 0 ? (
          <TransactionsTable
            transactions={visibleTransactions}
            onTransactionSelect={setSelectedTransaction}
          />
        ) : (
          <div className="py-16 text-center">
            <p className="text-18 font-semibold text-gray-900">No transactions found</p>
            <p className="mt-2 text-14 text-gray-600">
              Try a different filter or reset the view to see more activity.
            </p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination totalPages={totalPages} page={currentPage} />
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="text-20 font-semibold text-gray-900">Budget tracking</h2>
          <div className="mt-4 space-y-4">
            {state.budgets.map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100;
              return (
                <div key={budget.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-14 font-medium text-gray-700">{budget.category}</p>
                    <p className="text-14 text-gray-500">
                      {formatAmount(budget.spent)} / {formatAmount(budget.limit)}
                    </p>
                  </div>
                  <Progress value={percentage} className="h-2 bg-gray-200" indicatorClassName={budget.color} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm">
          <h2 className="text-20 font-semibold text-gray-900">Statement snapshot</h2>
          <p className="mt-2 text-14 text-gray-600">
            The statement summary updates instantly so teams can verify activity at a glance.
          </p>
          <div className="mt-4 rounded-2xl bg-gray-50 p-4">
            <p className="text-14 text-gray-600">Last generated</p>
            <p className="text-18 font-semibold text-gray-900">
              {statement ? statement.generatedAt : "Not generated yet"}
            </p>
          </div>
        </div>
      </div>

      <TransactionDetailsSheet
        transaction={selectedTransaction}
        open={Boolean(selectedTransaction)}
        onOpenChange={(open) => {
          if (!open) setSelectedTransaction(null);
        }}
      />
    </div>
  );
};

export default TransactionHistory;
