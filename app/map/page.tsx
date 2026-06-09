"use client";

import React, { useEffect, useRef, useState } from "react";
import { cannabisLaws, type StateLaw, type LawStatus, lawStatusColors } from "../lib/site-data";

type Tooltip = {
  x: number;
  y: number;
  state: string;
  law: StateLaw;
} | null;

export default function InteractiveLawsMap() {
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const [selected, setSelected] = useState<{ code: string; law: StateLaw } | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<LawStatus | "All">("All");
  const [svgLoaded, setSvgLoaded] = useState(false);

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const res = await fetch("/map/us-states.svg");
        const svgText = await res.text();

        if (svgContainerRef.current) {
          svgContainerRef.current.innerHTML = svgText;

          const svg = svgContainerRef.current.querySelector("svg");
          if (svg) {
            svg.setAttribute("width", "100%");
            svg.setAttribute("height", "auto");
            svg.style.maxHeight = "620px";

            // Ensure full view
            svg.setAttribute("viewBox", "0 0 959 593");
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

            const paths = svg.querySelectorAll<SVGPathElement>("path");

            paths.forEach((path) => {
              const classList = Array.from(path.classList);
              const code = (classList.find(c => c.length === 2) || "").toUpperCase();
              const titleEl = path.querySelector("title");
              const title = titleEl?.textContent || "";

              const law = cannabisLaws[code];

              if (law) {
                path.style.fill = law.color;
                path.style.stroke = "#111";
                path.style.strokeWidth = "0.5";
                path.style.cursor = "pointer";
                path.style.transition = "fill 0.15s ease";

                const showTip = (e: MouseEvent) => {
                  const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
                  const containerRect = svgContainerRef.current!.getBoundingClientRect();
                  setTooltip({
                    x: rect.left + rect.width / 2 - containerRect.left,
                    y: rect.top - containerRect.top - 8,
                    state: code,
                    law,
                  });
                  path.style.fill = "#f0d78c";
                };

                const hideTip = () => {
                  setTooltip(null);
                  path.style.fill = law.color;
                };

                path.addEventListener("mouseenter", showTip);
                path.addEventListener("mouseleave", hideTip);

                path.addEventListener("click", () => {
                  setSelected({ code, law });
                  setTooltip(null);
                });

                path.addEventListener("touchstart", (e) => {
                  e.preventDefault();
                  setSelected({ code, law });
                });
              } else {
                path.style.fill = "#334155";
                path.style.stroke = "#1f2937";
                path.style.strokeWidth = "0.5";
              }
            });

            // Fix AK/HI corner - reposition to clean bottom left without overlap
            const akPath = svg.querySelector("path.ak");
            const hiPath = svg.querySelector("path.hi");

            if (akPath) {
              akPath.setAttribute("transform", "translate(15, 470) scale(0.88)");
            }
            if (hiPath) {
              hiPath.setAttribute("transform", "translate(260, 498) scale(0.88)");
            }

            setSvgLoaded(true);
          }
        }
      } catch (e) {
        console.error("Failed to load map SVG", e);
      }
    };

    loadSVG();
  }, []);

  const list = Object.entries(cannabisLaws)
    .filter(([code, law]) => {
      const matchesSearch = law.name.toLowerCase().includes(search.toLowerCase()) || code.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || law.status === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => a[1].name.localeCompare(b[1].name));

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] text-[#d4af37]">KNOW THE RULES • 21+</p>
          <h1 className="mt-1 text-6xl tracking-tighter">US Cannabis Laws Map</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Hover or tap any state on the map for current status, possession limits, home grow rules, and retail availability. 
            Data is for informational purposes and updated periodically.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Map */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-white/10 bg-zinc-950 p-4 shadow-inner">
              <div 
                ref={svgContainerRef} 
                className="mx-auto flex justify-center overflow-hidden rounded-2xl bg-[#0a1410] map-container"
                style={{ minHeight: "420px", width: "100%" }}
              />
              {!svgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-white/50">Loading map…</div>
              )}

              {/* Tooltip */}
              {tooltip && (
                <div 
                  className="pointer-events-none absolute z-50 max-w-[260px] -translate-x-1/2 rounded-xl border border-white/10 bg-[#050a08] p-4 shadow-2xl"
                  style={{ left: tooltip.x, top: Math.max(20, tooltip.y - 10) }}
                >
                  <div className="font-semibold">{tooltip.law.name} <span className="text-white/40">({tooltip.state})</span></div>
                  <div className="mt-1 inline-block rounded px-2 py-0.5 text-xs" style={{backgroundColor: tooltip.law.color, color: tooltip.law.status === "Recreational" || tooltip.law.status === "Medical Only" ? "#050a08" : "white"}}>
                    {tooltip.law.status}
                  </div>
                  <div className="mt-2 text-xs text-white/80 space-y-1">
                    <div><span className="text-white/50">Possession:</span> {tooltip.law.possession}</div>
                    <div><span className="text-white/50">Cultivation:</span> {tooltip.law.cultivation}</div>
                    <div><span className="text-white/50">Sales:</span> {tooltip.law.sales}</div>
                  </div>
                  <div className="mt-2 text-[10px] text-white/50">{tooltip.law.notes}</div>
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/60">
              <div className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded" style={{backgroundColor: '#D4AF37'}} /> Recreational</div>
              <div className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded" style={{backgroundColor: '#C0C0C0'}} /> Medical Only</div>
              <div className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded" style={{backgroundColor: '#CD7F32'}} /> Decriminalized</div>
              <div className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded bg-red-800" /> Prohibited / Very Limited</div>
            </div>
            <p className="mt-1 text-[10px] text-white/40">Click/tap states for full details. This map uses a public domain SVG (Wikimedia Commons, CC0).</p>
          </div>

          {/* Detail + List */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="sticky top-6 rounded-2xl border border-[#d4af37]/30 bg-zinc-950 p-6">
                <button onClick={() => setSelected(null)} className="text-xs text-[#d4af37] mb-2">← Back to list</button>
                <div className="font-display text-3xl">{selected.law.name}</div>
                <div className="mt-1 inline-block rounded px-3 py-1 text-sm" style={{backgroundColor: selected.law.color, color: selected.law.status === "Recreational" || selected.law.status === "Medical Only" ? "#050a08" : "white"}}>
                  {selected.law.status}
                </div>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-white/50">Possession Limit</dt>
                    <dd className="mt-0.5">{selected.law.possession}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Home Cultivation</dt>
                    <dd className="mt-0.5">{selected.law.cultivation}</dd>
                  </div>
                  <div>
                    <dt className="text-white/50">Retail / Sales</dt>
                    <dd className="mt-0.5">{selected.law.sales}</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/80">
                  {selected.law.notes}
                </div>
                <div className="mt-4 text-[10px] text-white/40">Always confirm with your state health department or NORML before purchasing or traveling with cannabis.</div>
              </div>
            ) : (
              <div className="sticky top-6">
                <input
                  type="text"
                  placeholder="Search states (CA, New York, Texas...)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#d4af37]"
                />

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(["All", "Recreational", "Medical Only", "Decriminalized", "Prohibited"] as const).map(f => (
                    <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-3 py-1 text-xs ${filter === f ? "bg-[#d4af37] text-[#050a08]" : "bg-white/5 hover:bg-white/10"}`}>
                      {f}
                    </button>
                  ))}
                </div>

                <div className="mt-4 max-h-[480px] overflow-auto pr-1 text-sm space-y-1 border-t border-white/10 pt-3">
                  {list.length === 0 && <div className="py-8 text-center text-white/50">No matches.</div>}
                  {list.map(([code, law]) => (
                    <button
                      key={code}
                      onClick={() => setSelected({ code, law })}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-white/5 border border-transparent hover:border-white/10"
                    >
                      <div>
                        <span className="font-medium">{law.name}</span> <span className="text-white/40">({code})</span>
                      </div>
                      <span className="rounded px-2 py-0.5 text-[10px]" style={{backgroundColor: law.color, color: law.status === "Recreational" || law.status === "Medical Only" ? "#050a08" : "white"}}>{law.status}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-center text-[10px] text-white/40">Click any row or map region for full details.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-white/40 max-w-lg mx-auto">
          This is an informational tool only. Cannabis laws change frequently and vary by locality. Verify with official government sources before any activity. The Kronnoisseur assumes no liability.
        </div>
      </div>
    </div>
  );
}
