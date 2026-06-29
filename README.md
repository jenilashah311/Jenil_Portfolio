# Jenil Shah — Interactive Portfolio

A next-generation, graphics-heavy portfolio inspired by Apple Vision Pro, Tesla dashboards, and sci-fi control panels.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Three.js** / **React Three Fiber** + **Drei**
- **GSAP** (optional animations)

## Features

- **Cinematic loader** — Boot sequence with “Initializing Developer Intelligence System…”
- **3D dashboard** — Floating glassmorphism panels with mouse parallax
- **Panels**: AI/ML, Software Engineering, Full Stack, Data Science, Projects, Resume, Contact
- **Developer Stats HUD** — Animated counters (models trained, APIs built, etc.)
- **Interactive skill graph** — Categories: AI/ML, Backend, Frontend, Data, Cloud
- **Terminal** — Commands: `help`, `projects`, `skills`, `resume`, `contact`, `clear`, `whoami`
- **AI Assistant** — Simple chatbot for FAQs
- **GitHub Activity** — Placeholder for recent activity (wire to GitHub API later)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Data

Content is driven by `src/data/` (profile, experience, projects, skills, stats), sourced from `resume.md`.

## Project structure

```
src/
├── app/           # App Router pages & layout
├── components/
│   ├── 3d/        # R3F scene (particles, orbiting nodes)
│   ├── animations/ # Cinematic loader
│   ├── chat/      # AI assistant
│   ├── dashboard/ # Panels & expanded content
│   ├── github/    # GitHub activity
│   ├── hud/       # Stats HUD
│   ├── projects/  # Project cards
│   ├── skills/    # Skill graph
│   ├── terminal/  # Terminal UI
│   └── ui/        # Glass panel, shared UI
├── data/          # Profile, experience, projects, skills, stats
└── types/         # TypeScript types
```
