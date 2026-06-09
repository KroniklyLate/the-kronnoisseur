"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mediaItems, type MediaItem } from "../lib/site-data";

const tabs = [
  { key: "all" as const, label: "All" },
  { key: "podcast" as const, label: "Podcasts" },
  { key: "cannabis-review" as const, label: "Cannabis Reviews" },
  { key: "gear-review" as const, label: "Gear & Other" },
];

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"all" | MediaItem["type"]>("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = activeTab === "all" 
    ? mediaItems 
    : mediaItems.filter(m => m.type === activeTab);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.3em] text-[#d4af37] uppercase">THE KRONNOISSEUR MEDIA</p>
          <h1 className="mt-2 text-6xl tracking-tighter">Long form. No hype.</h1>
          <p className="mt-4 text-lg text-white/70">
            Deep conversations with the people shaping cannabis and honest, detailed reviews of flower, concentrates, and the gear that actually matters.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setPlayingId(null); }}
              className={`px-6 py-2 text-sm rounded-full transition ${activeTab === tab.key ? "bg-white text-[#050a08] font-medium" : "bg-white/5 hover:bg-white/10"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {filtered.map(item => {
            const isPlaying = playingId === item.id;
            return (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-black">
                  {isPlaying ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(#222_0.6px,transparent_1px)] bg-[length:3px_3px]" />
                      <button 
                        onClick={() => setPlayingId(item.id)}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#050a08] transition hover:bg-[#d4af37]">
                          ▶
                        </div>
                      </button>
                      <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-0.5 text-xs rounded">{item.duration}</div>
                    </>
                  )}
                </div>

                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#d4af37]">
                    <span>{item.type === "podcast" ? "PODCAST" : item.type === "cannabis-review" ? "CANNABIS REVIEW" : "GEAR REVIEW"}</span>
                    <span className="text-white/40">•</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="mt-3 text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map(t => (
                      <span key={t} className="px-3 py-0.5 text-xs border border-white/15 rounded-full text-white/60">{t}</span>
                    ))}
                  </div>
                </div>

                {!isPlaying && (
                  <a 
                    href={`https://www.youtube.com/watch?v=${item.youtubeId}`} 
                    target="_blank" 
                    rel="noopener" 
                    className="block text-center py-3 border-t border-white/10 text-sm text-[#d4af37] hover:bg-white/5"
                  >
                    Watch on YouTube →
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-white/50">
          Want to be a guest or submit a product for review? <Link href="/contact" className="text-[#d4af37] underline">Get in touch</Link>.
        </div>
      </div>
    </div>
  );
}
