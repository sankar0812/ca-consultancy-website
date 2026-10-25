import { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation } from '../data/navigation.js';
import { siteConfig } from '../data/site.js';
import { closeMobileMenu } from '../store/slices/uiSlice.js';
import { telHref } from '../utils/format.js';
import { ease } from '../utils/motion.js';

export default function MobileNavigation() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.ui.mobileMenuOpen);
  const { pathname } = useLocation();
  const firstLink = useRef(null);

  // Close whenever the route changes.
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  // Escape to close, lock body scroll, and move focus into the menu.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && dispatch(closeMobileMenu());
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, dispatch]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobile-nav__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeMobileMenu())}
          />
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease }}
          >
            <ul className="mobile-nav__list">
              {navigation.map((item, index) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    ref={index === 0 ? firstLink : undefined}
                    className={({ isActive }) => `mobile-nav__link ${isActive ? 'is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mobile-nav__contact">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <a href={telHref(siteConfig.phone)}>{siteConfig.phone}</a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
