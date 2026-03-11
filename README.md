# OpenClaw — Athena System Dashboard
## Specification Repository

This repository contains all product and design specifications for the OpenClaw web dashboard — the control interface for Athena and her full agent network.

This is a spec-only repository. No production code lives here.
All specs are written to be handed directly to an AI IDE or developer for implementation.

---

## Repository Structure

/
├── README.md ← You are here
├── ARCHITECTURE.md ← System-wide structure & principles
│
├── pages/
│ ├── DASHBOARD.md ← Main dashboard spec
│ ├── CHAT.md ← Chat interface spec
│ ├── APPS.md ← Built apps gallery spec
│ ├── DIVISIONS.md ← Divisions & org chart spec
│ ├── STATS.md ← Agent performance & tracking spec
│ └── META_AGENTS.md ← Meta agent creation page spec
│
├── agents/
│ ├── ARGUS.md ← QA
│ ├── BASIL.md ← Operations
│ ├── CALLIOPE.md ← Marketing
│ ├── CHIRON.md ← QA
│ ├── CISCO.md ← Engineering
│ ├── CLIO.md ← Infrastructure
│ ├── CODER.md ← Engineering
│ ├── CRONOS.md ← Operations
│ ├── FELICITY.md ← Engineering
│ ├── HERMES.md ← Marketing
│ ├── HYPERION.md ← Infrastructure
│ ├── IRIS.md ← Infrastructure
│ ├── MNEMOSYNE.md ← Infrastructure
│ ├── NEXUS.md ← Engineering
│ ├── PROMETHEUS.md ← Engineering
│ ├── SCYLLA.md ← Research
│ ├── SENTINEL.md ← Research
│ ├── STERLING.md ← Finance
│ ├── TALIA.md ← Marketing
│ ├── TALOS.md ← Infrastructure
│ ├── THEMIS.md ← Governance
│ ├── TYCHE.md ← Marketing
│ ├── TYCHO.md ← QA
│ ├── VESPER.md ← Research
│ ├── ZEPHYR.md ← Marketing
│ └── ZOEY.md ← Special
│
├── system/
│ ├── DESIGN_SYSTEM.md ← Colors, fonts, components, tokens
│ ├── NAVIGATION.md ← Global nav & routing spec
│ └── NOTIFICATIONS.md ← Notification behavior spec
│
└── prompts/
 └── AGENT_PAGE_BRIEF.md ← Prompt for agent page customization
---

## Core Principles

1. Silence is health — the UI does not surface noise. Only critical events interrupt.
2. Each agent is a person — their page reflects their identity, not a generic template.
3. The user is always in control — every page has a direct line to the agent running it.
4. Real-time without clutter — live data streams in without cluttering the interface.
5. Built to grow — no hardcoded agent lists. The system expands automatically.
6. Nothing hardcoded — agents and divisions loaded dynamically from configuration.

---

## Implementation Notes for the IDE

- All pages are defined as independent specs. Build them in any order.
- The design system in /system/DESIGN_SYSTEM.md must be read first.
- Agent pages follow a shared base layout but each has unique modules.
- Do not hardcode agent names or counts anywhere. Agents are loaded dynamically.
- Every page that shows agent data must handle agents being offline gracefully.
