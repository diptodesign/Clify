// dashboard.js - COMPLETE WITH ENHANCED SEARCH SYSTEM v7.0.0
const VERSION = "v7.0.0";

// Telegram Bot Configuration
const TELEGRAM_CONFIG = {
    botToken: '8212863269:AAHPgozAhRbZdv1r_WoNV9KasvZr8_fQKZU',
    storageChannelId: '-1003293692757',
    supportChannelId: '-1003070250785',
    adminChannelId: '-1003464260094',
    publicChannel: '@Clifybydd',
    apiUrl: 'https://api.telegram.org/bot'
};

// Complete translations
const TRANSLATIONS = {
    en: {
        'welcome-title': 'Welcome to Clify! ⚡',
        'welcome-subtitle': 'Take control of your YouTube experience by blocking unwanted content automatically',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Blocked Videos',
        'tab-keywords': 'Keywords',
        'tab-support': 'Support',
        'refresh-text': 'Refresh',
        'theme-text': 'Theme',
        'stat-today': 'Today\'s Blocks',
        'stat-total': 'Total Blocked',
        'stat-efficiency': 'Efficiency',
        'activity-title': 'Blocking Activity',
        'activity-subtitle': 'Last 30 days',
        'stat-keywords': 'Active Keywords',
        'stat-manual': 'Manual Blocks',
        'stat-auto': 'Auto Blocks',
        'stat-shorts': 'Shorts Blocked',
        'stat-lang': 'Language Blocks',
        'recent-title': 'Recently Blocked',
        'view-all-btn': 'View All',
        'blocked-title': 'Blocked Videos',
        'blocked-subtitle': 'Manage all videos you\'ve blocked from your YouTube feed',
        'col-title': 'Video Title',
        'col-id': 'Video ID',
        'col-reason': 'Reason',
        'col-date': 'Date Blocked',
        'col-actions': 'Actions',
        'filter-all': 'All Reasons',
        'filter-manual': 'Manual Block',
        'filter-keyword': 'Keyword Match',
        'filter-shorts': 'Shorts',
        'filter-language': 'Language',
        'sort-newest': 'Newest First',
        'sort-oldest': 'Oldest First',
        'sort-title': 'Title A-Z',
        'export-btn': 'Export',
        'clear-all-btn': 'Clear All',
        'loading-text': 'Loading your blocked videos...',
        'empty-title': 'No videos blocked yet',
        'empty-subtitle': 'Start cleaning up your YouTube experience by blocking unwanted videos',
        'empty-action': 'Add Keywords for Auto-Blocking',
        'keywords-title': 'Keyword Manager',
        'keywords-subtitle': 'Automatically block videos containing specific keywords or phrases',
        'save-keywords': 'Save Keywords',
        'clear-keywords': 'Clear All',
        'keywords-count-label': 'Keywords Count:',
        'keywords-format-label': 'Format:',
        'help-title': 'How to use keywords',
        'help-line1': 'Enter one keyword per line or separate with commas',
        'help-line2': 'Use specific phrases for better accuracy',
        'help-line3': 'Keywords are case-insensitive',
        'help-line4': 'Supports multiple languages: English, Arabic, Hindi, Bangla, etc.',
        'help-line5': 'Use pipe | for synonyms: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximum 2000 keywords supported',
        'support-title': 'Support & Help',
        'support-subtitle': 'Get help, report issues, and learn how to use Clify effectively',
        'contact-title': 'Contact Support',
        'contact-subtitle': 'Having issues or suggestions? We\'re here to help you get the most out of Clify.',
        'name-label': 'Your Name *',
        'email-label': 'Your Email *',
        'category-label': 'Issue Category *',
        'category-bug': 'Bug Report',
        'category-feature': 'Feature Request',
        'category-help': 'Help Needed',
        'category-suggestion': 'Suggestion',
        'category-other': 'Other',
        'message-label': 'Your Message *',
        'send-message': 'Send Message',
        'sending-message': 'Sending...',
        'resources-title': 'Help Resources',
        'resource-faq': 'FAQ & Troubleshooting',
        'resource-faq-desc': 'Common questions and solutions',
        'resource-guide': 'User Guide',
        'resource-guide-desc': 'Learn how to use all features',
        'resource-bugs': 'Report Bugs',
        'resource-bugs-desc': 'Found an issue? Let us know',
        'resource-features': 'Suggest Features',
        'resource-features-desc': 'Share your ideas for improvement',
        'about-title': 'About Clify',
        'version-text': 'Version:',
        'about-description': 'Clify helps you stay focused by hiding distracting YouTube content. It works locally in your browser and respects your privacy - no data is sent to external servers.',
        'feature-privacy': 'Privacy First',
        'feature-fast': 'Lightning Fast',
        'feature-realtime': 'Real-time Blocking',
        'footer-made': 'Made with ❤️ for a focused YouTube experience',
        'validation-required': 'Please fill in all required fields.',
        'validation-message-length': 'Please provide a more detailed message (at least 10 characters).',
        'contact-success-telegram': 'Thank you! Your message has been sent to our support team via Telegram. We will get back to you soon.',
        'contact-success-local': 'Thank you! Your message has been saved. We will review it when connected to the internet.',
        'contact-error': 'Sorry, there was an error sending your message. Please try again later or contact us directly.',
        'capacity-text': 'Your Storage',
        'capacity-normal': 'Your storage is looking great! Keep blocking those annoying videos. 😊',
        'capacity-warning': 'Heads up! Storage getting full ({percent}%) 📦',
        'capacity-critical': 'Alert! Storage full ({percent}%) 🚨',
        'capacity-full': 'Hey! Your storage is completely full. You need to clear some videos to block new ones. 🚨',
        'capacity-warning-full': 'Heads up! Storage nearly full ({percent}%) - consider clearing some videos',
        'telegram-connected': 'Connected to Telegram',
        'telegram-disconnected': 'Telegram Disconnected',
        'telegram-message-sent': 'Telegram connection test successful!',
        'test-success': 'Test Successful',
        'test-failed': 'Test Failed',
        'days-ago': 'days ago',
        'hours-ago': 'hours ago',
        'minutes-ago': 'minutes ago',
        'just-now': 'Just now',
        'results-text': 'videos'
    }
};

// Global state
let currentLanguage = 'en';
let blockedLanguages = [];
let searchCache = [];

// Enhanced Search System
class EnhancedSearch {
    constructor() {
        this.searchIndex = new Map();
        this.fuse = null;
        this.isIndexed = false;
        this.searchCache = new Map();
        this.debounceTimer = null;
    }

    async initialize() {
        await this.buildSearchIndex();
        this.initializeFuzzySearch();
        console.log('Enhanced search system initialized');
    }

    async buildSearchIndex() {
        try {
            const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
            const blockedVideos = response?.blockedVideosMap || {};
            
            this.searchIndex.clear();
            
            Object.values(blockedVideos).forEach((video, index) => {
                const searchableText = this.normalizeText(
                    `${video.title} ${video.id} ${video.reason} ${video.timestamp}`
                );
                
                this.searchIndex.set(index, {
                    id: video.id,
                    title: video.title,
                    videoId: video.id,
                    reason: video.reason,
                    timestamp: video.timestamp,
                    ts: video.ts,
                    searchableText: searchableText,
                    originalData: video
                });
            });
            
            this.isIndexed = true;
            console.log(`Search index built with ${this.searchIndex.size} items`);
            
        } catch (error) {
            console.error('Error building search index:', error);
        }
    }

    initializeFuzzySearch() {
        // Simple fuzzy search implementation
        this.fuse = {
            search: (query, items, options = {}) => {
                const normalizedQuery = this.normalizeText(query);
                if (!normalizedQuery) return items;

                const results = [];
                const threshold = options.threshold || 0.3;

                items.forEach((item, index) => {
                    const score = this.calculateSimilarity(normalizedQuery, item.searchableText);
                    if (score >= threshold) {
                        results.push({
                            item: item,
                            score: score,
                            index: index
                        });
                    }
                });

                // Sort by score (descending)
                return results.sort((a, b) => b.score - a.score).map(result => result.item);
            }
        };
    }

    normalizeText(text) {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim();
    }

