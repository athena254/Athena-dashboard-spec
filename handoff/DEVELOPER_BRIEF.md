# DEVELOPER_BRIEF.md — For the External Developer

## What You Are Building

You are building the OpenClaw Dashboard — a command center interface for Athena, a multi-agent AI system. This dashboard gives the user visibility into and control over all their AI agents.

## What OpenClaw Is

OpenClaw is a multi-agent AI operating system running on a VPS (Virtual Private Server). It has:

- **Athena** — The main orchestration agent that coordinates all other agents
- **24 specialized agents** — Each with different roles (Engineering, Research, Marketing, QA, etc.)
- **Divisions** — Agents are organized into 9 functional divisions
- **Skills** — External AI tools that can be called when needed

The dashboard is the window into this system — where you see what's happening, talk to agents, and manage everything.

## What Already Exists

There's a React + Vite app at `/workspace/athena-live/` with basic agent cards and activity feed. It's a starting point but needs to be rebuilt to match the new specs.

**What's there:**
- Basic agent status display
- Simple layout
- Some animation examples

**What's missing:**
- Everything in the spec (see below)

## What Needs to Be Built

### Pages to Build (in order of priority)

1. **Main Dashboard** (`/`)
   - System health bar
   - VPS resources (CPU/RAM/Disk)
   - Agent grid with live status
   - Task feed
   - Division health row

2. **Chat Interface** (`/chat`, `/chat/[agent_id]`)
   - Agent list sidebar
   - Message thread view
   - Real-time message streaming
   - Thread history

3. **Agent Personal Pages** (`/agents/[id]`)
   - Each of 24 agents needs a unique page
   - Custom modules per agent spec
   - Direct chat panel
   - Task history, stats

4. **Divisions Page** (`/divisions`)
   - Grid view and org chart view
   - Dynamic division loading

5. **Apps Gallery** (`/apps`, `/apps/[app_id]`)
   - App cards with status
   - Build logs

6. **Stats Pages** (`/stats`, `/stats/[agent_id]`)
   - Leaderboards
   - Activity charts
   - Per-agent statistics

7. **Meta Agents Page** (`/meta-agents`)
   - Skill library
   - Invocation logs
   - Wrap new external agents

### Design System to Implement

Everything in `/system/DESIGN_SYSTEM.md`:
- Dark-first color palette
- Agent-specific accent colors
- Status indicators (pulsing dots)
- Component library (AgentCard, TaskRow, etc.)
- Responsive breakpoints

## How to Read the Specs

1. **Start with DESIGN_SYSTEM.md** — This defines your visual language
2. **Read ARCHITECTURE.md** — This defines the tech stack and data models
3. **Read page specs** — Each page has its own spec file
4. **Read agent specs** — Each agent has unique custom modules
5. **Check SYSTEM_CORRECTION.md** — This has the current agent roster (don't use old names!)

## Important Rules

1. **NO HARDCODING** — Agents and divisions must load from config, not source code
2. **REAL-TIME** — Use WebSockets for live updates
3. **SLOW = FAST** — Build it right the first time
4. **ASK ATHENA** — If unsure, ask in Discord #athena-command

## Where to Find Things

- Agent roster: `/agents/` folder (24 spec files)
- Page specs: `/pages/` folder (6 spec files)
- Design system: `/system/` folder (3 spec files)
- Current code: `/workspace/athena-live/`
- Your config: You'll receive agent/division config separately

## Tech Stack to Use

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Real-time**: WebSockets (implement client)
- **State**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## Questions?

Ask in Discord #athena-command. Athena will respond.
