// ZoomTranslate — Content Script
// Injected into Zoom/Meet/Teams pages
// Renders subtitle overlay and communicates with background

(function () {
  if (window.__zoomTranslateInjected) return;
  window.__zoomTranslateInjected = true;

  // Create subtitle overlay
  const overlay = document.createElement('div');
  overlay.id = 'zt-overlay';
  overlay.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    max-width: 800px;
    width: 90vw;
    pointer-events: none;
    font-family: 'Inter', -apple-system, sans-serif;
  `;
  document.body.appendChild(overlay);

  function showSubtitle(text, isTranslation = false) {
    const line = document.createElement('div');
    line.style.cssText = `
      background: ${isTranslation ? 'rgba(1,105,111,0.92)' : 'rgba(0,0,0,0.82)'};
      color: #fff;
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 16px;
      line-height: 1.5;
      margin-top: 4px;
      text-align: center;
      animation: ztFadeIn 0.2s ease;
      box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    `;
    line.textContent = (isTranslation ? '🌐 ' : '🎙️ ') + text;
    overlay.appendChild(line);
    setTimeout(() => line.remove(), 6000);
  }

  // Listen for messages from popup/background
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SUBTITLE') showSubtitle(msg.text, false);
    if (msg.type === 'TRANSLATION') showSubtitle(msg.text, true);
  });

  // Inject CSS animation
  const style = document.createElement('style');
  style.textContent = '@keyframes ztFadeIn { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:none } }';
  document.head.appendChild(style);
})();