    calculateSimilarity(query, text) {
        if (query === text) return 1.0;
        if (text.includes(query)) return 0.8;
        
        const queryWords = query.split(' ');
        const textWords = text.split(' ');
        
        let matches = 0;
        queryWords.forEach(qWord => {
            if (textWords.some(tWord => tWord.includes(qWord) || qWord.includes(tWord))) {
                matches++;
            }
        });
        
        return matches / queryWords.length;
    }

    search(query, filters = {}) {
        if (!this.isIndexed || !query.trim()) {
            return this.getAllVideos(filters);
        }

        const cacheKey = `${query}-${JSON.stringify(filters)}`;
        if (this.searchCache.has(cacheKey)) {
            return this.searchCache.get(cacheKey);
        }

        const normalizedQuery = this.normalizeText(query);
        const allItems = Array.from(this.searchIndex.values());
        
        // Apply filters first
        let filteredItems = this.applyFilters(allItems, filters);
        
        // Then search
        let results = this.fuse.search(normalizedQuery, filteredItems);
        
        // If no fuzzy results, try partial matching
        if (results.length === 0) {
            results = this.partialMatchSearch(normalizedQuery, filteredItems);
        }

        // Sort results
        results = this.sortResults(results, filters.sortBy || 'newest');

        this.searchCache.set(cacheKey, results);
        return results;
    }

    applyFilters(items, filters) {
        let filtered = items;
        
        if (filters.reason && filters.reason !== 'all') {
            filtered = filtered.filter(item => item.reason === filters.reason);
        }
        
        if (filters.dateRange && filters.dateRange !== 'all') {
            filtered = this.filterByDateRange(filtered, filters.dateRange);
        }
        
        return filtered;
    }

    filterByDateRange(items, dateRange) {
        const now = Date.now();
        const ranges = {
            'today': 24 * 60 * 60 * 1000,
            'week': 7 * 24 * 60 * 60 * 1000,
            'month': 30 * 24 * 60 * 60 * 1000,
            'year': 365 * 24 * 60 * 60 * 1000
        };
        
        if (ranges[dateRange]) {
            const cutoff = now - ranges[dateRange];
            return items.filter(item => item.ts >= cutoff);
        }
        
        return items;
    }

    partialMatchSearch(query, items) {
        const queryWords = query.split(' ');
        return items.filter(item => {
            return queryWords.some(word => 
                item.searchableText.includes(word) ||
                item.title.toLowerCase().includes(word) ||
                item.videoId.includes(word) ||
                item.reason.includes(word)
            );
        });
    }

    sortResults(items, sortBy) {
        const sorted = [...items];
        
        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => b.ts - a.ts);
            case 'oldest':
                return sorted.sort((a, b) => a.ts - b.ts);
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'reason':
                return sorted.sort((a, b) => a.reason.localeCompare(b.reason));
            default:
                return sorted;
        }
    }

    getAllVideos(filters = {}) {
        const allItems = Array.from(this.searchIndex.values());
        const filtered = this.applyFilters(allItems, filters);
        return this.sortResults(filtered, filters.sortBy || 'newest');
    }

    async refreshIndex() {
        this.searchCache.clear();
        await this.buildSearchIndex();
    }

    getSearchSuggestions(query) {
        if (!query.trim() || !this.isIndexed) return [];
        
        const normalizedQuery = this.normalizeText(query);
        const allItems = Array.from(this.searchIndex.values());
        const suggestions = new Set();
        
        allItems.forEach(item => {
            // Suggest matching titles
            if (item.title.toLowerCase().includes(normalizedQuery)) {
                suggestions.add(item.title.substring(0, 50));
            }
            
            // Suggest matching reasons
            if (item.reason.toLowerCase().includes(normalizedQuery)) {
                suggestions.add(item.reason);
            }
            
            // Suggest matching video IDs
            if (item.videoId.includes(normalizedQuery)) {
                suggestions.add(item.videoId);
            }
        });
        
        return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
    }
}

// Initialize enhanced search
const enhancedSearch = new EnhancedSearch();

// Enhanced Stats Manager
class StatsManager {
    constructor() {
        this.stats = {
            totalBlocks: 0,
            todayBlocks: 0,
            manualBlocks: 0,
            keywordBlocks: 0,
            shortsBlocks: 0,
            languageBlocks: 0,
            activeKeywords: 0,
            dailyActivity: {},
            lastUpdated: null
        };
    }

    async loadStats() {
        try {
            const statsResponse = await sendMessageToYouTube({ type: "getStats" });
            
            if (statsResponse && statsResponse.success !== false) {
                this.stats = this.mergeStats(this.stats, statsResponse);
                console.log('Clify: Stats loaded from content script:', this.stats);
            } else {
                await this.loadFromLocalStorage();
                console.log('Clify: Stats loaded from local storage:', this.stats);
            }
            
            this.stats.lastUpdated = new Date().toISOString();
            return this.stats;
            
        } catch (error) {
            console.error('Clify: Error loading stats:', error);
            await this.loadFromLocalStorage();
            return this.stats;
        }
    }

    async loadFromLocalStorage() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['ClifyStats', 'blockedVideos', 'keywords'], (result) => {
                const blockedVideos = result.blockedVideos || {};
                const storedStats = result.ClifyStats || {};
                const keywords = result.keywords || [];
                
                const videoArray = Object.values(blockedVideos);
                const today = new Date().toISOString().slice(0, 10);
                
                this.stats = {
                    totalBlocks: videoArray.length,
                    todayBlocks: videoArray.filter(v => 
                        new Date(v.ts).toISOString().slice(0, 10) === today
                    ).length,
                    manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                    keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                    shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                    languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                    activeKeywords: keywords.length,
                    dailyActivity: storedStats.dailyActivity || this.generateEmptyActivityChart(),
                    lastUpdated: new Date().toISOString()
                };
                
                resolve(this.stats);
            });
        });
    }

    mergeStats(existing, newStats) {
        return {
            totalBlocks: newStats.totalBlocks || existing.totalBlocks,
            todayBlocks: newStats.todayBlocks || existing.todayBlocks,
            manualBlocks: newStats.manualBlocks || existing.manualBlocks,
            keywordBlocks: newStats.keywordBlocks || existing.keywordBlocks,
            shortsBlocks: newStats.shortsBlocks || existing.shortsBlocks,
            languageBlocks: newStats.languageBlocks || existing.languageBlocks,
            activeKeywords: newStats.activeKeywords || existing.activeKeywords,
            dailyActivity: newStats.dailyActivity || existing.dailyActivity,
            lastUpdated: new Date().toISOString()
        };
    }

    generateEmptyActivityChart() {
        const activity = {};
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            activity[date.toISOString().slice(0, 10)] = 0;
        }
        return activity;
    }

    getStats() {
        return this.stats;
    }

    calculateEfficiency() {
        if (this.stats.totalBlocks === 0) return 0;
        const activeDays = Object.values(this.stats.dailyActivity).filter(count => count > 0).length;
        return Math.min(100, Math.round((this.stats.totalBlocks / Math.max(1, activeDays)) * 10));
    }
}

const statsManager = new StatsManager();

// Admin Notification System
class AdminNotificationSystem {
    constructor() {
        this.notificationIcon = null;
        this.unreadCount = 0;
        this.adminMessages = [];
        this.lastChecked = null;
    }

    init() {
        console.log('Initializing Admin Notification System...');
        this.createNotificationIcon();
        this.loadStoredMessages();
        this.startPolling();
        this.requestNotificationPermission();
        console.log('Admin Notification System initialized');
    }

    createNotificationIcon() {
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) {
            console.error('Header right not found');
            return;
        }

        // Remove any existing notification icons first
        const existingIcons = document.querySelectorAll('.notification-icon-header');
        existingIcons.forEach(icon => icon.remove());

        this.notificationIcon = document.createElement('div');
        this.notificationIcon.className = 'notification-icon-header';
        this.notificationIcon.innerHTML = `
            <div class="notification-bell" id="notificationBell" title="Admin Messages">
                <i class="fas fa-bell"></i>
                <span class="notification-badge" id="notificationBadge">0</span>
            </div>
            <div class="notification-dropdown" id="notificationDropdown">
                <div class="notification-header">
                    <h4>Notifications</h4>
                    <button class="mark-all-read" id="markAllRead" title="Mark all messages as read">Mark all read</button>
                </div>
                <div class="notification-list" id="notificationList">
                    <!-- Messages will appear here -->
                </div>
                <div class="notification-footer">
                    <a href="https://t.me/Clifybydd" target="_blank" class="telegram-link">
                        <span>Get All Informations</span>
                    </a>
                </div>
            </div>
        `;

