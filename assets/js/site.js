/* =========================================================
 *  共通スクリプト（ヘッダー・メニュー・ブックマーク・数式描画）
 *  ※ data.js の後に読み込むこと
 * ========================================================= */
(function () {
  "use strict";

  const S = window.SITE, P = window.PROBLEMS || {}, Y = window.YEARS || {};
  const T = window.TOPICS || {}, D = window.DIFFICULTY || {};
  const ROOT = document.body.dataset.root || ".";

  /* ---------- ユーティリティ ---------- */
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fileOf = (id) => id.replace("-", "_") + ".html";
  const urlOf = (id) => `${ROOT}/pages/${fileOf(id)}`;
  const countOf = (year) => (Y[year] && Y[year].count) || S.defaultProblemCount;
  const info = (id) => P[id] || {};
  const isPub = (id) => !!info(id).published;
  const colorOf = (id) => T[(info(id).topics || [])[0]] || "#ccc";

  /** 全問題 ID を新しい年度→問題番号順で返す */
  function allIds() {
    const ids = [];
    for (let y = S.endYear; y >= S.startYear; y--)
      for (let n = 1; n <= countOf(y); n++) ids.push(`${y}-${n}`);
    return ids;
  }

  /* ---------- ブックマーク（localStorage） ---------- */
  const BM_KEY = "kyudai-math-bookmarks";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(BM_KEY)) || []; } catch (e) { return []; } },
    set(v) { try { localStorage.setItem(BM_KEY, JSON.stringify(v)); } catch (e) {} },
  };
  const bookmarks = {
    list: () => store.get(),
    has: (id) => store.get().includes(id),
    toggle(id) {
      const l = store.get();
      const i = l.indexOf(id);
      i >= 0 ? l.splice(i, 1) : l.unshift(id);
      store.set(l);
      return i < 0;
    },
  };

  /* ---------- カード（一覧表・オススメ等で共用） ---------- */
  function cardHTML(id, opts = {}) {
    const p = info(id), pub = isPub(id);
    const tags = (p.topics || []).map((t) => `<span class="tag" style="background:${T[t] || "#888"}">${esc(t)}</span>`).join("");
    const diff = p.diff ? `<span class="diff" title="${esc(D[p.diff] || "")}">${esc(p.diff)}</span>` : "";
    const bm = bookmarks.has(id) ? `<span class="bm" title="ブックマーク済み">★</span>` : "";
    const inner = `<div class="id">${id}</div>${diff}<div class="t">${esc(p.title || "準備中")}</div><div class="tags">${tags}</div>${bm}`;
    const topicsAttr = esc((p.topics || []).join("|"));
    if (pub || opts.forceLink)
      return `<a class="card" href="${urlOf(id)}" style="--c:${colorOf(id)}" data-topics="${topicsAttr}" data-id="${id}">${inner}</a>`;
    return `<div class="card disabled" style="--c:${colorOf(id)}" data-topics="${topicsAttr}" data-id="${id}" title="準備中">${inner}</div>`;
  }

  /* ---------- ヘッダー + ドロワーメニュー ---------- */
  function renderChrome() {
    const pubs = allIds().filter(isPub);
    const byYear = {};
    pubs.forEach((id) => { (byYear[id.split("-")[0]] ||= []).push(id); });
    const yearLinks = Object.keys(byYear).sort((a, b) => b - a)
      .map((y) => `<li><b>${y}</b>　${byYear[y].map((id) => `<a style="display:inline" href="${urlOf(id)}">第${id.split("-")[1]}問</a>`).join("　")}</li>`).join("");

    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `<button class="menu-btn" aria-label="メニュー">☰</button><a class="brand" href="${ROOT}/index.html">${esc(S.title)}</a>`;
    const drawer = document.createElement("nav");
    drawer.className = "drawer";
    drawer.innerHTML = `
      <button class="close" aria-label="閉じる">✕</button>
      <h3>メニュー</h3>
      <ul>
        <li><a href="${ROOT}/index.html">🏠 ホーム</a></li>
        <li><a href="${ROOT}/index.html#table">📅 年代別一覧</a></li>
        <li><a href="${ROOT}/index.html#bookmarks">★ ブックマーク</a></li>
        <li><a href="${ROOT}/pages/about.html">ℹ このサイトについて</a></li>
      </ul>
      <h3>解説済みの記事</h3>
      <ul>${yearLinks || '<li class="muted">まだありません</li>'}</ul>`;
    const mask = document.createElement("div");
    mask.className = "drawer-mask";
    const top = document.createElement("a");
    top.className = "to-top"; top.href = "#top"; top.textContent = "▲"; top.title = "ページ上部へ";

    document.body.prepend(mask);
    document.body.prepend(drawer);
    document.body.prepend(header);
    document.body.append(top);
    if (!document.getElementById("top")) header.id = "top";

    const toggle = (on) => document.body.classList.toggle("drawer-open", on);
    $(".menu-btn", header).onclick = () => toggle(true);
    $(".close", drawer).onclick = () => toggle(false);
    mask.onclick = () => toggle(false);
    document.addEventListener("keydown", (e) => e.key === "Escape" && toggle(false));

    const footer = document.createElement("footer");
    footer.innerHTML = `© ${new Date().getFullYear()} ${esc(S.title)} ／ 問題の著作権は九州大学に帰属します。`;
    document.body.append(footer);
  }

  /* ---------- 数式（KaTeX auto-render） ---------- */
  function renderMath() {
    if (typeof window.renderMathInElement !== "function") return;
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
      ],
      ignoredClasses: ["no-math"],
      throwOnError: false,
    });
  }

  /* ---------- 記事ページ ---------- */
  function renderArticle(id) {
    const p = info(id);
    const [y, n] = id.split("-");
    document.title = `${y}年 九大理系数学 第${n}問｜${S.title}`;

    const head = $("#article-head");
    if (head) {
      const tags = (p.topics || []).map((t) => `<span class="tag" style="background:${T[t] || "#888"}">${esc(t)}</span>`).join("");
      const diff = p.diff ? `<span class="muted">難易度 <b>${esc(p.diff)}</b>（${esc(D[p.diff] || "")}）</span>` : "";
      head.innerHTML = `
        <div class="breadcrumb"><a href="${ROOT}/index.html">ホーム</a> ＞ <a href="${ROOT}/index.html#y${y}">${y}年</a> ＞ 第${n}問</div>
        <h1 class="article-title">九大理系数学 ${id}<small>${esc(p.title || "")}</small></h1>
        <div class="article-meta">${tags} ${diff}
          <button class="bookmark-btn" type="button"></button></div>`;
      const btn = $(".bookmark-btn", head);
      const paint = () => {
        const on = bookmarks.has(id);
        btn.classList.toggle("on", on);
        btn.textContent = on ? "★ ブックマーク済み" : "☆ ブックマーク";
      };
      btn.onclick = () => { bookmarks.toggle(id); paint(); };
      paint();
    }

    // 前後の「解説済み」記事へのリンク（年代順）
    const pager = $("#pager");
    if (pager) {
      const pubs = allIds().filter(isPub).reverse(); // 古い順
      const i = pubs.indexOf(id);
      const prev = pubs[i - 1], next = pubs[i + 1];
      const link = (pid, cls, label) => pid
        ? `<a class="${cls}" href="${urlOf(pid)}">${label} ${pid}<br><small>${esc(info(pid).title || "")}</small></a>`
        : `<span class="${cls}">${label} なし</span>`;
      pager.innerHTML = link(prev, "prev", "◀ 前の記事") + link(next, "next", "次の記事 ▶");
    }
  }

  /* ---------- 公開 API ---------- */
  window.KM = { $, esc, urlOf, countOf, info, isPub, allIds, cardHTML, bookmarks, renderMath };

  document.addEventListener("DOMContentLoaded", () => {
    renderChrome();
    const id = document.body.dataset.id;
    if (id) renderArticle(id);
    if (typeof window.initPage === "function") window.initPage(window.KM);
    renderMath();
  });
})();
