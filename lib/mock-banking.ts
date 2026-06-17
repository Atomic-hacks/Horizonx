import { formatAmount, formatDateTime } from "./utils";

export type AccountKind = "Savings" | "Current" | "Business" | "Investment";

export type horizonAccount = {
  id: string;
  appwriteItemId: string;
  name: string;
  officialName: string;
  mask: string;
  institutionId: string;
  type: AccountTypes;
  subtype: string;
  accountKind: AccountKind;
  currentBalance: number;
  availableBalance: number;
  interestRate: number;
  shareableId: string;
  institution: string;
  status: "active" | "linked" | "new";
};

export type horizonTransaction = Transaction & {
  id: string;
  accountId: string;
  accountName: string;
  method: "card" | "bank" | "wallet" | "transfer" | "bill" | "airtime";
  merchant: string;
  note?: string;
  accountKind?: AccountKind;
  balanceAfter?: number;
  statusLabel?: "Posted" | "Pending";
};

export type Beneficiary = {
  id: string;
  name: string;
  bank: string;
  accountNumber: string;
  nickname: string;
  email: string;
  favorite?: boolean;
};

export type VirtualCard = {
  id: string;
  accountId: string;
  cardName: string;
  last4: string;
  expiry: string;
  status: "active" | "frozen";
  spendingLimit: number;
  monthlySpent: number;
  network: "Visa" | "Mastercard";
};

export type SavingsGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  color: string;
};

export type FixedDeposit = {
  id: string;
  accountId: string;
  title: string;
  principal: number;
  rate: number;
  tenorMonths: number;
  maturityDate: string;
  projectedReturn: number;
  status: "active" | "maturing";
};

export type LoanSnapshot = {
  amount: number;
  tenureMonths: number;
  annualRate: number;
};

export type BillItem = {
  id: string;
  name: string;
  category: "Utilities" | "Rent" | "Streaming" | "Subscriptions" | "Education";
  amount: number;
  dueDate: string;
  accountId: string;
  status: "due" | "paid";
};

export type BudgetItem = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: "info" | "success" | "warning";
};

export type MessageThread = {
  id: string;
  subject: string;
  lastMessage: string;
  time: string;
  unread: boolean;
};

export type SecuritySettings = {
  biometric: boolean;
  pin: boolean;
  twoFactor: boolean;
  trustedDevices: number;
  alerts: boolean;
};

export type BankingState = {
  user: User;
  accounts: horizonAccount[];
  transactions: horizonTransaction[];
  beneficiaries: Beneficiary[];
  cards: VirtualCard[];
  goals: SavingsGoal[];
  fixedDeposits: FixedDeposit[];
  loan: LoanSnapshot;
  bills: BillItem[];
  budgets: BudgetItem[];
  notifications: NotificationItem[];
  messages: MessageThread[];
  security: SecuritySettings;
  exchangeRates: Record<string, number>;
  connectedInstitutions: string[];
};

export type UserPatch = Partial<
  Pick<
    User,
    "firstName" | "lastName" | "name" | "email" | "address1" | "city" | "state" | "postalCode"
  >
>;

export type AccountPatch = Partial<
  Pick<
    horizonAccount,
    | "name"
    | "officialName"
    | "mask"
    | "institution"
    | "status"
    | "subtype"
    | "currentBalance"
    | "availableBalance"
    | "interestRate"
  >
>;

export type TransactionPatch = Partial<
  Pick<
    horizonTransaction,
    | "name"
    | "merchant"
    | "amount"
    | "date"
    | "category"
    | "paymentChannel"
    | "type"
    | "pending"
    | "note"
    | "balanceAfter"
    | "statusLabel"
  >
>;

export type TransactionCreate = Omit<
  horizonTransaction,
  "id" | "$id" | "$createdAt"
>;

export type TransferSimulation = {
  accountId: string;
  amount: number;
  note: string;
  beneficiaryId?: string;
  destinationLabel: string;
};

export type StatementResult = {
  statementId: string;
  periodLabel: string;
  summary: string;
  totalCredits: number;
  totalDebits: number;
  generatedAt: string;
  downloadName: string;
};

export const STORAGE_KEY = "horizon-horizon-banking-state";
export const STORAGE_EVENT = "horizon-horizon-banking-state-sync";

