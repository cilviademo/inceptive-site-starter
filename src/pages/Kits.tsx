import { useMemo, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { getProductsByType } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Kits() {
  useSEO({ title: "Kits — Inceptive by Marc Antione", description: "Drum kits, one-shots, loops with filters and sorting." });

  const all = getProductsByType("kit");
  const genres = Array.from(new Set(all.map((p) => p.genre).filter(Boolean))) as string[];
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");
  const [genre, setGenre] = useState<string>("");
  const [visible, setVisible] = useState(8);

  const filtered = useMemo(() => {
    let list = all.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
    if (genre) list = list.filter((p) => (p.genre || "").toLowerCase() === genre.toLowerCase());
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [all, query, sort, genre]);

  const toShow = filtered.slice(0, visible);

  return (
    <main className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Kits</h1>
        <p className="text-muted-foreground">Tight, card-based grid with price and ATC.</p>
      </header>
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search kits..."
          aria-label="Search kits"
          className="h-10 px-4 rounded-md border bg-background"
        />
        <select value={genre} onChange={(e) => { setGenre(e.target.value); setVisible(8); }} aria-label="Filter by genre" className="h-10 px-3 rounded-md border bg-background">
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort kits" className="h-10 px-3 rounded-md border bg-background">
          <option value="new">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {toShow.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visible < filtered.length && (
        <div className="flex justify-center mt-8">
          <button className="px-4 h-10 rounded-md border bg-background hover:shadow-glow" onClick={() => setVisible((v) => v + 8)}>
            Load more
          </button>
        </div>
      )}
    </main>
  );
}
