import { useSEO } from "@/hooks/useSEO";

export default function About() {
  useSEO({ title: "About — DrumHaus", description: "Our mission and ethos." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">We curate world-class drum kits and beats with a producer-first approach. Designed to be fast, flexible, and creator-friendly.</p>
    </main>
  );
}
