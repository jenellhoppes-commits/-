# Design QA — 3A 娛樂資訊原型

## Visual truth and scope

- Primary live source: `https://wager.tw/`
- Desktop source capture: `source-wager-desktop.png`
- Mobile source capture: `source-wager-mobile.png`
- Supporting content/IA evidence: `C:\Users\user\Desktop\PP\二站\wager-style-spec.md`
- 3A-only visual reference: `C:\Users\user\Desktop\PP\二站\18-3a-home-desktop.png` and `C:\Users\user\Desktop\PP\二站\24-3a-home-mobile.png`
- Implemented routes checked: `/`, `/casino-recommendations`, `/blog`, `/blog/usdt-guide`, `/blog/richgame`, `/3a`

## Captures and normalization

| State | CSS viewport | Source pixels | Implementation pixels | Evidence |
| --- | ---: | ---: | ---: | --- |
| Wager-style home desktop | 1280 × 720 | 1265 × 712 | 1265 × 712 | `qa-wager-compare-desktop.png` |
| Wager-style home mobile | 390 × 844 | 375 × 812 | 375 × 812 | `qa-wager-compare-mobile.png` |
| 3A desktop | 1280 × 720 | — | 1265 × 712 | `qa-wager-3a-desktop.png` |
| 3A mobile | 390 × 844 | — | 375 × 812 | `qa-wager-3a-mobile.png` |
| Official 3A logo in header | Header crop | 400 × 87 | responsive contain | `qa-recommendations-desktop.png` |
| Entertainment recommendations desktop | 1680 × 918 | — | 1680 × 918 | `qa-recommendations-desktop.png` |
| Entertainment recommendations mobile | 390 × 844 capture | — | responsive stack | `qa-recommendations-mobile.png` |

Source and implementation captures use identical browser viewport settings and device density. Saved pixels exclude the browser scrollbar/chrome region. The comparison images join source and implementation at native 1:1 scale without resampling.

## Findings

- Typography: the local SF Pro Display font, Chinese fallback, heavy black headings, orange eyebrow labels, and paragraph scale reproduce the source hierarchy. Mobile body copy was enlarged so line breaks and vertical rhythm match the source first screen.
- Spacing and layout: the desktop two-column hero, 1130–1160 px content width, 62–70 px header, four information cards, section spacing, and mobile single-column stack align with the source. No overlap or horizontal page overflow was found at 390, 768, 1024, or 1280 px.
- Colors and tokens: warm white, black/gray typography, `#ff6500` orange actions, subtle warm shadows, dark navy feature regions, and dark footer now define the global system. Blue is intentionally limited to the 3A nav state and 3A surfaces.
- Image quality: the official 400 × 87 transparent 3A logo from the user-provided URL is bundled locally and used in the header and footer without redrawing. The hero, three casino brands, nine game covers, and local font remain served locally. No hotlinked or placeholder assets remain.
- Copy and content: all visible legacy brand mentions were removed from the application and production bundle. Homepage, article library, article detail, footer, 3A, and the new independent entertainment-recommendations page now use 3A or neutral editorial language.
- Accessibility: semantic navigation, headings, tablist, dialogs, labels, FAQ expanded states, focus outlines, meaningful alt text, decorative empty alt text, practical touch targets, and reduced-motion handling are present.
- Focused comparison: the desktop and mobile hero/header regions are readable at native size in both composite files. `qa-logo-compare.png` adds a dedicated source-versus-header crop for the replacement logo; the smaller rendered version shows only expected raster downscaling.
- Console: a fresh browser session produced no warnings or errors.

## Primary interactions tested

- Mobile drawer exposes all editorial sections plus 3A and navigates home.
- `娛樂城推薦` opens the independent `/casino-recommendations` route from the header, homepage and footer.
- The recommendations page contains review criteria, ranking cards, a comparison table, checklist, FAQ and article CTA.
- Search returns two results for `USDT` and routes to `/blog/usdt-guide`.
- Blog category tab `娛樂城評價` becomes selected and filters to two cards.
- Casino primary CTA routes to `/blog/richgame`.
- FAQ updates `aria-expanded` and reveals its answer.
- 3A route, homepage section links, article pages, and in-page navigation render correctly.

## Comparison history

1. P1 — Previous implementation treated the 333AAA ice-blue theme as the global brand and used generic editorial copy. Rebuilt the visual system around Wager's warm white/orange/black language and replaced the homepage information architecture with the live Wager section and content order.
2. P2 — The first rebuild left a casino `查看平台` CTA without a destination. Wired it to the matching local review article and verified the resulting route.
3. P2 — Mobile hero buttons initially filled the whole width and the body copy was too compact compared with Wager. Restored the source's left-aligned 170 px buttons, increased paragraph scale, and re-captured at 390 × 844.
4. Logo update — Replaced the temporary clipboard bitmap with the exact official transparent `3A 遊戲城` PNG supplied by URL, preserved its full 400 × 87 aspect ratio, and verified header/footer rendering.
5. Brand cleanup — Removed all visible legacy site-name copy, legacy email/footer credit, and legacy font-family label from the frontend and production bundle.
6. Independent recommendation page — Added `/casino-recommendations` with the same orange/black editorial rhythm, complete responsive sections, active navigation state and working local article links.
7. Final pass — production build and all four packaging tests pass; the browser reports no horizontal overflow or application errors on the inspected desktop state.

## Follow-up polish

- P3 — Search and menu use explicit text labels instead of the source icon-only controls; this improves clarity and remains visually lightweight.

final result: passed
