// The flip reader, shared by the v3 WebGL scene.
// Adapted from the v2 page: the 3D book mesh performs the fly-out, so this module
// only owns the spread, the page turn and the chapter tabs.
(function () {
  'use strict';

  var BOOKS = window.LL_BOOKS;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = function () { return window.innerWidth < 900; };
  var state = { read: {}, answers: {} };
  function $(id) { return document.getElementById(id); }
  function persist() {}

  // ---------- Page block renderers ----------

  function renderProse(b) {
    return '<p class="page-kicker">' + (b.kicker || '') + '</p><h3>' + b.heading + '</h3>' +
      b.paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join('');
  }

  function renderPullquote(b) {
    return '<p class="pullquote">' + b.quote + '</p><ul class="numbered-list">' +
      b.list.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
  }

  function renderSplitbar(b) {
    var bar = b.segments.map(function (s) {
      return '<div class="splitbar-seg" style="width:' + s.pct + '%;background:' + s.color + '">' + s.pct + '%</div>';
    }).join('');
    var legend = b.segments.map(function (s) {
      return '<span><span class="legend-dot" style="background:' + s.color + '"></span>' + s.label + '</span>';
    }).join('');
    return '<p class="page-kicker">How it works</p><h3>' + b.heading + '</h3>' +
      '<div class="splitbar">' + bar + '</div><div class="splitbar-legend">' + legend + '</div>';
  }

  function renderTable(b) {
    var head = '<tr>' + b.columns.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>';
    var rows = b.rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    }).join('');
    var note = b.note ? '<p style="margin-top:.8rem;font-size:.8rem;font-style:italic;">' + b.note + '</p>' : '';
    return '<p class="page-kicker">How it works</p><h3>' + b.heading + '</h3>' +
      '<table class="data-table"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>' + note;
  }

  function renderBarchart(b) {
    var max = b.max || Math.max.apply(null, b.bars.map(function (x) { return x.value; }));
    var bars = b.bars.map(function (x) {
      var h = Math.max(6, Math.round((x.value / max) * 100));
      return '' +
        '<div class="barchart-col">' +
          '<span class="barchart-value">' + (x.display || x.value) + '</span>' +
          '<div class="barchart-bar" style="height:' + h + '%"></div>' +
          '<span class="barchart-label">' + x.label + '</span>' +
        '</div>';
    }).join('');
    var caption = b.caption ? '<p class="barchart-caption">' + b.caption + '</p>' : '';
    return '<p class="page-kicker">Worked example</p><h3>' + b.heading + '</h3><div class="barchart">' + bars + '</div>' + caption;
  }

  function renderLedger(b) {
    var rows = b.rows.map(function (r) {
      return '<div class="ledger-row' + (r.isTotal ? ' is-total' : '') + '"><span>' + r.label + '</span><span>' + r.value + '</span></div>';
    }).join('');
    var caption = b.caption ? '<p class="ledger-caption">' + b.caption + '</p>' : '';
    return '<p class="page-kicker">Worked example</p><h3>' + b.heading + '</h3><div class="ledger">' + rows + '</div>' + caption;
  }

  function renderToolkit(b) {
    return '<p class="page-kicker">Toolkit</p><h3>' + b.heading + '</h3><ol class="toolkit-list">' +
      b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
  }

  function renderGlossary(b) {
    return '<p class="page-kicker">Glossary</p><h3>' + b.heading + '</h3><ul class="glossary-list">' +
      b.terms.map(function (t) { return '<li><span class="glossary-term">' + t.term + '</span><span class="glossary-def">' + t.def + '</span></li>'; }).join('') + '</ul>';
  }

  function renderQuestion(b, side) {
    return '' +
      '<div class="question-block">' +
        '<p class="page-kicker">Check yourself</p>' +
        '<p class="question-prompt">' + b.prompt + '</p>' +
        '<ul class="option-list">' +
          b.options.map(function (opt, i) {
            return '<li><button type="button" class="option-btn" data-side="' + side + '" data-index="' + i + '">' + opt + '</button></li>';
          }).join('') +
        '</ul>' +
        '<div class="answer-explanation" hidden></div>' +
      '</div>';
  }


  // ---------- scenario, resource link, written answer ----------

  function renderScenario(b) {
    var facts = (b.facts || []).map(function (f) {
      return '<div class="ledger-row' + (f.isTotal ? ' is-total' : '') + '"><span>' + f.label + '</span><span>' + f.value + '</span></div>';
    }).join('');
    return '<p class="page-kicker">' + (b.kicker || 'Scenario') + '</p><h3>' + b.heading + '</h3>' +
      '<div class="scenario-card">' +
        b.paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        (facts ? '<div class="ledger scenario-facts">' + facts + '</div>' : '') +
      '</div>';
  }

  function renderResource(b) {
    return '<p class="page-kicker">' + (b.kicker || 'Template') + '</p><h3>' + b.heading + '</h3>' +
      '<p>' + b.body + '</p>' +
      '<a class="resource-link" href="' + b.href + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="resource-icon" aria-hidden="true">&#8599;</span>' +
        '<span class="resource-text"><span class="resource-title">' + b.linkText + '</span>' +
        '<span class="resource-sub">' + b.linkSub + '</span></span>' +
      '</a>';
  }

  function renderWritten(b, side) {
    return '' +
      '<div class="written-block" data-side="' + side + '">' +
        '<p class="page-kicker">Write your answer</p>' +
        '<p class="question-prompt">' + b.prompt + '</p>' +
        (b.hint ? '<p class="written-hint">' + b.hint + '</p>' : '') +
        '<textarea class="written-input" rows="6" spellcheck="true" ' +
          'placeholder="Write a few sentences in your own words&hellip;"></textarea>' +
        '<button type="button" class="written-check">Compare with the example</button>' +
        '<div class="written-result" hidden></div>' +
      '</div>';
  }

  // ---------- similarity marking ----------
  // Compares the wording of an answer against a sample answer. It measures
  // overlap, not correctness — a good answer phrased differently will score
  // lower, which is why the example and the missed ideas are always shown.

  var STOPWORDS = ('a an and are as at be because been but by can could do does for from had has have how i if in into is it its just like may more most much must of on or over own she he they them their there this that the to too under until up very was way we were what when where which while who why will with would your you').split(' ');
  var STOP = {};
  for (var si = 0; si < STOPWORDS.length; si++) STOP[STOPWORDS[si]] = true;

  function stem(w) { return w.replace(/(ings|ing|ies|ed|es|s)$/, ''); }

  function contentWords(text) {
    return String(text).toLowerCase()
      .replace(/[^a-z0-9\s']/g, ' ')
      .split(/\s+/)
      .filter(function (w) { return w.length > 2 && !STOP[w]; })
      .map(stem);
  }

  function uniq(list) {
    var seen = {}, out = [];
    for (var i = 0; i < list.length; i++) if (!seen[list[i]]) { seen[list[i]] = 1; out.push(list[i]); }
    return out;
  }

  function bigrams(list) {
    var out = [];
    for (var i = 0; i < list.length - 1; i++) out.push(list[i] + ' ' + list[i + 1]);
    return out;
  }

  function scoreAnswer(response, block) {
    var respWords = contentWords(response);
    var respSet = {};
    for (var i = 0; i < respWords.length; i++) respSet[respWords[i]] = true;

    // The author's keywords are the ideas that matter; fall back to the example.
    var ideas = block.keywords && block.keywords.length ? block.keywords : uniq(contentWords(block.example));
    var hit = [], missed = [];
    for (var k = 0; k < ideas.length; k++) {
      // An idea may list synonyms separated by "|" — a correct answer in the
      // reader's own words should not be marked down for choosing a different
      // word for the same thing.
      var alts = String(ideas[k]).split('|');
      var present = false;
      for (var a = 0; a < alts.length && !present; a++) {
        var terms = contentWords(alts[a]);
        present = terms.length > 0 && terms.every(function (t) { return respSet[t]; });
      }
      (present ? hit : missed).push(alts[0]);
    }
    var recall = ideas.length ? hit.length / ideas.length : 0;

    // a little credit for phrasing, so lifting whole phrases reads as closer
    var rb = bigrams(respWords), eb = bigrams(uniq(contentWords(block.example)));
    var ebSet = {};
    for (var e = 0; e < eb.length; e++) ebSet[eb[e]] = true;
    var shared = 0;
    for (var r = 0; r < rb.length; r++) if (ebSet[rb[r]]) shared++;
    var phrasing = rb.length ? Math.min(1, shared / Math.max(6, eb.length * 0.4)) : 0;

    var pct = Math.round(100 * (0.78 * recall + 0.22 * phrasing));

    // a two-word answer should never look like a strong match
    if (respWords.length < 8) pct = Math.min(pct, 25);
    return { pct: Math.max(0, Math.min(100, pct)), hit: hit, missed: missed, tooShort: respWords.length < 8 };
  }

  function bandFor(pct) {
    if (pct >= 75) return 'Very close to the example';
    if (pct >= 50) return 'Covers most of the key ideas';
    if (pct >= 30) return 'Partly there';
    return 'Quite different from the example';
  }

  function renderBlock(block, side) {
    switch (block.type) {
      case 'prose': return renderProse(block);
      case 'pullquote': return renderPullquote(block);
      case 'splitbar': return renderSplitbar(block);
      case 'table': return renderTable(block);
      case 'barchart': return renderBarchart(block);
      case 'ledger': return renderLedger(block);
      case 'toolkit': return renderToolkit(block);
      case 'glossary': return renderGlossary(block);
      case 'question': return renderQuestion(block, side);
      case 'scenario': return renderScenario(block);
      case 'resource': return renderResource(block);
      case 'written': return renderWritten(block, side);
      default: return '';
    }
  }

  var overlay = $('book-overlay');
  var readerEyebrow = $('reader-eyebrow');
  var readerTitle = $('reader-title');
  var chapterTabsEl = $('chapter-tabs');
  var pageLeftEl = $('page-left');
  var pageRightEl = $('page-right');
  var leafEl = $('leaf');
  var leafFront = $('leaf-front');
  var leafBack = $('leaf-back');
  var readerBack = $('reader-back');
  var readerForward = $('reader-forward');
  var readerPosition = $('reader-position');
  var spreadEl = $('spread');

  var currentBook = null;
  var spreadIndex = 0;
  var flipping = false;

  function openBook(id) {
    var book = BOOKS.filter(function (b) { return b.id === id; })[0];
    if (!book || overlay.classList.contains('is-open')) return;

    currentBook = book;
    spreadIndex = 0;

    readerEyebrow.textContent = 'Book ' + book.number;
    readerTitle.textContent = book.title;
    renderTabs();
    renderSpread();

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    $('reader-shelve').focus();
    window.dispatchEvent(new CustomEvent('ll-reader-opened'));
  }

  function closeBook() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    window.dispatchEvent(new CustomEvent('ll-reader-closed'));
    leafEl.classList.remove('is-flipping');
    flipping = false;
    currentBook = null;
  }

  function renderTabs() {
    chapterTabsEl.innerHTML = currentBook.spreads.map(function (s, i) {
      return '<button type="button" class="chapter-tab' + (i === spreadIndex ? ' active' : '') + '" data-index="' + i + '">' + s.chapter + '</button>';
    }).join('');
  }

  chapterTabsEl.addEventListener('click', function (e) {
    var tab = e.target.closest && e.target.closest('.chapter-tab');
    if (!tab) return;
    var i = Number(tab.getAttribute('data-index'));
    turnTo(i, i > spreadIndex ? 1 : -1);
  });

  function answerKey(side) { return currentBook.id + ':' + spreadIndex + ':' + side; }

  function restoreAnswers() {
    ['left', 'right'].forEach(function (side) {
      var stored = state.answers[answerKey(side)];
      if (stored === undefined) return;
      var pageEl = side === 'left' ? pageLeftEl : pageRightEl;
      var container = pageEl.querySelector('.question-block');
      if (container) markAnswer(container, currentBook.spreads[spreadIndex][side], stored);
    });
  }

  function renderSpread() {
    var spread = currentBook.spreads[spreadIndex];
    pageLeftEl.innerHTML = renderBlock(spread.left, 'left');
    pageRightEl.innerHTML = renderBlock(spread.right, 'right');
    pageLeftEl.scrollTop = 0;
    pageRightEl.scrollTop = 0;
    restoreAnswers();

    Array.prototype.forEach.call(chapterTabsEl.querySelectorAll('.chapter-tab'), function (el, i) {
      el.classList.toggle('active', i === spreadIndex);
    });

    var last = currentBook.spreads.length - 1;
    readerBack.disabled = spreadIndex === 0;
    readerForward.disabled = spreadIndex === last;
    readerForward.textContent = spreadIndex === last ? 'End of the book' : 'Turn the page →';

    if (spreadIndex === last && !state.read[currentBook.id]) {
      state.read[currentBook.id] = true;
      persist();
      buildBookList();
    }

    var pos = spread.chapter + ' · ' + (spreadIndex + 1) + ' of ' + currentBook.spreads.length;
    if (spreadIndex === last && state.name) pos = 'Finished, ' + state.name + ' · ' + pos;
    readerPosition.textContent = pos;
  }

  function turnTo(next, dir) {
    if (flipping || !currentBook) return;
    var last = currentBook.spreads.length - 1;
    next = Math.max(0, Math.min(last, next));
    if (next === spreadIndex) return;

    var oldLeft = pageLeftEl.innerHTML;
    var oldRight = pageRightEl.innerHTML;

    spreadIndex = next;
    renderSpread();

    if (reduceMotion || isNarrow()) return;

    flipping = true;
    if (dir > 0) {
      leafFront.innerHTML = oldRight;
      leafBack.innerHTML = pageLeftEl.innerHTML;
    } else {
      leafFront.innerHTML = pageRightEl.innerHTML;
      leafBack.innerHTML = oldLeft;
    }
    leafEl.classList.add('is-flipping');
    leafEl.style.transition = 'none';
    leafEl.style.transform = 'rotateY(' + (dir > 0 ? 0 : -180) + 'deg)';
    leafEl.offsetHeight;
    leafEl.style.transition = 'transform .76s cubic-bezier(.4,.75,.3,1)';
    leafEl.style.transform = 'rotateY(' + (dir > 0 ? -180 : 0) + 'deg)';
    setTimeout(function () {
      leafEl.classList.remove('is-flipping');
      leafFront.innerHTML = '';
      leafBack.innerHTML = '';
      flipping = false;
    }, 780);
  }

  function step(dir) { turnTo(spreadIndex + dir, dir); }

  function markAnswer(container, block, chosen) {
    Array.prototype.forEach.call(container.querySelectorAll('.option-btn'), function (b, i) {
      b.disabled = true;
      if (i === block.correct) b.classList.add('correct');
      else if (i === chosen) b.classList.add('incorrect');
    });
    var explanation = container.querySelector('.answer-explanation');
    explanation.hidden = false;
    explanation.textContent = (chosen === block.correct ? 'Correct — ' : 'Not quite — ') + block.explanation;
  }

  spreadEl.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.option-btn');
    if (!btn || btn.disabled || flipping) return;
    var side = btn.getAttribute('data-side');
    var chosen = Number(btn.getAttribute('data-index'));
    var block = currentBook.spreads[spreadIndex][side];
    state.answers[answerKey(side)] = chosen;
    markAnswer(btn.closest('.question-block'), block, chosen);
  });

  spreadEl.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.written-check');
    if (!btn || flipping) return;
    var wrap = btn.closest('.written-block');
    var block = currentBook.spreads[spreadIndex][wrap.getAttribute('data-side')];
    var text = wrap.querySelector('.written-input').value.trim();
    var out = wrap.querySelector('.written-result');

    if (!text) {
      out.hidden = false;
      out.innerHTML = '<p class="written-note">Write something first, then compare.</p>';
      return;
    }

    var r = scoreAnswer(text, block);
    var missed = r.missed.length
      ? '<p class="written-note">Ideas the example mentions that yours did not: <strong>' +
        r.missed.join('</strong>, <strong>') + '</strong>.</p>'
      : '<p class="written-note">Your answer touched on every idea the example does.</p>';

    out.hidden = false;
    out.innerHTML =
      '<div class="written-score"><span class="written-pct">' + r.pct + '%</span>' +
      '<span class="written-band">' + bandFor(r.pct) + '</span></div>' +
      '<div class="written-meter"><span style="width:' + r.pct + '%"></span></div>' +
      (r.tooShort ? '<p class="written-note">That is very short — a few full sentences will compare better.</p>' : '') +
      missed +
      '<p class="written-note written-caveat">This measures how much your wording overlaps the example, not whether you are right. A good answer in different words will score lower.</p>' +
      '<p class="page-kicker">Example answer</p><p class="written-example">' + block.example + '</p>';
  });

  readerBack.addEventListener('click', function () { step(-1); });
  readerForward.addEventListener('click', function () { step(1); });
  $('reader-shelve').addEventListener('click', closeBook);
  $('book-backdrop').addEventListener('click', closeBook);

  // ---- public surface -------------------------------------------------------
  window.LLReader = {
    open: openBook,
    close: closeBook,
    isOpen: function () { return overlay.classList.contains('is-open'); },
    books: BOOKS
  };

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeBook();
    else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
  });
})();
