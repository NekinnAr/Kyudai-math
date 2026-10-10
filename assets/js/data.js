/* =========================================================
 *  サイトのデータ（ここだけ編集すれば一覧表に反映されます）
 * ========================================================= */

/* ---------- サイト全体の設定 ---------- */
window.SITE = {
  title: "九大理系数学の探究",
  subtitle: "九州大学 前期日程 理系数学の過去問を、年代別に解説・深掘りするサイトです。",
  author: "管理人",
  contact: "https://x.com/itijistop", // 問い合わせ先（X など）。空文字なら非表示
  startYear: 1997,
  endYear: 2026,
  defaultProblemCount: 5, // 九大理系は例年5問。年度ごとの例外は YEARS[year].count で上書き
  // 試験開始日時（日本時間）。要項が出たら正確な日時に更新してください
  examDate: "2027-02-25T09:30:00+09:00",
  examLabel: "九大前期2027",
};

/* ---------- 分野（タグ）と色 ---------- */
window.TOPICS = {
  "微分法":       "#e8590c",
  "積分法":       "#d6336c",
  "極限":         "#ae3ec9",
  "数列":         "#7048e8",
  "確率":         "#1c7ed6",
  "場合の数":     "#1971c2",
  "整数":         "#0c8599",
  "複素数平面":   "#2b8a3e",
  "ベクトル":     "#5c940d",
  "空間図形":     "#e67700",
  "図形と計量":   "#a61e4d",
  "式と曲線":     "#5f3dc4",
  "式と証明":     "#364fc7",
  "関数・方程式": "#495057",
  "行列（旧課程）": "#868e96",
};

/* ---------- 難易度の凡例 ---------- */
window.DIFFICULTY = {
  A: "易",
  B: "標準",
  C: "やや難",
  D: "難",
};

/* ---------- 年度ごとの情報 ----------
 *  note  : 一覧表の年度の下に出る一言コメント
 *  count : その年の大問数（省略時は SITE.defaultProblemCount）
 *  mondai: 問題一覧ページ（あれば）のパス
 */
window.YEARS = {
  2026: { note: "新課程2年目・標準" },
  2025: { note: "新課程初年度・易化" },
  2024: { note: "旧課程最終年・穴埋め形式が消えた" },
  2023: { note: "1が小問集合・4は読解型" },
  2022: { note: "程よく難しい良セット" },
  2021: { note: "バラエティ豊か・やや易" },
  2020: { note: "易〜難のバランス良いセット" },
  2019: { note: "標準的・計算力重視" },
  2018: { note: "典型問題中心の標準セット" },
  2017: { note: "(3)(5) の数え上げが山場" },
  2016: { note: "誘導が丁寧で取りこぼせない年" },
  2015: { note: "誘導に乗れば完答も狙える標準セット" },
  2014: { note: "教科書レベル中心・証明問題が鍵" },
  2013: { note: "旧課程最後の世代・行列が登場" },
  2012: { note: "行列は対称性の群・黄金比の極限・推移確率" },
  2011: { note: "tan の 2 倍角漸化式が光る・全体に標準的" },
  2010: { note: "サイクロイド・期待値の最適戦略など教科書的な良問セット" },
  2009: { note: "曲率中心・曲率がテーマの微積と、行列の発想問題" },
  2008: { note: "傍心・cos(π/5) の罠など図形に味わいのあるセット" },
  2007: { note: "接線と面積の最小（中点で接する）、行列の交換子漸化式、空間の四面体の最大体積、さいころと有理数解、|sin mx|sin nx の基本周期。第5問の周期の議論が独特。" },
  2006: { note: "log x / x と解の評価、交点ベクトルと垂直条件、漸化式の整数性（正体はペル方程式）、二重絶対値の関数と積分、ロジスティック写像の不変区間。第5問の場合分けが難所。" },
  2005: { note: "sin カーブの接線と回転体（円錐の利用）、行列による漸化式、複素数の軌跡と1次分数変換、ガウス記号付きの三角・対数不等式、媒介変数曲線の面積と中間値の定理。全体に標準的。" },
  2004: { note: "積分漸化式で e^{-2} の級数を求める、対称行列の n 乗（二項定理）、リサジュー曲線の面積、三角柱内の四面体の最大体積、電球の色の変化回数（二項分布）。全体に標準〜やや易。" },
  2003: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  2002: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  2001: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  2000: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  1999: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  1998: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
  1997: { note: "第4問・第5問が選択問題（各3題）のため、載せ方を検討中" },
};

