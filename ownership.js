// ownership.js - IRREMOVABLE ATTRIBUTION SYSTEM
(function() {
    'use strict';
    
    // Multi-layered encoded ownership (can't remove without breaking)
    const OWNER_VERIFICATION = {
        // Base64 encoded official info
        d: "RGlwdG9EZXNpZ25TdGRAZ21haWwuY29t", // "DiptoDesignStd@gmail.com"
        w: "aHR0cHM6Ly9kaXB0b2Rlc2lnbi5naXRodWIuaW8vY2xpZnlkbA==", // "https://diptodesign.github.io/clifydl/"
        y: "MjAyNg==", // "2026"
        t: "Q0xJRlkgdjcuMC4wIE9mZmljaWFs", // "CLIFY v7.0.0 Official"
        s: "RGlwdG8gRGVzaWduIFN0dWRpbw==" // "Dipto Design Studio"
    };
    
    // Self-validating system
    function validateOwnership() {
        try {
            // Decode and verify
            const dev = atob(OWNER_VERIFICATION.s);
            const email = atob(OWNER_VERIFICATION.d);
            const site = atob(OWNER_VERIFICATION.w);
            
            // Create invisible but persistent attribution
            if (!document.querySelector('[data-clify-official="true"]')) {
                const attr = document.createElement('div');
                attr.setAttribute('data-clify-official', 'true');
                attr.setAttribute('data-developer', dev);
                attr.setAttribute('data-email', email);
                attr.setAttribute('data-site', site);
                attr.style.cssText = 'position:fixed;bottom:0;right:0;font-size:1px;opacity:0.01;z-index:-99999;pointer-events:none;';
                attr.textContent = `Clify ©${atob(OWNER_VERIFICATION.y)} ${dev}`;
                document.body.appendChild(attr);
            }
            
            // Console watermark (impossible to remove)
            console.log(`%c
╔═══════════════════════════════════════╗
║        🔒 CLIFY OFFICIAL v7.0.0       ║
║    Developed by: Dipto Design Studio  ║
║     Email: DiptoDesignStd@gmail.com   ║
║  Website: diptodesign.github.io/clifydl║
║     © 2026 - All Rights Reserved      ║
╚═══════════════════════════════════════╝`, 
                'color: #c1f11d; font-family: monospace;'
            );
            
            // Periodic integrity check
            setInterval(() => {
                if (!document.querySelector('[data-clify-official="true"]')) {
                    // Someone removed attribution - restore and warn
                    validateOwnership();
                    console.warn('⚠️ UNAUTHORIZED: Attribution removed. Official copy required.');
                    console.warn('📧 Contact: DiptoDesignStd@gmail.com for official version');
                }
            }, 3000);
            
            return true;
            
        } catch (error) {
            // Tampering detected
            console.error('❌ CLIFY INTEGRITY CHECK FAILED');
            console.error('👮 Official Developer: Dipto Design Studio');
            console.error('📧 Contact: DiptoDesignStd@gmail.com');
            console.error('🌐 Website: https://diptodesign.github.io/clifydl/');
            return false;
        }
    }
    
    // Initialize protection
    validateOwnership();
    
    // Global lock to prevent modification
    window.__clifyOfficial = Object.freeze({
        developer: 'Dipto Design Studio',
        email: 'DiptoDesignStd@gmail.com',
        website: 'https://diptodesign.github.io/clifydl/',
        version: '7.0.0',
        copyright: '© 2026 Dipto Design Studio',
        verify: function() { return validateOwnership(); }
    });
    
})();