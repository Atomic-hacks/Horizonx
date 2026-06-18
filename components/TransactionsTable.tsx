"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactionCategoryStyles } from "@/constants"
import { cn, formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const {
    borderColor,
    backgroundColor,
    textColor,
    chipBackgroundColor,
   } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default
   
  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
} 

const TransactionsTable = ({
  transactions,
  onTransactionSelect,
  showBalanceAfter = true,
}: TransactionTableProps) => {
  return (
    <div className="w-full min-w-0">
      <div className="md:hidden space-y-3">
        {transactions.map((t: Transaction) => {
          const status = t.statusLabel || getTransactionStatus(new Date(t.date));
          const amount = formatAmount(t.amount);
          const isDebit = t.type === "debit";
          const isCredit = t.type === "credit";

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTransactionSelect?.(t)}
              className="w-full rounded-[24px] bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-14 font-semibold text-[#344054]">
                    {removeSpecialCharacters(t.name)}
                  </p>
                  {t.merchant && t.merchant !== t.name && (
                    <p className="mt-1 truncate text-12 text-gray-500">
                      {t.merchant}
                    </p>
                  )}
                  <p className="mt-1 text-12 capitalize text-gray-500">
                    {t.paymentChannel} · {t.category}
                  </p>
                </div>
                <p className={`text-14 font-semibold ${
                  isDebit || amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"
                }`}>
                  {isDebit ? `-${amount}` : amount}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <CategoryBadge category={status} />
                <CategoryBadge category={t.category} />
              </div>
              <p className="mt-3 text-12 text-gray-500">
                {formatDateTime(new Date(t.date)).dateTime}
              </p>
              {showBalanceAfter && t.balanceAfter !== undefined && (
                <p className="mt-1 text-12 font-medium text-gray-700">
                  Available balance: {formatAmount(t.balanceAfter)}
                </p>
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-2">Transaction</TableHead>
                <TableHead className="px-2">Amount</TableHead>
                <TableHead className="px-2">Balance after</TableHead>
                <TableHead className="px-2">Status</TableHead>
                <TableHead className="px-2">Date</TableHead>
                <TableHead className="px-2 max-md:hidden">Channel</TableHead>
                <TableHead className="px-2 max-md:hidden">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t: Transaction) => {
                const status = t.statusLabel || getTransactionStatus(new Date(t.date));
                const amount = formatAmount(t.amount);

                const isDebit = t.type === "debit";
                const isCredit = t.type === "credit";

                return (
                  <TableRow
                    key={t.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onTransactionSelect?.(t)}
                    className={`cursor-pointer transition hover:bg-gray-50 ${
                      isDebit || amount[0] === "-"
                        ? "bg-red-25/40"
                        : "bg-white"
                    } border-b border-gray-100`}
                  >
                    <TableCell className="max-w-[250px] pl-2 pr-10">
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <h1 className="truncate text-14 font-semibold text-[#344054]">
                            {removeSpecialCharacters(t.name)}
                          </h1>
                          {t.merchant && t.merchant !== t.name && (
                            <p className="truncate text-12 text-gray-500">
                              {t.merchant}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell
                      className={`pl-2 pr-10 font-semibold ${
                        isDebit || amount[0] === "-"
                          ? "text-[#f04438]"
                          : "text-[#039855]"
                      }`}
                    >
                      {isDebit ? `-${amount}` : isCredit ? amount : amount}
                    </TableCell>

                    <TableCell className="min-w-36 pl-2 pr-10 text-14 font-medium text-gray-700">
                      {t.balanceAfter !== undefined ? formatAmount(t.balanceAfter) : "—"}
                    </TableCell>

                    <TableCell className="pl-2 pr-10">
                      <CategoryBadge category={status} />
                    </TableCell>

                    <TableCell className="min-w-32 pl-2 pr-10">
                      {formatDateTime(new Date(t.date)).dateTime}
                    </TableCell>

                    <TableCell className="min-w-24 capitalize pl-2 pr-10">
                      {t.paymentChannel}
                    </TableCell>

                    <TableCell className="pl-2 pr-10 max-md:hidden">
                      <CategoryBadge category={t.category} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default TransactionsTable
