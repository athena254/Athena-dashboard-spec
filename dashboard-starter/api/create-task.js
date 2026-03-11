#!/usr/bin/env node
/**
 * Task Creation API - Node.js Version
 * Standalone API server for task creation
 * Usage: node athena-live/api/create-task.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3333;
const WORKSPACE_ROOT = process.env.OPENCLAW_WORKSPACE || path.join(process.env.HOME, '.openclaw', 'workspace');
const QUEUE_FILE = path.join(WORKSPACE_ROOT, 'memory', 'agent-queue.json');

// Priority mapping
const PRIORITY_MAP = {
    'low': 'LOW',
    'medium': 'MEDIUM',
    'high': 'HIGH',
    'urgent': 'CRITICAL'
};

// Task type mapping
const TYPE_MAP = {
    'development': 'DEVELOPMENT',
    'research': 'RESEARCH',
    'finance': 'FINANCE',
    'communication': 'COMMUNICATION',
    'automation': 'AUTOMATION',
    'security': 'SECURITY',
    'creative': 'CREATIVE',
    'operations': 'OPERATIONS'
};

function generateTaskId() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 15);
    const random = Math.random().toString(36).substring(2, 10);
    return `task_${timestamp}_${random}`;
}

function loadQueue() {
    try {
        if (fs.existsSync(QUEUE_FILE)) {
            const data = fs.readFileSync(QUEUE_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error loading queue:', err.message);
    }
    
    // Return default queue structure
    return {
        version: '1.1',
        updated: new Date().toISOString(),
        tasks: [],
        stats: {
            totalProcessed: 0,
            avgCompletionTimeMs: 0,
            lastProcessedAt: null,
            byPriority: { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 },
            byStatus: { PENDING: 0, ASSIGNED: 0, IN_PROGRESS: 0, COMPLETED: 0, FAILED: 0, CANCELLED: 0 }
        },
        indexes: {
            byStatus: { PENDING: [], ASSIGNED: [], IN_PROGRESS: [], COMPLETED: [], FAILED: [], CANCELLED: [] },
            byAssignee: {},
            byPriority: { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] }
        }
    };
}

function saveQueue(queue) {
    queue.updated = new Date().toISOString();
    fs.mkdirSync(path.dirname(QUEUE_FILE), { recursive: true });
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
}

function createTask(input) {
    const now = new Date().toISOString();
    const priority = PRIORITY_MAP[input.priority] || 'MEDIUM';
    const taskType = TYPE_MAP[input.category] || 'GENERAL';
    const taskId = generateTaskId();
    
    const task = {
        id: taskId,
        type: taskType,
        status: 'PENDING',
        priority: priority,
        created: now,
        deadline: input.dueDate || null,
        assignee: input.agent || 'athena',
        requester: 'dashboard',
        input: {
            title: input.title,
            description: input.description || '',
            category: input.category || '',
            created_from: 'task_creation_ui'
        },
        output: null,
        error: null,
        retryCount: 0,
        maxRetries: 3,
        dependencies: [],
        tags: input.tags ? input.tags.split(',') : [],
        context: {
            source: 'dashboard',
            ui_version: '1.0'
        },
        history: [
            { at: now, event: 'CREATED', by: 'dashboard' }
        ],
        lease: null
    };
    
    return task;
}

function addTaskToQueue(task) {
    const queue = loadQueue();
    
    // Add task
    queue.tasks.push(task);
    
    // Update indexes
    queue.indexes.byStatus.PENDING.push(task.id);
    queue.indexes.byPriority[task.priority].push(task.id);
    
    if (!queue.indexes.byAssignee[task.assignee]) {
        queue.indexes.byAssignee[task.assignee] = [];
    }
    queue.indexes.byAssignee[task.assignee].push(task.id);
    
    // Update stats
    queue.stats.byPriority[task.priority]++;
    queue.stats.byStatus.PENDING++;
    
    // Save
    saveQueue(queue);
    
    return task;
}

// Create HTTP server
const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    
    // Route: POST /api/create-task
    if (req.method === 'POST' && req.url === '/api/create-task') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const input = JSON.parse(body);
                
                if (!input.title) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Task title is required' }));
                    return;
                }
                
                const task = createTask(input);
                addTaskToQueue(task);
                
                console.log(`✓ Task created: ${task.id} → ${task.assignee}`);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    task_id: task.id,
                    message: 'Task created successfully',
                    assigned_to: task.assignee,
                    priority: task.priority
                }));
                
            } catch (err) {
                console.error('Error:', err.message);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        
        return;
    }
    
    // Route: GET /api/tasks
    if (req.method === 'GET' && req.url === '/api/tasks') {
        const queue = loadQueue();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(queue));
        return;
    }
    
    // Route: GET /health
    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
        return;
    }
    
    // 404 for unknown routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`🚀 Task Creation API running on http://localhost:${PORT}`);
    console.log(`   POST /api/create-task - Create a new task`);
    console.log(`   GET  /api/tasks       - List all tasks`);
    console.log(`   GET  /health          - Health check`);
    console.log(`   Queue file: ${QUEUE_FILE}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
