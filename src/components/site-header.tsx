import Link from "next/link";
import { CartIcon } from "./cart-icon";

export function SiteHeader({ categories = [] }: { categories?: string[] }) {
  return (
    <header className="sticky top-0 z-10 border-b border-brand-100 bg-white/80 px-6 py-4 backdrop-blur dark:border-stone-800 dark:bg-ink/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link
          href="/landing"
          className="text-xl font-serif font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          Tintalia
        </Link>
        {categories.length > 0 && (
          <nav className="hidden gap-6 text-sm text-stone-600 sm:flex dark:text-stone-400">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/?categoria=${encodeURIComponent(category)}`}
                className="transition-colors hover:text-brand-700 dark:hover:text-brand-300"
              >
                {category}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-4">
          <Link
            href="/explorar"
            className="text-sm font-medium text-brand-700 hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
          >
            Explorar
          </Link>
          <Link
            href="/usuarios"
            className="hidden text-sm text-stone-600 hover:text-brand-700 sm:block dark:text-stone-400 dark:hover:text-brand-300"
          >
            Usuarios
          </Link>
          <Link
            href="/pedidos"
            className="hidden text-sm text-stone-600 hover:text-brand-700 sm:block dark:text-stone-400 dark:hover:text-brand-300"
          >
            Mis pedidos
          </Link>
          <Link
            href="/registro"
            className="text-sm text-stone-600 hover:text-brand-700 dark:text-stone-400 dark:hover:text-brand-300"
          >
            Registrarse
          </Link>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
