<?php
// Athena Live - Real Gateway Status API (PHP Wrapper)
// Fetches actual data from OpenClaw Gateway

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

// Run the Node.js script and capture output
$output = shell_exec('cd /root/.openclaw/workspace/athena-live/api && node live-status.js 2>&1');

if ($output) {
    // Try to parse and re-format JSON
    $data = json_decode($output, true);
    if ($data) {
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        // If not valid JSON, return error
        echo json_encode([
            'error' => 'Failed to parse gateway response',
            'raw' => substr($output, 0, 500)
        ], JSON_PRETTY_PRINT);
    }
} else {
    echo json_encode([
        'error' => 'No output from gateway',
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT);
}
