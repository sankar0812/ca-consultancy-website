import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import { navigation } from '../data/navigation.js';
import { services } from '../data/services.js';
import { siteConfig } from '../data/site.js';
import { currentYear, telHref } from '../utils/format.js';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo light />
          <p>
            A chartered accountancy practice supporting businesses and individuals with accounting,
            taxation, audit and compliance.
          </p>
          <div className="footer__socials" aria-label="Social media">
            <a
              href="https://www.instagram.com/yourbusinessca"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn footer__social-btn--insta"
              title="Follow us on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href={siteConfig.linkedin || 'https://www.linkedin.com/in/ca-shanmugavel/'}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn footer__social-btn--linkedin"
              title="Connect on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation" className="footer__col">
          <h2 className="footer__heading">Explore</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="footer__col">
          <h2 className="footer__heading">Services</h2>
          <ul>
            {services.slice(0, 6).map((service) => (
              <li key={service.id}>
                <Link to={`/services#${service.id}`}>{service.title}</Link>
              </li>
            ))}
            <li>
              <Link to="/services">All services</Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Contact</h2>
          <ul className="footer__contact">
            <li>
              <MapPin size={18} aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
            <li>
              <Mail size={18} aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />
              <a href={telHref(siteConfig.phone)}>{siteConfig.phone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__base">
        <div className="container footer__base-inner">
          <p>
            &copy; {currentYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Website content is general information and not professional advice. Please consult us
            about your specific circumstances.
          </p>
        </div>
      </div>
    </footer>
  );
}
