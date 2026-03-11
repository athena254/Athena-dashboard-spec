# Katie Micro-Agent Dashboard Specification

## Agent Profile
- **Name:** Katie
- **Type:** Micro-Agent (external GitHub repo)
- **Repository:** https://github.com/aliasrobotics/cai.git
- **Avatar:** 🤖
- **Status:** Idle / Running / Error

## What Katie Does
CAI (Cybersecurity AI) - A comprehensive AI framework with 25+ specialized agents for various cybersecurity tasks.

## Core Capabilities (25+ Agents)

### Attack & Pentesting
1. **web_pentester** - Web application penetration testing
2. **red_teamer** - Red team operations
3. **bug_bounter** - Bug bounty hunting automation
4. **wifi_security_tester** - WiFi security testing
5. **replay_attack_agent** - Replay attack testing

### Defense & Forensics
6. **blue_teamer** - Blue team defense operations
7. **dfir** - Digital forensics & incident response
8. **memory_analysis_agent** - Memory forensics analysis
9. **reverse_engineering_agent** - Reverse engineering

### Analysis & Scanning
10. **codeagent** - Code security analysis
11. **network_traffic_analyzer** - Network traffic analysis
12. **android_sast_agent** - Android SAST analysis

### Specialized
13. **guardrails** - Security guardrails
14. **flag_discriminator** - CTF flag handling
15. **mail** - Email security
16. **subghz_sdr_agent** - SubGhz SDR testing
17. **retester** - Automated retesting
18. **reporter** - Report generation

### Patterns (Orchestration)
- **swarm** - Multiple agents working together
- **hierarchical** - Agent hierarchy
- **sequential** - Step-by-step
- **parallel** - Concurrent execution
- **recursive** - Recursive problem solving
- **conditional** - Conditional logic

## Dashboard Features

### 1. Status Panel
- Current status indicator
- Last run timestamp
- Quick stats (total runs, tasks completed)

### 2. Agent Selector
- Dropdown/card grid of all 25+ agents
- Category filters: Attack, Defense, Analysis, Specialized
- Quick search

### 3. Run Controls
- Agent selection
- Target/input field
- Configuration options per agent
- Start/Stop buttons

### 4. Live Activity Feed
- Real-time execution updates
- Current agent status
- Progress indicators

### 5. Output/Results Panel
- Agent-specific output display
- Findings/result table
- Export options

### 6. Run History
- Table: Date/Agent/Target/Status/Duration
- Filter by agent, date, status

### 7. Templates/Workflows
- Pre-built workflows (bug_bounty, ctf, code_review, etc.)
- Custom workflow builder

## UI Layout
```
┌─────────────────────────────────────────────────────┐
│ HEADER: 🤖 Katie | Status | Quick Stats              │
├─────────────────────────────────────────────────────┤
│ [Agent Selector - Grid of 25+ agents by category]    │
├─────────────────────────────────────────────────────┤
│ [Run Controls]                                       │
│ Agent: [Dropdown] Target: [___________] [Run]        │
├──────────────────────┬──────────────────────────────┤
│ [Activity Feed]    │ [Results Panel]               │
│ • Agent selected   │ Output: ...                  │
│ • Running scan...  │ Results: ...                  │
├──────────────────────┴──────────────────────────────┤
│ [Run History Table]                                  │
│ Date | Agent | Target | Status | Duration          │
└─────────────────────────────────────────────────────┘
```

## Acceptance Criteria
1. Can select from 25+ agents
2. Can input target and run
3. Activity feed shows progress
4. Results display agent output
5. History logs all runs
6. Status indicator works
7. Back button returns to hub
