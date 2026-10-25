import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

/**
 * Renders a router Link (`to`), an anchor (`href`) or a button.
 * variant: gold | navy | outline | outline-light
 */
export default function Button({ to, href, variant = 'navy', children, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.98 }, transition: { duration: 0.2 } };

  if (to) {
    return (
      <MotionLink to={to} className={classes} {...motionProps} {...rest}>
        {children}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" className={classes} {...motionProps} {...rest}>
      {children}
    </motion.button>
  );
}
