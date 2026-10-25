import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from './Button.jsx';

/**
 * variant "ruled":  compact tile used in grids (home page)
 * variant "detail": full editorial row with benefits and an enquiry CTA (services page)
 */
export default function ServiceCard({ service, variant = 'ruled' }) {
  const Icon = service.icon;

  if (variant === 'detail') {
    return (
      <article className="service-row" id={service.id}>
        <div className="service-row__icon">
          <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="service-row__body">
          <h2>{service.title}</h2>
          <p className="service-row__summary">{service.summary}</p>
          <ul className="service-row__benefits">
            {service.benefits.map((benefit) => (
              <li key={benefit}>
                <Check size={16} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Button to={`/contact?service=${service.id}#enquiry`} variant="outline">
            Enquire about this service
          </Button>
        </div>
      </article>
    );
  }

  return (
    <motion.article className="service-card" whileHover="hover" initial="rest">
      <motion.span
        className="service-card__bar"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.35 }}
        aria-hidden="true"
      />
      <Icon size={30} strokeWidth={1.5} aria-hidden="true" className="service-card__icon" />
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <Link to={`/services#${service.id}`} className="text-link">
        Learn more<span className="visually-hidden"> about {service.title}</span>
      </Link>
    </motion.article>
  );
}
