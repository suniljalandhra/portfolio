/**
 * Ferris, the unofficial (public-domain) Rust mascot, as line art that matches the
 * rest of the site: colours come from CSS (.ferris-*), so it follows the theme.
 * Drawn in local coordinates: centred on x = 0, feet resting on y = 0, about 92 × 52.
 * Render inside an <svg> and position it with `transform`.
 */

// Spiky shell: spikes along the top half of an ellipse, smooth along the bottom.
function shell(cx: number, cy: number, rx: number, ry: number) {
  const pts: string[] = [];
  const spikes = 11;
  for (let k = 0; k <= spikes * 2; k++) {
    const t = Math.PI + (k * Math.PI) / (spikes * 2);
    const r = k % 2 === 1 ? 1.14 : 1;
    pts.push(`${(cx + rx * r * Math.cos(t)).toFixed(1)},${(cy + ry * r * Math.sin(t)).toFixed(1)}`);
  }
  for (let k = 1; k < 16; k++) {
    const t = (k * Math.PI) / 16;
    pts.push(`${(cx + rx * Math.cos(t)).toFixed(1)},${(cy + ry * 0.75 * Math.sin(t)).toFixed(1)}`);
  }
  return pts.join(" ");
}

// Pincer: a circle with a wedge cut out, opening towards `angle` (degrees).
function claw(cx: number, cy: number, r: number, angle: number) {
  const a1 = ((angle - 26) * Math.PI) / 180;
  const a2 = ((angle + 26) * Math.PI) / 180;
  const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  return `M ${cx} ${cy} L ${p(a2)} A ${r} ${r} 0 1 1 ${p(a1)} Z`;
}

export default function Ferris({ className, transform }: { className?: string; transform?: string }) {
  return (
    <g className={`ferris ${className ?? ""}`} transform={transform}>
      <g className="ferris-limb">
        <path d="M -16 -8 L -24 0" />
        <path d="M -8 -6 L -12 0" />
        <path d="M 8 -6 L 12 0" />
        <path d="M 16 -8 L 24 0" />
        <path d="M -24 -18 Q -34 -22 -36 -32" />
        <path d="M 24 -18 Q 34 -22 36 -32" />
      </g>
      <path className="ferris-shape" d={claw(-38, -40, 8.5, -60)} />
      <path className="ferris-shape" d={claw(38, -40, 8.5, -120)} />
      <polygon className="ferris-shape" points={shell(0, -14, 27, 15)} />
      <circle className="ferris-eye" cx={-8} cy={-17} r={4.6} />
      <circle className="ferris-eye" cx={8} cy={-17} r={4.6} />
      <circle className="ferris-pupil" cx={-7} cy={-16.4} r={2} />
      <circle className="ferris-pupil" cx={9} cy={-16.4} r={2} />
      <path className="ferris-limb" d="M -5 -8 Q 0 -4 5 -8" />
    </g>
  );
}

/** Standalone Ferris for places outside the hero art (404 page). */
export function FerrisBadge({ size = 120, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size * 0.62} viewBox="-50 -54 100 62" role="img" aria-label="Ferris the Rust crab">
      <Ferris />
    </svg>
  );
}
