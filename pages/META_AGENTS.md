# META_AGENTS.md — Meta Agent Creation Page Spec

Route: /meta-agents

## What a Meta Agent Actually Is

A meta agent is an external AI system or autonomous agent from a third-party repository that has been wrapped, integrated, and made callable as a skill by Athena.

They are contractors with a specific specialization. They live outside. They get called in when needed.

## THE DISTINCTION

| | Native Agent | Meta Agent (External Skill) |
|---|---|---|
| Lives in | VPS, Athena's network | Own repo/runtime |
| Has Discord channel | Yes | No |
| Has personal dashboard page | Yes | No — skill card only |
| Monitored by Sentinel | Yes | No |
| Appears in agent grid | Yes | No — appears in Skills Library |

## META AGENTS PAGE Layout

┌─────────────────────────────────────────────────────────────┐
│ "Meta Agents — External Skills" │
│ [Add New Skill] [Browse Skills Library] │
├─────────────────────────────────────────────────────────────┤
│ WRAP A NEW EXTERNAL AGENT AS A SKILL │
│ GitHub repo URL: [ ] [Analyze & Wrap] │
├─────────────────────────────────────────────────────────────┤
│ SKILLS LIBRARY │
│ (all wrapped external agents as skill cards) │
├─────────────────────────────────────────────────────────────┤
│ INVOCATION LOG │
│ (which skills were called, by which agent, with result) │
└─────────────────────────────────────────────────────────────┘

## SKILL CARD
- Skill name + icon
- Source repo link
- Capability summary
- Invocation method badge (CLI / API / Subprocess)
- Permission level
- Status: Available / Pending Fix / Broken / Archived
- Last invoked, total invocations, success rate

## WRAPPING FLOW
1. Repo Input → 2. Automated Analysis → 3. Skill Wrapper Generation → 4. Permission Assignment → 5. Test Invocation → 6. Skill Live
