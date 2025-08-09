const brands = [
  "Splice",
  "BeatStars",
  "Ableton",
  "Native Instruments",
  "Arturia",
  "YouTube",
  "TikTok",
];

export default function BrandMarquee() {
  return (
    <section className="py-8">
      <div className="container">
        <div className="overflow-hidden">
          <div className="flex gap-10 animate-marquee will-change-transform" aria-hidden>
            {brands.concat(brands).map((b, i) => (
              <span key={i} className="text-sm md:text-base text-muted-foreground">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
