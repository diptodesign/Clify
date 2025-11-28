# Clify - YouTube Blocker & Enhancer

> Take control of your YouTube experience by blocking unwanted content automatically

![Version](https://img.shields.io/badge/version-7.0.0-brightgreen)
![Chrome](https://img.shields.io/badge/chrome-%3E%3D88-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🚀 Overview

Clify is a powerful browser extension that helps you take control of your YouTube experience by automatically blocking unwanted content, removing distractions, and enhancing your viewing experience.

## ✨ Features

### 🛡️ Content Blocking
- **Automatic Keyword Blocking**: Block videos containing specific keywords or phrases
- **Manual Blocking**: One-click blocking of individual videos
- **Shorts Removal**: Automatically remove YouTube Shorts from your feed and navigation
- **Multi-language Support**: Supports keywords in multiple languages (English, Arabic, Hindi, Bangla, etc.)

### 🎯 Enhanced Experience
- **Smart Shorts Detection**: Advanced detection and removal of Shorts content
- **Annotation Removal**: Remove annotations, info cards, and end screens
- **uBlock Origin Integration**: Seamless integration with uBlock Origin Lite
- **Playback Controls**: Customize playback speed and video settings

### 📊 Analytics & Management
- **Dashboard**: Comprehensive statistics and activity tracking
- **Search & Filter**: Advanced search through blocked videos with multiple filters
- **Export Data**: Export your blocked videos list for backup
- **Capacity Management**: Monitor your storage usage (5000 video limit)

### 🌐 Multi-language Support
- **12 Languages**: English, Español, Français, Deutsch, हिन्दी, 日本語, 한국어, Português, العربية, বাংলা, Русский, 中文
- **Localized Interface**: Complete translation of all interface elements

## 📦 Installation

### Chrome Web Store
1. Visit the Chrome Web Store
2. Search for "Clify - YouTube Blocker"
3. Click "Add to Chrome"

### Manual Installation
1. Download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder

## 🎯 Usage

### Basic Blocking
- **Manual Blocking**: Click the "HIDE" button that appears on YouTube video thumbnails
- **Keyword Blocking**: Add keywords in the Keywords tab to automatically block matching videos
- **Shorts Removal**: Toggle Shorts removal in the Clify Extra tab

### Dashboard Features
- **Dashboard Tab**: View your blocking statistics and recent activity
- **Blocked Videos Tab**: Manage all blocked videos with advanced search and filtering
- **Keywords Tab**: Add and manage blocking keywords
- **Clify Extra Tab**: Enhanced features and settings
- **Support Tab**: Get help and contact support

### Advanced Features
- **Multi-language Keywords**: Use pipe `|` for synonyms: `movie|فيلم|फिल्म|সিনেমা`
- **Quick Actions**: Use the floating action button for quick access to common actions
- **Export/Import**: Backup your blocked videos and settings
- **Theme Support**: Switch between dark and light themes

## ⚙️ Configuration

### Enhanced Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Shorts Removal | Automatically remove YouTube Shorts | Enabled |
| Annotation Removal | Remove video annotations and cards | Enabled |
| Playback Speed | Customize video playback speed | 1.0x |
| Theater Mode | Always use theater mode | Disabled |
| Auto-play | Disable auto-play next video | Disabled |

### Storage Management
- **Capacity Monitoring**: Track your blocked videos storage (5000 video limit)
- **Clear All**: Remove all blocked videos when needed
- **Export Data**: Backup your blocking data as JSON file

## 🔧 Technical Details

### Browser Support
- Google Chrome (recommended)
- Microsoft Edge
- Other Chromium-based browsers

### Permissions
- **Storage**: Save your preferences and blocked videos
- **YouTube Access**: Modify YouTube page content
- **Notifications**: Show system notifications
- **Telegram API**: For support messages (optional)

### Privacy
- **Local Processing**: All blocking happens locally in your browser
- **No Data Collection**: No personal data is sent to external servers
- **Optional Telemetry**: Support messages via Telegram are optional

## 🆘 Support

### Getting Help
- **In-app Support**: Use the Support tab to contact us
- **Documentation**: Comprehensive help resources within the extension
- **Telegram Channel**: Join [@Clifybydd](https://t.me/Clifybydd) for updates and support

### Troubleshooting
- **Refresh Data**: Use the refresh button if data seems outdated
- **Clear Cache**: Use "Clear All" if experiencing issues
- **Reinstall**: As a last resort, reinstall the extension

## 🔄 Updates

Clify automatically checks for updates and notifies you of new features and improvements. Major updates are announced in the Telegram channel.

## 📁 File Structure
clify-extension/
├── manifest.json # Extension manifest
├── background.js # Background service worker
├── content.js # YouTube content script
├── dashboard.html # Options page UI
├── dashboard.js # Options page functionality
├── dashboard.css # Styling for dashboard
├── supabase-storage.js # Cloud storage integration
└── icons/ # Extension icons
├── icon16.png
├── icon32.png
├── icon48.png
└── icon128.png

## 🛠️ Development

### Building from Source
1. Clone the repository
2. Load the extension in developer mode
3. Make changes to the source files
4. Test on YouTube pages

### Key Components
- **Content Script**: Handles video detection and blocking on YouTube
- **Background Script**: Manages extension lifecycle and messaging
- **Dashboard**: Provides user interface for configuration and analytics
- **Storage**: Manages local and cloud storage for user data

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

Copyright © 2025 Clify - YouTube Content Blocker. All rights reserved.

This extension is not affiliated with YouTube or Google.

---

**Made with ❤️ for a focused YouTube experience**
