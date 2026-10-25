import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { ease } from '../utils/motion.js';

/**
 * mode "interactive": tab list with a detail panel (home page)
 * mode "editorial":   long-form rows (industries page)
 */
export default function IndustrySection({ industries, mode = 'editorial' }) {
  const [activeId, setActiveId] = useState(industries[0].id);
  const tabRefs = useRef([]);

  if (mode === 'editorial') {
    return (
      <div className="industry-list">
        {industries.map((industry) => (
          <Reveal as="article" className="industry-row" id={industry.id} key={industry.id}>
            <h2>{industry.title}</h2>
            <div className="industry-row__body">
              <p>{industry.summary}</p>
              <h3 className="industry-row__label">How we typically help</h3>
              <ul>
                {industry.needs.map((need) => (
                  <li key={need}>
                    <Check size={16} aria-hidden="true" />
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    );
  }

  const active = industries.find((item) => item.id === activeId) || industries[0];

  const onKeyDown = (event, index) => {
    const last = industries.length - 1;
    let next = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (next !== null) {
      event.preventDefault();
      setActiveId(industries[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="industry-tabs">
      <div className="industry-tabs__list" role="tablist" aria-label="Industries and client types">
        {industries.map((industry, index) => (
          <button
            key={industry.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={`tab-${industry.id}`}
            aria-selected={industry.id === active.id}
            aria-controls="industry-panel"
            tabIndex={industry.id === active.id ? 0 : -1}
            className={`industry-tabs__tab ${industry.id === active.id ? 'is-active' : ''}`}
            onClick={() => setActiveId(industry.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {industry.title}
          </button>
        ))}
      </div>
      <div className="industry-tabs__panel" role="tabpanel" id="industry-panel" aria-labelledby={`tab-${active.id}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <h3>{active.title}</h3>
            <p>{active.summary}</p>
            <ul>
              {active.needs.map((need) => (
                <li key={need}>
                  <Check size={16} aria-hidden="true" />
                  <span>{need}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
