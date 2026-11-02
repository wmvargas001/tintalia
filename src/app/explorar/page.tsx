import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PartnerCover } from "@/components/partner-cover";
import { SiteHeader } from "@/components/site-header";
import { StarRating } from "@/components/star-rating";
import { PAGE_SIZE, searchPartnerBooks } from "@/lib/open-library";

export const metadata: Metadata = {
  title: "Explorar libros — Tintalia",
  description:
    "Consulta fichas y sinopsis de millones de libros del catálogo aliado.",
};

const suggestions = [
  "Gabriel García Márquez",
  "Rayuela",
  "Isabel Allende",
  "Pedro Páramo",
  "Mario Vargas Llosa",
  "Laura Restrepo",
];

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; pagina?: string }>;
}) {
  const { q, pagina } = await searchParams;
  const query = q?.trim() ?? "";
  const page = Math.max(1, Number.parseInt(pagina ?? "1", 10) || 1);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <section className="border-b border-brand-100/80 bg-gradient-to-b from-brand-50 via-paper to-paper dark:border-brand-900/60 dark:from-brand-950 dark:via-ink dark:to-ink">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
            <span className="h-px w-8 bg-brand-300 dark:bg-brand-700" />
            Catálogo aliado
          </p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-[1.08] text-stone-900 sm:text-5xl dark:text-stone-50">
            Encuentra cualquier libro y lee de qué se trata
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
            Busca por título, autor o ISBN en un catálogo de millones de obras
            y consulta su sinopsis antes de comprar.
          </p>

          <form action="/explorar" className="mt-8 flex max-w-xl gap-2">
            <label htmlFor="q" className="sr-only">
              Buscar libros
            </label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Título, autor o ISBN"
              required
              className="min-w-0 flex-1 rounded-full border border-stone-300 bg-white px-5 py-3.5 text-[15px] text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50 dark:placeholder:text-stone-500 dark:focus:border-brand-400 dark:focus:ring-brand-900/60"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-700 px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-lg active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500"
            >
              Buscar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Prueba con:
            </span>
            {suggestions.map((suggestion) => (
              <Link
                key={suggestion}
                href={`/explorar?q=${encodeURIComponent(suggestion)}`}
                className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium text-stone-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-stone-700 dark:text-stone-400 dark:hover:border-brand-700 dark:hover:text-brand-300"
              >
                {suggestion}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-14">
        {query ? (
          <Suspense key={`${query}-${page}`} fallback={<ResultsSkeleton />}>
            <Results query={query} page={page} />
          </Suspense>
        ) : (
          <EmptyState
            title="¿Qué quieres leer hoy?"
            message="Escribe un título o un autor para ver resultados con portada, calificación y sinopsis."
          />
        )}
      </main>
    </div>
  );
}

async function Results({ query, page }: { query: string; page: number }) {
  let result;
  try {
    result = await searchPartnerBooks(query, page);
  } catch {
    return (
      <EmptyState
        title="El catálogo aliado no responde"
        message="No pudimos consultar Open Library en este momento. Intenta de nuevo en unos minutos."
      />
    );
  }

  const { total, books } = result;
  if (books.length === 0) {
    return (
      <EmptyState
        title={`Sin resultados para “${query}”`}
        message="Revisa la ortografía o prueba solo con el apellido del autor."
      />
    );
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-5 dark:border-stone-800">
        <h2 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Resultados para “{query}”
        </h2>
        <p className="text-sm tabular-nums text-stone-500 dark:text-stone-400">
          {total.toLocaleString("es-CO")} obras
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {books.map((book, index) => (
          <li key={book.workId}>
            <Link href={`/explorar/${book.workId}`} className="group block">
              <PartnerCover
                coverId={book.coverId}
                title={book.title}
                author={book.authors[0]}
                width={180}
                height={270}
                priority={index < 4}
              />
              <div className="mt-4">
                <h3 className="line-clamp-2 font-serif text-[17px] font-semibold leading-snug text-stone-900 transition-colors group-hover:text-brand-700 dark:text-stone-50 dark:group-hover:text-brand-300">
                  {book.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-sm text-stone-500 dark:text-stone-400">
                  {book.authors.join(", ") || "Autor desconocido"}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400">
                  {book.rating ? (
                    <StarRating
                      rating={book.rating}
                      reviewCount={book.ratingCount}
                    />
                  ) : null}
                  {book.firstPublishYear && (
                    <span className="tabular-nums">{book.firstPublishYear}</span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <nav
          aria-label="Paginación"
          className="mt-14 flex items-center justify-center gap-3 text-sm"
        >
          {page > 1 && (
            <PageLink query={query} page={page - 1}>
              ← Anterior
            </PageLink>
          )}
          <span className="tabular-nums text-stone-500 dark:text-stone-400">
            Página {page} de {totalPages.toLocaleString("es-CO")}
          </span>
          {page < totalPages && (
            <PageLink query={query} page={page + 1}>
              Siguiente →
            </PageLink>
          )}
        </nav>
      )}
    </>
  );
}

function PageLink({
  query,
  page,
  children,
}: {
  query: string;
  page: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/explorar?q=${encodeURIComponent(query)}&pagina=${page}`}
      className="rounded-full border border-stone-300 px-4 py-2 font-medium text-stone-700 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-brand-700 dark:hover:text-brand-300"
    >
      {children}
    </Link>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <p className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
        {title}
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {message}
      </p>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Buscando libros">
      <div className="mb-8 h-[61px] border-b border-stone-200 dark:border-stone-800">
        <div className="h-7 w-64 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-[2/3] animate-pulse rounded-[3px] bg-stone-200 dark:bg-stone-800" />
            <div className="mt-4 h-4 w-4/5 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