const horizonUser: User = {
  $id: "horizon-user",
  email: "milana.vayntrub@horizon.demo",
  userId: "horizon-user",
  dwollaCustomerUrl: "",
  dwollaCustomerId: "horizon-customer",
  firstName: "Milana",
  lastName: "Vayntrub",
  name: "Milana Vayntrub",
  address1: "124 Crescent Road",
  city: "Austin",
  state: "TX",
  postalCode: "78701",
  dateOfBirth: "1990-04-22",
  ssn: "1234",
};

export const demoBankingProfile = {
  accountHolder: "Milana Vayntrub",
  checkingAccount: {
    id: "acct-checking",
    name: "Checking Account",
    balance: 1658695.6,
  },
  savingsAccount: null as null | {
    name: string;
    balance: number;
  },
  investmentPortfolio: {
    balance: 0,
    changePercent: 0,
  },
  directDeposit: {
    accountHolder: "Milana Vayntrub",
    accountNumber: "000683117577",
    routingNumber: "026009593",
    address: "4849 N Merrimac Ave, Chicago ILLINOIS 60630",
  },
};

const bankAccounts: horizonAccount[] = [
  {
    id: demoBankingProfile.checkingAccount.id,
    appwriteItemId: demoBankingProfile.checkingAccount.id,
    name: demoBankingProfile.checkingAccount.name,
    officialName: "Milana Vayntrub Checking",
    mask: "1177",
    institutionId: "horizon-bank",
    type: "depository",
    subtype: "checking",
    accountKind: "Current",
    currentBalance: demoBankingProfile.checkingAccount.balance,
    availableBalance: demoBankingProfile.checkingAccount.balance,
    interestRate: 0.35,
    shareableId: encodeId(demoBankingProfile.checkingAccount.id),
    institution: "horizon Bank Demo",
    status: "active",
  },
  {
    id: "acct-investment",
    appwriteItemId: "acct-investment",
    name: "Investment Portfolio",
    officialName: "Self-directed Investment Portfolio",
    mask: "0000",
    institutionId: "horizon-investments",
    type: "investment",
    subtype: "portfolio",
    accountKind: "Investment",
    currentBalance: 0,
    availableBalance: 0,
    interestRate: 0,
    shareableId: encodeId("acct-investment"),
    institution: "horizon Investments",
    status: "active",
  },
];

const makeTx = (
  tx: Omit<
    horizonTransaction,
    "id" | "$id" | "$createdAt" | "pending" | "image"
  > & {
    minutesAgo: number;
  },
): horizonTransaction => {
  const createdAt = new Date(
    Date.now() - tx.minutesAgo * 60 * 1000,
  ).toISOString();

  return {
    id: `${tx.accountId}-${tx.minutesAgo}-${tx.name.replace(/\s+/g, "-").toLowerCase()}`,
    $id: `${tx.accountId}-${tx.minutesAgo}`,
    $createdAt: createdAt,
    pending: tx.minutesAgo < 180,
    image: "",
    ...tx,
  };
};

const initialTransactions: horizonTransaction[] = [
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "Teller Deposit CHCK",
    amount: 1742000,
    paymentChannel: "bank",
    type: "credit",
    category: "Deposit",
    date: "2026-05-26T09:10:00.000Z",
    method: "bank",
    merchant: "Teller Deposit CHCK",
    minutesAgo: 10080,
    balanceAfter: 1742000,
    statusLabel: "Posted",
  }),
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "Teller Withdrawal",
    amount: 2000,
    paymentChannel: "bank",
    type: "debit",
    category: "Withdrawal",
    date: "2026-05-28T10:24:00.000Z",
    method: "bank",
    merchant: "Teller Withdrawal",
    minutesAgo: 9000,
    balanceAfter: 1740000,
    statusLabel: "Posted",
  }),
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "Wire Transfer",
    amount: 80000,
    paymentChannel: "online",
    type: "debit",
    category: "Transfer",
    date: "2026-05-28T13:55:00.000Z",
    method: "transfer",
    merchant: "Wire Transfer",
    minutesAgo: 8640,
    balanceAfter: 1660000,
    statusLabel: "Posted",
  }),
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "BILL-PAY Transfer",
    amount: 4500,
    paymentChannel: "bill",
    type: "debit",
    category: "Bill Pay",
    date: "2026-06-02T08:40:00.000Z",
    method: "bill",
    merchant: "BILL-PAY Transfer",
    minutesAgo: 7200,
    balanceAfter: 1655500,
    statusLabel: "Posted",
  }),
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "Cash Withdrawal",
    amount: 2000,
    paymentChannel: "bank",
    type: "debit",
    category: "Withdrawal",
    date: "2026-06-11T15:05:00.000Z",
    method: "bank",
    merchant: "Cash Withdrawal",
    minutesAgo: 5760,
    balanceAfter: 1653500,
    statusLabel: "Posted",
  }),
  makeTx({
    accountId: demoBankingProfile.checkingAccount.id,
    accountName: demoBankingProfile.checkingAccount.name,
    name: "Cash Withdrawal",
    amount: 1000,
    paymentChannel: "bank",
    type: "debit",
    category: "Withdrawal",
    date: "2026-06-15T11:30:00.000Z",
    method: "bank",
    merchant: "Cash Withdrawal",
    minutesAgo: 2880,
    balanceAfter: 1652500,
    statusLabel: "Posted",
  }),
];

