import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/site.js';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <div className="topbar__badge">
            <ShieldCheck size={14} className="topbar__icon--gold" />
            <span>Chartered Accountancy Practice</span>
          </div>
          <div className="topbar__item topbar__item--hide-sm">
            <Clock size={13} />
            <span>{siteConfig.hours}</span>
          </div>
        </div>

        <div className="topbar__right">
          <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="topbar__item topbar__link">
            <Phone size={13} />
            <span>{siteConfig.phone}</span>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="topbar__item topbar__link topbar__item--hide-sm">
            <Mail size={13} />
            <span>{siteConfig.email}</span>
          </a>
          {siteConfig.instagram && (
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="topbar__item topbar__link topbar__link--insta"
              title="Follow YourBusinessCA on Instagram"
              aria-label="Instagram"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              <span>@yourbusinessca</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
