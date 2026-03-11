/**
 * Real-time Dashboard Updates
 * Simulates WebSocket-like updates for the Athena dashboard
 * Location: athena-live/js/realtime-updates.js
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    updateInterval: 30000, // 30 seconds
    apiUrl: '/api',
    enableNotifications: true,
    enableSounds: false
  };

  // State
  const state = {
    lastUpdate: null,
    updateCount: 0,
    notifications: [],
    taskQueue: []
  };

  // Simulated agent activities
  const AGENT_ACTIVITIES = {
    athena: [
      'Coordinating task routing',
      'Processing queue items',
      'Updating agent statuses',
      'Syncing global state'
    ],
    sterling: [
      'Analyzing new project',
      'Placing bid on project',
      'Optimizing bid strategy',
      'Checking budget limits'
    ],
    ishtar: [
      'Researching PAI patterns',
      'Synthesizing knowledge',
      'Running night cycle',
      'Generating insights'
    ],
    themis: [
      'Enforcing policy',
      'Running compliance check',
      'Auditing decisions',
      'Flagging violations'
    ],
    felicity: [
      'Refactoring code',
      'Running tests',
      'Creating component',
      'Reviewing PR'
    ],
    prometheus: [
      'Running automation',
      'Processing pipeline',
      'Scheduling task',
      'Checking integrations'
    ],
    nexus: [
      'Updating knowledge base',
      'Learning patterns',
      'Cross-referencing data',
      'Training model'
    ],
    delver: [
      'Researching topic',
      'Analyzing sources',
      'Generating report',
      'Verifying facts'
    ],
    squire: [
      'Processing request',
      'Setting reminder',
      'Fetching information',
      'Handling query'
    ],
    cisco: [
      'Monitoring security',
      'Checking access logs',
      'Running audit',
      'Scanning threats'
    ]
  };

  // Generate random activity
  function getRandomActivity(agent) {
    const activities = AGENT_ACTIVITIES[agent] || ['Working'];
    return activities[Math.floor(Math.random() * activities.length)];
  }

  // Show notification
  function showNotification(message, type = 'info') {
    if (!CONFIG.enableNotifications) return;

    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };

    state.notifications.unshift(notification);
    if (state.notifications.length > 10) {
      state.notifications.pop();
    }

    // Dispatch custom event for UI to handle
    window.dispatchEvent(new CustomEvent('athena:notification', {
      detail: notification
    }));
  }

  // Update agent status display
  function updateAgentStatus(agentId, status, activity) {
    const card = document.querySelector(`[data-agent="${agentId}"]`);
    if (!card) return;

    // Update status indicator
    const statusDot = card.querySelector('.status-dot');
    if (statusDot) {
      statusDot.className = `status-dot status-${status}`;
    }

    // Dispatch event for modal system
    window.dispatchEvent(new CustomEvent('athena:agent-update', {
      detail: { agentId, status, activity, timestamp: new Date() }
    }));
  }

  // Simulate queue updates
  function updateQueueStats() {
    const queueStats = {
      pending: Math.floor(Math.random() * 5) + 1,
      inProgress: Math.floor(Math.random() * 3) + 1,
      completed: Math.floor(Math.random() * 50) + 100,
      failed: Math.floor(Math.random() * 2)
    };

    // Update UI elements
    const pendingEl = document.getElementById('queue-pending');
    const progressEl = document.getElementById('queue-progress');
    const completedEl = document.getElementById('queue-completed');

    if (pendingEl) pendingEl.textContent = queueStats.pending;
    if (progressEl) progressEl.textContent = queueStats.inProgress;
    if (completedEl) completedEl.textContent = queueStats.completed;

    // Dispatch event
    window.dispatchEvent(new CustomEvent('athena:queue-update', {
      detail: queueStats
    }));

    return queueStats;
  }

  // Simulate revenue updates
  function updateRevenue() {
    const revenue = {
      today: (Math.random() * 100 + 50).toFixed(2),
      week: (Math.random() * 500 + 300).toFixed(2),
      month: (Math.random() * 2000 + 1500).toFixed(2)
    };

    // Update UI
    const todayEl = document.getElementById('revenue-today');
    const weekEl = document.getElementById('revenue-week');
    const monthEl = document.getElementById('revenue-month');

    if (todayEl) todayEl.textContent = `$${revenue.today}`;
    if (weekEl) weekEl.textContent = `$${revenue.week}`;
    if (monthEl) monthEl.textContent = `$${revenue.month}`;

    return revenue;
  }

  // Main update cycle
  function runUpdateCycle() {
    state.updateCount++;
    state.lastUpdate = new Date();

    // Random agent activity
    const agents = Object.keys(AGENT_ACTIVITIES);
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    const activity = getRandomActivity(randomAgent);

    // Update agent status
    updateAgentStatus(randomAgent, 'active', activity);

    // Update queue
    const queueStats = updateQueueStats();

    // Occasionally show notification
    if (Math.random() > 0.7) {
      const messages = [
        `${randomAgent.charAt(0).toUpperCase() + randomAgent.slice(1)}: ${activity}`,
        'New task added to queue',
        'Bid placed successfully',
        'Research cycle completed',
        'Dashboard synced'
      ];
      showNotification(messages[Math.floor(Math.random() * messages.length)]);
    }

    // Update revenue (30% chance)
    if (Math.random() > 0.7) {
      updateRevenue();
    }

    // Log update
    console.log(`[Athena RT] Update #${state.updateCount}: ${randomAgent} - ${activity}`);
  }

  // Start real-time updates
  function start() {
    console.log('[Athena RT] Starting real-time updates...');
    
    // Initial update
    runUpdateCycle();

    // Set interval
    setInterval(runUpdateCycle, CONFIG.updateInterval);

    // Expose state for debugging
    window.athenaRealtime = {
      state,
      config: CONFIG,
      showNotification,
      updateAgentStatus,
      updateQueueStats
    };
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
