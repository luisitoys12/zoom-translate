// ZoomTranslate — Background Service Worker (MV3)
// Handles tab audio capture and message routing

let captureStream = null;
let recognition = null;
let sessionId = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  switch (msg.type) {
    case 'START_CAPTURE':
      startCapture(msg.tabId, msg.config).then(sendResponse);
      return true;
    case 'STOP_CAPTURE':
      stopCapture();
      sendResponse({ ok: true });
      break;
    case 'GET_STATUS':
      sendResponse({ active: !!captureStream, sessionId });
      break;
  }
});

async function startCapture(tabId, config) {
  try {
    // tabCapture API: capture audio from the meeting tab
    captureStream = await new Promise((resolve, reject) => {
      chrome.tabCapture.capture(
        { audio: true, video: false },
        (stream) => {
          if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
          else resolve(stream);
        }
      );
    });

    sessionId = config.sessionId || crypto.randomUUID();

    // Notify popup that capture started
    chrome.runtime.sendMessage({ type: 'CAPTURE_STARTED', sessionId });
    return { ok: true, sessionId };
  } catch (err) {
    console.error('[ZoomTranslate] Capture error:', err);
    return { ok: false, error: err.message };
  }
}

function stopCapture() {
  if (captureStream) {
    captureStream.getTracks().forEach(t => t.stop());
    captureStream = null;
  }
  sessionId = null;
  chrome.runtime.sendMessage({ type: 'CAPTURE_STOPPED' });
}