        // Insert at the beginning of header-right
        headerRight.insertBefore(this.notificationIcon, headerRight.firstChild);

        // Add event listeners
        const notificationBell = document.getElementById('notificationBell');
        if (notificationBell) {
            notificationBell.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            });
            
            // Add hover effect
            notificationBell.style.cursor = 'pointer';
        } else {
            console.error('Notification bell not found');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.notificationIcon && !this.notificationIcon.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Mark all read button
        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.markAllAsRead();
            });
            
            markAllReadBtn.style.cursor = 'pointer';
        }

        console.log('Notification icon created successfully');
    }

    async loadStoredMessages() {
        const stored = await this.getStoredData('adminMessages');
        this.adminMessages = stored || [];
        this.updateUnreadCount();
        this.renderMessages();
    }

    async fetchAdminMessages() {
        try {
            const response = await this.fetchFromTelegram();
            
            if (response && response.messages) {
                const newMessages = response.messages.filter(newMsg => 
                    !this.adminMessages.find(existingMsg => existingMsg.id === newMsg.id)
                );

                if (newMessages.length > 0) {
                    this.adminMessages = [...newMessages, ...this.adminMessages];
                    this.unreadCount += newMessages.length;
                    await this.saveStoredData('adminMessages', this.adminMessages);
                    this.updateUnreadCount();
                    this.renderMessages();
                    
                    newMessages.forEach(msg => {
                        this.showDesktopNotification(msg);
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch admin messages:', error);
        }
    }

    async fetchFromTelegram() {
        try {
            const mockMessages = [
                {
                    id: '1',
                    title: 'Clify v7.1 Update Live! 🚀',
                    message: 'New AI-powered content filtering, improved performance, and enhanced Shorts detection are now available.',
                    timestamp: Date.now() - 300000,
                    read: false,
                    type: 'update',
                    link: 'https://github.com/Clify-team/Clify/releases/v7.1.0'
                },
                {
                    id: '2', 
                    title: 'Smart Blocking Activated 🤖',
                    message: 'Our new AI now learns from your blocking patterns to automatically suggest better keywords.',
                    timestamp: Date.now() - 1800000,
                    read: false,
                    type: 'feature',
                    link: '#keywords'
                },
                {
                    id: '3',
                    title: 'YouTube Algorithm Bypass 🎯',
                    message: 'New feature helps prevent recommended videos from similar blocked channels.',
                    timestamp: Date.now() - 3600000,
                    read: false,
                    type: 'improvement',
                    link: '#enhanced'
                }
            ];

            console.log('Fetched mock messages with links:', mockMessages.length);
            return { messages: mockMessages };
        } catch (error) {
            console.error('Telegram fetch error:', error);
            return { messages: [] };
        }
    }

    showDesktopNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Clify Update: ${message.title}`, {
                body: message.message,
                icon: '/icons/icon128.png',
                tag: 'Clify-admin'
            });
        }
    }

    toggleDropdown() {
        try {
            const dropdown = document.getElementById('notificationDropdown');
            const list = document.getElementById('notificationList');
            
            if (!dropdown) {
                console.error('Notification dropdown not found');
                return;
            }
            
            dropdown.classList.toggle('show');
            
            // Auto-scroll to top when opening
            if (dropdown.classList.contains('show') && list) {
                list.scrollTop = 0;
            }
            
            console.log('Dropdown toggled, show:', dropdown.classList.contains('show'));
        } catch (error) {
            console.error('Error toggling dropdown:', error);
        }
    }

    hideDropdown() {
        try {
            const dropdown = document.getElementById('notificationDropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        } catch (error) {
            console.error('Error hiding dropdown:', error);
        }
    }

    renderMessages() {
        const list = document.getElementById('notificationList');
        if (!list) {
            console.error('Notification list not found');
            return;
        }

        // Sort messages by timestamp (newest first)
        const sortedMessages = [...this.adminMessages].sort((a, b) => b.timestamp - a.timestamp);

        if (sortedMessages.length === 0) {
            list.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-inbox"></i>
                    <p>No messages yet</p>
                    <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">Check back later for updates</p>
                </div>
            `;
            return;
        }

        list.innerHTML = sortedMessages.map(msg => `
            <div class="notification-item ${msg.read ? 'read' : 'unread'}" data-id="${msg.id}" data-link="${msg.link || ''}">
                <div class="notification-icon">
                    <i class="fas fa-${this.getMessageIcon(msg.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">
                        ${msg.title}
                        ${msg.link ? '<i class="fas fa-external-link-alt link-indicator" style="margin-left: 8px; font-size: 10px; opacity: 0.6;"></i>' : ''}
                    </div>
                    <div class="notification-message">${msg.message}</div>
                    <div class="notification-time">${this.formatTime(msg.timestamp)}</div>
                </div>
                ${!msg.read ? '<div class="unread-dot"></div>' : ''}
            </div>
        `).join('');

        // Add click handlers for all messages
        list.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const messageId = item.getAttribute('data-id');
                const link = item.getAttribute('data-link');
                
                // Mark as read
                this.markAsRead(messageId);
                
                // Handle link if present
                if (link) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleMessageLink(link);
                }
                
                // Close dropdown after click
                this.hideDropdown();
            });
            
            // Add hover effect for clickable messages
            if (item.getAttribute('data-link')) {
                item.style.cursor = 'pointer';
                item.title = 'Click to open link';
            }
        });

        console.log('Rendered', sortedMessages.length, 'messages with links');
    }

    handleMessageLink(link) {
        try {
            console.log('Handling message link:', link);
            
            if (!link) return;
            
            if (link.startsWith('http')) {
                // External link - open in new tab
                window.open(link, '_blank', 'noopener,noreferrer');
                console.log('Opened external link:', link);
            } else if (link.startsWith('#')) {
                // Internal link - scroll to section
                const targetSection = document.querySelector(link);
                if (targetSection) {
                    // Switch to the appropriate tab first
                    const tabName = link.substring(1); // Remove the #
                    if (tabName && typeof switchToTab === 'function') {
                        switchToTab(tabName);
                    }
                    
                    // Scroll to section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    console.log('Scrolled to internal section:', link);
                } else {
                    console.warn('Internal section not found:', link);
                }
            } else {
                console.warn('Unknown link type:', link);
            }
        } catch (error) {
            console.error('Error handling message link:', error);
        }
    }

    getMessageIcon(type) {
        const icons = {
            info: 'info-circle',
            warning: 'exclamation-triangle',
            update: 'rocket',
            feature: 'star',
            improvement: 'bolt',
            announcement: 'bullhorn',
            alert: 'bell'
        };
        return icons[type] || 'bell';
    }

    markAsRead(messageId) {
        const message = this.adminMessages.find(msg => msg.id === messageId);
        if (message && !message.read) {
            message.read = true;
            this.unreadCount--;
            this.updateUnreadCount();
            this.saveStoredData('adminMessages', this.adminMessages);
            this.renderMessages();
        }
    }

    markAllAsRead() {
        this.adminMessages.forEach(msg => msg.read = true);
        this.unreadCount = 0;
        this.updateUnreadCount();
        this.saveStoredData('adminMessages', this.adminMessages);
        this.renderMessages();
    }

    updateUnreadCount() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = this.unreadCount > 0 ? this.unreadCount : '';
            badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
        }
    }

    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        if (diff < 60000) { // Less than 1 minute
            return 'Just now';
        } else if (diff < 3600000) { // Less than 1 hour
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400000) { // Less than 1 day
            const hours = Math.floor(diff / 3600000);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diff < 604800000) { // Less than 1 week
            const days = Math.floor(diff / 86400000);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return new Date(timestamp).toLocaleDateString();
        }
    }

    startPolling() {
        setInterval(() => {
            this.fetchAdminMessages();
        }, 5 * 60 * 1000);

        this.fetchAdminMessages();
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    async getStoredData(key) {
        return new Promise(resolve => {
            chrome.storage.local.get([key], result => {
                resolve(result[key]);
            });
        });
    }

    async saveStoredData(key, data) {
        return new Promise(resolve => {
            chrome.storage.local.set({ [key]: data }, resolve);
        });
    }
}

