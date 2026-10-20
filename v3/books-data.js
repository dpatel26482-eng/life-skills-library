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
              'The purpose of a budget is to give a person control over their money by clearly showing where it comes from and where it goes.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'Why does it matter?',
            heading: 'Why It Matters',
            paragraphs: [
              'The root cause of overspending often comes from poor cash flow management. Most people, when they run low on money, will slow their spending. According to ADP, in 2025 approximately 52% of Australians are estimated to be living paycheck to paycheck (ADP, 2025), a situation which a 2024 study published by HarmoniEconomics closely linked to limited financial literacy and an inability to budget effectively (Mayndarto, Andrinaldo and Baronkulovich, 2024).'
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
              'Simply tracking income and expenses isn&rsquo;t enough. Many people who diligently record every transaction still end up unsure what to actually do with that information. What matters more is turning raw numbers into a small set of meaningful checks, such as whether spending stayed within a set percentage for a specific category like dining out or subscriptions, whether the month ended in a surplus or a deficit, and whether recurring bills and savings goals were consistently met. Some budgeters also track this over longer periods, using quarterly or year-to-date reviews to catch expenses that don&rsquo;t occur every month, rather than relying on a single month&rsquo;s snapshot alone.'
            ]
          },
          right: {
            type: 'table',
            heading: 'A small set of meaningful checks',
            columns: ['Check'],
            rows: [
              ['whether spending stayed within a set percentage for a specific category like dining out or subscriptions'],
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
              'Spending patterns naturally shift month to month, so when issues do arise, understanding why and adjusting the budget accordingly is important. Over time, success looks like a growing savings balance and reducing financial stress.'
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
          chapter: 'Questions',
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
          chapter: 'Questions II',
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
          chapter: 'Worded questions',
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
            quote: 'Budgets are not always an accurate reflection of real spending habits. Life is not linear and unforeseen events always arise, but a good budget can help combat and recover from them.',
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
          chapter: 'What it is',
          left: {
            type: 'prose',
            kicker: 'What is tax?',
            heading: 'What Is Tax?',
            paragraphs: [
              'Tax is money collected by the government from income, purchases, and other financial activities, used to fund public services such as healthcare, education, and infrastructure. In Australia, the financial year runs from 1 July to 30 June, different to a normal calendar year.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'What is the purpose?',
            heading: 'What It Is For',
            paragraphs: [
              'The purpose of tax is to fund the shared services and infrastructure a country relies on, while an effective tax system depends on a high level of willing participation, built on people trusting and understanding how the system works.'
            ]
          }
        },

        {
          chapter: 'Why it matters',
          left: {
            type: 'prose',
            kicker: 'Why does it matter?',
            heading: 'Why It Matters',
            paragraphs: [
              'Tax confusion is widespread, not just among young people. Nearly three-quarters (73%) of Australians report feeling worried or anxious about tax time, and more than half (54%) fear making a mistake on their return. Separately, research commissioned by the ATO found that young Australians&rsquo; knowledge of tax and superannuation is particularly low, especially around why tax exists, how to lodge a return, and where to turn for help.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'How do you pay taxes?',
            heading: 'Pay As You Go',
            paragraphs: [
              'In Australia, we use a system called PAYG, which stands for &ldquo;Pay As You Go.&rdquo; If you&rsquo;re an employee, your employer automatically deducts tax from your wages each payday and sends it to the government on your behalf. This means your taxes are gradually paid throughout the year.',
              'At the end of the financial year, you lodge a tax return to ensure you&rsquo;ve paid the correct amount. If you&rsquo;ve paid too much, you&rsquo;ll receive a tax refund; if you&rsquo;ve paid too little, you may owe money. (Self-employed individuals use a different system where they manage their own tax payments).'
            ]
          }
        },

        {
          chapter: 'Lodging a return',
          left: {
            type: 'prose',
            kicker: 'How do you actually lodge a tax return?',
            heading: 'Lodging A Return',
            paragraphs: [
              'Most people need a myGov account linked to the ATO to lodge online, along with a Tax File Number (TFN), a personal reference number within Australia&rsquo;s tax and super system. Without a TFN, an employer is required to withhold tax from your pay at the highest possible rate, so obtaining one early is important.',
              'Once linked, a return declares all income earned within the financial year, including part-time, casual, or freelance work, so the ATO can calculate what&rsquo;s owed or refunded.'
            ]
          },
          right: {
            type: 'toolkit',
            heading: 'Important Things To Consider',
            items: [
              'A person must determine their residency status for tax purposes.',
              'When filling out a return in myTax (the ATO&rsquo;s online system), a person must manually provide their bank account details (BSB and Account Number).',
              'If a person chooses to self-lodge a return online via myGov, they must submit it by October 31st from 1st July.'
            ]
          }
        },

        {
          chapter: 'Tax brackets',
          left: {
            type: 'prose',
            kicker: 'Tax brackets',
            heading: 'Tax Brackets',
            paragraphs: [
              'Australia uses a progressive tax system. This means as someone earns, the higher the tax rate applied to higher portions of their income. Moving into a higher tax bracket does not mean all of their money is taxed at that higher rate, only the portion of income inside that higher bracket is.',
              'If the person is an employee, their employer automatically deducts tax from their paycheck each pay cycle based on these brackets and sends it to the Australian Taxation Office (ATO). Taxable income is total earnings minus any eligible work-related tax deductions like uniform.'
            ]
          },
          right: {
            type: 'image',
            kicker: 'Brackets themselves',
            heading: 'Resident Tax Rates',
            src: 'assets/tax-brackets.png',
            alt: 'Australian resident tax rates for 2026 to 2027 and 2025 to 2026, showing taxable income ranges against the tax owed on each range.',
            caption: 'Tap the table to open it full size. The rates shown do not include the Medicare levy of 2%.',
            link: {
              intro: 'The rates change from year to year, so it is worth reading them at the source rather than memorising them. This ATO page lists the current brackets for Australian residents, and is the page to check before working out what you owe.',
              href: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
              text: 'Tax rates for Australian residents (ATO)',
              sub: 'Opens in a new tab on ato.gov.au'
            }
          }
        },

        {
          chapter: 'Deductions',
          left: {
            type: 'prose',
            kicker: 'Deductions',
            heading: 'What A Deduction Is',
            paragraphs: [
              'Tax deductions are allowable expenses that reduce an individual&rsquo;s total taxable income, thereby lowering the amount of tax owed to the government. They have got nothing to do with their income. It&rsquo;s entirely based on whether a person is required to spend money in the course of earning their income.',
              'Deductions are very highly dependent on the job occupation. They also depend on whether the investments a person has they can claim deductions against and/or contribute to super. It will also substantially depend on whether someone is an employee or self-employed. The self-employed will typically have much higher deductions because they have to pay all their business costs themselves.',
              'Common deductions typically include work-related expenses such as compulsory uniforms, protective equipment, and professional development courses, alongside home office utility costs, charitable donations to registered organisations, and tax preparation fees.'
            ]
          },
          right: {
            type: 'toolkit',
            heading: 'Substantiation Rules',
            intro: 'Tax deduction claims can be reviewed, audited, or investigated by the Australian Taxation Office (ATO). To properly claim a deduction, taxpayers must follow strict substantiation rules:',
            items: [
              'A person must have personally incurred the expense, it must directly relate to earning their income, and they must maintain verifiable documentation, such as receipts, invoices, or digital logs.',
              'These claims are recorded by inputting the total eligible dollar amounts into the dedicated &ldquo;Deductions&rdquo; section of your annual income tax return typically through an official government tax portal, such as the ATO&rsquo;s myTax.'
            ],
            link: {
              intro: 'What you can claim depends almost entirely on the job you do, so a general list only gets you so far. This ATO page breaks the rules down by occupation and expense type, which is the quickest way to check whether something you have paid for actually counts.',
              href: 'https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/deductions-you-can-claim',
              text: 'Deductions you can claim (ATO)',
              sub: 'Opens in a new tab on ato.gov.au'
            }
          }
        },

        {
          chapter: 'Types of tax',
          left: {
            type: 'prose',
            kicker: 'Different types of tax',
            heading: 'Three Main Types',
            paragraphs: [
              'Taxes are broadly categorised into three main types based on what is being taxed: income, consumption, and wealth.',
              'Depending on the type, these taxes are paid either through direct withholding from paychecks (income), automatically added to the final price at retail registers (consumption), or remitted directly to tax authorities through periodic annual or quarterly filings (Wealth).'
            ]
          },
          right: {
            type: 'toolkit',
            heading: 'What Each One Taxes',
            items: [
              'Income taxes are levied on the earnings of individuals and businesses, typically operating on a progressive scale where higher earners pay a larger percentage.',
              'Consumption taxes, such as sales tax and Value Added Tax (VAT), are assessed on goods and services at the point of purchase, while excise taxes apply specifically to particular goods like fuel.',
              'Wealth and property taxes are imposed on owned assets, including real estate, personal property, and estates passed down through inheritance.'
            ],
            link: {
              intro: 'If you have ever wondered which of these actually raises the most money, this Parliamentary Budget Office explainer sets out Australia&rsquo;s tax mix and shows how much each type contributes, which puts the three categories above into proportion.',
              href: 'https://www.pbo.gov.au/about-budgets/budget-insights/budget-explainers/tax-mix/appendix-a',
              text: 'Australia&rsquo;s tax mix (Parliamentary Budget Office)',
              sub: 'Opens in a new tab on pbo.gov.au'
            }
          }
        },

        {
          chapter: 'Tax and super',
          left: {
            type: 'prose',
            kicker: 'Tax connection to Super',
            heading: 'How Tax Meets Super',
            paragraphs: [
              'Superannuation (super) and income tax are closely linked through a tax-effective retirement scheme designed to encourage long-term savings. In Australia, superannuation benefits from &ldquo;concessional&rdquo; tax rates, meaning money placed into a super account is taxed at a flat rate of 15% rather than an individual&rsquo;s higher marginal income tax rate.',
              'Individuals can leverage this connection through pre-tax contributions, such as voluntary salary sacrifice or claiming personal tax deductions on after-tax contributions, which reduces their total assessable income and lowers their overall personal tax bill.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'What happens later',
            heading: 'Inside The Fund',
            paragraphs: [
              'Furthermore, the investment earnings generated within a super fund are also taxed at a maximum rate of 15% during a person&rsquo;s working life, and withdrawals generally become entirely tax-free once a member reaches age 60 and meets a condition of release.'
            ],
            link: {
              intro: 'Super is taxed at three separate points, going in, while invested, and coming out, and it is easy to mix them up. This Moneysmart page walks through all three in plain language, and is a good place to look before deciding whether salary sacrifice is worth it for you.',
              href: 'https://moneysmart.gov.au/how-super-works/tax-and-super',
              text: 'Tax and super (Moneysmart)',
              sub: 'Opens in a new tab on moneysmart.gov.au'
            }
          }
        },

        {
          chapter: 'Scenario',
          left: {
            type: 'scenario',
            kicker: 'Scenario',
            heading: 'Mia, 18',
            paragraphs: [
              'Mia worked part-time at a cinema through the 2025 to 2026 financial year and earned <strong>$21,400</strong> in total. Her employer took tax out of every payslip under PAYG and sent it to the ATO, withholding <strong>$980</strong> across the year.',
              'She paid $150 for the compulsory uniform she has to wear on shift, and kept the receipts. She has a TFN and a myGov account linked to the ATO.',
              'Mia is putting off lodging her return. She earned more than $18,200, and she believes that means <strong>all</strong> of her $21,400 is now taxed, so she expects a bill rather than a refund.'
            ],
            facts: [
              { label: 'Total earned', value: '$21,400' },
              { label: 'Uniform (deduction)', value: '$150' },
              { label: 'Taxable income', value: '$21,250' },
              { label: 'Tax free threshold', value: '$18,200' },
              { label: 'Income above threshold', value: '$3,050' },
              { label: 'Tax owed at 16c in the $1', value: '$488' },
              { label: 'Tax withheld under PAYG', value: '$980' },
              { label: 'Refund due', value: '$492', isTotal: true }
            ]
          },
          right: {
            type: 'question',
            prompt: 'Mia believes that earning more than $18,200 means all of her $21,400 is taxed. Why is she wrong?',
            options: [
              'The tax free threshold only applies to people under 18',
              'Only the portion of income inside a higher bracket is taxed at that bracket&rsquo;s rate',
              'Her employer already paid the tax, so she owes nothing at all'
            ],
            correct: 1,
            explanation: 'Australia uses a progressive tax system. Moving into a higher bracket does not mean all of someone&rsquo;s money is taxed at the higher rate, only the portion of income inside that bracket is. Mia&rsquo;s first $18,200 is taxed at nil, and only the $3,050 above it is taxed at all.'
          }
        },

        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: 'Mia&rsquo;s uniform cost $150 and she kept the receipts. What does claiming it as a deduction actually do?',
            options: [
              'It is taken straight off the tax she owes, so her bill drops by $150',
              'It reduces her taxable income, so she is taxed on $21,250 rather than $21,400',
              'It increases her refund by $150 regardless of what she earned'
            ],
            correct: 1,
            explanation: 'A deduction is an allowable expense that reduces total taxable income, which then lowers the tax owed. It does not come off the tax bill directly. The $150 took Mia&rsquo;s taxable income from $21,400 down to $21,250, which reduced the tax owed by $24, not by $150.'
          },
          right: {
            type: 'question',
            prompt: 'Mia had $980 withheld but only owes $488. What happens when she lodges her return?',
            options: [
              'She receives a tax refund of $492',
              'She owes the ATO a further $492',
              'The extra $492 is paid into her super fund'
            ],
            correct: 0,
            explanation: 'Under PAYG, tax is paid gradually across the year, and the return settles up at the end. If you&rsquo;ve paid too much, you&rsquo;ll receive a tax refund; if you&rsquo;ve paid too little, you may owe money. Mia paid $980 against a $488 bill, so $492 comes back to her.'
          }
        },

        {
          chapter: 'Questions II',
          left: {
            type: 'question',
            prompt: 'When does the Australian financial year run?',
            options: [
              '1 January to 31 December, the same as the calendar year',
              '1 July to 30 June',
              '1 April to 31 March'
            ],
            correct: 1,
            explanation: 'In Australia, the financial year runs from 1 July to 30 June, different to a normal calendar year.'
          },
          right: {
            type: 'question',
            prompt: 'What happens if you start a job without giving your employer a Tax File Number?',
            options: [
              'You pay no tax until you provide one',
              'Your employer is required to withhold tax at the highest possible rate',
              'Your employer cannot legally pay you at all'
            ],
            correct: 1,
            explanation: 'Without a TFN, an employer is required to withhold tax from your pay at the highest possible rate, so obtaining one early is important.'
          }
        },

        {
          chapter: 'Worded questions',
          left: {
            type: 'written',
            prompt: 'In your own words, explain what a progressive tax system is, and why moving into a higher tax bracket does not mean all of your income is taxed at that higher rate.',
            hint: 'Two or three sentences is plenty. It may help to talk about which portion of the income is taxed at which rate.',
            example: 'A progressive tax system means the rate rises as income rises, so higher portions of income are taxed at higher rates. Moving into a higher bracket does not mean all of your money is taxed at that rate, only the portion of income that sits inside the higher bracket is. For example the first $18,200 is taxed at nil no matter how much you earn in total, and only the income above it is taxed at all.',
            keywords: [
              'progressive',
              'rate rises|higher rate|increases|goes up',
              'portion|part|only the amount|the income above',
              'bracket|brackets',
              'threshold|18,200|18200|tax free'
            ]
          },
          right: {
            type: 'written',
            prompt: 'Using Mia&rsquo;s scenario, explain why she received a refund rather than a bill, and what her uniform deduction changed.',
            hint: 'Refer to the numbers. How much was withheld, and how much did she actually owe?',
            example: 'Mia received a refund because PAYG meant her employer withheld $980 across the year, but once her return was worked out she only owed $488, so the extra $492 came back to her. Her $150 uniform was an allowable work-related expense, so claiming it reduced her taxable income from $21,400 to $21,250. That lowered the amount she was taxed on rather than coming off the tax bill directly, so it reduced what she owed by $24 rather than $150.',
            keywords: [
              'refund|back|returned',
              'withheld|980|PAYG|paid too much',
              '488|owed|actually owed',
              'deduction|uniform|work-related|expense',
              'taxable income|reduced|lowered|21,250|21250'
            ]
          }
        },

        {
          chapter: 'Glossary',
          left: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Tax', def: 'Money collected by the government from income, purchases, and other financial activities, used to fund public services.' },
              { term: 'Financial year', def: 'The twelve month period a tax return covers. In Australia it runs from 1 July to 30 June.' },
              { term: 'ATO', def: 'The Australian Taxation Office, the government agency that collects tax and processes returns.' },
              { term: 'PAYG', def: 'Pay As You Go. The system where an employer deducts tax from each payslip and sends it to the government on your behalf.' },
              { term: 'Tax return', def: 'An annual declaration of all income earned within the financial year, used to work out what is owed or refunded.' },
              { term: 'Tax refund', def: 'Money returned to you when the tax withheld across the year was more than the tax you actually owed.' },
              { term: 'Tax File Number (TFN)', def: 'A personal reference number within Australia&rsquo;s tax and super system. Without one, an employer must withhold tax at the highest possible rate.' },
              { term: 'myGov', def: 'The government account you link to the ATO in order to lodge a return online.' },
              { term: 'myTax', def: 'The ATO&rsquo;s online system for filling out and submitting a tax return.' },
              { term: 'Residency status', def: 'Whether you count as an Australian resident for tax purposes, which a person must determine before lodging.' },
              { term: 'BSB', def: 'The six digit code identifying your bank branch, entered with your account number so a refund can be paid to you.' },
              { term: 'Progressive tax system', def: 'A system where the tax rate applied rises as income rises, so higher portions of income are taxed at higher rates.' },
              { term: 'Tax bracket', def: 'A band of income with its own tax rate. Only the portion of income inside a bracket is taxed at that bracket&rsquo;s rate.' }
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary, continued',
            terms: [
              { term: 'Tax free threshold', def: 'The first portion of income taxed at nil, currently the first $18,200 earned in a financial year.' },
              { term: 'Taxable income', def: 'Total earnings minus any eligible work-related tax deductions.' },
              { term: 'Marginal tax rate', def: 'The rate applied to the next dollar you earn, set by the bracket that dollar falls into.' },
              { term: 'Tax deduction', def: 'An allowable expense that reduces total taxable income, thereby lowering the amount of tax owed.' },
              { term: 'Substantiation', def: 'The requirement to prove a claim, by having personally incurred the expense, relating it directly to earning income, and keeping documentation.' },
              { term: 'Medicare levy', def: 'An additional 2% charge on taxable income that funds public health, charged on top of the rates shown in the brackets table.' },
              { term: 'Income tax', def: 'Tax levied on the earnings of individuals and businesses, typically on a progressive scale.' },
              { term: 'Consumption tax', def: 'Tax assessed on goods and services at the point of purchase, such as sales tax and Value Added Tax (VAT).' },
              { term: 'Excise tax', def: 'A consumption tax applying specifically to particular goods, such as fuel.' },
              { term: 'Wealth and property tax', def: 'Tax imposed on owned assets, including real estate, personal property, and estates passed down through inheritance.' },
              { term: 'Superannuation (super)', def: 'A retirement savings scheme taxed at concessional rates to encourage long-term saving.' },
              { term: 'Concessional tax rate', def: 'The reduced flat rate of 15% applied to money placed into super, rather than a person&rsquo;s higher marginal income tax rate.' },
              { term: 'Salary sacrifice', def: 'A voluntary pre-tax contribution into super, which reduces total assessable income and lowers the overall personal tax bill.' },
              { term: 'Condition of release', def: 'The requirement a member must meet, generally alongside reaching age 60, before withdrawals become entirely tax-free.' }
            ]
          }
        }
      ]
    },

    {
      id: 'super',
      number: 'III',
      title: 'Superannuation',
      tagline: "the money you can't touch yet",
      spineClass: 'spine-super',
      hotspot: { x: '20%', y: '54%' },
      spreads: [
        {
          chapter: 'Definition',
          left: {
            type: 'prose',
            kicker: 'What is super?',
            heading: 'What Super Is',
            paragraphs: [
              'Superannuation, often called &ldquo;super&rdquo;, is a compulsory, long-term savings system in Australia. It is designed to help workers build funds and accumulate money over time for their retirement.'
            ]
          },
          right: {
            type: 'prose',
            kicker: 'How does super work?',
            heading: 'How It Works',
            paragraphs: [
              'During your working life, your employer is legally required to pay a percentage of your earnings, known as the Superannuation Guarantee (SG), into a super fund on your behalf.',
              'These superannuation funds then invest this money in a range of different modalities, such as property, shares and bonds, to grow your money over time.'
            ]
          }
        },

        {
          chapter: 'Conditions of super',
          left: {
            type: 'prose',
            kicker: 'When can you get it?',
            heading: 'Locked Away Until Later',
            paragraphs: [
              'Because the primary purpose of superannuation is to provide income after you retire, super is locked away until you reach your preservation age, currently 60 for anyone born after 1 July 1964, and satisfy a &ldquo;condition of release&rdquo;, such as retiring from work or turning 65.'
            ],
            link: {
              intro: 'Retiring and turning 65 are only two of the ways a condition of release can be met, and the rest matter if your circumstances ever change. This ATO page sets out the full list and what each one allows you to withdraw.',
              href: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super',
              text: 'Withdrawing and using your super (ATO)',
              sub: 'Opens in a new tab on ato.gov.au'
            }
          },
          right: {
            type: 'image',
            kicker: 'Where your pay goes',
            heading: 'Wages And Super',
            src: 'assets/super-pay-flow.svg',
            alt: 'Diagram. Gross wages have income tax withheld to become net wages in your bank account. Separately, the Super Guarantee of 12 per cent of ordinary time earnings is paid on top of wages into a super fund, taxed at 15 per cent on the way in, and held until a condition of release.',
            caption: 'Tap to open it full size. Super Guarantee rate and ordinary time earnings: Australian Taxation Office, How much super to pay. Concessional contributions tax rate: Moneysmart, Tax and super. Diagram drawn for this guide.'
          }
        },

        {
          chapter: 'Pay and tax',
          left: {
            type: 'prose',
            kicker: 'Super as pre tax income',
            heading: 'Gross And Net Wages',
            paragraphs: [
              'In Australia, there is gross wages and net wages. Gross wages is the wages you earn before the government taxes them. Net wages is what you get in your bank account after the tax has been paid to the government by your employer.',
              'Under Australia&rsquo;s Superannuation Guarantee (SG), a person&rsquo;s employer must pay superannuation, currently 12%, on top of their ordinary time earnings. This 12% is not taxed as part of your wages.'
            ],
            link: {
              intro: 'The Superannuation Guarantee rate has stepped up over several years and is set in law, so it is worth checking the current figure rather than assuming. This ATO page gives the rate and explains exactly which earnings it is calculated on.',
              href: 'https://www.ato.gov.au/businesses-and-organisations/super-for-employers/paying-super-contributions/how-much-super-to-pay',
              text: 'How much super to pay (ATO)',
              sub: 'Opens in a new tab on ato.gov.au'
            }
          },
          right: {
            type: 'prose',
            kicker: 'What happens to it',
            heading: 'Taxed Inside The Fund',
            paragraphs: [
              'When your employer pays the 12% contribution into your super account, it is treated as a &ldquo;concessional contribution&rdquo;. The Australian Taxation Office (ATO) taxes this amount at a flat rate of 15% inside the fund, and will tax the money again when the fund is accessed.'
            ],
            link: {
              intro: 'Super is taxed going in, while it is invested, and again when it comes out, at different rates each time. This Moneysmart page lays out all three so the 15% above sits in context rather than looking like the whole story.',
              href: 'https://moneysmart.gov.au/how-super-works/tax-and-super',
              text: 'Tax and super (Moneysmart)',
              sub: 'Opens in a new tab on moneysmart.gov.au'
            }
          }
        },

        {
          chapter: 'Types of fund',
          left: {
            type: 'prose',
            kicker: 'Why are there different types?',
            heading: 'Why There Are Different Forms?',
            paragraphs: [
              'Australia&rsquo;s superannuation system serves millions of workers with vastly different income levels, career paths, risk tolerances, and financial goals. Because one single fund cannot cater to everyone, there are distinct types of funds.'
            ]
          },
          right: {
            type: 'toolkit',
            heading: 'The Four Types',
            items: [
              '<strong>Industry super funds.</strong> Created for workers in specific industries like health and construction, most industry funds are now open to everyone. They are run as profit for member entities, meaning profits are returned to members rather than external shareholders.',
              '<strong>Retail super funds.</strong> Operated by financial institutions, investment managers, or banks, these funds are run by profit making companies.',
              '<strong>Self managed super funds.</strong> Private super funds, for up to six people, where the members act as the trustees responsible for managing the fund under Australian Taxation Office (ATO) oversight.',
              '<strong>Corporate super funds.</strong> Established by large companies exclusively for their employees. Within these funds, the employer often negotiates discounted administration fees or subsidises insurance costs for workers.'
            ],
            link: {
              intro: 'Each type carries its own fee structure, insurance cover and governance, and the differences are easier to judge side by side. This Moneysmart page compares the four and flags what to look at before committing to any of them.',
              href: 'https://moneysmart.gov.au/how-super-works/types-of-super-funds',
              text: 'Types of super funds (Moneysmart)',
              sub: 'Opens in a new tab on moneysmart.gov.au'
            }
          }
        },

        {
          chapter: 'Locating super',
          left: {
            type: 'toolkit',
            heading: 'Finding And Comparing',
            intro: 'How to find your super fund, or weigh up the alternatives:',
            items: [
              '<strong>Check your current super via myGov.</strong> Log into your myGov account linked to the ATO. Under the Super tab, you will see a list of all active, inactive, or lost super accounts in your name.',
              '<strong>Use government comparison tools.</strong> Visit the ATO&rsquo;s YourSuper comparison tool, accessible via myGov, or the Moneysmart super comparison tool, to compare performance, fees, and features across public APRA regulated funds.',
              '<strong>Review fund product disclosure statements.</strong> When researching a specific fund online, check its official PDS document to evaluate fees, default insurance cover, and investment menus before transferring your balance.'
            ],
            link: {
              intro: 'The ATO ranks every MySuper product on fees and past performance in one table, which is the fastest way to see whether the fund you are already in is a reasonable one.',
              href: 'https://www.ato.gov.au/calculators-and-tools/yoursuper-comparison-tool',
              text: 'YourSuper comparison tool (ATO)',
              sub: 'Opens in a new tab on ato.gov.au'
            }
          },
          right: {
            type: 'resource',
            kicker: 'Before you switch',
            heading: 'Choosing A Fund',
            body: 'Comparing funds is only half of it. Moving your balance affects the insurance attached to your old account, and it can be worth keeping for reasons that have nothing to do with fees.',
            href: 'https://moneysmart.gov.au/how-super-works/choosing-a-super-fund',
            linkText: 'Choosing a super fund (Moneysmart)',
            linkSub: 'Opens in a new tab on moneysmart.gov.au',
            link: {
              intro: 'And if you have ended up with several accounts from different jobs, each one is charging its own fees against your balance. This page covers bringing them together and what to check first.',
              href: 'https://moneysmart.gov.au/how-super-works/getting-your-super',
              text: 'Getting your super (Moneysmart)',
              sub: 'Opens in a new tab on moneysmart.gov.au'
            }
          }
        },

        {
          chapter: 'Scenario',
          left: {
            type: 'scenario',
            kicker: 'Scenario',
            heading: 'Noah, 19',
            paragraphs: [
              'Noah has just started his first full time job. His ordinary time earnings are <strong>$30,000</strong> a year, and his employer pays the Superannuation Guarantee of <strong>12%</strong> on top of that into a super fund in his name.',
              'He has worked three casual jobs before this one, and thinks he may have opened a super account at each of them without ever checking.',
              'Noah has asked his manager whether he can stop the super and take the money as wages instead. He believes super is coming <strong>out of his pay</strong>, and that he is losing roughly $3,600 a year he could be spending now.'
            ],
            facts: [
              { label: 'Ordinary time earnings', value: '$30,000' },
              { label: 'Super Guarantee rate', value: '12%' },
              { label: 'Paid into super', value: '$3,600' },
              { label: 'Tax inside the fund (15%)', value: '$540' },
              { label: 'Lands in his fund', value: '$3,060' },
              { label: 'Taken out of his wages', value: '$0', isTotal: true }
            ]
          },
          right: {
            type: 'question',
            prompt: 'Noah believes the $3,600 is coming out of his pay. Why is he wrong?',
            options: [
              'Super is deducted from wages, but his employer refunds it later',
              'The Superannuation Guarantee is paid on top of his ordinary time earnings, so his wages are untouched',
              'Super only comes out of pay once someone earns above $45,000'
            ],
            correct: 1,
            explanation: 'Under the Superannuation Guarantee, an employer must pay superannuation, currently 12%, on top of ordinary time earnings. It sits alongside his wages rather than being taken from them, which is why stopping it would not add a cent to his take home pay.'
          }
        },

        {
          chapter: 'Questions',
          left: {
            type: 'question',
            prompt: 'The $3,600 arrives in Noah&rsquo;s fund as a concessional contribution. What happens to it there?',
            options: [
              'Nothing, it is taxed only when he withdraws it at 60',
              'The ATO taxes it at a flat 15% inside the fund, leaving $3,060',
              'It is taxed at his marginal income tax rate, the same as his wages'
            ],
            correct: 1,
            explanation: 'The Australian Taxation Office taxes a concessional contribution at a flat rate of 15% inside the fund. On $3,600 that is $540, leaving $3,060 invested. The flat 15% is lower than most marginal income tax rates, which is the concession.'
          },
          right: {
            type: 'question',
            prompt: 'Noah was born in 2007. When will he be able to take this money out?',
            options: [
              'At any time, provided he gives his fund 30 days notice',
              'At his preservation age, currently 60, and once he satisfies a condition of release',
              'At 65 exactly, with no exceptions'
            ],
            correct: 1,
            explanation: 'Super is locked away until you reach your preservation age, currently 60 for anyone born after 1 July 1964, and satisfy a condition of release, such as retiring from work or turning 65. Both have to be true, which is why the money cannot simply be withdrawn early.'
          }
        },

        {
          chapter: 'Questions II',
          left: {
            type: 'question',
            prompt: 'Noah thinks he has an account from each of his three old casual jobs. What is the quickest way to find out?',
            options: [
              'Ring each former employer and ask which fund they used',
              'Log into myGov linked to the ATO and look under the Super tab',
              'Wait for the funds to write to him at the end of the financial year'
            ],
            correct: 1,
            explanation: 'Logging into a myGov account linked to the ATO shows a list of all active, inactive, or lost super accounts in your name, under the Super tab. It is the one place every account appears, whoever the employer was.'
          },
          right: {
            type: 'question',
            prompt: 'Before moving his balances into a single fund, what should Noah check?',
            options: [
              'Only which fund has the lowest administration fee',
              'The product disclosure statement of each fund, including fees, default insurance cover and investment menus',
              'Nothing, since all APRA regulated funds are required to be identical'
            ],
            correct: 1,
            explanation: 'When researching a specific fund, check its official PDS document to evaluate fees, default insurance cover, and investment menus before transferring your balance. Insurance matters in particular, because closing an old account can end cover that would be harder to replace later.'
          }
        },

        {
          chapter: 'Worded questions',
          left: {
            type: 'written',
            prompt: 'In your own words, explain why superannuation does not reduce the amount of money that reaches someone&rsquo;s bank account.',
            hint: 'Two or three sentences is plenty. It may help to use the words gross, net and on top.',
            example: 'Super is not taken out of your wages. Under the Superannuation Guarantee the employer pays 12% of your ordinary time earnings on top of what you are paid, into a separate super fund. Your gross wages and the tax taken from them are unchanged, so your net wages, the money that reaches your bank account, are exactly the same whether the super is paid or not.',
            keywords: [
              'on top|not taken from|not deducted|separate|extra',
              'employer|superannuation guarantee|sg',
              '12|twelve per cent|twelve percent',
              'ordinary time earnings|wages|earnings',
              'net|take home|bank account|unchanged|same'
            ]
          },
          right: {
            type: 'written',
            prompt: 'Noah has found four super accounts in his name. Explain what he should look at before combining them, and why fees alone are not enough.',
            hint: 'Think about what else is attached to an old account besides a balance.',
            example: 'Noah should read the product disclosure statement for each fund and compare the fees, the default insurance cover and the investment menu, rather than picking on fees alone. Each account is charging its own fees against his balance, so combining them usually saves money, but closing an old account also ends any insurance attached to it. He could lose cover that would be harder or more expensive to get back later, so he should check what he is giving up before transferring.',
            keywords: [
              'product disclosure statement|pds',
              'fees',
              'insurance|cover',
              'investment|menu|options',
              'lose|lost|ends|give up|cancel'
            ]
          }
        },

        {
          chapter: 'Glossary',
          left: {
            type: 'glossary',
            heading: 'Glossary',
            terms: [
              { term: 'Superannuation (super)', def: 'A compulsory, long term savings system in Australia, designed to help workers accumulate money over time for their retirement.' },
              { term: 'Superannuation Guarantee (SG)', def: 'The percentage of your earnings, currently 12%, that an employer is legally required to pay into a super fund on your behalf.' },
              { term: 'Ordinary time earnings', def: 'The earnings the Superannuation Guarantee is calculated on, broadly what you are paid for your ordinary hours of work.' },
              { term: 'Gross wages', def: 'The wages you earn before the government taxes them.' },
              { term: 'Net wages', def: 'What reaches your bank account after your employer has paid the tax to the government.' },
              { term: 'Concessional contribution', def: 'Money paid into super before tax, such as the employer&rsquo;s 12%, taxed at a flat 15% inside the fund rather than at your marginal rate.' },
              { term: 'Preservation age', def: 'The age at which super becomes available, currently 60 for anyone born after 1 July 1964.' },
              { term: 'Condition of release', def: 'An event that must also be satisfied before super can be withdrawn, such as retiring from work or turning 65.' },
              { term: 'Super fund', def: 'The organisation that holds your super and invests it in assets such as property, shares and bonds.' }
            ]
          },
          right: {
            type: 'glossary',
            heading: 'Glossary, continued',
            terms: [
              { term: 'Industry super fund', def: 'A fund created for workers in a specific industry, run as a profit for member entity so profits return to members rather than external shareholders.' },
              { term: 'Retail super fund', def: 'A fund operated by a financial institution, investment manager or bank, run by a profit making company.' },
              { term: 'Self managed super fund', def: 'A private fund for up to six people, where the members act as trustees and manage it under ATO oversight.' },
              { term: 'Corporate super fund', def: 'A fund established by a large company exclusively for its employees, often with discounted fees or subsidised insurance.' },
              { term: 'Trustee', def: 'The person or body legally responsible for running a super fund in the interests of its members.' },
              { term: 'myGov', def: 'The government account that, once linked to the ATO, lists every active, inactive or lost super account in your name.' },
              { term: 'Lost super', def: 'An account your fund can no longer contact you about, or one that has been inactive, often left behind after changing jobs.' },
              { term: 'APRA regulated fund', def: 'A public super fund supervised by the Australian Prudential Regulation Authority, which is what the government comparison tools cover.' },
              { term: 'Product disclosure statement (PDS)', def: 'A fund&rsquo;s official document setting out its fees, default insurance cover and investment menus.' }
            ]
          }
        }
      ]
    }
  ];

  window.LL_BOOKS = BOOKS;
})();
