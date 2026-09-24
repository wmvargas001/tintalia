import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BookCover } from "@/components/book-cover";
import { SiteHeader } from "@/components/site-header";
import { StarRating } from "@/components/star-rating";
import { getBookBySlug } from "@/lib/books";
import { formatCOP } from "@/lib/format";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-14">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-stone-500 transition-colors hover:text-brand-700 dark:text-stone-400 dark:hover:text-brand-300"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[280px_1fr]">
          <div className="group">
            <BookCover
              src={book.coverUrl}
              alt={`Portada de ${book.title}`}
              width={280}
              height={420}
              priority
            />
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-800/40 dark:text-brand-300">
                  {book.category}
                </span>
                {book.bestseller && (
                  <span className="inline-block rounded-full bg-brand-700 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-brand-600">
                    Más vendido
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-stone-900 dark:text-stone-50">
                {book.title}
              </h1>
              <p className="mt-2 text-[15px] text-stone-500 dark:text-stone-400">
                {book.author}
              </p>
              <div className="mt-2">
                <StarRating
                  rating={book.rating}
                  reviewCount={book.reviewCount}
                  size="md"
                />
              </div>
            </div>

            <p className="text-3xl font-semibold tabular-nums text-stone-900 dark:text-stone-50">
              {formatCOP(book.price)}
            </p>

            <p className="max-w-prose text-[15px] leading-[1.75] text-stone-700 dark:text-stone-300">
              {book.description}
            </p>

            {book.stock > 0 ? (
              <div className="flex items-center gap-3">
                <AddToCartButton book={book} />
                <span
                  className={`text-sm ${
                    book.stock <= 5
                      ? "font-medium text-amber-700 dark:text-amber-400"
                      : "text-stone-500 dark:text-stone-400"
                  }`}
                >
                  {book.stock <= 5
                    ? `¡Solo quedan ${book.stock}!`
                    : `${book.stock} disponibles`}
                </span>
              </div>
            ) : (
              <p className="w-fit rounded-full bg-stone-200 px-6 py-3 text-sm font-medium text-stone-500 dark:bg-stone-800 dark:text-stone-400">
                Agotado
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
