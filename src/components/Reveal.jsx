import { motion } from 'framer-motion';
import { ease } from '../utils/motion.js';

/** Subtle scroll-triggered reveal. Runs once and respects reduced-motion (via MotionConfig). */
export default function Reveal({ as = 'div', delay = 0, y = 14, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.65, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
