import { SiteHeader } from "@/components/site-header";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink">
      <SiteHeader />

      <main className="mx-auto max-w-md px-6 py-12">
        <h1 className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-50">
          Crea tu cuenta
        </h1>
        <p className="mb-8 mt-2 text-sm text-stone-500 dark:text-stone-400">
          Regístrate para recibir novedades y hacer seguimiento a tus pedidos.
        </p>
        <RegisterForm />
      </main>
    </div>
  );
}
