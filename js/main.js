/* ==========================================================================
   RAJNI — A DESIGNER'S PRIVATE JOURNAL  ·  main.js
   1. Config & helpers      5. Page-turn transition
   2. Project renderer      6. Horizontal engine (GSAP + ScrollTrigger + Lenis)
   3. Notes / playground    7. Mobile vertical engine
   4. Cursor, nav, state    8. Boot
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- 1. Config & helpers ---------- */
  const CONFIG = {
    snapPause: 0.5,      // seconds of stillness before the journal settles on a page
    snapDuration: 1.0,   // seconds the settle takes
    lenisLerp: 0.085     // smoothness (lower = silkier)
  };

  const D = window.PORTFOLIO;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mq = window.matchMedia("(max-width: 1100px), (max-aspect-ratio: 1/1), (max-height: 540px)");
  const MOBILE = mq.matches;                       // mode is fixed per load; crossing the breakpoint reloads
  const pad2 = (n) => String(n).padStart(2, "0");

  function lum(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
    return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  }
  const textOn = (hex) => (lum(hex) > 0.58 ? "#0e0e0e" : "#f4efe6");
  const sv = (o, extra = "") =>
    `--x:${o.x};--y:${o.y}%;${o.w != null ? `--w:${o.w};` : ""}--r:${o.r || 0}deg;${extra}`;

  /* ---------- 2. Project renderer ---------- */
  function mock(p, kind) {
    if (p.img && p.img[kind]) return `<img class="${kind === "mobile" ? "phone-img" : "site-img"}" src="${p.img[kind]}" alt="${p.name} — ${kind}" loading="lazy">`;
    const c = p.colors, m = p.mk;
    const st = `--m-bg:${c.bg};--m-fg:${c.fg};--m-ac:${c.ac};--m-c2:${c.c2};--m-c3:${c.c3};--m-disp:'${p.fonts.display}',serif`;
    const nav = `<div class="mk-nav"><span class="mk-logo">${m.logo}</span><span class="mk-links">${m.nav.map((n) => `<span>${n}</span>`).join("")}</span></div>`;
    const cards = m.cards.map((k) => `<div class="mk-card"><i></i><b>${k[0]}</b><span>${k[1]}</span></div>`).join("");
    let body = "";
    switch (kind) {
      case "about":
        body = `<div class="mk-split"><div class="mk-img"></div><div><div class="mk-h" style="font-size:4.6em;max-width:100%">About</div><div class="mk-lines" style="margin-top:2em"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>`;
        break;
      case "services":
        body = `<div class="mk-hero"><div class="mk-h" style="font-size:4.8em;max-width:80%;margin-bottom:.6em">Services</div></div><div class="mk-cols">${cards}</div>`;
        break;
      case "portfolio":
        body = `<div class="mk-hero" style="padding-bottom:1.5em"><div class="mk-h" style="font-size:4.8em;max-width:80%">Portfolio</div></div><div class="mk-masonry"><div></div><div></div><div></div><div></div></div>`;
        break;
      case "contact":
        body = `<div class="mk-hero"><div class="mk-h" style="font-size:4.8em;max-width:80%">Contact</div></div><div class="mk-form"><div class="mk-field">Name</div><div class="mk-field">Email</div><span class="mk-btn">${m.btn}</span></div>`;
        break;
      case "mobile":
        body = `<div class="mk-hero"><div class="mk-h">${m.h}</div><p class="mk-p">${m.p}</p><span class="mk-btn">${m.btn}</span></div><div class="mk-img"></div>`;
        break;
      default: // home
        body = `<div class="mk-hero"><div class="mk-h">${m.h}</div><p class="mk-p">${m.p}</p><span class="mk-btn">${m.btn}</span><div class="mk-img"></div></div>`;
    }
    return `<div class="mock${kind === "mobile" ? " phone" : ""}" style="${st}"><div class="mk-in">${nav}${body}</div></div>`;
  }

  const pv = (p, alt) => {
    const t = alt ? p.alt : p.colors;
    return `--p-bg:${t.bg};--p-fg:${t.fg};--p-ac:${t.ac || p.colors.ac};--f-p-disp:'${p.fonts.display}',serif;background:${t.bg};color:${t.fg}`;
  };
  const open = (p, page, alt) =>
    `<section class="screen pj" data-theme="project" data-chapter="Featured Projects" data-pj="${p.id}" data-pjname="${p.num} · ${p.name}" data-title="${p.name} — ${page}" style="${pv(p, alt)}">`;
  const bd = (p, L, kind, depth, speed, label) =>
    `<div class="bd" data-depth="${depth}" data-speed="${speed}" style="${sv(L)}">${mock(p, kind)}${label ? `<div class="bd-label"><span>${label}</span><span>${p.name}</span></div>` : ""}</div>`;
  const note = (p, L) =>
    `<aside class="note" style="${sv(L)}" data-more="${p.noteMore}"><b>${p.noteTitle}</b>${p.note}</aside>`;

  const liveNote = (p, L) =>
    `<aside class="note note-live" style="${sv(L)}"><b>Important notes —</b>Live preview of the site, hosted on a temporary Local link.
      <a class="live-link" href="${p.live.url}" target="_blank" rel="noopener" data-cursor="Open">${p.live.host} ↗</a>
      <span class="cred-line"><i>Username</i> ${p.live.user}</span><span class="cred-line"><i>Password</i> ${p.live.pass}</span></aside>`;

  function pageOverview(p, L) {
    const g = L.glass;
    const inner = p.video
      ? `<video src="${p.video}" poster="${p.poster || ""}" autoplay muted loop playsinline preload="metadata"></video>`
      : `${mock(p, "home")}<span class="playbadge">Website</span>`;
    return open(p, "Home", false) + `
      <span class="pj-big abs" style="${sv(L.big)}" data-speed="-10">${p.num}</span>
      <div class="abs" style="${sv(L.title)}"><span class="pj-chip">${p.num} — ${p.kind} · 01 Home</span><h2 class="pj-title" style="margin-top:1rem">${p.titleHtml}</h2><p class="pj-sub">${p.summary}</p></div>
      <div class="orb" style="${sv({ x: g.x + 6, y: g.y - 8, w: g.w * 0.7 })}"></div>
      <div class="glass-wrap" data-depth="34" data-cursor="${p.video ? "Play" : "View"}" style="${sv(g)}">
        <div class="glass"><div class="glass-screen">${inner}</div><div class="glass-label"><span>${p.name}</span><span>Home</span></div></div>
      </div>
      ${bd(p, L.b, L.b.k, 62, 8, "")}
      ${bd(p, L.c, L.c.k, 90, -6, "")}
      <dl class="meta abs" style="${sv(L.meta)}">${p.meta.map((m) => `<div><dt>${m[0]}</dt><dd>${m[1]}</dd></div>`).join("")}</dl>
      ${p.live ? liveNote(p, L.note) : note(p, L.note)}
    </section>`;
  }

  function pageDesign(p, L) {
    const sw = p.palette.map((c) => `<div class="swatch" style="background:${c.hex};color:${textOn(c.hex)}"><b>${c.name}</b>${c.hex}</div>`).join("");
    return open(p, "Design System", true) + `
      <div class="abs" style="${sv(L.title)}"><span class="pj-chip">${p.num} — 02 Design System</span><h2 class="pj-title" style="margin-top:1rem">Design <em>system</em></h2><p class="pj-sub">${p.systemIntro}</p></div>
      <div class="abs" style="${sv(L.colors)}" data-depth="14"><span class="slot-label">Colour</span><div class="swatches">${sw}</div></div>
      <div class="abs type-spec" style="${sv(L.type)}" data-depth="22"><span class="slot-label">Typography</span><div class="aa">Aa</div><p>${p.fonts.display} · ${p.fonts.body}</p><div class="alpha">ABCDEFGHIJKLM<br>abcdefghijklm 0123456789</div></div>
      <div class="abs" style="${sv(L.comps)}"><span class="slot-label">Components</span>
        <div class="comps"><span class="c-btn">Primary</span><span class="c-btn ghost">Secondary</span><span class="c-tag">Tag</span><span class="c-input">Your email</span>
        <div class="c-card"><b>Card title</b>${p.components}</div></div></div>
      <div class="abs" style="${sv(L.grid)}"><span class="slot-label">Grid</span><div class="grid-mini">${"<i></i>".repeat(12)}</div><p class="mini-cap">${p.gridNote}</p></div>
    </section>`;
  }

  function pageBreakdown(p, L) {
    return open(p, "Website Breakdown", false) + `
      <div class="abs" style="${sv(L.title)}"><span class="pj-chip">${p.num} — 03 Website Breakdown</span><h2 class="pj-title" style="margin-top:1rem">Website <em>breakdown</em></h2><p class="pj-sub">${p.breakdownNote}</p><p class="legend">Home · About · Services · Portfolio · Contact · Mobile</p></div>
      ${bd(p, L.home, "home", 26, 6, "")}
      ${bd(p, L.about, "about", 40, -6, "")}
      ${bd(p, L.services, "services", 30, 8, "")}
      ${bd(p, L.portfolio, "portfolio", 52, -8, "")}
      ${bd(p, L.contact, "contact", 36, 6, "")}
      ${bd(p, L.mobile, "mobile", 74, -10, "")}
    </section>`;
  }

  function pageReflection(p, L) {
    const list = (arr) => arr.map((t) => `<li>${t}</li>`).join("");
    return open(p, "Results & Reflection", true) + `
      <div class="abs" style="${sv(L.title)}"><span class="pj-chip">${p.num} — 04 Results &amp; Reflection</span><h2 class="pj-title" style="margin-top:1rem">Results &amp; <em>reflection</em></h2></div>
      <div class="stats abs" style="${sv(L.stats)}">${p.stats.map((s) => `<div class="stat"><b>${s.n}</b><span>${s.l}</span></div>`).join("")}</div>
      <div class="refl abs" style="${sv(L.lessons)}"><h4>Lessons</h4><ul>${list(p.lessons)}</ul></div>
      <div class="refl abs" style="${sv(L.challenges)}"><h4>Challenges</h4><ul>${list(p.challenges)}</ul></div>
      <div class="designer-note abs" style="${sv(L.dnote)}" data-depth="18"><small>Designer notes</small>${p.note}</div>
      ${bd(p, L.shot, L.shot.k, 70, 8, "")}
    </section>`;
  }

  function pageBehance() {
    const items = (D.behance || []).map((b, i) => `
      <a class="bh-card" href="${b.url}" target="_blank" rel="noopener" data-cursor="Open" data-depth="${18 + i * 8}" style="--bh-r:${[-2, 1.5, -1][i % 3]}deg">
        <div class="bh-img"><img src="${b.cover}" alt="${b.name}" loading="lazy" onerror="this.remove()"><span class="bh-fallback">${b.name}</span></div>
        <small>${b.tag}</small><h4>${b.name}</h4><p>${b.sub}</p><i>Open on Behance ↗</i>
      </a>`).join("");
    return `<section class="screen" data-theme="light" data-chapter="Featured Projects" data-title="More on Behance">
      <div class="paper-lines"></div>
      <div class="text-block abs" style="--x:6;--y:13%;--w:30">
        <small class="eyebrow">Chapter IV — More work</small>
        <h2 class="h1">Also on <em>Behance.</em></h2>
        <p>Brand and web design studies — the Lip Love visual concept and two web landing pages.</p>
        <a class="back" href="https://www.behance.net/rajni2" target="_blank" rel="noopener" data-cursor="Open" style="display:inline-block;margin-top:2rem">behance.net/rajni2 ↗</a>
      </div>
      <div class="bh-row abs" style="--x:38;--y:14%;--w:58">${items}</div>
    </section>`;
  }

  function renderProjects() {
    const anchor = $('[data-anchor="after-projects"]');
    D.projects.forEach((p, i) => {
      const L = D.layouts[i % 2];
      anchor.insertAdjacentHTML("beforebegin",
        pageOverview(p, L.overview) + pageDesign(p, L.design) + pageBreakdown(p, L.breakdown) + pageReflection(p, L.reflection));
    });
    anchor.insertAdjacentHTML("beforebegin", pageBehance());
    $("#projectIndex").innerHTML = D.projects.map((p) =>
      `<li><button type="button" data-goto-pj="${p.id}" data-cursor="Open"><span class="pi-num">${p.num}</span><span class="pi-name">${p.name}</span><span class="pi-kind">${p.kind}</span>${p.img && p.img.home ? `<img class="pi-prev" src="${p.img.home}" alt="" loading="lazy">` : ""}</button></li>`).join("");
  }

  /* ---------- 3. Notes (drag + open) & playground ---------- */
  function initNotes() {
    $$(".note").forEach((n) => {
      if (n.dataset.more) {
        const m = document.createElement("div");
        m.className = "note-more";
        m.textContent = n.dataset.more;
        n.appendChild(m);
      }
      let sx = 0, sy = 0, ox = 0, oy = 0, moved = false, down = false;
      n.addEventListener("pointerdown", (e) => {
        if (MOBILE || e.target.closest("a")) return;
        down = true; moved = false;
        sx = e.clientX; sy = e.clientY;
        ox = gsap.getProperty(n, "x"); oy = gsap.getProperty(n, "y");
        n.setPointerCapture(e.pointerId);
        n.classList.add("dragging");
      });
      n.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
        gsap.set(n, { x: ox + dx, y: oy + dy });
      });
      const end = () => { down = false; n.classList.remove("dragging"); };
      n.addEventListener("pointerup", (e) => { const was = moved; end(); if (!was && !e.target.closest("a") && !n.classList.contains("note-live")) n.classList.toggle("open"); });
      n.addEventListener("pointercancel", end);
      if (MOBILE) n.addEventListener("click", (e) => { if (!e.target.closest("a") && !n.classList.contains("note-live")) n.classList.toggle("open"); });
    });
  }

  function initPlayground() {
    const card = $("#pgCard"), txt = $("#pgText");
    if (!card) return;
    $("#pgWeight").addEventListener("input", (e) => (txt.style.fontWeight = e.target.value));
    $("#pgTrack").addEventListener("input", (e) => (txt.style.letterSpacing = e.target.value / 100 + "em"));
    $("#pgSize").addEventListener("input", (e) => { txt.style.fontSize = e.target.value + "px"; txt.style.setProperty("--pg-size", e.target.value + "px"); });
    $$("#pgSwatches button").forEach((b) =>
      b.addEventListener("click", () => { card.style.background = b.dataset.bg; card.style.color = b.dataset.fg; }));
  }

  /* ---------- 4. Cursor, nav, state ---------- */
  function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const c = $(".cursor"), label = $(".cursor-label");
    const qx = gsap.quickTo(c, "x", { duration: 0.35, ease: "power3" });
    const qy = gsap.quickTo(c, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", (e) => {
      qx(e.clientX); qy(e.clientY);
      c.classList.add("on");
      const t = e.target.closest && e.target.closest("[data-cursor]");
      if (t) { label.textContent = t.dataset.cursor; c.classList.add("big"); } else c.classList.remove("big");
    });
    document.addEventListener("mouseleave", () => c.classList.remove("on"));
  }

  function initMouseDepth() {
    if (MOBILE || reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const els = $$("[data-depth]");
    const set = els.map((el) => ({
      d: parseFloat(el.dataset.depth),
      x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" })
    }));
    window.addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      set.forEach((s) => { s.x(-nx * s.d); s.y(-ny * s.d); });
    });
  }

  let screens = [], cur = -1, lastKey = null;
  const keyOf = (s) => (s.dataset.pj ? "pj:" + s.dataset.pj : s.dataset.chapter);

  function buildNav() {
    const nav = $(".chapters");
    const seen = new Map();
    screens.forEach((s, i) => { const k = s.dataset.chapter; if (!seen.has(k)) seen.set(k, i); });
    seen.forEach((i, name) => {
      const b = document.createElement("button");
      b.type = "button"; b.dataset.goto = i; b.dataset.chapter = name; b.setAttribute("aria-label", name);
      b.innerHTML = `<span>${name}</span>`;
      nav.appendChild(b);
    });
    $(".count-total").textContent = pad2(screens.length);
  }

  function setCurrent(i) {
    if (i === cur) return;
    cur = i;
    const s = screens[i];
    $(".count-now").textContent = pad2(i + 1);
    $(".chapter-name").textContent = s.dataset.title;
    $$(".chapters button").forEach((b) => b.classList.toggle("active", b.dataset.chapter === s.dataset.chapter));
    const key = keyOf(s);
    if (lastKey !== null && key !== lastKey && !reduce)
      pageTurn(s.dataset.pj ? s.dataset.pjname : s.dataset.chapter, s.dataset.pj ? "Featured project" : "Chapter");
    lastKey = key;
  }
  const setProgress = (p) => { $(".progress i").style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`; };

  /* ---------- 5. Notebook page-turn ---------- */
  let turnTl;
  function pageTurn(title, kicker) {
    const a = $(".pt-a"), copy = $(".pt-copy");
    $(".pt-title").textContent = title;
    $(".pt-kicker").textContent = kicker;
    if (turnTl) turnTl.kill();
    gsap.set(a, { clipPath: "inset(0% 0% 0% 100%)" });
    gsap.set(copy, { opacity: 0, y: 20 });
    turnTl = gsap.timeline()
      .to(a, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power3.inOut" })
      .to(copy, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "-=0.25")
      .to(a, { clipPath: "inset(0% 100% 0% 0%)", duration: 0.55, ease: "power3.inOut" }, "+=0.18")
      .to(copy, { opacity: 0, duration: 0.2 }, "<");
  }

  /* ---------- shared: reveals ---------- */
  const REVEAL = ".cover-type > *, .text-block > *, .pj-chip, .pj-title, .pj-sub, .meta > div, .quote, .three article, .timeline li, .process li, .skills li, .entry, .testi, .stat, .refl li, .refl h4, .swatch, .comps > *, .closing > *, .contact > *, .project-index li, .designer-note, .slot-label, .mini-cap, .type-spec .aa";

  /* ---------- 6. Horizontal engine ---------- */
  let lenis, hST;

  function goTo(i) {
    i = Math.max(0, Math.min(screens.length - 1, i));
    if (MOBILE) lenis.scrollTo(screens[i], { duration: 1.4, offset: 0 });
    else lenis.scrollTo(hST.start + i * innerWidth, { duration: 1.4 });
  }

  function setupHorizontal() {
    const stage = $(".stage"), track = $(".track");
    const dist = () => track.scrollWidth - innerWidth;

    const hTween = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: stage, start: "top top", end: () => "+=" + dist(),
        pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => { setProgress(self.progress); setCurrent(Math.round(self.progress * (screens.length - 1))); }
      }
    });
    hST = hTween.scrollTrigger;
    setCurrent(0);

    if (!reduce) {
      // parallax
      $$("[data-speed]").forEach((el) => {
        const sp = parseFloat(el.dataset.speed);
        gsap.fromTo(el, { xPercent: -sp }, { xPercent: sp, ease: "none", scrollTrigger: { trigger: el.closest(".screen"), containerAnimation: hTween, start: "left right", end: "right left", scrub: true } });
      });
      // reveals
      screens.forEach((s) => {
        const t = $$(REVEAL, s);
        if (!t.length) return;
        gsap.from(t, { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.07,
          scrollTrigger: { trigger: s, containerAnimation: hTween, start: "left 78%", end: "right left", toggleActions: "play none none reverse" } });
      });
      $$(".process-line i").forEach((i) =>
        gsap.to(i, { scaleX: 1, duration: 1.6, ease: "power3.inOut", scrollTrigger: { trigger: i.closest(".screen"), containerAnimation: hTween, start: "left 60%", end: "right left", toggleActions: "play none none reverse" } }));
    } else {
      gsap.set(".process-line i", { scaleX: 1 });
    }

    // 0.5s snap pause — after the reader stops, the journal settles on the nearest page
    let timer, snapping = false;
    const settle = () => {
      const target = hST.start + Math.round((lenis.scroll - hST.start) / innerWidth) * innerWidth;
      if (Math.abs(target - lenis.scroll) < 2) return;
      snapping = true;
      lenis.scrollTo(target, {
        duration: CONFIG.snapDuration, easing: (t) => 1 - Math.pow(1 - t, 4), lock: false,
        onComplete: () => { snapping = false; }
      });
      setTimeout(() => { snapping = false; }, CONFIG.snapDuration * 1000 + 300);
    };
    lenis.on("scroll", () => {
      if (snapping) return;
      clearTimeout(timer);
      timer = setTimeout(settle, CONFIG.snapPause * 1000);
    });

    // keyboard
    window.addEventListener("keydown", (e) => {
      if (e.target.isContentEditable || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      const next = ["ArrowRight", "ArrowDown", "PageDown", " "], prev = ["ArrowLeft", "ArrowUp", "PageUp"];
      if (next.includes(e.key)) { e.preventDefault(); goTo(cur + 1); }
      else if (prev.includes(e.key)) { e.preventDefault(); goTo(cur - 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(screens.length - 1); }
    });
  }

  /* ---------- 7. Mobile vertical engine ---------- */
  function setupVertical() {
    screens.forEach((s, i) => {
      ScrollTrigger.create({ trigger: s, start: "top 55%", end: "bottom 55%", onToggle: (self) => { if (self.isActive) setCurrent(i); } });
      if (reduce) return;
      const t = $$(REVEAL, s);
      if (t.length) gsap.from(t, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.06,
        scrollTrigger: { trigger: s, start: "top 80%", toggleActions: "play none none none" } });
    });
    if (!reduce) {
      $$("[data-speed]").forEach((el) => {
        const sp = parseFloat(el.dataset.speed);
        gsap.fromTo(el, { yPercent: -sp }, { yPercent: sp, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      $$(".process-line i").forEach((i) => gsap.to(i, { scaleX: 1, duration: 1.4, scrollTrigger: { trigger: i, start: "top 85%" } }));
    } else gsap.set(".process-line i", { scaleX: 1 });
    lenis.on("scroll", ({ scroll, limit }) => setProgress(limit ? scroll / limit : 0));
    setCurrent(0);
  }

  /* ---------- 8. Boot ---------- */
  function startEngine() {
    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ lerp: CONFIG.lenisLerp, smoothWheel: !reduce, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    if (MOBILE) setupVertical(); else setupHorizontal();

    document.addEventListener("click", (e) => {
      const g = e.target.closest("[data-goto]");
      if (g) { e.preventDefault(); goTo(parseInt(g.dataset.goto, 10)); return; }
      const pj = e.target.closest("[data-goto-pj]");
      if (pj) goTo(screens.findIndex((s) => s.dataset.pj === pj.dataset.gotoPj));
    });

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  function boot() {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    renderProjects();
    screens = $$(".screen");
    buildNav();
    initNotes();
    initPlayground();
    initCursor();

    $(".grid-toggle").addEventListener("click", (e) => {
      const on = document.body.classList.toggle("show-grid");
      e.currentTarget.setAttribute("aria-pressed", on);
    });
    window.addEventListener("keydown", (e) => {
      if ((e.key === "g" || e.key === "G") && !e.target.isContentEditable && !/INPUT|TEXTAREA/.test(e.target.tagName))
        $(".grid-toggle").click();
    });

    // reload when the layout mode (desktop ↔ mobile) changes
    let rt;
    mq.addEventListener("change", () => { clearTimeout(rt); rt = setTimeout(() => location.reload(), 250); });

    const quick = reduce ? 0.01 : 1;
    gsap.timeline()
      .to(".loader-bar i", { scaleX: 1, duration: 1.1 * quick, ease: "power2.inOut" })
      .add(() => { startEngine(); document.body.classList.remove("is-loading"); initMouseDepth(); }, "+=0.05")
      .to(".loader", { yPercent: -100, duration: 0.9 * quick, ease: "power4.inOut" }, "<0.1")
      .set(".loader", { display: "none" });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
