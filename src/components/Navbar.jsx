import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import MobileNavigation from './MobileNavigation.jsx';
import { navigation } from '../data/navigation.js';
import { setScrolled, toggleMobileMenu } from '../store/slices/uiSlice.js';
import '../styles/navbar.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const scrolled = useSelector((state) => state.ui.scrolled);
  const menuOpen = useSelector((state) => state.ui.mobileMenuOpen);

  useEffect(() => {
    const onScroll = () => dispatch(setScrolled(window.scrollY > 8));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dispatch]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo />

        <nav className="navbar__nav" aria-label="Primary">
          <ul className="navbar__list">
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${item.cta ? 'navbar__link--cta' : ''} ${isActive ? 'is-active' : ''}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && !item.cta && (
                        <motion.span layoutId="nav-indicator" className="navbar__indicator" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <MobileNavigation />
    </header>
  );
}
