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
          chapter: 'Why it matters',
          left: {
            type: 'prose',
            kicker: 'Why it matters',
            heading: 'Why It Matters',
            paragraphs: [
              "Every dollar you earn already has an invisible plan, whether you've written one down or not — it either goes somewhere on purpose, or it goes somewhere by accident. A budget isn't about restriction. It's about being the one who decides which of those it is.",
              "Most people don't fail at budgeting because they're bad with money — they fail because they never actually looked at where it was going in the first place. The $53 a week that goes missing isn't a moral failure. It's just what happens when nobody's counting."
            ]
          },
          right: {
            type: 'pullquote',
            quote: "A budget doesn't restrict you. It tells your money what to do before you do.",
            list: [
              "You already have a budget — you just haven't written it down.",
              "Needs and wants aren't good or bad. They're just different jobs for your money.",
              "A buffer and a goal aren't the same thing, even though they're both “savings.”"
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
              "Split spending into two kinds of costs: fixed (about the same every time — rent, a phone plan, a subscription) and variable (moves around — food, fuel, going out). Knowing which is which tells you where there's actually room to move.",
              "A rough shape to start from is 50/30/20: about half toward needs, about a third toward wants, the rest toward savings. It's a starting point to adjust from, not a rule to hit exactly.",
              "Two different savings jobs matter here too: a buffer (a small cushion for the unexpected) and a sinking fund (money saved on purpose for something specific you already know is coming)."
            ]
          },
          right: {
            type: 'splitbar',
            heading: 'A shape to start from — not a rule',
            segments: [
              { label: 'Needs', pct: 50, color: NAVY },
              { label: 'Wants', pct: 30, color: OXBLOOD },
              { label: 'Savings', pct: 20, color: GREEN }
            ]
          }
        },
        {
          chapter: 'Worked example',
          left: {
            type: 'prose',
            kicker: 'Worked example',
            heading: 'Worked Example — Mia, 17',
            paragraphs: [
              "Mia works a casual shift at a café and takes home $420 most weeks. $80 goes straight to her parents for board. She's confident about her phone plan and transport costs, and she's been putting money toward a trip.",
              "But when she added up everything she could actually name, there was still $53 a week she couldn't account for — not one big purchase, just a gap between what came in and what she could explain."
            ]
          },
          right: {
            type: 'barchart',
            heading: "Where Mia's $420 actually went",
            bars: [
              { label: 'Board', value: 80, display: '$80' },
              { label: 'Essentials', value: 75, display: '$75' },
              { label: 'Savings', value: 60, display: '$60' },
              { label: 'Going out', value: 152, display: '$152' },
              { label: 'Unaccounted', value: 53, display: '$53' }
            ],
            caption: "The point isn't that $53 is a disaster. It's that Mia couldn't have told you where it went — until she wrote it down."
          }
        },
        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: "Mia takes home $420 a week and gives $80 to her parents for board. Which of these is a fixed cost in her budget?",
            options: ['Going out with friends', '$80 board', 'Weekly petrol'],
            correct: 1,
            explanation: "Board is the same amount most weeks, which makes it a fixed cost. Going out and petrol both move around depending on the week — that makes them variable."
          },
          right: {
            type: 'question',
            prompt: "What's the actual point of the 50/30/20 split?",
            options: [
              'A legal requirement for how you must spend your money',
              'A rough starting shape to adjust from, not a fixed rule',
              "A way to guarantee you'll never run out of money"
            ],
            correct: 1,
            explanation: "50/30/20 is a starting shape, not a law. Some weeks — or some incomes — won't fit it neatly, and that's fine. The point is having a shape to compare against, not hitting the numbers exactly."
          }
        },
        {
          chapter: 'Toolkit',
          left: {
            type: 'toolkit',
            heading: 'This Week',
            items: [
              'Write down every dollar that came in and went out for one week — no judgement, just numbers.',
              "Open a second account and give it one job: holding money you're not allowed to spend yet.",
              'Pick one number — savings, or spending, or debt — and check it every Sunday for a month.',
              "Find the “$53” in your own spending: the category you couldn't explain if someone asked."
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Budget', def: "A plan for money you haven't spent yet — not a record of money you already have." },
              { term: 'Fixed cost', def: "A bill that's about the same every time: rent, a phone plan, a subscription." },
              { term: 'Variable cost', def: 'Spending that changes week to week: food, fuel, going out.' },
              { term: 'Buffer', def: 'A small cash cushion for the unexpected — a bill, a repair, a bad week.' },
              { term: 'Sinking fund', def: 'Money saved gradually toward something specific and expected, like new shoes or a trip.' },
              { term: '50/30/20', def: 'A rough shape (needs / wants / savings), not a rule — a starting point to adjust from.' }
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
