// CLIENT TO REVIEW: this is sample educational content. Have a qualified professional review
// and update it before publishing. It deliberately avoids deadlines, rates and thresholds,
// which change over time and must be verified against current law.
export const resourceCategories = [
  { id: 'all', label: 'All topics' },
  { id: 'tax', label: 'Tax and compliance' },
  { id: 'gst', label: 'GST' },
  { id: 'finance', label: 'Business finance' },
  { id: 'accounting', label: 'Accounting practice' },
];

export const articles = [
  {
    id: 'tax-records',
    category: 'tax',
    title: 'Keeping tax records in order throughout the year',
    summary: 'Good records turn filing season from a scramble into a routine.',
    points: [
      'Keep proof of income, deductions and investments in one place, as you receive them.',
      'Keep personal and business bank accounts separate.',
      'Review your position with an advisor before the year closes, not after.',
    ],
  },
  {
    id: 'tax-planning',
    category: 'tax',
    title: 'Why tax planning works best before year-end',
    summary: 'Options narrow as the year closes. Early conversations leave more choices open.',
    points: [
      'Estimate your income and liabilities part-way through the year.',
      'Discuss available options while there is still time to act on them.',
      'Confirm the rules that apply to you for the current year, as they can change.',
    ],
  },
  {
    id: 'gst-basics',
    category: 'gst',
    title: 'GST registration in plain terms',
    summary: 'Whether you must register depends on your business activity and location.',
    points: [
      'Registration requirements depend on the nature of your supplies and applicable limits.',
      'Registered businesses issue tax invoices and file periodic returns.',
      'Check current thresholds and rules with an advisor before deciding.',
    ],
  },
  {
    id: 'gst-reconciliation',
    category: 'gst',
    title: 'Matching your books with GST returns',
    summary: 'Regular reconciliation catches mismatches early, while they are easy to fix.',
    points: [
      'Compare sales and purchase records with what is reported in returns.',
      'Follow up with suppliers on missing or mismatched invoices.',
      'Document adjustments so that they can be explained later.',
    ],
  },
  {
    id: 'cash-flow',
    category: 'finance',
    title: 'Cash-flow basics for growing businesses',
    summary: 'Profit and cash are different. Growth often strains cash before it shows in profit.',
    points: [
      'Track receivables and chase them on a schedule.',
      'Forecast cash for the next few months, and update it often.',
      'Plan for tax and statutory payments so that they never come as a surprise.',
    ],
  },
  {
    id: 'structure',
    category: 'finance',
    title: 'Choosing a business structure',
    summary: 'Proprietorship, partnership, LLP or company: each carries different trade-offs.',
    points: [
      'Consider liability, compliance burden, tax treatment and future funding plans.',
      'Think about who will own and manage the business over time.',
      'Discuss your specific situation with an advisor before registering.',
    ],
  },
  {
    id: 'bookkeeping-routine',
    category: 'accounting',
    title: 'A monthly bookkeeping routine that holds up',
    summary: 'Small, regular habits keep books reliable without a year-end rush.',
    points: [
      'Record and categorise transactions at least monthly.',
      'Reconcile bank and card statements against your books.',
      'Review a simple monthly report and question anything unexpected.',
    ],
  },
  {
    id: 'document-retention',
    category: 'accounting',
    title: 'Documents worth keeping',
    summary: 'Organised records make audits, notices and loan applications far easier.',
    points: [
      'Keep invoices, bank statements, contracts and filing acknowledgements.',
      'Store digital copies in a consistent folder structure.',
      'Retention periods vary by law, so confirm them with your advisor.',
    ],
  },
];

// CLIENT TO CONFIRM: answers marked as policy (fees, response time) should reflect the firm's practice.
export const faqs = [
  {
    id: 'faq-first-meeting',
    question: 'What should I bring to a first conversation?',
    answer:
      'A short description of your business or situation, and any recent notices, returns or financial statements you have. If you do not have these to hand, we can start with a conversation and list what is needed.',
  },
  {
    id: 'faq-fees',
    question: 'How are fees decided?',
    answer:
      'Fees depend on the scope and complexity of the work. We will discuss the scope with you and confirm the fee in writing before work begins. [Firm to confirm its fee policy.]',
  },
  {
    id: 'faq-confidentiality',
    question: 'How is my information kept confidential?',
    answer:
      'We treat client information as confidential and use it only for the work you have asked us to do. [Firm to add details of its data-handling practices.]',
  },
  {
    id: 'faq-remote',
    question: 'Can you work with clients remotely?',
    answer:
      'Many engagements can be handled by phone, email and shared documents. [Firm to confirm the locations and arrangements it supports.]',
  },
  {
    id: 'faq-response',
    question: 'How soon will I hear back after sending an enquiry?',
    answer:
      'We read every enquiry and aim to respond promptly. [Firm to confirm its usual response time.]',
  },
  {
    id: 'faq-advice',
    question: 'Is the information on this website professional advice?',
    answer:
      'No. Website content is general information. Laws, rates and deadlines change, so please speak to us about your specific circumstances before acting.',
  },
];
