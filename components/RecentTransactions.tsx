"use client";

import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { Pagination } from './Pagination'

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
  onTransactionSelect,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;

  return (
    <section className="recent-transactions m-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn w-fit"
        >
          View all
        </Link>
      </header>

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => {
          const accountTransactions = transactions.filter(
            (transaction) => transaction.accountId === account.appwriteItemId
          ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          const totalPages = Math.ceil(accountTransactions.length / rowsPerPage);
          const currentPage = Math.min(page, Math.max(1, totalPages));
          const indexOfLastTransaction = currentPage * rowsPerPage;
          const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
          const currentTransactions = accountTransactions.slice(
            indexOfFirstTransaction,
            indexOfLastTransaction
          );

          return (
            <TabsContent
              value={account.appwriteItemId}
              key={account.id}
              className="space-y-4"
            >
              <BankInfo
                account={account}
                appwriteItemId={appwriteItemId}
                type="full"
              />

              <TransactionsTable
                transactions={currentTransactions}
                onTransactionSelect={onTransactionSelect}
              />

              {totalPages > 1 && (
                <div className="my-4 w-full">
                  <Pagination totalPages={totalPages} page={currentPage} />
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  )
}

export default RecentTransactions
