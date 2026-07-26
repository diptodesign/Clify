// background.js - CLIFY v16.0.0
const VERSION = "16.0.0";
const SERVER_URL = "https://clify-api-2-0.onrender.com/api";
const ADMIN_KEY = "clify-admin-2026";

// =============================================
// DEVELOPER ATTRIBUTION (IMMOVABLE)
// =============================================
const OFFICIAL_DEVELOPER_INFO = Object.freeze({
    name: "Dipto Design Studio",
    email: "DiptoDesignStd@gmail.com",
    website: "https://diptodesign.github.io/clifydl/",
    copyright: "\u00a9 2026 Dipto Design Studio",
    verificationKey: "CLIFY-OFFICIAL-DIPTO-V8-2026",
    officialContact: "DiptoDesignStd@gmail.com",
    officialDownload: "https://diptodesign.github.io/clifydl/"
});

// =============================================
// NATIVE AD BLOCKER RULES
// =============================================
const AD_BLOCK_RULES = [
    // YouTube ad container selectors
    "ytd-ad-slot-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-promoted-video-renderer",
    "ytd-ad-inline-playlist-renderer",
    "ytd-ad-video-info-renderer",
    "ytd-statement-banner-renderer",
    "ytd-primetime-promo-renderer",
    "#masthead-ad",
    ".ytd-ad-slot-renderer",
    "ytd-banner-promo-renderer",
    "ytd-single-ad-masthead-renderer",
    "ytd-video-masthead-ad-v9-renderer",
    "ytd-ad-poll-renderer",
    "ytd-companion-slot-renderer",
    "[data-ad-slot-id]",
    ".ytp-ad-overlay-container",
    ".ytp-ad-text-overlay",
    ".ytp-ad-image-overlay",
    ".ytp-ad-player-overlay",
    ".ytp-ad-progress",
    ".video-ads",
    ".ytp-ad-module",
    ".ytp-ad-survey",
    ".ytp-ce-element",
    "div[class*='ytp-ad']",
    "video-ad-overlay",
    ".ytd-mealbar-promo-renderer",
    "ytd-in-feed-ad-layout-renderer",
    "ytd-ad-break-renderer"
];

// Google ad serving domains to block
const AD_DOMAINS = [
    "pagead2.googlesyndication.com",
    "googleads.g.doubleclick.net",
    "adservice.google.com",
    "www.googletagservices.com",
    "tpc.googlesyndication.com",
    "securepubads.g.doubleclick.net",
    "www.doubleclick.net",
    "stats.g.doubleclick.net",
    "googletagmanager.com",
    "googlesyndication.com",
    "google-analytics.com",
    "ads.youtube.com",
    "s.youtube.com",
    "static.ads-twitter.com",
    "analytics.twitter.com",
    "connect.facebook.net",
    "ad.doubleclick.net",
    "ad.turn.com",
    "ads.facebook.com",
    "ads.linkedin.com",
    "ads-api.twitter.com",
    "amazon-adsystem.com",
    "adnxs.com",
    "adsrvr.org",
    "demdex.net",
    "doubleclick.net",
    "everesttech.net",
    "rubiconproject.com",
    "mathtag.com",
    "moatads.com",
    "nativo.com",
    "outbrain.com",
    "taboola.com",
    "criteo.com",
    "casalemedia.com",
    "pubmatic.com",
    "openx.net",
    "quantserve.com",
    "scorecardresearch.com",
    "bluekai.com",
    "bounceexchange.com",
    "chartbeat.com",
    "hotjar.com",
    "fullstory.com",
    "mouseflow.com",
    "crazyegg.com",
    "optimizely.com",
    "branch.io",
    "adjust.com",
    "appsflyer.com",
    "instabug.com",
    "app-measurement.com",
    "googleadservices.com",
    "partner.googleadservices.com",
    "fundingchoicesmessages.google.com",
    "s0.2mdn.net",
    "criteo.net",
    "media.net",
    "contextual.media.net",
    "bidswitch.net",
    "ipredictive.com",
    "adskeeper.com",
    "ad-maven.com",
    "propellerads.com",
    "popads.net",
    "popcash.net",
    "monetag.com",
    "adsterra.com",
    "trafficjunky.com",
    "exoclick.com",
    "juicyads.com",
    "trafficfactory.com",
    "ttd.net",
    "indexww.com",
    "sharethrough.com",
    "sonobi.com",
    "teads.tv",
    "jwpix.com",
    "prebid.org",
    "spotxchange.com",
    "springserve.com",
    "video.unrulymedia.com",
    "sync.criteo.com",
    "ads.yahoo.com",
    "adserver.yahoo.com",
    "b.scorecardresearch.com",
    "sb.scorecardresearch.com",
    "cm.everesttech.net",
    "cm.g.doubleclick.net",
    "pixel.tapad.com",
    "tags.tiqcdn.com",
    "bat.bing.com",
    "clarity.ms",
    "snap.licdn.com",
    "pixel.facebook.com",
    "facebook.com/tr",
    "wunderkind.co",
    "krxd.net",
    "blueconic.net",
    "permutive.com",
    "permutive.app",
    "liveramp.com",
    "rlcdn.com",
    "bidgear.com",
    "adhigh.net",
    "adform.net",
    "adform.com",
    "serving-sys.com",
    "adtech.com",
    "yieldmo.com",
    "smartyads.com",
    "adroll.com",
    "buysellads.com",
    "carbonads.com",
    "carbonads.net",
    "aax.amazon-adsystem.com",
    "rubicon.com",
    "chartbeat.net",
    "wunderkind.co",
    "cuelinks.com",
    "viglink.com",
    "skimlinks.com"
];

