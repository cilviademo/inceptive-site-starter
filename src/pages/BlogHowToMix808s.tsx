import { useSEO } from "@/hooks/useSEO";

export default function BlogHowToMix808s() {
  useSEO({
    title: "How to Mix 808s (Quick Guide) — Inceptive by Marc Antione",
    description: "Fast, practical tips to get your 808s loud and clean. Includes references and pack suggestions.",
    canonical: window.location.origin + "/blog/how-to-mix-808s",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Mix 808s",
    author: { "@type": "Person", name: "Marc Antione" },
  };

  return (
    <main className="container py-10 prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1>How to Mix 808s (Quick Guide)</h1>
      <ol>
        <li><strong>Sound selection:</strong> pick a clean 808 sample; avoid stacking multiple conflicting lows.</li>
        <li><strong>Tuning:</strong> match the key of your beat; pitch the 808 to your root.</li>
        <li><strong>EQ:</strong> low-pass at 8–12kHz; surgical cut around muddy areas (200–300Hz).</li>
        <li><strong>Compression/Saturation:</strong> gentle comp; add harmonic saturation for audibility on small speakers.</li>
        <li><strong>Sidechain:</strong> duck the 808 a touch to the kick to reduce masking.</li>
      </ol>
      <p>Try our <a href="/product/modern-one-shots">MODERN ONE-SHOTS</a> for consistent 808s and punchy drums.</p>
    </main>
  );
}
