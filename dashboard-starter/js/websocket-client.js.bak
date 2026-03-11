/**
 * WebSocket Client for Athena Dashboard
 * Connects to the dashboard WebSocket server for real-time updates
 * Location: athena-live/js/websocket-client.js
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    url: 'ws://localhost:8765',
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
    debug: true
  };

  // State
  let ws = null;
  let reconnectAttempts = 0;
  let isConnecting = false;
  let messageQueue = [];

  // Logger
  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Athena WS]', ...args);
    }
  }

  // Connect to WebSocket server
  function connect() {
    if (ws && ws.readyState === WebSocket.OPEN) {
      log('Already connected');
      return;
    }

    if (isConnecting) {
      log('Connection in progress');
      return;
    }

    isConnecting = true;
    log('Connecting to', CONFIG.url);

    try {
      ws = new WebSocket(CONFIG.url);

      ws.onopen = () => {
        log('Connected!');
        isConnecting = false;
        reconnectAttempts = 0;

        // Process queued messages
        while (messageQueue.length > 0) {
          const msg = messageQueue.shift();
          send(msg);
        }

        // Dispatch connected event
        window.dispatchEvent(new CustomEvent('athena:ws:connected'));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          handleMessage(message);
        } catch (err) {
          log('Error parsing message:', err);
        }
      };

      ws.onclose = (event) => {
        log('Disconnected:', event.code, event.reason);
        isConnecting = false;

        // Dispatch disconnected event
        window.dispatchEvent(new CustomEvent('athena:ws:disconnected', {
          detail: { code: event.code, reason: event.reason }
        }));

        // Attempt reconnect
        if (reconnectAttempts < CONFIG.maxReconnectAttempts) {
          reconnectAttempts++;
          log(`Reconnecting in ${CONFIG.reconnectInterval / 1000}s (attempt ${reconnectAttempts})`);
          setTimeout(connect, CONFIG.reconnectInterval);
        } else {
          log('Max reconnect attempts reached');
          window.dispatchEvent(new CustomEvent('athena:ws:failed'));
        }
      };

      ws.onerror = (error) => {
        log('WebSocket error:', error);
        isConnecting = false;
      };

    } catch (err) {
      log('Connection error:', err);
      isConnecting = false;
    }
  }

  // Send message
  function send(data) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      log('Not connected, queuing message');
      messageQueue.push(data);
    }
  }

  // Handle incoming message
  function handleMessage(message) {
    log('Received:', message.type, message);

    switch (message.type) {
      case 'connected':
        handleConnected(message);
        break;

      case 'agent_update':
        handleAgentUpdate(message.data);
        break;

      case 'queue_update':
        handleQueueUpdate(message.data);
        break;

      case 'revenue_update':
        handleRevenueUpdate(message.data);
        break;

      case 'notification':
        handleNotification(message.data);
        break;

      case 'queue_data':
        handleQueueData(message.data);
        break;

      default:
        log('Unknown message type:', message.type);
    }
  }

  // Handle connected message
  function handleConnected(message) {
    log('Server says:', message.data.message);

    // Update UI indicator
    const indicator = document.getElementById('ws-indicator');
    if (indicator) {
      indicator.className = 'ws-indicator connected';
      indicator.title = 'Connected to live updates';
    }
  }

  // Handle agent update
  function handleAgentUpdate(data) {
    // Dispatch event for agent modal and other listeners
    window.dispatchEvent(new CustomEvent('athena:agent-update', {
      detail: data
    }));

    // Update agent card if visible
    const card = document.querySelector(`[data-agent="${data.agent}"]`);
    if (card) {
      const statusDot = card.querySelector('.status-dot');
      if (statusDot) {
        statusDot.className = `status-dot status-${data.status}`;
      }
    }

    // Show notification for significant events
    if (data.progress === 100) {
      if (window.toast) {
        window.toast({
          id: `agent-${Date.now()}`,
          message: `${data.agent.charAt(0).toUpperCase() + data.agent.slice(1)}: ${data.activity}`,
          type: 'success'
        });
      }
    }
  }

  // Handle queue update
  function handleQueueUpdate(data) {
    window.dispatchEvent(new CustomEvent('athena:queue-update', {
      detail: data
    }));

    // Update UI elements
    const elements = {
      pending: document.getElementById('queue-pending'),
      inProgress: document.getElementById('queue-in-progress'),
      completed: document.getElementById('queue-completed'),
      failed: document.getElementById('queue-failed')
    };

    if (elements.pending) elements.pending.textContent = data.pending;
    if (elements.inProgress) elements.inProgress.textContent = data.in_progress;
    if (elements.completed) elements.completed.textContent = data.completed;
    if (elements.failed) elements.failed.textContent = data.failed;
  }

  // Handle revenue update
  function handleRevenueUpdate(data) {
    window.dispatchEvent(new CustomEvent('athena:revenue-update', {
      detail: data
    }));

    // Update revenue displays
    const elements = {
      today: document.getElementById('revenue-today'),
      week: document.getElementById('revenue-week'),
      month: document.getElementById('revenue-month')
    };

    if (elements.today) elements.today.textContent = `$${data.today.toFixed(2)}`;
    if (elements.week) elements.week.textContent = `$${data.week.toFixed(2)}`;
    if (elements.month) elements.month.textContent = `$${data.month.toFixed(2)}`;
  }

  // Handle notification
  function handleNotification(data) {
    window.dispatchEvent(new CustomEvent('athena:notification', {
      detail: data
    }));
  }

  // Handle full queue data
  function handleQueueData(data) {
    window.dispatchEvent(new CustomEvent('athena:queue-data', {
      detail: data
    }));
  }

  // Request queue data
  function requestQueueData() {
    send({ command: 'get_queue' });
  }

  // Disconnect
  function disconnect() {
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  // Get connection state
  function getState() {
    if (!ws) return 'disconnected';
    switch (ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING: return 'closing';
      case WebSocket.CLOSED: return 'disconnected';
      default: return 'unknown';
    }
  }

  // Initialize
  function init() {
    // Create connection indicator
    const indicator = document.createElement('div');
    indicator.id = 'ws-indicator';
    indicator.className = 'ws-indicator disconnected';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #6b7280;
      z-index: 9999;
      transition: background 0.3s ease;
    `;
    indicator.title = 'Disconnected from live updates';
    document.body.appendChild(indicator);

    // Add styles for indicator states
    const style = document.createElement('style');
    style.textContent = `
      .ws-indicator.connected { background: #10b981 !important; }
      .ws-indicator.connecting { background: #f59e0b !important; animation: pulse 1s infinite; }
      .ws-indicator.disconnected { background: #6b7280; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);

    // Auto-connect
    connect();

    // Expose API
    window.athenaWS = {
      connect,
      disconnect,
      send,
      requestQueueData,
      getState,
      config: CONFIG
    };

    log('WebSocket client initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
