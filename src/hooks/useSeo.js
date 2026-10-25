import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../data/site.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Sets the page title, description, canonical URL and Open Graph tags for a page. */
export default function useSeo({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.siteUrl}${pathname === '/' ? '' : pathname}`;
    const image = `${siteConfig.siteUrl}${siteConfig.ogImage}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteConfig.name);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setCanonical(url);
  }, [title, description, pathname]);
}
