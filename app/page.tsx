"use client";

import { useEffect, useState } from "react";
import Bottle from "./components/Bottle";
import { TagLayer } from "./components/Graffiti";
import Showroom, { type Product } from "./components/Showroom";

/* ------------------------------------------------------------------ */
/* Placeholder content: swap names, prices and copy for the real brand */
/* ------------------------------------------------------------------ */

const PRODUCTS: Product[] = [
  { name: "Afterhours", desc: "Inspired by the calm of the city at night and the freedom to be yourself. Fresh, clean and easy to wear, made to keep you company every day.", notes: "Fresh · Clean · Versatile", price: "IDR 459K", liquid: "#5b82ff", deep: "#1b2fa8", rgb: "91 130 255", tag: "night", num: "N°01" },
  { name: "Offbeat", desc: "For the ones who try new things, move however they like and run on an energy that is hard to ignore. Sporty and bright from the first spray.", notes: "Sporty · Fresh · Energetic", price: "IDR 459K", liquid: "#dcf23c", deep: "#1fa3b8", rgb: "200 240 60", tag: "go!", num: "N°02" },
  { name: "Soft Riot", desc: "Everyone has a soft side worth showing. Sweet and playful, with just enough softness to make people lean in closer.", notes: "Sweet · Playful · Soft", price: "IDR 459K", liquid: "#ff8a5c", deep: "#b3708a", rgb: "255 120 100", tag: "riot", num: "N°03" },
  { name: "Lovesick", desc: "For feelings too loud to hide, from spontaneous moments to the ones you never forget. Floral, fruity and full of colour, built to leave a mark.", notes: "Floral · Fruity · Expressive", price: "IDR 459K", liquid: "#ff3fb0", deep: "#a3127a", rgb: "255 63 176", tag: "love", num: "N°04" },
];

// order of the niches in the hero (alternate the colours)
const SHOWCASE = [0, 3, 1, 2].map((i) => PRODUCTS[i]);

const FEATURES = [
  { title: "Clean Ingredients", text: "Vegan, cruelty-free and IFRA-compliant oils. Loud on the skin, gentle on it too.", icon: "leaf" },
  { title: "Dermatologist Tested", text: "Every batch is patch-tested so you can spray freely, every single day.", icon: "flask" },
  { title: "12-Hour Wear", text: "Eau de parfum concentration that outlasts the night and the after-party.", icon: "drop" },
] as const;

const REVIEWS = [
  { name: "Nadia K.", handle: "@nadiaonwalls", text: "Lovesick is my whole personality now. People literally stop me to ask what I'm wearing.", rot: "-rotate-2" },
  { name: "Raka P.", handle: "@rakaprtm", text: "The bottle looks like art and Afterhours is my everyday scent now. Clean, easy, lasts all night.", rot: "rotate-1" },
  { name: "Sasha L.", handle: "@sashalaw", text: "Bought Offbeat as a gift and ended up keeping it. No regrets, buying another one.", rot: "-rotate-1" },
];

const NAV = ["Home", "Scents", "Story", "Wall", "Contact"];

