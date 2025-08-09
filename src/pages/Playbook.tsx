import { useSEO } from "@/hooks/useSEO";

export default function Playbook() {
  useSEO({
    title: "Beat & Sample Pack Growth Playbook — Inceptive by Marc Antione",
    description: "Who’s winning in beats/sample packs, what to copy ethically, and the next sprint for SEO + conversions.",
    canonical: window.location.origin + "/playbook",
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Beat & Sample Pack Growth Playbook",
    author: { "@type": "Person", name: "Marc Antione" },
    publisher: { "@type": "Organization", name: "Inceptive by Marc Antione" },
  };

  return (
    <main className="container py-10 prose prose-invert max-w-none">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <h1>Beat & Sample Pack Growth Playbook</h1>
      <p>Traffic snapshots point to a few leaders and repeatable patterns we can ethically adapt.</p>

      <h2>Who’s winning (and why)</h2>
      <h3>Beat marketplaces</h3>
      <ul>
        <li><strong>BeatStars</strong> — ~4.2M monthly visits, low bounce, deep engagement; embeds (Blaze Player) power off-site selling. Strong brand queries + marketplace long tail.</li>
        <li><strong>TRAKTRAIN</strong> — smaller but with niche credibility; study minimalist catalog UX.</li>
      </ul>

      <h3>Sample pack / drum kit ecosystems</h3>
      <ul>
        <li><strong>Splice</strong> — ~3.8M monthly visits, high pages/visit; wins on library depth, search, and tutorials that rank. Great IA and internal linking.</li>
        <li><strong>Loopmasters / Loopcloud</strong> — recognizable category hubs and filters.</li>
        <li><strong>Producer Loops</strong> — breadth of genre landing pages.</li>
        <li><strong>Cymatics</strong> — heavy on free packs as lead magnets; consistent traffic for “free drum kit” searches and launches.</li>
        <li><strong>Looperman / SampleFocus</strong> — massive UGC loops; long-tail search via uploads.</li>
      </ul>

      <h2>What to copy next</h2>
      <h3>1) SEO structure that actually ranks</h3>
      <ul>
        <li>Category hubs targeting buyer intent: Trap Drum Kits, Boom Bap Drums, R&B Sample Packs, Cinematic One-Shots, Royalty-Free Loops.</li>
        <li>Long-tail collections: Free 808s, Lofi Drum Kit, Afrobeats Percussion Pack.</li>
        <li>Evergreen editorial: short tutorials + internal links to packs.</li>
      </ul>

      <h3>2) Conversion patterns</h3>
      <ul>
        <li>Above-the-fold audio: sticky mini-player + waveform previews.</li>
        <li>“Free pack” CTA + exit intent; upsell a bundle post-signup.</li>
        <li>Bundles & “You might also like” on every product page.</li>
        <li>Licensing clarity block + FAQ schema on PDPs.</li>
      </ul>

      <h3>3) Technical SEO musts</h3>
      <ul>
        <li>Schema: Product, Offer, AggregateRating, FAQ on PDPs; BreadcrumbList sitewide.</li>
        <li>Speed: lazy-load artwork/waveforms; pre-render top categories.</li>
        <li>Search UX: fast filters (genre, BPM, key, format) and synonyms.</li>
      </ul>

      <h3>4) Distribution stack</h3>
      <ul>
        <li>BeatStars embed page to monetize immediately while native catalog grows.</li>
        <li>Gumroad/Shopify Buy Buttons for collabs/limited drops.</li>
      </ul>

      <h2>Quick-hit keywords to publish</h2>
      <p>“Free Trap Drum Kit 2025,” “Free 808 Pack,” “Royalty-Free R&B Sample Pack,” “Lofi Drum Kit,” “Boom Bap Drum Breaks,” “Phonk 808 Pack,” “Afrobeats Drum Kit.”</p>

      <h2>Page templates added</h2>
      <ul>
        <li><a href="/kits/free">/kits/free</a> — free pack lander (email wall after a couple downloads).</li>
        <li><a href="/genre/trap">/genre/[slug]</a> — genre hubs with filters and FAQ.</li>
        <li><a href="/beats">/beats</a> — native grid + BeatStars player.</li>
      </ul>

      <h2>KPI guardrails</h2>
      <ul>
        <li>Bounce &lt; 40% and &gt; 4 pages/visit on catalog.</li>
        <li>Email capture rate 3–8% on free pack landers.</li>
        <li>Return visitors &gt; 25% after 60–90 days with content cadence.</li>
      </ul>
    </main>
  );
}
