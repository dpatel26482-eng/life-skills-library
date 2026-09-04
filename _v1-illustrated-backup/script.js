(function () {
  'use strict';

  var STORAGE_KEY = 'lifeSkillsLibrary.readBooks.v1';

  var BOOKS = [
    {
      id: 'budgeting',
      title: 'Budgeting Basics',
      icon: '💰',
      pages: [
        {
          type: 'info',
          heading: 'What Even Is a Budget?',
          body: [
            "A budget is just a plan for your money: how much comes in (allowance, a job, gifts) versus how much goes out.",
            "It's not about restriction — it's about choosing where your money goes on purpose, instead of wondering where it went."
          ]
        },
        {
          type: 'info',
          heading: 'Needs vs. Wants',
          body: [
            "Needs are things you can't really skip — transportation to school or work, food, essentials.",
            "Wants are nice but optional — takeout, games, new sneakers. Neither is \"bad.\" A budget just makes room for both, on purpose."
          ]
        },
        {
          type: 'info',
          heading: 'Try the 50/30/20 Split',
          body: [
            "A simple starting formula once you have real income: 50% needs, 30% wants, 20% savings or goals.",
            "It doesn't have to be exact — think of it as a starting point, not a law."
          ]
        },
        {
          type: 'question',
          prompt: 'You get $200 as a birthday gift. Which amount is closest to a healthy 20% savings goal?',
          options: ['$0', '$10', '$40', '$150'],
          correctIndex: 2,
          explanation: '20% of $200 is $40. Even small, consistent savings like this add up a lot faster than people expect.'
        },
        {
          type: 'info',
          heading: "Track It (So Future You Isn't Surprised)",
          body: [
            "A notes app, a free budgeting app, even pen and paper — the tool doesn't matter as much as checking in.",
            "A quick weekly look at what you've spent is enough to stop money from quietly disappearing."
          ]
        },
        {
          type: 'question',
          prompt: 'Which habit best supports a working budget?',
          options: [
            'Checking your balance only when a purchase gets declined',
            'Reviewing your spending once a week',
            'Never looking at it',
            'Spending first, worrying about it later'
          ],
          correctIndex: 1,
          explanation: 'A short weekly check-in catches problems early, before they turn into a maxed-out account or a surprise overdraft.'
        },
        {
          type: 'summary',
          heading: 'Key Takeaways',
          bullets: [
            'A budget is a plan, not a punishment.',
            'Cover needs first, then split what\'s left between wants and savings.',
            'Start with a rough 50/30/20 split and adjust as you go.',
            'Check in on your spending weekly — future you will thank you.'
          ]
        }
      ]
    },
    {
      id: 'banking',
      title: 'Banking 101',
      icon: '🏦',
      pages: [
        {
          type: 'info',
          heading: 'Checking vs. Savings',
          body: [
            "A checking account is for everyday spending — it's linked to your debit card and pays your bills.",
            "A savings account is where money sits (and can even earn a little interest) — it's harder to accidentally spend."
          ]
        },
        {
          type: 'info',
          heading: 'Debit Cards & ATMs',
          body: [
            "A debit card pulls straight from your checking account — it's not credit, so you can only spend what's actually there.",
            "Use your own bank's ATMs when you can. Out-of-network ATMs often charge $2–5 just to withdraw your own money."
          ]
        },
        {
          type: 'info',
          heading: 'Fees to Watch For',
          body: [
            "Overdraft fees (spending more than you have), monthly maintenance fees, and ATM fees can quietly eat your balance.",
            "Look for a student or no-fee checking account — most maintenance fees are avoidable if you pick the right account."
          ]
        },
        {
          type: 'question',
          prompt: 'Your balance is $12 and you try to buy a $15 item with your debit card. At a bank that charges overdraft fees, what usually happens?',
          options: [
            'The purchase is always blocked for free',
            'It may go through, but you could be charged an overdraft fee of $30 or more',
            'The bank adds the missing money for you',
            'Nothing — debit cards never let you go below zero'
          ],
          correctIndex: 1,
          explanation: "Many banks let the purchase go through and then charge a hefty fee. Choosing an account with no overdraft fees (or opting out of overdraft coverage) avoids this trap."
        },
        {
          type: 'info',
          heading: 'Online & Mobile Banking Basics',
          body: [
            "Mobile check deposit, instant transfers, and spending alerts are standard on most banking apps now.",
            "Turn on low-balance alerts — a text or email warning before you hit $0 prevents most fee surprises."
          ]
        },
        {
          type: 'question',
          prompt: "Which account is best for money you don't want to accidentally spend this week?",
          options: ['Checking', 'Savings', 'Carrying it as cash', 'A payment app balance'],
          correctIndex: 1,
          explanation: "Savings accounts are built to hold money you're not touching day-to-day, and separating it from checking removes the temptation."
        },
        {
          type: 'summary',
          heading: 'Key Takeaways',
          bullets: [
            'Checking is for spending, savings is for growing and protecting.',
            "A debit card isn't credit — you can't spend money you don't have.",
            'Pick student or no-fee accounts and keep an eye on your balance.',
            'Turn on alerts so the bank warns you before a fee does.'
          ]
        }
      ]
    },
    {
      id: 'credit',
      title: 'Understanding Credit',
      icon: '💳',
      pages: [
        {
          type: 'info',
          heading: 'What Is Credit, Really?',
          body: [
            "Credit means borrowing money now with a promise to pay it back later — usually with interest if you don't pay it off in full.",
            "A credit score (roughly 300–850) is a number that tells lenders how reliably you've paid things back in the past."
          ]
        },
        {
          type: 'info',
          heading: 'What Builds (or Hurts) a Score',
          body: [
            "Payment history matters most — paying on time, every time.",
            "After that: how much of your available credit you're using, how long you've had credit, and how often you apply for new credit."
          ]
        },
        {
          type: 'info',
          heading: "Credit Cards Aren't \"Free Money\"",
          body: [
            "A credit card is a loan for every purchase you make with it.",
            "Pay the full balance every month and you avoid interest entirely. Pay only the minimum, and interest — often 20%+ — starts piling up fast on what's left."
          ]
        },
        {
          type: 'question',
          prompt: 'You put $100 on a credit card and only pay the $25 minimum. What happens to the other $75?',
          options: [
            'It disappears',
            'It carries over to next month and starts accruing interest',
            'The card company forgives it',
            "It's automatically paid off next month for free"
          ],
          correctIndex: 1,
          explanation: "The remaining balance carries over and interest starts accruing on it immediately — that's how card debt snowballs so quickly."
        },
        {
          type: 'info',
          heading: 'Why a Good Score Matters Later',
          body: [
            "Credit affects renting an apartment, car loans, and sometimes even phone plans or job applications.",
            "Building it early — even with one small, responsibly used card — pays off for years."
          ]
        },
        {
          type: 'question',
          prompt: 'Which habit builds credit the fastest, safest way?',
          options: [
            'Maxing out a card for rewards points',
            'Paying the full statement balance on time, every time',
            'Opening five cards at once',
            'Ignoring your statements'
          ],
          correctIndex: 1,
          explanation: 'Paying in full and on time hits the two biggest factors in your score — payment history and low credit usage — at the same time.'
        },
        {
          type: 'summary',
          heading: 'Key Takeaways',
          bullets: [
            'Credit is a trust score for borrowing money.',
            'On-time payments matter more than anything else.',
            'Pay your full balance to skip interest completely.',
            'Good credit quietly unlocks apartments, cars, and more later on.'
          ]
        }
      ]
    },
    {
      id: 'taxes',
      title: 'Taxes for Beginners',
      icon: '🧾',
      pages: [
        {
          type: 'info',
          heading: 'Why Taxes Exist',
          body: [
            "Taxes fund the shared stuff — roads, schools, emergency services, and more.",
            "Most people who earn income contribute a percentage of it automatically."
          ]
        },
        {
          type: 'info',
          heading: 'Gross vs. Net Pay',
          body: [
            "Gross pay is the total amount you earned before anything is taken out.",
            "Net (\"take-home\") pay is what actually lands in your account after taxes and other withholdings — which is why a \"$15/hour\" job doesn't mean $15/hour shows up in your account."
          ]
        },
        {
          type: 'info',
          heading: 'W-4 & W-2, Decoded',
          body: [
            "A W-4 is the form you fill out when you start a job — it tells your employer how much tax to withhold from each paycheck.",
            "A W-2 is the form your employer sends you every January, showing what you earned and paid in taxes the year before. You'll need it to file."
          ]
        },
        {
          type: 'question',
          prompt: 'You start a new part-time job. Which form do you fill out on day one to set up your tax withholding?',
          options: ['W-2', '1099', 'W-4', 'Form 1040'],
          correctIndex: 2,
          explanation: "The W-4 is filled out when you're hired, and it tells your employer how much to withhold from each paycheck going forward."
        },
        {
          type: 'info',
          heading: 'Filing Basics (Simplified)',
          body: [
            "Most people file once a year, using their W-2, by a deadline that usually falls in mid-April.",
            "Many teens and first-time filers qualify for free filing tools — and filing can actually get you money back if too much was withheld."
          ]
        },
        {
          type: 'question',
          prompt: 'What is the W-2 form mainly used for?',
          options: ['Applying for the job', 'Filing your tax return', 'Requesting a raise', 'Opening a bank account'],
          correctIndex: 1,
          explanation: "The W-2 summarizes what you earned and paid in taxes over the year, and it's the main document you use to file your return."
        },
        {
          type: 'summary',
          heading: 'Key Takeaways',
          bullets: [
            'Taxes fund public services everyone relies on.',
            "Net pay is always less than gross pay — plan around what actually lands in your account.",
            'W-4 sets up withholding at a new job, W-2 reports what you earned for filing.',
            'File every year — you might be owed money back.'
          ]
        }
      ]
    },
    {
      id: 'saving',
      title: 'Saving & Growing Money',
      icon: '🌱',
      pages: [
        {
          type: 'info',
          heading: 'Pay Yourself First',
          body: [
            "Before spending on wants, set aside a small amount into savings the moment money comes in.",
            "Even $5–10 per paycheck builds the habit — and habits matter more than the exact amount early on."
          ]
        },
        {
          type: 'info',
          heading: 'Build an Emergency Cushion',
          body: [
            "A small emergency fund — even just $200–500 to start — keeps a flat tire or a cracked phone screen from turning into a crisis or debt.",
            "It's there so one bad week doesn't wreck the rest of your month."
          ]
        },
        {
          type: 'info',
          heading: 'Set Goals With a Timeline',
          body: [
            "\"Save $300 for a laptop by December\" is far more motivating than \"save money someday.\"",
            "Break big goals into small weekly or monthly amounts so the goal feels doable instead of distant."
          ]
        },
        {
          type: 'question',
          prompt: 'You want to save $240 for a trip in 6 months. How much do you need to set aside each month?',
          options: ['$10', '$20', '$40', '$60'],
          correctIndex: 2,
          explanation: '$240 ÷ 6 months = $40 a month. Breaking a goal down like this makes it feel a lot more manageable.'
        },
        {
          type: 'info',
          heading: 'Interest: Money That Makes Money',
          body: [
            "Savings accounts pay you a small interest rate just for keeping your money there.",
            "Compound interest means you eventually earn interest on your interest, too — the earlier you start, the more time it has to grow."
          ]
        },
        {
          type: 'question',
          prompt: 'Which savings account will grow your money the most over time, all else being equal?',
          options: ['One with a lower interest rate', 'One with a higher interest rate', 'One with no interest', "It doesn't matter"],
          correctIndex: 1,
          explanation: 'A higher interest rate means more money earned on the same balance over the same amount of time.'
        },
        {
          type: 'summary',
          heading: 'Key Takeaways',
          bullets: [
            'Save first, then spend what\'s left — not the other way around.',
            'A small emergency cushion protects you from small disasters.',
            'Set specific goals with deadlines, not vague ones.',
            'Start early — compound interest rewards time more than luck.'
          ]
        }
      ]
    }
  ];

  function getReadIds() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function markRead(id) {
    try {
      var ids = getReadIds();
      if (ids.indexOf(id) === -1) {
        ids.push(id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      }
    } catch (e) {
      /* localStorage unavailable — progress just won't persist */
    }
  }

  // ---------- Scenes ----------

  var sceneEntrance = document.getElementById('scene-entrance');
  var sceneInterior = document.getElementById('scene-interior');
  var sceneLibrary = document.getElementById('scene-library');
  var allScenes = [sceneEntrance, sceneInterior, sceneLibrary];

  function showScene(scene) {
    allScenes.forEach(function (s) { s.classList.remove('active'); });
    scene.classList.add('active');
  }

  var door = document.getElementById('door');
  var btnEnter = document.getElementById('btn-enter');
  var skipLink = document.getElementById('skip-link');
  var btnContinue = document.getElementById('btn-continue');

  function enterLibraryFromDoor() {
    door.classList.add('open');
    setTimeout(function () { showScene(sceneInterior); }, 700);
  }

  function goToLibraryScene() {
    renderShelf();
    showScene(sceneLibrary);
  }

  door.addEventListener('click', enterLibraryFromDoor);
  door.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      enterLibraryFromDoor();
    }
  });
  btnEnter.addEventListener('click', enterLibraryFromDoor);
  skipLink.addEventListener('click', goToLibraryScene);
  btnContinue.addEventListener('click', goToLibraryScene);

  // Stars

  var starsContainer = document.querySelector('.stars');
  if (starsContainer) {
    var starsHtml = '';
    for (var i = 0; i < 50; i++) {
      var left = (Math.random() * 100).toFixed(1);
      var top = (Math.random() * 65).toFixed(1);
      var delay = (Math.random() * 3).toFixed(2);
      var size = (Math.random() * 1.6 + 1).toFixed(1);
      starsHtml += '<span class="star" style="left:' + left + '%;top:' + top + '%;' +
        'animation-delay:' + delay + 's;width:' + size + 'px;height:' + size + 'px;"></span>';
    }
    starsContainer.innerHTML = starsHtml;
  }

  // ---------- Shelf ----------

  var shelfRow = document.getElementById('shelf-row');
  var progressLine = document.getElementById('progress-line');

  function renderShelf() {
    var readIds = getReadIds();
    shelfRow.innerHTML = BOOKS.map(function (book) {
      var readClass = readIds.indexOf(book.id) !== -1 ? ' is-read' : '';
      return '' +
        '<li class="book' + readClass + '" data-id="' + book.id + '" tabindex="0" role="button" aria-label="Open ' + book.title + '">' +
          '<span class="book-read-badge" aria-hidden="true">✓</span>' +
          '<span class="book-icon" aria-hidden="true">' + book.icon + '</span>' +
          '<span class="book-title">' + book.title + '</span>' +
        '</li>';
    }).join('');

    progressLine.textContent = readIds.length + ' of ' + BOOKS.length + ' books read';

    Array.prototype.forEach.call(shelfRow.querySelectorAll('.book'), function (el) {
      el.addEventListener('click', function () { pullBook(el, el.getAttribute('data-id')); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pullBook(el, el.getAttribute('data-id'));
        }
      });
    });
  }

  function pullBook(el, id) {
    el.style.transform = 'translateY(-40px) scale(1.05)';
    setTimeout(function () {
      openBook(id);
      el.style.transform = '';
    }, 240);
  }

  // ---------- Reader ----------

  var overlay = document.getElementById('book-overlay');
  var readerTitle = document.getElementById('reader-title');
  var readerIcon = document.getElementById('reader-icon');
  var readerBadge = document.getElementById('reader-badge');
  var readerPage = document.getElementById('reader-page');
  var readerDots = document.getElementById('reader-dots');
  var readerPrev = document.getElementById('reader-prev');
  var readerNext = document.getElementById('reader-next');
  var bookClose = document.getElementById('book-close');
  var bookBackdrop = document.getElementById('book-backdrop');

  var currentBook = null;
  var currentPageIndex = 0;

  function openBook(id) {
    currentBook = null;
    for (var i = 0; i < BOOKS.length; i++) {
      if (BOOKS[i].id === id) { currentBook = BOOKS[i]; break; }
    }
    if (!currentBook) return;

    currentPageIndex = 0;
    readerTitle.textContent = currentBook.title;
    readerIcon.textContent = currentBook.icon;
    readerBadge.hidden = getReadIds().indexOf(id) === -1;
    renderPage();
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function closeBook() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    currentBook = null;
  }

  function renderDots() {
    readerDots.innerHTML = currentBook.pages.map(function (_, i) {
      return '<span class="reader-dot' + (i === currentPageIndex ? ' active' : '') + '"></span>';
    }).join('');
  }

  function renderPage() {
    var page = currentBook.pages[currentPageIndex];
    renderDots();
    readerPrev.disabled = currentPageIndex === 0;
    readerNext.textContent = currentPageIndex === currentBook.pages.length - 1 ? 'Finish' : 'Next →';

    if (page.type === 'info') {
      readerPage.innerHTML =
        '<p class="page-kicker">' + currentBook.title + '</p>' +
        '<h3>' + page.heading + '</h3>' +
        page.body.map(function (p) { return '<p>' + p + '</p>'; }).join('');
      readerNext.disabled = false;

    } else if (page.type === 'question') {
      readerPage.innerHTML =
        '<p class="page-kicker">Check yourself</p>' +
        '<h3>' + page.prompt + '</h3>' +
        '<ul class="option-list">' +
          page.options.map(function (opt, i) {
            return '<li><button type="button" class="option-btn" data-index="' + i + '">' + opt + '</button></li>';
          }).join('') +
        '</ul>' +
        '<div class="answer-feedback" id="answer-feedback" hidden></div>';
      readerNext.disabled = true;

      var feedback = document.getElementById('answer-feedback');
      Array.prototype.forEach.call(readerPage.querySelectorAll('.option-btn'), function (btn) {
        btn.addEventListener('click', function () {
          var idx = Number(btn.getAttribute('data-index'));
          var isCorrect = idx === page.correctIndex;
          Array.prototype.forEach.call(readerPage.querySelectorAll('.option-btn'), function (b, i) {
            b.disabled = true;
            if (i === page.correctIndex) b.classList.add('correct');
            else if (i === idx) b.classList.add('incorrect');
          });
          feedback.hidden = false;
          feedback.textContent = (isCorrect ? 'Correct — ' : 'Not quite — ') + page.explanation;
          readerNext.disabled = false;
        });
      });

    } else if (page.type === 'summary') {
      readerPage.innerHTML =
        '<p class="page-kicker">Key takeaways</p>' +
        '<h3>' + page.heading + '</h3>' +
        '<ul class="summary-list">' +
          page.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') +
        '</ul>';
      readerNext.disabled = false;
    }

    readerPage.scrollTop = 0;
  }

  readerPrev.addEventListener('click', function () {
    if (currentPageIndex > 0) {
      currentPageIndex--;
      renderPage();
    }
  });

  readerNext.addEventListener('click', function () {
    if (currentPageIndex < currentBook.pages.length - 1) {
      currentPageIndex++;
      renderPage();
    } else {
      markRead(currentBook.id);
      closeBook();
      renderShelf();
    }
  });

  bookClose.addEventListener('click', closeBook);
  bookBackdrop.addEventListener('click', closeBook);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeBook();
  });

  // ---------- Init ----------

  renderShelf();
})();
