import {defineTheme} from '@astryxdesign/core/theme';
import {gothicTheme} from '@astryxdesign/theme-gothic/built';

/**
 * Portfolio theme: Gothic's deep blue-gray base, re-tuned to the site's own
 * navy + teal palette, with a light mode added (Gothic itself is dark-only) and
 * the site's fonts (Geist, Space Grotesk, Geist Mono via next/font) instead of
 * Gothic's blackletter display face. Values are [light, dark] tuples.
 */
const navy = '#0f172a';
const slate = '#e2e8f0';

export const portfolioTheme = defineTheme({
  name: 'portfolio',
  extends: gothicTheme,

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {family: 'var(--font-sans)', fallbacks: 'system-ui, -apple-system, "Segoe UI", sans-serif'},
    heading: {family: 'var(--font-display)', fallbacks: 'system-ui, -apple-system, "Segoe UI", sans-serif'},
    code: {family: 'var(--font-mono)', fallbacks: 'ui-monospace, "SF Mono", Menlo, monospace'},
  },

  tokens: {
    // Accent: teal
    '--color-accent': ['#0d9488', '#5eead4'],
    '--color-accent-muted': ['#ccfbf1', 'rgba(45, 212, 191, 0.1)'],
    '--color-text-accent': ['#0d9488', '#5eead4'],
    '--color-icon-accent': ['#0d9488', '#5eead4'],
    '--color-on-accent': ['#ffffff', navy],

    // Surfaces: off-white / navy
    '--color-background-body': ['#f6f8fb', navy],
    '--color-background-surface': ['#f6f8fb', navy],
    '--color-background-card': ['#ffffff', '#131d33'],
    '--color-background-popover': ['#ffffff', '#1e293b'],
    '--color-background-muted': ['#eef2f7', '#1e293b'],
    '--color-background-inverted': [navy, slate],
    '--color-overlay': ['rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.8)'],
    '--color-overlay-hover': ['rgba(15, 23, 42, 0.04)', 'rgba(226, 232, 240, 0.05)'],
    '--color-overlay-pressed': ['rgba(15, 23, 42, 0.08)', 'rgba(226, 232, 240, 0.1)'],
    '--color-neutral': ['rgba(15, 23, 42, 0.06)', 'rgba(226, 232, 240, 0.1)'],

    // Text and icons: slate
    '--color-text-primary': [navy, slate],
    '--color-text-secondary': ['#64748b', '#94a3b8'],
    '--color-text-disabled': ['#94a3b8', '#475569'],
    '--color-icon-primary': [navy, slate],
    '--color-icon-secondary': ['#64748b', '#94a3b8'],
    '--color-icon-disabled': ['#94a3b8', '#475569'],
    '--color-on-dark': [slate, slate],
    '--color-on-light': [navy, navy],

    // Lines
    '--color-border': ['#e2e8f0', '#1f2b40'],
    '--color-border-emphasized': ['#cbd5e1', '#334155'],
    '--color-skeleton': ['#e2e8f0', '#1e293b'],
    '--color-shadow': ['rgba(15, 23, 42, 0.08)', 'rgba(0, 0, 0, 0.3)'],
    '--color-tint-hover': ['#ffffff', '#f8fafc'],
  },

  // Gothic's blackletter display face is replaced by the site's display font.
  components: {
    text: {
      'type:display-1': {fontFamily: 'var(--font-display), system-ui, sans-serif'},
      'type:display-2': {fontFamily: 'var(--font-display), system-ui, sans-serif'},
      'type:display-3': {fontFamily: 'var(--font-display), system-ui, sans-serif'},
    },
  },
});
