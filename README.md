# Clify (Formerly Zap) - YouTube Content Blocker

<p align="center">
  <img src="https://img.shields.io/badge/Version-8.0.0-brightgreen" alt="Version">
  <img src="https://img.shields.io/badge/Chrome-Extension-yellow" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/Open%20Source-❤️-white" alt="Open Source">
  <img src="https://img.shields.io/badge/35+ Languages-International-red" alt="35+ Languages">
</p>

<p align="center">
  <img src="https://i.ibb.co.com/Y4NsF008/icon128.png" alt="Clify Logo" width="128" height="128">
</p>

**Clify** is a powerful browser extension that helps you take control of your YouTube experience by automatically hiding distracting content like Shorts, clickbait videos, and unwanted content based on your preferences.

## ✨ Features

### 🛡️ Core Blocking
- **Automatic Keyword Filtering**: Block videos containing specific keywords or phrases
- **YouTube Shorts Removal**: Automatically remove all Shorts from your feed
- **Multi-language Support**: Supports 35+ languages for keyword filtering
- **Manual Blocking**: One-click blocking directly from YouTube
- **Language-based Filtering**: Block content in specific languages

### 📊 Smart Dashboard
- **Real-time Analytics**: Track your blocking activity with detailed stats
- **Search & Filter**: Powerful search with filtering and sorting options
- **Keyword Manager**: Easy keyword management with multi-language support
- **Export Functionality**: Export your blocked videos list as JSON

### 🎨 Enhanced Experience
- **uBlock Origin Lite Integration**: Works seamlessly with uBlock for ad blocking
- **Playback Controls**: Customize playback speed and theater mode
- **Annotation Removal**: Remove annotations and info cards
- **Modern UI**: Beautiful dark/light theme with intuitive interface
- **Telegram Integration**: Admin notifications and support messages

### 🌍 International Support
Supports 35+ languages including:
- English, Spanish, French, German, Italian, Portuguese
- Arabic, Hindi, Bengali, Chinese, Japanese, Korean
- Russian, Turkish, Polish, Dutch, Vietnamese, and many more!

## 📦 Installation

### From Chrome Web Store
1. Visit [Clify on Chrome Web Store](https://chromewebstore.google.com/detail/clify/your-extension-id)
2. Click "Add to Chrome"
3. Pin the extension for easy access

### Manual Installation (Developer)
1. Clone this repository:
   ```bash
   git clone https://github.com/diptodesign/clify.git

   Open Chrome and go to chrome://extensions/

Enable "Developer mode" (top right)

Click "Load unpacked" and select the cloned directory

The extension will be installed and ready to use

🚀 Quick Start
Install the extension from Chrome Web Store

Click on the Clify icon in your toolbar to open the dashboard

Add Keywords: Go to Keywords tab and add keywords you want to block

Enable Features: Toggle Shorts removal, annotation blocking, etc.

Browse YouTube: The extension will automatically filter content

🛠️ Development
Project Structure
text
clify/
├── manifest.json          # Extension configuration
├── background.js         # Background service worker
├── content.js           # YouTube content script
├── dashboard.html       # Main dashboard UI
├── dashboard.css        # Dashboard styles
├── dashboard.js         # Dashboard functionality
├── icons/              # Extension icons (16x16 to 128x128)
└── README.md           # This file
Building from Source
Ensure you have Node.js installed

Clone the repository

Install dependencies (if any)

Load the unpacked extension in Chrome

Contributing
We welcome contributions! Please see our Contributing Guide for details.

📖 Usage Guide
Keyword Management
Enter one keyword per line or separate with commas

Use pipe | for synonyms: movie|فيلم|फिल्म|সিনেমা

Supports multiple languages simultaneously

Maximum 5000+ keywords supported

Blocked Videos Management
Search through blocked videos with advanced filters

Export your blocked list as JSON

Unblock individual videos or clear all

View detailed statistics and analytics

Enhanced Features
Shorts Removal: Toggle on/off in Enhanced Features tab

Playback Controls: Set default playback speed

uBlock Integration: Works alongside uBlock Origin Lite

Theme: Switch between dark and light modes

🔒 Privacy & Security
Clify respects your privacy:

Local Processing: All keyword matching happens locally in your browser

No Tracking: We don't track your browsing history

Telegram Opt-in: Telegram integration is optional and requires your consent

Open Source: Fully transparent codebase

For more details, see our Security Policy.

📞 Support
Need Help?
Check the Support tab in the dashboard

Join our Telegram Channel

Report issues on GitHub Issues

Found a Bug?
Please report it with:

Steps to reproduce

Expected behavior

Actual behavior

Screenshots if possible

🤝 Contributing
We welcome contributions of all kinds:

Code: Fix bugs, add features, improve performance

Translations: Help translate to more languages

Documentation: Improve documentation and guides

Testing: Report bugs and test new features
