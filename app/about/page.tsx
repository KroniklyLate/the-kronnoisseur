import Link from 'next/link';
import CTABanner from '../components/CTABanner';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs tracking-[0.3em] text-[#d4af37]">THE STORY</p>
        <h1 className="mt-2 text-6xl tracking-tighter">We believe cannabis deserves better.</h1>

        <div className="prose prose-invert mt-8 max-w-none text-white/80">
          <p>The Kronnoisseur started as a simple frustration: the culture deserved clothing that didn’t look like a gas station souvenir, reviews that were actually honest, and a single place to quickly understand the wildly different rules from state to state.</p>

          <p>We design and produce limited runs of heavyweight apparel and technical headwear. Every piece features the shield and leaf emblem you see across the brand — clean, recognizable, and built to last more than one season.</p>

          <p>On the media side we go long. Real conversations with the growers, extractors, and operators actually moving the industry forward. Detailed, no-BS reviews of flower and the tools that matter.</p>

          <p>The interactive laws map is our gift to the community. It’s free, it’s updated, and it’s designed so you can quickly know what’s legal where before you travel or buy.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <p className="text-xs tracking-[0.3em] text-[#d4af37] mb-1">PHILOSOPHY</p>
            <h3 className="text-2xl tracking-tight mb-4">Quality over quantity</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>• Small batch production</li>
              <li>• Premium blanks only</li>
              <li>• Honest reviews, no sponsored fluff</li>
              <li>• Laws data you can actually use</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
            <p className="text-xs tracking-[0.3em] text-[#d4af37] mb-1">THE CIRCLE</p>
            <h3 className="text-2xl tracking-tight mb-4">Join the community</h3>
            <p className="text-sm text-white/70">Wear it. Watch it. Know the rules. Share what you learn.</p>
            <Link href="/contact" className="mt-6 inline-block text-sm text-[#d4af37]">Get in touch →</Link>
          </div>
        </div>
      </div>
      <CTABanner />
    </div>
  );
}
