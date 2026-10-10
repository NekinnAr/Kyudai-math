#!/usr/bin/env python3
"""
新しい解説記事の雛形を作成するスクリプト

使い方:
    python3 tools/new_article.py 2024 3

  → pages/2024_3.html をテンプレートから作成します。
    その後 assets/js/data.js の PROBLEMS に
        "2024-3": { title: "...", topics: ["..."], diff: "B", published: true },
    を追記すると、一覧表から公開されます。
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    year, num = sys.argv[1], sys.argv[2]
    if not (year.isdigit() and num.isdigit()):
        sys.exit("年度と問題番号は数字で指定してください（例: 2024 3）")

    template = (ROOT / "pages" / "_template.html").read_text(encoding="utf-8")
    out = ROOT / "pages" / f"{year}_{num}.html"
    if out.exists():
        sys.exit(f"既に存在します: {out.relative_to(ROOT)}")

    html = (template.replace("{{ID}}", f"{year}-{num}")
                    .replace("{{YEAR}}", year)
                    .replace("{{NUM}}", num))
    out.write_text(html, encoding="utf-8")

    print(f"作成しました: {out.relative_to(ROOT)}")
    print("次に assets/js/data.js の PROBLEMS に以下を追記（または更新）してください:")
    print(f'  "{year}-{num}": {{ title: "", topics: [""], diff: "", published: true }},')
    print("UPDATES にも更新ログを追加しておくと、トップページに表示されます。")


if __name__ == "__main__":
    main()
