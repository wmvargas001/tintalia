"use client";

import { useState, type FormEvent } from "react";

const inputClassName =
  "rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-brand-500 dark:border-stone-700 dark:bg-ink-raised dark:text-stone-50";

export function RegisterForm() {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const registro = {
      nombre: String(formData.get("name") ?? ""),
      correo: String(formData.get("email") ?? ""),
      telefono: String(formData.get("phone") ?? ""),
    };

    console.log("Nuevo registro en Tintalia:", registro);

    setSubmittedName(registro.nombre);
    event.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-ink-raised"
    >
      <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
        Nombre completo
        <input
          name="name"
          required
          autoComplete="name"
          className={inputClassName}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
        Correo electrónico
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@correo.com"
          className={inputClassName}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-stone-700 dark:text-stone-300">
        Teléfono
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="300 123 4567"
          className={inputClassName}
        />
      </label>

      <button
        type="submit"
        className="mt-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:bg-brand-600 active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500"
      >
        Registrarme
      </button>

      {submittedName && (
        <p
          role="status"
          className="text-sm font-medium text-brand-700 dark:text-brand-300"
        >
          ¡Gracias, {submittedName}! Tus datos quedaron registrados.
        </p>
      )}
    </form>
  );
}