// YouTube ad video skipper patterns
const AD_VIDEO_SELECTORS = [
    ".ytp-ad-skip-button",
    ".ytp-ad-skip-button-modern",
    ".ytp-skip-ad-button",
    ".ytp-ad-skip-button-slot",
    ".ytp-ad-overlay-close-button",
    ".ytp-ad-text",
    ".video-ads",
    ".ytp-ad-poll-overlay",
    ".ytp-ad-survey",
    ".ytp-ad-overlay-container",
    ".ytp-ad-player-overlay",
    "button.ytp-ad-skip-button-modern",
    ".ytp-ad-skip-button-modern-slot",
    ".ytp-ad-skip-link",
    ".ytp-ad-cta-button",
    ".ytp-ad-survey-close-button",
    ".ytp-ad-survey-body",
    ".ytp-ad-image-overlay",
    ".ytp-ad-text-overlay",
    ".ytp-ad-overlay-wrapper",
    ".ytp-ad-overlay-ad-container",
    ".ytp-ad-iframe-overlay",
    ".ytp-ad-overlay-ad-info",
    ".ytp-ad-text-link",
    ".ytp-ad-button-text",
    "button.ytp-ad-button",
    ".ytp-ad-display-overlay",
    ".ytp-ad-survey-prompt",
    ".ytp-ad-endorser-image",
    ".ytp-ad-choices",
    ".ytp-ad-skip-button-slot button",
    "button[class*='skip']"
];

// =============================================
// INSTALL / STARTUP
// =============================================
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log(`Clify v${VERSION} ${details.reason} - Native Ad Blocker ACTIVE`);
    
    const userId = await getUserId();
    console.log('User ID:', userId);
    
    if (details.reason === 'install') {
        await chrome.storage.sync.set({
            theme: "dark",
            lang: "en",
            clify_config: {
                removeShorts: true,
                annotationRemoval: true,
                blurMode: false,
                scheduledBlocking: false,
                scheduleStart: 0,
                scheduleEnd: 24,
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
                readingMode: false,
                liveStreamCleaner: true,
                ageGateBypass: true,
                audioEqualizer: false,
                eqGains: [0, 0, 0, 0, 0],
                eqPreset: 'flat',
                elementPicker: false,
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
            }
        });
    }
    
    // Set up declarativeNetRequest rules for ad blocking
    await setupAdBlockerRules();
    
    if (details.reason === 'install') {
        setTimeout(() => {
            chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
        }, 1000);
    }
});

