"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useBanking } from "@/components/banking-provider";
import AdminDashboardPage from "@/components/AdminDashboardPage";

export default function AdminPage() {
  const router = useRouter();
  const { state } = useBanking();

  useEffect(() => {
    if (!state.auth.isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [router, state.auth.isAuthenticated]);

  if (!state.auth.isAuthenticated) {
    return null;
  }

  return <AdminDashboardPage />;
}
