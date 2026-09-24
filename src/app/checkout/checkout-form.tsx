"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/format";
import {
  generateOrderId,
  getShippingCost,
  saveOrder,
  type Order,
} from "@/lib/orders";

const paymentMethods = [
  { id: "pse", label: "PSE", hint: "Débito desde tu banco" },
  { id: "tarjeta", label: "Tarjeta", hint: "Crédito o débito" },
  { id: "nequi", label: "Nequi", hint: "Pago desde la app" },
] as const;

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const shipping = getShippingCost();
  const [paymentMethod, setPaymentMethod] =
    useState<Order["paymentMethod"]>("pse");
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-center">
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          No tienes libros en el carrito
        </p>
        <Link
          href="/"
          className="rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-600"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const order: Order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      customer: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        address: String(formData.get("address") ?? ""),
        city: String(formData.get("city") ?? ""),
      },
      paymentMethod,
    };

    saveOrder(order);

    // Simula el tiempo de confirmación de una pasarela real.
    setTimeout(() => {
      clear();
      router.push(`/pedido/${order.id}`);
    }, 900);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]"
    >
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Datos de envío
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              Nombre completo
              <input
                name="name"
                required
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              Correo electrónico
              <input
                name="email"
                type="email"
                required
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              Teléfono
              <input
                name="phone"
                required
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
              Ciudad
              <input
                name="city"
                required
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2 dark:text-zinc-300">
              Dirección
              <input
                name="address"
                required
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-rose-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Método de pago
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`cursor-pointer rounded-lg border p-4 text-sm transition-colors ${
                  paymentMethod === method.id
                    ? "border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-900/20"
                    : "border-zinc-300 hover:border-rose-300 dark:border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="sr-only"
                />
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {method.label}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {method.hint}
                </p>
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-600">
            Pago simulado — no se procesará ningún cobro real.
          </p>
        </section>
      </div>

      <aside className="h-fit rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Tu pedido
        </h2>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
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
            <span>{formatCOP(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>{formatCOP(shipping)}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 text-base font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
          <span>Total</span>
          <span>{formatCOP(subtotal + shipping)}</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-800 disabled:opacity-60 dark:bg-rose-700 dark:hover:bg-rose-600"
        >
          {submitting ? "Procesando pago..." : "Pagar pedido"}
        </button>
        <Link
          href="/carrito"
          aria-disabled={submitting}
          className={`mt-3 block w-full rounded-full border border-zinc-300 px-6 py-3 text-center text-sm font-medium text-zinc-700 transition-colors hover:border-rose-300 hover:text-rose-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-rose-400 ${
            submitting ? "pointer-events-none opacity-60" : ""
          }`}
        >
          Cancelar compra
        </Link>
      </aside>
    </form>
  );
}