// =============================================
// NATIVE AD BLOCKER - DECLARATIVE NET REQUEST
// =============================================
async function setupAdBlockerRules() {
    try {
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const removeRuleIds = existingRules.map(r => r.id);
        
        const rules = [];
        let ruleId = 1;
        
        // Block ad domains
        AD_DOMAINS.forEach(domain => {
            rules.push({
                id: ruleId++,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: `||${domain}`,
                    resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "media", "other", "stylesheet"]
                }
            });
        });
        
        // Block YouTube ad-specific requests
        const ytAdPatterns = [
            "*://www.youtube.com/api/stats/ads*",
            "*://www.youtube.com/get_video_info*adformat*",
            "*://video-ad-stats.googlesyndication.com/*",
            "*://doubleclick.net/*",
            "*://googleads.g.doubleclick.net/*",
            "*://pagead2.googlesyndication.com/*",
            "*://*.googlesyndication.com/*",
            "*://*.doubleclick.net/*",
            "*://*.googleadservices.com/*",
            "*://adservice.google.com/*",
            "*://www.google.com/pagead/*",
            "*://www.youtube.com/generate_204*ad*",
            "*://www.youtube.com/ptracking*",
            "*://youtube.com/api/stats/qoe*",
            "*://fundingchoicesmessages.google.com/*",
            "*://www.youtube.com/api/stats/*adformat*",
            "*://s.youtube.com/*",
            "*://ads.youtube.com/*",
            "*://www.youtube.com/get_video_info*&adformat*",
            "*://play.google.com/log*",
            "*://youtube.com/api/stats/attribution*",
            "*://www.youtube.com/api/stats/ads",
            "*://youtube.com/api/stats/ads",
            "*://www.youtube.com/get_video_info*adformat*",
            "*://video-ad-stats.googlesyndication.com/*",
            "*://*.googleadsservices.com/*",
            "*://tpc.googlesyndication.com/*",
            "*://www.google.com/ads/*",
            "*://www.youtube.com/ad_data/*",
            "*://youtube.com/ad_data/*",
            "*://www.youtube.com/api/disabledentitlements*",
            "*://www.youtube.com/gcsr?*",
            "*://s.youtube.com/api/stats/*",
            "*://youtube.com/api/stats/*ads*",
            "*://www.youtube.com/youtubei/*ad*",
            "*://jnn-pa.googleapis.com/$rpc/v1/*/google.videos.v1.Videos/*",
            "*://play.google.com/log*"
        ];
        
        ytAdPatterns.forEach(pattern => {
            rules.push({
                id: ruleId++,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: pattern,
                    resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "media", "other"]
                }
            });
        });
        
        // Block ad-related Google domains for tracking
        const trackingDomains = [
            "google-analytics.com",
            "googletagmanager.com",
            "stats.g.doubleclick.net",
            "www.googletagmanager.com",
            "analytics.google.com",
            "adservice.google.com",
            "fundingchoicesmessages.google.com",
            "doubleclick.net",
            "googleadservices.com",
            "partner.googleadservices.com",
            "clarity.ms",
            "bat.bing.com",
            "scorecardresearch.com",
            "chartbeat.com",
            "hotjar.com",
            "fullstory.com",
            "mouseflow.com",
            "crazyegg.com",
            "optimizely.com",
            "wunderkind.co",
            "krxd.net",
            "blueconic.net",
            "permutive.com",
            "permutive.app",
            "liveramp.com",
            "rlcdn.com",
            "demdex.net",
            "bluekai.com",
            "everesttech.net",
            "cm.everesttech.net",
            "moatads.com",
            "quantserve.com",
            "mathtag.com",
            "bounceexchange.com"
        ];

        // Block YouTube internal tracking URLs
        const ytTrackingPatterns = [
            "*://www.youtube.com/api/stats/qoe*",
            "*://www.youtube.com/ptracking*",
            "*://www.youtube.com/generate_204*",
            "*://www.youtube.com/api/stats/attribution*",
            "*://www.youtube.com/api/stats/*",
            "*://s.youtube.com/*",
            "*://youtube.com/api/stats/*",
            "*://play.google.com/generate_204*"
        ];
        
        trackingDomains.forEach(domain => {
            rules.push({
                id: ruleId++,
                priority: 1,
                action: { type: "block" },
                condition: {
                    urlFilter: `||${domain}`,
                    resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame", "other"]
                }
            });
        });

        // Block YouTube internal tracking
        ytTrackingPatterns.forEach(pattern => {
            rules.push({
                id: ruleId++,
                priority: 2,
                action: { type: "block" },
                condition: {
                    urlFilter: pattern,
                    resourceTypes: ["xmlhttprequest", "script", "image", "other"]
                }
            });
        });

        // Redirect YouTube ad requests to empty responses (instead of blocking)
        const ytAdRedirectPatterns = [
            "*://www.youtube.com/api/stats/ads*",
            "*://www.youtube.com/get_video_info*adformat*",
            "*://fundingchoicesmessages.google.com/*"
        ];
        ytAdRedirectPatterns.forEach(pattern => {
            rules.push({
                id: ruleId++,
                priority: 3,
                action: {
                    type: "redirect",
                    redirect: { url: "data:text/plain;base64," }
                },
                condition: {
                    urlFilter: pattern,
                    resourceTypes: ["xmlhttprequest", "sub_frame"]
                }
            });
        });

        // Remove ad-related response headers
        const headerRuleIds = [];
        AD_DOMAINS.slice(0, 30).forEach((domain, i) => {
            const rid = ruleId++;
            headerRuleIds.push(rid);
            rules.push({
                id: rid,
                priority: 1,
                action: {
                    type: "modifyHeaders",
                    responseHeaders: [
                        { header: "X-Ad-Enabled", operation: "remove" },
                        { header: "X-Ad-Token", operation: "remove" }
                    ]
                },
                condition: {
                    urlFilter: `||${domain}`,
                    resourceTypes: ["xmlhttprequest", "sub_frame"]
                }
            });
        });
        
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: removeRuleIds,
            addRules: rules
        });
        
        console.log(`Ad blocker: ${rules.length} rules activated (uBlock-level)`);
    } catch (error) {
        console.warn('Ad blocker rule setup failed (permissions may be missing):', error.message);
        // Fallback: no-op if declarativeNetRequest not available
    }
}

