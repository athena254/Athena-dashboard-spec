# OPEN_QUESTIONS.md — Unresolved Items

## Questions Requiring User Decision

### Question 1: Discord Channel Mapping
- **Issue**: Cannot find Discord channel IDs for each agent
- **Question**: Should agents be contacted via Discord channels or internal messaging?
- **Impact**: Affects how "Chat with agent" feature works

### Question 2: External API Access
- **Issue**: Dashboard needs real-time data from OpenClaw
- **Question**: Should dashboard connect directly to OpenClaw WebSocket or use REST API?
- **Impact**: Technical architecture decision

### Question 3: Authentication Requirements
- **Issue**: No auth spec provided
- **Question**: What authentication should the dashboard have? (Simple password? OAuth? None?)
- **Impact**: Entire security model

### Question 4: Hosting Location
- **Issue**: Dashboard needs to run somewhere
- **Question**: Should dashboard be hosted on same VPS or deployed separately (Vercel, etc.)?
- **Impact**: Deployment process

---

## Notes

- This handoff package is ready for developer once questions are answered
- Developer can start building UI components immediately using specs
- Data layer questions (WebSocket/API) can be prototyped with mock data
