/**
 * Notification Toast System
 * Displays real-time notifications in the dashboard
 * Location: athena-live/js/notifications.js
 */

(function() {
  'use strict';

  // Toast container
  let container = null;

  // Create container
  function createContainer() {
    if (container) return container;

    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column-reverse;
      gap: 10px;
      max-width: 360px;
    `;
    document.body.appendChild(container);

    return container;
  }

  // Create toast element
  function createToast(notification) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${notification.type}`;
    toast.dataset.id = notification.id;

    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    const colors = {
      info: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#60a5fa' },
      success: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#34d399' },
      warning: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#fbbf24' },
      error: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#f87171' }
    };

    const color = colors[notification.type] || colors.info;

    toast.style.cssText = `
      padding: 12px 16px;
      background: var(--bg-surface, #111827);
      border: 1px solid ${color.border};
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: flex-start;
      gap: 10px;
      animation: slideIn 0.3s ease;
      max-width: 100%;
    `;

    toast.innerHTML = `
      <span style="font-size: 1.2em;">${icons[notification.type] || icons.info}</span>
      <div style="flex: 1; min-width: 0;">
        <div style="color: var(--text-primary, #f9fafb); font-size: 0.875rem; font-weight: 500;">${notification.message}</div>
        <div style="color: var(--text-muted, #9ca3af); font-size: 0.75rem; margin-top: 4px;">Just now</div>
      </div>
      <button onclick="this.parentElement.remove()" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2em; padding: 0; line-height: 1;">&times;</button>
    `;

    return toast;
  }

  // Show toast
  function showToast(notification) {
    const container = createContainer();
    const toast = createToast(notification);
    container.appendChild(toast);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // Add animation styles
  function addStyles() {
    if (document.getElementById('toast-styles')) return;

    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize
  function init() {
    addStyles();
    createContainer();

    // Listen for Athena notifications
    window.addEventListener('athena:notification', (e) => {
      showToast(e.detail);
    });

    // Expose globally
    window.toast = showToast;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