class YouTubeIntegration {
    constructor() {
        this.isConnected = false;
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    async sendMessageToContentScript(message) {
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            try {
                const tabs = await new Promise(resolve => {
                    chrome.tabs.query({url: "*://*.youtube.com/*"}, resolve);
                });
                
                if (tabs.length === 0) {
                    throw new Error('No YouTube tabs available');
                }

                const activeTab = tabs.find(tab => tab.active);
                const targetTab = activeTab || tabs[0];
                
                return new Promise((resolve, reject) => {
                    chrome.tabs.sendMessage(targetTab.id, message, (response) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        } else {
                            this.isConnected = true;
                            resolve(response);
                        }
                    });
                });
                
            } catch (error) {
                console.warn(`Clify: YouTube connection attempt ${attempt + 1} failed:`, error);
                
                if (attempt < this.maxRetries) {
                    await this.delay(Math.pow(2, attempt) * 1000);
                } else {
                    return this.handleFallbackStorage(message);
                }
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async handleFallbackStorage(message) {
        return new Promise((resolve) => {
            chrome.storage.local.get(['blockedVideos', 'keywords', 'ClifyStats'], (result) => {
                const blockedVideos = result.blockedVideos || {};
                const videoArray = Object.values(blockedVideos);
                const today = new Date().toISOString().slice(0, 10);
                
                switch (message.type) {
                    case "getStats":
                        const stats = {
                            totalBlocks: videoArray.length,
                            todayBlocks: videoArray.filter(v => 
                                new Date(v.ts).toISOString().slice(0, 10) === today
                            ).length,
                            manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                            keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                            shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                            languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                            activeKeywords: (result.keywords || []).length,
                            dailyActivity: result.ClifyStats?.dailyActivity || {},
                            success: true
                        };
                        resolve(stats);
                        break;
                        
                    case "getBlockedVideos":
                        resolve({ blockedVideosMap: blockedVideos, success: true });
                        break;
                        
                    case "getKeywords":
                        chrome.storage.sync.get({keywords: []}, (syncResult) => {
                            resolve({ keywords: syncResult.keywords, success: true });
                        });
                        break;
                        
                    case "saveKeywords":
                        chrome.storage.sync.set({keywords: message.keywords}, () => {
                            resolve({ success: true });
                        });
                        break;
                        
                    case "clearAllVideos":
                        chrome.storage.local.set({ blockedVideos: {} }, () => {
                            // Also clear from sync storage for consistency
                            chrome.storage.sync.set({ keywords: [] }, () => {
                                resolve({ success: true });
                            });
                        });
                        break;
                        
                    case "unblockVideo":
                        delete blockedVideos[message.videoId];
                        chrome.storage.local.set({ blockedVideos }, () => {
                            resolve({ success: true });
                        });
                        break;
                        
                    default:
                        resolve({ success: false, error: 'Unknown message type' });
                }
            });
        });
    }
}

const youTubeIntegration = new YouTubeIntegration();

async function sendMessageToYouTube(message) {
    try {
        const response = await youTubeIntegration.sendMessageToContentScript(message);
        return response;
    } catch (error) {
        console.error('Message failed:', error);
        throw error;
    }
}

// Enhanced Helper Functions with Safe Element Access
function $(selector, context) {
    context = context || document;
    try {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
            return null;
        }
        return element;
    } catch (error) {
        console.error(`Error querying selector ${selector}:`, error);
        return null;
    }
}

function $$(selector, context) {
    context = context || document;
    try {
        const elements = context.querySelectorAll(selector);
        return Array.from(elements);
    } catch (error) {
        console.error(`Error querying selector ${selector}:`, error);
        return [];
    }
}

