"use client";

import { useMemo, useState } from "react";
import type { Day, YearData } from "@/lib/github";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  if (!days.length) return weeks;
  const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
  let week: (Day | null)[] = Array(pad).fill(null);
  for (const d of days) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  return weeks;
}

export default function ContributionGraph({ years }: { years: YearData[] }) {
  const [active, setActive] = useState(years[0]?.key);
  const year = years.find((y) => y.key === active) ?? years[0];
  const weeks = useMemo(() => toWeeks(year.days), [year]);

  const monthLabels = weeks.map((w, i) => {
    const first = w.find(Boolean);
    if (!first) return "";
    const m = Number(first.date.slice(5, 7)) - 1;
    const prev = i > 0 ? weeks[i - 1].find(Boolean) : null;
    return !prev || Number(prev.date.slice(5, 7)) - 1 !== m ? MONTHS[m] : "";
  });

  return (
    <div className="graph-wrap">
      <div className="graph-card">
        <div className="graph-scroll">
          <div className="graph" style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(9px, 1fr))` }}>
            {monthLabels.map((m, i) => (
              <span key={`m${i}`} className="graph-month" style={{ gridColumn: i + 1 }}>
                {m}
              </span>
            ))}
            {weeks.map((w, wi) =>
              w.map((d, di) => (
                <span
                  key={`${wi}-${di}`}
                  className="cell"
                  data-level={d ? d.level : undefined}
                  style={{ gridColumn: wi + 1, gridRow: di + 2 }}
                  title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                />
              ))
            )}
          </div>
        </div>
        <div className="graph-foot">
          <span>
            {year.total.toLocaleString("en-US")} contributions {year.key === "last" ? "in the last year" : `in ${year.label}`}
          </span>
          <span className="legend" aria-hidden>
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className="cell" data-level={l} />
            ))}
            More
          </span>
        </div>
      </div>
      <div className="graph-years" role="tablist" aria-label="Contribution year">
        {years.map((y) => (
          <button
            key={y.key}
            role="tab"
            aria-selected={y.key === active}
            className={y.key === active ? "active" : ""}
            onClick={() => setActive(y.key)}
          >
            {y.label}
          </button>
        ))}
      </div>
    </div>
  );
}
