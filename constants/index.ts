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
    label: "Direct Deposit",
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
    label: "My Banks",
  },
  {
    imgURL: "/icons/edit.svg",
    route: "/admin",
    label: "Admin",
  },
];

export const sidebarLinks = [...primaryNavLinks, ...moreNavLinks];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-red-25",
    circleBg: "bg-red-100",
    text: {
      main: "text-red-900",
      count: "text-red-700",
    },
    progress: {
      bg: "bg-red-100",
      indicator: "bg-red-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-rose-25",
    circleBg: "bg-rose-100",
    text: {
      main: "text-rose-900",
      count: "text-rose-700",
    },
    progress: {
      bg: "bg-rose-100",
      indicator: "bg-rose-700",
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
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Payment: {
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-inherit",
  },
  "Bank Fees": {
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-inherit",
  },
  Transfer: {
    borderColor: "border-red-700",
    backgroundColor: "bg-red-700",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Posted: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
  Deposit: {
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
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
    borderColor: "border-red-600",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  Travel: {
    borderColor: "border-rose-600",
    backgroundColor: "bg-rose-600",
    textColor: "text-rose-700",
    chipBackgroundColor: "bg-[#ECFDF3]",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-red-600",
    textColor: "text-red-700",
    chipBackgroundColor: "bg-inherit",
  },
};
