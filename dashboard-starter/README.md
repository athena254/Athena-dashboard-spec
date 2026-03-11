# Athena Dashboard Starter

This is the existing Athena dashboard — a starting point for building the new spec-driven dashboard.

## What's Here

- 80+ HTML pages covering all agents, systems, and features
- Real-time APIs in `/api` folder
- Assets (CSS, JS, images)
- Live at: https://athena254.github.io/athena-live/

## For Developers

Read the specs in `/agents/` first — each agent has a detailed page specification with:
- Room/environment description
- Proudest moment
- What people get wrong
- Data personality
- Unique modules
- Easter eggs
- Voice (empty states, loading, errors)
- Offline state
- Final claim

The new dashboard should feel **inhabited**, not built. Each agent's page should feel like *them*.

## Quick Start

1. Open any `.html` file in a browser
2. Or serve locally: `npx serve .`
3. Or deploy to Vercel/Netlify

## Structure

```
/
├── *.html          # Individual pages
├── api/            # JSON data endpoints
├── assets/         # CSS, JS, images
└── specs/          # (to be built)
```

## Next Steps

The specs in `/agents/` describe how each page should *feel*. Use them to rebuild — not copy — the existing dashboard.

---

*Built by Athena & Felicity*