function safeElement(selector, callback) {
    const element = $(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Modern Notification System
function initNotificationSystem() {
    let container = $('#notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

function showNotification(message, type = "success", options = {}) {
    const container = initNotificationSystem();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-text">
                <div class="notification-title">${options.title || getDefaultTitle(type)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;

    container.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => hideNotification(notification));

    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.animation = `notificationProgress ${options.duration || 4000}ms linear forwards`;

    setTimeout(() => {
        if (notification.parentNode) {
            hideNotification(notification);
        }
    }, options.duration || 4000);

    return notification;
}

function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hiding');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

function getDefaultTitle(type) {
    const titles = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information'
    };
    return titles[type] || 'Notification';
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || 'fas fa-bell';
}

function showSuccess(message, options = {}) {
    return showNotification(message, 'success', options);
}

function showError(message, options = {}) {
    return showNotification(message, 'error', { duration: 6000, ...options });
}

function showWarning(message, options = {}) {
    return showNotification(message, 'warning', { duration: 5000, ...options });
}

function showInfo(message, options = {}) {
    return showNotification(message, 'info', options);
}

// Enhanced dashboard functions
async function loadDashboardData() {
    try {
        console.log('Loading dashboard data...');
        
        const stats = await statsManager.loadStats();
        const keywordsResponse = await sendMessageToYouTube({ type: "getKeywords" });
        const keywords = keywordsResponse?.keywords || [];
        
        updateDashboardUI(stats, keywords);
        
        console.log('Dashboard data loaded successfully:', stats);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError("Failed to load dashboard data. Using cached information.");
        
        // Try to load from local storage as fallback
        try {
            const stats = await statsManager.loadFromLocalStorage();
            updateDashboardUI(stats, []);
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            // Set minimal default UI
            updateDashboardUI({
                totalBlocks: 0,
                todayBlocks: 0,
                manualBlocks: 0,
                keywordBlocks: 0,
                shortsBlocks: 0,
                languageBlocks: 0,
                activeKeywords: 0,
                dailyActivity: {}
            }, []);
        }
    }
}

function updateDashboardUI(stats, keywords) {
    safeElement("#kpi_today", el => el.textContent = stats.todayBlocks.toLocaleString());
    safeElement("#kpi_total", el => el.textContent = stats.totalBlocks.toLocaleString());
    
    const efficiency = statsManager.calculateEfficiency();
    safeElement("#blockingRate", el => el.textContent = efficiency + '%');
    
    safeElement("#activeKeywords", el => el.textContent = keywords.length.toLocaleString());
    safeElement("#manualBlocksCount", el => el.textContent = stats.manualBlocks.toLocaleString());
    safeElement("#autoBlocksCount", el => el.textContent = stats.keywordBlocks.toLocaleString());
    safeElement("#shortsBlocksCount", el => el.textContent = stats.shortsBlocks.toLocaleString());
    safeElement("#langBlocksCount", el => el.textContent = stats.languageBlocks.toLocaleString());
    
    safeElement("#blockedCount", el => el.textContent = stats.totalBlocks.toLocaleString());
    
    updateActivityChart(stats.dailyActivity);
    updateCapacityDisplay(stats.totalBlocks);
    
    updateRecentList();
}

async function updateRecentList() {
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        const recentVideos = videos
            .sort((a, b) => b.ts - a.ts)
            .slice(0, 10);
        
        const recentList = $("#recentList");
        if (!recentList) return;
        
        if (recentVideos.length === 0) {
            recentList.innerHTML = `
                <div class="recent-item" style="text-align: center; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 24px; margin-bottom: 8px;"></i>
                    <div>No videos blocked yet</div>
                    <div style="font-size: 12px; margin-top: 4px;">Start blocking videos to see them here</div>
                </div>
            `;
        } else {
            recentList.innerHTML = recentVideos.map(video => `
                <div class="recent-item">
                    <div class="recent-info">
                        <div class="recent-title" title="${escapeHtml(video.title)}">
                            ${escapeHtml(video.title.length > 45 ? video.title.substring(0, 45) + '...' : video.title)}
                        </div>
                        <div class="recent-meta">
                            <span class="reason-badge ${video.reason}" style="font-size: 9px; padding: 2px 6px;">
                                ${getReasonDisplayText(video.reason)}
                            </span>
                            <span style="font-size: 11px;">${formatTimeAgo(video.ts)}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error updating recent list:', error);
        const recentList = $("#recentList");
        if (recentList) {
            recentList.innerHTML = `
                <div class="recent-item" style="text-align: center; color: var(--text-muted);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 8px;"></i>
                    <div>Failed to load recent videos</div>
                    <div style="font-size: 12px; margin-top: 4px;">Try refreshing the page</div>
                </div>
            `;
        }
    }
}

function updateActivityChart(dailyActivity) {
    const activityBars = $("#activityBars");
    if (!activityBars) return;
    
    const dates = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().slice(0, 10));
    }
    
    const maxCount = Math.max(...dates.map(date => dailyActivity[date] || 0), 1);
    
    activityBars.innerHTML = dates.map(date => {
        const count = dailyActivity[date] || 0;
        const height = maxCount > 0 ? Math.max(6, (count / maxCount) * 100) : 6;
        return `
            <div class="activity-bar" data-count="${count}" 
                 style="height: ${height}%" 
                 title="${date}: ${count} blocks">
            </div>
        `;
    }).join('');
}

function updateCapacityDisplay(totalBlocks) {
    const capacityElement = $("#capacityDisplay");
    if (!capacityElement) return;
    
    const maxCapacity = 5000;
    const usagePercent = Math.min(100, Math.round((totalBlocks / maxCapacity) * 100));
    
    let capacityState = 'normal';
    let fillClass = '';
    let message = 'Your storage is looking great! Keep blocking those annoying videos. 😊';
    
    if (usagePercent >= 95) {
        capacityState = 'critical';
        fillClass = 'danger';
        message = 'Hey! Your storage is completely full. You need to clear some videos to block new ones. 🚨';
    } else if (usagePercent >= 85) {
        capacityState = 'warning';
        fillClass = 'warning';
        message = 'Heads up! Your storage is getting full (' + usagePercent + '%). Consider clearing some older blocked videos to make space. 📦';
    } else if (usagePercent >= 70) {
        capacityState = 'notice';
        message = 'Just letting you know - your storage is ' + usagePercent + '% full. You\'re doing great blocking those videos! 👍';
    }
    
    capacityElement.innerHTML = `
        <div class="capacity-info ${capacityState}">
            <div class="capacity-label">Your Hidden Videos:</div>
            <div class="capacity-value">${totalBlocks} / ${maxCapacity}</div>
            <div class="capacity-bar-container">
                <div class="capacity-bar">
                    <div class="capacity-fill ${fillClass}" style="width: ${usagePercent}%"></div>
                </div>
                <span class="capacity-percent">${usagePercent}%</span>
            </div>
            <div class="capacity-message">${message}</div>
        </div>
    `;
}

// Enhanced Search System Functions
function initEnhancedSearch() {
    enhancedSearch.initialize();
    setupSearchEventListeners();
    setupAdvancedFilters();
    setupQuickFilters();
}

function setupSearchEventListeners() {
    const searchInput = $('#search');
    const clearSearch = $('#clearSearch');
    const suggestionsContainer = $('#searchSuggestions');

    if (!searchInput || !suggestionsContainer) return;

    // Real-time search with debouncing
    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        await handleSearch(query);
        showSearchSuggestions(query);
    }, 300));

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                navigateSuggestions(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateSuggestions(-1);
                break;
            case 'Enter':
                e.preventDefault();
                selectSuggestion();
                break;
            case 'Escape':
                hideSuggestions();
                break;
        }
    });

    // Clear search
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            handleSearch('');
            hideSuggestions();
            searchInput.focus();
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
}

function setupAdvancedFilters() {
    const advancedToggle = $('#advancedSearchToggle');
    const advancedPanel = $('#advancedSearch');
    
    if (advancedToggle && advancedPanel) {
        advancedToggle.addEventListener('click', () => {
            advancedPanel.classList.toggle('collapsed');
            advancedToggle.innerHTML = advancedPanel.classList.contains('collapsed') 
                ? '<i class="fas fa-chevron-down"></i>'
                : '<i class="fas fa-chevron-up"></i>';
        });
    }

    // Advanced filter change handlers
    const advancedFilters = ['#advancedReasonFilter', '#advancedSortFilter', '#advancedDateRangeFilter'];
    advancedFilters.forEach(filterId => {
        const filter = $(filterId);
        if (filter) {
            filter.addEventListener('change', () => {
                syncAdvancedFilters();
                handleSearch($('#search')?.value || '');
            });
        }
    });
}

function syncAdvancedFilters() {
    // Sync advanced filters with main filters
    const advancedReason = $('#advancedReasonFilter')?.value;
    const advancedSort = $('#advancedSortFilter')?.value;
    const advancedDate = $('#advancedDateRangeFilter')?.value;

    if (advancedReason) $('#reasonFilter').value = advancedReason;
    if (advancedSort) $('#sortFilter').value = advancedSort;
    if (advancedDate) $('#dateRangeFilter').value = advancedDate;
}

function setupQuickFilters() {
    const quickFilters = $$('.quick-filter');
    quickFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.getAttribute('data-value');
            
            // Toggle active state
            quickFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Apply quick filter
            applyQuickFilter(filterType, filterValue);
        });
    });
}

function applyQuickFilter(type, value) {
    const searchInput = $('#search');
    let query = '';
    
    switch (type) {
        case 'reason':
            $('#reasonFilter').value = value;
            query = value;
            break;
        case 'date':
            $('#dateRangeFilter').value = 'today';
            query = `today`;
            break;
    }
    
    if (searchInput) {
        searchInput.value = query;
        handleSearch(query);
    }
}

async function handleSearch(query = '') {
    const startTime = performance.now();
    
    try {
        // Get current filters
        const reasonFilter = $('#reasonFilter')?.value || 'all';
        const sortFilter = $('#sortFilter')?.value || 'newest';
        const dateRangeFilter = $('#dateRangeFilter')?.value || 'all';
        
        const filters = {
            reason: reasonFilter,
            sortBy: sortFilter,
            dateRange: dateRangeFilter
        };
        
        // Perform search
        const results = await enhancedSearch.search(query, filters);
        
        // Update UI
        updateSearchResults(results, query);
        updateResultsInfo(results.length, query, performance.now() - startTime);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    }
}

function updateSearchResults(results, query) {
    const tableBody = $("#videosTableBody");
    const emptyState = $("#emptyState");
    const loadingState = $("#loadingState");
    
    if (loadingState) loadingState.classList.remove('show');
    
    if (!tableBody) return;
    
    if (results.length === 0) {
        if (emptyState) emptyState.classList.add('show');
        tableBody.innerHTML = '';
        
        // Show no results message
        const noResults = document.createElement('tr');
        noResults.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 32px; margin-bottom: 16px; opacity: 0.5;"></i>
                <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                    No videos found
                </div>
                <div style="font-size: 14px;">
                    ${query ? `No results for "${query}"` : 'No blocked videos yet'}
                </div>
            </td>
        `;
        tableBody.appendChild(noResults);
        
    } else {
        if (emptyState) emptyState.classList.remove('show');
        
        // Render results with highlighting
        tableBody.innerHTML = results.map(video => `
            <tr>
                <td class="col-title">
                    ${highlightText(video.title, query)}
                </td>
                <td class="col-id">
                    ${highlightText(video.videoId, query)}
                </td>
                <td class="col-reason">
                    <span class="reason-badge ${video.reason}">
                        ${highlightText(getReasonDisplayText(video.reason), query)}
                    </span>
                </td>
                <td class="col-date">
                    <div class="date-time-display">
                        <div class="full-date">${formatLocalDateTime(video.ts)}</div>
                        <div class="relative-time">${formatTimeAgo(video.ts)}</div>
                    </div>
                </td>
                <td class="col-actions">
                    <button class="control-btn small unblock-btn" data-video-id="${video.videoId}" title="Unblock video">
                        <i class="fas fa-undo"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Re-attach event listeners
        attachUnblockListeners();
    }
}

function highlightText(text, query) {
    if (!query || !text) return escapeHtml(text);
    
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    
    if (!normalizedText.includes(normalizedQuery)) {
        return escapeHtml(text);
    }
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function showSearchSuggestions(query) {
    const suggestionsContainer = $('#searchSuggestions');
    if (!suggestionsContainer) return;
    
    if (!query || query.length < 2) {
        hideSuggestions();
        return;
    }
    
    const suggestions = enhancedSearch.getSearchSuggestions(query);
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
            ${highlightText(suggestion, query)}
        </div>
    `).join('');
    
    suggestionsContainer.classList.add('show');
    
    // Add click handlers
    $$('.suggestion-item', suggestionsContainer).forEach(item => {
        item.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            $('#search').value = suggestion;
            handleSearch(suggestion);
            hideSuggestions();
        });
    });
}

function hideSuggestions() {
    const suggestionsContainer = $('#searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}

function navigateSuggestions(direction) {
    const suggestions = $$('.suggestion-item');
    const activeSuggestion = $('.suggestion-item.active');
    
    let nextIndex = 0;
    
    if (activeSuggestion) {
        const currentIndex = suggestions.indexOf(activeSuggestion);
        nextIndex = (currentIndex + direction + suggestions.length) % suggestions.length;
        activeSuggestion.classList.remove('active');
    }
    
    suggestions[nextIndex]?.classList.add('active');
}

function selectSuggestion() {
    const activeSuggestion = $('.suggestion-item.active');
    if (activeSuggestion) {
        const suggestion = activeSuggestion.getAttribute('data-suggestion');
        $('#search').value = suggestion;
        handleSearch(suggestion);
        hideSuggestions();
    }
}

function updateResultsInfo(count, query, duration) {
    const resultsInfo = $('#resultsInfo');
    if (!resultsInfo) return;
    
    let infoText = `<span class="results-count">${count}</span> videos`;
    
    if (query) {
        infoText += ` for "${query}"`;
    }
    
    infoText += ` • ${duration.toFixed(0)}ms`;
    
    resultsInfo.innerHTML = infoText;
}

function attachUnblockListeners() {
    $$('.unblock-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const videoId = this.getAttribute('data-video-id');
            if (confirm('Are you sure you want to unblock this video?')) {
                try {
                    await sendMessageToYouTube({ 
                        type: "unblockVideo", 
                        videoId: videoId 
                    });
                    showSuccess("Video unblocked successfully!");
                    
                    // Refresh search index and results
                    await enhancedSearch.refreshIndex();
                    handleSearch($('#search')?.value || '');
                    loadDashboardData();
                    
                } catch (error) {
                    showError("Failed to unblock video");
                }
            }
        });
    });
}

// Blocked videos table functions
async function renderBlockedTable() {
    const tableBody = $("#videosTableBody");
    const loadingState = $("#loadingState");
    const emptyState = $("#emptyState");
    
    if (!tableBody) return;
    
    if (loadingState) loadingState.classList.add('show');
    if (emptyState) emptyState.classList.remove('show');
    tableBody.innerHTML = '';
    
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        if (videos.length === 0) {
            if (emptyState) emptyState.classList.add('show');
        } else {
            videos.sort((a, b) => b.ts - a.ts);
            
            tableBody.innerHTML = videos.map(video => `
                <tr>
                    <td class="col-title">${escapeHtml(video.title)}</td>
                    <td class="col-id">${video.id}</td>
                    <td class="col-reason">
                        <span class="reason-badge ${video.reason}">${getReasonDisplayText(video.reason)}</span>
                    </td>
                    <td class="col-date">
                        <div class="date-time-display">
                            <div class="full-date">${formatLocalDateTime(video.ts)}</div>
                            <div class="relative-time">${formatTimeAgo(video.ts)}</div>
                        </div>
                    </td>
                    <td class="col-actions">
                        <button class="control-btn small unblock-btn" data-video-id="${video.id}" title="Unblock video">
                            <i class="fas fa-undo"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
            
            attachUnblockListeners();
        }
        
        safeElement("#resultsCount", el => {
            el.textContent = videos.length;
        });
        
    } catch (error) {
        console.error('Error rendering blocked table:', error);
        showError("Failed to load blocked videos");
    } finally {
        if (loadingState) loadingState.classList.remove('show');
    }
}

// Enhanced debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced Features with Shorts Removal
function initEnhancedFeaturesPanel() {
    const enhancedSection = $("#enhanced");
    if (!enhancedSection) return;
    
    chrome.storage.sync.get(['Clify_enhanced_config'], function(result) {
        const config = result.Clify_enhanced_config || {};
        
        safeElement('#toggleShorts', el => el.checked = config.removeShorts !== false);
        safeElement('#toggleAnnotations', el => el.checked = config.annotationRemoval !== false);
        safeElement('#toggleTheaterMode', el => el.checked = config.theaterMode || false);
        safeElement('#toggleAutoPlay', el => el.checked = config.autoPlayNext || false);
        safeElement('#playbackSpeed', el => el.value = config.playbackSpeed || 1.0);
    });
    
    safeElement('#toggleShorts', el => {
        el.addEventListener('change', function() {
            saveEnhancedSettings();
            sendMessageToYouTube({ 
                type: "toggleShortsRemoval", 
                enabled: this.checked 
            }).then(() => {
                if (this.checked) {
                    showSuccess("Shorts removal activated! All Shorts will be removed.");
                } else {
                    showInfo("Shorts removal disabled");
                }
            });
        });
    });
    
    safeElement('#saveEnhancedFeatures', el => {
        el.addEventListener('click', function() {
            saveEnhancedSettings();
        });
    });
    
    safeElement('#resetEnhancedFeatures', el => {
        el.addEventListener('click', function() {
            if (confirm('Reset all enhanced features to defaults?')) {
                resetEnhancedSettings();
            }
        });
    });
}

function saveEnhancedSettings() {
    const config = {
        removeShorts: safeElement('#toggleShorts')?.checked !== false,
        annotationRemoval: safeElement('#toggleAnnotations')?.checked || false,
        theaterMode: safeElement('#toggleTheaterMode')?.checked || false,
        autoPlayNext: safeElement('#toggleAutoPlay')?.checked || false,
        playbackSpeed: parseFloat(safeElement('#playbackSpeed')?.value) || 1.0
    };
    
    chrome.storage.sync.set({ Clify_enhanced_config: config }, function() {
        sendMessageToYouTube({ 
            type: "saveEnhancedConfig", 
            config: config 
        }).then(() => {
            showSuccess("Enhanced features saved successfully!");
        }).catch(error => {
            showError("Failed to save settings: " + error.message);
        });
    });
}

function resetEnhancedSettings() {
    const defaultConfig = {
        removeShorts: true,
        annotationRemoval: true,
        theaterMode: false,
        autoPlayNext: false,
        playbackSpeed: 1.0
    };
    
    chrome.storage.sync.set({ Clify_enhanced_config: defaultConfig }, function() {
        chrome.storage.sync.get(['Clify_enhanced_config'], function(result) {
            const config = result.Clify_enhanced_config || {};
            
            safeElement('#toggleShorts', el => el.checked = config.removeShorts !== false);
            safeElement('#toggleAnnotations', el => el.checked = config.annotationRemoval !== false);
            safeElement('#toggleTheaterMode', el => el.checked = config.theaterMode || false);
            safeElement('#toggleAutoPlay', el => el.checked = config.autoPlayNext || false);
            safeElement('#playbackSpeed', el => el.value = config.playbackSpeed || 1.0);
        });
        
        sendMessageToYouTube({ 
            type: "saveEnhancedConfig", 
            config: defaultConfig 
        }).then(() => {
            showSuccess("Settings reset to defaults!");
        });
    });
}

// uBlock Integration Functions
async function checkUblockStatus() {
    try {
        const ublockExtensionId = 'ddkjiahejlhfcafbddmgiahcpbblcofd';
        
        const result = await new Promise(resolve => {
            chrome.management.get(ublockExtensionId, (extensionInfo) => {
                if (chrome.runtime.lastError) {
                    resolve({ installed: false, enabled: false });
                } else {
                    resolve({ 
                        installed: true, 
                        enabled: extensionInfo.enabled,
                        name: extensionInfo.name
                    });
                }
            });
        });
        
        if (result.installed && result.enabled) {
            showSuccess(`✅ ${result.name} is installed and active!`);
            safeElement('#ublockStatus', el => {
                el.textContent = 'Active';
            });
        } else if (result.installed && !result.enabled) {
            showWarning(`⚠️ ${result.name} is installed but disabled. Please enable it.`);
            safeElement('#ublockStatus', el => {
                el.textContent = 'Disabled';
            });
        } else {
            showError('❌ uBlock Origin Lite is not installed. Click "Get uBlock" button to install it.');
            safeElement('#ublockStatus', el => {
                el.textContent = 'Not Installed';
            });
        }
        
    } catch (error) {
        console.error('Error checking uBlock status:', error);
        showError('Failed to check uBlock status');
    }
}

// FIXED Telegram Contact Form Handler
async function sendToTelegram(formData) {
    try {
        const telegramMessage = `
📧 *Clify Support Message*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Category:* ${formData.category}
*Message:*
${formData.message}

*Times:* ${new Date().toLocaleString()}
*User ID:* ${await getUserId()}
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        
        console.log('Sending to Telegram Support Channel:', TELEGRAM_CONFIG.supportChannelId);
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.supportChannelId,
                text: telegramMessage,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Telegram API error:', response.status, errorData);
            
            // Try fallback to admin channel if support channel fails
            if (response.status === 400 || response.status === 403) {
                console.log('Trying fallback to admin channel...');
                return await sendToTelegramFallback(formData);
            }
            
            throw new Error(`Telegram API returned ${response.status}`);
        }

        const result = await response.json();
        console.log('Telegram message sent successfully to support channel:', result);
        return true;
        
    } catch (error) {
        console.error('Failed to send message to Telegram support channel:', error);
        
        // Fallback: Save to local storage for later retry
        await saveMessageToLocal(formData);
        throw new Error('Message saved locally. Will retry when online.');
    }
}

// Fallback function for Telegram
async function sendToTelegramFallback(formData) {
    try {
        const telegramMessage = `
📧 *Clify Support Message (Fallback)*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Category:* ${formData.category}
*Message:*
${formData.message}

*Time:* ${new Date().toLocaleString()}
*User ID:* ${await getUserId()}
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        
        console.log('Trying fallback to admin channel:', TELEGRAM_CONFIG.adminChannelId);
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.adminChannelId,
                text: telegramMessage,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });

        if (!response.ok) {
            throw new Error(`Fallback also failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('Telegram message sent successfully to admin channel (fallback):', result);
        return true;
        
    } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw fallbackError;
    }
}

// Helper function to get user ID
async function getUserId() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['Clify_user_id', 'last_user_id'], (result) => {
            if (result.Clify_user_id) {
                resolve(result.Clify_user_id);
            } else {
                // Generate new serial user ID: ClifyU + 6-digit number
                const generateSerialUserId = () => {
                    return new Promise((resolveSerial) => {
                        chrome.storage.local.get(['last_user_id'], (storageResult) => {
                            let lastId = storageResult.last_user_id || 0;
                            lastId++;
                            
                            // Ensure it's 6 digits with leading zeros
                            const newId = lastId.toString().padStart(6, '0');
                            const userId = `ClifyU${newId}`;
                            
                            // Save the last used ID
                            chrome.storage.local.set({ 
                                last_user_id: lastId,
                                Clify_user_id: userId 
                            }, () => {
                                resolveSerial(userId);
                            });
                        });
                    });
                };
                
                generateSerialUserId().then(resolve);
            }
        });
    });
}

