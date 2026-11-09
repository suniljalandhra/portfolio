"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 80;
const DELETE_MS = 45;
const HOLD_MS = 1800;

/**
 * Types and deletes each word in turn. Starts with the first word fully shown so the
 * server-rendered HTML is complete, and stays static for reduced-motion users.
 * Every word is also rendered invisibly in the same grid cell, so the slot always
 * reserves the width of the longest word and the layout never jumps.
 */
export default function TypedWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);
  const [deleting, setDeleting] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else if (deleting) {
      t = setTimeout(() => setText(word.slice(0, text.length - 1)), DELETE_MS);
    } else {
      t = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
    }
    return () => clearTimeout(t);
  }, [enabled, text, deleting, index, words]);

  return (
    <span className="typed" aria-hidden>
      {words.map((w) => (
        <span key={w} className="typed-ghost">{w}</span>
      ))}
      <span className="typed-live">
        {text}
        <span className="typed-cursor" />
      </span>
    </span>
  );
}
