"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatAmount, formatDateTime } from "@/lib/utils";

type TransactionDetailsSheetProps = {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TransactionDetailsSheet = ({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(92vw,30rem)] border-l border-gray-200 bg-white px-0 py-0 sm:max-w-xl"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-gray-100 px-6 py-5 text-left">
            <SheetTitle className="text-24 font-semibold text-gray-900">
              Transaction details
            </SheetTitle>
            <SheetDescription className="text-14 text-gray-600">
              Minimal posted transaction information for the selected record.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 px-6 py-6">
            {transaction ? (
              <>
                <div className="rounded-[28px] bg-gray-50 p-5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                    Title
                  </p>
                  <p className="mt-2 text-20 font-semibold text-gray-900">
                    {transaction.name}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                      Amount
                    </p>
                    <p
                      className={`mt-2 text-20 font-semibold ${
                        transaction.type === "debit" ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {transaction.type === "debit"
                        ? `-${formatAmount(transaction.amount)}`
                        : formatAmount(transaction.amount)}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                      Date
                    </p>
                    <p className="mt-2 text-16 font-semibold text-gray-900">
                      {formatDateTime(new Date(transaction.date)).dateOnly}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-12 uppercase tracking-[0.2em] text-gray-500">
                    Status
                  </p>
                  <p className="mt-2 text-16 font-semibold text-gray-900">
                    Posted
                  </p>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
                Select a transaction to inspect the details.
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            <Button variant="secondary" className="w-full" onClick={() => onOpenChange(false)}>
              Close details
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailsSheet;
