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
