"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import {
  BankingState,
  Beneficiary,
  bankingActions,
  convertCurrency,
  createDefaultState,
  formatLoanPayment,
  getAccountSummary,
  getReadableState,
  resetState,
  STORAGE_EVENT,
  StatementResult,
  AccountPatch,
  TransactionCreate,
  TransactionPatch,
  UserPatch,
  TransferSimulation,
} from "@/lib/mock-banking";

type BankingContextValue = {
  state: BankingState;
  summary: ReturnType<typeof getAccountSummary>;
  refresh: () => void;
  actions: {
    signIn: (payload: { email: string; password: string }) => void;
    signUp: (payload: SignUpParams) => void;
    logout: () => void;
    updateUser: (patch: UserPatch) => void;
    updateAccount: (accountId: string, patch: AccountPatch) => void;
    updateTransaction: (transactionId: string, patch: TransactionPatch) => void;
    addTransaction: (transaction: TransactionCreate) => void;
    removeTransaction: (transactionId: string) => void;
    connectBank: (institutionName?: string) => void;
    addBeneficiary: (beneficiary: Omit<Beneficiary, "id">) => void;
    transfer: (payload: TransferSimulation) => void;
    payBill: (billId: string, accountId: string) => void;
    purchaseAirtime: (accountId: string, provider: string, amount: number) => void;
    updateGoal: (goalId: string, delta: number) => void;
    openFixedDeposit: (accountId: string, principal: number, tenorMonths: number) => void;
    updateLoan: (amount: number, tenureMonths: number, annualRate: number) => void;
    toggleCard: (cardId: string) => void;
    toggleSecurity: (key: keyof BankingState["security"]) => void;
    sendMessage: (subject: string, body: string) => void;
    markNotificationRead: (notificationId: string) => void;
    generateStatement: (periodLabel?: string) => StatementResult;
    reset: () => void;
  };
  loanPayment: (amount: number, annualRate: number, tenureMonths: number) => number;
  convertCurrency: (
    amount: number,
    from: keyof BankingState["exchangeRates"],
    to: keyof BankingState["exchangeRates"]
  ) => number;
};

const BankingContext = createContext<BankingContextValue | null>(null);

const syncState = () => getReadableState();

export function BankingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BankingState>(() => createDefaultState());

  const refresh = useCallback(() => {
    setState(syncState());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const handleSync = () => refresh();
    window.addEventListener(STORAGE_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [refresh]);

  const actions = useMemo(
    () => ({
      signIn: (payload: { email: string; password: string }) => {
        bankingActions.signIn(payload);
        refresh();
      },
      signUp: (payload: SignUpParams) => {
        bankingActions.signUp(payload);
        refresh();
      },
      logout: () => {
        bankingActions.logout();
        refresh();
      },
      updateUser: (patch: UserPatch) => {
        bankingActions.updateUser(patch);
        refresh();
      },
      updateAccount: (accountId: string, patch: AccountPatch) => {
        bankingActions.updateAccount(accountId, patch);
        refresh();
      },
      updateTransaction: (transactionId: string, patch: TransactionPatch) => {
        bankingActions.updateTransaction(transactionId, patch);
        refresh();
      },
      addTransaction: (transaction: TransactionCreate) => {
        bankingActions.addTransaction(transaction);
        refresh();
      },
      removeTransaction: (transactionId: string) => {
        bankingActions.removeTransaction(transactionId);
        refresh();
      },
      connectBank: (institutionName?: string) => {
        bankingActions.connectBank(institutionName);
        refresh();
      },
      addBeneficiary: (beneficiary: Omit<Beneficiary, "id">) => {
        bankingActions.addBeneficiary(beneficiary);
        refresh();
      },
      transfer: (payload: TransferSimulation) => {
        bankingActions.transfer(payload);
        refresh();
      },
      payBill: (billId: string, accountId: string) => {
        bankingActions.payBill(billId, accountId);
        refresh();
      },
      purchaseAirtime: (accountId: string, provider: string, amount: number) => {
        bankingActions.purchaseAirtime(accountId, provider, amount);
        refresh();
      },
      updateGoal: (goalId: string, delta: number) => {
        bankingActions.updateGoal(goalId, delta);
        refresh();
      },
      openFixedDeposit: (
        accountId: string,
        principal: number,
        tenorMonths: number
      ) => {
        bankingActions.openFixedDeposit(accountId, principal, tenorMonths);
        refresh();
      },
      updateLoan: (amount: number, tenureMonths: number, annualRate: number) => {
        bankingActions.updateLoan(amount, tenureMonths, annualRate);
        refresh();
      },
      toggleCard: (cardId: string) => {
        bankingActions.toggleCard(cardId);
        refresh();
      },
      toggleSecurity: (key: keyof BankingState["security"]) => {
        bankingActions.toggleSecurity(key);
        refresh();
      },
      sendMessage: (subject: string, body: string) => {
        bankingActions.sendMessage(subject, body);
        refresh();
      },
      markNotificationRead: (notificationId: string) => {
        bankingActions.markNotificationRead(notificationId);
        refresh();
      },
      generateStatement: (periodLabel?: string) =>
        bankingActions.generateStatement(periodLabel),
      reset: () => {
        resetState();
        refresh();
      },
    }),
    [refresh]
  );

  const summary = useMemo(() => getAccountSummary(state.accounts), [state.accounts]);

  const value = useMemo(
    () => ({
      state,
      summary,
      refresh,
      actions,
      loanPayment: formatLoanPayment,
      convertCurrency: (
        amount: number,
        from: keyof BankingState["exchangeRates"],
        to: keyof BankingState["exchangeRates"]
      ) => convertCurrency(amount, from, to, state.exchangeRates),
    }),
    [actions, refresh, state, summary]
  );

  return (
    <BankingContext.Provider value={value}>{children}</BankingContext.Provider>
  );
}

export function useBanking() {
  const context = useContext(BankingContext);

  if (!context) {
    throw new Error("useBanking must be used within a BankingProvider");
  }

  return context;
}
