/**
 * Queue WebSocket Client
 * Real-time queue updates for Athena Dashboard
 * 
 * Usage:
 *   <script src="/js/queue-websocket.js"></script>
 *   <script>
 *     const client = new QueueWebSocket('ws://localhost:8765');
 *     client.onUpdate = (data) => { console.log('Update:', data); };
 *     client.connect();
 *   </script>
 */

class QueueWebSocket {
    constructor(url = 'ws://localhost:8765', options = {}) {
        this.url = url;
        this.reconnectInterval = options.reconnectInterval || 3000;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
        this.reconnectAttempts = 0;
        this.ws = null;
        this.isConnected = false;
        this.shouldReconnect = true;
        
        // Callbacks
        this.onUpdate = null;
        this.onConnect = null;
        this.onDisconnect = null;
        this.onError = null;
    }
    
    connect() {
        if (this.ws) {
            this.ws.close();
        }
        
        try {
            this.ws = new WebSocket(this.url);
            
            this.ws.onopen = () => {
                console.log('[QueueWS] Connected');
                this.isConnected = true;
                this.reconnectAttempts = 0;
                
                if (this.onConnect) {
                    this.onConnect();
                }
            };
            
            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.handleMessage(data);
                } catch (e) {
                    console.error('[QueueWS] Parse error:', e);
                }
            };
            
            this.ws.onclose = () => {
                console.log('[QueueWS] Disconnected');
                this.isConnected = false;
                
                if (this.onDisconnect) {
                    this.onDisconnect();
                }
                
                // Auto-reconnect
                if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.reconnectAttempts++;
                    console.log(`[QueueWS] Reconnecting in ${this.reconnectInterval}ms (attempt ${this.reconnectAttempts})`);
                    setTimeout(() => this.connect(), this.reconnectInterval);
                }
            };
            
            this.ws.onerror = (error) => {
                console.error('[QueueWS] Error:', error);
                
                if (this.onError) {
                    this.onError(error);
                }
            };
            
        } catch (error) {
            console.error('[QueueWS] Connection failed:', error);
            
            if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                this.reconnectAttempts++;
                setTimeout(() => this.connect(), this.reconnectInterval);
            }
        }
    }
    
    disconnect() {
        this.shouldReconnect = false;
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
    
    handleMessage(data) {
        switch (data.type) {
            case 'initial_state':
            case 'queue_update':
            case 'refresh_response':
                if (this.onUpdate) {
                    this.onUpdate(data);
                }
                break;
            
            case 'pong':
                // Heartbeat response
                break;
            
            default:
                console.log('[QueueWS] Unknown message type:', data.type);
        }
    }
    
    send(data) {
        if (this.ws && this.isConnected) {
            this.ws.send(JSON.stringify(data));
        }
    }
    
    ping() {
        this.send({ type: 'ping' });
    }
    
    refresh() {
        this.send({ type: 'refresh' });
    }
}

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QueueWebSocket;
}

// Also create global for browser
if (typeof window !== 'undefined') {
    window.QueueWebSocket = QueueWebSocket;
}
