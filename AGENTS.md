# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Prototype design direction

- Treat wager.tw as the primary source for the global visual language, homepage content, section order, article topics, and information density.
- Use warm white surfaces, black/gray editorial typography, and `#FF6500` orange as the global brand accent. Preserve Wager-style heavy headings, orange eyebrow pills, two-column hero, ranked recommendation cards, lightweight article grids, and dark feature/footer areas.
- Keep the 3A section as a first-level destination in desktop and mobile navigation, but restrict the 333aaa blue palette, mascot art, and cool surfaces to the 3A nav state, homepage 3A preview, and `/3a` route.
- Homepage order should remain: hero, casino recommendations, popular games, World Cup, beginner guides, 3A preview, discussions/latest articles, USDT, FAQ, CTA, footer.
- Maintain the four primary routes: `/`, `/blog`, `/blog/:slug`, and `/3a`.
