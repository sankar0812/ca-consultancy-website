export const currentYear = () => new Date().getFullYear();

/** Turns "+91 98765 43210" into a tel: link value. */
export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;
