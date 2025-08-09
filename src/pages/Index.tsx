import { useSEO } from "@/hooks/useSEO";
import Hero from "@/components/home/Hero";
import BrandMarquee from "@/components/common/BrandMarquee";
import ProductCard from "@/components/products/ProductCard";
import FunnelGate from "@/components/funnel/FunnelGate";
import { products, getProductsByType } from "@/data/products";

const Index = () => {
  useSEO({
    title: "Inceptive by Marc Antione — Pro Drum Kits & Beat Store",
    description: "Curated drum kits, loops, and a native beat store inspired by HHS and WavSupply.",
    canonical: window.location.origin + "/",
  });

  const newDrops = products.slice(0, 4);
  const kits = getProductsByType("kit");

  return (
    <div className="min-h-screen">
      <FunnelGate />
      <Hero />
      <BrandMarquee />

      <main className="container py-12 space-y-12">
        <section>
          <header className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">New Drops</h2>
            <a href="/kits" className="text-sm text-muted-foreground hover:text-foreground">View all</a>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newDrops.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section>
          <header className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">Latest Kits</h2>
            <a href="/kits" className="text-sm text-muted-foreground hover:text-foreground">Browse Kits</a>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kits.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section>
          <header className="mb-4">
            <h2 className="text-2xl font-semibold">Beat Store</h2>
            <p className="text-muted-foreground text-sm">Embed your BeatStars Blaze Player or use the native player.</p>
          </header>
          <div className="rounded-xl border overflow-hidden">
            <iframe
              src="https://player.beatstars.com/?storeId=YOUR_ID"
              width="100%"
              height={650}
              frameBorder={0}
              scrolling="no"
              title="BeatStars Player"
            />
          </div>
        </section>

        <section>
          <header className="mb-4">
            <h2 className="text-2xl font-semibold">Quick Buy</h2>
            <p className="text-muted-foreground text-sm">Gumroad and Shopify Buy Button are supported.</p>
          </header>
          <div className="space-y-3">
            <a className="gumroad-button" href="https://gum.co/YOUR_PRODUCT" target="_blank" rel="noreferrer noopener">Buy on Gumroad</a>
            <div id="product-component-XXXX" className="text-sm text-muted-foreground">Place your Shopify Buy Button here.</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
