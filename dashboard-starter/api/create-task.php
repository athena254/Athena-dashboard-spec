<?php
/**
 * Task Creation API Endpoint
 * Receives task data from the Task Creation UI and adds to agent queue
 * Location: athena-live/api/create-task.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Parse input
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
if (empty($input['title'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Task title is required']);
    exit;
}

// Map priority values
$priorityMap = [
    'low' => 'LOW',
    'medium' => 'MEDIUM',
    'high' => 'HIGH',
    'urgent' => 'CRITICAL'
];

$priority = $priorityMap[$input['priority'] ?? 'medium'] ?? 'MEDIUM';

// Map task type based on category
$typeMap = [
    'development' => 'DEVELOPMENT',
    'research' => 'RESEARCH',
    'finance' => 'FINANCE',
    'communication' => 'COMMUNICATION',
    'automation' => 'AUTOMATION',
    'security' => 'SECURITY',
    'creative' => 'CREATIVE',
    'operations' => 'OPERATIONS'
];

$taskType = $typeMap[$input['category'] ?? 'development'] ?? 'GENERAL';

// Generate task ID
$taskId = 'task_' . gmdate('Ymd_His') . '_' . substr(md5(uniqid()), 0, 8);

// Create task object
$task = [
    'id' => $taskId,
    'type' => $taskType,
    'status' => 'PENDING',
    'priority' => $priority,
    'created' => gmdate('c') . 'Z',
    'deadline' => $input['dueDate'] ?? null,
    'assignee' => $input['agent'] ?? 'athena',
    'requester' => 'dashboard',
    'input' => [
        'title' => $input['title'],
        'description' => $input['description'] ?? '',
        'category' => $input['category'] ?? '',
        'created_from' => 'task_creation_ui'
    ],
    'output' => null,
    'error' => null,
    'retryCount' => 0,
    'maxRetries' => 3,
    'dependencies' => [],
    'tags' => $input['tags'] ? explode(',', $input['tags']) : [],
    'context' => [
        'source' => 'dashboard',
        'ui_version' => '1.0'
    ],
    'history' => [
        [
            'at' => gmdate('c') . 'Z',
            'event' => 'CREATED',
            'by' => 'dashboard'
        ]
    ],
    'lease' => null
];

// Load existing queue
$queueFile = __DIR__ . '/../../memory/agent-queue.json';
if (!file_exists($queueFile)) {
    $queue = [
        'version' => '1.1',
        'updated' => gmdate('c') . 'Z',
        'tasks' => [],
        'stats' => [
            'totalProcessed' => 0,
            'avgCompletionTimeMs' => 0,
            'lastProcessedAt' => null,
            'byPriority' => ['CRITICAL' => 0, 'HIGH' => 0, 'MEDIUM' => 0, 'LOW' => 0],
            'byStatus' => ['PENDING' => 0, 'ASSIGNED' => 0, 'IN_PROGRESS' => 0, 'COMPLETED' => 0, 'FAILED' => 0, 'CANCELLED' => 0]
        ],
        'indexes' => [
            'byStatus' => ['PENDING' => [], 'ASSIGNED' => [], 'IN_PROGRESS' => [], 'COMPLETED' => [], 'FAILED' => [], 'CANCELLED' => []],
            'byAssignee' => [],
            'byPriority' => ['CRITICAL' => [], 'HIGH' => [], 'MEDIUM' => [], 'LOW' => []]
        ]
    ];
} else {
    $queue = json_decode(file_get_contents($queueFile), true);
}

// Add task to queue
$queue['tasks'][] = $task;

// Update indexes
$queue['indexes']['byStatus']['PENDING'][] = $taskId;
$queue['indexes']['byPriority'][$priority][] = $taskId;
if (!isset($queue['indexes']['byAssignee'][$task['assignee']])) {
    $queue['indexes']['byAssignee'][$task['assignee']] = [];
}
$queue['indexes']['byAssignee'][$task['assignee']][] = $taskId;

// Update stats
$queue['stats']['byPriority'][$priority]++;
$queue['stats']['byStatus']['PENDING']++;
$queue['updated'] = gmdate('c') . 'Z';

// Save queue
if (file_put_contents($queueFile, json_encode($queue, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'success' => true,
        'task_id' => $taskId,
        'message' => 'Task created successfully',
        'assigned_to' => $task['assignee'],
        'priority' => $priority
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save task to queue']);
}
