# APPS.md — Apps Gallery Page Spec

Route: /apps and /apps/[app_id]

## Purpose
Every app the system builds lives here.

## /apps Layout

┌─────────────────────────────────────────────────────┐
│ HEADER: "Apps" + Build count + "Request New" btn │
├─────────────────────────────────────────────────────┤
│ FILTER BAR: All / Running / Archived / By Agent │
├─────────────────────────────────────────────────────┤
│ APP GRID │
│ [App Card] [App Card] [App Card] [App Card] │
└─────────────────────────────────────────────────────┘

### AppCard Content
- App name (prominent)
- Short description (1 line)
- Built by: agent emoji(s)
- Build date + last updated
- Status: Running / Archived / In Progress
- Tech stack tags
- Launch button
- Actions: Archive / Delete / Rebuild / View Source

### Filter Bar
- All / Running / Archived / In Progress
- Filter by agent who built it
- Sort by: newest / oldest / most used / alphabetical

## /apps/[app_id] — Individual App Page
- Full description
- Build log (collapsible)
- Version history
- Usage stats
- Rebuild button
- Live preview (iframe embed)
- Source / output files for download
- Notes field

## Real-Time Behavior
- New apps appear automatically when app.built WebSocket event fires
- "In Progress" apps show live build log
- Status updates in real time
