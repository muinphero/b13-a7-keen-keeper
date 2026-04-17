export default function Loading() {
  return (
    <section
      className="space-y-8"
      aria-label="Loading content"
      aria-busy="true"
    >
      <div className="surface-card px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#1f5a49] border-r-[#1f5a49]" />
            <div className="h-6 w-6 rounded-full bg-emerald-50" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            Loading your friendship dashboard
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            We&apos;re preparing your friends, recent activity, and summary stats.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="surface-card animate-pulse p-6">
            <div className="h-8 w-16 rounded-xl bg-slate-200" />
            <div className="mt-3 h-4 w-28 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="surface-card animate-pulse p-5">
            <div className="mx-auto h-14 w-14 rounded-full bg-slate-200" />
            <div className="mx-auto mt-4 h-5 w-32 rounded-full bg-slate-200" />
            <div className="mx-auto mt-2 h-3 w-20 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
