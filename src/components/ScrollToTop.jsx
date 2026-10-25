import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

/** Resets scroll on route change, honours #hash targets, and shows a back-to-top button. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    // Pages are lazy-loaded, so the target may take a moment to exist.
    let attempts = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      attempts += 1;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearInterval(timer);
      } else if (attempts > 20) {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
}
