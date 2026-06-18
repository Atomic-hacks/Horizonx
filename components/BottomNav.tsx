"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Footer from "@/components/Footer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { moreNavLinks, primaryNavLinks } from "@/constants";
import { cn } from "@/lib/utils";

const BottomNav = ({ user }: BottomNavProps) => {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-3 bottom-3 z-40 flex items-stretch gap-1 rounded-[28px] border border-gray-200 bg-white/95 p-2 shadow-creditCard backdrop-blur supports-[backdrop-filter]:bg-white/90 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:inset-x-6 sm:bottom-4 lg:left-1/2 lg:right-auto lg:w-[min(60rem,calc(100%-3rem))] lg:-translate-x-1/2"
    >
      <div className="grid flex-1 grid-cols-5 gap-1">
        {primaryNavLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex min-w-0 flex-col items-center justify-center rounded-2xl px-1 py-2 text-center transition-colors",
                isActive ? "bg-bank-gradient text-white shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative size-5">
                <Image
                  src={item.imgURL}
                  alt=""
                  fill
                  aria-hidden="true"
                  className={cn("object-contain", {
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <span className="truncate text-[11px] font-semibold leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open more routes"
              className={cn(
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-center transition-colors",
                moreNavLinks.some(
                  (item) =>
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`)
                )
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Menu className="size-5" />
              <span className="truncate text-[11px] font-semibold leading-none">
                More
              </span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="h-[min(82dvh,44rem)] overflow-y-auto rounded-t-[32px] border-gray-200 bg-gray-25 !p-0"
          >
            <div className="h-full overflow-y-auto px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 sm:px-6">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-12 uppercase tracking-[0.24em] text-gray-500">
                    More routes
                  </p>
                  <h2 className="mt-1 text-24 font-semibold text-gray-900">
                    Actions and settings
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {moreNavLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.label}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-4 transition-colors",
                          isActive
                            ? "border-bank-gradient bg-bank-gradient text-white shadow-sm"
                            : "hover:border-gray-300 hover:bg-gray-50"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="relative size-5 shrink-0">
                          <Image
                            src={item.imgURL}
                            alt=""
                            fill
                            aria-hidden="true"
                            className={cn("object-contain", {
                              "brightness-[3] invert-0": isActive,
                            })}
                          />
                        </div>
                        <span className="min-w-0 flex-1 text-left text-16 font-semibold">
                          {item.label}
                        </span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              <div className="mt-6 rounded-[28px] border border-gray-200 bg-white p-4 shadow-sm">
                <Footer user={user} type="mobile" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default BottomNav;
