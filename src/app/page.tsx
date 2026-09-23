import Image from "next/image";
import Link from "next/link";
import { getAllBooks, getCategories, getFeaturedBook } from "@/lib/books";
import { formatCOP } from "@/lib/format";

const trustPoints = [
  {
    title: "Envíos a toda Colombia",
    description: "Despacho en 24-48 horas desde Pereira.",
    icon: "📦",
  },
  {
    title: "Pago seguro",
    description: "PSE, tarjeta y Nequi a través de pasarelas certificadas.",
    icon: "🔒",
  },
  {
    title: "Garantía y retracto",
    description: "5 días hábiles para devoluciones.",
    icon: "✅",
  },
];

export default function Home() {
  const books = getAllBooks();
  const featured = getFeaturedBook();
  const categories = getCategories();

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
          <nav className="hidden gap-6 text-sm text-zinc-600 sm:flex dark:text-zinc-400">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </nav>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {books.length} libros disponibles
          </span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-gradient-to-b from-amber-50 to-zinc-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 sm:grid-cols-[1fr_200px]">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-amber-700 dark:text-amber-400">
              Nueva llegada
            </p>
            <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
              Libros que se quedan contigo
            </h1>
            <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
              Una selección curada de literatura clásica y contemporánea,
              entregada donde estés en Colombia.
            </p>
            <Link
              href={`/libros/${featured.slug}`}
              className="mt-6 inline-block rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Ver {featured.title}
            </Link>
          </div>
          <Link
            href={`/libros/${featured.slug}`}
            className="hidden overflow-hidden rounded-lg border border-zinc-200 shadow-lg transition-transform hover:-translate-y-1 sm:block dark:border-zinc-800"
          >
            <Image
              src={featured.coverUrl}
              alt={`Portada de ${featured.title}`}
              width={200}
              height={300}
              className="w-full"
              priority
            />
          </Link>
        </div>
      </section>

      <section className="border-b border-zinc-200 px-6 py-10 dark:border-zinc-800">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.title} className="flex gap-3">
              <span className="text-2xl">{point.icon}</span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  {point.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Catálogo
          </h2>
          <div className="flex gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

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

      <footer className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Tintalia
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Librería en línea, hecha en Colombia para lectores colombianos.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Información legal
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>
              <li>Derecho de retracto</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
              Contacto
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
              <li>hola@tintalia.co</li>
              <li>Pereira, Colombia</li>
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-5xl text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Tintalia. Todos los derechos
          reservados.
        </p>
      </footer>
    </div>
  );
}
