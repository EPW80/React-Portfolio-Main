# Erik Parra Williams — Portfolio

Modern single-page portfolio for full-stack projects, resume, and contact.

## Live site

Primary (Vercel): https://react-portfolio-main-erik-williams-projects.vercel.app/

Legacy GitHub Pages build path remains supported for `gh-pages` deploys.

## Stack

- React 18 + Vite
- Custom CSS (no UI framework)
- Formspree for contact
- Vercel production hosting
- Optional GitHub Pages deploy

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build → dist/
npm run preview  # preview production build
npm test
npm run deploy   # build + publish to gh-pages (legacy)
```

## Sections

- Hero with brand-first introduction
- Selected work (live demos + repos)
- About & skills
- Resume highlights + PDF download
- Contact form

## Environment

Copy `.env.example` to `.env.local` for local overrides:

- `VITE_FORMSPREE_ID` — Formspree form id (defaults to the production form)
