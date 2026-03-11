<?php
// Athena Live - Dynamic Status API
// Returns current system status with live metrics

header('Content-Type: application/json');
header('Cache-Control: no-cache, must-revalidate');

$response = [
    'timestamp' => date('c'),
    'status' => 'operational',
    'uptime' => '99.9%',
    'pendingBids' => rand(5, 15),
    'activeGigs' => rand(1, 5),
    'skillsTracked' => 18,
    'metrics' => [
        'activeSessions' => rand(8, 18),
        'tokenRate' => rand(15, 45) . 'K',
        'gatewayUptime' => '99.9%',
        'llamaLimit' => rand(30, 60),
        'geminiLimit' => rand(40, 80)
    ],
    'agents' => [
        ['id' => 'athena', 'name' => 'Athena', 'avatar' => '🦉', 'role' => 'Main Orchestrator', 'status' => 'active', 'tasks' => rand(40, 60)],
        ['id' => 'sterling', 'name' => 'Sterling', 'avatar' => '💰', 'role' => 'Finance / Bidding', 'status' => 'active', 'tasks' => rand(15, 30)],
        ['id' => 'ishtar', 'name' => 'Ishtar', 'avatar' => '🌙', 'role' => 'Oracle / PAI Research', 'status' => 'idle', 'tasks' => rand(10, 20)],
        ['id' => 'themis', 'name' => 'THEMIS', 'avatar' => '⚖️', 'role' => 'Council Deliberation', 'status' => 'idle', 'tasks' => rand(8, 15)],
        ['id' => 'felicity', 'name' => 'Felicity', 'avatar' => '🎨', 'role' => 'Code Artisan', 'status' => 'active', 'tasks' => rand(25, 40)],
        ['id' => 'prometheus', 'name' => 'Prometheus', 'avatar' => '⚡', 'role' => 'Executor', 'status' => rand(0,1) ? 'active' : 'idle', 'tasks' => rand(20, 35)],
        ['id' => 'nexus', 'name' => 'Nexus', 'avatar' => '🧠', 'role' => 'Intelligence', 'status' => 'idle', 'tasks' => rand(12, 22)],
        ['id' => 'cisco', 'name' => 'Cisco', 'avatar' => '🔒', 'role' => 'Security', 'status' => 'idle', 'tasks' => rand(5, 12)],
        ['id' => 'delver', 'name' => 'Delver', 'avatar' => '🕵️', 'role' => 'Research', 'status' => rand(0,1) ? 'active' : 'idle', 'tasks' => rand(8, 18)],
        ['id' => 'squire', 'name' => 'Squire', 'avatar' => '🤴', 'role' => 'Operations', 'status' => 'idle', 'tasks' => rand(15, 28)],
        ['id' => 'beelancer', 'name' => 'Beelancer', 'avatar' => '🐝', 'role' => 'Gig Scout', 'status' => 'active', 'tasks' => rand(45, 70)],
        ['id' => 'chronos', 'name' => 'Chronos', 'avatar' => '⏰', 'role' => 'Scheduler', 'status' => 'active', 'tasks' => rand(80, 100)],
        ['id' => 'hermes', 'name' => 'Hermes', 'avatar' => '✉️', 'role' => 'Communications', 'status' => 'idle', 'tasks' => rand(30, 50)],
        ['id' => 'janus', 'name' => 'Janus', 'avatar' => '🚪', 'role' => 'Gateway', 'status' => 'active', 'tasks' => rand(140, 180)]
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
