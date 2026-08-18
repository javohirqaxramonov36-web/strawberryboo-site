#!/usr/bin/env python3
"""
sync_obsidian_link.py — Sayt har safar yangilanganda (yangi deploy) Obsidian'dagi
"Jonli sayt.md" notasini avtomatik yangilash.

Nima qiladi:
  1. GitHub API orqali `main` ga push qilingan eng so'nggi commit SHA ni oladi.
  2. Obsidian notasidagi `last_deploy_sha` (frontmatter) bilan solishtiradi.
  3. Farq bo'lsa — notani yangilaydi:
       - frontmatter: `updated` va `last_deploy_sha` qiymatlari
       - oxiriga avtomatik "So'nggi deploy" bloki (vaqt + SHA + jonli link)
  4. Farq bo'lmasa — hech narsa qilmaydi (xitoyiga tegmaydi).

Foydalanish:
  python3 scripts/sync_obsidian_link.py
  # ixtiyoriy: qo'lda yangilashni majburlamasdan faqat tekshirish
  python3 scripts/sync_obsidian_link.py --check

Hech qanday maxfiy ma'lumot talab qilmaydi; deploy holatini `git ls-remote`
orqali aniqlaydi (rate-limit ga uchramaydi, SSH-kalit orqali ishlaydi).

Asosiy manzil (project page):
  https://javohirqaxramonov36-web.github.io/strawberryboo-site/
"""

import sys
import subprocess
import re
from datetime import datetime, timezone, timedelta

REPO_DIR = "/Users/javohir/strawberryboo-site"
NOTE_PATH = "/Users/javohir/Documents/Obsidian Vault/22.G'oya sot/sayt/Jonli sayt.md"
LIVE_URL = "https://javohirqaxramonov36-web.github.io/strawberryboo-site/"
MARK_START = "<!-- AUTOSYNC:DEPLOY -->"
MARK_END = "<!-- /AUTOSYNC:DEPLOY -->"

TZ5 = timezone(timedelta(hours=5))


def log(msg):
    print(msg, flush=True)


def get_latest_sha():
    """`main` ga push qilingan eng so'nggi commit SHA sini qaytaradi.

    GitHub API ochiq repo uchun soatsiga 60 ta limitga ega (tez tugaydi),
    shuning uchun `git ls-remote` ishlatiladi — autentifikatsiya/kimyo talab
    qilmaydi va rate-limit ga uchramaydi.
    """
    out = subprocess.run(
        ["git", "-C", REPO_DIR, "ls-remote", "origin", "main"],
        capture_output=True, text=True, timeout=30,
    )
    if out.returncode != 0:
        raise RuntimeError("git ls-remote xatosi: " + (out.stderr.strip() or "noma'lum"))
    line = out.stdout.strip().splitlines()
    if not line:
        raise RuntimeError("git ls-remote bo'sh javob qaytardi")
    sha = line[0].split()[0]
    if not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise RuntimeError("noto'g'ri SHA formati: " + sha)
    return sha


def now_str():
    return datetime.now(TZ5).strftime("%Y-%m-%d %H:%M GMT+5")


def read_note():
    try:
        with open(NOTE_PATH, encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return None


def parse_frontmatter(text):
    """Frontmatter (--- ... ---) ni ajratib oladi. Yo'q bo'lsa (None, text)."""
    if text is None:
        return None, ""
    if not text.startswith("---"):
        return None, text
    # ikkinchi --- ni topamiz
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", text, re.DOTALL)
    if not m:
        return None, text
    return m.group(1), m.group(2)


def set_frontmatter_field(fm, key, value):
    """Frontmatter matnida `key: value` ni almashtiradi yoki qo'shadi."""
    lines = fm.split("\n")
    for i, line in enumerate(lines):
        if re.match(r"^%s\s*:" % re.escape(key), line):
            lines[i] = f"{key}: {value}"
            return "\n".join(lines)
    # topilmadi — `updated` dan keyin qo'shamiz (yoki oxiriga)
    for i, line in enumerate(lines):
        if re.match(r"^updated\s*:", line):
            lines.insert(i + 1, f"{key}: {value}")
            return "\n".join(lines)
    lines.append(f"{key}: {value}")
    return "\n".join(lines)


def build_deploy_block(sha, ts):
    short = sha[:7]
    return (
        f"{MARK_START}\n"
        f"## So'nggi deploy (avtomatik sinxron)\n\n"
        f"Oxirgi marta yangilandi: **{ts}**\n\n"
        f"Deploy commit (`main`): `{short}`\n\n"
        f"Jonli manzil: {LIVE_URL}\n"
        f"{MARK_END}\n"
    )


def update_note(full_text, sha):
    ts = now_str()
    short = sha[:7]
    fm, body = parse_frontmatter(full_text)
    if fm is None:
        # frontmatter yo'q — yangi yaratamiz
        fm = "folder: 22.G'oya sot/sayt\nconnected: true"
        body = full_text or ""

    fm = set_frontmatter_field(fm, "updated", ts)
    fm = set_frontmatter_field(fm, "last_deploy_sha", short)

    # Avtomatik deploy blokini yangilash (marker ichidagi qismni almashtirish)
    block = build_deploy_block(sha, ts)
    if MARK_START in body:
        # eski blokni (START...END) yangisi bilan almashtiramiz
        body = re.sub(
            re.escape(MARK_START) + r".*?" + re.escape(MARK_END) + r"\n?",
            block,
            body,
            flags=re.DOTALL,
        )
    else:
        if not body.endswith("\n"):
            body += "\n"
        body += "\n" + block

    new_text = f"---\n{fm}\n---\n{body}"
    with open(NOTE_PATH, "w", encoding="utf-8") as f:
        f.write(new_text)
    return short, ts


def recorded_sha(full_text):
    fm, _ = parse_frontmatter(full_text)
    if not fm:
        return None
    m = re.search(r"^last_deploy_sha\s*:\s*(\S+)", fm, re.MULTILINE)
    return m.group(1) if m else None


def main():
    check_only = "--check" in sys.argv

    full_text = read_note()
    if full_text is None:
        log(f"[sync] Ogohlantirish: nota topilmadi ({NOTE_PATH}). Yangi nota yaratiladi.")
        full_text = ""

    try:
        latest = get_latest_sha()
    except Exception as e:
        log(f"[sync] XATO: GitHub API dan SHA olinmadi — {e}")
        sys.exit(1)

    prev = recorded_sha(full_text)

    if prev == latest[:7]:
        log(f"[sync] O'zgarish yo'q. Deploy ({latest[:7]}) allaqachon qayd etilgan. Hech narsa qilinmadi.")
        return

    if check_only:
        log(f"[sync] O'zgarish aniqlandi: {prev} -> {latest[:7]} (--check: yozilmadi).")
        return

    short, ts = update_note(full_text, latest)
    log(f"[sync] Yangilandi: {prev} -> {short} | {ts}")
    log(f"[sync] Jonli manzil: {LIVE_URL}")


if __name__ == "__main__":
    main()
