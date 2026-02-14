// ============================================
// CLIFY OFFICIAL DEVELOPER PROTECTION SYSTEM
// ============================================

const OFFICIAL_DEVELOPER_INFO = Object.freeze({
    name: "Dipto Design Studio",
    email: "DiptoDesignStd@gmail.com",
    website: "https://diptodesign.github.io/clifydl/",
    copyright: "© 2026 Dipto Design Studio",
    verificationKey: "CLIFY-OFFICIAL-DIPTO-V7-2026",
    officialContact: "DiptoDesignStd@gmail.com",
    officialDownload: "https://diptodesign.github.io/clifydl/"
});

// Install-time attribution (impossible to remove)
chrome.runtime.onInstalled.addListener((details) => {
    console.log(`
╔══════════════════════════════════════════════╗
║           CLIFY v${VERSION} - OFFICIAL              ║
║        Developed by Dipto Design Studio      ║
║     Contact: DiptoDesignStd@gmail.com        ║
║  Download: diptodesign.github.io/clifydl/    ║
║            © 2026 - All Rights Reserved      ║
╚══════════════════════════════════════════════╝
    `);
    
    // Store permanent attribution data
    chrome.storage.local.set({
        'clify_official_developer': OFFICIAL_DEVELOPER_INFO.name,
        'clify_official_email': OFFICIAL_DEVELOPER_INFO.email,
        'clify_official_website': OFFICIAL_DEVELOPER_INFO.website,
        'clify_official_version': VERSION,
        'clify_install_date': new Date().toISOString(),
        'clify_copyright': OFFICIAL_DEVELOPER_INFO.copyright
    });
    
    // Create unremovable attribution
    createPermanentAttribution();
    
    // Register with verification server
    registerExtension();
});

// Create attribution that survives removal attempts
function createPermanentAttribution() {
    // Multiple layers of attribution
    const attributionLayers = [
        // Layer 1: Console watermark (always visible)
        () => {
            console.log('%c[CLIFY OFFICIAL]', 'color: #c1f11d; font-weight: bold;');
            console.log('%cDeveloper: Dipto Design Studio', 'color: #666;');
            console.log('%cEmail: DiptoDesignStd@gmail.com', 'color: #666;');
            console.log('%cWebsite: https://diptodesign.github.io/clifydl/', 'color: #666;');
        },
        
        // Layer 2: Storage markers
        () => {
            chrome.storage.local.set({
                'clify_attribution_timestamp': Date.now(),
                'clify_official_marker': 'OFFICIAL_DIPTO_DESIGN_STUDIO'
            });
        },
        
        // Layer 3: Periodic reminder
        () => {
            setInterval(() => {
                console.log('%c🔒 Clify Official - Dipto Design Studio', 
                    'color: #c1f11d; font-size: 11px;');
            }, 300000); // Every 5 minutes
        }
    ];
    
    // Apply all layers
    attributionLayers.forEach(layer => {
        try { layer(); } catch (e) { /* Silent fail */ }
    });
}

// Register with official verification server
async function registerExtension() {
    try {
        const response = await fetch('https://clify-official-verification.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                extensionId: chrome.runtime.id,
                developer: OFFICIAL_DEVELOPER_INFO.name,
                email: OFFICIAL_DEVELOPER_INFO.email,
                website: OFFICIAL_DEVELOPER_INFO.website,
                version: VERSION,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            })
        });
        
        if (response.ok) {
            console.log('✅ Registered with Clify Official Verification System');
        }
    } catch (error) {
        // Offline mode is okay
    }
}

// Verify extension integrity hourly
setInterval(async () => {
    try {
        const manifest = chrome.runtime.getManifest();
        const isOfficial = manifest.author.includes('DiptoDesignStd@gmail.com') && 
                          manifest.homepage_url.includes('diptodesign.github.io/clifydl');
        
        if (!isOfficial) {
            console.error('❌ UNAUTHORIZED COPY DETECTED');
            console.error('Official Developer: Dipto Design Studio');
            console.error('Official Email: DiptoDesignStd@gmail.com');
            console.error('Official Download: https://diptodesign.github.io/clifydl/');
            
            // Show notification warning
            chrome.notifications.create({
                type: 'basic',
                iconUrl: chrome.runtime.getURL('icons/icon128.png'),
                title: '⚠️ Clify Security Alert',
                message: 'This appears to be an unofficial copy. Get official version from diptodesign.github.io/clifydl',
                priority: 2
            });
        }
    } catch (error) {
        // Integrity check failed
    }
}, 3600000); // Every hour

// background.js - RENDER.COM EDITION v7.0.0
const VERSION = "7.0.0";
const SERVER_URL = "https://clifyz.onrender.com/api";

// Telegram alert (will work through your server)
async function sendTelegramAlert(message) {
    // This will be handled by your server
    console.log('Telegram alert (via server):', message.substring(0, 50) + '...');
}

