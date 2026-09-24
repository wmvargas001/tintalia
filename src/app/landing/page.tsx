import Link from "next/link";
import { BookCover } from "@/components/book-cover";
import { NewsletterForm } from "@/components/newsletter-form";
import { StarRating } from "@/components/star-rating";
import { getAllBooks, getFeaturedBook } from "@/lib/books";
import { formatCOP } from "@/lib/format";

const benefits = [
  {
    icon: "📦",
    title: "Envío en 24-48h",
    description: "A toda Colombia desde Pereira.",
  },
  {
    icon: "🔒",
    title: "Pago 100% seguro",
    description: "PSE, tarjeta y Nequi.",
  },
  {
    icon: "↩️",
    title: "Devolución fácil",
    description: "5 días hábiles sin preguntas.",
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
];

export default function LandingPage() {
  const featured = getFeaturedBook();
  const highlights = getAllBooks().slice(0, 3);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <header className="px-6 py-5">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="text-xl font-serif font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Tintalia
          </Link>
        </div>
      </header>

      <section className="border-b border-rose-100 bg-gradient-to-b from-rose-50 to-stone-50 px-6 py-16 dark:border-zinc-800 dark:from-zinc-900 dark:to-black">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="rounded-full bg-rose-900 px-4 py-1 text-xs font-medium text-white dark:bg-rose-700">
            10% de descuento en tu primer pedido
          </span>
          <h1 className="max-w-xl font-serif text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Tu próxima lectura te espera en Tintalia
          </h1>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            Literatura clásica y contemporánea, curada para lectores
            colombianos, con envío rápido a todo el país.
          </p>
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <a
              href="#suscribirse"
              className="rounded-full bg-rose-900 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:bg-rose-800 hover:shadow-lg active:scale-[0.98] dark:bg-rose-700 dark:hover:bg-rose-600"
            >
              Obtener mi descuento
            </a>
            <Link
              href="/"
              className="rounded-full border border-zinc-300 px-8 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:border-rose-300 hover:text-rose-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-rose-400"
            >
              Ver catálogo completo
            </Link>
          </div>
          <StarRating rating={4.7} reviewCount={353} size="md" />
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-center gap-2 rounded-lg p-4 text-center transition-colors hover:bg-rose-50/60 dark:hover:bg-zinc-900"
            >
              <span className="text-3xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                {benefit.icon}
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                {benefit.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white px-6 py-14 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Los favoritos de nuestros lectores
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {highlights.map((book) => (
              <Link
                key={book.slug}
                href={`/libros/${book.slug}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <div className="w-32">
                  <BookCover
                    src={book.coverUrl}
                    alt={`Portada de ${book.title}`}
                    width={128}
                    height={192}
                  />
                </div>
                <p className="text-sm font-medium text-zinc-900 group-hover:text-rose-800 dark:text-zinc-50 dark:group-hover:text-rose-400">
                  {book.title}
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCOP(book.price)}
                </p>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {book.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center font-serif text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Lo que dicen nuestros lectores
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

      <section
        id="suscribirse"
        className="px-6 py-16 scroll-mt-6"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-xl bg-gradient-to-r from-rose-900 to-rose-800 p-10 text-center text-white dark:from-rose-950 dark:to-rose-900">
          <h2 className="font-serif text-2xl font-semibold">
            Obtén 10% en tu primera compra
          </h2>
          <p className="max-w-sm text-sm text-rose-100">
            Déjanos tu correo y te enviamos el código de descuento al
            instante.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-xs text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
        Recuerda: {featured.title} y más de tu autor favorito te esperan en{" "}
        <Link href="/" className="underline hover:text-rose-700">
          el catálogo completo
        </Link>
        . © {new Date().getFullYear()} Tintalia.
      </footer>
    </div>
  );
}
