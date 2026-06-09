export type Product = {
  id: string;
  name: string;
  category: "shirt" | "hat" | "sticker";
  price: number;
  description: string;
  image: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
};

export const products: Product[] = [
  {
    id: "leaf-tee",
    name: "The Leaf Tee",
    category: "shirt",
    price: 42,
    description: "Premium heavyweight cotton featuring the iconic shield and leaf emblem.",
    image: "/brand/transparent/mark-512.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Forest", "Gold", "Bone"],
    inStock: true,
  },
  {
    id: "kron-classic",
    name: "Kronnoisseur Classic",
    category: "shirt",
    price: 48,
    description: "Signature wordmark + shield on the chest. Garment-dyed for that broken-in luxury feel.",
    image: "/brand/transparent/mark-512.png",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vintage Black", "Moss", "Antique Gold"],
    inStock: true,
  },
  {
    id: "gold-polygon-hood",
    name: "Gold Polygon Hoodie",
    category: "shirt",
    price: 78,
    description: "Heavy 14oz fleece with the full emblem on the back and small shield mark on the chest.",
    image: "/brand/transparent/logo-full-512.png",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Olive"],
    inStock: true,
  },
  {
    id: "dad-cap",
    name: "The Kron Dad Cap",
    category: "hat",
    price: 32,
    description: "Unstructured 6-panel with embroidered shield. Low profile, adjustable strap.",
    image: "/brand/transparent/mark-512.png",
    colors: ["Black", "Olive", "Washed Gold"],
    inStock: true,
  },
  {
    id: "5-panel-tech",
    name: "Technical 5-Panel",
    category: "hat",
    price: 36,
    description: "Performance nylon with moisture wicking and hidden stash pocket. Embroidered shield.",
    image: "/brand/transparent/mark-512.png",
    colors: ["Black", "Camo", "Sand"],
    inStock: true,
  },
  {
    id: "beanie-rib",
    name: "Ribbed Merino Beanie",
    category: "hat",
    price: 28,
    description: "Soft Italian merino wool with tonal shield embroidery.",
    image: "/brand/transparent/mark-512.png",
    colors: ["Black", "Forest", "Heather Grey"],
    inStock: true,
  },
  {
    id: "sticker-core-3pk",
    name: "Core Shield 3-Pack",
    category: "sticker",
    price: 12,
    description: "Die-cut matte + one holographic. Weatherproof. Great for laptops and rigs.",
    image: "/brand/transparent/mark-512.png",
    inStock: true,
  },
  {
    id: "sticker-gold-vinyl",
    name: "Gold Shield Vinyl Pack",
    category: "sticker",
    price: 9,
    description: "Metallic gold on clear. 4\" and 6\" versions. Premium outdoor vinyl.",
    image: "/brand/transparent/mark-512.png",
    inStock: true,
  },
];

export type MediaItem = {
  id: string;
  type: "podcast" | "cannabis-review" | "gear-review";
  title: string;
  description: string;
  youtubeId: string;
  date: string;
  duration: string;
  tags: string[];
};

export const mediaItems: MediaItem[] = [
  {
    id: "pod-01",
    type: "podcast",
    title: "The Kronnoisseur Podcast — Ep. 01: Soil, Sun, and Soul",
    description: "Deep dive with master growers on living soil, terpene expression, and why craft cannabis matters.",
    youtubeId: "dQw4w9wgccc",
    date: "2025-04-12",
    duration: "1h 12m",
    tags: ["Podcast", "Growers"],
  },
  {
    id: "rev-01",
    type: "cannabis-review",
    title: "Review: Tsaa Nesunkwa 4650 — The Gold Standard",
    description: "Nose, flavor, effect, and the story behind this legendary small-batch flower. 9.6/10.",
    youtubeId: "dQw4w9wgccc",
    date: "2025-03-28",
    duration: "18m",
    tags: ["Review", "Flower"],
  },
  {
    id: "pod-02",
    type: "podcast",
    title: "The Kronnoisseur Podcast — Ep. 02: The Business of Being Elevated",
    description: "Conversations with brand builders, regulators, and artists shaping the future of cannabis culture.",
    youtubeId: "dQw4w9wgccc",
    date: "2025-04-05",
    duration: "58m",
    tags: ["Podcast", "Business"],
  },
];

export type LawStatus = "Recreational" | "Medical Only" | "Decriminalized" | "Prohibited" | "CBD/Limited";

export type StateLaw = {
  name: string;
  status: LawStatus;
  possession: string;
  cultivation: string;
  sales: string;
  notes: string;
  color: string;
};

