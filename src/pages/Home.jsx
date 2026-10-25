import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Eye, ClipboardCheck, MessagesSquare } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import Reveal from '../components/Reveal.jsx';
import Button from '../components/Button.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import IndustrySection from '../components/IndustrySection.jsx';
import ProcessSteps from '../components/ProcessSteps.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { services } from '../data/services.js';
import { industries } from '../data/industries.js';
import { images, siteConfig } from '../data/site.js';
import { ease, rise, stagger } from '../utils/motion.js';
import '../styles/home.css';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Professionalism',
    text: 'Work is planned, reviewed and delivered to a consistent standard, whatever the size of the engagement.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    text: 'You know the scope, the fee and the timeline before we begin, and you see progress as it happens.',
  },
  {
    icon: ClipboardCheck,
    title: 'Compliance',
    text: 'We keep track of statutory requirements so that filings are accurate and submitted on time.',
  },
  {
    icon: MessagesSquare,
    title: 'Client-focused advisory',
    text: 'Advice is shaped around your goals and explained clearly, so you can decide with confidence.',
  },
];

export default function Home() {
  useSeo({
    title: 'Chartered Accountants for accounting, tax and compliance',
    description:
      'Accounting, income tax, GST, audit, ROC compliance and business advisory for businesses and individuals. Speak to a chartered accountant today.',
  });

  const featured = services.filter((service) => service.featured);

  return (
    <PageTransition>
      <section className="hero">
        <div className="container hero__grid">
          <motion.div className="hero__copy" variants={stagger} initial="hidden" animate="show">
            <motion.h1 variants={rise}>Clear books. Confident decisions.</motion.h1>
            <motion.p className="hero__lead" variants={rise}>
              {siteConfig.name} supports businesses and individuals with accounting, taxation, audit and
              compliance, so you can spend your time on what you do best.
            </motion.p>
            <motion.div className="hero__actions" variants={rise}>
              <Button to="/services" variant="gold">Explore Our Services</Button>
              <Button to="/contact#enquiry" variant="outline-light">Get in Touch</Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
          >
            <ImageSlot
              image={images.hero}
              variant="hero"
              priority
              alt="Illustration of rising ledger columns on a ruled grid"
            />
          </motion.div>
        </div>
      </section>

      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <Reveal>
            <h2 id="intro-title">A practice built on careful work and plain explanations.</h2>
          </Reveal>
          <Reveal delay={0.1} className="intro__body">
            <p>
              We are a chartered accountancy practice that treats every client&rsquo;s numbers as if
              they were our own. Our approach is simple: understand the situation properly, give
              advice you can act on, and make sure every filing is right the first time.
            </p>
            <dl className="principles">
              <div>
                <dt>Accuracy before speed</dt>
                <dd>Figures are checked and filings reviewed before they leave our desk.</dd>
              </div>
              <div>
                <dt>Advice you can act on</dt>
                <dd>Recommendations come with reasons, options and next steps.</dd>
              </div>
              <div>
                <dt>Confidential by default</dt>
                <dd>Your financial information is used only for the work you ask us to do.</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="services-title">
        <div className="container">
          <Reveal className="section-head section-head--split">
            <div>
              <h2 id="services-title">Services for every stage of your finances</h2>
              <p>From everyday bookkeeping to audit and advisory, support that fits the way you work.</p>
            </div>
            <Link to="/services" className="text-link">View all services</Link>
          </Reveal>
          <div className="service-grid">
            {featured.map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy why" aria-labelledby="why-title">
        <div className="container why__grid">
          <Reveal className="why__intro">
            <h2 id="why-title">Why clients choose to work with us</h2>
            <p>
              Good financial support is part technical skill and part trust. These are the standards we
              hold ourselves to on every engagement.
            </p>
          </Reveal>
          <ul className="why__list">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Reveal as="li" key={reason.title} delay={index * 0.06} className="why__item">
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-title">
        <div className="container">
          <Reveal className="section-head section-head--split">
            <div>
              <h2 id="industries-title">Who we work with</h2>
              <p>
                From first-time founders to established companies and individuals, we adapt our support
                to the people and businesses we serve.
              </p>
            </div>
            <Link to="/industries" className="text-link">Explore industries</Link>
          </Reveal>
          <Reveal>
            <IndustrySection industries={industries} mode="interactive" />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="process-title">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="process-title">How we work together</h2>
            <p>A straightforward process, from the first conversation to ongoing support.</p>
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <CTASection
        title="Let us talk about your accounting and taxation needs"
        text="Tell us what you need help with. We will respond with a clear view of how we can support you."
        actions={[
          { label: 'Get in Touch', to: '/contact#enquiry', variant: 'gold' },
          { label: 'Explore Our Services', to: '/services', variant: 'outline-light' },
        ]}
      />
    </PageTransition>
  );
}
