import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/site.js';

export default function WhatsAppButton() {
  const phone = siteConfig.whatsapp || '919342426390';
  const firmName = siteConfig.name !== 'Your Firm Name' ? siteConfig.name : 'Team';
  const message = encodeURIComponent(`Hello ${firmName}, I would like to inquire about your CA advisory and tax consultation services.`);
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat with a Chartered Accountant on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="whatsapp-float__pulse" />
      <MessageCircle className="whatsapp-float__icon" size={26} />
      <span className="whatsapp-float__text">Quick Advisory</span>
    </a>
  );
}
