import Image from "next/image";
import Link from "next/link";
import { getAllBooks } from "@/lib/books";
import { formatCOP } from "@/lib/format";

export default function Home() {
  const books = getAllBooks();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-serif font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Tintalia
          </Link>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {books.length} libros disponibles
          </span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-gradient-to-b from-amber-50 to-zinc-50 px-6 py-16 dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
        <div className="mx-auto max-w-5xl">
          <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
            Libros que se quedan contigo
          </h1>
          <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
            Una selección curada de literatura clásica y contemporánea,
            entregada donde estés en Colombia.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-12">
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
              <div className="relative overflow-hidden rounded-lg border border-zinc-200 shadow-sm transition-all group-hover:-translate-y-1 group-hover:shadow-lg dark:border-zinc-800">
                <Image
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  width={240}
                  height={360}
                  className="w-full"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm dark:bg-black/70 dark:text-zinc-200">
                  {book.category}
                </span>
                {book.stock === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-900">
                      Agotado
                    </span>
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 group-hover:text-amber-700 dark:text-zinc-50 dark:group-hover:text-amber-400">
                  {book.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {book.author}
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCOP(book.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Tintalia — venta de libros en Colombia
      </footer>
    </div>
  );
}
