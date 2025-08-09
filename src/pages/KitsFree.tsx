import ProductCard from "@/components/products/ProductCard";
import { products, getProductsByType } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

export default function KitsFree() {
  useSEO({
    title: "Free Drum Kits — Inceptive by Marc Antione",
    description: "Claim free drum kits and loops. Lead magnets that grow your list and help you discover our sound.",
    canonical: window.location.origin + "/kits/free",
  });

  const kits = getProductsByType("kit");

  return (
    <main className="container py-10 space-y-10">
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold">Free Drum Kits</h1>
        <p className="mt-3 text-muted-foreground">Download a free starter pack and get 10% off your first purchase. After a couple downloads, we may ask for your email to keep the packs coming.</p>
        <div className="mt-5 flex justify-center">
          <Button size="lg" onClick={() => window.dispatchEvent(new Event("open-funnel"))}>Claim Free Pack</Button>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Popular Picks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {kits.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Tip: Free collections drive list growth—expect periodic drops and exclusive bundles for subscribers.</p>
      </section>
    </main>
  );
}
