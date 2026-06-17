"use client";

import { useMemo, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { useBanking } from "./banking-provider";
import { formatAmount } from "@/lib/utils";

const PaymentTransferForm = () => {
  const { state, actions } = useBanking();
  const [sourceId, setSourceId] = useState(state.accounts[0]?.appwriteItemId || "");
  const [beneficiaryId, setBeneficiaryId] = useState(state.beneficiaries[0]?.id || "");
  const [amount, setAmount] = useState(250);
  const [note, setNote] = useState("Rent contribution");
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    nickname: "",
    email: "",
  });
  const [billId, setBillId] = useState(state.bills[0]?.id || "");
  const [airtimeProvider, setAirtimeProvider] = useState("MTN");
  const [airtimeAmount, setAirtimeAmount] = useState(20);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sourceAccount = useMemo(
    () =>
      state.accounts.find((account) => account.appwriteItemId === sourceId) ||
      state.accounts[0],
    [sourceId, state.accounts]
  );

  const selectedBeneficiary = useMemo(
    () => state.beneficiaries.find((item) => item.id === beneficiaryId) || state.beneficiaries[0],
    [beneficiaryId, state.beneficiaries]
  );

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleTransfer = async () => {
    clearMessages();

    if (!sourceAccount || !selectedBeneficiary) {
      setErrorMessage("Please choose a source account and beneficiary.");
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1100));
      actions.transfer({
        accountId: sourceAccount.appwriteItemId,
        amount,
        note,
        beneficiaryId: selectedBeneficiary.id,
        destinationLabel: `${selectedBeneficiary.name} (${selectedBeneficiary.nickname})`,
      });
      setSuccessMessage(
        `${formatAmount(amount)} sent to ${selectedBeneficiary.name} from ${sourceAccount.name}.`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBillPayment = async () => {
    clearMessages();

    if (!billId || !sourceAccount) {
      setErrorMessage("Select a bill to pay.");
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      actions.payBill(billId, sourceAccount.appwriteItemId);
      setSuccessMessage("Bill payment processed locally and marked as paid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAirtimePurchase = async () => {
    clearMessages();
    if (!sourceAccount) {
      setErrorMessage("Select a source account first.");
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      actions.purchaseAirtime(sourceAccount.appwriteItemId, airtimeProvider, airtimeAmount);
      setSuccessMessage(
        `${formatAmount(airtimeAmount)} airtime top-up completed for ${airtimeProvider}.`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddBeneficiary = async () => {
    clearMessages();

    if (!newBeneficiary.name || !newBeneficiary.bank || !newBeneficiary.accountNumber) {
      setErrorMessage("Please fill in the beneficiary details.");
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 650));
      actions.addBeneficiary({
        ...newBeneficiary,
        favorite: false,
      });
      setNewBeneficiary({
        name: "",
        bank: "",
        accountNumber: "",
        nickname: "",
        email: "",
      });
      setSuccessMessage("Beneficiary saved locally and ready for future transfers.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {(successMessage || errorMessage) && (
        <div
          className={`rounded-2xl px-4 py-3 text-14 ${
            errorMessage ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {errorMessage || successMessage}
        </div>
      )}

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="topups">Airtime</TabsTrigger>
        </TabsList>

        <TabsContent value="transfer" className="mt-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-20 font-semibold text-gray-900">Send money</h3>
              <div>
                <label className="text-14 font-medium text-gray-700">Source account</label>
                <select
                  value={sourceId}
                  onChange={(event) => setSourceId(event.target.value)}
                  className="input-class mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
                >
                  {state.accounts.map((account) => (
                    <option key={account.id} value={account.appwriteItemId}>
                      {account.name} - {formatAmount(account.currentBalance)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-14 font-medium text-gray-700">Beneficiary</label>
                <select
                  value={beneficiaryId}
                  onChange={(event) => setBeneficiaryId(event.target.value)}
                  className="input-class mt-2 w-full rounded-lg border border-gray-300 bg-white p-3"
                >
                  {state.beneficiaries.map((beneficiary) => (
                    <option key={beneficiary.id} value={beneficiary.id}>
                      {beneficiary.name} - {beneficiary.nickname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-14 font-medium text-gray-700">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="input-class mt-2"
                />
              </div>
              <div>
                <label className="text-14 font-medium text-gray-700">Transfer note</label>
                <Textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  className="input-class mt-2 min-h-28"
                />
              </div>
              <Button type="button" className="w-full" onClick={handleTransfer} disabled={isProcessing}>
                {isProcessing ? "Processing transfer..." : "Send money"}
              </Button>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-14 text-gray-600">Preview</p>
                <p className="text-18 font-semibold text-gray-900">
                  {formatAmount(amount)} from {sourceAccount?.name}
                </p>
                <p className="text-14 text-gray-600">
                  Destination: {selectedBeneficiary?.name || "No beneficiary selected"}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="beneficiaries" className="mt-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h3 className="text-20 font-semibold text-gray-900">Beneficiary management</h3>
              <div className="mt-4 space-y-3">
                {state.beneficiaries.map((beneficiary) => (
                  <div key={beneficiary.id} className="rounded-2xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-16 font-semibold text-gray-900">{beneficiary.name}</p>
                        <p className="text-14 text-gray-600">{beneficiary.bank}</p>
                      </div>
                      <span className="text-12 text-gray-500">{beneficiary.accountNumber}</span>
                    </div>
                    <p className="mt-2 text-14 text-gray-600">
                      {beneficiary.nickname} · {beneficiary.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-18 font-semibold text-gray-900">Add beneficiary</h4>
              {[
                ["name", "Full name"],
                ["bank", "Bank name"],
                ["accountNumber", "Account number"],
                ["nickname", "Nickname"],
                ["email", "Email"],
              ].map(([key, label]) => (
                <Input
                  key={key}
                  placeholder={label}
                  value={newBeneficiary[key as keyof typeof newBeneficiary]}
                  onChange={(event) =>
                    setNewBeneficiary((current) => ({
                      ...current,
                      [key]: event.target.value,
                    }))
                  }
                  className="input-class"
                />
              ))}
              <Button type="button" className="w-full" onClick={handleAddBeneficiary} disabled={isProcessing}>
                {isProcessing ? "Saving..." : "Save beneficiary"}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bills" className="mt-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-20 font-semibold text-gray-900">Pay bills</h3>
              <select
                value={billId}
                onChange={(event) => setBillId(event.target.value)}
                className="input-class w-full rounded-lg border border-gray-300 bg-white p-3"
              >
                {state.bills.map((bill) => (
                  <option key={bill.id} value={bill.id}>
                    {bill.name} - {formatAmount(bill.amount)} - {bill.status}
                  </option>
                ))}
              </select>
              <Button type="button" className="w-full" onClick={handleBillPayment} disabled={isProcessing}>
                {isProcessing ? "Posting payment..." : "Pay bill"}
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="text-18 font-semibold text-gray-900">Upcoming bills</h4>
              {state.bills.map((bill) => (
                <div key={bill.id} className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-14 font-medium text-gray-900">{bill.name}</p>
                    <span className="text-12 text-gray-500">{bill.status}</span>
                  </div>
                  <p className="text-14 text-gray-600">
                    Due {bill.dueDate} from {state.accounts.find((account) => account.appwriteItemId === bill.accountId)?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="topups" className="mt-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-20 font-semibold text-gray-900">Airtime and data purchase</h3>
              <select
                value={airtimeProvider}
                onChange={(event) => setAirtimeProvider(event.target.value)}
                className="input-class w-full rounded-lg border border-gray-300 bg-white p-3"
              >
                {["MTN", "Airtel", "Glo", "9mobile"].map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                value={airtimeAmount}
                onChange={(event) => setAirtimeAmount(Number(event.target.value))}
                className="input-class"
              />
              <Button type="button" className="w-full" onClick={handleAirtimePurchase} disabled={isProcessing}>
                {isProcessing ? "Sending request..." : "Buy airtime/data"}
              </Button>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-14 text-gray-600">Current balance impact</p>
              <p className="text-24 font-semibold text-gray-900">
                {formatAmount(airtimeAmount)}
              </p>
              <p className="text-14 text-gray-600">
                The amount will be deducted from {sourceAccount?.name}.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {isProcessing && (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-14 text-gray-600 shadow-sm">
          Updating your request...
        </div>
      )}
    </div>
  );
};

export default PaymentTransferForm;
