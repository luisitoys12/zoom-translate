// ZoomTranslate Popup Script

let isActive = false;

const mainBtn = document.getElementById('mainBtn');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const apiKeyInput = document.getElementById('apiKey');
const sourceLangSelect = document.getElementById('sourceLang');
const targetLangSelect = document.getElementById('targetLang');
const sessionIdInput = document.getElementById('sessionId');

// Load saved config
chrome.storage.local.get(['apiKey', 'sourceLang', 'targetLang', 'sessionId'], (cfg) => {
  if (cfg.apiKey) apiKeyInput.value = cfg.apiKey;
  if (cfg.sourceLang) sourceLangSelect.value = cfg.sourceLang;
  if (cfg.targetLang) targetLangSelect.value = cfg.targetLang;
  if (cfg.sessionId) sessionIdInput.value = cfg.sessionId;
});

// Save config
document.getElementById('saveBtn').addEventListener('click', () => {
  chrome.storage.local.set({
    apiKey: apiKeyInput.value.trim(),
    sourceLang: sourceLangSelect.value,
    targetLang: targetLangSelect.value
  });
  statusText.textContent = 'Configuración guardada ✓';
  setTimeout(() => { statusText.textContent = isActive ? 'Escuchando...' : 'Listo'; }, 2000);
});

// Copy session link
document.getElementById('copySession').addEventListener('click', () => {
  const sid = sessionIdInput.value;
  if (!sid) return;
  const url = `https://luisitoys12.github.io/zoom-translate/session/${sid}`;
  navigator.clipboard.writeText(url);
  statusText.textContent = 'Link copiado ✓';
  setTimeout(() => { statusText.textContent = 'Listo'; }, 2000);
});

// Main toggle
mainBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!isActive) {
    const cfg = {
      apiKey: apiKeyInput.value.trim(),
      sourceLang: sourceLangSelect.value,
      targetLang: targetLangSelect.value,
      sessionId: crypto.randomUUID()
    };
    sessionIdInput.value = cfg.sessionId;
    chrome.storage.local.set({ sessionId: cfg.sessionId });
    const res = await chrome.runtime.sendMessage({ type: 'START_CAPTURE', tabId: tab.id, config: cfg });
    if (res?.ok) {
      isActive = true;
      mainBtn.textContent = '⏹ Detener';
      mainBtn.classList.add('stop');
      statusDot.classList.add('on');
      statusText.textContent = 'Escuchando...';
    } else {
      statusText.textContent = 'Error: ' + (res?.error || 'desconocido');
    }
  } else {
    await chrome.runtime.sendMessage({ type: 'STOP_CAPTURE' });
    isActive = false;
    mainBtn.textContent = '▶ Iniciar';
    mainBtn.classList.remove('stop');
    statusDot.classList.remove('on');
    statusText.textContent = 'Detenido';
  }
});

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});
