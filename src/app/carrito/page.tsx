import { SiteHeader } from "@/components/site-header";
import { CartView } from "./cart-view";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Tu carrito
        </h1>
        <CartView />
      </main>
    </div>
  );
}
