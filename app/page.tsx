import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn, formatAmount } from "@/lib/utils";

const features = [
  {
    title: "Cashback that compounds",
    body: "Automatic smart rewards on spending categories that matter to small teams and founders.",
  },
  {
    title: "Fast transfers with context",
    body: "Move money between Horizon accounts, beneficiaries, or bills with a polished, guided flow.",
  },
  {
    title: "Secure by default",
    body: "Biometric, PIN, 2FA, trusted device, and live alert controls sit where users expect them.",
  },
  {
    title: "Smarter money visibility",
    body: "Spend tracking, goals, deposits, and statements are surfaced in the same clean language.",
  },
];

const stats = [
  ["24/7 support", "Email, chat, and guided messaging built into the horizon."],
  [
    "Instant setup",
    "Sign in, connect a horizon bank, and move around immediately.",
  ],
  [
    "Multi-account",
    "Savings, current, and business accounts ready out of the box.",
  ],
];

const showcaseCards = [
  {
    title: "Rewards flow",
    value: "2.1% cashback",
    tone: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    title: "Business spend",
    value: formatAmount(18240),
    tone: "from-slate-900 via-indigo-900 to-slate-800",
  },
  {
    title: "Savings goal",
    value: "84% funded",
    tone: "from-emerald-500 via-teal-500 to-cyan-500",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f5f7ff] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/logo.svg" width={30} height={30} alt="Horizon" />
            <span className="text-18 font-semibold tracking-tight text-slate-900">
              Horizon
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-14 text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-900">
              Features
            </a>
            <a href="#story" className="transition hover:text-slate-900">
              Product
            </a>
            <a href="#support" className="transition hover:text-slate-900">
              Support
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="rounded-full px-4 text-slate-700"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-slate-950 px-5 text-white hover:bg-slate-800"
            >
              <Link href="/sign-up">Join Horizon</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1b1f5e_0%,#0b1026_36%,#070916_72%)]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_center,#7c5cff66,transparent_62%)] blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="mx-auto max-w-4xl text-center text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-12 uppercase tracking-[0.28em] text-white/75">
              Modern money platform
            </div>
            <h1 className="font-ibm-plex-serif text-5xl leading-[1.02] tracking-tight text-white md:text-7xl">
              More cash back,
              <br />
              less financial drag.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-16 leading-7 text-white/72 md:text-18">
              Horizon helps teams manage accounts, transfers, cards, deposits,
              goals, and support in one calm banking experience.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                className="rounded-full bg-violet-500 px-6 py-6 text-white shadow-[0_20px_60px_rgba(120,88,255,0.45)] hover:bg-violet-400"
              >
                <Link href="/sign-up">Start free horizon</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="rounded-full border border-white/15 bg-white/10 px-6 py-6 text-white hover:bg-white/15"
              >
                <Link href="/sign-in">See horizon login</Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-12 uppercase tracking-[0.24em] text-white/50">
                    Business account
                  </p>
                  <p className="mt-2 text-30 font-semibold text-white">
                    {formatAmount(42850.24)}
                  </p>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-4 py-2 text-14 text-emerald-200">
                  +{formatAmount(1820)} this week
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {showcaseCards.map((card) => (
                  <div
                    key={card.title}
                    className={cn(
                      "rounded-3xl bg-gradient-to-br p-5 text-white shadow-xl",
                      card.tone,
                    )}
                  >
                    <p className="text-12 uppercase tracking-[0.25em] text-white/70">
                      {card.title}
                    </p>
                    <p className="mt-7 text-24 font-semibold">{card.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[28px] border border-white/10 bg-slate-950/35 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-14 text-white/70">Latest transfer</p>
                  <p className="text-12 text-white/50">2 min ago</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-16 font-medium text-white">Maya Chen</p>
                    <p className="text-14 text-white/60">Rent beneficiary</p>
                  </div>
                  <p className="text-24 font-semibold text-white">
                    -{formatAmount(1250)}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 text-white backdrop-blur-2xl">
                <p className="text-12 uppercase tracking-[0.25em] text-white/50">
                  Spend insights
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    ["Food and drink", 72],
                    ["Transport", 48],
                    ["Bills", 91],
                  ].map(([label, value]) => (
                    <div key={label as string}>
                      <div className="flex items-center justify-between text-14">
                        <span>{label as string}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10">
                        <div
                          className="h-2 rounded-full bg-violet-400"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-12 uppercase tracking-[0.22em] text-slate-500">
                      Rewards
                    </p>
                    <p className="mt-2 text-24 font-semibold text-slate-950">
                      {formatAmount(258)}
                    </p>
                  </div>
                  <div className="rounded-full bg-violet-100 px-4 py-2 text-14 text-violet-700">
                    +18% this month
                  </div>
                </div>
                <p className="mt-4 text-14 leading-6 text-slate-600">
                  Smart reward logic, transfer nudges, and support hints are all
                  handled locally in the horizon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-8 border-t border-slate-200 bg-[#f5f7ff]">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <div className="grid gap-3 rounded-[28px] border border-white bg-white px-5 py-4 shadow-sm md:grid-cols-3">
            {stats.map(([title, body]) => (
              <div key={title} className="flex items-start gap-4">
                <div className="mt-1 size-2 rounded-full bg-violet-500" />
                <div>
                  <p className="font-medium text-slate-900">{title}</p>
                  <p className="mt-1 text-14 leading-6 text-slate-600">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-12 uppercase tracking-[0.24em] text-violet-600">
            Built for calm finance
          </p>
          <h2 className="mt-4 font-ibm-plex-serif text-4xl tracking-tight text-slate-950 md:text-5xl">
            Everything you need to feel in control.
          </h2>
          <p className="mt-4 text-16 leading-7 text-slate-600">
            A homepage that feels premium, an auth flow that feels real, and a
            horizon experience that stays fast and fully frontend-only.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
            >
              <div className="mb-6 size-11 rounded-2xl bg-[linear-gradient(135deg,#7c5cff,#b46dff)] shadow-[0_12px_30px_rgba(124,92,255,0.35)]" />
              <h3 className="text-20 font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-14 leading-6 text-slate-600">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="story" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="grid gap-8 rounded-[36px] bg-slate-950 px-6 py-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.35)] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-12 uppercase tracking-[0.24em] text-white/45">
              How it feels
            </p>
            <h2 className="mt-4 font-ibm-plex-serif text-4xl tracking-tight md:text-5xl">
              Fast enough to trust, soft enough to enjoy.
            </h2>
            <p className="mt-4 max-w-xl text-16 leading-7 text-white/70">
              The app keeps the banking horizon grounded with loading states,
              success states, and enough subtle variation that it reads like a
              product instead of a checklist.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Loading states between pages and actions",
                "Prefilled horizon credentials for quick access",
                "Local persistence so activity survives refreshes",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-14 text-white/75"
                >
                  <span className="size-2 rounded-full bg-violet-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Virtual cards", "Freeze, unfreeze, and monitor spend limits."],
              ["Support", "Message the help desk from inside the app."],
              ["Statements", "Generate believable PDF-style summaries."],
              ["Security", "Toggle biometric, PIN, and 2FA settings."],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <p className="text-18 font-semibold text-white">{title}</p>
                <p className="mt-3 text-14 leading-6 text-white/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-[36px] border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.05)] lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-12 uppercase tracking-[0.24em] text-violet-600">
                Available now
              </p>
              <h2 className="mt-4 font-ibm-plex-serif text-4xl tracking-tight text-slate-950">
                Ready to explore the horizon?
              </h2>
              <p className="mt-4 max-w-2xl text-16 leading-7 text-slate-600">
                Sign in with the horizon credentials or create a fresh horizon
                user. Everything runs locally in the browser for now.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-slate-950 px-6 py-6 text-white hover:bg-slate-800"
              >
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6 py-6"
              >
                <Link href="/sign-up">Create account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
