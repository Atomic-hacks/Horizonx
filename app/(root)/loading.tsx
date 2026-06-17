export default function Loading() {
  return (
    <main className="flex h-screen w-full bg-gray-50">
      <aside className="hidden w-[355px] border-r border-gray-200 bg-white p-6 xl:flex">
        <div className="w-full animate-pulse space-y-4">
          <div className="h-8 w-32 rounded-full bg-gray-200" />
          <div className="h-14 rounded-2xl bg-gray-100" />
          <div className="h-14 rounded-2xl bg-gray-100" />
          <div className="h-14 rounded-2xl bg-gray-100" />
          <div className="mt-8 h-40 rounded-[28px] bg-gray-100" />
        </div>
      </aside>
      <section className="flex-1 overflow-hidden p-6 lg:p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-20 rounded-[28px] bg-white" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 rounded-[28px] bg-white" />
            ))}
          </div>
          <div className="h-[440px] rounded-[28px] bg-white" />
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="h-72 rounded-[28px] bg-white" />
            <div className="h-72 rounded-[28px] bg-white" />
          </div>
        </div>
      </section>
    </main>
  );
}
