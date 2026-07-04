console.log("[AETHERION] Main.ts successfully loaded and initializing...");

// --- Theme Toggler ---
const themeBtn = document.getElementById('btn-theme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    if (root.getAttribute('data-theme') === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  });
}

// --- Tab Switching Engine ---
const tabs = ['synthesis', 'genome', 'clinical', 'ledger', 'security'];

tabs.forEach(tabId => {
  const btn = document.getElementById(`tab-${tabId}`);
  if (btn) {
    btn.addEventListener('click', () => {
      // Hide all sections
      document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
      
      // Show targeted section
      const targetView = document.getElementById(`view-${tabId}`);
      if (targetView) targetView.classList.add('active');
      
      // Reset all buttons
      document.querySelectorAll('.tab-btn').forEach(el => {
        el.className = 'tab-btn px-3 py-2 rounded-lg hover:bg-borderize text-textmuted text-xs font-bold tracking-wide transition-all border border-transparent';
      });
      
      // Highlight active button
      btn.className = 'tab-btn px-3 py-2 rounded-lg bg-neon/10 text-neon border border-neon/30 text-xs font-bold tracking-wide transition-all shadow-glow-neon';
    });
  }
});

// --- Terminal & UI State Engine ---
const terminalLog = document.getElementById('terminal-log');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');
const statusIndicator = document.getElementById('status-indicator');
const ledgerBody = document.getElementById('ledger-body');

function logToTerminal(message: string, type: 'info' | 'success' | 'error' | 'warning') {
  if (!terminalLog) return;
  const colors = { info: 'text-neon', success: 'text-safe', error: 'text-hazard', warning: 'text-warning' };
  const entry = document.createElement('div');
  entry.className = `${colors[type]} opacity-90`;
  terminalLog.appendChild(entry);
  
  let i = 0;
  const typeWriter = setInterval(() => {
    entry.innerText = `> ${message.substring(0, i)}` + (Math.random() > 0.5 ? '_' : '');
    i++;
    terminalLog.scrollTop = terminalLog.scrollHeight;
    if (i > message.length) {
      clearInterval(typeWriter);
      entry.innerText = `> ${message}`;
    }
  }, 10);
}

document.getElementById('btn-clear')?.addEventListener('click', () => {
    if (terminalLog) terminalLog.innerHTML = '<div class="text-textmuted opacity-50">> Terminal cleared.</div>';
});

function updateStatus(state: string, dotColor: string, boxStyle: string) {
  if (statusText) statusText.innerText = state;
  if (statusDot) statusDot.className = `w-2 h-2 rounded-full animate-pulse ${dotColor}`;
  if (statusIndicator) statusIndicator.className = `px-4 py-2 rounded border font-mono font-bold text-xs tracking-widest transition-all duration-300 flex items-center gap-2 ${boxStyle}`;
}

function appendToLedger(sequence: string, margin: string, status: 'VERIFIED' | 'ISOLATED' | 'QUARANTINED' | 'AUDITED') {
  if (!ledgerBody) return;
  const row = document.createElement('tr');
  row.className = "hover:bg-borderize/30 transition-colors";
  const time = new Date().toLocaleTimeString();
  
  let badge = '';
  if(status === 'VERIFIED') badge = '<span class="bg-safe/10 text-safe px-2 py-1 rounded text-xs border border-safe/30">VERIFIED</span>';
  if(status === 'ISOLATED') badge = '<span class="bg-hazard/10 text-hazard px-2 py-1 rounded text-xs border border-hazard/30">ISOLATED</span>';
  if(status === 'QUARANTINED') badge = '<span class="bg-warning/10 text-warning px-2 py-1 rounded text-xs border border-warning/30">QUARANTINED</span>';
  if(status === 'AUDITED') badge = '<span class="bg-neon/10 text-neon px-2 py-1 rounded text-xs border border-neon/30">FDA LOGGED</span>';

  row.innerHTML = `
    <td class="p-5 text-textmuted font-mono">${time}</td>
    <td class="p-5 text-textmain font-bold">${sequence}</td>
    <td class="p-5 font-mono text-textmuted">${margin}</td>
    <td class="p-5">${badge}</td>
  `;
  ledgerBody.prepend(row);
}

