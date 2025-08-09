import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

function toTitle(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function Genre() {
  const { slug = "" } = useParams();
  const [types, setTypes] = useState<{kit: boolean; beat: boolean; bundle: boolean}>({ kit: true, beat: true, bundle: true });
  const name = toTitle(slug);

  useSEO({
    title: `${name} Drum Kits & Beats — Inceptive by Marc Antione`,
    description: `Browse ${name} kits, loops, and beats with quick filters.`,
    canonical: window.location.origin + `/genre/${slug}`,
  });

  const list = useMemo(() => {
    const allow = (t: string) => (t === "kit" && types.kit) || (t === "beat" && types.beat) || (t === "bundle" && types.bundle);
    const s = slug.toLowerCase();
    return products.filter((p) => allow(p.type) && ((p.genre || "").toLowerCase() === toTitle(slug).toLowerCase() || p.tags.map((t) => t.toLowerCase()).includes(s)));
  }, [slug, types]);

  return (
    <main className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-muted-foreground">Curated top picks, updated with new drops.</p>
      </header>
      <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={types.kit} onChange={(e) => setTypes((x) => ({ ...x, kit: e.target.checked }))}/> Kits</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={types.beat} onChange={(e) => setTypes((x) => ({ ...x, beat: e.target.checked }))}/> Beats</label>
        <label className="inline-flex items-center gap-2"><input type="checkbox" checked={types.bundle} onChange={(e) => setTypes((x) => ({ ...x, bundle: e.target.checked }))}/> Bundles</label>
      </div>
      {list.length === 0 ? (
        <p className="text-muted-foreground">No products yet for this genre. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-3">FAQ</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">Are these royalty-free?</p>
            <p>Yes—see our full license for details on placements and broadcast.</p>
          </div>
          <div>
            <p className="font-medium text-foreground">What DAWs are supported?</p>
            <p>All WAV one-shots and loops work in any DAW (FL, Ableton, Logic, Pro Tools, Studio One).</p>
          </div>
        </div>
      </section>
    </main>
  );
}
