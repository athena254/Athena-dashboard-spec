<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$workspace = '/root/.openclaw/workspace';
$action = $_GET['action'] ?? '';
$rawInput = file_get_contents('php://input');
$input = $rawInput ? json_decode($rawInput, true) : [];

function runGit($cmd, $cwd = null) {
    global $workspace;
    $cwd = $cwd ?? $workspace;
    $descriptors = [
        0 => ['pipe', 'r'],
        1 => ['pipe', 'w'],
        2 => ['pipe', 'w']
    ];
    
    $process = proc_open($cmd, $descriptors, $pipes, $cwd);
    
    if (!is_resource($process)) {
        return ['error' => 'Failed to start process'];
    }
    
    fclose($pipes[0]);
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    
    $returnCode = proc_close($process);
    
    return [
        'output' => $stdout ?: $stderr,
        'returnCode' => $returnCode,
        'error' => $returnCode !== 0 ? $stderr : null
    ];
}

function getBranch() {
    $result = runGit('git branch --show-current');
    return $result['error'] ? 'main' : trim($result['output']);
}

function getStatus() {
    $result = runGit('git status --porcelain');
    $lines = explode("\n", trim($result['output']));
    $files = [];
    
    foreach ($lines as $line) {
        if (strlen($line) < 3) continue;
        $status = substr($line, 0, 2);
        $file = substr($line, 3);
        $files[] = [
            'status' => trim($status),
            'file' => $file
        ];
    }
    
    return [
        'branch' => getBranch(),
        'files' => $files,
        'clean' => count($files) === 0
    ];
}

function getLog($limit = 10) {
    $result = runGit("git log --oneline -n $limit --format='%H|%an|%ad|%s' --date=iso");
    if ($result['error']) {
        return ['error' => $result['error']];
    }
    
    $commits = [];
    $lines = explode("\n", trim($result['output']));
    
    foreach ($lines as $line) {
        if (empty(trim($line))) continue;
        $parts = explode('|', $line, 4);
        if (count($parts) >= 4) {
            $commits[] = [
                'hash' => $parts[0],
                'author' => $parts[1],
                'date' => $parts[2],
                'message' => $parts[3]
            ];
        }
    }
    
    return ['commits' => $commits];
}

function getBranches() {
    $result = runGit('git branch -a --format="%(refname:short)|%(HEAD)"');
    if ($result['error']) {
        return ['error' => $result['error']];
    }
    
    $branches = [];
    $lines = explode("\n", trim($result['output']));
    $currentBranch = getBranch();
    
    foreach ($lines as $line) {
        if (empty(trim($line))) continue;
        $parts = explode('|', $line);
        $name = trim($parts[0]);
        $isCurrent = isset($parts[1]) && trim($parts[1]) === '*';
        
        if ($name) {
            $branches[] = [
                'name' => $name,
                'current' => $isCurrent
            ];
        }
    }
    
    return ['branches' => $branches];
}

function getStats() {
    // Total commits
    $result = runGit('git rev-list --count HEAD');
    $totalCommits = $result['error'] ? 0 : (int)trim($result['output']);
    
    // Branch count
    $result = runGit('git branch -a --count');
    $branches = $result['error'] ? 0 : (int)trim($result['output']);
    
    // Tracked files
    $result = runGit('git ls-files | wc -l');
    $trackedFiles = $result['error'] ? 0 : (int)trim($result['output']);
    
    // Ahead/behind
    $result = runGit('git rev-list --count @{u}..HEAD 2>/dev/null || echo 0');
    $ahead = $result['error'] ? 0 : (int)trim($result['output']);
    
    return [
        'totalCommits' => $totalCommits,
        'branches' => $branches,
        'trackedFiles' => $trackedFiles,
        'ahead' => $ahead
    ];
}

// Handle POST commands
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($input['command'])) {
    $result = runGit($input['command']);
    echo json_encode($result);
    exit;
}

// Route requests
switch ($action) {
    case 'status':
        echo json_encode(getStatus());
        break;
    case 'log':
        $limit = (int)($_GET['limit'] ?? 10);
        echo json_encode(getLog($limit));
        break;
    case 'branches':
        echo json_encode(getBranches());
        break;
    case 'stats':
        echo json_encode(getStats());
        break;
    default:
        echo json_encode([
            'error' => 'Unknown action',
            'available' => ['status', 'log', 'branches', 'stats']
        ]);
}
