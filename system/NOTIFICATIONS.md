# NOTIFICATIONS.md — Notification Behavior Spec

## Core Rule
The UI is silent unless a human needs to act.
Notifications are not updates. They are calls to action.

## What Triggers a Notification

### 🔴 Critical (AlertBanner — top of screen, cannot be dismissed without action)
- Agent failed to respawn after 3 attempts
- Disk below 10%
- RAM critically exhausted
- VPS unexpected reboot
- Security breach detected
- Production deployment failed
- SSL certificate expired

### 🟡 Human Needed (sidebar badge + channel item flagged)
- A task could not be completed without a decision
- Conflicting instructions an agent cannot resolve
- Action requires money, external communication, or production change
- Agent self-audit returned unfixable issues
- Dependency down for more than 10 minutes

### ✅ Output Ready (no notification)
- Completed deliverables surface in agent's page and apps gallery

## What Never Triggers a Notification
- Agent came online/offline
- Task started/completed (unless failed)
- Routine self-audit passed
- Normal resource levels
- Heartbeat confirmations
- Boot completed successfully

## DM / External Alert Escalation
Only when:
- Critical issue unresolved for 5+ minutes
- Production is down
- Data is at risk
- Human decision needed and unresolved for 30+ minutes
