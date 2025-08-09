import { Button } from "@/components/ui/button";
import { heroAsset } from "@/data/products";

export default function Hero() {
  return (
    <section className="animate-fade-in relative overflow-hidden rounded-3xl border bg-gradient-to-b from-background to-muted">
      <div className="absolute -inset-24 opacity-30 bg-[radial-gradient(ellipse_at_top_left,theme(colors.primary.DEFAULT/.35)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,theme(colors.accent.DEFAULT/.35)_0%,transparent_50%)]" aria-hidden />
      <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Where beats speak louder than words
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Vintage breaks, modern one-shots, exclusive loops. Level up your sound with industry-grade packs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="hero" size="lg" asChild>
              <a href="/kits">Browse Kits</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/beats">Open Beat Store</a>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.dispatchEvent(new Event("open-funnel"))}>
              Get Free Mini Kit
            </Button>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border shadow-elegant">
          <img src={heroAsset} alt="Studio hero with drum machines and synths" loading="lazy" className="w-full h-full object-cover hover-scale" />
        </div>
      </div>
    </section>
  );
}
