"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/format";

export function CartView() {
  const { items, setQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <span className="text-4xl">📚</span>
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Tu carrito está vacío
        </p>
        <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          Explora el catálogo y encuentra tu próxima lectura.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-600"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <Link
              href={`/libros/${item.slug}`}
              className="shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
            >
              <Image
                src={item.coverUrl}
                alt={`Portada de ${item.title}`}
                width={72}
                height={108}
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <Link
                  href={`/libros/${item.slug}`}
                  className="text-sm font-medium text-zinc-900 hover:text-rose-800 dark:text-zinc-50 dark:hover:text-rose-400"
                >
                  {item.title}
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.author}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Disminuir cantidad"
                    onClick={() => setQuantity(item.slug, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-rose-300 hover:text-rose-800 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm text-zinc-900 dark:text-zinc-50">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Aumentar cantidad"
                    onClick={() => setQuantity(item.slug, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:border-rose-300 hover:text-rose-800 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {formatCOP(item.price * item.quantity)}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label={`Quitar ${item.title} del carrito`}
              onClick={() => removeItem(item.slug)}
              className="self-start text-zinc-400 transition-colors hover:text-rose-700 dark:text-zinc-600 dark:hover:text-rose-400"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Resumen
        </h2>
        <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span>
          <span>{formatCOP(subtotal)}</span>
        </div>
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-600">
          Envío calculado en el siguiente paso.
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 text-base font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Total</span>
          <span>{formatCOP(subtotal)}</span>
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-600"
        >
          Continuar compra
        </button>
        <Link
          href="/"
          className="mt-3 block text-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Seguir explorando
        </Link>
      </aside>
    </div>
  );
}
