import PageTransition from '../components/PageTransition.jsx';
import PageHero from '../components/PageHero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { services } from '../data/services.js';
import { siteConfig } from '../data/site.js';
import '../styles/services.css';

export default function Services() {
  useSeo({
    title: 'Services',
    description: `Accounting, income tax, GST, audit, ROC compliance, payroll, TDS and advisory services from ${siteConfig.name}.`,
  });

  return (
    <PageTransition>
      <PageHero
        title="Services designed around how you run your business."
        intro="Choose a single service or a combination. Each engagement is scoped with you and confirmed in writing."
      />

      <section className="section services-page">
        <div className="container services-page__layout">
          <nav className="services-page__index" aria-label="Services on this page">
            <p className="services-page__index-title">On this page</p>
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a href={`#${service.id}`}>{service.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="services-page__list">
            {services.map((service) => (
              <Reveal key={service.id} y={10}>
                <ServiceCard service={service} variant="detail" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which service you need?"
        text="Describe your situation and we will recommend where to begin."
        actions={[{ label: 'Get in Touch', to: '/contact#enquiry', variant: 'gold' }]}
      />
    </PageTransition>
  );
}
