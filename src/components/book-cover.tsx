import Image from "next/image";

export function BookCover({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <div className="[perspective:900px]">
      <div className="relative overflow-hidden rounded-lg border border-zinc-200 shadow-sm transition-all duration-300 ease-out [transform-style:preserve-3d] group-hover:-translate-y-1 group-hover:rotate-[-1.5deg] group-hover:[transform:rotateY(-10deg)_rotateX(3deg)] group-hover:shadow-2xl dark:border-zinc-800">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full"
        />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />
      </div>
    </div>
  );
}