// Generate local ID as fallback
function generateLocalId() {
    return 'CLY' + Date.now().toString().slice(-6) + 
           Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

// Register with Render server
async function registerWithServer() {
    try {
        console.log('📡 Connecting to Render server...');
        
        const response = await fetch(`${SERVER_URL}/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                browserInfo: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                    language: navigator.language,
                    version: VERSION,
                    installTime: new Date().toISOString(),
                    source: 'Chrome Extension'
                }
            })
        });
        
        console.log('Server response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Server error ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Server response:', data);
        
        if (data.success && data.userId) {
            console.log('✅ Server registration successful! User ID:', data.userId);
            
            // Store locally
            await chrome.storage.local.set({
                clify_user_id: data.userId,
                server_registered: true,
                server_url: SERVER_URL,
                registered_at: new Date().toISOString(),
                server_info: data
            });
            
            return data.userId;
        } else {
            throw new Error(data.error || 'Registration failed');
        }
        
    } catch (error) {
        console.error('❌ Server registration failed:', error.message);
        
        // Fallback: local ID
        const localId = generateLocalId();
        console.log('🔄 Using fallback local ID:', localId);
        
        await chrome.storage.local.set({
            clify_user_id: localId,
            server_registered: false,
            fallback_mode: true,
            error: error.message
        });
        
        return localId;
    }
}

// Get or create user ID
async function getUserId() {
    return new Promise(resolve => {
        chrome.storage.local.get(['clify_user_id'], async result => {
            if (result.clify_user_id) {
                console.log('📝 Existing user ID:', result.clify_user_id);
                resolve(result.clify_user_id);
            } else {
                console.log('🆕 No user ID found, registering...');
                const userId = await registerWithServer();
                resolve(userId);
            }
        });
    });
}

// Get user data (from local storage)
async function getUserData() {
    return new Promise(resolve => {
        chrome.storage.local.get(['clify_data'], result => {
            if (result.clify_data) {
                resolve(result.clify_data);
            } else {
                // Default structure
                const defaultData = {
                    blockedVideos: {},
                    keywords: [],
                    stats: {
                        totalBlocks: 0,
                        shortsBlocks: 0,
                        manualBlocks: 0,
                        keywordBlocks: 0,
                        languageBlocks: 0,
                        dailyActivity: {}
                    },
                    settings: {
                        removeShorts: true,
                        theme: 'dark',
                        language: 'en'
                    },
                    created: new Date().toISOString()
                };
                resolve(defaultData);
            }
        });
    });
}

// Save user data
async function saveUserData(data) {
    return new Promise(resolve => {
        data.lastUpdated = new Date().toISOString();
        chrome.storage.local.set({ clify_data: data }, () => {
            console.log('💾 Data saved locally');
            resolve(true);
        });
    });
}

// Save blocked video to server
async function saveBlockedVideoToServer(userId, videoData) {
    try {
        const response = await fetch(`${SERVER_URL}/video/block`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, videoData })
        });
        
        return response.ok;
    } catch (error) {
        console.log('Server video save failed');
        return false;
    }
}

// Enhanced message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Clify: Received message:', request.type);
    
    const handleAsync = async () => {
        try {
            const userId = await getUserId();
            console.log('👤 Current user:', userId);
            
            switch (request.type) {
                case "getUserData":
                    const userData = await getUserData();
                    return { 
                        success: true, 
                        userId: userId,
                        data: userData 
                    };
                    
                case "saveUserData":
                    await saveUserData(request.data);
                    return { success: true };
                    
                case "getBlockedVideos":
                    const data = await getUserData();
                    return { 
                        success: true, 
                        blockedVideosMap: data.blockedVideos || {} 
                    };
                    
                case "getStats":
                    const statsData = await getUserData();
                    const blockedVideos = statsData.blockedVideos || {};
                    const videosArray = Object.values(blockedVideos);
                    const today = new Date().toISOString().split('T')[0];
                    
                    // Calculate daily activity
                    const dailyActivity = {};
                    videosArray.forEach(video => {
                        if (video.ts) {
                            const date = new Date(video.ts).toISOString().split('T')[0];
                            dailyActivity[date] = (dailyActivity[date] || 0) + 1;
                        }
                    });
                    
                    return {
                        success: true,
                        userId: userId,
                        totalBlocks: videosArray.length,
                        todayBlocks: dailyActivity[today] || 0,
                        manualBlocks: videosArray.filter(v => v.reason === 'manual').length,
                        keywordBlocks: videosArray.filter(v => v.reason === 'keyword').length,
                        shortsBlocks: videosArray.filter(v => v.reason === 'shorts').length,
                        languageBlocks: videosArray.filter(v => v.reason === 'language').length,
                        activeKeywords: statsData.keywords?.length || 0,
                        dailyActivity: dailyActivity,
                        server: 'Render.com'
                    };
                    
                case "saveKeywords":
                    const currentData = await getUserData();
                    currentData.keywords = request.keywords || [];
                    await saveUserData(currentData);
                    return { success: true };
                    
                case "blockVideo":
                    // Save locally
                    const userData2 = await getUserData();
                    if (request.videoData && request.videoData.id) {
                        userData2.blockedVideos = userData2.blockedVideos || {};
                        userData2.blockedVideos[request.videoData.id] = {
                            ...request.videoData,
                            ts: Date.now(),
                            timestamp: new Date().toLocaleString(),
                            blockedBy: userId
                        };
                        
                        // Update stats
                        userData2.stats.totalBlocks = Object.keys(userData2.blockedVideos).length;
                        if (request.videoData.reason === 'shorts') userData2.stats.shortsBlocks++;
                        if (request.videoData.reason === 'manual') userData2.stats.manualBlocks++;
                        if (request.videoData.reason === 'keyword') userData2.stats.keywordBlocks++;
                        
                        await saveUserData(userData2);
                        
                        // Try to save to server
                        await saveBlockedVideoToServer(userId, request.videoData);
                    }
                    return { success: true };
                    
                case "unblockVideo":
                    const userData3 = await getUserData();
                    if (userData3.blockedVideos && userData3.blockedVideos[request.videoId]) {
                        delete userData3.blockedVideos[request.videoId];
                        userData3.stats.totalBlocks = Object.keys(userData3.blockedVideos || {}).length;
                        await saveUserData(userData3);
                    }
                    return { success: true };
                    
                case "clearAllVideos":
                    const clearedData = await getUserData();
                    clearedData.blockedVideos = {};
                    clearedData.stats.totalBlocks = 0;
                    clearedData.stats.shortsBlocks = 0;
                    clearedData.stats.manualBlocks = 0;
                    clearedData.stats.keywordBlocks = 0;
                    clearedData.stats.dailyActivity = {};
                    await saveUserData(clearedData);
                    return { success: true };
                    
                case "refreshStats":
                    return { success: true };
                    
                case "getEnhancedConfig":
                    return new Promise(resolve => {
                        chrome.storage.sync.get(['clify_enhanced_config'], result => {
                            const defaultConfig = {
                                removeShorts: true,
                                annotationRemoval: true,
                                theaterMode: false,
                                autoPlayNext: false,
                                playbackSpeed: 1.0
                            };
                            resolve({ 
                                success: true,
                                config: result.clify_enhanced_config || defaultConfig
                            });
                        });
                    });
                    
                case "saveEnhancedConfig":
                    return new Promise(resolve => {
                        chrome.storage.sync.set({ 
                            clify_enhanced_config: request.config 
                        }, () => {
                            resolve({ success: true });
                        });
                    });
                    
                case "toggleShortsRemoval":
                    return new Promise(resolve => {
                        chrome.storage.sync.get(['clify_enhanced_config'], result => {
                            const config = result.clify_enhanced_config || {};
                            config.removeShorts = request.enabled !== false;
                            chrome.storage.sync.set({ 
                                clify_enhanced_config: config 
                            }, () => {
                                resolve({ success: true });
                            });
                        });
                    });
                    
                default:
                    console.warn('Unknown message type:', request.type);
                    return { success: false, error: 'Unknown message type' };
            }
        } catch (error) {
            console.error('❌ Handler error:', error);
            return { 
                success: false, 
                error: error.message
            };
        }
    };
    
    handleAsync().then(sendResponse);
    return true;
});

// Installation
chrome.runtime.onInstalled.addListener(async (details) => {
    console.log(`🎉 Clify v${VERSION} ${details.reason}`);
    
    const userId = await getUserId();
    console.log('✅ User ID assigned:', userId);
    
    // Initialize settings
    await chrome.storage.sync.set({
        theme: "dark",
        lang: "en",
        clify_enhanced_config: {
            removeShorts: true,
            annotationRemoval: true,
            theaterMode: false,
            autoPlayNext: false,
            playbackSpeed: 1.0
        }
    });
    
    console.log('⚙️ Default settings initialized');
    
    // Show dashboard for new installs
    if (details.reason === 'install') {
        setTimeout(() => {
            chrome.tabs.create({
                url: chrome.runtime.getURL('dashboard.html')
            });
            console.log('📊 Dashboard opened');
        }, 1000);
    }
});

// Extension icon click
chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({
        url: chrome.runtime.getURL('dashboard.html')
    });
});

// Server health check
setInterval(async () => {
    try {
        const response = await fetch(`${SERVER_URL}/health`);
        if (response.ok) {
            console.log('🌐 Server health check: OK');
        }
    } catch (error) {
        console.log('🌐 Server health check: OFFLINE');
    }
}, 5 * 60 * 1000); // Every 5 minutes

console.log('🚀 Clify Render Edition loaded successfully!');
console.log('🌐 Server URL:', SERVER_URL);