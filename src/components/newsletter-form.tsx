"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <p className="text-sm font-medium text-brand-700 dark:text-brand-300">
        ¡Gracias! Revisa tu correo para confirmar la suscripción.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 sm:flex-row sm:gap-3"
    >
      <input
        type="email"
        required
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
        className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-brand-500 sm:w-64 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:bg-brand-600 active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500"
      >
        Suscribirme
      </button>
    </form>
  );
}
