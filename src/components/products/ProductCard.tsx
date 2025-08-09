import { Link } from "react-router-dom";
import { Heart, PlayCircle } from "lucide-react";
import type { Product } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { usePlayer } from "@/context/PlayerContext";
import { track } from "@/lib/analytics";
export default function ProductCard({ product }: { product: Product }) {
  const price = `$${(product.price / 100).toFixed(2)}`;
  const compare = product.compareAtPrice ? `$${(product.compareAtPrice / 100).toFixed(2)}` : undefined;

  return (
    <article className="group relative rounded-xl border bg-card hover:shadow-glow transition-shadow animate-fade-in">
      <Link to={`/product/${product.slug}`} className="relative block overflow-hidden rounded-t-xl border-b">
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
      </Link>
      <div className="p-4">
        <h3 className="font-semibold leading-tight">
          <Link to={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">{price}</span>
          {compare && <span className="text-xs text-muted-foreground line-through">{compare}</span>}
        </div>
      </div>
    </article>
  );
}
