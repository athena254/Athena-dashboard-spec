# DASHBOARD.md — Main Dashboard Page Spec

Route: /

## Purpose
The first thing you see when you open OpenClaw.
A live, at-a-glance view of the entire system.

## Layout

┌─────────────────────────────────────────────────────────────┐
│ SYSTEM HEALTH BAR (full width) │
├────────────────┬───────────────────────┬────────────────────┤
│ VPS RESOURCES │ ACTIVE AGENTS │ ALERT QUEUE │
│ (3 bars) │ (count + status) │ (critical only) │
├────────────────┴───────────────────────┴────────────────────┤
│ AGENT GRID (all agents as cards, live status) │
├─────────────────────────────────────────┬───────────────────┤
│ LIVE TASK FEED │ RECENT OUTPUTS │
│ (scrolling, real-time) │ (last 5 results) │
├─────────────────────────────────────────┴───────────────────┤
│ DIVISION HEALTH ROW (each division as a status pill) │
└─────────────────────────────────────────────────────────────┘

## Sections

### System Health Bar
- Full width strip at top
- Overall health score X/10 as large number
- Last audit timestamp
- Colored background: green / yellow / red
- Click → expands to full resource breakdown modal

### VPS Resources Panel
- Three ResourceBar components: CPU / RAM / Disk
- Updates every 30 seconds via WebSocket
- Red threshold triggers AlertBanner

### Active Agents Panel
- Large number showing how many agents are currently active
- Smaller numbers for idle / offline counts
- Click any count → filters the agent grid below

### Alert Queue Panel
- Only visible if there are unresolved critical or human-needed alerts
- Hidden entirely when no alerts exist

### Agent Grid
- All registered agents as AgentCard components
- 4 columns desktop, 2 tablet, 1 mobile
- Live status dots pulsing
- Current task visible on each card
- Click any card → go to that agent's personal page

### Live Task Feed
- Scrolling list of tasks currently running or just completed
- Each row: agent emoji + task name + status pill + duration

### Recent Outputs Panel
- Last 5 completed deliverables from any agent
- Each: agent emoji + output title + timestamp + "View" button

### Division Health Row
- One pill per division
- Each pill: division name + agent count + overall health color

## Real-Time Behavior
- Agent status updates immediately on WebSocket agent.status_change
- Task feed updates on agent.task_update
- Resource bars update every 30 seconds
- Alert queue updates on alert.critical and alert.human_needed

## Empty States
- No agents online: show "No agents currently active"
- No active tasks: task feed shows last 5 completed tasks instead
- No alerts: alert panel completely absent
