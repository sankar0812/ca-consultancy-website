// CLIENT TO UPDATE: everything marked as a placeholder below.
// Values can be set in .env (VITE_ variables) or edited directly here.
const env = import.meta.env;

export const siteConfig = {
  name: env.VITE_FIRM_NAME || 'Shanmugavel G',
  descriptor: 'Chartered Accountant',
  siteUrl: (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, ''),
  ogImage: '/og-image.png',

  // Firm details
  email: env.VITE_FIRM_EMAIL || 'ca.shanmugavel@shanandco.in',
  phone: env.VITE_FIRM_PHONE || '+91 93602 68542',
  whatsapp: env.VITE_FIRM_WHATSAPP || '919360268542',
  address: env.VITE_FIRM_ADDRESS || '230A1, Sengottai Road, Tenkasi – 627811',
  hours: env.VITE_FIRM_HOURS || 'Mon – Sat: 10:00 am – 8:00 pm | Sun: 10:00 am – 1:00 pm',

  // The map section only renders when a confirmed embed URL is provided.
  mapEmbedUrl: env.VITE_MAP_EMBED_URL || '',

  // Social links only render when a URL is provided.
  socials: [
    { label: 'LinkedIn', url: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/ca-shanmugavel/' },
    { label: 'Instagram', url: env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/yourbusinessca' },
  ].filter((item) => item.url),
};

// Photography. Leave as null to use the built-in artwork, or import your own images:
//   import hero from '../assets/images/hero.jpg';  ->  hero: { src: hero, srcSet: '...' }
export const images = {
  hero: { src: '/hero.jpg', alt: 'Chartered accountants and financial advisors in boardroom review' },
  about: null,
  industries: null,
  contact: null,
};
