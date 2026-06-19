export default function Loading() {
  return (
    <main className="flex min-h-screen w-full justify-between bg-white px-6 py-10">
      <section className="mx-auto flex w-full max-w-[420px] flex-col justify-center gap-6 animate-pulse">
        <div className="h-8 w-36 rounded-full bg-slate-200" />
        <div className="h-10 w-3/4 rounded-full bg-slate-200" />
        <div className="h-10 w-full rounded-full bg-slate-100" />
        <div className="space-y-4 pt-4">
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
          <div className="h-12 rounded-xl bg-slate-100" />
        </div>
        <div className="h-12 rounded-xl bg-slate-200" />
      </section>
      <aside className="hidden flex-1 items-center justify-center lg:flex">
        <div className="h-[70vh] w-[44vw] rounded-[36px] bg-[radial-gradient(circle_at_top,#161c4d,#070916_70%)]" />
      </aside>
    </main>
  );
}
