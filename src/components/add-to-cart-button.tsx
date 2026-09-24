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
      className="w-fit rounded-full bg-rose-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-rose-800 dark:bg-rose-700 dark:hover:bg-rose-600"
    >
      {justAdded ? "Agregado ✓" : "Agregar al carrito"}
    </button>
  );
}
