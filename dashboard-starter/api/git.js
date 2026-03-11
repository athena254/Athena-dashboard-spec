import http from 'http';
import url from 'url';
import { execSync } from 'child_process';

const workspace = '/root/.openclaw/workspace';
const API_KEY = process.env.API_KEY || 'dev-key-change-in-production';

// Whitelist of safe git commands only
const SAFE_GIT_COMMANDS = [
  'status', 'log', 'branch', 'diff', 'show', 'ls-files', 
  'rev-list', 'rev-parse', 'remote', 'tag', 'describe'
];

// Validate API key
function validateRequest(req) {
  const key = req.headers['x-api-key'] || 
              new URL(req.url, 'http://localhost').searchParams.get('key');
  return key === API_KEY;
}

function runGit(cmd) {
  try {
    const parts = cmd.trim().split(' ');
    
    // Must start with 'git'
    if (parts[0] !== 'git') {
      return { output: '', error: 'Invalid command prefix - must start with git' };
    }
    
    const subCmd = parts[1];
    
    // Check if the git subcommand is in our whitelist
    if (!subCmd || !SAFE_GIT_COMMANDS.includes(subCmd)) {
      return { output: '', error: `Git command '${subCmd || 'unknown'}' not allowed - only read-only operations permitted` };
    }
    
    const output = execSync(cmd, { 
      cwd: workspace, 
      encoding: 'utf8',
      timeout: 10000
    });
    return { output: output.trim(), error: null };
  } catch (e) {
    return { output: '', error: e.message || e.stderr || 'Command failed' };
  }
}

function getBranch() {
  const result = runGit('git status --porcelain');
  return result.error ? 'main' : 'git branch --show-current';
}

function getStatus() {
  const result = runGit('git status --porcelain');
  const lines = result.output.split('\n').filter(l => l.trim());
  const files = lines.map(line => ({
    status: line.substring(0, 2).trim(),
    file: line.substring(3)
  }));
  
  return {
    branch: getBranch(),
    files,
    clean: files.length === 0
  };
}

function getLog(limit = 10) {
  const result = runGit(`git log --oneline -n ${limit}`);
  if (result.error) {
    return { error: result.error };
  }
  
  const commits = result.output.split('\n')
    .filter(l => l.trim())
    .map(line => {
      const match = line.match(/^([a-f0-9]+)\s+(.+)$/);
      if (match) {
        return { hash: match[1], message: match[2] };
      }
      return { hash: '', message: line };
    });
  
  return { commits };
}

function getBranches() {
  const result = runGit('git branch -a');
  if (result.error) {
    return { error: result.error };
  }
  
  const branches = result.output.split('\n')
    .map(line => {
      const name = line.replace(/^\*?\s*/, '').trim();
      return { name, current: line.startsWith('*') };
    })
    .filter(b => b.name);
  
  return { branches };
}

function getStats() {
  const totalCommits = runGit('git rev-list --count HEAD').output || '0';
  const branches = runGit('git branch -a').output.split('\n').filter(l => l.trim()).length;
  const trackedFiles = runGit('git ls-files').output.split('\n').filter(l => l.trim()).length;
  
  return {
    totalCommits: parseInt(totalCommits) || 0,
    branches,
    trackedFiles
  };
}

// Gateway status functions
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
  const activeThreshold = 5 * 60 * 1000;
  
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
  
  agentActivity.sort((a, b) => a.latestAge - b.latestAge);
  
  return { totalSessions, activeAgents, totalTokens, byAgent: agentActivity };
}

function getLiveStatus() {
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
  
  return response;
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Check API key for POST requests
  if (req.method === 'POST' && !validateRequest(req)) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: 'Unauthorized - valid API key required' }));
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle POST for git commands
  if (req.method === 'POST' && pathname === '/api/git') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { command } = JSON.parse(body);
        const result = runGit(command);
        res.writeHead(200);
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }
  
  // Handle live-status endpoint
  if (pathname === '/api/live-status' || pathname === '/live-status') {
    res.writeHead(200);
    res.end(JSON.stringify(getLiveStatus()));
    return;
  }
  
  // Route GET requests
  const action = parsedUrl.query.action;
  const limit = parseInt(parsedUrl.query.limit) || 10;
  
  let data;
  switch (action) {
    case 'status':
      data = getStatus();
      break;
    case 'log':
      data = getLog(limit);
      break;
    case 'branches':
      data = getBranches();
      break;
    case 'stats':
      data = getStats();
      break;
    case 'live-status':
      data = getLiveStatus();
      break;
    default:
      data = { error: 'Unknown action', available: ['status', 'log', 'branches', 'stats', 'live-status'], endpoints: ['/api/live-status', '/live-status'] };
  }
  
  res.writeHead(200);
  res.end(JSON.stringify(data));
});

const PORT = process.env.PORT || 3847;
server.listen(PORT, () => {
  console.log(`Git API running on port ${PORT}`);
});
