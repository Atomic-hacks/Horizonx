import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { BankingProvider } from "@/components/banking-provider";

export const metadata: Metadata = {
  title: "Northstar Financial Demo",
  description:
    "Northstar Financial Demo is a local-only banking experience with account insights, transactions, cards, and payment workflows.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-gray-50 font-inter text-gray-900 antialiased">
        <BankingProvider>{children}</BankingProvider>
      </body>
    </html>
  );
}
