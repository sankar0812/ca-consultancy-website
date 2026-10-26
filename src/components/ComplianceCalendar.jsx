import { Calendar, AlertCircle } from 'lucide-react';

const complianceDates = [
  {
    day: '07',
    month: 'Monthly',
    title: 'TDS / TCS Deposit',
    desc: 'Deposit of Tax Deducted/Collected for the previous month under Income Tax Act.',
    badge: 'TDS',
  },
  {
    day: '11',
    month: 'Monthly',
    title: 'GSTR-1 Outward Supplies',
    desc: 'Summary of all outward B2B & B2C supply invoices for regular taxpayers.',
    badge: 'GST',
  },
  {
    day: '20',
    month: 'Monthly',
    title: 'GSTR-3B Return Filing',
    desc: 'Monthly summary return along with payment of due tax liabilities.',
    badge: 'GST',
  },
  {
    day: '15',
    month: 'Quarterly',
    title: 'Advance Tax Installment',
    desc: 'Applicable for individual and corporate tax assesses with tax liability > ₹10,000.',
    badge: 'Income Tax',
  },
];

export default function ComplianceCalendar() {
  return (
    <section className="section section--tint compliance-section">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <div className="section-eyebrow">
              <Calendar size={16} />
              <span>Tax & Statutory Tracker</span>
            </div>
            <h2>Upcoming Statutory Due Dates</h2>
            <p>
              Stay ahead of interest penalties and late filing fees. We manage and track every statutory deadline for your firm.
            </p>
          </div>
          <div className="compliance-note">
            <AlertCircle size={18} />
            <span>Never miss a deadline with our automated compliance reminders.</span>
          </div>
        </div>

        <div className="compliance-grid">
          {complianceDates.map((item, idx) => (
            <div key={idx} className="compliance-card">
              <div className="compliance-card__header">
                <div className="compliance-card__date">
                  <span className="compliance-card__day">{item.day}</span>
                  <span className="compliance-card__month">{item.month}</span>
                </div>
                <span className={`compliance-card__badge compliance-card__badge--${item.badge.toLowerCase().replace(/\s+/g, '')}`}>
                  {item.badge}
                </span>
              </div>
              <h3 className="compliance-card__title">{item.title}</h3>
              <p className="compliance-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
