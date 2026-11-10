import type { Metadata } from "next";
import Link from "next/link";
import { FerrisBadge } from "@/components/Ferris";
import PanicPath from "@/components/PanicPath";

export const metadata: Metadata = { title: "404 | Sunil Jalandhra" };

export default function NotFound() {
  return (
    <main className="container panic">
      <FerrisBadge size={150} className="panic-ferris" />
      <h1>404: this route doesn&apos;t compile</h1>
      <pre className="panic-log" aria-label="Rust-style error message">
        <span className="err">error[E0404]</span>: no route matches this path{"\n"}
        <span className="dim">  --&gt; </span>suniljalandhra.com<PanicPath />{"\n"}
        <span className="dim">   |</span>{"\n"}
        <span className="dim">   = </span>note: thread &apos;main&apos; panicked at src/routes.rs:404:1{"\n"}
        <span className="dim">   = </span><span className="help">help</span>: try going back home
      </pre>
      <Link href="/" className="btn">$ cargo run --bin home</Link>
    </main>
  );
}
