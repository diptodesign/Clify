// supabase-storage.js
class SupabaseStorage {
    constructor() {
        this.supabaseUrl = 'https://nzkuznagjyjqzyihcpno.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56a3V6bmFnanlqcXp5aWhjcG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMDY3NjUsImV4cCI6MjA3NDc4Mjc2NX0.RYrnylV4DzdcLaqe0-akLzu5qqlx2n0JDpl3A5L9Z_o';
        this.userId = this.getOrCreateUserId();
        this.isOnline = true;
    }

    getOrCreateUserId() {
        let userId = localStorage.getItem('zap_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('zap_user_id', userId);
        }
        return userId;
    }

    async makeRequest(endpoint, options = {}) {
        try {
            const url = `${this.supabaseUrl}/rest/v1${endpoint}`;
            console.log('Supabase Request:', url, options);
            
            const response = await fetch(url, {
                headers: {
                    'apikey': this.supabaseKey,
                    'Authorization': `Bearer ${this.supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log('Supabase Response:', data);
            return data;
        } catch (error) {
            console.error('Supabase request failed:', error);
            this.isOnline = false;
            throw error;
        }
    }

    // Blocked Videos Management
    async saveBlockedVideo(videoData) {
        try {
            console.log('Saving to Supabase:', videoData);
            
            const result = await this.makeRequest('/blocked_videos', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.userId,
                    video_id: videoData.id,
                    video_title: videoData.title,
                    reason: videoData.reason,
                    video_url: videoData.url,
                    created_at: new Date().toISOString()
                })
            });

            console.log('Save result:', result);
            
            // Update stats
            await this.updateStats(1);
            return true;
        } catch (error) {
            console.error('Failed to save blocked video to Supabase:', error);
            // Fallback to local storage
            return this.saveToLocalFallback(videoData);
        }
    }

    async getBlockedVideos(limit = 1000, offset = 0) {
        try {
            const data = await this.makeRequest(
                `/blocked_videos?user_id=eq.${this.userId}&order=created_at.desc&limit=${limit}&offset=${offset}`
            );
            
            console.log('Loaded from Supabase:', data.length, 'videos');
            
            return data.map(row => ({
                id: row.video_id,
                title: row.video_title,
                reason: row.reason,
                url: row.video_url,
                ts: new Date(row.created_at).getTime(),
                timestamp: row.created_at
            }));
        } catch (error) {
            console.error('Failed to load blocked videos from Supabase:', error);
            return this.loadFromLocalFallback();
        }
    }

    async getBlockedVideosCount() {
        try {
            const response = await fetch(
                `${this.supabaseUrl}/rest/v1/blocked_videos?user_id=eq.${this.userId}&select=count`,
                {
                    headers: {
                        'apikey': this.supabaseKey,
                        'Authorization': `Bearer ${this.supabaseKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (!response.ok) throw new Error('Count request failed');
            
            const data = await response.json();
            return data[0]?.count || 0;
        } catch (error) {
            console.error('Failed to get count from Supabase:', error);
            const localData = this.loadFromLocalFallback();
            return localData.length;
        }
    }

    async unblockVideo(videoId) {
        try {
            await this.makeRequest(`/blocked_videos?user_id=eq.${this.userId}&video_id=eq.${videoId}`, {
                method: 'DELETE'
            });

            // Update stats
            await this.updateStats(-1);
            return true;
        } catch (error) {
            console.error('Failed to unblock video in Supabase:', error);
            return this.removeFromLocalFallback(videoId);
        }
    }

    // Stats Management
    async updateStats(change = 0) {
        try {
            const today = new Date().toISOString().slice(0, 10);
            
            // Get current stats
            const currentStats = await this.getStats();
            const newTotal = Math.max(0, (currentStats.total_blocks || 0) + change);
            const dailyStats = currentStats.daily_stats || {};
            
            // Update today's count
            if (change > 0) {
                dailyStats[today] = (dailyStats[today] || 0) + 1;
            }
            
            // Upsert to Supabase
            await this.makeRequest('/user_stats', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.userId,
                    total_blocks: newTotal,
                    daily_stats: dailyStats,
                    updated_at: new Date().toISOString()
                })
            });

            // Also update chrome.storage for quick access
            chrome.storage.sync.set({
                totalBlocks: newTotal,
                zapStats: dailyStats
            });

            console.log('Stats updated:', { total: newTotal, today: dailyStats[today] });

        } catch (error) {
            console.error('Failed to update stats in Supabase:', error);
        }
    }

    async getStats() {
        try {
            const data = await this.makeRequest(`/user_stats?user_id=eq.${this.userId}`);
            return data.length > 0 ? data[0] : { total_blocks: 0, daily_stats: {} };
        } catch (error) {
            console.error('Failed to get stats from Supabase:', error);
            return { total_blocks: 0, daily_stats: {} };
        }
    }

    // Keywords Management
    async saveKeywords(keywords) {
        try {
            await this.makeRequest('/user_stats', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: this.userId,
                    keywords: keywords,
                    updated_at: new Date().toISOString()
                })
            });
            return true;
        } catch (error) {
            console.error('Failed to save keywords to Supabase:', error);
            return this.saveKeywordsToLocal(keywords);
        }
    }

    async getKeywords() {
        try {
            const data = await this.makeRequest(`/user_stats?user_id=eq.${this.userId}&select=keywords`);
            return data.length > 0 ? (data[0].keywords || []) : [];
        } catch (error) {
            console.error('Failed to get keywords from Supabase:', error);
            return this.getKeywordsFromLocal();
        }
    }

    // Local Storage Fallback Methods
    saveToLocalFallback(videoData) {
        try {
            const key = `zap_blocked_${this.userId}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            
            // Avoid duplicates
            if (!existing.find(v => v.id === videoData.id)) {
                existing.push({
                    ...videoData,
                    ts: Date.now(),
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem(key, JSON.stringify(existing));
                console.log('Saved to local fallback:', videoData.id);
            }
            
            return true;
        } catch (error) {
            console.error('Local fallback failed:', error);
            return false;
        }
    }

    loadFromLocalFallback() {
        try {
            const key = `zap_blocked_${this.userId}`;
            const data = JSON.parse(localStorage.getItem(key) || '[]');
            console.log('Loaded from local fallback:', data.length, 'videos');
            return data;
        } catch (error) {
            return [];
        }
    }

    removeFromLocalFallback(videoId) {
        try {
            const key = `zap_blocked_${this.userId}`;
            const existing = JSON.parse(localStorage.getItem(key) || '[]');
            const filtered = existing.filter(v => v.id !== videoId);
            localStorage.setItem(key, JSON.stringify(filtered));
            console.log('Removed from local fallback:', videoId);
            return true;
        } catch (error) {
            return false;
        }
    }

    saveKeywordsToLocal(keywords) {
        try {
            const key = `zap_keywords_${this.userId}`;
            localStorage.setItem(key, JSON.stringify(keywords));
            return true;
        } catch (error) {
            return false;
        }
    }

    getKeywordsFromLocal() {
        try {
            const key = `zap_keywords_${this.userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        } catch (error) {
            return [];
        }
    }

    // Sync local data to Supabase when online
    async syncLocalToSupabase() {
        if (!this.isOnline) return;

        try {
            const localVideos = this.loadFromLocalFallback();
            console.log('Syncing local videos to Supabase:', localVideos.length);
            
            for (const video of localVideos) {
                await this.saveBlockedVideo(video);
            }

            // Clear local storage after successful sync
            localStorage.removeItem(`zap_blocked_${this.userId}`);
            console.log('Local data synced to Supabase');
            
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }

    // Test connection
    async testConnection() {
        try {
            console.log('Testing Supabase connection...');
            const result = await this.makeRequest('/blocked_videos?limit=1');
            console.log('✅ Supabase connection successful!');
            return true;
        } catch (error) {
            console.error('❌ Supabase connection failed:', error);
            return false;
        }
    }
}

// Create global instance
const supabaseStorage = new SupabaseStorage();

// Create global instance ONLY if we're not in background script
if (typeof importScripts === 'undefined') {
    // This runs in content scripts and dashboard
    const supabaseStorage = new SupabaseStorage();
} else {
    // This runs in background script - we'll create instance manually
    // The class is available globally now
}