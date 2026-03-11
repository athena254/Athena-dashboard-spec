// Athena Live Dashboard Data Refresh - ENHANCED
// Adds system health metrics to the dashboard data

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, '..', 'data', 'data.json');

// Helper to get system stats
function getSystemStats() {
  try {
    const free = execSync('free -m').toString();
    const lines = free.trim().split('\n');
    const memLine = lines[1].split(/\s+/);
    const swapLine = lines[2].split(/\s+/);
    
    return {
      ram: {
        total: parseInt(memLine[1]),
        used: parseInt(memLine[2]),
        percent: Math.round((parseInt(memLine[2]) / parseInt(memLine[1])) * 100)
      },
      swap: {
        total: parseInt(swapLine[1]),
        used: parseInt(swapLine[2]),
        percent: Math.round((parseInt(swapLine[2]) / parseInt(swapLine[1])) * 100)
      }
    };
  } catch (e) {
    return { ram: { total: 0, used: 0, percent: 0 }, swap: { total: 0, used: 0, percent: 0 } };
  }
}

function getDiskUsage() {
  try {
    const df = execSync('df -h /').toString();
    const line = df.trim().split('\n')[1].split(/\s+/);
    return { percent: parseInt(line[4].replace('%', '')), used: line[2], total: line[1] };
  } catch (e) {
    return { percent: 0, used: '0', total: '0' };
  }
}

function getUptime() {
  try {
    const uptime = execSync('cat /proc/uptime').toString();
    const seconds = Math.floor(parseFloat(uptime.split(' ')[0]));
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return { hours, mins, formatted: `${hours}h ${mins}m` };
  } catch (e) {
    return { hours: 0, mins: 0, formatted: 'unknown' };
  }
}

function getLoadAverage() {
  try {
    const avg = execSync('cat /proc/loadavg').toString().split(' ');
    return { '1m': parseFloat(avg[0]), '5m': parseFloat(avg[1]), '15m': parseFloat(avg[2]) };
  } catch (e) {
    return { '1m': 0, '5m': 0, '15m': 0 };
  }
}

function getGatewayStatus() {
  try {
    const status = execSync('openclaw gateway status 2>/dev/null || echo "stopped"').toString();
    return status.includes('running') ? 'running' : 'stopped';
  } catch (e) {
    return 'unknown';
  }
}

// Default data structure - ENHANCED
const defaultData = {
  lastUpdated: new Date().toISOString(),
  pendingBids: 10,
  activeGigs: 3,
  skillsTracked: 25,
  agents: 9,
  status: 'operational',
  system: {
    health: 'healthy',
    score: 85
  }
};

async function refreshData() {
  console.log('🔄 Refreshing Athena Live data (ENHANCED)...');
  
  try {
    // Load current data
    let data = defaultData;
    
    // Try to read existing data
    try {
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        data = { ...defaultData, ...JSON.parse(fileContent) };
      }
    } catch (e) {
      // Use defaults
    }
    
    // Update timestamp
    data.lastUpdated = new Date().toISOString();
    
    // Get system stats
    const sysStats = getSystemStats();
    const disk = getDiskUsage();
    const uptime = getUptime();
    const load = getLoadAverage();
    const gateway = getGatewayStatus();
    
    // Calculate health score
    let healthScore = 100;
    if (sysStats.swap.percent >= 95) healthScore -= 20;
    else if (sysStats.swap.percent >= 85) healthScore -= 10;
    if (sysStats.ram.percent >= 90) healthScore -= 15;
    else if (sysStats.ram.percent >= 80) healthScore -= 5;
    if (disk.percent >= 90) healthScore -= 10;
    else if (disk.percent >= 80) healthScore -= 5;
    healthScore = Math.max(0, healthScore);
    
    // Determine health status
    let healthStatus = 'healthy';
    if (healthScore < 50) healthStatus = 'critical';
    else if (healthScore < 70) healthStatus = 'warning';
    else if (healthScore < 90) healthStatus = 'degraded';
    
    // Update system info
    data.system = {
      health: healthStatus,
      score: healthScore,
      memory: sysStats.ram,
      swap: sysStats.swap,
      disk: disk,
      uptime: uptime,
      load: load,
      gateway: gateway
    };
    
    // Try to fetch from Beelancer API (if credentials exist)
    try {
      const credsPath = '/root/.openclaw/credentials/beelancer/credentials.json';
      if (fs.existsSync(credsPath)) {
        const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
        const apiKey = creds.api_key;
        
        if (apiKey) {
          // Check pending bids
          const bidsRes = await fetch('https://beelancer.ai/api/bees/bids?status=pending', {
            headers: { 'Authorization': `Bearer ${apiKey}` }
          });
          
          if (bidsRes.ok) {
            const bidsData = await bidsRes.json();
            data.pendingBids = bidsData.length || 0;
          }
          
          // Check active assignments
          const assignRes = await fetch('https://beelancer.ai/api/bees/assignments', {
            headers: { 'Authorization': `Bearer ${apiKey}` }
          });
          
          if (assignRes.ok) {
            const assignData = await assignRes.json();
            data.activeGigs = assignData.filter(a => a.status === 'active').length || 0;
          }
        }
      }
    } catch (e) {
      // Silently continue if API fails
      console.log('⚠️ Beelancer API unavailable, using cached/system data');
    }
    
    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write updated data
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    
    console.log(`✅ Data refreshed:`);
    console.log(`   Bids: ${data.pendingBids} pending, ${data.activeGigs} active`);
    console.log(`   Health: ${data.system.health} (${data.system.score}/100)`);
    console.log(`   RAM: ${data.system.memory.percent}%, Swap: ${data.system.swap.percent}%`);
    
  } catch (error) {
    console.error('❌ Error refreshing data:', error.message);
    process.exit(1);
  }
}

refreshData();
