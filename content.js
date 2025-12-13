// content.js - COMPLETE AUTO-SHORTS REMOVAL v7.0.0 - WITH KEYWORD TRACKING
(function() {
    'use strict';
    
    console.log('Clify v7.0.0: Loading content script with automatic Shorts removal...');
    
    const VERSION = "7.0.0";
    const BTN_CLASS = 'Clify-btn-nuclear-fixed';
    let blockedVideos = {};
    let keywords = [];
    let isProcessing = false;
    let globalObserver = null;
    
    // Enhanced configuration with Shorts removal enabled by default
    const CONFIG = {
        removeShorts: true,
        maxBlockedVideos: 90000,
        annotationRemoval: true,
        autoSkipAds: false
    };

    // Stats tracking
    let ClifyStats = {
        dailyActivity: {},
        totalBlocks: 0,
        shortsBlocks: 0,
        manualBlocks: 0,
        keywordBlocks: 0,
        lastUpdated: null
    };

    // Enhanced initialization
    function safeInit() {
        try {
            if (!document.body) {
                setTimeout(safeInit, 100);
                return;
            }
            
            console.log('Clify v7.0.0: Initializing with automatic Shorts removal...');
            
            injectNuclearStyles();
            loadStorageData();
            setupGlobalInterceptor();
            setupGlobalBlockObserver();
            
            // Initial processing
            safeProcessPage();
            removeAllShorts();
            
            // Regular processing intervals
            setInterval(safeProcessPage, 1500);
            setInterval(removeAllShorts, 2000);
            
            observePageChanges();
            
            console.log('Clify v7.0.0: Initialization successful - Shorts removal ACTIVE');
            
        } catch (error) {
            console.error('Clify v7.0.0: Init error:', error);
            setTimeout(safeInit, 1000);
        }
    }

    // AGGRESSIVE SHORTS REMOVAL
    function removeAllShorts() {
        if (!CONFIG.removeShorts) return;
        
        try {
            let removedCount = 0;
            
            const shortsSelectors = [
                'ytd-rich-shelf-renderer[is-shorts]',
                'ytd-reel-shelf-renderer',
                'ytd-reel-item-renderer',
                '#shorts-container',
                '[is-shorts]',
                '[overlay-style="SHORTS"]',
                'ytd-rich-section-renderer[is-shorts]',
                'a[href*="/shorts/"]',
                'ytd-video-renderer a[href*="/shorts/"]',
                'ytd-rich-item-renderer a[href*="/shorts/"]',
                'ytd-grid-video-renderer a[href*="/shorts/"]',
                '[title="Shorts"]',
                '[aria-label="Shorts"]',
                'a[href*="/shorts"]',
                'ytd-guide-entry-renderer a[href*="/shorts"]',
                'tp-yt-paper-item a[href*="/shorts"]',
                'ytd-reel-player-overlay-renderer',
                'ytd-reel-player-header-renderer',
                '#shorts-player',
                '.shorts-container',
                '[class*="shorts"]',
                '[data-shorts]'
            ];
            
            shortsSelectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        if (element && element.isConnected && !element.hasAttribute('data-Clify-removed')) {
                            removeShortsElement(element);
                            removedCount++;
                        }
                    });
                } catch (e) {
                    console.warn('Clify: Shorts selector error:', selector, e);
                }
            });
            
            removeShortsByTextContent();
            removeShortsNavigation();
            removeShortsSections();
            
            if (removedCount > 0) {
                console.log(`Clify: Removed ${removedCount} Shorts elements`);
            }
            
        } catch (error) {
            console.error('Clify: Shorts removal error:', error);
        }
    }

    function removeShortsByTextContent() {
        try {
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.childNodes.length === 1 && 
                    element.childNodes[0].nodeType === Node.TEXT_NODE &&
                    element.childNodes[0].textContent.includes('Shorts') &&
                    !element.hasAttribute('data-Clify-removed')) {
                    
                    const parent = element.closest('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, ytd-guide-entry-renderer');
                    if (parent) {
                        removeShortsElement(parent);
                    }
                }
            });
        } catch (error) {
            console.warn('Clify: Text content removal error:', error);
        }
    }

    function removeShortsElement(element) {
        try {
            let videoId = null;
            let shortsTitle = 'YouTube Shorts';
            
            const titleSelectors = [
                '#video-title',
                'h3 a',
                'a#video-title-link',
                'yt-formatted-string#video-title',
                '[id*="title"] a',
                '[class*="title"] a',
                '#content-attachment #title',
                '.style-scope yt-formatted-string',
                'ytd-reel-item-renderer #video-title',
                '#hover-overlays #video-title'
            ];
            
            for (const selector of titleSelectors) {
                const titleEl = element.querySelector(selector);
                if (titleEl && titleEl.textContent && titleEl.textContent.trim().length > 5) {
                    const extractedTitle = titleEl.textContent.trim();
                    if (extractedTitle !== 'YouTube Shorts' && !extractedTitle.includes('Shorts')) {
                        shortsTitle = extractedTitle;
                        break;
                    }
                }
            }
            
            const links = element.querySelectorAll('a[href*="/shorts/"]');
            if (links.length > 0) {
                const href = links[0].href;
                const match = href.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
                if (match) videoId = match[1];
            }
            
            element.setAttribute('data-Clify-removed', 'true');
            element.style.display = 'none !important';
            element.style.visibility = 'hidden !important';
            element.style.opacity = '0 !important';
            element.style.height = '0 !important';
            element.style.width = '0 !important';
            element.style.margin = '0 !important';
            element.style.padding = '0 !important';
            element.style.overflow = 'hidden !important';
            
            setTimeout(() => {
                if (element && element.parentNode) {
                    try {
                        element.remove();
                    } catch (e) {
                        console.warn('Clify: Could not remove element:', e);
                    }
                }
            }, 50);
            
            if (videoId && !blockedVideos[videoId]) {
                const shortsRecord = {
                    id: videoId,
                    title: shortsTitle,
                    url: `https://www.youtube.com/shorts/${videoId}`,
                    reason: 'shorts',
                    ts: Date.now(),
                    timestamp: new Date().toLocaleString(),
                    isShorts: true,
                    matchingKeywords: [],
                    keywordCount: 0
                };
                
                blockedVideos[videoId] = shortsRecord;
                updateStats(shortsRecord, 'shorts');
                
                try {
                    localStorage.setItem('Clify_blocked_videos', JSON.stringify(blockedVideos));
                } catch (error) {
                    console.error('Clify: Error saving Shorts block:', error);
                }
            }
            
        } catch (error) {
            console.error('Clify: Error removing Shorts element:', error);
        }
    }

    function removeShortsNavigation() {
        try {
            const navSelectors = [
                'a[href*="/shorts"]',
                '[title="Shorts"]',
                '[aria-label="Shorts"]',
                'ytd-guide-entry-renderer a[href*="/shorts"]',
                'tp-yt-paper-item a[href*="/shorts"]'
            ];
            
            navSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const parent = element.closest('ytd-guide-entry-renderer, tp-yt-paper-item, ytd-mini-guide-entry-renderer');
                    if (parent && !parent.hasAttribute('data-Clify-removed')) {
                        parent.setAttribute('data-Clify-removed', 'true');
                        parent.style.display = 'none';
                        parent.style.visibility = 'hidden';
                    }
                });
            });
        } catch (error) {
            console.warn('Clify: Navigation removal error:', error);
        }
    }

    function removeShortsSections() {
        try {
            const sectionSelectors = [
                'ytd-rich-shelf-renderer[is-shorts]',
                'ytd-reel-shelf-renderer',
                '#shorts-container',
                'ytd-rich-section-renderer[is-shorts]',
                'ytd-reel-player-overlay-renderer'
            ];
            
            sectionSelectors.forEach(selector => {
                const sections = document.querySelectorAll(selector);
                sections.forEach(section => {
                    if (!section.hasAttribute('data-Clify-removed')) {
                        section.setAttribute('data-Clify-removed', 'true');
                        section.style.display = 'none';
                        
                        const header = section.previousElementSibling;
                        if (header && header.querySelector && 
                            (header.textContent.includes('Shorts') || 
                             header.querySelector('[title*="Shorts"]') ||
                             header.querySelector('a[href*="/shorts"]'))) {
                            header.style.display = 'none';
                            header.setAttribute('data-Clify-removed', 'true');
                        }
                    }
                });
            });
        } catch (error) {
            console.warn('Clify: Section removal error:', error);
        }
    }

    function injectNuclearStyles() {
        if (document.querySelector('style[data-Clify-styles-fixed]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-Clify-styles-fixed', 'true');
        style.textContent = `
            .${BTN_CLASS} {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                padding: 4px 8px !important;
                border-radius: 6px !important;
                font-size: 10px !important;
                font-weight: 900 !important;
                cursor: pointer !important;
                color: #0A0F1C !important;
                background: linear-gradient(135deg, #c1f11d, #a0d116) !important;
                border: 1px solid rgba(255, 255, 255, 0.4) !important;
                opacity: 0.95 !important;
                font-family: Arial, sans-serif !important;
                z-index: 10001 !important;
                transition: all 0.2s ease !important;
                pointer-events: auto !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                box-shadow: 0 2px 6px rgba(193, 241, 29, 0.5) !important;
                min-width: auto !important;
                line-height: 1.2 !important;
                height: auto !important;
                white-space: nowrap !important;
                display: inline-block !important;
            }
            
            .${BTN_CLASS}:hover {
                opacity: 1 !important;
                background: linear-gradient(135deg, #a0d116, #c1f11d) !important;
                transform: scale(1.05) !important;
                box-shadow: 0 3px 8px rgba(193, 241, 29, 0.7) !important;
            }
            
            ytd-rich-item-renderer, 
            ytd-video-renderer, 
            ytd-grid-video-renderer,
            ytd-compact-video-renderer,
            ytd-reel-item-renderer {
                position: relative !important;
                overflow: visible !important;
            }
            
            #contents ytd-rich-item-renderer,
            #contents ytd-video-renderer,
            ytd-rich-grid-renderer ytd-rich-item-renderer,
            ytd-rich-section-renderer ytd-rich-item-renderer {
                position: relative !important;
                overflow: visible !important;
            }
            
            a#thumbnail, ytd-thumbnail {
                position: relative !important;
            }
            
            [data-Clify-blocked],
            [data-Clify-removed],
            ytd-reel-item-renderer,
            ytd-rich-shelf-renderer[is-shorts],
            ytd-reel-shelf-renderer,
            #shorts-container,
            [is-shorts],
            [overlay-style="SHORTS"],
            ytd-rich-section-renderer[is-shorts],
            a[href*="/shorts/"],
            [title="Shorts"],
            [aria-label="Shorts"],
            ytd-guide-entry-renderer a[href*="/shorts"],
            ytd-reel-player-overlay-renderer,
            .shorts-container,
            [class*="shorts"],
            [data-shorts] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                position: absolute !important;
                left: -9999px !important;
            }
            
            @media (max-width: 768px) {
                .${BTN_CLASS} {
                    padding: 3px 6px !important;
                    font-size: 9px !important;
                    border-radius: 4px !important;
                    top: 4px !important;
                    right: 4px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    function loadStorageData() {
        try {
            const videosData = localStorage.getItem('Clify_blocked_videos');
            blockedVideos = videosData ? JSON.parse(videosData) : {};
            
            const keywordsData = localStorage.getItem('Clify_keywords');
            keywords = keywordsData ? JSON.parse(keywordsData) : [];
            
            const statsData = localStorage.getItem('Clify_stats');
            ClifyStats = statsData ? JSON.parse(statsData) : { 
                dailyActivity: {}, 
                totalBlocks: 0, 
                shortsBlocks: 0,
                manualBlocks: 0,
                keywordBlocks: 0
            };
            
            console.log('Clify: Loaded', keywords.length, 'keywords,', Object.keys(blockedVideos).length, 'blocked videos,', ClifyStats.shortsBlocks, 'Shorts blocked');
            
            safeHideBlockedVideos();
            
        } catch (error) {
            console.error('Clify: Error loading storage data:', error);
            blockedVideos = {};
            keywords = [];
            ClifyStats = { dailyActivity: {}, totalBlocks: 0, shortsBlocks: 0, manualBlocks: 0, keywordBlocks: 0 };
        }
    }

    function saveStats() {
        try {
            localStorage.setItem('Clify_stats', JSON.stringify(ClifyStats));
        } catch (error) {
            console.error('Clify: Error saving stats:', error);
        }
    }

    function updateStats(videoData, reason) {
        try {
            const today = new Date().toISOString().slice(0, 10);
            
            if (!ClifyStats.dailyActivity[today]) {
                ClifyStats.dailyActivity[today] = 0;
            }
            ClifyStats.dailyActivity[today]++;
            
            ClifyStats.totalBlocks = Object.keys(blockedVideos).length;
            
            if (reason === 'shorts') {
                ClifyStats.shortsBlocks = (ClifyStats.shortsBlocks || 0) + 1;
            } else if (reason === 'manual') {
                ClifyStats.manualBlocks = (ClifyStats.manualBlocks || 0) + 1;
            } else if (reason === 'keyword') {
                ClifyStats.keywordBlocks = (ClifyStats.keywordBlocks || 0) + 1;
            }
            
            ClifyStats.lastUpdated = new Date().toISOString();
            saveStats();
            
            console.log('Clify: Stats updated - Total:', ClifyStats.totalBlocks, 'Today:', ClifyStats.dailyActivity[today], 'Shorts:', ClifyStats.shortsBlocks);
            
        } catch (error) {
            console.error('Clify: Error updating stats:', error);
        }
    }

    function getVideoElements() {
        const selectors = [
            'ytd-rich-item-renderer:not([data-Clify-processed]):not([data-Clify-blocked]):not([data-Clify-removed])',
            'ytd-video-renderer:not([data-Clify-processed]):not([data-Clify-blocked]):not([data-Clify-removed])', 
            'ytd-grid-video-renderer:not([data-Clify-processed]):not([data-Clify-blocked]):not([data-Clify-removed])',
            'ytd-compact-video-renderer:not([data-Clify-processed]):not([data-Clify-blocked]):not([data-Clify-removed])'
        ];
        
        const elements = [];
        selectors.forEach(selector => {
            try {
                const found = document.querySelectorAll(selector);
                found.forEach(element => {
                    if (element && element.isConnected && !isShortsElement(element)) {
                        elements.push(element);
                    }
                });
            } catch (e) {
                console.warn('Clify: Selector error', selector, e);
            }
        });
        
        return elements;
    }

    function isShortsElement(element) {
        return element.querySelector && (
            element.querySelector('a[href*="/shorts/"]') ||
            element.getAttribute('is-shorts') === 'true' ||
            element.classList.contains('shorts') ||
            element.textContent.includes('Shorts')
        );
    }

    function extractVideoInfo(videoElement) {
        try {
            if (isShortsElement(videoElement)) {
                let shortsTitle = 'YouTube Shorts';
                
                const titleSelectors = [
                    '#video-title',
                    'h3 a',
                    'a#video-title-link',
                    'yt-formatted-string#video-title',
                    '[id*="title"] a',
                    '[class*="title"] a',
                    '#content-attachment #title',
                    '.style-scope yt-formatted-string',
                    'ytd-reel-item-renderer #video-title',
                    '#hover-overlays #video-title'
                ];
                
                for (const selector of titleSelectors) {
                    const titleEl = videoElement.querySelector(selector);
                    if (titleEl && titleEl.textContent && titleEl.textContent.trim().length > 5) {
                        const extractedTitle = titleEl.textContent.trim();
                        if (extractedTitle !== 'YouTube Shorts' && !extractedTitle.includes('Shorts')) {
                            shortsTitle = extractedTitle;
                            break;
                        }
                    }
                }
                
                const shortsLink = videoElement.querySelector('a[href*="/shorts/"]');
                let videoId = null;
                if (shortsLink && shortsLink.href) {
                    const match = shortsLink.href.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
                    if (match) videoId = match[1];
                }
                
                return {
                    id: videoId || `shorts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    title: shortsTitle,
                    url: shortsLink ? shortsLink.href : `https://www.youtube.com/shorts/${videoId}`,
                    element: videoElement,
                    isShorts: true
                };
            }
            
            const selectors = [
                'a#thumbnail',
                'a.ytd-thumbnail',
                'ytd-thumbnail a',
                'a[href*="/watch?v="]'
            ];
            
            let videoLink = null;
            for (const selector of selectors) {
                videoLink = videoElement.querySelector(selector);
                if (videoLink && videoLink.href && !videoLink.href.includes('/shorts/')) break;
            }
            
            if (!videoLink || !videoLink.href || videoLink.href.includes('/shorts/')) return null;
            
            const url = new URL(videoLink.href, window.location.href);
            let videoId = url.searchParams.get('v');
            
            if (!videoId || videoId.length !== 11) return null;
            
            let title = 'Unknown Video';
            const titleSelectors = [
                '#video-title',
                'h3 a',
                'a#video-title-link',
                'yt-formatted-string#video-title',
                '[id*="title"] a',
                '[class*="title"] a'
            ];
            
            for (const selector of titleSelectors) {
                const titleEl = videoElement.querySelector(selector);
                if (titleEl && titleEl.textContent && titleEl.textContent.trim().length > 5) {
                    title = titleEl.textContent.trim();
                    break;
                }
            }
            
            if (title === 'Unknown Video' || title.length < 3) return null;
            
            return {
                id: videoId,
                title: title,
                url: videoLink.href,
                element: videoElement,
                isShorts: false
            };
            
        } catch (error) {
            console.warn('Clify: Video info extraction error:', error);
            return null;
        }
    }

    function createClifyButton(videoInfo) {
        try {
            const existingBtns = videoInfo.element.querySelectorAll('.' + BTN_CLASS);
            existingBtns.forEach(btn => btn.remove());
            
            const button = document.createElement('button');
            button.className = BTN_CLASS;
            button.textContent = 'HIDE';
            button.setAttribute('data-video-id', videoInfo.id);
            button.setAttribute('data-video-title', videoInfo.title);
            button.setAttribute('title', 'Block this video');
            
            if (videoInfo.element) {
                const computedStyle = window.getComputedStyle(videoInfo.element);
                if (computedStyle.position === 'static') {
                    videoInfo.element.style.position = 'relative';
                }
            }
            
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                console.log('Clify button clicked for video:', videoInfo.id);
                safeBlockVideo(videoInfo, 'manual');
                return false;
            };
            
            return button;
        } catch (error) {
            console.error('Clify: Button creation error:', error);
            return null;
        }
    }

    function processVideoElement(videoElement) {
        try {
            if (videoElement.hasAttribute('data-Clify-processed') || 
                videoElement.hasAttribute('data-Clify-blocked') ||
                videoElement.hasAttribute('data-Clify-removed')) {
                return;
            }
            
            if (isShortsElement(videoElement)) return;
            
            const videoInfo = extractVideoInfo(videoElement);
            if (!videoInfo) {
                videoElement.setAttribute('data-Clify-processed', 'true');
                return;
            }
            
            if (blockedVideos[videoInfo.id]) {
                if (videoElement.parentNode && !videoElement.hasAttribute('data-Clify-blocked')) {
                    videoElement.style.display = 'none';
                    videoElement.setAttribute('data-Clify-blocked', 'true');
                    setTimeout(() => {
                        if (videoElement.parentNode) {
                            videoElement.remove();
                        }
                    }, 50);
                }
                return;
            }
            
            if (shouldBlockByKeywords(videoInfo)) {
                safeBlockVideo(videoInfo, 'keyword');
                return;
            }
            
            const existingBtn = videoElement.querySelector('.' + BTN_CLASS);
            if (existingBtn) existingBtn.remove();
            
            const ClifyButton = createClifyButton(videoInfo);
            if (ClifyButton) {
                videoElement.appendChild(ClifyButton);
                videoElement.setAttribute('data-Clify-processed', 'true');
            }
            
        } catch (error) {
            console.error('Clify: Process video error:', error);
            videoElement.setAttribute('data-Clify-processed', 'true');
        }
    }

    function safeProcessPage() {
        if (isProcessing) return;
        isProcessing = true;
        
        try {
            const videoElements = getVideoElements();
            for (let i = 0; i < videoElements.length; i++) {
                processVideoElement(videoElements[i]);
            }
        } catch (error) {
            console.error('Clify: Page processing error:', error);
        } finally {
            isProcessing = false;
        }
    }

    // KEYWORD TRACKING FUNCTIONS
    function getMatchingKeywords(videoInfo) {
        if (!keywords || keywords.length === 0) return [];
        
        const title = videoInfo.title.toLowerCase();
        const matchingKeywords = [];
        
        for (let i = 0; i < keywords.length; i++) {
            const keyword = keywords[i];
            if (!keyword || typeof keyword !== 'string') continue;
            
            const cleanKeyword = keyword.trim().toLowerCase();
            if (cleanKeyword && title.includes(cleanKeyword)) {
                matchingKeywords.push(keyword.trim());
            }
        }
        return matchingKeywords;
    }

    function shouldBlockByKeywords(videoInfo) {
        const matchingKeywords = getMatchingKeywords(videoInfo);
        return matchingKeywords.length > 0;
    }

    function safeBlockVideo(videoInfo, reason) {
        try {
            console.log('Clify: BLOCKING VIDEO - ID:', videoInfo.id, 'Reason:', reason, 'Title:', videoInfo.title);
            
        let matchingKeywords = [];
        if (reason === 'keyword') {
            matchingKeywords = getMatchingKeywords(videoInfo);
        }
        
        const blockedRecord = {
            id: videoInfo.id,
            title: videoInfo.title,
            url: videoInfo.url,
            reason: reason,
            ts: Date.now(),
            timestamp: new Date().toLocaleString(),
            isShorts: videoInfo.isShorts || false,
            matchingKeywords: matchingKeywords,
            keywordCount: matchingKeywords.length
        };
        
        blockedVideos[videoInfo.id] = blockedRecord;
        updateStats(videoInfo, reason);
        
        if (videoInfo.element && videoInfo.element.parentNode) {
            videoInfo.element.style.display = 'none';
            videoInfo.element.setAttribute('data-Clify-blocked', 'true');
            
            setTimeout(() => {
                if (videoInfo.element && videoInfo.element.parentNode) {
                    videoInfo.element.remove();
                }
            }, 100);
        }
        
        try {
            localStorage.setItem('Clify_blocked_videos', JSON.stringify(blockedVideos));
        } catch (error) {
            console.error('Clify: localStorage save error:', error);
        }
        
        return true;
        
    } catch (error) {
        console.error('Clify: Block video error:', error);
        return false;
    }
}

    function safeHideBlockedVideos() {
        try {
            for (const videoId in blockedVideos) {
                if (blockedVideos.hasOwnProperty(videoId)) {
                    const elements = document.querySelectorAll(`a[href*="${videoId}"]`);
                    for (let i = 0; i < elements.length; i++) {
                        const link = elements[i];
                        const videoElement = link.closest([
                            'ytd-rich-item-renderer', 
                            'ytd-video-renderer', 
                            'ytd-grid-video-renderer', 
                            'ytd-compact-video-renderer'
                        ].join(','));
                        
                        if (videoElement && videoElement.parentNode && !videoElement.hasAttribute('data-Clify-blocked')) {
                            videoElement.style.display = 'none';
                            videoElement.setAttribute('data-Clify-blocked', 'true');
                            setTimeout(() => {
                                if (videoElement.parentNode) {
                                    videoElement.remove();
                                }
                            }, 50);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Clify: Hide blocked error:', error);
        }
    }

    function setupGlobalInterceptor() {
        document.addEventListener('click', handleGlobalClick, true);
    }

    function handleGlobalClick(event) {
        try {
            const ClifyButton = event.target.closest('.' + BTN_CLASS);
            if (ClifyButton) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                
                const videoId = ClifyButton.getAttribute('data-video-id');
                const videoTitle = ClifyButton.getAttribute('data-video-title') || 'Video';
                
                if (videoId) {
                    const element = ClifyButton.closest([
                        'ytd-rich-item-renderer', 
                        'ytd-video-renderer', 
                        'ytd-grid-video-renderer', 
                        'ytd-compact-video-renderer'
                    ].join(','));
                    
                    safeBlockVideo({
                        id: videoId,
                        title: videoTitle,
                        element: element
                    }, 'manual');
                }
                return false;
            }
        } catch (error) {
            console.error('Clify: Click handler error:', error);
        }
    }

    function setupGlobalBlockObserver() {
        if (globalObserver) globalObserver.disconnect();
        
        globalObserver = new MutationObserver(function(mutations) {
            let shouldCheck = false;
            let shouldRemoveShorts = false;
            
            for (let mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.querySelector && node.querySelector('a[href*="/watch?v="]')) {
                                shouldCheck = true;
                            }
                            
                            if (node.querySelector && (
                                node.querySelector('a[href*="/shorts/"]') ||
                                node.querySelector('[is-shorts]') ||
                                node.textContent.includes('Shorts')
                            )) {
                                shouldRemoveShorts = true;
                            }
                        }
                    }
                }
                if (shouldCheck || shouldRemoveShorts) break;
            }
            
            if (shouldCheck) {
                setTimeout(() => {
                    safeProcessPage();
                    safeHideBlockedVideos();
                }, 500);
            }
            
            if (shouldRemoveShorts) {
                setTimeout(removeAllShorts, 100);
            }
        });
        
        globalObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function observePageChanges() {
        const observer = new MutationObserver(function(mutations) {
            let shouldProcess = false;
            let shouldRemoveShorts = false;
            
            for (let mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.querySelector && node.querySelector('a[href*="/watch?v="]')) {
                                shouldProcess = true;
                            }
                            if (node.querySelector && node.querySelector('a[href*="/shorts/"]')) {
                                shouldRemoveShorts = true;
                            }
                        }
                    }
                }
                if (shouldProcess || shouldRemoveShorts) break;
            }
            
            if (shouldProcess) setTimeout(safeProcessPage, 1000);
            if (shouldRemoveShorts) setTimeout(removeAllShorts, 100);
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Message handling
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Clify: Content script received message:', request.type);
        
        try {
            switch (request.type) {
                case "getBlockedVideos":
                    sendResponse({ blockedVideosMap: blockedVideos, success: true });
                    break;
                    
                case "getKeywords":
                    sendResponse({ keywords: keywords, success: true });
                    break;
                    
                case "getStats":
                    const today = new Date().toISOString().slice(0, 10);
                    const videoArray = Object.values(blockedVideos);
                    
                    const reasonStats = {
                        manual: videoArray.filter(v => v.reason === 'manual').length,
                        keyword: videoArray.filter(v => v.reason === 'keyword').length,
                        shorts: videoArray.filter(v => v.reason === 'shorts').length,
                        language: videoArray.filter(v => v.reason === 'language').length
                    };
                    
                    sendResponse({
                        totalBlocks: videoArray.length,
                        todayBlocks: videoArray.filter(v => new Date(v.ts).toISOString().slice(0, 10) === today).length,
                        manualBlocks: reasonStats.manual,
                        keywordBlocks: reasonStats.keyword,
                        shortsBlocks: reasonStats.shorts,
                        languageBlocks: reasonStats.language,
                        activeKeywords: keywords.length,
                        dailyActivity: ClifyStats.dailyActivity || {},
                        success: true
                    });
                    break;
                    
                case "saveKeywords":
                    keywords = request.keywords || [];
                    if (keywords.length > 5000) {
                        keywords = keywords.slice(0, 5000);
                        console.log('Clify: Limited keywords to 5000 (maximum supported)');
                    }
                    try {
                        localStorage.setItem('Clify_keywords', JSON.stringify(keywords));
                        sendResponse({ success: true });
                        setTimeout(safeProcessPage, 100);
                    } catch (e) {
                        sendResponse({ success: false, error: e.message });
                    }
                    break;
                    
                case "unblockVideo":
                    delete blockedVideos[request.videoId];
                    try {
                        localStorage.setItem('Clify_blocked_videos', JSON.stringify(blockedVideos));
                        ClifyStats.totalBlocks = Object.keys(blockedVideos).length;
                        saveStats();
                        sendResponse({ success: true });
                    } catch (e) {
                        sendResponse({ success: false, error: e.message });
                    }
                    break;
                    
                case "clearAllVideos":
                    blockedVideos = {};
                    ClifyStats = { dailyActivity: {}, totalBlocks: 0, shortsBlocks: 0, manualBlocks: 0, keywordBlocks: 0 };
                    try {
                        localStorage.removeItem('Clify_blocked_videos');
                        localStorage.setItem('Clify_stats', JSON.stringify(ClifyStats));
                        sendResponse({ success: true });
                        setTimeout(() => location.reload(), 500);
                    } catch (e) {
                        sendResponse({ success: false, error: e.message });
                    }
                    break;
                    
                case "refreshStats":
                    sendResponse({ success: true });
                    break;
                    
                case "toggleShortsRemoval":
                    CONFIG.removeShorts = request.enabled !== false;
                    if (CONFIG.removeShorts) removeAllShorts();
                    sendResponse({ success: true });
                    break;
                    
                case "saveEnhancedConfig":
                    if (request.config) {
                        CONFIG.removeShorts = request.config.removeShorts !== false;
                        CONFIG.annotationRemoval = request.config.annotationRemoval !== false;
                    }
                    sendResponse({ success: true });
                    break;
                    
                default:
                    console.warn('Clify: Unknown message type:', request.type);
                    sendResponse({ success: false, error: 'Unknown message type: ' + request.type });
            }
        } catch (error) {
            console.error('Clify: Message handler error:', error);
            sendResponse({ 
                success: false, 
                error: error.message 
            });
        }
        
        return true;
    });

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }
    
})();
