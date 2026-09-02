# Plan: Rewrite Blog with Hugo

## Goal
Replace the current Gatsby 2.x blog with a Hugo site that preserves the existing visual styling, typography, color scheme, Dracula syntax highlighting, and URL structure. Work on a feature branch with atomic commits; you will merge to `master` yourself.

## Current State Summary
- Gatsby 2.x, MDX source in `content/blog/` and `content/page/`, custom SCSS in `src/styles/`, templates in `src/templates/` and `src/pages/`.
- Dark theme: background `#191A21`, body text `#ccc`, headings `#e4e4e4`, links `#59a4e4`.
- Fonts: IBM Plex Sans (400, 700), Fira Code.
- Syntax highlighting via `gatsby-remark-shiki` + custom `theme-dracula.json`.
- Math (KaTeX) rendered at build time by `remark-html-katex`.
- Analytics: GoatCounter script + legacy UA Google Analytics.
- Comments: Utterances (`github-dark` theme).
- RSS at `/rss.xml`.
- Home page: grid of date + post title.

## Proposed Approach

### 1. Branch & Tooling
- Create and work on branch `hugo-rewrite`.
- Use the latest Hugo **extended** release (downloads from GitHub releases; extended is required for SCSS/SASS). Pin to whatever the latest stable is at build time.

### 2. Site Structure
```
.
├── hugo.toml                 # site config, permalinks, outputs
├── assets/scss/              # ported SCSS
├── content/
│   ├── posts/                # migrated from content/blog/
│   └── page/                 # migrated from content/page/
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       # wrapper: <html>, head, header, footer
│   │   ├── list.html         # not used for home; keep for sections
│   │   ├── single.html       # posts + pages
│   │   └── 404.html
│   ├── index.html            # home post list
│   └── partials/
│       ├── head.html         # meta, fonts, analytics, katex
│       ├── header.html
│       ├── footer.html
│       ├── comments.html     # utterances
│       ├── analytics.html    # goatcounter
│       └── math.html         # katex auto-render (client-side)
├── static/                   # favicon, robots.txt
└── .github/workflows/        # optional: GitHub Pages deploy
```

### 3. Content Migration
- Rename all `.mdx` to `.md` and move:
  - `content/blog/<post>/index.mdx` → `content/posts/<post>/index.md`
  - `content/page/<page>/index.mdx` → `content/page/<page>/index.md`
- Frontmatter (`title`, `date`, `description`) stays unchanged.
- Configure permalinks so posts appear at root and pages keep their existing slugs:
  ```toml
  [permalinks]
    posts = '/:slug/'
  ```
- Math will be rendered client-side by KaTeX auto-render (closest practical equivalent to the old build-time `remark-html-katex`). Existing `$$...$$` and `$...$` expressions will continue to work.

### 4. Styling (As-Close-As-Possible)
- Port SCSS files from `src/styles/` to `assets/scss/`:
  - `_normalize.scss`, `_colors.scss`, `_comments.scss`, `_prism-theme.scss`, `_global.scss`
- Add `main.scss` that imports them.
- Use Hugo Pipes in `baseof.html` to compile SCSS and fingerprint it.
- Load IBM Plex Sans & Fira Code from Google Fonts with the same weights.
- Keep layout measurements: 800px max-width container, 32px/24px/48px paddings, same link hover underline behavior, same heading sizes and margins.

### 5. Syntax Highlighting
- Use Hugo's built-in Chroma with `style = "dracula"` in `hugo.toml`.
- Generate the Chroma stylesheet (`hugo gen chromastyles --style=dracula`) and include it, then adjust any minor color mismatches so it visually matches the existing Dracula theme.
- This avoids a custom Node/Shiki pipeline and keeps highlighting build-time, fast, and dependency-free.

### 6. Templates & Features
- **Base layout**: header link to home, footer with `© YEAR Husni Munaya. Subscribe (RSS).`, main content area.
- **Home page**: replicate the date + title grid; link each title to its post.
- **Single**: show title and date for posts; hide date for pages; render content; separator; utterances comments container.
- **404 page**: same minimal "Not Found" content.
- **SEO**: description meta, Open Graph, Twitter cards via Hugo internal templates or manual tags.
- **RSS**: configure output basename `rss` so feed is at `/rss.xml`.
- **Analytics**: carry over GoatCounter script; carry over the legacy UA GA snippet in a custom partial (no new tracker added).

### 7. Cleanup
- Remove Gatsby-specific files: `package*.json`, `gatsby-*.js`, `src/`, `theme-dracula.json`, `.eslintrc.js`, `.prettierrc*`, `content/blog/`, old `content/page/` after migration.
- Update `README.md` with Hugo quick-start and build/serve commands.
- Keep `.gitignore` updated for Hugo (`/public`, `/resources`, `.hugo_build.lock`).

### 8. Atomic Commit Plan (one commit per feature)
1. `chore: remove legacy Gatsby files`
2. `feat: initialize Hugo site configuration and static assets`
3. `feat: add base layout, header, and footer partials`
4. `feat: migrate content from Gatsby to Hugo`
5. `feat: implement home page post list`
6. `feat: implement single post and page templates`
7. `feat: port global styles and Dracula syntax highlighting`
8. `feat: add utterances comments partial`
9. `feat: add analytics, SEO meta, and RSS output`
10. `feat: add 404 page`
11. `docs: update README for Hugo build and deploy`

### 9. Verification
- Run `hugo server` locally and compare key pages to the current site.
- Confirm all posts/pages render, code blocks are highlighted, math renders, links work, RSS is at `/rss.xml`.
- Note any remaining visual deltas and how they will be addressed.

### 10. Out of Scope (unless you ask)
- GitHub Actions deployment workflow can be added but is not required for the rewrite.
- Image processing / responsive images (current site has no content images).
- PWA manifest.

## Decisions Made
- **Hugo extended** chosen for native SCSS support.
- **Chroma Dracula** chosen for built-in, build-time syntax highlighting that matches the existing Dracula palette.
- **Client-side KaTeX** chosen because Hugo's Goldmark does not render math to HTML at build time; it is the simplest way to keep the existing `$...$` / `$$...$$` math working without rewriting every post.
- **Custom theme in-repo** rather than a separate `themes/` directory for full control and minimal overhead.
