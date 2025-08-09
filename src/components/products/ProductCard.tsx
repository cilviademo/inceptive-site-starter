import { Link } from "react-router-dom";
import { Heart, PlayCircle } from "lucide-react";
import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  const price = `$${(product.price / 100).toFixed(2)}`;
  const compare = product.compareAtPrice ? `$${(product.compareAtPrice / 100).toFixed(2)}` : undefined;
  const { toggle, has } = useWishlist();
  const { add } = useCart();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hover, setHover] = useState(false);

  const onEnter = () => {
    setHover(true);
    if (product.previewAudio) {
      if (!audioRef.current) {
        audioRef.current = new Audio(product.previewAudio);
      }
      try { audioRef.current.currentTime = 0; audioRef.current.play(); } catch {}
    }
  };
  const onLeave = () => {
    setHover(false);
    if (audioRef.current) { try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch {} }
  };

  const onAdd = () => {
    add(product, 1);
    // Toast handled in Cart page or via global listener if needed
  };

  return (
    <article className="group relative rounded-xl border bg-card hover:shadow-glow transition-shadow animate-fade-in">
      <button
        aria-label={has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggle(product.id)}
        className="absolute right-3 top-3 z-10 rounded-full bg-background/70 backdrop-blur p-2 border hover:shadow-glow"
      >
        <Heart className={`h-4 w-4 ${has(product.id) ? "text-primary" : "text-muted-foreground"}`} />
      </button>
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden rounded-t-xl border-b" onMouseEnter={onEnter} onMouseLeave={onLeave}>
        <div className="absolute left-3 top-3 z-10">
          <Badge variant="secondary">Available</Badge>
        </div>
        <img
          src={product.coverArt}
          alt={`${product.title} cover art`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <PlayCircle
          className="pointer-events-none absolute inset-0 m-auto h-12 w-12 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 drop-shadow"
          aria-hidden
        />
        {hover && product.previewAudio && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary" />
        )}
      </Link>
      <div className="p-4">
        <h3 className="font-semibold leading-tight">
          <Link to={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{price}</span>
          {compare && <span className="text-xs text-muted-foreground line-through">{compare}</span>}
        </div>
        <div className="mt-3">
          <Button onClick={onAdd} size="sm" className="w-full">Add to Cart</Button>
        </div>
      </div>
    </article>
  );
}