const initialState: BankingState = {
  user: horizonUser,
  accounts: bankAccounts,
  transactions: initialTransactions,
  beneficiaries: [
    {
      id: "beneficiary-1",
      name: "Maya Chen",
      bank: "First National",
      accountNumber: "•••• 1934",
      nickname: "Rent",
      email: "maya@example.com",
      favorite: true,
    },
    {
      id: "beneficiary-2",
      name: "Noah Williams",
      bank: "Metro Credit Union",
      accountNumber: "•••• 8842",
      nickname: "Family",
      email: "noah@example.com",
    },
    {
      id: "beneficiary-3",
      name: "Ari Patel",
      bank: "horizon Bank",
      accountNumber: "•••• 1120",
      nickname: "Savings Split",
      email: "ari@example.com",
    },
  ],
  cards: [
    {
      id: "card-1",
      accountId: demoBankingProfile.checkingAccount.id,
      cardName: "Everyday Card",
      last4: "7742",
      expiry: "09/28",
      status: "active",
      spendingLimit: 5000,
      monthlySpent: 1420,
      network: "Visa",
    },
    {
      id: "card-2",
      accountId: "acct-investment",
      cardName: "Portfolio Virtual",
      last4: "2156",
      expiry: "03/29",
      status: "active",
      spendingLimit: 12000,
      monthlySpent: 0,
      network: "Mastercard",
    },
  ],
  goals: [
    {
      id: "goal-1",
      name: "Emergency Fund",
      targetAmount: 30000,
      currentAmount: 24890.45,
      deadline: "2026-12-31",
      category: "Safety",
      color: "bg-blue-600",
    },
    {
      id: "goal-2",
      name: "Summer Trip",
      targetAmount: 8500,
      currentAmount: 4100,
      deadline: "2026-09-15",
      category: "Travel",
      color: "bg-emerald-500",
    },
    {
      id: "goal-3",
      name: "New Studio Setup",
      targetAmount: 6200,
      currentAmount: 3800,
      deadline: "2026-08-30",
      category: "Business",
      color: "bg-amber-500",
    },
  ],
  fixedDeposits: [
    {
      id: "fd-1",
      accountId: demoBankingProfile.checkingAccount.id,
      title: "12-Month Growth Deposit",
      principal: 12000,
      rate: 7.4,
      tenorMonths: 12,
      maturityDate: "2027-06-12",
      projectedReturn: 12888,
      status: "active",
    },
    {
      id: "fd-2",
      accountId: "acct-investment",
      title: "6-Month Liquidity Reserve",
      principal: 18000,
      rate: 5.1,
      tenorMonths: 6,
      maturityDate: "2026-12-01",
      projectedReturn: 18459,
      status: "maturing",
    },
  ],
  loan: {
    amount: 25000,
    tenureMonths: 36,
    annualRate: 11.4,
  },
  bills: [
    {
      id: "bill-1",
      name: "FiberWave Internet",
      category: "Utilities",
      amount: 88,
      dueDate: "2026-06-24",
      accountId: demoBankingProfile.checkingAccount.id,
      status: "due",
    },
    {
      id: "bill-2",
      name: "Rent Payment",
      category: "Rent",
      amount: 2100,
      dueDate: "2026-06-28",
      accountId: demoBankingProfile.checkingAccount.id,
      status: "due",
    },
    {
      id: "bill-3",
      name: "horizon Music",
      category: "Streaming",
      amount: 12.99,
      dueDate: "2026-06-18",
      accountId: "acct-investment",
      status: "paid",
    },
  ],
  budgets: [
    {
      id: "budget-1",
      category: "Food and Drink",
      limit: 1200,
      spent: 864,
      color: "bg-blue-600",
    },
    {
      id: "budget-2",
      category: "Transport",
      limit: 500,
      spent: 220,
      color: "bg-emerald-500",
    },
    {
      id: "budget-3",
      category: "Bills",
      limit: 2900,
      spent: 2280,
      color: "bg-amber-500",
    },
  ],
  notifications: [
    {
      id: "notif-1",
      title: "Deposit received",
      body: "A teller deposit was posted to Checking Account.",
      time: "10 minutes ago",
      read: false,
      tone: "success",
    },
    {
      id: "notif-2",
      title: "Card limit warning",
      body: "Portfolio Virtual is at 0% of monthly spending limit.",
      time: "1 hour ago",
      read: false,
      tone: "warning",
    },
    {
      id: "notif-3",
      title: "Statement ready",
      body: "Your June statement can be generated instantly from the app.",
      time: "Today",
      read: true,
      tone: "info",
    },
  ],
  messages: [
    {
      id: "msg-1",
      subject: "Card dispute update",
      lastMessage: "Our support team confirmed a provisional credit.",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: "msg-2",
      subject: "Goal coaching",
      lastMessage: "You are on track to finish the Summer Trip goal early.",
      time: "3 hours ago",
      unread: false,
    },
  ],
  security: {
    biometric: true,
    pin: true,
    twoFactor: true,
    trustedDevices: 2,
    alerts: true,
  },
  exchangeRates: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    NGN: 1525,
    CAD: 1.37,
  },
  connectedInstitutions: ["horizon Bank", "Northwind Credit", "Metro Savings"],
};

const safeClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
function encodeId(value: string) {
  return value;
}

export const createDefaultState = (): BankingState => safeClone(initialState);

export const getReadableState = (): BankingState => {
  if (typeof window === "undefined") return createDefaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    return { ...createDefaultState(), ...JSON.parse(raw) };
  } catch {
    return createDefaultState();
  }
};

export const persistState = (nextState: BankingState) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

export const updateState = (
  updater: (current: BankingState) => BankingState,
) => {
  const nextState = updater(getReadableState());
  persistState(nextState);
  return nextState;
};

export const resetState = () => {
  const nextState = createDefaultState();
  persistState(nextState);
  return nextState;
};

const appendTransaction = (
  state: BankingState,
  transaction: horizonTransaction,
): BankingState => ({
  ...state,
  transactions: [transaction, ...state.transactions],
});

const createNotification = (
  title: string,
  body: string,
  tone: NotificationItem["tone"] = "info",
): NotificationItem => ({
  id: `${title}-${Date.now()}`,
  title,
  body,
  time: "Just now",
  read: false,
  tone,
});

const normalizeTransaction = (
  transaction: TransactionCreate,
): horizonTransaction => {
  const stamp = Date.now();
  const transactionIdentity = transaction as Partial<
    Pick<horizonTransaction, "id" | "$id" | "$createdAt">
  >;

  return {
    ...transaction,
    id: transactionIdentity.id || `tx-${stamp}`,
    $id: transactionIdentity.$id || `tx-${stamp}`,
    $createdAt:
      transactionIdentity.$createdAt || new Date(transaction.date).toISOString(),
  };
};

