import { BookCover } from "./book-cover";
import { coverUrl } from "@/lib/open-library";

// Portada de un libro del catálogo aliado. Open Library no tiene portada
// para todas las obras, así que sin ella dibujamos una tapa tipográfica
// con las mismas proporciones y profundidad que las portadas reales.
export function PartnerCover({
  coverId,
  title,
  author,
  width,
  height,
  size = "M",
  priority,
}: {
  coverId?: number;
  title: string;
  author?: string;
  width: number;
  height: number;
  size?: "M" | "L";
  priority?: boolean;
}) {
  if (coverId) {
    // Las portadas redirigen a servidores de archive.org que cambian, por
    // eso se sirven sin pasar por el optimizador de imágenes.
    return (
      <BookCover
        src={coverUrl(coverId, size)}
        alt={`Portada de ${title}`}
        width={width}
        height={height}
        priority={priority}
        unoptimized
      />
    );
  }

  return (
    <div className="[perspective:1100px]">
      <div className="relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-[3px] rounded-l-sm bg-gradient-to-br from-brand-700 to-brand-900 p-[12%] pl-[16%] text-brand-50 shadow-[0_1px_2px_rgba(24,24,27,0.12),0_8px_16px_-8px_rgba(24,24,27,0.25)] transition-all duration-500 ease-out [transform-origin:left_center] group-hover:-translate-y-1.5 group-hover:[transform:rotateY(-14deg)_rotateX(2deg)] dark:ring-1 dark:ring-white/10">
        <span className="h-px w-6 bg-brand-300/60" />
        <p className="line-clamp-4 font-serif text-lg font-semibold leading-tight">
          {title}
        </p>
        <p className="line-clamp-2 text-[11px] uppercase tracking-[0.14em] text-brand-200">
          {author ?? "Autor desconocido"}
        </p>
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 left-[7%] w-px bg-white/25" />
      </div>
    </div>
  );
}
