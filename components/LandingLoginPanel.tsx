"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBanking } from "@/components/banking-provider";

const demoEmail = "milana.vayntrub@horizon.demo";
const demoPassword = "horizon123";

const LandingLoginPanel = () => {
  const router = useRouter();
  const { actions } = useBanking();
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    actions.signIn({ email, password });
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/dashboard");
    setIsSigningIn(false);
  };

  return (
    <div className="rounded-2xl border border-[#d8d8d8] bg-white p-5 shadow-sm self-start">
      <div className="space-y-4">
        <div>
          <label className="text-[12px] font-semibold text-slate-700 block mb-1">
            Email
          </label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-9 rounded-sm border-[#9a9a9a] text-[13px]"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="text-[12px] font-semibold text-slate-700 block mb-1">
            Password
          </label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="h-9 rounded-sm border-[#9a9a9a] text-[13px]"
            placeholder="Enter password"
          />
        </div>
        <label className="flex items-center gap-2 text-[12px] text-slate-700 cursor-pointer">
          <input type="checkbox" className="rounded" defaultChecked />
          Save user ID
        </label>
        <Button
          type="button"
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="w-full bg-[#012169] hover:bg-[#011550] text-white font-bold text-[14px] py-2.5 rounded-sm transition"
        >
          {isSigningIn ? "Signing in..." : "Log in"}
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#0066cc]">
        <a href="#demo-credentials" className="hover:underline">
          Demo credentials
        </a>
        <Link href="/admin" className="hover:underline">
          Admin dashboard
        </Link>
        <Link href="/sign-up" className="hover:underline">
          Enroll
        </Link>
      </div>
      <hr className="my-4 border-[#d8d8d8]" />
      <div
        id="demo-credentials"
        className="rounded-md border border-blue-100 bg-blue-25 p-3 text-[12px] text-blue-900"
      >
        <p className="font-semibold">Demo login</p>
        <p className="mt-1">Email: {demoEmail}</p>
        <p>Password: {demoPassword}</p>
      </div>
    </div>
  );
};

export default LandingLoginPanel;
