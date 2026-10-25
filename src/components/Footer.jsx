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
          {siteConfig.socials.length > 0 && (
            <ul className="footer__socials" aria-label="Social media">
              {siteConfig.socials.map((item) => (
                <li key={item.label}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
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
