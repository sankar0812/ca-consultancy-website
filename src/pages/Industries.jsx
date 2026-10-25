import PageTransition from '../components/PageTransition.jsx';
import PageHero from '../components/PageHero.jsx';
import IndustrySection from '../components/IndustrySection.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { industries } from '../data/industries.js';
import { images, siteConfig } from '../data/site.js';
import '../styles/industries.css';

export default function Industries() {
  useSeo({
    title: 'Industries and Clients',
    description: `${siteConfig.name} supports startups, SMEs, private limited companies, retail and trading businesses, service businesses and individuals.`,
  });

  return (
    <PageTransition>
      <PageHero
        title="Support that fits the business you run."
        intro="Different businesses face different pressures. Here is where we typically help, and how."
      />

      <section className="industries-banner" aria-hidden="false">
        <div className="container">
          <ImageSlot
            image={images.industries}
            variant="industries"
            alt="Illustration of ledger columns of different heights, representing different kinds of business"
            className="industries-banner__image"
          />
        </div>
      </section>

      <section className="section industries-page">
        <div className="container">
          <IndustrySection industries={industries} mode="editorial" />
        </div>
      </section>

      <CTASection
        title="Do not see your business listed?"
        text="Many of our clients do not fit a neat category. Tell us about yours and we will tell you honestly whether we can help."
        actions={[{ label: 'Get in Touch', to: '/contact#enquiry', variant: 'gold' }]}
      />
    </PageTransition>
  );
}
