# BazaarX

Premium Indian-inspired e-commerce platform built with React, Vite, and Tailwind CSS.

## Phase 2 — Shop, Cart & Wishlist

- Shop page with search, category/price/rating filters, sorting, pagination
- Product detail page with image gallery, zoom-on-hover, reviews, similar products
- Cart system with animated drawer, quantity controls, localStorage persistence
- Wishlist with save/remove and move-to-cart
- Toast notifications and skeleton loaders
- Context API for cart, wishlist, and toasts

## Phase 1 — Landing Page

- Responsive glassmorphism navbar with search, theme toggle, cart
- Animated hero section
- Trending products, categories, featured collections
- Personalized recommendations & animated sale banner

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy

Works on any static host. Build output goes to the `dist` folder.

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ |

`vercel.json` and `netlify.toml` are included so React Router routes work after deploy.

### Vercel (recommended)

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Leave defaults (Vite is auto-detected) and click **Deploy**.

### Netlify

1. Go to [app.netlify.com/start](https://app.netlify.com/start) and connect GitHub.
2. Netlify reads `netlify.toml` automatically. Click **Deploy**.

### GitHub Pages

Add your repo name to `vite.config.js` (`base: '/bazaarx/'`), then use a GitHub Actions workflow or deploy the `dist` folder from the `gh-pages` branch.

## Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Lucide React icons
