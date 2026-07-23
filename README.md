# Hassan's Portfolio — Next.js

A modern, high-performance developer portfolio built with **Next.js 16 (App Router)**.  
Inspired by [harrisonking.com.ng](https://www.harrisonking.com.ng/).

## ✨ Features

- **Multi-role typewriter** hero with animated counters
- **Client Work section** — 7 real live client websites
- **Personal Projects** with overlay tech-tag animations
- **Testimonials** powered by **Supabase** with real-time updates & Google Auth
- **Admin panel** — approve/decline/delete testimonials
- **Tech Ticker** — scrolling tech stack marquee
- **Scroll-reveal animations** on all sections
- **Fully responsive** — mobile-first design
- **Dark glassmorphism** design with gradient mesh backgrounds

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🌍 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
npm i -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Add the following **Environment Variables** in Vercel's dashboard:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ptpugwltlbqawumsiyrc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_HbAK8y8thY7aACqd0p0ojQ_D4t6PKJb` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `hazytarzan12@gmail.com` |

5. Click **Deploy** ✅

> **Note:** The `.env.local` file is ignored by git (as it should be). Always set env vars in the Vercel dashboard.

## 📁 Project Structure

```
portfolio-next/
├── app/
│   ├── components/
│   │   ├── Navbar.js          # Fixed navbar with mobile drawer
│   │   ├── Hero.js            # Typewriter + stats + profile
│   │   ├── TechTicker.js      # Scrolling tech stack
│   │   ├── About.js           # Bio + skills grid
│   │   ├── Projects.js        # Personal project cards
│   │   ├── ClientWork.js      # 7 real client site cards
│   │   ├── Testimonials.js    # Supabase testimonials + auth
│   │   ├── Contact.js         # Email + social links
│   │   └── Footer.js
│   ├── globals.css            # Full design system
│   ├── layout.js              # Root layout + metadata
│   └── page.js                # Main page (assembles all)
├── lib/
│   └── supabase.js            # Singleton Supabase client
├── public/                    # Static assets (images)
├── .env.local                 # Local env vars (NOT committed)
├── vercel.json                # Vercel deployment config
└── next.config.mjs            # Next.js config
```

## 🖼 Adding Project Screenshots

Drop image files into the `public/` folder:
- `public/vista.png`
- `public/bella_cucina.png`
- `public/sharp-edge.png`

They will automatically appear in the **Projects** section.
