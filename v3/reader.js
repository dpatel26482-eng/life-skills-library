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

    readerEyebrow.textContent = 'Book ' + book.number + ' · ' + book.tagline;
    readerTitle.textContent = book.title;
    renderTabs();
    renderSpread();

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    $('reader-shelve').focus();
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
