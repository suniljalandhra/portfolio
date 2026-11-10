"use client";

import { useEffect, useState } from "react";
import Ferris from "./Ferris";

/**
 * Line-art Merkle tree where Ferris builds an inclusion proof, one level at a time:
 * hash the leaf, pair it with its sibling, climb to the parent, and repeat until the
 * root is reached and verified. Loops; reduced-motion users see the finished proof.
 */
const W = 360;
const LEVELS = [1, 2, 4, 8];
const Y = [36, 112, 188, 264];
const PROOF = [0, 1, 2, 5]; // index of the node on the proof path at each level
const SIBLINGS = [null, 0, 3, 4]; // sibling hashes included in the proof

const STEP_MS = 1000;
const VERIFIED = 5; // step at which the root is verified
const STEPS = 8; // includes a short hold on the verified state

// Node on the proof path at level L lights at step 4 - L; its sibling joins one step later.
const nodeOn = (l: number, step: number) => step >= 4 - l;
const sibOn = (l: number, step: number) => step >= 5 - l;
const edgeOn = (l: number, step: number) => step >= 5 - l; // edge from level l up to l - 1

const CAPTIONS = [
  "ferris.prove(leaf)",
  "h = hash(leaf)",
  "h = hash(h ‖ sibling)",
  "h = hash(sibling ‖ h)",
  "h = hash(sibling ‖ h)",
  "h == root  ✓ verified",
];

function x(level: number, i: number) {
  const n = LEVELS[level];
  const step = (W - 40) / n;
  return 20 + step * i + step / 2;
}

export default function MerkleArt() {
  const [step, setStep] = useState(VERIFIED);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), STEP_MS);
    return () => clearInterval(id);
  }, []);

  const edges: { x1: number; y1: number; x2: number; y2: number; level: number; hot: boolean }[] = [];
  for (let l = 1; l < LEVELS.length; l++) {
    for (let i = 0; i < LEVELS[l]; i++) {
      const parent = Math.floor(i / 2);
      edges.push({
        x1: x(l, i),
        y1: Y[l] - 14,
        x2: x(l - 1, parent),
        y2: Y[l - 1] + 14,
        level: l,
        hot: PROOF[l] === i && PROOF[l - 1] === parent,
      });
    }
  }

  const verified = step >= VERIFIED;
  const working = step >= 1 && step < VERIFIED;

  return (
    <svg
      className={`merkle${verified ? " verified" : ""}`}
      viewBox={`0 0 ${W} 310`}
      role="img"
      aria-label="Ferris the Rust crab building a Merkle inclusion proof from a leaf up to the root"
    >
      {edges.map(({ hot, level, ...pts }, i) => (
        <g key={i}>
          <line {...pts} className="edge" />
          {hot && <line {...pts} pathLength={1} className={`edge-progress${edgeOn(level, step) ? " on" : ""}`} />}
        </g>
      ))}
      {LEVELS.map((n, l) =>
        Array.from({ length: n }, (_, i) => {
          const onPath = PROOF[l] === i;
          const isSib = SIBLINGS[l] === i;
          const cls = [
            "node",
            onPath && nodeOn(l, step) && "hot",
            isSib && "sib",
            isSib && sibOn(l, step) && "on",
          ].filter(Boolean).join(" ");
          const s = l === 3 ? 22 : 28;
          return (
            <g key={`${l}-${i}`} className={cls}>
              <rect x={x(l, i) - s / 2} y={Y[l] - s / 2} width={s} height={s} rx={6} />
              {l === 0 && <text x={x(l, i)} y={Y[l] + 4} textAnchor="middle">root</text>}
            </g>
          );
        })
      )}
      <g className={`check${verified ? " on" : ""}`} transform={`translate(${x(0, 0) + 19} ${Y[0] - 17})`}>
        <circle r={7} />
        <path d="M -3 0 L -1 2.4 L 3.2 -2.4" />
      </g>
      <text x={20} y={300} className="caption">
        {CAPTIONS[Math.min(step, VERIFIED)]}
      </text>
      <g transform={`translate(${x(3, 5)} 306) scale(0.6)`}>
        <g key={working ? step : "rest"} className={working ? "ferris-hop" : undefined}>
          <Ferris />
        </g>
      </g>
    </svg>
  );
}
