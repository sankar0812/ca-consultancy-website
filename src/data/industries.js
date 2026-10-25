// CLIENT TO CONFIRM: keep only the segments the firm actually serves.
export const industries = [
  {
    id: 'startups',
    title: 'Startups and entrepreneurs',
    summary:
      'Early-stage businesses need sound finance foundations without the overhead of a full finance team. We help founders set up the basics properly and stay compliant while they focus on the product.',
    needs: ['Business structure and registrations', 'Bookkeeping and tax set-up', 'Founder and investor documentation', 'Cash-flow visibility'],
  },
  {
    id: 'smes',
    title: 'Small and medium-sized enterprises',
    summary:
      'As operations grow, so do filings, payroll and reporting demands. We provide a steady, dependable finance function that scales with the business.',
    needs: ['Monthly accounting and MIS', 'GST and TDS compliance', 'Payroll support', 'Working-capital and financing papers'],
  },
  {
    id: 'private-limited',
    title: 'Private limited companies',
    summary:
      'Companies carry statutory duties that continue every year. We keep filings, records and financial statements current so that directors can rely on them.',
    needs: ['Annual ROC filings', 'Financial statements and audit coordination', 'Board and shareholder records', 'Income tax and TDS'],
  },
  {
    id: 'retail-trading',
    title: 'Retail and trading businesses',
    summary:
      'High transaction volumes and thin margins call for tidy stock, sales and tax records. We help keep the numbers accurate day to day.',
    needs: ['Sales, purchase and stock accounting', 'GST reconciliation', 'Margin and expense review', 'Multi-location reporting'],
  },
  {
    id: 'service-businesses',
    title: 'Service businesses',
    summary:
      'Consultancies, agencies and other service providers depend on timely invoicing and healthy receivables. We help structure billing, tax and reporting around that.',
    needs: ['Invoicing and receivables tracking', 'GST and TDS handling', 'Project and profitability reporting', 'Partner and owner compensation planning'],
  },
  {
    id: 'individuals-professionals',
    title: 'Individuals and professionals',
    summary:
      'Salaried individuals, doctors, consultants and other professionals have tax matters that deserve careful, personal attention.',
    needs: ['Income tax planning and returns', 'Professional income accounting', 'Investment and capital-gains tax queries', 'Notices and assessments'],
  },
];
