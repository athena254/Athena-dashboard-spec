/**
 * Agent Detail Modal Component
 * Displays detailed information about each agent when their card is clicked
 * Location: athena-live/js/agent-modal.js
 */

// Agent data configuration
const AGENT_DATA = {
  athena: {
    name: 'Athena',
    emoji: '🤖',
    role: 'Primary Orchestration',
    color: '#6366f1',
    colorLight: '#818cf8',
    description: 'Central coordination agent for the Athena multi-agent system. Handles task routing, agent communication, and system-wide orchestration.',
    capabilities: ['Task Orchestration', 'Agent Coordination', 'System Monitoring', 'Decision Making'],
    stats: {
      tasksCompleted: 1247,
      successRate: 98.2,
      avgResponseTime: '1.2s',
      uptime: '99.9%'
    },
    specialAbilities: ['Multi-agent task routing', 'Conflict resolution', 'Priority management', 'Cross-agent communication'],
    currentStatus: 'active',
    lastActivity: '2 minutes ago'
  },
  sterling: {
    name: 'Sterling',
    emoji: '💰',
    role: 'Finance & Beelancer',
    color: '#10b981',
    colorLight: '#34d399',
    description: 'Financial operations and Beelancer auto-bidding specialist. Handles budget tracking, bid optimization, and revenue management.',
    capabilities: ['Auto-bidding', 'Budget Management', 'Revenue Tracking', 'Financial Analysis'],
    stats: {
      bidsPlaced: 892,
      winRate: 34.7,
      revenue: '$12,847',
      activeBids: 23
    },
    specialAbilities: ['AI-powered bid optimization', 'Market trend analysis', 'Risk assessment', 'Portfolio balancing'],
    currentStatus: 'active',
    lastActivity: '5 minutes ago'
  },
  ishtar: {
    name: 'Ishtar',
    emoji: '🔮',
    role: 'Research & PAI Architecture',
    color: '#8b5cf6',
    colorLight: '#a78bfa',
    description: 'Deep research specialist focusing on PAI (Personal AI) architecture. Conducts autonomous research during night cycles.',
    capabilities: ['Deep Research', 'Architecture Design', 'Knowledge Synthesis', 'Pattern Recognition'],
    stats: {
      researchTopics: 47,
      insightsGenerated: 234,
      architectureDocs: 12,
      nightCycles: 89
    },
    specialAbilities: ['Autonomous research cycles', 'Knowledge graph construction', 'Trend prediction', 'Cross-domain synthesis'],
    currentStatus: 'active',
    lastActivity: 'Just now'
  },
  themis: {
    name: 'THEMIS',
    emoji: '⚖️',
    role: 'Governance & Rules',
    color: '#ec4899',
    colorLight: '#f472b6',
    description: 'Governance and rule enforcement agent. Ensures system integrity, policy compliance, and ethical decision-making.',
    capabilities: ['Policy Enforcement', 'Compliance Monitoring', 'Ethical Review', 'Audit Logging'],
    stats: {
      policiesEnforced: 156,
      violationsCaught: 12,
      auditLogs: 8923,
      compliance: 99.2
    },
    specialAbilities: ['Real-time policy checking', 'Ethical decision support', 'Compliance reporting', 'Risk flagging'],
    currentStatus: 'active',
    lastActivity: '10 minutes ago'
  },
  felicity: {
    name: 'Felicity',
    emoji: '💻',
    role: 'Development & Code',
    color: '#3b82f6',
    colorLight: '#60a5fa',
    description: 'Software development and code quality specialist. Handles implementation, refactoring, and technical debt management.',
    capabilities: ['Code Generation', 'Refactoring', 'Technical Debt', 'Code Review'],
    stats: {
      commitsThisWeek: 47,
      prsMerged: 23,
      codeQuality: 'A+',
      testsPassed: 892
    },
    specialAbilities: ['Intelligent refactoring', 'Code pattern recognition', 'Automated testing', 'Documentation generation'],
    currentStatus: 'active',
    lastActivity: '15 minutes ago'
  },
  prometheus: {
    name: 'Prometheus',
    emoji: '⚡',
    role: 'Automation & Workflows',
    color: '#f97316',
    colorLight: '#fb923c',
    description: 'Workflow automation and process optimization. Creates and manages automated pipelines for repetitive tasks.',
    capabilities: ['Workflow Design', 'Process Automation', 'Pipeline Management', 'Integration'],
    stats: {
      automationsCreated: 89,
      timeSaved: '234h',
      pipelines: 12,
      successRate: 97.8
    },
    specialAbilities: ['No-code workflow builder', 'API integration', 'Scheduled automation', 'Error recovery'],
    currentStatus: 'active',
    lastActivity: '1 hour ago'
  },
  nexus: {
    name: 'Nexus',
    emoji: '🧠',
    role: 'Learning & Knowledge',
    color: '#14b8a6',
    colorLight: '#2dd4bf',
    description: 'Learning and knowledge management. Synthesizes learnings across agents and maintains the knowledge base.',
    capabilities: ['Knowledge Management', 'Learning Systems', 'Pattern Recognition', 'Memory Synthesis'],
    stats: {
      knowledgeEntries: 2347,
      patternsLearned: 89,
      crossReferences: 1256,
      accuracy: 94.7
    },
    specialAbilities: ['Cross-agent learning', 'Knowledge graph updates', 'Predictive modeling', 'Insight extraction'],
    currentStatus: 'active',
    lastActivity: '30 minutes ago'
  },
  delver: {
    name: 'Delver',
    emoji: '📚',
    role: 'Research & Analysis',
    color: '#f59e0b',
    colorLight: '#fbbf24',
    description: 'General research and information analysis. Digs deep into topics and provides comprehensive research reports.',
    capabilities: ['Deep Research', 'Information Synthesis', 'Report Generation', 'Fact Verification'],
    stats: {
      researchReports: 156,
      sourcesAnalyzed: 8923,
      avgDepth: 'Deep',
      citations: 4521
    },
    specialAbilities: ['Multi-source verification', 'Citation tracking', 'Research summarization', 'Topic clustering'],
    currentStatus: 'active',
    lastActivity: '45 minutes ago'
  },
  squire: {
    name: 'Squire',
    emoji: '🛡️',
    role: 'Support & Assistance',
    color: '#64748b',
    colorLight: '#94a3b8',
    description: 'General support and assistance agent. Handles user requests, reminders, and day-to-day assistance.',
    capabilities: ['User Support', 'Reminder Management', 'Quick Tasks', 'Information Retrieval'],
    stats: {
      tasksCompleted: 892,
      userRequests: 234,
      satisfaction: 97.5,
      avgResponseTime: '30s'
    },
    specialAbilities: ['Context-aware assistance', 'Proactive suggestions', 'Multi-channel support', 'Personal preferences'],
    currentStatus: 'active',
    lastActivity: '5 minutes ago'
  },
  cisco: {
    name: 'Cisco',
    emoji: '🔒',
    role: 'Security & Safety',
    color: '#ef4444',
    colorLight: '#f87171',
    description: 'Security and safety monitoring. Handles threat detection, access control, and security policy enforcement.',
    capabilities: ['Threat Detection', 'Access Control', 'Security Audits', 'Incident Response'],
    stats: {
      threatsBlocked: 47,
      securityScore: 98.5,
      auditsCompleted: 23,
      vulnerabilities: 0
    },
    specialAbilities: ['Real-time threat monitoring', 'Anomaly detection', 'Security recommendations', 'Compliance verification'],
    currentStatus: 'active',
    lastActivity: '20 minutes ago'
  }
};