async function toggleAdBlocker(enabled) {
    try {
        if (enabled) {
            await setupAdBlockerRules();
        } else {
            const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
            const removeRuleIds = existingRules.map(r => r.id);
            await chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: removeRuleIds
            });
        }
        
        await chrome.storage.local.set({ adBlockerEnabled: enabled });
        console.log('Ad blocker:', enabled ? 'ENABLED' : 'DISABLED');
    } catch (error) {
        console.warn('Toggle ad blocker error:', error.message);
    }
}

// =============================================
// USER ID MANAGEMENT
// =============================================
function generateLocalId() {
    return 'CLY' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

async function registerWithServer() {
    try {
        const response = await fetch(`${SERVER_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                browserInfo: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language,
                    version: VERSION,
                    installTime: new Date().toISOString(),
                    source: 'Chrome Extension v8'
                }
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.userId) {
                await chrome.storage.local.set({ clify_user_id: data.userId, server_registered: true });
                return data.userId;
            }
        }
    } catch (error) {}
    
    const localId = generateLocalId();
    await chrome.storage.local.set({ clify_user_id: localId, server_registered: false });
    return localId;
}

async function getUserId() {
    return new Promise(resolve => {
        chrome.storage.local.get(['clify_user_id'], async result => {
            if (result.clify_user_id) {
                resolve(result.clify_user_id);
            } else {
                const userId = await registerWithServer();
                resolve(userId);
            }
        });
    });
}

// =============================================
// DATA MANAGEMENT
// =============================================
async function getUserData() {
    return new Promise(resolve => {
        chrome.storage.local.get(['clify_data'], result => {
            if (result.clify_data) {
                resolve(result.clify_data);
            } else {
                resolve({
                    blockedVideos: {}, blockedChannels: {}, whitelistedChannels: {},
                    keywords: [],
                    stats: { totalBlocks: 0, shortsBlocks: 0, manualBlocks: 0, keywordBlocks: 0, channelBlocks: 0, languageBlocks: 0, adsBlocked: 0, dailyActivity: {} },
                    settings: { removeShorts: true, theme: 'dark', language: 'en', adBlocker: true },
                    created: new Date().toISOString()
                });
            }
        });
    });
}

async function saveUserData(data) {
    return new Promise(resolve => {
        data.lastUpdated = new Date().toISOString();
        chrome.storage.local.set({ clify_data: data }, () => resolve(true));
    });
}

// =============================================
// MESSAGE HANDLER
// =============================================
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const handleAsync = async () => {
        try {
            const userId = await getUserId();
            
            switch (request.type) {
                case "getUserData":
                    const userData = await getUserData();
                    return { success: true, userId, data: userData };
                    
                case "saveUserData":
                    await saveUserData(request.data);
                    return { success: true };
                    
                case "getBlockedVideos":
                    const data = await getUserData();
                    return { success: true, blockedVideosMap: data.blockedVideos || {} };
                    
                case "getBlockedChannels":
                    const chData = await getUserData();
                    return { success: true, blockedChannels: chData.blockedChannels || {} };
                    
                case "getWhitelistedChannels":
                    const wlData = await getUserData();
                    return { success: true, whitelistedChannels: wlData.whitelistedChannels || {} };
                    
                case "blockChannel":
                    const chUserData = await getUserData();
                    if (!chUserData.blockedChannels) chUserData.blockedChannels = {};
                    chUserData.blockedChannels[request.channelData.id] = {
                        ...request.channelData, ts: Date.now(), timestamp: new Date().toLocaleString()
                    };
                    await saveUserData(chUserData);
                    return { success: true };
                    
                case "unblockChannel":
                    const ucData = await getUserData();
                    if (ucData.blockedChannels && ucData.blockedChannels[request.channelId]) {
                        delete ucData.blockedChannels[request.channelId];
                        await saveUserData(ucData);
                    }
                    return { success: true };
                    
                case "whitelistChannel":
                    const wlData2 = await getUserData();
                    if (!wlData2.whitelistedChannels) wlData2.whitelistedChannels = {};
                    wlData2.whitelistedChannels[request.channelData.id] = request.channelData;
                    await saveUserData(wlData2);
                    return { success: true };
                    
                case "getStats":
                    const statsData = await getUserData();
                    const blockedVideos = statsData.blockedVideos || {};
                    const videosArray = Object.values(blockedVideos);
                    const today = new Date().toISOString().split('T')[0];
                    const dailyActivity = {};
                    videosArray.forEach(video => {
                        if (video.ts) {
                            const date = new Date(video.ts).toISOString().split('T')[0];
                            dailyActivity[date] = (dailyActivity[date] || 0) + 1;
                        }
                    });
                    return {
                        success: true, userId,
                        totalBlocks: videosArray.length,
                        todayBlocks: dailyActivity[today] || 0,
                        manualBlocks: videosArray.filter(v => v.reason === 'manual').length,
                        keywordBlocks: videosArray.filter(v => v.reason === 'keyword').length,
                        shortsBlocks: videosArray.filter(v => v.reason === 'shorts').length,
                        languageBlocks: videosArray.filter(v => v.reason === 'language').length,
                        channelBlocks: Object.keys(statsData.blockedChannels || {}).length,
                        activeKeywords: (statsData.keywords || []).length,
                        dailyActivity,
                        adsBlocked: statsData.stats?.adsBlocked || 0,
                        sponsorBlockSkips: statsData.stats?.sponsorBlockSkips || 0,
                        sponsorBlockTimeSaved: statsData.stats?.sponsorBlockTimeSaved || 0,
                        server: 'Render.com'
                    };
                    
                case "saveKeywords":
                    const kwData = await getUserData();
                    kwData.keywords = request.keywords || [];
                    await saveUserData(kwData);
                    return { success: true };
                    
                case "blockVideo":
                    const bvData = await getUserData();
                    if (request.videoData && request.videoData.id) {
                        if (!bvData.blockedVideos) bvData.blockedVideos = {};
                        bvData.blockedVideos[request.videoData.id] = {
                            ...request.videoData, ts: Date.now(), timestamp: new Date().toLocaleString(), blockedBy: userId
                        };
                        bvData.stats.totalBlocks = Object.keys(bvData.blockedVideos).length;
                        if (request.videoData.reason === 'shorts') bvData.stats.shortsBlocks++;
                        if (request.videoData.reason === 'manual') bvData.stats.manualBlocks++;
                        if (request.videoData.reason === 'keyword') bvData.stats.keywordBlocks++;
                        if (request.videoData.reason === 'channel') bvData.stats.channelBlocks++;
                        await saveUserData(bvData);
                    }
                    return { success: true };
                    
                case "unblockVideo":
                    const uvData = await getUserData();
                    if (uvData.blockedVideos && uvData.blockedVideos[request.videoId]) {
                        delete uvData.blockedVideos[request.videoId];
                        uvData.stats.totalBlocks = Object.keys(uvData.blockedVideos).length;
                        await saveUserData(uvData);
                    }
                    return { success: true };
                    
                case "clearAllVideos":
                    const clearedData = await getUserData();
                    clearedData.blockedVideos = {};
                    clearedData.stats.totalBlocks = 0;
                    clearedData.stats.shortsBlocks = 0;
                    clearedData.stats.manualBlocks = 0;
                    clearedData.stats.keywordBlocks = 0;
                    clearedData.stats.channelBlocks = 0;
                    clearedData.stats.dailyActivity = {};
                    await saveUserData(clearedData);
                    return { success: true };
                    
                case "sponsorBlockSkip":
                    const sbData = await getUserData();
                    if (!sbData.stats) sbData.stats = {};
                    sbData.stats.sponsorBlockSkips = Math.max(request.stats.segmentsSkipped || 0, sbData.stats.sponsorBlockSkips || 0);
                    sbData.stats.sponsorBlockTimeSaved = Math.max(request.stats.timeSaved || 0, sbData.stats.sponsorBlockTimeSaved || 0);
                    await saveUserData(sbData);
                    return { success: true };
                    
                case "clearAllChannels":
                    const clChData = await getUserData();
                    clChData.blockedChannels = {};
                    await saveUserData(clChData);
                    return { success: true };
                    
                case "getEnhancedConfig":
                    return new Promise(resolve2 => {
                        chrome.storage.sync.get(['clify_config'], result => {
                            resolve2({
                                success: true,
                                config: result.clify_config || {
                                    removeShorts: true, annotationRemoval: true, theaterMode: false,
                                    autoPlayNext: false, playbackSpeed: 1.0, blurMode: false,
                                    scheduledBlocking: false, scheduleStart: 0, scheduleEnd: 24,
                                    blockChannelButton: true, adBlocker: true, adBlockerSkipAds: true,
                                    adBlockerBlockTracker: true, adBlockerBlockAnalytics: true, adBlockerBlockSocial: true
                                }
                            });
                        });
                    });
                    
                case "saveEnhancedConfig":
                    return new Promise(resolve2 => {
                        chrome.storage.sync.set({ clify_config: request.config }, () => {
                            resolve2({ success: true });
                        });
                    });
                    
                case "toggleShortsRemoval":
                    return new Promise(resolve2 => {
                        chrome.storage.sync.get(['clify_config'], result => {
                            const config = result.clify_config || {};
                            config.removeShorts = request.enabled !== false;
                            chrome.storage.sync.set({ clify_config: config }, () => resolve2({ success: true }));
                        });
                    });
                    
                case "toggleAdBlocker":
                    await toggleAdBlocker(request.enabled !== false);
                    if (request.config) {
                        await chrome.storage.local.set({ adBlockerConfig: request.config });
                    }
                    return { success: true, enabled: request.enabled !== false };
                    
                case "getAdBlockerStatus":
                    let enabled = true;
                    try {
                        const rules = await chrome.declarativeNetRequest.getDynamicRules();
                        enabled = rules.length > 0;
                    } catch (e) {}
                    const adConfig = await new Promise(r => chrome.storage.local.get(['adBlockerConfig'], res => r(res.adBlockerConfig || {})));
                    const adStatsData = await getUserData();
                    return { success: true, enabled, config: adConfig, stats: { totalBlocked: adStatsData.stats?.adsBlocked || 0, bannersRemoved: adStatsData.stats?.bannersRemoved || 0, skipped: adStatsData.stats?.skipped || 0 }, ruleCount: (await chrome.declarativeNetRequest.getDynamicRules().catch(() => [])).length };
                    
                case "incrementAdsBlocked":
                    const adData = await getUserData();
                    if (!adData.stats) adData.stats = {};
                    adData.stats.adsBlocked = (adData.stats.adsBlocked || 0) + (request.count || 1);
                    await saveUserData(adData);
                    return { success: true };
                    
                case "incrementBannersRemoved":
                    const banData = await getUserData();
                    if (!banData.stats) banData.stats = {};
                    banData.stats.bannersRemoved = (banData.stats.bannersRemoved || 0) + (request.count || 1);
                    await saveUserData(banData);
                    return { success: true };
                    
                case "incrementSkipped":
                    const skipData = await getUserData();
                    if (!skipData.stats) skipData.stats = {};
                    skipData.stats.skipped = (skipData.stats.skipped || 0) + (request.count || 1);
                    await saveUserData(skipData);
                    return { success: true };
                    
                case "getExportData":
                    const exportData = await getUserData();
                    return {
                        success: true,
                        blockedVideos: exportData.blockedVideos || {},
                        blockedChannels: exportData.blockedChannels || {},
                        whitelistedChannels: exportData.whitelistedChannels || {},
                        keywords: exportData.keywords || [],
                        config: {},
                        version: VERSION,
                        exportDate: new Date().toISOString()
                    };
                    
                case "importData":
                    const impData = await getUserData();
                    if (request.data) {
                        if (request.data.blockedVideos) impData.blockedVideos = { ...impData.blockedVideos, ...request.data.blockedVideos };
                        if (request.data.blockedChannels) impData.blockedChannels = { ...impData.blockedChannels, ...request.data.blockedChannels };
                        if (request.data.keywords) impData.keywords = request.data.keywords;
                        if (request.data.config) {
                            await chrome.storage.sync.set({ clify_config: request.data.config });
                        }
                        await saveUserData(impData);
                    }
                    return { success: true };

                case "getServerNotifications":
                    const storedNotifs = await new Promise(r => chrome.storage.local.get(['clify_server_notifs'], r));
                    return { success: true, notifications: storedNotifs.clify_server_notifs || [] };

                case "markNotifRead":
                    const markReadStored = await new Promise(r => chrome.storage.local.get(['clify_server_notifs'], r));
                    const markReadNotifs = markReadStored.clify_server_notifs || [];
                    const target = markReadNotifs.find(n => n.id === request.notifId);
                    if (target) target.read = true;
                    await chrome.storage.local.set({ clify_server_notifs: markReadNotifs });
                    const unreadCount = markReadNotifs.filter(n => !n.read).length;
                    chrome.action.setBadgeText({ text: unreadCount > 0 ? String(unreadCount) : '' });
                    try { await fetch(`${SERVER_URL}/notifications/${request.notifId}/read`, { method: 'POST' }); } catch (e) {}
                    return { success: true };

                case "markAllNotifsRead":
                    const allReadStored = await new Promise(r => chrome.storage.local.get(['clify_server_notifs'], r));
                    const allReadNotifs = allReadStored.clify_server_notifs || [];
                    allReadNotifs.forEach(n => n.read = true);
                    await chrome.storage.local.set({ clify_server_notifs: allReadNotifs });
                    chrome.action.setBadgeText({ text: '' });
                    return { success: true };

                case "fetchNotificationsNow":
                    await fetchServerNotifications();
                    const freshStored = await new Promise(r => chrome.storage.local.get(['clify_server_notifs'], r));
                    return { success: true, notifications: freshStored.clify_server_notifs || [] };

                // ─── ADMIN: Key verification ──────────────────────
                case "verifyAdminKey":
                    const validKey = request.key === ADMIN_KEY;
                    return { success: validKey };

                // ─── ADMIN: Create notification on server ──────────
                case "createNotification":
                    try {
                        const createRes = await fetch(`${SERVER_URL}/admin/notifications`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_KEY },
                            body: JSON.stringify({
                                title: request.title,
                                message: request.message,
                                type: request.type || 'info',
                                link: request.link || '',
                                priority: request.priority || 'normal'
                            })
                        });
                        const createData = await createRes.json();
                        return { success: createData.success, id: createData.id, error: createData.error };
                    } catch (e) { return { success: false, error: e.message }; }

                // ─── ADMIN: Get all notifications ──────────────────
                case "getAdminNotifications":
                    try {
                        const listRes = await fetch(`${SERVER_URL}/admin/notifications`, {
                            headers: { 'X-Admin-Key': ADMIN_KEY }
                        });
                        const listData = await listRes.json();
                        const statsRes = await fetch(`${SERVER_URL}/notifications/stats`);
                        const statsData = await statsRes.json();
                        return { success: true, notifications: listData.notifications || [], stats: statsData };
                    } catch (e) { return { success: true, notifications: [], stats: {} }; }

                // ─── ADMIN: Toggle notification active/inactive ────
                case "toggleNotification":
                    try {
                        await fetch(`${SERVER_URL}/admin/notifications/${request.notifId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', 'X-Admin-Key': ADMIN_KEY },
                            body: JSON.stringify({ active: request.active })
                        });
                        return { success: true };
                    } catch (e) { return { success: false }; }

                // ─── ADMIN: Delete notification ────────────────────
                case "deleteNotification":
                    try {
                        await fetch(`${SERVER_URL}/admin/notifications/${request.notifId}`, {
                            method: 'DELETE',
                            headers: { 'X-Admin-Key': ADMIN_KEY }
                        });
                        return { success: true };
                    } catch (e) { return { success: false }; }

                // Usage tracking
                case "usageHeartbeat":
                    chrome.storage.local.get(['clify_usage_stats'], (result) => {
                        const stats = result.clify_usage_stats || {};
                        const today = new Date().toISOString().split('T')[0];
                        if (!stats[today]) stats[today] = {};
                        const s = stats[today];
                        const sess = request.session || {};
                        s.timeOnYoutube = (s.timeOnYoutube || 0) + ((sess.timeSpent || 0) * 1000);
                        s.adsBlocked = (s.adsBlocked || 0) + (sess.adsBlocked || 0);
                        s.shortsBlocked = (s.shortsBlocked || 0) + (sess.shortsBlocked || 0);
                        s.sponsorsSkipped = (s.sponsorsSkipped || 0) + (sess.sponsorsSkipped || 0);
                        s.timeSaved = (s.timeSaved || 0) + (sess.timeSaved || 0);
                        s.videosWatched = (s.videosWatched || 0) + (sess.videosWatched || 0);
                        chrome.storage.local.set({ clify_usage_stats: stats });
                    });
                    sendResponse({ success: true });
                    break;

                case "recordVideoWatch":
                    chrome.storage.local.get(['clify_usage_stats'], (result) => {
                        const stats = result.clify_usage_stats || {};
                        const today = new Date().toISOString().split('T')[0];
                        if (!stats[today]) stats[today] = {};
                        stats[today].videosWatched = (stats[today].videosWatched || 0) + 1;
                        stats[today].timeOnYoutube = (stats[today].timeOnYoutube || 0) + (request.duration || 0);
                        chrome.storage.local.set({ clify_usage_stats: stats });
                    });
                    sendResponse({ success: true });
                    break;

                case "getUsageStats":
                    chrome.storage.local.get(['clify_usage_stats'], (result) => {
                        sendResponse({ stats: result.clify_usage_stats || {}, success: true });
                    });
                    return true;

                case "resetUsageStats":
                    chrome.storage.local.set({ clify_usage_stats: {} });
                    sendResponse({ success: true });
                    break;

                case "getWatchLaterQueue":
                    chrome.storage.local.get(['clify_watch_later'], (result) => {
                        sendResponse({ queue: result.clify_watch_later || [], success: true });
                    });
                    return true;

                case "saveWatchLaterQueue":
                    chrome.storage.local.set({ clify_watch_later: request.queue || [] });
                    sendResponse({ success: true });
                    break;

                default:
                    return { success: false, error: 'Unknown message type' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    };
    
    handleAsync().then(sendResponse);
    return true;
});

