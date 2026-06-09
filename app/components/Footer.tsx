import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10 text-sm text-white/60">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-y-6 items-center justify-between">
        <div>
          © {year} The Kronnoisseur. All rights reserved. 21+ only.
        </div>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
          <a href="https://www.cdc.gov/marijuana/" target="_blank" rel="noopener" className="hover:text-white transition">Responsible Use</a>
        </div>
        <div>
          Premium cannabis culture • Apparel • Media
        </div>
      </div>
    </footer>
  );
}
