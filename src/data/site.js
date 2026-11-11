// CLIENT TO UPDATE: everything marked as a placeholder below.
// Values can be set in .env (VITE_ variables) or edited directly here.
const env = import.meta.env;

export const siteConfig = {
  name: env.VITE_FIRM_NAME || 'YourBusinessCA',
  descriptor: 'Chartered Accountants & Business Advisors',
  siteUrl: (env.VITE_SITE_URL || 'https://www.yourbusinessca.com').replace(/\/$/, ''),
  ogImage: '/hero.jpg',

  // Firm details
  email: env.VITE_FIRM_EMAIL || 'ca.shanmugavel@shanandco.in',
  phone: env.VITE_FIRM_PHONE || '+91 93602 68542',
  whatsapp: env.VITE_FIRM_WHATSAPP || '919360268542',
  address: env.VITE_FIRM_ADDRESS || '230A1, Sengottai Road, Tenkasi, Tenkasi - 627811',
  hours: env.VITE_FIRM_HOURS || 'Mon – Sat: 10:00 am – 8:00 pm | Sun: 10:00 am – 1:00 pm',

  // The map section only renders when a confirmed embed URL is provided.
  mapEmbedUrl: env.VITE_MAP_EMBED_URL || '',

  // Social links
  instagram: 'https://www.instagram.com/yourbusinessca',
  linkedin: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/ca-shanmugavel/',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/yourbusinessca' },
    { label: 'LinkedIn', url: env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/ca-shanmugavel/' },
  ].filter((item) => item.url),
};

// Photography
export const images = {
  hero: { src: '/hero.jpg', alt: 'YourBusinessCA senior partners and financial consultants in corporate boardroom review' },
  about: null,
  industries: null,
  contact: null,
};
