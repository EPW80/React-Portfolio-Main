# Erik Parra Williams — Portfolio

Modern single-page portfolio for full-stack projects, resume, and contact.

## Stack

- React 18 + Vite
- Custom CSS (no UI framework)
- Formspree for contact
- GitHub Pages deploy

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview production build
npm test
npm run deploy   # build + publish to gh-pages
```

## Sections

- Hero with brand-first introduction
- Selected work (live demos + repos)
- About & skills
- Resume download
- Contact form

## Plugin workflow notes

What this environment can run today vs. deferred:

| Plugin | Status on this pass |
| --- | --- |
| Mobbin | Blocked — paid Mobbin plan required for MCP search |
| Figma | Authenticated (View seat) — design write-back deferred |
| Runway | Authenticated; image models available — kept real project screenshots instead of AI covers |
| Chrome DevTools / Playwright | Used for local smoke verification |
| Vercel | Linked or attempted if team auth is available |
| Ahrefs / Semrush / Profound | Deferred until after a stable production URL + API access |
