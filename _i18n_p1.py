# -*- coding: utf-8 -*-
import os

ROOT = "/Users/javohir/strawberryboo-site"
base_path = os.path.join(ROOT, "src/layouts/Base.astro")
tg_path = os.path.join(ROOT, "src/components/TelegramCTA.astro")
home_path = os.path.join(ROOT, "src/pages/index.astro")


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)


def apply(s, pairs, label):
    changed = 0
    for old, new in pairs:
        if old in s:
            cnt = s.count(old)
            s = s.replace(old, new)
            changed += cnt
        else:
            print("  !! MISS in %s: %r" % (label, old[:70]))
    print("  %s: %d replacements" % (label, changed))
    return s


# ---------- Base.astro markup ----------
base_pairs = [
    ('href="/" class={lang===\'uz\'?\'active\':\'\'}>UZ</a>', 'href="#" data-lang="uz" class={lang===\'uz\'?\'active\':\'\'}>UZ</a>'),
    ('href="/ru/" class={lang===\'ru\'?\'active\':\'\'}>RU</a>', 'href="#" data-lang="ru" class={lang===\'ru\'?\'active\':\'\'}>RU</a>'),
    ('href="/en/" class={lang===\'en\'?\'active\':\'\'}>EN</a>', 'href="#" data-lang="en" class={lang===\'en\'?\'active\':\'\'}>EN</a>'),
    ('>Bosh sahifa</a>', '><span data-i18n="nav.home">Bosh sahifa</span></a>'),
    ('>Kurslar</a>', '><span data-i18n="nav.courses">Kurslar</span></a>'),
    ('>Narxlar</a>', '><span data-i18n="nav.prices">Narxlar</span></a>'),
    ('>Kurs tanlash</a>', '><span data-i18n="nav.reco">Kurs tanlash</span></a>'),
    (">Mening yo'lim</a>", '><span data-i18n="nav.journey">Mening yo\'lim</span></a>'),
    (">Bog'lanish</a>", '><span data-i18n="nav.contact">Bog\'lanish</span></a>'),
    ('<a href="#main" class="skip-link">Asosiyga o\'tish</a>', '<a href="#main" class="skip-link" data-i18n="skip">Asosiyga o\'tish</a>'),
    ('<p>Amaliy onlayn kurslar: AI, IELTS, Admission va shaxsiy bilim bazasi. O\'zbek tilida, bepul kurslar ham bor.</p>',
     '<p data-i18n="footer.about">Amaliy onlayn kurslar: AI, IELTS, Admission va shaxsiy bilim bazasi. O\'zbek tilida, bepul kurslar ham bor.</p>'),
    ('<a href="#" aria-label="Telegram">Telegram</a>', '<a href="#" aria-label="Telegram" data-i18n="footer.social.tg">Telegram</a>'),
    ('<a href="#" aria-label="Instagram">Instagram</a>', '<a href="#" aria-label="Instagram" data-i18n="footer.social.ig">Instagram</a>'),
    ('<h4>Sahifalar</h4>', '<h4 data-i18n="footer.pages">Sahifalar</h4>'),
    ('<p class="footer-copy">© 2026 O\'rganamiz. Barcha huquqlar himoyalangan.</p>',
     '<p class="footer-copy" data-i18n="footer.copy">© 2026 O\'rganamiz. Barcha huquqlar himoyalangan.</p>'),
    ('<strong>Telegram kanalimizga qo\'shiling</strong>', '<strong data-i18n="tg.footer.title">Telegram kanalimizga qo\'shiling</strong>'),
    ('<span>Yangi kurslar, bepul materiallar va hamjamiyat — bitta joyda.</span>',
     '<span data-i18n="tg.footer.text">Yangi kurslar, bepul materiallar va hamjamiyat — bitta joyda.</span>'),
    ('<a href="#" class="tg-footer-btn">Kanalga qo\'shilish →</a>',
     '<a href="#" class="tg-footer-btn" data-i18n="tg.footer.btn">Kanalga qo\'shilish →</a>'),
]

old_script = '''    <script>
      const menuToggle = document.getElementById('menuToggle');
      const sidebar = document.querySelector('.sidebar');
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      // QADAM 5 — narx eslatmasi: har bir so'm ekvivalentiga kichik matn qo'shish
      document.querySelectorAll('.uzs').forEach(function (u) {
        if (/so'm/i.test(u.textContent) && !u.querySelector('.price-note')) {
          var n = document.createElement('span');
          n.className = 'price-note';
          n.textContent = "*taxminiy kurs, to'lov vaqtida aniqlashtiriladi";
          u.appendChild(n);
        }
      });
    </script>'''

