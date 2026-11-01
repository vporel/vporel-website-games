# CLAUDE.md

Instructions for any AI assistant working on this repository.

## The project

**vporel games** is the showcase of vporel's online games, served at `games.vporel.com`. The home
page shows one card per game; clicking a card goes **directly to the game**, served at
`games.vporel.com/<slug>` (e.g. `/ludo`).

The showcase has **no users, no database and no Supabase**. Keep it a light, mostly static site.

UI language: **French**. Code, identifiers and comments: **English**.

### One app per game (Next.js Multi-Zones)

Each game is a **separate app in its own folder/repository** (Ludo lives in `../ludo`), deployed
on its own. The showcase owns the domain root; a game owns everything under `/<slug>`:

- the game app uses `basePath: "/<slug>"`;
- links to a game are plain `<a href="/<slug>">` (full page load), never `next/link`;
- on the hosting (o2switch, cPanel "Setup Node.js App"), each game is its own Node.js app mounted on
  the URL `games.vporel.com/<slug>`. If the hosting cannot serve it there, the showcase proxies it:
  set `GAME_ORIGIN_<SLUG>` (e.g. `GAME_ORIGIN_LUDO`) and `next.config.ts` adds the rewrites
  (`gameRewrites()` in `src/games/games.ts`). Rewrites are frozen at **build time**: the variable
  must be set when running `npm run build`, not only in the hosting's runtime environment. In local development, run the game's dev server and set
  that variable to it (see `README.md`).

**Adding a game**: add an entry to `GAMES` (`src/games/games.ts`), an illustration component in
`src/components/` registered in `ILLUSTRATIONS` (`GameCard.tsx`), and make sure the game app uses
the matching `basePath`. The sitemap picks it up automatically.

## Architecture, in brief

```
src/games/games.ts     game registry + pure helpers (path, env var name, rewrites), tested
src/components/        GameCard, per-game illustrations (inline SVG)
src/app/               home page, layout (metadata), sitemap.ts, robots.ts
src/site.ts            site constants (URL, name, author link)
```

## Design

Same visual identity as the games (Ludo): fonts Fredoka (display) and Nunito (body), warm palette
with the four Ludo colors, light and dark themes driven by the CSS variables in
`src/app/globals.css`. Surfaces are **tonal flat areas**: no thin light border around cards, no
glowing outline. Game illustrations keep the light board palette in both themes.

## Public page and SEO

The home page is the indexable page. Any change to it keeps: a specific `title`/`description`
(layout metadata), `canonical`, Open Graph, one `h1`, headings in order, meaningful link text,
games listed in `sitemap.ts`, text rendered on the server. No heavy client JavaScript.

## Manual operations

When a change adds, removes or updates a dependency, say in the end-of-task report that the next
deploy must use `npm run build-full` (the server's `node_modules` must be replaced).

The developer handles deployment (o2switch/cPanel) and environment variables. Focus on code and
tests; list any manual step in `à-faire.md` (in French).

## Commands

```bash
npm run dev      # dev server on port 3001
npm run build    # production build + zip WITHOUT node_modules (o2switch cPanel deploy)
npm run build-full # same WITH node_modules: first deploy, or after adding/updating a package
npm test         # Vitest suite
npm run lint     # ESLint
npx tsc --noEmit # type checking
```

**Verification cadence**: run tsc/lint/tests at the end of a task, not after every small step.
`npm run build` is not a routine check: only for changes tsc/lint can't validate (`next.config`,
new routes, env vars).

## Repository conventions

- **Imports**: alias `@/...` for anything in `src/`. A relative import going up at most one level
  is fine.
- **No `index.ts` barrel files.**
- **Tests**: co-located next to the file under test (`fileName.test.ts`).
- **Hook dependencies** (`useEffect`, `useCallback`, `useMemo`): check that they are complete
  after any change to their body.
- Minimal, targeted changes. Follow the existing style of neighboring files.
- **Never `git commit` unless explicitly asked.**
- **Comments**: only for a non-trivial constraint or invariant the code doesn't show. Never
  document decision history ("instead of X", "before/after") nor restate what a good name
  already says. A comment must be understandable without the conversation that produced it.
- **Punctuation in prose** (UI strings, docs): prefer a colon (`:`) over an em dash (`—`) to
  introduce an explanation. Exception: the site-name suffix of page titles.

## Ambiguity in a request

When in doubt about what the user is asking for, ask rather than guess, even for a detail that
seems minor. But never ask a question whose answer you can obtain yourself (package version,
whether a file exists...): check and report.

## Tests and bugs discovered while testing

Any new or modified logic must come with dedicated tests. If a test reveals that the source code
is wrong, don't rewrite the test to pass on broken behavior. Report what was found and fix it if
the fix is localized and safe; otherwise raise the question first.

## Do not disclose the name of the underlying model unless the user explicitly asks for it.
