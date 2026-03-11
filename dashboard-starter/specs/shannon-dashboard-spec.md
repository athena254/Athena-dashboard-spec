# Shannon Micro-Agent Dashboard Specification

## Agent Profile
- **Name:** Shannon
- **Type:** Micro-Agent (external GitHub repo)
- **Repository:** https://github.com/KeygraphHQ/shannon.git
- **Avatar:** 🔒
- **Status:** Idle / Running / Error

## What Shannon Does
AI Pentester - autonomous security testing for web apps. Tests for:
- Injection attacks
- XSS (Cross-Site Scripting)
- SSRF (Server-Side Request Forgery)
- Broken Authentication
- Broken Authorization

White-box testing (needs source code access).

## Core Capabilities (5 Phases)

### 1. Pre-Reconnaissance
- Analyze source code structure
- Parse config files
- Identify attack surface
- Input: Git repo URL or local path
- Output: Code structure, tech stack

### 2. Reconnaissance
- Nmap scanning
- Subdomain enumeration (Subfinder)
- WhatWeb technology detection
- Schemathesis API testing
- Input: Target URL, scan scope
- Output: Discovered endpoints, technologies

### 3. Vulnerability Analysis
- Test 5 vulnerability types: Injection, XSS, SSRF, Auth, Authz
- Code-aware analysis
- Input: Target URL, vulnerability types
- Output: Findings list with severity

### 4. Exploitation
- Execute real exploits
- Generate PoC (Proof of Concept)
- Validate vulnerability is exploitable
- Input: Vulnerability findings
- Output: Exploit evidence, reproduction steps

### 5. Reporting
- Generate pentest report
- Executive summary
- Technical details
- Remediation recommendations
- Input: All findings and exploits
- Output: PDF/HTML report

## Dashboard Features

### 1. Status Panel
- Current status (Idle/Running/Error)
- Last run timestamp
- Quick stats (total runs, vulnerabilities found)

### 2. Run Controls
- Target URL input
- Repository path input (local or GitHub)
- Vulnerability types checkboxes: Injection, XSS, SSRF, Auth, Authz
- Scan scope: Quick/Full/Custom
- Start Scan button
- Stop button (when running)

### 3. Live Activity Feed
- Real-time updates during scan
- Phase indicator (Pre-recon, Recon, Analysis, Exploitation, Reporting)
- Current action description
- Progress percentage
- Timestamps for each action

### 4. Output/Results Panel
- Discovered endpoints list
- Vulnerability findings table (Type, Severity, URL, Description)
- Exploit evidence display
- Report preview/download

### 5. Run History Log
- Table columns: Date, Target, Phase, Vulnerabilities Found, Status, Duration
- Filter by: Agent, Date range, Status
- Click to view details

### 6. Configuration
- API key input (for LLM)
- Default scan scope
- Output format (PDF/HTML/JSON)
- Notification settings

## UI Layout
```
┌─────────────────────────────────────────────────────┐
│ HEADER: 🔒 Shannon | Status | Quick Stats          │
├─────────────────────────────────────────────────────┤
│ [Run Controls Panel]                                │
│ Target URL: [____________] Repo: [____________]     │
│ [Injection][XSS][SSRF][Auth][Authz]               │
│ [Start Scan] [Stop]                               │
├─────────────────────────────────────────────────────┤
│ [Activity Feed]          │ [Results Panel]        │
│ • Phase: Recon           │ Vulnerabilities: 3      │
│ • Scanning endpoints...  │ • HIGH: SQL Injection   │
│ • Found /api/login      │ • MED: XSS in search   │
│                         │ • LOW: Info disclosure   │
├─────────────────────────────────────────────────────┤
│ [Run History Table]                                 │
│ Date | Target | Phase | Vulns | Status | Duration │
│ ...                                                │
└─────────────────────────────────────────────────────┘
```

## Acceptance Criteria
1. Can input target URL and start scan
2. Activity feed shows real-time progress
3. Results display vulnerability findings
4. Run history logs all executions
5. Can filter history by date/status
6. Status indicator updates correctly
7. Back button returns to Micro-Agents hub