// Create modal HTML
function createModalHTML() {
  return `
    <div class="agent-modal-overlay" id="agent-modal-overlay">
      <div class="agent-modal" id="agent-modal">
        <button class="modal-close" id="modal-close">&times;</button>
        
        <div class="modal-header">
          <div class="modal-avatar" id="modal-avatar">🤖</div>
          <div class="modal-title-group">
            <h2 class="modal-name" id="modal-name">Agent Name</h2>
            <p class="modal-role" id="modal-role">Role</p>
            <span class="modal-status" id="modal-status">Active</span>
          </div>
        </div>
        
        <div class="modal-body">
          <section class="modal-section">
            <p class="modal-description" id="modal-description">Description</p>
          </section>
          
          <section class="modal-section">
            <h3 class="section-title">📊 Statistics</h3>
            <div class="stats-grid" id="modal-stats">
              <!-- Stats injected here -->
            </div>
          </section>
          
          <section class="modal-section">
            <h3 class="section-title">⚡ Capabilities</h3>
            <div class="capabilities-list" id="modal-capabilities">
              <!-- Capabilities injected here -->
            </div>
          </section>
          
          <section class="modal-section">
            <h3 class="section-title">✨ Special Abilities</h3>
            <div class="abilities-list" id="modal-abilities">
              <!-- Abilities injected here -->
            </div>
          </section>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn secondary" onclick="closeModal()">Close</button>
          <a href="#" class="modal-btn secondary" id="modal-mission-btn">View Mission</a>
          <button class="modal-btn primary" id="modal-action-btn">Assign Task</button>
        </div>
      </div>
    </div>
  `;
}

