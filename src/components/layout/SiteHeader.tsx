import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import IntegrationSettings from "@/components/system/IntegrationSettings";
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `story-link px-3 py-2 rounded-md transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`;

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-display font-bold text-xl tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Inceptive by Marc Antione</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2 font-display tracking-tight">
          <NavLink to="/kits" className={navLinkClass}>Kits</NavLink>
          <NavLink to="/beats" className={navLinkClass}>Beats</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            onClick={() => window.dispatchEvent(new Event("drumhaus:open-search"))}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/cart">Cart</Link>
          </Button>
          <IntegrationSettings />
        </div>
      </div>
    </header>
  );
}
