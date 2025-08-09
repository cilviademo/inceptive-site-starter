import { useSEO } from "@/hooks/useSEO";

export default function Account() {
  useSEO({ title: "Account — DrumHaus", description: "Manage your profile and orders." });
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="text-muted-foreground mt-2">Authentication coming later.</p>
    </main>
  );
}
