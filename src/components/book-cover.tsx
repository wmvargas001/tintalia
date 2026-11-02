import Image from "next/image";

export function BookCover({
  src,
  alt,
  width,
  height,
  priority,
  unoptimized,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  unoptimized?: boolean;
}) {
  return (
    <div className="[perspective:1100px]">
      {/* En oscuro las sombras no separan el libro del fondo, así que un
          anillo tenue hace ese trabajo. */}
      <div className="relative overflow-hidden rounded-[3px] rounded-l-sm shadow-[0_1px_2px_rgba(24,24,27,0.12),0_8px_16px_-8px_rgba(24,24,27,0.25)] transition-all duration-500 ease-out [transform-origin:left_center] [transform-style:preserve-3d] group-hover:-translate-y-1.5 group-hover:[transform:rotateY(-14deg)_rotateX(2deg)] group-hover:shadow-[0_2px_4px_rgba(24,24,27,0.16),0_24px_40px_-12px_rgba(24,24,27,0.45)] dark:ring-1 dark:ring-white/10 dark:group-hover:ring-white/20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          unoptimized={unoptimized}
          className="aspect-[2/3] w-full object-cover dark:brightness-[0.88] dark:transition-[filter] dark:duration-500 dark:group-hover:brightness-100"
        />

        {/* Lomo: banda oscura con filo claro, como el canto de un libro real. */}
        <span className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
        <span className="pointer-events-none absolute inset-y-0 left-[7%] w-px bg-white/25" />

        {/* Páginas: filo claro en el borde derecho. */}
        <span className="pointer-events-none absolute inset-y-[2%] right-0 w-[2px] rounded-r-sm bg-gradient-to-l from-white/70 to-transparent" />

        {/* Barrido de luz al pasar el mouse. */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
      </div>
    </div>
  );
}
