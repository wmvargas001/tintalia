import { SiteHeader } from "@/components/site-header";
import { OrderConfirmation } from "./order-confirmation";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <OrderConfirmation orderId={id} />
      </main>
    </div>
  );
}
