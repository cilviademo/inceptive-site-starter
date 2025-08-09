import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const KEY = "drumhaus_exit_seen";

export default function ExitIntent() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const seen = localStorage.getItem(KEY) === "true";
    if (seen) return;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) setOpen(true);
    };
    window.addEventListener("mouseout", onMouseOut);
    return () => window.removeEventListener("mouseout", onMouseOut);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(KEY, "true");
    setOpen(false);
    const webhook = localStorage.getItem("drumhaus_zapier_webhook") || "";
    if (!webhook) {
      toast({ title: "Saved", description: "We’ll remind you with a 10% code." });
      return;
    }
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          type: "exit_intent",
          email,
          at: new Date().toISOString(),
          from: window.location.href,
        }),
      });
      toast({ title: "Requested", description: "We sent your reminder to your email." });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not send, check webhook URL.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Don’t leave empty-handed</DialogTitle>
          <DialogDescription>Drop your email and we’ll send a 10% coupon and your saved items.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input type="email" required placeholder="you@producer.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button type="submit">Send</Button>
        </form>
        <p className="text-xs text-muted-foreground">Tip: Set Zapier webhook in localStorage key “drumhaus_zapier_webhook”.</p>
      </DialogContent>
    </Dialog>
  );
}
