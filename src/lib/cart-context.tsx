"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Book } from "./types";

export type CartItem = {
  slug: string;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "tintalia-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Reading persisted state into React on mount, not a derived value —
      // there is no non-effect way to sync from localStorage.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore unavailable storage
    }
  }, [items, hydrated]);

  const addItem = (book: Book, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === book.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === book.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...current,
        {
          slug: book.slug,
          title: book.title,
          author: book.author,
          price: book.price,
          coverUrl: book.coverUrl,
          quantity,
        },
      ];
    });
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const setQuantity = (slug: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(slug);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, quantity } : item,
      ),
    );
  };

  const clear = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        setQuantity,
        clear,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
