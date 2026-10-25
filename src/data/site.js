// CLIENT TO UPDATE: everything marked as a placeholder below.
// Values can be set in .env (VITE_ variables) or edited directly here.
const env = import.meta.env;

export const siteConfig = {
  name: env.VITE_FIRM_NAME || 'Your Firm Name',
  descriptor: 'Chartered Accountants',
  siteUrl: (env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, ''),
  ogImage: '/og-image.png',

  // Placeholders: replace with the firm's confirmed details.
  email: env.VITE_FIRM_EMAIL || 'contact@your-firm-domain.com',
  phone: env.VITE_FIRM_PHONE || '+91 00000 00000',
  address: env.VITE_FIRM_ADDRESS || 'Office address to be supplied by the firm',
  hours: env.VITE_FIRM_HOURS || 'Monday to Friday, 10:00 am to 6:00 pm',

  // The map section only renders when a confirmed embed URL is provided.
  mapEmbedUrl: env.VITE_MAP_EMBED_URL || '',

  // Social links only render when a URL is provided.
  socials: [
    { label: 'LinkedIn', url: env.VITE_LINKEDIN_URL || '' },
    { label: 'Facebook', url: env.VITE_FACEBOOK_URL || '' },
    { label: 'Instagram', url: env.VITE_INSTAGRAM_URL || '' },
  ].filter((item) => item.url),
};

// Photography. Leave as null to use the built-in artwork, or import your own images:
//   import hero from '../assets/images/hero.jpg';  ->  hero: { src: hero, srcSet: '...' }
export const images = {
  hero: null,
  about: null,
  industries: null,
  contact: null,
};
