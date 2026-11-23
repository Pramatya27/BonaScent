const TAGS = [
  { t: "BONA", x: "4%", y: "10%", r: -14, s: "5rem" },
  { t: "riot", x: "70%", y: "6%", r: 8, s: "3.6rem" },
  { t: "2026", x: "86%", y: "62%", r: -6, s: "3rem" },
  { t: "crew", x: "10%", y: "70%", r: 10, s: "4rem" },
  { t: "smell", x: "42%", y: "80%", r: -4, s: "3.2rem" },
  { t: "loud!", x: "56%", y: "30%", r: 14, s: "2.6rem" },
  { t: "xoxo", x: "26%", y: "38%", r: -20, s: "2.4rem" },
  { t: "N°01", x: "88%", y: "24%", r: -10, s: "2.4rem" },
];

/** Scattered marker tags. `tone` sets the colour (low opacity on dark, black on pink). */
export function TagLayer({ tone = "rgb(255 46 147 / 0.09)" }: { tone?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {TAGS.map((g) => (
        <span
          key={g.t}
          className="absolute font-tag leading-none whitespace-nowrap"
          style={{ left: g.x, top: g.y, transform: `rotate(${g.r}deg)`, fontSize: g.s, color: tone }}
        >
          {g.t}
        </span>
      ))}
      <svg className="absolute left-[34%] top-[6%] w-28" viewBox="0 0 60 40" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 34 l8 -26 l12 18 l10 -22 l12 20 l8 -18 l-2 28 z" />
      </svg>
      <svg className="absolute right-[18%] bottom-[10%] w-24" viewBox="0 0 60 60" fill="none" stroke={tone} strokeWidth="3" strokeLinecap="round">
        <path d="M30 4 l7 18 l19 1 l-15 12 l6 19 l-17 -11 l-17 11 l6 -19 l-15 -12 l19 -1 z" />
      </svg>
    </div>
  );
}
