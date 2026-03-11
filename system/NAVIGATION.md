# NAVIGATION.md — Global Navigation & Routing Spec

## Global Shell Structure

┌─────────────────────────────────────────────────────────────────┐
│ TOP BAR │
│ [OpenClaw logo] .............. [Health Pill] [Alerts] [Avatar] │
├──────────┬──────────────────────────────────────────────────────┤
│ SIDEBAR │ PAGE CONTENT │
│ │ │
│ nav │ │
│ items │ │
└──────────┴──────────────────────────────────────────────────────┘

## Sidebar Items
- 🏠 Dashboard
- 💬 Chat (badge if unread)
- 🤖 Agents
- 🏛 Divisions
- 📦 Apps
- ⚗️ Meta Agents
- 📊 Stats
- ⚙️ Settings

## System Health Pill
- Always visible top bar
- Shows X/10 health score
- Click → mini-modal with VPS resource bars + quick agent status summary

## Right Drawer
- Collapsible
- Shows rolling feed of agent activity (task started/completed/flagged)
- Only critical items
