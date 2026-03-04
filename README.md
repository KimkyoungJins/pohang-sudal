# Pohang Sudal (포항수달)

> Discover Pohang Like a Local — Licensed tour guide service for foreign tourists visiting Pohang, South Korea.

**Live Site:** https://pohang-sudal.vercel.app
**GitHub:** https://github.com/KimkyoungJins/pohang-sudal

## Overview

Pohang Sudal is a tourism startup providing English-speaking guided tours in Pohang for American and European visitors. The founder holds an official Korean government tour interpreter guide license (관광통역안내사).

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework with SSR/SSG for SEO |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Firebase Auth** | Google sign-in for customers |
| **Firebase Firestore** | Survey & booking data storage |
| **Vercel** | Hosting & deployment |

## Features

- **5 Curated Tours** — Homigot Sunrise, Jukdo Seafood Market, Guryongpo Heritage Walk, Bogyeongsa Temple Hiking, Steel City & Ocean View
- **Smart Survey** — 4-step questionnaire with recommendation algorithm that suggests the best tour based on interests, fitness, budget, and schedule
- **Booking System** — Contact form with Firebase storage, auto-fills for logged-in users
- **Google Authentication** — One-click sign-in, profile display in navbar
- **Admin Dashboard** — View bookings & surveys, update booking status
- **Email Notifications** — Automated emails on new bookings (via Resend API)
- **Responsive Design** — Mobile-first, works on all devices
- **SEO Optimized** — Meta tags, Open Graph, SSG for all pages

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar, Footer, AuthProvider
│   ├── page.tsx                # Landing page (Hero, Tours, Why Us, CTA)
│   ├── tours/
│   │   ├── page.tsx            # Tour listing
│   │   └── [slug]/page.tsx     # Tour detail (dynamic)
│   ├── survey/page.tsx         # Survey with tour recommendations
│   ├── booking/page.tsx        # Booking/contact form
│   ├── about/page.tsx          # Guide bio & Pohang intro
│   ├── admin/page.tsx          # Admin dashboard (protected)
│   └── api/
│       └── send-email/route.ts # Email notification API
├── components/
│   ├── AuthProvider.tsx        # Firebase Auth context
│   ├── Navbar.tsx              # Responsive nav with auth
│   ├── Footer.tsx              # Site footer
│   ├── Hero.tsx                # Landing hero section
│   ├── TourCard.tsx            # Tour preview card
│   ├── SurveyForm.tsx          # Multi-step survey
│   └── BookingForm.tsx         # Booking form (auto-fill from auth)
└── lib/
    ├── firebase.ts             # Firebase app, auth, Firestore init
    └── tours.ts                # Tour data & types
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm
- Firebase project ([setup guide](./FIREBASE_SETUP.md))

### Installation

```bash
git clone https://github.com/KimkyoungJins/pohang-sudal.git
cd pohang-sudal
npm install
```

### Environment Variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.local.example .env.local
```

Required variables:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
ADMIN_EMAIL=your-admin@email.com
RESEND_API_KEY=your-resend-api-key
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build & Deploy

```bash
npm run build      # Build for production
vercel --prod      # Deploy to Vercel
```

## Tour Products

| Tour | Duration | Price | Difficulty |
|------|----------|-------|------------|
| Homigot Sunrise | 4 hours | $89 | Easy |
| Seafood & Market | 3.5 hours | $75 | Easy |
| Guryongpo Heritage Walk | 5 hours | $95 | Easy |
| Temple & Waterfall Hiking | 7 hours | $120 | Moderate |
| Steel City & Ocean View | 4.5 hours | $79 | Easy |

## License

All rights reserved. &copy; 2026 Pohang Sudal (포항수달)
