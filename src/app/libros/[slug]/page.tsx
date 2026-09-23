import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <Link
          href="/"
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          Tintalia
        </Link>
      </header>

      <main className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-[240px_1fr]">
        <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
          <Image
            src={book.coverUrl}
            alt={`Portada de ${book.title}`}
            width={240}
            height={360}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {book.title}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">{book.author}</p>
          </div>

          <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {formatCOP(book.price)}
          </p>

          <p className="text-zinc-700 dark:text-zinc-300">
            {book.description}
          </p>

          {book.stock > 0 ? (
            <button
              type="button"
              className="w-fit rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            >
              Agregar al carrito
            </button>
          ) : (
            <p className="w-fit rounded-full bg-zinc-200 px-6 py-3 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              Agotado
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
