# UNMAPPED

**Closing the distance between skills and opportunity.**

UNMAPPED is a multi-tenant platform that maps real human skills to real economic opportunity — for the people who have them, the organizations that need them, and the governments that shape them.

Built for the [HackNation Youth Hackathon](https://hack-nation.ai).

---

## The Problem

1.4 billion people work in the informal economy. Their skills are invisible to employers, governments, and each other. Education credentials don't translate into labor market signals. AI is displacing routine work faster than reskilling can keep up — and the people most affected have no tools to navigate it.

## What UNMAPPED Does

- **For Youth/Workers**: Build a portable skills profile from real life — informal work, self-taught skills, languages. See what your skills are worth, where demand is growing, and what to learn next.
- **For Organizations**: Find talent by what people can actually do, not by credentials. Post opportunities that surface in skill-matched feeds.
- **For Governments**: Configure the platform for your country. Watch skill supply, demand, and automation risk evolve. Shape policy with real signals.

---

## Features

### Skill Signal Engine
- ESCO + ISCO-08 occupation matching
- Frey & Osborne automation risk scores, calibrated for LMIC contexts
- Expected wage bands by country (ILO ILOSTAT)
- Growth trend indicators (World Bank WDI)
- Durable skills identification + adjacent skill recommendations
- Wittgenstein Centre education projections to 2035

### Multi-Format Skill Input
- Manual skill tagging
- URL / portfolio import
- CV / resume upload (PDF, DOCX)
- Photo of certificate (AI extraction ready)
- Google Drive import
- References from peers
- LinkedIn profile import
- GitHub contributions import

### 3D Opportunity Galaxy
- Real-time 3D network visualization (Three.js)
- Structured orbital layout: inner/middle/outer rings by relevance
- Glowing nodes by type (people, organizations, training, employers)
- Curved bezier connections with strength-based opacity
- Orbit controls with zoom/rotate
- Click-to-inspect with dark glass panel
- 2D fallback for devices without WebGL

### Global Demand Radar (Heatmap)
- Leaflet map with dark no-label tiles (Carto)
- Real ILO employment data for 159 countries
- Dark glass tooltips with formatted metrics
- Country-level sector breakdown (Agriculture, Industry, Services)
- Youth unemployment signals
- WDI economic indicators

### Opportunity Journey (My Path)
- 6-stage guided pathway with animated progress
- Live risk + demand signals sidebar
- Milestone tracking with gamification
- Training recommendations

### Command Search
- Spotlight-style search interface
- Results grouped by: People, Organizations, Opportunities, Events
- Animated match percentage rings
- Keyboard-friendly UX

### Platform Features
- Light/Dark mode toggle
- Multi-language selector (8 languages)
- Notification preferences (SMS, Email, Push, WhatsApp)
- Data transparency panel (sources, privacy, limitations)
- Profile gamification progress bar
- Supabase authentication + persistent storage

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **TypeScript 5.8** | Type safety |
| **Vite 7** | Build tool + dev server |
| **TanStack Router** | File-based routing |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations + page transitions |
| **Three.js** | 3D galaxy visualization |
| **React Three Fiber** | React renderer for Three.js |
| **@react-three/drei** | Three.js helpers (OrbitControls, Stars, Html) |
| **Leaflet** | Map rendering |
| **React Leaflet** | React bindings for Leaflet |
| **Recharts** | Data visualization charts |
| **Lucide React** | Icon system |
| **XYFlow (React Flow)** | 2D graph visualization |

### Backend / Data
| Technology | Purpose |
|---|---|
| **Supabase** | Auth, PostgreSQL database, real-time |
| **Google Gemini AI** | Profile enhancement, voice transcription |
| **ILO ILOSTAT** | Employment, wages, labor force data |
| **World Bank WDI** | GDP, population, education indicators |
| **ESCO Taxonomy** | EU skills & occupation classification |
| **ISCO-08** | International occupation classification |
| **Frey & Osborne** | Automation probability scores |
| **Wittgenstein Centre** | Education projections to 2035 |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Cloudflare Pages** | Deployment (via Wrangler) |
| **Python 3** | Data cleaning pipeline |
| **Git / GitHub** | Version control |

---

## Data Pipeline

Raw datasets (ILO ILOSTAT CSVs, World Bank WDI) are cleaned and standardized using `clean_datasets.py` into a consistent schema:

```
country | year | category | value
```

Cleaned data is converted to JSON and served as static files from `/public/data/`:
- `employment_sector.json` — 446 rows, 159 countries
- `employment_occupation.json` — 1,280 rows, 143 countries
- `unemployment.json` — 319 rows, 161 countries
- `wdi.json` — 2,364 rows, 265 countries
- `training_pathways.json` — 75 training programs

No external API calls at runtime. All data loads from local JSON.

---

## Getting Started

```bash
# Clone
git clone https://github.com/theov06/unmapped.git
cd unmapped/frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Open
open http://localhost:5173
```

### Environment Variables (optional)

Create `frontend/.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_key
```

---

## Project Structure

```
frontend/
├── public/data/          # Static JSON datasets (ILO, WDI, training)
├── src/
│   ├── components/
│   │   ├── galaxy/       # 2D galaxy (fallback)
│   │   ├── galaxy3d/     # 3D galaxy (Three.js)
│   │   ├── layout/       # ImmersiveShell, FloatingDock, TopBar
│   │   ├── motion/       # AnimatedCounter, GlassCard, OpportunityOrb, etc.
│   │   └── ui/           # Radix UI primitives
│   ├── data/             # Countries + Occupations (ESCO/ISCO-08)
│   ├── integrations/     # Supabase client
│   ├── lib/              # Skill engine, motion variants, formatters
│   ├── panels/           # Page sections (student, org, gov)
│   ├── routes/           # TanStack Router file-based routes
│   └── services/         # Local data loader, real data service
```

---

## Design System

- **Dark-first** with light mode toggle
- **Glassmorphism**: backdrop blur, gradient borders, soft depth
- **Neon accents**: violet (#8B5CF6), cyan (#22D3EE), coral (#FF5A6A), emerald (#34D399), amber (#F59E0B)
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (data)
- **Animations**: page transitions, staggered reveals, animated counters, orbital motion, node pulse

---

## Data Sources & Transparency

| Source | What it provides | Coverage |
|---|---|---|
| ILO ILOSTAT | Employment by sector/occupation, unemployment | 159+ countries, 2020-2025 |
| World Bank WDI | GDP, population, education, urbanization | 265 countries, 2020-2022 |
| ESCO v1.2.1 | Skills taxonomy, occupation classification | EU standard, multilingual |
| ISCO-08 | Occupation codes | International standard |
| Frey & Osborne | Automation probability | Recalibrated for LMIC |
| Wittgenstein Centre | Education projections | 12 LMIC countries, to 2035 |

### Honest Limitations
- Informal-sector wages are partially imputed from regional medians
- Automation scores are calibrated on global task content; LMIC field reality may differ
- ESCO/ISCO-08 don't yet cover several emerging roles
- Profile coverage is uneven and grows quarterly

---

## Team

Theo Von, Mujib ur Rahman, Luis Delgadillo and Akanksha Agarwal.
Built at HackNation 2026. Challenge for The World Bank.

---

## License

MIT
