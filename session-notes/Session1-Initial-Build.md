# OSE Website — Session 1 Notes
**Date:** March 11, 2026

## What Was Built
Complete Next.js 14 website for omahastageequipment.com.

**File structure:**
```
ose-website/
├── app/
│   ├── layout.js          — fonts, metadata, root layout
│   ├── globals.css        — Tailwind + custom CSS animations
│   ├── page.js            — full single-page site (Hero, Stats, Services, Clients, About, Contact)
│   └── thank-you/page.js  — form submission confirmation
├── components/
│   ├── Nav.jsx            — sticky nav, transparent on hero, white on scroll
│   └── Footer.jsx         — dark footer with address/contact
├── public/
│   └── logo.jpeg          — OSE logo (Pat to copy here)
├── package.json
├── next.config.js
├── tailwind.config.js
├── jsconfig.json
└── .gitignore
```

## Design Choices
- **Colors:** Maroon (#800020) primary, Gold (#c5a028) accent, deep near-black (#1a0008) for hero/contact/footer
- **Fonts:** Playfair Display (headings) + Lato (body) — theatrical but clean
- **Layout:** Single-page with anchor nav (#services, #clients, #about, #contact)
- **Hero:** Full-screen maroon gradient with curtain-fold lines and logo centered
- **Contact form:** Set up for Netlify Forms (free, no backend needed)

## Client List Source
Pulled from `/Trading Automation/ose-app/prospecting/sales-history.json`
Filtered to: K-12 schools, colleges/universities, theaters, community venues
Excluded: construction companies, suppliers, commercial/non-stage clients

## To Launch
1. Copy logo.jpeg → `ose-website/public/logo.jpeg`
2. Run `npm install` in ose-website folder
3. Run `npm run dev` to preview locally
4. Create GitHub repo, push
5. Connect to Vercel → auto-deploys on push
6. Point omahastageequipment.com DNS to Vercel (GoDaddy → change nameservers or A record)

## Domain (GoDaddy)
- Domain: omahastageequipment.com
- Registrar: GoDaddy
- Action needed: After Vercel setup, add Vercel's DNS records in GoDaddy

## Pending / Future
- [ ] Add real project photos when available
- [ ] Consider adding a "Projects" page with featured installs
- [ ] Google Analytics / Search Console once live
- [ ] SEO meta descriptions per section
- [ ] Contact form: could switch from Netlify to a real email handler
