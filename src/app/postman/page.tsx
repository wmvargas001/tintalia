import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import collection from "../../../postman/libros-aliados.postman_collection.json";

export const metadata: Metadata = {
  title: "Pruebas con Postman — Tintalia",
  description: "Las peticiones y comprobaciones que validan las APIs y las páginas de Tintalia.",
};

const REPO_URL =
  "https://github.com/wmvargas001/tintalia/blob/master/postman/libros-aliados.postman_collection.json";

// Los nombres de las comprobaciones se leen de los pm.test de cada petición,
// así la página no se desincroniza de la colección.
function checksOf(exec: string[]) {
  return exec.flatMap((line) => {
    const match = line.match(/pm\.test\('([^']+)'/);
    return match ? [match[1]] : [];
  });
}

const folders = collection.item.map((folder) => ({
  name: folder.name,
  requests: folder.item.map((request) => ({
    name: request.name,
    method: request.request.method,
    url: request.request.url.raw,
    checks: request.event.flatMap((event) => checksOf(event.script.exec)),
  })),
}));

const requestCount = folders.reduce((sum, f) => sum + f.requests.length, 0);
const checkCount = folders.reduce(
  (sum, f) => sum + f.requests.reduce((s, r) => s + r.checks.length, 0),
  0,
);

export default function PostmanPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="font-serif text-3xl font-semibold text-stone-900 dark:text-stone-50">
          Pruebas con Postman
        </h1>
        <p className="mt-2 max-w-lg text-sm text-stone-500 dark:text-stone-400">
          Esta colección comprueba las APIs que usa Tintalia y las páginas
          publicadas: {requestCount} peticiones y {checkCount} comprobaciones
          definidas.
        </p>

        <div className="mb-10 mt-6 flex flex-wrap gap-3">
          {/* Es una descarga, no una página: no debe pasar por next/link. */}
          <a
            href="/postman/coleccion"
            download
            className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            Descargar colección
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:border-brand-300 dark:border-stone-800 dark:text-stone-300 dark:hover:border-brand-700"
          >
            Ver en GitHub
          </a>
        </div>

        <div className="flex flex-col gap-10">
          {folders.map((folder) => (
            <section key={folder.name}>
              <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                {folder.name}
              </h2>
              <ul className="flex flex-col gap-2">
                {folder.requests.map((request) => (
                  <li
                    key={request.name}
                    className="rounded-lg border border-stone-200 bg-white px-4 py-3 dark:border-stone-800 dark:bg-ink-raised"
                  >
                    <p className="font-medium text-stone-900 dark:text-stone-50">
                      {request.name}
                    </p>
                    <p className="mt-1 break-all font-mono text-xs text-stone-500 dark:text-stone-400">
                      {request.method} {request.url}
                    </p>
                    <ul className="mt-2 list-inside list-disc text-sm text-stone-600 dark:text-stone-400">
                      {request.checks.map((check) => (
                        <li key={check}>{check}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
