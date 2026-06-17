import { formatAmount, formatDateTime } from "./utils";

export type AccountKind = "Savings" | "Current" | "Business";

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
  email: "horizon@horizon.bank",
  userId: "horizon-user",
  dwollaCustomerUrl: "",
  dwollaCustomerId: "horizon-customer",
  firstName: "Jordan",
  lastName: "Okafor",
  name: "Jordan Okafor",
  address1: "124 Crescent Road",
  city: "Austin",
  state: "TX",
  postalCode: "78701",
  dateOfBirth: "1990-04-22",
  ssn: "1234",
};

const bankAccounts: horizonAccount[] = [
  {
    id: "acct-savings",
    appwriteItemId: "acct-savings",
    name: "Horizon Savings",
    officialName: "Horizon Digital Savings",
    mask: "4821",
    institutionId: "horizon-bank",
    type: "depository",
    subtype: "savings",
    accountKind: "Savings",
    currentBalance: 24890.45,
    availableBalance: 24010.45,
    interestRate: 4.25,
    shareableId: encodeId("acct-savings"),
    institution: "Horizon Bank",
    status: "active",
  },
  {
    id: "acct-current",
    appwriteItemId: "acct-current",
    name: "Horizon Current",
    officialName: "Everyday Spending",
    mask: "1054",
    institutionId: "horizon-bank",
    type: "depository",
    subtype: "checking",
    accountKind: "Current",
    currentBalance: 8640.15,
    availableBalance: 7890.15,
    interestRate: 0.75,
    shareableId: encodeId("acct-current"),
    institution: "Horizon Bank",
    status: "active",
  },
  {
    id: "acct-business",
    appwriteItemId: "acct-business",
    name: "Horizon Business",
    officialName: "Business Operating Account",
    mask: "7740",
    institutionId: "horizon-bank",
    type: "credit",
    subtype: "business",
    accountKind: "Business",
    currentBalance: 50240.7,
    availableBalance: 49750.7,
    interestRate: 2.1,
    shareableId: encodeId("acct-business"),
    institution: "Horizon Bank",
    status: "linked",
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
    accountId: "acct-current",
    accountName: "Horizon Current",
    name: "Starbucks Reserve",
    amount: 18.95,
    paymentChannel: "card",
    type: "debit",
    category: "Food and Drink",
    date: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    method: "card",
    merchant: "Starbucks",
    minutesAgo: 45,
  }),
  makeTx({
    accountId: "acct-savings",
    accountName: "Horizon Savings",
    name: "Salary Deposit",
    amount: 6200,
    paymentChannel: "bank",
    type: "credit",
    category: "Payment",
    date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    method: "bank",
    merchant: "Northwind Payroll",
    minutesAgo: 480,
  }),
  makeTx({
    accountId: "acct-business",
    accountName: "Horizon Business",
    name: "Cloud Hosting",
    amount: 149.5,
    paymentChannel: "online",
    type: "debit",
    category: "Processing",
    date: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
    method: "wallet",
    merchant: "Render",
    minutesAgo: 1140,
  }),
  makeTx({
    accountId: "acct-current",
    accountName: "Horizon Current",
    name: "RideShare Trip",
    amount: 22.1,
    paymentChannel: "card",
    type: "debit",
    category: "Travel",
    date: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    method: "card",
    merchant: "Bolt",
    minutesAgo: 1800,
  }),
  makeTx({
    accountId: "acct-current",
    accountName: "Horizon Current",
    name: "Internet Bill",
    amount: 88,
    paymentChannel: "bank",
    type: "debit",
    category: "Bank Fees",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    method: "bill",
    merchant: "FiberWave",
    minutesAgo: 4320,
  }),
  makeTx({
    accountId: "acct-savings",
    accountName: "Horizon Savings",
    name: "Internal Transfer",
    amount: 500,
    paymentChannel: "online",
    type: "credit",
    category: "Transfer",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    method: "transfer",
    merchant: "Transfer",
    note: "Top up for emergency fund",
    minutesAgo: 7200,
  }),
  makeTx({
    accountId: "acct-business",
    accountName: "Horizon Business",
    name: "Client Refund",
    amount: 400,
    paymentChannel: "online",
    type: "debit",
    category: "Transfer",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    method: "transfer",
    merchant: "Acme Studio",
    minutesAgo: 8640,
  }),
  makeTx({
    accountId: "acct-savings",
    accountName: "Horizon Savings",
    name: "Interest Credit",
    amount: 26.41,
    paymentChannel: "bank",
    type: "credit",
    category: "Payment",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    method: "bank",
    merchant: "Horizon Bank",
    minutesAgo: 10080,
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
      bank: "Horizon Bank",
      accountNumber: "•••• 1120",
      nickname: "Savings Split",
      email: "ari@example.com",
    },
  ],
  cards: [
    {
      id: "card-1",
      accountId: "acct-current",
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
      accountId: "acct-business",
      cardName: "Business Virtual",
      last4: "2156",
      expiry: "03/29",
      status: "active",
      spendingLimit: 12000,
      monthlySpent: 5340,
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
      accountId: "acct-savings",
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
      accountId: "acct-business",
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
      accountId: "acct-current",
      status: "due",
    },
    {
      id: "bill-2",
      name: "Rent Payment",
      category: "Rent",
      amount: 2100,
      dueDate: "2026-06-28",
      accountId: "acct-current",
      status: "due",
    },
    {
      id: "bill-3",
      name: "Horizon Music",
      category: "Streaming",
      amount: 12.99,
      dueDate: "2026-06-18",
      accountId: "acct-business",
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
      title: "Salary received",
      body: "Your recurring salary landed in Horizon Savings.",
      time: "10 minutes ago",
      read: false,
      tone: "success",
    },
    {
      id: "notif-2",
      title: "Card limit warning",
      body: "Business Virtual is at 44% of monthly spending limit.",
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
  connectedInstitutions: ["Horizon Bank", "Northwind Credit", "Metro Savings"],
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
