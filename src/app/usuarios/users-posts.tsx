"use client";

import { useState } from "react";
import { useFetch } from "./use-fetch";

const API_URL = "https://jsonplaceholder.typicode.com";

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

export function UsersPosts() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Consulta 1: todos los usuarios, apenas carga la página.
  const users = useFetch<User[]>(`${API_URL}/users`);

  // Consulta 2: las publicaciones del usuario seleccionado. Al cambiar de
  // usuario cambia la url y useFetch vuelve a consultar.
  const posts = useFetch<Post[]>(
    selectedUser ? `${API_URL}/posts?userId=${selectedUser.id}` : null,
  );

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[320px_1fr]">
      <section aria-labelledby="usuarios-titulo">
        <h2
          id="usuarios-titulo"
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300"
        >
          Usuarios
        </h2>

        {users.loading && <LoadingMessage text="Cargando usuarios…" />}
        {users.error && (
          <ErrorMessage
            text={`No pudimos cargar los usuarios. ${users.error}`}
            onRetry={users.retry}
          />
        )}

        {users.data && (
          <ul className="flex flex-col gap-2">
            {users.data.map((user) => {
              const isSelected = selectedUser?.id === user.id;
              return (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                      isSelected
                        ? "border-brand-700 bg-brand-50 dark:border-brand-500 dark:bg-brand-950"
                        : "border-stone-200 bg-white hover:border-brand-300 dark:border-stone-800 dark:bg-ink-raised dark:hover:border-brand-700"
                    }`}
                  >
                    <p className="font-medium text-stone-900 dark:text-stone-50">
                      {user.name}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {user.email}
                    </p>
                    <p className="mt-1 text-xs text-brand-700 dark:text-brand-300">
                      {user.company.name}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-labelledby="publicaciones-titulo" aria-live="polite">
        <h2
          id="publicaciones-titulo"
          className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300"
        >
          Publicaciones
        </h2>

        {!selectedUser && (
          <div className="rounded-lg border border-dashed border-stone-300 px-6 py-16 text-center dark:border-stone-700">
            <p className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">
              Selecciona un usuario
            </p>
            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
              Sus publicaciones aparecerán aquí.
            </p>
          </div>
        )}

        {selectedUser && (
          <>
            <div className="mb-6 border-b border-stone-200 pb-4 dark:border-stone-800">
              <p className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
                {selectedUser.name}
              </p>
              {posts.data && (
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {posts.data.length} publicaciones
                </p>
              )}
            </div>

            {posts.loading && <LoadingMessage text="Cargando publicaciones…" />}
            {posts.error && (
              <ErrorMessage
                text={`No pudimos cargar las publicaciones. ${posts.error}`}
                onRetry={posts.retry}
              />
            )}

            {posts.data && (
              <ul className="flex flex-col gap-4">
                {posts.data.map((post) => (
                  <li
                    key={post.id}
                    className="rounded-lg border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-ink-raised"
                  >
                    <h3 className="font-serif text-lg font-semibold leading-snug text-stone-900 first-letter:uppercase dark:text-stone-50">
                      {post.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">
                      {post.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function LoadingMessage({ text }: { text: string }) {
  return (
    <p
      role="status"
      className="flex items-center gap-3 rounded-lg bg-stone-100 px-4 py-3 text-sm text-stone-600 dark:bg-ink-raised dark:text-stone-300"
    >
      <span className="size-4 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700 dark:border-brand-900 dark:border-t-brand-300" />
      {text}
    </p>
  );
}

function ErrorMessage({ text, onRetry }: { text: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
    >
      <p>{text}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 font-medium underline underline-offset-4 hover:no-underline"
      >
        Reintentar
      </button>
    </div>
  );
}
