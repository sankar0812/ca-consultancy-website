export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const rules = {
  fullName: {
    required: 'Enter your full name.',
    minLength: { value: 2, message: 'Your name needs at least 2 characters.' },
    maxLength: { value: 100, message: 'Keep your name under 100 characters.' },
  },
  email: {
    required: 'Enter your business email address.',
    maxLength: { value: 254, message: 'That email address is too long.' },
    pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email, like name@company.com.' },
  },
  phone: {
    required: 'Enter a phone number we can reach you on.',
    validate: (value) => {
      const trimmed = value.trim();
      const digits = trimmed.replace(/\D/g, '');
      if (!/^\+?[\d\s\-()]+$/.test(trimmed)) return 'Use digits only. You may include +, spaces or hyphens.';
      if (digits.length < 10 || digits.length > 13) return 'Enter a phone number with 10 to 13 digits.';
      return true;
    },
  },
  company: {
    maxLength: { value: 120, message: 'Keep the company name under 120 characters.' },
  },
  subject: {
    required: 'Add a short subject.',
    minLength: { value: 3, message: 'The subject needs at least 3 characters.' },
    maxLength: { value: 150, message: 'Keep the subject under 150 characters.' },
  },
  message: {
    required: 'Tell us how we can help.',
    minLength: { value: MESSAGE_MIN, message: `Write at least ${MESSAGE_MIN} characters so we can understand your request.` },
    maxLength: { value: MESSAGE_MAX, message: `Keep your message under ${MESSAGE_MAX} characters.` },
  },
  consent: {
    required: 'Please confirm that you agree to us contacting you about this enquiry.',
  },
};
