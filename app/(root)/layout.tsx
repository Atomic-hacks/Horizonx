import type { ReactNode } from "react";
import RootShell from "@/components/root-shell";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <RootShell>{children}</RootShell>;
}
