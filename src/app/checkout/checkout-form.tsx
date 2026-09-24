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
        <p className="text-lg font-medium text-stone-900 dark:text-stone-50">
          No tienes libros en el carrito
        </p>
        <Link
          href="/"
          className="rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
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

  const handleCancel = () => {
    clear();
    router.push("/carrito");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]"
    >
      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-sm font-medium text-stone-900 dark:text-stone-50">
            Datos de envío
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
              Nombre completo
              <input
                name="name"
                required
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
              Correo electrónico
              <input
                name="email"
                type="email"
                required
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
              Teléfono
              <input
                name="phone"
                required
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
              Ciudad
              <input
                name="city"
                required
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-stone-700 sm:col-span-2 dark:text-stone-300">
              Dirección
              <input
                name="address"
                required
                className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50"
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm font-medium text-stone-900 dark:text-stone-50">
            Método de pago
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`cursor-pointer rounded-lg border p-4 text-sm transition-colors ${
                  paymentMethod === method.id
                    ? "border-brand-500 bg-brand-50 dark:border-brand-500 dark:bg-brand-800/20"
                    : "border-stone-300 hover:border-brand-300 dark:border-stone-700"
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
                <p className="font-medium text-stone-900 dark:text-stone-50">
                  {method.label}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {method.hint}
                </p>
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-400 dark:text-stone-600">
            Pago simulado — no se procesará ningún cobro real.
          </p>
        </section>
      </div>

      <aside className="h-fit rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-ink-raised">
        <h2 className="mb-4 text-sm font-medium text-stone-900 dark:text-stone-50">
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
                className="rounded border border-stone-200 dark:border-stone-800"
              />
              <div className="flex-1 text-sm">
                <p className="text-stone-900 dark:text-stone-50">
                  {item.title}
                </p>
                <p className="text-stone-500 dark:text-stone-400">
                  x{item.quantity}
                </p>
              </div>
              <p className="text-sm text-stone-900 dark:text-stone-50">
                {formatCOP(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t border-stone-200 pt-4 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatCOP(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <span>{formatCOP(shipping)}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-between border-t border-stone-200 pt-2 text-base font-semibold text-stone-900 dark:border-stone-800 dark:text-stone-50">
          <span>Total</span>
          <span>{formatCOP(subtotal + shipping)}</span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600 disabled:opacity-60 dark:bg-brand-600 dark:hover:bg-brand-500"
        >
          {submitting ? "Procesando pago..." : "Pagar pedido"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={submitting}
          className="mt-3 w-full rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-brand-300 hover:text-brand-700 disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:hover:text-brand-300"
        >
          Cancelar compra
        </button>
      </aside>
    </form>
  );
}
