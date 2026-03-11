# ARCHITECTURE.md — OpenClaw System Architecture

## What This System Is

OpenClaw is a multi-agent AI operating system running on a VPS, orchestrated by Athena.
This dashboard is the human interface into that system.

## Frontend Architecture

### Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS + shadcn/ui
- Real-time: WebSockets
- State: Zustand or Jotai
- Charts/Stats: Recharts or Tremor
- Icons: Lucide React

### Rendering Strategy
- Dashboard, Divisions, Stats → SSR + real-time WebSocket overlay
- Agent pages → SSR skeleton + live hydration
- Chat → Client-side only (streaming responses)
- Apps gallery → SSR

## Data Architecture

### Agent Object Schema
```json
{
  "id": "string",
  "name": "string",
  "emoji": "string",
  "role": "string",
  "division": "string",
  "status": "active | idle | offline | respawning",
  "channel": "string",
  "last_active": "ISO timestamp",
  "current_task": "string | null",
  "health_score": 0-10,
  "capabilities": ["string"]
}
```

### Task Object Schema
```json
{
  "id": "string",
  "agent_id": "string",
  "title": "string",
  "status": "queued | running | complete | failed",
  "created_at": "ISO timestamp",
  "completed_at": "ISO timestamp | null",
  "duration_ms": "number | null",
  "tokens_used": "number | null"
}
```

## Real-Time Layer

### WebSocket Event Types
- agent.status_change
- agent.task_update
- alert.critical
- alert.human_needed
- chat.message
- system.resource_update
- app.built

## Page Routing

/ → Dashboard
/chat → Chat hub
/chat/[agent_id] → Direct chat with agent
/agents/[agent_id] → Agent personal page
/apps → Apps gallery
/apps/[app_id] → Individual app page
/divisions → Divisions overview
/stats → System-wide stats
/settings → System settings

## Extensibility Rules

1. Never hardcode agent names, IDs, or counts
2. All agent pages use same base layout with custom modules injected
3. New agents auto-appear in all relevant pages
4. Routing must support unlimited agents, threads, apps
