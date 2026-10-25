import {
  BookOpenCheck,
  Calculator,
  ReceiptText,
  ShieldCheck,
  Building2,
  Landmark,
  LineChart,
  Users,
  Compass,
  Rocket,
} from 'lucide-react';

// CLIENT TO CONFIRM: delete any service the firm does not actually provide.
// `featured` services appear on the home page.
export const services = [
  {
    id: 'accounting-bookkeeping',
    icon: BookOpenCheck,
    title: 'Accounting and bookkeeping',
    summary: 'Accurate, up-to-date books that reflect how your business is really performing.',
    benefits: [
      'Regular recording and reconciliation of transactions',
      'Books that are ready for tax, audit and lenders',
      'Clear monthly or quarterly reporting',
    ],
    featured: true,
  },
  {
    id: 'income-tax',
    icon: Calculator,
    title: 'Income tax planning and return filing',
    summary: 'Tax planning and return preparation for individuals, firms and companies.',
    benefits: [
      'Planning that looks ahead, not just at the filing date',
      'Return preparation with supporting workings',
      'Support with notices and assessments',
    ],
    featured: true,
  },
  {
    id: 'gst',
    icon: ReceiptText,
    title: 'GST registration, returns and compliance',
    summary: 'Registration, periodic return filing and reconciliations, handled to schedule.',
    benefits: [
      'Registration and onboarding support',
      'Return filing with books-to-return reconciliation',
      'Guidance on invoicing and input credit records',
    ],
    featured: true,
  },
  {
    id: 'audit',
    icon: ShieldCheck,
    title: 'Tax audit and statutory audit',
    summary: 'Independent audit work where the law or your stakeholders require it.',
    benefits: [
      'Audit planning agreed with you in advance',
      'Clear findings and practical recommendations',
      'Applicable only where an audit is required',
    ],
    featured: true,
  },
  {
    id: 'company-registration',
    icon: Building2,
    title: 'Company registration and business setup',
    summary: 'Help choosing a structure and completing the formalities to start trading.',
    benefits: [
      'Structure options explained in plain language',
      'Assistance with incorporation filings and registrations',
      'A clean compliance calendar from day one',
    ],
  },
  {
    id: 'roc-compliance',
    icon: Landmark,
    title: 'ROC and corporate compliance',
    summary: 'Statutory filings and records for companies and LLPs, kept in order.',
    benefits: [
      'Annual filings prepared and tracked',
      'Support with board and shareholder records',
      'Reminders ahead of due dates',
    ],
    featured: true,
  },
  {
    id: 'financial-reporting',
    icon: LineChart,
    title: 'Financial reporting and management accounting',
    summary: 'Statements and management reports that support decisions, not just compliance.',
    benefits: [
      'Financial statements prepared to applicable standards',
      'Budgets, MIS and variance reporting',
      'Insight into margins, cash and costs',
    ],
  },
  {
    id: 'payroll-tds',
    icon: Users,
    title: 'Payroll and TDS compliance',
    summary: 'Payroll processing support and timely deduction, deposit and filing of TDS.',
    benefits: [
      'Payroll workings and statutory deductions',
      'TDS computation, deposit and return filing',
      'Records organised for employees and authorities',
    ],
  },
  {
    id: 'business-advisory',
    icon: Compass,
    title: 'Business advisory and financial consulting',
    summary: 'A sounding board for decisions on growth, funding, structure and risk.',
    benefits: [
      'Advice grounded in your numbers',
      'Support with projections and financing documents',
      'Ongoing access to a qualified advisor',
    ],
  },
  {
    id: 'startup-sme',
    icon: Rocket,
    title: 'Startup and SME advisory',
    summary: 'Finance foundations for young and growing businesses, scaled to what you need.',
    benefits: [
      'Practical set-up of accounts, tax and compliance',
      'Guidance on founder and investor documentation',
      'A service level that grows with the business',
    ],
    featured: true,
  },
];

export const serviceOptions = [
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'other', label: 'Not sure yet / something else' },
];
