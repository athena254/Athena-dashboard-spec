# CODE_AUDIT.md — Existing Dashboard Code Audit

## Current State

The Athena Live Dashboard exists at `/workspace/athena-live/`. It's a React + Vite application that provides real-time agent monitoring.

## What's Already Built

### Working Components
- Real-time agent status cards
- Agent activity feed
- Basic layout with sidebar navigation
- Theme switching (light/dark)
- Responsive design foundation

### What's Broken or Missing

1. **No per-agent personal pages** - Need `/agents/[id]` routes
2. **No chat interface** - Need `/chat` routes
3. **No apps gallery** - Need `/apps` routes
4. **No divisions view** - Need `/divisions` route
5. **No stats tracking** - Need `/stats` routes
6. **No WebSocket integration** - Data is currently mocked
7. **No meta agents page** - Need `/meta-agents` route
8. **Design system not implemented** - Need to apply colors, typography, components

### What's Outdated Relative to Specs

1. Agent roster is outdated (uses old names like Delver, Butler)
2. No division structure implemented
3. No dynamic agent loading - hardcoded list
4. No skill profiles or routing logic

### Technical Stack (Current)
- React 19
- Vite 7
- Basic CSS (not Tailwind)
- No state management (local state only)
- No WebSocket client

### What Needs Rebuilding

1. **Full redesign** using Tailwind CSS + shadcn/ui
2. **WebSocket integration** for real-time updates
3. **Dynamic routing** for unlimited agents
4. **All new page components** from spec
5. **Design system implementation**

## Recommendations

1. Start fresh with new Next.js + Tailwind stack per spec
2. Keep existing `/workspace/athena-live` as reference for animations
3. Build components following DESIGN_SYSTEM.md strictly
4. Implement WebSocket client first for real-time data
5. Create dynamic agent grid component that loads from config
