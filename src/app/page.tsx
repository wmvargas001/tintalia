import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { formatCOP } from "@/lib/format";

export default function Home() {
  const books = getAllBooks();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Tintalia
        </h1>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Catálogo
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/libros/${book.slug}`}
              className="group flex flex-col gap-2"
            >
              <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                <Image
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  width={240}
                  height={360}
                  className="w-full transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {book.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {book.author}
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCOP(book.price)}
                </p>
                {book.stock === 0 && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    Agotado
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