export const cannabisLaws: Record<string, StateLaw> = {
  CA: { name: "California", status: "Recreational", possession: "28.5g flower / 8g concentrate (21+)", cultivation: "6 plants per adult (max 12/household)", sales: "Licensed dispensaries statewide", notes: "First to legalize for adult use (2016). Strong delivery & retail culture.", color: "#D4AF37" },
  CO: { name: "Colorado", status: "Recreational", possession: "28g flower", cultivation: "6 plants (3 mature)", sales: "Mature recreational market", notes: "Pioneer state. Excellent testing & labeling standards.", color: "#D4AF37" },
  IL: { name: "Illinois", status: "Recreational", possession: "30g flower / 5g concentrate", cultivation: "5 plants (home grow allowed)", sales: "Dispensaries + delivery", notes: "Social equity program in place.", color: "#D4AF37" },
  NY: { name: "New York", status: "Recreational", possession: "3oz flower / 24g concentrate", cultivation: "6 plants (3 mature)", sales: "Licensed retail rolling out", notes: "Large market, strict packaging rules.", color: "#D4AF37" },
  WA: { name: "Washington", status: "Recreational", possession: "28g flower", cultivation: "6 plants (home grow limited)", sales: "Mature I-502 system", notes: "No public consumption. Strong lab standards.", color: "#D4AF37" },
  OR: { name: "Oregon", status: "Recreational", possession: "28g flower", cultivation: "4 plants (home)", sales: "OLCC licensed", notes: "Very grower friendly. OLCC oversight.", color: "#D4AF37" },
  MA: { name: "Massachusetts", status: "Recreational", possession: "1oz flower / 5g concentrate", cultivation: "6 plants per adult", sales: "Licensed + delivery", notes: "Cannabis Control Commission.", color: "#D4AF37" },
  MI: { name: "Michigan", status: "Recreational", possession: "2.5oz flower on person", cultivation: "12 plants per adult", sales: "Licensed retailers", notes: "Home grow friendly.", color: "#D4AF37" },
  NJ: { name: "New Jersey", status: "Recreational", possession: "6oz flower", cultivation: "6 plants (personal)", sales: "CRC licensed", notes: "Strong medical program transitioned.", color: "#D4AF37" },
  NV: { name: "Nevada", status: "Recreational", possession: "28g flower", cultivation: "6 plants (home)", sales: "Licensed", notes: "Tourist friendly. Strict DUI laws.", color: "#D4AF37" },
  AZ: { name: "Arizona", status: "Recreational", possession: "28g flower", cultivation: "6 plants", sales: "Licensed dispensaries", notes: "Prop 207 passed 2020.", color: "#D4AF37" },
  NM: { name: "New Mexico", status: "Recreational", possession: "2oz flower", cultivation: "6 plants", sales: "Licensed", notes: "Recent legalization with social equity focus.", color: "#D4AF37" },
  VA: { name: "Virginia", status: "Recreational", possession: "1oz flower", cultivation: "4 plants", sales: "Retail coming online", notes: "Decrim first, then rec.", color: "#D4AF37" },
  CT: { name: "Connecticut", status: "Recreational", possession: "1.5oz flower", cultivation: "6 plants", sales: "Licensed", notes: "Strong medical backbone.", color: "#D4AF37" },
  MD: { name: "Maryland", status: "Recreational", possession: "1.5oz flower", cultivation: "2 plants", sales: "Licensed", notes: "2023 legalization.", color: "#D4AF37" },
  MN: { name: "Minnesota", status: "Recreational", possession: "2oz flower", cultivation: "8 plants (4 mature)", sales: "Retail 2025+", notes: "Recent rec law, home grow immediate.", color: "#D4AF37" },
  OH: { name: "Ohio", status: "Recreational", possession: "2.5oz flower", cultivation: "6 plants (home)", sales: "Retail rolling out", notes: "Issue 2 passed 2023.", color: "#D4AF37" },
  RI: { name: "Rhode Island", status: "Recreational", possession: "1oz flower", cultivation: "6 plants", sales: "Licensed", notes: "Small but well regulated.", color: "#D4AF37" },
  VT: { name: "Vermont", status: "Recreational", possession: "1oz flower", cultivation: "6 plants (2 mature)", sales: "Limited retail (mostly delivery/medical)", notes: "First state to legalize via legislature.", color: "#D4AF37" },
  FL: { name: "Florida", status: "Medical Only", possession: "Medical card required (4oz/30d)", cultivation: "Not allowed for patients", sales: "Licensed dispensing orgs", notes: "Large patient base. Rec efforts ongoing.", color: "#C0C0C0" },
  TX: { name: "Texas", status: "Medical Only", possession: "Low-THC (1% delta-9) only for qualifying", cultivation: "Not allowed", sales: "Limited Compassionate Use Program", notes: "Very restrictive. CBD dominant only for most.", color: "#C0C0C0" },
  GA: { name: "Georgia", status: "Medical Only", possession: "Medical oil only (limited)", cultivation: "None", sales: "Limited", notes: "Very narrow program.", color: "#C0C0C0" },
  PA: { name: "Pennsylvania", status: "Medical Only", possession: "30-day supply (medical card)", cultivation: "None for patients", sales: "Licensed dispensaries", notes: "One of the larger medical markets.", color: "#C0C0C0" },
  NE: { name: "Nebraska", status: "Decriminalized", possession: "1oz or less (civil fine)", cultivation: "None", sales: "None", notes: "Decriminalized but no rec or medical program.", color: "#CD7F32" },
  ID: { name: "Idaho", status: "Prohibited", possession: "Illegal (misdemeanor/felony)", cultivation: "Illegal", sales: "None", notes: "One of the strictest remaining. CBD only in very limited cases.", color: "#9f1239" },
  WY: { name: "Wyoming", status: "Prohibited", possession: "Illegal", cultivation: "Illegal", sales: "None", notes: "No medical or rec program.", color: "#9f1239" },
  AL: { name: "Alabama", status: "Medical Only", possession: "Medical only (limited)", cultivation: "None", sales: "Limited", notes: "Strict medical.", color: "#C0C0C0" },
  AR: { name: "Arkansas", status: "Medical Only", possession: "Medical card", cultivation: "None", sales: "Licensed", notes: "Medical program active.", color: "#C0C0C0" },
};

export const lawStatusColors: Record<LawStatus, string> = {
  Recreational: "bg-[#D4AF37] text-[#050a08]",
  "Medical Only": "bg-[#C0C0C0] text-[#050a08]",
  Decriminalized: "bg-[#CD7F32] text-white",
  Prohibited: "bg-red-800 text-white",
  "CBD/Limited": "bg-stone-600 text-white",
};

export const siteConfig = {
  email: "hello@thekronnoisseur.com",
  emailHref: "mailto:hello@thekronnoisseur.com",
  phone: "(775) 555-0192",
  phoneHref: "tel:+17755550192",
};
