import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FUNNEL_DONE_KEY = "drumhaus_funnel_done";
const FUNNEL_EMAIL_KEY = "drumhaus_lead_email";

export default function FunnelGate() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "reward">("form");
  const [email, setEmail] = useState("");
  const coupon = useMemo(() => "WELCOME10", []);

  useEffect(() => {
    const done = localStorage.getItem(FUNNEL_DONE_KEY) === "true";
    if (!done) setOpen(true);
    const openHandler = () => {
      setStep("form");
      setOpen(true);
    };
    window.addEventListener("open-funnel", openHandler);
    return () => window.removeEventListener("open-funnel", openHandler);
  }, []);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      localStorage.setItem(FUNNEL_EMAIL_KEY, email);
    } catch {}
    setStep("reward");
  };

  const enterSite = () => {
    try {
      localStorage.setItem(FUNNEL_DONE_KEY, "true");
    } catch {}
    setOpen(false);
  };

  const skip = () => {
    try {
      localStorage.setItem(FUNNEL_DONE_KEY, "true");
    } catch {}
    setOpen(false);
  };

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(coupon);
    } catch {}
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center p-4",
        "bg-background/80 backdrop-blur-sm"
      )}
    >
      <Card className="w-full max-w-lg border-muted/40">
        {step === "form" ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Free Mini Kit + 10% Off</CardTitle>
              <CardDescription>
                Join the list for exclusive drops. Get a welcome coupon now.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@producer.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">Unlock Offer</Button>
                  <Button type="button" variant="outline" onClick={skip}>
                    Continue
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Gift Unlocked</CardTitle>
              <CardDescription>
                Use this code at checkout. We also sent details to {email}.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-md border px-4 py-3">
                <span className="font-semibold tracking-wide">{coupon}</span>
                <Button variant="outline" size="sm" onClick={copyCoupon}>
                  Copy
                </Button>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" onClick={enterSite}>Enter Site</Button>
                <Button variant="outline" asChild>
                  <a href="/kits">Shop Kits</a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: Your discount applies to drum kits and bundles.
              </p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
