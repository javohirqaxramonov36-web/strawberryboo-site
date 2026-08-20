#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase 2 i18n for course 12 — Tekin AI (ta.*)."""

PAGE = "src/pages/kurslar/tekin-ai.astro"
BASE = "src/layouts/Base.astro"

with open(PAGE, encoding="utf-8") as f:
    p = f.read()

repls = [
    (r'''<p class="lead">''',
     r'''<p class="lead" data-i18n="ta.lead">'''),
    (r'''<h2>Vositalar ro'yxati</h2>''',
     r'''<h2 data-i18n="ta.modules">Vositalar ro'yxati</h2>'''),
    (r'''<li>Ollama — local AI model (llama3.2)</li>''',
     r'''<li data-i18n="ta.mod1">Ollama — local AI model (llama3.2)</li>'''),
    (r'''<li>CrewAI — jamoa agent'lari</li>''',
     r'''<li data-i18n="ta.mod2">CrewAI — jamoa agent'lari</li>'''),
    (r'''<li>LangGraph — orchestration</li>''',
     r'''<li data-i18n="ta.mod3">LangGraph — orchestration</li>'''),
    (r'''<li>Letta / MemGPT — xotira</li>''',
     r'''<li data-i18n="ta.mod4">Letta / MemGPT — xotira</li>'''),
    (r'''<li>Obsidian + Strawberryboo — capture</li>''',
     r'''<li data-i18n="ta.mod5">Obsidian + Strawberryboo — capture</li>'''),
    (r'''<li>Obsidian'dagi 17 ta AI agent haqida notalar</li>''',
     r'''<li data-i18n="ta.mod6">Obsidian'dagi 17 ta AI agent haqida notalar</li>'''),
    (r'''<a href="/kurslar" class="enroll">← Barcha kurslar</a>''',
     r'''<a href="/kurslar" class="enroll" data-i18n="ta.all">← Barcha kurslar</a>'''),
    (r'''<Quiz title="O'z bilimingizni tekshiring" questions={questions} />''',
     r'''<Quiz titleI18n="ta.quizTitle" questions={questions} />'''),
]

for old, new in repls:
    if old not in p:
        print("WARN page not found:", repr(old[:60]))
    else:
        p = p.replace(old, new, 1)

with open(PAGE, "w", encoding="utf-8") as f:
    f.write(p)
print("PAGE edits done")

with open(BASE, encoding="utf-8") as f:
    b = f.read()

uz = r'''          "comm.join": "Telegram kanaliga qo'shilish →",
          "ta.lead": "Pul sarflamasdan, o'z MacBook'ingizda ishlaydigan AI vositalari. Hamma narsa offline (internet shimsiz) ishlaydi.",
          "ta.modules": "Vositalar ro'yxati",
          "ta.mod1": "Ollama — local AI model (llama3.2)",
          "ta.mod2": "CrewAI — jamoa agent'lari",
          "ta.mod3": "LangGraph — orchestration",
          "ta.mod4": "Letta / MemGPT — xotira",
          "ta.mod5": "Obsidian + Strawberryboo — capture",
          "ta.mod6": "Obsidian'dagi 17 ta AI agent haqida notalar",
          "ta.all": "← Barcha kurslar",
          "ta.quizTitle": "O'z bilimingizni tekshiring",'''

ru = r'''          "comm.join": "Присоединиться к каналу →",
          "ta.lead": "AI-инструменты, которые работают прямо на вашем MacBook, без затрат. Всё работает офлайн (без интернета).",
          "ta.modules": "Список инструментов",
          "ta.mod1": "Ollama — локальная AI-модель (llama3.2)",
          "ta.mod2": "CrewAI — командные агенты",
          "ta.mod3": "LangGraph — оркестрация",
          "ta.mod4": "Letta / MemGPT — память",
          "ta.mod5": "Obsidian + Strawberryboo — захват",
          "ta.mod6": "Заметки об 17 AI-агентах в Obsidian",
          "ta.all": "← Все курсы",
          "ta.quizTitle": "Проверьте свои знания",'''

en = r'''          "comm.join": "Join the channel →",
          "ta.lead": "AI tools that run right on your MacBook, with zero cost. Everything works offline (no internet needed).",
          "ta.modules": "Tool list",
          "ta.mod1": "Ollama — local AI model (llama3.2)",
          "ta.mod2": "CrewAI — team agents",
          "ta.mod3": "LangGraph — orchestration",
          "ta.mod4": "Letta / MemGPT — memory",
          "ta.mod5": "Obsidian + Strawberryboo — capture",
          "ta.mod6": "Notes on 17 AI agents in Obsidian",
          "ta.all": "← All courses",
          "ta.quizTitle": "Check your knowledge",'''

anchors = [
    (r'''          "comm.join": "Telegram kanaliga qo'shilish →",''', uz),
    (r'''          "comm.join": "Присоединиться к каналу →",''', ru),
    (r'''          "comm.join": "Join the channel →",''', en),
]

for anchor, block in anchors:
    if anchor not in b:
        print("WARN base anchor not found:", repr(anchor[:40]))
    else:
        b = b.replace(anchor, block, 1)

with open(BASE, "w", encoding="utf-8") as f:
    f.write(b)
print("BASE dict inserts done")
