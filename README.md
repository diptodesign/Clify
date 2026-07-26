<p align="center">
  <img src="https://img.shields.io/badge/Version-16.0.0-brightgreen" alt="Version">
  <img src="https://img.shields.io/badge/Open%20Source-MIT-blue" alt="MIT License">
  <img src="https://img.shields.io/badge/Manifest-V3-yellow" alt="Manifest V3">
  <img src="https://img.shields.io/badge/32%20Languages-Supported-red" alt="32 Languages">
  <img src="https://img.shields.io/badge/35%2B-Tools-purple" alt="35+ Tools">
</p>

<p align="center">
  <img src="https://i.ibb.co.com/ynVThcLq/logo.png" alt="Clify Logo" width="128" height="128">
</p>

<h1 align="center">Clify (Formerly Zap)</h1>

<p align="center">
  <strong>YouTube, Uncluttered.</strong><br>
  Free, open-source YouTube blocker with 5-layer ad blocking, Shorts removal, SponsorBlock, audio equalizer, age-gate bypass, and 35+ focus tools. Manual install, 100% private.
</p>

<p align="center">
  <a href="https://diptodesign.github.io/clifydl">Landing Page</a> ·
  <a href="https://github.com/diptodesign/Clify/releases">Download</a> ·
  <a href="https://www.producthunt.com/products/clify-formerly-zap">Product Hunt</a>
</p>

---

## Features

### 5-Layer Ad Blocker
uBlock Origin-level protection built specifically for YouTube.
- **Layer 1**: `declarativeNetRequest` — 300+ static filter rules (block, redirect, header modify)
- **Layer 2**: DOM removal — Scans every 600ms for 180+ ad selectors across 15 categories
- **Layer 3**: Network interception — `fetch`/`XHR` hook with 120+ ad domains + 20+ regex URL patterns
- **Layer 4**: Scriptlet injection — Anti-adblock bypass, ad detection flag overrides, nag popup blocking
- **Layer 5**: Procedural cosmetic filtering — Text-content-based element hiding

### Shorts Remover
Completely removes YouTube Shorts from your feed, sidebar, search results, and dedicated tab. Reclaims your attention from algorithmic short-form content.

### SponsorBlock Integration
Skips sponsored segments, intros, outros, highlight reels, and filler with community-powered data.
- 3-URL fallback chain for reliability
- Smart outro detection with progress bar visualization
- Verified segment preference and segment merging
- **Default ON** — works out of the box

### Audio Equalizer
5-band Web Audio API equalizer with real-time control.
- Bands: 60Hz (bass), 250Hz, 1kHz, 4kHz, 12kHz (treble)
- 9 presets: Flat, Bass Boost, Treble Boost, Vocal, Rock, Electronic, Classical, Podcast, Custom
- Per-band sliders (-12dB to +12dB) in the dashboard
- Gains persist across sessions

### Age-Gate Bypass
Automatically bypasses age verification screens, consent dialogs, and "Sign in to confirm" prompts. Clicks proceed buttons, removes overlays, and force-shows the video player.

### Live Stream Cleaner
Hide distracting elements during live streams.
- Hide live chat panel
- Hide Super Chat donations
- Hide member badges and tickers
- All toggles independently configurable

### Channel Manager
Block or allow specific channels with full-screen visual overlays on both search results and watch pages.
- Add by channel name, URL, or channel ID
- Intelligent search with `extractChannelIdFromInput()`
- Normalized comparison for consistent matching
- Block counter badge on the extension icon

### Keyword Manager
Filter videos by title content with advanced matching.
- One keyword per line or comma-separated
- Pipe `|` for synonyms: `movie|film|cinema|picture`
- Supports 32 languages simultaneously
- 5,000+ keywords supported
- Crown icon badge in the help section

### Watch Later Queue
Queue videos for later viewing with a built-in playlist manager.

### Scheduled Blocking
Set custom time-based schedules for when blocking is active. Focus mode during work hours, relaxed mode on weekends.

### Content Density Meter
Analyzes video metadata to calculate a quality score. Rolling 20-video window tracks your consumption patterns with color-coded badges (green/yellow/red).

### Monetization Badge
Detects channel monetization status using 7 detection methods. Displays a filled pill badge with SVG icon directly on video thumbnails.

### Language Block
Blocks content in specific languages using Unicode script detection (22 scripts + Latin) with title-only filtering fallback.

### Picture-in-Picture Button
Native-styled PiP toggle button injected into the YouTube player controls. Uses Tabler icon SVG with 2-second re-inject interval for reliability.

---

## Dashboard

Tabbed interface with 4 sections:
- **Dashboard** — Stats overview, daily/weekly blocking charts, time saved, channel scores
- **Blocked** — Sub-tabs for Videos, Channels, Keywords, and Watch Later management
- **Protection** — Sub-tabs for Ad Blocker config, More Features (Shorts, SponsorBlock, Age-Gate, Live Stream, PiP), and Language blocking
- **Stats** — Usage statistics with weekly activity chart

Features:
- Dark/light theme (neutral black `#0a0a0f` dark, solid white light)
- All settings auto-save to `chrome.storage.sync`
- 32-language translation system with RTL support
- Tabler Icons bundled locally (no CDN)

---

## Internationalization

