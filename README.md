# Amicitia Limited — Landing Page

The marketing site for **Amicitia Limited** ([amicitia.uk](https://amicitia.uk)) — a UK
studio building **social**, **geospatial**, and **computer-vision** software. Built with
Next.js and exported to fully static HTML so it can be hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs a static site to ./out
```

## Deploy to GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that builds and
publishes automatically.

1. Push this project to a GitHub repository.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the site builds and deploys on every push.

The custom domain is configured via `public/CNAME` (`amicitia.uk`). In your DNS,
point the apex domain to GitHub Pages:

```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
```

(or a `CNAME` record to `<your-username>.github.io` for a subdomain).

`public/.nojekyll` is included so GitHub Pages serves the `_next/` asset folder.

> **Note:** If you deploy to a project page instead of a custom domain
> (e.g. `username.github.io/repo`), set `basePath` and `assetPrefix` in
> `next.config.mjs` to `/repo`, and remove `public/CNAME`.

## Editing content

All copy lives in `app/page.tsx` — the contact email, focus areas, and the CatApp
showcase. Styling is in `app/globals.css`.
