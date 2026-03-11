# DESIGN_SYSTEM.md — OpenClaw Visual Language

## Philosophy

The interface should feel like a command center, not a SaaS dashboard.
Dark-first. Information-dense but never cluttered.

## Color Palette

### Base
| Token | Value | Usage |
|--------------------|-------------|--------------------------------|
| bg-base | #0a0a0f | Main background |
| bg-surface | #111118 | Cards, panels |
| bg-elevated | #1a1a24 | Modals, dropdowns |
| bg-border | #2a2a3a | All borders |

### Text
| Token | Value | Usage |
|--------------------|-------------|--------------------------------|
| text-primary | #f0f0ff | Main content |
| text-secondary | #8888aa | Labels, metadata |
| text-muted | #4a4a6a | Placeholders, disabled |

### Status
| Token | Value | Usage |
|--------------------|-------------|--------------------------------|
| status-green | #22c55e | Active, healthy, success |
| status-yellow | #eab308 | Warning, idle |
| status-red | #ef4444 | Offline, critical, error |
| status-blue | #3b82f6 | Respawning, processing |
| status-purple | #a855f7 | Athena-specific actions |

## Typography

### Font Stack
- Primary: Geist or Inter
- Monospace: Geist Mono or JetBrains Mono

### Scale
| Name | Size | Usage |
|----------|-------|--------|
| Display | 2rem | Page titles |
| Heading | 1.25rem | Section headers |
| Body | 0.875rem | Main content |
| Small | 0.75rem | Labels, metadata |
| Mono | 0.8rem | Logs, IDs, timestamps |

## Status Indicators

### Agent Status Dot
- 8px circle, always visible next to agent name
- Green pulse animation when active
- Static yellow when idle
- Static red when offline
- Blue spinning ring when respawning

## Core Components

- AgentCard - used in dashboard, divisions
- TaskRow - used in agent pages and stats
- ChatBubble - user right, agent left
- ThreadCard - conversation summaries
- AlertBanner - critical alerts
- ResourceBar - CPU/RAM/Disk
- AppCard - apps gallery

## Motion
- Page transitions: 150ms fade
- Cards appearing: 200ms slide up + fade
- Status dot pulse: 2s infinite

## Responsive
- Desktop first (power-user dashboard)
- Tablet: sidebar collapses to icon-only
- Mobile: bottom navigation
