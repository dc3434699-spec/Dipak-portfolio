# KisanSetu 🌾

A modern, full-featured agricultural platform connecting farmers directly to consumers.

## Features

- 🛒 **Marketplace** — Browse and buy fresh fruits, vegetables, dairy, and grains directly from farmers
- 🌄 **Farm Visits** — Book agri-tourism visits to local farms with an interactive map
- 👷 **Worker Assistance** — Post requirements or contact skilled agricultural workers
- 🚜 **Machinery Store** — Rent or buy tractors, pumps, and farming equipment

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Routing | React Router v6 |
| Maps | Leaflet + react-leaflet |
| Icons | lucide-react |
| Styling | CSS Modules + CSS Variables |
| Deployment | Vercel |

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/dc3434699-spec/Dipak-portfolio.git
cd Dipak-portfolio

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start development server
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components (Button, Card, Navbar, Footer, Input)
├── layouts/          # Page layouts (MainLayout)
├── pages/            # Route-level pages (Home, Marketplace, FarmVisits, Workers, Machinery)
├── styles/           # Global CSS variables and reset
└── App.tsx           # Root app with routing
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run linter |

## Deployment

The app is configured for Vercel. A `vercel.json` file handles SPA client-side routing.

1. Import the repo on [vercel.com](https://vercel.com)
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy 🚀

## Design System

- **Typography:** Plus Jakarta Sans (headings/body), Newsreader (serif accents)
- **Primary Color:** Deep Agricultural Green `#166534`
- **Accent Color:** Earthy Amber `#d97706`
- **Base Background:** Off-White `#f8fafc`

---

Built with ❤️ for Indian farmers and consumers.
