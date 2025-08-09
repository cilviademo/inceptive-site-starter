import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const price = `$${(product.price / 100).toFixed(2)}`;
  const compare = product.compareAtPrice ? `$${(product.compareAtPrice / 100).toFixed(2)}` : undefined;

  return (
    <article className="group relative rounded-xl border bg-card hover:shadow-glow transition-shadow">
      <Link to={`/product/${product.slug}`} className="block overflow-hidden rounded-t-xl border-b">
        <img
          src={product.coverArt}
          alt={`${product.title} cover art`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">
            <Link to={`/product/${product.slug}`}>{product.title}</Link>
          </h3>
          {product.badges?.[0] && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border">
              {product.badges[0]}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground capitalize">{product.type}{product.genre ? ` · ${product.genre}` : ""}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-semibold">{price}</span>
          {compare && <span className="text-xs text-muted-foreground line-through">{compare}</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" onClick={() => toast({ title: "Added to cart", description: product.title })}>
            Add to Cart
          </Button>
          <Button variant="outline" asChild>
            <a href={product.externalChannels?.gumroadUrl ?? "#"} target="_blank" rel="noreferrer noopener">Gumroad</a>
          </Button>
        </div>
      </div>
    </article>
  );
}
