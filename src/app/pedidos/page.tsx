import { SiteHeader } from "@/components/site-header";
import { OrdersList } from "./orders-list";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Mis pedidos
        </h1>
        <OrdersList />
      </main>
    </div>
  );
}
