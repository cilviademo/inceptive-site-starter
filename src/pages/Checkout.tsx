import { useSEO } from "@/hooks/useSEO";

export default function Checkout() {
  useSEO({ title: "Checkout — Inceptive by Marc Antione", description: "Secure payment process." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p className="text-muted-foreground mt-2">Stripe/Gumroad/Shopify integrations will appear here.</p>
    </main>
  );
}
