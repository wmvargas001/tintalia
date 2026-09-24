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
      className={`w-fit rounded-full px-6 py-3 text-sm font-medium text-white transition-all active:scale-[0.98] ${
        justAdded
          ? "scale-[1.03] bg-brand-900 shadow-lg dark:bg-brand-800"
          : "bg-brand-700 shadow-sm hover:scale-[1.03] hover:bg-brand-600 hover:shadow-lg dark:bg-brand-600 dark:hover:bg-brand-500"
      }`}
    >
      {justAdded ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
