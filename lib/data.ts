export const profile = {
  name: "Sunil Jalandhra",
  role: "Backend & Blockchain Engineer",
  location: "New Delhi, India (IST)",
  availability: "Available immediately · Open to remote",
  email: "suniljalandhra26@gmail.com",
  linkedin: "https://linkedin.com/in/sunil-jalandhra",
  github: "https://github.com/suniljalandhra",
  summary:
    "5+ years building event-driven backends, on-chain programs and zero-knowledge infrastructure. I work in Rust for on-chain programs, ZK and services, and TypeScript (NestJS) and Go for event-driven backends, across Solana, EVM, Cosmos, NEAR and TON.",
};

export const stats = [
  { value: "5+", label: "years shipping production systems" },
  { value: "~1,700", label: "events / sec through the Kafka indexer" },
  { value: "100+", label: "on-chain event types indexed" },
  { value: "5", label: "chains: Solana, EVM, Cosmos, NEAR, TON" },
];

export const tracks = [
  {
    id: "backend",
    title: "Event-driven backends",
    body: "Kafka pipelines into PostgreSQL with idempotent consumers, per-record ordering, dead-letter queues, the outbox pattern and GraphQL on top.",
    tags: ["NestJS", "Kafka", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    id: "solana",
    title: "Solana & cross-chain",
    body: "Rust/Anchor staking programs, LayerZero V2 messaging, multi-sig bridges between TON, Ethereum and Solana, and replay-resistant signature flows.",
    tags: ["Rust", "Anchor", "Token-2022", "LayerZero V2", "Solana Kit"],
  },
  {
    id: "zk",
    title: "Zero-knowledge systems",
    body: "Proof-aggregation services, Indexed Merkle Tree order books, Circom circuits for Ed25519 and Ethereum storage proofs with SP1.",
    tags: ["Circom", "SP1", "Indexed Merkle Trees", "Actix Web"],
  },
];

export type Job = {
  role: string;
  company: string;
  mark: string;
  hue: number;
  summary: string;
  place: string;
  period: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Senior Solana Engineer",
    company: "D3 Inc",
    mark: "D3",
    hue: 260,
    summary: "Built the real-time Solana indexing backend and wrote Rust/Anchor staking programs with LayerZero V2 cross-chain messaging.",
    place: "Remote",
    period: "Aug 2025 – Sep 2026",
    points: [
      "Designed and built a real-time indexer for SPL Token and Token-2022: about 1,700 events/sec across 100+ event types, from Helius Laserstream through Kafka into PostgreSQL.",
      "Made every consumer idempotent so retries and historical backfills never write an event twice; per-record ordering and a dead-letter queue for failures.",
      "Used the transactional outbox pattern to keep database writes and Kafka events consistent, retrying only transient errors with backoff.",
      "Traced replay out-of-memory crashes to unbounded stream concurrency and capped it; fixed a shutdown race and sped up slow RPC decoding.",
      "Wrote Rust/Anchor staking programs (position NFTs, rewards, unstaking, recovery, LayerZero V2 messaging) and secured cross-chain flows with per-domain nonces and domain-separated signatures.",
      "Migrated production transaction flows from web3.js to Solana Kit and Codama, with golden tests proving transaction bytes did not change.",
    ],
  },
  {
    role: "Engineering Manager (hands-on)",
    company: "Aerius Labs",
    mark: "AL",
    hue: 160,
    summary: "Led a small team shipping ZK proof infrastructure, a verifiable order book and multi-sig bridges across TON, Ethereum and Solana.",
    place: "Gurgaon, India",
    period: "Dec 2022 – Jul 2025",
    points: [
      "Managed two engineers and coded alongside them on a Rust (Actix Web) proof-aggregation backend for ZK Snap, with async jobs, PostgreSQL and REST APIs.",
      "Co-designed VEX, a verifiable exchange order book, and implemented its Indexed Merkle Trees and the circuits proving each matched trade.",
      "Worked on Ethereum storage proofs with SP1 and Tendermint light-client integration in Substrate.",
      "Led multi-signature bridges between TON, Ethereum and Solana: signature aggregation, threshold checks and message relay.",
      "Shipped a Solana domain minting and marketplace backend using MPL Core, address lookup tables and versioned transactions for batched mints and sales.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Electron Labs",
    mark: "EL",
    hue: 25,
    summary: "Built a NEAR–Cosmos token bridge in Go and wrote Ed25519 verification circuits in Circom.",
    place: "New Delhi, India",
    period: "May 2021 – Nov 2022",
    points: [
      "Built a NEAR–Cosmos token bridge in Go on the Cosmos SDK, including a NEAR light client and a modified IBC transfer module.",
      "Wrote Ed25519 signature verification circuits in Circom for cross-chain messages.",
    ],
  },
];

export const projects = [
  {
    kicker: "Side project · ZK",
    title: "zkCert: private course certificates",
    body: "Proves \"I completed course X\" on Coursera or Udemy by verifying the platform's DKIM-signed completion email inside the SP1 zkVM. The email, name and address stay private; proofs verify in the browser via WASM or mint an EAS attestation on-chain.",
    stack: ["SP1", "Rust", "DKIM / RSA", "WASM", "Groth16", "EAS"],
    href: "https://github.com/suniljalandhra/zkcert-sp1",
  },
  {
    kicker: "D3 Inc · 2025–26",
    title: "Solana token indexer",
    body: "Real-time pipeline turning on-chain activity into queryable data, built to survive replays, backfills and load spikes.",
    stack: ["Helius Laserstream", "Kafka", "PostgreSQL", "GraphQL", "Redis"],
  },
  {
    kicker: "Aerius Labs · ZK",
    title: "VEX: verifiable order book",
    body: "Buy and sell sides as max/min-heap Indexed Merkle Trees, with circuits proving insertion, non-membership and top-of-book for every match.",
    stack: ["Indexed Merkle Trees", "ZK circuits", "Rust"],
  },
  {
    kicker: "Aerius Labs · Bridges",
    title: "TON ↔ Ethereum ↔ Solana bridge",
    body: "Multi-signature bridge for Jetton transfers: collects signer approvals, checks the threshold and relays messages between chains.",
    stack: ["TON", "Ethereum", "Solana", "Multi-sig"],
  },
  {
    kicker: "Open source",
    title: "solana-record-service #19",
    body: "Fixed record deletion so program accounts close fully and return their rent.",
    stack: ["Solana Foundation", "Rust"],
    href: "https://github.com/solana-foundation/solana-record-service/pull/19",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Rust", "TypeScript", "Go", "Solidity", "Circom", "SQL"] },
  { group: "Backend", items: ["NestJS", "Node.js", "PostgreSQL", "TypeORM", "Kafka", "Redis", "GraphQL", "Actix Web"] },
  { group: "Solana", items: ["Anchor", "Solana Kit", "Codama", "Token-2022", "MPL Core", "PDAs", "ALTs"] },
  { group: "Protocols & ZK", items: ["LayerZero V2", "Cosmos SDK", "IBC", "NEAR", "TON", "Substrate", "SP1"] },
  { group: "Architecture", items: ["Event-driven", "Outbox pattern", "Dead-letter queues", "Microservices", "Caching"] },
  { group: "Testing & DevOps", items: ["Jest", "PGlite", "Golden tests", "Docker", "Kubernetes", "CI/CD"] },
];

export const education = {
  degree: "B.Tech in Computer Science",
  school: "Indian Institute of Information Technology Una",
  period: "2017 – 2021",
};
