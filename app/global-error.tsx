"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <p className="text-12 uppercase tracking-[0.3em] text-gray-500">
            Banking horizon error
          </p>
          <h1 className="mt-3 text-30 font-semibold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-3 text-16 text-gray-600">
            The frontend horizon hit an unexpected state. Reload the app or
            return to the dashboard to continue.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-bank-gradient px-5 py-3 text-white"
            >
              Go home
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full border border-gray-300 px-5 py-3 text-gray-700"
            >
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
