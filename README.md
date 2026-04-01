# 🎙️ ZoomTranslate — Open Source Real-Time Meeting Translator

> Translate any meeting in real time. Free. Open source. No limits.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome)](extension/)
[![Built with Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase)](https://supabase.com)
[![GitHub Pages](https://img.shields.io/badge/Web-GitHub%20Pages-222?logo=github)](https://luisitoys12.github.io/zoom-translate)

ZoomTranslate is a **free, open source alternative** to Kudo, Interprefy and Wordly. It runs as a Chrome extension that listens to any browser-based meeting (Zoom, Google Meet, Microsoft Teams) and provides real-time translation and transcription — no server required for basic use.

---

## ✨ Features

- 🎙️ **Real-time transcription** via Web Speech API (free, in-browser)
- 🌐 **Live translation** ES ↔ EN ↔ FR ↔ PT ↔ DE ↔ JA via Google Translate API
- 👥 **Shared sessions** — share a link so others see your subtitles live
- 📋 **Meeting history** stored in Supabase
- 🔗 **Guest link** — viewers don't need to install anything
- 🎭 **Zoom Virtual Member mode** — joins as a participant and shows subtitles
- 📤 **Export** transcripts as `.txt`, `.srt`, `.docx`
- 🌙 **Dark mode** + full i18n (ES/EN)
- 🔒 **Privacy first** — audio never leaves your device

---

## 🗂️ Project Structure

```
zoom-translate/
├── extension/          # Chrome Extension (Manifest V3)
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   └── popup/
├── web/                # Next.js web app → GitHub Pages
│   ├── app/
│   └── components/
├── packages/
│   ├── core/           # Shared translation/transcription logic
│   └── supabase/       # Supabase client + generated types
├── docs/               # GitHub Pages landing site
├── supabase/
│   └── migrations/     # Database schema
└── .github/
    └── workflows/      # CI/CD pipelines
```

---

## 🚀 Quick Start

### Chrome Extension

1. Clone this repo: `git clone https://github.com/luisitoys12/zoom-translate.git`
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked** → select the `extension/` folder
5. Add your Google Translate API key in the extension settings

### Web App (local dev)

```bash
cd web
pnpm install
cp .env.example .env.local   # fill in your keys
pnpm dev
```

---

## 🌐 Live Demo

**Landing + Web App:** https://luisitoys12.github.io/zoom-translate

---

## 🔧 Environment Variables

See [`.env.example`](web/.env.example) for the full list.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `GOOGLE_TRANSLATE_API_KEY` | Google Cloud Translate API key |

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). All contributions welcome!

---

## 📄 License

[MIT](LICENSE) © 2026 Luis Martinez Sandoval / cush media