new_script = '''    <script>
      const menuToggle = document.getElementById('menuToggle');
      const sidebar = document.querySelector('.sidebar');
      menuToggle.addEventListener('click', () => { sidebar.classList.toggle('open'); });

      // QADAM 5 — narx eslatmasi
      document.querySelectorAll('.uzs').forEach(function (u) {
        if (/so'm/i.test(u.textContent) && !u.querySelector('.price-note')) {
          var n = document.createElement('span');
          n.className = 'price-note';
          n.textContent = "*taxminiy kurs, to'lov vaqtida aniqlashtiriladi";
          u.appendChild(n);
        }
      });

      // === i18n: JSON dictionary + localStorage (QADAM 1) ===
      const I18N = {
        uz: {
          "skip": "Asosiyga o'tish",
          "nav.home": "Bosh sahifa",
          "nav.courses": "Kurslar",
          "nav.prices": "Narxlar",
          "nav.reco": "Kurs tanlash",
          "nav.journey": "Mening yo'lim",
          "nav.contact": "Bog'lanish",
          "footer.about": "Amaliy onlayn kurslar: AI, IELTS, Admission va shaxsiy bilim bazasi. O'zbek tilida, bepul kurslar ham bor.",
          "footer.social.tg": "Telegram",
          "footer.social.ig": "Instagram",
          "footer.pages": "Sahifalar",
          "footer.copy": "© 2026 O'rganamiz. Barcha huquqlar himoyalangan.",
          "tg.footer.title": "Telegram kanalimizga qo'shiling",
          "tg.footer.text": "Yangi kurslar, bepul materiallar va hamjamiyat — bitta joyda.",
          "tg.footer.btn": "Kanalga qo'shilish →",
          "tg.course.title": "Savolingiz bormi?",
          "tg.course.sub": "Telegram guruhimizda so'rang — jamoa va boshqa o'quvchilar yordam beradi.",
          "tg.course.btn": "Telegram guruhiga qo'shilish →",
          "hero.eyebrow": "AI · IELTS · Admission kurslari",
          "hero.learn": "O'rganing:",
          "cta.view": "Kurslarni ko'rish",
          "cta.which": "Qaysi kurs? →",
          "spot.badge": "Eng mashhur",
          "spot.more": "Batafsil →",
          "sec.courses": "Kurslarimiz",
          "sec.all": "Barchasini ko'rish",
          "btn.start": "Kursni boshlash →",
          "why.title": "Nega biz?",
          "why.1": "Amaliy — nazariya emas, qilish o'rganasiz",
          "why.2": "O'zbek tilida — tushunarli tushuntirish",
          "why.3": "Arzon — $19 dan boshlab",
          "why.4": "Forever access — bir marta sotib, doim foydalan",
          "why.5": "Har kursda sertifikat",
          "pay.title": "To'lov usullari",
          "pay.click": "Click",
          "pay.payme": "Payme",
          "pay.uzum": "Uzum",
          "pay.card": "Karta (UZS/USD)",
          "comm.title": "Community",
          "comm.heading": "Telegram kanalimizda bizga qo'shiling",
          "comm.text": "talaba bizning Telegram kanalimizda faol — savollar, yangiliklar va bepul materiallar bitta joyda.",
          "comm.join": "Telegram kanaliga qo'shilish →"
        },
        ru: {
          "skip": "Перейти к основному",
          "nav.home": "Главная",
          "nav.courses": "Курсы",
          "nav.prices": "Цены",
          "nav.reco": "Подобрать курс",
          "nav.journey": "Мой путь",
          "nav.contact": "Контакты",
          "footer.about": "Практические онлайн-курсы: AI, IELTS, Admission и личная база знаний. На узбекском, есть бесплатные курсы.",
          "footer.social.tg": "Telegram",
          "footer.social.ig": "Instagram",
          "footer.pages": "Страницы",
          "footer.copy": "© 2026 O'rganamiz. Все права защищены.",
          "tg.footer.title": "Подпишитесь на наш Telegram-канал",
          "tg.footer.text": "Новые курсы, бесплатные материалы и сообщество — в одном месте.",
          "tg.footer.btn": "Перейти к каналу →",
          "tg.course.title": "Есть вопрос?",
          "tg.course.sub": "Спрашивайте в нашей Telegram-группе — команда и другие ученики помогут.",
          "tg.course.btn": "Присоединиться к группе →",
          "hero.eyebrow": "Курсы AI · IELTS · Admission",
          "hero.learn": "Учите:",
          "cta.view": "Смотреть курсы",
          "cta.which": "Какой курс? →",
          "spot.badge": "Самый популярный",
          "spot.more": "Подробнее →",
          "sec.courses": "Наши курсы",
          "sec.all": "Смотреть все",
          "btn.start": "Начать курс →",
          "why.title": "Почему мы?",
          "why.1": "Практика — учитесь делать, а не теории",
          "why.2": "На узбекском — понятные объяснения",
          "why.3": "Дёшево — от $19",
          "why.4": "Forever access — купили один раз, пользуйтесь вечно",
          "why.5": "Сертификат в каждом курсе",
          "pay.title": "Способы оплаты",
          "pay.click": "Click",
          "pay.payme": "Payme",
          "pay.uzum": "Uzum",
          "pay.card": "Карта (UZS/USD)",
          "comm.title": "Сообщество",
          "comm.heading": "Присоединяйтесь к нашему Telegram-каналу",
          "comm.text": "учеников активны в нашем Telegram-канале — вопросы, новости и бесплатные материалы в одном месте.",
          "comm.join": "Присоединиться к каналу →"
        },
        en: {
          "skip": "Skip to main content",
          "nav.home": "Home",
          "nav.courses": "Courses",
          "nav.prices": "Pricing",
          "nav.reco": "Find your course",
          "nav.journey": "My journey",
          "nav.contact": "Contact",
          "footer.about": "Practical online courses: AI, IELTS, Admission and personal knowledge base. In Uzbek, free courses included.",
          "footer.social.tg": "Telegram",
          "footer.social.ig": "Instagram",
          "footer.pages": "Pages",
          "footer.copy": "© 2026 O'rganamiz. All rights reserved.",
          "tg.footer.title": "Join our Telegram channel",
          "tg.footer.text": "New courses, free materials and community — all in one place.",
          "tg.footer.btn": "Join channel →",
          "tg.course.title": "Got a question?",
          "tg.course.sub": "Ask in our Telegram group — the team and other students will help.",
          "tg.course.btn": "Join the group →",
          "hero.eyebrow": "AI · IELTS · Admission courses",
          "hero.learn": "Learn:",
          "cta.view": "View courses",
          "cta.which": "Which course? →",
          "spot.badge": "Most popular",
          "spot.more": "Details →",
          "sec.courses": "Our courses",
          "sec.all": "View all",
          "btn.start": "Start course →",
          "why.title": "Why us?",
          "why.1": "Practical — learn by doing, not theory",
          "why.2": "In Uzbek — clear explanations",
          "why.3": "Affordable — from $19",
          "why.4": "Forever access — buy once, use forever",
          "why.5": "Certificate in every course",
          "pay.title": "Payment methods",
          "pay.click": "Click",
          "pay.payme": "Payme",
          "pay.uzum": "Uzum",
          "pay.card": "Card (UZS/USD)",
          "comm.title": "Community",
          "comm.heading": "Join our Telegram channel",
          "comm.text": "students are active in our Telegram channel — questions, news and free materials in one place.",
          "comm.join": "Join the channel →"
        }
      };

      const LS_KEY = 'org-lam-lang';
      function applyLang(lang) {
        if (!I18N[lang]) lang = 'uz';
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
          var key = el.getAttribute('data-i18n');
          var t = (I18N[lang] && I18N[lang][key] != null) ? I18N[lang][key]
                : (I18N.uz[key] != null ? I18N.uz[key] : el.textContent);
          el.textContent = t;
        });
        document.querySelectorAll('[data-lang]').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
      }
      var savedLang = localStorage.getItem(LS_KEY) || 'uz';
      applyLang(savedLang);
      document.querySelectorAll('[data-lang]').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.preventDefault();
          var l = b.getAttribute('data-lang');
          localStorage.setItem(LS_KEY, l);
          applyLang(l);
        });
      });
    </script>'''