/* ------------------------------------------------------------------ */

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [joined, setJoined] = useState(false);

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative">
      {/* ============================ NAV ============================ */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#home" className="leading-none">
            <span className="font-tag text-3xl text-pink">BONASCENT</span>
            <span className="block font-marker text-[10px] tracking-wider text-chalk/60">scent outside the lines</span>
          </a>

          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV.map((n, i) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} className={`transition hover:text-pink ${i === 0 ? "squiggle text-chalk" : "text-chalk/70"}`}>
                  {n}
                </a>
              </li>
            ))}
          </ul>

          <button aria-label="Menu" className="md:hidden" onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </nav>
        {menu && (
          <ul className="space-y-1 border-t border-white/10 px-4 py-4 md:hidden">
            {NAV.map((n) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)} className="block py-2 font-marker text-xl hover:text-pink">
                  {n}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* ============================ HERO ============================ */}
      <Showroom products={SHOWCASE} />

      {/* ============================ TAPE ============================ */}
      <div className="relative z-10 -my-4 -rotate-1 overflow-hidden border-y-4 border-ink bg-acid py-3 text-ink">
        <div className="marquee flex w-max gap-8 whitespace-nowrap font-marker text-xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-8">
              {["Limited drop", "Hand-tagged bottles", "50ml eau de parfum", "Free shipping over 500K", "Vegan & cruelty-free", "No two alike"].map((t) => (
                <span key={t} className="flex items-center gap-8">
                  {t} <span className="text-pink">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ========================== FEATURES ========================== */}
      <section className="marker-pink relative overflow-hidden pt-16 pb-14 text-ink">
        <TagLayer tone="rgb(11 10 12 / 0.08)" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 md:gap-0 md:divide-x-2 md:divide-dashed md:divide-ink/30">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="reveal flex items-start gap-4 md:px-8" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-chalk shadow-[3px_3px_0_#0b0a0c]">
                <Icon name={f.icon} className="h-8 w-8" />
              </span>
              <div>
                <h3 className="font-marker text-xl">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================== SCENTS =========================== */}
      <section id="scents" className="relative bg-ink py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="reveal mb-14 text-center">
            <p className="font-marker text-pink">four characters, four moods</p>
            <h2 className="mt-2 inline-block font-tag text-6xl text-chalk sm:text-7xl">
              <span className="squiggle">The Drops</span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <article
                key={p.name}
                className="reveal group relative overflow-hidden rounded-xl border-2 border-ink bg-chalk text-ink shadow-[6px_6px_0_#ff2e93] transition hover:-translate-y-1 hover:shadow-[9px_9px_0_#ff2e93]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* pack-style top: pink marker art + black side strip */}
                <div className="marker-pink relative flex h-72 items-center justify-center overflow-hidden">
                  <div className="absolute inset-y-0 left-0 flex w-9 items-center justify-center bg-ink">
                    <span className="-rotate-90 whitespace-nowrap text-xs font-bold tracking-[0.3em] text-acid">BONASCENT {p.num}</span>
                  </div>
                  <span className="pointer-events-none absolute right-3 top-2 rotate-6 font-tag text-5xl text-ink/15">{p.tag}</span>
                  <span className="pointer-events-none absolute bottom-3 left-12 -rotate-6 font-tag text-3xl text-ink/15">bona</span>
                  {p.badge && (
                    <span className="absolute right-3 top-3 rotate-3 bg-acid px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">{p.badge}</span>
                  )}
                  <Bottle
                    liquid={p.liquid}
                    liquidDeep={p.deep}
                    tag={p.tag}
                    number={p.num}
                    className="ml-8 h-56 w-auto drop-shadow-[0_18px_24px_rgba(0,0,0,0.35)] transition duration-500 group-hover:-rotate-6 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-marker text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink/60">{p.notes}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">{p.price}</span>
                    <button
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-pink transition hover:bg-pink hover:text-ink active:scale-95"
                    >
                      <Icon name="bag" className="h-4 w-4" /> Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== STORY =========================== */}
      <section id="story" className="brick grain relative overflow-hidden border-y-2 border-pink/40 py-28">
        <TagLayer tone="rgb(255 214 10 / 0.06)" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr]">
          <div className="reveal">
            <p className="font-marker text-acid">the story</p>
            <h2 className="mt-3 font-drip text-5xl leading-tight text-pink sm:text-7xl">Wear your expression.</h2>
            <p className="mt-6 max-w-xl text-lg text-chalk/75">
              Every scent has a character, and every character has a story. We made BONA for people who see fragrance as another way to
              express themselves: four characters, four moods, one thing in common. The freedom to be yourself.
            </p>
          </div>
          <div className="reveal grid grid-cols-3 gap-4 md:grid-cols-1">
            {[
              ["4", "characters"],
              ["12H", "on the skin"],
              ["500", "bottles per drop"],
            ].map(([n, l], i) => (
              <div key={l} className={`rounded-lg border-2 border-chalk/80 bg-ink/70 p-4 md:p-6 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                <p className="font-tag text-4xl text-acid sm:text-5xl">{n}</p>
                <p className="mt-1 font-marker text-sm text-chalk/70">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== WALL =========================== */}
      <section id="wall" className="marker-pink relative overflow-hidden py-24 text-ink">
        <TagLayer tone="rgb(11 10 12 / 0.07)" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="reveal mb-14 text-center">
            <p className="font-marker">what the crew says</p>
            <h2 className="mt-2 font-tag text-6xl sm:text-7xl">Writings on the Wall</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className={`reveal relative bg-chalk p-6 pt-8 shadow-[6px_6px_0_#0b0a0c] ${r.rot}`}>
                <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 bg-acid/80" />
                <span aria-hidden className="font-drip text-5xl leading-none text-pink">“</span>
                <blockquote className="mt-1 text-[15px] leading-relaxed">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-tag text-lg text-pink">{r.name[0]}</span>
                    <span>
                      <span className="block font-bold">{r.name}</span>
                      <span className="text-xs text-ink/55">{r.handle}</span>
                    </span>
                  </span>
                  <span className="text-acid [text-shadow:0_0_1px_#0b0a0c,1px_1px_0_#0b0a0c]" aria-label="5 out of 5 stars">★★★★★</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== FOOTER =========================== */}
      <footer id="contact" className="relative bg-ink pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1.5fr]">
          <div>
            <span className="font-tag text-4xl text-pink">BONASCENT</span>
            <p className="font-marker text-xs text-chalk/50">scent outside the lines</p>
            <p className="mt-4 max-w-xs text-sm text-chalk/60">Fragrance as self-expression. Inspired by street culture, urban art and the freedom to be yourself.</p>
            <div className="mt-5 flex gap-3">
              {(["ig", "tt", "yt", "x"] as const).map((s) => (
                <a key={s} href="#" aria-label={s} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-chalk/70 hover:border-pink hover:text-pink">
                  <Icon name={s} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Quick Links" items={["Home", "Scents", "Our Story", "The Wall", "Contact"]} />
          <FooterCol title="Help & Support" items={["FAQs", "Shipping & Delivery", "Returns", "Privacy Policy", "Terms & Conditions"]} />
          <div>
            <h4 className="font-marker text-lg text-chalk">Join the Crew</h4>
            <p className="mt-2 text-sm text-chalk/60">First dibs on every drop, plus 10% off your first bottle.</p>
            {joined ? (
              <p className="mt-4 -rotate-1 bg-acid px-4 py-3 font-marker text-ink">You&apos;re on the list ✦ see you at the next drop</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setJoined(true);
                }}
                className="mt-4 flex overflow-hidden rounded-full border-2 border-chalk/80 focus-within:border-pink"
              >
                <input required type="email" placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-chalk outline-none placeholder:text-chalk/40" />
                <button className="bg-pink px-5 font-bold text-ink hover:bg-acid" aria-label="Subscribe">
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 px-4 py-6 text-xs text-chalk/50 sm:flex-row sm:px-6">
          <p>© 2026 Bonascent Parfums. All rights reserved.</p>
          <div className="flex gap-2">
            {["VISA", "Mastercard", "QRIS", "GoPay"].map((p) => (
              <span key={p} className="rounded border border-white/20 px-2 py-1 font-bold tracking-wide text-chalk/70">
                {p}
              </span>
            ))}
          </div>
        </div>
        {/* giant tag sliver at the very bottom */}
        <p aria-hidden className="pointer-events-none select-none overflow-hidden text-center font-tag text-[17vw] leading-[0.7] text-pink/10">
          bonascent
        </p>
      </footer>
    </main>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-marker text-lg text-chalk">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-chalk/60">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-pink">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Small hand-drawn-ish icon set */
function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const p = {
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h10" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    leaf: <><path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15Z" /><path d="M5 19 13 11" /></>,
    flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /><path d="M7.5 15h9" /></>,
    drop: <><path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z" /><path d="M9 15a3 3 0 0 0 3 3" /></>,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" /></>,
    tt: <path d="M14 3v11a4 4 0 1 1-4-4M14 3c0 3 2 5 5 5" />,
    yt: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
    x: <path d="M4 4l16 16M20 4 4 20" />,
  }[name];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {p}
    </svg>
  );
}
