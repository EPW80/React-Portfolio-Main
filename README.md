# Erik Parra Williams — Portfolio

Modern single-page portfolio for full-stack & backend projects, resume, and contact.

## Live site

https://react-portfolio-main-erik-williams-projects.vercel.app/

## Stack

- React 18 + Vite
- Custom CSS (no UI framework)
- Formspree for contact
- Vercel production hosting

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview production build
npm test
```

## Sections

- Hero with brand-first introduction
- Selected work (live demos + repos)
- About & skills
- Resume experience + PDF download
- Contact form

## Environment

Copy `.env.example` to `.env.local` for local overrides:

- `VITE_FORMSPREE_ID` — Formspree form id (defaults to the production form)
- `VITE_SITE_URL` — canonical origin. Defaults to the verified host above. Set it when a real custom domain is attached. Do not point it at a preview URL.
- `VITE_INDEXING` — `index` or `noindex`. Unset production builds stay indexable. `vite dev` and Vercel preview builds are `noindex,follow`. `robots.txt` still allows crawling so that directive can be seen.
- `VITE_AI_SEARCH_CRAWLERS` and `VITE_AI_TRAINING_CRAWLERS` — `allow` (default) or `disallow`. These are separate. The default matches the previous public allow-all policy. `disallow` blocks only that group in `robots.txt`; it is not a Google Search noindex.
- `VITE_GOOGLE_SITE_VERIFICATION` — Search Console token. The meta tag is omitted when this is empty.

## SEO and AEO

The site is one page. Work, about, resume, and contact are `#` sections, not routes, and they are not listed in the sitemap. Production HTML is prerendered into `dist/index.html` so the copy and JSON-LD are in the first response. `/llms.txt` repeats that public copy. It is an experimental convention, not a ranking or citation guarantee.

Figtree and Bricolage Grotesque are self-hosted from `public/fonts` under the SIL Open Font License.

Unknown paths use `public/404.html` (HTTP 404 on Vercel and GitHub Pages). `/index.html` redirects to `/` in `vercel.json`. `vite preview` falls back to the home document for unknown paths, so it is not a check of that 404.

The live `*.vercel.app` response currently includes `X-Robots-Tag: noindex`. This repo does not set that header, and production HTML stays `index,follow`. A custom domain — or another host that does not send `noindex` — is required before that header stops applying. Put the new origin in `VITE_SITE_URL`. No domain is invented here.

GitHub Pages for this repository serves the `main` branch root, which is the source tree rather than `dist/`. The canonical host remains the Vercel URL documented above.
