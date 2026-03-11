// Add queue stats to dashboard data
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'data.json');
const QUEUE_FILE = path.join(__dirname, 'queue-stats.json');

try {
  let data = { system: {} };
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  
  if (fs.existsSync(QUEUE_FILE)) {
    const queue = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf8'));
    data.queue = queue.summary;
    data.agents = queue.agentLoad;
  }
  
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  console.log('✅ Added queue stats to dashboard');
} catch(e) {
  console.log('⚠️ Queue stats not added:', e.message);
}
