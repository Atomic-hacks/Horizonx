"use client";

import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useBanking } from "@/components/banking-provider";
import { formatAmount, formatDateTime } from "@/lib/utils";

const MyBanks = () => {
  const { state, actions } = useBanking();

  return (
    <section className="flex w-full min-w-0">
      <div className="my-banks space-y-8">
        <HeaderBox
          title="Accounts"
          subtext="Manage savings, current, and business accounts with virtual cards, deposit ladders, and local bank linking."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
              Total accounts
            </p>
            <p className="mt-2 text-24 font-semibold text-gray-900">
              {state.accounts.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
              Connected banks
            </p>
            <p className="mt-2 text-24 font-semibold text-gray-900">
              {state.connectedInstitutions.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
              Virtual cards
            </p>
            <p className="mt-2 text-24 font-semibold text-gray-900">
              {state.cards.length}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => actions.connectBank("Connected horizon Bank")}>
            Connect horizon bank
          </Button>
          <Button
            variant="secondary"
            onClick={() => actions.toggleSecurity("biometric")}
          >
            Toggle biometric lock
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="header-2">Your cards</h2>
          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            {state.accounts.map((account) => (
              <BankCard
                key={account.id}
                account={account}
                userName={`${state.user.firstName} ${state.user.lastName}`}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-20 font-semibold text-gray-900">
              Virtual cards
            </h2>
            <div className="mt-4 space-y-3">
              {state.cards.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => actions.toggleCard(card.id)}
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 text-left"
                >
                  <div>
                    <p className="text-16 font-semibold text-gray-900">
                      {card.cardName}
                    </p>
                    <p className="text-14 text-gray-600">
                      {card.network} •••• {card.last4} · Exp {card.expiry}
                    </p>
                  </div>
                  <span className="text-12 font-semibold text-gray-500">
                    {card.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-20 font-semibold text-gray-900">
              Savings goals
            </h2>
            <div className="mt-4 space-y-4">
              {state.goals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-14 font-medium text-gray-700">
                        {goal.name}
                      </p>
                      <p className="text-14 text-gray-500">
                        {formatAmount(goal.currentAmount)}
                      </p>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2 bg-gray-200"
                      indicatorClassName={goal.color}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-12 text-gray-500">
                        Target {formatAmount(goal.targetAmount)}
                      </span>
                      <span className="text-12 text-gray-500">
                        Due {formatDateTime(new Date(goal.deadline)).dateOnly}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-20 font-semibold text-gray-900">
              Fixed deposits
            </h2>
            <div className="mt-4 space-y-3">
              {state.fixedDeposits.map((deposit) => (
                <div key={deposit.id} className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-16 font-semibold text-gray-900">
                      {deposit.title}
                    </p>
                    <span className="text-12 text-gray-500">
                      {deposit.status}
                    </span>
                  </div>
                  <p className="text-14 text-gray-600">
                    Principal {formatAmount(deposit.principal)} · Return{" "}
                    {formatAmount(deposit.projectedReturn)}
                  </p>
                  <p className="text-14 text-gray-600">
                    Matures{" "}
                    {formatDateTime(new Date(deposit.maturityDate)).dateOnly}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-20 font-semibold text-gray-900">
              Beneficiaries
            </h2>
            <div className="mt-4 space-y-3">
              {state.beneficiaries.map((beneficiary) => (
                <div
                  key={beneficiary.id}
                  className="rounded-2xl border border-gray-200 p-4"
                >
                  <p className="text-16 font-semibold text-gray-900">
                    {beneficiary.name}
                  </p>
                  <p className="text-14 text-gray-600">
                    {beneficiary.nickname} · {beneficiary.bank}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
