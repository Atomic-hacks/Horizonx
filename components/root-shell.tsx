"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import BottomNav from "@/components/BottomNav";
import { useBanking } from "./banking-provider";

export default function RootShell({ children }: { children: ReactNode }) {
  const { state } = useBanking();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!state.auth.isAuthenticated && pathname !== "/sign-in") {
      router.replace("/sign-in");
    }
  }, [pathname, router, state.auth.isAuthenticated]);

  if (!state.auth.isAuthenticated && pathname !== "/sign-in") {
    return null;
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden font-inter">
      <div className="flex min-w-0 size-full flex-col pb-28 sm:pb-32">
        <div className="root-layout">
          <div className="flex items-center gap-3">
            <img src="/icons/logo.svg" className="h-10" alt="logo" />
            <p className="text-16 font-semibold text-black-1">Northstar</p>
          </div>
        </div>
        {children}
      </div>

      <BottomNav user={state.user} />
    </main>
  );
}
