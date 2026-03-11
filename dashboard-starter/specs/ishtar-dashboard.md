# Ishtar Oracle Dashboard - Specification

## Overview
The Ishtar Oracle Dashboard visualizes research activities, knowledge synthesis, and progress toward the Personal AI (PAI) architecture. Ishtar focuses on deep research and knowledge graph construction without direct bidding.

## Features

### 1. Research Topics Completed

**Metrics Cards:**
- Total Topics Researched
- Topics This Week
- Active Research Threads
- Average Research Depth (hours spent per topic)

**Research Log Table:**
- Columns: Topic, Status (Complete/In Progress/Queued), Started, Duration, Key Findings Count, Actions
- Expandable rows showing summary of findings
- Filter by status, date range, category

**Research Queue:**
- Priority-sorted list of pending research items
- Add new research topic form
- Drag-to-reorder capability

### 2. Insights Generated

**Insights Feed:**
- Chronological list of research insights
- Each insight card: Title, Source Topic, Key Takeaway, Timestamp, Relevance Score
- Tag system for categorization (e.g., "market-trend", "technical", "competitor")
- Copy/Share insight buttons

**Insight Analytics:**
- Insights by category pie chart
- Insight volume over time (line chart)
- Most productive research sources (bar chart)
- "Aha moment" frequency indicator

**Saved Insights Collection:**
- User-curated collection of important insights
- Favorites system (star toggle)
- Export to markdown/JSON

### 3. Knowledge Graph Visualization

**Interactive Graph View:**
- Nodes: Concepts, Topics, Insights, Agents
- Edges: Relationships between nodes (e.g., "related_to", "influenced_by", "used_by")
- Color-coded by node type
- Zoom, pan, and click-to-expand interactions

**Graph Controls:**
- Filter by node type (toggle buttons)
- Layout algorithms: Force-directed (default), Hierarchical, Radial
- Search nodes by name
- Cluster by category

**Graph Stats:**
- Total Nodes
- Total Connections
- Graph Density Score
- Most Connected Concepts (top 5)

**Detail Panel (on node click):**
- Node properties and metadata
- Connected nodes list
- Timeline of additions
- Edit/Delete actions

### 4. PAI Architecture Progress

**Architecture Overview:**
- Visual diagram showing PAI component status
- Components: Memory System, Learning Engine, Context Manager, Knowledge Base, Agent Interface
- Status indicators: Not Started / In Progress / Complete / Optimizing

**Progress Metrics:**
- Overall Completion Percentage (progress bar)
- Components Completed (X of Y)
- Last Component Completed (timestamp)
- Next Milestone target

**Milestone Tracker:**
- Timeline view of PAI development phases
- Each milestone: Name, Description, Target Date, Status
- Current phase highlighted
- Completed phases with checkmarks

**Technical Debt / TODO:**
- List of known issues blocking completion
- Priority-sorted
- Links to related research/insights
- Estimated effort per item

**Learning Pipeline:**
- Data sources being processed
- Training runs completed
- Model accuracy trends
- Integration test results

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ISHTAR ORACLE                                              │
│  Research & PAI Architecture              [Knowledge Graph]│
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Researched│ │ Insights │ │Graph Nodes│ │ PAI %   │        │
│  │  127     │ │   342    │ │   1,247  │ │   67%   │        │
│  │ Topics   │ │Generated │ │  3,891 links│ │Complete │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├─────────────────────────────────────────────────────────────┤
│  [Research Log] [Insights] [Knowledge Graph] [PAI Progress]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    Tab Content Area                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Color Palette
- Primary: `#8B5CF6` (Violet - mystical/oracle theme)
- Secondary: `#1F2937` (Dark gray)
- Accent: `#06B6D4` (Cyan - knowledge/insights)
- Success: `#10B981` (Emerald)
- Background: `#0F172A` (Slate 900)
- Card Background: `#1E293B` (Slate 800)
- Text Primary: `#F8FAFC`
- Text Secondary: `#94A3B8`
- Node Colors:
  - Concepts: `#3B82F6` (Blue)
  - Topics: `#8B5CF6` (Violet)
  - Insights: `#F59E0B` (Amber)
  - Agents: `#EC4899` (Pink)

## Knowledge Graph Data Schema

```typescript
interface GraphNode {
  id: string;
  type: 'concept' | 'topic' | 'insight' | 'agent';
  label: string;
  metadata: Record<string, any>;
  createdAt: Date;
  connections: string[]; // IDs of connected nodes
}

interface GraphEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  relationship: string; // e.g., "related_to", "derived_from"
  weight: number; // 0-1, for visualization
}
```

## Acceptance Criteria
1. Knowledge graph renders smoothly with 1000+ nodes
2. Research log updates in real-time as topics complete
3. Insights are searchable and filterable
4. PAI progress bar accurately reflects component statuses
5. Graph interactions (zoom, pan, click) are responsive
6. Export functionality works for insights and graph data
7. Mobile-responsive with collapsible sections
8. Graph layout persists user preferences
