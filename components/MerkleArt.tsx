/**
 * Line-art Merkle tree: 8 leaves hashed up to a root, with one inclusion-proof
 * path highlighted (leaf 5 → root) and its sibling hashes marked.
 */
const W = 360;
const LEVELS = [1, 2, 4, 8];
const Y = [36, 112, 188, 264];
const PROOF = [0, 1, 2, 5]; // index of the highlighted node at each level
const SIBLINGS = [null, 0, 3, 4]; // sibling hashes included in the proof

function x(level: number, i: number) {
  const n = LEVELS[level];
  const step = (W - 40) / n;
  return 20 + step * i + step / 2;
}

export default function MerkleArt() {
  const edges: { x1: number; y1: number; x2: number; y2: number; hot: boolean }[] = [];
  for (let l = 1; l < LEVELS.length; l++) {
    for (let i = 0; i < LEVELS[l]; i++) {
      const parent = Math.floor(i / 2);
      edges.push({
        x1: x(l - 1, parent),
        y1: Y[l - 1] + 14,
        x2: x(l, i),
        y2: Y[l] - 14,
        hot: PROOF[l] === i && PROOF[l - 1] === parent,
      });
    }
  }

  return (
    <svg className="merkle" viewBox={`0 0 ${W} 300`} role="img" aria-label="Merkle tree with a highlighted inclusion proof path">
      {edges.map(({ hot, ...pts }, i) => (
        <line key={i} {...pts} className={hot ? "edge hot" : "edge"} />
      ))}
      {LEVELS.map((n, l) =>
        Array.from({ length: n }, (_, i) => {
          const cls = PROOF[l] === i ? "node hot" : SIBLINGS[l] === i ? "node sib" : "node";
          const s = l === 3 ? 22 : 28;
          return (
            <g key={`${l}-${i}`} className={cls}>
              <rect x={x(l, i) - s / 2} y={Y[l] - s / 2} width={s} height={s} rx={6} />
              {l === 0 && <text x={x(l, i)} y={Y[l] + 4} textAnchor="middle">root</text>}
            </g>
          );
        })
      )}
      <text x={x(3, 5)} y={292} textAnchor="middle" className="label">leaf</text>
    </svg>
  );
}
