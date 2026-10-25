import { Target, Eye } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { about, clientApproach, values } from '../data/about.js';
import { images, siteConfig } from '../data/site.js';
import '../styles/about.css';

export default function About() {
  useSeo({
    title: 'About Us',
    description: `Learn about ${siteConfig.name}: our philosophy, values and the way we work with clients on accounting, tax and compliance.`,
  });

  return (
    <PageTransition>
      <PageHero
        title="Careful work, honest advice, lasting relationships."
        intro="We believe financial guidance should be accurate, understandable and delivered with discretion."
      />

      <section className="section about-intro" aria-labelledby="philosophy-title">
        <div className="container about-intro__grid">
          <Reveal className="about-intro__text">
            <h2 id="philosophy-title">Our professional philosophy</h2>
            <p>
              Numbers matter most when they help someone make a decision. We therefore start with
              understanding what you are trying to achieve, then build the accounting, tax and
              compliance work that supports it.
            </p>
            <p>
              We keep our advice practical and our explanations plain, and we put important points in
              writing. That way you always know where you stand and what comes next.
            </p>
            <p className="placeholder-note">
              [Placeholder: add the firm&rsquo;s own introduction here. Details such as year of
              establishment, partners and qualifications should be supplied and confirmed by the firm.]
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageSlot
              image={images.about}
              variant="office"
              alt="Illustration of ledger columns representing steady, structured financial work"
              className="about-intro__image"
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="mission-title">
        <div className="container">
          <h2 id="mission-title" className="visually-hidden">Mission and vision</h2>
          <div className="mission-vision">
            <Reveal className="mission-vision__item">
              <Target size={30} strokeWidth={1.5} aria-hidden="true" />
              <h3>Our mission</h3>
              <p>{about.mission}</p>
            </Reveal>
            <Reveal className="mission-vision__item" delay={0.1}>
              <Eye size={30} strokeWidth={1.5} aria-hidden="true" />
              <h3>Our vision</h3>
              <p>{about.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <Reveal className="section-head">
            <h2 id="values-title">The values behind our work</h2>
            <p>These principles guide how we handle every engagement and every client conversation.</p>
          </Reveal>
          <ul className="values">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal as="li" key={value.title} className="values__item" delay={index * 0.06}>
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--navy approach" aria-labelledby="approach-title">
        <div className="container approach__grid">
          <Reveal>
            <h2 id="approach-title">How we work with clients</h2>
            <p>
              Strong relationships come from reliability. These are the habits we build every
              engagement around.
            </p>
          </Reveal>
          <dl className="approach__list">
            {clientApproach.map((item) => (
              <Reveal key={item.title} className="approach__item">
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CTASection
        title="Start with a conversation"
        text="Tell us about your business or your situation, and we will explain how we can help."
        actions={[
          { label: 'Get in Touch', to: '/contact#enquiry', variant: 'gold' },
          { label: 'View Services', to: '/services', variant: 'outline-light' },
        ]}
      />
    </PageTransition>
  );
}
