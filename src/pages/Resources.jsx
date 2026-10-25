import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Info } from 'lucide-react';
import PageTransition from '../components/PageTransition.jsx';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CTASection from '../components/CTASection.jsx';
import useSeo from '../hooks/useSeo.js';
import { articles, faqs, resourceCategories } from '../data/resources.js';
import { setCategory, toggleFaq } from '../store/slices/resourcesSlice.js';
import { ease } from '../utils/motion.js';
import '../styles/resources.css';

export default function Resources() {
  useSeo({
    title: 'Resources and Insights',
    description:
      'Educational guides on tax and compliance, GST, business finance and accounting practice, plus answers to common questions.',
  });

  const dispatch = useDispatch();
  const { activeCategory, openFaqId } = useSelector((state) => state.resources);
  const visible = activeCategory === 'all' ? articles : articles.filter((a) => a.category === activeCategory);
  const categoryLabel = (id) => resourceCategories.find((c) => c.id === id)?.label;

  return (
    <PageTransition>
      <PageHero
        title="Practical guidance, in plain language."
        intro="Short explainers on tax, GST, business finance and accounting practice, to help you ask better questions."
      />

      <section className="section resources" aria-labelledby="guides-title">
        <div className="container">
          <p className="resources__notice" role="note">
            <Info size={18} aria-hidden="true" />
            <span>
              This is general information, not professional advice. Rules, rates and deadlines change, so
              please confirm the current position with us before you act.
            </span>
          </p>

          <h2 id="guides-title" className="resources__title">Guides</h2>
          <div className="resources__filters" role="group" aria-label="Filter guides by topic">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`chip ${activeCategory === category.id ? 'is-active' : ''}`}
                aria-pressed={activeCategory === category.id}
                onClick={() => dispatch(setCategory(category.id))}
              >
                {category.label}
              </button>
            ))}
          </div>

          <ul className="articles" aria-live="polite">
            {visible.map((article) => (
              <Reveal as="li" key={`${activeCategory}-${article.id}`} className="article" y={8}>
                <p className="article__category">{categoryLabel(article.category)}</p>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <ul className="article__points">
                  {article.points.map((point) => (
                    <li key={point}>
                      <Check size={16} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tint faq" aria-labelledby="faq-title">
        <div className="container faq__grid">
          <Reveal>
            <h2 id="faq-title">Frequently asked questions</h2>
            <p>Can&rsquo;t find your answer? Send us a question and we will reply personally.</p>
          </Reveal>
          <div className="faq__list">
            {faqs.map((faq) => {
              const open = openFaqId === faq.id;
              return (
                <div className="faq__item" key={faq.id}>
                  <h3>
                    <button
                      type="button"
                      className="faq__question"
                      aria-expanded={open}
                      aria-controls={`${faq.id}-panel`}
                      id={`${faq.id}-button`}
                      onClick={() => dispatch(toggleFaq(faq.id))}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown size={20} aria-hidden="true" className={open ? 'is-open' : ''} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`${faq.id}-panel`}
                        role="region"
                        aria-labelledby={`${faq.id}-button`}
                        className="faq__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Have a question about your own situation?"
        text="General guides only go so far. Talk to us about your specific circumstances."
        actions={[{ label: 'Get in Touch', to: '/contact#enquiry', variant: 'gold' }]}
      />
    </PageTransition>
  );
}
