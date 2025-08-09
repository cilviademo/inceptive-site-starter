import BeatStarsEmbed from "@/components/embeds/BeatStarsEmbed";
import { getProductsByType } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Beats() {
  useSEO({ title: "Beats — DrumHaus", description: "Native playlist and BeatStars Blaze Player embed." });
  const beats = getProductsByType("beat");
  return (
    <main className="container py-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Beat Store</h1>
        <p className="text-muted-foreground">Preview and purchase beats. Embed your BeatStars store below.</p>
      </header>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">Native Playlist</h2>
        <ul className="space-y-3">
          {beats.map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.genre} · {b.bpm} BPM {b.key ? `· ${b.key}` : ""}</p>
              </div>
              {b.previewAudio && (
                <audio controls src={b.previewAudio} className="w-64" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-3">BeatStars</h2>
        <BeatStarsEmbed storeId={beats[0]?.externalChannels?.beatstarsId || "YOUR_ID"} />
      </section>
    </main>
  );
}
