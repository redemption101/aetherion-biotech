const statusIndicator = document.getElementById('status-indicator')!;
const terminalLog = document.getElementById('terminal-log')!;

function logToTerminal(message: string, type: 'info' | 'success' | 'error' | 'warning') {
  const colors = { info: 'text-gray-400', success: 'text-safe', error: 'text-hazard', warning: 'text-yellow-500' };
  const entry = document.createElement('div');
  entry.className = colors[type];
  entry.innerText = `> ${message}`;
  terminalLog.appendChild(entry);
  terminalLog.scrollTop = terminalLog.scrollHeight;
}

function updateStatus(state: string, colorClass: string) {
  statusIndicator.innerText = state;
  statusIndicator.className = `px-4 py-1 rounded-full text-white font-bold tracking-widest transition-colors ${colorClass}`;
}

async function triggerReaction(action: string, endpoint: string, payload: any) {
  logToTerminal(`[ACTION] Initiating ${action}...`, 'info');
  updateStatus('PROCESSING...', 'bg-yellow-600');

  try {
    // In production, this points to the Erlang Cowboy port (e.g., http://localhost:8080)
    // For UI demonstration before backend link, we simulate the Newtonian Guard response
    setTimeout(() => {
      if (payload.margin && payload.margin > 0) {
        logToTerminal(`[REACTION] Z3 Guard Verified. Thermodynamics stable.`, 'success');
        updateStatus('STABILIZED', 'bg-safe');
      } else if (payload.margin && payload.margin <= 0) {
        logToTerminal(`[REACTION] NEWTONIAN GUARD: Structural collapse predicted. Sequence isolated.`, 'error');
        updateStatus('VIOLATION', 'bg-hazard');
      } else if (endpoint === '/api/honeypot') {
        logToTerminal(`[REACTION] ZERO-DAY TRAP ACTIVATED. Malicious payload quarantined. IP Logged.`, 'warning');
        updateStatus('LOCKDOWN', 'bg-red-900');
        document.body.classList.add('bg-red-950'); // Visually lock the UI
      }
    }, 600);
  } catch (err) {
    logToTerminal(`[SYS_ERR] Connection to Erlang spine severed.`, 'error');
  }
}

document.getElementById('btn-safe')?.addEventListener('click', () => triggerReaction('Omega-9 Synthesis', '/api/verify', { margin: 45.5 }));
document.getElementById('btn-danger')?.addEventListener('click', () => triggerReaction('Isotope-X Synthesis', '/api/verify', { margin: -10.0 }));
document.getElementById('btn-hack')?.addEventListener('click', () => triggerReaction('Zero-Day Payload Injection', '/api/honeypot', { exploit: 'buffer_overflow' }));
