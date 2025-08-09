import { useSEO } from "@/hooks/useSEO";

export default function License() {
  useSEO({ title: "License — DrumHaus", description: "Clear terms for kits and beats." });
  return (
    <main className="container py-10 prose prose-zinc max-w-none">
      <h1>License</h1>
      <p>All sample packs are royalty-free for beat sales and streaming. For major label placements or broadcast, master clearance may be required. Please contact support with details.</p>
      <h2>Allowed</h2>
      <ul>
        <li>Use in your own beats and songs</li>
        <li>Monetize on streaming platforms</li>
        <li>Sell beats with licenses (non-exclusive/exclusive)</li>
      </ul>
      <h2>Not Allowed</h2>
      <ul>
        <li>Reselling the raw samples</li>
        <li>Repackaging or redistribution</li>
      </ul>
    </main>
  );
}
