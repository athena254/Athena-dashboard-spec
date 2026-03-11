#!/usr/bin/env node
/**
 * Agent Performance Snapshot
 * Quick status check for all Athena agents
 * Usage: node agent-snapshot.js [--json] [--verbose]
 */

import fs from 'fs';
import path from 'path';

const DATA_PATH = '/root/.openclaw/workspace/athena-live/api/data.json';

function loadData() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

function formatUptime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds/60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds/3600)}h`;
  return `${Math.floor(seconds/86400)}d`;
}

function getStatusColor(status) {
  switch(status) {
    case 'active': return '🟢';
    case 'idle': return '🟡';
    case 'error': return '🔴';
    default: return '⚪';
  }
}

function printSnapshot(json = false, verbose = false) {
  const data = loadData();
  
  if (!data) {
    console.error('❌ Failed to load agent data');
    process.exit(1);
  }

  const output = {
    timestamp: new Date().toISOString(),
    system: {
      status: data.status,
      pendingBids: data.pendingBids,
      activeGigs: data.activeGigs,
      skillsTracked: data.skillsTracked
    },
    metrics: data.metrics,
    agents: data.agents.map(agent => ({
      name: agent.name,
      role: agent.role,
      status: agent.status,
      tasks: agent.tasks,
      success: agent.success,
      model: agent.model
    }))
  };

  if (json) {
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  // Human-readable format
  console.log('\n🏛️  ATHENA AGENT SNAPSHOT');
  console.log('='.repeat(50));
  console.log(`📊 System: ${data.status.toUpperCase()} | 🐝 ${data.pendingBids} pending bids | 💼 ${data.activeGigs} active gigs`);
  console.log(`⚡ Sessions: ${data.metrics?.activeSessions || 'N/A'} | 📈 Rate: ${data.metrics?.tokenRate || 'N/A'}/s | 🔄 Uptime: ${data.metrics?.gatewayUptime || 'N/A'}`);
  console.log('─'.repeat(50));

  const activeAgents = data.agents.filter(a => a.status === 'active');
  const idleAgents = data.agents.filter(a => a.status === 'idle');
  
  console.log(`\n🟢 ACTIVE (${activeAgents.length}):`);
  activeAgents.forEach(a => {
    console.log(`   ${getStatusColor('active')} ${a.name} - ${a.role} (${a.tasks} tasks, ${a.success} success)`);
    if (verbose) console.log(`      └─ Model: ${a.model}`);
  });

  console.log(`\n🟡 IDLE (${idleAgents.length}):`);
  idleAgents.forEach(a => {
    console.log(`   ${getStatusColor('idle')} ${a.name} - ${a.role}`);
  });

  // Summary stats
  const totalTasks = data.agents.reduce((sum, a) => sum + a.tasks, 0);
  const avgSuccess = (data.agents.reduce((sum, a) => sum + parseFloat(a.success), 0) / data.agents.length).toFixed(1);
  
  console.log('\n' + '─'.repeat(50));
  console.log(`📈 Total Tasks: ${totalTasks} | Avg Success: ${avgSuccess}% | Last Updated: ${new Date(data.lastUpdated).toLocaleTimeString()}`);
  console.log('');
}

// Parse args
const args = process.argv.slice(2);
const jsonMode = args.includes('--json') || args.includes('-j');
const verbose = args.includes('--verbose') || args.includes('-v');
const help = args.includes('--help') || args.includes('-h');

if (help) {
  console.log(`
🏛️  Agent Performance Snapshot

Usage: node agent-snapshot.js [options]

Options:
  --json, -j     Output as JSON
  --verbose, -v  Show detailed agent info
  --help, -h     Show this help message

Examples:
  node agent-snapshot.js              # Quick status overview
  node agent-snapshot.js --json        # JSON output for scripts
  node agent-snapshot.js --verbose     # Detailed view
  `);
  process.exit(0);
}

printSnapshot(jsonMode, verbose);
