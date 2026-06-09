'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/media', label: 'Media' },
  { href: '/map', label: 'Laws Map' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050a08]/95 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/brand/transparent/mark-white-256.png" 
            alt="The Kronnoisseur" 
            className="w-9 h-9" 
          />
          <span className="font-semibold text-xl tracking-tight">The Kronnoisseur</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition ${active ? 'text-[#d4af37]' : 'text-white/80 hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link 
          href="/shop" 
          className="px-5 py-2 text-sm font-medium bg-[#d4af37] text-[#050a08] rounded-full hover:bg-[#f0d78c] transition"
        >
          Shop Now
        </Link>
      </div>
    </header>
  );
}
