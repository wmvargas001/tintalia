"use client";

import { useEffect, useState } from "react";

type Result<T> = {
  url: string;
  attempt: number;
  data?: T;
  error?: string;
};

// Hace un GET con fetch desde el navegador (por eso la petición aparece en
// DevTools → Network) y expone tres estados: cargando, error o datos.
// Si url es null no consulta nada, por ejemplo cuando aún no hay un usuario
// seleccionado.
export function useFetch<T>(url: string | null) {
  const [result, setResult] = useState<Result<T> | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!url) return;

    // Si la url cambia antes de que llegue la respuesta (el usuario eligió
    // a otra persona), se cancela la petición anterior para que una
    // respuesta vieja no reemplace a la nueva.
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`El servidor respondió con el código ${response.status}.`);
        }
        return response.json() as Promise<T>;
      })
      .then((data) => setResult({ url, attempt, data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        // fetch lanza un TypeError cuando no hay conexión o el servidor no
        // responde; los errores HTTP (404, 500…) llegan con su mensaje.
        const message =
          error instanceof TypeError
            ? "No se pudo conectar con el servidor. Revisa tu conexión a internet."
            : error instanceof Error
              ? error.message
              : "Ocurrió un error inesperado.";
        setResult({ url, attempt, error: message });
      });

    return () => controller.abort();
  }, [url, attempt]);

  // La respuesta guardada solo vale si corresponde a la url e intento
  // actuales; si no, todavía estamos cargando.
  const isCurrent = result?.url === url && result.attempt === attempt;

  return {
    data: isCurrent ? result.data : undefined,
    error: isCurrent ? result.error : undefined,
    loading: url !== null && !isCurrent,
    retry: () => setAttempt((n) => n + 1),
  };
}
