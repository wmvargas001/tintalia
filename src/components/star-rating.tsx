export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount: number;
  size?: "sm" | "md";
}) {
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-1 ${textSize}`}>
      <span className="text-amber-500" aria-hidden>
        {"★".repeat(Math.round(rating))}
        <span className="text-stone-300 dark:text-stone-700">
          {"★".repeat(5 - Math.round(rating))}
        </span>
      </span>
      <span className="text-stone-500 dark:text-stone-400">
        {rating.toFixed(1)} ({reviewCount})
      </span>
    </div>
  );
}
