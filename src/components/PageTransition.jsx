import { motion } from 'framer-motion';
import { ease } from '../utils/motion.js';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
}
