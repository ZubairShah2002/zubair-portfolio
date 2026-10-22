/* ==========================================================================
   PORTFOLIO RENDERER
   Loads content/data.json (written by the CMS at /admin) and builds the page.
   Vanilla JS, no deps. Falls back to window.CONTENT if the fetch fails
   (e.g. opened directly from disk without a server).
   ========================================================================== */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // Split a textarea string into clean lines / paragraphs.
  const lines = (s) => String(s == null ? "" : s).split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const paras = (s) => String(s == null ? "" : s).split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

  const PENDING = "To be provided";

  /* ---------- HERO ---------- */
  function renderHero(C) {
    $("[data-role='hero-title']").textContent = C.profile.title;

    const intro = $("[data-role='hero-intro']");
    intro.innerHTML = "";
    paras(C.profile.introduction).forEach((p) => intro.appendChild(el("p", null, esc(p))));

    $("[data-role='hero-email']").href = "mailto:" + C.contact.email;

    const resumeBtn = $("[data-role='hero-resume']");
    if (C.assets && C.assets.resume) {
      resumeBtn.href = C.assets.resume;
      resumeBtn.setAttribute("download", "");
      resumeBtn.hidden = false;
    } else {
      resumeBtn.hidden = true;
    }

    const frame = $("[data-role='portrait']");
    if (C.assets && C.assets.portrait) {
      frame.innerHTML = "";
      const img = el("img");
      img.src = C.assets.portrait;
      img.alt = "Portrait of " + C.profile.name + ", " + C.profile.title;
      img.loading = "eager";
      frame.appendChild(img);
    }

    const meta = $("[data-role='hero-meta']");
    meta.innerHTML = "";
    [
      { k: "Role", v: C.profile.title },
      { k: "Company", v: C.profile.currentCompany },
      { k: "Industry", v: C.profile.industry },
      { k: "Period", v: C.profile.currentPeriod }
    ].forEach((m) => {
      const mi = el("div", "mi");
      mi.appendChild(el("div", "mi__k", esc(m.k)));
      mi.appendChild(el("div", "mi__v", esc(m.v)));
      meta.appendChild(mi);
    });
  }

  /* ---------- ABOUT ---------- */
  function renderAbout(C) {
    const body = $("[data-role='about-body']");
    body.innerHTML = "";
    paras(C.about.paragraphs).forEach((p) => body.appendChild(el("p", null, esc(p))));

    const facts = $("[data-role='about-facts']");
    facts.innerHTML = "";
    (C.about.facts || []).forEach((f) => {
      const row = el("div", "f");
      row.appendChild(el("span", "f__k", esc(f.label)));
      row.appendChild(el("span", "f__v", esc(f.value)));
      facts.appendChild(row);
    });
  }

  /* ---------- CAREER ---------- */
  function renderCareer(C) {
    const list = $("[data-role='career']");
    list.innerHTML = "";
    (C.career || []).forEach((job) => {
      const li = el("li", "timeline__item reveal");

      const period = el("div", "timeline__period");
      period.appendChild(document.createTextNode(job.period || ""));
      if (job.current) period.appendChild(el("span", "now", "Current"));

      const bodyEl = el("div", "timeline__body");
      const role = el("div", "timeline__role");
      role.appendChild(el("span", "timeline__title", esc(job.title)));
      role.appendChild(el("span", "timeline__company", esc(job.company)));
      bodyEl.appendChild(role);
      if (job.context) bodyEl.appendChild(el("div", "timeline__context", esc(job.context)));

      const resp = el("ul", "timeline__resp");
      lines(job.responsibilities).forEach((r) => resp.appendChild(el("li", null, esc(r))));
      bodyEl.appendChild(resp);

      li.appendChild(period);
      li.appendChild(bodyEl);
      list.appendChild(li);
    });
  }

  /* ---------- CONTRIBUTIONS ---------- */
  function renderContributions(C) {
    const wrap = $("[data-role='contributions']");
    wrap.innerHTML = "";
    (C.contributions || []).forEach((c) => {
      const item = el("div", "contrib__item reveal");
      if (c.ref) item.appendChild(el("div", "contrib__ref", esc(c.ref)));
      item.appendChild(el("h3", "contrib__title", esc(c.title)));
      if (c.context) item.appendChild(el("p", "contrib__context", esc(c.context)));
      if (c.involvement) item.appendChild(el("p", "contrib__involve", esc(c.involvement)));
      if (c.objective) item.appendChild(el("p", "contrib__obj", "<b>Objective</b> &nbsp;" + esc(c.objective)));
      // Link the audit-participation card to the audits section.
      if (/audit/i.test(c.title)) {
        const a = el("a", "contrib__link", "View audit experience");
        a.href = "#audits";
        item.appendChild(a);
      }
      wrap.appendChild(item);
    });
  }

  /* ---------- AUDITS ---------- */
  function fillFrame(frame, imagePath, altText) {
    const ph = el("div", "audit-card__ph");
    ph.appendChild(el("span", null, "Image to be added"));
    frame.appendChild(ph);
    if (!imagePath) return;
    const probe = new Image();
    probe.onload = function () {
      const img = el("img");
      img.src = imagePath; img.alt = altText; img.loading = "lazy";
      ph.replaceWith(img);
    };
    probe.src = imagePath;
  }

  function auditField(label, value) {
    const row = el("div", "dialog__field");
    row.appendChild(el("span", "k", esc(label)));
    const v = el("span", "v", value ? esc(value) : PENDING);
    if (!value) v.classList.add("pending");
    row.appendChild(v);
    return row;
  }

  function renderAudits(C) {
    const grid = $("[data-role='audits-grid']");
    const list = $("[data-role='audits-list']");
    const count = $("[data-role='audits-count']");
    grid.innerHTML = ""; list.innerHTML = "";
    const audits = C.audits || [];
    count.textContent = audits.length + " suppliers · Quality Audit";

    audits.forEach((a, i) => {
      const no = String(i + 1).padStart(2, "0");

      const card = el("button", "audit-card");
      card.type = "button";
      card.setAttribute("aria-label", "View details for " + a.company);
      const frame = el("div", "audit-card__frame");
      frame.appendChild(el("span", "audit-card__no", no));
      fillFrame(frame, a.image, a.company + " — supplier image");
      card.appendChild(frame);
      card.appendChild(el("div", "audit-card__name", esc(a.company)));
      card.appendChild(el("div", "audit-card__purpose", esc(a.purpose || "Quality Audit")));
      card.addEventListener("click", () => openAudit(a, no));
      grid.appendChild(el("div", "reveal")).appendChild(card);

      const row = el("button", "audit-row");
      row.type = "button";
      row.setAttribute("aria-label", "View details for " + a.company);
      row.appendChild(el("span", "audit-row__no", no));
      row.appendChild(el("span", "audit-row__name", esc(a.company)));
      row.appendChild(el("span", "audit-row__meta", esc(a.purpose || "Quality Audit")));
      row.addEventListener("click", () => openAudit(a, no));
      list.appendChild(row);
    });

    $$(".viewbtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        $$(".viewbtn").forEach((b) => {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        grid.hidden = view !== "grid";
        list.hidden = view !== "list";
      });
    });
  }

  /* ---------- AUDIT DIALOG ---------- */
  const dialog = $("[data-role='audit-dialog']");
  const dialogBody = $("[data-role='dialog-body']");
  let lastFocus = null;

  function openAudit(a, no) {
    lastFocus = document.activeElement;
    dialogBody.innerHTML = "";

    const frame = el("div", "dialog__frame");
    fillFrame(frame, a.image, a.company + " — supplier image");
    dialogBody.appendChild(frame);

    dialogBody.appendChild(el("div", "dialog__no", "Audit Record " + no));
    const h = el("h3", "dialog__name", esc(a.company));
    h.id = "dialog-title";
    dialogBody.appendChild(h);

    const fields = el("div", "dialog__fields");
    fields.appendChild(auditField("Purpose", a.purpose));
    fields.appendChild(auditField("Location", a.location));
    fields.appendChild(auditField("Audit date", a.date));
    fields.appendChild(auditField("Scope", a.scope));
    fields.appendChild(auditField("Role", a.role));
    fields.appendChild(auditField("Status", a.status));
    dialogBody.appendChild(fields);

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    $("[data-role='dialog-close']").focus();
  }

  function closeAudit() {
    if (dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    if (lastFocus) lastFocus.focus();
  }

  $("[data-role='dialog-close']").addEventListener("click", closeAudit);
  dialog.addEventListener("click", (e) => {
    const inner = $(".dialog__inner", dialog);
    if (!inner.contains(e.target)) closeAudit();
  });
  dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeAudit(); });

  /* ---------- COMPETENCIES ---------- */
  function renderCompetencies(C) {
    const wrap = $("[data-role='competencies']");
    wrap.innerHTML = "";
    (C.competencies || []).forEach((g) => {
      const group = el("div", "comp__group reveal");
      group.appendChild(el("h3", "comp__title", esc(g.group)));
      const ul = el("ul", "comp__list");
      lines(g.skills).forEach((s) => ul.appendChild(el("li", null, esc(s))));
      group.appendChild(ul);
      wrap.appendChild(group);
    });
  }

  /* ---------- PROJECTS ---------- */
  function renderProjects(C) {
    const wrap = $("[data-role='projects']");
    wrap.innerHTML = "";
    wrap.appendChild(el("p", "projects__intro", esc(C.projects.intro)));

    const items = (C.projects.items || []);
    if (!items.length) {
      wrap.appendChild(el("div", "projects__status",
        "No work samples are published yet. Approved materials will appear here once cleared for sharing."));
      return;
    }
    const listWrap = el("div", "projects__list");
    items.forEach((p) => {
      const item = el("div", "project-item reveal");
      item.appendChild(el("h3", "project-item__title", esc(p.title)));
      [["Context", p.context], ["Contribution", p.contribution], ["Method", p.method], ["Outcome", p.outcome]]
        .forEach(([k, v]) => {
          if (!v) return;
          const r = el("div", "project-item__row");
          r.appendChild(el("span", "project-item__k", esc(k)));
          r.appendChild(el("span", null, esc(v)));
          item.appendChild(r);
        });
      if (p.image) {
        const img = el("img"); img.src = p.image; img.alt = p.title; img.loading = "lazy";
        item.appendChild(img);
      }
      listWrap.appendChild(item);
    });
    wrap.appendChild(listWrap);
  }

  /* ---------- EDUCATION ---------- */
  function renderEducation(C) {
    const wrap = $("[data-role='education']");
    wrap.innerHTML = "";
    const items = (C.education.items || []);
    if (!items.length) {
      wrap.appendChild(el("p", "education__note", esc(C.education.note)));
      wrap.appendChild(el("div", "education__status",
        "No education or certification records are listed yet. Records will be added here once confirmed."));
      return;
    }
    const listWrap = el("div", "education__list");
    items.forEach((e) => {
      const item = el("div", "edu-item reveal");
      item.appendChild(el("div", "edu-item__date", esc(e.date || "")));
      const mid = el("div");
      mid.appendChild(el("div", "edu-item__qual", esc(e.qualification || "")));
      mid.appendChild(el("div", "edu-item__inst", esc(e.institution || "")));
      item.appendChild(mid);
      item.appendChild(el("div", "edu-item__type", esc(e.type || "")));
      listWrap.appendChild(item);
    });
    wrap.appendChild(listWrap);
  }

  /* ---------- CONTACT ---------- */
  function renderContact(C) {
    const wrap = $("[data-role='contact']");
    wrap.innerHTML = "";
    const rows = [
      { k: "Email", v: C.contact.email, href: "mailto:" + C.contact.email },
      { k: "Phone", v: C.contact.phone, href: "tel:" + C.contact.phone }
    ];
    if (C.assets && C.assets.resume) {
      rows.push({ k: "Résumé", v: "Download PDF", href: C.assets.resume, download: true });
    }
    rows.forEach((r) => {
      const row = el("div", "contact__row");
      row.appendChild(el("span", "contact__k", esc(r.k)));
      const a = el("a", "contact__v", esc(r.v));
      a.href = r.href;
      if (r.download) a.setAttribute("download", "");
      row.appendChild(a);
      wrap.appendChild(row);
    });
  }

  /* ---------- NAV ---------- */
  function wireNav() {
    const nav = $("#site-nav");
    const toggle = $(".nav__toggle");
    const menu = $("#mobile-menu");

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.hidden = open;
    });
    $$("#mobile-menu a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        menu.hidden = true;
      })
    );

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const navLinks = $$(".nav__links a");
    const map = new Map();
    navLinks.forEach((l) => {
      const sec = document.getElementById(l.getAttribute("href").slice(1));
      if (sec) map.set(sec, l);
    });
    if ("IntersectionObserver" in window && map.size) {
      const spy = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            const active = map.get(en.target);
            if (active) active.classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
      map.forEach((_, sec) => spy.observe(sec));
    }
  }

  /* ---------- REVEAL ---------- */
  function wireReveal() {
    const items = $$(".reveal");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); o.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((i) => obs.observe(i));
  }

  /* ---------- BUILD ---------- */
  function build(C) {
    document.title = "Zubair Shah | Internal Quality Professional";
    renderHero(C);
    renderAbout(C);
    renderCareer(C);
    renderContributions(C);
    renderAudits(C);
    renderCompetencies(C);
    renderProjects(C);
    renderEducation(C);
    renderContact(C);
    const y = $("[data-role='year']");
    if (y) y.textContent = "© " + new Date().getFullYear();
    wireNav();
    wireReveal();
  }

  /* ---------- LOAD DATA ---------- */
  function start() {
    fetch("content/data.json", { cache: "no-store" })
      .then((r) => { if (!r.ok) throw new Error("fetch failed"); return r.json(); })
      .then((C) => build(C))
      .catch(() => {
        // Fallback for opening the file directly without a server.
        if (window.CONTENT) {
          console.warn("Using fallback CONTENT (content/data.json not reachable).");
          build(normalizeFallback(window.CONTENT));
        } else {
          console.error("Could not load content/data.json and no fallback present.");
          const b = document.querySelector("[data-role='hero-intro']");
          if (b) b.innerHTML = "<p>Content could not load. Please run this site through a web server.</p>";
        }
      });
  }

  // Adapt the old array-shaped fallback to the new string-shaped fields.
  function normalizeFallback(C) {
    const out = JSON.parse(JSON.stringify(C));
    if (Array.isArray(out.profile.introduction)) out.profile.introduction = out.profile.introduction.join("\n\n");
    if (Array.isArray(out.about && out.about.paragraphs)) out.about.paragraphs = out.about.paragraphs.join("\n\n");
    (out.career || []).forEach((j) => { if (Array.isArray(j.responsibilities)) j.responsibilities = j.responsibilities.join("\n"); });
    (out.competencies || []).forEach((g) => { if (Array.isArray(g.skills)) g.skills = g.skills.join("\n"); });
    if (out.assets) {
      out.assets.portrait = out.assets.portraitAvailable ? out.assets.portrait : "";
      out.assets.resume = out.assets.resumeAvailable ? out.assets.resume : "";
    }
    return out;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else { start(); }
})();
