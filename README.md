# Rajni — A Designer's Private Journal

A luxury horizontal-scrolling portfolio. Plain HTML, CSS and JavaScript with GSAP, ScrollTrigger and Lenis (bundled locally in js/vendor). No build step.

## Folder structure

```
rajni-portfolio/
├── journal.html      # editable gratitude journal (edits save in the visitor's own browser; export to .txt)
├── index.html        # shell + the 12 static screens (cover, story, philosophy, process, playground, skills ×2, journal, testimonials, contact, closing)
├── css/styles.css    # tokens, grain, grid overlay, glass display, notes, project layouts, mobile
├── js/data.js        # ← EDIT: your 3 featured projects + the layout of each project's pages
├── js/main.js        # renderer, GSAP/ScrollTrigger horizontal engine, Lenis, snap, notes, cursor, mobile
├── js/vendor/        # GSAP, ScrollTrigger and Lenis, bundled locally (no CDN needed)
└── assets/           # screenshots + site films (accountax, precision, fa) and original SVG illustrations (art/)
```

**25 screens:** 12 story/skills screens + 3 projects × 4 pages (Home → Design System → Website Breakdown → Results & Reflection) + 1 “More on Behance” screen.

Featured projects: Accountax, Precision Chiropractic, Fast & Accurate (screenshots and films from your recordings). Behance: Lip Love Potion, Flower Expressions, Eshana.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Make it yours

1. **Text:** edit the copy in `index.html` (story, philosophy, journal entries, skills, contact links).
2. **Projects:** edit `js/data.js`. Each project's colours, fonts, stats, lessons and notes are there.
3. **Screenshots:** replace any file in `assets/<project>/` (home, about, services, portfolio, contact, mobile .jpg) with a better capture — same filename, no code change.
4. **Website film** in the floating glass display: replace `assets/<project>/site-film.mp4` (keep it small, muted, under ~2 MB). To add a project, copy a block in `js/data.js`.
5. **Testimonials:** the two on screen 23 are placeholders — replace with real quotes (with permission).
6. **Email / social links:** update the Contact screen in `index.html`.

## Tuning the feel (top of `js/main.js`)

```js
const CONFIG = { snapPause: 0.5, snapDuration: 1.0, lenisLerp: 0.085 };
```

- `snapPause` — the 0.5s stillness before the journal settles on a page.
- `lenisLerp` — smoothness; lower is silkier.

## Controls

Scroll, arrow keys / PageUp / PageDown / Space, or the chapter lines at the top. Press **G** for the architectural grid. Drag the pinned notes; click one to open it.

On phones and portrait screens the journey becomes a vertical story (same chapters, no horizontal pin).

## Deploy for free

**Netlify** — drag the `rajni-portfolio` folder onto app.netlify.com/drop.

**Vercel** — `npx vercel` inside the folder (framework: Other, no build command).

**Cloudflare Pages** — Create a project → upload assets → drag the folder.

**GitHub Pages** — push the folder to a repo → Settings → Pages → deploy from the `main` branch root.

## Notes

- Fonts: Playfair Display, Inter, Cormorant Garamond (Google Fonts).
- Respects `prefers-reduced-motion` (no page-turns, parallax or reveals).
- Changing the window across the mobile/desktop breakpoint reloads the page so the right engine starts.

## Live links & the journal

- **Live preview notes:** the pinned “Important notes” on the Accountax and Fast & Accurate home pages link to the Local live sites. Change the link, username or password in `js/data.js` (`live: {…}`). These Local Live Links are temporary — update or remove them when they expire. Anything in this file is public once the site is online.
- **Journal:** `journal.html` is an editable journal. Visitors’ edits stay in their own browser; to change the journal for everyone, edit the entries inside `journal.html` and re-upload.
- **Contact:** email is `rajni12499@gmail.com` (Contact screen in `index.html`).
