"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TransactionDetailsSheet from "@/components/TransactionDetailsSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useBanking } from "@/components/banking-provider";
import { formatAmount, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const dashboardActions = [
  { href: "/payment-transfer", label: "Transfer money" },
  { href: "/bill-pay-direct-deposit", label: "Bill Pay / Direct Deposit" },
  { href: "/transaction-history", label: "View statement" },
  { href: "/cards", label: "Manage cards" },
  { href: "/admin", label: "Admin dashboard" },
];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const { state, actions, loanPayment, convertCurrency } = useBanking();
  const homePage = Number(searchParams.get("page")) || 1;
  const [statement, setStatement] = useState<ReturnType<
    typeof actions.generateStatement
  > | null>(null);
  const [conversion, setConversion] = useState({
    amount: 500,
    from: "USD" as keyof typeof state.exchangeRates,
    to: "EUR" as keyof typeof state.exchangeRates,
  });
  const [loanState, setLoanState] = useState(state.loan);
  const [depositState, setDepositState] = useState({
    amount: 5000,
    tenorMonths: 12,
  });
  const [supportMessage, setSupportMessage] = useState("");
  const [isGeneratingStatement, setIsGeneratingStatement] = useState(false);
  const [isOpeningDeposit, setIsOpeningDeposit] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const currentAccountId =
    searchParams.get("id") || state.accounts[0]?.appwriteItemId;
  const currentAccount =
    state.accounts.find(
      (account) => account.appwriteItemId === currentAccountId,
    ) || state.accounts[0];
  const checkingAccount =
    state.accounts.find(
      (account) =>
        account.accountKind === "Current" || account.subtype === "checking",
    ) || currentAccount;
  const savingsAccount = state.accounts.find(
    (account) =>
      account.accountKind === "Savings" || account.subtype === "savings",
  );
  const investmentAccount = state.accounts.find(
    (account) =>
      account.accountKind === "Investment" || account.subtype === "portfolio",
  );

  const selectedTransactions = useMemo(
    () =>
      state.transactions
        .filter(
          (transaction) =>
            transaction.accountId === currentAccount?.appwriteItemId,
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
    [currentAccount?.appwriteItemId, state.transactions],
  );

  const fixedDeposit = state.fixedDeposits[0];
  const loanEstimate = loanPayment(
    loanState.amount,
    loanState.annualRate,
    loanState.tenureMonths,
  );
  const currencyPreview = convertCurrency(
    conversion.amount,
    conversion.from,
    conversion.to,
  );

  const topCategory = useMemo(() => {
    const grouped = state.transactions.reduce<Record<string, number>>(
      (acc, transaction) => {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      },
      {},
    );

    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [state.transactions]);

  return (
    <section className="home">
      <div className="md:home-content">
        <header className="home-header ">
          <HeaderBox
            type="greeting"
            title="Hello"
            user={state.user.name}
            subtext="you've been enjoying preferred rewards from business banking for 8 years!"
          />

          <div className="flex flex-col md:grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
            {" "}
            <p className="text-3xl text-red-500 ml-4">Banking</p>
            <div className="r border border-neutral-400 bg-white p-4 shadow-sm">
              <div className="md:mt-6 grid md:gap-4 md:grid-cols-2">
                <div className="md:rounded pb-4 flex justify-between w-full items-center bg-gray-50 border-b border-neutral-300">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Checking -3321
                    </p>
                    <p className=" text-2xl font-semibold text-gray-900">
                      {formatAmount(checkingAccount?.currentBalance || 0)}
                    </p>
                    <p className="text-xs text-gray-600">
                      {checkingAccount?.officialName || "Checking Account"}
                    </p>
                  </div>{" "}
                  <ChevronRight className="ml-2 inline h-8 text-gray-400" />
                </div>

                <div className="flex justify-between items-center md:rounded pb-4 pt-4  bg-gray-50 border-b border-neutral-300">
                  <div className="flex flex-col ">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                      Savings account
                    </p>
                    {savingsAccount ? (
                      <>
                        <p className=" text-lg font-semibold text-gray-900">
                          {formatAmount(savingsAccount.currentBalance)}
                        </p>
                        <p className=" text-xs text-gray-600">
                          {savingsAccount.officialName}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className=" text-lg font-semibold text-gray-900">
                          No savings account yet
                        </p>
                        <p className=" text-xs text-gray-600">
                          Savings has not been created for this mock profile.
                        </p>
                      </>
                    )}
                  </div>
                  <ChevronRight className="ml-2 inline h-8 text-gray-400" />
                </div>

                <div className="md:rounded pb-4 pt-4 flex justify-between items-center bg-gray-50 border-b border-neutral-300">
                  <div className="flex flex-col">
                    <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                      Investment portfolio
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatAmount(investmentAccount?.currentBalance || 0)}
                    </p>
                    <p className=" text-xs text-gray-600">0.00% change</p>
                  </div>
                  <ChevronRight className="ml-2 inline h-8 text-gray-400" />
                </div>

                <div className="md:rounded pb-4 pt-4 flex justify-between items-center bg-gray-50 ">
                  <div className="flex flex-col">
                    <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                      Transaction count
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {state.transactions.length}
                    </p>
                    <p className=" text-xs text-gray-600">
                      All ledger entries are sourced from local mock data.
                    </p>
                  </div>
                  <ChevronRight className="ml-2 inline h-8 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Quick actions
              </p>
              <div className="mt-4 grid gap-3">
                {dashboardActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className=" bg-gray-50 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
                  >
                    <p className="text-16 font-semibold text-gray-900">
                      {action.label}
                    </p>
                    
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        <RecentTransactions
          accounts={state.accounts}
          transactions={state.transactions}
          appwriteItemId={currentAccount?.appwriteItemId || ""}
          page={homePage}
          onTransactionSelect={setSelectedTransaction}
        />

        <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_355px]">
          <div className="min-w-0 space-y-6">
            <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-20 font-semibold text-gray-900">
                    Financial insights
                  </h2>
                  <p className="text-xs text-gray-600">
                    Spending patterns and recurring obligations at a glance.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  disabled={isGeneratingStatement}
                  onClick={async () => {
                    setIsGeneratingStatement(true);
                    await new Promise((resolve) => setTimeout(resolve, 850));
                    setStatement(actions.generateStatement("Last 30 days"));
                    setIsGeneratingStatement(false);
                  }}
                >
                  {isGeneratingStatement
                    ? "Generating..."
                    : "Generate statement"}
                </Button>
              </div>

              {statement && (
                <div className="mt-4 rounded bg-blue-25 p-4 text-blue-900">
                  <p className="text-xs font-semibold">
                    {statement.periodLabel}
                  </p>
                  <p className=" text-xs">{statement.summary}</p>
                  <p className="text-12">
                    Credits {formatAmount(statement.totalCredits)} · Debits{" "}
                    {formatAmount(statement.totalDebits)}
                  </p>
                </div>
              )}

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {topCategory.map(([name, value]) => {
                  const totalSpent = state.transactions.reduce(
                    (total, transaction) => total + transaction.amount,
                    0,
                  );
                  const percentage = (value / Math.max(1, totalSpent)) * 100;
                  return (
                    <div key={name} className="rounded bg-gray-50 p-4">
                      <p className="text-xs font-medium text-gray-700">
                        {name}
                      </p>
                      <p className="text-18 font-semibold text-gray-900">
                        {formatAmount(value)}
                      </p>
                      <Progress
                        value={percentage}
                        className="mt-3 h-2 bg-gray-200"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-20 font-semibold text-gray-900">
                    Loan calculator
                  </h2>
                  <span className="rounded-full bg-blue-25 px-3 py-1 text-12 font-semibold text-blue-700">
                    Pre-qualified
                  </span>
                </div>
                <div className="mt-4 space-y-4">
                  <Input
                    type="number"
                    value={loanState.amount}
                    onChange={(event) =>
                      setLoanState((current) => ({
                        ...current,
                        amount: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                  <Input
                    type="number"
                    value={loanState.tenureMonths}
                    onChange={(event) =>
                      setLoanState((current) => ({
                        ...current,
                        tenureMonths: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                  <Input
                    type="number"
                    value={loanState.annualRate}
                    onChange={(event) =>
                      setLoanState((current) => ({
                        ...current,
                        annualRate: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                </div>
                <div className="mt-4 rounded bg-gray-50 p-4">
                  <p className="text-xs text-gray-600">
                    Estimated monthly payment
                  </p>
                  <p className="text-24 font-semibold text-gray-900">
                    {formatAmount(loanEstimate)}
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-20 font-semibold text-gray-900">
                    Currency converter
                  </h2>
                  <span className="text-12 text-gray-500">Live FX</span>
                </div>
                <div className="mt-4 grid gap-3">
                  <Input
                    type="number"
                    value={conversion.amount}
                    onChange={(event) =>
                      setConversion((current) => ({
                        ...current,
                        amount: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={conversion.from}
                      onChange={(event) =>
                        setConversion((current) => ({
                          ...current,
                          from: event.target
                            .value as keyof typeof state.exchangeRates,
                        }))
                      }
                      className="input-class rounded-lg border border-gray-300 bg-white p-3"
                    >
                      {Object.keys(state.exchangeRates).map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <select
                      value={conversion.to}
                      onChange={(event) =>
                        setConversion((current) => ({
                          ...current,
                          to: event.target
                            .value as keyof typeof state.exchangeRates,
                        }))
                      }
                      className="input-class rounded-lg border border-gray-300 bg-white p-3"
                    >
                      {Object.keys(state.exchangeRates).map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-4 rounded bg-gray-50 p-4">
                  <p className="text-xs text-gray-600">Converted amount</p>
                  <p className="text-24 font-semibold text-gray-900">
                    {currencyPreview.toLocaleString()} {conversion.to}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-20 font-semibold text-gray-900">
                  Fixed deposits
                </h2>
                <p className=" text-xs text-gray-600">
                  Lock cash in a fixed deposit and track projected returns.
                </p>
                <div className="mt-4 space-y-3">
                  <Input
                    type="number"
                    value={depositState.amount}
                    onChange={(event) =>
                      setDepositState((current) => ({
                        ...current,
                        amount: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                  <Input
                    type="number"
                    value={depositState.tenorMonths}
                    onChange={(event) =>
                      setDepositState((current) => ({
                        ...current,
                        tenorMonths: Number(event.target.value),
                      }))
                    }
                    className="input-class"
                  />
                  <Button
                    disabled={isOpeningDeposit}
                    onClick={async () => {
                      setIsOpeningDeposit(true);
                      await new Promise((resolve) => setTimeout(resolve, 900));
                      actions.openFixedDeposit(
                        currentAccount?.appwriteItemId ||
                          state.accounts[0]?.appwriteItemId ||
                          "",
                        depositState.amount,
                        depositState.tenorMonths,
                      );
                      setIsOpeningDeposit(false);
                    }}
                    className="w-full"
                  >
                    {isOpeningDeposit ? "Opening..." : "Open deposit"}
                  </Button>
                </div>
                <div className="mt-4 rounded bg-gray-50 p-4">
                  <p className="text-xs text-gray-600">Latest deposit</p>
                  <p className="text-18 font-semibold text-gray-900">
                    {fixedDeposit.title}
                  </p>
                  <p className="text-xs text-gray-600">
                    Matures on{" "}
                    {
                      formatDateTime(new Date(fixedDeposit.maturityDate))
                        .dateOnly
                    }
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-20 font-semibold text-gray-900">
                    Security center
                  </h2>
                  <span className="rounded-full bg-emerald-25 px-3 py-1 text-12 font-semibold text-emerald-700">
                    Protected
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ["biometric", "Biometric unlock"],
                    ["pin", "PIN confirmation"],
                    ["twoFactor", "2FA approvals"],
                    ["alerts", "Real-time alerts"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        actions.toggleSecurity(
                          key as keyof typeof state.security,
                        )
                      }
                      className="flex w-full items-center justify-between rounded border border-gray-200 px-4 py-3 text-left"
                    >
                      <span className="text-xs font-medium text-gray-700">
                        {label}
                      </span>
                      <span
                        className={cn(
                          "text-12 font-semibold",
                          state.security[key as keyof typeof state.security]
                            ? "text-emerald-600"
                            : "text-gray-400",
                        )}
                      >
                        {state.security[key as keyof typeof state.security]
                          ? "On"
                          : "Off"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-20 font-semibold text-gray-900">
                  Notifications
                </h2>
                <div className="mt-4 space-y-3">
                  {state.notifications.slice(0, 4).map((notification) => (
                    <button
                      key={notification.id}
                      type="button"
                      onClick={() =>
                        actions.markNotificationRead(notification.id)
                      }
                      className={cn(
                        "w-full rounded border px-4 py-3 text-left transition",
                        notification.read
                          ? "border-gray-200 bg-gray-50"
                          : "border-blue-200 bg-blue-25",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-900">
                          {notification.title}
                        </p>
                        <span className="text-12 text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                      <p className=" text-xs text-gray-600">
                        {notification.body}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-20 font-semibold text-gray-900">
                  Support center
                </h2>
                <p className=" text-xs text-gray-600">
                  Message the in-app support desk and keep the conversation in
                  this workspace.
                </p>
                <Textarea
                  value={supportMessage}
                  onChange={(event) => setSupportMessage(event.target.value)}
                  placeholder="Ask about cards, transfers, goals, or statements..."
                  className="mt-4 input-class min-h-28"
                />
                <div className="mt-4 flex gap-3">
                  <Button
                    onClick={() => {
                      actions.sendMessage("Support request", supportMessage);
                      setSupportMessage("");
                    }}
                    disabled={!supportMessage.trim()}
                  >
                    Send message
                  </Button>
                  <Button variant="secondary" onClick={() => actions.reset()}>
                    Reset workspace
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <RightSidebar
            user={state.user}
            transactions={selectedTransactions}
            banks={state.accounts.slice(0, 2)}
          />
        </section>
      </div>
      <TransactionDetailsSheet
        transaction={selectedTransaction}
        open={Boolean(selectedTransaction)}
        onOpenChange={(open) => {
          if (!open) setSelectedTransaction(null);
        }}
      />
    </section>
  );
};

export default Dashboard;
