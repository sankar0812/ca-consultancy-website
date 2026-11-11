import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Phone, Mail, ArrowRight } from 'lucide-react';
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

  // Close whenever the route changes
  useEffect(() => {
    dispatch(closeMobileMenu());
  }, [pathname, dispatch]);

  // Escape to close & lock body scroll
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && dispatch(closeMobileMenu());
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, dispatch]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobile-nav__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch(closeMobileMenu())}
            aria-hidden="true"
          />
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile Navigation"
            role="dialog"
            aria-modal="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="mobile-nav__header">
              <div className="mobile-nav__brand">
                <img src="/logo.png" alt="" width="32" height="32" className="mobile-nav__brand-img" />
                <span className="mobile-nav__brand-text">{siteConfig.name}</span>
              </div>
              <button
                type="button"
                className="mobile-nav__close"
                onClick={() => dispatch(closeMobileMenu())}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <ul className="mobile-nav__list">
              {navigation.map((item, index) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    ref={index === 0 ? firstLink : undefined}
                    onClick={() => dispatch(closeMobileMenu())}
                    className={({ isActive }) =>
                      `mobile-nav__link ${item.cta ? 'mobile-nav__link--cta' : ''} ${isActive ? 'is-active' : ''}`
                    }
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={18} className="mobile-nav__arrow" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mobile-nav__footer">
              <div className="mobile-nav__contact">
                <a href={telHref(siteConfig.phone)} className="mobile-nav__contact-item">
                  <Phone size={15} />
                  <span>{siteConfig.phone}</span>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="mobile-nav__contact-item">
                  <Mail size={15} />
                  <span>{siteConfig.email}</span>
                </a>
              </div>
              <p className="mobile-nav__tagline">Available 7 Days a Week</p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
