import { motion } from 'framer-motion';
import { rise, stagger } from '../utils/motion.js';

export default function PageHero({ title, intro, children }) {
  return (
    <section className="page-hero">
      <motion.div className="container page-hero__inner" variants={stagger} initial="hidden" animate="show">
        <motion.h1 variants={rise}>{title}</motion.h1>
        <div className="page-hero__side">
          <motion.p variants={rise}>{intro}</motion.p>
          {children && <motion.div variants={rise} className="page-hero__actions">{children}</motion.div>}
        </div>
      </motion.div>
    </section>
  );
}
