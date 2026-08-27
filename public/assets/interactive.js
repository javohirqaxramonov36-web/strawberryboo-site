/* =========================================================
   Tayanch — interactive.js
   Scroll animatsiyasi + interaktiv "Kurs tanlash" testi.
   Toza Vanilla JavaScript — hech qanday tashqi kutubxona yo'q.
   ========================================================= */

function initInteractive() {
  /* ---- 1. Scroll paydo bo'lishi (data-fade-on-scroll orqali) ---- */
  var fadeEls = document.querySelectorAll('[data-fade-on-scroll]');
  if (fadeEls.length) {
    if (!('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) {
        el.classList.add('fade-in-on-scroll', 'visible');
      });
    } else {
      fadeEls.forEach(function (el) {
        el.classList.add('fade-in-on-scroll');
      });
      var fadeIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('visible');
            fadeIO.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      fadeEls.forEach(function (el) {
        fadeIO.observe(el);
      });
    }
  }

  /* ---- 2. Interaktiv "Kurs tanlash" testi ---- */
  var form = document.getElementById('recoForm');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.reco-step'));
  if (!steps.length) return;

  var total = steps.length;
  var idx = 0;
  var bar = document.getElementById('recoProgressBar');
  var label = document.getElementById('recoProgressLabel');
  var result = document.getElementById('recoResult');
  var nextBtn = document.getElementById('recoBtn');
  var prevBtn = document.getElementById('recoPrev');
  var COURSES = window.TAYANCH_COURSES || {};
  var recoLang = form.getAttribute('data-reco-lang') || 'uz';
  var combinedCopy = {
    uz: { title: 'Umumiy tavsiya', text: 'Daraja testi va maqsad asosidagi tavsiyalar bir joyda.', cefr: 'CEFR darajangiz', finder: 'Maqsad asosidagi tavsiya', takePlacement: 'CEFR testini ishlash →', open: 'Kursni ochish →' },
    ru: { title: 'Общая рекомендация', text: 'Результат теста уровня и рекомендация по цели собраны вместе.', cefr: 'Ваш уровень CEFR', finder: 'Рекомендация по цели', takePlacement: 'Пройти тест уровня CEFR →', open: 'Открыть курс →' },
    en: { title: 'Combined recommendation', text: 'Your level-test result and goal-based recommendation in one place.', cefr: 'Your CEFR level', finder: 'Goal-based recommendation', takePlacement: 'Take the CEFR level test →', open: 'Open course →' }
  }[recoLang] || null;

  function readPlacementResult() {
    try { return JSON.parse(localStorage.getItem('tayanch.placement-test.v1') || 'null'); } catch (_) { return null; }
  }

  function placementUrl() {
    return window.location.pathname.replace(/kurs-tanlash\/?$/, 'daraja-testi/');
  }

  function saveCourseSelection(course) {
    try {
      localStorage.setItem('tayanch.course-selection.v1', JSON.stringify({
        slug: course.key,
        title: COURSES[course.key].title,
        url: COURSES[course.key].url,
        score: course.score,
        label: combinedCopy.finder,
        date: new Date().toISOString()
      }));
    } catch (_) {}
  }

  function appendCombinedRecommendation(container, ranked) {
    if (!container || !combinedCopy) return;
    var box = document.createElement('div');
    box.className = 'reco-combined';
    var title = document.createElement('strong');
    title.textContent = combinedCopy.title;
    var text = document.createElement('p');
    text.textContent = combinedCopy.text;
    box.append(title, text);

    var placement = readPlacementResult();
    if (placement && placement.level) {
      var level = document.createElement('span');
      level.textContent = combinedCopy.cefr + ': ' + placement.level;
      box.append(level);
      if (placement.recommendedCourse && placement.recommendedCourse.url) {
        var placementLink = document.createElement('a');
        placementLink.href = placement.recommendedCourse.url;
        placementLink.textContent = placement.recommendedCourse.title + ' — ' + combinedCopy.open;
        box.append(placementLink);
      }
    } else {
      var placementLink = document.createElement('a');
      placementLink.href = placementUrl();
      placementLink.textContent = combinedCopy.takePlacement;
      box.append(placementLink);
    }

    if (ranked && ranked[0] && COURSES[ranked[0].key]) {
      var finderLabel = document.createElement('span');
      finderLabel.textContent = combinedCopy.finder + ':';
      var finderLink = document.createElement('a');
      finderLink.href = COURSES[ranked[0].key].url;
      finderLink.textContent = COURSES[ranked[0].key].title + ' — ' + combinedCopy.open;
      box.append(finderLabel, finderLink);
    }
    container.appendChild(box);
  }

  /* Har javob variantidagi data-points: "course:ball,other:ball" → obyekt */
  function scoreFor(opt) {
    var pts = opt.getAttribute('data-points');
    if (!pts) return null;
    var map = {};
    pts.split(',').forEach(function (pair) {
      var p = pair.split(':');
      if (!p[0]) return;
      map[p[0].trim()] = parseInt(p[1], 10) || 1;
    });
    return map;
  }

  function currentAnswer() {
    return steps[idx].querySelector('input:checked');
  }

  function render() {
    steps.forEach(function (s, i) {
      s.classList.toggle('is-active', i === idx);
    });
    var answered = steps.filter(function (s) {
      return s.querySelector('input:checked');
    }).length;
    if (bar) bar.style.width = (answered / total * 100) + '%';
    if (label) label.textContent = (idx + 1) + '/' + total;
    if (prevBtn) prevBtn.hidden = idx === 0;
    if (nextBtn) {
      var last = idx === total - 1;
      nextBtn.textContent = last ? 'Natijani ko\'rsat →' : 'Keyingi →';
      nextBtn.disabled = !currentAnswer();
    }
  }

  function go(delta) {
    idx = Math.max(0, Math.min(total - 1, idx + delta));
    render();
  }

  function compute() {
    var scores = {};
    steps.forEach(function (s) {
      var checked = s.querySelector('input:checked');
      if (!checked) return;
      var opt = checked.closest('.reco-opt');
      var map = scoreFor(opt) || {};
      map[checked.value] = (map[checked.value] || 0) + 1;
      Object.keys(map).forEach(function (k) {
        scores[k] = (scores[k] || 0) + map[k];
      });
    });

    var ranked = Object.keys(scores)
      .filter(function (k) { return COURSES[k]; })
      .map(function (k) { return { key: k, score: scores[k] }; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 2);

    if (!ranked.length) {
      alert('Iltimos, kamida bitta savolga javob bering.');
      return;
    }

    if (result) {
      var html = '<h3>Sizga eng mos kurs' + (ranked.length > 1 ? 'lar' : '') + '</h3>';
      html += '<div class="reco-result-list">';
      ranked.forEach(function (r, i) {
        var c = COURSES[r.key];
        html += '<a class="reco-result-card" href="' + c.url + '" style="--c:' + c.color + '">';
        html += '<span class="rc-dot" style="background:' + c.color + '"></span>';
        html += '<span class="rc-body"><strong>' + c.title + '</strong><span>' + c.desc + '</span></span>';
        html += '<span class="rc-rank">' + (i === 0 ? 'Eng mos' : 'Muqobil') + '</span>';
        html += '</a>';
      });
      html += '</div>';
      result.innerHTML = html;
      result.style.borderColor = COURSES[ranked[0].key].color || '';
      saveCourseSelection(ranked[0]);
      appendCombinedRecommendation(result, ranked);
      result.classList.add('show');
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /* Javob tanlanganda avtomatik keyingi savolga o'tish */
  steps.forEach(function (s, i) {
    s.querySelectorAll('.reco-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        s.querySelectorAll('.reco-opt').forEach(function (o) {
          o.classList.remove('sel');
        });
        opt.classList.add('sel');
        var inp = opt.querySelector('input');
        if (inp) inp.checked = true;
        render();
        setTimeout(function () {
          if (i === total - 1) {
            compute();
          } else {
            idx = i + 1;
            render();
          }
        }, 350);
      });
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (idx === total - 1) compute();
      else go(1);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', function () { go(-1); });
  }

  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractive);
} else {
  initInteractive();
}
