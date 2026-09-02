# husni.dev

Personal blog of Husni Munaya, now built with [Hugo](https://gohugo.io/).

## Local development

```bash
hugo server
```

Open `http://localhost:1313`.

## Build

```bash
hugo --minify
```

The generated site is written to `public/`.

## Project structure

- `content/posts/` – blog posts
- `content/page/` – standalone pages (e.g., `/uses`)
- `layouts/` – Hugo templates and partials
- `assets/scss/` – site styles
- `static/` – static assets served at root (favicon, robots.txt)

## Deployment

The site is configured to build to `public/`. Deploy the contents of that directory to your static host (e.g., GitHub Pages, Netlify, Vercel).

A common approach for `husnimun.github.io` is a GitHub Actions workflow that runs `hugo --minify` and pushes `public/` to the `gh-pages` branch.
