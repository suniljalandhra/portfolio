"use client";

import { useEffect, useRef, useState } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";

const SUBJECT = "Hello Sunil, from your portfolio";
const BODY = `Hi Sunil,

I came across your portfolio and would like to talk about

Best regards,
`;

const enc = encodeURIComponent;

/**
 * Opens the visitor's mail app with a prefilled subject and body.
 * If no mail app takes over within a moment (no default mail app set up, which is
 * common for people who use Gmail in the browser), shows web-mail and copy fallbacks.
 */
export default function EmailLink({ email, label, className }: { email: string; label?: string; className?: string }) {
  const [fallback, setFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mailto = `mailto:${email}?subject=${enc(SUBJECT)}&body=${enc(BODY)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(email)}&su=${enc(SUBJECT)}&body=${enc(BODY)}`;
  const outlook = `https://outlook.live.com/mail/0/deeplink/compose?to=${enc(email)}&subject=${enc(SUBJECT)}&body=${enc(BODY)}`;

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const onClick = () => {
    setFallback(false);
    // If a mail app opens, this window loses focus or gets hidden; cancel the fallback.
    const cancel = () => {
      if (timer.current) clearTimeout(timer.current);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
    window.addEventListener("blur", cancel);
    document.addEventListener("visibilitychange", cancel);
    timer.current = setTimeout(() => {
      cancel();
      setFallback(true);
    }, 1200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <span className="email-wrap">
      <a href={mailto} onClick={onClick} className={className}>
        <EnvelopeSimple size={18} weight="duotone" /> {label ?? email}
      </a>
      {fallback && (
        <span className="email-fallback" role="status">
          <span className="muted">No mail app opened? Use</span>
          <a href={gmail} target="_blank" rel="noreferrer">Gmail</a>
          <a href={outlook} target="_blank" rel="noreferrer">Outlook</a>
          <button type="button" onClick={copy}>{copied ? "Copied!" : `Copy ${email}`}</button>
          <button type="button" className="close" onClick={() => setFallback(false)} aria-label="Dismiss">×</button>
        </span>
      )}
    </span>
  );
}
