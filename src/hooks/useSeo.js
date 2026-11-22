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

function setJsonLd(schemaId, data) {
  let script = document.getElementById(schemaId);
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

/** Sets the page title, description, canonical URL, Open Graph, Twitter, and JSON-LD schema for a page. */
export default function useSeo({ title, description, keywords, schema, noindex = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // If title already contains the firm name, keep it clean
    const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.siteUrl}${pathname === '/' ? '' : pathname}`;
    const image = `${siteConfig.siteUrl}${siteConfig.ogImage}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', siteConfig.name);
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    setCanonical(url);

    // Dynamic JSON-LD structured data per page
    if (schema) {
      setJsonLd('page-json-ld', schema);
    } else {
      setJsonLd('page-json-ld', null);
    }
  }, [title, description, keywords, schema, noindex, pathname]);
}
