/* ==========================================================================
   PORTFOLIO DATA — edit this file to change your featured projects.
   Each project becomes FOUR screens: Home → Design System → Website Breakdown → Reflection.
   Images are real screenshots taken from your screen recordings (assets/…).
   Film = the compressed recording shown in the floating glass display.
   ========================================================================== */

window.PORTFOLIO = {

  projects: [

    /* ---------------------------------------------------------------- 01 */
    {
      id: "accountax",
      num: "01",
      name: "Accountax",
      titleHtml: "Account<em>ax</em>",
      kind: "Website · Tax & Bookkeeping",
      summary: "A warm, friendly website for a tax and bookkeeping office in Auburn, NSW — built so a visitor can understand the service and book a free consultation in seconds.",
      meta: [
        ["Role", "Design & WordPress build"],
        ["Client", "Accountax Services, Auburn"],
        ["Built", "Local WordPress · PHP"],
        ["Goal", "Free consultation bookings"]
      ],
      colors:  { bg: "#fdf9f0", fg: "#0a1c26", ac: "#f15e4e", c2: "#126757", c3: "#bbeee1" },
      alt:     { bg: "#0a1c26", fg: "#fdf9f0", ac: "#f15e4e" },
      palette: [
        { name: "Ink",     hex: "#0A1C26" },
        { name: "Forest",  hex: "#126757" },
        { name: "Mint",    hex: "#BBEEE1" },
        { name: "Cream",   hex: "#FDF9F0" },
        { name: "Coral",   hex: "#F15E4E" }
      ],
      fonts: { display: "Inter", body: "Inter" },
      systemIntro: "Friendly, not corporate: deep ink and forest green for trust, with a single coral call-to-action colour that always means ‘book’.",
      components: "Coral pill buttons, soft rounded service cards in four colourways, a four-step process rail and quick-answer FAQ rows.",
      gridNote: "12-column grid · generous cards · one coral CTA per screen",
      img: { home: "assets/accountax/home.jpg", about: "assets/accountax/about.jpg", services: "assets/accountax/services.jpg", portfolio: "assets/accountax/portfolio.jpg", contact: "assets/accountax/contact.jpg", mobile: "assets/accountax/mobile.jpg" },
      video: "assets/accountax/site-film.mp4", poster: "assets/accountax/poster.jpg",
      live: { url: "https://flawless-pocket.localsite.io", host: "flawless-pocket.localsite.io", user: "leather", pass: "versed" },
      breakdownNote: "Home sells the promise (‘Smart tax. Simple books. Real people.’), Services sorts the offer into four cards, and Contact finishes with a short enquiry form.",
      stats: [{ n: "48h", l: "return-lodged promise on the hero" }, { n: "4", l: "service cards: tax · business · books · loans" }, { n: "4", l: "steps: book · share · prepare · lodge" }],
      lessons: [
        "A colour that means one thing (coral = book) makes a page easy to scan.",
        "Four clear service cards beat one long list.",
        "Putting the phone number beside every CTA helps people who prefer to call."
      ],
      challenges: [
        "Making a tax site feel friendly without losing credibility.",
        "Keeping the hero animated yet quick to load.",
        "Fitting a lot of services into a small, calm page."
      ],
      note: "Tax is stressful — so the site speaks in plain words, and the one bright button is always the way out.",
      noteTitle: "Designer note —",
      noteMore: "The decision I'm proudest of: one coral button, used only for ‘book’. Everything else stays calm around it.",
    },

    /* ---------------------------------------------------------------- 02 */
    {
      id: "precision",
      num: "02",
      name: "Precision Chiropractic",
      titleHtml: "Precision <em>Chiropractic</em>",
      kind: "Website · Interactive 3D Spine",
      summary: "An editorial chiropractic website for a Blacktown clinic, built around an interactive 3D spine that lets visitors point to where their back feels different.",
      meta: [
        ["Role", "Concept, design & build"],
        ["Client", "Chiropractic clinic, Blacktown"],
        ["Feature", "Interactive 3D spine"],
        ["Status", "Awaiting clinic content"]
      ],
      colors:  { bg: "#f6f5f1", fg: "#1b3f35", ac: "#5f9e87", c2: "#becac2", c3: "#3b5a50" },
      alt:     { bg: "#1b3f35", fg: "#f6f5f1", ac: "#9fd0bb" },
      palette: [
        { name: "Pine",  hex: "#1B3F35" },
        { name: "Moss",  hex: "#3B5A50" },
        { name: "Sage",  hex: "#BECAC2" },
        { name: "Bone",  hex: "#F6F5F1" },
        { name: "Mint",  hex: "#7FC2A8" }
      ],
      fonts: { display: "Cormorant Garamond", body: "Inter" },
      systemIntro: "Clinical calm, editorial voice: bone paper, deep pine and a pale mint glow around the spine. Light italic serifs make it read like a health magazine.",
      components: "Numbered section labels, hairline form fields, a ‘select a region’ anatomy panel and four-step visit rail.",
      gridNote: "Numbered sections 01–08 · fixed vertical side labels · airy single-column reading",
      img: { home: "assets/precision/home.jpg", about: "assets/precision/about.jpg", services: "assets/precision/services.jpg", portfolio: "assets/precision/portfolio.jpg", contact: "assets/precision/contact.jpg", mobile: "assets/precision/mobile.jpg" },
      video: "assets/precision/site-film.mp4", poster: "assets/precision/poster.jpg",
      breakdownNote: "The spine runs the whole site: it explains anatomy on Understand, picks a region on Explore, and fades behind the first-visit steps and FAQ.",
      stats: [{ n: "24", l: "moving vertebrae explained" }, { n: "4", l: "clickable spine regions" }, { n: "4", l: "steps in ‘your first visit’" }],
      lessons: [
        "One strong interactive object can replace a lot of explanation.",
        "Placeholder text in [brackets] makes client content gaps obvious.",
        "Light serifs need big sizes to stay readable."
      ],
      challenges: [
        "Keeping a 3D model smooth on ordinary laptops.",
        "Educational tone without sounding like medical advice.",
        "Designing around content the clinic still has to supply."
      ],
      note: "The spine isn't decoration. It's the explanation — the page you read is the model you move.",
      noteTitle: "Designer note —",
      noteMore: "The clinic's details (address, phone, hours, practitioner bio) are still in [brackets] — they slot straight in when supplied.",
    },

    /* ---------------------------------------------------------------- 03 */
    {
      id: "fa",
      num: "03",
      name: "Fast & Accurate",
      titleHtml: "Fast &amp; <em>Accurate</em>",
      kind: "Website · Accounting & Taxation",
      summary: "A confident, corporate-calm website for a Blacktown accounting and taxation practice trading since 2006 — registered tax agents, CPA-qualified, built on clear numbers.",
      meta: [
        ["Role", "Design & WordPress build"],
        ["Client", "Accounting practice, Blacktown"],
        ["Built", "Local WordPress · PHP"],
        ["Since", "Practice established 2006"]
      ],
      colors:  { bg: "#f1f6fe", fg: "#0d2b5e", ac: "#2563eb", c2: "#163b77", c3: "#8ba0c4" },
      alt:     { bg: "#0d2b5e", fg: "#f1f6fe", ac: "#6ea0ff" },
      palette: [
        { name: "Midnight", hex: "#0D2B5E" },
        { name: "Navy",     hex: "#163B77" },
        { name: "Cobalt",   hex: "#2563EB" },
        { name: "Haze",     hex: "#8BA0C4" },
        { name: "Paper",    hex: "#F1F6FE" }
      ],
      fonts: { display: "Playfair Display", body: "Inter" },
      systemIntro: "A serif headline voice for authority, navy for steadiness and one electric cobalt for action — tuned to feel professional but never stuffy.",
      components: "Numbered service grids, cobalt call-out bands, line-chart motifs and clean enquiry forms.",
      gridNote: "12-column grid · numbered 01–09 service tiles · full-bleed cobalt call-out bands",
      img: { home: "assets/fa/home.jpg", about: "assets/fa/about.jpg", services: "assets/fa/services.jpg", portfolio: "assets/fa/portfolio.jpg", contact: "assets/fa/contact.jpg", mobile: "assets/fa/mobile.jpg" },
      video: "assets/fa/site-film.mp4", poster: "assets/fa/poster.jpg",
      live: { url: "https://pretty-ranch.localsite.io", host: "pretty-ranch.localsite.io", user: "volcano", pass: "momentous" },
      breakdownNote: "Taxation, Accounting and Bookkeeping & Payroll each get their own page with numbered tiles, so a visitor finds ‘their’ service within two clicks.",
      stats: [{ n: "20+", l: "years serving Sydney, on the hero" }, { n: "9", l: "taxation services in numbered tiles" }, { n: "4", l: "service areas, each with a page" }],
      lessons: [
        "Numbered tiles make a long service list feel organised.",
        "A repeated cobalt call-out band gives every page the same closing move.",
        "A serif headline lifts a plain topic into something trustworthy."
      ],
      challenges: [
        "Covering many services without a wall of text.",
        "Making charts and numbers feel clear, not cold.",
        "Keeping the navigation simple across four service pages."
      ],
      note: "Accounting is about confidence, so the design behaves the same way: steady grid, clear numbers, one obvious next step.",
      noteTitle: "Designer note —",
      noteMore: "Goal: make a long list of services feel short — numbered tiles, one page per area, one cobalt call-out to finish.",
    }
  ],

  /* ==========================================================================
     BEHANCE — extra work shown on its own screen (links only; no image files needed)
     ========================================================================== */
  behance: [
    { name: "Lip Love Potion", sub: "A Sweet Little Lip Care Campaign", url: "https://www.behance.net/gallery/258013379/Lip-Love-Potion-A-Sweet-Little-Lip-Care-Campaign", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/0d01b3258013379.Y3JvcCwxNDQwLDExMjYsMCwyMTI0.jpg", tag: "Visual concept · Social campaign" },
    { name: "Flower Expressions", sub: "Soft Floral Web Landing", url: "https://www.behance.net/gallery/248720237/Flower-Expressions-Soft-Floral-Web-Landing", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/a48db0248720237.Y3JvcCwxMTc2LDkyMCwxMzEsMA.png", tag: "Web design" },
    { name: "Eshana", sub: "Timeless Wedding & Event Experience Website", url: "https://www.behance.net/gallery/248219409/Eshana-Timeless-Wedding-Event-Experience-Website", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/ef6ae5248219409.Y3JvcCwxMTEzLDg3MSwzOTEsOTA.png", tag: "Web design" }
  ],

  /* ==========================================================================
     LAYOUTS — one variant per project, so every project chapter looks different.
     Values are percentages of the screen (x, y, w) and a rotation in degrees (r).
     ========================================================================== */
  layouts: [

    /* variant A — title left, collage right */
    {
      overview:   { big: {x: 52, y: 4,  w: 46},  title: {x: 6,  y: 14, w: 27},  glass: {x: 35, y: 17, w: 47, r: -1},
                    b: {x: 68, y: 56, w: 23, r: 1.5, k: "about"},  c: {x: 85, y: 14, w: 9, r: 2, k: "mobile"},
                    meta: {x: 6, y: 52, w: 26}, note: {x: 7, y: 68, r: -2} },
      design:     { title: {x: 6,  y: 10, w: 28},  colors: {x: 6,  y: 46, w: 40},  type: {x: 52, y: 12, w: 40},
                    comps: {x: 52, y: 50, w: 42},  grid:   {x: 52, y: 74, w: 42} },
      breakdown:  { title: {x: 6, y: 12, w: 25},  home: {x: 33, y: 13, w: 33, r: -1}, about: {x: 54, y: 27, w: 27, r: 1},
                    services: {x: 35, y: 45, w: 29, r: -.8}, portfolio: {x: 58, y: 50, w: 27, r: 1.2},
                    contact: {x: 41, y: 67, w: 22, r: -1}, mobile: {x: 86, y: 18, w: 9, r: 2} },
      reflection: { title: {x: 6,  y: 10, w: 30},  stats: {x: 6,  y: 44, w: 38},  lessons: {x: 50, y: 12, w: 20},
                    challenges: {x: 74, y: 12, w: 20}, dnote: {x: 52, y: 54, w: 26, r: -2}, shot: {x: 82, y: 52, w: 11, r: 3, k: "mobile"} }
    },

    /* variant B — mirrored: collage left, title right */
    {
      overview:   { big: {x: -2, y: 52, w: 46},  title: {x: 66, y: 14, w: 28},  glass: {x: 8, y: 17, w: 47, r: 1},
                    b: {x: 36, y: 56, w: 23, r: -1.5, k: "portfolio"}, c: {x: 4, y: 52, w: 9, r: -2, k: "mobile"},
                    meta: {x: 66, y: 52, w: 27}, note: {x: 74, y: 68, r: 2} },
      design:     { title: {x: 62, y: 10, w: 30},  type: {x: 6,  y: 12, w: 34},  colors: {x: 6, y: 52, w: 38},
                    comps: {x: 52, y: 50, w: 42},  grid: {x: 52, y: 74, w: 42} },
      breakdown:  { title: {x: 70, y: 12, w: 24},  mobile: {x: 5, y: 18, w: 9, r: -2}, home: {x: 17, y: 13, w: 33, r: 1},
                    about: {x: 35, y: 27, w: 27, r: -1}, services: {x: 16, y: 47, w: 29, r: .8},
                    portfolio: {x: 40, y: 52, w: 27, r: -1.2}, contact: {x: 70, y: 52, w: 22, r: 1} },
      reflection: { stats: {x: 6,  y: 12, w: 42}, title: {x: 54, y: 10, w: 38}, lessons: {x: 6, y: 50, w: 26},
                    challenges: {x: 36, y: 54, w: 24}, dnote: {x: 64, y: 48, w: 28, r: 2}, shot: {x: 49, y: 28, w: 16, r: -3, k: "home"} }
    }
  ]
};
