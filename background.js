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
