export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f7ff] px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="flex items-center justify-between rounded-full border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="h-8 w-28 rounded-full bg-slate-200" />
          <div className="hidden gap-3 md:flex">
            <div className="h-10 w-20 rounded-full bg-slate-200" />
            <div className="h-10 w-28 rounded-full bg-slate-200" />
          </div>
        </div>
        <div className="mt-8 rounded-[36px] bg-slate-950 p-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="mx-auto h-4 w-40 rounded-full bg-white/10" />
            <div className="mx-auto h-16 w-full max-w-4xl rounded-[24px] bg-white/10" />
            <div className="mx-auto h-6 w-4/5 rounded-full bg-white/10" />
            <div className="mx-auto flex justify-center gap-3 pt-4">
              <div className="h-11 w-36 rounded-full bg-white/10" />
              <div className="h-11 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 rounded-[28px] border border-slate-200 bg-white" />
          ))}
        </div>
      </div>
    </main>
  );
}