// Fallback function to save messages locally
async function saveMessageToLocal(formData) {
    return new Promise((resolve) => {
        chrome.storage.local.get(['pending_messages'], (result) => {
            const pendingMessages = result.pending_messages || [];
            pendingMessages.push({
                ...formData,
                timestamp: Date.now(),
                attempts: 0
            });
            
            chrome.storage.local.set({ pending_messages: pendingMessages }, () => {
                console.log('Message saved locally for retry:', formData);
                resolve(true);
            });
        });
    });
}

// Function to retry pending messages
async function retryPendingMessages() {
    try {
        const result = await new Promise(resolve => {
            chrome.storage.local.get(['pending_messages'], resolve);
        });
        
        const pendingMessages = result.pending_messages || [];
        if (pendingMessages.length === 0) return;

        console.log(`Retrying ${pendingMessages.length} pending messages...`);
        
        const successfulMessages = [];
        const failedMessages = [];

        for (const message of pendingMessages) {
            try {
                // Limit retry attempts
                if (message.attempts >= 3) {
                    failedMessages.push(message);
                    continue;
                }

                const success = await sendToTelegram(message);
                if (success) {
                    successfulMessages.push(message);
                } else {
                    message.attempts = (message.attempts || 0) + 1;
                    failedMessages.push(message);
                }
                
                // Small delay between retries
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                message.attempts = (message.attempts || 0) + 1;
                failedMessages.push(message);
            }
        }

        // Update storage with remaining failed messages
        await new Promise(resolve => {
            chrome.storage.local.set({ pending_messages: failedMessages }, resolve);
        });

        if (successfulMessages.length > 0) {
            console.log(`Successfully sent ${successfulMessages.length} pending messages`);
            showSuccess(`Sent ${successfulMessages.length} pending messages`);
        }
        
    } catch (error) {
        console.error('Error retrying pending messages:', error);
    }
}

