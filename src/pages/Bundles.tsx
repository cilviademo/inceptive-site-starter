import ProductCard from "@/components/products/ProductCard";
import { getProductsByType } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Bundles() {
  useSEO({ title: "Bundles — DrumHaus", description: "Curated bundles for instant savings." });
  const bundles = getProductsByType("bundle");
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Bundles</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bundles.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
