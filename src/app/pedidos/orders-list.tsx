"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCOP } from "@/lib/format";
import { getAllOrders, type Order } from "@/lib/orders";

export function OrdersList() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getAllOrders());
  }, []);

  if (orders === null) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <span className="text-4xl">🧾</span>
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Aún no tienes pedidos
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
    <ul className="flex flex-col gap-4">
      {orders.map((order) => (
        <li key={order.id}>
          <Link
            href={`/pedido/${order.id}`}
            className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-5 transition-colors hover:border-rose-300 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                Pedido {order.id}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {new Date(order.createdAt).toLocaleDateString("es-CO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="flex -space-x-3">
              {order.items.slice(0, 4).map((item) => (
                <Image
                  key={item.slug}
                  src={item.coverUrl}
                  alt={`Portada de ${item.title}`}
                  width={32}
                  height={48}
                  className="rounded border-2 border-white dark:border-zinc-900"
                />
              ))}
            </div>

            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {formatCOP(order.total)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
