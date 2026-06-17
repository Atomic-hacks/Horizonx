"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { useBanking } from "./banking-provider";

export default function RootShell({
  children,
}: {
  children: ReactNode;
}) {
  const { state } = useBanking();

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={state.user} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNav user={state.user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
