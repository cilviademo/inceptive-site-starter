import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  useSEO({ title: "Blog — DrumHaus", description: "Drops, placements, and tips." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[1,2,3].map((i) => (
          <article key={i} className="rounded-xl border p-4">
            <h3 className="font-semibold">Post Title {i}</h3>
            <p className="text-sm text-muted-foreground mt-2">Coming soon: news, drops, and placements.</p>
          </article>
        ))}
      </div>
    </main>
  );
}
