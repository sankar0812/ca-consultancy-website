import { Link } from 'react-router-dom';
import { siteConfig } from '../data/site.js';

/** Logo placeholder: swap the SVG mark for the firm's real logo when available. */
export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${siteConfig.name}, home`}>
      <img
        src="/logo.png"
        alt={siteConfig.name}
        className="logo__image"
        width="44"
        height="44"
      />
      <span className="logo__text">
        <span className="logo__name">{siteConfig.name}</span>
        <span className="logo__descriptor">{siteConfig.descriptor}</span>
      </span>
    </Link>
  );
}
