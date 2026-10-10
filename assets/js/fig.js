/* ============================================================
 *  fig.js — 「動く図解」用の小さな描画ヘルパー
 *  使い方（記事ページの window.initPage 内で）:
 *    const P = Fig.plane(canvas, { xmin, xmax, ymin, ymax });
 *    P.clear(); P.axes(); P.fn(x => x * x, -2, 2, "#8a1538");
 *    const V = Fig.view3d(canvas, { scale: 60, onChange: draw });
 *    V.clear(); V.axes(2); V.poly([[0,0,0],[1,0,0]], "#000");
 * ============================================================ */
(function () {
  const ACCENT = "#8a1538";

  function plane(cv, o) {
    const c = cv.getContext("2d");
    const W = cv.width, H = cv.height, pad = o.pad ?? 8;
    let { xmin, xmax, ymin, ymax } = o;
    if (o.equal) { // 縦横比をそろえる
      const sx = (W - 2 * pad) / (xmax - xmin), sy = (H - 2 * pad) / (ymax - ymin), s = Math.min(sx, sy);
      const cx = (xmin + xmax) / 2, cy = (ymin + ymax) / 2;
      xmin = cx - (W - 2 * pad) / s / 2; xmax = cx + (W - 2 * pad) / s / 2;
      ymin = cy - (H - 2 * pad) / s / 2; ymax = cy + (H - 2 * pad) / s / 2;
    }
    const X = (x) => pad + (x - xmin) / (xmax - xmin) * (W - 2 * pad);
    const Y = (y) => H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad);
    const P = {
      c, W, H, X, Y,
      get xmin() { return xmin; }, get xmax() { return xmax; }, get ymin() { return ymin; }, get ymax() { return ymax; },
      inv(px, py) { return [xmin + (px - pad) / (W - 2 * pad) * (xmax - xmin), ymin + (H - pad - py) / (H - 2 * pad) * (ymax - ymin)]; },
      clear() { c.clearRect(0, 0, W, H); return P; },
      grid(step = 1, col = "#eee") {
        c.strokeStyle = col; c.lineWidth = 1; c.beginPath();
        for (let x = Math.ceil(xmin / step) * step; x <= xmax; x += step) { c.moveTo(X(x), 0); c.lineTo(X(x), H); }
        for (let y = Math.ceil(ymin / step) * step; y <= ymax; y += step) { c.moveTo(0, Y(y)); c.lineTo(W, Y(y)); }
        c.stroke(); return P;
      },
      axes(lx = "x", ly = "y", col = "#999") {
        c.strokeStyle = col; c.lineWidth = 1; c.beginPath();
        c.moveTo(0, Y(0)); c.lineTo(W, Y(0)); c.moveTo(X(0), 0); c.lineTo(X(0), H); c.stroke();
        c.fillStyle = "#888"; c.font = "12px sans-serif";
        if (lx) c.fillText(lx, W - 12, Y(0) - 4);
        if (ly) c.fillText(ly, X(0) + 4, 12);
        return P;
      },
      line(pts, col = ACCENT, w = 2, dash = []) {
        c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash); c.beginPath();
        let pen = false;
        pts.forEach((p) => {
          if (!p || !isFinite(p[0]) || !isFinite(p[1])) { pen = false; return; }
          pen ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1])); pen = true;
        });
        c.stroke(); c.setLineDash([]); return P;
      },
      fill(pts, col = "rgba(138,21,56,.2)") {
        c.fillStyle = col; c.beginPath();
        pts.forEach((p, i) => (i ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1]))));
        c.closePath(); c.fill(); return P;
      },
      fn(f, a, b, col = ACCENT, w = 2, n = 300, dash = []) {
        const pts = []; for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n; pts.push([x, f(x)]); }
        return P.line(pts, col, w, dash);
      },
      param(fx, fy, a, b, col = ACCENT, w = 2, n = 400, dash = []) {
        const pts = []; for (let i = 0; i <= n; i++) { const t = a + (b - a) * i / n; pts.push([fx(t), fy(t)]); }
        return P.line(pts, col, w, dash);
      },
      dot(x, y, col = "#222", r = 4, label = "", dx = 6, dy = -6) {
        c.fillStyle = col; c.beginPath(); c.arc(X(x), Y(y), r, 0, 7); c.fill();
        if (label) { c.fillStyle = "#222"; c.font = "bold 13px sans-serif"; c.fillText(label, X(x) + dx, Y(y) + dy); }
        return P;
      },
      ring(x, y, col = "#555", r = 5) { c.fillStyle = "#fff"; c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.arc(X(x), Y(y), r, 0, 7); c.fill(); c.stroke(); return P; },
      text(s, x, y, col = "#666", font = "12px sans-serif") { c.fillStyle = col; c.font = font; c.fillText(s, X(x), Y(y)); return P; },
      label(s, px, py, col = "#666", font = "12px sans-serif") { c.fillStyle = col; c.font = font; c.fillText(s, px, py); return P; },
      circle(x, y, r, col = "#999", w = 1, dash = []) {
        c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash); c.beginPath();
        c.ellipse(X(x), Y(y), Math.abs(X(r) - X(0)), Math.abs(Y(r) - Y(0)), 0, 0, 7); c.stroke(); c.setLineDash([]); return P;
      },
    };
    return P;
  }

  function view3d(cv, o = {}) {
    const c = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const st = { az: o.az ?? -0.7, el: o.el ?? 0.4, scale: o.scale ?? 60, center: o.center ?? [0, 0, 0] };
    const proj = (p) => {
      const x = p[0] - st.center[0], y = p[1] - st.center[1], z = p[2] - st.center[2];
      const ca = Math.cos(st.az), sa = Math.sin(st.az), cb = Math.cos(st.el), sb = Math.sin(st.el);
      const u = -x * sa + y * ca, v = z * cb - (x * ca + y * sa) * sb;
      return [W / 2 + st.scale * u, H / 2 - st.scale * v];
    };
    const V = {
      c, st, proj,
      clear() { c.clearRect(0, 0, W, H); return V; },
      poly(pts, col = "#222", w = 1.5, dash = [], fill = null, close = false) {
        c.beginPath();
        pts.forEach((p, i) => { const q = proj(p); i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]); });
        if (fill || close) c.closePath();
        if (fill) { c.fillStyle = fill; c.fill(); }
        if (col) { c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash); c.stroke(); c.setLineDash([]); }
        return V;
      },
      dot(p, col = "#222", r = 4, label = "") {
        const q = proj(p); c.fillStyle = col; c.beginPath(); c.arc(q[0], q[1], r, 0, 7); c.fill();
        if (label) { c.fillStyle = "#222"; c.font = "bold 13px sans-serif"; c.fillText(label, q[0] + 6, q[1] - 6); }
        return V;
      },
      axes(L = 2, col = "#bbb") {
        V.poly([[-L * 0.3, 0, 0], [L, 0, 0]], col, 1); V.poly([[0, -L * 0.3, 0], [0, L, 0]], col, 1); V.poly([[0, 0, -L * 0.3], [0, 0, L]], col, 1);
        c.fillStyle = "#888"; c.font = "12px sans-serif";
        [["x", [L * 1.07, 0, 0]], ["y", [0, L * 1.07, 0]], ["z", [0, 0, L * 1.07]]].forEach(([s, p]) => { const q = proj(p); c.fillText(s, q[0], q[1]); });
        return V;
      },
      // 中心 ctr、互いに直交する単位ベクトル e1, e2、半径 r の円
      circle(ctr, e1, e2, r, col, w = 1.5, dash = [], fill = null) {
        const pts = []; for (let i = 0; i <= 72; i++) { const t = i / 72 * 2 * Math.PI; pts.push([0, 1, 2].map((k) => ctr[k] + r * (Math.cos(t) * e1[k] + Math.sin(t) * e2[k]))); }
        return V.poly(pts, col, w, dash, fill);
      },
    };
    // ドラッグで回転
    let drag = null;
    cv.style.touchAction = "none"; cv.style.cursor = "grab";
    cv.addEventListener("pointerdown", (e) => { drag = [e.clientX, e.clientY]; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointermove", (e) => {
      if (!drag) return;
      st.az -= (e.clientX - drag[0]) * 0.01; st.el = Math.max(-1.5, Math.min(1.5, st.el + (e.clientY - drag[1]) * 0.01));
      drag = [e.clientX, e.clientY]; o.onChange && o.onChange();
    });
    cv.addEventListener("pointerup", () => (drag = null));
    return V;
  }

  // 3D ベクトル演算
  const v3 = {
    add: (a, b) => a.map((x, i) => x + b[i]), sub: (a, b) => a.map((x, i) => x - b[i]),
    mul: (a, k) => a.map((x) => x * k), dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    len: (a) => Math.hypot(a[0], a[1], a[2]), unit: (a) => { const l = Math.hypot(a[0], a[1], a[2]); return a.map((x) => x / l); },
  };

  // 複素数（[re, im]）
  const C = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
    pow: (a, n) => { let r = [1, 0]; for (let i = 0; i < n; i++) r = C.mul(r, a); return r; },
    abs: (a) => Math.hypot(a[0], a[1]), arg: (a) => Math.atan2(a[1], a[0]),
    fmt: (a, d = 3) => `${a[0].toFixed(d)} ${a[1] < 0 ? "−" : "+"} ${Math.abs(a[1]).toFixed(d)}i`,
  };

  window.Fig = { plane, view3d, v3, C, ACCENT };
})();
