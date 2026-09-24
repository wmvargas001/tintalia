import { SiteHeader } from "@/components/site-header";
import { CheckoutForm } from "./checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-zinc-950">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-8 font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Finalizar compra
        </h1>
        <CheckoutForm />
      </main>
    </div>
  );
}
