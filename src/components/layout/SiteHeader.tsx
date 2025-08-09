import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">DrumHaus</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/kits" className={navLinkClass}>Kits</NavLink>
          <NavLink to="/beats" className={navLinkClass}>Beats</NavLink>
          <NavLink to="/bundles" className={navLinkClass}>Bundles</NavLink>
          <NavLink to="/blog" className={navLinkClass}>Blog</NavLink>
          <NavLink to="/license" className={navLinkClass}>License</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/support" className={navLinkClass}>Support</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/cart">Cart</Link>
          </Button>
          <Button variant="hero" asChild>
            <Link to="/beats">Open Beat Store</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
