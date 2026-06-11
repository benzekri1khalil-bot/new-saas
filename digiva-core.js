/* ==========================================================================
   DIGIVA V4 MASTER PLATFORM ARCHITECTURE ENGINE
   ========================================================================== */

// 1. Initial State Definitions & System Constants
const SYSTEM_ADMIN_EMAIL = "benzekri1khalil@gmail.com";
const SYSTEM_ADMIN_PASS  = "/khalil#brahim/";
const SYSTEM_ADMIN_CODE  = "khattarasafiakhalilbenzekri@";
const DEFAULT_WORKER_KEY = "digiva-worker-2025";

const DEFAULT_CONFIGURATION = {
  apiKey: "",
  starterLink: "",
  professionalLink: "",
  businessLink: "",
  donateLink: "",
  heroTitle: "AI-Powered Product Datasheet Generator",
  heroSub: "The modern automation workbench engineered for IT distributors, technology vendors, network engineers, and electronics manufacturers.",
  herobtn: "⚡ Generate Datasheet",
  navcta: "Generate Now →",
  footer: "© 2026 Digiva · AI Product Datasheets",
  promoCodes: { "DIGIVA2026": 25, "WELCOME5": 5 }
};

// 2. Data Accessors & Initializing Engine
if (!localStorage.getItem('dg_cfg')) {
  localStorage.setItem('dg_cfg', JSON.stringify(DEFAULT_CONFIGURATION));
}

if (!localStorage.getItem('dg_users')) {
  localStorage.setItem('dg_users', JSON.stringify([
    { 
      id: "admin_node", 
      name: "Khalil Master", 
      email: SYSTEM_ADMIN_EMAIL, 
      pass: SYSTEM_ADMIN_PASS, 
      code: SYSTEM_ADMIN_CODE, 
      credits: 9999, 
      role: "admin", 
      plan: "Enterprise Cluster" 
    },
    { 
      id: "demo_node", 
      name: "Standard Reseller", 
      email: "reseller@demo.io", 
      pass: "password123", 
      credits: 10, 
      role: "user", 
      plan: "Starter" 
    }
  ]));
}

if (!localStorage.getItem('dg_history')) {
  localStorage.setItem('dg_history', JSON.stringify([
    { 
      id: "ds_sample_1", 
      userId: "demo_node", 
      model: "Catalyst 9300 48-Port", 
      brand: "Cisco Systems", 
      lang: "en", 
      timestamp: Date.now() - 3600000, 
      fileUrl: "data:text/plain;charset=utf-8,Sample%20Datasheet%20Data" 
    }
  ]));
}

if (!localStorage.getItem('dg_msgs')) {
  localStorage.setItem('dg_msgs', JSON.stringify([]));
}

// 3. Database Utility Wrappers
function getCfg() { return JSON.parse(localStorage.getItem('dg_cfg')); }
function saveCfg(cfg) { localStorage.setItem('dg_cfg', JSON.stringify(cfg)); }
function getUsers() { return JSON.parse(localStorage.getItem('dg_users')); }
function saveUsers(arr) { localStorage.setItem('dg_users', JSON.stringify(arr)); }
function getHistory() { return JSON.parse(localStorage.getItem('dg_history')); }
function saveHistory(arr) { localStorage.setItem('dg_history', JSON.stringify(arr)); }
function getMessages() { return JSON.parse(localStorage.getItem('dg_msgs')); }
function saveMessages(arr) { localStorage.setItem('dg_msgs', JSON.stringify(arr)); }

// 4. Client Session Access Verification Hooks
function currentUser() {
  const session = JSON.parse(sessionStorage.getItem('dg_sess'));
  if (!session) return null;
  return getUsers().find(user => user.id === session.id) || null;
}

function updateUser(id, updatedFields) {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedFields };
    saveUsers(users);
  }
}

function requireAuth() {
  if (!currentUser()) { window.location.href = 'login.html'; }
}

function requireAdmin() {
  const user = currentUser();
  if (!user || user.role !== 'admin') { window.location.href = 'login.html'; }
}

function logout() {
  sessionStorage.removeItem('dg_sess');
  window.location.href = 'index.html';
}

// 5. Global Message Log System Pipeline
function saveMessage(senderName, senderEmail, subject, bodyText) {
  const msgs = getMessages();
  msgs.push({
    id: "msg_" + Date.now(),
    from: senderName,
    email: senderEmail,
    subject: subject,
    body: bodyText,
    time: Date.now(),
    read: false,
    starred: false,
    archived: false
  });
  saveMessages(msgs);
}

// 6. Common Notification Toast Framework
function showToast(text, type = "ok") {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type === 'ok' ? '✓' : '✗'}</span><div>${text}</div>`;
  container.appendChild(el);
  setTimeout(() => { el.remove(); }, 4000);
}
