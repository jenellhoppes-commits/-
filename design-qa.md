# Design QA — 娛樂資訊原型

## Visual truth and scope

- Primary live source: `https://wager.tw/`
- Desktop source capture: `source-wager-desktop.png`
- Mobile source capture: `source-wager-mobile.png`
- Supporting content/IA evidence: `C:\Users\user\Desktop\PP\二站\wager-style-spec.md`
- 3A-only visual reference: `C:\Users\user\Desktop\PP\二站\18-3a-home-desktop.png` and `C:\Users\user\Desktop\PP\二站\24-3a-home-mobile.png`
- Implemented routes checked: `/`, `/casino-recommendations`, `/blog`, `/blog/usdt-guide`, `/blog/richgame`, `/about`

## Captures and normalization

| State | CSS viewport | Source pixels | Implementation pixels | Evidence |
| --- | ---: | ---: | ---: | --- |
| Wager-style home desktop | 1280 × 720 | 1265 × 712 | 1265 × 712 | `qa-wager-compare-desktop.png` |
| Wager-style home mobile | 390 × 844 | 375 × 812 | 375 × 812 | `qa-wager-compare-mobile.png` |
| About desktop | 1280 × 720 | — | responsive | current implementation |
| About mobile | 390 × 844 | — | responsive | current implementation |
| Minimal symbol in header | Header crop | 1024 × 1024 | responsive contain | current implementation |
| Entertainment recommendations desktop | 1680 × 918 | — | 1680 × 918 | `qa-recommendations-desktop.png` |
| Entertainment recommendations mobile | 390 × 844 capture | — | responsive stack | `qa-recommendations-mobile.png` |

Source and implementation captures use identical browser viewport settings and device density. Saved pixels exclude the browser scrollbar/chrome region. The comparison images join source and implementation at native 1:1 scale without resampling.

## Findings

- Typography: the local SF Pro Display font, Chinese fallback, heavy headings, blue eyebrow labels, and paragraph scale preserve the editorial hierarchy. Mobile body copy remains enlarged for clear line breaks and vertical rhythm.
- Spacing and layout: the desktop two-column hero, 1130–1160 px content width, 62–70 px header, four information cards, section spacing, and mobile single-column stack align with the source. No overlap or horizontal page overflow was found at 390, 768, 1024, or 1280 px.
- Colors and tokens: white and ice-blue surfaces, deep blue typography, `#0b67c2` primary actions, cyan highlights, blue-tinted shadows, navy feature regions, and a dark footer define the global system.
- Image quality: a compact transparent cyan-and-blue symbol is bundled locally and used in the header and footer. The hero, three casino brands, nine game covers, and local font remain served locally. No hotlinked or placeholder assets remain.
- Copy and content: all visible legacy brand mentions were removed from the application and production bundle. Homepage, article library, article detail, footer, About page, and the independent entertainment-recommendations page use neutral editorial language.
- Accessibility: semantic navigation, headings, tablist, dialogs, labels, FAQ expanded states, focus outlines, meaningful alt text, decorative empty alt text, practical touch targets, and reduced-motion handling are present.
- Focused comparison: the desktop and mobile hero/header regions are readable at native size in both composite files. `qa-logo-compare.png` adds a dedicated source-versus-header crop for the replacement logo; the smaller rendered version shows only expected raster downscaling.
- Console: a fresh browser session produced no warnings or errors.

## Primary interactions tested

- Mobile drawer exposes all editorial sections plus About and navigates home.
- `娛樂城推薦` opens the independent `/casino-recommendations` route from the header, homepage and footer.
- The recommendations page contains review criteria, ranking cards, a comparison table, checklist, FAQ and article CTA.
- Header exposes the requested login, registration, and menu controls; search has been removed.
- Blog category tab `娛樂城評價` becomes selected and filters to two cards.
- Casino primary CTA routes to `/blog/richgame`.
- FAQ updates `aria-expanded` and reveals its answer.
- About route, homepage section links, article pages, and in-page navigation render correctly.

## Comparison history

1. P1 — Rebuilt the information architecture around the Wager section and content order, then unified the final interface with the requested blue-led identity.
2. P2 — The first rebuild left a casino `查看平台` CTA without a destination. Wired it to the matching local review article and verified the resulting route.
3. P2 — Mobile hero buttons initially filled the whole width and the body copy was too compact compared with Wager. Restored the source's left-aligned 170 px buttons, increased paragraph scale, and re-captured at 390 × 844.
4. Logo update — Replaced the prior wordmark with a compact, text-free cyan-and-blue symbol for the header and footer.
5. Brand cleanup — Removed all visible legacy site-name copy, legacy email/footer credit, and legacy font-family label from the frontend and production bundle.
6. Independent recommendation page — Added `/casino-recommendations` with the same blue editorial rhythm, complete responsive sections, active navigation state and working local article links.
7. Final pass — production build and all four packaging tests pass; the browser reports no horizontal overflow or application errors on the inspected desktop state.

final result: passed
