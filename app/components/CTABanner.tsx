import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="border-t border-white/10 py-16 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-2">JOIN THE CIRCLE</p>
        <h2 className="text-4xl tracking-[-1px] mb-4">Ready to elevate the ritual?</h2>
        <p className="text-white/70 mb-8">Shop the collection or explore the laws map to stay informed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="px-8 py-3 bg-[#d4af37] text-[#050a08] font-semibold rounded-full hover:bg-[#f0d78c] transition">Shop Now</Link>
          <Link href="/map" className="px-8 py-3 border border-white/30 rounded-full hover:bg-white/5 transition">Explore the Map</Link>
        </div>
      </div>
    </section>
  );
}
