import type { CartItem } from "./cart-context";

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: "pse" | "tarjeta" | "nequi";
};

const STORAGE_KEY = "tintalia-orders";
const SHIPPING_COST = 12000;

export function getShippingCost(): number {
  return SHIPPING_COST;
}

export function generateOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TNT-${random}`;
}

export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const orders: Order[] = raw ? JSON.parse(raw) : [];
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore unavailable storage
  }
}

export function getOrder(id: string): Order | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const orders: Order[] = raw ? JSON.parse(raw) : [];
    return orders.find((order) => order.id === id);
  } catch {
    return undefined;
  }
}

export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
