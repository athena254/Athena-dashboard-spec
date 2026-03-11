# SYSTEM CORRECTION PROMPT — Agent Roster, Divisions & Future Expansion

## PURPOSE
This prompt supersedes prior references to agents, divisions, or team structure.

## CANONICAL AGENT ROSTER & DIVISIONS

| Division | Agents | Shared Tools |
|--------------------|-------------------------------------------------|------------------------------------------------------------|
| 💻 Engineering | Felicity, Cisco, Nexus, Prometheus | agent-browser, code-reviewer, git-helper, react, vercel |
| 🔍 Research | Vesper, Scylla, Sentinel | agent-browser, code-reviewer |
| 📢 Marketing | Talia, Tyche, Zephyr, Hermes, Calliope | agent-browser, moltbook, google-calendar |
| 🛠 Operations | Basil, Atlas, Cronos | agent-browser, git-helper, dashboard, calendar |
| 🧪 QA | Chiron, Argus, Tycho | agent-browser, code-reviewer |
| 🏗 Infrastructure | Hyperion, Talos, Iris, Mnemosyne, Clio | agent-browser, dashboard, git, memory |
| 💰 Finance | Sterling | agent-browser, dashboard |
| ⚖️ Governance | Themis | agent-browser, themis, code-reviewer |
| 📱 Special | Zoey | agent-browser, code-reviewer, git, memory |

## WHAT CHANGED

- Delver → replaced by Vesper and Scylla (Research)
- Butler → replaced by Basil (Operations)
- Squire → Operations handles freelance
- THEMIS → Themis (Governance)
- Sentinel → moved to Research division
- Atlas → moved to Operations division
- Hermes → moved to Marketing division
- Many new agents added: Calliope, Talia, Tyche, Zephyr, Chiron, Argus, Tycho, Hyperion, Talos, Iris, Mnemosyne, Clio, Cronos, Vesper, Scylla, Zoey

## TOOL INHERITANCE RULES

Each agent inherits their division's shared toolset.
Tools are assigned at division level and flow down.

## FUTURE AGENT PROTOCOL

When a new agent is created:
- Assigned to an existing division OR new division created
- Inherits that division's shared tools automatically
- Appears in: dashboard grid, chat list, divisions page, stats tracking
- Runs first self-audit before accepting tasks

When a new division is created:
- Appears automatically in Divisions page
- Assigned tool list
- All interfaces update without code changes

## THE RULE
Nothing in the system may be hardcoded to a specific agent name or division name.
All agent and division references are dynamic, loaded from configuration.
