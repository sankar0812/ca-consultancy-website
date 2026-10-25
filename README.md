# CA Firm Website

A premium, responsive website for a Chartered Accountant firm.
React + Vite, Redux Toolkit, React Router, Framer Motion, Lucide React, React Hook Form and plain CSS.
No login, no admin area, no database. Enquiries are emailed through a secure serverless function.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

Requires Node 18 or newer.

## Project structure

```
api/enquiry.js            Serverless function that validates and emails enquiries (Vercel)
public/                   favicon, og-image.png, robots.txt, sitemap.xml
src/
  main.jsx                Entry: Redux Provider + Router
  App.jsx                 Route table (pages are lazy-loaded)
  components/             Layout, Navbar, MobileNavigation, Footer, PageHero, ServiceCard,
                          IndustrySection, CTASection, EnquiryForm, FormInput, ScrollToTop,
                          LoadingState, SuccessMessage, ErrorMessage, Button, Reveal, ...
  pages/                  Home, About, Services, Industries, Resources, Contact, NotFound
  store/                  Redux store
    slices/uiSlice.js         mobile menu + header scroll state
    slices/enquirySlice.js    enquiry submit thunk (idle / loading / succeeded / failed)
    slices/resourcesSlice.js  resource filter + open FAQ
  data/                   All editable content: site.js, services.js, industries.js,
                          resources.js, about.js, process.js, navigation.js
  utils/                  api.js (fetch client), validators.js, motion.js, format.js
  hooks/useSeo.js         Per-page title, description, canonical and Open Graph tags
  styles/                 global.css (design tokens) + one CSS file per area
```

## Things the firm must supply before launch

Nothing in this project invents firm details. Replace every placeholder:

| What | Where |
| --- | --- |
| Firm name, email, phone, address, hours | `.env` (`VITE_FIRM_*`) or `src/data/site.js` |
| Map | Set `VITE_MAP_EMBED_URL` only once the office location is confirmed. The map section stays hidden until then |
| Social links | `VITE_LINKEDIN_URL`, `VITE_FACEBOOK_URL`, `VITE_INSTAGRAM_URL`. Empty ones are not shown |
| Services actually offered | Delete unwanted entries in `src/data/services.js` |
| Industries actually served | `src/data/industries.js` |
| Mission, vision, introduction | `src/data/about.js` and the "Placeholder" note in `src/pages/About.jsx` |
| Resources and FAQs | `src/data/resources.js` (sample content: have it reviewed; it avoids deadlines and rates on purpose) |
| Logo | Replace the SVG mark in `src/components/Logo.jsx` |
| Photography | Put files in `src/assets/images/`, import them in `src/data/site.js` and set `images.hero`, etc. Until then the built-in artwork is used |
| Domain | `VITE_SITE_URL`, `public/sitemap.xml`, `public/robots.txt`, `index.html` |
| Social share image | Replace `public/og-image.png` (1200 x 630) |

## Connecting the firm's email address

The website is static, so it cannot hold email credentials. The form posts to `/api/enquiry`, a serverless
function that holds the API key on the server and sends the email through [Resend](https://resend.com).
The form only shows "sent" after Resend accepts the message.

1. **Create a Resend account** and add your domain under *Domains*. Add the DNS records Resend shows you and wait until it is verified.
2. **Create an API key** (*API Keys > Create*, "Sending access").
3. **Set these environment variables** on the server (see `.env.example`):

   | Variable | Example | Purpose |
   | --- | --- | --- |
   | `RESEND_API_KEY` | `re_...` | Secret key. Server only |
   | `ENQUIRY_TO_EMAIL` | `enquiries@firm.com` | Inbox that receives enquiries. Comma-separate for several |
   | `ENQUIRY_FROM_EMAIL` | `website@firm.com` | Sender. Must use the verified domain |
   | `ENQUIRY_FROM_NAME` | `Firm Name Website` | Sender display name |
   | `ALLOWED_ORIGINS` | `https://www.firm.com` | Only these sites may call the API (recommended) |

4. Redeploy. Submit a test enquiry from the live Contact page and check the inbox.

The visitor's email is set as **Reply-To**, so replying to the enquiry goes straight to them. The email contains
name, phone, company, selected service, subject, message, submission time and consent status.

Never put `RESEND_API_KEY` in a variable starting with `VITE_`. Those are bundled into the public website.

### Spam protection

* Hidden honeypot field (bots fill it, people never see it). Honeypot hits are silently dropped.
* Server-side validation and sanitising of every field (the browser checks are only for convenience).
* Line breaks stripped from single-line fields to prevent header injection; all values HTML-escaped in the email.
* Origin allow-list and a best-effort rate limit (5 per IP per 10 minutes per server instance).
  For heavy traffic, add a captcha such as Cloudflare Turnstile.

## Deployment

### Option A: Vercel (recommended, form works out of the box)

1. Push the project to GitHub and import it in Vercel. Framework preset: **Vite**.
2. Add the environment variables above (Settings > Environment Variables), including the `VITE_*` public ones.
3. Deploy. `vercel.json` already routes all pages to the app and leaves `/api/*` to the function.

To test the form locally you need the function running too:

```bash
npm i -g vercel
cp .env.example .env.local    # fill in real values
vercel dev
```

With plain `npm run dev` the site works, but submitting the form shows an error because `/api/enquiry` does not exist there.
That is intentional: the site never pretends an email was sent.

### Option B: Static-only hosting (Netlify, cPanel, GitHub Pages, S3)

Static hosts cannot run `api/enquiry.js`. Either:

* Host only the function on Vercel, then set `VITE_ENQUIRY_ENDPOINT=https://your-api-project.vercel.app/api/enquiry`
  and add the website's origin to `ALLOWED_ORIGINS`. Browser calls across origins need CORS headers, so add
  `Access-Control-Allow-Origin` (and an `OPTIONS` handler) for your origin to `api/enquiry.js`, or
* Move the function to your host's equivalent (for example a Netlify Function) using the same logic.

Because this is a single-page app, configure the host to serve `index.html` for unknown paths
(Netlify: add `public/_redirects` containing `/* /index.html 200`).

## Redux usage

* `ui`: mobile menu open state and header scroll state.
* `enquiry`: `submitEnquiry` async thunk. Duplicate submissions are blocked by the thunk `condition` while a request is loading; server errors are surfaced next to the form.
* `resources`: active category filter and open FAQ.

## Accessibility and performance

Semantic landmarks, one `h1` per page, skip link, visible focus states, labelled form controls with `aria-describedby` errors,
keyboard-operable menu, tabs and accordion, and `prefers-reduced-motion` respected (`MotionConfig reducedMotion="user"`).
Pages are code-split with `React.lazy`; images are lazy-loaded except the hero.

## Launch checklist

- [ ] Replace all placeholders in the table above
- [ ] Verify the Resend domain and send a real test enquiry
- [ ] Set `ALLOWED_ORIGINS` and `VITE_SITE_URL`
- [ ] Update `sitemap.xml`, `robots.txt` and `og-image.png`
- [ ] Add a privacy policy page or link if required, and confirm professional-disclaimer wording with the firm
- [ ] Run `npm run build` and check every page on a phone
