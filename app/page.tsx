import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/utils";
import LandingLoginPanel from "@/components/LandingLoginPanel";

// ── icons (inline SVGs to avoid extra deps) ──────────────────────────────────
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);
const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const BellIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const DollarIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const TrendIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const CalendarIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const PhoneIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const HelpIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const MobileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

// ── data ──────────────────────────────────────────────────────────────────────
const primaryNav = [
  "Checking",
  "Savings & CDs",
  "Credit Cards",
  "Home Loans",
  "Auto Loans",
  "Smart Investing",
  "Better Money Habits®",
];

const cardOffers = [
  {
    rate: "6%",
    label: "cash back offer",
    sub: "No annual fee",
    badge: null,
    img: "/card1.webp",
  },
  {
    rate: "2%",
    label: "cash back offer",
    sub: "No annual fee",
    badge: null,
    img: "/card2.webp",
  },
  {
    rate: "1.5x",
    label: "points for every $1",
    sub: "No annual fee",
    badge: null,
    img: "/card3.webp",
  },
  {
    rate: "0%",
    label: "intro APR offer",
    sub: "No annual fee",
    badge: "NEW OFFER",
    img: "/card4.webp",
  },
];

const cashOffers = [
  { amount: "$100", label: "cash offer" },
  { amount: "$300", label: "cash offer" },
  { amount: "$500", label: "cash offer" },
];

const features = [
  {
    icon: <TrendIcon />,
    title: "6% customized cash back",
    body: "Earn more cash back in the category of your choice with the Customized Cash Rewards card.",
    cta: "Apply now",
    accent: true,
  },
  {
    icon: <DollarIcon />,
    title: "Cash offer up to $500",
    body: "Check out this cash offer for new checking customers.",
    cta: "See details",
    accent: false,
  },
  {
    icon: <BellIcon />,
    title: "Custom mobile alerts",
    body: "With our Mobile Banking app alerts, prioritize what you see based on what matters most.",
    cta: "Get the app",
    accent: false,
  },
  {
    icon: <ShieldIcon />,
    title: "Solutions built around you",
    body: "We provide the tools, people and know-how to help you pursue your financial goals.",
    cta: "Get started",
    accent: false,
  },
];

const articles = [
  {
    title: "How does a home equity line of credit work—and how can it help?",
    img: "https://placehold.co/280x160/e8eaf0/4a5568?text=HELOC+Guide",
  },
  {
    title: "8 common bank fees—and how to avoid them",
    img: "https://placehold.co/280x160/e8eaf0/4a5568?text=Bank+Fees",
  },
  {
    title: "What is a certificate of deposit (CD) and how does it work?",
    img: "https://placehold.co/280x160/e8eaf0/4a5568?text=CD+Guide",
  },
  {
    title:
      "Retrain your brain for savings success with these money-saving challenges",
    img: "https://placehold.co/280x160/e8eaf0/4a5568?text=Savings+Tips",
  },
];

const connectLinks = [
  { icon: <CalendarIcon />, label: "Schedule an appointment" },
  { icon: <LocationIcon />, label: "Find a location" },
  { icon: <PhoneIcon />, label: "Contact us" },
  { icon: <HelpIcon />, label: "Help center" },
];

const footerLinks = [
  [
    "Locations",
    "Contact Us",
    "Help & Support",
    "Browse with Specialist",
    "Accessible Banking",
  ],
  [
    "Privacy",
    "Children's Privacy",
    "Security",
    "Online Banking Service Agreement",
  ],
  [
    "AdChoices",
    "Your Privacy Choices",
    "Site Map",
    "Careers",
    "Share Your Feedback",
  ],
];

