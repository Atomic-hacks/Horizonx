"use client";

import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { useBanking } from "@/components/banking-provider";
import { formatAmount } from "@/lib/utils";

const Transfer = () => {
  const { state, summary } = useBanking();

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payments"
        subtext="Transfer money, manage beneficiaries, pay bills, and top up airtime from the same interface."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Current balance</p>
          <p className="mt-2 text-24 font-semibold text-gray-900">
            {formatAmount(summary.totalCurrentBalance)}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Beneficiaries</p>
          <p className="mt-2 text-24 font-semibold text-gray-900">{state.beneficiaries.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">Bills due</p>
          <p className="mt-2 text-24 font-semibold text-gray-900">
            {state.bills.filter((bill) => bill.status === "due").length}
          </p>
        </div>
      </div>

      <section className="size-full pt-5">
        <PaymentTransferForm />
      </section>
    </section>
  );
};

export default Transfer;
