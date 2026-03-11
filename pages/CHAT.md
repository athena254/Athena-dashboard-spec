# CHAT.md — Chat Interface Page Spec

Routes:
- /chat — Chat hub
- /chat/[agent_id] — Direct session with agent
- /chat/[agent_id]/[thread_id] — Specific threaded conversation

## /chat — Chat Hub Layout

┌──────────────────┬──────────────────────────────────────────┐
│ AGENT LIST │ THREAD PANEL │
│ (left sidebar) │ (main area) │
│ │ │
│ Search bar │ Select an agent or thread to start │
│ │ │
│ [Athena] ● │ │
│ [Delver] ● │ │
│ ... │ │
└──────────────────┴──────────────────────────────────────────┘

## Agent List (Left Sidebar)
- All registered agents listed with emoji + name + status dot
- Unread message count badge per agent
- Search bar filters agents by name or role
- Click agent → opens their thread panel on the right
- Agents sorted by: most recently active first
- Offline agents shown at bottom, dimmed

## /chat/[agent_id] — Agent Chat Session
- Agent header: emoji + name + role + status dot
- Message area: Standard chat bubbles (user right, agent left)
- Input box: Multi-line, send on Enter
- Thread history: Right panel, all past sessions

## /chat/[agent_id]/[thread_id] — Threaded Conversation
- Any message can be replied to as a sub-thread
- Thread depth: unlimited
- Thread summary shown in main timeline

## Chat Features
- Search within conversation
- Jump to date
- Pin messages
- Copy message
- Regenerate response
- Export thread
- React with emoji

## Real-Time Behavior
- New messages stream in as generated
- Agent typing indicator
- If agent goes offline: "Message will be delivered when back online"
