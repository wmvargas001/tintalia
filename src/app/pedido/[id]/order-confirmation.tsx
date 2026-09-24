"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCOP } from "@/lib/format";
import { getOrder, type Order } from "@/lib/orders";

const paymentLabels: Record<Order["paymentMethod"], string> = {
  pse: "PSE",
  tarjeta: "Tarjeta",
  nequi: "Nequi",
};

export function OrderConfirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // Reading the order from localStorage on mount — no non-effect way to
    // sync from an external store keyed by a route param.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(getOrder(orderId) ?? null);
  }, [orderId]);

  if (order === undefined) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 py-20 text-center">
        <span className="h-14 w-14 animate-pulse rounded-full bg-brand-100 dark:bg-brand-800/40" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Confirmando tu pedido...
        </p>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          No encontramos este pedido
        </p>
        <Link
          href="/"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const estimatedDate = new Date(order.createdAt);
  estimatedDate.setDate(estimatedDate.getDate() + 3);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl dark:bg-brand-800/40">
          ✓
        </span>
        <h1 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          ¡Pedido confirmado!
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Pedido <span className="font-medium">{order.id}</span> pagado con{" "}
          {paymentLabels[order.paymentMethod]}
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.slug} className="flex items-center gap-3">
              <Image
                src={item.coverUrl}
                alt={`Portada de ${item.title}`}
                width={40}
                height={60}
                className="rounded border border-zinc-200 dark:border-zinc-800"
              />
              <div className="flex-1 text-sm">
                <p className="text-zinc-900 dark:text-zinc-50">
                  {item.title}
                </p>
                <p className="text-zinc-500 dark:text-zinc-400">
                  x{item.quantity}
                </p>
              </div>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">
                {formatCOP(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCOP(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>{formatCOP(order.shipping)}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Total pagado</span>
          <span>{formatCOP(order.total)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-6 text-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Enviado a {order.customer.name}
        </p>
        <p className="text-zinc-500 dark:text-zinc-400">
          {order.customer.address}, {order.customer.city}
        </p>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Llegada estimada:{" "}
          {estimatedDate.toLocaleDateString("es-CO", {
            day: "numeric",
            month: "long",
          })}
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
        Tienes 5 días hábiles desde la entrega para ejercer tu derecho de
        retracto. Escríbenos a hola@tintalia.co
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
