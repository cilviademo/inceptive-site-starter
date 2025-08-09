import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function IntegrationSettings() {
  const [open, setOpen] = useState(false);
  const [beatstarsId, setBeatstarsId] = useState("");
  const [gumroadUrl, setGumroadUrl] = useState("");
  const [shopifyEmbed, setShopifyEmbed] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setBeatstarsId(localStorage.getItem("integrations.beatstars_id") || "");
      setGumroadUrl(localStorage.getItem("integrations.gumroad_url") || "");
      setShopifyEmbed(localStorage.getItem("integrations.shopify_embed") || "");
      setWebhookUrl(localStorage.getItem("drumhaus_zapier_webhook") || "");
    } catch {}
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-integrations", onOpen);
    return () => window.removeEventListener("open-integrations", onOpen);
  }, []);

  const save = () => {
    try {
      localStorage.setItem("integrations.beatstars_id", beatstarsId.trim());
      localStorage.setItem("integrations.gumroad_url", gumroadUrl.trim());
      localStorage.setItem("integrations.shopify_embed", shopifyEmbed.trim());
      localStorage.setItem("drumhaus_zapier_webhook", webhookUrl.trim());
      toast({ title: "Saved", description: "Integrations updated." });
      setOpen(false);
    } catch (e) {
      toast({ title: "Error", description: "Could not save settings.", variant: "destructive" });
    }
  };

  const handleTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl) {
      toast({ title: "Error", description: "Please enter your Zapier webhook URL", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    console.log("Triggering Zapier webhook:", webhookUrl);
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({ timestamp: new Date().toISOString(), triggered_from: window.location.origin }),
      });
      toast({ title: "Request Sent", description: "Check your Zap's history to confirm it was triggered." });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({ title: "Error", description: "Failed to trigger Zapier webhook.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open integrations">
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Integrations</DialogTitle>
          <DialogDescription>Connect BeatStars, Gumroad, Shopify, and Zapier.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="beatstars">BeatStars Store ID</Label>
            <Input id="beatstars" placeholder="e.g. 123456" value={beatstarsId} onChange={(e) => setBeatstarsId(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gumroad">Gumroad Product URL</Label>
            <Input id="gumroad" placeholder="https://gum.co/your-product" value={gumroadUrl} onChange={(e) => setGumroadUrl(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="shopify">Shopify Buy Button Embed</Label>
            <Textarea id="shopify" placeholder="Paste full BuyButton embed code here" value={shopifyEmbed} onChange={(e) => setShopifyEmbed(e.target.value)} />
            <p className="text-xs text-muted-foreground">We will render this code on the homepage Quick Buy section.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zapier">Zapier Webhook URL</Label>
            <Input id="zapier" placeholder="https://hooks.zapier.com/hooks/catch/..." value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={save}>Save</Button>
              <Button size="sm" onClick={handleTrigger} disabled={isLoading}>{isLoading ? "Sending..." : "Test Zap"}</Button>
            </div>
            <p className="text-xs text-muted-foreground">Tip: Add a Webhooks by Zapier "Catch Hook" trigger in your Zap.</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save} className="ml-auto">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
