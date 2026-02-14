// keep-alive.js - Prevent Render from sleeping
const SERVER_URL = "https://clifyz.onrender.com";

// Ping server every 10 minutes (less than 15)
async function pingServer() {
    try {
        console.log('🔄 Pinging server to keep alive...');
        const response = await fetch(`${SERVER_URL}/ping`);
        if (response.ok) {
            console.log('✅ Server ping successful');
        }
    } catch (error) {
        console.warn('⚠️ Server ping failed:', error.message);
    }
}

// Initial ping
setTimeout(pingServer, 30000); // Wait 30 seconds after load

// Regular pings every 10 minutes
setInterval(pingServer, 10 * 60 * 1000);

// Ping when browser is active
chrome.runtime.onStartup.addListener(() => {
    setTimeout(pingServer, 10000);
});

// Ping when any tab is activated
chrome.tabs.onActivated.addListener(() => {
    setTimeout(pingServer, 5000);
});