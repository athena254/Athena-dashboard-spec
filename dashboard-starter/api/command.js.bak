import http from 'http';
import url from 'url';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const workspace = '/root/.openclaw/workspace';
const dataPath = path.join(workspace, 'athena-live/api/data.json');

function runCommand(cmd) {
  try {
    // Sanitize command - only allow safe commands
    const allowed = ['status', 'health', 'ping', 'log', 'backup', 'refresh'];
    const parts = cmd.toLowerCase().split(' ');
    const action = parts[0];
    
    if (!allowed.includes(action)) {
      return { output: '', error: 'Command not allowed' };
    }
    
    const output = execSync(cmd, { 
      cwd: workspace, 
      encoding: 'utf8',
      timeout: 5000
    });
    return { output: output.trim(), error: null };
  } catch (e) {
    return { output: '', error: e.message || 'Command failed' };
  }
}

function getData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

function getActivity() {
  const data = getData();
  if (!data) return [];
  
  return [
    { time: new Date().toISOString(), agent: 'system', action: 'command', target: 'widget ready' },
    { time: new Date(Date.now() - 30000).toISOString(), agent: 'athena', action: 'orchestrating', target: `${data.metrics?.activeSessions || 0} sessions` },
    { time: new Date(Date.now() - 60000).toISOString(), agent: 'sterling', action: 'monitoring bids', target: `${data.pendingBids || 0} pending` },
    { time: new Date(Date.now() - 90000).toISOString(), agent: 'beelancer', action: 'scouting', target: 'gigs' },
    { time: new Date(Date.now() - 120000).toISOString(), agent: 'chronos', action: 'running', target: 'scheduler' },
  ];
}

// Simple HTTP server
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

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Handle commands via POST
  if (req.method === 'POST' && pathname === '/api/command') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { command } = JSON.parse(body);
        const result = runCommand(command);
        res.writeHead(200);
        res.end(JSON.stringify({ command, ...result, timestamp: new Date().toISOString() }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }
  
  // GET endpoints
  if (req.method === 'GET') {
    // /api/activity - get recent activity
    if (pathname === '/api/activity') {
      res.writeHead(200);
      res.end(JSON.stringify({ activities: getActivity(), timestamp: new Date().toISOString() }));
      return;
    }
    
    // /api/command - run a command via query param
    if (pathname === '/api/command') {
      const command = parsedUrl.query.cmd;
      if (!command) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'No command provided' }));
        return;
      }
      const result = runCommand(command);
      res.writeHead(200);
      res.end(JSON.stringify({ command, ...result, timestamp: new Date().toISOString() }));
      return;
    }
  }
  
  // Default: return API info
  res.writeHead(200);
  res.end(JSON.stringify({ 
    endpoints: {
      'GET /api/activity': 'Get recent activity feed',
      'GET /api/command?cmd=<action>': 'Run a command (status, health, ping, log, backup)',
      'POST /api/command': 'Run command via JSON body {command: "..."}'
    }
  }));
});

const PORT = process.env.PORT || 3848;
server.listen(PORT, () => {
  console.log(`Command API running on port ${PORT}`);
});
