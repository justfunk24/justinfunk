# Contrast audit

Measured contrast ratios for every foreground/background token pair the site actually uses, in both themes. WCAG AA requires **4.5:1** for normal text and 3:1 for large text — everything below clears the stricter bar.

Measured in-browser against the computed custom properties in `src/styles/global.css`, so these are the real rendered values rather than hand arithmetic.

## Light — cool drafting vellum

| Pair                     | Ratio   |     |
| ------------------------ | ------- | --- |
| `ink` on `ground`        | 16.78:1 | AA  |
| `ink-muted` on `ground`  | 5.84:1  | AA  |
| `signal` on `ground`     | 6.16:1  | AA  |
| `copper` on `ground`     | 4.61:1  | AA  |
| `ink` on `surface`       | 18.49:1 | AA  |
| `ink-muted` on `surface` | 6.44:1  | AA  |
| `signal` on `surface`    | 6.79:1  | AA  |
| `copper` on `surface`    | 5.08:1  | AA  |

## Dark — equipment cabinet

| Pair                     | Ratio   |     |
| ------------------------ | ------- | --- |
| `ink` on `ground`        | 16.20:1 | AA  |
| `ink-muted` on `ground`  | 7.25:1  | AA  |
| `signal` on `ground`     | 5.76:1  | AA  |
| `copper` on `ground`     | 9.53:1  | AA  |
| `ink` on `surface`       | 14.84:1 | AA  |
| `ink-muted` on `surface` | 6.65:1  | AA  |
| `signal` on `surface`    | 5.28:1  | AA  |
| `copper` on `surface`    | 8.73:1  | AA  |

## Notes

**The tightest pair is `copper` on `ground` in light mode at 4.61:1.** It clears AA, but there's little headroom — if you darken the copper or lighten the page background, re-measure. Copper is only ever used for short labels and small indicators, never for body copy.

**Color is never the only signal.** The two tiers in the platform matrix differ by border style (solid vs dashed) and by whether a cable is drawn, not only by hue. The selected port adds a solid left bar. The timeline's dimmed state is opacity plus the roles staying in the accessibility tree. Anyone who can't separate copper from slate still gets the full distinction.

## Re-running this

Paste the audit script from this file's git history into the browser console on any page, or check pairs manually at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) using the hex values in `src/styles/global.css`.
