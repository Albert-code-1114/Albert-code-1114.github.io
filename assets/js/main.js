/* ==========================================================================
   main.js —— 页面渲染引擎
   作用：读取 profile.js 里的 PROFILE，把整张页面画出来 + 处理中英文切换。
   正常情况下你不需要改这个文件。想加版块或图标时再回来改。
   ========================================================================== */
(() => {
  "use strict";

  /* ---------------------------------------------------------------
     0 · 图标库（想加图标就在这里加一条，然后在 profile.js 里用 icon: "名字"）
     --------------------------------------------------------------- */
  const ICONS = {
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    link: '<path d="M10.5 13.5a4.5 4.5 0 0 0 6.4 0l2.1-2.1a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M13.5 10.5a4.5 4.5 0 0 0-6.4 0l-2.1 2.1a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    download: '<path d="M12 4v11"/><path d="m7.5 11 4.5 4.5L16.5 11"/><path d="M4 20h16"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18z"/>',
    phone: '<path d="M6.2 3.5h3l1.6 4-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2z"/>',
    github: '<circle cx="6.5" cy="6" r="2.5"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M6.5 8.5v7"/><path d="M17.5 11.5c0 3.2-2.6 4.5-6 4.5H8.5"/>',
    location: '<path d="M12 21.5s6.5-5.8 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.7 12 21.5 12 21.5z"/><circle cx="12" cy="11" r="2.4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    award: '<circle cx="12" cy="9" r="5.2"/><path d="m8.4 13.4-1.2 7.1 4.8-2.7 4.8 2.7-1.2-7.1"/>',
    star: '<path d="m12 3.5 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9z"/>',
    code: '<path d="m9 18-5.5-6L9 6"/><path d="m15 6 5.5 6L15 18"/>',
    book: '<path d="M4.5 5.5A2 2 0 0 1 6.5 3.5H19v17H6.5a2 2 0 0 0-2 2z"/><path d="M4.5 18.5h14.5"/>',
    cap: '<path d="M2.5 9 12 4.8 21.5 9 12 13.2z"/><path d="M6.5 11.2v4.4c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.4"/>',
    briefcase: '<rect x="3" y="7.5" width="18" height="12.5" rx="2.5"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16.2 5.2a3.4 3.4 0 0 1 0 6.6M18 20a6 6 0 0 0-1.8-4.3"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 6.5v-1a2 2 0 0 0-2-2H5.5a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2h1"/>',
    check: '<path d="m5 13 4.5 4.5L19 8"/>'
  };
  const icon = (name) =>
    `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.link}</svg>`;

  /* ---------------------------------------------------------------
     1 · 基础工具
     --------------------------------------------------------------- */
  const P = (typeof PROFILE !== "undefined" && PROFILE) ? PROFILE : null;
  const mainEl = document.getElementById("main");
  const navEl = document.getElementById("nav");
  const footEl = document.getElementById("footer");

  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

  /* 只允许 http/https/mailto/tel 和站内相对路径，挡掉 javascript: 之类的危险链接 */
  function safeUrl(u) {
    const s = String(u ?? "").trim();
    if (!s) return "";
    if (/^(https?:|mailto:|tel:)/i.test(s)) return s;
    if (/^[./#]/.test(s)) return s;
    return "";
  }

  /* 邮箱防爬：profile.js 里邮箱被拆成 user + domain 两段，
     拼装只发生在浏览器里，静态源码中不会出现完整的 xxx@yyy 字符串 */
  function emailAddress() {
    const e = P && P.settings && P.settings.email;
    if (!e) return "";
    const user = String(e.user ?? "").trim();
    const domain = String(e.domain ?? "").trim().replace(/^@/, "");
    if (!user || !domain) return "";
    return user + "@" + domain;
  }

  /* 统一解析一条联系方式：把 "#email" 占位符换成真实邮箱，并校验链接协议 */
  function contactEntry(it) {
    const email = emailAddress();
    let url = String((it && it.url) ?? "").trim();
    let val = String((it && it.value) ?? "").trim();
    if (url === "#email" || url === "mailto:#email") url = email ? "mailto:" + email : "";
    if (val === "#email") val = email;
    return { url: safeUrl(url), val };
  }

  let LANG = "zh";
  const dict = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : null);

  /* 取文案：优先当前语言，空了自动回退到另一种语言 */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (Array.isArray(v)) return v.map(t).filter(Boolean).join(" ");
    const d = dict(v);
    if (!d) return "";
    const other = LANG === "zh" ? "en" : "zh";
    if (String(d[LANG] ?? "").trim()) return String(d[LANG]).trim();
    if (String(d[other] ?? "").trim()) return String(d[other]).trim();
    for (const k in d) if (String(d[k] ?? "").trim()) return String(d[k]).trim();
    return "";
  }
  const has = (v) => t(v) !== "";

  /* ---------------------------------------------------------------
     2 · 版块清单（顺序就是页面上的顺序）
     --------------------------------------------------------------- */
  const SECTIONS = [
    { key: "about",      zh: "关于我",   en: "About" },
    { key: "education",  zh: "教育经历", en: "Education" },
    { key: "skills",     zh: "专业技能", en: "Skills" },
    { key: "projects",   zh: "项目经历", en: "Projects" },
    { key: "experience", zh: "校园经历", en: "Experience" },
    { key: "awards",     zh: "荣誉奖项", en: "Awards" },
    { key: "contact",    zh: "联系方式", en: "Contact" }
  ];

  /* ---------------------------------------------------------------
     3 · 各版块的数据整理（顺便过滤掉空条目，半填状态也不会出现空壳）
     --------------------------------------------------------------- */
  const on = (key) => !!(P[key] && P[key].enabled !== false);
  const arr = (a) => (Array.isArray(a) ? a : []);

  function data() {
    const d = {};

    d.about = arr(P.about && P.about.facts)
      .filter((f) => f && (has(f.label) || has(f.value)));

    d.education = arr(P.education && P.education.items).filter((it) => it && has(it.school));

    d.skills = arr(P.skills && P.skills.groups)
      .map((g) => ({ g, items: arr(g && g.items).filter((i) => has(i)) }))
      .filter((x) => x.g && has(x.g.name) && x.items.length);

    d.projects = arr(P.projects && P.projects.items).filter((it) => it && has(it.name));

    d.experience = arr(P.experience && P.experience.items)
      .filter((it) => it && (has(it.org) || has(it.title)));

    d.awards = arr(P.awards && P.awards.items).filter((it) => it && has(it.title));

    d.contact = arr(P.contact && P.contact.items).filter((it) => {
      if (!it) return false;
      const { url, val } = contactEntry(it);
      return !!(val || url);
    });

    return d;
  }

  /** 某个版块实际有没有内容可以展示 */
  function sectionHasContent(key, d) {
    if (!on(key)) return false;
    switch (key) {
      case "about":      return has(P.about && P.about.bio) || d.about.length > 0;
      case "education":  return d.education.length > 0;
      case "skills":     return d.skills.length > 0;
      case "projects":   return d.projects.length > 0;
      case "experience": return d.experience.length > 0;
      case "awards":     return d.awards.length > 0;
      case "contact":    return d.contact.length > 0 || has(P.contact && P.contact.intro);
      default:           return false;
    }
  }

  /* ---------------------------------------------------------------
     4 · 各版块 HTML
     --------------------------------------------------------------- */
  function secHead(num, title) {
    return `<div class="sec-head"><span class="sec-num">${num}</span><h2 class="sec-title">${esc(title)}</h2></div>`;
  }

  function initialOf(name) {
    const n = String(name || "").trim();
    if (!n) return "·";
    if (/[\u4e00-\u9fa5]/.test(n)) return n.slice(0, 1);
    const parts = n.split(/\s+/).filter(Boolean);
    return (parts.length > 1 ? parts[0][0] + parts[1][0] : n.slice(0, 2)).toUpperCase();
  }

  function renderHero() {
    const h = P.hero || {};
    const name = t(h.name) || "你的名字";
    const av = String((P.settings && P.settings.avatar) || "").trim();

    const avatar = av
      ? `<img src="${esc(safeUrl(av))}" alt="${esc(name)}" width="104" height="104"
             onerror="this.outerHTML='&lt;div class=\\'avatar-fallback\\'&gt;${esc(initialOf(name))}&lt;/div&gt;'">`
      : `<div class="avatar-fallback" aria-hidden="true">${esc(initialOf(name))}</div>`;

    const meta = [];
    if (has(h.location)) meta.push(`<span class="meta-item">${icon("location")}${esc(t(h.location))}</span>`);
    if (has(h.status)) meta.push(`<span class="badge">${esc(t(h.status))}</span>`);

    const links = arr(h.links)
      .map((l) => {
        if (!l || !has(l.label)) return "";
        let url = String(l.url ?? "").trim();
        if (url === "#email") url = emailAddress() ? "mailto:" + emailAddress() : "";
        url = safeUrl(url);
        if (!url) return "";
        return `<a class="btn" href="${esc(url)}"${/^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ""}>${icon(l.icon)}${esc(t(l.label))}</a>`;
      })
      .join("");

    return `
      <div class="container hero">
        <div class="hero-avatar">${avatar}</div>
        <div class="hero-body">
          <h1 class="hero-name">${esc(name)}</h1>
          ${has(h.role) ? `<p class="hero-role">${esc(t(h.role))}</p>` : ""}
          ${has(h.tagline) ? `<p class="hero-tagline">${esc(t(h.tagline))}</p>` : ""}
          ${meta.length ? `<div class="hero-meta">${meta.join("")}</div>` : ""}
          ${links ? `<div class="hero-links">${links}</div>` : ""}
        </div>
      </div>`;
  }

  function renderAbout(num) {
    const a = P.about || {};
    const facts = arr(a.facts).filter((f) => f && (has(f.label) || has(f.value)));
    return `
      <section class="sec" id="about">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "关于我" : "About")}
          ${has(a.bio) ? `<p class="about-text">${esc(t(a.bio))}</p>` : ""}
          ${facts.length ? `<div class="facts">${facts.map((f) => `
            <div class="fact">
              <div class="fact-k">${esc(t(f.label))}</div>
              <div class="fact-v">${esc(t(f.value))}</div>
            </div>`).join("")}</div>` : ""}
        </div>
      </section>`;
  }

  function renderEducation(num) {
    const items = arr(P.education && P.education.items).filter((it) => it && has(it.school));
    return `
      <section class="sec" id="education">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "教育经历" : "Education")}
          <ol class="timeline">${items.map((it) => {
            const sub = [t(it.major), t(it.degree)].filter(Boolean).join(" · ");
            const details = arr(it.details).filter(has);
            return `
              <li class="tl-item">
                <div class="tl-head">
                  <h3 class="tl-title">${esc(t(it.school))}</h3>
                  ${has(it.period) ? `<span class="tl-period">${esc(t(it.period))}</span>` : ""}
                </div>
                ${sub ? `<div class="tl-sub">${esc(sub)}</div>` : ""}
                ${has(it.score) ? `<div class="tl-score">${esc(t(it.score))}</div>` : ""}
                ${details.length ? `<ul class="tl-list">${details.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
              </li>`;
          }).join("")}</ol>
        </div>
      </section>`;
  }

  function renderSkills(num) {
    const groups = arr(P.skills && P.skills.groups)
      .map((g) => ({ g, items: arr(g && g.items).filter(has) }))
      .filter((x) => x.g && has(x.g.name) && x.items.length);
    return `
      <section class="sec" id="skills">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "专业技能" : "Skills")}
          <div class="skill-grid">${groups.map(({ g, items }) => `
            <div class="skill-group">
              <h3 class="skill-title">${esc(t(g.name))}</h3>
              <div class="chips">${items.map((i) => `<span class="chip">${esc(t(i))}</span>`).join("")}</div>
            </div>`).join("")}</div>
        </div>
      </section>`;
  }

  function renderProjects(num) {
    const items = arr(P.projects && P.projects.items).filter((it) => it && has(it.name));
    return `
      <section class="sec" id="projects">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "项目经历" : "Projects")}
          ${items.map((it) => {
            const points = arr(it.highlights).filter(has);
            const tech = arr(it.tech).filter(has);
            const links = arr(it.links).map((l) => {
              const url = safeUrl(l && l.url);
              if (!url || !l || !has(l.label)) return "";
              return `<a class="link-btn" href="${esc(url)}"${/^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ""}>${icon("link")}${esc(t(l.label))}</a>`;
            }).join("");
            return `
              <article class="proj">
                <div class="proj-head">
                  <h3 class="proj-name">${esc(t(it.name))}</h3>
                  ${has(it.period) ? `<span class="proj-period">${esc(t(it.period))}</span>` : ""}
                </div>
                ${has(it.role) ? `<div class="proj-role">${esc(t(it.role))}</div>` : ""}
                ${has(it.summary) ? `<p class="proj-desc">${esc(t(it.summary))}</p>` : ""}
                ${points.length ? `<ul class="proj-points">${points.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
                ${(tech.length || links) ? `<div class="proj-foot">
                  ${tech.length ? `<div class="chips">${tech.map((x) => `<span class="chip accent">${esc(t(x))}</span>`).join("")}</div>` : ""}
                  ${links ? `<div class="proj-links">${links}</div>` : ""}
                </div>` : ""}
              </article>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderExperience(num) {
    const items = arr(P.experience && P.experience.items).filter((it) => it && (has(it.org) || has(it.title)));
    return `
      <section class="sec" id="experience">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "校园经历" : "Experience")}
          <ol class="timeline">${items.map((it) => {
            const details = arr(it.details).filter(has);
            return `
              <li class="tl-item">
                <div class="tl-head">
                  <h3 class="tl-title">${esc(t(it.org))}</h3>
                  ${has(it.period) ? `<span class="tl-period">${esc(t(it.period))}</span>` : ""}
                </div>
                ${has(it.title) ? `<div class="tl-sub">${esc(t(it.title))}</div>` : ""}
                ${details.length ? `<ul class="tl-list">${details.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
              </li>`;
          }).join("")}</ol>
        </div>
      </section>`;
  }

  function renderAwards(num) {
    const items = arr(P.awards && P.awards.items).filter((it) => it && has(it.title));
    return `
      <section class="sec" id="awards">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "荣誉奖项" : "Awards")}
          <ul class="award-list">${items.map((it) => `
            <li class="award">
              <span class="award-title">${esc(t(it.title))}</span>
              ${has(it.note) ? `<span class="award-note">${esc(t(it.note))}</span>` : ""}
              ${has(it.date) ? `<span class="award-date">${esc(t(it.date))}</span>` : ""}
            </li>`).join("")}</ul>
        </div>
      </section>`;
  }

  function renderContact(num) {
    const c = P.contact || {};
    const items = arr(c.items).map((it) => {
      if (!it) return "";
      const { url, val } = contactEntry(it);
      if (!val && !url) return "";
      const label = has(it.label) ? t(it.label) : "";
      const body = `<span class="contact-ico">${icon(it.icon)}</span>
        <span class="contact-body">
          ${label ? `<span class="contact-label">${esc(label)}</span>` : ""}
          <span class="contact-value">${esc(val || url.replace(/^mailto:/, ""))}</span>
        </span>`;
      const copy = !url && val ? `<button class="copy-btn" type="button" data-copy="${esc(val)}">${LANG === "zh" ? "复制" : "Copy"}</button>` : "";
      return url
        ? `<a class="contact-item" href="${esc(url)}"${/^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : ""}>${body}</a>`
        : `<div class="contact-item">${body}${copy}</div>`;
    }).join("");

    return `
      <section class="sec" id="contact">
        <div class="container">
          ${secHead(num, LANG === "zh" ? "联系方式" : "Contact")}
          ${has(c.intro) ? `<p class="contact-intro">${esc(t(c.intro))}</p>` : ""}
          <div class="contact-grid">${items}</div>
        </div>
      </section>`;
  }

  /* ---------------------------------------------------------------
     5 · 导航 / 页脚 / 空状态
     --------------------------------------------------------------- */
  let NAV_ITEMS = [];

  function renderNav() {
    const showNav = !(P.settings && P.settings.showNav === false);
    if (!showNav || !NAV_ITEMS.length) { navEl.hidden = true; return; }
    navEl.hidden = false;
    navEl.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="#top">${esc(t(P.hero && P.hero.name) || "主页")}</a>
        <nav class="nav-links" aria-label="${LANG === "zh" ? "页面导航" : "Page sections"}">
          ${NAV_ITEMS.map((s) => `<a href="#${s.key}">${LANG === "zh" ? s.zh : s.en}</a>`).join("")}
        </nav>
        <button class="lang-btn" type="button" id="langBtn" aria-label="${LANG === "zh" ? "Switch to English" : "切换到中文"}">
          ${LANG === "zh" ? "EN" : "中文"}
        </button>
      </div>`;
    const btn = document.getElementById("langBtn");
    if (btn) btn.addEventListener("click", () => {
      LANG = LANG === "zh" ? "en" : "zh";
      try { localStorage.setItem("homepage-lang", LANG); } catch (e) { /* 无痕模式忽略 */ }
      render();
    });
    spy();
  }

  function renderFooter() {
    const name = t(P.hero && P.hero.name) || "";
    const note = t(P.settings && P.settings.footerNote);
    footEl.hidden = false;
    footEl.innerHTML = `
      <div class="footer-inner">
        <span>© ${new Date().getFullYear()} ${esc(name)}</span>
        ${note ? `<span>${esc(note)}</span>` : ""}
      </div>`;
  }

  function renderEmptyTip() {
    return `
      <div class="container">
        <div class="empty-tip">
          <h2>还没有填写内容</h2>
          <p>打开仓库根目录的 <code>profile.js</code>，把里面的示例文字换成你自己的信息，保存后刷新本页即可看到效果。</p>
        </div>
      </div>`;
  }

  /* 滚动时高亮当前版块 */
  function spy() {
    const links = [...navEl.querySelectorAll(".nav-links a")];
    if (!links.length || !("IntersectionObserver" in window)) return;
    const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove("active"));
          const a = map.get(e.target.id);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-70px 0px -70% 0px", threshold: 0 });
    map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* 联系方式里的「复制」按钮 */
  function bindCopy() {
    mainEl.addEventListener("click", (ev) => {
      const btn = ev.target.closest(".copy-btn");
      if (!btn || !mainEl.contains(btn)) return;
      ev.preventDefault();
      const text = btn.getAttribute("data-copy") || "";
      const done = () => {
        const old = btn.textContent;
        btn.textContent = LANG === "zh" ? "已复制" : "Copied";
        setTimeout(() => { btn.textContent = old; }, 1400);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(() => {});
      } else {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* 忽略 */ }
        document.body.removeChild(ta);
      }
    });
  }

  /* ---------------------------------------------------------------
     6 · 渲染入口
     --------------------------------------------------------------- */
  function applySettings() {
    const s = P.settings || {};
    const accent = String(s.accent || "").trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(accent)) {
      const full = accent.length === 4
        ? "#" + accent.slice(1).split("").map((c) => c + c).join("")
        : accent;
      const r = parseInt(full.slice(1, 3), 16), g = parseInt(full.slice(3, 5), 16), b = parseInt(full.slice(5, 7), 16);
      document.documentElement.style.setProperty("--accent", full);
      document.documentElement.style.setProperty("--accent-soft", `rgba(${r}, ${g}, ${b}, .10)`);
    }
    /* 不想被搜索引擎收录，就把 profile.js 里的 searchEngineIndex 改成 false */
    if (s.searchEngineIndex === false && !document.querySelector('meta[name="robots"]')) {
      const m = document.createElement("meta");
      m.name = "robots";
      m.content = "noindex, nofollow";
      document.head.appendChild(m);
    }
  }

  function applyTitle(d) {
    const name = t(P.hero && P.hero.name) || (LANG === "zh" ? "个人主页" : "Homepage");
    const role = t(P.hero && P.hero.role);
    document.title = role ? `${name} · ${role}` : name;
    const md = document.querySelector('meta[name="description"]');
    if (md) {
      const bio = t(P.about && P.about.bio);
      md.setAttribute("content", (bio || role || name).slice(0, 150));
    }
    const ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", document.title);
  }

  function render() {
    try {
      LANG = (() => {
        let saved = null;
        try { saved = localStorage.getItem("homepage-lang"); } catch (e) {}
        const want = saved || (P.settings && P.settings.defaultLang) || "zh";
        return want === "en" ? "en" : "zh";
      })();
    } catch (e) { LANG = "zh"; }

    document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";

    const d = data();
    const enabled = SECTIONS.filter((s) => sectionHasContent(s.key, d));
    NAV_ITEMS = enabled;
    applySettings();
    applyTitle(d);

    if (!enabled.length && !has(P.hero && P.hero.name)) {
      mainEl.innerHTML = renderEmptyTip();
      navEl.hidden = true;
      footEl.hidden = true;
      return;
    }

    const body = enabled.map((s, i) => {
      const num = String(i + 1).padStart(2, "0");
      switch (s.key) {
        case "about":      return renderAbout(num);
        case "education":  return renderEducation(num);
        case "skills":     return renderSkills(num);
        case "projects":   return renderProjects(num);
        case "experience": return renderExperience(num);
        case "awards":     return renderAwards(num);
        case "contact":    return renderContact(num);
        default:           return "";
      }
    }).join("");

    mainEl.innerHTML = `<span id="top"></span>${renderHero()}${body}`;
    renderNav();
    renderFooter();
  }

  if (!P) {
    mainEl.innerHTML = `
      <div class="container">
        <div class="empty-tip">
          <h2>没有读到配置</h2>
          <p>请确认仓库根目录存在 <code>profile.js</code>，并且里面的括号和引号是配对的（漏一个逗号就会整页空白）。</p>
        </div>
      </div>`;
    return;
  }

  bindCopy();
  render();
})();
