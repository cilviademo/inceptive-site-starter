import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByType } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Kits() {
  useSEO({ title: "Kits — Inceptive by Marc Antione", description: "Drum kits, one-shots, loops with filters and sorting." });

  const all = getProductsByType("kit");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [all, query, sort]);

  return (
    <main className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Kits</h1>
        <p className="text-muted-foreground">Tight, card-based grid with price and ATC.</p>
      </header>
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search kits..."
          aria-label="Search kits"
          className="h-10 px-4 rounded-md border bg-background"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort kits" className="h-10 px-3 rounded-md border bg-background">
          <option value="new">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
