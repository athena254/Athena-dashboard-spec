# Nexus Synthesizer Dashboard - Specification

## Overview
The Nexus Synthesizer Dashboard provides visibility into cross-agent pattern recognition, intelligence synthesis pipelines, and collaboration metrics between the nine agents in the Athena system.

## Features

### 1. Pattern Recognition Results

**Detected Patterns List:**
- Cards showing each detected pattern
- Fields: Pattern Type, Description, Confidence Score, First Detected, Frequency, Source Agents
- Confidence color coding: >80% Green, 50-80% Yellow, <50% Red

**Pattern Categories:**
- Market Patterns (trending jobs, pricing anomalies)
- Agent Behavior Patterns (bidding patterns, research cycles)
- Temporal Patterns (time-based correlations)
- Cross-Agent Patterns (collaboration tendencies)

**Pattern Detail View:**
- Full description and methodology
- Supporting data points (expandable)
- Related patterns list
- Action items generated from pattern
- Mark as reviewed/acknowledged

**Pattern Timeline:**
- Visual timeline of when patterns were discovered
- Pattern lifecycle status (Active, Fading, Confirmed, Dismissed)
- Filter by category and date range

### 2. Intelligence Synthesis Pipeline

**Pipeline Stage Visualization:**
- Horizontal flow diagram showing:
  1. **Data Ingestion** → Raw data from all agents
  2. **Pattern Detection** → AI-identified patterns
  3. **Cross-Reference** → Pattern correlation
  4. **Synthesis** → Intelligence pieces combined
  5. **Validation** → Human/auto-verification
  6. **Publication** → Insights shared to knowledge base

**Stage Metrics:**
- Items in each stage (count badge)
- Average time per stage
- Bottleneck indicator (slowest stage highlighted)
- Throughput rate (items/hour)

**Pipeline Queue:**
- Items currently being processed
- Priority queue with drag-reorder
- Processing history log
- Failed items with retry option

**Synthesis Results:**
- Compiled intelligence reports
- Sources list (which agents contributed)
- Confidence score
- Timestamp
- Tags (actionable, informational, strategic)

### 3. Cross-Agent Collaboration Metrics

**Agent Interaction Matrix:**
- 9x9 grid showing interaction frequency between each agent pair
- Cell color intensity = interaction count
- Click cell for detailed interaction log
- Row/Column labels: Sterling, Ishtar, Delver, Squire, Felicity, Prometheus, Cisco, THEMIS, Athena (hub)

**Collaboration Cards:**
- Per-agent statistics:
  - Messages sent/received
  - Insights shared
  - Tasks delegated
  - Tasks received
  - Collaboration score (0-100)

**Activity Feed:**
- Real-time stream of cross-agent events
- Event types: task_handoff, insight_share, data_request, confirmation
- Timestamp, source agent, target agent, event type
- Expandable for details

**Collaboration Trends:**
- Line chart: Total interactions over time (daily/weekly)
- Stacked area: Interactions by agent pair
- Heatmap: Most active collaboration hours

**Network Visualization:**
- Force-directed graph of agent connections
- Node size = total activity
- Edge thickness = collaboration frequency
- Animated for real-time updates

## Agent Collaboration Types

| Type | Description | Frequency |
|------|-------------|-----------|
| task_handoff | One agent passes work to another | High |
| insight_share | Ishtar/Sterling share findings | Medium |
| data_request | Agent queries another for data | High |
| confirmation | Task completion acknowledgment | High |
| strategic_pause | Athena coordinates collective wait | Low |

## Synthesis Intelligence Report Format

```json
{
  "id": "syn-intel-2024-001",
  "title": "Market Opportunity: DeFi Projects Rising",
  "confidence": 0.87,
  "synthesized_from": ["sterling", "ishtar", "nexus"],
  "pattern_evidence": [...],
  "recommendations": [
    "Increase bidding on solidity contracts",
    "Focus research on DeFi compliance"
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-22T10:30:00Z",
  "action_required": true
}
```

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  NEXUS SYNTHESIZER                                          │
│  Cross-Agent Intelligence                  [Pipeline View] │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Patterns  │ │Synthesis │ │Collab    │ │Active    │        │
│  │ Detected │ │ Reports  │ │ Score    │ │ Flows    │        │
│  │   47     │ │   23     │ │   78%    │ │    5     │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│  [Patterns] [Pipeline] [Collaboration] [Network]           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Tab Content Area                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Color Palette
- Primary: `#6366F1` (Indigo - synthesis/connection theme)
- Secondary: `#1F2937` (Dark gray)
- Accent: `#14B8A6` (Teal - collaboration)
- Success: `#10B981` (Emerald)
- Warning: `#F59E0B` (Amber)
- Background: `#0F172A` (Slate 900)
- Card Background: `#1E293B` (Slate 800)
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`
- Agent Node Colors:
  - Sterling: `#F59E0B`
  - Ishtar: `#8B5CF6`
  - Delver: `#EF4444`
  - Squire: `#3B82F6`
  - Felicity: `#EC4899`
  - Prometheus: `#F97316`
  - Cisco: `#06B6D4`
  - THEMIS: `#84CC16`

## Acceptance Criteria
1. Agent interaction matrix accurately reflects message counts
2. Pipeline visualization updates as items progress through stages
3. Pattern confidence scores are mathematically correct
4. Network graph shows real-time agent activity
5. Collaboration trends chart displays historical data correctly
6. Synthesis reports are exportable
7. All nine agents are represented in collaboration metrics
8. Performance: Dashboard renders 10,000+ events without lag
9. Mobile-responsive with horizontal scroll for matrix
10. Filter persistence across page refreshes
