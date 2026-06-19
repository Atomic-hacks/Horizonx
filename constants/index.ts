export const primaryNavLinks = [
  {
    imgURL: "/icons/home.svg",
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: "/icons/credit-card.svg",
    route: "/cards",
    label: "Cards",
  },
  {
    imgURL: "/icons/dollar-circle.svg",
    route: "/bill-pay-direct-deposit",
    label: "Bill Pay / Direct Deposit",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Activity",
  },
];

export const moreNavLinks = [
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Payments",
  },
  {
    imgURL: "/icons/deposit.svg",
    route: "/my-banks",
    label: "Institutions",
  },
];

export const sidebarLinks = [...primaryNavLinks, ...moreNavLinks];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-indigo-100",
    circleBg: "bg-indigo-100",
    text: {
      main: "text-indigo-900",
      count: "text-indigo-700",
    },
    progress: {
      bg: "bg-indigo-100",
      indicator: "bg-indigo-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-gray-50",
    circleBg: "bg-gray-100",
    text: {
      main: "text-gray-900",
      count: "text-gray-700",
    },
    progress: {
      bg: "bg-gray-100",
      indicator: "bg-gray-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-blue-600",
    backgroundColor: "bg-blue-600",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-slate-500",
    backgroundColor: "bg-slate-500",
    textColor: "text-slate-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-amber-600",
    backgroundColor: "bg-amber-600",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-indigo-600",
    backgroundColor: "bg-indigo-600",
    textColor: "text-indigo-700",
    chipBackgroundColor: "bg-inherit",
  },
  Posted: {
    borderColor: "border-emerald-600",
    backgroundColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    chipBackgroundColor: "bg-inherit",
  },
  Deposit: {
    borderColor: "border-emerald-600",
    backgroundColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    chipBackgroundColor: "bg-inherit",
  },
  Withdrawal: {
    borderColor: "border-amber-600",
    backgroundColor: "bg-amber-600",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bill Pay": {
    borderColor: "border-slate-600",
    backgroundColor: "bg-slate-600",
    textColor: "text-slate-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-emerald-600",
    backgroundColor: "bg-emerald-600",
    textColor: "text-emerald-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-indigo-600",
    backgroundColor: "bg-indigo-600",
    textColor: "text-indigo-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-slate-600",
    textColor: "text-slate-700",
    chipBackgroundColor: "bg-inherit",
  },
};
