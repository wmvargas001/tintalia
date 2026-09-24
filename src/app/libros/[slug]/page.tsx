import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { BookCover } from "@/components/book-cover";
import { SiteHeader } from "@/components/site-header";
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
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[280px_1fr]">
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
              <span className="mb-2 inline-block rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-800 dark:bg-rose-900/40 dark:text-rose-300">
                {book.category}
              </span>
              <h1 className="font-serif text-3xl font-semibold leading-tight text-zinc-900 dark:text-zinc-50">
                {book.title}
              </h1>
              <p className="mt-1 text-zinc-500 dark:text-zinc-400">
                {book.author}
              </p>
            </div>

            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {formatCOP(book.price)}
            </p>

            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              {book.description}
            </p>

            {book.stock > 0 ? (
              <div className="flex items-center gap-3">
                <AddToCartButton book={book} />
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {book.stock} disponibles
                </span>
              </div>
            ) : (
              <p className="w-fit rounded-full bg-zinc-200 px-6 py-3 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Agotado
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
