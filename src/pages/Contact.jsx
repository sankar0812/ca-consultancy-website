import { useSearchParams } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { serviceOptions } from '../data/services.js';
import { siteConfig } from '../data/site.js';
import { telHref } from '../utils/format.js';
import '../styles/contact.css';

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description: `Send an enquiry to ${siteConfig.name} about accounting, tax, GST, audit or compliance. We will get back to you.`,
  });

  const [params] = useSearchParams();
  const requested = params.get('service') || '';
  const defaultService = serviceOptions.some((option) => option.value === requested) ? requested : '';

  return (
    <PageTransition>
      <PageHero
        title="Tell us what you need help with."
        intro="Send an enquiry and we will respond with how we can help. For urgent matters, please call."
      />

      <section className="section contact" aria-label="Contact details and enquiry form">
        <div className="container contact__grid">
          <Reveal className="contact__details">
            <h2>Firm details</h2>
            <p className="placeholder-note">
              Placeholder details shown below. The firm should replace them with confirmed information.
            </p>
            <dl>
              <div>
                <dt><MapPin size={20} aria-hidden="true" /> Address</dt>
                <dd>{siteConfig.address}</dd>
              </div>
              <div>
                <dt><Mail size={20} aria-hidden="true" /> Email</dt>
                <dd><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></dd>
              </div>
              <div>
                <dt><Phone size={20} aria-hidden="true" /> Phone</dt>
                <dd><a href={telHref(siteConfig.phone)}>{siteConfig.phone}</a></dd>
              </div>
              <div>
                <dt><Clock size={20} aria-hidden="true" /> Business hours</dt>
                <dd>{siteConfig.hours}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="contact__form" delay={0.1} id="enquiry">
            <h2>Send an enquiry</h2>
            <p>Fields marked with * are required.</p>
            <EnquiryForm defaultService={defaultService} />
          </Reveal>
        </div>
      </section>

      {siteConfig.mapEmbedUrl && (
        <section className="map" aria-label="Office location">
          <iframe
            title={`Map showing the location of ${siteConfig.name}`}
            src={siteConfig.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      )}

      <CTASection
        title="Prefer to speak to someone first?"
        text="Call or email us directly and we will take it from there."
        actions={[
          { label: 'Call us', href: telHref(siteConfig.phone), variant: 'gold' },
          { label: 'Email us', href: `mailto:${siteConfig.email}`, variant: 'outline-light' },
        ]}
      />
    </PageTransition>
  );
}
