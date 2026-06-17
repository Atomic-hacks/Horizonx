import Image from "next/image";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between bg-white font-inter">
      {children}
      <div className="relative hidden min-h-screen w-full overflow-hidden rounded-l-[36px] bg-[radial-gradient(circle_at_top,#171c4f_0%,#090c1d_62%)] lg:flex lg:w-[48%]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,92,255,0.35),transparent_36%),radial-gradient(circle_at_40%_75%,rgba(81,207,255,0.25),transparent_28%)]" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-start px-12 py-16 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-12 uppercase tracking-[0.24em] text-white/60">
            Private horizon workspace
          </div>
          <h2 className="mt-8 max-w-xl font-ibm-plex-serif text-5xl leading-tight tracking-tight">
            A banking experience that feels calm from the first click.
          </h2>
          <p className="mt-5 max-w-lg text-16 leading-7 text-white/70">
            Sign in with the horizon profile, explore the dashboard, and keep
            all banking activity local to your browser for now.
          </p>

          <div className="mt-10 grid w-full max-w-2xl gap-4 md:grid-cols-3">
            {[
              ["1 tap", "Quick login"],
              ["Local only", "No backend needed"],
              ["Live feel", "Smooth loading states"],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/10 bg-white/8 p-4 backdrop-blur-xl"
              >
                <p className="text-18 font-semibold">{title}</p>
                <p className="mt-1 text-14 text-white/60">{subtitle}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/6 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <Image
              src="/icons/auth-image.svg"
              alt="Auth illustration"
              width={560}
              height={560}
              className="h-auto w-full rounded-[24px] object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
