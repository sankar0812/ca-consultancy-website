import { useId } from 'react';

const SETS = {
  hero: { bars: [34, 46, 40, 58, 52, 72, 66], arc: true },
  office: { bars: [30, 40, 54, 44, 62], arc: false },
  industries: { bars: [26, 36, 30, 48, 42, 56], arc: true },
  contact: { bars: [40, 32, 52, 46], arc: false },
};

/**
 * Built-in abstract artwork (stacked ledger columns on a ruled grid).
 * Used until real photography is supplied through `images` in data/site.js.
 */
export default function Artwork({ variant = 'hero', label }) {
  const id = useId();
  const { bars, arc } = SETS[variant] || SETS.hero;
  const W = 600;
  const H = 700;
  const base = 610;
  const barWidth = 54;
  const gap = 20;
  const total = bars.length * barWidth + (bars.length - 1) * gap;
  const startX = (W - total) / 2;
  const unit = 6.4;

  return (
    <svg
      className="artwork"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16295A" />
          <stop offset="1" stopColor="#081227" />
        </linearGradient>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C09A52" stopOpacity="0.38" />
          <stop offset="1" stopColor="#C09A52" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      {Array.from({ length: 14 }, (_, i) => (
        <line key={i} x1="0" x2={W} y1={50 + i * 50} y2={50 + i * 50} stroke="#fff" strokeOpacity="0.06" />
      ))}
      {arc && (
        <circle cx="470" cy="170" r="120" fill="none" stroke="#C09A52" strokeOpacity="0.55" strokeWidth="1.5" />
      )}
      {bars.map((value, i) => {
        const height = value * unit;
        const x = startX + i * (barWidth + gap);
        return (
          <g key={i}>
            <rect x={x} y={base - height} width={barWidth} height={height} fill={`url(#${id}-bar)`} />
            <rect x={x} y={base - height} width={barWidth} height={height} fill="none" stroke="#C09A52" strokeOpacity="0.7" />
            <line x1={x} x2={x + barWidth} y1={base - height} y2={base - height} stroke="#E0C58E" strokeWidth="3" />
          </g>
        );
      })}
      <line x1="40" x2={W - 40} y1={base} y2={base} stroke="#E0C58E" strokeOpacity="0.8" strokeWidth="2" />
    </svg>
  );
}