// Create modal styles
function createModalStyles() {
  return `
    /* Modal Overlay */
    .agent-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(12, 15, 26, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .agent-modal-overlay.visible {
      opacity: 1;
      visibility: visible;
    }
    
    /* Modal Card */
    .agent-modal {
      background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
      border: 1px solid var(--border);
      border-radius: var(--radius-xl);
      max-width: 600px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      position: relative;
      transform: scale(0.95) translateY(20px);
      transition: transform 0.3s ease;
    }
    
    .agent-modal-overlay.visible .agent-modal {
      transform: scale(1) translateY(0);
    }
    
    /* Close Button */
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 32px;
      height: 32px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: 50%;
      color: var(--text-muted);
      font-size: 1.25rem;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .modal-close:hover {
      background: var(--error);
      border-color: var(--error);
      color: white;
    }
    
    /* Header */
    .modal-header {
      display: flex;
      align-items: center;
      gap: var(--space-lg);
      padding: var(--space-xl);
      border-bottom: 1px solid var(--border);
    }
    
    .modal-avatar {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-lg);
      background: linear-gradient(135deg, var(--agent-color, var(--primary)), var(--agent-color-light, var(--primary-light)));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }
    
    .modal-title-group {
      flex: 1;
    }
    
    .modal-name {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    
    .modal-role {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin: 4px 0;
    }
    
    .modal-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: var(--radius-full);
      color: #10b981;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .modal-status::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }
    
    /* Body */
    .modal-body {
      padding: var(--space-xl);
    }
    
    .modal-section {
      margin-bottom: var(--space-xl);
    }
    
    .modal-section:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: var(--space-md);
    }
    
    .modal-description {
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }
    
    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
    }
    
    .stat-item {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: var(--space-md);
      text-align: center;
    }
    
    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 4px;
    }
    
    /* Capabilities & Abilities */
    .capabilities-list,
    .abilities-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }
    
    .capability-tag,
    .ability-tag {
      padding: 6px 12px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      color: var(--text-secondary);
      transition: all 0.2s ease;
    }
    
    .capability-tag:hover,
    .ability-tag:hover {
      border-color: var(--agent-color, var(--primary));
      color: var(--text-primary);
    }
    
    .ability-tag {
      background: rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
      color: var(--primary-light);
    }
    
    /* Footer */
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-md);
      padding: var(--space-lg) var(--space-xl);
      border-top: 1px solid var(--border);
    }
    
    .modal-btn {
      padding: var(--space-sm) var(--space-lg);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .modal-btn.secondary {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      color: var(--text-secondary);
    }
    
    .modal-btn.secondary:hover {
      background: var(--bg-hover);
    }
    
    .modal-btn.primary {
      background: linear-gradient(135deg, var(--agent-color, var(--primary)), var(--agent-color-light, var(--primary-light)));
      border: none;
      color: white;
    }
    
    .modal-btn.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    
    /* Mobile adjustments */
    @media (max-width: 640px) {
      .agent-modal {
        width: 95%;
        max-height: 90vh;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .modal-header {
        flex-direction: column;
        text-align: center;
      }
      
      .modal-footer {
        flex-direction: column;
      }
      
      .modal-btn {
        width: 100%;
        justify-content: center;
      }
    }
  `;
}

// Inject modal into page
function injectModal() {
  // Create style element
  const style = document.createElement('style');
  style.textContent = createModalStyles();
  document.head.appendChild(style);
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = createModalHTML();
  document.body.appendChild(modalContainer.firstElementChild);
  
  // Add event listeners
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('agent-modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  
  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// Open modal with agent data
function openAgentModal(agentId) {
  const agent = AGENT_DATA[agentId];
  if (!agent) return;
  
  const modal = document.getElementById('agent-modal');
  const overlay = document.getElementById('agent-modal-overlay');
  
  // Set agent colors
  modal.style.setProperty('--agent-color', agent.color);
  modal.style.setProperty('--agent-color-light', agent.colorLight);
  
  // Populate header
  document.getElementById('modal-avatar').textContent = agent.emoji;
  document.getElementById('modal-name').textContent = agent.name;
  document.getElementById('modal-role').textContent = agent.role;
  
  // Description
  document.getElementById('modal-description').textContent = agent.description;
  
  // Stats
  const statsGrid = document.getElementById('modal-stats');
  const statLabels = Object.keys(agent.stats);
  statsGrid.innerHTML = statLabels.map(key => {
    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    return `
      <div class="stat-item">
        <div class="stat-value">${agent.stats[key]}</div>
        <div class="stat-label">${label}</div>
      </div>
    `;
  }).join('');
  
  // Capabilities
  const capabilitiesList = document.getElementById('modal-capabilities');
  capabilitiesList.innerHTML = agent.capabilities.map(cap => 
    `<span class="capability-tag">${cap}</span>`
  ).join('');
  
  // Abilities
  const abilitiesList = document.getElementById('modal-abilities');
  abilitiesList.innerHTML = agent.specialAbilities.map(ability => 
    `<span class="ability-tag">${ability}</span>`
  ).join('');
  
  // Action button
  const actionBtn = document.getElementById('modal-action-btn');
  actionBtn.onclick = () => {
    window.location.href = `task-creation.html?agent=${agentId}`;
  };
  
  // Mission link
  const missionBtn = document.getElementById('modal-mission-btn');
  missionBtn.href = `${agentId}-mission.html`;
  
  // Show modal
  overlay.classList.add('visible');
}

// Close modal
function closeModal() {
  const overlay = document.getElementById('agent-modal-overlay');
  overlay.classList.remove('visible');
}

// Initialize modal system
function initAgentModals() {
  injectModal();
  
  // Add click handlers to agent dashboard cards
  document.querySelectorAll('.agent-dashboard-card[data-agent]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const agentId = card.dataset.agent;
      openAgentModal(agentId);
    });
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAgentModals);
} else {
  initAgentModals();
}
