# DIVISIONS.md — Divisions Overview Page Spec

Route: /divisions

## Purpose
A visual map of how agents are organized into divisions.

## Layout

┌─────────────────────────────────────────────────────────────┐
│ HEADER: "Divisions" + total agent count + system health │
├─────────────────────────────────────────────────────────────┤
│ VIEW TOGGLE: [Grid View] [Org Chart View] │
├─────────────────────────────────────────────────────────────┤
│ GRID VIEW: │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ DIVISION │ DIVISION │ DIVISION │ │
│ │ Agent... │ Agent... │ Agent... │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ ORG CHART VIEW: │
│ Visual tree with Athena at root │
└─────────────────────────────────────────────────────────────┘

## Divisions (Dynamic — not hardcoded)

| Division | Agents |
|--------------------|-------------------------------------------------|
| Engineering | Felicity, Cisco, Nexus, Prometheus |
| Research | Vesper, Scylla, Sentinel |
| Marketing | Talia, Tyche, Zephyr, Hermes, Calliope |
| Operations | Basil, Atlas, Cronos |
| QA | Chiron, Argus, Tycho |
| Infrastructure | Hyperion, Talos, Iris, Mnemosyne, Clio |
| Finance | Sterling |
| Governance | Themis |
| Special | Zoey |

## Division Card (Grid View)
- Division name (large)
- Division health score
- Agent list: emoji + name + status dot
- Active task count across the division

## Org Chart View
- Athena at the top/center as root node
- Division nodes branching from Athena
- Agent nodes branching from each division
- Node color = health status

## Real-Time Behavior
- Agent status dots update live
- Active task count updates live
- New agents and divisions appear without page reload
