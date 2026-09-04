(function () {
  'use strict';

  var BOOKS = window.LL_BOOKS;

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

  // =====================================================================
  //  STATE
  // =====================================================================

  var SCENES = [
    { id: 'atrium', label: 'Atrium' },
    { id: 'shelf', label: 'The shelf' }
  ];

  var STORE_KEY = 'late-library-v3';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isNarrow = function () { return window.innerWidth < 900; };

  var state = { name: '', read: {}, answers: {} };

  try {
    var saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    if (saved && typeof saved === 'object') {
      state.name = typeof saved.name === 'string' ? saved.name : '';
      state.read = saved.read || {};
    }
  } catch (err) { /* private browsing, cleared storage — carry on */ }

  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ name: state.name, read: state.read })); }
    catch (err) { /* nothing to do */ }
  }

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[<>&"]/g, function (c) { return ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]; }); }

  // =====================================================================
  //  AMBIENT — motes, dust, the arched hall
  // =====================================================================

  function seedMotes() {
    Array.prototype.forEach.call(document.querySelectorAll('.motes'), function (el) {
      var count = el.classList.contains('motes-soft') ? 9 : 14;
      var html = '';
      for (var i = 0; i < count; i++) {
        html += '<span class="mote" style="left:' + (Math.random() * 100).toFixed(1) + '%;' +
          'animation-duration:' + (Math.random() * 9 + 13).toFixed(1) + 's;' +
          'animation-delay:' + (Math.random() * -22).toFixed(1) + 's;' +
          'transform:scale(' + (Math.random() * .7 + .5).toFixed(2) + ');"></span>';
      }
      el.innerHTML = html;
    });
  }

  function buildHall() {
    var hall = $('hall-space');
    if (!hall) return;
    // depths scale with the viewport, matching the vw-based arch geometry in CSS
    var vw = window.innerWidth;
    var near = -vw * .16;
    var gap = vw * .26;
    var backwall = hall.querySelector('.hall-backwall');
    Array.prototype.forEach.call(hall.querySelectorAll('.arch'), function (a) { a.remove(); });
    if (backwall) backwall.style.transform = 'translateZ(' + (-vw * 1.5).toFixed(0) + 'px)';
    var html = '';
    // three near arches only: they frame the generated plate rather than replacing it,
    // and each one's fog stays light so the vista behind stays visible
    for (var i = 0; i < 3; i++) {
      var z = (near - i * gap).toFixed(0);
      var fog = Math.min(.16, i * .06).toFixed(2);
      html += '<div class="arch" style="transform:translateZ(' + z + 'px)">' +
        '<span class="arch-pillar l"></span>' +
        '<span class="arch-pillar r"></span>' +
        '<span class="arch-beam"></span>' +
        '<span class="arch-sill"></span>' +
        '<span class="arch-lamp" style="animation-delay:' + (-i * 1.3).toFixed(1) + 's"></span>' +
        '<span class="arch-fog" style="opacity:' + fog + '"></span>' +
        '</div>';
    }
    hall.insertAdjacentHTML('beforeend', html);
  }

  // =====================================================================
  //  SCENE CAMERA
  // =====================================================================

  var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'));
  var railEl = $('scene-rail');
  var navHint = $('nav-hint');
  var footer = document.querySelector('.site-footer');
  var current = 0;
  var cameraLocked = false;
  var hintDismissed = false;
  var parkTimer = null;

  function buildRail() {
    railEl.innerHTML = SCENES.map(function (s, i) {
      return '<li><button type="button" data-goto="' + i + '">' +
        '<span class="rail-label">' + s.label + '</span><span class="rail-dot"></span></button></li>';
    }).join('');
  }

  function applyScene() {
    scenes.forEach(function (el, i) {
      el.classList.toggle('is-active', i === current);
      el.classList.toggle('is-past', i < current);
      el.classList.toggle('is-next', i > current);
      el.classList.remove('is-parked');
      el.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    clearTimeout(parkTimer);
    parkTimer = setTimeout(function () {
      scenes.forEach(function (el, i) { if (i !== current) el.classList.add('is-parked'); });
    }, reduceMotion ? 80 : 1150);
    Array.prototype.forEach.call(document.querySelectorAll('[data-goto]'), function (b) {
      b.classList.toggle('is-current', Number(b.getAttribute('data-goto')) === current);
    });
    navHint.classList.toggle('is-hidden', current !== 0 || hintDismissed);
    if (footer) footer.classList.toggle('is-dim', current === 1);
    document.body.setAttribute('data-scene', SCENES[current].id);
    if (window.history && history.replaceState) {
      history.replaceState(null, '', current === 0 ? location.pathname : '#' + SCENES[current].id);
    }
  }

  function goTo(i, opts) {
    i = Math.max(0, Math.min(SCENES.length - 1, i));
    if (i === current || cameraLocked) return;
    current = i;
    wheelAccum = 0;
    setScrub(0);
    applyScene();
    cameraLocked = true;
    setTimeout(function () { cameraLocked = false; }, reduceMotion ? 120 : 900);
  }

  function overlayOpen() {
    return document.querySelector('.overlay.is-open') !== null;
  }

  // --- scroll (wheel / trackpad) ---
  // The stage is a fixed viewport, so there is no native scrollbar for a smooth-scroll
  // library to damp. Instead the raw wheel delta feeds a critically-damped follower:
  // scrubTarget jumps, scrubShown chases it a frame at a time, and every scroll-linked
  // visual (hero push-in, headline reveal) reads the damped value through --scrub.
  var THRESHOLD = 190;
  var scrubTarget = 0, scrubShown = 0, scrubRAF = null;

  function paintScrub() {
    scrubShown += (scrubTarget - scrubShown) * (reduceMotion ? 1 : 0.085);
    if (Math.abs(scrubTarget - scrubShown) < 0.0008) scrubShown = scrubTarget;
    document.documentElement.style.setProperty('--scrub', scrubShown.toFixed(4));
    scrubRAF = scrubShown === scrubTarget ? null : requestAnimationFrame(paintScrub);
  }
  function setScrub(v) {
    scrubTarget = Math.max(0, Math.min(1, v));
    if (scrubRAF === null) scrubRAF = requestAnimationFrame(paintScrub);
  }

  var wheelAccum = 0, wheelTimer = null;
  window.addEventListener('wheel', function (e) {
    if (overlayOpen()) return;
    if (cameraLocked) { wheelAccum = 0; return; }
    wheelAccum += e.deltaY;
    if (wheelAccum < 0 && current === 0) wheelAccum = 0;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { wheelAccum = 0; setScrub(0); }, 260);
    if (current === 0) setScrub(wheelAccum / THRESHOLD);
    if (wheelAccum > THRESHOLD) { wheelAccum = 0; goTo(current + 1); }
    else if (wheelAccum < -THRESHOLD) { wheelAccum = 0; goTo(current - 1); }
  }, { passive: true });

  // --- touch ---
  var touchStartY = null;
  window.addEventListener('touchstart', function (e) {
    touchStartY = overlayOpen() ? null : e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (touchStartY === null) return;
    var dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 60) goTo(current + (dy > 0 ? 1 : -1));
    touchStartY = null;
  }, { passive: true });

  // --- keyboard ---
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    if ($('book-overlay').classList.contains('is-open')) {
      if (e.key === 'Escape') { closeBook(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
      return;
    }
    if ($('letter-overlay').classList.contains('is-open')) {
      if (e.key === 'Escape') closeLetter();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); goTo(current + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); goTo(SCENES.length - 1); }
  });

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-goto]');
    if (btn) goTo(Number(btn.getAttribute('data-goto')));
  });

  // =====================================================================
  //  READING CARD (name kept from earlier visits)
  // =====================================================================

  function personalise() {
    var navReader = $('nav-reader');
    var kicker = $('shelf-kicker');
    if (state.name) {
      navReader.textContent = state.name + '\u2019s reading card';
      navReader.hidden = false;
      kicker.textContent = 'Reading room \u00b7 ' + state.name;
    } else {
      navReader.hidden = true;
      kicker.textContent = 'The reading room';
    }
  }

  // =====================================================================
  //  SCENE 3 — the bookshelf
  // =====================================================================

  var SHELF_ROWS = 4;
  var FILLER_COLOURS = [
    '#3a2a20', '#4a2e2b', '#2c3550', '#3d4238', '#523a26',
    '#2f2b3a', '#5a4630', '#33413c', '#4b2f38', '#3b3a2c', '#242c3f', '#412a1c'
  ];
  var PLACEMENT = { budgeting: { row: 0, at: .34 }, tax: { row: 1, at: .58 }, super: { row: 2, at: .26 } };

  function fillerSpine() {
    var w = Math.round(Math.random() * 16 + 11);
    var h = Math.round(Math.random() * 30 + 64);
    var c = FILLER_COLOURS[Math.floor(Math.random() * FILLER_COLOURS.length)];
    var lean = Math.random() < .04 ? ' transform:rotate(' + (Math.random() * 8 - 4).toFixed(1) + 'deg);' : '';
    return '<span class="book" style="width:' + w + 'px;height:' + h + '%;background:linear-gradient(100deg,' + c + ',rgba(0,0,0,.85));' + lean + '"></span>';
  }

  function featureSpine(book) {
    return '<button type="button" class="spine ' + book.spineClass + '" data-id="' + book.id + '" ' +
      'aria-label="Open Book ' + book.number + ' — ' + book.title + '">' +
      '<span class="spine-label">' + book.title + '</span>' +
      '<span class="spine-num">' + book.number + '</span>' +
      '</button>';
  }

  function buildBookcase() {
    var caseEl = $('bookcase');
    var rowsHTML = '';
    for (var r = 0; r < SHELF_ROWS; r++) {
      var feature = null;
      for (var k in PLACEMENT) { if (PLACEMENT[k].row === r) feature = k; }
      var count = Math.round(window.innerWidth / 34) + 6;
      var spines = [];
      for (var i = 0; i < count; i++) spines.push(fillerSpine());
      if (feature) {
        var book = BOOKS.filter(function (b) { return b.id === feature; })[0];
        spines.splice(Math.floor(count * PLACEMENT[feature].at), 0, featureSpine(book));
      }
      rowsHTML += '<div class="shelf-row">' + spines.join('') + '</div>';
    }
    caseEl.innerHTML = rowsHTML;
    caseEl.removeAttribute('aria-hidden');
  }

  function buildBookList() {
    $('book-list').innerHTML = BOOKS.map(function (b) {
      return '<li><button type="button" data-id="' + b.id + '" class="' + (state.read[b.id] ? 'is-read' : '') + '">' +
        '<span class="bl-swatch ' + b.id + '"></span>' +
        '<span class="bl-text"><span class="bl-title">' + b.number + ' · ' + b.title + '</span>' +
        '<span class="bl-tag">' + b.tagline + '</span></span>' +
        '<span class="bl-mark">Read</span>' +
        '</button></li>';
    }).join('');
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest && e.target.closest('.spine, .book-list button');
    if (opener) openBook(opener.getAttribute('data-id'), opener);
  });

  // =====================================================================
  //  PULLING A BOOK OFF THE SHELF
  // =====================================================================

  var overlay = $('book-overlay');
  var flyingBook = $('flying-book');
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
  var lastSource = null;

  function flyFromShelf(sourceEl, book, reveal) {
    var rect = sourceEl.getBoundingClientRect();
    if (reduceMotion || !rect.width || sourceEl.classList.contains('bl-swatch')) { reveal(); return; }

    sourceEl.classList.add('is-taken');
    flyingBook.className = 'flying-book ' + book.spineClass;
    flyingBook.style.cssText =
      'left:' + rect.left + 'px;top:' + rect.top + 'px;width:' + rect.width + 'px;height:' + rect.height + 'px;' +
      'transition:none;opacity:1;transform:none;';
    flyingBook.offsetHeight; // force layout so the transition below animates

    var dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
    var dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
    flyingBook.style.transition = 'transform .78s cubic-bezier(.32,.78,.28,1), opacity .34s ease .42s';
    flyingBook.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(-7deg) scale(' + (7 / Math.max(rect.width / 34, .6)).toFixed(2) + ')';
    flyingBook.style.opacity = '0';

    setTimeout(reveal, 400);
    setTimeout(function () {
      flyingBook.style.cssText = 'opacity:0;';
      if (lastSource) lastSource.classList.remove('is-taken');
    }, 900);
  }

  function openBook(id, sourceEl) {
    var book = BOOKS.filter(function (b) { return b.id === id; })[0];
    if (!book || overlay.classList.contains('is-open')) return;

    currentBook = book;
    spreadIndex = 0;
    lastSource = sourceEl && sourceEl.classList.contains('spine') ? sourceEl : null;

    readerEyebrow.textContent = 'Book ' + book.number + ' · ' + book.tagline;
    readerTitle.textContent = book.title;
    renderTabs();
    renderSpread();

    var reveal = function () {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      $('reader-shelve').focus();
    };

    if (lastSource) flyFromShelf(lastSource, book, reveal);
    else reveal();
  }

  function closeBook() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (lastSource) { lastSource.classList.remove('is-taken'); lastSource.focus(); }
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

  // =====================================================================
  //  THE LETTER
  // =====================================================================

  var letterOverlay = $('letter-overlay');
  function openLetter() {
    letterOverlay.classList.add('is-open');
    letterOverlay.setAttribute('aria-hidden', 'false');
  }
  function closeLetter() {
    letterOverlay.classList.remove('is-open');
    letterOverlay.setAttribute('aria-hidden', 'true');
  }
  $('open-letter').addEventListener('click', openLetter);
  $('open-letter-2').addEventListener('click', openLetter);
  Array.prototype.forEach.call(document.querySelectorAll('[data-close-letter]'), function (el) {
    el.addEventListener('click', closeLetter);
  });
  $('letter-to-shelf').addEventListener('click', function () { closeLetter(); goTo(2); });

  // =====================================================================
  //  POINTER TILT
  // =====================================================================

  function initTilt() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-tilt]'), function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(700px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  // =====================================================================
  //  INIT
  // =====================================================================

  // deep link: /#desk or /#shelf opens straight into that scene
  var fromHash = SCENES.map(function (s) { return s.id; }).indexOf((location.hash || '').replace('#', ''));
  if (fromHash > 0) current = fromHash;

  seedMotes();
  buildHall();
  buildRail();
  buildBookcase();
  buildBookList();
  personalise();
  initTilt();

  // paint the opening scene instantly; only later moves are animated
  document.documentElement.classList.add('no-camera-anim');
  applyScene();
  setTimeout(function () { document.documentElement.classList.remove('no-camera-anim'); }, 60);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { buildBookcase(); buildHall(); }, 260);
  });

  setTimeout(function () { hintDismissed = true; navHint.classList.add('is-hidden'); }, 9000);
})();
