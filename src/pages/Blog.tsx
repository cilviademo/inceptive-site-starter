import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  useSEO({ title: "Blog — Inceptive by Marc Antione", description: "Drops, placements, and tips." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-6">
        <a href="/playbook" className="block rounded-xl border p-6 hover-scale">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Featured</p>
          <h2 className="text-2xl font-semibold mt-1">Beat & Sample Pack Growth Playbook</h2>
          <p className="text-sm text-muted-foreground mt-2">Who’s winning and what to ship next for SEO + conversions.</p>
        </a>
      </div>
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
