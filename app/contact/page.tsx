import { siteConfig } from "../lib/site-data";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-xl mx-auto px-6 py-16">
        <h1 className="font-semibold text-5xl tracking-tighter">Let’s talk.</h1>
        <p className="mt-3 text-white/70">Wholesale inquiries, press, guest appearances, or just to say what’s good.</p>

        <div className="mt-10 space-y-6 text-lg">
          <a href={siteConfig.emailHref} className="block rounded-2xl border border-white/10 p-6 hover:border-[#d4af37]/40">
            <div className="text-sm uppercase tracking-widest text-[#d4af37]">Email</div>
            <div>{siteConfig.email}</div>
          </a>
          <a href={siteConfig.phoneHref} className="block rounded-2xl border border-white/10 p-6 hover:border-[#d4af37]/40">
            <div className="text-sm uppercase tracking-widest text-[#d4af37]">Phone / Text</div>
            <div>{siteConfig.phone}</div>
          </a>
        </div>

        <div className="mt-10 text-sm text-white/50">
          For the fastest response on orders or shipping, include your order number. We usually reply within 1–2 business days.
        </div>

        <div className="mt-8 text-xs text-white/40">
          21+ only. We do not sell or ship cannabis flower or any controlled substances — apparel, accessories, and information only.
        </div>
      </div>
    </div>
  );
}
