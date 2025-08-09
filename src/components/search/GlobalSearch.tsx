import { useEffect, useMemo, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { products } from "@/data/products";

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "kit" | "beat" | "bundle">("all");
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey)))) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("drumhaus:open-search", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("drumhaus:open-search", onOpen as EventListener);
    };
  }, []);

  const results = useMemo(() => {
    const lower = q.toLowerCase();
    return products
      .filter((p) => (filter === "all" ? true : p.type === filter))
      .filter((p) => p.title.toLowerCase().includes(lower))
      .slice(0, 20);
  }, [q, filter]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search kits, beats, bundles... ( / )" value={q} onValueChange={setQ} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Filters">
          <div className="flex gap-2 px-2 py-1">
            {(["all", "kit", "beat", "bundle"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`h-7 rounded-md border px-2 text-xs ${filter === t ? "bg-primary text-primary-foreground" : "bg-background"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </CommandGroup>
        <CommandGroup heading="Results">
          {results.map((p) => (
            <CommandItem
              key={p.id}
              value={p.title}
              onSelect={() => {
                setOpen(false);
                navigate(`/product/${p.slug}`);
              }}
            >
              <img src={p.coverArt} alt="" className="mr-2 h-8 w-8 rounded object-cover" />
              <span className="truncate">{p.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
