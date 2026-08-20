# -*- coding: utf-8 -*-
import os, re

ROOT = "/Users/javohir/strawberryboo-site"
files = [
    os.path.join(ROOT, "src/layouts/Base.astro"),
    os.path.join(ROOT, "src/components/TelegramCTA.astro"),
    os.path.join(ROOT, "src/pages/index.astro"),
]

# Collapse nested identical data-i18n spans:
# <span data-i18n="K"><span data-i18n="K">TEXT</span></span> -> <span data-i18n="K">TEXT</span>
pattern = re.compile(r'<span data-i18n="([^"]+)"><span data-i18n="\1">([\s\S]*?)</span></span>')

for p in files:
    with open(p, encoding="utf-8") as f:
        s = f.read()
    before = s.count("data-i18n")
    prev = None
    while prev != s:
        prev = s
        s = pattern.sub(r'<span data-i18n="\1">\2</span>', s)
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)
    after = s.count("data-i18n")
    print("%s: before=%d after=%d" % (os.path.basename(p), before, after))
print("DONE")
