import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const key = "optin_emails";
      const arr = JSON.parse(localStorage.getItem(key) || "[]");
      arr.push({ email, t: Date.now() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    toast({ title: "You're in!", description: "Grab your free starter pack — check your inbox soon." });
    setEmail("");
  };

  const wixEmbed = `<div id="inceptive-optin" style="font-family:inherit">
  <form onsubmit="(function(e){e.preventDefault();var i=e.target.querySelector('input');localStorage.setItem('inceptive_optin',i.value);i.value='';alert('Thanks! Check your inbox for your starter pack.');})(event)" style="display:flex;gap:8px">
    <input type="email" required placeholder="Enter your email" style="flex:1;padding:10px;border:1px solid #ccc;border-radius:8px;background:transparent;color:inherit"/>
    <button type="submit" style="padding:10px 14px;border-radius:8px;border:1px solid #ccc;background:transparent;color:inherit">Get Free Pack</button>
  </form>
</div>`;

  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 grid gap-6 md:grid-cols-4 text-sm">
        <div>
          <p className="font-semibold">Inceptive by Marc Antione</p>
          <p className="text-muted-foreground mt-2">Curated drum kits, loops, and a native beat store inspired by industry leaders.</p>
        </div>
        <div>
          <p className="font-semibold">Channels</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>BeatStars</li>
            <li>Gumroad</li>
            <li>Shopify</li>
            <li>TikTok Shop</li>
            <li>YouTube</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Legal</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>License</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Grab your free starter pack</p>
          <form onSubmit={onSubmit} className="mt-2 flex gap-2">
            <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
            <Button type="submit" variant="secondary">Subscribe</Button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="mt-2 px-0 h-auto underline">Get Wix embed code</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wix embed code</DialogTitle>
              </DialogHeader>
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Paste this into a Wix "Embed HTML" element.</p>
                <textarea readOnly className="mt-3 w-full h-40 rounded-md border bg-background p-2 text-xs">{wixEmbed}</textarea>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground flex items-center justify-between">
          <p>© {new Date().getFullYear()} Inceptive by Marc Antione. All rights reserved.</p>
          <p>Built with love.</p>
        </div>
      </div>
    </footer>
  );
}
