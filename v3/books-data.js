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
            kicker: 'What is budgeting?',
            heading: 'What Is Budgeting?',
            paragraphs: [
              'Budgeting is a process in which money is allocated, managed and processed over a specific period of time in a budget. A budget is a plan that tracks income, expenses and savings.',
              'The purpose of a budget is to give a person control over their money by clearly showing it comes from and where it goes.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'Why does it matter?',
            heading: 'Why It Matters',
            paragraphs: [
              'The root cause of overspending often comes from poor cash flow management. Most people, when they run low on money, will slow their spending. According to ADP approximately in 2025, 52% of Australians are estimated to be living paycheck to paycheck (ADP, 2025), a situation which a 2024 study published by HarmoniEconomics closely linked to limited financial literacy and an inability to budget effectively (Mayndarto,Andrinaldo and Baronkulovich, 2024).'
            ]
          }
        },

        {
          chapter: 'Creating one',
          left: {
            type: 'prose',
            kicker: 'How to create a budget?',
            heading: 'How To Create A Budget',
            paragraphs: [
              'Separating expenses into a small number of broad categories, such as needs like rent, bills, groceries and discretionary spending like eating out and subscriptions, then setting a rough percentage or dollar target for each. From there, a short weekly or monthly review, checking what went well, what didn&rsquo;t, and what to adjust, helps a budget stay a living plan rather than a one-off spreadsheet exercise.'
            ]
          },
          right: {
            type: 'resource',
            kicker: 'Template',
            heading: 'A Budget Template',
            body: 'A spreadsheet you can copy and fill in with your own income, expenses and savings.',
            href: 'https://docs.google.com/spreadsheets/d/1zi5Dpz6L2mNOB5_AT6P-TAhXpFxCrSAgjlv81FvX0MU/edit?usp=sharing',
            linkText: 'Budget template (Google Sheets)',
            linkSub: 'Opens in a new tab. Use File, then Make a copy, to edit your own.'
          }
        },

        {
          chapter: 'What to watch',
          left: {
            type: 'prose',
            kicker: 'What should someone pay attention to?',
            heading: 'What To Pay Attention To',
            paragraphs: [
              'Simply tracking income and expenses isn&rsquo;t enough, many people who diligently record every transaction still end up unsure what to actually do with that information. What matters more is turning raw numbers into a small set of meaningful checks, such as whether spending stayed within a set percentage for a specific category like dining out or subscription), whether the month ended in a surplus or a deficit, and whether recurring bills and savings goals were consistently met. Some budgeters also track this over longer periods, using quarterly or year-to-date reviews to catch expenses that don&rsquo;t occur every month, rather than relying on a single month&rsquo;s snapshot alone.'
            ]
          },
          right: {
            type: 'table',
            heading: 'A small set of meaningful checks',
            columns: ['Check'],
            rows: [
              ['whether spending stayed within a set percentage for a specific category like dining out or subscription)'],
              ['whether the month ended in a surplus or a deficit'],
              ['whether recurring bills and savings goals were consistently met']
            ],
            note: 'Some budgeters also track this over longer periods, using quarterly or year-to-date reviews to catch expenses that don&rsquo;t occur every month, rather than relying on a single month&rsquo;s snapshot alone.'
          }
        },

        {
          chapter: 'Needs and wants',
          left: {
            type: 'prose',
            kicker: 'Psychology of buying',
            heading: 'Needs And Wants',
            paragraphs: [
              'A need is an expense essential for basic living and functioning, things like rent, groceries or healthcare. A want is a discretionary expense that improves quality of life but isn&rsquo;t strictly necessary to get by, such as eating out, subscriptions, or the latest phone upgrade.',
              'The distinction matters because a budget&rsquo;s needs should generally be covered first, before any money is allocated toward wants, since consistently prioritising wants over needs is one of the most common reasons people fall into financial strain, even while earning a reasonable income.'
            ]
          },
          right: {
            type: 'table',
            heading: 'Question to differentiate',
            columns: ['', 'Examples'],
            rows: [
              ['Need', 'rent, groceries or healthcare'],
              ['Want', 'eating out, subscriptions, or the latest phone upgrade']
            ],
            note: 'Ask yourself this: if you don&rsquo;t buy it, will it have immediate negative consequences for you?'
          }
        },

        {
          chapter: 'Key parts',
          left: {
            type: 'prose',
            kicker: 'Key parts of a budget',
            heading: 'Key Parts Of A Budget',
            paragraphs: [
              'A complete budget is built from four key components working together.',
              'Income is the total money coming in each period, whether from a job, allowance, or other regular source, and forms the ceiling for everything else in the budget.',
              'Fixed expenses are the essential, predictable costs that stay roughly the same each period, such as rent, phone plans, or subscriptions.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'Key parts of a budget',
            heading: 'Variable Expenses And Savings',
            paragraphs: [
              'Variable expenses are the costs that fluctuate month to month, such as groceries, fuel, or entertainment, and require more active monitoring since they&rsquo;re easier to overspend on without noticing.',
              'Savings should be treated as its own category, not just whatever happens to be left over, since setting aside a portion of income before spending the rest ensures long-term financial goals aren&rsquo;t accidentally deprioritised in favour of short-term spending.',
              'Together, these four parts turn a budget from a rough guess into a structured plan someone can actually track and adjust over time.'
            ]
          }
        },

        {
          chapter: 'Knowing success',
          left: {
            type: 'toolkit',
            heading: 'How To Know Your Success',
            intro: 'A budget is working if a person can consistently answer a few simple questions at the end of each period:',
            items: [
              'Did I stay within my planned spending for each category?',
              'Did I avoid relying on debt to cover regular expenses?',
              'Did my savings goal actually get met rather than skipped?'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'How to know your success',
            heading: 'Adjusting Over Time',
            paragraphs: [
              'Spending patterns naturally shift month to month, so when issues do arise, understanding why, and adjusting the budget accordingly is important. Over time, success looks like a growing savings balance and reducing financial stress.'
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
              'Last month they spent $140 on food out with friends and $45 on transport. They had planned to save $50, but put <strong>$0</strong> into savings, because there was nothing set aside by the end of the month.',
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
              'Savings was treated as whatever happens to be left over',
              'Jordan&rsquo;s fixed expenses are too high to allow saving'
            ],
            correct: 1,
            explanation: 'The money was there, $162 of it. Savings should be treated as its own category, not just whatever happens to be left over, so setting the $50 aside before spending the rest would have protected it.'
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
            explanation: 'Food out is a variable expense and a want. Variable expenses fluctuate month to month and require more active monitoring, and eating out is a discretionary expense that improves quality of life but isn&rsquo;t strictly necessary to get by.'
          },
          right: {
            type: 'question',
            prompt: 'Jordan&rsquo;s month ended with more income than expenses. What is that called?',
            options: ['A deficit', 'A surplus', 'Cash flow'],
            correct: 1,
            explanation: 'A surplus is when income exceeds expenses at the end of a budgeting period. A deficit is when expenses exceed income. Cash flow is the movement of money in and out of a budget over time.'
          }
        },

        {
          chapter: 'Check yourself',
          left: {
            type: 'question',
            prompt: 'Which of these best describes a budget?',
            options: [
              'A record of money that has already been spent',
              'A plan that tracks income, expenses and savings',
              'A limit set by a bank on how much can be spent'
            ],
            correct: 1,
            explanation: 'A budget is a plan that tracks income, expenses and savings over a specific period of time.'
          },
          right: {
            type: 'question',
            prompt: 'Why do variable expenses require more active monitoring than fixed expenses?',
            options: [
              'They are always larger than fixed expenses',
              'They fluctuate month to month, so they are easier to overspend on without noticing',
              'They are never essential'
            ],
            correct: 1,
            explanation: 'Variable expenses are the costs that fluctuate month to month, such as groceries, fuel, or entertainment, and require more active monitoring since they&rsquo;re easier to overspend on without noticing.'
          }
        },

        {
          chapter: 'Write it out',
          left: {
            type: 'written',
            prompt: 'In your own words, explain the difference between a need and a want, and why the order matters in a budget.',
            hint: 'Two or three sentences is plenty. Try to include the question you would ask to tell them apart.',
            example: 'A need is an expense essential for basic living and functioning, things like rent, groceries or healthcare. A want is a discretionary expense that improves quality of life but isn\’t strictly necessary to get by. A budget\’s needs should generally be covered first, before any money is allocated toward wants. To tell them apart, ask yourself this: if you don\’t buy it, will it have immediate negative consequences for you?',
            keywords: [
              'need',
              'essential|necessary|must have|basic living|survive',
              'want',
              'discretionary|optional|not strictly necessary|nice to have',
              'needs first|covered first|before wants|priority',
              'consequences|consequence|immediate|go without|happens if'
            ]
          },
          right: {
            type: 'written',
            prompt: 'Jordan says the problem is that they don&rsquo;t earn enough. Using the scenario, explain whether you agree, and what you would change.',
            hint: 'Refer to the numbers. How much was actually left at the end of the month?',
            example: 'I disagree, because Jordan had $162 left at the end of the month and still saved nothing. Savings should be treated as its own category, not just whatever happens to be left over, so Jordan should set the $50 aside before spending the rest. I would also reduce the $140 spent on food out, since that is a variable expense and a want rather than a need.',
            keywords: [
              'income|earn|earning|wage',
              'savings|save|saved',
              'left over|leftover|remaining|left',
              'set aside|before spending|own category|first',
              'food out|eating out|takeaway|friends',
              'variable|discretionary|want'
            ]
          }
        },

        {
          chapter: 'Glossary',
          left: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Budget', def: 'A plan that tracks income, expenses, and savings over a specific period of time.' },
              { term: 'Income', def: 'The total money coming into a budget each period, from a job, allowance, or other regular source.' },
              { term: 'Fixed expense', def: 'An essential, predictable cost that stays roughly the same each period, such as rent or a phone plan.' },
              { term: 'Variable expense', def: 'A cost that fluctuates month to month, such as groceries or entertainment.' },
              { term: 'Need', def: 'An expense essential for basic living and functioning, such as rent, groceries, or healthcare.' },
              { term: 'Want', def: 'A discretionary expense that improves quality of life but isn\’t strictly necessary, such as eating out or a subscription.' },
              { term: 'Surplus', def: 'When income exceeds expenses at the end of a budgeting period.' },
              { term: 'Deficit', def: 'When expenses exceed income at the end of a budgeting period.' },
              { term: 'Cash flow', def: 'The movement of money in and out of a budget over time; poor cash flow management is a leading cause of overspending.' }
            ]
          },
          right: {
            type: 'pullquote',
            quote: 'Budgets are not always an accurate reflection of real spending habits, life is not linear, unforeseen events always arise, but a good budget can help combat and recover from them.',
            list: []
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
              "If you've ever worked a shift and been paid less than your hourly rate times your hours, you've already met the tax system, you just weren't introduced to it properly.",
              "From your very first payslip, you're a taxpayer with a Tax File Number, PAYG withholding, and, depending on how much you earn, a tax return due each year. None of that is optional, and none of it is complicated once someone actually walks you through it."
            ]
          },
          right: {
            type: 'pullquote',
            quote: "You've been a taxpayer since your first shift, you just weren't told.",
            list: [
              "Tax is withheld before you're paid, not billed to you afterward.",
              'Claiming the threshold with your main job stops you overpaying all year.',
              'A bracket only taxes the slice of income inside it, never your whole income.'
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
              "Tax isn't billed to you after the fact, it's withheld before the money reaches you, through a system called PAYG (pay as you go). Your employer calculates it from your Tax File Number declaration and sends it to the ATO on your behalf, pay by pay.",
              "The first $18,200 you earn in a financial year is tax-free, but only if you've claimed the threshold with one employer. Claim it with two jobs at once and both withhold as if it's your only income, so you'll likely owe the difference back.",
              'After that, income is taxed in brackets: each rate only applies to the slice of income inside that bracket, not your whole income. That\'s why your marginal rate (the rate on your next dollar) is always higher than your effective rate (your total tax divided by your total income).'
            ]
          },
          right: {
            type: 'table',
            heading: 'Resident tax rates, 2026, 27',
            columns: ['Income range', 'Rate'],
            rows: [
              ['$0, $18,200', '0%'],
              ['$18,201, $45,000', '15%'],
              ['$45,001, $135,000', '30%'],
              ['$135,001, $190,000', '37%'],
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
            heading: 'Worked Example, Jordan, $52,000 salary',
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
              { label: '15% bracket ($18,201, $45,000)', value: '$4,020' },
              { label: '30% bracket ($45,001, $52,000)', value: '$2,100' },
              { label: 'Tax subtotal', value: '$6,120' },
              { label: 'Medicare levy (2%)', value: '$1,040' },
              { label: 'Take-home pay', value: '$44,840', isTotal: true }
            ],
            caption: "Marginal rate: 30%, the rate on Jordan's next dollar. Effective rate: 13.8%, total tax ÷ gross income, always lower than the marginal rate. That's about $862 a week take-home."
          }
        },
        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: 'You work two casual jobs. What should you do about claiming the tax-free threshold?',
            options: [
              'Claim it with both employers, to get more in each pay',
              'Claim it with only one employer, usually your main job',
              'Never claim it, to avoid any tax at all'
            ],
            correct: 1,
            explanation: "Claiming the threshold twice means both employers withhold as if it's your only income, you'll likely owe the difference back at tax time. Claim it with one employer only."
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
            explanation: 'Tax brackets apply to slices, not your whole income. Only the portion between $45,001 and $52,000 is taxed at 30%, the rest is taxed at the lower rates below it.'
          }
        },
        {
          chapter: 'Toolkit',
          left: {
            type: 'toolkit',
            heading: 'This Week',
            items: [
              'Find your last payslip and locate the “PAYG withholding” line, that’s the tax already taken out.',
              "Check you've only ticked “claim the tax-free threshold” with one employer, if you have more than one job.",
              'Confirm your employer has your correct Tax File Number on file.',
              'Mark 31 October in your calendar, the usual tax return deadline for most people.'
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'TFN', def: 'Your personal Tax File Number with the ATO, used by every job you have.' },
              { term: 'PAYG withholding', def: 'Tax your employer takes out of each pay and sends to the ATO on your behalf.' },
              { term: 'Tax-free threshold', def: 'The first $18,200 you earn in a financial year, taxed at 0%.' },
              { term: 'Marginal rate', def: 'The tax rate on your next dollar earned, not on your whole income.' },
              { term: 'Effective rate', def: 'Your total tax divided by your total income, usually lower than your marginal rate.' },
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
              "Superannuation is the only part of your income you won't see for decades, which makes it the easiest one to ignore completely. But it's also the part where starting early does more work than almost anything else you can do with money, because it has the most time to compound.",
              'A fifteen-year-old with a casual job already has a super account quietly accumulating, or not. Whether it’s actually growing, whether the fees are reasonable, and whether it’s still there next time you check are all worth two minutes of attention now, instead of a surprise at 60.'
            ]
          },
          right: {
            type: 'pullquote',
            quote: 'The best time to start was your first payslip. The next best time is this one.',
            list: [
              "Super is paid on top of your wage, not out of it.",
              "You can't touch it until 60. That's the whole point.",
              'Fees are a percentage taken every year, forever, so smaller is better.'
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
              'Superannuation is money paid on top of your wage, not out of it, your employer is required to contribute 12% of your ordinary earnings into a super fund, in addition to your pay, not deducted from it.',
              "Once it arrives, it isn't just stored, it's invested, growing (or shrinking) with the market over decades, which is why fees matter: a fee is a percentage taken every single year, for as long as the account exists.",
              'Your account is also “stapled” to you, it follows you from job to job unless you actively choose a new one, which stops duplicate accounts (and duplicate fees) piling up every time you start a new casual job. Since 1 July 2026, “Payday Super” also means your employer has to pay it within 7 business days of each payday, not just once a quarter, so it’s worth checking it actually lands.'
            ]
          },
          right: {
            type: 'table',
            heading: 'Your wage vs. your super',
            columns: ['', 'Wage', 'Super'],
            rows: [
              ['Paid', 'To you, each payday', 'To your fund, on top of your wage'],
              ['Access', 'Now', 'From your preservation age (60)'],
              ['Between jobs', 'Resets with a new employer', 'Stays with you, stapling'],
              ['Growth', "Doesn't grow itself", 'Invested, compounds over decades']
            ]
          }
        },
        {
          chapter: 'Worked example',
          left: {
            type: 'prose',
            kicker: 'Worked example',
            heading: 'Worked Example, Starting at 18 vs. 28',
            paragraphs: [
              'Two people, same job, same $55,000 salary, same 12% super guarantee, same average return, the only difference is when they started. One begins contributing at 18. The other starts an identical job, on identical terms, at 28: ten years later.',
              "By a preservation age of 60, that ten-year head start is worth roughly double, not because they contributed more each year, but because their money had ten extra years to compound."
            ]
          },
          right: {
            type: 'barchart',
            heading: 'Balance at 60 (today’s dollars)',
            bars: [
              { label: 'Starting at 18', value: 706000, display: '$706,000' },
              { label: 'Starting at 28', value: 337000, display: '$337,000' }
            ],
            caption: 'Illustrative only. Assumes a constant $55,000 salary, 12% employer contributions, and an average return of roughly 6.5% p.a. after fees and tax, in today’s dollars. Real outcomes depend on salary, fund performance and fees, check your own fund’s calculator for a personal projection.'
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
              'It doesn’t, more accounts means more savings',
              'Each account can charge its own fees, quietly shrinking your balance',
              'The ATO automatically merges them for free every year'
            ],
            correct: 1,
            explanation: "Multiple accounts usually means multiple sets of fees, all chipping away at your balance. Consolidating into one account, after checking for any insurance you'd lose, usually leaves you better off."
          }
        },
        {
          chapter: 'Toolkit',
          left: {
            type: 'toolkit',
            heading: 'This Week',
            items: [
              'Log into your super account (or find your latest statement) and check the balance is actually growing.',
              'Check how many super accounts you have, if it’s more than one, look into consolidating them.',
              'Compare your fund’s fees against at least one other fund using a comparison tool.',
              'After your next payday, check the 12% super contribution actually landed in your account.'
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Super guarantee (SG)', def: 'The minimum percentage of your wage your employer must pay into your super, on top of your pay.' },
              { term: 'Preservation age', def: 'The age, 60, for most people today, you can generally access your super.' },
              { term: 'Stapling', def: 'Your super account “follows” you between jobs unless you actively choose a new one.' },
              { term: 'Consolidating', def: 'Combining multiple super accounts into one, to stop paying multiple sets of fees.' },
              { term: 'Compounding', def: 'Investment returns earning their own returns over time, why starting early matters so much.' },
              { term: 'Concessional contributions', def: 'Contributions taxed at 15% going in, like employer SG, generally lower than income tax.' }
            ]
          }
        }
      ]
    }
  ];

  window.LL_BOOKS = BOOKS;
})();
