import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site.js';

/** Logo placeholder: swap the SVG mark for the firm's real logo when available. */
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${siteConfig.name}, home`}>
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" fill="currentColor" className="logo__tile" />
        <path d="M14 35V13h11a8 8 0 0 1 0 16H14" fill="none" stroke="#C09A52" strokeWidth="3.5" />
        <path d="M26 35l10-22" stroke="#fff" strokeWidth="3" fill="none" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">{siteConfig.name}</span>
        <span className="logo__descriptor">{siteConfig.descriptor}</span>
      </span>
    </Link>
  );
}
