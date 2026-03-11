# SPEC_CHANGES.md — Spec Adjustments Log

## Changes Made by Athena

This document logs all changes made to the original specs for consistency and buildability.

### Change 1: Agent Roster Update
- **Original**: Used old roster (Delver, Butler, Squire, etc.)
- **Changed to**: New canonical roster (Vesper, Scylla, Basil, etc.)
- **Reason**: SYSTEM_CORRECTION.md superseded old roster
- **Impact**: All 24 agent specs use new names and divisions

### Change 2: Agent Count Correction
- **Original**: ~14 agents
- **Changed to**: 24 agents across 9 divisions
- **Reason**: SYSTEM_CORRECTION.md defines full roster

### Change 3: Meta Agents Clarification
- **Original**: Meta agents treated as new OpenClaw agents
- **Changed to**: Meta agents are external skills, not citizens
- **Reason**: META_AGENTS_REVISED.md clarifies they are contractors

### Change 4: Base Layout Standardization
- **Original**: Each agent spec had slightly different layouts
- **Changed to**: All follow AGENT_PAGES_BASE.md structure
- **Reason**: Consistency for developer

### Change 5: Extensibility Enforcement
- **Original**: Could be interpreted as hardcoded
- **Changed to**: Explicit "NO HARDCODING" rules added
- **Reason**: SYSTEM_CORRECTION.md mandates dynamic loading

---

All changes align specs with SYSTEM_CORRECTION.md and ensure buildability.
