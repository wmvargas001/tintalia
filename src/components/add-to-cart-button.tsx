"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Book } from "@/lib/types";

export function AddToCartButton({ book }: { book: Book }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addItem(book);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-fit rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] dark:bg-rose-700 dark:hover:bg-rose-600 ${
        justAdded ? "bg-green-700" : "bg-rose-900 hover:bg-rose-800"
      }`}
    >
      {justAdded ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
