"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Bottle from "./Bottle";
import { TagLayer } from "./Graffiti";

export type Product = {
  name: string;
  notes: string; // character words, "a · b · c"
  desc: string;
  price: string;
  liquid: string;
  deep: string;
  rgb: string; // "r g b"
  tag: string;
  num: string;
  badge?: string;
};

/* ------------------------------------------------------------------ */
/* One lit niche: wall glow, spotlight, scribbles and the bottle        */
/* ------------------------------------------------------------------ */
function NicheArt({ p, big = false }: { p: Product; big?: boolean }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute left-3 top-[30%] -rotate-12 font-tag leading-none ${big ? "text-7xl md:text-8xl" : "text-4xl md:text-5xl"}`}
        style={{ color: `rgb(${p.rgb} / 0.13)` }}
      >
        {p.tag}
      </span>
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover/niche:opacity-100"
        style={{ background: `radial-gradient(ellipse 70% 45% at 50% 72%, rgb(${p.rgb} / 0.42), transparent 70%)` }}
      />
      <div className="absolute left-1/2 top-0 h-1.5 w-10 -translate-x-1/2 rounded-b-full bg-[#fff6ea] shadow-[0_0_18px_6px_rgb(255_240_220_/_0.55)]" />
      <div className="beam absolute left-1/2 top-0 h-[92%] w-[95%] -translate-x-1/2 opacity-90" />
      <div className="absolute bottom-[3%] left-1/2 h-8 w-[75%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgb(255_240_225_/_0.35),transparent_70%)]" />
      <Bottle
        liquid={p.liquid}
        liquidDeep={p.deep}
        tag={p.tag}
        number={p.num}
        className={`absolute bottom-[5%] left-1/2 w-auto -translate-x-1/2 drop-shadow-[0_14px_18px_rgba(0,0,0,0.7)] transition duration-500 ${
          big ? "h-[58%]" : "h-[56%] group-hover/niche:-translate-y-2 group-hover/niche:scale-[1.04]"
        }`}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Hero: the wall of niches                                             */
/* ------------------------------------------------------------------ */
export default function Showroom({ products, onAdd }: { products: Product[]; onAdd?: () => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const boxes = useRef<(HTMLDivElement | null)[]>([]);
  const rectOf = useCallback((i: number) => boxes.current[i]?.getBoundingClientRect() ?? null, []);

  return (
    <section id="home" className="niche-wall grain relative flex min-h-[100svh] flex-col overflow-hidden pt-16">
      <TagLayer tone="rgb(255 46 147 / 0.07)" />

      <div className="relative mx-auto w-full max-w-[1500px] flex-1 px-4 pt-8 sm:px-8 md:pt-12">
        <div className="group/wall -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:gap-5 md:mx-0 md:overflow-visible md:px-0">
          {products.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setOpen(i)}
              className="group/niche relative w-[46%] shrink-0 snap-center text-left md:w-auto md:flex-1"
              aria-label={`View ${p.name}, ${p.price}`}
            >
              <div ref={(el) => void (boxes.current[i] = el)} className="niche-box relative h-[50svh] overflow-hidden rounded-[3px] md:h-[56svh]">
                <NicheArt p={p} />
                {/* hover label */}
                <div className="absolute inset-x-0 top-[12%] text-center transition duration-500 md:translate-y-2 md:opacity-0 md:group-hover/niche:translate-y-0 md:group-hover/niche:opacity-100">
                  <p className="font-marker text-lg text-chalk md:text-xl">{p.name}</p>
                  <p className="text-[11px] tracking-[0.2em] text-chalk/60">{p.price}</p>
                </div>
                {/* other niches dim while one is hovered */}
                <div className="pointer-events-none absolute inset-0 bg-[#060507] opacity-0 transition-opacity duration-500 md:group-hover/wall:opacity-75 md:group-hover/niche:opacity-0!" />
                {/* spotlights switch on one by one */}
                <div className="blackout pointer-events-none absolute inset-0 bg-[#0b0a0c]" style={{ animationDelay: `${0.5 + i * 0.28}s` }} />
              </div>

            </button>
          ))}
        </div>
      </div>

      {/* caption */}
      <div className="relative mx-auto grid w-full max-w-[1500px] gap-6 px-4 pb-10 pt-2 sm:px-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="rise" style={{ animationDelay: "1.6s" }}>
          <p className="mb-3 inline-block -rotate-2 bg-acid px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-ink">Dropping 26 · 11 · 2026</p>
          <h1 className="font-serif text-5xl leading-[0.95] text-chalk sm:text-6xl lg:text-7xl">
            Scent outside the <span className="relative inline-block -rotate-3 px-1 font-tag text-[1.15em] text-pink">lines</span>
          </h1>
        </div>
        <div className="rise md:justify-self-end md:text-right" style={{ animationDelay: "1.9s" }}>
          <p className="max-w-sm text-sm leading-relaxed text-chalk/65 md:ml-auto">
            Four characters, four moods, one thing in common: the freedom to be yourself. Pick a bottle to step inside.
          </p>
          <div className="mt-5 flex items-center gap-5 md:justify-end">
            <a href="#story" className="font-marker text-sm text-chalk/80 underline decoration-pink decoration-2 underline-offset-4 hover:text-pink">
              smell the story
            </a>
            <a
              href="#scents"
              className="group inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-sm font-bold text-ink shadow-[4px_4px_0_#f6efe9] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#f6efe9]"
            >
              Shop the drop <span className="transition group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>

      {open !== null && (
        <Detail products={products} start={open} rectOf={rectOf} onAdd={onAdd} onClosed={() => setOpen(null)} />
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Detail: camera zooms into the chosen niche                          */
/* ------------------------------------------------------------------ */
const EASE = "cubic-bezier(0.7, 0, 0.2, 1)";

function flip(el: HTMLElement, from: DOMRect | null, reverse: boolean) {
  const to = el.getBoundingClientRect();
  const start = from
    ? `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`
    : "scale(0.6)";
  const frames = [{ transform: start }, { transform: "none" }];
  return el.animate(reverse ? frames.reverse() : frames, { duration: 800, easing: EASE, fill: "both" });
}

function Detail({
  products,
  start,
  rectOf,
  onAdd,
  onClosed,
}: {
  products: Product[];
  start: number;
  rectOf: (i: number) => DOMRect | null;
  onAdd?: () => void;
  onClosed: () => void;
}) {
  const [i, setI] = useState(start);
  const [dir, setDir] = useState(0);
  const [added, setAdded] = useState(false);
  const niche = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const closing = useRef(false);
  const n = products.length;
  const p = products[i];
  const next = products[(i + 1) % n];
  const [first, ...rest] = p.name.split(" ").reverse();
  const lead = rest.reverse().join(" ");

  // zoom in from the clicked niche
  useLayoutEffect(() => {
    if (niche.current) flip(niche.current, rectOf(start), false);
    overlay.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease-out", fill: "both" });
  }, [rectOf, start]);

  const close = useCallback(() => {
    if (closing.current || !niche.current || !overlay.current) return;
    closing.current = true;
    flip(niche.current, rectOf(i), true);
    overlay.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800, easing: EASE, fill: "both" }).finished.then(onClosed);
  }, [i, rectOf, onClosed]);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setAdded(false);
      setI((x) => (x + d + n) % n);
    },
    [n],
  );

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [close, go]);

  const pan = dir > 0 ? "pan-from-right" : dir < 0 ? "pan-from-left" : "";

  return (
    <div ref={overlay} role="dialog" aria-modal="true" aria-label={p.name} className="niche-wall grain fixed inset-0 z-[60] overflow-y-auto md:overflow-hidden">
      <TagLayer tone="rgb(255 46 147 / 0.06)" />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between px-4 sm:px-8">
        <span className="font-tag text-3xl text-pink">BONASCENT</span>
        <button onClick={close} className="flex items-center gap-2 rounded-full border border-white/20 bg-ink/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-chalk hover:border-pink hover:text-pink">
          ✕ <span className="hidden sm:inline">Back to the wall</span>
        </button>
      </div>

      <div className="relative grid min-h-full md:h-full md:grid-cols-[1fr_minmax(300px,32vw)_1fr]">
        {/* info panel */}
        <aside className="order-2 flex flex-col justify-center bg-ink/95 px-6 py-10 md:order-1 md:px-12 md:py-0 lg:px-20">
          <div key={i} className="rise" style={{ animationDelay: dir ? "0.15s" : "0.45s" }}>
            <p className="text-[11px] uppercase tracking-[0.3em] text-chalk/45">
              {p.num} · Wear your expression
            </p>
            <h2 className="mt-4 font-serif text-6xl leading-[0.95] text-chalk lg:text-7xl">
              {lead && <>{lead} </>}
              <span className="inline-block -rotate-3 font-tag text-[1.05em]" style={{ color: `rgb(${p.rgb})` }}>
                {first}
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-chalk/65">{p.desc}</p>

            <div className="mt-8 max-w-sm border-y border-white/10 py-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-chalk/45">Character</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.notes.split(" · ").map((w) => (
                  <li key={w} className="rounded-full border px-3 py-1 text-sm text-chalk" style={{ borderColor: `rgb(${p.rgb} / 0.6)` }}>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex max-w-sm items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-bold text-chalk">{p.price}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-chalk/45">50ml · Eau de parfum</p>
              </div>
              <button
                onClick={() => {
                  onAdd?.();
                  setAdded(true);
                }}
                className="rounded-full bg-pink px-6 py-3 text-sm font-bold text-ink shadow-[4px_4px_0_#f6efe9] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#f6efe9]"
              >
                {added ? "Added ✦" : "Add to bag"}
              </button>
            </div>
          </div>

          <div className="mt-10 flex max-w-sm items-center justify-between text-xs uppercase tracking-[0.2em] text-chalk/55">
            <button onClick={() => go(-1)} className="hover:text-pink">
              ← Prev
            </button>
            <span>
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button onClick={() => go(1)} className="hover:text-pink">
              Next →
            </button>
          </div>
        </aside>

        {/* the big niche */}
        <div className="relative order-1 h-[64svh] md:order-2 md:h-full">
          <div ref={niche} style={{ transformOrigin: "top left" }} className="niche-box absolute inset-x-4 bottom-[6%] top-20 overflow-hidden rounded-[3px] md:inset-x-0">
            <div key={i} className={`absolute inset-0 ${pan}`}>
              <NicheArt p={p} big />
            </div>
          </div>
        </div>

        {/* right wall: teaser for the next bottle */}
        <div className="relative order-3 hidden md:block">
          <button onClick={() => go(1)} className="group absolute inset-y-0 right-0 flex w-full flex-col items-end justify-center gap-3 pr-8 text-right lg:pr-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-chalk/40">Next on the wall</span>
            <span className="font-marker text-3xl text-chalk/70 transition group-hover:text-pink">{next.name} →</span>
            <span className="font-tag text-8xl leading-none transition group-hover:scale-105" style={{ color: `rgb(${next.rgb} / 0.18)` }}>
              {next.tag}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
