# STATS.md — Agent Performance & Stats Tracking Spec

Routes: /stats and /stats/[agent_id]

## /stats — System-Wide Overview

### Layout
┌─────────────────────────────────────────────────────────────┐
│ HEADER + DATE RANGE FILTER (Today / 7d / 30d / All Time) │
├──────────────────────────────────────────────────────────────┤
│ TOP ROW STATS │
│ Tasks Completed | Success Rate | Avg Duration | Uptime % │
├───────────────────────┬─────────────────────────────────────┤
│ LEADERBOARD │ SYSTEM ACTIVITY CHART │
│ (agents ranked by usefulness) │ (line chart) │
├───────────────────────┴─────────────────────────────────────┤
│ AGENT STATS TABLE │
└─────────────────────────────────────────────────────────────┘

### Top Row Stats
- Tasks Completed — total across all agents in selected period
- Success Rate — % tasks completed without failure
- Avg Task Duration — mean time to complete a task
- System Uptime — % of time at least one agent was active

### Leaderboard
- Agents ranked by composite "usefulness score"
- Usefulness score = weighted formula of: tasks + success rate + uptime

### System Activity Chart
- Line chart, one line per active agent
- X axis: time, Y axis: tasks completed per period

### Agent Stats Table
- Columns: Agent, Tasks Completed, Tasks Failed, Success Rate %, Avg Duration, Total Uptime %, Tokens Used, Last Active

## /stats/[agent_id] — Individual Agent Stats

### Overview Tab
- Usefulness score (large)
- Key stats grid
- Activity sparkline (last 30 days)
- Most common task types
- Recent tasks list (last 10)

### Tasks Tab
- Full task history, paginated (50 per page)
- Filter by: status / date range / keyword

### Uptime Tab
- Uptime calendar heatmap (GitHub-style)
- Green = active, yellow = idle, red = offline
- Average uptime % per week

### Errors Tab
- All failed tasks
- Most common error types
- Error rate over time

### Logs Tab
- Raw log output from this agent
- Searchable, filterable by log level