Full UI translation in **32 languages**:
English, Spanish, French, German, Italian, Portuguese, Arabic, Hindi, Bengali, Chinese (Simplified & Traditional), Japanese, Korean, Russian, Turkish, Polish, Dutch, Vietnamese, Indonesian, Malay, Swedish, Norwegian, Danish, Finnish, Czech, Romanian, Ukrainian, Hebrew, Swahili, Tamil, Telugu, Thai, Greek.

---

## Installation

### Manual Install (Chrome / Chromium)
1. Download the [latest release](https://github.com/diptodesign/Clify/releases) ZIP
2. Extract the ZIP file
3. Open `chrome://extensions/`
4. Enable **Developer mode** (top right toggle)
5. Click **Load unpacked** and select the extracted folder
6. Pin the extension and open the dashboard

### Android (Kiwi Browser / Quetta Browser)
1. Download the release ZIP on your phone
2. Extract using a file manager
3. Open Kiwi or Quetta Browser → `chrome://extensions/`
4. Enable Developer mode → **Load unpacked** → select the folder
5. Browse YouTube with full Clify support

### Supported Browsers
Chrome, Edge, Brave, Opera, Vivaldi, Arc, Kiwi, Quetta, Firefox, Firefox Android, Yandex, Samsung Internet, Ungoogled Chromium, Thorium, and all other Chromium-based browsers.

---

## Project Structure

```
Clify 21 C/
├── manifest.json          # Manifest V3 configuration
├── background.js          # Service worker, declarativeNetRequest rules, notifications
├── content.js             # YouTube content script (ad blocker, features, DOM manipulation)
├── dashboard.html         # Dashboard UI (4 tabs, 32 language blocks)
├── dashboard.css          # Dashboard styles (dark/light theme, glassmorphism)
├── dashboard.js           # Dashboard logic, settings persistence, i18n system
├── attribution.js         # Developer attribution
├── ownership.js           # Ownership verification
├── icons/                 # Extension icons (16x16 to 128x128)
├── fonts/                 # Bundled Tabler Icons fonts
├── tabler-icons.min.css   # Tabler Icons stylesheet (local, no CDN)
├── logo.png               # Custom logo
├── vendor/                # Third-party dependencies
├── admin/                 # Admin panel
├── DEVELOPER.txt          # Developer info
├── LEGAL.md               # Legal notices
└── PRIVACY.md             # Privacy policy
```

---

## Privacy

Clify respects your privacy:
- **Local processing** — All keyword matching and blocking happens in your browser
- **No telemetry** — Zero analytics, tracking, or data collection
- **No servers** — All data stored in `chrome.storage.local` / `chrome.storage.sync`
- **Open source** — Fully transparent codebase, audit anytime
- **Optional newsletter** — Email signup is completely separate and optional

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Platform | Chrome Extension (Manifest V3) |
| Ad Blocking | `declarativeNetRequest` + DOM removal + `fetch`/XHR interception + scriptlet injection |
| Audio | Web Audio API (5 `BiquadFilterNode` bands) |
| SponsorBlock | REST API with 3-URL fallback chain |
| UI Framework | Vanilla JS, CSS Custom Properties |
| Icons | Tabler Icons (bundled locally) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |
| Notifications | Telegram Bot API (opt-in) |

---

## Contributing

We welcome contributions:
- **Code** — Fix bugs, add features, improve performance
- **Translations** — Help translate to more languages (32 supported, room for more)
- **Testing** — Report bugs with steps to reproduce
- **Design** — Improve UI/UX, suggest new features

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on YouTube with the extension loaded
5. Submit a pull request

---

## Changelog

| Version | Highlights |
|---------|-----------|
| **v16.0.0** | Age-Gate Bypass, Audio Equalizer (5-band, 9 presets), Live Stream Cleaner, custom logo, footer tooltip morph animation |
| **v15.0.0** | Sub-tabs in Blocked & Protection tabs, Usage Stats redesign, Watch Later empty state, Mojibake encoding fixes |
| **v14.0.0** | Content Density Meter, Monetization Badge, Language Block (22 scripts), PiP Button, Channel blocking overlays |
| **v13.0.0** | uBlock Origin-level ad blocker upgrade (180+ selectors, 120+ domains, scriptlet injection) |
| **v12.0.0** | Dashboard tab merger (8→4), SponsorBlock improvements (3-URL fallback, smart outro), Dashboard settings persistence |
| **v11.0.0** | Changelog redesign (timeline), Product Hunt badge, Usage Stats charts |
| **v10.0.0** | Live Stream Cleaner config, Keyword Pack badge, Footer restructured |
| **v9.0.0** | Notification system (Telegram), Admin panel, Channel Manager visual redesign |
| **v8.0.0** | Tabler Icons bundled locally, BOM fix, Dark/Light theme refinement |

---

## License

MIT License — do whatever you want.

---

## Credits

Built with:
- [SponsorBlock API](https://github.com/nicehash/SponsorBlock) — Community-powered sponsor segment data
- [Tabler Icons](https://tabler.io/icons) — 3,800+ MIT-licensed icons
- [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Open-source typefaces
- [Chrome DeclarativeNetRequest API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/) — Manifest V3 network filtering
- [Web Audio API](https://web.dev/audio/) — Real-time audio equalization

---

<p align="center">
  Made by <strong>Dipto Design Studio</strong>
</p>
