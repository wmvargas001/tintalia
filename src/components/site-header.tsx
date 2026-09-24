import Link from "next/link";
import { CartIcon } from "./cart-icon";

export function SiteHeader({ categories = [] }: { categories?: string[] }) {
  return (
    <header className="sticky top-0 z-10 border-b border-rose-100 bg-white/80 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xl font-serif font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Tintalia
        </Link>
        {categories.length > 0 && (
          <nav className="hidden gap-6 text-sm text-zinc-600 sm:flex dark:text-zinc-400">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/?categoria=${encodeURIComponent(category)}`}
                className="transition-colors hover:text-rose-800 dark:hover:text-rose-400"
              >
                {category}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-4">
          <Link
            href="/pedidos"
            className="hidden text-sm text-zinc-600 hover:text-rose-800 sm:block dark:text-zinc-400 dark:hover:text-rose-400"
          >
            Mis pedidos
          </Link>
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