/* ---------- 各問題の情報 ----------
 *  キーは "年-問題番号"
 *  title     : 一覧・記事に出る短いタイトル
 *  topics    : 分野タグ（TOPICS のキー）の配列
 *  diff      : 難易度 "A"〜"D"（未評価なら省略）
 *  published : true にすると一覧表のリンクが有効化されます
 *              （pages/2025_3.html のようなファイルを用意すること）
 */
window.PROBLEMS = {
  "2026-1": { title: "球を切る2平面と円柱の切り口", topics: ["空間図形", "ベクトル", "式と曲線"], diff: "B", published: true },
  "2026-2": { title: "z+1/z の軌跡と回転体", topics: ["複素数平面", "積分法", "式と曲線"], diff: "B", published: true },
  "2026-3": { title: "白玉・黒玉の並びと確率漸化式", topics: ["確率", "数列"], diff: "B", published: true },
  "2026-4": { title: "√2+√3 を解にもつ方程式", topics: ["式と証明", "整数"], diff: "B", published: true },
  "2026-5": { title: "∫log(4t²+1)dt の極値と極限", topics: ["微分法", "積分法", "極限"], diff: "C", published: true },

  "2025-1": { title: "平面への垂線と xy 平面の交点", topics: ["ベクトル", "空間図形"], diff: "A", published: true },
  "2025-2": { title: "tan x の有理式の定積分", topics: ["積分法"], diff: "A", published: true },
  "2025-3": { title: "2^m = n² + 3", topics: ["整数"], diff: "A", published: true },
  "2025-4": { title: "円に内接する四角形と面積", topics: ["図形と計量"], diff: "B", published: true },
  "2025-5": { title: "さいころの目を係数とする3次方程式", topics: ["確率", "関数・方程式"], diff: "B", published: true },

  "2024-1": { title: "曲線 (a, a², a³) 上の点と三角形の面積", topics: ["ベクトル", "空間図形", "微分法"], diff: "A", published: true },
  "2024-2": { title: "z⁶+z⁴+z²+1 の解と回転", topics: ["複素数平面"], diff: "B", published: true },
  "2024-3": { title: "階乗の方程式 a!+b!=2·c!", topics: ["整数"], diff: "A", published: true },
  "2024-4": { title: "格子点を3点以上通る直線の数え上げ", topics: ["場合の数"], diff: "B", published: true },
  "2024-5": { title: "積分 I(m, n) の漸化式と極限", topics: ["積分法", "極限"], diff: "B", published: true },

  "2023-1": { title: "4次方程式と (α−β)⁴+… = 0 の三角形", topics: ["複素数平面", "関数・方程式"], diff: "A", published: true },
  "2023-2": { title: "a(n+1) = |a(n)−1| + a(n) − 1 の収束・発散", topics: ["数列", "極限"], diff: "B", published: true },
  "2023-3": { title: "整数係数の1次結合で格子点を表す", topics: ["ベクトル", "整数"], diff: "B", published: true },
  "2023-4": { title: "加法定理を満たす関数（読解型）", topics: ["微分法", "極限"], diff: "B", published: true },
  "2023-5": { title: "x = t + 2sin²t, y = t + sin t の曲線と面積", topics: ["微分法", "積分法", "式と曲線"], diff: "B", published: true },

  "2022-1": { title: "平面に関する対称点と折れ線の最小値", topics: ["ベクトル", "空間図形"], diff: "A", published: true },
  "2022-2": { title: "xⁿ を (x−α)(x−β)² で割った余り", topics: ["式と証明", "極限"], diff: "B", published: true },
  "2022-3": { title: "n⁴ = 1 + 210m²", topics: ["整数"], diff: "C", published: true },
  "2022-4": { title: "定積分と区分求積の誤差（穴埋め）", topics: ["積分法", "極限"], diff: "A", published: true },
  "2022-5": { title: "x = 5cos t + cos 5t の曲線（ハイポサイクロイド）", topics: ["式と曲線", "積分法", "複素数平面"], diff: "B", published: true },

  "2021-1": { title: "四面体の内接球と3平面に接する球の切り口", topics: ["空間図形", "ベクトル"], diff: "A", published: true },
  "2021-2": { title: "2次方程式の虚数解と外接円の中心", topics: ["複素数平面", "関数・方程式"], diff: "B", published: true },
  "2021-3": { title: "すべての t で y ≤ eᵗ − xt を満たす領域", topics: ["微分法", "積分法"], diff: "B", published: true },
  "2021-4": { title: "複素数での「平均値の性質」", topics: ["複素数平面", "微分法"], diff: "B", published: true },
  "2021-5": { title: "nCk > n と nCk = p", topics: ["整数", "場合の数"], diff: "B", published: true },

  "2020-1": { title: "曲線 y = e^(−x) − e^(−2x) の接線の x 切片", topics: ["微分法"], diff: "A", published: true },
  "2020-2": { title: "(1+√3i)/2 を解にもつ4次式と合同式", topics: ["複素数平面", "整数"], diff: "C", published: true },
  "2020-3": { title: "中点を結ぶ直線が直交する四面体の外接球", topics: ["空間図形", "ベクトル"], diff: "D", published: true },
  "2020-4": { title: "4個のサイコロの目の積", topics: ["確率"], diff: "B", published: true },
  "2020-5": { title: "円柱を平面で切った立体と回転体", topics: ["積分法", "空間図形"], diff: "B", published: true },

  "2019-1": { title: "∫(sin 2nπt − xt − y)² dt の最小値と極限", topics: ["積分法", "極限"], diff: "A", published: true },
  "2019-2": { title: "f(x²), g(x³) の恒等式と次数", topics: ["式と証明"], diff: "B", published: true },
  "2019-3": { title: "サイコロの目を係数とする2次方程式の解", topics: ["確率", "複素数平面"], diff: "B", published: true },
  "2019-4": { title: "正三角形の辺上で垂線を繰り返す点列", topics: ["数列", "極限", "図形と計量"], diff: "B", published: true },
  "2019-5": { title: "w = (az+b)/(cz+1) の軌跡", topics: ["複素数平面"], diff: "B", published: true },

  "2018-1": { title: "双曲線と直線 AP・平面 x = d の交点の軌跡", topics: ["空間図形", "式と曲線"], diff: "B", published: true },
  "2018-2": { title: "半円上の2点と内分点が通過する図形・回転体", topics: ["積分法", "式と曲線"], diff: "B", published: true },
  "2018-3": { title: "カードの積を4で割った余りの確率漸化式", topics: ["確率", "数列"], diff: "A", published: true },
  "2018-4": { title: "2x³ + a²x² + 2b²x + 1 = 0 の有理数解", topics: ["整数", "式と証明"], diff: "A", published: true },
  "2018-5": { title: "α(|z|²+2) + i(2|α|²+1)z̄ = 0 を解く", topics: ["複素数平面"], diff: "B", published: true },

  "2017-1": { title: "a tan x と sin 2x の交点での直交条件と面積", topics: ["微分法", "積分法"], diff: "A", published: true },
  "2017-2": { title: "直方体の頂点から対角線への垂線のなす角", topics: ["ベクトル", "空間図形"], diff: "A", published: true },
  "2017-3": { title: "等差数列 4n−3 の積に含まれる素因数 7 の個数", topics: ["整数", "数列"], diff: "B", published: true },
  "2017-4": { title: "3 人で玉を引くゲームの確率漸化式", topics: ["確率", "数列"], diff: "B", published: true },
  "2017-5": { title: "回転しながら縮む点列が三角形に入る条件", topics: ["複素数平面"], diff: "C", published: true },

  "2016-1": { title: "log x と放物線が弦で切り取る面積と極限", topics: ["積分法", "極限"], diff: "B", published: true },
  "2016-2": { title: "3 本のチェバ線が作る三角形の面積", topics: ["ベクトル", "図形と計量"], diff: "A", published: true },
  "2016-3": { title: "正六角形上のコインの移動確率", topics: ["確率"], diff: "A", published: true },
  "2016-4": { title: "10ⁿ を 13 で割った余りと 6 桁の 13 の倍数", topics: ["整数"], diff: "A", published: true },
  "2016-5": { title: "ド・モアブルと三角関数の値", topics: ["複素数平面", "関数・方程式"], diff: "A", published: true },

  "2015-1": { title: "2 つの放物線と直線の面積・中間値の定理", topics: ["積分法", "微分法"], diff: "B", published: true },
  "2015-2": { title: "Σ1/(k(log k)²) の積分による評価", topics: ["積分法", "数列"], diff: "A", published: true },
  "2015-3": { title: "半球が太陽光線でつくる影の面積と体積", topics: ["空間図形", "積分法"], diff: "B", published: true },
  "2015-4": { title: "赤玉・青玉の入れかえと硬貨をもらう確率", topics: ["確率"], diff: "B", published: true },
  "2015-5": { title: "2^(p−1) − 1 = pq² を満たす素数", topics: ["整数"], diff: "B", published: true },

  "2014-1": { title: "x − sin x の接線と回転体の体積", topics: ["微分法", "積分法"], diff: "A", published: true },
  "2014-2": { title: "a² + b² = 3c² の無限降下法", topics: ["整数"], diff: "A", published: true },
  "2014-3": { title: "楕円上の点の |x| + |y| の最大・最小", topics: ["式と曲線", "関数・方程式"], diff: "B", published: true },
  "2014-4": { title: "硬貨を投げ合うゲームの勝率と期待値", topics: ["確率"], diff: "A", published: true },
  "2014-5": { title: "(x−1)(2x−1)…(nx−1) の極値の個数", topics: ["微分法"], diff: "B", published: true },

  "2013-1": { title: "√x と a³/x の接線のなす角の極限", topics: ["微分法", "極限", "積分法"], diff: "A", published: true },
  "2013-2": { title: "四角錐で平面 OMN に垂直な直線 PQ", topics: ["ベクトル", "空間図形"], diff: "B", published: true },
  "2013-3": { title: "左右から硬貨を反転する操作の確率", topics: ["確率"], diff: "B", published: true },
  "2013-4": { title: "内接する円と弧で囲まれた図形の回転体", topics: ["積分法", "図形と計量"], diff: "B", published: true },
  "2013-5": { title: "(AB)² が対角行列・A⁴ = E となる行列", topics: ["行列（旧課程）"], diff: "C", published: true },

  "2012-1": { title: "円を x 軸のまわりに回転した立体の体積", topics: ["積分法"], diff: "A", published: true },
  "2012-2": { title: "A²=B²=E,(AB)³=E となる行列の列", topics: ["行列（旧課程）"], diff: "B", published: true },
  "2012-3": { title: "絶対値を含む方程式が実数解をもつ条件", topics: ["微分法", "関数・方程式"], diff: "C", published: true },
  "2012-4": { title: "2次方程式の解から作る数列の比の極限", topics: ["極限", "整数", "数列"], diff: "B", published: true },
  "2012-5": { title: "2つの箱の玉の入れ替えと確率", topics: ["確率"], diff: "B", published: true },

  "2011-1": { title: "√x 上の点から y=x への垂線と面積", topics: ["積分法"], diff: "A", published: true },
  "2011-2": { title: "(x²+2x+2−a²)e^(−x) と 3 交点の条件", topics: ["微分法", "極限"], diff: "B", published: true },
  "2011-3": { title: "tan の 2 倍角型漸化式と周期", topics: ["数列", "整数"], diff: "B", published: true },
  "2011-4": { title: "4 点を通る球面と四面体の体積", topics: ["ベクトル", "空間図形"], diff: "A", published: true },
  "2011-5": { title: "カードの入れかえと左端の期待値", topics: ["確率"], diff: "B", published: true },

  "2010-1": { title: "CP=a となる辺上の点が 2 つある条件", topics: ["図形と計量"], diff: "A", published: true },
  "2010-2": { title: "2 回目を振るかどうかの期待値の最大化", topics: ["確率"], diff: "A", published: true },
  "2010-3": { title: "y=1/x² の接線をたどる点列と面積の級数", topics: ["微分法", "極限", "数列"], diff: "B", published: true },
  "2010-4": { title: "サイクロイドの面積と長さ", topics: ["積分法", "式と曲線"], diff: "A", published: true },
  "2010-5": { title: "放物線の 1 次変換による像", topics: ["行列（旧課程）"], diff: "B", published: true },

  "2009-1": { title: "垂線の足と |CP|² の最小値", topics: ["ベクトル"], diff: "A", published: true },
  "2009-2": { title: "カードの和が偶数となる確率の漸化式", topics: ["確率", "数列"], diff: "B", published: true },
  "2009-3": { title: "2 法線の交点の極限（縮閉線）と面積", topics: ["微分法", "極限", "積分法"], diff: "B", published: true },
  "2009-4": { title: "AX=Y, AY=Z, AZ=X をみたす行列", topics: ["行列（旧課程）", "ベクトル"], diff: "C", published: true },
  "2009-5": { title: "y=eˣ 上を速さ 1 で動く点の加速度", topics: ["微分法"], diff: "B", published: true },

  "2008-1": { title: "シグモイド関数の逆関数と極限", topics: ["微分法", "極限"], diff: "A", published: true },
  "2008-2": { title: "カードの引き直しと得点の期待値", topics: ["確率"], diff: "A", published: true },
  "2008-3": { title: "面積比とベクトル・傍心", topics: ["ベクトル", "図形と計量"], diff: "B", published: true },
  "2008-4": { title: "log と √ の共通接線と面積", topics: ["微分法", "積分法"], diff: "B", published: true },
  "2008-5": { title: "円に外接する円の最大個数", topics: ["図形と計量"], diff: "C", published: true },

  "2007-1": { title: "xe^x の接線と面積最小", topics: ["微分法", "積分法"], diff: "A", published: true },
  "2007-2": { title: "行列の漸化式と行列式の極限", topics: ["行列（旧課程）", "数列", "極限"], diff: "B", published: true },
  "2007-3": { title: "球面上の点と四面体の最大体積", topics: ["空間図形", "ベクトル"], diff: "B", published: true },
  "2007-4": { title: "さいころと2次方程式の有理数解", topics: ["確率", "整数"], diff: "A", published: true },
  "2007-5": { title: "|sin mx|sin nx の基本周期", topics: ["関数・方程式", "整数"], diff: "C", published: true },

  "2006-1": { title: "log x / x = 1/(3n) の解の評価", topics: ["微分法", "極限"], diff: "A", published: true },
  "2006-2": { title: "交点ベクトルと垂線の足", topics: ["ベクトル"], diff: "A", published: true },
  "2006-3": { title: "漸化式と3の倍数・互いに素", topics: ["整数", "数列"], diff: "B", published: true },
  "2006-4": { title: "二重絶対値の sin と積分", topics: ["積分法", "関数・方程式"], diff: "B", published: true },
  "2006-5": { title: "4x(1−x) の不変区間", topics: ["関数・方程式", "式と証明"], diff: "C", published: true },

  "2005-1": { title: "2sin x の接線と回転体の体積", topics: ["微分法", "積分法"], diff: "A", published: true },
  "2005-2": { title: "行列とベクトルの漸化式", topics: ["行列（旧課程）", "数列"], diff: "A", published: true },
  "2005-3": { title: "2次方程式の虚数解の軌跡", topics: ["複素数平面"], diff: "B", published: true },
  "2005-4": { title: "ガウス記号と三角・対数不等式", topics: ["関数・方程式", "整数"], diff: "B", published: true },
  "2005-5": { title: "媒介変数曲線の面積 S(a)", topics: ["積分法", "微分法"], diff: "A", published: true },

  "2004-1": { title: "積分漸化式と Σ(−2)^k/k!", topics: ["積分法", "極限", "数列"], diff: "B", published: true },
  "2004-2": { title: "対称行列 A^n と二項定理", topics: ["行列（旧課程）", "極限"], diff: "A", published: true },
  "2004-3": { title: "リサジュー曲線（8の字）の面積", topics: ["式と曲線", "積分法"], diff: "B", published: true },
  "2004-4": { title: "三角柱内の四面体の最大体積", topics: ["空間図形", "ベクトル"], diff: "B", published: true },
  "2004-5": { title: "電球の色の変化回数", topics: ["確率", "場合の数"], diff: "A", published: true },
};
