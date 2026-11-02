import { SiteHeader } from "@/components/site-header";

export default function Loading() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />
      <main
        aria-busy="true"
        aria-label="Cargando ficha del libro"
        className="mx-auto max-w-4xl px-6 py-14"
      >
        <div className="mb-8 h-5 w-40 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[280px_1fr]">
          <div className="mx-auto aspect-[2/3] w-full max-w-[240px] animate-pulse rounded-[3px] bg-stone-200 sm:max-w-none dark:bg-stone-800" />
          <div className="flex flex-col gap-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="mt-6 space-y-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="h-4 animate-pulse rounded bg-stone-200 dark:bg-stone-800"
                  style={{ width: `${100 - (i % 3) * 12}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
