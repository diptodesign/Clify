<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clify - YouTube Blocker & Enhancer</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #c1f11d;
            --primary-dark: #a0d116;
            --bg-primary: #0A0F1C;
            --bg-secondary: #13182B;
            --text-primary: #FFFFFF;
            --text-secondary: #B0B7C3;
            --accent: #4caf50;
            --warning: #ff9800;
            --danger: #f44336;
            --info: #2196f3;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 0;
            margin: 0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        .header {
            background: var(--bg-secondary);
            padding: 40px 0;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 40px;
        }

        .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            margin-bottom: 16px;
        }

        .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            color: #0A0F1C;
        }

        .logo-text {
            font-size: 48px;
            font-weight: 900;
            background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .tagline {
            font-size: 20px;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto;
        }

        /* Sections */
        .section {
            margin-bottom: 60px;
            padding: 40px;
            background: var(--bg-secondary);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
        }

        .section-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #0A0F1C;
        }

        .section-title {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--text-primary), var(--text-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Feature Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 24px;
            margin-top: 32px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            transition: all 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-4px);
            border-color: var(--primary);
            box-shadow: 0 8px 32px rgba(193, 241, 29, 0.2);
        }

        .feature-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: #0A0F1C;
        }

        .feature-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .feature-description {
            color: var(--text-secondary);
            line-height: 1.6;
        }

        /* Steps */
        .steps {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 24px;
        }

        .step {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
        }

        .step-number {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #0A0F1C;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .step-description {
            color: var(--text-secondary);
        }

        /* Code blocks */
        .code-block {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 16px;
            margin: 16px 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 14px;
            color: var(--text-secondary);
            overflow-x: auto;
        }

        /* Badges */
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: #0A0F1C;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            margin: 4px;
        }

        .badge.warning {
            background: linear-gradient(135deg, var(--warning), #ff9800);
            color: white;
        }

        .badge.danger {
            background: linear-gradient(135deg, var(--danger), #D2366A);
            color: white;
        }

        .badge.info {
            background: linear-gradient(135deg, var(--info), #2196f3);
            color: white;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 40px 0;
            margin-top: 60px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--text-secondary);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .header {
                padding: 30px 0;
            }

            .logo-text {
                font-size: 36px;
            }

            .section {
                padding: 24px;
                margin-bottom: 40px;
            }

            .section-title {
                font-size: 24px;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="logo-text">Clify</div>
            </div>
            <p class="tagline">Take control of your YouTube experience by blocking unwanted content automatically</p>
        </header>

        <!-- Features Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-star"></i>
                </div>
                <h2 class="section-title">Key Features</h2>
            </div>

            <div class="features-grid">
                <!-- Content Blocking -->
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3 class="feature-title">Content Blocking</h3>
                    </div>
                    <p class="feature-description">
                        <strong>Automatic Keyword Blocking:</strong> Block videos containing specific keywords or phrases<br>
                        <strong>Manual Blocking:</strong> One-click blocking of individual videos<br>
                        <strong>Shorts Removal:</strong> Automatically remove YouTube Shorts<br>
                        <strong>Multi-language Support:</strong> Supports keywords in multiple languages
                    </p>
                </div>

                <!-- Enhanced Experience -->
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <h3 class="feature-title">Enhanced Experience</h3>
                    </div>
                    <p class="feature-description">
                        <strong>Smart Shorts Detection:</strong> Advanced detection and removal<br>
                        <strong>Annotation Removal:</strong> Remove annotations and info cards<br>
                        <strong>uBlock Integration:</strong> Seamless ad blocking integration<br>
                        <strong>Playback Controls:</strong> Customize speed and settings
                    </p>
                </div>

                <!-- Analytics -->
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <h3 class="feature-title">Analytics & Management</h3>
                    </div>
                    <p class="feature-description">
                        <strong>Dashboard:</strong> Comprehensive statistics tracking<br>
                        <strong>Search & Filter:</strong> Advanced video management<br>
                        <strong>Export Data:</strong> Backup your blocked videos<br>
                        <strong>Capacity Management:</strong> Monitor storage usage
                    </p>
                </div>

                <!-- Multi-language -->
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-globe"></i>
                        </div>
                        <h3 class="feature-title">Multi-language Support</h3>
                    </div>
                    <p class="feature-description">
                        <strong>12 Languages:</strong> English, Español, Français, Deutsch, हिन्दी, 日本語, 한국어, Português, العربية, বাংলা, Русский, 中文<br>
                        <strong>Localized Interface:</strong> Complete translation<br>
                        <strong>Multi-language Keywords:</strong> Support for international content blocking
                    </p>
                </div>
            </div>
        </section>

        <!-- Installation Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-download"></i>
                </div>
                <h2 class="section-title">Installation</h2>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3 class="step-title">Chrome Web Store</h3>
                        <p class="step-description">
                            Visit the Chrome Web Store, search for "Clify - YouTube Blocker", and click "Add to Chrome"
                        </p>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3 class="step-title">Manual Installation</h3>
                        <p class="step-description">
                            Download the extension files, enable Developer mode in Chrome, and load the unpacked extension
                        </p>
                        <div class="code-block">
                            chrome://extensions/ → Enable "Developer mode" → "Load unpacked"
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Usage Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-play"></i>
                </div>
                <h2 class="section-title">How to Use</h2>
            </div>

            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3 class="step-title">Basic Blocking</h3>
                        <p class="step-description">
                            <strong>Manual Blocking:</strong> Click the "HIDE" button on YouTube video thumbnails<br>
                            <strong>Keyword Blocking:</strong> Add keywords in the Keywords tab for automatic blocking<br>
                            <strong>Shorts Removal:</strong> Toggle Shorts removal in the Clify Extra tab
                        </p>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3 class="step-title">Dashboard Features</h3>
                        <p class="step-description">
                            <strong>Dashboard Tab:</strong> View statistics and recent activity<br>
                            <strong>Blocked Videos Tab:</strong> Manage videos with advanced search<br>
                            <strong>Keywords Tab:</strong> Add and manage blocking keywords<br>
                            <strong>Clify Extra Tab:</strong> Enhanced features and settings<br>
                            <strong>Support Tab:</strong> Get help and contact support
                        </p>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3 class="step-title">Advanced Features</h3>
                        <p class="step-description">
                            <strong>Multi-language Keywords:</strong> Use pipe | for synonyms: <span class="badge">movie|فيلم|फिल्म|সিনেমা</span><br>
                            <strong>Quick Actions:</strong> Use the floating action button for quick access<br>
                            <strong>Export/Import:</strong> Backup your blocked videos and settings<br>
                            <strong>Theme Support:</strong> Switch between dark and light themes
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Configuration Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-cog"></i>
                </div>
                <h2 class="section-title">Configuration</h2>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-sliders-h"></i>
                        </div>
                        <h3 class="feature-title">Enhanced Settings</h3>
                    </div>
                    <p class="feature-description">
                        • Shorts Removal: Toggle automatic Shorts removal<br>
                        • Annotation Removal: Remove video annotations and cards<br>
                        • Playback Speed: Customize video playback speed<br>
                        • Theater Mode: Always use theater mode<br>
                        • Auto-play: Disable auto-play next video
                    </p>
                </div>

                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <h3 class="feature-title">Storage Management</h3>
                    </div>
                    <p class="feature-description">
                        • Capacity Monitoring: Track blocked videos storage (5000 limit)<br>
                        • Clear All: Remove all blocked videos when needed<br>
                        • Export Data: Backup your blocking data<br>
                        • Import Data: Restore from backup files
                    </p>
                </div>
            </div>
        </section>

        <!-- Technical Details -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <h2 class="section-title">Technical Details</h2>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-chrome"></i>
                        </div>
                        <h3 class="feature-title">Browser Support</h3>
                    </div>
                    <p class="feature-description">
                        • Google Chrome (recommended)<br>
                        • Microsoft Edge<br>
                        • Other Chromium-based browsers
                    </p>
                </div>

                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h3 class="feature-title">Permissions</h3>
                    </div>
                    <p class="feature-description">
                        • Storage: Save preferences and blocked videos<br>
                        • YouTube Access: Modify YouTube page content<br>
                        • Notifications: Show system notifications<br>
                        • Telegram API: For support messages (optional)
                    </p>
                </div>

                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-user-secret"></i>
                        </div>
                        <h3 class="feature-title">Privacy</h3>
                    </div>
                    <p class="feature-description">
                        • Local Processing: All blocking happens locally<br>
                        • No Data Collection: No personal data sent to servers<br>
                        • Optional Telemetry: Support messages are optional<br>
                        • Open Source: Transparent codebase
                    </p>
                </div>
            </div>
        </section>

        <!-- Support Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-life-ring"></i>
                </div>
                <h2 class="section-title">Support & Troubleshooting</h2>
            </div>

            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-question-circle"></i>
                        </div>
                        <h3 class="feature-title">Getting Help</h3>
                    </div>
                    <p class="feature-description">
                        • In-app Support: Use the Support tab in the extension<br>
                        • Documentation: Comprehensive help resources<br>
                        • Telegram Channel: Join @Clifybydd for updates<br>
                        • Community: Active user community
                    </p>
                </div>

                <div class="feature-card">
                    <div class="feature-header">
                        <div class="feature-icon">
                            <i class="fas fa-tools"></i>
                        </div>
                        <h3 class="feature-title">Troubleshooting</h3>
                    </div>
                    <p class="feature-description">
                        • Refresh Data: Use refresh button if data seems outdated<br>
                        • Clear Cache: Use "Clear All" if experiencing issues<br>
                        • Reinstall: As last resort, reinstall the extension<br>
                        • Check Console: For technical issues, check browser console
                    </p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <p><strong>Clify - YouTube Content Blocker</strong></p>
            <p>Made with ❤️ for a focused YouTube experience</p>
            <p style="margin-top: 16px; font-size: 14px; opacity: 0.7;">
                Copyright © 2025 Clify - YouTube Content Blocker. All rights reserved.<br>
                This extension is not affiliated with YouTube or Google.
            </p>
        </footer>
    </div>
</body>
</html>
