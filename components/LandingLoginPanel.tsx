"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBanking } from "@/components/banking-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LandingLoginPanel = () => {
  const router = useRouter();
  const { actions } = useBanking();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setError("");
    const isAuthorized = actions.signIn({ email, password });
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (isAuthorized) {
      router.push("/dashboard");
    } else {
      setError("Access is limited to the approved account.");
    }
    setIsSigningIn(false);
  };

  return (
    <div className="self-start rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Email
          </label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-full border-gray-200 text-[13px]"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="mb-1 block text-[12px] font-semibold text-slate-700">
            Password
          </label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="h-11 rounded-full border-gray-200 text-[13px]"
            placeholder="Enter password"
          />
        </div>
        <Button
          type="button"
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="w-full rounded-full bg-[linear-gradient(135deg,#0f172a_0%,#155e75_100%)] py-3 font-semibold text-white"
        >
          {isSigningIn ? "Signing in..." : "Sign in"}
        </Button>
        {error && (
          <p className="text-12 font-medium text-rose-700">
            {error}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-500">
        <Link href="/sign-in" className="hover:text-slate-900 hover:underline">
          Access details
        </Link>
        <span>Approved credentials only</span>
      </div>
    </div>
  );
};

export default LandingLoginPanel;