// Initialize message retry system
function initMessageRetrySystem() {
    // Retry pending messages on dashboard load
    retryPendingMessages();
    
    // Retry every 5 minutes
    setInterval(retryPendingMessages, 5 * 60 * 1000);
    
    // Also retry when coming online
    window.addEventListener('online', retryPendingMessages);
}

// Enhanced contact form handler
function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = $('#submitBtn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        const formStatus = $('#formStatus');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'flex';
        if (submitBtn) submitBtn.disabled = true;
        if (formStatus) formStatus.innerHTML = '';
        
        try {
            const formData = {
                name: safeElement('#name')?.value.trim() || '',
                email: safeElement('#email')?.value.trim() || '',
                category: safeElement('#category')?.value || 'other',
                message: safeElement('#message')?.value.trim() || ''
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields');
            }
            
            if (formData.message.length < 10) {
                throw new Error('Please provide a more detailed message (at least 10 characters)');
            }
            
            if (!formData.email.includes('@') || !formData.email.includes('.')) {
                throw new Error('Please enter a valid email address');
            }
            
            // Send to Telegram
            const success = await sendToTelegram(formData);
            
            if (success) {
                if (formStatus) {
                    formStatus.innerHTML = '<div class="notification success" style="margin: 0;">Thank you! Your message has been sent successfully to our support team.</div>';
                }
                contactForm.reset();
                showSuccess('Message sent successfully! We will get back to you soon.');
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            
            if (formStatus) {
                formStatus.innerHTML = `<div class="notification error" style="margin: 0;">${error.message}</div>`;
            }
            
            if (error.message.includes('saved locally')) {
                showWarning('Message saved locally. We will send it when you are back online.');
                contactForm.reset();
            } else {
                showError(error.message);
            }
            
        } finally {
            if (btnText) btnText.style.display = 'flex';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Enhanced Keywords Management with Multi-Language Support
function initKeywordsManager() {
    const saveBtn = $('#saveKw');
    const clearBtn = $('#clearKw');
    const textarea = $('#kw');
    
    if (!saveBtn || !clearBtn || !textarea) return;
    
    // Set placeholder with multi-language examples
    textarea.placeholder = `Enter keywords (one per line or commas)
Examples:
movie|فيلم|फिल्म|সিনেমা
song|اغنية|गाना|গান
clickbait|كليكبيت|क्लिकबेट|ক্লিকবেইট
sponsor|راعي|प्रायोजक|প্রायোজক
reaction|ردة فعل|प्रतिक्रिया|প্রতিক্রিয়া
prank|مقلب|प्रैंक|প্র্যাংক`;
    
    loadKeywords();
    
    saveBtn.addEventListener('click', saveKeywords);
    clearBtn.addEventListener('click', clearKeywords);
    
    textarea.addEventListener('input', updateKeywordCount);
}

async function loadKeywords() {
    try {
        const response = await sendMessageToYouTube({ type: "getKeywords" });
        const keywords = response?.keywords || [];
        const textarea = $('#kw');
        
        if (textarea) {
            textarea.value = keywords.join('\n');
            updateKeywordCount();
        }
    } catch (error) {
        console.error('Error loading keywords:', error);
    }
}

async function saveKeywords() {
    const textarea = $('#kw');
    if (!textarea) return;
    
    let keywords = textarea.value
        .split(/[\n,]/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
    
    // Enhanced multi-language keyword cleaning
    const seen = new Set();
    keywords = keywords.filter(k => {
        const normalized = k.toLocaleLowerCase();
        if (seen.has(normalized)) {
            return false;
        }
        seen.add(normalized);
        return true;
    });
    
    // Enforce limit with warning
    if (keywords.length > 2000) {
        keywords = keywords.slice(0, 2000);
        showWarning(`Limited to 2000 keywords (maximum supported). Using first 2000 keywords.`);
    }
    
    try {
        await sendMessageToYouTube({ 
            type: "saveKeywords", 
            keywords: keywords 
        });
        showSuccess(`Saved ${keywords.length} keywords! Multi-language support enabled.`);
        updateKeywordCount();
        
        // Log sample keywords for debugging
        console.log('Sample multi-language keywords saved:', keywords.slice(0, 5));
        
    } catch (error) {
        showError("Failed to save keywords: " + error.message);
    }
}

function clearKeywords() {
    if (confirm('Are you sure you want to clear all keywords?')) {
        const textarea = $('#kw');
        if (textarea) {
            textarea.value = '';
            updateKeywordCount();
            showInfo("Keywords cleared");
        }
    }
}

function updateKeywordCount() {
    const textarea = $('#kw');
    const countElement = $('#keywordCount');
    
    if (!textarea || !countElement) return;
    
    const keywords = textarea.value
        .split(/[\n,]/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
    
    countElement.textContent = keywords.length;
}

// Quick Actions FAB
function initQuickActions() {
    const fab = $('#quickActions');
    if (!fab) {
        console.error('Quick Actions FAB not found');
        return;
    }

    let currentMenu = null;
    
    fab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('FAB clicked, currentMenu:', currentMenu);
        
        if (currentMenu && document.body.contains(currentMenu)) {
            currentMenu.remove();
            currentMenu = null;
            return;
        }
        
        currentMenu = document.createElement('div');
        currentMenu.className = 'quick-actions-menu';
        currentMenu.style.display = 'flex';
        currentMenu.innerHTML = `
            <div class="quick-action-item" data-action="refresh">
                <i class="fas fa-sync-alt"></i>
                <span>Refresh Data</span>
            </div>
            <div class="quick-action-item" data-action="clear-all">
                <i class="fas fa-trash"></i>
                <span>Clear All Blocked</span>
            </div>
            <div class="quick-action-item" data-action="export">
                <i class="fas fa-download"></i>
                <span>Export Data</span>
            </div>
            <div class="quick-action-item" data-action="settings">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
            </div>
        `;
        
        document.body.appendChild(currentMenu);
        
        // Add click handlers for menu items
        currentMenu.querySelectorAll('.quick-action-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const action = this.getAttribute('data-action');
                console.log('Quick action clicked:', action);
                handleQuickAction(action);
                if (currentMenu) {
                    currentMenu.remove();
                    currentMenu = null;
                }
            });
        });
        
        // Close menu when clicking outside
        setTimeout(() => {
            const closeMenu = (e) => {
                if (currentMenu && !currentMenu.contains(e.target) && e.target !== fab) {
                    currentMenu.remove();
                    currentMenu = null;
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 100);
    });
}

function handleQuickAction(action) {
    console.log('Handling quick action:', action);
    switch (action) {
        case 'refresh':
            const refreshBtn = $('#refreshBtn');
            if (refreshBtn) {
                refreshBtn.click();
                showSuccess("Refreshing data...");
            }
            break;
        case 'clear-all':
            if (confirm('Are you sure you want to clear ALL blocked videos?')) {
                clearAllVideos();
            }
            break;
        case 'export':
            exportBlockedVideos();
            break;
        case 'settings':
            switchToTab('enhanced');
            showInfo("Navigating to settings...");
            break;
        default:
            console.warn('Unknown quick action:', action);
    }
}

// Back to Top functionality
function initBackToTop() {
    const backToTopBtn = $('#backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.classList.remove('hiding');
        } else {
            backToTopBtn.classList.remove('show');
            backToTopBtn.classList.add('hiding');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        smoothScrollToTop();
    });

    // Add keyboard support
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            smoothScrollToTop();
        }
    });
}

