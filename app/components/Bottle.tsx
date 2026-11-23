import { useId } from "react";

type BottleProps = {
  liquid: string; // main juice colour
  liquidDeep: string; // darker shade for gradient
  label?: string;
  number?: string;
  tag?: string; // scribble word on the glass
  className?: string;
};

// BONA flask: tall square cap, rounded shoulders, wide body, thick glass base
const B = { x: 20, y: 128, w: 160, h: 164 };

/** Body outline, shrunk by `i` on every side (used for the juice inside the glass). */
function body(i = 0) {
  const l = B.x + i, r = B.x + B.w - i, t = B.y + i, bt = B.y + B.h - i;
  return `M62 ${t} H138 C${160 - i / 2} ${t} ${r} ${140 + i} ${r} ${168 + i / 3} V${bt - 16} Q${r} ${bt} ${r - 18} ${bt} H${l + 18} Q${l} ${bt} ${l} ${bt - 16} V${168 + i / 3} C${l} ${140 + i} ${40 + i / 2} ${t} 62 ${t} Z`;
}

/** Glass perfume bottle in the BONA silhouette, tagged up with marker scribbles. */
export default function Bottle({ liquid, liquidDeep, label = "BONA", number = "N°01", tag = "riot", className }: BottleProps) {
  const id = useId().replace(/:/g, "");
  const juiceTop = B.y + 26;
  const labelW = 96;
  const labelH = labelW * 0.6;
  const ly = B.y + B.h * 0.42;

  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`juice-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={liquid} />
          <stop offset="1" stopColor={liquidDeep} />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2630" />
          <stop offset="0.35" stopColor="#0b0a0c" />
          <stop offset="0.7" stopColor="#3a3540" />
          <stop offset="1" stopColor="#0b0a0c" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <path d={body()} />
        </clipPath>
        <clipPath id={`level-${id}`}>
          <rect x="0" y={juiceTop} width="200" height="300" />
        </clipPath>
      </defs>

      {/* cap + paint drip */}
      <rect x="70" y="30" width="60" height="100" rx="5" fill={`url(#cap-${id})`} />
      <rect x="77" y="36" width="5" height="86" rx="2.5" fill="#fff" opacity="0.2" />
      <path d="M94 128 v12 a3 3 0 0 0 6 0 v-12" fill="#ff2e93" />

      {/* glass body */}
      <path d={body()} fill={`url(#glass-${id})`} stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />

      <g clipPath={`url(#clip-${id})`}>
        {/* juice */}
        <path d={body(9)} clipPath={`url(#level-${id})`} fill={`url(#juice-${id})`} />
        <rect x={B.x} y={juiceTop - 2} width={B.w} height={7} fill="#fff" opacity="0.15" />
        {/* thick glass base */}
        <rect x={B.x} y={B.y + B.h - 14} width={B.w} height={14} fill="#fff" opacity="0.18" />
        {/* reflections */}
        <rect x={B.x + 11} y={B.y + 34} width={8} height={B.h - 58} rx={4} fill="#fff" opacity="0.3" />
        <rect x={B.x + 25} y={B.y + 40} width={3.5} height={B.h * 0.55} rx={2} fill="#fff" opacity="0.16" />

        {/* sticker label */}
        <g transform={`rotate(-5 100 ${ly + labelH / 2})`}>
          <rect x={100 - labelW / 2} y={ly} width={labelW} height={labelH} rx="4" fill="#f6efe9" />
          <text x="100" y={ly + labelH * 0.52} textAnchor="middle" fontSize={labelW * 0.26 * Math.min(1, 5 / label.length)} fill="#0b0a0c" style={{ fontFamily: "var(--font-sedgwick)" }}>
            {label}
          </text>
          <text x="100" y={ly + labelH * 0.82} textAnchor="middle" fontSize={labelW * 0.09} letterSpacing="1.5" fill="#0b0a0c" style={{ fontFamily: "var(--font-grotesk)" }}>
            {number} · EDP 50ML
          </text>
        </g>

        {/* marker scribbles on the glass: crown, arrow, star */}
        <g fill="none" stroke="#0b0a0c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path transform={`translate(${B.x + B.w - 50} ${B.y + 48})`} d="M0 0 l6 -14 l7 10 l6 -13 l6 14 z" />
          <path transform={`translate(${B.x + 22} ${B.y + B.h - 26})`} d="M0 4 C 26 -8, 48 14, 78 0 l-8 -6 m8 6 l-9 5" />
          <path transform={`translate(${B.x + B.w - 40} ${B.y + B.h - 36})`} d="M10 0 l3 7 l7 1 l-5 5 l1 7 l-6 -3 l-6 3 l1 -7 l-5 -5 l7 -1 z" />
        </g>
        <text x={B.x + 18} y={B.y + 56} fontSize={22} fill="#0b0a0c" transform={`rotate(-12 ${B.x + 18} ${B.y + 56})`} style={{ fontFamily: "var(--font-sedgwick)" }}>
          {tag}
        </text>
      </g>
    </svg>
  );
}
