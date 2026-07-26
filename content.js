// content.js - CLIFY v16.0.0
(function() {
    'use strict';
    
    console.log('Clify v16.0.0: Loading next-level content script...');
    
    const VERSION = "16.0.0";
    const BTN_CLASS = 'clify-btn-nuclear';
    const BLOCK_CHANNEL_BTN = 'clify-block-channel-btn';
    let blockedVideos = {};
    let blockedChannels = {};
    let whitelistedChannels = {};
    let keywords = [];
    let watchLaterQueue = [];
    let usageSession = { start: Date.now(), adsBlocked: 0, shortsBlocked: 0, sponsorsSkipped: 0, videosWatched: 0 };
    let isProcessing = false;
    let globalObserver = null;
    let lastBlockedId = null;
    let undoTimer = null;
    
    const CONFIG = {
        removeShorts: true,
        maxBlockedVideos: 500000,
        annotationRemoval: true,
        autoSkipAds: true,
        blurMode: false,
        scheduledBlocking: false,
        scheduleStart: 0,
        scheduleEnd: 24,
        blockChannelButton: true,
        adBlocker: true,
        adBlockerSkipAds: true,
        adBlockerBlockBanner: true,
        focusMode: false,
        hideTrending: false,
        autoConfirmPause: false,
        volumeBoost: 100,
        pipButton: false,
        keyboardShortcuts: false,
        skipSponsors: true,
        sponsorCategories: ['sponsor', 'selfpromo', 'interaction', 'intro', 'outro', 'preview', 'hook', 'filler', 'music_offtopic'],
        sponsorShowOverlay: true,
        forceQuality: false,
        preferredQuality: '1080',
        hideComments: false,
        languageBlock: false,
        preferredLanguages: [],
        contentDensity: true,
        watchLater: false,
        readingMode: false,
        liveStreamCleaner: true,
        ageGateBypass: true,
        audioEqualizer: false,
        eqGains: [0, 0, 0, 0, 0],
        eqPreset: 'flat',
        elementPicker: false,
        customBlockedSelectors: [],
        shortcutBindings: {
            blockVideo: 'alt+b',
            focusMode: 'alt+f',
            pip: 'alt+p',
            muteTab: 'alt+m',
            readingMode: 'alt+r',
            watchLater: 'alt+q',
            elementPicker: 'alt+e',
            toggleAds: 'alt+a',
            toggleShorts: 'alt+s'
        }
    };

    // =============================================
    // NATIVE AD BLOCKER - IN-PAGE ELEMENT REMOVAL
    // =============================================
    let adsBlockedCount = 0;

    const YOUTUBE_AD_SELECTORS = [
        // ── Feed / display ad renderers ──────────────────────────────────
        'ytd-ad-slot-renderer',
        'ytd-ad-slot-renderer:not([hidden])',
        'ytd-display-ad-renderer',
        'ytd-display-ad-renderer:not([hidden])',
        'ytd-promoted-sparkles-web-renderer',
        'ytd-promoted-video-renderer',
        'ytd-promoted-video-renderer:not([hidden])',
        'ytd-ad-inline-playlist-renderer',
        'ytd-ad-video-info-renderer',
        'ytd-ad-break-renderer',
        'ytd-ad-poll-renderer',
        'ytd-ad-introduction-renderer',
        'ytd-ad-slot-with-body-renderer',
        'ytd-ad-slot-content-renderer',
        'ytd-ad-slot-content-renderer:not([hidden])',
        'ytd-ad-pod-renderer',
        'ytd-in-player-ad-slot-renderer',
        'ytd-ad-shelf-renderer',
        'ytd-companion-slot-renderer',
        'ytd-companion-ad-renderer',
        'ytd-ad-info-card-renderer',
        'ytd-in-feed-ad-layout-renderer',
        'ytd-in-feed-ad-layout-renderer:not([hidden])',
        'ytd-action-companion-ad-renderer',
        'ytd-carousel-ad-renderer',
        // ── Banner / promo renderers ─────────────────────────────────────
        'ytd-statement-banner-renderer',
        'ytd-statement-banner-renderer[show-close-button]',
        'ytd-primetime-promo-renderer',
        'ytd-banner-promo-renderer',
        'ytd-single-ad-masthead-renderer',
        'ytd-video-masthead-ad-v9-renderer',
        'ytd-mealbar-promo-renderer',
        // ── Shopping / merch / product shelves ────────────────────────────
        'ytd-merch-shelf-renderer',
        'ytd-product-shelf-renderer',
        'ytd-compact-shelf-renderer',
        'ytd-shopping-companion-renderer',
        'ytd-buying-guide-renderer',
        'ytd-offer-module-renderer',
        'ytd-transaction-bottom-shelf-renderer',
        'ytd-product-renderer',
        'ytd-compact-product-renderer',
        'ytd-structured-description-content-renderer ytd-merchandise-shelf-renderer',
        'ytd-compact-video-renderer[data-shelf-id]',
        // ── Engagement panels (shopping, etc.) ───────────────────────────
        'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-shopping"]',
        // ── Masthead / header ads ────────────────────────────────────────
        '#masthead-ad',
        '#masthead-ad-slot',
        'ytd-video-masthead-ad-v9-renderer',
        'ytd-single-ad-masthead-renderer',
        // ── Overlay ads (player) ─────────────────────────────────────────
        '.ytp-ad-overlay-container',
        '.ytp-ad-text-overlay',
        '.ytp-ad-image-overlay',
        '.ytp-ad-player-overlay',
        '.ytp-ad-player-overlay:not([hidden])',
        '.ytp-ad-display-overlay',
        '.ytp-ad-display-overlay:not([hidden])',
        '.ytp-ad-overlay-ad-container',
        '.ytp-ad-iframe-overlay',
        '.ytp-ad-overlay-ad-info',
        '.ytp-ad-overlay-wrapper',
        '.ytp-ad-overlay-close-container',
        '.ytp-ad-image-overlay img',
        // ── Video ad containers ──────────────────────────────────────────
        '.video-ads',
        '.video-ads:not(.ytp-ad-text)',
        '.ytp-ad-module',
        '.ytp-ad-survey',
        '.ytp-ad-progress',
        '#player-ads',
        'div[class*="ytp-ad"]',
        // ── Ad UI controls (skip buttons, CTAs, surveys) ─────────────────
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern',
        '.ytp-skip-ad-button',
        '.ytp-ad-skip-button-slot',
        '.ytp-ad-skip-button-slot button',
        '.ytp-ad-skip-button-slot .ytp-ad-skip-button-modern',
        'button.ytp-ad-skip-button-modern',
        '.ytp-ad-skip-link',
        'button[class*="skip"]',
        '.ytp-ad-poll-overlay',
        '.ytp-ad-survey-close-button',
        '.ytp-ad-survey-body',
        '.ytp-ad-survey-prompt',
        '.ytp-ad-cta-button',
        '.ytp-ad-text-link',
        '.ytp-ad-button-text',
        'button.ytp-ad-button',
        '.ytp-ad-endorser-image',
        '.ytp-ad-choices',
        '.ytp-ad-image-overlay img',
        '.ytp-ad-iframe-overlay',
        // ── "Are you still watching?" ────────────────────────────────────
        '#player-you-there-message',
        // ── Promoted content in feed grids ───────────────────────────────
        'ytd-rich-item-renderer:has(ytd-ad-slot-renderer)',
        'ytd-rich-item-renderer:has(ytd-display-ad-renderer)',
        'ytd-rich-item-renderer:has(ytd-promoted-video-renderer)',
        'ytd-rich-item-renderer:has(ytd-in-feed-ad-layout-renderer)',
        'ytd-rich-section-renderer:has(ytd-statement-banner-renderer)',
        'ytd-rich-section-renderer:has(ytd-primetime-promo-renderer)',
        'ytd-rich-section-renderer:has(ytd-banner-promo-renderer)',
        'ytd-item-section-renderer:has(ytd-promoted-video-renderer)',
        // ── Promoted in compact / search results ─────────────────────────
        'ytd-compact-promoted-renderer',
        'ytd-item-section-renderer:has(ytd-promoted-sparkles-web-renderer)',
        // ── Ad notification prompts ──────────────────────────────────────
        'ytd-notification-topbar-button-renderer:has([data-ad-id])',
        // ── Data-attribute based selectors ───────────────────────────────
        '[data-ad-slot-id]',
        '[data-ad-id]',
        '[data-ad-position]',
        '[data-ad-session-id]',
        'ytd-promoted-video-renderer[data-ad-id]',
        'ytd-ad-slot-renderer[data-ad-slot-id]',
        // ── Modern YouTube ad patterns (2025-2026) ──────────────────────
        'ytd-ad-slot-renderer ytd-ad-slot-renderer',
        'ytd-ad-slot-renderer:only-child',
        'ytd-ad-slot-renderer:not(:empty)',
        'ytd-video-secondary-info-renderer ytd-ad-slot-renderer',
        'ytd-watch-metadata ytd-ad-slot-renderer',
        // ── Generic attribute selectors (catch-all) ──────────────────────
        '[class*="ytp-ad-overlay"]:not(.ytp-ad-overlay-container)',
        '[class*="ytp-ad-survey"]',
        '[class*="ytp-ad-poll"]',
        '[class*="ytp-ad-cta"]',
        'ytd-ad-slot-renderer[class*="ad"]',
        'ytd-ad-slot-renderer[engagement-panel]',
        // ── YouTube Shorts ad patterns ───────────────────────────────────
        'ytd-reel-shelf-renderer:has(ytd-promoted-video-renderer)',
        'ytd-reel-item-renderer:has(ytd-ad-slot-renderer)',
        'ytd-ad-shelf-renderer ytd-promoted-video-renderer',
        // ── YouTube Music ad patterns ────────────────────────────────────
        'ytmusic-card-shelf-renderer:has(ytmusic-ad-banner-renderer)',
        'ytmusic-ad-banner-renderer',
        'ytmusic-player-page ytd-ad-slot-renderer',
        // ── YouTube TV / Leanback ad patterns ────────────────────────────
        '.ytp-ad-player-overlay-image',
        '.ytp-ad-player-overlay-instream',
        '.ytp-ad-text:not(.ytp-ad-text-link)',
        '.ytp-ad-video-url',
        '.ytp-ad-video-info',
        '.ytp-ad-fullscreen-button',
        // ── Sponsor card overlays ────────────────────────────────────────
        '.ytp-sponsored-card-overlay',
        '.ytp-card-overlay',
        'ytd-sponsored-card-chip-renderer',
        // ── Companion / info panels ──────────────────────────────────────
        '.ytp-ad-companion',
        '.ytp-ad-companion-slot',
        '.ytp-ad-companion-close',
        'ytd-video-description-infocards-section-renderer',
        // ── End screen promoted items ────────────────────────────────────
        'ytd-end-screen-video-renderer[promoted]',
        'ytd-end-screen-video-renderer[data-promoted]',
        'ytd-end-screen-slot-renderer:has(ytd-promoted-video-renderer)',
        // ── Generic catch-all patterns ───────────────────────────────────
        'ytd-ad-renderer',
        'ytd-promoted-content-renderer',
        'ytd-ad-info-renderer',
        'ytd-promoted-.sparkles',
        'ytd-primetime-promo-renderer',
        'ytd-ad-layout-breaker-renderer',
        'ytd-ad-layout-renderer',
        'ytd-ad-slot-renderer-impl'
    ];

    const AD_BANNER_SELECTORS = [
        '#masthead-ad',
        'ytd-ad-slot-renderer',
        'ytd-display-ad-renderer',
        'ytd-promoted-sparkles-web-renderer',
        'ytd-banner-promo-renderer',
        'ytd-mealbar-promo-renderer',
        'ytd-statement-banner-renderer',
        'ytd-primetime-promo-renderer',
        'ytd-in-feed-ad-layout-renderer',
        'ytd-promoted-video-renderer',
        'ytd-ad-slot-with-body-renderer',
        'ytd-ad-slot-content-renderer',
        'ytd-companion-ad-renderer',
        'ytd-ad-info-card-renderer',
        'ytd-ad-introduction-renderer',
        'ytd-shopping-companion-renderer',
        'ytd-buying-guide-renderer',
        'ytd-ad-pod-renderer',
        'ytd-in-player-ad-slot-renderer',
        'ytd-rich-item-renderer:has(ytd-ad-slot-renderer)',
        'ytd-rich-item-renderer:has(ytd-display-ad-renderer)',
        'ytd-rich-item-renderer:has(ytd-promoted-video-renderer)',
        'ytd-rich-item-renderer:has(ytd-in-feed-ad-layout-renderer)',
        'ytd-rich-section-renderer:has(ytd-statement-banner-renderer)',
        'ytd-rich-section-renderer:has(ytd-primetime-promo-renderer)',
        'ytd-rich-section-renderer:has(ytd-banner-promo-renderer)'
    ];

    function removeYouTubeAds() {
        if (!CONFIG.adBlocker) return;
        
        try {
            let removed = 0;
            let bannersRemoved = 0;
            let skipped = 0;

            // 1) Auto-click skip buttons FIRST (before elements get hidden)
            if (CONFIG.adBlockerSkipAds) {
                const skipSelectors = [
                    '.ytp-ad-skip-button',
                    '.ytp-ad-skip-button-modern',
                    '.ytp-skip-ad-button',
                    'button.ytp-ad-skip-button-modern',
                    '.ytp-ad-skip-button-slot button',
                    '.ytp-ad-skip-button-slot',
                    'button[class*="skip"]',
                    '.ytp-ad-skip-link',
                    '.ytp-ad-skip-button-slot .ytp-ad-skip-button-modern',
                    'button.ytp-ad-skip-button',
                    '.ytp-ad-skip-button-container button',
                    'div.ytp-ad-skip-button-slot'
                ];
                skipSelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(btn => {
                        if (btn && btn.offsetParent !== null && !btn.hasAttribute('data-clify-skip-done')) {
                            btn.setAttribute('data-clify-skip-done', 'true');
                            try {
                                btn.click();
                                skipped++;
                                console.log('Clify Ad Blocker: Auto-skipped ad');
                            } catch(e) {}
                        }
                    });
                });
                // Force-skip: seek past the ad
                const video = document.querySelector('video');
                if (video) {
                    const adShowing = document.querySelector('.ad-showing');
                    if (adShowing && video.duration && video.duration > 0 && video.currentTime < video.duration - 0.5) {
                        try {
                            video.currentTime = video.duration - 0.1;
                            skipped++;
                        } catch(e) {}
                    }
                    // Mute during overlay ads
                    const adOverlay = document.querySelector('.ytp-ad-overlay-container');
                    if (adOverlay && !video.paused && !video.muted) {
                        try { video.muted = true; } catch(e) {}
                    }
                    // Unmute after ad ends
                    if (!adShowing && !adOverlay && video.muted && video.dataset.clifyMuted === 'true') {
                        try {
                            video.muted = false;
                            delete video.dataset.clifyMuted;
                        } catch(e) {}
                    }
                }
                if (skipped > 0) {
                    chrome.runtime.sendMessage({ type: "incrementSkipped", count: skipped }).catch(() => {});
                }
            }

            // 2) Count banner/overlay ads using their own tracking attribute
            if (CONFIG.adBlockerBlockBanner) {
                AD_BANNER_SELECTORS.forEach(selector => {
                    try {
                        document.querySelectorAll(selector).forEach(el => {
                            if (el && el.isConnected && !el.hasAttribute('data-clify-banner-counted')) {
                                el.setAttribute('data-clify-banner-counted', 'true');
                                bannersRemoved++;
                            }
                        });
                    } catch(e) {}
                });
                if (bannersRemoved > 0) {
                    chrome.runtime.sendMessage({ type: "incrementBannersRemoved", count: bannersRemoved }).catch(() => {});
                }
            }

            // 3) Remove ALL ad elements — batch DOM reads then writes
            const toRemove = [];
            YOUTUBE_AD_SELECTORS.forEach(selector => {
                try {
                    document.querySelectorAll(selector).forEach(el => {
                        if (el && el.isConnected && !el.hasAttribute('data-clify-ad-removed')) {
                            // Safety: don't destroy the actual video player
                            if (el.closest('.html5-video-player') && !el.classList.toString().includes('ytp-ad') && !el.classList.toString().includes('video-ads')) {
                                return;
                            }
                            toRemove.push(el);
                        }
                    });
                } catch(e) {}
            });
            toRemove.forEach(el => {
                el.setAttribute('data-clify-ad-removed', 'true');
                el.style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;max-height:0!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important;width:0!important;margin:0!important;padding:0!important;';
                setTimeout(() => { if (el.parentNode) try { el.remove(); } catch(e) {} }, 50);
                removed++;
            });

            // 4) Remove annotations & info cards (separate tracking attribute)
            if (CONFIG.annotationRemoval) {
                const annotationSelectors = [
                    '.ytp-ce-element', '.ytp-ce-element-show',
                    '.ytp-cards-teaser', '.ytp-cards-button-row', '.ytp-cardsbutton-wheel',
                    '.annotation', '.iv-branding', '.iv-promo', '.iv-tab-content', '.iv-action-share',
                    '.ytp-ce-covering-overlay', '.ytp-ce-shadow', '.ytp-ce-video-overlay',
                    '.ytp-ce-channel-thumbnail', '.ytp-ce-channel-text', '.ytp-ce-channel-title',
                    '.ytp-ce-playlist', '.ytp-ce-playlist-text',
                    '.ytp-endscreen-content', '.ytp-endscreen',
                    '.ytp-cued-thumbnail-overlay:not(.ytp-endscreen-content)',
                    '.ytp-gradient-top', '.ytp-gradient-bottom',
                    '.ytp-paid-content-overlay',
                    '.ytp-suggested-action', '.ytp-suggested-action-arrow',
                    '.ytp-chapter-container', '.ytp-cards-ovl', '.ytp-cards-layer',
                    '.ytp-ce-max-width',
                    '.ytp-videowall-still', '.ytp-videowall-still-info'
                ];
                annotationSelectors.forEach(selector => {
                    try {
                        document.querySelectorAll(selector).forEach(el => {
                            if (el && el.isConnected && !el.hasAttribute('data-clify-annotation-removed')) {
                                el.setAttribute('data-clify-annotation-removed', 'true');
                                el.style.cssText = 'display:none!important;pointer-events:none!important;';
                                removed++;
                            }
                        });
                    } catch(e) {}
                });
            }

            // 5) Procedural cosmetic filtering — match by text content, attributes
            try {
                // Hide elements whose visible text matches known ad patterns
                document.querySelectorAll('ytd-video-description-infocards-section-renderer > div, ytd-structured-description-content-renderer > div').forEach(el => {
                    if (el && el.isConnected && !el.hasAttribute('data-clify-ad-removed')) {
                        const text = (el.textContent || '').toLowerCase();
                        if (/shop\s+now|buy\s+now|visit\s+\w+\s+store|merch(?:andise)?|limited[- ]?time\s+offer|discount|promo\s+code|coupon/i.test(text)) {
                            el.setAttribute('data-clify-ad-removed', 'true');
                            el.style.cssText = 'display:none!important;';
                            removed++;
                        }
                    }
                });
                // Hide promoted search result cards
                document.querySelectorAll('ytd-item-section-renderer ytd-promoted-sparkles-web-renderer, ytd-item-section-renderer ytd-promoted-video-renderer').forEach(el => {
                    if (el && el.isConnected && !el.hasAttribute('data-clify-ad-removed')) {
                        const parent = el.closest('ytd-item-section-renderer');
                        if (parent && !parent.hasAttribute('data-clify-ad-removed')) {
                            parent.setAttribute('data-clify-ad-removed', 'true');
                            parent.style.cssText = 'display:none!important;';
                            removed++;
                        }
                    }
                });
                // Hide promoted channels in search results
                document.querySelectorAll('ytd-compact-promoted-renderer, ytd-promoted-compact-renderer').forEach(el => {
                    if (el && el.isConnected && !el.hasAttribute('data-clify-ad-removed')) {
                        el.setAttribute('data-clify-ad-removed', 'true');
                        el.style.cssText = 'display:none!important;';
                        removed++;
                    }
                });
            } catch(e) {}
            
            if (removed > 0) {
                adsBlockedCount += removed;
                usageSession.adsBlocked = (usageSession.adsBlocked || 0) + removed;
                chrome.runtime.sendMessage({ type: "incrementAdsBlocked", count: removed }).catch(() => {});
                flushUsageStats();
                if (adsBlockedCount % 10 === 0) {
                    console.log(`Clify Ad Blocker: ${adsBlockedCount} ad elements removed this session`);
                }
            }
        } catch (error) {}
    }

    // Block third-party ad network requests by overriding fetch/XHR for ad URLs
    let interceptActive = false;
    function interceptAdRequests() {
        if (!CONFIG.adBlocker || interceptActive) return;
        interceptActive = true;
        
        try {
            const adDomains = [
                // Google ad network
                'googlesyndication', 'doubleclick.net', 'googleads',
                'adservice.google', 'pagead2.googlesyndication',
                'tpc.googlesyndication', 'securepubads.g.doubleclick.net',
                'partner.googleadservices.com', 'googleadservices.com',
                'ads.youtube.com', 's0.2mdn.net', 'cm.g.doubleclick.net',
                'fundingchoicesmessages.google.com', 'play.google.com/log',
                'youtube.com/api/stats/ads', 'youtube.com/api/stats/qoe',
                'youtube.com/get_video_info', 'youtube.com/generate_204',
                'youtube.com/ptracking', 's.youtube.com',
                'youtube.com/api/stats/', 'youtube.com/api/stats/attribution',
                'googleads.g.doubleclick.net',
                // Twitter / X ads
                'static.ads-twitter.com', 'analytics.twitter.com',
                'ads-api.twitter.com',
                // Facebook / Meta
                'connect.facebook.net', 'ads.facebook.com',
                'facebook.com/tr', 'pixel.facebook.com',
                // LinkedIn
                'ads.linkedin.com', 'snap.licdn.com',
                // Amazon
                'amazon-adsystem.com', 'aax.amazon-adsystem.com',
                // Programmatic ad exchanges
                'ad.turn.com', 'adnxs.com', 'adsrvr.org',
                'rubiconproject.com', 'rubicon.com',
                'casalemedia.com', 'pubmatic.com', 'openx.net',
                'indexww.com', 'sharethrough.com', 'sonobi.com',
                'teads.tv', 'bidswitch.net', 'ipredictive.com',
                'media.net', 'contextual.media.net',
                'criteo.com', 'criteo.net', 'sync.criteo.com',
                // Native ad networks
                'taboola.com', 'outbrain.com', 'nativo.com',
                'sharethrough.com', 'adskeeper.com',
                // Pop / push ad networks
                'ad-maven.com', 'propellerads.com', 'popads.net',
                'popcash.net', 'monetag.com', 'adsterra.com',
                'exoclick.com', 'trafficjunky.com', 'juicyads.com',
                'trafficfactory.com',
                // Video ad servers
                'video.unrulymedia.com', 'spotxchange.com',
                'springserve.com', 'jwpix.com',
                // Analytics / tracking
                'google-analytics.com', 'googletagmanager.com',
                'analytics.google.com', 'stats.g.doubleclick.net',
                'scorecardresearch.com', 'b.scorecardresearch.com',
                'sb.scorecardresearch.com',
                'chartbeat.com', 'chartbeat.net',
                'hotjar.com', 'fullstory.com', 'mouseflow.com',
                'crazyegg.com', 'optimizely.com',
                'clarity.ms', 'bat.bing.com',
                'mathtag.com', 'moatads.com',
                'demdex.net', 'bluekai.com', 'quantserve.com',
                'everesttech.net', 'cm.everesttech.net',
                'pixel.tapad.com', 'tags.tiqcdn.com',
                // Mobile / app attribution
                'branch.io', 'adjust.com', 'appsflyer.com',
                'app-measurement.com', 'instabug.com',
                // Additional ad networks
                'ttd.net', 'prebid.org',
                'ads.yahoo.com', 'adserver.yahoo.com',
                'bounceexchange.com', 'wunderkind.co',
                'krxd.net', 'blueconic.net',
                'permutive.com', 'permutive.app',
                'liveramp.com', 'rlcdn.com',
                'adsymptotic.com', 'adsymptotic.net',
                'bidgear.com', 'adhigh.net',
                'adform.net', 'adform.com',
                'serving-sys.com', 'adtech.com',
                'yieldmo.com', 'smartyads.com',
                'adroll.com', 'rollmob.com',
                'cuelinks.com', 'viglink.com',
                'skimlinks.com', 'monetizer101.com',
                'buysellads.com', 'carbonads.com',
                'carbonads.net', 'srv.tunethat.com',
                'buysellads.net'
            ];

            const adUrlPatterns = [
                // YouTube ad-specific URLs
                /youtube\.com\/api\/stats\/ads/i,
                /youtube\.com\/get_video_info.*adformat/i,
                /youtube\.com\/generate_204.*ad/i,
                /youtube\.com\/ptracking/i,
                /youtube\.com\/api\/stats\/qoe/i,
                /youtube\.com\/api\/stats\/attribution/i,
                /s\.youtube\.com/i,
                /ads\.youtube\.com/i,
                // Google ad URLs
                /pagead2\.googlesyndication\.com/i,
                /tpc\.googlesyndication\.com/i,
                /video-ad-stats\.googlesyndication\.com/i,
                /www\.google\.com\/pagead/i,
                /fundingchoicesmessages\.google\.com/i,
                /play\.google\.com\/log/i,
                // Generic ad-serving URL patterns
                /\/ad\/?\.js/i,
                /\/adsense/i,
                /\/adserver/i,
                /\/adview/i,
                /\/adclick/i,
                /\/adserve/i,
                /\/adping/i,
                /\/adimp/i,
                /\/adrequest/i,
                /\/adframe/i,
                /\/adsbygoogle/i,
                /\/pagead\/adsense/i,
                /doubleclick\.net\/ad/i,
                /doubleclick\.net\/pcs/i,
                /doubleclick\.net\/dcjs/i
            ];

            function isAdUrl(url) {
                if (!url || typeof url !== 'string') return false;
                const lower = url.toLowerCase();
                if (adDomains.some(d => lower.includes(d))) return true;
                if (adUrlPatterns.some(p => p.test(url))) return true;
                return false;
            }

            const originalFetch = window.fetch;
            window.fetch = function(...args) {
                const url = typeof args[0] === 'string' ? args[0] : args[0]?.url || '';
                if (isAdUrl(url)) {
                    chrome.runtime.sendMessage({ type: "incrementAdsBlocked", count: 1 }).catch(() => {});
                    return Promise.resolve(new Response('', { status: 200, headers: { 'Content-Type': 'text/html' } }));
                }
                return originalFetch.apply(this, args);
            };
            
            const originalXHR = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...rest) {
                const urlStr = typeof url === 'string' ? url : url?.toString() || '';
                if (isAdUrl(urlStr)) {
                    this.__clifyBlocked = true;
                    Object.defineProperty(this, 'readyState', { value: 4, writable: false });
                    Object.defineProperty(this, 'status', { value: 200, writable: false });
                    Object.defineProperty(this, 'responseText', { value: '', writable: false });
                    Object.defineProperty(this, 'response', { value: '', writable: false });
                    return;
                }
                return originalXHR.call(this, method, url, ...rest);
            };
            
            const originalSend = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.send = function(...args) {
                if (this.__clifyBlocked) {
                    try { this.dispatchEvent(new Event('load')); } catch(e) {}
                    return;
                }
                return originalSend.apply(this, args);
            };
            
            // Block ad-related <script> tags dynamically
            const scriptObserver = new MutationObserver(function(mutations) {
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.nodeType !== 1) continue;
                        if (node.tagName === 'SCRIPT') {
                            const src = node.src || '';
                            if (isAdUrl(src)) {
                                node.type = 'text/blocked';
                                node.textContent = '';
                                chrome.runtime.sendMessage({ type: "incrementAdsBlocked", count: 1 }).catch(() => {});
                            }
                        }
                        // Check ins/amp-ad/iframe inside added nodes
                        if (node.querySelectorAll) {
                            node.querySelectorAll('ins[data-ad-client], amp-ad, iframe[src]').forEach(el => {
                                const src = el.src || el.getAttribute('data-ad-client') || '';
                                if (isAdUrl(src) || el.tagName === 'AMP-AD') {
                                    el.style.cssText = 'display:none!important;';
                                    el.remove();
                                }
                            });
                        }
                    }
                }
            });
            scriptObserver.observe(document.documentElement, { childList: true, subtree: true });

            console.log('Clify Ad Blocker: Request interception active (uBlock-level)');
        } catch (error) {
            console.warn('Clify Ad Blocker: Request interception failed');
        }
    }

    let adBlockerObserver = null;
    let adBlockerInterval = null;

    function startAdBlockerObserver() {
        if (!CONFIG.adBlocker || adBlockerObserver) return;
        const adNodeNames = new Set([
            'YTD-AD-SLOT-RENDERER', 'YTD-DISPLAY-AD-RENDERER', 'YTD-PROMOTED-SPARKLES-WEB-RENDERER',
            'YTD-PROMOTED-VIDEO-RENDERER', 'YTD-AD-INLINE-PLAYLIST-RENDERER', 'YTD-AD-BREAK-RENDERER',
            'YTD-MEALBAR-PROMO-RENDERER', 'YTD-IN-FEED-AD-LAYOUT-RENDERER', 'YTD-PRIMETIME-PROMO-RENDERER',
            'YTD-BANNER-PROMO-RENDERER', 'YTD-STATED-BANNER-RENDERER', 'YTD-SINGLE-AD-MASTHEAD-RENDERER',
            'YTD-VIDEO-MASTHEAD-AD-V9-RENDERER', 'YTD-AD-POLL-RENDERER', 'YTD-COMPANION-SLOT-RENDERER',
            'YTD-AD-VIDEO-INFO-RENDERER', 'YTD-AD-SHELF-RENDERER',
            'YTD-AD-SLOT-WITH-BODY-RENDERER', 'YTD-AD-SLOT-CONTENT-RENDERER',
            'YTD-COMPANION-AD-RENDERER', 'YTD-AD-INFO-CARD-RENDERER',
            'YTD-AD-INTRODUCTION-RENDERER', 'YTD-SHOPPING-COMPANION-RENDERER',
            'YTD-BUYING-GUIDE-RENDERER', 'YTD-OFFER-MODULE-RENDERER',
            'YTD-AD-POD-RENDERER', 'YTD-IN-PLAYER-AD-SLOT-RENDERER',
            'YTD-TRANSACTION-BOTTOM-SHELF-RENDERER',
            'YTD-PRODUCT-RENDERER', 'YTD-COMPACT-PRODUCT-RENDERER',
            'YTD-COMPACT-PROMOTED-RENDERER', 'YTD-STREET-BANNER-RENDERER'
        ]);
        const adClassPatterns = /ytp-ad|ad-showing|video-ads|ad-overlay|ad-slot|promoted|ad-renderer|mealbar-promo|statement-banner|primetime-promo|banner-promo/i;
        let debounceTimer = null;

        adBlockerObserver = new MutationObserver(function(mutations) {
            if (!CONFIG.adBlocker) return;
            let found = false;
            for (const m of mutations) {
                if (!m.addedNodes.length) continue;
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    if (adNodeNames.has(node.nodeName)) { found = true; break; }
                    if (node.classList && adClassPatterns.test(node.classList.toString())) { found = true; break; }
                    if (node.getAttribute) {
                        const attrs = node.getAttribute('class') || '';
                        if (adClassPatterns.test(attrs)) { found = true; break; }
                    }
                    if (node.querySelector) {
                        const inner = node.querySelector(
                            'ytd-ad-slot-renderer, ytd-display-ad-renderer, ytd-promoted-sparkles-web-renderer, ytd-promoted-video-renderer, ytd-mealbar-promo-renderer, ytd-ad-break-renderer, ytd-in-feed-ad-layout-renderer, .ytp-ad-overlay-container, .ytp-ad-text-overlay, .ytp-ad-image-overlay, .ytp-ad-player-overlay, #player-ads, .video-ads, .ytp-ad-module, .ytp-ad-survey, [data-ad-slot-id], ytd-ad-slot-with-body-renderer, ytd-ad-slot-content-renderer, ytd-companion-ad-renderer, ytd-ad-introduction-renderer, ytd-in-player-ad-slot-renderer, ytd-ad-pod-renderer, .ytp-ad-cta-button, .ytp-ad-survey-prompt, ytd-statement-banner-renderer, ytd-primetime-promo-renderer, ytd-banner-promo-renderer, ytd-compact-promoted-renderer, ytd-shopping-companion-renderer, ytd-product-renderer'
                        );
                        if (inner) { found = true; break; }
                    }
                }
                if (found) break;
            }
            if (found) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(removeYouTubeAds, 0);
            }
        });
        adBlockerObserver.observe(document.documentElement, { childList: true, subtree: true });
        console.log('Clify Ad Blocker: MutationObserver started (enhanced)');
    }

    function stopAdBlockerObserver() {
        if (adBlockerObserver) { adBlockerObserver.disconnect(); adBlockerObserver = null; }
    }

    let clifyAdBlockerStyle = null;
    function injectAdBlockerCSS() {
        if (clifyAdBlockerStyle) return;
        clifyAdBlockerStyle = document.createElement('style');
        clifyAdBlockerStyle.id = 'clify-ad-blocker-css';
        clifyAdBlockerStyle.textContent = `
            /* ── Marked-as-removed elements ──────────────────────────── */
            [data-clify-ad-removed="true"],
            [data-clify-banner-counted="true"],
            [data-clify-annotation-removed="true"] {
                display: none !important;
                visibility: hidden !important;
                height: 0 !important;
                max-height: 0 !important;
                overflow: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                width: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
            }

            /* ── Video ad filter reset ───────────────────────────────── */
            .ad-showing + .html5-video-player video,
            .ad-showing video {
                filter: none !important;
            }

            /* ── Player overlay blocking ─────────────────────────────── */
            .ytp-ad-player-overlay,
            .ytp-ad-player-overlay-image,
            .ytp-ad-player-overlay-instream,
            .ytp-ad-display-overlay,
            .ytp-ad-iframe-overlay,
            .ytp-ad-overlay-ad-container,
            .ytp-ad-overlay-wrapper,
            .ytp-ad-overlay-close-container {
                display: none !important;
            }

            /* ── Masthead / header ads ───────────────────────────────── */
            #masthead-ad,
            #masthead-ad-slot {
                display: none !important;
                height: 0 !important;
            }

            /* ── Feed ad renderers ───────────────────────────────────── */
            ytd-ad-slot-renderer:not([hidden]),
            ytd-display-ad-renderer:not([hidden]),
            ytd-promoted-video-renderer:not([hidden]),
            ytd-in-feed-ad-layout-renderer:not([hidden]),
            ytd-ad-slot-content-renderer:not([hidden]),
            ytd-promoted-sparkles-web-renderer,
            ytd-companion-ad-renderer,
            ytd-ad-info-card-renderer,
            ytd-ad-introduction-renderer,
            ytd-ad-slot-with-body-renderer,
            ytd-ad-pod-renderer,
            ytd-in-player-ad-slot-renderer,
            ytd-ad-poll-renderer,
            ytd-ad-inline-playlist-renderer,
            ytd-ad-video-info-renderer,
            ytd-ad-break-renderer {
                display: none !important;
            }

            /* ── Banner / promo renderers ────────────────────────────── */
            ytd-statement-banner-renderer,
            ytd-primetime-promo-renderer,
            ytd-banner-promo-renderer,
            ytd-single-ad-masthead-renderer,
            ytd-video-masthead-ad-v9-renderer,
            ytd-mealbar-promo-renderer,
            ytd-statement-banner-renderer[show-close-button] {
                display: none !important;
            }

            /* ── Shopping / merch / product shelves ──────────────────── */
            ytd-merch-shelf-renderer,
            ytd-product-shelf-renderer,
            ytd-compact-shelf-renderer,
            ytd-shopping-companion-renderer,
            ytd-buying-guide-renderer,
            ytd-offer-module-renderer,
            ytd-transaction-bottom-shelf-renderer,
            ytd-product-renderer,
            ytd-compact-product-renderer,
            ytd-structured-description-content-renderer ytd-merchandise-shelf-renderer {
                display: none !important;
            }

            /* ── Shopping engagement panel ───────────────────────────── */
            ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-shopping"] {
                display: none !important;
            }

            /* ── Promoted in feed grids (parent containers) ──────────── */
            ytd-rich-item-renderer:has(ytd-ad-slot-renderer),
            ytd-rich-item-renderer:has(ytd-display-ad-renderer),
            ytd-rich-item-renderer:has(ytd-promoted-video-renderer),
            ytd-rich-item-renderer:has(ytd-in-feed-ad-layout-renderer),
            ytd-rich-section-renderer:has(ytd-statement-banner-renderer),
            ytd-rich-section-renderer:has(ytd-primetime-promo-renderer),
            ytd-rich-section-renderer:has(ytd-banner-promo-renderer),
            ytd-item-section-renderer:has(ytd-promoted-video-renderer),
            ytd-item-section-renderer:has(ytd-promoted-sparkles-web-renderer) {
                display: none !important;
            }

            /* ── Shorts ad patterns ──────────────────────────────────── */
            ytd-reel-shelf-renderer:has(ytd-promoted-video-renderer),
            ytd-reel-item-renderer:has(ytd-ad-slot-renderer),
            ytd-ad-shelf-renderer ytd-promoted-video-renderer {
                display: none !important;
            }

            /* ── Ad UI controls ──────────────────────────────────────── */
            .ytp-ad-text-overlay,
            .ytp-ad-image-overlay,
            .ytp-ad-image-overlay img,
            .ytp-ad-overlay-ad-info,
            .ytp-ad-text-link,
            .ytp-ad-button-text,
            button.ytp-ad-button,
            .ytp-ad-endorser-image,
            .ytp-ad-choices,
            .ytp-ad-cta-button,
            .ytp-ad-survey-close-button,
            .ytp-ad-survey-body,
            .ytp-ad-survey-prompt,
            .ytp-ad-companion,
            .ytp-ad-companion-slot,
            .ytp-ad-companion-close,
            .ytp-ad-fullscreen-button,
            .ytp-ad-video-url,
            .ytp-ad-video-info {
                display: none !important;
                pointer-events: none !important;
            }

            /* ── Sponsor / card overlays ─────────────────────────────── */
            .ytp-sponsored-card-overlay,
            .ytp-card-overlay,
            ytd-sponsored-card-chip-renderer {
                display: none !important;
                pointer-events: none !important;
            }

            /* ── "Are you still watching?" ───────────────────────────── */
            #player-you-there-message {
                display: none !important;
            }

            /* ── Generic catch-all for any ytp-ad* class ─────────────── */
            [class*="ytp-ad-overlay"]:not(.ytp-ad-overlay-container),
            [class*="ytp-ad-survey"],
            [class*="ytp-ad-poll"],
            [class*="ytp-ad-cta"],
            div[class*="ytp-ad"],
            .ytp-ad-progress {
                display: none !important;
                pointer-events: none !important;
            }

            /* ── Annotation / card / endscreen elements ──────────────── */
            .ytp-ce-element,
            .ytp-ce-element-show,
            .ytp-cards-teaser,
            .ytp-cards-button-row,
            .ytp-cardsbutton-wheel,
            .annotation,
            .iv-branding,
            .iv-promo,
            .iv-tab-content,
            .iv-action-share,
            .ytp-ce-covering-overlay,
            .ytp-ce-shadow,
            .ytp-ce-video-overlay,
            .ytp-ce-channel-thumbnail,
            .ytp-ce-channel-text,
            .ytp-ce-channel-title,
            .ytp-ce-playlist,
            .ytp-ce-playlist-text,
            .ytp-endscreen-content,
            .ytp-endscreen,
            .ytp-cued-thumbnail-overlay:not(.ytp-endscreen-content),
            .ytp-paid-content-overlay,
            .ytp-suggested-action,
            .ytp-suggested-action-arrow,
            .ytp-chapter-container,
            .ytp-cards-ovl,
            .ytp-cards-layer,
            .ytp-ce-max-width,
            .ytp-videowall-still,
            .ytp-videowall-still-info {
                display: none !important;
                pointer-events: none !important;
            }

            /* ── YouTube TV / Leanback ads ───────────────────────────── */
            .ytp-ad-text:not(.ytp-ad-text-link),
            .ytp-ad-video-url,
            .ytp-ad-video-info,
            .ytp-ad-fullscreen-button,
            .ytp-ad-player-overlay-image,
            .ytp-ad-player-overlay-instream {
                display: none !important;
            }

            /* ── YouTube Music ad patterns ───────────────────────────── */
            ytmusic-ad-banner-renderer {
                display: none !important;
            }

            /* ── Generic attribute-based ad selectors ────────────────── */
            [data-ad-slot-id],
            [data-ad-id],
            [data-ad-position],
            [data-ad-session-id] {
                display: none !important;
            }

            /* ── Video progress bar ad markers ───────────────────────── */
            .ytp-ad-progress-list {
                display: none !important;
            }
            .ytp-ad-progress-bar {
                background: transparent !important;
                height: 0 !important;
            }

            /* ── Gradient overlays during ads ────────────────────────── */
            .ytp-gradient-top,
            .ytp-gradient-bottom {
                display: none !important;
            }

            /* ── Hide ad-related iframes ─────────────────────────────── */
            .ytp-ad-iframe-overlay iframe,
            iframe[src*="doubleclick.net"],
            iframe[src*="googlesyndication"],
            iframe[src*="googleads"],
            iframe[src*="pagead2"] {
                display: none !important;
            }
        `;
        (document.head || document.documentElement).appendChild(clifyAdBlockerStyle);
        console.log('Clify Ad Blocker: CSS fallback injected (uBlock-level)');
    }

    function removeAdBlockerCSS() {
        if (clifyAdBlockerStyle) {
            clifyAdBlockerStyle.remove();
            clifyAdBlockerStyle = null;
        }
    }

    // ── Scriptlet injection: anti-adblock bypass (uBlock Origin technique) ──
    function injectScriptlets() {
        try {
            // 1) set-constant: prevent YouTube from checking ad-blocker status
            const setConstScript = document.createElement('script');
            setConstScript.textContent = `
                (function() {
                    'use strict';
                    // Override YouTube's ad-blocker detection flags
                    try {
                        const handler = {
                            get: function(target, prop) {
                                if (prop === 'adBlockEnabled' || prop === 'adsEnabled' || prop === 'showAds') return false;
                                if (prop === 'isAdBlockerActive' || prop === 'adBlockDetected') return false;
                                return target[prop];
                            }
                        };
                        if (window.yt && typeof window.yt === 'object') {
                            Object.defineProperty(window.yt, 'config_', new Proxy(window.yt.config_ || {}, handler));
                        }
                    } catch(e) {}

                    // 2) abort-on-property-read: prevent ad detection scripts
                    const abortProps = ['__google_ads', '__dfp_ad_formats', '__imasdk__ads__', 'google_ad_client', 'google_ad_format'];
                    abortProps.forEach(function(prop) {
                        try {
                            Object.defineProperty(window, prop, {
                                get: function() { return undefined; },
                                set: function() {},
                                configurable: true
                            });
                        } catch(e) {}
                    });

                    // 3) Prevent YouTube ad-blocker popup / warning
                    try {
                        const origOpen = window.open;
                        window.open = function(url) {
                            if (typeof url === 'string' && (url.includes('adblock') || url.includes('disable') || url.includes('funding'))) {
                                return null;
                            }
                            return origOpen.apply(this, arguments);
                        };
                    } catch(e) {}

                    // 4) Override YT player ad-related config
                    try {
                        const origDefineProperty = Object.defineProperty;
                        const origProto = HTMLVideoElement.prototype;
                        const playHandler = {
                            apply: function(target, thisArg, args) {
                                const adShowing = document.querySelector('.ad-showing');
                                if (adShowing) {
                                    // Force-skip: try to find and click skip button
                                    setTimeout(function() {
                                        var btn = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button, button.ytp-ad-skip-button-modern');
                                        if (btn) btn.click();
                                        // Seek past ad
                                        var vid = document.querySelector('video');
                                        if (vid && vid.duration > 0) {
                                            try { vid.currentTime = vid.duration - 0.1; } catch(e) {}
                                        }
                                    }, 100);
                                }
                                return target.apply(thisArg, args);
                            }
                        };
                    } catch(e) {}

                    // 5) Neutralize YouTube's funding choice messages (ad-blocker nag)
                    try {
                        const origCreateElement = document.createElement.bind(document);
                        document.createElement = function(tag) {
                            const el = origCreateElement(tag);
                            if (tag.toLowerCase() === 'ytd-player-ads-renderer' || tag.toLowerCase() === 'ytd-ad-slot-renderer') {
                                el.style.display = 'none';
                                el.remove = function() {};
                            }
                            return el;
                        };
                    } catch(e) {}

                    // 6) Block YouTube from sending ad-feedback / ad-reporting pings
                    try {
                        const origSendBeacon = navigator.sendBeacon;
                        navigator.sendBeacon = function(url) {
                            if (typeof url === 'string' && (url.includes('ad') || url.includes('feedback') || url.includes('ptracking'))) {
                                return false;
                            }
                            return origSendBeacon.apply(this, arguments);
                        };
                    } catch(e) {}
                })();
            `;
            (document.head || document.documentElement).prepend(setConstScript);

            // 7) Remove the script tag after execution to avoid detection
            setTimeout(function() {
                if (setConstScript.parentNode) setConstScript.remove();
            }, 10);

            console.log('Clify Ad Blocker: Scriptlet injection active');
        } catch (error) {
            console.warn('Clify Ad Blocker: Scriptlet injection failed');
        }
    }

    let midRollAdListenerActive = false;
    let midRollCheckFn = null;
    let midRollMutationObserver = null;
    function setupMidRollAdDetection() {
        if (midRollAdListenerActive) return;
        const video = document.querySelector('video');
        if (!video) { setTimeout(setupMidRollAdDetection, 1000); return; }
        midRollAdListenerActive = true;

        let lastAdState = false;
        let skipCooldown = 0;

        midRollCheckFn = function checkMidRollAd() {
            if (!CONFIG.adBlocker) return;
            const now = Date.now();
            if (now < skipCooldown) return;

            const adShowing = document.querySelector('.ad-showing');
            const adOverlay = document.querySelector('.ytp-ad-overlay-container');
            const isAd = !!(adShowing || adOverlay);

            if (isAd && !lastAdState) {
                // Try all skip button variants
                const skipSelectors = [
                    '.ytp-ad-skip-button-modern', '.ytp-ad-skip-button',
                    'button.ytp-ad-skip-button-modern', '.ytp-skip-ad-button',
                    '.ytp-ad-skip-button-slot button',
                    'button[class*="skip"]', '.ytp-ad-skip-link'
                ];
                skipSelectors.forEach(sel => {
                    const btn = document.querySelector(sel);
                    if (btn) try { btn.click(); } catch(e) {}
                });
                // Seek past ad
                try {
                    if (video.duration > 0 && video.currentTime < video.duration - 0.5) {
                        video.currentTime = video.duration - 0.1;
                    }
                } catch(e) {}
                // Remove overlays
                [adOverlay, document.querySelector('.ytp-ad-display-overlay'), document.querySelector('.ytp-ad-player-overlay')].forEach(el => {
                    if (el) try { el.remove(); } catch(e) {}
                });
                console.log('Clify Ad Blocker: Mid-roll ad detected and skipped');
                chrome.runtime.sendMessage({ type: "incrementAdsBlocked", count: 1 }).catch(() => {});
                chrome.runtime.sendMessage({ type: "incrementSkipped", count: 1 }).catch(() => {});
                skipCooldown = now + 500;
            }

            // Also handle: ad is playing and we haven't tried to skip yet
            if (isAd) {
                const skipBtn = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button, button.ytp-ad-skip-button-modern');
                if (skipBtn && skipBtn.offsetParent !== null) {
                    try { skipBtn.click(); } catch(e) {}
                }
            }

            lastAdState = isAd;
        };
        video.addEventListener('timeupdate', midRollCheckFn);

        // Also observe DOM for .ad-showing class changes (faster than timeupdate)
        midRollMutationObserver = new MutationObserver(function(mutations) {
            for (const m of mutations) {
                if (m.attributeName === 'class' && m.target.classList && m.target.classList.contains('ad-showing')) {
                    midRollCheckFn();
                    break;
                }
            }
        });
        const playerContainer = document.querySelector('.html5-video-player');
        if (playerContainer) {
            midRollMutationObserver.observe(playerContainer, { attributes: true, attributeFilter: ['class'] });
        }

        // Re-detect if video element changes (YouTube SPA navigation)
        const videoObserver = new MutationObserver(function() {
            const newVideo = document.querySelector('video');
            if (newVideo && newVideo !== video) {
                setupMidRollAdDetection();
            }
        });
        videoObserver.observe(document.documentElement, { childList: true, subtree: true });

        console.log('Clify Ad Blocker: Mid-roll detection active (enhanced)');
    }

    function stopMidRollAdDetection() {
        const video = document.querySelector('video');
        if (video && midRollCheckFn) { video.removeEventListener('timeupdate', midRollCheckFn); }
        if (midRollMutationObserver) { midRollMutationObserver.disconnect(); midRollMutationObserver = null; }
        midRollCheckFn = null;
        midRollAdListenerActive = false;
    }

    let ClifyStats = {
        dailyActivity: {},
        totalBlocks: 0,
        shortsBlocks: 0,
        manualBlocks: 0,
        keywordBlocks: 0,
        channelBlocks: 0,
        lastUpdated: null
    };

    async function safeInit() {
        try {
            if (!document.body) {
                setTimeout(safeInit, 100);
                return;
            }
            console.log('Clify v12.0.0: Initializing with next-level features + Native Ad Blocker...');
            injectTablerIcons();
            injectNuclearStyles();
            injectToastStyles();
            await loadStorageData();
            console.log('Clify v12.0.0: Storage loaded, applying features...');
            
            // Initialize native ad blocker
            if (CONFIG.adBlocker) {
                interceptAdRequests();
                injectAdBlockerCSS();
                injectScriptlets();
                removeYouTubeAds();
                if (!adBlockerInterval) adBlockerInterval = setInterval(removeYouTubeAds, 600);
                startAdBlockerObserver();
                setupMidRollAdDetection();
                console.log('Clify v16.0.0: Native Ad Blocker ACTIVE (uBlock-level)');
            }
            if (CONFIG.focusMode) applyFocusMode();
            if (CONFIG.hideTrending) applyHideTrending();
            if (CONFIG.autoConfirmPause) applyAutoConfirmPause();
            if (CONFIG.volumeBoost > 100) applyVolumeBoost();
            if (CONFIG.pipButton) addPipButton();
            if (CONFIG.keyboardShortcuts) applyKeyboardShortcuts();
            if (CONFIG.skipSponsors) applySkipSponsors();
            if (CONFIG.forceQuality) applyForceQuality();
            if (CONFIG.hideComments) applyHideComments();

            cleanLiveStream();

            loadWatchLaterQueue();
            applyReadingMode();
            setupConfigurableShortcuts();
            applyCustomBlockedSelectors();
            trackUsage();
            if (CONFIG.watchLater) injectWatchLaterButtons();
            
            setupGlobalInterceptor();
            setupGlobalBlockObserver();
            safeProcessPage();
            checkChannelPageBlock();
            addMonetizationBadge();
            removeAllShorts();
            setInterval(safeProcessPage, 1500);
            setInterval(addMonetizationBadge, 2000);
            setInterval(removeAllShorts, 2000);
            setInterval(checkSponsorSkip, 2000);
            setInterval(checkContentDensity, 2000);
            setInterval(addPipButton, 2000);
            setInterval(injectWatchLaterButtons, 3000);
            setInterval(cleanLiveStream, 2000);
            setInterval(bypassAgeGate, 2500);

            if (CONFIG.audioEqualizer) {
                initAudioEqualizer();
            }

            setInterval(() => {
                try {
                    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                        chrome.storage.sync.get(['clify_config'], (result) => {
                            if (result.clify_config) {
                                const prevBlock = CONFIG.languageBlock;
                                if (typeof result.clify_config.languageBlock === 'boolean') CONFIG.languageBlock = result.clify_config.languageBlock;
                                if (Array.isArray(result.clify_config.preferredLanguages)) CONFIG.preferredLanguages = result.clify_config.preferredLanguages;
                                if (typeof result.clify_config.contentDensity === 'boolean') CONFIG.contentDensity = result.clify_config.contentDensity;
                                if (typeof result.clify_config.liveStreamCleaner === 'boolean') CONFIG.liveStreamCleaner = result.clify_config.liveStreamCleaner;
                                if (typeof result.clify_config.lcHideChat === 'boolean') CONFIG.lcHideChat = result.clify_config.lcHideChat;
                                if (typeof result.clify_config.lcHideSuperChat === 'boolean') CONFIG.lcHideSuperChat = result.clify_config.lcHideSuperChat;
                                if (typeof result.clify_config.lcHideMembers === 'boolean') CONFIG.lcHideMembers = result.clify_config.lcHideMembers;
                                if (typeof result.clify_config.lcHideTicker === 'boolean') CONFIG.lcHideTicker = result.clify_config.lcHideTicker;
                                if (typeof result.clify_config.ageGateBypass === 'boolean') CONFIG.ageGateBypass = result.clify_config.ageGateBypass;
                                if (typeof result.clify_config.audioEqualizer === 'boolean') CONFIG.audioEqualizer = result.clify_config.audioEqualizer;
                                if (!prevBlock && CONFIG.languageBlock) rescanAllVideosForLanguage();
                            }
                        });
                    }
                } catch (e) {}
            }, 3000);

            console.log('Clify v12.0.0: All systems GO!');

            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
                chrome.storage.onChanged.addListener((changes, area) => {
                    if (changes.clify_language_config) {
                        const lc = changes.clify_language_config.newValue || {};
                        if (typeof lc.languageBlock === 'boolean') CONFIG.languageBlock = lc.languageBlock;
                        if (Array.isArray(lc.preferredLanguages)) CONFIG.preferredLanguages = lc.preferredLanguages;
                        rescanAllVideosForLanguage();
                    }
                });
            }
        } catch (error) {
            console.error('Clify v12.0.0: Init error:', error);
            setTimeout(safeInit, 1000);
        }
    }

    function isScheduleActive() {
        if (!CONFIG.scheduledBlocking) return true;
        const now = new Date();
        const hour = now.getHours();
        if (CONFIG.scheduleStart < CONFIG.scheduleEnd) {
            return hour >= CONFIG.scheduleStart && hour < CONFIG.scheduleEnd;
        } else {
            return hour >= CONFIG.scheduleStart || hour < CONFIG.scheduleEnd;
        }
    }

    // =============================================
    // TOAST NOTIFICATION SYSTEM
    // =============================================
    function injectToastStyles() {
        if (document.querySelector('#clify-toast-styles')) return;
        const style = document.createElement('style');
        style.id = 'clify-toast-styles';
        style.textContent = `
            .clify-toast {
                all: initial !important;
                position: fixed !important;
                bottom: 20px !important;
                left: 50% !important;
                transform: translateX(-50%) translateY(16px) !important;
                background: rgba(10, 15, 28, 0.92) !important;
                color: #e0e0e0 !important;
                padding: 8px 14px !important;
                border-radius: 8px !important;
                font-family: 'Inter', -apple-system, sans-serif !important;
                font-size: 12px !important;
                font-weight: 500 !important;
                z-index: 2147483647 !important;
                display: flex !important;
                align-items: center !important;
                gap: 8px !important;
                box-shadow: 0 4px 20px rgba(0,0,0,0.35) !important;
                border: 1px solid rgba(193, 241, 29, 0.15) !important;
                opacity: 0 !important;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                pointer-events: auto !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                max-width: 320px !important;
                visibility: visible !important;
            }
            .clify-toast.show {
                opacity: 1 !important;
                transform: translateX(-50%) translateY(0) !important;
            }
            .clify-toast .toast-icon {
                width: 22px !important;
                height: 22px !important;
                border-radius: 5px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex-shrink: 0 !important;
                overflow: hidden !important;
            }
            .clify-toast .toast-icon img {
                width: 22px !important;
                height: 22px !important;
                border-radius: 5px !important;
                display: block !important;
            }
            .clify-toast .toast-text {
                flex: 1 !important;
                min-width: 0 !important;
            }
            .clify-toast .toast-title {
                font-weight: 600 !important;
                font-size: 11px !important;
                margin-bottom: 1px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                color: #e0e0e0 !important;
            }
            .clify-toast .toast-subtitle {
                font-size: 10px !important;
                color: #7a8291 !important;
                font-weight: 400 !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
            }
            .clify-toast .toast-undo {
                background: rgba(193, 241, 29, 0.1) !important;
                border: 1px solid rgba(193, 241, 29, 0.2) !important;
                color: #c1f11d !important;
                padding: 3px 10px !important;
                border-radius: 5px !important;
                font-size: 10px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                transition: all 0.15s !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
            }
            .clify-toast .toast-undo:hover {
                background: rgba(193, 241, 29, 0.2) !important;
            }
            .clify-toast .toast-close {
                all: initial !important;
                background: none !important;
                border: none !important;
                color: #555 !important;
                cursor: pointer !important;
                font-size: 14px !important;
                padding: 2px !important;
                line-height: 1 !important;
                flex-shrink: 0 !important;
                transition: color 0.15s !important;
                display: inline !important;
            }
            .clify-toast .toast-close:hover {
                color: #aaa !important;
            }
            .clify-toast .toast-progress {
                position: absolute !important;
                bottom: 0 !important;
                left: 0 !important;
                height: 2px !important;
                background: #c1f11d !important;
                border-radius: 0 0 8px 8px !important;
                opacity: 0.5 !important;
                transition: width linear !important;
            }
        `;
        document.head.appendChild(style);
    }

    function showToast(title, subtitle, duration = 5000, undoCallback = null) {
        const existing = document.querySelector('.clify-toast');
        if (existing) existing.remove();
        
        const toast = document.createElement('div');
        toast.className = 'clify-toast';
        let iconURL = '';
        try { iconURL = chrome.runtime.getURL('icons/icon32.png'); } catch(e) {}
        toast.innerHTML = `
            <div class="toast-icon"><img src="${iconURL}" alt="Clify"></div>
            <div class="toast-text">
                <div class="toast-title">${title}</div>
                <div class="toast-subtitle">${subtitle}</div>
            </div>
            ${undoCallback ? '<button class="toast-undo">Undo</button>' : ''}
            <button class="toast-close">&times;</button>
            <div class="toast-progress" style="width: 100%;"></div>
        `;
        
        document.body.appendChild(toast);
        
        const progress = toast.querySelector('.toast-progress');
        progress.style.transitionDuration = duration + 'ms';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                toast.classList.add('show');
                progress.style.width = '0%';
            });
        });
        
        if (undoCallback) {
            toast.querySelector('.toast-undo').addEventListener('click', () => {
                undoCallback();
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            });
        }
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        });
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 400);
            }
        }, duration);
    }

    // =============================================
    // ENHANCED SHORTS REMOVAL
    // =============================================
    function removeAllShorts() {
        if (!CONFIG.removeShorts || !isScheduleActive()) return;
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
                        if (element && element.isConnected && !element.hasAttribute('data-clify-removed')) {
                            removeShortsElement(element);
                            removedCount++;
                        }
                    });
                } catch (e) {}
            });
            
            removeShortsByTextContent();
            removeShortsNavigation();
            removeShortsSections();
            
            if (removedCount > 0) {
                usageSession.shortsBlocked = (usageSession.shortsBlocked || 0) + removedCount;
                flushUsageStats();
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
                    !element.hasAttribute('data-clify-removed')) {
                    const parent = element.closest('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, ytd-guide-entry-renderer');
                    if (parent) {
                        removeShortsElement(parent);
                    }
                }
            });
        } catch (e) {}
    }

    function removeShortsElement(element) {
        try {
            let videoId = null;
            let shortsTitle = 'YouTube Shorts';
            
            const titleSelectors = [
                '#video-title', 'h3 a', 'a#video-title-link',
                'yt-formatted-string#video-title', '[id*="title"] a',
                '[class*="title"] a', '#content-attachment #title',
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
            
            element.setAttribute('data-clify-removed', 'true');
            element.style.display = 'none';
            
            setTimeout(() => {
                if (element && element.parentNode) {
                    try { element.remove(); } catch (e) {}
                }
            }, 50);
            
            if (videoId && !blockedVideos[videoId]) {
                blockedVideos[videoId] = {
                    id: videoId,
                    title: shortsTitle,
                    url: `https://www.youtube.com/shorts/${videoId}`,
                    reason: 'shorts',
                    ts: Date.now(),
                    timestamp: new Date().toLocaleString(),
                    isShorts: true
                };
                updateStats('shorts');
                saveToLocalStorage();
            }
        } catch (error) {}
    }

    function removeShortsNavigation() {
        try {
            const navSelectors = [
                'a[href*="/shorts"]', '[title="Shorts"]', '[aria-label="Shorts"]',
                'ytd-guide-entry-renderer a[href*="/shorts"]',
                'tp-yt-paper-item a[href*="/shorts"]'
            ];
            navSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const parent = element.closest('ytd-guide-entry-renderer, tp-yt-paper-item, ytd-mini-guide-entry-renderer');
                    if (parent && !parent.hasAttribute('data-clify-removed')) {
                        parent.setAttribute('data-clify-removed', 'true');
                        parent.style.display = 'none';
                    }
                });
            });
        } catch (error) {}
    }

    function removeShortsSections() {
        try {
            const sectionSelectors = [
                'ytd-rich-shelf-renderer[is-shorts]', 'ytd-reel-shelf-renderer',
                '#shorts-container', 'ytd-rich-section-renderer[is-shorts]',
                'ytd-reel-player-overlay-renderer'
            ];
            sectionSelectors.forEach(selector => {
                const sections = document.querySelectorAll(selector);
                sections.forEach(section => {
                    if (!section.hasAttribute('data-clify-removed')) {
                        section.setAttribute('data-clify-removed', 'true');
                        section.style.display = 'none';
                    }
                });
            });
        } catch (error) {}
    }

    // =============================================
    // CHANNEL EXTRACTION & BLOCKING
    // =============================================
    function extractChannelInfo(videoElement) {
        try {
            const channelSelectors = [
                'ytd-channel-name a', 'ytd-video-channel-name a',
                '#channel-name a', '#text.ytd-channel-name a',
                'a.yt-simple-endpoint[href*="/channel/"]',
                'a.yt-simple-endpoint[href*="/@"]',
                'a.yt-simple-endpoint[href*="/c/"]',
                'a.yt-simple-endpoint[href*="/user/"]',
                '#owner #channel-name a', '#owner-text a',
                'yt-lockup-metadata-view-model a[href*="/@"]',
                'yt-lockup-metadata-view-model a[href*="/channel/"]',
                'yt-lockup-metadata-view-model a[href*="/c/"]',
                'yt-content-metadata-view-model a[href*="/@"]',
                'yt-content-metadata-view-model a[href*="/channel/"]',
                'yt-content-metadata-view-model a[href*="/c/"]',
                'yt-lockup-view-model a[href*="/@"]',
                'yt-lockup-view-model a[href*="/channel/"]',
                'ytd-channel-name yt-formatted-string a',
                'ytd-video-owner-blocker a[href*="/@"]',
                '#channel-name yt-formatted-string a',
                '#owner .ytd-channel-name a'
            ];
            
            for (const selector of channelSelectors) {
                const channelLink = videoElement.querySelector(selector);
                if (channelLink && channelLink.href) {
                    const href = channelLink.href;
                    const channelName = channelLink.textContent?.trim() || 'Unknown Channel';
                    
                    let channelId = null;
                    const channelMatch = href.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
                    const handleMatch = href.match(/\/@([a-zA-Z0-9_.-]+)/);
                    const customMatch = href.match(/\/c\/([a-zA-Z0-9_-]+)/);
                    const userMatch = href.match(/\/user\/([a-zA-Z0-9_-]+)/);
                    
                    if (channelMatch) channelId = channelMatch[1];
                    else if (handleMatch) channelId = '@' + handleMatch[1];
                    else if (customMatch) channelId = 'c/' + customMatch[1];
                    else if (userMatch) channelId = 'u/' + userMatch[1];
                    
                    if (channelId || channelName !== 'Unknown Channel') {
                        return {
                            id: channelId || channelName.toLowerCase().replace(/\s+/g, ''),
                            name: channelName,
                            url: href
                        };
                    }
                }
            }
            
            const anyChannelLink = videoElement.querySelector('a[href*="/@"], a[href*="/channel/UC"], a[href*="/c/"], a[href*="/user/"]');
            if (anyChannelLink && anyChannelLink.href) {
                const href = anyChannelLink.href;
                const channelName = anyChannelLink.textContent?.trim() || 'Unknown Channel';
                let channelId = null;
                const channelMatch = href.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
                const handleMatch = href.match(/\/@([a-zA-Z0-9_.-]+)/);
                const customMatch = href.match(/\/c\/([a-zA-Z0-9_-]+)/);
                const userMatch = href.match(/\/user\/([a-zA-Z0-9_-]+)/);
                if (channelMatch) channelId = channelMatch[1];
                else if (handleMatch) channelId = '@' + handleMatch[1];
                else if (customMatch) channelId = 'c/' + customMatch[1];
                else if (userMatch) channelId = 'u/' + userMatch[1];
                if (channelId || channelName !== 'Unknown Channel') {
                    return {
                        id: channelId || channelName.toLowerCase().replace(/\s+/g, ''),
                        name: channelName,
                        url: href
                    };
                }
            }
            
            return null;
        } catch (error) {
            return null;
        }
    }

    function normalizeChannel(str) {
        return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function isChannelBlocked(channelInfo) {
        if (!channelInfo) return false;
        const id = channelInfo.id || '';
        const name = channelInfo.name || '';
        const normId = normalizeChannel(id);
        const normName = normalizeChannel(name);
        for (const key of Object.keys(blockedChannels)) {
            const normKey = normalizeChannel(key);
            if (normKey === normId || normKey === normName) return true;
            const blocked = blockedChannels[key];
            if (blocked && (normalizeChannel(blocked.id) === normId || normalizeChannel(blocked.name) === normName)) return true;
        }
        for (const key of Object.keys(whitelistedChannels)) {
            const normKey = normalizeChannel(key);
            if (normKey === normId || normKey === normName) return false;
            const wl = whitelistedChannels[key];
            if (wl && (normalizeChannel(wl.id) === normId || normalizeChannel(wl.name) === normName)) return false;
        }
        return false;
    }

    function blockChannel(channelInfo) {
        if (!channelInfo) return;
        const entry = {
            id: channelInfo.id,
            name: channelInfo.name,
            url: channelInfo.url,
            ts: Date.now(),
            timestamp: new Date().toLocaleString()
        };
        blockedChannels[channelInfo.id] = entry;
        if (channelInfo.name && channelInfo.name !== channelInfo.id) {
            blockedChannels[channelInfo.name] = entry;
        }
        updateStats('channel');
        saveToLocalStorage();
        showToast(
            'Channel Blocked',
            `${channelInfo.name} videos will be hidden`,
            4000,
            () => { unblockChannel(channelInfo.id); }
        );
        let hidden = 0;
        const allElements = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-compact-video-renderer, ytd-grid-video-renderer, yt-lockup-view-model, ytd-rich-grid-media');
        allElements.forEach(el => {
            el.removeAttribute('data-clify-processed');
        });
        const videoElements = getVideoElements();
        for (const el of videoElements) {
            const info = extractChannelInfo(el);
            if (info && isChannelBlocked(info)) {
                el.style.display = 'none';
                el.setAttribute('data-clify-blocked', 'true');
                el.setAttribute('data-clify-channel-id', info.id);
                hidden++;
            }
        }
        console.log(`Clify: Blocked channel "${channelInfo.name}", hid ${hidden} videos`);
        setTimeout(() => safeProcessPage(), 500);
        setTimeout(() => { checkWatchPageChannelBlock(); checkChannelPageBlock(); }, 600);
    }

    function extractWatchPageChannelInfo() {
        try {
            const watchChannelSelectors = [
                'ytd-video-owner-blocker #channel-name a',
                '#owner #channel-name a',
                '#owner yt-channel-name a',
                '#owner-text a',
                'ytd-watch-metadata #channel-name a',
                'ytd-watch-metadata a[href*="/@"]',
                'ytd-watch-metadata a[href*="/channel/UC"]',
                'ytd-watch-metadata a[href*="/c/"]',
                '#upload-info a[href*="/@"]',
                '#upload-info a[href*="/channel/UC"]',
                '#upload-info a[href*="/c/"]',
                '#above-the-fold #channel-name a',
                '#above-the-fold a[href*="/@"]',
                'ytd-watch-metadata yt-formatted-string.ytd-channel-name a',
                '#owner .ytd-channel-name a',
                '#owner yt-formatted-string a[href*="/@"]',
                '#owner yt-formatted-string a[href*="/channel/"]'
            ];
            for (const selector of watchChannelSelectors) {
                const link = document.querySelector(selector);
                if (link && link.href) {
                    const href = link.href;
                    const channelName = link.textContent?.trim() || 'Unknown Channel';
                    let channelId = null;
                    const channelMatch = href.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
                    const handleMatch = href.match(/\/@([a-zA-Z0-9_.-]+)/);
                    const customMatch = href.match(/\/c\/([a-zA-Z0-9_-]+)/);
                    const userMatch = href.match(/\/user\/([a-zA-Z0-9_-]+)/);
                    if (channelMatch) channelId = channelMatch[1];
                    else if (handleMatch) channelId = '@' + handleMatch[1];
                    else if (customMatch) channelId = 'c/' + customMatch[1];
                    else if (userMatch) channelId = 'u/' + userMatch[1];
                    if (channelId || channelName !== 'Unknown Channel') {
                        return {
                            id: channelId || channelName.toLowerCase().replace(/\s+/g, ''),
                            name: channelName,
                            url: href
                        };
                    }
                }
            }
            const anyChannelLink = document.querySelector('#owner a[href*="/@"], #owner a[href*="/channel/UC"], ytd-watch-metadata a[href*="/@"][class*="yt"], #above-the-fold a[href*="/@"]');
            if (anyChannelLink && anyChannelLink.href) {
                const href = anyChannelLink.href;
                const channelName = anyChannelLink.textContent?.trim() || 'Unknown Channel';
                let channelId = null;
                const channelMatch = href.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);
                const handleMatch = href.match(/\/@([a-zA-Z0-9_.-]+)/);
                const customMatch = href.match(/\/c\/([a-zA-Z0-9_-]+)/);
                const userMatch = href.match(/\/user\/([a-zA-Z0-9_-]+)/);
                if (channelMatch) channelId = channelMatch[1];
                else if (handleMatch) channelId = '@' + handleMatch[1];
                else if (customMatch) channelId = 'c/' + customMatch[1];
                else if (userMatch) channelId = 'u/' + userMatch[1];
                if (channelId || channelName !== 'Unknown Channel') {
                    return {
                        id: channelId || channelName.toLowerCase().replace(/\s+/g, ''),
                        name: channelName,
                        url: href
                    };
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    function checkWatchPageChannelBlock() {
        try {
            if (!window.location.pathname.startsWith('/watch')) {
                const oldOverlay = document.getElementById('clify-watch-blocked-overlay');
                if (oldOverlay) oldOverlay.remove();
                return false;
            }
            if (document.querySelector('#clify-watch-blocked-overlay')) return true;
            const channelInfo = extractWatchPageChannelInfo();
            if (!channelInfo || !isChannelBlocked(channelInfo)) return false;
            const video = document.querySelector('video');
            if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
            const overlay = document.createElement('div');
            overlay.id = 'clify-watch-blocked-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,10,15,0.97);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;font-family:system-ui,-apple-system,sans-serif;color:#e4e4e7;';
            overlay.innerHTML = `
                <div id="clify-blocked-icon" style="width:80px;height:80px;border-radius:50%;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;">
                </div>
                <h2 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;">Channel Blocked</h2>
                <p style="margin:0;font-size:15px;color:#a1a1aa;max-width:400px;text-align:center;">
                    Videos from <strong style="color:#ffffff;">${channelInfo.name}</strong> are blocked by your Clify settings.
                </p>
                <div style="display:flex;gap:12px;margin-top:8px;">
                    <button id="clify-unblock-watch-btn" style="padding:10px 24px;border-radius:10px;border:none;background:rgba(163,230,53,0.15);color:#a3e635;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;">Unblock Channel</button>
                    <button id="clify-go-back-btn" style="padding:10px 24px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#e4e4e7;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;">Go Back</button>
                </div>
            `;
            document.body.appendChild(overlay);
            const iconContainer = document.getElementById('clify-blocked-icon');
            if (iconContainer) {
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '40');
                svg.setAttribute('height', '40');
                svg.setAttribute('viewBox', '0 0 24 24');
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', '#ef4444');
                svg.setAttribute('stroke-width', '2.5');
                svg.setAttribute('stroke-linecap', 'round');
                svg.setAttribute('stroke-linejoin', 'round');
                const l1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                l1.setAttribute('x1', '18'); l1.setAttribute('y1', '6'); l1.setAttribute('x2', '6'); l1.setAttribute('y2', '18');
                const l2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                l2.setAttribute('x1', '6'); l2.setAttribute('y1', '6'); l2.setAttribute('x2', '18'); l2.setAttribute('y2', '18');
                svg.appendChild(l1);
                svg.appendChild(l2);
                iconContainer.appendChild(svg);
            }
            const unblockBtn = document.getElementById('clify-unblock-watch-btn');
            const goBackBtn = document.getElementById('clify-go-back-btn');
            if (unblockBtn) {
                unblockBtn.addEventListener('click', () => {
                    unblockChannel(channelInfo.id);
                    overlay.remove();
                    window.location.reload();
                });
                unblockBtn.addEventListener('mouseenter', () => { unblockBtn.style.background = 'rgba(163,230,53,0.25)'; });
                unblockBtn.addEventListener('mouseleave', () => { unblockBtn.style.background = 'rgba(163,230,53,0.15)'; });
            }
            if (goBackBtn) {
                goBackBtn.addEventListener('click', () => { window.history.back(); });
                goBackBtn.addEventListener('mouseenter', () => { goBackBtn.style.background = 'rgba(255,255,255,0.1)'; goBackBtn.style.borderColor = 'rgba(255,255,255,0.2)'; });
                goBackBtn.addEventListener('mouseleave', () => { goBackBtn.style.background = 'rgba(255,255,255,0.05)'; goBackBtn.style.borderColor = 'rgba(255,255,255,0.1)'; });
            }
            console.log(`Clify: Blocked watch page for channel "${channelInfo.name}"`);
            return true;
        } catch (error) {
            console.error('Clify: Watch page block error:', error);
            return false;
        }
    }

    function extractChannelFromUrl() {
        try {
            const path = window.location.pathname;
            const handleMatch = path.match(/^\/@([a-zA-Z0-9_.-]+)/);
            const channelMatch = path.match(/^\/channel\/(UC[a-zA-Z0-9_-]{22})/);
            const customMatch = path.match(/^\/c\/([a-zA-Z0-9_-]+)/);
            const userMatch = path.match(/^\/user\/([a-zA-Z0-9_-]+)/);
            let channelId = null;
            if (handleMatch) channelId = '@' + handleMatch[1];
            else if (channelMatch) channelId = channelMatch[1];
            else if (customMatch) channelId = 'c/' + customMatch[1];
            else if (userMatch) channelId = 'u/' + userMatch[1];
            if (!channelId) return null;
            const nameEl = document.querySelector('#channel-name yt-formatted-string, #channel-name a, yt-dynamic-text-view-model .yt-core-attributed-string, #channel-header #text, #channel-header-container #text');
            const channelName = nameEl?.textContent?.trim() || channelId;
            return { id: channelId, name: channelName, url: window.location.href };
        } catch (e) {
            return null;
        }
    }

    function isChannelPage() {
        const path = window.location.pathname;
        return /^\/@[^/]+(\/.*)?$/.test(path) ||
               /^\/channel\/UC[a-zA-Z0-9_-]{22}(\/.*)?$/.test(path) ||
               /^\/c\/[^/]+(\/.*)?$/.test(path) ||
               /^\/user\/[^/]+(\/.*)?$/.test(path);
    }

    function checkChannelPageBlock() {
        try {
            if (!isChannelPage()) {
                const oldOverlay = document.getElementById('clify-watch-blocked-overlay');
                if (oldOverlay) oldOverlay.remove();
                return false;
            }
            if (document.querySelector('#clify-watch-blocked-overlay')) return true;
            const channelInfo = extractChannelFromUrl();
            if (!channelInfo || !isChannelBlocked(channelInfo)) return false;
            const overlay = document.createElement('div');
            overlay.id = 'clify-watch-blocked-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(10,10,15,0.97);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;font-family:system-ui,-apple-system,sans-serif;color:#e4e4e7;';
            overlay.innerHTML = `
                <div id="clify-blocked-icon" style="width:80px;height:80px;border-radius:50%;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;">
                </div>
                <h2 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;">Channel Blocked</h2>
                <p style="margin:0;font-size:15px;color:#a1a1aa;max-width:400px;text-align:center;">
                    <strong style="color:#ffffff;">${channelInfo.name}</strong> is blocked by your Clify settings.
                </p>
                <div style="display:flex;gap:12px;margin-top:8px;">
                    <button id="clify-unblock-watch-btn" style="padding:10px 24px;border-radius:10px;border:none;background:rgba(163,230,53,0.15);color:#a3e635;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s;">Unblock Channel</button>
                    <button id="clify-go-back-btn" style="padding:10px 24px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#e4e4e7;font-size:14px;font-weight:500;cursor:pointer;transition:all 0.2s;">Go Back</button>
                </div>
            `;
            document.body.appendChild(overlay);
            const iconContainer2 = document.getElementById('clify-blocked-icon');
            if (iconContainer2) {
                const svg2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg2.setAttribute('width', '40');
                svg2.setAttribute('height', '40');
                svg2.setAttribute('viewBox', '0 0 24 24');
                svg2.setAttribute('fill', 'none');
                svg2.setAttribute('stroke', '#ef4444');
                svg2.setAttribute('stroke-width', '2.5');
                svg2.setAttribute('stroke-linecap', 'round');
                svg2.setAttribute('stroke-linejoin', 'round');
                const a1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                a1.setAttribute('d', 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24');
                const a2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                a2.setAttribute('x1', '1'); a2.setAttribute('y1', '1'); a2.setAttribute('x2', '23'); a2.setAttribute('y2', '23');
                svg2.appendChild(a1);
                svg2.appendChild(a2);
                iconContainer2.appendChild(svg2);
            }
            const unblockBtn = document.getElementById('clify-unblock-watch-btn');
            const goBackBtn = document.getElementById('clify-go-back-btn');
            if (unblockBtn) {
                unblockBtn.addEventListener('click', () => {
                    unblockChannel(channelInfo.id);
                    overlay.remove();
                    window.location.reload();
                });
                unblockBtn.addEventListener('mouseenter', () => { unblockBtn.style.background = 'rgba(163,230,53,0.25)'; });
                unblockBtn.addEventListener('mouseleave', () => { unblockBtn.style.background = 'rgba(163,230,53,0.15)'; });
            }
            if (goBackBtn) {
                goBackBtn.addEventListener('click', () => { window.history.back(); });
                goBackBtn.addEventListener('mouseenter', () => { goBackBtn.style.background = 'rgba(255,255,255,0.1)'; goBackBtn.style.borderColor = 'rgba(255,255,255,0.2)'; });
                goBackBtn.addEventListener('mouseleave', () => { goBackBtn.style.background = 'rgba(255,255,255,0.05)'; goBackBtn.style.borderColor = 'rgba(255,255,255,0.1)'; });
            }
            console.log(`Clify: Blocked channel page for "${channelInfo.name}"`);
            return true;
        } catch (error) {
            console.error('Clify: Channel page block error:', error);
            return false;
        }
    }

    function unblockChannel(channelId) {
        const normTarget = normalizeChannel(channelId);
        for (const key of Object.keys(blockedChannels)) {
            if (normalizeChannel(key) === normTarget) {
                delete blockedChannels[key];
                break;
            }
        }
        saveToLocalStorage();
        const overlay = document.getElementById('clify-watch-blocked-overlay');
        if (overlay) overlay.remove();
        document.querySelectorAll('[data-clify-blocked]').forEach(el => {
            el.style.display = '';
            el.removeAttribute('data-clify-blocked');
            el.removeAttribute('data-clify-channel-id');
            el.removeAttribute('data-clify-processed');
        });
        showToast('Channel Unblocked', 'Channel videos will now appear');
    }

    // =============================================
    // BLUR MODE
    // =============================================
    function applyBlurMode(videoElement) {
        if (!CONFIG.blurMode) return;
        videoElement.style.filter = 'blur(8px)';
        videoElement.style.transition = 'filter 0.3s ease';
        videoElement.style.cursor = 'pointer';
        videoElement.title = 'Blocked by Clify - Click to reveal';
        
        videoElement.addEventListener('mouseenter', function onHover() {
            videoElement.style.filter = 'none';
        }, { once: true });
        
        videoElement.addEventListener('mouseleave', function onLeave() {
            videoElement.style.filter = 'blur(8px)';
        });
    }

    // =============================================
    // FOCUS MODE
    // =============================================
    function applyFocusMode() {
        if (!CONFIG.focusMode) {
            document.querySelectorAll('.clify-focus-hidden').forEach(el => {
                el.classList.remove('clify-focus-hidden');
                el.style.display = '';
            });
            const style = document.getElementById('clify-focus-styles');
            if (style) style.remove();
            return;
        }
        if (document.getElementById('clify-focus-styles')) return;
        const style = document.createElement('style');
        style.id = 'clify-focus-styles';
        style.textContent = `
            #comments, ytd-comments, #count, #comments-button,
            ytd-item-section-renderer#comments,
            #secondary, #related, ytd-watch-next-tabbed-results-renderer,
            ytd-structured-description-content-renderer,
            #description, ytd-text-inline-expander,
            #bottom-row, #info-contents ytd-video-description-transcript-section-renderer,
            ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"],
            ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"],
            #panels, ytd-engagement-panel-section-list-renderer {
                display: none !important;
            }
            #primary {
                max-width: 100% !important;
            }
            #columns {
                flex-direction: column !important;
            }
            ytd-watch-flexy[use-header-slim] #columns {
                flex-direction: column !important;
            }
        `;
        document.head.appendChild(style);
        console.log('Clify Focus Mode: ACTIVE');
    }

    // =============================================
    // FEATURE 1: HIDE TRENDING / EXPLORE
    // =============================================
    function applyHideTrending() {
        const style = document.getElementById('clify-hide-trending-styles');
        if (CONFIG.hideTrending) {
            if (style) return;
            const s = document.createElement('style');
            s.id = 'clify-hide-trending-styles';
            s.textContent = `
                a[href="/feed/trending"],
                a[href="/feed/explore"],
                a[href="/gaming"],
                ytd-guide-entry-renderer:has(a[href="/feed/trending"]),
                ytd-guide-entry-renderer:has(a[href="/feed/explore"]),
                ytd-guide-entry-renderer:has(a[href="/gaming"]),
                ytd-guide-entry-renderer:has(a[href="/feed/storefront"]) {
                    display: none !important;
                }
            `;
            document.head.appendChild(s);
        } else {
            if (style) style.remove();
        }
    }

    // =============================================
    // FEATURE 2: AUTO-CONFIRM "CONTINUE WATCHING?"
    // =============================================
    let autoConfirmObserver = null;
    function applyAutoConfirmPause() {
        if (CONFIG.autoConfirmPause) {
            if (autoConfirmObserver) return;
            autoConfirmObserver = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    for (const node of m.addedNodes) {
                        if (node.nodeType !== 1) continue;
                        const btn = node.querySelector?.('button.ytp-ad-skip-button-modern, button.ytp-ad-skip-button') 
                            || (node.matches?.('button.ytp-ad-skip-button-modern, button.ytp-ad-skip-button') ? node : null);
                        if (btn) { btn.click(); continue; }
                        if (node.textContent?.includes('Continue watching?') || node.textContent?.includes('Video paused')) {
                            const confirmBtn = node.querySelector('button, [role="button"]');
                            if (confirmBtn) setTimeout(() => confirmBtn.click(), 500);
                        }
                    }
                }
            });
            autoConfirmObserver.observe(document.documentElement, { childList: true, subtree: true });
            console.log('Clify: Auto-Confirm Pause ACTIVE');
        } else {
            if (autoConfirmObserver) { autoConfirmObserver.disconnect(); autoConfirmObserver = null; }
        }
    }

    // =============================================
    // FEATURE 3: VOLUME BOOST
    // =============================================
    function applyVolumeBoost() {
        const existing = document.getElementById('clify-volume-boost-style');
        if (CONFIG.volumeBoost > 100 && CONFIG.volumeBoost <= 200) {
            if (existing) return;
            const s = document.createElement('style');
            s.id = 'clify-volume-boost-style';
            const vol = CONFIG.volumeBoost / 100;
            s.textContent = `
                audio { volume: ${vol} !important; }
                video { volume: ${vol} !important; }
            `;
            document.head.appendChild(s);
            const videoEl = document.querySelector('video');
            if (videoEl) videoEl.volume = Math.min(vol, 1);
        } else {
            if (existing) existing.remove();
        }
    }

    // =============================================
    // FEATURE 4: PIP BUTTON
    // =============================================
    function addPipButton() {
        if (!CONFIG.pipButton) return;
        if (document.querySelector('.clify-pip-btn')) return;

        const controls = document.querySelector('.ytp-right-controls');
        if (!controls) return;

        const btn = document.createElement('button');
        btn.className = 'clify-pip-btn ytp-button';
        btn.title = 'Clify: Picture in Picture';
        btn.setAttribute('aria-label', 'Picture in Picture');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 5h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2 -2v-4"/><path d="M15 10h5a1 1 0 0 0 1 -1v-3a1 1 0 0 0 -1 -1h-5a1 1 0 0 0 -1 1v3a1 1 0 0 0 1 1"/></svg>';

        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                const vid = document.querySelector('video');
                if (!vid) return;
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                } else {
                    await vid.requestPictureInPicture();
                }
            } catch (err) {}
        });

        controls.insertBefore(btn, controls.firstChild);
    }

    // =============================================
    // FEATURE 5: KEYBOARD SHORTCUTS
    // =============================================
    let keyboardHandlerRef = null;
    function applyKeyboardShortcuts() {
        if (keyboardHandlerRef) { document.removeEventListener('keydown', keyboardHandlerRef); keyboardHandlerRef = null; }
        if (!CONFIG.keyboardShortcuts) return;
        keyboardHandlerRef = function clifyKeyHandler(e) {
            if (!CONFIG.keyboardShortcuts) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
            if (!e.altKey) return;
            switch (e.key.toLowerCase()) {
                case 'b': {
                    e.preventDefault();
                    const vid = document.querySelector('video');
                    if (!vid) return;
                    const title = document.querySelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata yt-formatted-string')?.textContent || document.title;
                    const url = location.href;
                    const id = new URL(url).searchParams.get('v');
                    if (id) {
                        const info = { id, title, url, channel: null, element: vid.closest('ytd-watch-flexy') || vid.parentElement };
                        blockVideo(info, 'manual');
                    }
                    break;
                }
                case 'f': {
                    e.preventDefault();
                    const fm = !CONFIG.focusMode;
                    CONFIG.focusMode = fm;
                    applyFocusMode();
                    saveToLocalStorage();
                    showToast('Focus Mode', fm ? 'ON — distractions hidden' : 'OFF — full view restored');
                    break;
                }
                case 'p': {
                    e.preventDefault();
                    const video = document.querySelector('video');
                    if (!video) return;
                    if (document.pictureInPictureElement) {
                        document.exitPictureInPicture();
                    } else {
                        video.requestPictureInPicture().catch(() => {});
                    }
                    break;
                }
                case 'm': {
                    e.preventDefault();
                    const v = document.querySelector('video');
                    if (v) { v.muted = !v.muted; showToast('Mute', v.muted ? 'Tab muted' : 'Tab unmuted'); }
                    break;
                }
            }
        };
    }

    // =============================================
    // FEATURE 6: FULL SPONSORBLOCK
    // =============================================
    const SPONSORBLOCK_API = 'https://sponsor.ajay.app/api';
    const SPONSORBLOCK_API_FALLBACK = 'https://api.sponsor.ajay.app/api';
    const SPONSOR_COLORS = {
        sponsor: '#C1F11D',
        selfpromo: '#F5A623',
        interaction: '#4A90D9',
        intro: '#9B59B6',
        outro: '#E74C3C',
        preview: '#2ECC71',
        hook: '#00BCD4',
        filler: '#7E57C2',
        music_offtopic: '#95A5A6'
    };
    const SPONSOR_TYPE_NAMES = {
        sponsor: 'Sponsor',
        selfpromo: 'Self-Promo',
        interaction: 'Interaction Reminder',
        intro: 'Intro',
        outro: 'Outro',
        preview: 'Upcoming',
        hook: 'Hook',
        filler: 'Filler',
        music_offtopic: 'Non-Music Section'
    };
    const SPONSOR_TYPE_ICONS = {
        sponsor: 'ti ti-building-store',
        selfpromo: 'ti ti-user-heart',
        interaction: 'ti ti-thumb-up',
        intro: 'ti ti-player-play',
        outro: 'ti ti-player-skip-forward',
        preview: 'ti ti-eye',
        hook: 'ti ti-hook',
        filler: 'ti ti-clock-hour-4',
        music_offtopic: 'ti ti-music'
    };
    const sponsorCache = {};
    let lastSponsorVideoId = null;
    let lastWatchedVideoId = null;
    let sponsorTimeUpdateHandler = null;
    let sponsorEndHandler = null;
    let sponsorOverlayObserver = null;
    let sponsorStats = { segmentsSkipped: 0, timeSaved: 0 };

    function isGenuineOutro(video, segment) {
        if (segment.type !== 'outro') return false;
        const duration = video.duration;
        if (!duration || !isFinite(duration) || duration <= 0) return false;
        const videoEnd = duration;
        const outroEnd = segment.end;
        const outroStart = segment.start;
        const distFromEnd = videoEnd - outroEnd;
        const outroDuration = outroEnd - outroStart;
        if (distFromEnd <= Math.min(60, duration * 0.05) && outroDuration <= Math.min(30, duration * 0.1)) {
            return true;
        }
        if (distFromEnd <= 5 && outroDuration <= duration * 0.15) {
            return true;
        }
        return false;
    }

    function shouldSkipSegment(video, segment) {
        if (segment.type !== 'outro') return true;
        if (isGenuineOutro(video, segment)) return true;
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return true;
        const distFromEnd = duration - segment.end;
        if (distFromEnd > duration * 0.15 && segment.end - segment.start > 60) {
            return false;
        }
        return true;
    }

    function mergeAdjacentSegments(segments, mergeGap) {
        if (segments.length <= 1) return segments;
        const merged = [];
        let current = { ...segments[0] };
        for (let i = 1; i < segments.length; i++) {
            const next = segments[i];
            if (next.start - current.end <= (mergeGap || 1.5)) {
                current.end = Math.max(current.end, next.end);
                if (next.type === 'sponsor' || (current.type !== 'sponsor' && next.type === 'selfpromo')) {
                    current.type = next.type;
                }
                current.UUID = current.UUID + '+' + next.UUID;
            } else {
                merged.push(current);
                current = { ...next };
            }
        }
        merged.push(current);
        return merged;
    }

    async function fetchSponsorSegments(videoId) {
        if (sponsorCache[videoId] !== undefined) return sponsorCache[videoId];
        const allCats = ["sponsor","selfpromo","interaction","intro","outro","preview","hook","filler","music_offtopic"];
        const catParam = JSON.stringify(allCats);
        let pageLang = 'en';
        try {
            const htmlLang = document.documentElement.lang;
            if (htmlLang) pageLang = htmlLang.split('-')[0].toLowerCase();
            if (!pageLang || pageLang === 'en') {
                const ytLang = document.querySelector('meta[name="language"]')?.content ||
                               document.querySelector('ytd-transcript-renderer')?.getAttribute('language-code') ||
                               (typeof yt !== 'undefined'?.config_?.PLAYER_VARS?.player_response?.captions?.playerCaptionsTracklistRenderer?.translationLanguages !== 'undefined' ? 'en' : 'en');
                if (ytLang && ytLang !== 'en') pageLang = ytLang.split('-')[0].toLowerCase();
            }
        } catch(e) { pageLang = 'en'; }
        const langsToTry = pageLang === 'en' ? ['en'] : [pageLang, 'en'];
        const urls = [];
        for (const lang of langsToTry) {
            urls.push(`${SPONSORBLOCK_API}/skipSegments?videoID=${videoId}&categories=${catParam}&lang=${lang}`);
        }
        urls.push(`${SPONSORBLOCK_API_FALLBACK}/skipSegments?videoID=${videoId}&categories=${catParam}`);
        for (const lang of langsToTry) {
            urls.push(`${SPONSORBLOCK_API}/skipSegments?videoID=${videoId}&lang=${lang}`);
        }
        for (const url of urls) {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 5000);
                const resp = await fetch(url, { signal: controller.signal });
                clearTimeout(timeout);
                if (resp.ok) {
                    const data = await resp.json();
                    let segments = data.map(d => ({
                        start: d.segment[0],
                        end: d.segment[1],
                        type: d.category,
                        UUID: d.UUID,
                        locked: d.locked || false,
                        votes: d.votes || 0
                    })).filter(s => {
                        if (s.end - s.start < 0.5) return false;
                        if (s.end - s.start > 1200) return false;
                        return true;
                    }).sort((a, b) => a.start - b.start);
                    if (segments.length === 0) continue;
                    const verified = segments.filter(s => s.locked || s.votes >= 0);
                    segments = verified.length > 0 ? verified : segments;
                    segments = mergeAdjacentSegments(segments, 1.0);
                    sponsorCache[videoId] = segments;
                    console.log(`Clify SponsorBlock: Fetched ${segments.length} segments for ${videoId} (lang: ${pageLang})`);
                    return segments;
                }
            } catch (e) {
                if (e.name === 'AbortError') {
                    console.warn(`Clify SponsorBlock: Timeout for ${url.split('?')[0]}`);
                } else {
                    console.warn(`Clify SponsorBlock: ${url.split('?')[0]} failed:`, e.message);
                }
            }
        }
        sponsorCache[videoId] = [];
        return [];
    }

    function getActiveSegments(videoId) {
        const all = sponsorCache[videoId] || [];
        const cats = CONFIG.sponsorCategories || [];
        return all.filter(s => cats.includes(s.type));
    }

    function removeSponsorOverlays() {
        document.querySelectorAll('.clify-sponsor-bar').forEach(el => el.remove());
        if (sponsorOverlayObserver) { sponsorOverlayObserver.disconnect(); sponsorOverlayObserver = null; }
    }

    function removeMerchShelves() {
        if (!CONFIG.skipSponsors) return;
        const selectors = [
            'ytd-merch-shelf-renderer',
            'ytd-product-shelf-renderer',
            'ytd-compact-shelf-renderer',
            'ytd-offer-module-renderer',
            'ytd-shopping-companion-renderer',
            'ytd-buying-guide-renderer',
            'ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-shopping"]'
        ];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el && el.isConnected && !el.hasAttribute('data-clify-merch-removed')) {
                    el.setAttribute('data-clify-merch-removed', 'true');
                    el.style.display = 'none';
                    el.style.height = '0';
                    el.style.overflow = 'hidden';
                    setTimeout(() => { try { el.remove(); } catch(e) {} }, 200);
                }
            });
        });
        const shopPhrases = /shop\s+the\s+\w+[\s\w]*store|merch(?:andise)?[\s\-]|visit\s+\w+[\s\w]*store|buy\s+now|shop\s+now/i;
        document.querySelectorAll('#description, ytd-structured-description-content-renderer, ytd-compact-shelf-renderer, ytd-item-section-renderer').forEach(el => {
            if (!el || el.hasAttribute('data-clify-merch-removed')) return;
            const txt = el.textContent || '';
            if (shopPhrases.test(txt) && txt.length < 400) {
                el.setAttribute('data-clify-merch-removed', 'true');
                el.style.display = 'none';
                el.style.height = '0';
                el.style.overflow = 'hidden';
                setTimeout(() => { try { el.remove(); } catch(e) {} }, 200);
            }
        });
    }

    function cleanLiveStream() {
        if (!CONFIG.liveStreamCleaner) return;
        const selectors = [];
        if (CONFIG.lcHideChat !== false) {
            selectors.push(
                '#chat', '#chat-messages', '#chatframe',
                'ytd-live-chat-frame', '#live-chat-item-list',
                '.yt-live-chat-renderer', '#chat-messages .yt-formatted-string'
            );
        }
        if (CONFIG.lcHideSuperChat !== false) {
            selectors.push(
                'yt-live-chat-paid-message-renderer',
                'yt-live-chat-paid-sticker-renderer',
                'ytd-super-chat-target-renderer',
                'ytd-super-sticker-target-renderer',
                '.live-chat-paid-message',
                '.ytd-super-chat-renderer'
            );
        }
        if (CONFIG.lcHideMembers !== false) {
            selectors.push(
                'yt-live-chat-membership-item-renderer',
                '.live-chat-membership-item',
                'ytd-member-moderation-message-renderer'
            );
        }
        if (CONFIG.lcHideTicker !== false) {
            selectors.push(
                'yt-live-chat-ticker-renderer',
                '.live-chat-ticker',
                'yt-live-chat-ticker-paid-message-item-renderer',
                'yt-live-chat-ticker-sponsor-accounts-item-renderer',
                '#ticker',
                'ytd-live-chat-ticker-renderer'
            );
        }
        selectors.forEach(sel => {
            try {
                document.querySelectorAll(sel).forEach(el => {
                    if (el && el.isConnected && !el.hasAttribute('data-clify-live-cleaned')) {
                        el.setAttribute('data-clify-live-cleaned', 'true');
                        el.style.display = 'none';
                        el.style.height = '0';
                        el.style.overflow = 'hidden';
                    }
                });
            } catch(e) {}
        });
    }

    function bypassAgeGate() {
        if (!CONFIG.ageGateBypass) return;
        try {
            let bypassed = false;
            // 1) Click "I understand and wish to proceed" button
            const proceedSelectors = [
                '#confirm-button button',
                'button.yt-uix-overlaylink',
                '.yt-uix-overlaylink',
                '#player-error-message-container button',
                'tp-yt-paper-dialog #button',
                '#error-screen button.yt-uix-button',
                '.consent-bump button',
                'button[data-purpose="age-gate-proceed"]',
                '.age-gate-proceed-button',
                '#age-gate-proceed-button'
            ];
            proceedSelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(btn => {
                    if (btn && btn.offsetParent !== null && !btn.hasAttribute('data-clify-agegate')) {
                        const text = (btn.textContent || '').toLowerCase();
                        if (text.includes('proceed') || text.includes('understand') || text.includes('continue') || text.includes('i agree') || text.includes('yes') || text.includes('confirm')) {
                            btn.setAttribute('data-clify-agegate', 'true');
                            try { btn.click(); bypassed = true; } catch(e) {}
                        }
                    }
                });
            });
            // 2) Remove age-gate overlays
            const overlaySelectors = [
                '#player-error-message-container',
                '.ytp-error-content-wrap-reason',
                '.ytp-error',
                '#error-screen',
                '.yt-uix-overlay',
                '.consent-bump',
                '#consent-bump',
                '.yt-playability-error-supported-renderers',
                '[overlay-trigger="YTP_ERROR_LOGIN_REQUIRED"]',
                '[overlay-trigger="YTP_ERROR年龄確認"]',
                'ytd-enforcement-message-view-model',
                '#consent-page',
                '.consent-page',
                'tp-yt-paper-dialog[aria-label*="age"]',
                'tp-yt-paper-dialog[aria-label*="confirm"]'
            ];
            overlaySelectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    if (el && el.isConnected && !el.hasAttribute('data-clify-agegate-removed')) {
                        el.setAttribute('data-clify-agegate-removed', 'true');
                        el.style.cssText = 'display:none!important;';
                        bypassed = true;
                    }
                });
            });
            // 3) Force-show the video player
            const player = document.querySelector('#movie_player, .html5-video-player');
            if (player) {
                player.style.visibility = 'visible';
                player.style.opacity = '1';
                player.style.display = 'block';
            }
            // 4) If YouTube embed is blocked, try to unblock
            const errorScreen = document.querySelector('#error-screen');
            if (errorScreen && errorScreen.style.display !== 'none') {
                errorScreen.style.display = 'none';
                bypassed = true;
            }
            // 5) Remove "Sign in to confirm your age" overlays
            document.querySelectorAll('ytd-consent-engine-renderer, ytd-masthead-renderer yt-confirm-dialog-renderer').forEach(el => {
                if (el && el.isConnected && !el.hasAttribute('data-clify-agegate-removed')) {
                    el.setAttribute('data-clify-agegate-removed', 'true');
                    el.style.cssText = 'display:none!important;';
                    bypassed = true;
                }
            });
            if (bypassed) {
                console.log('Clify: Age-gate bypassed');
            }
        } catch(e) {}
    }

    // =============================================
    // AUDIO EQUALIZER - WEB AUDIO API
    // =============================================
    let audioCtx = null;
    let eqFilters = [];
    let eqSource = null;
    let eqConnected = false;

    const EQ_PRESETS = {
        flat:     [0, 0, 0, 0, 0],
        music:    [4, 2, 0, 2, 4],
        voice:    [-2, 0, 4, 3, 1],
        bass:     [6, 4, 1, 0, -1],
        treble:   [-1, 0, 1, 4, 6],
        cinema:   [5, 2, 0, 3, 5],
        gaming:   [3, 2, 1, 3, 4],
        podcast:  [-1, 2, 4, 2, 0],
        loudness: [5, 3, 0, 3, 5]
    };

    const EQ_BANDS = [
        { type: 'lowshelf',  freq: 60,   label: 'Bass' },
        { type: 'peaking',   freq: 250,  label: 'Low-Mid' },
        { type: 'peaking',   freq: 1000, label: 'Mid' },
        { type: 'peaking',   freq: 4000, label: 'High-Mid' },
        { type: 'highshelf', freq: 12000, label: 'Treble' }
    ];

    function initAudioEqualizer() {
        if (!CONFIG.audioEqualizer) return;
        try {
            const video = document.querySelector('video');
            if (!video) return;

            if (!audioCtx || audioCtx.state === 'closed') {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }

            if (!eqSource) {
                eqSource = audioCtx.createMediaElementSource(video);
            }

            // Build filter chain
            eqFilters = EQ_BANDS.map(band => {
                const filter = audioCtx.createBiquadFilter();
                filter.type = band.type;
                filter.frequency.setValueAtTime(band.freq, audioCtx.currentTime);
                filter.Q.setValueAtTime(1.4, audioCtx.currentTime);
                filter.gain.setValueAtTime(0, audioCtx.currentTime);
                return filter;
            });

            // Apply saved gains
            const gains = CONFIG.eqGains || [0, 0, 0, 0, 0];
            eqFilters.forEach((f, i) => {
                f.gain.setValueAtTime(gains[i] || 0, audioCtx.currentTime);
            });

            // Connect chain: source -> filter0 -> filter1 -> ... -> destination
            eqSource.connect(eqFilters[0]);
            for (let i = 0; i < eqFilters.length - 1; i++) {
                eqFilters[i].connect(eqFilters[i + 1]);
            }
            eqFilters[eqFilters.length - 1].connect(audioCtx.destination);

            // Disconnect direct connection to avoid double audio
            try { eqSource.disconnect(audioCtx.destination); } catch(e) {}
            // Disconnect old filters if any
            try { eqSource.disconnect(); } catch(e) {}
            // Reconnect chain
            eqSource.connect(eqFilters[0]);

            eqConnected = true;
            console.log('Clify: Audio Equalizer initialized');
        } catch(e) {
            console.warn('Clify: Audio Equalizer init failed:', e);
        }
    }

    function destroyAudioEqualizer() {
        try {
            if (eqFilters.length && eqSource) {
                eqSource.disconnect();
                eqFilters.forEach(f => { try { f.disconnect(); } catch(e) {} });
                eqFilters = [];
            }
            // Reconnect direct: source -> destination
            if (eqSource && audioCtx && audioCtx.state !== 'closed') {
                try { eqSource.connect(audioCtx.destination); } catch(e) {}
            }
            eqConnected = false;
        } catch(e) {}
    }

    function setEqBand(index, gainDb) {
        if (!eqConnected || !eqFilters[index]) return;
        try {
            eqFilters[index].gain.setValueAtTime(gainDb, audioCtx.currentTime);
            const gains = CONFIG.eqGains || [0, 0, 0, 0, 0];
            gains[index] = gainDb;
            CONFIG.eqGains = gains;
            // Persist
            chrome.storage.local.get(['clify_data'], (result) => {
                const data = result.clify_data || {};
                data.eqGains = gains;
                chrome.storage.local.set({ clify_data: data });
            });
        } catch(e) {}
    }

    function applyEqPreset(presetName) {
        const preset = EQ_PRESETS[presetName];
        if (!preset) return;
        CONFIG.eqPreset = presetName;
        CONFIG.eqGains = [...preset];
        preset.forEach((gain, i) => setEqBand(i, gain));
        // Persist
        chrome.storage.local.get(['clify_data'], (result) => {
            const data = result.clify_data || {};
            data.eqPreset = presetName;
            data.eqGains = [...preset];
            chrome.storage.local.set({ clify_data: data });
        });
    }

    function renderSponsorOverlay(videoId, video) {
        removeSponsorOverlays();
        if (!CONFIG.sponsorShowOverlay || !CONFIG.skipSponsors) return;
        const segments = getActiveSegments(videoId);
        if (segments.length === 0) return;
        const slider = document.querySelector('.ytp-progress-bar') ||
                       document.querySelector('.ytp-progress-bar-container') ||
                       document.querySelector('#movie_player .html5-video-player .ytp-progress-bar');
        if (!slider) {
            console.warn('Clify SponsorBlock: progress bar not found, retrying...');
            setTimeout(() => renderSponsorOverlay(videoId, video), 1000);
            return;
        }

        function drawBars() {
            document.querySelectorAll('.clify-sponsor-bar').forEach(el => el.remove());
            const existing = slider.querySelector('.clify-sponsor-bars');
            if (existing) existing.remove();
            const duration = video.duration;
            if (!duration || !isFinite(duration) || duration <= 0) return;
            const container = document.createElement('div');
            container.className = 'clify-sponsor-bars';
            container.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:10;';
            segments.forEach(seg => {
                const bar = document.createElement('div');
                bar.className = 'clify-sponsor-bar';
                const left = (seg.start / duration) * 100;
                const width = Math.max(((seg.end - seg.start) / duration) * 100, 0.3);
                const color = SPONSOR_COLORS[seg.type] || '#C1F11D';
                const typeName = SPONSOR_TYPE_NAMES[seg.type] || seg.type;
                const saved = Math.round(seg.end - seg.start);
                bar.style.cssText = `position:absolute;top:0;height:100%;background:${color};opacity:0.85;border-radius:1px;pointer-events:auto;cursor:pointer;transition:opacity 0.15s, height 0.15s;`;
                bar.style.left = left + '%';
                bar.style.width = width + '%';
                bar.title = `${typeName}: ${formatTime(seg.start)} → ${formatTime(seg.end)} (${saved}s)`;
                bar.addEventListener('mouseenter', () => {
                    bar.style.opacity = '1';
                    bar.style.height = '130%';
                    bar.style.top = '-15%';
                });
                bar.addEventListener('mouseleave', () => {
                    bar.style.opacity = '0.85';
                    bar.style.height = '100%';
                    bar.style.top = '0';
                });
                bar.addEventListener('click', (e) => {
                    e.stopPropagation();
                    video.currentTime = seg.start;
                });
                container.appendChild(bar);
            });
            slider.style.position = 'relative';
            slider.style.overflow = 'visible';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '10';
            container.style.overflow = 'visible';
            slider.appendChild(container);
        }

        if (video.duration && isFinite(video.duration) && video.duration > 0) {
            drawBars();
        } else {
            video.addEventListener('loadedmetadata', function onLoaded() {
                video.removeEventListener('loadedmetadata', onLoaded);
                drawBars();
            });
        }
        if (sponsorOverlayObserver) { sponsorOverlayObserver.disconnect(); sponsorOverlayObserver = null; }
        const progressBar = slider.closest('.ytp-progress-bar-container') || slider.parentElement;
        if (progressBar) {
            sponsorOverlayObserver = new MutationObserver(() => {
                if (!document.querySelector('.clify-sponsor-bars') && sponsorCache[videoId]?.length > 0) {
                    drawBars();
                }
            });
            sponsorOverlayObserver.observe(progressBar, { childList: true, subtree: true });
        }
    }

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m}:${String(sec).padStart(2, '0')}`;
    }

    function attachSponsorListener(video, videoId) {
        if (sponsorTimeUpdateHandler && video) {
            video.removeEventListener('timeupdate', sponsorTimeUpdateHandler);
        }
        if (sponsorEndHandler && video) {
            video.removeEventListener('ended', sponsorEndHandler);
        }
        sponsorEndHandler = function () {
            removeSponsorOverlays();
            if (sponsorTimeUpdateHandler) {
                video.removeEventListener('timeupdate', sponsorTimeUpdateHandler);
                sponsorTimeUpdateHandler = null;
            }
        };
        video.addEventListener('ended', sponsorEndHandler);
        let lastSkippedUUID = '';
        sponsorTimeUpdateHandler = function () {
            if (!CONFIG.skipSponsors) {
                video.removeEventListener('timeupdate', sponsorTimeUpdateHandler);
                sponsorTimeUpdateHandler = null;
                return;
            }
            const segments = getActiveSegments(videoId);
            const t = video.currentTime;
            let inSegment = null;
            for (const seg of segments) {
                if (t >= seg.start && t < seg.end) {
                    inSegment = seg;
                    break;
                }
            }
            if (inSegment) {
                if (inSegment.UUID === lastSkippedUUID && Math.abs(video.currentTime - inSegment.end) < 0.5) return;
                if (!shouldSkipSegment(video, inSegment)) {
                    return;
                }
                const skipTo = inSegment.end;
                video.currentTime = skipTo;
                lastSkippedUUID = inSegment.UUID;
                sponsorStats.segmentsSkipped++;
                const saved = Math.round(inSegment.end - inSegment.start);
                sponsorStats.timeSaved += saved;
                usageSession.sponsorsSkipped = (usageSession.sponsorsSkipped || 0) + 1;
                usageSession.timeSaved = (usageSession.timeSaved || 0) + saved;
                flushUsageStats();
                const typeName = SPONSOR_TYPE_NAMES[inSegment.type] || inSegment.type;
                const isOutro = inSegment.type === 'outro';
                const prefix = isOutro ? 'Outro' : 'SponsorBlock';
                const icon = isOutro ? 'ti ti-player-skip-forward' : 'ti ti-player-skip-forward';
                showToast(`${prefix} · Skipped ${typeName}`, `${formatTime(inSegment.start)} → ${formatTime(inSegment.end)} · ${saved}s saved`, 3000);
                try { chrome.runtime.sendMessage({ type: 'sponsorBlockSkip', stats: sponsorStats }); } catch(e) {}
            }
        };
        video.addEventListener('timeupdate', sponsorTimeUpdateHandler);
    }

    async function checkSponsorSkip() {
        const videoId = new URLSearchParams(window.location.search).get('v');
        if (videoId && videoId !== lastWatchedVideoId) {
            lastWatchedVideoId = videoId;
            recordVideoWatch();
        }
        if (!CONFIG.skipSponsors) { removeSponsorOverlays(); return; }
        const video = document.querySelector('video');
        if (!video) return;
        if (!videoId) return;
        removeMerchShelves();
        if (videoId !== lastSponsorVideoId) {
                console.log(`Clify SponsorBlock: New video detected: ${videoId}`);
                lastSponsorVideoId = videoId;
                const segments = await fetchSponsorSegments(videoId);
                if (segments.length > 0) {
                    const activeSegs = getActiveSegments(videoId);
                    const typeCounts = {};
                    activeSegs.forEach(s => {
                        typeCounts[s.type] = (typeCounts[s.type] || 0) + 1;
                    });
                    const breakdown = Object.entries(typeCounts)
                        .map(([type, count]) => `${count} ${SPONSOR_TYPE_NAMES[type] || type}`)
                        .join(', ');
                    console.log(`Clify SponsorBlock: ${activeSegs.length} segments found: ${breakdown}`);
                    showToast('SponsorBlock', `${activeSegs.length} segment${activeSegs.length > 1 ? 's' : ''} — ${breakdown}`, 3500);
                    attachSponsorListener(video, videoId);
                    renderSponsorOverlay(videoId, video);
            } else {
                console.log(`Clify SponsorBlock: No segments for ${videoId}`);
                removeSponsorOverlays();
            }
        } else if (!document.querySelector('.clify-sponsor-bars') && sponsorCache[videoId]?.length > 0) {
            attachSponsorListener(video, videoId);
            renderSponsorOverlay(videoId, video);
        }
    }

    function applySkipSponsors() {
        const existingStyle = document.getElementById('clify-sponsor-styles');
        if (CONFIG.skipSponsors) {
            if (existingStyle) return;
            const s = document.createElement('style');
            s.id = 'clify-sponsor-styles';
            s.textContent = `
                .clify-skip-segment-btn { font-family: inherit; }
                .clify-skip-segment-btn i { font-size: 14px; }
                .clify-sponsor-bar { transition: opacity 0.15s, height 0.15s, top 0.15s; }
                .clify-sponsor-bar:hover { opacity: 1 !important; }
                .clify-sponsor-bars { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none; z-index: 25 !important; overflow: visible !important; }
                .ytp-progress-bar { overflow: visible !important; }
                .ytp-progress-bar-container { overflow: visible !important; }
                .ytp-chrome-bottom .ytp-progress-bar-container { overflow: visible !important; }
            `;
            document.head.appendChild(s);
        } else {
            if (existingStyle) existingStyle.remove();
            removeSponsorOverlays();
            lastSponsorVideoId = null;
            const video = document.querySelector('video');
            if (video && sponsorEndHandler) {
                video.removeEventListener('ended', sponsorEndHandler);
                sponsorEndHandler = null;
            }
        }
    }

    // =============================================
    // FEATURE: CONTENT DENSITY METER
    // =============================================
    let lastDensityVideoId = null;

    const DENSITY_NON_CONTENT_TYPES = ['sponsor','selfpromo','intro','outro','hook','filler','interaction','preview','music_offtopic'];

    function calculateContentDensity(videoDuration, segments) {
        if (!videoDuration || videoDuration <= 0) {
            return { pct: null, nonContentSec: 0, contentSec: 0, counts: {} };
        }
        let nonContentSec = 0;
        const counts = {};
        if (segments && segments.length > 0) {
            for (const seg of segments) {
                if (DENSITY_NON_CONTENT_TYPES.includes(seg.type)) {
                    const duration = Math.max(0, seg.end - seg.start);
                    nonContentSec += duration;
                    counts[seg.type] = (counts[seg.type] || 0) + 1;
                }
            }
        }
        nonContentSec = Math.min(nonContentSec, videoDuration);
        const contentSec = videoDuration - nonContentSec;
        const pct = Math.round((contentSec / videoDuration) * 100);
        return { pct, nonContentSec, contentSec, counts };
    }

    function getDensityRating(pct) {
        if (pct === null) return { color: '#888', bg: '#444', label: 'No Data' };
        if (pct >= 90) return { color: '#06b6d4', bg: '#0891b2', label: 'Pure Content' };
        if (pct >= 75) return { color: '#22d3ee', bg: '#0e7490', label: 'Mostly Content' };
        if (pct >= 55) return { color: '#a78bfa', bg: '#7c3aed', label: 'Mixed' };
        if (pct >= 35) return { color: '#fb923c', bg: '#ea580c', label: 'Fluffy' };
        return { color: '#f87171', bg: '#dc2626', label: 'High Fluff' };
    }

    function showContentDensityBadge(videoId, segments) {
        try {
            if (!window.location.pathname.startsWith('/watch')) return;
            if (videoId === lastDensityVideoId) {
                const existing = document.querySelector('.clify-density-badge');
                if (existing) return;
            }
            lastDensityVideoId = videoId;
            document.querySelectorAll('.clify-density-badge').forEach(el => el.remove());
            const titleEl = document.querySelector('#above-the-fold #title, ytd-watch-metadata #title, h1.ytd-watch-metadata, #title.ytd-watch-metadata yt-formatted-string');
            if (!titleEl) return;
            const video = document.querySelector('video');
            if (!video) return;
            const duration = video.duration;
            if (!duration || isNaN(duration) || !isFinite(duration)) return;
            const density = calculateContentDensity(duration, segments);
            if (density.pct === null) return;
            const rating = getDensityRating(density.pct);
            const channelInfo = extractWatchPageChannelInfo();
            if (channelInfo && channelInfo.id) {
                updateChannelScore(channelInfo.id, density.pct);
            }
            let badgeWrap = document.querySelector('.clify-badges');
            if (!badgeWrap) {
                badgeWrap = document.createElement('div');
                badgeWrap.className = 'clify-badges';
                badgeWrap.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:8px;';
                titleEl.insertAdjacentElement('afterbegin', badgeWrap);
            }
            const badge = document.createElement('div');
            badge.className = 'clify-density-badge';
            badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:3px 8px 3px 5px;border-radius:5px;font-size:10px;font-weight:600;font-family:system-ui,-apple-system,sans-serif;cursor:default;min-height:22px;box-sizing:border-box;width:fit-content;line-height:1;letter-spacing:0.02em;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);background:' + rating.bg + ';color:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1);';
            badge.title = density.pct + '% content density — ' + density.nonContentSec.toFixed(0) + 's non-content in ' + duration.toFixed(0) + 's video';
            badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex-shrink:0;margin:-1px 0 0 -1px;opacity:0.9"><circle cx="12" cy="12" r="10"/><path d="M12 2 A10 10 0 0 1 12 22"/><line x1="12" y1="2" x2="12" y2="12"/><line x1="12" y1="12" x2="20" y2="8"/></svg><span style="display:block;line-height:1">' + density.pct + '%</span>';
            badgeWrap.appendChild(badge);
            console.log(`Clify Content Density: ${density.pct}% for ${videoId} (${rating.label})`);
        } catch(e) {
            console.error('Clify Content Density badge error:', e);
        }
    }

    function removeDensityBadge() {
        document.querySelectorAll('.clify-density-badge').forEach(el => el.remove());
        lastDensityVideoId = null;
    }

    async function updateChannelScore(channelId, score) {
        try {
            const key = 'clify_channel_scores';
            const stored = await new Promise(resolve => {
                chrome.storage.local.get([key], result => resolve(result[key] || {}));
            });
            if (!stored[channelId]) stored[channelId] = { scores: [], totalVideos: 0 };
            stored[channelId].scores.push(score);
            if (stored[channelId].scores.length > 20) stored[channelId].scores.shift();
            stored[channelId].totalVideos++;
            const avg = Math.round(stored[channelId].scores.reduce((a, b) => a + b, 0) / stored[channelId].scores.length);
            stored[channelId].average = avg;
            stored[channelId].lastUpdated = Date.now();
            chrome.storage.local.set({ [key]: stored });
        } catch(e) {}
    }

    async function getChannelAverageScore(channelId) {
        try {
            const key = 'clify_channel_scores';
            const stored = await new Promise(resolve => {
                chrome.storage.local.get([key], result => resolve(result[key] || {}));
            });
            return stored[channelId]?.average ?? null;
        } catch(e) { return null; }
    }

    let densityFetching = false;

    async function checkContentDensity() {
        if (!CONFIG.contentDensity) { removeDensityBadge(); return; }
        if (!window.location.pathname.startsWith('/watch')) return;
        const videoId = new URLSearchParams(window.location.search).get('v');
        if (!videoId) return;
        const existing = document.querySelector('.clify-density-badge');
        if (existing && lastDensityVideoId === videoId) return;
        if (densityFetching) return;
        densityFetching = true;
        try {
            let segments = sponsorCache[videoId];
            if (segments === undefined) {
                fetchSponsorSegments(videoId).then(fetched => {
                    sponsorCache[videoId] = fetched || [];
                    const vid = document.querySelector('video');
                    if (vid && vid.duration && !isNaN(vid.duration) && isFinite(vid.duration)) {
                        showContentDensityBadge(videoId, fetched || []);
                    }
                });
                segments = [];
            }
            showContentDensityBadge(videoId, segments);
        } finally {
            densityFetching = false;
        }
    }

    // =============================================
    // FEATURE: MONETIZATION BADGE
    // =============================================
    let lastMonetizationVideoId = null;

    function detectMonetization() {
        try {
            if (typeof ytInitialPlayerResponse !== 'undefined' && ytInitialPlayerResponse) {
                const pr = ytInitialPlayerResponse;
                if (pr.playerAds && pr.playerAds.length > 0) return true;
                if (pr.adPlacements && pr.adPlacements.length > 0) return true;
                const mf = pr.microformat && pr.microformat.playerMicroformatRenderer;
                if (mf) {
                    if (mf.isMonetized === true) return true;
                    if (mf.availableCountries && mf.availableCountries.length > 0 && mf.hasYpc) return true;
                    if (mf.monetization) return true;
                }
            }
        } catch(e) {}
        try {
            if (typeof ytInitialData !== 'undefined' && ytInitialData) {
                const contents = ytInitialData.contents;
                if (contents && contents.twoColumnWatchNextResults) {
                    const results = contents.twoColumnWatchNextResults.results;
                    if (results && results.results && results.results.contents) {
                        for (const item of results.results.contents) {
                            if (item.videoPrimaryInfoRenderer) {
                                const badges = item.videoPrimaryInfoRenderer.badges || [];
                                for (const b of badges) {
                                    const label = b?.metadataBadgeRenderer?.label || '';
                                    if (label.toLowerCase().includes('sponsor') || label.toLowerCase().includes('paid')) return true;
                                }
                            }
                        }
                    }
                }
                const engagementPanels = ytInitialData.engagementPanels || [];
                for (const panel of engagementPanels) {
                    const header = panel?.engagementPanelSectionListRenderer?.header;
                    if (header && JSON.stringify(header).toLowerCase().includes('shopping')) return true;
                }
            }
        } catch(e) {}
        try {
            const player = document.querySelector('#movie_player, ytd-player');
            if (player && player.getPlayerResponse) {
                const resp = player.getPlayerResponse();
                if (resp && resp.playerAds && resp.playerAds.length > 0) return true;
                if (resp && resp.adPlacements && resp.adPlacements.length > 0) return true;
            }
        } catch(e) {}
        try {
            const bars = document.querySelectorAll('.ytp-ad-progress-segment');
            if (bars.length > 0) return true;
        } catch(e) {}
        try {
            const adOverlays = document.querySelectorAll('.ytp-ad-overlay-container, .ytp-ad-text-overlay');
            if (adOverlays.length > 0) return true;
        } catch(e) {}
        try {
            const paidPromo = document.querySelector('ytd-banner-promo-renderer, [class*="paid-promotion"], #paid-commercial-label');
            if (paidPromo) return true;
        } catch(e) {}
        try {
            const ytData = document.querySelector('#microformat');
            if (ytData) {
                const jsonEl = ytData.querySelector('script[type="application/ld+json"]');
                if (jsonEl) {
                    const data = JSON.parse(jsonEl.textContent);
                    if (data?.hasPart?.length > 0) return true;
                }
                const content = ytData.textContent || '';
                if (content.includes('"isMonetized":true') || content.includes('"monetization":true') || content.includes('"hasYpc":true')) return true;
            }
        } catch(e) {}
        try {
            const desc = document.querySelector('#description-inline-expander, #description');
            if (desc) {
                const text = desc.textContent || '';
                if (text.includes('includes paid promotion') || text.includes('paid promotion')) return true;
            }
        } catch(e) {}
        return false;
    }

    function addMonetizationBadge() {
        try {
            if (!window.location.pathname.startsWith('/watch')) return;
            const videoId = new URLSearchParams(window.location.search).get('v');
            if (!videoId) return;
            if (videoId === lastMonetizationVideoId) {
                const existing = document.querySelector('.clify-monetization-badge');
                if (existing) return;
            }
            lastMonetizationVideoId = videoId;
            document.querySelectorAll('.clify-monetization-badge').forEach(el => el.remove());
            const titleEl = document.querySelector('#above-the-fold #title, ytd-watch-metadata #title, h1.ytd-watch-metadata, #title.ytd-watch-metadata yt-formatted-string');
            if (!titleEl) return;
            let badgeWrap = document.querySelector('.clify-badges');
            if (!badgeWrap) {
                badgeWrap = document.createElement('div');
                badgeWrap.className = 'clify-badges';
                badgeWrap.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-bottom:8px;';
                titleEl.insertAdjacentElement('afterbegin', badgeWrap);
            }
            const isMonetized = detectMonetization();
            const badge = document.createElement('div');
            badge.className = 'clify-monetization-badge';
            badge.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;gap:4px;padding:3px 8px 3px 5px;border-radius:5px;font-size:10px;font-weight:600;font-family:system-ui,-apple-system,sans-serif;cursor:default;min-height:22px;box-sizing:border-box;width:fit-content;line-height:1;letter-spacing:0.02em;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.12);background:' + (isMonetized ? 'rgba(246,36,119,0.9)' : 'rgba(34,197,94,0.9)') + ';color:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1);';
            badge.title = isMonetized ? 'Monetized \u2014 viewers see ads' : 'Not monetized \u2014 no ads';
            badge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;flex-shrink:0;margin:-1px 0 0 -1px;opacity:0.9">' +
                (isMonetized
                    ? '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>'
                    : '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>') +
                '</svg><span style="display:block;line-height:1">' + (isMonetized ? 'Ads' : 'Ad-Free') + '</span>';
            badgeWrap.appendChild(badge);
            console.log('Clify: Monetization badge shown — ' + (isMonetized ? 'Monetized' : 'Not monetized') + ' (' + videoId + ')');
        } catch(e) {
            console.error('Clify: Monetization badge error:', e);
        }
    }

    // =============================================
    // FEATURE 7: FORCE VIDEO QUALITY
    // =============================================
    let qualityInterval = null;

    function applyForceQuality() {
        if (CONFIG.forceQuality && CONFIG.preferredQuality) {
            if (qualityInterval) return;
            qualityInterval = setInterval(() => {
                try {
                    const player = document.querySelector('#movie_player');
                    if (!player || !player.getAvailableQualityLevels) return;
                    const available = player.getAvailableQualityLevels();
                    if (!available || available.length === 0) return;
                    const qualityMap = { '2160': ['2160', '2160p', 'hd2160', 'hd2160p'], '1440': ['1440', '1440p', 'hd1440', 'hd1440p'], '1080': ['1080', '1080p', 'hd1080', 'hd1080p'], '720': ['720', '720p', 'hd720', 'hd720p'], '480': ['480', '480p', 'large', '480'], '360': ['360', '360p', 'medium', '360'] };
                    const targets = qualityMap[CONFIG.preferredQuality] || qualityMap['1080'];
                    const match = targets.find(t => available.includes(t));
                    if (match && player.getPlaybackQuality() !== match) {
                        player.setPlaybackQuality(match);
                    }
                } catch (e) {}
            }, 2000);
        } else {
            if (qualityInterval) { clearInterval(qualityInterval); qualityInterval = null; }
        }
    }

    // =============================================
    // FEATURE 8: HIDE COMMENTS
    // =============================================
    function applyHideComments() {
        const style = document.getElementById('clify-hide-comments-styles');
        if (CONFIG.hideComments) {
            if (style) return;
            const s = document.createElement('style');
            s.id = 'clify-hide-comments-styles';
            s.textContent = `
                #comments, ytd-comments, ytd-comments-header-renderer,
                #count.ytd-comments-header-renderer,
                ytd-item-section-renderer#comments,
                ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"],
                #comment-button, #comments-button-container,
                #below ytd-comments-teaser-renderer,
                yt-smartimation[hidden] ~ #comments,
                ytd-watch-flexy #comments {
                    display: none !important;
                }
            `;
            document.head.appendChild(s);
            console.log('Clify: Hide Comments ACTIVE');
        } else {
            if (style) style.remove();
        }
    }

    // =============================================
    // ENHANCED STYLES
    // =============================================
    function injectTablerIcons() {
        if (document.querySelector('#clify-tabler-icons')) return;
        const link = document.createElement('link');
        link.id = 'clify-tabler-icons';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/@tabler/icons-webfont@latest/tabler-icons.min.css';
        (document.head || document.documentElement).appendChild(link);
    }

    function injectNuclearStyles() {
        if (document.querySelector('#clify-nuclear-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'clify-nuclear-styles';
        style.textContent = `
            .${BTN_CLASS} {
                position: absolute !important;
                top: 8px !important;
                right: 8px !important;
                padding: 5px 12px 5px 8px !important;
                border-radius: 20px !important;
                font-size: 10px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                color: #ffffff !important;
                background: linear-gradient(135deg, #1a8a05, #266210) !important;
                border: 1.5px solid rgba(255, 255, 255, 0.2) !important;
                opacity: 0.88 !important;
                font-family: 'Inter', Arial, sans-serif !important;
                z-index: 10001 !important;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
                pointer-events: auto !important;
                text-transform: uppercase !important;
                letter-spacing: 0.8px !important;
                box-shadow: 0 2px 10px rgba(26, 138, 5, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                min-width: auto !important;
                line-height: 1 !important;
                height: 28px !important;
                white-space: nowrap !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 5px !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
            }
            
            .${BTN_CLASS} svg {
                width: 12px !important;
                height: 12px !important;
                flex-shrink: 0 !important;
            }
            
            .${BTN_CLASS}:hover {
                opacity: 1 !important;
                background: linear-gradient(135deg, #22a806, #2d8a12) !important;
                transform: scale(1.08) !important;
                box-shadow: 0 4px 20px rgba(26, 138, 5, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                border-color: rgba(255, 255, 255, 0.35) !important;
            }
            
            .${BTN_CLASS}:active {
                transform: scale(0.95) !important;
                box-shadow: 0 1px 4px rgba(26, 138, 5, 0.3) !important;
            }
            
            .${BLOCK_CHANNEL_BTN} {
                display: inline-flex !important;
                align-items: center !important;
                gap: 4px !important;
                padding: 3px 10px 3px 7px !important;
                border-radius: 14px !important;
                font-size: 8px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                color: #ffffff !important;
                background: linear-gradient(135deg, #1a8a05, #266210) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                opacity: 0.88 !important;
                font-family: 'Inter', Arial, sans-serif !important;
                z-index: 10001 !important;
                transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
                pointer-events: auto !important;
                text-transform: uppercase !important;
                letter-spacing: 0.5px !important;
                margin-left: 6px !important;
                vertical-align: middle !important;
                white-space: nowrap !important;
                line-height: 1 !important;
                height: 22px !important;
                box-shadow: 0 1px 6px rgba(26, 138, 5, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            }
            
            .${BLOCK_CHANNEL_BTN} svg {
                width: 10px !important;
                height: 10px !important;
                flex-shrink: 0 !important;
            }
            
            .${BLOCK_CHANNEL_BTN}:hover {
                opacity: 1 !important;
                background: linear-gradient(135deg, #22a806, #2d8a12) !important;
                border-color: rgba(255, 255, 255, 0.35) !important;
                box-shadow: 0 3px 12px rgba(26, 138, 5, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
                transform: scale(1.05) !important;
            }
            
            .${BLOCK_CHANNEL_BTN}:active {
                transform: scale(0.95) !important;
            }
            
            ytd-rich-item-renderer, ytd-video-renderer, 
            ytd-grid-video-renderer, ytd-compact-video-renderer,
            ytd-reel-item-renderer, yt-lockup-view-model {
                position: relative !important;
                overflow: visible !important;
            }
            
            [data-clify-blocked],
            [data-clify-removed],
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
            ytd-reel-player-overlay-renderer,
            .shorts-container,
            [class*="shorts"],
            [data-shorts] {
                display: none !important;
                visibility: hidden !important;
            }
            
            @media (max-width: 768px) {
                .${BTN_CLASS} {
                    padding: 3px 8px 3px 6px !important;
                    font-size: 0 !important;
                    border-radius: 16px !important;
                    top: 4px !important;
                    right: 4px !important;
                    height: 24px !important;
                    gap: 0 !important;
                }
                .${BTN_CLASS} svg {
                    width: 12px !important;
                    height: 12px !important;
                }
                .${BLOCK_CHANNEL_BTN} {
                    padding: 2px 6px 2px 5px !important;
                    font-size: 0 !important;
                    border-radius: 12px !important;
                    margin-left: 4px !important;
                    height: 20px !important;
                    gap: 0 !important;
                }
                .${BLOCK_CHANNEL_BTN} svg {
                    width: 10px !important;
                    height: 10px !important;
                }
            }

            ytd-compact-video-renderer,
            ytd-compact-radio-renderer,
            yt-lockup-view-model {
                position: relative !important;
                contain: none !important;
            }

            ytd-compact-list-renderer,
            ytd-item-section-renderer,
            #related ytd-item-section-renderer,
            ytd-watch-next-tabbed-results-renderer {
                overflow: visible !important;
            }

            yt-lockup-view-model .${BTN_CLASS} {
                top: 4px !important;
                right: 4px !important;
                padding: 3px 8px 3px 6px !important;
                font-size: 0 !important;
                border-radius: 16px !important;
                height: 24px !important;
                gap: 0 !important;
            }
            
            yt-lockup-view-model .${BTN_CLASS} svg {
                width: 12px !important;
                height: 12px !important;
            }

            yt-lockup-view-model yt-thumbnail-view-model {
                position: relative !important;
                overflow: visible !important;
                contain: none !important;
            }

            .clify-pip-btn {
                margin: 0 !important;
                background: transparent !important;
                cursor: pointer !important;
                pointer-events: auto !important;
                color: white !important;
            }

        `;
        
        document.head.appendChild(style);
    }

    // =============================================
    // STORAGE
    // =============================================
    function loadStorageData() {
        return new Promise((resolve) => {
            try {
                blockedVideos = JSON.parse(localStorage.getItem('clify_blocked_videos') || '{}');
                blockedChannels = JSON.parse(localStorage.getItem('clify_blocked_channels') || '{}');
                whitelistedChannels = JSON.parse(localStorage.getItem('clify_whitelisted_channels') || '{}');
                keywords = JSON.parse(localStorage.getItem('clify_keywords') || '[]');
                ClifyStats = JSON.parse(localStorage.getItem('clify_stats') || '{}');
                if (!ClifyStats.dailyActivity) ClifyStats = { dailyActivity: {}, totalBlocks: 0, shortsBlocks: 0, manualBlocks: 0, keywordBlocks: 0, channelBlocks: 0 };
                
                const savedConfig = localStorage.getItem('clify_enhanced_config');
                if (savedConfig) {
                    const parsed = JSON.parse(savedConfig);
                    Object.assign(CONFIG, parsed);
                    console.log('Clify: Loaded enhanced config from localStorage', parsed);
                }

                const syncReady = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;
                const localReady = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

                if (!syncReady && !localReady) {
                    console.log('Clify v12.0.0: Storage loaded (no chrome.storage)');
                    resolve();
                    return;
                }

                let pending = 0;
                function onDone() { pending--; if (pending <= 0) resolve(); }

                if (syncReady) {
                    pending++;
                    chrome.storage.sync.get(['clify_config'], (result) => {
                        if (result.clify_config) {
                            Object.assign(CONFIG, result.clify_config);
                            console.log('Clify: Loaded enhanced config from chrome.storage.sync');
                        }
                        onDone();
                    });
                }

                if (localReady) {
                    pending++;
                    chrome.storage.local.get(['clify_blocked_videos', 'clify_blocked_channels', 'clify_whitelisted_channels', 'clify_keywords', 'clify_stats', 'clify_language_config'], (result) => {
                        if (result.clify_blocked_videos && Object.keys(result.clify_blocked_videos).length > Object.keys(blockedVideos).length) {
                            blockedVideos = result.clify_blocked_videos;
                        }
                        if (result.clify_blocked_channels && Object.keys(result.clify_blocked_channels).length > Object.keys(blockedChannels).length) {
                            blockedChannels = result.clify_blocked_channels;
                        }
                        if (result.clify_whitelisted_channels && Object.keys(result.clify_whitelisted_channels).length > Object.keys(whitelistedChannels).length) {
                            whitelistedChannels = result.clify_whitelisted_channels;
                        }
                        if (result.clify_keywords && result.clify_keywords.length > keywords.length) {
                            keywords = result.clify_keywords;
                        }
                        if (result.clify_stats && (result.clify_stats.totalBlocks || 0) > (ClifyStats.totalBlocks || 0)) {
                            ClifyStats = result.clify_stats;
                        }
                        if (result.clify_language_config) {
                            if (typeof result.clify_language_config.languageBlock === 'boolean') {
                                CONFIG.languageBlock = result.clify_language_config.languageBlock;
                            }
                            if (Array.isArray(result.clify_language_config.preferredLanguages)) {
                                CONFIG.preferredLanguages = result.clify_language_config.preferredLanguages;
                            }
                        }
                        onDone();
                    });
                }
            } catch (error) {
                console.error('Clify: Error loading storage:', error);
                blockedVideos = {};
                blockedChannels = {};
                whitelistedChannels = {};
                keywords = [];
                resolve();
            }
        });
    }

    function saveToLocalStorage() {
        try {
            localStorage.setItem('clify_blocked_videos', JSON.stringify(blockedVideos));
            localStorage.setItem('clify_blocked_channels', JSON.stringify(blockedChannels));
            localStorage.setItem('clify_whitelisted_channels', JSON.stringify(whitelistedChannels));
            localStorage.setItem('clify_keywords', JSON.stringify(keywords));
            localStorage.setItem('clify_stats', JSON.stringify(ClifyStats));
            localStorage.setItem('clify_enhanced_config', JSON.stringify({
                removeShorts: CONFIG.removeShorts,
                blurMode: CONFIG.blurMode,
                focusMode: CONFIG.focusMode,
                scheduledBlocking: CONFIG.scheduledBlocking,
                scheduleStart: CONFIG.scheduleStart,
                scheduleEnd: CONFIG.scheduleEnd,
                hideTrending: CONFIG.hideTrending,
                autoConfirmPause: CONFIG.autoConfirmPause,
                volumeBoost: CONFIG.volumeBoost,
                pipButton: CONFIG.pipButton,
                keyboardShortcuts: CONFIG.keyboardShortcuts,
                skipSponsors: CONFIG.skipSponsors,
                sponsorCategories: CONFIG.sponsorCategories,
                sponsorShowOverlay: CONFIG.sponsorShowOverlay,
                forceQuality: CONFIG.forceQuality,
                preferredQuality: CONFIG.preferredQuality,
                hideComments: CONFIG.hideComments,
                adBlocker: CONFIG.adBlocker,
                languageBlock: CONFIG.languageBlock,
                preferredLanguages: CONFIG.preferredLanguages,
                watchLater: CONFIG.watchLater,
                readingMode: CONFIG.readingMode,
                customBlockedSelectors: CONFIG.customBlockedSelectors,
                shortcutBindings: CONFIG.shortcutBindings
            }));
        } catch (error) {}
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({
                    clify_blocked_videos: blockedVideos,
                    clify_blocked_channels: blockedChannels,
                    clify_whitelisted_channels: whitelistedChannels,
                    clify_keywords: keywords,
                    clify_stats: ClifyStats
                });
            }
        } catch (error) {}
    }

    function updateStats(reason) {
        try {
            const today = new Date().toISOString().slice(0, 10);
            if (!ClifyStats.dailyActivity) ClifyStats.dailyActivity = {};
            ClifyStats.dailyActivity[today] = (ClifyStats.dailyActivity[today] || 0) + 1;
            ClifyStats.totalBlocks = Object.keys(blockedVideos).length;
            ClifyStats.channelBlocks = Object.keys(blockedChannels).length;
            
            if (reason === 'shorts') ClifyStats.shortsBlocks = (ClifyStats.shortsBlocks || 0) + 1;
            else if (reason === 'manual') ClifyStats.manualBlocks = (ClifyStats.manualBlocks || 0) + 1;
            else if (reason === 'keyword') ClifyStats.keywordBlocks = (ClifyStats.keywordBlocks || 0) + 1;
            else if (reason === 'language') ClifyStats.languageBlocks = (ClifyStats.languageBlocks || 0) + 1;
            
            ClifyStats.lastUpdated = new Date().toISOString();
            saveToLocalStorage();
        } catch (error) {}
    }

    // =============================================
    // LANGUAGE BLOCK - UNICODE SCRIPT DETECTION
    // =============================================
    const SCRIPT_RANGES = {
        'ar': { name: 'Arabic', ranges: [[0x0600, 0x06FF], [0x0750, 0x077F], [0x08A0, 0x08FF], [0xFB50, 0xFDFF], [0xFE70, 0xFEFF]] },
        'he': { name: 'Hebrew', ranges: [[0x0590, 0x05FF], [0xFB1D, 0xFB4F]] },
        'hi': { name: 'Hindi', ranges: [[0x0900, 0x097F]] },
        'bn': { name: 'Bengali', ranges: [[0x0980, 0x09FF]] },
        'ta': { name: 'Tamil', ranges: [[0x0B80, 0x0BFF]] },
        'te': { name: 'Telugu', ranges: [[0x0C00, 0x0C7F]] },
        'kn': { name: 'Kannada', ranges: [[0x0C80, 0x0CFF]] },
        'ml': { name: 'Malayalam', ranges: [[0x0D00, 0x0D7F]] },
        'gu': { name: 'Gujarati', ranges: [[0x0A80, 0x0AFF]] },
        'pa': { name: 'Punjabi', ranges: [[0x0A00, 0x0A7F]] },
        'th': { name: 'Thai', ranges: [[0x0E00, 0x0E7F]] },
        'ko': { name: 'Korean', ranges: [[0xAC00, 0xD7AF], [0x1100, 0x11FF], [0x3130, 0x318F]] },
        'ja': { name: 'Japanese', ranges: [[0x3040, 0x309F], [0x30A0, 0x30FF], [0x31F0, 0x31FF], [0xFF65, 0xFF9F]] },
        'zh': { name: 'Chinese', ranges: [[0x4E00, 0x9FFF], [0x3400, 0x4DBF], [0xF900, 0xFAFF]] },
        'ru': { name: 'Russian', ranges: [[0x0400, 0x04FF], [0x0500, 0x052F]] },
        'el': { name: 'Greek', ranges: [[0x0370, 0x03FF]] },
        'ka': { name: 'Georgian', ranges: [[0x10A0, 0x10FF]] },
        'hy': { name: 'Armenian', ranges: [[0x0530, 0x058F]] },
        'my': { name: 'Myanmar', ranges: [[0x1000, 0x109F]] },
        'km': { name: 'Khmer', ranges: [[0x1780, 0x17FF]] },
        'lo': { name: 'Lao', ranges: [[0x0E80, 0x0EFF]] },
        'et': { name: 'Ethiopic', ranges: [[0x1200, 0x137F], [0x1380, 0x139F], [0x2D80, 0x2DDF]] }
    };

    const LATIN_SCRIPTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const SCRIPT_LANG_MAP = { 'hi': 'hi', 'bn': 'bn', 'ta': 'ta', 'te': 'te', 'kn': 'kn', 'ml': 'ml', 'gu': 'gu', 'pa': 'pa', 'ar': 'ar', 'he': 'he', 'ru': 'ru', 'el': 'el', 'ka': 'ka', 'hy': 'hy', 'th': 'th', 'ko': 'ko', 'ja': 'ja', 'zh': 'zh', 'my': 'my', 'km': 'km', 'lo': 'lo', 'et': 'et' };

    function detectVideoLanguage(text) {
        if (!text || text.length < 2) return null;
        const scores = {};
        for (const [code, info] of Object.entries(SCRIPT_RANGES)) { scores[code] = 0; }
        let latinCount = 0;
        const textLen = text.length;
        for (let i = 0; i < textLen; i++) {
            const cp = text.codePointAt(i);
            if (cp > 0xFFFF) { i++; }
            if ((cp >= 0x0041 && cp <= 0x005A) || (cp >= 0x0061 && cp <= 0x007A)) { latinCount++; continue; }
            for (const [code, info] of Object.entries(SCRIPT_RANGES)) {
                for (const [start, end] of info.ranges) {
                    if (cp >= start && cp <= end) { scores[code]++; break; }
                }
            }
        }
        if (latinCount > 0) scores['en'] = latinCount;

        const nonLatinEntries = Object.entries(scores).filter(([k, v]) => k !== 'en' && v >= 3);
        if (nonLatinEntries.length > 0) {
            let best = nonLatinEntries[0];
            for (const entry of nonLatinEntries) {
                if (entry[1] > best[1]) best = entry;
            }
            return best[0];
        }

        if (latinCount >= 3) return 'en';
        return null;
    }

    function getVideoLanguageFromMetadata(videoElement) {
        try {
            const titleEl = videoElement.querySelector('#video-title, h3 a, yt-formatted-string#video-title');
            if (titleEl) {
                const titleLang = titleEl.getAttribute('lang');
                if (titleLang && titleLang !== 'en') return titleLang;
            }
        } catch (e) {}
        return null;
    }

    function shouldBlockByLanguage(videoInfo) {
        if (!CONFIG.languageBlock) return false;
        const preferred = [...(CONFIG.preferredLanguages || [])];
        if (!preferred.length) return false;

        const title = (videoInfo.title || '').trim();
        if (title.length < 2) return false;

        let detected = detectVideoLanguage(title);

        if (!detected && videoInfo.element) {
            detected = getVideoLanguageFromMetadata(videoInfo.element);
        }

        if (!detected) return false;
        return !preferred.includes(detected);
    }

    function rescanAllVideosForLanguage() {
        try {
            const selectors = [
                'ytd-rich-item-renderer',
                'ytd-video-renderer',
                'ytd-grid-video-renderer',
                'ytd-compact-video-renderer',
                'ytd-compact-radio-renderer',
                'yt-lockup-view-model'
            ];
            selectors.forEach(sel => {
                document.querySelectorAll(sel).forEach(el => {
                    if (el.hasAttribute('data-clify-blocked')) return;
                    el.removeAttribute('data-clify-processed');
                    el.removeAttribute('data-clify-removed');
                    el.style.display = '';
                });
            });
            setTimeout(() => {
                const els = getVideoElements();
                for (let i = 0; i < els.length; i++) {
                    processVideoElement(els[i]);
                }
            }, 50);
        } catch (e) {}
    }

    function persistLanguageConfig() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({
                    clify_language_config: {
                        languageBlock: CONFIG.languageBlock,
                        preferredLanguages: CONFIG.preferredLanguages
                    }
                });
            }
        } catch (e) {}
    }

    function persistLanguageConfigSync() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                chrome.storage.sync.get(['clify_config'], (result) => {
                    const cfg = result.clify_config || {};
                    cfg.languageBlock = CONFIG.languageBlock;
                    cfg.preferredLanguages = CONFIG.preferredLanguages;
                    chrome.storage.sync.set({ clify_config: cfg });
                });
            }
        } catch (e) {}
    }

    // =============================================
    // VIDEO PROCESSING
    // =============================================
    function getVideoElements() {
        const selectors = [
            'ytd-rich-item-renderer:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])',
            'ytd-video-renderer:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])',
            'ytd-grid-video-renderer:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])',
            'ytd-compact-video-renderer:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])',
            'ytd-compact-radio-renderer:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])',
            'yt-lockup-view-model:not([data-clify-processed]):not([data-clify-blocked]):not([data-clify-removed])'
        ];
        const elements = [];
        selectors.forEach(selector => {
            try {
                document.querySelectorAll(selector).forEach(el => {
                    if (el && el.isConnected && !isShortsElement(el)) elements.push(el);
                });
            } catch (e) {}
        });
        return elements.filter(el => {
            if (el.tagName === 'YT-LOCKUP-VIEW-MODEL') {
                const parent = el.closest('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer');
                if (parent && elements.includes(parent)) return false;
            }
            return true;
        });
    }

    function isShortsElement(element) {
        return element.querySelector && (
            element.querySelector('a[href*="/shorts/"]') ||
            element.getAttribute('is-shorts') === 'true' ||
            element.classList.contains('shorts')
        );
    }

    function extractVideoInfo(videoElement) {
        try {
            if (isShortsElement(videoElement)) return null;
            
            const selectors = ['a#thumbnail', 'a.ytd-thumbnail', 'ytd-thumbnail a', 'a[href*="/watch?v="]'];
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
                '#video-title', 'h3 a', 'a#video-title-link',
                'yt-formatted-string#video-title', '[id*="title"] a', '[class*="title"] a',
                'span.ytAttributedStringHost',
                'yt-lockup-metadata-view-model span',
                'yt-lockup-metadata-view-model h3'
            ];
            for (const selector of titleSelectors) {
                const titleEl = videoElement.querySelector(selector);
                if (titleEl && titleEl.textContent && titleEl.textContent.trim().length > 5) {
                    title = titleEl.textContent.trim();
                    break;
                }
            }
            
            if (title === 'Unknown Video' || title.length < 3) return null;
            
            const channelInfo = extractChannelInfo(videoElement);
            
            return { id: videoId, title, url: videoLink.href, element: videoElement, isShorts: false, channel: channelInfo };
        } catch (error) {
            return null;
        }
    }

    function createClifyButton(videoInfo) {
        try {
            const existingBtns = videoInfo.element.querySelectorAll('.' + BTN_CLASS);
            existingBtns.forEach(btn => btn.remove());
            
            const isLockup = videoInfo.element && videoInfo.element.tagName === 'YT-LOCKUP-VIEW-MODEL';
            
            const eyeSlashSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
            const xSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
            
            const button = document.createElement('button');
            button.className = BTN_CLASS;
            button.innerHTML = (isLockup ? xSvg : eyeSlashSvg + '<span>HIDE</span>');
            button.setAttribute('data-video-id', videoInfo.id);
            button.setAttribute('data-video-title', videoInfo.title);
            button.setAttribute('title', 'Block this video');
            
            if (videoInfo.element) {
                const computedStyle = window.getComputedStyle(videoInfo.element);
                if (computedStyle.position === 'static') {
                    videoInfo.element.style.position = 'relative';
                }
            }
            
            const fragment = document.createDocumentFragment();
            fragment.appendChild(button);
            return fragment;
        } catch (error) {
            return null;
        }
    }

    function processVideoElement(videoElement) {
        try {
            if (videoElement.hasAttribute('data-clify-processed') || 
                videoElement.hasAttribute('data-clify-blocked') ||
                videoElement.hasAttribute('data-clify-removed')) {
                return;
            }
            
            if (isShortsElement(videoElement)) return;
            
            const videoInfo = extractVideoInfo(videoElement);
            if (!videoInfo) {
                videoElement.setAttribute('data-clify-processed', 'true');
                return;
            }
            
            const scheduleActive = isScheduleActive();
            
            // Check channel block (skip if schedule is active but not in schedule window)
            if (videoInfo.channel && isChannelBlocked(videoInfo.channel)) {
                if (CONFIG.scheduledBlocking && !scheduleActive) {
                    videoElement.setAttribute('data-clify-processed', 'true');
                    return;
                }
                videoElement.style.display = 'none';
                videoElement.setAttribute('data-clify-blocked', 'true');
                videoElement.setAttribute('data-clify-channel-id', videoInfo.channel.id);
                updateStats('channel');
                return;
            }
            
            // Check video block
            if (blockedVideos[videoInfo.id]) {
                if (CONFIG.scheduledBlocking && !scheduleActive) {
                    videoElement.setAttribute('data-clify-processed', 'true');
                    return;
                }
                if (videoElement.parentNode && !videoElement.hasAttribute('data-clify-blocked')) {
                    videoElement.style.display = 'none';
                    videoElement.setAttribute('data-clify-blocked', 'true');
                    setTimeout(() => {
                        if (videoElement.parentNode) videoElement.remove();
                    }, 50);
                }
                return;
            }
            
            // Check keyword block
            if (shouldBlockByKeywords(videoInfo)) {
                if (CONFIG.scheduledBlocking && !scheduleActive) {
                    videoElement.setAttribute('data-clify-processed', 'true');
                    return;
                }
                blockVideo(videoInfo, 'keyword');
                return;
            }
            
            // Check language block
            if (shouldBlockByLanguage(videoInfo)) {
                if (CONFIG.scheduledBlocking && !scheduleActive) {
                    videoElement.setAttribute('data-clify-processed', 'true');
                    return;
                }
                blockVideo(videoInfo, 'language');
                return;
            }
            
            // Apply blur if enabled
            if (CONFIG.blurMode && blockedVideos[videoInfo.id]) {
                applyBlurMode(videoElement);
            }
            
            // Add buttons
            const btnFragment = createClifyButton(videoInfo);
            if (btnFragment) {
                const isLockup = videoElement.tagName === 'YT-LOCKUP-VIEW-MODEL';
                const thumbnailContainer = isLockup
                    ? videoElement.querySelector('yt-thumbnail-view-model')
                    : (videoElement.querySelector('ytd-thumbnail') || videoElement.querySelector('#thumbnail') || videoElement);
                const btnTarget = thumbnailContainer || videoElement;
                btnTarget.style.position = 'relative';
                btnTarget.appendChild(btnFragment);
            }
            if (CONFIG.blockChannelButton && videoInfo.channel) {
                const isSidebar = videoElement.tagName === 'YT-LOCKUP-VIEW-MODEL';
                if (!isSidebar) {
                    const channelNameEl = videoElement.querySelector('ytd-channel-name a, #channel-name a, #owner #channel-name a, #owner-text a');
                    if (channelNameEl) {
                        const existingChBtn = channelNameEl.parentElement.querySelector('.' + BLOCK_CHANNEL_BTN);
                        if (existingChBtn) existingChBtn.remove();
                        const blockChSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:10px;height:10px;flex-shrink:0;"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>';
                        const channelBtn = document.createElement('button');
                        channelBtn.className = BLOCK_CHANNEL_BTN;
                        channelBtn.innerHTML = blockChSvg + '<span>BLOCK</span>';
                        channelBtn.setAttribute('data-channel-id', videoInfo.channel.id);
                        channelBtn.setAttribute('data-channel-name', videoInfo.channel.name);
                        channelBtn.setAttribute('title', 'Block ' + videoInfo.channel.name);
                        channelBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            blockChannel(videoInfo.channel);
                            return false;
                        }, true);
                        channelNameEl.parentElement.appendChild(channelBtn);
                    }
                }
            }
        } catch (error) {
            videoElement.setAttribute('data-clify-processed', 'true');
        }
    }

    function safeProcessPage() {
        checkWatchPageChannelBlock();
        checkChannelPageBlock();
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

    // =============================================
    // KEYWORD TRACKING
    // =============================================
    function getMatchingKeywords(videoInfo) {
        if (!keywords || keywords.length === 0) return [];
        const title = videoInfo.title.toLowerCase();
        const matching = [];
        for (const keyword of keywords) {
            if (!keyword || typeof keyword !== 'string') continue;
            const clean = keyword.trim().toLowerCase();
            if (clean && title.includes(clean)) matching.push(keyword.trim());
        }
        return matching;
    }

    function shouldBlockByKeywords(videoInfo) {
        return getMatchingKeywords(videoInfo).length > 0;
    }

    // =============================================
    // BLOCK / UNBLOCK
    // =============================================
    function blockVideo(videoInfo, reason) {
        try {
            const matchingKeywords = reason === 'keyword' ? getMatchingKeywords(videoInfo) : [];
            
            blockedVideos[videoInfo.id] = {
                id: videoInfo.id,
                title: videoInfo.title,
                url: videoInfo.url,
                channel: videoInfo.channel || null,
                reason,
                ts: Date.now(),
                timestamp: new Date().toLocaleString(),
                isShorts: videoInfo.isShorts || false,
                matchingKeywords,
                keywordCount: matchingKeywords.length
            };
            
            updateStats(reason);
            saveToLocalStorage();
            
            let el = videoInfo.element;
            if (!el || !el.parentNode) {
                el = document.querySelector(`[data-video-id="${videoInfo.id}"]`)?.closest('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model');
            }
            if (!el) {
                const allRenderers = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model');
                for (const r of allRenderers) {
                    const link = r.querySelector(`a[href*="v=${videoInfo.id}"]`);
                    if (link) { el = r; break; }
                }
            }
            
            if (el && el.parentNode) {
                el.style.display = 'none';
                el.setAttribute('data-clify-blocked', 'true');
                setTimeout(() => {
                    if (el.parentNode) el.remove();
                }, 100);
            }
            
            safeHideBlockedVideos();
            
            // Show undo toast
            const toastTitle = reason === 'keyword' ? 'Keyword Block' : reason === 'language' ? 'Language Block' : 'Video Hidden';
            const toastSub = videoInfo.title.length > 40 ? videoInfo.title.substring(0, 40) + '...' : videoInfo.title;
            lastBlockedId = videoInfo.id;
            
            if (undoTimer) clearTimeout(undoTimer);
            
            showToast(toastTitle, toastSub, 6000, () => {
                unblockVideo(videoInfo.id);
            });
            
            return true;
        } catch (error) {
            return false;
        }
    }

    function unblockVideo(videoId) {
        if (blockedVideos[videoId]) {
            delete blockedVideos[videoId];
            saveToLocalStorage();
            showToast('Video Unblocked', 'The video will now appear in your feed');
            setTimeout(() => location.reload(), 300);
        }
    }

    function safeHideBlockedVideos() {
        try {
            for (const videoId in blockedVideos) {
                if (!blockedVideos.hasOwnProperty(videoId)) continue;
                const elements = document.querySelectorAll(`a[href*="${videoId}"]`);
                for (let i = 0; i < elements.length; i++) {
                    const link = elements[i];
                    const videoElement = link.closest([
                        'ytd-rich-item-renderer', 'ytd-video-renderer',
                        'ytd-grid-video-renderer', 'ytd-compact-video-renderer',
                        'ytd-compact-radio-renderer', 'yt-lockup-view-model'
                    ].join(','));
                    
                    if (videoElement && videoElement.parentNode && !videoElement.hasAttribute('data-clify-blocked')) {
                        videoElement.style.display = 'none';
                        videoElement.setAttribute('data-clify-blocked', 'true');
                        setTimeout(() => {
                            if (videoElement.parentNode) videoElement.remove();
                        }, 50);
                    }
                }
            }
        } catch (error) {}
    }

    // =============================================
    // EVENT HANDLERS
    // =============================================
    function setupGlobalInterceptor() {
        document.addEventListener('click', handleGlobalClick, true);
    }

    function handleGlobalClick(event) {
        try {
            const btn = event.target.closest('.' + BTN_CLASS);
            if (btn) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                const videoId = btn.getAttribute('data-video-id');
                const videoTitle = btn.getAttribute('data-video-title') || 'Video';
                if (videoId) {
                    let element = btn.closest([
                        'ytd-rich-item-renderer', 'ytd-video-renderer',
                        'ytd-grid-video-renderer', 'ytd-compact-video-renderer',
                        'ytd-compact-radio-renderer', 'yt-lockup-view-model'
                    ].join(','));
                    if (!element) element = btn.parentElement;
                    blockVideo({ id: videoId, title: videoTitle, element, url: `https://www.youtube.com/watch?v=${videoId}` }, 'manual');
                }
                return false;
            }
            
            const channelBtn = event.target.closest('.' + BLOCK_CHANNEL_BTN);
            if (channelBtn) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
                const channelId = channelBtn.getAttribute('data-channel-id');
                const channelName = channelBtn.getAttribute('data-channel-name');
                if (channelId) {
                    blockChannel({ id: channelId, name: channelName, url: '' });
                }
                return false;
            }
        } catch (error) {}
    }

    function setupGlobalBlockObserver() {
        if (globalObserver) globalObserver.disconnect();
        globalObserver = new MutationObserver(function(mutations) {
            let shouldCheck = false;
            let shouldRemoveShorts = false;
            let shouldRemoveAds = false;
            let shouldCheckWatch = false;
            let shouldCheckChannel = false;
            for (let mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.querySelector && node.querySelector('a[href*="/watch?v="]')) shouldCheck = true;
                            if (node.tagName === 'YTD-WATCH-FLEXY' || (node.querySelector && node.querySelector('ytd-watch-flexy'))) shouldCheckWatch = true;
                            if (node.tagName === 'YTD-C-CHANNEL-HEADER' || node.tagName === 'YTD-CHANNEL-METADATA-RENDERER' || node.tagName === 'YTD-CHANNEL-HEADER' || (node.querySelector && (node.querySelector('#channel-header') || node.querySelector('ytd-c-channel-header-renderer') || node.querySelector('#channel-header-container')))) shouldCheckChannel = true;
                            if (node.querySelector && (
                                node.querySelector('a[href*="/shorts/"]') ||
                                node.querySelector('[is-shorts]') ||
                                node.textContent.includes('Shorts')
                            )) shouldRemoveShorts = true;
                            if (node.querySelector && node.querySelector('ytd-ad-slot-renderer, ytd-display-ad-renderer, ytd-promoted-sparkles-web-renderer, ytd-mealbar-promo-renderer, ytd-ad-break-renderer, .ytp-ad-overlay-container')) {
                                shouldRemoveAds = true;
                            }
                        }
                    }
                }
                if (shouldCheck || shouldRemoveShorts || shouldRemoveAds || shouldCheckWatch || shouldCheckChannel) break;
            }
            if (shouldCheckWatch) setTimeout(checkWatchPageChannelBlock, 300);
            if (shouldCheckChannel) setTimeout(checkChannelPageBlock, 300);
            if (shouldCheckWatch) setTimeout(addMonetizationBadge, 1000);
            if (shouldCheck) setTimeout(() => { safeProcessPage(); safeHideBlockedVideos(); }, 500);
            if (shouldRemoveShorts) setTimeout(removeAllShorts, 100);
            if (shouldRemoveAds) setTimeout(removeYouTubeAds, 0);
        });
        globalObserver.observe(document.body, { childList: true, subtree: true });
    }


    // =============================================
    // FEATURE 13: WATCH LATER QUEUE
    // =============================================
    function loadWatchLaterQueue() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.get(['clify_watch_later'], (result) => {
                    if (result.clify_watch_later && Array.isArray(result.clify_watch_later)) {
                        watchLaterQueue = result.clify_watch_later;
                    }
                });
            }
        } catch (e) {}
    }

    function saveWatchLaterQueue() {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ clify_watch_later: watchLaterQueue });
            }
        } catch (e) {}
    }

    function addVideoToQueue(videoData) {
        if (!videoData || !videoData.id) return;
        if (watchLaterQueue.some(v => v.id === videoData.id)) {
            showToast('Watch Later', 'Already in queue', 3000);
            return;
        }
        watchLaterQueue.push({
            id: videoData.id,
            title: videoData.title || 'Untitled',
            url: videoData.url || '',
            channel: videoData.channel || '',
            addedAt: videoData.addedAt || Date.now()
        });
        saveWatchLaterQueue();
        showToast('Watch Later', 'Added to queue', 3000);
    }

    function removeFromQueue(videoId) {
        const idx = watchLaterQueue.findIndex(v => v.id === videoId);
        if (idx !== -1) {
            watchLaterQueue.splice(idx, 1);
            saveWatchLaterQueue();
            showToast('Watch Later', 'Removed from queue', 3000);
        }
    }

    function injectWatchLaterButtons() {
        if (!CONFIG.watchLater) {
            document.querySelectorAll('.clify-watch-later-btn').forEach(b => b.remove());
            return;
        }
        const isWatchPage = location.href.includes('/watch');
        if (isWatchPage) {
            const aboveFold = document.querySelector('#above-the-fold');
            if (aboveFold && !aboveFold.querySelector('.clify-watch-later-btn')) {
                const url = location.href;
                const id = new URL(url).searchParams.get('v');
                if (!id) return;
                const title = document.querySelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata yt-formatted-string')?.textContent || document.title;
                const channel = document.querySelector('#channel-name a, ytd-channel-name a')?.textContent || '';
                const btn = document.createElement('button');
                btn.className = 'clify-watch-later-btn';
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b4f542" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 7v5l3 3"/></svg>';
                btn.title = 'Add to Watch Later';
                btn.style.cssText = 'background:none;border:none;cursor:pointer;padding:4px 8px;display:inline-flex;align-items:center;border-radius:4px;vertical-align:middle;';
                btn.addEventListener('mouseenter', () => btn.style.backgroundColor = 'rgba(180,245,66,0.15)');
                btn.addEventListener('mouseleave', () => btn.style.backgroundColor = 'transparent');
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addVideoToQueue({ id, title, url, channel, addedAt: Date.now() });
                });
                aboveFold.appendChild(btn);
            }
        } else {
            const renderers = document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer');
            renderers.forEach(r => {
                if (r.querySelector('.clify-watch-later-btn')) return;
                const link = r.querySelector('a#video-title-link, a#video-title, a[href*="/watch"]');
                if (!link) return;
                const href = link.href || link.getAttribute('href') || '';
                const match = href.match(/[?&]v=([^&]+)/);
                if (!match) return;
                const id = match[1];
                const title = r.querySelector('#video-title')?.textContent?.trim() || 'Untitled';
                const channel = r.querySelector('#channel-name a, .ytd-channel-name a')?.textContent?.trim() || '';
                const thumb = r.querySelector('#thumbnail, ytd-thumbnail');
                if (!thumb) return;
                const btn = document.createElement('button');
                btn.className = 'clify-watch-later-btn';
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b4f542" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 7v5l3 3"/></svg>';
                btn.title = 'Add to Watch Later';
                btn.style.cssText = 'position:absolute;top:4px;right:4px;background:rgba(0,0,0,0.75);border:none;cursor:pointer;padding:4px;border-radius:4px;z-index:10;';
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addVideoToQueue({ id, title, url: 'https://www.youtube.com/watch?v=' + id, channel, addedAt: Date.now() });
                });
                const container = thumb.style.position ? thumb : thumb.parentElement;
                if (container) {
                    container.style.position = 'relative';
                    container.appendChild(btn);
                }
            });
        }
    }

    // =============================================
    // FEATURE 14: READING MODE
    // =============================================
    function applyReadingMode() {
        const existing = document.getElementById('clify-reading-mode-css');
        if (existing) existing.remove();
        if (!CONFIG.readingMode) return;
        const style = document.createElement('style');
        style.id = 'clify-reading-mode-css';
        style.textContent = `
            #comments, ytd-comments { display: none !important; }
            #secondary { display: none !important; }
            ytd-watch-next-tabbed-results-renderer { display: none !important; }
            #related { display: none !important; }
            ytd-shelf-renderer { display: none !important; }
            .ytp-ce-element { display: none !important; }
            ytd-item-section-renderer:not(:first-child) { display: none !important; }
            ytd-rich-shelf-renderer[is-shorts] { display: none !important; }
            #chat { display: none !important; }
            #columns { max-width: 100% !important; }
            #primary { max-width: 100% !important; }
            #player-wide-container { max-width: 100% !important; margin: 0 auto !important; }
        `;
        document.head.appendChild(style);
    }

    // =============================================
    // FEATURE 15: CONFIGURABLE KEYBOARD SHORTCUTS
    // =============================================
    let configurableShortcutHandler = null;
    function setupConfigurableShortcuts() {
        if (configurableShortcutHandler) {
            document.removeEventListener('keydown', configurableShortcutHandler, true);
            configurableShortcutHandler = null;
        }
        if (!CONFIG.keyboardShortcuts) return;
        configurableShortcutHandler = function(e) {
            if (!CONFIG.keyboardShortcuts) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
            const bindings = CONFIG.shortcutBindings;
            const key = [
                e.altKey ? 'alt' : '',
                e.ctrlKey ? 'ctrl' : '',
                e.shiftKey ? 'shift' : '',
                e.key.toLowerCase()
            ].filter(Boolean).join('+');
            for (const [action, combo] of Object.entries(bindings)) {
                if (key === combo) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleShortcutAction(action);
                    return;
                }
            }
        };
        document.addEventListener('keydown', configurableShortcutHandler, true);
    }

    function handleShortcutAction(action) {
        switch (action) {
            case 'blockVideo': {
                const vid = document.querySelector('video');
                if (!vid) return;
                const title = document.querySelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata yt-formatted-string')?.textContent || document.title;
                const url = location.href;
                const id = new URL(url).searchParams.get('v');
                if (id) {
                    blockVideo({ id, title, url, channel: null, element: vid.closest('ytd-watch-flexy') || vid.parentElement }, 'manual');
                }
                break;
            }
            case 'focusMode':
                CONFIG.focusMode = !CONFIG.focusMode;
                applyFocusMode();
                saveToLocalStorage();
                showToast('Focus Mode', CONFIG.focusMode ? 'ON' : 'OFF', 2000);
                break;
            case 'pip': {
                const video = document.querySelector('video');
                if (!video) return;
                if (document.pictureInPictureElement) {
                    document.exitPictureInPicture();
                } else {
                    video.requestPictureInPicture().catch(() => {});
                }
                break;
            }
            case 'muteTab': {
                const v = document.querySelector('video');
                if (v) { v.muted = !v.muted; showToast('Mute', v.muted ? 'Tab muted' : 'Tab unmuted', 2000); }
                break;
            }
            case 'readingMode':
                CONFIG.readingMode = !CONFIG.readingMode;
                applyReadingMode();
                saveToLocalStorage();
                showToast('Reading Mode', CONFIG.readingMode ? 'ON' : 'OFF', 2000);
                break;
            case 'watchLater': {
                const url = location.href;
                const id = new URL(url).searchParams.get('v');
                if (id) {
                    const title = document.querySelector('h1.ytd-video-primary-info-renderer, h1.ytd-watch-metadata yt-formatted-string')?.textContent || document.title;
                    const channel = document.querySelector('#channel-name a, ytd-channel-name a')?.textContent || '';
                    addVideoToQueue({ id, title, url, channel, addedAt: Date.now() });
                }
                break;
            }
            case 'elementPicker':
                toggleElementPicker();
                break;
            case 'toggleAds':
                CONFIG.adBlocker = !CONFIG.adBlocker;
                saveToLocalStorage();
                showToast('Ad Blocker', CONFIG.adBlocker ? 'ON' : 'OFF', 2000);
                break;
            case 'toggleShorts':
                CONFIG.removeShorts = !CONFIG.removeShorts;
                if (CONFIG.removeShorts) removeAllShorts();
                saveToLocalStorage();
                showToast('Shorts Remover', CONFIG.removeShorts ? 'ON' : 'OFF', 2000);
                break;
        }
    }

    // =============================================
    // FEATURE 16: USAGE STATS & HISTORY
    // =============================================
    let usageTimer = null;
    let usageTimeCounter = 0;

    function trackUsage() {
        if (usageTimer) clearInterval(usageTimer);
        usageTimer = setInterval(() => {
            if (document.hidden) return;
            usageTimeCounter += 30;
            flushUsageStats();
        }, 30000);
        document.addEventListener('visibilitychange', () => {
            flushUsageStats();
        });
        window.addEventListener('beforeunload', () => {
            flushUsageStats();
        });
    }

    function flushUsageStats() {
        try {
            if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) return;
            chrome.storage.local.get(['clify_usage_stats'], (result) => {
                const stats = result.clify_usage_stats || {};
                const today = new Date().toISOString().split('T')[0];
                if (!stats[today]) stats[today] = {};
                const s = stats[today];
                s.timeOnYoutube = (s.timeOnYoutube || 0) + (usageTimeCounter * 1000);
                s.adsBlocked = (s.adsBlocked || 0) + (usageSession.adsBlocked || 0);
                s.shortsBlocked = (s.shortsBlocked || 0) + (usageSession.shortsBlocked || 0);
                s.sponsorsSkipped = (s.sponsorsSkipped || 0) + (usageSession.sponsorsSkipped || 0);
                s.timeSaved = (s.timeSaved || 0) + (usageSession.timeSaved || 0);
                s.videosWatched = (s.videosWatched || 0) + (usageSession.videosWatched || 0);
                chrome.storage.local.set({ clify_usage_stats: stats });
                usageTimeCounter = 0;
                usageSession.adsBlocked = 0;
                usageSession.shortsBlocked = 0;
                usageSession.sponsorsSkipped = 0;
                usageSession.timeSaved = 0;
                usageSession.videosWatched = 0;
            });
        } catch (e) {}
    }

    function recordVideoWatch() {
        usageSession.videosWatched++;
        flushUsageStats();
        try {
            const vid = document.querySelector('video');
            if (vid && vid.duration && isFinite(vid.duration)) {
                usageSession.timeWatched = (usageSession.timeWatched || 0) + vid.duration;
            }
        } catch (e) {}
    }

    function getUsageStats() {
        return new Promise((resolve) => {
            try {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                    chrome.storage.local.get(['clify_usage_stats'], (result) => {
                        resolve(result.clify_usage_stats || { daily: {}, totalTime: 0, videosWatched: 0 });
                    });
                } else {
                    resolve({ daily: {}, totalTime: 0, videosWatched: 0 });
                }
            } catch (e) {
                resolve({ daily: {}, totalTime: 0, videosWatched: 0 });
            }
        });
    }

    // =============================================
    // FEATURE 17: ELEMENT PICKER
    // =============================================
    let elementPickerOverlay = null;
    let elementPickerTooltip = null;
    let pickerMouseMoveHandler = null;
    let pickerClickHandler = null;
    let pickerKeyHandler = null;

    function toggleElementPicker() {
        if (CONFIG.elementPicker) {
            stopElementPicker();
        } else {
            CONFIG.elementPicker = true;
            startElementPicker();
        }
        showToast('Element Picker', CONFIG.elementPicker ? 'ON — click an element to block' : 'OFF', 2000);
    }

    function startElementPicker() {
        elementPickerOverlay = document.createElement('div');
        elementPickerOverlay.className = 'clify-picker-overlay';
        elementPickerOverlay.style.cssText = 'position:fixed;inset:0;z-index:999999;cursor:crosshair;background:transparent;';
        document.body.appendChild(elementPickerOverlay);

        elementPickerTooltip = document.createElement('div');
        elementPickerTooltip.className = 'clify-picker-tooltip';
        elementPickerTooltip.style.cssText = 'position:fixed;z-index:1000000;background:#1a1a1a;color:#b4f542;padding:6px 10px;border-radius:6px;font-size:12px;font-family:monospace;pointer-events:none;display:none;max-width:400px;word-break:break-all;border:1px solid #b4f542;';
        document.body.appendChild(elementPickerTooltip);

        let highlightedEl = null;

        pickerMouseMoveHandler = function(e) {
            if (highlightedEl) {
                highlightedEl.style.outline = '';
                highlightedEl.style.outlineOffset = '';
                highlightedEl.style.backgroundColor = '';
            }
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target !== elementPickerOverlay && target !== elementPickerTooltip) {
                highlightedEl = target;
                highlightedEl.style.outline = '2px dashed #ff4444';
                highlightedEl.style.outlineOffset = '2px';
                highlightedEl.style.backgroundColor = 'rgba(255,68,68,0.1)';
                const sel = buildSelector(target);
                elementPickerTooltip.textContent = sel;
                elementPickerTooltip.style.display = 'block';
                elementPickerTooltip.style.left = (e.clientX + 15) + 'px';
                elementPickerTooltip.style.top = (e.clientY + 15) + 'px';
            }
        };

        pickerClickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target !== elementPickerOverlay && target !== elementPickerTooltip) {
                const sel = buildSelector(target);
                if (sel && !CONFIG.customBlockedSelectors.includes(sel)) {
                    CONFIG.customBlockedSelectors.push(sel);
                    applyCustomBlockedSelectors();
                    saveToLocalStorage();
                }
                showToast('Element Picker', 'Element blocked: ' + sel, 3000);
            }
            stopElementPicker();
        };

        pickerKeyHandler = function(e) {
            if (e.key === 'Escape') {
                stopElementPicker();
                showToast('Element Picker', 'Cancelled', 2000);
            }
        };

        elementPickerOverlay.addEventListener('mousemove', pickerMouseMoveHandler, true);
        elementPickerOverlay.addEventListener('click', pickerClickHandler, true);
        document.addEventListener('keydown', pickerKeyHandler, true);
    }

    function stopElementPicker() {
        CONFIG.elementPicker = false;
        if (elementPickerOverlay) { elementPickerOverlay.remove(); elementPickerOverlay = null; }
        if (elementPickerTooltip) { elementPickerTooltip.remove(); elementPickerTooltip = null; }
        if (pickerMouseMoveHandler) { document.removeEventListener('mousemove', pickerMouseMoveHandler, true); pickerMouseMoveHandler = null; }
        if (pickerClickHandler) { document.removeEventListener('click', pickerClickHandler, true); pickerClickHandler = null; }
        if (pickerKeyHandler) { document.removeEventListener('keydown', pickerKeyHandler, true); pickerKeyHandler = null; }
        document.querySelectorAll('[style*="outline: 2px dashed rgb(255, 68, 68)"]').forEach(el => {
            el.style.outline = '';
            el.style.outlineOffset = '';
            el.style.backgroundColor = '';
        });
    }

    function buildSelector(el) {
        if (el.id) return '#' + el.id;
        if (el.classList && el.classList.length > 0) {
            return el.tagName.toLowerCase() + '.' + Array.from(el.classList).join('.');
        }
        const parts = [];
        let current = el;
        while (current && current !== document.body) {
            let selector = current.tagName.toLowerCase();
            if (current.id) { parts.unshift('#' + current.id); break; }
            const parent = current.parentElement;
            if (parent) {
                const siblings = Array.from(parent.children).filter(c => c.tagName === current.tagName);
                if (siblings.length > 1) {
                    const idx = siblings.indexOf(current) + 1;
                    selector += ':nth-of-type(' + idx + ')';
                }
            }
            parts.unshift(selector);
            current = current.parentElement;
        }
        return parts.join(' > ');
    }

    function applyCustomBlockedSelectors() {
        let style = document.getElementById('clify-custom-blocks');
        if (!style) {
            style = document.createElement('style');
            style.id = 'clify-custom-blocks';
            document.head.appendChild(style);
        }
        if (CONFIG.customBlockedSelectors.length === 0) {
            style.remove();
            return;
        }
        const rules = CONFIG.customBlockedSelectors.map(sel => sel + ' { display: none !important; }').join('\n');
        style.textContent = rules;
    }


    // =============================================
    // MESSAGE HANDLING
    // =============================================
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        try {
            switch (request.type) {
                case "getBlockedVideos":
                    sendResponse({ blockedVideosMap: blockedVideos, success: true });
                    break;
                case "getBlockedChannels":
                    sendResponse({ blockedChannels: blockedChannels, success: true });
                    break;
                case "getWhitelistedChannels":
                    sendResponse({ whitelistedChannels: whitelistedChannels, success: true });
                    break;
                case "blockChannel":
                    if (request.channelData) {
                        blockChannel(request.channelData);
                        sendResponse({ success: true });
                    } else if (request.name) {
                        blockChannel({ id: request.name, name: request.name, url: request.url || '' });
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false, error: 'No channel data' });
                    }
                    break;
                case "unblockChannel":
                    if (request.channelId) {
                        unblockChannel(request.channelId);
                        sendResponse({ success: true });
                    } else if (request.name) {
                        unblockChannel(request.name);
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false, error: 'No channel ID' });
                    }
                    break;
                case "whitelistChannel":
                    if (request.channelData) {
                        whitelistedChannels[request.channelData.id] = request.channelData;
                        saveToLocalStorage();
                        sendResponse({ success: true });
                    } else if (request.name) {
                        whitelistedChannels[request.name] = { id: request.name, name: request.name, url: request.url || '', ts: Date.now() };
                        saveToLocalStorage();
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false });
                    }
                    break;
                case "unwhitelistChannel":
                    if (request.name) {
                        delete whitelistedChannels[request.name];
                        saveToLocalStorage();
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false });
                    }
                    break;
                case "getKeywords":
                    sendResponse({ keywords: keywords, success: true });
                    break;
                case "getStats":
                    const today = new Date().toISOString().slice(0, 10);
                    const videoArray = Object.values(blockedVideos);
                    const currentSbSkips = sponsorStats.segmentsSkipped || 0;
                    const currentSbTime = sponsorStats.timeSaved || 0;
                    try {
                        chrome.storage.local.get(['clify_data'], r => {
                            const sbStored = r.clify_data || {};
                            const storedSbSkips = sbStored.stats?.sponsorBlockSkips || 0;
                            const storedSbTime = sbStored.stats?.sponsorBlockTimeSaved || 0;
                            const finalSkips = Math.max(currentSbSkips, storedSbSkips);
                            const finalTime = Math.max(currentSbTime, storedSbTime);
                            if (!sbStored.stats) sbStored.stats = {};
                            sbStored.stats.sponsorBlockSkips = finalSkips;
                            sbStored.stats.sponsorBlockTimeSaved = finalTime;
                            chrome.storage.local.set({ clify_data: sbStored });
                            sendResponse({
                                totalBlocks: videoArray.length,
                                todayBlocks: videoArray.filter(v => new Date(v.ts).toISOString().slice(0, 10) === today).length,
                                manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                                keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                                shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                                languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                                channelBlocks: Object.keys(blockedChannels).length,
                                activeKeywords: keywords.length,
                                sponsorBlockSkips: finalSkips,
                                sponsorBlockTimeSaved: finalTime,
                                dailyActivity: ClifyStats.dailyActivity || {},
                                success: true
                            });
                        });
                    } catch(e) {
                        sendResponse({
                            totalBlocks: videoArray.length,
                            todayBlocks: videoArray.filter(v => new Date(v.ts).toISOString().slice(0, 10) === today).length,
                            manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                            keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                            shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                            languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                            channelBlocks: Object.keys(blockedChannels).length,
                            activeKeywords: keywords.length,
                            sponsorBlockSkips: currentSbSkips,
                            sponsorBlockTimeSaved: currentSbTime,
                            dailyActivity: ClifyStats.dailyActivity || {},
                            success: true
                        });
                    }
                    return true;
                case "saveKeywords":
                    keywords = request.keywords || [];
                    if (keywords.length > 5000) keywords = keywords.slice(0, 5000);
                    saveToLocalStorage();
                    setTimeout(safeProcessPage, 100);
                    sendResponse({ success: true });
                    break;
                case "unblockVideo":
                    delete blockedVideos[request.videoId];
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "clearAllVideos":
                    blockedVideos = {};
                    ClifyStats = { dailyActivity: {}, totalBlocks: 0, shortsBlocks: 0, manualBlocks: 0, keywordBlocks: 0, channelBlocks: 0 };
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "clearAllChannels":
                    blockedChannels = {};
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "refreshStats":
                    sendResponse({ success: true });
                    break;
                case "toggleShortsRemoval":
                    CONFIG.removeShorts = request.enabled !== false;
                    if (CONFIG.removeShorts) removeAllShorts();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleBlurMode":
                    CONFIG.blurMode = request.enabled === true;
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleFocusMode":
                    CONFIG.focusMode = request.enabled === true;
                    applyFocusMode();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleHideTrending":
                    CONFIG.hideTrending = request.enabled === true;
                    applyHideTrending();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleAutoConfirmPause":
                    CONFIG.autoConfirmPause = request.enabled === true;
                    applyAutoConfirmPause();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "setVolumeBoost":
                    CONFIG.volumeBoost = parseInt(request.value) || 100;
                    applyVolumeBoost();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "togglePipButton":
                    CONFIG.pipButton = request.enabled === true;
                    if (CONFIG.pipButton) addPipButton();
                    else { const b = document.querySelector('.clify-pip-btn'); if (b) b.remove(); }
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleKeyboardShortcuts":
                    CONFIG.keyboardShortcuts = request.enabled === true;
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleSkipSponsors":
                    CONFIG.skipSponsors = request.enabled === true;
                    applySkipSponsors();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleContentDensity":
                    CONFIG.contentDensity = request.enabled === true;
                    if (!CONFIG.contentDensity) removeDensityBadge();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleHideComments":
                    CONFIG.hideComments = request.enabled === true;
                    applyHideComments();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleLiveStreamCleaner":
                    CONFIG.liveStreamCleaner = request.enabled === true;
                    if (request.config) {
                        if ('lcHideChat' in request.config) CONFIG.lcHideChat = request.config.lcHideChat;
                        if ('lcHideSuperChat' in request.config) CONFIG.lcHideSuperChat = request.config.lcHideSuperChat;
                        if ('lcHideMembers' in request.config) CONFIG.lcHideMembers = request.config.lcHideMembers;
                        if ('lcHideTicker' in request.config) CONFIG.lcHideTicker = request.config.lcHideTicker;
                    }
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleAgeGateBypass":
                    CONFIG.ageGateBypass = request.enabled === true;
                    saveToLocalStorage();
                    if (CONFIG.ageGateBypass) bypassAgeGate();
                    sendResponse({ success: true });
                    break;
                case "toggleAudioEqualizer":
                    CONFIG.audioEqualizer = request.enabled === true;
                    saveToLocalStorage();
                    if (CONFIG.audioEqualizer) {
                        initAudioEqualizer();
                    } else {
                        destroyAudioEqualizer();
                    }
                    sendResponse({ success: true });
                    break;
                case "setEqBand":
                    if (typeof request.band === 'number' && typeof request.gain === 'number') {
                        setEqBand(request.band, request.gain);
                    }
                    sendResponse({ success: true });
                    break;
                case "applyEqPreset":
                    if (request.preset) applyEqPreset(request.preset);
                    sendResponse({ success: true });
                    break;
                case "toggleLanguageBlock":
                    CONFIG.languageBlock = request.enabled === true;
                    if (Array.isArray(request.preferredLanguages)) {
                        CONFIG.preferredLanguages = request.preferredLanguages;
                    }
                    saveToLocalStorage();
                    persistLanguageConfig();
                    persistLanguageConfigSync();
                    rescanAllVideosForLanguage();
                    sendResponse({ success: true });
                    break;
                case "setPreferredLanguages":
                    CONFIG.preferredLanguages = request.languages || [];
                    CONFIG.languageBlock = request.languageBlock !== false;
                    saveToLocalStorage();
                    persistLanguageConfig();
                    persistLanguageConfigSync();
                    rescanAllVideosForLanguage();
                    sendResponse({ success: true });
                    break;
                case "setForceQuality":
                    CONFIG.forceQuality = request.enabled === true;
                    CONFIG.preferredQuality = request.quality || '1080';
                    applyForceQuality();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "saveEnhancedConfig":
                    if (request.config) {
                        Object.assign(CONFIG, request.config);
                        saveToLocalStorage();
                        if ('focusMode' in request.config) applyFocusMode();
                        if ('hideTrending' in request.config) applyHideTrending();
                        if ('autoConfirmPause' in request.config) applyAutoConfirmPause();
                        if ('volumeBoost' in request.config) applyVolumeBoost();
                        if ('pipButton' in request.config) { if (CONFIG.pipButton) addPipButton(); else { const b = document.querySelector('.clify-pip-btn'); if (b) b.remove(); } }
                        if ('keyboardShortcuts' in request.config) applyKeyboardShortcuts();
                        if ('skipSponsors' in request.config) {
                            applySkipSponsors();
                            if (CONFIG.skipSponsors && lastSponsorVideoId) {
                                const video = document.querySelector('video');
                                if (video) {
                                    renderSponsorOverlay(lastSponsorVideoId, video);
                                    attachSponsorListener(video, lastSponsorVideoId);
                                }
                            } else if (!CONFIG.skipSponsors) {
                                removeSponsorOverlays();
                            }
                        }
                        if ('sponsorCategories' in request.config || 'sponsorShowOverlay' in request.config) {
                            if (lastSponsorVideoId) {
                                const video = document.querySelector('video');
                                if (video) {
                                    renderSponsorOverlay(lastSponsorVideoId, video);
                                    if (CONFIG.skipSponsors) attachSponsorListener(video, lastSponsorVideoId);
                                }
                            }
                        }
                        if ('hideComments' in request.config) applyHideComments();
                        if ('forceQuality' in request.config || 'preferredQuality' in request.config) applyForceQuality();
                        if ('languageBlock' in request.config || 'preferredLanguages' in request.config) {
                            persistLanguageConfig();
                            persistLanguageConfigSync();
                            setTimeout(() => rescanAllVideosForLanguage(), 100);
                        }
                        if ('adBlocker' in request.config) {
                            if (CONFIG.adBlocker) {
                                interceptAdRequests();
                                injectAdBlockerCSS();
                                injectScriptlets();
                                startAdBlockerObserver();
                                setupMidRollAdDetection();
                            } else {
                                stopAdBlockerObserver();
                                stopMidRollAdDetection();
                                removeAdBlockerCSS();
                            }
                        }
                        if ('contentDensity' in request.config) {
                            if (!CONFIG.contentDensity) removeDensityBadge();
                        }
                    }
                    sendResponse({ success: true });
                    break;
                case "getConfig":
                    sendResponse({ config: CONFIG, success: true });
                    break;
                case "toggleAdBlocker":
                    CONFIG.adBlocker = request.enabled !== false;
                    if (CONFIG.adBlocker) {
                        interceptAdRequests();
                        injectAdBlockerCSS();
                        injectScriptlets();
                        removeYouTubeAds();
                        if (!adBlockerInterval) adBlockerInterval = setInterval(removeYouTubeAds, 600);
                        startAdBlockerObserver();
                        setupMidRollAdDetection();
                    } else {
                        if (adBlockerInterval) { clearInterval(adBlockerInterval); adBlockerInterval = null; }
                        stopAdBlockerObserver();
                        stopMidRollAdDetection();
                        removeAdBlockerCSS();
                        interceptActive = false;
                    }
                    saveToLocalStorage();
                    sendResponse({ success: true, enabled: CONFIG.adBlocker });
                    break;
                case "getAdBlockerStats":
                    sendResponse({ adsBlockedCount, success: true });
                    break;
                case "getAdBlockerStatus":
                    chrome.storage.local.get(['adBlockerConfig', 'clify_data'], (result) => {
                        const clifyData = result.clify_data || {};
                        const st = clifyData.stats || {};
                        try {
                            sendResponse({
                                config: result.adBlockerConfig || {},
                                stats: { totalBlocked: st.adsBlocked || 0, bannersRemoved: st.bannersRemoved || 0, skipped: st.skipped || 0 },
                                ruleCount: 0,
                                success: true
                            });
                        } catch(e) {}
                    });
                    return true;
                case "getExportData":
                    sendResponse({
                        blockedVideos, blockedChannels, whitelistedChannels,
                        keywords, stats: ClifyStats, config: CONFIG,
                        version: VERSION, exportDate: new Date().toISOString(),
                        success: true
                    });
                    break;
                case "importData":
                    try {
                        if (request.data) {
                            if (request.data.blockedVideos) Object.assign(blockedVideos, request.data.blockedVideos);
                            if (request.data.blockedChannels) Object.assign(blockedChannels, request.data.blockedChannels);
                            if (request.data.keywords) keywords = request.data.keywords;
                            if (request.data.config) Object.assign(CONFIG, request.data.config);
                            saveToLocalStorage();
                            sendResponse({ success: true });
                        } else {
                            sendResponse({ success: false, error: 'No data' });
                        }
                    } catch (e) {
                        sendResponse({ success: false, error: e.message });
                    }
                    break;
                case "getWatchLaterQueue":
                    sendResponse({ queue: watchLaterQueue, success: true });
                    break;
                case "removeFromWatchLater":
                    if (request.videoId) {
                        removeFromQueue(request.videoId);
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false, error: 'No video ID' });
                    }
                    break;
                case "playWatchLater":
                    if (watchLaterQueue.length > 0) {
                        location.href = watchLaterQueue[0].url;
                        sendResponse({ success: true });
                    } else {
                        sendResponse({ success: false, error: 'Queue empty' });
                    }
                    break;
                case "clearWatchLater":
                    watchLaterQueue = [];
                    saveWatchLaterQueue();
                    sendResponse({ success: true });
                    break;
                case "toggleWatchLater":
                    CONFIG.watchLater = request.enabled !== false;
                    if (CONFIG.watchLater) injectWatchLaterButtons();
                    else document.querySelectorAll('.clify-watch-later-btn').forEach(b => b.remove());
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "toggleReadingMode":
                    CONFIG.readingMode = request.enabled === true;
                    applyReadingMode();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                case "updateShortcutBindings":
                    if (request.bindings) {
                        CONFIG.shortcutBindings = request.bindings;
                        setupConfigurableShortcuts();
                        saveToLocalStorage();
                    }
                    sendResponse({ success: true });
                    break;
                case "getShortcutBindings":
                    sendResponse({ bindings: CONFIG.shortcutBindings, success: true });
                    break;
                case "getUsageStats":
                    getUsageStats().then(stats => {
                        sendResponse({ stats, success: true });
                    });
                    return true;
                case "resetUsageStats":
                    try {
                        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
                            chrome.storage.local.set({ clify_usage_stats: { daily: {}, totalTime: 0, videosWatched: 0 } });
                        }
                    } catch (e) {}
                    usageSession = { start: Date.now(), adsBlocked: 0, shortsBlocked: 0, sponsorsSkipped: 0, videosWatched: 0 };
                    sendResponse({ success: true });
                    break;
                case "toggleElementPicker":
                    toggleElementPicker();
                    sendResponse({ success: true });
                    break;
                case "removeCustomSelector":
                    if (request.selector) {
                        CONFIG.customBlockedSelectors = CONFIG.customBlockedSelectors.filter(s => s !== request.selector);
                        applyCustomBlockedSelectors();
                        saveToLocalStorage();
                    }
                    sendResponse({ success: true });
                    break;
                case "getCustomSelectors":
                    sendResponse({ selectors: CONFIG.customBlockedSelectors, success: true });
                    break;
                case "clearCustomSelectors":
                    CONFIG.customBlockedSelectors = [];
                    applyCustomBlockedSelectors();
                    saveToLocalStorage();
                    sendResponse({ success: true });
                    break;
                default:
                    sendResponse({ success: false, error: 'Unknown type: ' + request.type });
            }
        } catch (error) {
            sendResponse({ success: false, error: error.message });
        }
        return true;
    });

    // =============================================
    // INIT
    // =============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }
    
})();