// =============================================
// EXTENSION ICON CLICK
// =============================================
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
});

// =============================================
// ALARM-BASED AD STATS TRACKING
// =============================================
chrome.alarms.create('clifyAdStats', { periodInMinutes: 5 });
chrome.alarms.create('clifyNotifications', { periodInMinutes: 15 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'clifyAdStats') {
        try {
            const rules = await chrome.declarativeNetRequest.getDynamicRules();
            if (rules.length > 0) {
                console.log(`Ad blocker active: ${rules.length} rules`);
            }
        } catch (e) {}
    }
    if (alarm.name === 'clifyNotifications') {
        await fetchServerNotifications();
    }
});

// =============================================
// SERVER NOTIFICATION POLLING
// =============================================
async function fetchServerNotifications() {
    try {
        const stored = await new Promise(r => chrome.storage.local.get(['clify_server_notifs', 'clify_notif_last_fetch'], r));
        const lastFetch = stored.clify_notif_last_fetch || 0;
        const existing = stored.clify_server_notifs || [];

        const res = await fetch(`${SERVER_URL}/notifications?since=${lastFetch}&limit=50`);
        if (!res.ok) return;
        const data = await res.json();
        if (!data.notifications || data.notifications.length === 0) return;

        const newNotifs = data.notifications.filter(n => !existing.find(e => e.id === n.id));
        if (newNotifs.length === 0) return;

        const merged = [...newNotifs, ...existing].slice(0, 100);
        await chrome.storage.local.set({
            clify_server_notifs: merged,
            clify_notif_last_fetch: data.serverTime || Date.now()
        });

        newNotifs.forEach(n => {
            if (n.priority === 'high') showDesktopNotification(n);
        });

        const badgeCount = merged.filter(n => !n.read).length;
        chrome.action.setBadgeText({ text: badgeCount > 0 ? String(badgeCount) : '' });
        chrome.action.setBadgeBackgroundColor({ color: '#a3e635' });

        console.log(`Fetched ${newNotifs.length} new notifications from server`);
    } catch (e) {
        console.warn('Notification fetch failed:', e.message);
    }
}

function showDesktopNotification(notif) {
    const iconMap = { info: 'info-circle', update: 'rocket', feature: 'star', warning: 'alert-triangle', error: 'alert-circle', announcement: 'megaphone' };
    chrome.notifications.create(`clify-notif-${notif.id}`, {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icons/icon128.png'),
        title: `Clify: ${notif.title}`,
        message: notif.message,
        priority: 2,
        requireInteraction: false
    });
}

chrome.notifications.onClicked.addListener((notifId) => {
    if (notifId.startsWith('clify-notif-')) {
        chrome.tabs.create({ url: chrome.runtime.getURL('dashboard.html') });
        chrome.notifications.clear(notifId);
    }
});

// =============================================
// KEEP-SERVER-ALIVE
// =============================================
setInterval(async () => {
    try {
        await fetch(`${SERVER_URL.replace('/api', '')}/ping`);
    } catch (e) {}
}, 10 * 60 * 1000);

console.log(`Clify v${VERSION} - Native Ad Blocker ACTIVE - All systems loaded!`);
