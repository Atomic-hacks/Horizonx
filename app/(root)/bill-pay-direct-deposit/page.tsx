"use client";

import { useMemo, useState, type FormEvent } from "react";

import HeaderBox from "@/components/HeaderBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { demoBankingProfile as directDepositProfile } from "@/lib/mock-banking";

const DirectDeposit = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    return (
      accountNumber.trim().length > 0 &&
      accountNumber.trim() === confirmAccountNumber.trim()
    );
  }, [accountNumber, confirmAccountNumber]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accountNumber.trim() !== confirmAccountNumber.trim()) {
      setError("The account numbers must match.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Bill Pay / Direct Deposit"
        subtext="Link a direct deposit account in a streamlined banking flow."
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-2">
        <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out">
          <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
            Link account for direct deposit
          </p>
          <h2 className="mt-2 text-30 font-semibold text-gray-900">
            Account details
          </h2>
          <p className="mt-2 text-14 text-gray-600">
            Use these reference details to complete direct deposit setup.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Account Holder
              </p>
              <p className="mt-2 text-16 font-semibold text-gray-900">
                {directDepositProfile.directDeposit.accountHolder}
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Account Number
              </p>
              <p className="mt-2 text-16 font-semibold text-gray-900">
                {directDepositProfile.directDeposit.accountNumber}
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Routing Number
              </p>
              <p className="mt-2 text-16 font-semibold text-gray-900">
                {directDepositProfile.directDeposit.routingNumber}
              </p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Address
              </p>
              <p className="mt-2 text-16 font-semibold text-gray-900">
                {directDepositProfile.directDeposit.address}
              </p>
            </div>
          </div>

          <div
            className={`mt-6 rounded-2xl border p-5 transition-all duration-300 ${
              submitted
                ? "border-red-200 bg-red-25 opacity-100"
                : "border-gray-200 bg-gray-50 opacity-100"
            }`}
          >
            <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
              Status
            </p>
            <p className="mt-2 text-20 font-semibold text-gray-900">
              {submitted ? "Pending Verification" : "Not linked yet"}
            </p>
            <p className="mt-1 text-14 text-gray-600">
              {submitted
                ? "Your direct deposit account has been linked and is pending verification."
                : "Submit the form to link this account for direct deposit."}
            </p>
          </div>
        </div>

        <div className="rounded-[32px] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-out">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                Direct deposit form
              </p>
              <h2 className="mt-2 text-24 font-semibold text-gray-900">
                Verify your account
              </h2>
            </div>
            <span className="rounded-full bg-red-25 px-3 py-1 text-12 font-semibold text-red-700">
              Setup
            </span>
          </div>

          {submitted && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-25 p-4 transition-all duration-300">
              <p className="text-12 uppercase tracking-[0.2em] text-red-700">
                Success
              </p>
              <p className="mt-2 text-16 font-semibold text-red-900">
                Your direct deposit account has been linked and is pending verification.
              </p>
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-14 font-medium text-gray-700">Account Number</label>
              <Input
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                className="input-class"
                inputMode="numeric"
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-14 font-medium text-gray-700">
                Confirm Account Number
              </label>
              <Input
                value={confirmAccountNumber}
                onChange={(event) => setConfirmAccountNumber(event.target.value)}
                className="input-class"
                inputMode="numeric"
                placeholder="Re-enter account number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-14 font-medium text-gray-700">
                Routing Number
              </label>
              <Input
                value={routingNumber}
                onChange={(event) => setRoutingNumber(event.target.value)}
                className="input-class"
                inputMode="numeric"
                placeholder="Enter routing number"
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-4 text-14 text-gray-600">
              Match check:{" "}
              <span className={`font-semibold ${matches ? "text-red-700" : "text-rose-600"}`}>
                {matches ? "Ready to submit" : "Numbers must match"}
              </span>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-25 p-4 text-14 text-rose-700">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Link direct deposit account
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default DirectDeposit;
