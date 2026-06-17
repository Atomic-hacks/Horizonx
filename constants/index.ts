export const sidebarLinks = [
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
    route: "/my-banks",
    label: "Accounts",
  },
  {
    imgURL: "/icons/transaction.svg",
    route: "/transaction-history",
    label: "Activity",
  },
  {
    imgURL: "/icons/money-send.svg",
    route: "/payment-transfer",
    label: "Payments",
  },
  {
    imgURL: "/icons/deposit.svg",
    route: "/bill-pay-direct-deposit",
    label: "Bill Pay / Direct Deposit",
  },
  {
    imgURL: "/icons/edit.svg",
    route: "/admin",
    label: "Admin",
  },
];

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
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const transactionCategoryStyles = {
  "Food and Drink": {
    borderColor: "border-pink-600",
    backgroundColor: "bg-pink-500",
    textColor: "text-pink-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-success-600",
    backgroundColor: "bg-green-600",
    textColor: "text-success-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
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
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bill Pay": {
    borderColor: "border-amber-600",
    backgroundColor: "bg-amber-600",
    textColor: "text-amber-700",
    chipBackgroundColor: "bg-inherit",
  },
  Processing: {
    borderColor: "border-[#F2F4F7]",
    backgroundColor: "bg-gray-500",
    textColor: "text-[#344054]",
    chipBackgroundColor: "bg-[#F2F4F7]",
  },
  Success: {
    borderColor: "border-[#12B76A]",
    backgroundColor: "bg-[#12B76A]",
    textColor: "text-[#027A48]",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-[#0047AB]",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