export const bankingActions = {
  signIn: (payload: { email: string; password: string }) =>
    updateState((state) => ({
      ...state,
      user: {
        ...state.user,
        email: payload.email,
        name: state.user.name,
      },
    })),
  updateUser: (patch: UserPatch) =>
    updateState((state) => ({
      ...state,
      user: {
        ...state.user,
        ...patch,
        name:
          patch.name ||
          `${patch.firstName || state.user.firstName} ${patch.lastName || state.user.lastName}`,
      },
    })),
  updateAccount: (accountId: string, patch: AccountPatch) =>
    updateState((state) => ({
      ...state,
      accounts: state.accounts.map((account) =>
        account.appwriteItemId === accountId
          ? {
              ...account,
              ...patch,
            }
          : account,
      ),
    })),
  updateTransaction: (transactionId: string, patch: TransactionPatch) =>
    updateState((state) => ({
      ...state,
      transactions: state.transactions.map((transaction) =>
        transaction.id === transactionId || transaction.$id === transactionId
          ? {
              ...transaction,
              ...patch,
            }
          : transaction,
      ),
    })),
  addTransaction: (transaction: TransactionCreate) =>
    updateState((state) => {
      const nextTransaction = normalizeTransaction(transaction);
      const accountDelta =
        nextTransaction.type === "credit"
          ? nextTransaction.amount
          : -nextTransaction.amount;
      const nextAccounts = state.accounts.map((account) =>
        account.appwriteItemId === nextTransaction.accountId
          ? {
              ...account,
              currentBalance: Number(
                (
                  transaction.balanceAfter ??
                  account.currentBalance + accountDelta
                ).toFixed(2),
              ),
              availableBalance: Number(
                (
                  transaction.balanceAfter ??
                  account.availableBalance + accountDelta
                ).toFixed(2),
              ),
            }
          : account,
      );

      return {
        ...appendTransaction(state, nextTransaction),
        accounts: nextAccounts,
        notifications: [
          createNotification(
            "Transaction added",
            `${transaction.name} was added to the ledger.`,
            transaction.type === "credit" ? "success" : "info",
          ),
          ...state.notifications,
        ],
      };
    }),
  removeTransaction: (transactionId: string) =>
    updateState((state) => ({
      ...state,
      transactions: state.transactions.filter(
        (transaction) =>
          transaction.id !== transactionId && transaction.$id !== transactionId,
      ),
    })),
  signUp: (payload: SignUpParams & { firstName: string; lastName: string }) =>
    updateState((state) => {
      const nextUser: User = {
        ...state.user,
        $id: `user-${Date.now()}`,
        userId: `user-${Date.now()}`,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: `${payload.firstName} ${payload.lastName}`,
        address1: payload.address1,
        city: payload.city,
        state: payload.state,
        postalCode: payload.postalCode,
        dateOfBirth: payload.dateOfBirth,
        ssn: payload.ssn,
        dwollaCustomerId: `customer-${Date.now()}`,
        dwollaCustomerUrl: `local://customer/${Date.now()}`,
      };

      return {
        ...state,
        user: nextUser,
      };
    }),
  logout: () =>
    updateState((state) => ({
      ...state,
      user: createDefaultState().user,
    })),
  connectBank: (institutionName = "Connected horizon Bank") =>
    updateState((state) => {
      const nextIndex = state.accounts.length + 1;
      const newAccount: horizonAccount = {
        id: `acct-connected-${nextIndex}`,
        appwriteItemId: `acct-connected-${nextIndex}`,
        name: `${institutionName} ${nextIndex}`,
        officialName: `${institutionName} Digital Account`,
        mask: `${1000 + nextIndex}`,
        institutionId: `institution-${nextIndex}`,
        type: "depository",
        subtype: "checking",
        accountKind: "Current",
        currentBalance: 3120 + nextIndex * 425,
        availableBalance: 2900 + nextIndex * 395,
        interestRate: 1.1,
        shareableId: encodeId(`acct-connected-${nextIndex}`),
        institution: institutionName,
        status: "linked",
      };

      return {
        ...state,
        accounts: [...state.accounts, newAccount],
        connectedInstitutions: [
          ...state.connectedInstitutions,
          institutionName,
        ],
        notifications: [
          createNotification(
            "Bank connected",
            `${newAccount.name} is now available in your dashboard.`,
            "success",
          ),
          ...state.notifications,
        ],
      };
    }),
  addBeneficiary: (beneficiary: Omit<Beneficiary, "id">) =>
    updateState((state) => ({
      ...state,
      beneficiaries: [
        { id: `beneficiary-${Date.now()}`, ...beneficiary },
        ...state.beneficiaries,
      ],
    })),
  transfer: (payload: TransferSimulation) =>
    updateState((state) => {
      const sourceAccount = state.accounts.find(
        (account) => account.appwriteItemId === payload.accountId,
      );

      if (!sourceAccount) return state;

      const debit = {
        ...sourceAccount,
        currentBalance: Number(
          (sourceAccount.currentBalance - payload.amount).toFixed(2),
        ),
        availableBalance: Number(
          (sourceAccount.availableBalance - payload.amount).toFixed(2),
        ),
      };

      const tx: horizonTransaction = {
        id: `tx-${Date.now()}`,
        $id: `tx-${Date.now()}`,
        $createdAt: new Date().toISOString(),
        name: payload.note || `Transfer to ${payload.destinationLabel}`,
        paymentChannel: "online",
        type: "debit",
        accountId: sourceAccount.appwriteItemId,
        amount: payload.amount,
        pending: false,
        category: "Transfer",
        date: new Date().toISOString(),
        image: "",
        method: "transfer",
        merchant: payload.destinationLabel,
        note: payload.note,
        accountName: sourceAccount.name,
        senderBankId: sourceAccount.appwriteItemId,
        receiverBankId: payload.beneficiaryId || payload.destinationLabel,
      };

      const updatedAccounts = state.accounts.map((account) =>
        account.appwriteItemId === sourceAccount.appwriteItemId
          ? debit
          : account,
      );

      return {
        ...appendTransaction(state, tx),
        accounts: updatedAccounts,
        notifications: [
          createNotification(
            "Transfer sent",
            `${formatAmount(payload.amount)} moved from ${sourceAccount.name} to ${payload.destinationLabel}.`,
            "success",
          ),
          ...state.notifications,
        ],
      };
    }),
  payBill: (billId: string, accountId: string) =>
    updateState((state) => {
      const bill = state.bills.find((item) => item.id === billId);
      const account = state.accounts.find(
        (item) => item.appwriteItemId === accountId,
      );

      if (!bill || !account || bill.status === "paid") return state;

      const nextAccount = {
        ...account,
        currentBalance: Number(
          (account.currentBalance - bill.amount).toFixed(2),
        ),
        availableBalance: Number(
          (account.availableBalance - bill.amount).toFixed(2),
        ),
      };

      const updatedBills = state.bills.map((item) =>
        item.id === billId ? { ...item, status: "paid" as const } : item,
      );

      const tx: horizonTransaction = {
        id: `tx-bill-${Date.now()}`,
        $id: `tx-bill-${Date.now()}`,
        $createdAt: new Date().toISOString(),
        name: bill.name,
        paymentChannel: "online",
        type: "debit",
        accountId,
        amount: bill.amount,
        pending: false,
        category: bill.category,
        date: new Date().toISOString(),
        image: "",
        method: "bill",
        merchant: bill.name,
        accountName: account.name,
      };

      return {
        ...appendTransaction(
          {
            ...state,
            accounts: state.accounts.map((item) =>
              item.appwriteItemId === accountId ? nextAccount : item,
            ),
            bills: updatedBills,
          },
          tx,
        ),
        notifications: [
          createNotification(
            "Bill paid",
            `${bill.name} has been settled from ${account.name}.`,
            "success",
          ),
          ...state.notifications,
        ],
      };
    }),
  purchaseAirtime: (accountId: string, provider: string, amount: number) =>
    updateState((state) => {
      const account = state.accounts.find(
        (item) => item.appwriteItemId === accountId,
      );
      if (!account) return state;

      const nextAccount = {
        ...account,
        currentBalance: Number((account.currentBalance - amount).toFixed(2)),
        availableBalance: Number(
          (account.availableBalance - amount).toFixed(2),
        ),
      };

      const tx: horizonTransaction = {
        id: `tx-airtime-${Date.now()}`,
        $id: `tx-airtime-${Date.now()}`,
        $createdAt: new Date().toISOString(),
        name: `${provider} airtime`,
        paymentChannel: "wallet",
        type: "debit",
        accountId,
        amount,
        pending: false,
        category: "Payment",
        date: new Date().toISOString(),
        image: "",
        method: "airtime",
        merchant: provider,
        accountName: account.name,
      };

      return {
        ...appendTransaction(
          {
            ...state,
            accounts: state.accounts.map((item) =>
              item.appwriteItemId === accountId ? nextAccount : item,
            ),
          },
          tx,
        ),
        notifications: [
          createNotification(
            "Top up completed",
            `${provider} airtime purchased successfully.`,
            "success",
          ),
          ...state.notifications,
        ],
      };
    }),
  updateGoal: (goalId: string, delta: number) =>
    updateState((state) => ({
      ...state,
      goals: state.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentAmount: Number(
                Math.min(goal.targetAmount, goal.currentAmount + delta).toFixed(
                  2,
                ),
              ),
            }
          : goal,
      ),
    })),
  openFixedDeposit: (
    accountId: string,
    principal: number,
    tenorMonths: number,
  ) =>
    updateState((state) => {
      const account = state.accounts.find(
        (item) => item.appwriteItemId === accountId,
      );
      if (!account) return state;

      const rate = tenorMonths >= 12 ? 7.2 : 5.8;
      const projectedReturn = Number(
        (principal * (1 + (rate / 100) * (tenorMonths / 12))).toFixed(2),
      );
      const nextDeposit: FixedDeposit = {
        id: `fd-${Date.now()}`,
        accountId,
        title: `${tenorMonths}-Month Auto-Renew`,
        principal,
        rate,
        tenorMonths,
        maturityDate: new Date(
          Date.now() + tenorMonths * 30 * 24 * 60 * 60 * 1000,
        ).toISOString(),
        projectedReturn,
        status: "active",
      };

      return {
        ...state,
        fixedDeposits: [nextDeposit, ...state.fixedDeposits],
        notifications: [
          createNotification(
            "Fixed deposit started",
            `${formatAmount(principal)} is locked for ${tenorMonths} months at ${rate}% p.a.`,
            "success",
          ),
          ...state.notifications,
        ],
      };
    }),
  updateLoan: (amount: number, tenureMonths: number, annualRate: number) =>
    updateState((state) => ({
      ...state,
      loan: {
        amount,
        tenureMonths,
        annualRate,
      },
    })),
  toggleCard: (cardId: string) =>
    updateState((state) => ({
      ...state,
      cards: state.cards.map((card) =>
        card.id === cardId
          ? { ...card, status: card.status === "active" ? "frozen" : "active" }
          : card,
      ),
    })),
  toggleSecurity: (key: keyof SecuritySettings) =>
    updateState((state) => ({
      ...state,
      security: {
        ...state.security,
        [key]: !state.security[key],
      },
    })),
  sendMessage: (subject: string, body: string) =>
    updateState((state) => ({
      ...state,
      messages: [
        {
          id: `msg-${Date.now()}`,
          subject,
          lastMessage: body,
          time: "Just now",
          unread: true,
        },
        ...state.messages,
      ],
      notifications: [
        createNotification("Support message sent", subject, "info"),
        ...state.notifications,
      ],
    })),
  markNotificationRead: (notificationId: string) =>
    updateState((state) => ({
      ...state,
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    })),
  generateStatement: (periodLabel = "Last 30 days"): StatementResult => {
    const state = getReadableState();
    const totalCredits = state.transactions
      .filter((transaction) => transaction.type === "credit")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalDebits = state.transactions
      .filter((transaction) => transaction.type === "debit")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      statementId: `stmt-${Date.now()}`,
      periodLabel,
      summary: `${state.user.firstName} generated a mock statement with ${state.transactions.length} transactions.`,
      totalCredits,
      totalDebits,
      generatedAt: formatDateTime(new Date()).dateTime,
      downloadName: `horizon-statement-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`,
    };
  },
};

export const formatLoanPayment = (
  amount: number,
  annualRate: number,
  tenureMonths: number,
) => {
  const months = Math.max(1, tenureMonths);
  const monthlyRate = annualRate / 100 / 12;
  const payment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Number.isFinite(payment) ? payment : amount / months;
};

export const convertCurrency = (
  amount: number,
  from: keyof BankingState["exchangeRates"],
  to: keyof BankingState["exchangeRates"],
  rates: BankingState["exchangeRates"],
) => {
  const usdAmount = amount / rates[from];
  return Number((usdAmount * rates[to]).toFixed(2));
};

export const getAccountSummary = (accounts: horizonAccount[]) => {
  const totalCurrentBalance = accounts.reduce(
    (sum, account) => sum + account.currentBalance,
    0,
  );
  const totalAvailableBalance = accounts.reduce(
    (sum, account) => sum + account.availableBalance,
    0,
  );
  const averageInterestRate =
    accounts.reduce((sum, account) => sum + account.interestRate, 0) /
    Math.max(1, accounts.length);

  return {
    totalBanks: accounts.length,
    totalCurrentBalance,
    totalAvailableBalance,
    averageInterestRate: Number(averageInterestRate.toFixed(2)),
  };
};
