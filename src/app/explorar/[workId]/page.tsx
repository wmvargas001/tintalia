import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PartnerCover } from "@/components/partner-cover";
import { SiteHeader } from "@/components/site-header";
import { StarRating } from "@/components/star-rating";
import { getPartnerBook, partnerStoreUrl } from "@/lib/open-library";

export async function generateMetadata({
  params,
}: PageProps<"/explorar/[workId]">): Promise<Metadata> {
  const { workId } = await params;
  const book = await getPartnerBook(workId);
  return {
    title: book ? `${book.title} — Tintalia` : "Libro no encontrado — Tintalia",
    description: book?.synopsis?.slice(0, 160),
  };
}

export default async function PartnerBookPage({
  params,
}: PageProps<"/explorar/[workId]">) {
  const { workId } = await params;
  const book = await getPartnerBook(workId);

  if (!book) {
    notFound();
  }

  const author = book.authors[0];
  const paragraphs = book.synopsis?.split(/\n\s*\n/) ?? [];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-14">
        <Link
          href="/explorar"
          className="mb-8 inline-block text-sm text-stone-500 transition-colors hover:text-brand-700 dark:text-stone-400 dark:hover:text-brand-300"
        >
          ← Volver a la búsqueda
        </Link>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[280px_1fr]">
          <div className="group mx-auto w-full max-w-[240px] sm:max-w-none">
            <PartnerCover
              coverId={book.coverId}
              title={book.title}
              author={author}
              width={280}
              height={420}
              size="L"
              priority
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="mb-3 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-800/40 dark:text-brand-300">
                Catálogo aliado
              </span>
              <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-stone-900 dark:text-stone-50">
                {book.title}
              </h1>
              <p className="mt-2 text-[15px] text-stone-500 dark:text-stone-400">
                {book.authors.join(", ") || "Autor desconocido"}
                {book.firstPublishDate && ` · ${book.firstPublishDate}`}
              </p>
              {book.rating ? (
                <div className="mt-2">
                  <StarRating
                    rating={book.rating}
                    reviewCount={book.ratingCount}
                    size="md"
                  />
                </div>
              ) : null}
            </div>

            <section>
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                Sinopsis
              </h2>
              {paragraphs.length > 0 ? (
                <div className="max-w-prose space-y-4 text-[15px] leading-[1.75] text-stone-700 dark:text-stone-300">
                  {paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-[15px] italic text-stone-500 dark:text-stone-400">
                  Esta obra todavía no tiene sinopsis en el catálogo aliado.
                </p>
              )}
            </section>

            {book.subjects.length > 0 && (
              <section>
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                  Temas
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {book.subjects.map((subject) => (
                    <li key={subject}>
                      <Link
                        href={`/explorar?q=${encodeURIComponent(subject)}`}
                        className="inline-block rounded-full border border-stone-300 px-3 py-1 text-xs text-stone-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-stone-700 dark:text-stone-400 dark:hover:border-brand-700 dark:hover:text-brand-300"
                      >
                        {subject}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6 dark:border-stone-800">
              <a
                href={partnerStoreUrl(book.title, author)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand-700 px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.03] hover:bg-brand-600 hover:shadow-lg active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500"
              >
                Comprar con nuestro aliado ↗
              </a>
              <a
                href={`https://openlibrary.org/works/${book.workId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-500 underline-offset-4 hover:text-brand-700 hover:underline dark:text-stone-400 dark:hover:text-brand-300"
              >
                Ver en Open Library
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
