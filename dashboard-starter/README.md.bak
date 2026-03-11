# Athena Live Dashboard - System Documentation

## Overview

Athena Live is a real-time dashboard for monitoring and interacting with the Athena multi-agent system. It provides visibility into agent activities, task queues, revenue tracking, and system health.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Athena Live Dashboard                       │
├─────────────────────────────────────────────────────────────────┤
│  index.html          │  Main dashboard with agent cards         │
│  task-creation.html  │  Task creation form                      │
│  queue.html          │  Detailed queue view                      │
│  *-mission.html      │  Agent-specific mission pages             │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      JavaScript Modules                          │
├─────────────────────────────────────────────────────────────────┤
│  agent-modal.js      │  Agent detail modal system               │
│  realtime-updates.js │  Simulated real-time updates             │
│  notifications.js    │  Toast notification system               │
│  websocket-client.js │  WebSocket client for live updates       │
│  queue-websocket.js  │  Queue-specific WebSocket handling       │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Services                            │
├─────────────────────────────────────────────────────────────────┤
│  dashboard_websocket.py │  WebSocket server (port 8765)         │
│  create-task.js/.php    │  Task creation API                     │
│  queue_manager.py       │  Task queue management                 │
│  orchestration_rules.py │  Agent coordination rules              │
└─────────────────────────────────────────────────────────────────┘
```

## Agents

| Agent | Role | Color | Specialization |
|-------|------|-------|----------------|
| Athena | Primary Orchestration | 🟣 #6366f1 | Task routing, coordination |
| Sterling | Finance & Beelancer | 🟢 #10b981 | Auto-bidding, revenue |
| Ishtar | Research & PAI | 🟣 #8b5cf6 | Deep research, architecture |
| THEMIS | Governance | 🩷 #ec4899 | Policy enforcement, compliance |
| Felicity | Development | 🔵 #3b82f6 | Code, refactoring |
| Prometheus | Automation | 🟠 #f97316 | Workflows, pipelines |
| Nexus | Learning | 🩵 #14b8a6 | Knowledge, ML |
| Delver | Research | 🟡 #f59e0b | Analysis, reports |
| Squire | Support | ⚪ #64748b | User assistance |
| Cisco | Security | 🔴 #ef4444 | Monitoring, safety |

## Features

### 1. Agent Dashboard Cards
- Real-time status indicators
- Click to view detailed modal
- Color-coded by agent type
- Tooltips for quick info

### 2. Task Creation UI
- Full form with all task attributes
- Agent selection grid
- Priority levels (Low/Medium/High/Urgent)
- Category and tag selection
- LocalStorage + API fallback

### 3. Real-time Updates
- WebSocket server for live data
- Fallback simulation mode
- Agent activity updates
- Queue status changes
- Revenue tracking

### 4. Notification System
- Toast notifications
- Auto-dismiss
- Type-based styling
- Event-driven

### 5. Agent Detail Modals
- Comprehensive agent info
- Statistics display
- Capabilities list
- Special abilities
- Quick actions (assign task, view mission)

## API Endpoints

### WebSocket (ws://localhost:8765)
Message types:
- `agent_update` - Agent status changes
- `queue_update` - Queue statistics
- `revenue_update` - Revenue tracking
- `notification` - User notifications
- `queue_data` - Full queue data

### HTTP API
- `POST /api/create-task` - Create new task
- `GET /api/tasks` - List all tasks
- `GET /health` - Health check

## File Structure

```
athena-live/
├── index.html              # Main dashboard
├── task-creation.html      # Task creation form
├── queue.html              # Queue management view
├── styles.css              # Global styles
├── js/
│   ├── agent-modal.js      # Agent detail modals
│   ├── realtime-updates.js # Real-time simulation
│   ├── notifications.js    # Toast notifications
│   ├── websocket-client.js # WebSocket client
│   └── queue-websocket.js  # Queue WebSocket
├── api/
│   ├── create-task.js      # Node.js API
│   ├── create-task.php     # PHP API fallback
│   └── queue-stats.json    # Queue statistics
└── README.md               # This file
```

## Custom Events

The dashboard uses custom events for loose coupling:

```javascript
// Agent updates
window.addEventListener('athena:agent-update', (e) => {
  console.log('Agent update:', e.detail);
});

// Queue updates
window.addEventListener('athena:queue-update', (e) => {
  console.log('Queue update:', e.detail);
});

// Notifications
window.addEventListener('athena:notification', (e) => {
  console.log('Notification:', e.detail);
});

// WebSocket state
window.addEventListener('athena:ws:connected', () => {
  console.log('WebSocket connected');
});
```

## Development

### Starting the WebSocket Server
```bash
cd scripts
python dashboard_websocket.py
```

### Starting the Task API
```bash
cd athena-live/api
node create-task.js
```

### Accessing the Dashboard
Open `athena-live/index.html` in a browser, or serve via:
```bash
python -m http.server 8080
# Then open http://localhost:8080/athena-live/
```

## Configuration

### WebSocket (js/websocket-client.js)
```javascript
const CONFIG = {
  url: 'ws://localhost:8765',
  reconnectInterval: 5000,
  maxReconnectAttempts: 10
};
```

### Real-time Updates (js/realtime-updates.js)
```javascript
const CONFIG = {
  updateInterval: 30000, // 30 seconds
  enableNotifications: true
};
```

## Styling

The dashboard uses CSS custom properties for theming:

```css
:root {
  --primary: #6366f1;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --bg-base: #0c0f1a;
  --bg-surface: #111827;
  --bg-elevated: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
}
```

## Future Enhancements

1. **Authentication** - User login and session management
2. **Analytics Dashboard** - Historical charts and trends
3. **Voice Commands** - Voice-activated dashboard control
4. **Mobile App** - React Native companion app
5. **Plugin System** - Extensible dashboard widgets

---

*Generated by Ishtar Night Cycle Research - 2026-02-27*
