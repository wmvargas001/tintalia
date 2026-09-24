import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteHeader } from "@/components/site-header";
import { StarRating } from "@/components/star-rating";
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

const testimonials = [
  {
    quote:
      "Pedí un libro un lunes y el miércoles ya lo tenía en Pereira. Excelente empaque.",
    author: "Camila R.",
  },
  {
    quote:
      "El catálogo de clásicos colombianos es difícil de encontrar en otras tiendas. Volví a comprar.",
    author: "Andrés M.",
  },
  {
    quote: "Pago fácil y seguimiento claro del pedido. Se los recomiendo.",
    author: "Laura G.",
  },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const allBooks = getAllBooks();
  const featured = getFeaturedBook();
  const categories = getCategories();
  const activeCategory =
    categoria && categories.includes(categoria) ? categoria : undefined;
  const books = activeCategory
    ? allBooks.filter((book) => book.category === activeCategory)
    : allBooks;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <SiteHeader categories={categories} />

      <section className="border-b border-rose-100 bg-gradient-to-b from-rose-50 to-stone-50 dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 sm:grid-cols-[1fr_200px]">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-rose-800 dark:text-rose-400">
              {featured.bestseller ? "Más vendido" : "Nueva llegada"}
            </p>
            <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
              Libros que se quedan contigo
            </h1>
            <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
              Una selección curada de literatura clásica y contemporánea,
              entregada donde estés en Colombia.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <StarRating
                rating={4.7}
                reviewCount={353}
                size="md"
              />
              <span>· lectores en Colombia</span>
            </div>
            <Link
              href={`/libros/${featured.slug}`}
              className="mt-6 inline-block rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-rose-800 hover:shadow-lg active:scale-[0.98] dark:bg-rose-700 dark:hover:bg-rose-600"
            >
              Ver {featured.title}
            </Link>
          </div>
          <Link
            href={`/libros/${featured.slug}`}
            className="group hidden sm:block"
          >
            <BookCover
              src={featured.coverUrl}
              alt={`Portada de ${featured.title}`}
              width={200}
              height={300}
              priority
            />
          </Link>
        </div>
      </section>

      <section className="border-b border-zinc-200 px-6 py-10 dark:border-zinc-800">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div
              key={point.title}
              className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-rose-50/60 dark:hover:bg-zinc-900"
            >
              <span className="text-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                {point.icon}
              </span>
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
            Catálogo
          </h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                !activeCategory
                  ? "border-rose-900 bg-rose-900 text-white dark:border-rose-700 dark:bg-rose-700"
                  : "border-zinc-300 text-zinc-600 hover:border-rose-300 dark:border-zinc-700 dark:text-zinc-400"
              }`}
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/?categoria=${encodeURIComponent(category)}`}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? "border-rose-900 bg-rose-900 text-white dark:border-rose-700 dark:bg-rose-700"
                    : "border-zinc-300 text-zinc-600 hover:border-rose-300 dark:border-zinc-700 dark:text-zinc-400"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {books.length === 0 && (
          <p className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
            No hay libros en esta categoría todavía.
          </p>
        )}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/libros/${book.slug}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative">
                <BookCover
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  width={240}
                  height={360}
                />
                <div className="pointer-events-none absolute left-2 top-2 flex flex-col gap-1">
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-zinc-700 shadow-sm dark:bg-black/70 dark:text-zinc-200">
                    {book.category}
                  </span>
                  {book.bestseller && (
                    <span className="rounded-full bg-rose-900 px-2 py-0.5 text-[11px] font-medium text-white shadow-sm dark:bg-rose-700">
                      Más vendido
                    </span>
                  )}
                </div>
                {book.stock === 0 && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-900">
                      Agotado
                    </span>
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 group-hover:text-rose-800 dark:text-zinc-50 dark:group-hover:text-rose-400">
                  {book.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {book.author}
                </p>
                <StarRating
                  rating={book.rating}
                  reviewCount={book.reviewCount}
                />
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCOP(book.price)}
                </p>
                {book.stock > 0 && book.stock <= 5 && (
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                    ¡Solo quedan {book.stock}!
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <section className="border-y border-zinc-200 bg-white px-6 py-14 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Lo que dicen nuestros lectores
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="rounded-lg border border-zinc-200 p-5 transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-800"
              >
                <span className="text-amber-500">★★★★★</span>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-xl bg-gradient-to-r from-rose-900 to-rose-800 p-8 text-white sm:flex-row sm:items-center dark:from-rose-950 dark:to-rose-900">
          <div>
            <h2 className="font-serif text-xl font-semibold">
              Recibe recomendaciones y descuentos
            </h2>
            <p className="mt-1 text-sm text-rose-100">
              Únete a nuestra comunidad de lectores. Sin spam, cancela cuando
              quieras.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

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
