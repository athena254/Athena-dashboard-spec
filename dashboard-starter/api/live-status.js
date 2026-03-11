// Athena Live - Real Gateway Status API
// Fetches actual data from OpenClaw Gateway
// Run with: node live-status.js

const { execSync } = require('child_process');

function getGatewayStatus() {
    try {
        const result = execSync('openclaw gateway call status --json 2>&1', {
            encoding: 'utf8',
            timeout: 10000
        });
        return JSON.parse(result);
    } catch (e) {
        return { error: 'Failed to fetch gateway status', details: e.message };
    }
}

function getGatewayHealth() {
    try {
        const result = execSync('openclaw gateway health 2>&1', {
            encoding: 'utf8',
            timeout: 5000
        });
        return result.trim();
    } catch (e) {
        return 'Error: ' + e.message;
    }
}

function calculateSessionStats(sessions) {
    if (!sessions || !sessions.byAgent) {
        return { totalSessions: 0, activeAgents: 0, totalTokens: 0, byAgent: [] };
    }
    
    let totalSessions = 0;
    let activeAgents = 0;
    let totalTokens = 0;
    const agentActivity = [];
    
    const now = Date.now();
    const activeThreshold = 5 * 60 * 1000; // 5 minutes
    
    for (const agent of sessions.byAgent) {
        totalSessions += agent.count;
        
        if (agent.recent && agent.recent.length > 0) {
            const latestSession = agent.recent[0];
            const age = now - latestSession.updatedAt;
            const isActive = age < activeThreshold;
            
            if (isActive) activeAgents++;
            
            let inputTokens = 0;
            let outputTokens = 0;
            
            for (const s of agent.recent) {
                if (s.inputTokens) inputTokens += s.inputTokens;
                if (s.outputTokens) outputTokens += s.outputTokens;
            }
            
            totalTokens += inputTokens + outputTokens;
            
            agentActivity.push({
                agentId: agent.agentId,
                sessions: agent.count,
                latestAge: Math.round(age / 1000),
                isActive: isActive,
                inputTokens,
                outputTokens,
                model: latestSession.model || 'unknown'
            });
        }
    }
    
    // Sort by activity (most recent first)
    agentActivity.sort((a, b) => a.latestAge - b.latestAge);
    
    return {
        totalSessions,
        activeAgents,
        totalTokens,
        byAgent: agentActivity
    };
}

// Main execution
const status = getGatewayStatus();
const health = getGatewayHealth();

let response = {
    timestamp: new Date().toISOString(),
    source: 'openclaw gateway',
    health: health
};

if (status.error) {
    response.status = 'error';
    response.error = status.error;
} else {
    response.status = 'operational';
    response.channels = status.channelSummary || [];
    response.heartbeat = status.heartbeat || {};
    response.queuedEvents = status.queuedSystemEvents || [];
    
    const stats = calculateSessionStats(status.sessions);
    response.sessions = {
        total: stats.totalSessions,
        activeAgents: stats.activeAgents,
        totalTokens: stats.totalTokens,
        byAgent: stats.byAgent
    };
}

console.log(JSON.stringify(response, null, 2));
