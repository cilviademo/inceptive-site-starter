import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  qty: number;
  type: Product["type"];
  coverArt?: string;
  meta?: Record<string, any>;
}

const KEY = "cart_items";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent("cart:updated", { detail: { count: items.reduce((s, i) => s + i.qty, 0) } }));
    } catch {}
  }, [items]);

  const add = (product: Product, qty = 1, meta?: Record<string, any>) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === product.slug && JSON.stringify(i.meta) === JSON.stringify(meta || {}));
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          slug: product.slug,
          title: product.title,
          price: product.price,
          qty,
          type: product.type,
          coverArt: product.coverArt,
          meta,
        },
      ];
    });
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  return { items, add, remove, clear, total };
}
