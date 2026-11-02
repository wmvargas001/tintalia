import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { UsersPosts } from "./users-posts";

export const metadata: Metadata = {
  title: "Usuarios y publicaciones — Tintalia",
  description: "Consulta usuarios de JSONPlaceholder y sus publicaciones.",
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
          Usuarios y sus publicaciones
        </h1>
        <p className="mb-10 mt-2 max-w-lg text-sm text-stone-500 dark:text-stone-400">
          Elige un usuario de la lista para leer lo que ha publicado. Los datos
          vienen de JSONPlaceholder.
        </p>
        <UsersPosts />
      </main>
    </div>
  );
}
