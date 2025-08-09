import heroImage from "@/assets/hero-hiphop.jpg";
import kitVintage from "@/assets/kit-vintage.jpg";
import kitModern from "@/assets/kit-modern.jpg";
import beatCover from "@/assets/beat-cover.jpg";

export type ProductType = "kit" | "beat" | "bundle";

export interface ProductInclude {
  name: string;
  count?: number;
  format?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  type: ProductType;
  tags: string[];
  genre?: string;
  bpm?: number;
  key?: string;
  coverArt: string;
  gallery?: string[];
  descriptionMD: string;
  includes: ProductInclude[];
  previewAudio?: string;
  price: number; // in cents
  compareAtPrice?: number; // in cents
  isExclusive?: boolean;
  inventory?: number | null;
  vendor?: string;
  license?: string;
  crossSell?: string[]; // slugs of other products
  externalChannels?: {
    beatstarsId?: string;
    gumroadUrl?: string;
    shopifyHandle?: string;
    tiktokSku?: string;
  };
  badges?: ("New" | "Exclusive" | "Limited")[];
  rating?: number;
  ratingCount?: number;
}

export const products: Product[] = [
  {
    id: "p1",
    slug: "vintage-breaks-vol-1",
    title: "Vintage Breaks Vol. 1",
    type: "kit",
    tags: ["breaks", "drums", "vinyl"],
    genre: "Boom Bap",
    coverArt: kitVintage,
    descriptionMD:
      "Analog-recorded drum breaks cut from dusty vinyl, processed through tape and classic preamps. Royalty-free for beats.",
    includes: [
      { name: "Drum Breaks", count: 120, format: "WAV" },
      { name: "One-Shots", count: 60, format: "WAV" },
    ],
    previewAudio: "/audio/vintage-breaks-preview.mp3",
    price: 3999,
    compareAtPrice: 4999,
    badges: ["New", "Limited"],
    vendor: "Analog Alley",
    rating: 4.9,
    ratingCount: 128,
    crossSell: ["modern-one-shots"],
    externalChannels: {
      gumroadUrl: "https://gum.co/YOUR_PRODUCT",
    },
  },
  {
    id: "p2",
    slug: "modern-one-shots",
    title: "MODERN ONE-SHOTS",
    type: "kit",
    tags: ["one-shots", "trap", "808"],
    genre: "Trap",
    coverArt: kitModern,
    descriptionMD:
      "Futuristic drums designed for chart-ready bangers. Punchy 808s, crisp snares, and pristine hats.",
    includes: [
      { name: "Kicks", count: 50, format: "WAV" },
      { name: "Snares/Claps", count: 70, format: "WAV" },
      { name: "Hats", count: 60, format: "WAV" },
    ],
    previewAudio: "/audio/modern-oneshots-preview.mp3",
    price: 2999,
    badges: ["Exclusive"],
    vendor: "Neon Lab",
    rating: 4.8,
    ratingCount: 86,
    crossSell: ["vintage-breaks-vol-1"],
    externalChannels: {
      gumroadUrl: "https://gum.co/YOUR_PRODUCT",
    },
  },
  {
    id: "b1",
    slug: "midnight-drift",
    title: "Midnight Drift",
    type: "beat",
    tags: ["beat", "trap", "moody"],
    genre: "Trap",
    bpm: 140,
    key: "Fm",
    coverArt: beatCover,
    descriptionMD:
      "Moody nighttime vibes with rolling 808s and airy pads. Perfect for melodic flows.",
    includes: [],
    previewAudio: "/audio/midnight-drift.mp3",
    price: 4999,
    vendor: "City Lights",
    externalChannels: { beatstarsId: "YOUR_BEATSTARS_STORE_ID" },
  },
  {
    id: "bd1",
    slug: "starter-bundle-vol-1",
    title: "Starter Bundle Vol. 1",
    type: "bundle",
    tags: ["bundle", "value"],
    coverArt: kitVintage,
    descriptionMD:
      "Two essential packs at a bundle price. Vintage Breaks + Modern One-Shots.",
    includes: [
      { name: "Vintage Breaks Vol.1" },
      { name: "MODERN ONE-SHOTS" },
    ],
    price: 5499,
    compareAtPrice: 6999,
    badges: ["New"],
    vendor: "House Label",
    crossSell: ["vintage-breaks-vol-1", "modern-one-shots"],
  },
];

export const heroAsset = heroImage;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByType(type: ProductType) {
  return products.filter((p) => p.type === type);
}
