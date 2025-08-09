import { useSEO } from "@/hooks/useSEO";
import Hero from "@/components/home/Hero";
import BrandMarquee from "@/components/common/BrandMarquee";
import ProductCard from "@/components/products/ProductCard";
import FunnelGate from "@/components/funnel/FunnelGate";
import BeatStarsEmbed from "@/components/embeds/BeatStarsEmbed";
import { products, getProductsByType } from "@/data/products";

const Index = () => {
  useSEO({
    title: "Inceptive by Marc Antione — Pro Drum Kits & Beat Store",
    description: "Curated drum kits, loops, and a native beat store inspired by HHS and WavSupply.",
    canonical: window.location.origin + "/",
  });

  const newDrops = products.slice(0, 4);
  const kits = getProductsByType("kit");
  const beatstarsId = (typeof window !== "undefined" && localStorage.getItem("integrations.beatstars_id")) || "";
  const gumroadUrl = (typeof window !== "undefined" && localStorage.getItem("integrations.gumroad_url")) || "";
  const shopifyEmbed = (typeof window !== "undefined" && localStorage.getItem("integrations.shopify_embed")) || "";

  return (
    <div className="min-h-screen">
      <FunnelGate />
      <Hero />
      <BrandMarquee />

      <main className="container py-12 space-y-12">
        <section aria-labelledby="featured-stories">
          <header className="mb-6">
            <h2 id="featured-stories" className="text-2xl font-semibold">Featured Stories</h2>
            <p className="text-sm text-muted-foreground">New Beat Drops and behind-the-scenes.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-xl border overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold">New Beat Drops</h3>
                <p className="mt-2 text-sm text-muted-foreground">Fresh instrumentals curated weekly. Tap in for the newest wave.</p>
                <a href="/beats" className="story-link mt-4 inline-block">Read more</a>
              </div>
            </article>
            <article className="rounded-xl border overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold">How to Mix 808s</h3>
                <p className="mt-2 text-sm text-muted-foreground">Practical tips to make your low-end hit without muddying your mix.</p>
                <a href="/blog/how-to-mix-808s" className="story-link mt-4 inline-block">Read more</a>
              </div>
            </article>
          </div>
        </section>

        <section>
          <header className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">Recent Additions</h2>
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
            <h2 className="text-2xl font-semibold">New Kits</h2>
            <a href="/kits" className="text-sm text-muted-foreground hover:text-foreground">View All</a>
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
          <div className="rounded-xl border overflow-hidden p-0">
            {beatstarsId ? (
              <BeatStarsEmbed storeId={beatstarsId} />
            ) : (
              <div className="p-6 text-sm text-muted-foreground">
                Connect your BeatStars store in Integrations.
                <div className="mt-3">
                  <button className="underline" onClick={() => window.dispatchEvent(new Event("open-integrations"))}>Open Integrations</button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="editorial-commerce">
          <header className="mb-6">
            <h2 id="editorial-commerce" className="text-2xl font-semibold">From the Editorial</h2>
            <p className="text-muted-foreground text-sm">Stories paired with sounds you can use right now.</p>
          </header>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="rounded-xl border overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold">The anatomy of a modern trap kit</h3>
                <p className="mt-2 text-sm text-muted-foreground">Go inside our curation process and grab the exact one-shots featured.</p>
                <a href="/blog" className="story-link mt-4 inline-block">Read article</a>
              </div>
            </article>
            <article className="rounded-xl border overflow-hidden">
              <div className="p-6">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Shop the sounds</h4>
                <div className="mt-3 grid grid-cols-1">
                  {kits.slice(0, 1).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section>
          <header className="mb-4">
            <h2 className="text-2xl font-semibold">Quick Buy</h2>
            <p className="text-muted-foreground text-sm">Gumroad and Shopify Buy Button are supported.</p>
          </header>
          <div className="space-y-3">
            {gumroadUrl ? (
              <a className="gumroad-button" href={gumroadUrl} target="_blank" rel="noreferrer noopener">Buy on Gumroad</a>
            ) : (
              <div className="text-sm text-muted-foreground">Set your Gumroad product URL in Integrations.</div>
            )}
            {shopifyEmbed ? (
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: shopifyEmbed }} />
            ) : (
              <div className="text-sm text-muted-foreground">Paste your Shopify Buy Button embed in Integrations.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
