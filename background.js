// background.js - COMPLETE v7.0.0 - FIXED
const VERSION = "7.0.0";

// Enhanced message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Clify: Background received message:', request.type);
    
    const handleAsync = async () => {
        try {
            if (request.type === "getEnhancedConfig") {
                return new Promise((resolve) => {
                    chrome.storage.sync.get(['Clify_enhanced_config'], (result) => {
                        resolve({ 
                            config: result.Clify_enhanced_config || getDefaultEnhancedConfig(),
                            success: true 
                        });
                    });
                });
            }
            
            if (request.type === "saveEnhancedConfig") {
                return new Promise((resolve) => {
                    chrome.storage.sync.set({ 
                        Clify_enhanced_config: request.config 
                    }, () => {
                        resolve({ success: true });
                    });
                });
            }
            
            if (["getBlockedVideos", "getKeywords", "getStats", "refreshStats", 
                 "saveKeywords", "unblockVideo", "clearAllVideos", "toggleShortsRemoval"].includes(request.type)) {
                
                return await handleYouTubeMessage(request);
            }

            return { success: false, error: 'Unknown message type: ' + request.type };
            
        } catch (error) {
            console.error('Clify: Message handler error:', error);
            return { 
                success: false, 
                error: error.message 
            };
        }
    };

    handleAsync().then(sendResponse);
    return true;
});

async function handleYouTubeMessage(request) {
    const maxRetries = 3;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const tabs = await new Promise(resolve => {
                chrome.tabs.query({url: "*://www.youtube.com/*"}, resolve);
            });
            
            if (tabs.length === 0) {
                return getFallbackResponse(request);
            }
            
            const targetTab = tabs.find(tab => tab.active) || tabs[0];
            
            return new Promise((resolve) => {
                chrome.tabs.sendMessage(targetTab.id, request, (response) => {
                    if (chrome.runtime.lastError) {
                        console.warn(`Clify: Attempt ${attempt + 1} failed:`, chrome.runtime.lastError);
                        resolve(null);
                    } else {
                        resolve(response);
                    }
                });
            });
            
        } catch (error) {
            console.warn(`Clify: YouTube message attempt ${attempt + 1} failed:`, error);
            if (attempt < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
            }
        }
    }
    
    return getFallbackResponse(request);
}

function getFallbackResponse(request) {
    const fallbacks = {
        "getBlockedVideos": { 
            blockedVideosMap: {},
            success: true 
        },
        "getKeywords": { 
            keywords: [],
            success: true 
        },
        "getStats": { 
            totalBlocks: 0,
            todayBlocks: 0,
            manualBlocks: 0,
            keywordBlocks: 0,
            shortsBlocks: 0,
            languageBlocks: 0,
            activeKeywords: 0,
            dailyActivity: {},
            success: true
        },
        "default": { 
            success: false, 
            error: "No YouTube tabs available" 
        }
    };
    
    return fallbacks[request.type] || fallbacks.default;
}

function getDefaultEnhancedConfig() {
    return {
        removeShorts: true,
        annotationRemoval: true,
        theaterMode: false,
        autoPlayNext: false,
        playbackSpeed: 1.0
    };
}

chrome.runtime.onInstalled.addListener((details) => {
    console.log('Clify v' + VERSION + ': Extension Installed/Updated');
    
    const defaults = {
        theme: "dark",
        lang: "en",
        keywords: [],
        Clify_enhanced_config: getDefaultEnhancedConfig()
    };
    
    // Initialize user ID serial counter if not exists
    chrome.storage.local.get(['last_user_id'], (result) => {
        if (result.last_user_id === undefined) {
            chrome.storage.local.set({ last_user_id: 0 });
            console.log('Clify: User ID counter initialized to 0');
        }
    });
    
    chrome.storage.sync.get(defaults, (data) => {
        const toSet = {};
        for (const key in defaults) {
            if (data[key] === undefined) {
                toSet[key] = defaults[key];
            }
        }
        
        if (Object.keys(toSet).length > 0) {
            chrome.storage.sync.set(toSet);
            console.log('Clify: Default settings initialized');
        }
    });
});

chrome.action.onClicked.addListener((tab) => {
    if (tab.url?.includes('youtube.com')) {
        chrome.tabs.sendMessage(tab.id, { type: "toggleQuickSettings" }, (response) => {
            if (chrome.runtime.lastError) {
                chrome.runtime.openOptionsPage();
            }
        });
    } else {
        chrome.runtime.openOptionsPage();
    }
});

console.log('Clify v' + VERSION + ': Background script loaded successfully');
