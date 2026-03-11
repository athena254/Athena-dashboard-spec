# 🦉 ATHENA MASTER DASHBOARD - Design Specification

**Version:** 2.0  
**Date:** 2026-02-27  
**Status:** Design Specification

---

## 1. HERO/HEADER

- **Logo:** 🦉 Athena Live
- **Tagline:** Multi-Agent Intelligence Command Center
- **Status Badge:** Green pulse animation with "All Systems Operational" or red for errors
- **Theme Toggle:** Dark/Light mode switch (top-right)
- **Last Updated:** Timestamp (auto-refresh indicator)

---

## 2. SIDEBAR/NAVIGATION

**Left Sidebar (collapsible):**
- 🏠 Home (Master Dashboard)
- 🤖 Agents (all 14 cards)
- 💰 Finance/Beelancer
- 📊 Analytics
- 🧠 Knowledge Graph
- ⚙️ Settings

**Top Bar:**
- Search agents/tasks
- Quick command input
- Notifications bell
- User avatar

---

## 3. AGENT GRID (14 Cards)

Each card displays:
- **Avatar:** Emoji + agent color
- **Name:** Agent name
- **Role:** One-line role summary
- **Status:** Active (green) / Idle (yellow) / Offline (gray)
- **Launch Button:** "Launch Dashboard" → routes to subagent page
- **Quick Stats:** Tasks completed, success rate

### All 14 Agents:

| # | Agent | Role | Color | Dashboard |
|---|-------|------|-------|-----------|
| 1 | 🦉 Athena | Main Orchestrator | Purple | (Master) |
| 2 | 💰 Sterling | Finance/Auto-Bidding | Gold | sterling-mission.html |
| 3 | 🔮 Ishtar | Oracle/PAI Research | Indigo | ishtar-mission.html |
| 4 | ⚖️ THEMIS | Council/Deliberation | Teal | themis-mission.html |
| 5 | 💻 Felicity | Code Artisan | Pink | felicity-mission.html |
| 6 | ⚡ Prometheus | Execution/Deployments | Orange | prometheus-mission.html |
| 7 | 🧠 Nexus | Intelligence Synthesizer | Cyan | nexus-mission.html |
| 8 | 📚 Delver | Research/Analysis | Blue | delver-mission.html |
| 9 | 🛠️ Squire | Assistant/Ops | Green | squire-mission.html |
| 10 | 🔒 Cisco | BMAD/Security | Red | cisco-mission.html |
| 11 | 🪙 Kratos | Crypto/DeFi Intelligence | Emerald | kratos-mission.html |
| 12 | 📞 Apollo | Client Relations | Violet | apollo-mission.html |
| 13 | 📣 Hermes | Outreach/Marketing | Amber | hermes-mission.html |
| 14 | 🌐 Browser | Browser Automation | Slate | browser-mission.html |

---

## 4. GLOBAL METRICS BAR

- Total Agents: 14
- Active: X | Idle: X
- Pending Bids: X
- Active Gigs: X
- Revenue (Honey): X

---

## 5. DESIGN SYSTEM

### Colors (Dark Mode Primary)
```css
--bg-base: #0c0f1a
--bg-surface: #111827
--bg-elevated: #1f2937
--primary: #6366f1 (indigo)
--success: #10b981 (emerald)
--warning: #f59e0b (amber)
--danger: #ef4444 (red)
--text-primary: #f9fafb
--text-secondary: #d1d5db
```

### Typography
- **Headings:** Inter/System font, 700 weight
- **Body:** Inter/System font, 400 weight
- **Monospace:** JetBrains Mono for data

### Layout
- Max width: 1400px centered
- Grid: CSS Grid with auto-fill
- Cards: Border-radius 16px, subtle shadows
- Responsive: Mobile (<768px), Tablet (768-1024), Desktop (>1024)

### Interactions
- Hover: Scale 1.02 + glow
- Click: Ripple effect
- Transitions: 200ms ease
- Loading: Skeleton screens

---

## 6. ROUTING

- Each agent card → `/athena-live/{agent}-mission.html`
- Back button on each subagent dashboard → returns to index.html
- Shared state via localStorage (theme, last refresh)

---

## 7. FEATURES

### Global
- [x] Dark/Light theme toggle
- [x] Auto-refresh every 5 minutes
- [x] Manual refresh button
- [x] Search/filter agents
- [x] Status indicators (live)

### Per-Agent Dashboard (template)
- [x] Agent info header (avatar, name, role, status)
- [x] Performance metrics (tasks, success rate)
- [x] Recent activity feed
- [x] Quick actions specific to agent
- [x] Back to master button

---

## 8. FILE STRUCTURE

```
/athena-live/
├── index.html              # Master Dashboard
├── styles.css              # Global styles
├── js/
│   └── app.js              # Global JS (routing, state)
├── sterling-mission.html   # Agent dashboards...
├── ishtar-mission.html
├── felicity-mission.html
├── prometheus-mission.html
├── themis-mission.html
├── nexus-mission.html
├── delver-mission.html
├── squire-mission.html
├── cisco-mission.html
├── kratos-mission.html
├── apollo-mission.html
├── hermes-mission.html
└── browser-mission.html
```

---

## 9. ACCEPTANCE CRITERIA

1. ✅ Master dashboard shows all 14 agents
2. ✅ Each agent has clickable card → dedicated page
3. ✅ Back navigation works on all pages
4. ✅ Theme toggle persists across pages
5. ✅ Responsive on mobile/tablet/desktop
6. ✅ Professional, deploy-ready design
7. ✅ No broken links

---

**End of Spec**
