// Shared module data: the three guides. Consumed by script.js (v2) and v3/reader.js.
(function () {
  'use strict';

  var NAVY = '#35497c';
  var OXBLOOD = '#6d2f34';
  var GREEN = '#3c6b52';

  var BOOKS = [
    {
      id: 'budgeting',
      number: 'I',
      title: 'Budgeting',
      tagline: 'the money you can see',
      spineClass: 'spine-budgeting',
      hotspot: { x: '13%', y: '10%' },
      spreads: [
        {
          chapter: 'What it is',
          left: {
            type: 'prose',
            kicker: 'What it is',
            heading: 'What Budgeting Is',
            paragraphs: [
              'Budgeting is the process of allocating, managing and tracking money over a set period of time. The budget itself is the plan &mdash; a record of what comes in, what goes out, and what is set aside.',
              'The purpose is control. A budget gives a person a clear view of where their money comes from and where it goes, which is the difference between directing money and simply watching it disappear.'
            ]
          },
          right: {
            type: 'pullquote',
            quote: 'Overspending usually starts as a cash flow problem, not a spending problem.',
            list: [
              'Most people slow their spending only once they notice money running low &mdash; by which point the decisions are already made.',
              'An estimated <strong>52% of Australians were living paycheck to paycheck in 2025</strong> (ADP, 2025).',
              'A 2024 study links that pattern closely to limited financial literacy and an inability to budget effectively (Mayndarto, Andrinaldo &amp; Baronkulovich, 2024).'
            ]
          }
        },

        {
          chapter: 'Needs & wants',
          left: {
            type: 'prose',
            kicker: 'The psychology of buying',
            heading: 'Needs And Wants',
            paragraphs: [
              'A <strong>need</strong> is an expense essential for basic living and functioning &mdash; rent, groceries, healthcare. A <strong>want</strong> is discretionary: it improves quality of life but is not strictly necessary to get by, such as eating out, subscriptions, or the latest phone upgrade.',
              'The distinction matters because needs should generally be covered first, before any money is allocated toward wants. Consistently prioritising wants over needs is one of the most common reasons people fall into financial strain &mdash; even while earning a reasonable income.'
            ]
          },
          right: {
            type: 'pullquote',
            quote: 'If you don&rsquo;t buy it, will there be an immediate negative consequence for you?',
            list: [
              'Yes &mdash; it is almost certainly a <strong>need</strong>.',
              'No, but I&rsquo;d be disappointed &mdash; that is a <strong>want</strong>, and wants are not the enemy. They just get paid after needs.',
              'The test works because it forces a consequence, not a feeling. &ldquo;I really want it&rdquo; and &ldquo;I need it&rdquo; feel identical in the moment.'
            ]
          }
        },

        {
          chapter: 'The four parts',
          left: {
            type: 'prose',
            kicker: 'How it works',
            heading: 'The Four Parts',
            paragraphs: [
              'A complete budget is built from four components working together. <strong>Income</strong> is the total money coming in each period &mdash; a job, an allowance, any regular source &mdash; and it sets the ceiling for everything else.',
              '<strong>Fixed expenses</strong> are essential, predictable costs that stay roughly the same each period. <strong>Variable expenses</strong> fluctuate month to month and need more active monitoring, since they are the easiest to overspend on without noticing.',
              '<strong>Savings</strong> should be its own category, not whatever happens to be left over. Setting a portion aside before spending the rest is what stops long-term goals being quietly deprioritised in favour of short-term spending.'
            ]
          },
          right: {
            type: 'table',
            heading: 'The four parts, side by side',
            columns: ['Part', 'What it is', 'Examples'],
            rows: [
              ['Income', 'Money in &mdash; the ceiling for everything else', 'Wages, allowance'],
              ['Fixed', 'Predictable, about the same each period', 'Rent, phone plan'],
              ['Variable', 'Moves around; needs watching', 'Groceries, fuel'],
              ['Savings', 'Set aside first, not left over', 'Buffer, a goal']
            ],
            note: 'Together these turn a budget from a rough guess into a plan you can actually track and adjust.'
          }
        },

        {
          chapter: 'Building one',
          left: {
            type: 'prose',
            kicker: 'How to build it',
            heading: 'Building A Budget',
            paragraphs: [
              'Separate expenses into a small number of broad categories &mdash; needs such as rent, bills and groceries, and discretionary spending such as eating out and subscriptions &mdash; then set a rough percentage or dollar target for each.',
              'From there, a short weekly or monthly review of what went well, what didn&rsquo;t, and what to adjust keeps a budget a living plan rather than a one-off spreadsheet exercise.',
              'Tracking alone is not enough. Plenty of people record every transaction and still have no idea what to do with the information. What matters is turning those numbers into a few meaningful checks: did spending stay within its target for a category, did the period end in surplus or deficit, and were recurring bills and savings goals actually met. Reviewing quarterly or year-to-date as well catches costs that don&rsquo;t appear every month.'
            ]
          },
          right: {
            type: 'resource',
            kicker: 'Template',
            heading: 'Start From A Template',
            body: 'A blank page is the hardest place to begin. This spreadsheet already has the four categories laid out &mdash; make a copy and put your own numbers in.',
            href: 'https://docs.google.com/spreadsheets/d/1zi5Dpz6L2mNOB5_AT6P-TAhXpFxCrSAgjlv81FvX0MU/edit?usp=sharing',
            linkText: 'Budget template (Google Sheets)',
            linkSub: 'Opens in a new tab &mdash; File &rsaquo; Make a copy to edit your own'
          }
        },

        {
          chapter: 'Is it working?',
          left: {
            type: 'toolkit',
            heading: 'Three Questions, Every Period',
            items: [
              'Did I stay within my planned spending for each category?',
              'Did I avoid relying on debt to cover regular expenses?',
              'Did my savings goal actually get met, rather than skipped?'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'Knowing it works',
            heading: 'What Success Looks Like',
            paragraphs: [
              'Spending patterns shift month to month, so when problems come up, the useful response is understanding why and adjusting the budget &mdash; not abandoning it.',
              'Over a longer stretch, success looks like a growing savings balance and less financial stress.',
              'Budgets are not always an accurate reflection of real habits. Life is not linear and unforeseen events always arise. A good budget does not prevent that &mdash; it helps you absorb it and recover.'
            ]
          }
        },

        {
          chapter: 'Scenario',
          left: {
            type: 'scenario',
            kicker: 'Scenario',
            heading: 'Jordan, 17',
            paragraphs: [
              'Jordan works weekends at a supermarket and brings home <strong>$460 a month</strong>. They pay $60 a month to their parents for board, $35 for a phone plan, and $18 for a music subscription they use most days.',
              'Last month they spent $140 on food out with friends, $45 on transport, and put <strong>$0</strong> into savings &mdash; they had planned to save $50, but there was nothing left by the end of the month.',
              'Jordan says the problem is that they &ldquo;don&rsquo;t earn enough&rdquo;.'
            ],
            facts: [
              { label: 'Income', value: '$460' },
              { label: 'Board (fixed)', value: '$60' },
              { label: 'Phone plan (fixed)', value: '$35' },
              { label: 'Subscription (fixed)', value: '$18' },
              { label: 'Food out (variable)', value: '$140' },
              { label: 'Transport (variable)', value: '$45' },
              { label: 'Left at month end', value: '$162', isTotal: true }
            ]
          },
          right: {
            type: 'question',
            prompt: 'Jordan ended the month with $162 unspent but saved nothing. What does this most clearly show?',
            options: [
              'Jordan does not earn enough to save anything',
              'Savings was treated as leftovers rather than its own category',
              'Jordan&rsquo;s fixed expenses are too high to allow saving'
            ],
            correct: 1,
            explanation: 'The money was there &mdash; $162 of it. Because savings was whatever happened to remain rather than an amount set aside first, it got absorbed by other spending. This is exactly why savings is treated as its own part of a budget.'
          }
        },

        {
          chapter: 'Scenario II',
          left: {
            type: 'question',
            prompt: 'Which of Jordan&rsquo;s costs would be the most reasonable first target for cutting back?',
            options: [
              'The $60 board payment',
              'The $140 spent on food out',
              'The $45 spent on transport'
            ],
            correct: 1,
            explanation: 'Food out is variable and discretionary &mdash; it is the largest single cost, it moves around, and reducing it has no immediate negative consequence. Board and transport are closer to needs, and board is fixed.'
          },
          right: {
            type: 'question',
            prompt: 'Jordan&rsquo;s month ended with more income than expenses. What is that called?',
            options: ['A deficit', 'A surplus', 'Cash flow'],
            correct: 1,
            explanation: 'A surplus is when income exceeds expenses over a period. A deficit is the reverse. Cash flow describes the movement of money in and out over time, not the result at the end.'
          }
        },

        {
          chapter: 'Check yourself',
          left: {
            type: 'question',
            prompt: 'Which of these is the best description of a budget?',
            options: [
              'A record of money you have already spent',
              'A plan that tracks income, expenses and savings over a set period',
              'A limit set by a bank on how much you can spend'
            ],
            correct: 1,
            explanation: 'A budget is forward-looking: it plans and tracks income, expenses and savings across a period. A record of past spending is useful input, but on its own it is not a budget.'
          },
          right: {
            type: 'question',
            prompt: 'Why are variable expenses usually the ones that need closer monitoring?',
            options: [
              'They are always larger than fixed expenses',
              'They change month to month, so overspending is easy to miss',
              'They are never essential'
            ],
            correct: 1,
            explanation: 'Variable costs such as groceries, fuel and entertainment fluctuate, so there is no steady figure to compare against. That makes creeping overspending much harder to notice than a change in a fixed bill.'
          }
        },

        {
          chapter: 'Write it out',
          left: {
            type: 'written',
            prompt: 'In your own words, explain the difference between a need and a want, and why the order matters in a budget.',
            hint: 'Two or three sentences is plenty. Try to include the test you would use to tell them apart.',
            example: 'A need is an expense essential for basic living, like rent, groceries or healthcare, while a want is discretionary spending that improves quality of life but is not necessary, like eating out or subscriptions. The order matters because needs should be covered first before money is allocated to wants. A useful test is asking whether not buying it would have an immediate negative consequence.',
            keywords: [
              'need', 'essential|necessary|must have|survive|live',
              'want', 'discretionary|optional|not necessary|nice to have',
              'needs first|cover needs|before wants|priority',
              'consequence|immediate problem|go without|happens if'
            ]
          },
          right: {
            type: 'written',
            prompt: 'Jordan says their problem is that they don&rsquo;t earn enough. Using the scenario, explain whether you agree, and what you would change.',
            hint: 'Refer to the numbers. What was actually left at the end of the month?',
            example: 'I disagree, because Jordan had $162 left at the end of the month and still saved nothing. The problem is not income but that savings was treated as leftover money instead of being set aside first. I would move $50 into savings at the start of the month and reduce the $140 spent on food out, since that is variable discretionary spending.',
            keywords: [
              'income|earn|earning|wage',
              'savings|save|saved',
              'leftover|left over|remaining|what was left',
              'set aside first|save first|before spending|straight away',
              'food out|eating out|takeaway|friends',
              'variable|discretionary|changes'
            ]
          }
        },

        {
          chapter: 'Glossary',
          left: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Budget', def: 'A plan that tracks income, expenses and savings over a specific period of time.' },
              { term: 'Income', def: 'The total money coming into a budget each period, from a job, allowance or other regular source.' },
              { term: 'Fixed expense', def: 'An essential, predictable cost that stays roughly the same each period, such as rent or a phone plan.' },
              { term: 'Variable expense', def: 'A cost that fluctuates month to month, such as groceries or entertainment.' },
              { term: 'Need', def: 'An expense essential for basic living and functioning, such as rent, groceries or healthcare.' }
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary, continued',
            terms: [
              { term: 'Want', def: 'A discretionary expense that improves quality of life but is not strictly necessary, such as eating out or a subscription.' },
              { term: 'Surplus', def: 'When income exceeds expenses at the end of a budgeting period.' },
              { term: 'Deficit', def: 'When expenses exceed income at the end of a budgeting period.' },
              { term: 'Cash flow', def: 'The movement of money in and out of a budget over time; poor cash flow management is a leading cause of overspending.' }
            ]
          }
        }
      ]
    },

    {
      id: 'tax',
      number: 'II',
      title: 'Tax',
      tagline: 'the slice taken first',
      spineClass: 'spine-tax',
      hotspot: { x: '34%', y: '32%' },
      spreads: [
        {
          chapter: 'Why it matters',
          left: {
            type: 'prose',
            kicker: 'Why it matters',
            heading: 'Why It Matters',
            paragraphs: [
              "If you've ever worked a shift and been paid less than your hourly rate times your hours, you've already met the tax system — you just weren't introduced to it properly.",
              "From your very first payslip, you're a taxpayer with a Tax File Number, PAYG withholding, and — depending on how much you earn — a tax return due each year. None of that is optional, and none of it is complicated once someone actually walks you through it."
            ]
          },
          right: {
            type: 'pullquote',
            quote: "You've been a taxpayer since your first shift — you just weren't told.",
            list: [
              "Tax is withheld before you're paid, not billed to you afterward.",
              'Claiming the threshold with your main job stops you overpaying all year.',
              'A bracket only taxes the slice of income inside it — never your whole income.'
            ]
          }
        },
        {
          chapter: 'How it works',
          left: {
            type: 'prose',
            kicker: 'How it works',
            heading: 'How It Works',
            paragraphs: [
              "Tax isn't billed to you after the fact — it's withheld before the money reaches you, through a system called PAYG (pay as you go). Your employer calculates it from your Tax File Number declaration and sends it to the ATO on your behalf, pay by pay.",
              "The first $18,200 you earn in a financial year is tax-free — but only if you've claimed the threshold with one employer. Claim it with two jobs at once and both withhold as if it's your only income, so you'll likely owe the difference back.",
              'After that, income is taxed in brackets: each rate only applies to the slice of income inside that bracket, not your whole income. That\'s why your marginal rate (the rate on your next dollar) is always higher than your effective rate (your total tax divided by your total income).'
            ]
          },
          right: {
            type: 'table',
            heading: 'Resident tax rates, 2026–27',
            columns: ['Income range', 'Rate'],
            rows: [
              ['$0 – $18,200', '0%'],
              ['$18,201 – $45,000', '15%'],
              ['$45,001 – $135,000', '30%'],
              ['$135,001 – $190,000', '37%'],
              ['$190,001+', '45%']
            ],
            note: 'Plus a 2% Medicare levy on top, for most taxpayers.'
          }
        },
        {
          chapter: 'Worked example',
          left: {
            type: 'prose',
            kicker: 'Worked example',
            heading: 'Worked Example — Jordan, $52,000 salary',
            paragraphs: [
              'Jordan earns a $52,000 salary and has claimed the tax-free threshold with their one employer. Their pay is taxed in slices, not all at once: the first $18,200 is tax-free, the next slice up to $45,000 is taxed at 15%, and the remainder up to $52,000 falls in the next bracket and is taxed at 30%.',
              'On top of income tax, most taxpayers also pay a 2% Medicare levy on their whole income.'
            ]
          },
          right: {
            type: 'ledger',
            heading: "Jordan's pay, line by line",
            rows: [
              { label: 'Gross salary', value: '$52,000' },
              { label: 'Tax-free (first $18,200)', value: '$0 tax' },
              { label: '15% bracket ($18,201–$45,000)', value: '$4,020' },
              { label: '30% bracket ($45,001–$52,000)', value: '$2,100' },
              { label: 'Tax subtotal', value: '$6,120' },
              { label: 'Medicare levy (2%)', value: '$1,040' },
              { label: 'Take-home pay', value: '$44,840', isTotal: true }
            ],
            caption: "Marginal rate: 30% — the rate on Jordan's next dollar. Effective rate: 13.8% — total tax ÷ gross income, always lower than the marginal rate. That's about $862 a week take-home."
          }
        },
        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: 'You work two casual jobs. What should you do about claiming the tax-free threshold?',
            options: [
              'Claim it with both employers, to get more in each pay',
              'Claim it with only one employer — usually your main job',
              'Never claim it, to avoid any tax at all'
            ],
            correct: 1,
            explanation: "Claiming the threshold twice means both employers withhold as if it's your only income — you'll likely owe the difference back at tax time. Claim it with one employer only."
          },
          right: {
            type: 'question',
            prompt: 'Jordan earns $52,000 and part of that income falls in the 30% bracket. What does that 30% actually apply to?',
            options: [
              'Their entire $52,000 income',
              'Only the slice of income that falls inside that bracket',
              "Whatever their employer decides"
            ],
            correct: 1,
            explanation: 'Tax brackets apply to slices, not your whole income. Only the portion between $45,001 and $52,000 is taxed at 30% — the rest is taxed at the lower rates below it.'
          }
        },
        {
          chapter: 'Toolkit',
          left: {
            type: 'toolkit',
            heading: 'This Week',
            items: [
              'Find your last payslip and locate the “PAYG withholding” line — that’s the tax already taken out.',
              "Check you've only ticked “claim the tax-free threshold” with one employer, if you have more than one job.",
              'Confirm your employer has your correct Tax File Number on file.',
              'Mark 31 October in your calendar — the usual tax return deadline for most people.'
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'TFN', def: 'Your personal Tax File Number with the ATO, used by every job you have.' },
              { term: 'PAYG withholding', def: 'Tax your employer takes out of each pay and sends to the ATO on your behalf.' },
              { term: 'Tax-free threshold', def: 'The first $18,200 you earn in a financial year, taxed at 0%.' },
              { term: 'Marginal rate', def: 'The tax rate on your next dollar earned — not on your whole income.' },
              { term: 'Effective rate', def: 'Your total tax divided by your total income — usually lower than your marginal rate.' },
              { term: 'Medicare levy', def: 'An additional 2% most taxpayers pay on top of income tax, to help fund Medicare.' }
            ]
          }
        }
      ]
    },

    {
      id: 'super',
      number: 'III',
      title: 'Super',
      tagline: "the money you can't touch yet",
      spineClass: 'spine-super',
      hotspot: { x: '20%', y: '54%' },
      spreads: [
        {
          chapter: 'Why it matters',
          left: {
            type: 'prose',
            kicker: 'Why it matters',
            heading: 'Why It Matters',
            paragraphs: [
              "Superannuation is the only part of your income you won't see for decades — which makes it the easiest one to ignore completely. But it's also the part where starting early does more work than almost anything else you can do with money, because it has the most time to compound.",
              'A fifteen-year-old with a casual job already has a super account quietly accumulating — or not. Whether it’s actually growing, whether the fees are reasonable, and whether it’s still there next time you check are all worth two minutes of attention now, instead of a surprise at 60.'
            ]
          },
          right: {
            type: 'pullquote',
            quote: 'The best time to start was your first payslip. The next best time is this one.',
            list: [
              "Super is paid on top of your wage — not out of it.",
              "You can't touch it until 60. That's the whole point.",
              'Fees are a percentage taken every year, forever — so smaller is better.'
            ]
          }
        },
        {
          chapter: 'How it works',
          left: {
            type: 'prose',
            kicker: 'How it works',
            heading: 'How It Works',
            paragraphs: [
              'Superannuation is money paid on top of your wage, not out of it — your employer is required to contribute 12% of your ordinary earnings into a super fund, in addition to your pay, not deducted from it.',
              "Once it arrives, it isn't just stored — it's invested, growing (or shrinking) with the market over decades, which is why fees matter: a fee is a percentage taken every single year, for as long as the account exists.",
              'Your account is also “stapled” to you — it follows you from job to job unless you actively choose a new one, which stops duplicate accounts (and duplicate fees) piling up every time you start a new casual job. Since 1 July 2026, “Payday Super” also means your employer has to pay it within 7 business days of each payday, not just once a quarter — so it’s worth checking it actually lands.'
            ]
          },
          right: {
            type: 'table',
            heading: 'Your wage vs. your super',
            columns: ['', 'Wage', 'Super'],
            rows: [
              ['Paid', 'To you, each payday', 'To your fund, on top of your wage'],
              ['Access', 'Now', 'From your preservation age (60)'],
              ['Between jobs', 'Resets with a new employer', 'Stays with you — stapling'],
              ['Growth', "Doesn't grow itself", 'Invested, compounds over decades']
            ]
          }
        },
        {
          chapter: 'Worked example',
          left: {
            type: 'prose',
            kicker: 'Worked example',
            heading: 'Worked Example — Starting at 18 vs. 28',
            paragraphs: [
              'Two people, same job, same $55,000 salary, same 12% super guarantee, same average return — the only difference is when they started. One begins contributing at 18. The other starts an identical job, on identical terms, at 28: ten years later.',
              "By a preservation age of 60, that ten-year head start is worth roughly double — not because they contributed more each year, but because their money had ten extra years to compound."
            ]
          },
          right: {
            type: 'barchart',
            heading: 'Balance at 60 (today’s dollars)',
            bars: [
              { label: 'Starting at 18', value: 706000, display: '$706,000' },
              { label: 'Starting at 28', value: 337000, display: '$337,000' }
            ],
            caption: 'Illustrative only. Assumes a constant $55,000 salary, 12% employer contributions, and an average return of roughly 6.5% p.a. after fees and tax, in today’s dollars. Real outcomes depend on salary, fund performance and fees — check your own fund’s calculator for a personal projection.'
          }
        },
        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: 'Your employer pays 12% super guarantee on your wages. Where does that 12% come from?',
            options: [
              'It’s deducted from your take-home pay',
              'It’s paid on top of your wage, by your employer',
              'You have to transfer it yourself each payday'
            ],
            correct: 1,
            explanation: "Super guarantee is paid in addition to your wage, not carved out of it. It's a separate contribution your employer is required to make."
          },
          right: {
            type: 'question',
            prompt: "You've had three casual jobs and might have three separate super accounts. Why does that matter?",
            options: [
              'It doesn’t — more accounts means more savings',
              'Each account can charge its own fees, quietly shrinking your balance',
              'The ATO automatically merges them for free every year'
            ],
            correct: 1,
            explanation: "Multiple accounts usually means multiple sets of fees, all chipping away at your balance. Consolidating into one account — after checking for any insurance you'd lose — usually leaves you better off."
          }
        },
        {
          chapter: 'Toolkit',
          left: {
            type: 'toolkit',
            heading: 'This Week',
            items: [
              'Log into your super account (or find your latest statement) and check the balance is actually growing.',
              'Check how many super accounts you have — if it’s more than one, look into consolidating them.',
              'Compare your fund’s fees against at least one other fund using a comparison tool.',
              'After your next payday, check the 12% super contribution actually landed in your account.'
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Super guarantee (SG)', def: 'The minimum percentage of your wage your employer must pay into your super, on top of your pay.' },
              { term: 'Preservation age', def: 'The age — 60, for most people today — you can generally access your super.' },
              { term: 'Stapling', def: 'Your super account “follows” you between jobs unless you actively choose a new one.' },
              { term: 'Consolidating', def: 'Combining multiple super accounts into one, to stop paying multiple sets of fees.' },
              { term: 'Compounding', def: 'Investment returns earning their own returns over time — why starting early matters so much.' },
              { term: 'Concessional contributions', def: 'Contributions taxed at 15% going in, like employer SG — generally lower than income tax.' }
            ]
          }
        }
      ]
    }
  ];

  window.LL_BOOKS = BOOKS;
})();
