"use client";

import { useEffect } from "react";

let printed = false;

/** A small hello for anyone who opens the browser console. */
export default function ConsoleFerris({ email }: { email: string }) {
  useEffect(() => {
    if (printed) return;
    printed = true;
    const crab = [
      "    _~^~^~_",
      "\\) /  o o  \\ (/",
      "  '_   -   _'",
      "  / '-----' \\",
    ].join("\n");
    console.log(
      `%c${crab}%c\n\nwarning: unused talent detected\n  --> you're reading the console, so we should probably talk\n  = help: email ${email}`,
      "color:#f74c00;font-family:monospace;font-size:13px;line-height:1.2",
      "color:#2dd4bf;font-family:monospace;font-size:12px"
    );
  }, [email]);
  return null;
}
