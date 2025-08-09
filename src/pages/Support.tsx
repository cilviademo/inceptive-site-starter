import { useSEO } from "@/hooks/useSEO";

export default function Support() {
  useSEO({ title: "Support — DrumHaus", description: "Get help with orders and licensing." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="text-muted-foreground mt-2">Email us at support@example.com or reach out on socials.</p>
    </main>
  );
}
