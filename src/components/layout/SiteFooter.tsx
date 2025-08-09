export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 grid gap-6 md:grid-cols-3 text-sm">
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