print("== Base.astro ==")
s = read(base_path)
s = apply(s, base_pairs, "base")
if old_script in s:
    s = s.replace(old_script, new_script)
    print("  base script replaced")
else:
    print("  !! base script NOT found")
write(base_path, s)

# ---------- TelegramCTA.astro ----------
print("== TelegramCTA.astro ==")
tg_pairs = [
    ('<p class="tg-title">Savolingiz bormi?</p>', '<p class="tg-title" data-i18n="tg.course.title">Savolingiz bormi?</p>'),
    ('<p class="tg-sub">Telegram guruhimizda so\'rang — jamoa va boshqa o\'quvchilar yordam beradi.</p>',
     '<p class="tg-sub" data-i18n="tg.course.sub">Telegram guruhimizda so\'rang — jamoa va boshqa o\'quvchilar yordam beradi.</p>'),
    ('<a href="#" class="tg-btn">Telegram guruhiga qo\'shilish →</a>',
     '<a href="#" class="tg-btn" data-i18n="tg.course.btn">Telegram guruhiga qo\'shilish →</a>'),
]
s = read(tg_path)
s = apply(s, tg_pairs, "tg")
write(tg_path, s)

# ---------- index.astro ----------
print("== index.astro ==")
home_pairs = [
    ('<span class="eyebrow">AI · IELTS · Admission kurslari</span>',
     '<span class="eyebrow" data-i18n="hero.eyebrow">AI · IELTS · Admission kurslari</span>'),
    ('<span class="typed-static">O\'rganing:</span>', '<span class="typed-static" data-i18n="hero.learn">O\'rganing:</span>'),
    ('Kurslarni ko\'rish', '<span data-i18n="cta.view">Kurslarni ko\'rish</span>'),
    ('Qaysi kurs? →', '<span data-i18n="cta.which">Qaysi kurs? →</span>'),
    ('Eng mashhur', '<span data-i18n="spot.badge">Eng mashhur</span>'),
    ('Batafsil →', '<span data-i18n="spot.more">Batafsil →</span>'),
    ('Kurslarimiz', '<span data-i18n="sec.courses">Kurslarimiz</span>'),
    ('Barchasini ko\'rish', '<span data-i18n="sec.all">Barchasini ko\'rish</span>'),
    ('Kursni boshlash →', '<span data-i18n="btn.start">Kursni boshlash →</span>'),
    ('Nega biz?', '<span data-i18n="why.title">Nega biz?</span>'),
    ('To\'lov usullari', '<span data-i18n="pay.title">To\'lov usullari</span>'),
    ('Click', '<span data-i18n="pay.click">Click</span>'),
    ('Payme', '<span data-i18n="pay.payme">Payme</span>'),
    ('Uzum', '<span data-i18n="pay.uzum">Uzum</span>'),
    ('Karta (UZS/USD)', '<span data-i18n="pay.card">Karta (UZS/USD)</span>'),
    ('<li>Amaliy — nazariya emas, qilish o\'rganasiz</li>', '<li data-i18n="why.1">Amaliy — nazariya emas, qilish o\'rganasiz</li>'),
    ('<li>O\'zbek tilida — tushunarli tushuntirish</li>', '<li data-i18n="why.2">O\'zbek tilida — tushunarli tushuntirish</li>'),
    ('<li>Arzon — $19 dan boshlab</li>', '<li data-i18n="why.3">Arzon — $19 dan boshlab</li>'),
    ('<li>Forever access — bir marta sotib, doim foydalan</li>', '<li data-i18n="why.4">Forever access — bir marta sotib, doim foydalan</li>'),
    ('<li>Har kursda sertifikat</li>', '<li data-i18n="why.5">Har kursda sertifikat</li>'),
    ('Community', '<span data-i18n="comm.title">Community</span>'),
    ('<h3>Telegram kanalimizda bizga qo\'shiling</h3>', '<h3 data-i18n="comm.heading">Telegram kanalimizda bizga qo\'shiling</h3>'),
    (' talaba bizning Telegram kanalimizda faol — savollar, yangiliklar va bepul materiallar bitta joyda.',
     ' <span data-i18n="comm.text">talaba bizning Telegram kanalimizda faol — savollar, yangiliklar va bepul materiallar bitta joyda.</span>'),
    ('<a href="#" class="comm-join">Telegram kanaliga qo\'shilish →</a>',
     '<a href="#" class="comm-join" data-i18n="comm.join">Telegram kanaliga qo\'shilish →</a>'),
]
s = read(home_path)
s = apply(s, home_pairs, "home")
write(home_path, s)

print("DONE")