// ── page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ── 1. FDIC top strip ────────────────────────────────────────────── */}
      <div className="bg-[#f2f2f2] border-b border-[#d8d8d8] text-[11px] text-slate-600 py-1 px-4 text-center">
        bank deposit products:&nbsp;
        <span className="font-bold text-[#006b35] border border-[#006b35] px-1 py-0.5 text-[10px] mr-1">
          FDIC
        </span>
        Insured · Backed by the full faith and credit bank U.S.S
      </div>

      {/* ── 2. Utility nav ───────────────────────────────────────────────── */}
      <div className="border-b border-[#d8d8d8] bg-white">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-9 text-[12px]">
          <div className="flex gap-1">
            {[
              "Personal",
              "Wealth Management",
              "Business",
              "Corporations & Institutions",
            ].map((item, i) => (
              <button
                key={item}
                className={`px-3 h-9 border-b-2 transition ${
                  i === 0
                    ? "border-[#e31837] text-[#e31837] font-semibold"
                    : "border-transparent text-slate-700 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-600">
            {[
              "Security",
              "About Us",
              "🌐 En español",
              "Contact Us",
              "Help",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:underline hover:text-slate-900"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Logo + Search ─────────────────────────────────────────────── */}
      <div className="border-b border-[#d8d8d8] bg-white">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            {/* Wordmark logo */}
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-bold text-slate-900 ml-1 tracking-tight">
                <img src="/logo.svg" alt="logo" className="h-5" />
              </span>
            </div>
          </Link>

          <div className="flex items-center border border-[#9a9a9a] rounded h-8 overflow-hidden w-56">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-3 text-[13px] outline-none h-full"
            />
            <button className="px-2.5 h-full bg-[#f2f2f2] border-l border-[#9a9a9a] text-slate-600 hover:bg-[#e8e8e8]">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Primary product nav ───────────────────────────────────────── */}
      <div className="border-b border-[#d8d8d8] bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center overflow-x-auto gap-0 text-[13px] font-medium">
            {primaryNav.map((item) => (
              <a
                key={item}
                href="#"
                className="whitespace-nowrap px-4 py-3 border-b-2 border-transparent text-[#012169] hover:border-[#e31837] hover:text-slate-900 transition flex items-center gap-1"
              >
                {item} <ChevronDown />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. Hero: Login (left) + Card offers (right) ──────────────────── */}
      <section className="bg-[#f2f2f2]">
        <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
          {/* Login panel */}
          <LandingLoginPanel />

          {/* Card offers showcase */}
          <div className="bg-[#012169] text-white px-8 py-6">
            <h2 className="text-[20px] font-bold text-center mb-6">
              Choose the card that works for you
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cardOffers.map((card, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  {card.badge && (
                    <div className="text-[9px] bg-[#c41230] text-white px-2 py-0.5 font-bold mb-1 tracking-wider">
                      {card.badge}
                    </div>
                  )}
                  <div className="text-[32px] font-black text-white leading-none">
                    {card.rate}
                  </div>
                  <div className="text-[11px] text-red-200 mt-1">
                    {card.label}
                  </div>
                  <div className="text-[11px] text-red-300 mt-0.5">
                    {card.sub}
                  </div>
                  {/* Card preview */}

                  <img src={card.img} alt="" className="h-24" />
                  <button className="mt-3 w-full border border-white text-white text-[11px] py-1.5 hover:bg-white hover:text-[#012169] transition rounded-sm font-semibold">
                    {i === 3
                      ? "Intro APR offer for 21 billing cycles"
                      : `$${i === 0 ? "200" : "200"} online bonus offer`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Promo banner ──────────────────────────────────────────────── */}
      <div className="border-y border-[#f4b400] bg-[#fff9e6]">
        <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[13px]">
            <span className="text-[#f4b400] text-xl">💰</span>
            <span className="font-bold">CASH OFFER UP TO $500</span>
            <span className="text-slate-700">
              for new checking customers&nbsp;
            </span>
            <a
              href="#"
              className="text-[#0066cc] font-semibold hover:underline"
            >
              See details &rsaquo;
            </a>
          </div>
          <button className="text-slate-500 hover:text-slate-700 text-xl leading-none">
            ×
          </button>
        </div>
      </div>

      {/* ── 7. New checking offers + editorial ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cash offer tiers */}
        <div className="bg-[#f2f2f2] border border-[#d8d8d8] rounded-sm p-5">
          <div className="text-[11px] text-[#0066cc] font-bold uppercase tracking-wider mb-1">
            New Checking Customers
          </div>
          <p className="text-[13px] text-[#c41230] font-bold mb-3">
            Cash offer up to $500
          </p>
          <p className="text-[12px] text-slate-600 mb-4">
            Start by opening a new eligible checking account.
          </p>
          <div className="space-y-2">
            {cashOffers.map((offer, i) => (
              <div key={i} className="flex items-baseline gap-2">
                <span
                  className={`font-black text-slate-900 ${i === 2 ? "text-[36px]" : i === 1 ? "text-[28px]" : "text-[22px]"}`}
                >
                  {offer.amount}
                </span>
                <span className="text-[12px] text-slate-600">
                  {offer.label}
                </span>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-4 inline-block text-[12px] text-[#0066cc] hover:underline font-semibold"
          >
            See details
          </a>
        </div>

        {/* Center editorial */}
        <div className="col-span-1 flex flex-col justify-between gap-4">
          <div className="bg-white border border-[#d8d8d8] rounded-sm p-5 flex-1">
            <div className="text-[16px] font-bold text-slate-900 mb-2">
              Change the game
            </div>
            <p className="text-[13px] text-slate-600 leading-5">
              bank champions everyone who dares to ask — what would you like the
              power to do?
            </p>
            <a
              href="#"
              className="mt-3 inline-block text-[12px] text-[#0066cc] hover:underline font-semibold"
            >
              Learn more
            </a>
          </div>
          <div className="bg-[#012169] text-white rounded-sm p-5 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold">bank for Business</div>
              <div className="text-[12px] text-red-200 mt-1">
                Tools built for teams and founders
              </div>
            </div>
            <div className="text-3xl">🏢</div>
          </div>
        </div>

        {/* Right editorial stat */}
        <div className="bg-white border border-[#d8d8d8] rounded-sm p-5 flex flex-col justify-between">
          <div>
            <div className="text-[32px] font-black text-slate-900">
              {formatAmount(42850)}
            </div>
            <div className="text-[12px] text-slate-500 mt-1">
              Average business account balance
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[12px] text-slate-700">
            {[
              "Multi-account management",
              "Instant domestic transfers",
              "Smart cashback rewards",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-[#006b35] font-bold">✓</span> {item}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full border-2 border-[#012169] text-[#012169] font-bold text-[13px] py-2 hover:bg-[#012169] hover:text-white transition rounded-sm">
            Open an account
          </button>
        </div>
      </section>

      {/* ── 8. 4-column feature grid ─────────────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-[#f2f2f2]">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col">
              <div
                className={`mb-3 ${f.accent ? "text-[#c41230]" : "text-[#012169]"}`}
              >
                {f.icon}
              </div>
              <div
                className={`text-[14px] font-bold mb-2 ${f.accent ? "text-[#c41230]" : "text-slate-900"}`}
              >
                {f.title}
              </div>
              <p className="text-[12px] text-slate-600 leading-5 flex-1">
                {f.body}
              </p>
              <a
                href="#"
                className="mt-3 text-[12px] text-[#0066cc] hover:underline font-semibold"
              >
                {f.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Financial goals / education ───────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-[22px] font-bold text-slate-900 text-center mb-1">
            Your financial goals matter
          </h2>
          <p className="text-[13px] text-slate-600 text-center mb-8 max-w-2xl mx-auto">
            We can help you achieve them through Better Money Habits® financial
            education and programs that make communities stronger.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {articles.map((a) => (
              <a
                key={a.title}
                href="#"
                className="group block border border-[#d8d8d8] hover:border-[#9a9a9a] transition rounded-sm overflow-hidden bg-white"
              >
                <div className="h-32 bg-[#e8eaf0] overflow-hidden">
                  <img
                    src={a.img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="text-[12px] text-[#0066cc] leading-4 group-hover:underline">
                    {a.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-[13px] text-slate-600 mb-3">
              Explore more topics and build your financial know-how.
            </p>
            <button className="bg-[#012169] text-white text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#011550] transition">
              Visit Better Money Habits®
            </button>
          </div>
        </div>
      </section>

      {/* ── 10. News / Security ──────────────────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-[#f2f2f2]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-[20px] font-bold text-slate-900 mb-6">
            Your news and information
          </h2>
          <div className="bg-white border border-[#d8d8d8] rounded-sm p-6 flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-slate-900 mb-2">
                Level up your account security
              </h3>
              <p className="text-[13px] text-slate-600 leading-5 max-w-lg">
                Watch your security meter rise as you take action to help
                protect against fraud. See it in the Security Center in Mobile
                and Online Banking.
              </p>
              <button className="mt-4 bg-[#c41230] text-white text-[13px] font-bold px-5 py-2 rounded-full hover:bg-[#a00e26] transition">
                Check your level
              </button>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center bg-[#012169] rounded-xl p-4 min-w-[120px]">
              <ShieldIcon />
              <div className="text-white text-[11px] mt-2 font-semibold text-center">
                Advanced
                <br />
                Security
              </div>
              <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                <div className="bg-[#00d26a] h-2 rounded-full w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Mobile app CTA ───────────────────────────────────────────── */}
      <section className="bg-[#012169] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MobileIcon />
              <h2 className="text-[20px] font-bold">
                Convenient banking with our Mobile app
              </h2>
            </div>
            <p className="text-[13px] text-red-200 max-w-md leading-5">
              Check balances, transfer funds, pay bills, and deposit checks—all
              from your phone.
            </p>
            <button className="mt-5 border-2 border-white text-white font-bold text-[13px] px-6 py-2.5 rounded-full hover:bg-white hover:text-[#012169] transition">
              Explore our app
            </button>
          </div>
          {/* Mobile device preview */}
          <div className="hidden md:block bg-white/10 border border-white/20 rounded-[20px] p-4 w-48">
            <div className="bg-white rounded-xl p-3">
              <div className="text-[9px] text-[#012169] font-bold mb-2">
                bank BANK
              </div>
              <div className="text-[8px] text-slate-500 mb-1">Accounts</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="bg-[#f2f2f2] rounded p-1.5">
                  <div className="text-[7px] text-slate-500">Checking</div>
                  <div className="text-[10px] font-bold text-slate-900">
                    {formatAmount(4000)}
                  </div>
                </div>
                <div className="bg-[#f2f2f2] rounded p-1.5">
                  <div className="text-[7px] text-slate-500">Savings</div>
                  <div className="text-[10px] font-bold text-slate-900">
                    {formatAmount(2543)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. Connect with us ──────────────────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h2 className="text-[20px] font-bold text-slate-900 text-center mb-8">
            Connect with us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {connectLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className="flex flex-col items-center gap-3 border border-[#d8d8d8] rounded-sm py-6 px-4 hover:border-[#012169] hover:shadow-md transition text-center group"
              >
                <span className="text-[#012169] group-hover:text-[#c41230] transition">
                  {link.icon}
                </span>
                <span className="text-[12px] text-[#0066cc] font-semibold group-hover:underline">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. Regulatory disclaimer table ─────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-[#f2f2f2]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-[11px] text-slate-500 mb-3">
            Investment and insurance products:
          </p>
          <div className="border border-[#d8d8d8] bg-white text-[11px] text-slate-700">
            <div className="grid grid-cols-3 divide-x divide-[#d8d8d8]">
              {[
                "Are Not FDIC Insured",
                "Are Not Bank Guaranteed",
                "May Lose Value",
              ].map((cell) => (
                <div key={cell} className="px-4 py-2 text-center">
                  {cell}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 divide-x divide-[#d8d8d8] border-t border-[#d8d8d8]">
              {[
                "Are Not Deposits",
                "Are Not Insured by Any Federal Government Agency",
                "Are Not a Condition to Any Banking Service or Activity",
              ].map((cell) => (
                <div key={cell} className="px-4 py-2 text-center">
                  {cell}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 14. Legal body copy ──────────────────────────────────────────── */}
      <section className="border-t border-[#d8d8d8] bg-[#f2f2f2]">
        <div className="mx-auto max-w-7xl px-4 py-6 space-y-3 text-[11px] text-slate-500 leading-5">
          <a
            href="#"
            className="text-[#0066cc] hover:underline block font-semibold mb-2"
          >
            Online Banking Service Agreement
          </a>
          <p>
            Investing in securities involves risks, and there is always the
            potential of losing money when you invest in securities. Review any
            planned financial transactions that may have tax or legal
            implications with your personal tax or legal advisor.
          </p>
          <p>
            Securities products are offered by bank Investment Services, a
            registered broker-dealer, registered investment adviser, and a
            wholly-owned subsidiary of bank Corporation. Bank of America makes
            available certain investment products sponsored, managed,
            distributed or distributed by companies that are affiliates of bank
            Corporation.
          </p>
          <p>
            Banking, credit card, automobile loans, mortgage and home equity
            products are provided by bank Bank, N.A. and affiliated banks.
            Members FDIC and wholly owned subsidiaries of bank Corporation.
            Credit and collateral are subject to approval. Terms and conditions
            apply. This is not a commitment to lend. Programs, rates, terms and
            conditions are subject to change without notice.
          </p>
        </div>
      </section>

      {/* ── 15. Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#d8d8d8] bg-[#012169] text-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-red-200 mb-4">
            {footerLinks.flat().map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white hover:underline"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-red-300">
            <p>
              bank Bank, N.A. Member FDIC · Equal Housing Lender · © 2026 bank
              Corporation. All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-red-200">
              {["f", "ig", "in", "yt"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-7 h-7 border border-white/20 rounded-full flex items-center justify-center text-[10px] hover:bg-white/10 transition"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
