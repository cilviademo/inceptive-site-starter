import { useParams } from "react-router-dom";
import { useState } from "react";
import { getProductBySlug, products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { useSEO } from "@/hooks/useSEO";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Star } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");

  useSEO({
    title: product ? `${product.title} — Inceptive by Marc Antione` : "Product — Inceptive by Marc Antione",
    description: product?.descriptionMD.slice(0, 150),
    canonical: window.location.href,
    image: product?.coverArt,
  });

  if (!product) return <main className="container py-10"><p>Product not found.</p></main>;

  const related = products.filter((p) => product.crossSell?.includes(p.slug));
  const { add } = useCart();
  const [tier, setTier] = useState<"standard" | "premium" | "exclusive">("standard");
  const base = product.price;
  const multiplier = tier === "standard" ? 1 : tier === "premium" ? 1.5 : 3;
  const display = `$${((base * multiplier) / 100).toFixed(2)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.coverArt],
    description: product.descriptionMD,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: (product.price / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
    ...(product.rating && product.ratingCount ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.ratingCount,
      }
    } : {}),
  } as const;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these packs royalty-free?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. For major label placements/broadcast, master clearance may be required." }
      },
      {
        "@type": "Question",
        name: "Which DAWs are supported?",
        acceptedAnswer: { "@type": "Answer", text: "All WAV one-shots/loops work in any DAW (FL, Ableton, Logic, Pro Tools, Studio One)." }
      }
    ]
  };

  return (
    <main className="container py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden border">
          <img src={product.coverArt} alt={`${product.title} cover art`} className="w-full object-cover" />
          {product.previewAudio && (
            <div className="p-4 border-t">
              <audio controls src={product.previewAudio} className="w-full" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-4 space-y-3">
            <div className="inline-flex rounded-md border p-1">
              <button type="button" onClick={() => setTier("standard")} className={`px-3 py-1.5 text-sm rounded-md ${tier === "standard" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Standard</button>
              <button type="button" onClick={() => setTier("premium")} className={`px-3 py-1.5 text-sm rounded-md ${tier === "premium" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Premium</button>
              <button type="button" onClick={() => setTier("exclusive")} className={`px-3 py-1.5 text-sm rounded-md ${tier === "exclusive" ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>Exclusive</button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold">{display}</span>
              <Button onClick={() => add(product, 1, { tier })}>Add to Cart</Button>
            </div>
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Secure checkout
            </p>
          </div>
          <p className="text-muted-foreground mt-2 whitespace-pre-line">{product.descriptionMD}</p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Contents</h3>
            <ul className="space-y-1 text-sm">
              {product.includes.map((i, idx) => (
                <li key={idx} className="text-muted-foreground">• {i.name}{i.count ? ` x${i.count}` : ""}{i.format ? ` (${i.format})` : ""}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">License</h3>
            <p className="text-sm text-muted-foreground">Royalty-free for beat sales and streaming. Master clearance may be required for major placements. See full license.</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
