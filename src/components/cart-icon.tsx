"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/carrito"
      aria-label="Ver carrito de compras"
      className="relative inline-flex items-center rounded-full border border-brand-200 p-2 text-brand-700 transition-colors hover:bg-brand-50 dark:border-stone-700 dark:text-brand-200 dark:hover:bg-brand-950/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L7.5 14.25a2.25 2.25 0 0 0 2.183 1.75h7.276a2.25 2.25 0 0 0 2.183-1.75l1.35-6.75H5.106M5.106 5.273 7.5 14.25m0 0-.372 1.65a1.125 1.125 0 0 0 1.098 1.35h9.548M9 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-700 px-1 text-[11px] font-semibold text-white dark:bg-brand-500">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
