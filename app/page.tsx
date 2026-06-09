import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero — Modern Tahoe / Reno alpine backdrop */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Tahoe hero background (Lake Tahoe + Sierra Nevada from Reno area) */}
        <div className="tahoe-hero absolute inset-0 z-0" />
        {/* Elegant multi-layer overlay for sleek readability and depth */}
        <div className="tahoe-overlay absolute inset-0 z-10" />

        <div className="relative z-20 max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/brand/transparent/logo-full-512.png" 
              alt="The Kronnoisseur" 
              className="w-56 h-56 object-contain drop-shadow-[0_20px_40px_-10px_rgb(0,0,0,0.6)]" 
            />
          </div>
          <p className="uppercase tracking-[4px] text-[#d4af37] text-sm mb-3">EST. 2017 • RENO / TAHOE • 21+</p>
          <h1 className="text-7xl font-semibold tracking-tighter mb-4">The Kronnoisseur</h1>
          <p className="text-2xl text-[#d4af37] mb-8">Curated Cannabis Culture &amp; Lifestyle</p>
          <p className="max-w-md mx-auto text-lg text-white/80 mb-10">
            Premium apparel. Honest reviews. The definitive interactive guide to cannabis laws across all 50 states.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="px-8 py-3.5 bg-[#d4af37] text-[#050a08] font-semibold rounded-full hover:bg-[#f0d78c] transition">
              Shop the Collection
            </Link>
            <Link href="/map" className="px-8 py-3.5 border border-white/30 rounded-full hover:bg-white/5 transition">
              Explore the Laws Map
            </Link>
          </div>
        </div>

        {/* Sleek scroll prompt */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-[10px] tracking-[3px] text-white/50">
          <div>SCROLL TO BEGIN</div>
          <div className="h-px w-6 bg-white/30" />
        </div>
      </section>

      {/* Featured Goods */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#d4af37] text-xs tracking-[3px] mb-1">LIMITED GOODS</p>
            <h2 className="text-5xl tracking-[-1.5px]">Wear the ritual</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#d4af37] hover:underline hidden md:block">View full shop →</Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "The Leaf Tee", price: 42, img: "/brand/transparent/mark-512.png" },
            { name: "Kron Dad Cap", price: 32, img: "/brand/transparent/mark-512.png" },
            { name: "Technical 5-Panel", price: 36, img: "/brand/transparent/mark-512.png" },
            { name: "Core Leaf 3-Pack Stickers", price: 12, img: "/brand/transparent/mark-512.png" },
          ].map((item, i) => (
            <Link key={i} href="/shop" className="group block">
              <div className="aspect-[4/3] bg-zinc-950 rounded-2xl overflow-hidden border border-white/10 mb-4">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" />
              </div>
              <div className="flex justify-between text-[15px]">
                <div className="font-medium tracking-[-0.2px]">{item.name}</div>
                <div className="text-[#d4af37] tabular-nums">${item.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Media Teaser */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#d4af37] text-xs tracking-[3px] mb-1">THE KRONNOISSEUR MEDIA</p>
            <h2 className="text-5xl tracking-[-1.5px]">Long form. No hype.</h2>
          </div>
          <Link href="/media" className="text-sm text-[#d4af37] hover:underline hidden md:block">Browse all →</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Podcast Ep. 01: Soil, Sun, and Soul", type: "PODCAST", time: "1h 12m" },
            { title: "Review: Tsaa Nesunkwa 4650 — The Gold Standard", type: "CANNABIS REVIEW", time: "18m" },
          ].map((item, i) => (
            <Link key={i} href="/media" className="block p-8 glass rounded-2xl hover:border-[#d4af37]/40 border border-white/10 transition duration-200">
              <div className="uppercase text-xs tracking-widest text-[#d4af37] mb-2">{item.type} • {item.time}</div>
              <h3 className="text-2xl tracking-[-0.3px]">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Map Teaser — clean modern dark */}
      <section className="border-y border-white/10 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[#d4af37] text-xs tracking-[3px] mb-2">KNOW BEFORE YOU GO</p>
          <h2 className="text-5xl tracking-[-1.5px] mb-4">Interactive US Cannabis Laws Map</h2>
          <p className="max-w-md mx-auto text-white/70 mb-8">
            Hover any state for current status, possession limits, home grow rules, and retail availability.
          </p>
          <Link href="/map" className="inline-block px-8 py-3 border border-white/30 rounded-full hover:bg-white/5 transition">Open the full map</Link>
          <p className="mt-4 text-[10px] text-white/40">Data updated quarterly • Always verify with official sources</p>
        </div>
      </section>
    </div>
  );
}
