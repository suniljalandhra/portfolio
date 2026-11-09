export type Day = { date: string; count: number; level: number };
export type YearData = { key: string; label: string; total: number; days: Day[] };

const USER = "suniljalandhra";
const FIRST_YEAR = 2021;

/** Fetches public GitHub contribution data, refreshed at most once a day. Returns [] on failure. */
export async function getContributions(): Promise<YearData[]> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { contributions: Day[] };
    const all = [...json.contributions].sort((a, b) => a.date.localeCompare(b.date));
    const today = new Date().toISOString().slice(0, 10);

    const lastYearStart = new Date();
    lastYearStart.setUTCDate(lastYearStart.getUTCDate() - 364);
    const from = lastYearStart.toISOString().slice(0, 10);
    const lastYear = all.filter((d) => d.date >= from && d.date <= today);

    const years: YearData[] = [
      { key: "last", label: "Last year", total: sum(lastYear), days: lastYear },
    ];
    for (let y = new Date().getUTCFullYear(); y >= FIRST_YEAR; y--) {
      const days = all.filter((d) => d.date.startsWith(`${y}-`) && d.date <= today);
      if (days.length) years.push({ key: String(y), label: String(y), total: sum(days), days });
    }
    return years;
  } catch {
    return [];
  }
}

function sum(days: Day[]) {
  return days.reduce((n, d) => n + d.count, 0);
}