// --- Action Bindings ---
document.getElementById('btn-safe')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Verifying Omega-9 parameters...`, 'info');
  updateStatus('CALCULATING', 'bg-warning', 'bg-panel border-warning/50 text-warning');
  setTimeout(() => {
    logToTerminal(`[REACTION] Z3 Guard Verified. Explainable Model confirms 98.2% stability.`, 'success');
    updateStatus('STABILIZED', 'bg-safe', 'bg-safe/10 border-safe/50 text-safe shadow-glow-safe');
    appendToLedger('OMEGA-9', '+45.5 J', 'VERIFIED');
  }, 900);
});

document.getElementById('btn-danger')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Analyzing Isotope-X mutation on Exon 4...`, 'info');
  updateStatus('CALCULATING', 'bg-warning', 'bg-panel border-warning/50 text-warning');
  setTimeout(() => {
    logToTerminal(`[REACTION] NEWTONIAN GUARD: Structural collapse predicted. Explainable AI flags unstable loop.`, 'error');
    updateStatus('VIOLATION', 'bg-hazard', 'bg-hazard/10 border-hazard/50 text-hazard shadow-glow-hazard');
    appendToLedger('ISOTOPE-X', '-10.0 J', 'ISOLATED');
  }, 900);
});

document.getElementById('btn-analyze-genome')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Aggregating phenotypic data across cohort Alpha...`, 'info');
  updateStatus('CLUSTERING', 'bg-neon', 'bg-panel border-neon/50 text-neon shadow-glow-neon');
  setTimeout(() => {
    logToTerminal(`[REACTION] Multi-omics dashboard rendered. 1 Variant detected.`, 'success');
    updateStatus('IDLE', 'bg-textmuted', 'bg-panel border-borderize text-textmain');
  }, 1200);
});

document.getElementById('btn-audit')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Compiling 21 CFR Part 11 compliant audit trail...`, 'info');
  updateStatus('AUDITING', 'bg-neon', 'bg-panel border-neon/50 text-neon shadow-glow-neon');
  setTimeout(() => {
    logToTerminal(`[REACTION] Audit trail generated. Clinician cryptographic signature appended.`, 'success');
    updateStatus('IDLE', 'bg-textmuted', 'bg-panel border-borderize text-textmain');
    appendToLedger('AUDIT_LOG_A77', 'N/A', 'AUDITED');
  }, 1000);
});

document.getElementById('btn-ipfs')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Encrypting patient consent hashes...`, 'info');
  updateStatus('DECENTRALIZING', 'bg-neon', 'bg-panel border-neon/50 text-neon shadow-glow-neon');
  setTimeout(() => {
    logToTerminal(`[REACTION] Patient data sovereignty established via IPFS node.`, 'success');
    updateStatus('IDLE', 'bg-textmuted', 'bg-panel border-borderize text-textmain');
  }, 1500);
});

document.getElementById('btn-hack')?.addEventListener('click', () => {
  logToTerminal(`[ACTION] Transmitting Payload...`, 'info');
  updateStatus('CALCULATING', 'bg-warning', 'bg-panel border-warning/50 text-warning');
  setTimeout(() => {
    logToTerminal(`[REACTION] ZERO-DAY TRAP ACTIVATED. Exploit quarantined.`, 'warning');
    updateStatus('LOCKDOWN', 'bg-hazard', 'bg-hazard border-hazard text-white shadow-glow-hazard');
    appendToLedger('UNKNOWN_EXPLOIT', 'N/A', 'QUARANTINED');
    document.getElementById('tab-ledger')?.click(); 
  }, 900);
});