function smoothScrollToTop() {
    const startPosition = window.pageYOffset;
    const duration = 500;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress)));
        
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }
    
    requestAnimationFrame(scrollStep);
}

// Helper functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    const translations = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    
    if (days > 0) return `${days} ${translations['days-ago'] || 'days ago'}`;
    if (hours > 0) return `${hours} ${translations['hours-ago'] || 'hours ago'}`;
    if (minutes > 0) return `${minutes} ${translations['minutes-ago'] || 'minutes ago'}`;
    return translations['just-now'] || 'Just now';
}

function formatLocalDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getReasonDisplayText(reason) {
    const reasonTexts = {
        'manual': '🚫Manual',
        'keyword': '🔠Keyword', 
        'shorts': '📼Shorts',
        'language': '🌐Language'
    };
    return reasonTexts[reason] || reason;
}

function switchToTab(tabName) {
    $$('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    $$('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetSection = $(`#${tabName}`);
    const targetTab = $(`.tab[data-tab="${tabName}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetTab) targetTab.classList.add('active');
}

// Language functions
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
        lang = 'en';
    }
    
    currentLanguage = lang;
    
    Object.keys(TRANSLATIONS[lang]).forEach(key => {
        const elements = $$(`[id="${key}"]`);
        elements.forEach(element => {
            if (TRANSLATIONS[lang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = TRANSLATIONS[lang][key];
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = TRANSLATIONS[lang][key];
                } else {
                    element.textContent = TRANSLATIONS[lang][key];
                }
            }
        });
    });
    
    chrome.storage.sync.set({ lang: lang });
}

function initLanguageSelector() {
    const langSelect = $('#lang');
    if (!langSelect) return;
    
    chrome.storage.sync.get({ lang: 'en' }, function(result) {
        langSelect.value = result.lang;
        setLanguage(result.lang);
    });
    
    langSelect.addEventListener('change', function() {
        setLanguage(this.value);
    });
}

// Theme functions
function initTheme() {
    const themeBtn = $('#mode');
    if (!themeBtn) return;
    
    chrome.storage.sync.get({ theme: 'dark' }, function(result) {
        const isDark = result.theme === 'dark';
        document.body.classList.toggle('light-theme', !isDark);
        updateThemeButton(isDark);
    });
    
    themeBtn.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        document.body.classList.toggle('light-theme', !isLight);
        chrome.storage.sync.set({ theme: newTheme });
        updateThemeButton(!isLight);
    });
}

function updateThemeButton(isDark) {
    const themeBtn = $('#mode');
    const themeIcon = themeBtn?.querySelector('i');
    const themeText = $('#theme-text');
    
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeText) {
        themeText.textContent = isDark ? 'Dark' : 'Light';
    }
}

// Export functionality
function initExportButton() {
    const exportBtn = $('#btnExport');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', exportBlockedVideos);
}

async function exportBlockedVideos() {
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        if (videos.length === 0) {
            showWarning("No videos to export");
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: VERSION,
            totalVideos: videos.length,
            videos: videos
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Clify-blocked-videos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showSuccess(`Exported ${videos.length} blocked videos`);
        
    } catch (error) {
        console.error('Export error:', error);
        showError("Failed to export videos");
    }
}

// Clear all functionality
function initClearAllButton() {
    const clearBtn = $('#btnUnblockAll');
    if (!clearBtn) return;
    
    clearBtn.addEventListener('click', clearAllVideos);
}

async function clearAllVideos() {
    if (!confirm('Are you sure you want to clear ALL blocked videos? This action cannot be undone.')) {
        return;
    }
    
    try {
        await sendMessageToYouTube({ type: "clearAllVideos" });
        showSuccess("All blocked videos cleared successfully!");
        renderBlockedTable();
        loadDashboardData();
        
        // Refresh search index
        await enhancedSearch.refreshIndex();
        
    } catch (error) {
        showError("Failed to clear videos: " + error.message);
    }
}

// Search and filter functionality
function initSearchAndFilter() {
    const searchInput = $('#search');
    const clearSearch = $('#clearSearch');
    const reasonFilter = $('#reasonFilter');
    const sortFilter = $('#sortFilter');
    const dateRangeFilter = $('#dateRangeFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            handleSearch();
        });
    }
    
    if (reasonFilter) {
        reasonFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
    
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
}

// Initialize everything
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            renderBlockedTable();
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable();
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            }
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}

// Start the dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}