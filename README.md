# Portfolio Frontend

This is the frontend for the portfolio website of Charan Sai Pothabattula, built with Next.js 13+ (App Router), React, and Tailwind CSS.

## Features
- Modern, responsive design with dark mode support
- Home, About, Projects, and Contact Me sections
- Admin login and dashboard for project and home content management
- Animated and interactive UI elements (scroll indicators, loading spinners, etc.)
- Social links in the footer and a vertical scroll sidebar for improved UX
- API integration for dynamic project and home data

## Structure
- `app/` — Next.js App Router pages and layouts
- `components/` — Reusable UI components (Navbar, Footer, ProjectCard, ContactForm, etc.)
- `lib/` — API and data fetching utilities
- `styles/` — Global and custom styles

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
2. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) to view the site.

## Customization
- Update your social links and email in the Footer component.
- Add or edit projects via the admin dashboard (requires backend setup).
- Adjust theme and layout using Tailwind classes in the components.

## Notes
- This frontend expects a compatible backend for authentication and data APIs.
- Environment variables may be required for API endpoints and secrets.

---

© 2025 Charan Sai Pothabattula. All rights reserved.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

