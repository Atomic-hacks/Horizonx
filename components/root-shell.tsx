"use client";


import type { ReactNode } from "react";

import BottomNav from "@/components/BottomNav";
import { useBanking } from "./banking-provider";

export default function RootShell({ children }: { children: ReactNode }) {
  const { state } = useBanking();

  return (
    <main className="min-h-screen w-full overflow-x-hidden font-inter">
      <div className="flex min-w-0 size-full flex-col pb-28 sm:pb-32">
        <div className="root-layout">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" className="h-4" alt="logo" />
            <p className="text-16 font-semibold text-black-1">bank</p>
          </div>
        </div>
        {children}
      </div>

      <BottomNav user={state.user} />
    </main>
  );
}
