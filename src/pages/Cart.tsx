import { useSEO } from "@/hooks/useSEO";

export default function Cart() {
  useSEO({ title: "Cart — DrumHaus", description: "Review your items." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Cart</h1>
      <p className="text-muted-foreground mt-2">Cart functionality coming soon.</p>
    </main>
  );
}
