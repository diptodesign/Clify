// dashboard.js - COMPLETE WITH INLINE KEYWORD BADGES v7.0.0

const VERSION = "v7.0.0";

// Telegram Bot Configuration - UPDATED CHANNELS
const TELEGRAM_CONFIG = {
    botToken: '8212863269:AAHPgozAhRbZdv1r_WoNV9KasvZr8_fQKZU',
    storageChannelId: '-1003293692757',
    supportChannelId: '-1003070250785',      // Support messages go here
    adminChannelId: '-1003464260094',        // Alerts & notifications go here
    publicChannel: '@Clifybydd',
    apiUrl: 'https://api.telegram.org/bot'
};

// COMPLETE TRANSLATIONS FOR 35 LANGUAGES
const TRANSLATIONS = {
    en: {
        'welcome-title': 'Welcome to Clify! ⚡',
        'welcome-subtitle': 'Take control of your YouTube experience by blocking unwanted content automatically',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Blocked Videos',
        'tab-keywords': 'Keywords',
        'tab-support': 'Support',
        'refresh-text': 'Refresh',
        'theme-text': 'Theme',
        'stat-today': 'Today\'s Blocks',
        'stat-total': 'Total Blocked',
        'stat-efficiency': 'Efficiency',
        'activity-title': 'Blocking Activity',
        'activity-subtitle': 'Last 30 days',
        'stat-keywords': 'Active Keywords',
        'stat-manual': 'Manual Blocks',
        'stat-auto': 'Auto Blocks',
        'stat-shorts': 'Shorts Blocked',
        'stat-lang': 'Language Blocks',
        'recent-title': 'Recently Blocked',
        'view-all-btn': 'View All',
        'blocked-title': 'Blocked Videos',
        'blocked-subtitle': 'Manage all videos you\'ve blocked from your YouTube feed',
        'col-title': 'Video Title',
        'col-id': 'Video ID',
        'col-reason': 'Reason',
        'col-date': 'Date Blocked',
        'col-actions': 'Actions',
        'filter-all': 'All Reasons',
        'filter-manual': 'Manual Block',
        'filter-keyword': 'Keyword Match',
        'filter-shorts': 'Shorts',
        'filter-language': 'Language',
        'sort-newest': 'Newest First',
        'sort-oldest': 'Oldest First',
        'sort-title': 'Title A-Z',
        'export-btn': 'Export',
        'clear-all-btn': 'Clear All',
        'loading-text': 'Loading your blocked videos...',
        'empty-title': 'No videos blocked yet',
        'empty-subtitle': 'Start cleaning up your YouTube experience by blocking unwanted videos',
        'empty-action': 'Add Keywords for Auto-Blocking',
        'keywords-title': 'Keyword Manager',
        'keywords-subtitle': 'Automatically block videos containing specific keywords or phrases',
        'save-keywords': 'Save Keywords',
        'clear-keywords': 'Clear All',
        'keywords-count-label': 'Keywords Count:',
        'keywords-format-label': 'Format:',
        'help-title': 'How to use keywords',
        'help-line1': 'Enter one keyword per line or separate with commas',
        'help-line2': 'Use specific phrases for better accuracy',
        'help-line3': 'Keywords are case-insensitive',
        'help-line4': 'Supports multiple languages: English, Arabic, Hindi, Bangla, etc.',
        'help-line5': 'Use pipe | for synonyms: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximum 5000 keywords supported',
        'support-title': 'Support & Help',
        'support-subtitle': 'Get help, report issues, and learn how to use Clify effectively',
        'contact-title': 'Contact Support',
        'contact-subtitle': 'Having issues or suggestions? We\'re here to help you get the most out of Clify.',
        'name-label': 'Your Name *',
        'email-label': 'Your Email *',
        'category-label': 'Issue Category *',
        'category-bug': 'Bug Report',
        'category-feature': 'Feature Request',
        'category-help': 'Help Needed',
        'category-suggestion': 'Suggestion',
        'category-other': 'Other',
        'message-label': 'Your Message *',
        'send-message': 'Send Message',
        'sending-message': 'Sending...',
        'resources-title': 'Help Resources',
        'resource-faq': 'FAQ & Troubleshooting',
        'resource-faq-desc': 'Common questions and solutions',
        'resource-guide': 'User Guide',
        'resource-guide-desc': 'Learn how to use all features',
        'resource-bugs': 'Report Bugs',
        'resource-bugs-desc': 'Found an issue? Let us know',
        'resource-features': 'Suggest Features',
        'resource-features-desc': 'Share your ideas for improvement',
        'about-title': 'About Clify',
        'version-text': 'Version:',
        'about-description': 'Clify helps you stay focused by hiding distracting YouTube content. It works locally in your browser and respects your privacy - no data is sent to external servers.',
        'feature-privacy': 'Privacy First',
        'feature-fast': 'Lightning Fast',
        'feature-realtime': 'Real-time Blocking',
        'footer-made': 'Made with ❤️ for a focused YouTube experience',
        'validation-required': 'Please fill in all required fields.',
        'validation-message-length': 'Please provide a more detailed message (at least 10 characters).',
        'contact-success-telegram': 'Thank you! Your message has been sent to our support team via Telegram. We will get back to you soon.',
        'contact-success-local': 'Thank you! Your message has been saved. We will review it when connected to the internet.',
        'contact-error': 'Sorry, there was an error sending your message. Please try again later or contact us directly.',
        'capacity-text': 'Your Storage',
        'capacity-normal': 'Your storage is looking great! Keep blocking those annoying videos. 😊',
        'capacity-warning': 'Heads up! Storage getting full ({percent}%) 📦',
        'capacity-critical': 'Alert! Storage full ({percent}%) 🚨',
        'capacity-full': 'Hey! Your storage is completely full. You need to clear some videos to block new ones. 🚨',
        'capacity-warning-full': 'Heads up! Storage nearly full ({percent}%) - consider clearing some videos',
        'telegram-connected': 'Connected to Telegram',
        'telegram-disconnected': 'Telegram Disconnected',
        'telegram-message-sent': 'Telegram connection test successful!',
        'test-success': 'Test Successful',
        'test-failed': 'Test Failed',
        'days-ago': 'days ago',
        'hours-ago': 'hours ago',
        'minutes-ago': 'minutes ago',
        'just-now': 'Just now',
        'results-text': 'videos'
    },
   es: {
        'welcome-title': '¡Bienvenido a Clify! ⚡',
        'welcome-subtitle': 'Toma el control de tu experiencia en YouTube bloqueando contenido no deseado automáticamente',
        'tab-dash': 'Panel',
        'tab-blocked': 'Videos Bloqueados',
        'tab-keywords': 'Palabras Clave',
        'tab-support': 'Soporte',
        'refresh-text': 'Actualizar',
        'theme-text': 'Tema',
        'stat-today': 'Bloqueos de Hoy',
        'stat-total': 'Total Bloqueados',
        'stat-efficiency': 'Eficiencia',
        'activity-title': 'Actividad de Bloqueo',
        'activity-subtitle': 'Últimos 30 días',
        'stat-keywords': 'Palabras Clave Activas',
        'stat-manual': 'Bloqueos Manuales',
        'stat-auto': 'Bloqueos Automáticos',
        'stat-shorts': 'Shorts Bloqueados',
        'stat-lang': 'Bloqueos por Idioma',
        'recent-title': 'Recientemente Bloqueados',
        'view-all-btn': 'Ver Todos',
        'blocked-title': 'Videos Bloqueados',
        'blocked-subtitle': 'Gestiona todos los videos que has bloqueado de tu feed de YouTube',
        'col-title': 'Título del Video',
        'col-id': 'ID del Video',
        'col-reason': 'Razón',
        'col-date': 'Fecha Bloqueado',
        'col-actions': 'Acciones',
        'filter-all': 'Todas las Razones',
        'filter-manual': 'Bloqueo Manual',
        'filter-keyword': 'Coincidencia de Palabra Clave',
        'filter-shorts': 'Shorts',
        'filter-language': 'Idioma',
        'sort-newest': 'Más Recientes Primero',
        'sort-oldest': 'Más Antiguos Primero',
        'sort-title': 'Título A-Z',
        'export-btn': 'Exportar',
        'clear-all-btn': 'Limpiar Todo',
        'loading-text': 'Cargando tus videos bloqueados...',
        'empty-title': 'Aún no hay videos bloqueados',
        'empty-subtitle': 'Comienza a limpiar tu experiencia en YouTube bloqueando videos no deseados',
        'empty-action': 'Agregar Palabras Clave para Bloqueo Automático',
        'keywords-title': 'Administrador de Palabras Clave',
        'keywords-subtitle': 'Bloquea automáticamente videos que contengan palabras clave o frases específicas',
        'save-keywords': 'Guardar Palabras Clave',
        'clear-keywords': 'Limpiar Todo',
        'keywords-count-label': 'Conteo de Palabras Clave:',
        'keywords-format-label': 'Formato:',
        'help-title': 'Cómo usar palabras clave',
        'help-line1': 'Ingresa una palabra clave por línea o separa con comas',
        'help-line2': 'Usa frases específicas para mejor precisión',
        'help-line3': 'Las palabras clave no distinguen mayúsculas y minúsculas',
        'help-line4': 'Soporta múltiples idiomas: Español, Inglés, Árabe, Hindi, Bangla, etc.',
        'help-line5': 'Usa pipe | para sinónimos: película|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Máximo 5000 palabras clave soportadas',
        'support-title': 'Soporte y Ayuda',
        'support-subtitle': 'Obtén ayuda, reporta problemas y aprende a usar Clify efectivamente',
        'contact-title': 'Contactar Soporte',
        'contact-subtitle': '¿Tienes problemas o sugerencias? Estamos aquí para ayudarte a sacar el máximo provecho de Clify.',
        'name-label': 'Tu Nombre *',
        'email-label': 'Tu Email *',
        'category-label': 'Categoría del Problema *',
        'category-bug': 'Reporte de Error',
        'category-feature': 'Solicitud de Función',
        'category-help': 'Necesito Ayuda',
        'category-suggestion': 'Sugerencia',
        'category-other': 'Otro',
        'message-label': 'Tu Mensaje *',
        'send-message': 'Enviar Mensaje',
        'sending-message': 'Enviando...',
        'resources-title': 'Recursos de Ayuda',
        'resource-faq': 'Preguntas Frecuentes',
        'resource-faq-desc': 'Preguntas comunes y soluciones',
        'resource-guide': 'Guía de Usuario',
        'resource-guide-desc': 'Aprende a usar todas las funciones',
        'resource-bugs': 'Reportar Errores',
        'resource-bugs-desc': '¿Encontraste un problema? Háznoslo saber',
        'resource-features': 'Sugerir Funciones',
        'resource-features-desc': 'Comparte tus ideas para mejorar',
        'about-title': 'Acerca de Clify',
        'version-text': 'Versión:',
        'about-description': 'Clify te ayuda a mantenerte enfocado ocultando contenido distractivo de YouTube. Funciona localmente en tu navegador y respeta tu privacidad - no se envían datos a servidores externos.',
        'feature-privacy': 'Privacidad Primero',
        'feature-fast': 'Súper Rápido',
        'feature-realtime': 'Bloqueo en Tiempo Real',
        'footer-made': 'Hecho con ❤️ para una experiencia enfocada en YouTube'
    },
    fr: {
        'welcome-title': 'Bienvenue sur Clify ! ⚡',
        'welcome-subtitle': 'Prenez le contrôle de votre expérience YouTube en bloquant automatiquement le contenu indésirable',
        'tab-dash': 'Tableau de Bord',
        'tab-blocked': 'Vidéos Bloquées',
        'tab-keywords': 'Mots Clés',
        'tab-support': 'Support',
        'refresh-text': 'Actualiser',
        'theme-text': 'Thème',
        'stat-today': 'Blocages Aujourd\'hui',
        'stat-total': 'Total Bloqués',
        'stat-efficiency': 'Efficacité',
        'activity-title': 'Activité de Blocage',
        'activity-subtitle': '30 derniers jours',
        'stat-keywords': 'Mots Clés Actifs',
        'stat-manual': 'Blocages Manuels',
        'stat-auto': 'Blocages Auto',
        'stat-shorts': 'Shorts Bloqués',
        'stat-lang': 'Blocages Langue',
        'recent-title': 'Récemment Bloqués',
        'view-all-btn': 'Voir Tout',
        'blocked-title': 'Vidéos Bloquées',
        'blocked-subtitle': 'Gérez toutes les vidéos que vous avez bloquées de votre flux YouTube',
        'col-title': 'Titre de la Vidéo',
        'col-id': 'ID de la Vidéo',
        'col-reason': 'Raison',
        'col-date': 'Date Bloquée',
        'col-actions': 'Actions',
        'filter-all': 'Toutes les Raisons',
        'filter-manual': 'Blocage Manuel',
        'filter-keyword': 'Correspondance Mot Clé',
        'filter-shorts': 'Shorts',
        'filter-language': 'Langue',
        'sort-newest': 'Plus Récent',
        'sort-oldest': 'Plus Ancien',
        'sort-title': 'Titre A-Z',
        'export-btn': 'Exporter',
        'clear-all-btn': 'Tout Effacer',
        'loading-text': 'Chargement de vos vidéos bloquées...',
        'empty-title': 'Aucune vidéo bloquée pour l\'instant',
        'empty-subtitle': 'Commencez à nettoyer votre expérience YouTube en bloquant les vidéos indésirables',
        'empty-action': 'Ajouter des Mots Clés pour le Blocage Auto',
        'keywords-title': 'Gestionnaire de Mots Clés',
        'keywords-subtitle': 'Bloquez automatiquement les vidéos contenant des mots clés ou phrases spécifiques',
        'save-keywords': 'Sauvegarder Mots Clés',
        'clear-keywords': 'Tout Effacer',
        'keywords-count-label': 'Nombre de Mots Clés:',
        'keywords-format-label': 'Format:',
        'help-title': 'Comment utiliser les mots clés',
        'help-line1': 'Entrez un mot clé par ligne ou séparez par des virgules',
        'help-line2': 'Utilisez des phrases spécifiques pour plus de précision',
        'help-line3': 'Les mots clés ne sont pas sensibles à la casse',
        'help-line4': 'Supporte plusieurs langues: Français, Anglais, Arabe, Hindi, Bangla, etc.',
        'help-line5': 'Utilisez pipe | pour les synonymes: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximum 5000 mots clés supportés',
        'support-title': 'Support & Aide',
        'support-subtitle': 'Obtenez de l\'aide, signalez des problèmes et apprenez à utiliser Clify efficacement',
        'contact-title': 'Contacter le Support',
        'contact-subtitle': 'Des problèmes ou suggestions ? Nous sommes là pour vous aider à tirer le meilleur parti de Clify.',
        'name-label': 'Votre Nom *',
        'email-label': 'Votre Email *',
        'category-label': 'Catégorie du Problème *',
        'category-bug': 'Rapport de Bug',
        'category-feature': 'Demande de Fonctionnalité',
        'category-help': 'Aide Nécessaire',
        'category-suggestion': 'Suggestion',
        'category-other': 'Autre',
        'message-label': 'Votre Message *',
        'send-message': 'Envoyer Message',
        'sending-message': 'Envoi en cours...',
        'resources-title': 'Ressources d\'Aide',
        'resource-faq': 'FAQ & Dépannage',
        'resource-faq-desc': 'Questions courantes et solutions',
        'resource-guide': 'Guide Utilisateur',
        'resource-guide-desc': 'Apprenez à utiliser toutes les fonctionnalités',
        'resource-bugs': 'Signaler des Bugs',
        'resource-bugs-desc': 'Trouvé un problème ? Faites-le nous savoir',
        'resource-features': 'Suggérer des Fonctionnalités',
        'resource-features-desc': 'Partagez vos idées d\'amélioration',
        'about-title': 'À Propos de Clify',
        'version-text': 'Version:',
        'about-description': 'Clify vous aide à rester concentré en masquant le contenu YouTube distrayant. Il fonctionne localement dans votre navigateur et respecte votre vie privée - aucune donnée n\'est envoyée à des serveurs externes.',
        'feature-privacy': 'Confidentialité d\'Abord',
        'feature-fast': 'Ultra Rapide',
        'feature-realtime': 'Blocage en Temps Réel',
        'footer-made': 'Fait avec ❤️ pour une expérience YouTube concentrée'
    },
    de: {
        'welcome-title': 'Willkommen bei Clify! ⚡',
        'welcome-subtitle': 'Übernehmen Sie die Kontrolle über Ihre YouTube-Erfahrung, indem Sie unerwünschte Inhalte automatisch blockieren',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Blockierte Videos',
        'tab-keywords': 'Schlüsselwörter',
        'tab-support': 'Support',
        'refresh-text': 'Aktualisieren',
        'theme-text': 'Thema',
        'stat-today': 'Heutige Blocks',
        'stat-total': 'Gesamt Blockiert',
        'stat-efficiency': 'Effizienz',
        'activity-title': 'Blockieraktivität',
        'activity-subtitle': 'Letzte 30 Tage',
        'stat-keywords': 'Aktive Schlüsselwörter',
        'stat-manual': 'Manuelle Blocks',
        'stat-auto': 'Auto Blocks',
        'stat-shorts': 'Shorts Blockiert',
        'stat-lang': 'Sprachblocks',
        'recent-title': 'Kürzlich Blockiert',
        'view-all-btn': 'Alle Anzeigen',
        'blocked-title': 'Blockierte Videos',
        'blocked-subtitle': 'Verwalten Sie alle Videos, die Sie von Ihrem YouTube-Feed blockiert haben',
        'col-title': 'Video-Titel',
        'col-id': 'Video-ID',
        'col-reason': 'Grund',
        'col-date': 'Blockiert am',
        'col-actions': 'Aktionen',
        'filter-all': 'Alle Gründe',
        'filter-manual': 'Manuelle Blockierung',
        'filter-keyword': 'Schlüsselwort-Treffer',
        'filter-shorts': 'Shorts',
        'filter-language': 'Sprache',
        'sort-newest': 'Neueste zuerst',
        'sort-oldest': 'Älteste zuerst',
        'sort-title': 'Titel A-Z',
        'export-btn': 'Exportieren',
        'clear-all-btn': 'Alle Löschen',
        'loading-text': 'Lade Ihre blockierten Videos...',
        'empty-title': 'Noch keine Videos blockiert',
        'empty-subtitle': 'Beginnen Sie mit dem Bereinigen Ihrer YouTube-Erfahrung, indem Sie unerwünschte Videos blockieren',
        'empty-action': 'Schlüsselwörter für Auto-Blockierung hinzufügen',
        'keywords-title': 'Schlüsselwort-Manager',
        'keywords-subtitle': 'Blockieren Sie automatisch Videos, die bestimmte Schlüsselwörter oder Phrasen enthalten',
        'save-keywords': 'Schlüsselwörter Speichern',
        'clear-keywords': 'Alle Löschen',
        'keywords-count-label': 'Schlüsselwort-Anzahl:',
        'keywords-format-label': 'Format:',
        'help-title': 'So verwenden Sie Schlüsselwörter',
        'help-line1': 'Geben Sie ein Schlüsselwort pro Zeile ein oder trennen Sie mit Kommas',
        'help-line2': 'Verwenden Sie spezifische Phrasen für bessere Genauigkeit',
        'help-line3': 'Schlüsselwörter sind case-insensitive',
        'help-line4': 'Unterstützt mehrere Sprachen: Deutsch, Englisch, Arabisch, Hindi, Bangla, etc.',
        'help-line5': 'Verwenden Sie Pipe | für Synonyme: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximal 2000 Schlüsselwörter unterstützt',
        'support-title': 'Support & Hilfe',
        'support-subtitle': 'Holen Sie sich Hilfe, melden Sie Probleme und lernen Sie, Clify effektiv zu nutzen',
        'contact-title': 'Support Kontaktieren',
        'contact-subtitle': 'Probleme oder Vorschläge? Wir sind hier, um Ihnen zu helfen, das Beste aus Clify herauszuholen.',
        'name-label': 'Ihr Name *',
        'email-label': 'Ihre E-Mail *',
        'category-label': 'Problemkategorie *',
        'category-bug': 'Fehlerbericht',
        'category-feature': 'Funktionswunsch',
        'category-help': 'Hilfe Benötigt',
        'category-suggestion': 'Vorschlag',
        'category-other': 'Andere',
        'message-label': 'Ihre Nachricht *',
        'send-message': 'Nachricht Senden',
        'sending-message': 'Sende...',
        'resources-title': 'Hilfe-Ressourcen',
        'resource-faq': 'FAQ & Fehlerbehebung',
        'resource-faq-desc': 'Häufige Fragen und Lösungen',
        'resource-guide': 'Benutzerhandbuch',
        'resource-guide-desc': 'Lernen Sie alle Funktionen zu nutzen',
        'resource-bugs': 'Fehler Melden',
        'resource-bugs-desc': 'Ein Problem gefunden? Lassen Sie es uns wissen',
        'resource-features': 'Funktionen Vorschlagen',
        'resource-features-desc': 'Teilen Sie Ihre Ideen zur Verbesserung',
        'about-title': 'Über Clify',
        'version-text': 'Version:',
        'about-description': 'Clify hilft Ihnen, fokussiert zu bleiben, indem es ablenkende YouTube-Inhalte ausblendet. Es arbeitet lokal in Ihrem Browser und respektiert Ihre Privatsphäre - keine Daten werden an externe Server gesendet.',
        'feature-privacy': 'Privatsphäre Zuerst',
        'feature-fast': 'Blitzschnell',
        'feature-realtime': 'Echtzeit-Blockierung',
        'footer-made': 'Hergestellt mit ❤️ für eine fokussierte YouTube-Erfahrung'
    },
    it: {
        'welcome-title': 'Benvenuto in Clify! ⚡',
        'welcome-subtitle': 'Prendi il controllo della tua esperienza YouTube bloccando automaticamente i contenuti indesiderati',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Video Bloccati',
        'tab-keywords': 'Parole Chiave',
        'tab-support': 'Supporto',
        'refresh-text': 'Aggiorna',
        'theme-text': 'Tema',
        'stat-today': 'Blocchi di Oggi',
        'stat-total': 'Totali Bloccati',
        'stat-efficiency': 'Efficienza',
        'activity-title': 'Attività di Blocco',
        'activity-subtitle': 'Ultimi 30 giorni',
        'stat-keywords': 'Parole Chiave Attive',
        'stat-manual': 'Blocchi Manuali',
        'stat-auto': 'Blocchi Automatici',
        'stat-shorts': 'Shorts Bloccati',
        'stat-lang': 'Blocchi Lingua',
        'recent-title': 'Bloccati Recentemente',
        'view-all-btn': 'Vedi Tutti',
        'blocked-title': 'Video Bloccati',
        'blocked-subtitle': 'Gestisci tutti i video che hai bloccato dal tuo feed YouTube',
        'col-title': 'Titolo Video',
        'col-id': 'ID Video',
        'col-reason': 'Motivo',
        'col-date': 'Data Bloccato',
        'col-actions': 'Azioni',
        'filter-all': 'Tutti i Motivi',
        'filter-manual': 'Blocco Manuale',
        'filter-keyword': 'Corrispondenza Parola Chiave',
        'filter-shorts': 'Shorts',
        'filter-language': 'Lingua',
        'sort-newest': 'Più Recenti',
        'sort-oldest': 'Più Vecchi',
        'sort-title': 'Titolo A-Z',
        'export-btn': 'Esporta',
        'clear-all-btn': 'Cancella Tutto',
        'loading-text': 'Caricamento dei tuoi video bloccati...',
        'empty-title': 'Nessun video bloccato ancora',
        'empty-subtitle': 'Inizia a ripulire la tua esperienza YouTube bloccando video indesiderati',
        'empty-action': 'Aggiungi Parole Chiave per Blocco Automatico',
        'keywords-title': 'Gestore Parole Chiave',
        'keywords-subtitle': 'Blocca automaticamente video contenenti parole chiave o frasi specifiche',
        'save-keywords': 'Salva Parole Chiave',
        'clear-keywords': 'Cancella Tutto',
        'keywords-count-label': 'Conteggio Parole Chiave:',
        'keywords-format-label': 'Formato:',
        'help-title': 'Come usare le parole chiave',
        'help-line1': 'Inserisci una parola chiave per riga o separa con virgole',
        'help-line2': 'Usa frasi specifiche per maggiore precisione',
        'help-line3': 'Le parole chiave non distinguono maiuscole/minuscole',
        'help-line4': 'Supporta più lingue: Italiano, Inglese, Arabo, Hindi, Bangla, etc.',
        'help-line5': 'Usa pipe | per sinonimi: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Massimo 2000 parole chiave supportate',
        'support-title': 'Supporto & Aiuto',
        'support-subtitle': 'Ottieni aiuto, segnala problemi e impara a usare Clify efficacemente',
        'contact-title': 'Contatta Supporto',
        'contact-subtitle': 'Problemi o suggerimenti? Siamo qui per aiutarti a ottenere il massimo da Clify.',
        'name-label': 'Il Tuo Nome *',
        'email-label': 'La Tua Email *',
        'category-label': 'Categoria Problema *',
        'category-bug': 'Segnalazione Bug',
        'category-feature': 'Richiesta Funzionalità',
        'category-help': 'Aiuto Necessario',
        'category-suggestion': 'Suggerimento',
        'category-other': 'Altro',
        'message-label': 'Il Tuo Messaggio *',
        'send-message': 'Invia Messaggio',
        'sending-message': 'Invio in corso...',
        'resources-title': 'Risorse di Aiuto',
        'resource-faq': 'FAQ & Risoluzione Problemi',
        'resource-faq-desc': 'Domande comuni e soluzioni',
        'resource-guide': 'Guida Utente',
        'resource-guide-desc': 'Impara a usare tutte le funzionalità',
        'resource-bugs': 'Segnala Bug',
        'resource-bugs-desc': 'Trovato un problema? Faccelo sapere',
        'resource-features': 'Suggerisci Funzionalità',
        'resource-features-desc': 'Condividi le tue idee per migliorare',
        'about-title': 'Informazioni su Clify',
        'version-text': 'Versione:',
        'about-description': 'Clify ti aiuta a mantenere la concentrazione nascondendo i contenuti YouTube distraenti. Funziona localmente nel tuo browser e rispetta la tua privacy - nessun dato viene inviato a server esterni.',
        'feature-privacy': 'Privacy Prima di Tutto',
        'feature-fast': 'Velocissimo',
        'feature-realtime': 'Blocco in Tempo Reale',
        'footer-made': 'Realizzato con ❤️ per un\'esperienza YouTube concentrata'
    },
    pt: {
        'welcome-title': 'Bem-vindo ao Clify! ⚡',
        'welcome-subtitle': 'Tome controle da sua experiência no YouTube bloqueando automaticamente conteúdo indesejado',
        'tab-dash': 'Painel',
        'tab-blocked': 'Vídeos Bloqueados',
        'tab-keywords': 'Palavras-chave',
        'tab-support': 'Suporte',
        'refresh-text': 'Atualizar',
        'theme-text': 'Tema',
        'stat-today': 'Bloqueios de Hoje',
        'stat-total': 'Total Bloqueados',
        'stat-efficiency': 'Eficiência',
        'activity-title': 'Atividade de Bloqueio',
        'activity-subtitle': 'Últimos 30 dias',
        'stat-keywords': 'Palavras-chave Ativas',
        'stat-manual': 'Bloqueios Manuais',
        'stat-auto': 'Bloqueios Automáticos',
        'stat-shorts': 'Shorts Bloqueados',
        'stat-lang': 'Bloqueios de Idioma',
        'recent-title': 'Recentemente Bloqueados',
        'view-all-btn': 'Ver Todos',
        'blocked-title': 'Vídeos Bloqueados',
        'blocked-subtitle': 'Gerencie todos os vídeos que você bloqueou do seu feed do YouTube',
        'col-title': 'Título do Vídeo',
        'col-id': 'ID do Vídeo',
        'col-reason': 'Motivo',
        'col-date': 'Data Bloqueado',
        'col-actions': 'Ações',
        'filter-all': 'Todos os Motivos',
        'filter-manual': 'Bloqueio Manual',
        'filter-keyword': 'Correspondência de Palavra-chave',
        'filter-shorts': 'Shorts',
        'filter-language': 'Idioma',
        'sort-newest': 'Mais Recentes',
        'sort-oldest': 'Mais Antigos',
        'sort-title': 'Título A-Z',
        'export-btn': 'Exportar',
        'clear-all-btn': 'Limpar Tudo',
        'loading-text': 'Carregando seus vídeos bloqueados...',
        'empty-title': 'Nenhum vídeo bloqueado ainda',
        'empty-subtitle': 'Comece a limpar sua experiência no YouTube bloqueando vídeos indesejados',
        'empty-action': 'Adicionar Palavras-chave para Bloqueio Automático',
        'keywords-title': 'Gerenciador de Palavras-chave',
        'keywords-subtitle': 'Bloqueie automaticamente vídeos contendo palavras-chave ou frases específicas',
        'save-keywords': 'Salvar Palavras-chave',
        'clear-keywords': 'Limpar Tudo',
        'keywords-count-label': 'Contagem de Palavras-chave:',
        'keywords-format-label': 'Formato:',
        'help-title': 'Como usar palavras-chave',
        'help-line1': 'Digite uma palavra-chave por linha ou separe com vírgulas',
        'help-line2': 'Use frases específicas para melhor precisão',
        'help-line3': 'Palavras-chave não diferenciam maiúsculas/minúsculas',
        'help-line4': 'Suporta múltiplos idiomas: Português, Inglês, Árabe, Hindi, Bangla, etc.',
        'help-line5': 'Use pipe | para sinônimos: filme|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Máximo 2000 palavras-chave suportadas',
        'support-title': 'Suporte & Ajuda',
        'support-subtitle': 'Obtenha ajuda, reporte problemas e aprenda a usar o Clify efetivamente',
        'contact-title': 'Contatar Suporte',
        'contact-subtitle': 'Problemas ou sugestões? Estamos aqui para ajudá-lo a aproveitar ao máximo o Clify.',
        'name-label': 'Seu Nome *',
        'email-label': 'Seu Email *',
        'category-label': 'Categoria do Problema *',
        'category-bug': 'Relatório de Bug',
        'category-feature': 'Solicitação de Recurso',
        'category-help': 'Precisa de Ajuda',
        'category-suggestion': 'Sugestão',
        'category-other': 'Outro',
        'message-label': 'Sua Mensagem *',
        'send-message': 'Enviar Mensagem',
        'sending-message': 'Enviando...',
        'resources-title': 'Recursos de Ajuda',
        'resource-faq': 'FAQ & Solução de Problemas',
        'resource-faq-desc': 'Perguntas comuns e soluções',
        'resource-guide': 'Guia do Usuário',
        'resource-guide-desc': 'Aprenda a usar todos os recursos',
        'resource-bugs': 'Reportar Bugs',
        'resource-bugs-desc': 'Encontrou um problema? Nos avise',
        'resource-features': 'Sugerir Recursos',
        'resource-features-desc': 'Compartilhe suas ideias de melhoria',
        'about-title': 'Sobre o Clify',
        'version-text': 'Versão:',
        'about-description': 'Clify ajuda você a manter o foco ocultando conteúdo distractivo do YouTube. Funciona localmente no seu navegador e respeita sua privacidade - nenhum dado é enviado para servidores externos.',
        'feature-privacy': 'Privacidade em Primeiro Lugar',
        'feature-fast': 'Super Rápido',
        'feature-realtime': 'Bloqueio em Tempo Real',
        'footer-made': 'Feito com ❤️ para uma experiência focada no YouTube'
    },
    hi: {
        'welcome-title': 'Clify में आपका स्वागत है! ⚡',
        'welcome-subtitle': 'अवांछित सामग्री को स्वचालित रूप से ब्लॉक करके अपने YouTube अनुभव पर नियंत्रण रखें',
        'tab-dash': 'डैशबोर्ड',
        'tab-blocked': 'ब्लॉक किए गए वीडियो',
        'tab-keywords': 'कीवर्ड',
        'tab-support': 'सहायता',
        'refresh-text': 'रिफ्रेश करें',
        'theme-text': 'थीम',
        'stat-today': 'आज के ब्लॉक',
        'stat-total': 'कुल ब्लॉक किए गए',
        'stat-efficiency': 'दक्षता',
        'activity-title': 'ब्लॉकिंग एक्टिविटी',
        'activity-subtitle': 'पिछले 30 दिन',
        'stat-keywords': 'सक्रिय कीवर्ड',
        'stat-manual': 'मैनुअल ब्लॉक',
        'stat-auto': 'ऑटो ब्लॉक',
        'stat-shorts': 'शॉर्ट्स ब्लॉक किए गए',
        'stat-lang': 'भाषा ब्लॉक',
        'recent-title': 'हाल ही में ब्लॉक किए गए',
        'view-all-btn': 'सभी देखें',
        'blocked-title': 'ब्लॉक किए गए वीडियो',
        'blocked-subtitle': 'आपके YouTube फीड से ब्लॉक किए गए सभी वीडियो प्रबंधित करें',
        'col-title': 'वीडियो शीर्षक',
        'col-id': 'वीडियो आईडी',
        'col-reason': 'कारण',
        'col-date': 'ब्लॉक की तारीख',
        'col-actions': 'कार्रवाई',
        'filter-all': 'सभी कारण',
        'filter-manual': 'मैनुअल ब्लॉक',
        'filter-keyword': 'कीवर्ड मिलान',
        'filter-shorts': 'शॉर्ट्स',
        'filter-language': 'भाषा',
        'sort-newest': 'नवीनतम पहले',
        'sort-oldest': 'सबसे पुराने पहले',
        'sort-title': 'शीर्षक A-Z',
        'export-btn': 'एक्सपोर्ट',
        'clear-all-btn': 'सभी साफ करें',
        'loading-text': 'आपके ब्लॉक किए गए वीडियो लोड हो रहे हैं...',
        'empty-title': 'अभी तक कोई वीडियो ब्लॉक नहीं किया गया',
        'empty-subtitle': 'अवांछित वीडियो ब्लॉक करके अपने YouTube अनुभव को साफ करना शुरू करें',
        'empty-action': 'ऑटो-ब्लॉकिंग के लिए कीवर्ड जोड़ें',
        'keywords-title': 'कीवर्ड मैनेजर',
        'keywords-subtitle': 'विशिष्ट कीवर्ड या वाक्यांश वाले वीडियो को स्वचालित रूप से ब्लॉक करें',
        'save-keywords': 'कीवर्ड सेव करें',
        'clear-keywords': 'सभी साफ करें',
        'keywords-count-label': 'कीवर्ड काउंट:',
        'keywords-format-label': 'फॉर्मेट:',
        'help-title': 'कीवर्ड का उपयोग कैसे करें',
        'help-line1': 'प्रति लाइन एक कीवर्ड दर्ज करें या कॉमा से अलग करें',
        'help-line2': 'बेहतर सटीकता के लिए विशिष्ट वाक्यांशों का उपयोग करें',
        'help-line3': 'कीवर्ड केस-इनसेंसिटिव हैं',
        'help-line4': 'कई भाषाओं का समर्थन करता है: हिंदी, अंग्रेजी, अरबी, बांग्ला, आदि।',
        'help-line5': 'समानार्थी शब्दों के लिए पाइप | का उपयोग करें: movie|فيلم|फिल्म|সিনেমा',
        'help-line6': 'अधिकतम 2000 कीवर्ड समर्थित',
        'support-title': 'सहायता और मदद',
        'support-subtitle': 'मदद प्राप्त करें, समस्याओं की रिपोर्ट करें और Clify का प्रभावी ढंग से उपयोग करना सीखें',
        'contact-title': 'सहायता से संपर्क करें',
        'contact-subtitle': 'समस्याएं या सुझाव? हम आपकी Clify से अधिकतम लाभ उठाने में मदद करने के लिए यहां हैं।',
        'name-label': 'आपका नाम *',
        'email-label': 'आपका ईमेल *',
        'category-label': 'समस्या श्रेणी *',
        'category-bug': 'बग रिपोर्ट',
        'category-feature': 'फीचर अनुरोध',
        'category-help': 'मदद चाहिए',
        'category-suggestion': 'सुझाव',
        'category-other': 'अन्य',
        'message-label': 'आपका संदेश *',
        'send-message': 'संदेश भेजें',
        'sending-message': 'भेज रहा है...',
        'resources-title': 'सहायता संसाधन',
        'resource-faq': 'FAQ और समस्या निवारण',
        'resource-faq-desc': 'सामान्य प्रश्न और समाधान',
        'resource-guide': 'उपयोगकर्ता गाइड',
        'resource-guide-desc': 'सभी सुविधाओं का उपयोग करना सीखें',
        'resource-bugs': 'बग रिपोर्ट करें',
        'resource-bugs-desc': 'कोई समस्या मिली? हमें बताएं',
        'resource-features': 'सुविधाएं सुझाएं',
        'resource-features-desc': 'सुधार के लिए अपने विचार साझा करें',
        'about-title': 'Clify के बारे में',
        'version-text': 'संस्करण:',
        'about-description': 'Clify आपको विचलित करने वाली YouTube सामग्री को छिपाकर केंद्रित रहने में मदद करता है। यह आपके ब्राउज़र में स्थानीय रूप से काम करता है और आपकी गोपनीयता का सम्मान करता है - कोई डेटा बाहरी सर्वर पर नहीं भेजा जाता है।',
        'feature-privacy': 'गोपनीयता पहले',
        'feature-fast': 'बिजली की तेज',
        'feature-realtime': 'रीयल-टाइम ब्लॉकिंग',
        'footer-made': 'एक केंद्रित YouTube अनुभव के लिए ❤️ के साथ बनाया गया'
    },
    ar: {
        'welcome-title': 'مرحبًا بك في Clify! ⚡',
        'welcome-subtitle': 'تحكم في تجربة YouTube الخاصة بك عن طريق حظر المحتوى غير المرغوب فيه تلقائيًا',
        'tab-dash': 'لوحة التحكم',
        'tab-blocked': 'الفيديوهات المحظورة',
        'tab-keywords': 'الكلمات المفتاحية',
        'tab-support': 'الدعم',
        'refresh-text': 'تحديث',
        'theme-text': 'السمة',
        'stat-today': 'عمليات الحظر اليوم',
        'stat-total': 'إجمالي المحظور',
        'stat-efficiency': 'الكفاءة',
        'activity-title': 'نشاط الحظر',
        'activity-subtitle': 'آخر 30 يومًا',
        'stat-keywords': 'الكلمات المفتاحية النشطة',
        'stat-manual': 'عمليات الحظر اليدوية',
        'stat-auto': 'عمليات الحظر التلقائية',
        'stat-shorts': 'Shorts المحظورة',
        'stat-lang': 'عمليات حظر اللغة',
        'recent-title': 'المحظورة مؤخرًا',
        'view-all-btn': 'عرض الكل',
        'blocked-title': 'الفيديوهات المحظورة',
        'blocked-subtitle': 'إدارة جميع الفيديوهات التي حظرتها من خلاصة YouTube الخاصة بك',
        'col-title': 'عنوان الفيديو',
        'col-id': 'معرف الفيديو',
        'col-reason': 'السبب',
        'col-date': 'تاريخ الحظر',
        'col-actions': 'الإجراءات',
        'filter-all': 'جميع الأسباب',
        'filter-manual': 'حظر يدوي',
        'filter-keyword': 'مطابقة الكلمة المفتاحية',
        'filter-shorts': 'Shorts',
        'filter-language': 'اللغة',
        'sort-newest': 'الأحدث أولاً',
        'sort-oldest': 'الأقدم أولاً',
        'sort-title': 'العنوان من أ إلى ي',
        'export-btn': 'تصدير',
        'clear-all-btn': 'مسح الكل',
        'loading-text': 'جاري تحميل الفيديوهات المحظورة...',
        'empty-title': 'لا توجد فيديوهات محظورة بعد',
        'empty-subtitle': 'ابدأ في تنظيف تجربة YouTube الخاصة بك عن طريق حظر الفيديوهات غير المرغوب فيها',
        'empty-action': 'إضافة كلمات مفتاحية للحظر التلقائي',
        'keywords-title': 'مدير الكلمات المفتاحية',
        'keywords-subtitle': 'احظر تلقائيًا الفيديوهات التي تحتوي على كلمات مفتاحية أو عبارات محددة',
        'save-keywords': 'حفظ الكلمات المفتاحية',
        'clear-keywords': 'مسح الكل',
        'keywords-count-label': 'عدد الكلمات المفتاحية:',
        'keywords-format-label': 'التنسيق:',
        'help-title': 'كيفية استخدام الكلمات المفتاحية',
        'help-line1': 'أدخل كلمة مفتاحية واحدة في كل سطر أو افصل بفواصل',
        'help-line2': 'استخدم عبارات محددة لدقة أفضل',
        'help-line3': 'الكلمات المفتاحية لا تفرق بين الأحرف الكبيرة والصغيرة',
        'help-line4': 'يدعم لغات متعددة: العربية، الإنجليزية، الهندية، البنغالية، إلخ.',
        'help-line5': 'استخدم | للترادف: فيلم|movie|फिल्म|সিনেমা',
        'help-line6': 'أقصى 2000 كلمة مفتاحية مدعومة',
        'support-title': 'الدعم والمساعدة',
        'support-subtitle': 'احصل على المساعدة، أبلغ عن المشاكل وتعلم如何使用 Clify بفعالية',
        'contact-title': 'اتصل بالدعم',
        'contact-subtitle': 'مشاكل أو اقتراحات؟ نحن هنا لمساعدتك في الحصول على أقصى استفادة من Clify.',
        'name-label': 'اسمك *',
        'email-label': 'بريدك الإلكتروني *',
        'category-label': 'فئة المشكلة *',
        'category-bug': 'تقرير خطأ',
        'category-feature': 'طلب ميزة',
        'category-help': 'بحاجة إلى مساعدة',
        'category-suggestion': 'اقتراح',
        'category-other': 'أخرى',
        'message-label': 'رسالتك *',
        'send-message': 'إرسال الرسالة',
        'sending-message': 'جاري الإرسال...',
        'resources-title': 'موارد المساعدة',
        'resource-faq': 'الأسئلة الشائعة واستكشاف الأخطاء',
        'resource-faq-desc': 'أسئلة شائعة وحلول',
        'resource-guide': 'دليل المستخدم',
        'resource-guide-desc': 'تعلم如何使用 جميع الميزات',
        'resource-bugs': 'الإبلاغ عن الأخطاء',
        'resource-bugs-desc': 'وجدت مشكلة؟ أخبرنا',
        'resource-features': 'اقترح ميزات',
        'resource-features-desc': 'شارك أفكارك للتحسين',
        'about-title': 'حول Clify',
        'version-text': 'الإصدار:',
        'about-description': 'يساعدك Clify على البقاء مركزًا عن طريق إخفاء محتوى YouTube المشتت. يعمل محليًا في متصفحك ويحترم خصوصيتك - لا يتم إرسال أي بيانات إلى خوادم خارجية.',
        'feature-privacy': 'الخصوصية أولاً',
        'feature-fast': 'سريع جدًا',
        'feature-realtime': 'حظر في الوقت الفعلي',
        'footer-made': 'مصنوع بـ ❤️ لتجربة YouTube مركزة'
    },
    zh: {
        'welcome-title': '欢迎使用 Clify！⚡',
        'welcome-subtitle': '通过自动屏蔽不需要的内容来控制您的 YouTube 体验',
        'tab-dash': '仪表板',
        'tab-blocked': '已屏蔽视频',
        'tab-keywords': '关键词',
        'tab-support': '支持',
        'refresh-text': '刷新',
        'theme-text': '主题',
        'stat-today': '今日屏蔽',
        'stat-total': '总屏蔽数',
        'stat-efficiency': '效率',
        'activity-title': '屏蔽活动',
        'activity-subtitle': '最近30天',
        'stat-keywords': '活跃关键词',
        'stat-manual': '手动屏蔽',
        'stat-auto': '自动屏蔽',
        'stat-shorts': 'Shorts 已屏蔽',
        'stat-lang': '语言屏蔽',
        'recent-title': '最近屏蔽',
        'view-all-btn': '查看全部',
        'blocked-title': '已屏蔽视频',
        'blocked-subtitle': '管理您从 YouTube 订阅源中屏蔽的所有视频',
        'col-title': '视频标题',
        'col-id': '视频ID',
        'col-reason': '原因',
        'col-date': '屏蔽日期',
        'col-actions': '操作',
        'filter-all': '所有原因',
        'filter-manual': '手动屏蔽',
        'filter-keyword': '关键词匹配',
        'filter-shorts': 'Shorts',
        'filter-language': '语言',
        'sort-newest': '最新优先',
        'sort-oldest': '最旧优先',
        'sort-title': '标题A-Z',
        'export-btn': '导出',
        'clear-all-btn': '清除全部',
        'loading-text': '正在加载您屏蔽的视频...',
        'empty-title': '尚未屏蔽任何视频',
        'empty-subtitle': '通过屏蔽不需要的视频开始清理您的 YouTube 体验',
        'empty-action': '添加关键词以自动屏蔽',
        'keywords-title': '关键词管理器',
        'keywords-subtitle': '自动屏蔽包含特定关键词或短语的视频',
        'save-keywords': '保存关键词',
        'clear-keywords': '清除全部',
        'keywords-count-label': '关键词计数：',
        'keywords-format-label': '格式：',
        'help-title': '如何使用关键词',
        'help-line1': '每行输入一个关键词或用逗号分隔',
        'help-line2': '使用特定短语以获得更好的准确性',
        'help-line3': '关键词不区分大小写',
        'help-line4': '支持多种语言：中文、英文、阿拉伯语、印地语、孟加拉语等',
        'help-line5': '使用 | 表示同义词：电影|فيلم|फिल्म|সিনেমা',
        'help-line6': '最多支持2000个关键词',
        'support-title': '支持与帮助',
        'support-subtitle': '获取帮助、报告问题并学习如何有效使用 Clify',
        'contact-title': '联系支持',
        'contact-subtitle': '有问题或建议？我们在这里帮助您充分利用 Clify。',
        'name-label': '您的姓名 *',
        'email-label': '您的邮箱 *',
        'category-label': '问题类别 *',
        'category-bug': '错误报告',
        'category-feature': '功能请求',
        'category-help': '需要帮助',
        'category-suggestion': '建议',
        'category-other': '其他',
        'message-label': '您的消息 *',
        'send-message': '发送消息',
        'sending-message': '发送中...',
        'resources-title': '帮助资源',
        'resource-faq': '常见问题与故障排除',
        'resource-faq-desc': '常见问题与解决方案',
        'resource-guide': '用户指南',
        'resource-guide-desc': '学习如何使用所有功能',
        'resource-bugs': '报告错误',
        'resource-bugs-desc': '发现问题？告诉我们',
        'resource-features': '建议功能',
        'resource-features-desc': '分享您的改进想法',
        'about-title': '关于 Clify',
        'version-text': '版本：',
        'about-description': 'Clify 通过隐藏分散注意力的 YouTube 内容来帮助您保持专注。它在您的浏览器中本地运行并尊重您的隐私 - 不会将任何数据发送到外部服务器。',
        'feature-privacy': '隐私优先',
        'feature-fast': '极速',
        'feature-realtime': '实时屏蔽',
        'footer-made': '为专注的 YouTube 体验而用心制作 ❤️'
    },
    ja: {
        'welcome-title': 'Clifyへようこそ！⚡',
        'welcome-subtitle': '不要なコンテンツを自動的にブロックして、YouTube体験をコントロールしましょう',
        'tab-dash': 'ダッシュボード',
        'tab-blocked': 'ブロック済み動画',
        'tab-keywords': 'キーワード',
        'tab-support': 'サポート',
        'refresh-text': '更新',
        'theme-text': 'テーマ',
        'stat-today': '今日のブロック',
        'stat-total': '合計ブロック数',
        'stat-efficiency': '効率',
        'activity-title': 'ブロック活動',
        'activity-subtitle': '過去30日間',
        'stat-keywords': '有効キーワード',
        'stat-manual': '手動ブロック',
        'stat-auto': '自動ブロック',
        'stat-shorts': 'ショート動画ブロック数',
        'stat-lang': '言語ブロック',
        'recent-title': '最近ブロックした動画',
        'view-all-btn': 'すべて表示',
        'blocked-title': 'ブロック済み動画',
        'blocked-subtitle': 'YouTubeフィードからブロックしたすべての動画を管理',
        'col-title': '動画タイトル',
        'col-id': '動画ID',
        'col-reason': '理由',
        'col-date': 'ブロック日時',
        'col-actions': '操作',
        'filter-all': 'すべての理由',
        'filter-manual': '手動ブロック',
        'filter-keyword': 'キーワード一致',
        'filter-shorts': 'ショート動画',
        'filter-language': '言語',
        'sort-newest': '新しい順',
        'sort-oldest': '古い順',
        'sort-title': 'タイトルA-Z',
        'export-btn': 'エクスポート',
        'clear-all-btn': 'すべてクリア',
        'loading-text': 'ブロック済み動画を読み込み中...',
        'empty-title': 'まだブロックされた動画はありません',
        'empty-subtitle': '不要な動画をブロックしてYouTube体験をクリーンアップしましょう',
        'empty-action': '自動ブロックのキーワードを追加',
        'keywords-title': 'キーワードマネージャー',
        'keywords-subtitle': '特定のキーワードやフレーズを含む動画を自動的にブロック',
        'save-keywords': 'キーワードを保存',
        'clear-keywords': 'すべてクリア',
        'keywords-count-label': 'キーワード数：',
        'keywords-format-label': '形式：',
        'help-title': 'キーワードの使用方法',
        'help-line1': '1行に1つのキーワードを入力するか、カンマで区切ります',
        'help-line2': 'より正確な結果には特定のフレーズを使用してください',
        'help-line3': 'キーワードは大文字小文字を区別しません',
        'help-line4': '複数言語をサポート：日本語、英語、アラビア語、ヒンディー語、ベンガル語など',
        'help-line5': '同義語には | を使用：映画|فيلم|फिल्म|সিনেমা',
        'help-line6': '最大2000キーワードまでサポート',
        'support-title': 'サポートとヘルプ',
        'support-subtitle': 'ヘルプの取得、問題の報告、Clifyの効果的な使用方法を学びましょう',
        'contact-title': 'サポートに連絡',
        'contact-subtitle': '問題や提案がありますか？Clifyを最大限に活用するお手伝いをします。',
        'name-label': 'お名前 *',
        'email-label': 'メールアドレス *',
        'category-label': '問題カテゴリ *',
        'category-bug': 'バグ報告',
        'category-feature': '機能リクエスト',
        'category-help': 'ヘルプが必要',
        'category-suggestion': '提案',
        'category-other': 'その他',
        'message-label': 'メッセージ *',
        'send-message': 'メッセージを送信',
        'sending-message': '送信中...',
        'resources-title': 'ヘルプリソース',
        'resource-faq': 'FAQとトラブルシューティング',
        'resource-faq-desc': 'よくある質問と解決策',
        'resource-guide': 'ユーザーガイド',
        'resource-guide-desc': 'すべての機能の使い方を学ぶ',
        'resource-bugs': 'バグを報告',
        'resource-bugs-desc': '問題を見つけましたか？お知らせください',
        'resource-features': '機能を提案',
        'resource-features-desc': '改善のためのアイデアを共有してください',
        'about-title': 'Clifyについて',
        'version-text': 'バージョン：',
        'about-description': 'Clifyは、気が散るYouTubeコンテンツを非表示にして集中力を維持するのに役立ちます。ブラウザでローカルに動作し、プライバシーを尊重します - 外部サーバーにデータは送信されません。',
        'feature-privacy': 'プライバシー第一',
        'feature-fast': '超高速',
        'feature-realtime': 'リアルタイムブロック',
        'footer-made': '集中したYouTube体験のために ❤️ で作成'
    },
    ko: {
        'welcome-title': 'Clify에 오신 것을 환영합니다! ⚡',
        'welcome-subtitle': '원치 않는 콘텐츠를 자동으로 차단하여 YouTube 경험을 제어하세요',
        'tab-dash': '대시보드',
        'tab-blocked': '차단된 동영상',
        'tab-keywords': '키워드',
        'tab-support': '지원',
        'refresh-text': '새로고침',
        'theme-text': '테마',
        'stat-today': '오늘 차단',
        'stat-total': '총 차단됨',
        'stat-efficiency': '효율성',
        'activity-title': '차단 활동',
        'activity-subtitle': '지난 30일',
        'stat-keywords': '활성 키워드',
        'stat-manual': '수동 차단',
        'stat-auto': '자동 차단',
        'stat-shorts': '차단된 쇼츠',
        'stat-lang': '언어 차단',
        'recent-title': '최근 차단됨',
        'view-all-btn': '모두 보기',
        'blocked-title': '차단된 동영상',
        'blocked-subtitle': 'YouTube 피드에서 차단한 모든 동영상 관리',
        'col-title': '동영상 제목',
        'col-id': '동영상 ID',
        'col-reason': '사유',
        'col-date': '차단 날짜',
        'col-actions': '작업',
        'filter-all': '모든 사유',
        'filter-manual': '수동 차단',
        'filter-keyword': '키워드 일치',
        'filter-shorts': '쇼츠',
        'filter-language': '언어',
        'sort-newest': '최신순',
        'sort-oldest': '오래된순',
        'sort-title': '제목 A-Z',
        'export-btn': '내보내기',
        'clear-all-btn': '모두 지우기',
        'loading-text': '차단된 동영상을 불러오는 중...',
        'empty-title': '아직 차단된 동영상이 없습니다',
        'empty-subtitle': '원치 않는 동영상을 차단하여 YouTube 경험을 정리하기 시작하세요',
        'empty-action': '자동 차단을 위한 키워드 추가',
        'keywords-title': '키워드 관리자',
        'keywords-subtitle': '특정 키워드나 구문을 포함하는 동영상을 자동으로 차단',
        'save-keywords': '키워드 저장',
        'clear-keywords': '모두 지우기',
        'keywords-count-label': '키워드 수:',
        'keywords-format-label': '형식:',
        'help-title': '키워드 사용 방법',
        'help-line1': '줄당 하나의 키워드를 입력하거나 쉼표로 구분',
        'help-line2': '더 나은 정확도를 위해 특정 구문 사용',
        'help-line3': '키워드는 대소문자를 구분하지 않음',
        'help-line4': '다중 언어 지원: 한국어, 영어, 아랍어, 힌디어, 벵골어 등',
        'help-line5': '동의어에 | 사용: 영화|فيلم|फिल्म|সিনেমা',
        'help-line6': '최대 2000개 키워드 지원',
        'support-title': '지원 및 도움말',
        'support-subtitle': '도움 받기, 문제 보고 및 Clify 효과적으로 사용하는 방법 배우기',
        'contact-title': '지원 문의',
        'contact-subtitle': '문제나 제안사항이 있으신가요? Clify를 최대한 활용하도록 도와드리겠습니다.',
        'name-label': '이름 *',
        'email-label': '이메일 *',
        'category-label': '문제 유형 *',
        'category-bug': '버그 보고',
        'category-feature': '기능 요청',
        'category-help': '도움 필요',
        'category-suggestion': '제안',
        'category-other': '기타',
        'message-label': '메시지 *',
        'send-message': '메시지 보내기',
        'sending-message': '전송 중...',
        'resources-title': '도움말 리소스',
        'resource-faq': 'FAQ 및 문제 해결',
        'resource-faq-desc': '자주 묻는 질문과 해결책',
        'resource-guide': '사용자 가이드',
        'resource-guide-desc': '모든 기능 사용 방법 배우기',
        'resource-bugs': '버그 보고',
        'resource-bugs-desc': '문제를 발견하셨나요? 알려주세요',
        'resource-features': '기능 제안',
        'resource-features-desc': '개선을 위한 아이디어 공유',
        'about-title': 'Clify 정보',
        'version-text': '버전:',
        'about-description': 'Clify는 주의를 분산시키는 YouTube 콘텐츠를 숨겨 집중력을 유지하는 데 도움을 줍니다. 브라우저에서 로컬로 작동하며 개인정보를 존중합니다 - 외부 서버로 데이터를 전송하지 않습니다.',
        'feature-privacy': '개인정보 우선',
        'feature-fast': '초고속',
        'feature-realtime': '실시간 차단',
        'footer-made': '집중된 YouTube 경험을 위해 ❤️으로 제작'
    },
    bn: {
        'welcome-title': 'Clify এ স্বাগতম! ⚡',
        'welcome-subtitle': 'অযাচিত বিষয়বস্তু স্বয়ংক্রিয়ভাবে ব্লক করে আপনার YouTube অভিজ্ঞতা নিয়ন্ত্রণ করুন',
        'tab-dash': 'ড্যাশবোর্ড',
        'tab-blocked': 'ব্লক করা ভিডিও',
        'tab-keywords': 'কীওয়ার্ড',
        'tab-support': 'সহায়তা',
        'refresh-text': 'রিফ্রেশ',
        'theme-text': 'থিম',
        'stat-today': 'আজকের ব্লক',
        'stat-total': 'মোট ব্লক করা',
        'stat-efficiency': 'দক্ষতা',
        'activity-title': 'ব্লকিং কার্যকলাপ',
        'activity-subtitle': 'গত ৩০ দিন',
        'stat-keywords': 'সক্রিয় কীওয়ার্ড',
        'stat-manual': 'ম্যানুয়াল ব্লক',
        'stat-auto': 'অটো ব্লক',
        'stat-shorts': 'শর্টস ব্লক করা',
        'stat-lang': 'ভাষা ব্লক',
        'recent-title': 'সাম্প্রতিক ব্লক করা',
        'view-all-btn': 'সব দেখুন',
        'blocked-title': 'ব্লক করা ভিডিও',
        'blocked-subtitle': 'আপনার YouTube ফিড থেকে ব্লক করা সমস্ত ভিডিও পরিচালনা করুন',
        'col-title': 'ভিডিও শিরোনাম',
        'col-id': 'ভিডিও আইডি',
        'col-reason': 'কারণ',
        'col-date': 'ব্লক করার তারিখ',
        'col-actions': 'ক্রিয়া',
        'filter-all': 'সমস্ত কারণ',
        'filter-manual': 'ম্যানুয়াল ব্লক',
        'filter-keyword': 'কীওয়ার্ড মিল',
        'filter-shorts': 'শর্টস',
        'filter-language': 'ভাষা',
        'sort-newest': 'নতুন প্রথম',
        'sort-oldest': 'পুরানো প্রথম',
        'sort-title': 'শিরোনাম A-Z',
        'export-btn': 'এক্সপোর্ট',
        'clear-all-btn': 'সব মুছুন',
        'loading-text': 'আপনার ব্লক করা ভিডিও লোড হচ্ছে...',
        'empty-title': 'এখনও কোন ভিডিও ব্লক করা হয়নি',
        'empty-subtitle': 'অযাচিত ভিডিও ব্লক করে আপনার YouTube অভিজ্ঞতা পরিষ্কার করা শুরু করুন',
        'empty-action': 'অটো-ব্লকিং এর জন্য কীওয়ার্ড যোগ করুন',
        'keywords-title': 'কীওয়ার্ড ম্যানেজার',
        'keywords-subtitle': 'নির্দিষ্ট কীওয়ার্ড বা বাক্যাংশ সম্বলিত ভিডিও স্বয়ংক্রিয়ভাবে ব্লক করুন',
        'save-keywords': 'কীওয়ার্ড সংরক্ষণ করুন',
        'clear-keywords': 'সব মুছুন',
        'keywords-count-label': 'কীওয়ার্ড সংখ্যা:',
        'keywords-format-label': 'ফরম্যাট:',
        'help-title': 'কীভাবে কীওয়ার্ড ব্যবহার করবেন',
        'help-line1': 'প্রতি লাইনে একটি কীওয়ার্ড লিখুন বা কমা দিয়ে আলাদা করুন',
        'help-line2': 'ভালো সঠিকতার জন্য নির্দিষ্ট বাক্যাংশ ব্যবহার করুন',
        'help-line3': 'কীওয়ার্ড কেস-ইনসেনসিটিভ',
        'help-line4': 'একাধিক ভাষা সমর্থন করে: বাংলা, ইংরেজি, আরবি, হিন্দি, ইত্যাদি',
        'help-line5': 'প্রতিশব্দের জন্য পাইপ | ব্যবহার করুন: সিনেমা|فيلم|फिल्म|movie',
        'help-line6': 'সর্বোচ্চ ২০০০ কীওয়ার্ড সমর্থিত',
        'support-title': 'সহায়তা ও সাহায্য',
        'support-subtitle': 'সাহায্য পান, সমস্যা রিপোর্ট করুন এবং Clify কার্যকরভাবে ব্যবহার করা শিখুন',
        'contact-title': 'সহায়তা যোগাযোগ',
        'contact-subtitle': 'সমস্যা বা পরামর্শ? আমরা আপনাকে Clify থেকে সর্বোচ্চ সুবিধা নিতে সাহায্য করতে এখানে আছি।',
        'name-label': 'আপনার নাম *',
        'email-label': 'আপনার ইমেল *',
        'category-label': 'সমস্যার বিভাগ *',
        'category-bug': 'বাগ রিপোর্ট',
        'category-feature': 'ফিচার অনুরোধ',
        'category-help': 'সাহায্য প্রয়োজন',
        'category-suggestion': 'পরামর্শ',
        'category-other': 'অন্যান্য',
        'message-label': 'আপনার বার্তা *',
        'send-message': 'বার্তা পাঠান',
        'sending-message': 'পাঠানো হচ্ছে...',
        'resources-title': 'সাহায্য সম্পদ',
        'resource-faq': 'FAQ ও সমস্যা সমাধান',
        'resource-faq-desc': 'সাধারণ প্রশ্ন এবং সমাধান',
        'resource-guide': 'ব্যবহারকারী গাইড',
        'resource-guide-desc': 'সমস্ত বৈশিষ্ট্য ব্যবহার করা শিখুন',
        'resource-bugs': 'বাগ রিপোর্ট করুন',
        'resource-bugs-desc': 'কোন সমস্যা পেয়েছেন? আমাদের জানান',
        'resource-features': 'ফিচার প্রস্তাব করুন',
        'resource-features-desc': 'উন্নতির জন্য আপনার ধারণা শেয়ার করুন',
        'about-title': 'Clify সম্পর্কে',
        'version-text': 'সংস্করণ:',
        'about-description': 'Clify আপনাকে বিভ্রান্তিকর YouTube বিষয়বস্তু লুকিয়ে ফোকাসড থাকতে সাহায্য করে। এটি আপনার ব্রাউজারে স্থানীয়ভাবে কাজ করে এবং আপনার গোপনীয়তা সম্মান করে - কোন ডেটা বাহ্যিক সার্ভারে প্রেরণ করা হয় না।',
        'feature-privacy': 'গোপনীয়তা প্রথম',
        'feature-fast': 'বজ্র গতি',
        'feature-realtime': 'রিয়েল-টাইম ব্লকিং',
        'footer-made': 'একটি ফোকাসড YouTube অভিজ্ঞতার জন্য ❤️ দিয়ে তৈরি'
    },
    ru: {
        'welcome-title': 'Добро пожаловать в Clify! ⚡',
        'welcome-subtitle': 'Возьмите под контроль свой опыт YouTube, автоматически блокируя нежелательный контент',
        'tab-dash': 'Панель управления',
        'tab-blocked': 'Заблокированные видео',
        'tab-keywords': 'Ключевые слова',
        'tab-support': 'Поддержка',
        'refresh-text': 'Обновить',
        'theme-text': 'Тема',
        'stat-today': 'Блокировки сегодня',
        'stat-total': 'Всего заблокировано',
        'stat-efficiency': 'Эффективность',
        'activity-title': 'Активность блокировок',
        'activity-subtitle': 'Последние 30 дней',
        'stat-keywords': 'Активные ключевые слова',
        'stat-manual': 'Ручные блокировки',
        'stat-auto': 'Авто блокировки',
        'stat-shorts': 'Shorts заблокировано',
        'stat-lang': 'Блокировки по языку',
        'recent-title': 'Недавно заблокировано',
        'view-all-btn': 'Просмотреть все',
        'blocked-title': 'Заблокированные видео',
        'blocked-subtitle': 'Управляйте всеми видео, которые вы заблокировали в своей ленте YouTube',
        'col-title': 'Название видео',
        'col-id': 'ID видео',
        'col-reason': 'Причина',
        'col-date': 'Дата блокировки',
        'col-actions': 'Действия',
        'filter-all': 'Все причины',
        'filter-manual': 'Ручная блокировка',
        'filter-keyword': 'Совпадение ключевых слов',
        'filter-shorts': 'Shorts',
        'filter-language': 'Язык',
        'sort-newest': 'Сначала новые',
        'sort-oldest': 'Сначала старые',
        'sort-title': 'Название А-Я',
        'export-btn': 'Экспорт',
        'clear-all-btn': 'Очистить все',
        'loading-text': 'Загрузка ваших заблокированных видео...',
        'empty-title': 'Пока нет заблокированных видео',
        'empty-subtitle': 'Начните очищать свой опыт YouTube, блокируя нежелательные видео',
        'empty-action': 'Добавить ключевые слова для авто-блокировки',
        'keywords-title': 'Менеджер ключевых слов',
        'keywords-subtitle': 'Автоматически блокируйте видео, содержащие определенные ключевые слова или фразы',
        'save-keywords': 'Сохранить ключевые слова',
        'clear-keywords': 'Очистить все',
        'keywords-count-label': 'Количество ключевых слов:',
        'keywords-format-label': 'Формат:',
        'help-title': 'Как использовать ключевые слова',
        'help-line1': 'Вводите по одному ключевому слову в строку или разделяйте запятыми',
        'help-line2': 'Используйте конкретные фразы для лучшей точности',
        'help-line3': 'Ключевые слова не чувствительны к регистру',
        'help-line4': 'Поддерживает несколько языков: Русский, Английский, Арабский, Хинди, Бенгальский и др.',
        'help-line5': 'Используйте | для синонимов: фильм|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Поддерживается до 2000 ключевых слов',
        'support-title': 'Поддержка и помощь',
        'support-subtitle': 'Получите помощь, сообщите о проблемах и научитесь эффективно использовать Clify',
        'contact-title': 'Связаться с поддержкой',
        'contact-subtitle': 'Проблемы или предложения? Мы здесь, чтобы помочь вам получить максимальную отдачу от Clify.',
        'name-label': 'Ваше имя *',
        'email-label': 'Ваш email *',
        'category-label': 'Категория проблемы *',
        'category-bug': 'Сообщение об ошибке',
        'category-feature': 'Запрос функции',
        'category-help': 'Нужна помощь',
        'category-suggestion': 'Предложение',
        'category-other': 'Другое',
        'message-label': 'Ваше сообщение *',
        'send-message': 'Отправить сообщение',
        'sending-message': 'Отправка...',
        'resources-title': 'Ресурсы помощи',
        'resource-faq': 'FAQ и устранение неполадок',
        'resource-faq-desc': 'Часто задаваемые вопросы и решения',
        'resource-guide': 'Руководство пользователя',
        'resource-guide-desc': 'Научитесь использовать все функции',
        'resource-bugs': 'Сообщить об ошибках',
        'resource-bugs-desc': 'Нашли проблему? Сообщите нам',
        'resource-features': 'Предложить функции',
        'resource-features-desc': 'Поделитесь своими идеями по улучшению',
        'about-title': 'О Clify',
        'version-text': 'Версия:',
        'about-description': 'Clify помогает вам оставаться сосредоточенным, скрывая отвлекающий контент YouTube. Он работает локально в вашем браузере и уважает вашу конфиденциальность - никакие данные не отправляются на внешние серверы.',
        'feature-privacy': 'Конфиденциальность прежде всего',
        'feature-fast': 'Молниеносно быстро',
        'feature-realtime': 'Блокировка в реальном времени',
        'footer-made': 'Сделано с ❤️ для сосредоточенного опыта YouTube'
    },
    id: {
        'welcome-title': 'Selamat datang di Clify! ⚡',
        'welcome-subtitle': 'Kendalikan pengalaman YouTube Anda dengan memblokir konten yang tidak diinginkan secara otomatis',
        'tab-dash': 'Dasbor',
        'tab-blocked': 'Video yang Diblokir',
        'tab-keywords': 'Kata Kunci',
        'tab-support': 'Dukungan',
        'refresh-text': 'Muat Ulang',
        'theme-text': 'Tema',
        'stat-today': 'Blokir Hari Ini',
        'stat-total': 'Total Diblokir',
        'stat-efficiency': 'Efisiensi',
        'activity-title': 'Aktivitas Pemblokiran',
        'activity-subtitle': '30 Hari Terakhir',
        'stat-keywords': 'Kata Kunci Aktif',
        'stat-manual': 'Blokir Manual',
        'stat-auto': 'Blokir Otomatis',
        'stat-shorts': 'Shorts Diblokir',
        'stat-lang': 'Blokir Bahasa',
        'recent-title': 'Baru Saja Diblokir',
        'view-all-btn': 'Lihat Semua',
        'blocked-title': 'Video yang Diblokir',
        'blocked-subtitle': 'Kelola semua video yang telah Anda blokir dari feed YouTube Anda',
        'col-title': 'Judul Video',
        'col-id': 'ID Video',
        'col-reason': 'Alasan',
        'col-date': 'Tanggal Diblokir',
        'col-actions': 'Tindakan',
        'filter-all': 'Semua Alasan',
        'filter-manual': 'Blokir Manual',
        'filter-keyword': 'Kecocokan Kata Kunci',
        'filter-shorts': 'Shorts',
        'filter-language': 'Bahasa',
        'sort-newest': 'Terbaru Duluan',
        'sort-oldest': 'Terlama Duluan',
        'sort-title': 'Judul A-Z',
        'export-btn': 'Ekspor',
        'clear-all-btn': 'Hapus Semua',
        'loading-text': 'Memuat video yang diblokir...',
        'empty-title': 'Belum ada video yang diblokir',
        'empty-subtitle': 'Mulai bersihkan pengalaman YouTube Anda dengan memblokir video yang tidak diinginkan',
        'empty-action': 'Tambahkan Kata Kunci untuk Pemblokiran Otomatis',
        'keywords-title': 'Pengelola Kata Kunci',
        'keywords-subtitle': 'Blokir otomatis video yang mengandung kata kunci atau frasa tertentu',
        'save-keywords': 'Simpan Kata Kunci',
        'clear-keywords': 'Hapus Semua',
        'keywords-count-label': 'Jumlah Kata Kunci:',
        'keywords-format-label': 'Format:',
        'help-title': 'Cara menggunakan kata kunci',
        'help-line1': 'Masukkan satu kata kunci per baris atau pisahkan dengan koma',
        'help-line2': 'Gunakan frasa spesifik untuk akurasi yang lebih baik',
        'help-line3': 'Kata kunci tidak peka huruf besar/kecil',
        'help-line4': 'Mendukung banyak bahasa: Indonesia, Inggris, Arab, Hindi, Bengali, dll.',
        'help-line5': 'Gunakan pipe | untuk sinonim: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimal 2000 kata kunci didukung',
        'support-title': 'Dukungan & Bantuan',
        'support-subtitle': 'Dapatkan bantuan, laporkan masalah, dan pelajari cara menggunakan Clify secara efektif',
        'contact-title': 'Hubungi Dukungan',
        'contact-subtitle': 'Masalah atau saran? Kami di sini untuk membantu Anda memaksimalkan Clify.',
        'name-label': 'Nama Anda *',
        'email-label': 'Email Anda *',
        'category-label': 'Kategori Masalah *',
        'category-bug': 'Laporan Bug',
        'category-feature': 'Permintaan Fitur',
        'category-help': 'Butuh Bantuan',
        'category-suggestion': 'Saran',
        'category-other': 'Lainnya',
        'message-label': 'Pesan Anda *',
        'send-message': 'Kirim Pesan',
        'sending-message': 'Mengirim...',
        'resources-title': 'Sumber Daya Bantuan',
        'resource-faq': 'FAQ & Pemecahan Masalah',
        'resource-faq-desc': 'Pertanyaan umum dan solusi',
        'resource-guide': 'Panduan Pengguna',
        'resource-guide-desc': 'Pelajari cara menggunakan semua fitur',
        'resource-bugs': 'Laporkan Bug',
        'resource-bugs-desc': 'Menemukan masalah? Beri tahu kami',
        'resource-features': 'Sarankan Fitur',
        'resource-features-desc': 'Bagikan ide Anda untuk perbaikan',
        'about-title': 'Tentang Clify',
        'version-text': 'Versi:',
        'about-description': 'Clify membantu Anda tetap fokus dengan menyembunyikan konten YouTube yang mengganggu. Ini bekerja secara lokal di browser Anda dan menghormati privasi Anda - tidak ada data yang dikirim ke server eksternal.',
        'feature-privacy': 'Privasi Diutamakan',
        'feature-fast': 'Super Cepat',
        'feature-realtime': 'Pemblokiran Waktu Nyata',
        'footer-made': 'Dibuat dengan ❤️ untuk pengalaman YouTube yang fokus'
    },
    sv: { // Swedish (Svenska)
        'welcome-title': 'Välkommen till Clify! ⚡',
        'welcome-subtitle': 'Ta kontroll över din YouTube-upplevelse genom att automatiskt blockera oönskat innehåll',
        'tab-dash': 'Instrumentpanel',
        'tab-blocked': 'Blockerade Videor',
        'tab-keywords': 'Nyckelord',
        'tab-support': 'Support',
        'refresh-text': 'Uppdatera',
        'theme-text': 'Tema',
        'stat-today': 'Dagens Blockeringar',
        'stat-total': 'Totalt Blockerat',
        'stat-efficiency': 'Effektivitet',
        'activity-title': 'Blockering Aktivitet',
        'activity-subtitle': 'Senaste 30 dagarna',
        'stat-keywords': 'Aktiva Nyckelord',
        'stat-manual': 'Manuella Blockeringar',
        'stat-auto': 'Automatiska Blockeringar',
        'stat-shorts': 'Shorts Blockerade',
        'stat-lang': 'Språkblockeringar',
        'recent-title': 'Nyligen Blockerade',
        'view-all-btn': 'Visa Allt',
        'blocked-title': 'Blockerade Videor',
        'blocked-subtitle': 'Hantera alla videor du har blockerat från din YouTube-feed',
        'col-title': 'Videotitel',
        'col-id': 'Video ID',
        'col-reason': 'Anledning',
        'col-date': 'Datum Blockerad',
        'col-actions': 'Åtgärder',
        'filter-all': 'Alla Anledningar',
        'filter-manual': 'Manuell Blockering',
        'filter-keyword': 'Nyckelordsmatchning',
        'filter-shorts': 'Shorts',
        'filter-language': 'Språk',
        'sort-newest': 'Nyaste Först',
        'sort-oldest': 'Äldsta Först',
        'sort-title': 'Titel A-Ö',
        'export-btn': 'Exportera',
        'clear-all-btn': 'Rensa Allt',
        'loading-text': 'Laddar dina blockerade videor...',
        'empty-title': 'Inga videor blockerade än',
        'empty-subtitle': 'Börja rensa din YouTube-upplevelse genom att blockera oönskade videor',
        'empty-action': 'Lägg till Nyckelord för Automatisk Blockering',
        'keywords-title': 'Nyckelordshanterare',
        'keywords-subtitle': 'Blockera automatiskt videor som innehåller specifika nyckelord eller fraser',
        'save-keywords': 'Spara Nyckelord',
        'clear-keywords': 'Rensa Allt',
        'keywords-count-label': 'Antal Nyckelord:',
        'keywords-format-label': 'Format:',
        'help-title': 'Hur man använder nyckelord',
        'help-line1': 'Ange ett nyckelord per rad eller separera med kommatecken',
        'help-line2': 'Använd specifika fraser för bättre noggrannhet',
        'help-line3': 'Nyckelord är skiftlägesokänsliga',
        'help-line4': 'Stöder flera språk: Engelska, Arabiska, Hindi, Bangla, etc.',
        'help-line5': 'Använd pipe | för synonymer: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximalt 2000 nyckelord stöds',
        'support-title': 'Support & Hjälp',
        'support-subtitle': 'Få hjälp, rapportera problem och lär dig använda Clify effektivt',
        'contact-title': 'Kontakta Support',
        'contact-subtitle': 'Har du problem eller förslag? Vi är här för att hjälpa dig få ut det mesta av Clify.',
        'name-label': 'Ditt Namn *',
        'email-label': 'Din E-post *',
        'category-label': 'Problemkategori *',
        'category-bug': 'Felrapport',
        'category-feature': 'Funktionsförfrågan',
        'category-help': 'Behöver Hjälp',
        'category-suggestion': 'Förslag',
        'category-other': 'Annat',
        'message-label': 'Ditt Meddelande *',
        'send-message': 'Skicka Meddelande',
        'sending-message': 'Skickar...',
        'resources-title': 'Hjälpresurser',
        'resource-faq': 'FAQ & Felsökning',
        'resource-faq-desc': 'Vanliga frågor och lösningar',
        'resource-guide': 'Användarhandbok',
        'resource-guide-desc': 'Lär dig använda alla funktioner',
        'resource-bugs': 'Rapportera Fel',
        'resource-bugs-desc': 'Hittat ett problem? Meddela oss',
        'resource-features': 'Föreslå Funktioner',
        'resource-features-desc': 'Dela dina idéer för förbättring',
        'about-title': 'Om Clify',
        'version-text': 'Version:',
        'about-description': 'Clify hjälper dig att fokusera genom att dölja distraherande YouTube-innehåll. Det fungerar lokalt i din webbläsare och respekterar din integritet - ingen data skickas till externa servrar.',
        'feature-privacy': 'Integritet Först',
        'feature-fast': 'Blixtsnabb',
        'feature-realtime': 'Realtidsblockering',
        'footer-made': 'Gjord med ❤️ för en fokuserad YouTube-upplevelse',
        'validation-required': 'Vänligen fyll i alla obligatoriska fält.',
        'validation-message-length': 'Vänligen ange ett mer detaljerat meddelande (minst 10 tecken).',
        'contact-success-telegram': 'Tack! Ditt meddelande har skickats till vårt supportteam via Telegram. Vi återkommer snart.',
        'contact-success-local': 'Tack! Ditt meddelande har sparats. Vi kommer att granska det när vi är anslutna till internet.',
        'contact-error': 'Tyvärr, det uppstod ett fel när meddelandet skulle skickas. Försök igen senare eller kontakta oss direkt.',
        'capacity-text': 'Din Lagring',
        'capacity-normal': 'Din lagring ser bra ut! Fortsätt blockera de irriterande videorna. 😊',
        'capacity-warning': 'Observera! Lagringen börjar bli full ({percent}%) 📦',
        'capacity-critical': 'Varning! Lagring full ({percent}%) 🚨',
        'capacity-full': 'Hallå! Din lagring är helt full. Du måste rensa några videor för att blockera nya. 🚨',
        'capacity-warning-full': 'Observera! Lagringen nästan full ({percent}%) - överväg att rensa några videor',
        'telegram-connected': 'Ansluten till Telegram',
        'telegram-disconnected': 'Telegram Frånkopplad',
        'telegram-message-sent': 'Telegram-anslutningstest lyckades!',
        'test-success': 'Test Lyckades',
        'test-failed': 'Test Misslyckades',
        'days-ago': 'dagar sedan',
        'hours-ago': 'timmar sedan',
        'minutes-ago': 'minuter sedan',
        'just-now': 'Just nu',
        'results-text': 'videor',
        'support-header-text': 'Support',
        'donate-header-text': 'Donera',
        'stat-manual': 'Manuella Blockeringar (Clify-knapp)',
        'stat-auto': 'Blockerat Av Nyckelord'
    },
    ms: { // Malay (Bahasa Malaysia)
        'welcome-title': 'Selamat Datang ke Clify! ⚡',
        'welcome-subtitle': 'Kawal pengalaman YouTube anda dengan menyekat kandungan yang tidak diingini secara automatik',
        'tab-dash': 'Papan Pemuka',
        'tab-blocked': 'Video Tersekat',
        'tab-keywords': 'Kata Kunci',
        'tab-support': 'Sokongan',
        'refresh-text': 'Muat Semula',
        'theme-text': 'Tema',
        'stat-today': 'Sekatan Hari Ini',
        'stat-total': 'Jumlah Tersekat',
        'stat-efficiency': 'Kecekapan',
        'activity-title': 'Aktiviti Penyekatan',
        'activity-subtitle': '30 Hari Terakhir',
        'stat-keywords': 'Kata Kunci Aktif',
        'stat-manual': 'Sekatan Manual',
        'stat-auto': 'Sekatan Automatik',
        'stat-shorts': 'Shorts Tersekat',
        'stat-lang': 'Sekatan Bahasa',
        'recent-title': 'Baru Disekat',
        'view-all-btn': 'Lihat Semua',
        'blocked-title': 'Video Tersekat',
        'blocked-subtitle': 'Urus semua video yang telah anda sekat daripada suapan YouTube anda',
        'col-title': 'Tajuk Video',
        'col-id': 'ID Video',
        'col-reason': 'Sebab',
        'col-date': 'Tarikh Disekat',
        'col-actions': 'Tindakan',
        'filter-all': 'Semua Sebab',
        'filter-manual': 'Sekatan Manual',
        'filter-keyword': 'Padanan Kata Kunci',
        'filter-shorts': 'Shorts',
        'filter-language': 'Bahasa',
        'sort-newest': 'Terbaru Dahulu',
        'sort-oldest': 'Terlama Dahulu',
        'sort-title': 'Tajuk A-Z',
        'export-btn': 'Eksport',
        'clear-all-btn': 'Kosongkan Semua',
        'loading-text': 'Memuatkan video tersekat anda...',
        'empty-title': 'Tiada video disekat lagi',
        'empty-subtitle': 'Mula membersihkan pengalaman YouTube anda dengan menyekat video yang tidak diingini',
        'empty-action': 'Tambah Kata Kunci untuk Penyekatan Automatik',
        'keywords-title': 'Pengurus Kata Kunci',
        'keywords-subtitle': 'Sekat automatik video yang mengandungi kata kunci atau frasa tertentu',
        'save-keywords': 'Simpan Kata Kunci',
        'clear-keywords': 'Kosongkan Semua',
        'keywords-count-label': 'Kiraan Kata Kunci:',
        'keywords-format-label': 'Format:',
        'help-title': 'Cara menggunakan kata kunci',
        'help-line1': 'Masukkan satu kata kunci setiap baris atau pisahkan dengan koma',
        'help-line2': 'Gunakan frasa khusus untuk ketepatan yang lebih baik',
        'help-line3': 'Kata kunci tidak sensitif huruf besar/kecil',
        'help-line4': 'Menyokong pelbagai bahasa: Inggeris, Arab, Hindi, Bangla, dll.',
        'help-line5': 'Gunakan paip | untuk sinonim: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimum 2000 kata kunci disokong',
        'support-title': 'Sokongan & Bantuan',
        'support-subtitle': 'Dapatkan bantuan, laporkan masalah, dan pelajari cara menggunakan Clify dengan berkesan',
        'contact-title': 'Hubungi Sokongan',
        'contact-subtitle': 'Mengalami masalah atau cadangan? Kami di sini untuk membantu anda memanfaatkan sepenuhnya Clify.',
        'name-label': 'Nama Anda *',
        'email-label': 'Emel Anda *',
        'category-label': 'Kategori Isu *',
        'category-bug': 'Laporan Pepijat',
        'category-feature': 'Permintaan Ciri',
        'category-help': 'Perlukan Bantuan',
        'category-suggestion': 'Cadangan',
        'category-other': 'Lain-lain',
        'message-label': 'Mesej Anda *',
        'send-message': 'Hantar Mesej',
        'sending-message': 'Menghantar...',
        'resources-title': 'Sumber Bantuan',
        'resource-faq': 'Soalan Lazim & Penyelesaian Masalah',
        'resource-faq-desc': 'Soalan dan penyelesaian biasa',
        'resource-guide': 'Panduan Pengguna',
        'resource-guide-desc': 'Pelajari cara menggunakan semua ciri',
        'resource-bugs': 'Laporkan Pepijat',
        'resource-bugs-desc': 'Menemui masalah? Beritahu kami',
        'resource-features': 'Cadangkan Ciri',
        'resource-features-desc': 'Kongsi idea anda untuk penambahbaikan',
        'about-title': 'Mengenai Clify',
        'version-text': 'Versi:',
        'about-description': 'Clify membantu anda kekal fokus dengan menyembunyikan kandungan YouTube yang mengganggu. Ia berfungsi secara tempatan dalam pelayar anda dan menghormati privasi anda - tiada data dihantar ke pelayan luar.',
        'feature-privacy': 'Privasi Didahulukan',
        'feature-fast': 'Pantas Sepetir Kilat',
        'feature-realtime': 'Penyekatan Masa Nyata',
        'footer-made': 'Dibuat dengan ❤️ untuk pengalaman YouTube yang fokus',
        'validation-required': 'Sila isi semua medan wajib.',
        'validation-message-length': 'Sila berikan mesej yang lebih terperinci (sekurang-kurangnya 10 aksara).',
        'contact-success-telegram': 'Terima kasih! Mesej anda telah dihantar kepada pasukan sokongan kami melalui Telegram. Kami akan menghubungi anda tidak lama lagi.',
        'contact-success-local': 'Terima kasih! Mesej anda telah disimpan. Kami akan mengkaji semula apabila disambungkan ke internet.',
        'contact-error': 'Maaf, terdapat ralat semasa menghantar mesej anda. Sila cuba lagi nanti atau hubungi kami secara langsung.',
        'capacity-text': 'Penyimpanan Anda',
        'capacity-normal': 'Penyimpanan anda kelihatan hebat! Teruskan menyekat video yang menjengkelkan itu. 😊',
        'capacity-warning': 'Perhatian! Penyimpanan hampir penuh ({percent}%) 📦',
        'capacity-critical': 'Amaran! Penyimpanan penuh ({percent}%) 🚨',
        'capacity-full': 'Hei! Penyimpanan anda benar-benar penuh. Anda perlu mengosongkan beberapa video untuk menyekat yang baru. 🚨',
        'capacity-warning-full': 'Perhatian! Penyimpanan hampir penuh ({percent}%) - pertimbangkan untuk mengosongkan beberapa video',
        'telegram-connected': 'Disambungkan ke Telegram',
        'telegram-disconnected': 'Telegram Terputus Sambungan',
        'telegram-message-sent': 'Ujian sambungan Telegram berjaya!',
        'test-success': 'Ujian Berjaya',
        'test-failed': 'Ujian Gagal',
        'days-ago': 'hari lalu',
        'hours-ago': 'jam lalu',
        'minutes-ago': 'minit lalu',
        'just-now': 'Baru sahaja',
        'results-text': 'video',
        'support-header-text': 'Sokongan',
        'donate-header-text': 'Dermakan',
        'stat-manual': 'Sekatan Manual (Butang Clify)',
        'stat-auto': 'Disekat Oleh Kata Kunci'
    },
    af: { // Afrikaans
        'welcome-title': 'Welkom by Clify! ⚡',
        'welcome-subtitle': 'Neem beheer oor jou YouTube-ervaring deur ongewenste inhoud outomaties te blokkeer',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Geblokkeerde Video\'s',
        'tab-keywords': 'Sleutelwoorde',
        'tab-support': 'Ondersteuning',
        'refresh-text': 'Verfris',
        'theme-text': 'Tema',
        'stat-today': 'Vandag se Blokkades',
        'stat-total': 'Totaal Geblokkeer',
        'stat-efficiency': 'Doeltreffendheid',
        'activity-title': 'Blokkeringsaktiwiteit',
        'activity-subtitle': 'Laaste 30 Dae',
        'stat-keywords': 'Aktiewe Sleutelwoorde',
        'stat-manual': 'Handmatige Blokkades',
        'stat-auto': 'Outomatiese Blokkades',
        'stat-shorts': 'Shorts Geblokkeer',
        'stat-lang': 'Taalblokkades',
        'recent-title': 'Onlangs Geblokkeer',
        'view-all-btn': 'Bekyk Alles',
        'blocked-title': 'Geblokkeerde Video\'s',
        'blocked-subtitle': 'Bestuur alle video\'s wat jy van jou YouTube-feed geblokkeer het',
        'col-title': 'Video-titel',
        'col-id': 'Video-ID',
        'col-reason': 'Rede',
        'col-date': 'Datum Geblokkeer',
        'col-actions': 'Aksies',
        'filter-all': 'Alle Redes',
        'filter-manual': 'Handmatige Blokkade',
        'filter-keyword': 'Sleutelwoord-ooreenkoms',
        'filter-shorts': 'Shorts',
        'filter-language': 'Taal',
        'sort-newest': 'Nuutste Eerste',
        'sort-oldest': 'Oudste Eerste',
        'sort-title': 'Titel A-Z',
        'export-btn': 'Eksporteer',
        'clear-all-btn': 'Maak Alles Skoon',
        'loading-text': 'Laai jou geblokkeerde video\'s...',
        'empty-title': 'Nog geen video\'s geblokkeer nie',
        'empty-subtitle': 'Begin jou YouTube-ervaring skoonmaak deur ongewenste video\'s te blokkeer',
        'empty-action': 'Voeg Sleutelwoorde by vir Outomatiese Blokkering',
        'keywords-title': 'Sleutelwoordbestuurder',
        'keywords-subtitle': 'Blokkeer outomaties video\'s wat spesifieke sleutelwoorde of frases bevat',
        'save-keywords': 'Stoor Sleutelwoorde',
        'clear-keywords': 'Maak Alles Skoon',
        'keywords-count-label': 'Sleutelwoordtelling:',
        'keywords-format-label': 'Formaat:',
        'help-title': 'Hoe om sleutelwoorde te gebruik',
        'help-line1': 'Voer een sleutelwoord per lyn in of skei met kommas',
        'help-line2': 'Gebruik spesifieke frases vir beter akkuraatheid',
        'help-line3': 'Sleutelwoorde is nie geval-sensitief nie',
        'help-line4': 'Ondersteun verskeie tale: Engels, Arabies, Hindi, Bangla, ens.',
        'help-line5': 'Gebruik pyp | vir sinonieme: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimum 2000 sleutelwoorde word ondersteun',
        'support-title': 'Ondersteuning & Hulp',
        'support-subtitle': 'Kry hulp, rapporteer probleme en leer hoe om Clify effektief te gebruik',
        'contact-title': 'Kontak Ondersteuning',
        'contact-subtitle': 'Het jy probleme of voorstelle? Ons is hier om jou te help om die meeste uit Clify te kry.',
        'name-label': 'Jou Naam *',
        'email-label': 'Jou E-pos *',
        'category-label': 'Probleemkategorie *',
        'category-bug': 'Foutverslag',
        'category-feature': 'Funksieversoek',
        'category-help': 'Hulp Benodig',
        'category-suggestion': 'Voorstel',
        'category-other': 'Ander',
        'message-label': 'Jou Boodskap *',
        'send-message': 'Stuur Boodskap',
        'sending-message': 'Stuur...',
        'resources-title': 'Hulpbronne',
        'resource-faq': 'Gereelde Vrae & Probleemoplossing',
        'resource-faq-desc': 'Algemene vrae en oplossings',
        'resource-guide': 'Gebruikersgids',
        'resource-guide-desc': 'Leer hoe om alle funksies te gebruik',
        'resource-bugs': 'Rapporteer Foute',
        'resource-bugs-desc': '\'n Probleem gevind? Laat ons weet',
        'resource-features': 'Stel Funksies Voor',
        'resource-features-desc': 'Deel jou idees vir verbetering',
        'about-title': 'Oor Clify',
        'version-text': 'Weergawe:',
        'about-description': 'Clify help jou om gefokus te bly deur aandag-afleidende YouTube-inhoud weg te steek. Dit werk plaaslik in jou blaaier en respekteer jou privaatheid - geen data word na eksterne bedieners gestuur nie.',
        'feature-privacy': 'Privaatheid Eerste',
        'feature-fast': 'Blietsnel',
        'feature-realtime': 'Intydse Blokkering',
        'footer-made': 'Gemaak met ❤️ vir \'n gefokusde YouTube-ervaring',
        'validation-required': 'Vul asseblief alle verpligte velde in.',
        'validation-message-length': 'Verskaf asseblief \'n meer gedetailleerde boodskap (minstens 10 karakters).',
        'contact-success-telegram': 'Dankie! Jou boodskap is via Telegram na ons ondersteuningspan gestuur. Ons sal binnekort terugvoer gee.',
        'contact-success-local': 'Dankie! Jou boodskap is gestoor. Ons sal dit hersien wanneer aan die internet gekoppel is.',
        'contact-error': 'Jammer, daar was \'n fout met die stuur van jou boodskap. Probeer asseblief later weer of kontak ons direk.',
        'capacity-text': 'Jou Berging',
        'capacity-normal': 'Jou berging lyk goed! Hou aan om daardie irriterende video\'s te blokkeer. 😊',
        'capacity-warning': 'Let op! Berging word vol ({percent}%) 📦',
        'capacity-critical': 'Waarskuwing! Berging vol ({percent}%) 🚨',
        'capacity-full': 'Haai! Jou berging is heeltemal vol. Jy moet \'n paar video\'s skoonmaak om nuwes te blokkeer. 🚨',
        'capacity-warning-full': 'Let op! Berging amper vol ({percent}%) - oorweeg om \'n paar video\'s skoon te maak',
        'telegram-connected': 'Verbind met Telegram',
        'telegram-disconnected': 'Telegram Ontkoppel',
        'telegram-message-sent': 'Telegram-verbindingstoets suksesvol!',
        'test-success': 'Toets Geslaag',
        'test-failed': 'Toets Misluk',
        'days-ago': 'dae gelede',
        'hours-ago': 'ure gelede',
        'minutes-ago': 'minute gelede',
        'just-now': 'Net nou',
        'results-text': 'video\'s',
        'support-header-text': 'Ondersteuning',
        'donate-header-text': 'Skenk',
        'stat-manual': 'Handmatige Blokkades (Clify-knoppie)',
        'stat-auto': 'Geblokkeer Deur Sleutelwoord'
    },
    no: { // Norwegian (Norsk)
        'welcome-title': 'Velkommen til Clify! ⚡',
        'welcome-subtitle': 'Ta kontroll over din YouTube-opplevelse ved å automatisk blokkere uønsket innhold',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Blokkerte Videoer',
        'tab-keywords': 'Nøkkelord',
        'tab-support': 'Støtte',
        'refresh-text': 'Oppdater',
        'theme-text': 'Tema',
        'stat-today': 'Dagens Blokkeringer',
        'stat-total': 'Totalt Blokkert',
        'stat-efficiency': 'Effektivitet',
        'activity-title': 'Blokkeringsaktivitet',
        'activity-subtitle': 'Siste 30 dager',
        'stat-keywords': 'Aktive Nøkkelord',
        'stat-manual': 'Manuelle Blokkeringer',
        'stat-auto': 'Automatiske Blokkeringer',
        'stat-shorts': 'Shorts Blokkert',
        'stat-lang': 'Språkblokkeringer',
        'recent-title': 'Nylig Blokkert',
        'view-all-btn': 'Se Alle',
        'blocked-title': 'Blokkerte Videoer',
        'blocked-subtitle': 'Administrer alle videoer du har blokkert fra YouTube-strømmen din',
        'col-title': 'Videotittel',
        'col-id': 'Video-ID',
        'col-reason': 'Årsak',
        'col-date': 'Dato Blokkert',
        'col-actions': 'Handlinger',
        'filter-all': 'Alle Årsaker',
        'filter-manual': 'Manuell Blokkering',
        'filter-keyword': 'Nøkkelordsmatch',
        'filter-shorts': 'Shorts',
        'filter-language': 'Språk',
        'sort-newest': 'Nyeste Først',
        'sort-oldest': 'Eldste Først',
        'sort-title': 'Tittel A-Å',
        'export-btn': 'Eksporter',
        'clear-all-btn': 'Fjern Alle',
        'loading-text': 'Laster dine blokkerte videoer...',
        'empty-title': 'Ingen videoer blokkert ennå',
        'empty-subtitle': 'Begynn å rydde opp i YouTube-opplevelsen din ved å blokkere uønskede videoer',
        'empty-action': 'Legg til Nøkkelord for Automatisk Blokkering',
        'keywords-title': 'Nøkkelordbehandler',
        'keywords-subtitle': 'Blokker automatisk videoer som inneholder spesifikke nøkkelord eller fraser',
        'save-keywords': 'Lagre Nøkkelord',
        'clear-keywords': 'Fjern Alle',
        'keywords-count-label': 'Nøkkelordtelling:',
        'keywords-format-label': 'Format:',
        'help-title': 'Hvordan bruke nøkkelord',
        'help-line1': 'Skriv inn ett nøkkelord per linje eller separer med komma',
        'help-line2': 'Bruk spesifikke fraser for bedre nøyaktighet',
        'help-line3': 'Nøkkelord er ikke følsomme for store/små bokstaver',
        'help-line4': 'Støtter flere språk: Engelsk, Arabisk, Hindi, Bangla, etc.',
        'help-line5': 'Bruk pipe | for synonymer: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimum 2000 nøkkelord støttes',
        'support-title': 'Støtte & Hjelp',
        'support-subtitle': 'Få hjelp, rapporter problemer og lær hvordan du bruker Clify effektivt',
        'contact-title': 'Kontakt Støtte',
        'contact-subtitle': 'Har du problemer eller forslag? Vi er her for å hjelpe deg å få mest mulig ut av Clify.',
        'name-label': 'Ditt Navn *',
        'email-label': 'Din E-post *',
        'category-label': 'Problemkategori *',
        'category-bug': 'Feilrapport',
        'category-feature': 'Funksjonsforespørsel',
        'category-help': 'Trenger Hjelp',
        'category-suggestion': 'Forslag',
        'category-other': 'Annet',
        'message-label': 'Din Melding *',
        'send-message': 'Send Melding',
        'sending-message': 'Sender...',
        'resources-title': 'Hjelperessurser',
        'resource-faq': 'FAQ & Feilsøking',
        'resource-faq-desc': 'Vanlige spørsmål og løsninger',
        'resource-guide': 'Brukerhåndbok',
        'resource-guide-desc': 'Lær hvordan du bruker alle funksjoner',
        'resource-bugs': 'Rapporter Feil',
        'resource-bugs-desc': 'Funnet et problem? Gi oss beskjed',
        'resource-features': 'Foreslå Funksjoner',
        'resource-features-desc': 'Del dine ideer til forbedring',
        'about-title': 'Om Clify',
        'version-text': 'Versjon:',
        'about-description': 'Clify hjelper deg å holde fokus ved å skjule distraherende YouTube-innhold. Det fungerer lokalt i nettleseren din og respekterer personvernet ditt - ingen data sendes til eksterne servere.',
        'feature-privacy': 'Personvern Først',
        'feature-fast': 'Lynrask',
        'feature-realtime': 'Sanntidsblokkering',
        'footer-made': 'Laget med ❤️ for en fokusert YouTube-opplevelse',
        'validation-required': 'Vennligst fyll ut alle obligatoriske felt.',
        'validation-message-length': 'Vennligst gi en mer detaljert melding (minst 10 tegn).',
        'contact-success-telegram': 'Takk! Meldingen din har blitt sendt til støtteteamet vårt via Telegram. Vi kommer snart tilbake til deg.',
        'contact-success-local': 'Takk! Meldingen din er lagret. Vi vil gjennomgå den når vi er koblet til internett.',
        'contact-error': 'Beklager, det oppstod en feil ved sending av meldingen din. Prøv igjen senere eller kontakt oss direkte.',
        'capacity-text': 'Din Lagring',
        'capacity-normal': 'Lagringen din ser bra ut! Fortsett å blokkere de irriterende videoene. 😊',
        'capacity-warning': 'Obs! Lagring blir full ({percent}%) 📦',
        'capacity-critical': 'Advarsel! Lagring full ({percent}%) 🚨',
        'capacity-full': 'Hei! Lagringen din er helt full. Du må fjerne noen videoer for å blokkere nye. 🚨',
        'capacity-warning-full': 'Obs! Lagring nesten full ({percent}%) - vurder å fjerne noen videoer',
        'telegram-connected': 'Tilkoblet Telegram',
        'telegram-disconnected': 'Telegram Frakoblet',
        'telegram-message-sent': 'Telegram-tilkoblingstest vellykket!',
        'test-success': 'Test Vellykket',
        'test-failed': 'Test Mislykket',
        'days-ago': 'dager siden',
        'hours-ago': 'timer siden',
        'minutes-ago': 'minutter siden',
        'just-now': 'Akkurat nå',
        'results-text': 'videoer',
        'support-header-text': 'Støtte',
        'donate-header-text': 'Doner',
        'stat-manual': 'Manuelle Blokkeringer (Clify-knapp)',
        'stat-auto': 'Blokkert Av Nøkkelord'
    },
    ro: { // Romanian
        'welcome-title': 'Bine ai venit la Clify! ⚡',
        'welcome-subtitle': 'Preia controlul asupra experienței tale pe YouTube blocând automat conținutul nedorit',
        'tab-dash': 'Panou Control',
        'tab-blocked': 'Videoclipuri Blocate',
        'tab-keywords': 'Cuvinte Cheie',
        'tab-support': 'Suport',
        'refresh-text': 'Reîmprospătează',
        'theme-text': 'Temă',
        'stat-today': 'Blocări Azi',
        'stat-total': 'Total Blocate',
        'stat-efficiency': 'Eficiență',
        'activity-title': 'Activitate Blocare',
        'activity-subtitle': 'Ultimele 30 de zile',
        'stat-keywords': 'Cuvinte Cheie Active',
        'stat-manual': 'Blocări Manuale',
        'stat-auto': 'Blocări Automate',
        'stat-shorts': 'Shorts Blocate',
        'stat-lang': 'Blocări Limbă',
        'recent-title': 'Blocate Recent',
        'view-all-btn': 'Vezi Toate',
        'blocked-title': 'Videoclipuri Blocate',
        'blocked-subtitle': 'Gestionează toate videoclipurile pe care le-ai blocat din fluxul tău YouTube',
        'col-title': 'Titlu Video',
        'col-id': 'ID Video',
        'col-reason': 'Motiv',
        'col-date': 'Dată Blocată',
        'col-actions': 'Acțiuni',
        'filter-all': 'Toate Motivele',
        'filter-manual': 'Blocare Manuală',
        'filter-keyword': 'Potrivire Cuvânt Cheie',
        'filter-shorts': 'Shorts',
        'filter-language': 'Limbă',
        'sort-newest': 'Cele Mai Noi Prima Dată',
        'sort-oldest': 'Cele Mai Vechi Prima Dată',
        'sort-title': 'Titlu A-Z',
        'export-btn': 'Exportă',
        'clear-all-btn': 'Șterge Tot',
        'loading-text': 'Se încarcă videoclipurile tale blocate...',
        'empty-title': 'Niciun videoclip blocat încă',
        'empty-subtitle': 'Începe să cureți experiența ta de YouTube blocând videoclipuri nedorite',
        'empty-action': 'Adaugă Cuvinte Cheie pentru Blocare Automată',
        'keywords-title': 'Manager Cuvinte Cheie',
        'keywords-subtitle': 'Blochează automat videoclipuri care conțin cuvinte cheie sau fraze specifice',
        'save-keywords': 'Salvează Cuvinte Cheie',
        'clear-keywords': 'Șterge Tot',
        'keywords-count-label': 'Număr Cuvinte Cheie:',
        'keywords-format-label': 'Format:',
        'help-title': 'Cum să folosești cuvinte cheie',
        'help-line1': 'Introdu un cuvânt cheie pe linie sau separă cu virgule',
        'help-line2': 'Folosește fraze specifice pentru o acuratețe mai bună',
        'help-line3': 'Cuvintele cheie nu sunt sensibile la majuscule/minuscule',
        'help-line4': 'Suportă mai multe limbi: Engleză, Arabă, Hindi, Bangla, etc.',
        'help-line5': 'Folosește pipe | pentru sinonime: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximum 2000 de cuvinte cheie sunt suportate',
        'support-title': 'Suport & Ajutor',
        'support-subtitle': 'Obține ajutor, raportează probleme și învață cum să folosești Clify eficient',
        'contact-title': 'Contactează Suport',
        'contact-subtitle': 'Ai probleme sau sugestii? Suntem aici să te ajutăm să obții maximul de la Clify.',
        'name-label': 'Numele Tău *',
        'email-label': 'Emailul Tău *',
        'category-label': 'Categorie Problemă *',
        'category-bug': 'Raportare Bug',
        'category-feature': 'Cerere Funcționalitate',
        'category-help': 'Nevoie de Ajutor',
        'category-suggestion': 'Sugestie',
        'category-other': 'Altele',
        'message-label': 'Mesajul Tău *',
        'send-message': 'Trimite Mesaj',
        'sending-message': 'Se trimite...',
        'resources-title': 'Resurse de Ajutor',
        'resource-faq': 'Întrebări Frecvente & Depanare',
        'resource-faq-desc': 'Întrebări și soluții comune',
        'resource-guide': 'Ghid Utilizator',
        'resource-guide-desc': 'Învață cum să folosești toate funcționalitățile',
        'resource-bugs': 'Raportează Bug-uri',
        'resource-bugs-desc': 'Ai găsit o problemă? Anunță-ne',
        'resource-features': 'Sugerează Funcționalități',
        'resource-features-desc': 'Împărtășește-ți ideile pentru îmbunătățiri',
        'about-title': 'Despre Clify',
        'version-text': 'Versiune:',
        'about-description': 'Clify te ajută să rămâi concentrat prin ascunderea conținutului derutant de pe YouTube. Funcționează local în browserul tău și respectă confidențialitatea ta - nicio date nu este trimisă către servere externe.',
        'feature-privacy': 'Confidențialitate Pe Primul Loc',
        'feature-fast': 'Fulgerător',
        'feature-realtime': 'Blocare în Timp Real',
        'footer-made': 'Realizat cu ❤️ pentru o experiență YouTube concentrată',
        'validation-required': 'Te rog completează toate câmpurile obligatorii.',
        'validation-message-length': 'Te rog oferă un mesaj mai detaliat (cel puțin 10 caractere).',
        'contact-success-telegram': 'Mulțumim! Mesajul tău a fost trimis echipei noastre de suport prin Telegram. Vă vom contacta în curând.',
        'contact-success-local': 'Mulțumim! Mesajul tău a fost salvat. Îl vom revizui când suntem conectați la internet.',
        'contact-error': 'Ne pare rău, a apărut o eroare la trimiterea mesajului tău. Te rog încearcă mai târziu sau contactează-ne direct.',
        'capacity-text': 'Spațiul Tău de Stocare',
        'capacity-normal': 'Spațiul tău de stocare arată grozav! Continuă să blochezi acele videoclipuri enervante. 😊',
        'capacity-warning': 'Atenție! Spațiul de stocare se apropie de plin ({percent}%) 📦',
        'capacity-critical': 'Alertă! Spațiul de stocare plin ({percent}%) 🚨',
        'capacity-full': 'Hei! Spațiul tău de stocare este complet plin. Trebuie să ștergi unele videoclipuri pentru a bloca altele noi. 🚨',
        'capacity-warning-full': 'Atenție! Spațiul de stocare aproape plin ({percent}%) - consideră ștergerea unor videoclipuri',
        'telegram-connected': 'Conectat la Telegram',
        'telegram-disconnected': 'Telegram Deconectat',
        'telegram-message-sent': 'Test de conexiune Telegram reușit!',
        'test-success': 'Test Reușit',
        'test-failed': 'Test Eșuat',
        'days-ago': 'zile în urmă',
        'hours-ago': 'ore în urmă',
        'minutes-ago': 'minute în urmă',
        'just-now': 'Chiar acum',
        'results-text': 'videoclipuri',
        'support-header-text': 'Suport',
        'donate-header-text': 'Donează',
        'stat-manual': 'Blocări Manuale (Buton Clify)',
        'stat-auto': 'Blocat Prin Cuvânt Cheie'
    },
    da: { // Danish (Dansk)
        'welcome-title': 'Velkommen til Clify! ⚡',
        'welcome-subtitle': 'Tag kontrol over din YouTube-oplevelse ved automatisk at blokere uønsket indhold',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Blokerede Videoer',
        'tab-keywords': 'Nøgleord',
        'tab-support': 'Support',
        'refresh-text': 'Opdater',
        'theme-text': 'Tema',
        'stat-today': 'Dagens Blokeringer',
        'stat-total': 'Totalt Blokeret',
        'stat-efficiency': 'Effektivitet',
        'activity-title': 'Blokeringsaktivitet',
        'activity-subtitle': 'Sidste 30 dage',
        'stat-keywords': 'Aktive Nøgleord',
        'stat-manual': 'Manuelle Blokeringer',
        'stat-auto': 'Automatiske Blokeringer',
        'stat-shorts': 'Shorts Blokeret',
        'stat-lang': 'Sprogblokeringer',
        'recent-title': 'Nyligt Blokeret',
        'view-all-btn': 'Se Alle',
        'blocked-title': 'Blokerede Videoer',
        'blocked-subtitle': 'Administrer alle videoer, du har blokeret fra dit YouTube-feed',
        'col-title': 'Videotitel',
        'col-id': 'Video-ID',
        'col-reason': 'Årsag',
        'col-date': 'Dato Blokeret',
        'col-actions': 'Handlinger',
        'filter-all': 'Alle Årsager',
        'filter-manual': 'Manuel Blokering',
        'filter-keyword': 'Nøgleordsmatch',
        'filter-shorts': 'Shorts',
        'filter-language': 'Sprog',
        'sort-newest': 'Nyeste Først',
        'sort-oldest': 'Ældste Først',
        'sort-title': 'Titel A-Å',
        'export-btn': 'Eksportér',
        'clear-all-btn': 'Ryd Alle',
        'loading-text': 'Indlæser dine blokerede videoer...',
        'empty-title': 'Ingen videoer blokeret endnu',
        'empty-subtitle': 'Begynd at rydde op i din YouTube-oplevelse ved at blokere uønskede videoer',
        'empty-action': 'Tilføj Nøgleord til Automatisk Blokering',
        'keywords-title': 'Nøgleordshåndtering',
        'keywords-subtitle': 'Bloker automatisk videoer, der indeholder specifikke nøgleord eller sætninger',
        'save-keywords': 'Gem Nøgleord',
        'clear-keywords': 'Ryd Alle',
        'keywords-count-label': 'Nøgleordstælling:',
        'keywords-format-label': 'Format:',
        'help-title': 'Sådan bruger du nøgleord',
        'help-line1': 'Indtast ét nøgleord pr. linje eller adskil med kommaer',
        'help-line2': 'Brug specifikke sætninger for bedre nøjagtighed',
        'help-line3': 'Nøgleord er ikke følsomme over for store/små bogstaver',
        'help-line4': 'Understøtter flere sprog: Engelsk, Arabisk, Hindi, Bangla, osv.',
        'help-line5': 'Brug pipe | for synonymer: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimalt 2000 nøgleord understøttes',
        'support-title': 'Support & Hjælp',
        'support-subtitle': 'Få hjælp, rapporter problemer og lær hvordan du bruger Clify effektivt',
        'contact-title': 'Kontakt Support',
        'contact-subtitle': 'Har du problemer eller forslag? Vi er her for at hjælpe dig med at få mest mulig ud af Clify.',
        'name-label': 'Dit Navn *',
        'email-label': 'Din E-mail *',
        'category-label': 'Problemkategori *',
        'category-bug': 'Fejlrapport',
        'category-feature': 'Funktionsanmodning',
        'category-help': 'Har Brug for Hjælp',
        'category-suggestion': 'Forslag',
        'category-other': 'Andet',
        'message-label': 'Din Besked *',
        'send-message': 'Send Besked',
        'sending-message': 'Sender...',
        'resources-title': 'Hjælperessourcer',
        'resource-faq': 'FAQ & Fejlfinding',
        'resource-faq-desc': 'Almindelige spørgsmål og løsninger',
        'resource-guide': 'Brugervejledning',
        'resource-guide-desc': 'Lær hvordan du bruger alle funktioner',
        'resource-bugs': 'Rapporter Fejl',
        'resource-bugs-desc': 'Fundet et problem? Fortæl os det',
        'resource-features': 'Foreslå Funktioner',
        'resource-features-desc': 'Del dine ideer til forbedring',
        'about-title': 'Om Clify',
        'version-text': 'Version:',
        'about-description': 'Clify hjælper dig med at holde fokus ved at skjule distraherende YouTube-indhold. Det fungerer lokalt i din browser og respekterer dit privatliv - ingen data sendes til eksterne servere.',
        'feature-privacy': 'Privatliv Først',
        'feature-fast': 'Lynhurtig',
        'feature-realtime': 'Realtidsblokering',
        'footer-made': 'Lavet med ❤️ til en fokuseret YouTube-oplevelse',
        'validation-required': 'Udfyld venligst alle obligatoriske felter.',
        'validation-message-length': 'Angiv venligst en mere detaljeret besked (mindst 10 tegn).',
        'contact-success-telegram': 'Tak! Din besked er blevet sendt til vores supportteam via Telegram. Vi vender snart tilbage.',
        'contact-success-local': 'Tak! Din besked er blevet gemt. Vi gennemgår den, når vi er forbundet til internettet.',
        'contact-error': 'Beklager, der opstod en fejl under afsendelse af din besked. Prøv venligst igen senere eller kontakt os direkte.',
        'capacity-text': 'Din Lagerplads',
        'capacity-normal': 'Din lagerplads ser godt ud! Bliv ved med at blokere de irriterende videoer. 😊',
        'capacity-warning': 'Heads up! Lagerplads bliver fuld ({percent}%) 📦',
        'capacity-critical': 'Advarsel! Lagerplads fuld ({percent}%) 🚨',
        'capacity-full': 'Hey! Din lagerplads er helt fuld. Du skal rydde nogle videoer for at blokere nye. 🚨',
        'capacity-warning-full': 'Heads up! Lagerplads næsten fuld ({percent}%) - overvej at rydde nogle videoer',
        'telegram-connected': 'Forbundet til Telegram',
        'telegram-disconnected': 'Telegram Afbrudt',
        'telegram-message-sent': 'Telegram-forbindelsestest succesfuld!',
        'test-success': 'Test Succesfuld',
        'test-failed': 'Test Mislykket',
        'days-ago': 'dage siden',
        'hours-ago': 'timer siden',
        'minutes-ago': 'minutter siden',
        'just-now': 'Lige nu',
        'results-text': 'videoer',
        'support-header-text': 'Support',
        'donate-header-text': 'Doner',
        'stat-manual': 'Manuelle Blokeringer (Clify-knap)',
        'stat-auto': 'Blokeret Ved Nøgleord'
    },
    tl: { // Filipino (Tagalog)
        'welcome-title': 'Maligayang Pagdating sa Clify! ⚡',
        'welcome-subtitle': 'Kontrolin ang iyong karanasan sa YouTube sa pamamagitan ng awtomatikong pag-block ng hindi gustong nilalaman',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Na-block na Mga Video',
        'tab-keywords': 'Mga Keyword',
        'tab-support': 'Suporta',
        'refresh-text': 'I-refresh',
        'theme-text': 'Tema',
        'stat-today': 'Mga Block Ngayon',
        'stat-total': 'Kabuuang Na-block',
        'stat-efficiency': 'Kahusayan',
        'activity-title': 'Aktibidad sa Pag-block',
        'activity-subtitle': 'Huling 30 Araw',
        'stat-keywords': 'Aktibong Mga Keyword',
        'stat-manual': 'Manual na Pag-block',
        'stat-auto': 'Awtomatikong Pag-block',
        'stat-shorts': 'Na-block na Shorts',
        'stat-lang': 'Pag-block ng Wika',
        'recent-title': 'Kamakailang Na-block',
        'view-all-btn': 'Tingnan Lahat',
        'blocked-title': 'Na-block na Mga Video',
        'blocked-subtitle': 'Pamahalaan ang lahat ng video na iyong na-block mula sa iyong YouTube feed',
        'col-title': 'Pamagat ng Video',
        'col-id': 'Video ID',
        'col-reason': 'Dahilan',
        'col-date': 'Petsa Na-block',
        'col-actions': 'Mga Aksyon',
        'filter-all': 'Lahat ng Dahilan',
        'filter-manual': 'Manual na Pag-block',
        'filter-keyword': 'Tugma ng Keyword',
        'filter-shorts': 'Shorts',
        'filter-language': 'Wika',
        'sort-newest': 'Pinakabago Una',
        'sort-oldest': 'Pinakaluma Una',
        'sort-title': 'Pamagat A-Z',
        'export-btn': 'I-export',
        'clear-all-btn': 'I-clear Lahat',
        'loading-text': 'Naglo-load ng iyong na-block na mga video...',
        'empty-title': 'Wala pang na-block na mga video',
        'empty-subtitle': 'Simulan ang paglilinis ng iyong karanasan sa YouTube sa pamamagitan ng pag-block ng hindi gustong mga video',
        'empty-action': 'Magdagdag ng Mga Keyword para sa Awtomatikong Pag-block',
        'keywords-title': 'Tagapamahala ng Keyword',
        'keywords-subtitle': 'Awtomatikong i-block ang mga video na naglalaman ng partikular na mga keyword o parirala',
        'save-keywords': 'I-save ang Mga Keyword',
        'clear-keywords': 'I-clear Lahat',
        'keywords-count-label': 'Bilang ng Keyword:',
        'keywords-format-label': 'Format:',
        'help-title': 'Paano gamitin ang mga keyword',
        'help-line1': 'Ilagay ang isang keyword bawat linya o paghiwalayin ng koma',
        'help-line2': 'Gumamit ng partikular na parirala para sa mas mahusay na kawastuhan',
        'help-line3': 'Ang mga keyword ay hindi case-sensitive',
        'help-line4': 'Sumusuporta sa maraming wika: Ingles, Arabe, Hindi, Bangla, atbp.',
        'help-line5': 'Gumamit ng pipe | para sa mga kasingkahulugan: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Sinusuportahan ang hanggang 2000 na keyword',
        'support-title': 'Suporta & Tulong',
        'support-subtitle': 'Kumuha ng tulong, mag-ulat ng mga isyu, at matutunan kung paano gamitin ang Clify nang epektibo',
        'contact-title': 'Makipag-ugnayan sa Suporta',
        'contact-subtitle': 'May mga problema o mungkahi? Narito kami upang tulungan kang makuha ang pinakamahusay sa Clify.',
        'name-label': 'Ang Iyong Pangalan *',
        'email-label': 'Ang Iyong Email *',
        'category-label': 'Kategorya ng Isyu *',
        'category-bug': 'Ulat ng Bug',
        'category-feature': 'Hiling sa Feature',
        'category-help': 'Kailangan ng Tulong',
        'category-suggestion': 'Mungkahi',
        'category-other': 'Iba Pa',
        'message-label': 'Ang Iyong Mensahe *',
        'send-message': 'Ipadala ang Mensahe',
        'sending-message': 'Ipinapadala...',
        'resources-title': 'Mga Mapagkukunan ng Tulong',
        'resource-faq': 'FAQ & Pag-troubleshoot',
        'resource-faq-desc': 'Karaniwang mga tanong at solusyon',
        'resource-guide': 'Gabay ng Gumagamit',
        'resource-guide-desc': 'Matutunan kung paano gamitin ang lahat ng mga feature',
        'resource-bugs': 'I-ulat ang Mga Bug',
        'resource-bugs-desc': 'Nakakita ng isyu? Ipaalam sa amin',
        'resource-features': 'Iminungkahi ang Mga Feature',
        'resource-features-desc': 'Ibahagi ang iyong mga ideya para sa pagpapabuti',
        'about-title': 'Tungkol sa Clify',
        'version-text': 'Bersyon:',
        'about-description': 'Tumutulong ang Clify na manatili kang nakatutok sa pamamagitan ng pagtatago ng nakakagambalang nilalaman ng YouTube. Gumagana ito nang lokal sa iyong browser at iginagalang ang iyong privacy - walang data na ipinadala sa mga panlabas na server.',
        'feature-privacy': 'Privacy Una',
        'feature-fast': 'Napakabilis',
        'feature-realtime': 'Real-time na Pag-block',
        'footer-made': 'Ginawa nang may ❤️ para sa isang nakatutok na karanasan sa YouTube',
        'validation-required': 'Mangyaring punan ang lahat ng kinakailangang mga field.',
        'validation-message-length': 'Mangyaring magbigay ng mas detalyadong mensahe (kahit 10 character).',
        'contact-success-telegram': 'Salamat! Naipadala ang iyong mensahe sa aming support team sa pamamagitan ng Telegram. Babalikan ka namin sa lalong madaling panahon.',
        'contact-success-local': 'Salamat! Na-save ang iyong mensahe. Susuriin namin ito kapag nakakonekta sa internet.',
        'contact-error': 'Paumanhin, nagkaroon ng error sa pagpapadala ng iyong mensahe. Mangyaring subukan muli mamaya o makipag-ugnayan sa amin nang direkta.',
        'capacity-text': 'Iyong Storage',
        'capacity-normal': 'Mukhang mahusay ang iyong storage! Patuloy na i-block ang mga nakakainis na video. 😊',
        'capacity-warning': 'Heads up! Papuno na ang storage ({percent}%) 📦',
        'capacity-critical': 'Alert! Storage puno ({percent}%) 🚨',
        'capacity-full': 'Hoy! Ganap nang puno ang iyong storage. Kailangan mong mag-clear ng ilang video para makapag-block ng mga bago. 🚨',
        'capacity-warning-full': 'Heads up! Halos puno na ang storage ({percent}%) - isaalang-alang ang pag-clear ng ilang video',
        'telegram-connected': 'Nakakonekta sa Telegram',
        'telegram-disconnected': 'Hindi Nakakonekta sa Telegram',
        'telegram-message-sent': 'Matagumpay ang pagsubok sa koneksyon ng Telegram!',
        'test-success': 'Matagumpay ang Pagsubok',
        'test-failed': 'Nabigo ang Pagsubok',
        'days-ago': 'araw ang nakalipas',
        'hours-ago': 'oras ang nakalipas',
        'minutes-ago': 'minuto ang nakalipas',
        'just-now': 'Ngayon lang',
        'results-text': 'mga video',
        'support-header-text': 'Suporta',
        'donate-header-text': 'Mag-donate',
        'stat-manual': 'Manual na Pag-block (Clify Button)',
        'stat-auto': 'Na-block sa Pamamagitan ng Keyword'
    }, 
    ne: { // Nepali (नेपाली)
        'welcome-title': 'क्लाइफीमा स्वागत छ! ⚡',
        'welcome-subtitle': 'अनचाहे सामग्री स्वचालित रूपमा ब्लक गरेर तपाईंको YouTube अनुभव नियन्त्रण गर्नुहोस्',
        'tab-dash': 'ड्यासबोर्ड',
        'tab-blocked': 'ब्लक गरिएका भिडियोहरू',
        'tab-keywords': 'कीवर्डहरू',
        'tab-support': 'सहयोग',
        'refresh-text': 'रिफ्रेस गर्नुहोस्',
        'theme-text': 'थीम',
        'stat-today': 'आजका ब्लकहरू',
        'stat-total': 'कुल ब्लक गरियो',
        'stat-efficiency': 'दक्षता',
        'activity-title': 'ब्लक गर्ने गतिविधि',
        'activity-subtitle': 'पछिल्लो ३० दिन',
        'stat-keywords': 'सक्रिय कीवर्डहरू',
        'stat-manual': 'म्यानुअल ब्लकहरू',
        'stat-auto': 'स्वचालित ब्लकहरू',
        'stat-shorts': 'शर्ट्स ब्लक गरियो',
        'stat-lang': 'भाषा ब्लकहरू',
        'recent-title': 'भर्खरै ब्लक गरियो',
        'view-all-btn': 'सबै हेर्नुहोस्',
        'blocked-title': 'ब्लक गरिएका भिडियोहरू',
        'blocked-subtitle': 'तपाईंले आफ्नो YouTube फिडबाट ब्लक गरेका सबै भिडियोहरू व्यवस्थापन गर्नुहोस्',
        'col-title': 'भिडियो शीर्षक',
        'col-id': 'भिडियो आईडी',
        'col-reason': 'कारण',
        'col-date': 'मिति ब्लक गरियो',
        'col-actions': 'कार्यहरू',
        'filter-all': 'सबै कारणहरू',
        'filter-manual': 'म्यानुअल ब्लक',
        'filter-keyword': 'कीवर्ड म्याच',
        'filter-shorts': 'शर्ट्स',
        'filter-language': 'भाषा',
        'sort-newest': 'नयाँ पहिले',
        'sort-oldest': 'पुरानो पहिले',
        'sort-title': 'शीर्षक क-ज्ञ',
        'export-btn': 'निर्यात गर्नुहोस्',
        'clear-all-btn': 'सबै हटाउनुहोस्',
        'loading-text': 'तपाईंका ब्लक गरिएका भिडियोहरू लोड हुँदैछ...',
        'empty-title': 'अहिले सम्म कुनै भिडियो ब्लक गरिएको छैन',
        'empty-subtitle': 'अनचाहे भिडियोहरू ब्लक गरेर आफ्नो YouTube अनुभव सफा गर्न सुरु गर्नुहोस्',
        'empty-action': 'स्वचालित ब्लकिंगको लागि कीवर्डहरू थप्नुहोस्',
        'keywords-title': 'कीवर्ड प्रबन्धक',
        'keywords-subtitle': 'विशिष्ट कीवर्ड वा वाक्यांशहरू समावेश गर्ने भिडियोहरू स्वचालित रूपमा ब्लक गर्नुहोस्',
        'save-keywords': 'कीवर्डहरू सेभ गर्नुहोस्',
        'clear-keywords': 'सबै हटाउनुहोस्',
        'keywords-count-label': 'कीवर्ड गणना:',
        'keywords-format-label': 'ढाँचा:',
        'help-title': 'कसरी कीवर्ड प्रयोग गर्ने',
        'help-line1': 'प्रति लाइन एउटा कीवर्ड प्रविष्ट गर्नुहोस् वा अल्पविरामले अलग गर्नुहोस्',
        'help-line2': 'राम्रो सटीकताको लागि विशिष्ट वाक्यांशहरू प्रयोग गर्नुहोस्',
        'help-line3': 'कीवर्डहरू केस-संवेदनशील छैनन्',
        'help-line4': 'धेरै भाषाहरू समर्थन गर्दछ: अंग्रेजी, अरबी, हिन्दी, बंगाली, आदि',
        'help-line5': 'समानार्थीहरूको लागि पाइप | प्रयोग गर्नुहोस्: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'अधिकतम २००० कीवर्ड समर्थित',
        'support-title': 'सहयोग र मद्दत',
        'support-subtitle': 'मद्दत प्राप्त गर्नुहोस्, समस्याहरू रिपोर्ट गर्नुहोस्, र Clify प्रभावकारी रूपमा प्रयोग गर्न सिक्नुहोस्',
        'contact-title': 'सहयोग सम्पर्क गर्नुहोस्',
        'contact-subtitle': 'समस्या वा सुझावहरू छन्? हामी तपाईंलाई Clify बाट अधिकतम लाभ उठाउन मद्दत गर्न यहाँ छौं',
        'name-label': 'तपाईंको नाम *',
        'email-label': 'तपाईंको इमेल *',
        'category-label': 'समस्या श्रेणी *',
        'category-bug': 'बग रिपोर्ट',
        'category-feature': 'फिचर अनुरोध',
        'category-help': 'मद्दत आवश्यक',
        'category-suggestion': 'सुझाव',
        'category-other': 'अन्य',
        'message-label': 'तपाईंको सन्देश *',
        'send-message': 'सन्देश पठाउनुहोस्',
        'sending-message': 'पठाइँदै...',
        'resources-title': 'सहायता स्रोतहरू',
        'resource-faq': 'सामान्य प्रश्नहरू र समस्या समाधान',
        'resource-faq-desc': 'सामान्य प्रश्नहरू र समाधानहरू',
        'resource-guide': 'प्रयोगकर्ता गाइड',
        'resource-guide-desc': 'सबै फिचरहरू कसरी प्रयोग गर्ने भनेर सिक्नुहोस्',
        'resource-bugs': 'बगहरू रिपोर्ट गर्नुहोस्',
        'resource-bugs-desc': 'समस्या भेटियो? हामीलाई जानकारी दिनुहोस्',
        'resource-features': 'फिचरहरू सुझाव दिनुहोस्',
        'resource-features-desc': 'सुधारको लागि तपाईंका विचारहरू साझा गर्नुहोस्',
        'about-title': 'Clify को बारेमा',
        'version-text': 'संस्करण:',
        'about-description': 'Clify ले तपाईंलाई ध्यान भंग गर्ने YouTube सामग्री लुकाएर केन्द्रित रहन मद्दत गर्दछ। यो तपाईंको ब्राउजरमा स्थानीय रूपमा काम गर्दछ र तपाईंको गोपनीयतालाई सम्मान गर्दछ - कुनै डाटा बाह्य सर्भरहरूमा पठाइँदैन',
        'feature-privacy': 'गोपनीयता पहिलो',
        'feature-fast': 'बिजुली झैँ छिटो',
        'feature-realtime': 'रीयल-टाइम ब्लकिंग',
        'footer-made': 'एक केन्द्रित YouTube अनुभवको लागि ❤️ साथ बनाइयो',
        'validation-required': 'कृपया सबै आवश्यक क्षेत्रहरू भर्नुहोस्',
        'validation-message-length': 'कृपया अधिक विस्तृत सन्देश प्रदान गर्नुहोस् (कम्तिमा १० अक्षर)',
        'contact-success-telegram': 'धन्यवाद! तपाईंको सन्देश हाम्रो सहयोग टिममा Telegram मार्फत पठाइएको छ। हामी चाँडै तपाईंसम्पर्क गर्नेछौं',
        'contact-success-local': 'धन्यवाद! तपाईंको सन्देश सेभ गरियो। हामी इन्टरनेटमा जडान हुँदा यसलाई समीक्षा गर्नेछौं',
        'contact-error': 'माफ गर्नुहोस्, तपाईंको सन्देश पठाउँदा त्रुटि भयो। कृपया पछि फेरि प्रयास गर्नुहोस् वा प्रत्यक्ष रूपमा हामीलाई सम्पर्क गर्नुहोस्',
        'capacity-text': 'तपाईंको भण्डारण',
        'capacity-normal': 'तपाईंको भण्डारण राम्रो देखिन्छ! ती चिड्चिडे भिडियोहरू ब्लक गर्न जारी राख्नुहोस्। 😊',
        'capacity-warning': 'ध्यान दिनुहोस्! भण्डारण भरिँदै ({percent}%) 📦',
        'capacity-critical': 'अलर्ट! भण्डारण पूर्ण ({percent}%) 🚨',
        'capacity-full': 'हे! तपाईंको भण्डारण पूर्ण भएको छ। तपाईंले नयाँ भिडियोहरू ब्लक गर्न केही भिडियोहरू हटाउनुपर्छ। 🚨',
        'capacity-warning-full': 'ध्यान दिनुहोस्! भण्डारण लगभग पूर्ण ({percent}%) - केही भिडियोहरू हटाउने विचार गर्नुहोस्',
        'telegram-connected': 'Telegram मा जडान भयो',
        'telegram-disconnected': 'Telegram डिस्कनेक्ट भयो',
        'telegram-message-sent': 'Telegram जडान परीक्षण सफल!',
        'test-success': 'परीक्षण सफल',
        'test-failed': 'परीक्षण असफल',
        'days-ago': 'दिन अघि',
        'hours-ago': 'घण्टा अघि',
        'minutes-ago': 'मिनेट अघि',
        'just-now': 'भर्खरै',
        'results-text': 'भिडियोहरू',
        'support-header-text': 'सहयोग',
        'donate-header-text': 'दान गर्नुहोस्',
        'stat-manual': 'म्यानुअल ब्लकहरू (Clify बटन)',
        'stat-auto': 'कीवर्ड द्वारा ब्लक गरियो'
    },
    he: { // Hebrew (עברית)
        'welcome-title': 'ברוכים הבאים לקליפי! ⚡',
        'welcome-subtitle': 'קחו שליטה בחוויית YouTube שלכם על ידי חסימת תוכן לא רצוי אוטומטית',
        'tab-dash': 'לוח מחוונים',
        'tab-blocked': 'סרטונים חסומים',
        'tab-keywords': 'מילות מפתח',
        'tab-support': 'תמיכה',
        'refresh-text': 'רענן',
        'theme-text': 'ערכת נושא',
        'stat-today': 'חסימות היום',
        'stat-total': 'סה"כ חסום',
        'stat-efficiency': 'יעילות',
        'activity-title': 'פעילות חסימה',
        'activity-subtitle': '30 הימים האחרונים',
        'stat-keywords': 'מילות מפתח פעילות',
        'stat-manual': 'חסימות ידניות',
        'stat-auto': 'חסימות אוטומטיות',
        'stat-shorts': 'Shorts חסומים',
        'stat-lang': 'חסימות שפה',
        'recent-title': 'נחסם לאחרונה',
        'view-all-btn': 'הצג הכל',
        'blocked-title': 'סרטונים חסומים',
        'blocked-subtitle': 'נהל את כל הסרטונים שחסמת מהפיד שלך ב-YouTube',
        'col-title': 'כותרת הסרטון',
        'col-id': 'מזהה סרטון',
        'col-reason': 'סיבה',
        'col-date': 'תאריך חסימה',
        'col-actions': 'פעולות',
        'filter-all': 'כל הסיבות',
        'filter-manual': 'חסימה ידנית',
        'filter-keyword': 'התאמת מילת מפתח',
        'filter-shorts': 'Shorts',
        'filter-language': 'שפה',
        'sort-newest': 'החדשים ביותר ראשונים',
        'sort-oldest': 'הישנים ביותר ראשונים',
        'sort-title': 'כותרת א-ת',
        'export-btn': 'ייצא',
        'clear-all-btn': 'נקה הכל',
        'loading-text': 'טוען את הסרטונים החסומים שלך...',
        'empty-title': 'אין עדיין סרטונים חסומים',
        'empty-subtitle': 'התחל לנקות את חוויית ה-YouTube שלך על ידי חסימת סרטונים לא רצויים',
        'empty-action': 'הוסף מילות מפתח לחסימה אוטומטית',
        'keywords-title': 'מנהל מילות מפתח',
        'keywords-subtitle': 'חסום אוטומטית סרטונים המכילים מילות מפתח או ביטויים ספציפיים',
        'save-keywords': 'שמור מילות מפתח',
        'clear-keywords': 'נקה הכל',
        'keywords-count-label': 'ספירת מילות מפתח:',
        'keywords-format-label': 'פורמט:',
        'help-title': 'כיצד להשתמש במילות מפתח',
        'help-line1': 'הזן מילת מפתח אחת בכל שורה או הפרד בפסיקים',
        'help-line2': 'השתמש בביטויים ספציפיים לדיוק טוב יותר',
        'help-line3': 'מילות מפתח אינן תלויות רישיות',
        'help-line4': 'תומך במגוון שפות: אנגלית, ערבית, הינדי, בנגלית, ועוד',
        'help-line5': 'השתמש בצינור | למילים נרדפות: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'מקסימום 2000 מילות מפתח נתמכות',
        'support-title': 'תמיכה ועזרה',
        'support-subtitle': 'קבל עזרה, דווח על בעיות ולמד כיצד להשתמש ב-Clify בצורה יעילה',
        'contact-title': 'צור קשר עם התמיכה',
        'contact-subtitle': 'יש בעיות או הצעות? אנחנו כאן כדי לעזור לך להפיק את המירב מ-Clify',
        'name-label': 'השם שלך *',
        'email-label': 'האימייל שלך *',
        'category-label': 'קטגוריית בעיה *',
        'category-bug': 'דיווח באג',
        'category-feature': 'בקשה לתכונה',
        'category-help': 'נדרשת עזרה',
        'category-suggestion': 'הצעה',
        'category-other': 'אחר',
        'message-label': 'ההודעה שלך *',
        'send-message': 'שלח הודעה',
        'sending-message': 'שולח...',
        'resources-title': 'משאבי עזרה',
        'resource-faq': 'שאלות נפוצות ופתרון בעיות',
        'resource-faq-desc': 'שאלות ופתרונות נפוצים',
        'resource-guide': 'מדריך משתמש',
        'resource-guide-desc': 'למד כיצד להשתמש בכל התכונות',
        'resource-bugs': 'דווח על באגים',
        'resource-bugs-desc': 'מצאת בעיה? הודע לנו',
        'resource-features': 'הצע תכונות',
        'resource-features-desc': 'שתף את הרעיונות שלך לשיפור',
        'about-title': 'על Clify',
        'version-text': 'גרסה:',
        'about-description': 'Clify עוזר לך להישאר ממוקד על ידי הסתרת תוכן YouTube מסיח את הדעת. זה פועל באופן מקומי בדפדפן שלך ומכבד את הפרטיות שלך - אין נתונים שנשלחים לשרתים חיצוניים',
        'feature-privacy': 'פרטיות ראשונה',
        'feature-fast': 'מהיר כברק',
        'feature-realtime': 'חסימה בזמן אמת',
        'footer-made': 'נוצר ב-❤️ לחוויית YouTube ממוקדת',
        'validation-required': 'אנא מלא את כל השדות הנדרשים',
        'validation-message-length': 'אנא ספק הודעה מפורטת יותר (לפחות 10 תווים)',
        'contact-success-telegram': 'תודה! ההודעה שלך נשלחה לצוות התמיכה שלנו דרך Telegram. נחזור אליך בקרוב',
        'contact-success-local': 'תודה! ההודעה שלך נשמרה. נבדוק אותה כשאנו מחוברים לאינטרנט',
        'contact-error': 'מצטערים, אירעה שגיאה בשליחת ההודעה שלך. אנא נסה שוב מאוחר יותר או פנה אלינו ישירות',
        'capacity-text': 'האחסון שלך',
        'capacity-normal': 'האחסון שלך נראה מצוין! המשך לחסום את הסרטונים המציקים האלה. 😊',
        'capacity-warning': 'שים לב! האחסון מתמלא ({percent}%) 📦',
        'capacity-critical': 'אזהרה! האחסון מלא ({percent}%) 🚨',
        'capacity-full': 'היי! האחסון שלך מלא לגמרי. אתה צריך לנקות כמה סרטונים כדי לחסום חדשים. 🚨',
        'capacity-warning-full': 'שים לב! האחסון כמעט מלא ({percent}%) - שקול לנקות כמה סרטונים',
        'telegram-connected': 'מחובר ל-Telegram',
        'telegram-disconnected': 'Telegram מנותק',
        'telegram-message-sent': 'בדיקת חיבור ל-Telegram הצליחה!',
        'test-success': 'בדיקה הצליחה',
        'test-failed': 'בדיקה נכשלה',
        'days-ago': 'ימים לפני',
        'hours-ago': 'שעות לפני',
        'minutes-ago': 'דקות לפני',
        'just-now': 'ממש עכשיו',
        'results-text': 'סרטונים',
        'support-header-text': 'תמיכה',
        'donate-header-text': 'תרום',
        'stat-manual': 'חסימות ידניות (כפתור Clify)',
        'stat-auto': 'נחסם על ידי מילת מפתח'
    },
    ta: { // Tamil (தமிழ்)
        'welcome-title': 'Clifyக்கு வரவேற்கிறோம்! ⚡',
        'welcome-subtitle': 'தேவையற்ற உள்ளடக்கங்களை தானாகவே தடுப்பதன் மூலம் உங்கள் YouTube அனுபவத்தை கட்டுப்படுத்தவும்',
        'tab-dash': 'டாஷ்போர்டு',
        'tab-blocked': 'தடுக்கப்பட்ட வீடியோக்கள்',
        'tab-keywords': 'முக்கிய வார்த்தைகள்',
        'tab-support': 'ஆதரவு',
        'refresh-text': 'புதுப்பிக்கவும்',
        'theme-text': 'தீம்',
        'stat-today': 'இன்றைய தடுப்புகள்',
        'stat-total': 'மொத்தம் தடுக்கப்பட்டது',
        'stat-efficiency': 'திறன்',
        'activity-title': 'தடுப்பு செயல்பாடு',
        'activity-subtitle': 'கடந்த 30 நாட்கள்',
        'stat-keywords': 'செயலில் உள்ள முக்கிய வார்த்தைகள்',
        'stat-manual': 'கைமுறை தடுப்புகள்',
        'stat-auto': 'தானியங்கி தடுப்புகள்',
        'stat-shorts': 'Shorts தடுக்கப்பட்டது',
        'stat-lang': 'மொழி தடுப்புகள்',
        'recent-title': 'சமீபத்தில் தடுக்கப்பட்டது',
        'view-all-btn': 'அனைத்தையும் காண்க',
        'blocked-title': 'தடுக்கப்பட்ட வீடியோக்கள்',
        'blocked-subtitle': 'உங்கள் YouTube ஃபீட்டிலிருந்து நீங்கள் தடுத்த அனைத்து வீடியோக்களையும் நிர்வகிக்கவும்',
        'col-title': 'வீடியோ தலைப்பு',
        'col-id': 'வீடியோ ஐடி',
        'col-reason': 'காரணம்',
        'col-date': 'தடுக்கப்பட்ட தேதி',
        'col-actions': 'செயல்கள்',
        'filter-all': 'அனைத்து காரணங்கள்',
        'filter-manual': 'கைமுறை தடுப்பு',
        'filter-keyword': 'முக்கிய வார்த்தை பொருத்தம்',
        'filter-shorts': 'Shorts',
        'filter-language': 'மொழி',
        'sort-newest': 'புதியது முதலில்',
        'sort-oldest': 'பழையது முதலில்',
        'sort-title': 'தலைப்பு அ-ஃ',
        'export-btn': 'ஏற்றுமதி',
        'clear-all-btn': 'அனைத்தையும் அழி',
        'loading-text': 'உங்கள் தடுக்கப்பட்ட வீடியோக்கள் ஏற்றப்படுகின்றன...',
        'empty-title': 'இன்னும் வீடியோக்கள் தடுக்கப்படவில்லை',
        'empty-subtitle': 'தேவையற்ற வீடியோக்களை தடுப்பதன் மூலம் உங்கள் YouTube அனுபவத்தை சுத்தம் செய்ய தொடங்கவும்',
        'empty-action': 'தானியங்கி தடுப்புக்கான முக்கிய வார்த்தைகளைச் சேர்க்கவும்',
        'keywords-title': 'முக்கிய வார்த்தை மேலாளர்',
        'keywords-subtitle': 'குறிப்பிட்ட முக்கிய வார்த்தைகள் அல்லது சொற்றொடர்களைக் கொண்ட வீடியோக்களை தானாகவே தடுக்கவும்',
        'save-keywords': 'முக்கிய வார்த்தைகளை சேமிக்கவும்',
        'clear-keywords': 'அனைத்தையும் அழி',
        'keywords-count-label': 'முக்கிய வார்த்தைகள் எண்ணிக்கை:',
        'keywords-format-label': 'வடிவம்:',
        'help-title': 'முக்கிய வார்த்தைகளை எவ்வாறு பயன்படுத்துவது',
        'help-line1': 'ஒரு வரியில் ஒரு முக்கிய வார்த்தையை உள்ளிடவும் அல்லது கமாவால் பிரிக்கவும்',
        'help-line2': 'சிறந்த துல்லியத்திற்கு குறிப்பிட்ட சொற்றொடர்களைப் பயன்படுத்தவும்',
        'help-line3': 'முக்கிய வார்த்தைகள் வழக்கு-உணர்வற்றவை',
        'help-line4': 'பல மொழிகளை ஆதரிக்கிறது: ஆங்கிலம், அரபு, இந்தி, வங்காளம், முதலியன',
        'help-line5': 'பொருள் சொற்களுக்கு பைப் | பயன்படுத்தவும்: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'அதிகபட்சம் 2000 முக்கிய வார்த்தைகள் ஆதரிக்கப்படுகின்றன',
        'support-title': 'ஆதரவு & உதவி',
        'support-subtitle': 'உதவி பெறவும், சிக்கல்களைப் புகாரளிக்கவும், Clifyஐ திறம்படப் பயன்படுத்துவது எப்படி என்பதைக் கற்றுக் கொள்ளவும்',
        'contact-title': 'ஆதரவைத் தொடர்பு கொள்ளவும்',
        'contact-subtitle': 'சிக்கல்கள் அல்லது பரிந்துரைகள் உள்ளனவா? Clifyயிலிருந்து அதிகபட்சம் பெற உங்களுக்கு உதவ நாங்கள் இங்கே இருக்கிறோம்',
        'name-label': 'உங்கள் பெயர் *',
        'email-label': 'உங்கள் மின்னஞ்சல் *',
        'category-label': 'சிக்கல் வகை *',
        'category-bug': 'பிழை அறிக்கை',
        'category-feature': 'அம்ச கோரிக்கை',
        'category-help': 'உதவி தேவை',
        'category-suggestion': 'பரிந்துரை',
        'category-other': 'மற்றவை',
        'message-label': 'உங்கள் செய்தி *',
        'send-message': 'செய்தியை அனுப்பவும்',
        'sending-message': 'அனுப்புகிறது...',
        'resources-title': 'உதவி வளங்கள்',
        'resource-faq': 'FAQ & சிக்கல் தீர்வு',
        'resource-faq-desc': 'பொதுவான கேள்விகள் மற்றும் தீர்வுகள்',
        'resource-guide': 'பயனர் வழிகாட்டி',
        'resource-guide-desc': 'அனைத்து அம்சங்களையும் எவ்வாறு பயன்படுத்துவது என்பதைக் கற்றுக்கொள்ளுங்கள்',
        'resource-bugs': 'பிழைகளைப் புகாரளிக்கவும்',
        'resource-bugs-desc': 'ஒரு சிக்கலைக் கண்டீர்களா? எங்களுக்குத் தெரியப்படுத்துங்கள்',
        'resource-features': 'அம்சங்களைப் பரிந்துரைக்கவும்',
        'resource-features-desc': 'மேம்பாட்டிற்கான உங்கள் யோசனைகளைப் பகிரவும்',
        'about-title': 'Clify பற்றி',
        'version-text': 'பதிப்பு:',
        'about-description': 'கவனத்தை சிதறடிக்கும் YouTube உள்ளடக்கத்தை மறைப்பதன் மூலம் கவனம் செலுத்த உங்களுக்கு Clify உதவுகிறது. இது உங்கள் உலாவியில் உள்ளூரில் செயல்படுகிறது மற்றும் உங்கள் தனியுரிமையை மதிக்கிறது - வெளிப்புற சேவையகங்களுக்கு எந்த தரவும் அனுப்பப்படுவதில்லை',
        'feature-privacy': 'தனியுரிமை முதல்',
        'feature-fast': 'மின்னல் வேகம்',
        'feature-realtime': 'நிகழ்நேர தடுப்பு',
        'footer-made': 'ஒரு கவனம் செலுத்தும் YouTube அனுபவத்திற்காக ❤️ உடன் உருவாக்கப்பட்டது',
        'validation-required': 'தயவுசெய்து அனைத்து தேவையான புலங்களையும் நிரப்பவும்',
        'validation-message-length': 'மிகவும் விரிவான செய்தியை வழங்கவும் (குறைந்தது 10 எழுத்துகள்)',
        'contact-success-telegram': 'நன்றி! உங்கள் செய்தி எங்கள் ஆதரவு குழுவிற்கு Telegram மூலம் அனுப்பப்பட்டது. விரைவில் உங்களைத் தொடர்பு கொள்வோம்',
        'contact-success-local': 'நன்றி! உங்கள் செய்தி சேமிக்கப்பட்டது. இணையத்துடன் இணைக்கப்படும் போது அதை மதிப்பாய்வு செய்வோம்',
        'contact-error': 'மன்னிக்கவும், உங்கள் செய்தியை அனுப்பும்போது பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும் அல்லது நேரடியாக எங்களைத் தொடர்பு கொள்ளவும்',
        'capacity-text': 'உங்கள் சேமிப்பு',
        'capacity-normal': 'உங்கள் சேமிப்பு அருமையாக உள்ளது! அந்த எரிச்சலூட்டும் வீடியோக்களைத் தடுக்கத் தொடருங்கள். 😊',
        'capacity-warning': 'கவனம்! சேமிப்பு நிரம்புகிறது ({percent}%) 📦',
        'capacity-critical': 'எச்சரிக்கை! சேமிப்பு நிரம்பியது ({percent}%) 🚨',
        'capacity-full': 'ஏய்! உங்கள் சேமிப்பு முற்றிலும் நிரம்பியுள்ளது. புதிய வீடியோக்களைத் தடுக்க நீங்கள் சில வீடியோக்களை அழிக்க வேண்டும். 🚨',
        'capacity-warning-full': 'கவனம்! சேமிப்பு கிட்டத்தட்ட நிரம்பியது ({percent}%) - சில வீடியோக்களை அழிக்க கருதுங்கள்',
        'telegram-connected': 'Telegram உடன் இணைக்கப்பட்டது',
        'telegram-disconnected': 'Telegram துண்டிக்கப்பட்டது',
        'telegram-message-sent': 'Telegram இணைப்பு சோதனை வெற்றிகரமாக!',
        'test-success': 'சோதனை வெற்றிகரமாக',
        'test-failed': 'சோதனை தோல்வியுற்றது',
        'days-ago': 'நாட்களுக்கு முன்பு',
        'hours-ago': 'மணிநேரங்களுக்கு முன்பு',
        'minutes-ago': 'நிமிடங்களுக்கு முன்பு',
        'just-now': 'இப்போதுதான்',
        'results-text': 'வீடியோக்கள்',
        'support-header-text': 'ஆதரவு',
        'donate-header-text': 'நன்கொடை அளிக்கவும்',
        'stat-manual': 'கைமுறை தடுப்புகள் (Clify பொத்தான்)',
        'stat-auto': 'முக்கிய வார்த்தையால் தடுக்கப்பட்டது'
    },
    te: { // Telugu (తెలుగు)
        'welcome-title': 'Clify కు స్వాగతం! ⚡',
        'welcome-subtitle': 'అవాంఛిత కంటెంట్‌ను స్వయంచాలకంగా బ్లాక్ చేయడం ద్వారా మీ YouTube అనుభవాన్ని నియంత్రించండి',
        'tab-dash': 'డాష్‌బోర్డ్',
        'tab-blocked': 'బ్లాక్ చేయబడిన వీడియోలు',
        'tab-keywords': 'కీలక పదాలు',
        'tab-support': 'మద్దతు',
        'refresh-text': 'రిఫ్రెష్ చేయండి',
        'theme-text': 'థీమ్',
        'stat-today': 'నేటి బ్లాకులు',
        'stat-total': 'మొత్తం బ్లాక్ చేయబడింది',
        'stat-efficiency': 'సామర్థ్యం',
        'activity-title': 'బ్లాకింగ్ కార్యాచరణ',
        'activity-subtitle': 'గత 30 రోజులు',
        'stat-keywords': 'యాక్టివ్ కీలక పదాలు',
        'stat-manual': 'మాన్యువల్ బ్లాకులు',
        'stat-auto': 'ఆటోమేటిక్ బ్లాకులు',
        'stat-shorts': 'Shorts బ్లాక్ చేయబడింది',
        'stat-lang': 'భాషా బ్లాకులు',
        'recent-title': 'ఇటీవల బ్లాక్ చేయబడింది',
        'view-all-btn': 'అన్నీ చూడండి',
        'blocked-title': 'బ్లాక్ చేయబడిన వీడియోలు',
        'blocked-subtitle': 'మీ YouTube ఫీడ్ నుండి మీరు బ్లాక్ చేసిన అన్ని వీడియోలను నిర్వహించండి',
        'col-title': 'వీడియో శీర్షిక',
        'col-id': 'వీడియో ఐడి',
        'col-reason': 'కారణం',
        'col-date': 'బ్లాక్ చేయబడిన తేదీ',
        'col-actions': 'చర్యలు',
        'filter-all': 'అన్ని కారణాలు',
        'filter-manual': 'మాన్యువల్ బ్లాక్',
        'filter-keyword': 'కీలక పదం మ్యాచ్',
        'filter-shorts': 'Shorts',
        'filter-language': 'భాష',
        'sort-newest': 'కొత్తవి ముందు',
        'sort-oldest': 'పాతవి ముందు',
        'sort-title': 'శీర్షిక అ-ఱ',
        'export-btn': 'ఎగుమతి చేయండి',
        'clear-all-btn': 'అన్నీ క్లియర్ చేయండి',
        'loading-text': 'మీ బ్లాక్ చేయబడిన వీడియోలు లోడ్ అవుతున్నాయి...',
        'empty-title': 'ఇంకా వీడియోలు బ్లాక్ చేయబడలేదు',
        'empty-subtitle': 'అవాంఛిత వీడియోలను బ్లాక్ చేయడం ద్వారా మీ YouTube అనుభవాన్ని శుభ్రపరచడం ప్రారంభించండి',
        'empty-action': 'స్వయంచాలక బ్లాకింగ్ కోసం కీలక పదాలను జోడించండి',
        'keywords-title': 'కీలక పద నిర్వాహక',
        'keywords-subtitle': 'నిర్దిష్ట కీలక పదాలు లేదా పదబంధాలు కలిగిన వీడియోలను స్వయంచాలకంగా బ్లాక్ చేయండి',
        'save-keywords': 'కీలక పదాలను సేవ్ చేయండి',
        'clear-keywords': 'అన్నీ క్లియర్ చేయండి',
        'keywords-count-label': 'కీలక పదాల సంఖ్య:',
        'keywords-format-label': 'ఫార్మాట్:',
        'help-title': 'కీలక పదాలను ఎలా ఉపయోగించాలి',
        'help-line1': 'ప్రతి లైన్‌కు ఒక కీలక పదాన్ని నమోదు చేయండి లేదా కామాతో వేరు చేయండి',
        'help-line2': 'మెరుగైన ఖచ్చితత్వం కోసం నిర్దిష్ట పదబంధాలను ఉపయోగించండి',
        'help-line3': 'కీలక పదాలు కేస్-సెన్సిటివ్ కావు',
        'help-line4': 'బహుళ భాషలను మద్దతు ఇస్తుంది: ఇంగ్లీష్, అరబిక్, హిందీ, బంగ్లా, మొదలైనవి',
        'help-line5': 'పర్యాయపదాల కోసం పైప్ | ఉపయోగించండి: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'గరిష్టంగా 2000 కీలక పదాలు మద్దతు ఇవ్వబడతాయి',
        'support-title': 'మద్దతు & సహాయం',
        'support-subtitle': 'సహాయం పొందండి, సమస్యలను నివేదించండి మరియు Clify ను ప్రభావవంతంగా ఎలా ఉపయోగించాలో నేర్చుకోండి',
        'contact-title': 'మద్దతును సంప్రదించండి',
        'contact-subtitle': 'సమస్యలు లేదా సూచనలు ఉన్నాయా? Clify నుండి గరిష్టంగా పొందడంలో మీకు సహాయం చేయడానికి మేము ఇక్కడ ఉన్నాము',
        'name-label': 'మీ పేరు *',
        'email-label': 'మీ ఇమెయిల్ *',
        'category-label': 'సమస్య వర్గం *',
        'category-bug': 'బగ్ నివేదిక',
        'category-feature': 'ఫీచర్ అభ్యర్థన',
        'category-help': 'సహాయం అవసరం',
        'category-suggestion': 'సూచన',
        'category-other': 'ఇతరాలు',
        'message-label': 'మీ సందేశం *',
        'send-message': 'సందేశం పంపండి',
        'sending-message': 'పంపిస్తోంది...',
        'resources-title': 'సహాయ వనరులు',
        'resource-faq': 'FAQ & ట్రబుల్‌షూటింగ్',
        'resource-faq-desc': 'సాధారణ ప్రశ్నలు మరియు పరిష్కారాలు',
        'resource-guide': 'యూజర్ గైడ్',
        'resource-guide-desc': 'అన్ని ఫీచర్‌లను ఎలా ఉపయోగించాలో నేర్చుకోండి',
        'resource-bugs': 'బగ్‌లను నివేదించండి',
        'resource-bugs-desc': 'సమస్య కనుగొన్నారా? మాకు తెలియజేయండి',
        'resource-features': 'ఫీచర్‌లను సూచించండి',
        'resource-features-desc': 'మెరుగుపరచడానికి మీ ఆలోచనలను భాగస్వామ్యం చేయండి',
        'about-title': 'Clify గురించి',
        'version-text': 'వెర్షన్:',
        'about-description': 'ఏకాగ్రతను అంతరాయం చేసే YouTube కంటెంట్‌ను దాచడం ద్వారా దృష్టి పెట్టడంలో Clify మీకు సహాయపడుతుంది. ఇది మీ బ్రౌజర్‌లో స్థానికంగా పనిచేస్తుంది మరియు మీ గోప్యతను గౌరవిస్తుంది - బాహ్య సర్వర్‌లకు ఏ డేటా పంపబడదు',
        'feature-privacy': 'గోప్యత ముందు',
        'feature-fast': 'మెరుపు వేగం',
        'feature-realtime': 'రియల్-టైమ్ బ్లాకింగ్',
        'footer-made': 'ఏకాగ్రత YouTube అనుభవం కోసం ❤️ తో రూపొందించబడింది',
        'validation-required': 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి',
        'validation-message-length': 'దయచేసి మరింత వివరణాత్మక సందేశాన్ని అందించండి (కనీసం 10 అక్షరాలు)',
        'contact-success-telegram': 'ధన్యవాదాలు! మీ సందేశం మా సపోర్ట్ టీమ్‌కు Telegram ద్వారా పంపబడింది. మేము త్వరలో మీతో సంప్రదిస్తాము',
        'contact-success-local': 'ధన్యవాదాలు! మీ సందేశం సేవ్ చేయబడింది. ఇంటర్నెట్‌కు కనెక్ట్ అయినప్పుడు మేము దానిని సమీక్షిస్తాము',
        'contact-error': 'క్షమించండి, మీ సందేశాన్ని పంపడంలో లోపం సంభవించింది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి లేదా మాకు నేరుగా సంప్రదించండి',
        'capacity-text': 'మీ స్టోరేజ్',
        'capacity-normal': 'మీ స్టోరేజ్ చాలా బాగుంది! ఆ రిచ్చ పుట్టించే వీడియోలను బ్లాక్ చేయడం కొనసాగించండి. 😊',
        'capacity-warning': 'హెడ్స్ అప్! స్టోరేజ్ నిండుతోంది ({percent}%) 📦',
        'capacity-critical': 'హెచ్చరిక! స్టోరేజ్ నిండింది ({percent}%) 🚨',
        'capacity-full': 'హే! మీ స్టోరేజ్ పూర్తిగా నిండింది. కొత్త వాటిని బ్లాక్ చేయడానికి మీరు కొన్ని వీడియోలను క్లియర్ చేయాలి. 🚨',
        'capacity-warning-full': 'హెడ్స్ అప్! స్టోరేజ్ దాదాపు నిండింది ({percent}%) - కొన్ని వీడియోలను క్లియర్ చేయడం పరిగణించండి',
        'telegram-connected': 'Telegram కి కనెక్ట్ చేయబడింది',
        'telegram-disconnected': 'Telegram డిస్‌కనెక్ట్ చేయబడింది',
        'telegram-message-sent': 'Telegram కనెక్షన్ పరీక్ష విజయవంతమైంది!',
        'test-success': 'పరీక్ష విజయవంతమైంది',
        'test-failed': 'పరీక్ష విఫలమైంది',
        'days-ago': 'రోజుల క్రితం',
        'hours-ago': 'గంటల క్రితం',
        'minutes-ago': 'నిమిషాల క్రితం',
        'just-now': 'ఇప్పుడే',
        'results-text': 'వీడియోలు',
        'support-header-text': 'మద్దతు',
        'donate-header-text': 'దానం చేయండి',
        'stat-manual': 'మాన్యువల్ బ్లాకులు (Clify బటన్)',
        'stat-auto': 'కీలక పదం ద్వారా బ్లాక్ చేయబడింది'
    },
    ml: { // Malayalam (മലയാളം)
        'welcome-title': 'Clify ലേക്ക് സ്വാഗതം! ⚡',
        'welcome-subtitle': 'ആവശ്യമില്ലാത്ത ഉള്ളടക്കം സ്വയമേവ തടയുന്നതിലൂടെ നിങ്ങളുടെ YouTube അനുഭവം നിയന്ത്രിക്കുക',
        'tab-dash': 'ഡാഷ്‌ബോർഡ്',
        'tab-blocked': 'തടയപ്പെട്ട വീഡിയോകൾ',
        'tab-keywords': 'കീവേഡുകൾ',
        'tab-support': 'സപ്പോർട്ട്',
        'refresh-text': 'റിഫ്രഷ് ചെയ്യുക',
        'theme-text': 'തീം',
        'stat-today': 'ഇന്നത്തെ ബ്ലോക്കുകൾ',
        'stat-total': 'മൊത്തം തടയപ്പെട്ടു',
        'stat-efficiency': 'കാര്യക്ഷമത',
        'activity-title': 'ബ്ലോക്കിംഗ് പ്രവർത്തനം',
        'activity-subtitle': 'കഴിഞ്ഞ 30 ദിവസം',
        'stat-keywords': 'സജീവ കീവേഡുകൾ',
        'stat-manual': 'മാനുവൽ ബ്ലോക്കുകൾ',
        'stat-auto': 'ഓട്ടോമാറ്റിക് ബ്ലോക്കുകൾ',
        'stat-shorts': 'Shorts തടയപ്പെട്ടു',
        'stat-lang': 'ഭാഷാ ബ്ലോക്കുകൾ',
        'recent-title': 'സമീപകാലത്ത് തടയപ്പെട്ടത്',
        'view-all-btn': 'എല്ലാം കാണുക',
        'blocked-title': 'തടയപ്പെട്ട വീഡിയോകൾ',
        'blocked-subtitle': 'നിങ്ങളുടെ YouTube ഫീഡിൽ നിന്ന് നിങ്ങൾ തടയുന്ന എല്ലാ വീഡിയോകളും മാനേജ് ചെയ്യുക',
        'col-title': 'വീഡിയോ ടൈറ്റിൽ',
        'col-id': 'വീഡിയോ ഐഡി',
        'col-reason': 'കാരണം',
        'col-date': 'തടയപ്പെട്ട തീയതി',
        'col-actions': 'പ്രവർത്തനങ്ങൾ',
        'filter-all': 'എല്ലാ കാരണങ്ങളും',
        'filter-manual': 'മാനുവൽ ബ്ലോക്ക്',
        'filter-keyword': 'കീവേഡ് മാച്ച്',
        'filter-shorts': 'Shorts',
        'filter-language': 'ഭാഷ',
        'sort-newest': 'പുതിയത് ആദ്യം',
        'sort-oldest': 'പഴയത് ആദ്യം',
        'sort-title': 'ടൈറ്റിൽ അ-ഹ',
        'export-btn': 'എക്സ്പോർട്ട് ചെയ്യുക',
        'clear-all-btn': 'എല്ലാം മായ്‌ക്കുക',
        'loading-text': 'നിങ്ങളുടെ തടയപ്പെട്ട വീഡിയോകൾ ലോഡ് ചെയ്യുന്നു...',
        'empty-title': 'ഇതുവരെ വീഡിയോകൾ തടയപ്പെട്ടിട്ടില്ല',
        'empty-subtitle': 'ആവശ്യമില്ലാത്ത വീഡിയോകൾ തടയുന്നതിലൂടെ നിങ്ങളുടെ YouTube അനുഭവം വൃത്തിയാക്കാൻ ആരംഭിക്കുക',
        'empty-action': 'ഓട്ടോമാറ്റിക് ബ്ലോക്കിംഗിനായി കീവേഡുകൾ ചേർക്കുക',
        'keywords-title': 'കീവേഡ് മാനേജർ',
        'keywords-subtitle': 'നിശ്ചിത കീവേഡുകൾ അല്ലെങ്കിൽ വാക്യങ്ങൾ ഉൾക്കൊള്ളുന്ന വീഡിയോകൾ സ്വയമേവ തടയുക',
        'save-keywords': 'കീവേഡുകൾ സേവ് ചെയ്യുക',
        'clear-keywords': 'എല്ലാം മായ്‌ക്കുക',
        'keywords-count-label': 'കീവേഡ് എണ്ണം:',
        'keywords-format-label': 'ഫോർമാറ്റ്:',
        'help-title': 'കീവേഡുകൾ എങ്ങനെ ഉപയോഗിക്കാം',
        'help-line1': 'ഓരോ വരിയിലും ഒരു കീവേഡ് നൽകുക അല്ലെങ്കിൽ കോമയിൽ വേർതിരിക്കുക',
        'help-line2': 'മെച്ചപ്പെട്ട കൃത്യതയ്ക്കായി നിശ്ചിത വാക്യങ്ങൾ ഉപയോഗിക്കുക',
        'help-line3': 'കീവേഡുകൾ കേസ്-സെൻസിറ്റീവ് അല്ല',
        'help-line4': 'ഒന്നിലധികം ഭാഷകൾ പിന്തുണയ്‌ക്കുന്നു: ഇംഗ്ലീഷ്, അറബിക്, ഹിന്ദി, ബംഗാളി മുതലായവ',
        'help-line5': 'പര്യായങ്ങൾക്കായി പൈപ്പ് | ഉപയോഗിക്കുക: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'പരമാവധി 2000 കീവേഡുകൾ പിന്തുണയ്‌ക്കുന്നു',
        'support-title': 'സപ്പോർട്ട് & സഹായം',
        'support-subtitle': 'സഹായം നേടുക, പ്രശ്നങ്ങൾ റിപ്പോർട്ട് ചെയ്യുക, Clify എങ്ങനെ ഫലപ്രദമായി ഉപയോഗിക്കാം എന്ന് മനസിലാക്കുക',
        'contact-title': 'സപ്പോർട്ട് സമ്പർക്കം',
        'contact-subtitle': 'പ്രശ്നങ്ങളോ നിർദ്ദേശങ്ങളോ ഉണ്ടോ? Clify ൽ നിന്ന് പരമാവധി പ്രയോജനം ഉണ്ടാക്കാൻ ഞങ്ങൾ നിങ്ങളെ സഹായിക്കാൻ ഇവിടെയുണ്ട്',
        'name-label': 'നിങ്ങളുടെ പേര് *',
        'email-label': 'നിങ്ങളുടെ ഇമെയിൽ *',
        'category-label': 'പ്രശ്ന വിഭാഗം *',
        'category-bug': 'ബഗ് റിപ്പോർട്ട്',
        'category-feature': 'ഫീച്ചർ അഭ്യർത്ഥന',
        'category-help': 'സഹായം ആവശ്യമാണ്',
        'category-suggestion': 'നിർദ്ദേശം',
        'category-other': 'മറ്റുള്ളവ',
        'message-label': 'നിങ്ങളുടെ സന്ദേശം *',
        'send-message': 'സന്ദേശം അയയ്‌ക്കുക',
        'sending-message': 'അയയ്‌ക്കുന്നു...',
        'resources-title': 'സഹായ വിഭവങ്ങൾ',
        'resource-faq': 'FAQ & ട്രബിൾഷൂട്ടിംഗ്',
        'resource-faq-desc': 'സാധാരണ ചോദ്യങ്ങളും പരിഹാരങ്ങളും',
        'resource-guide': 'ഉപയോക്തൃ ഗൈഡ്',
        'resource-guide-desc': 'എല്ലാ ഫീച്ചറുകളും എങ്ങനെ ഉപയോഗിക്കാമെന്ന് മനസിലാക്കുക',
        'resource-bugs': 'ബഗുകൾ റിപ്പോർട്ട് ചെയ്യുക',
        'resource-bugs-desc': 'ഒരു പ്രശ്നം കണ്ടെത്തിയോ? ഞങ്ങളെ അറിയിക്കുക',
        'resource-features': 'ഫീച്ചറുകൾ നിർദ്ദേശിക്കുക',
        'resource-features-desc': 'മെച്ചപ്പെടുത്തലിനായി നിങ്ങളുടെ ആശയങ്ങൾ പങ്കിടുക',
        'about-title': 'Clify എന്നതിനെക്കുറിച്ച്',
        'version-text': 'പതിപ്പ്:',
        'about-description': 'ശ്രദ്ധ തടസ്സപ്പെടുത്തുന്ന YouTube ഉള്ളടക്കം മറയ്‌ക്കുന്നതിലൂടെ ശ്രദ്ധ കേന്ദ്രീകരിക്കാൻ Clify നിങ്ങളെ സഹായിക്കുന്നു. ഇത് നിങ്ങളുടെ ബ്രൗസറിൽ പ്രാദേശികമായി പ്രവർത്തിക്കുന്നു, നിങ്ങളുടെ സ്വകാര്യത ബഹുമാനിക്കുന്നു - ബാഹ്യ സെർവറുകളിലേക്ക് ഡാറ്റ അയയ്‌ക്കുന്നില്ല',
        'feature-privacy': 'സ്വകാര്യത ആദ്യം',
        'feature-fast': 'മിന്നൽ വേഗത',
        'feature-realtime': 'റിയൽ-ടൈം ബ്ലോക്കിംഗ്',
        'footer-made': 'ഒരു കേന്ദ്രീകൃത YouTube അനുഭവത്തിനായി ❤️ ഉപയോഗിച്ച് നിർമ്മിച്ചത്',
        'validation-required': 'ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക',
        'validation-message-length': 'ദയവായി കൂടുതൽ വിശദമായ സന്ദേശം നൽകുക (കുറഞ്ഞത് 10 അക്ഷരങ്ങൾ)',
        'contact-success-telegram': 'നന്ദി! നിങ്ങളുടെ സന്ദേശം ഞങ്ങളുടെ സപ്പോർട്ട് ടീമിലേക്ക് Telegram വഴി അയയ്‌ക്കപ്പെട്ടു. ഞങ്ങൾ താമസിയില്ല നിങ്ങളെ സമീപിക്കും',
        'contact-success-local': 'നന്ദി! നിങ്ങളുടെ സന്ദേശം സേവ് ചെയ്തു. ഇന്റർനെറ്റിലേക്ക് കണക്റ്റുചെയ്യുമ്പോൾ ഞങ്ങൾ അത് പരിശോധിക്കും',
        'contact-error': 'ക്ഷമിക്കണം, നിങ്ങളുടെ സന്ദേശം അയയ്‌ക്കുന്നതിൽ ഒരു പിശക് ഉണ്ടായി. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ നേരിട്ട് ഞങ്ങളെ സമ്പർക്കം ചെയ്യുക',
        'capacity-text': 'നിങ്ങളുടെ സംഭരണം',
        'capacity-normal': 'നിങ്ങളുടെ സംഭരണം മികച്ചതായി കാണപ്പെടുന്നു! ആ അരിഷ്ടിപ്പിക്കുന്ന വീഡിയോകൾ തടയുന്നത് തുടരുക. 😊',
        'capacity-warning': 'ശ്രദ്ധിക്കുക! സംഭരണം നിറയുന്നു ({percent}%) 📦',
        'capacity-critical': 'മുന്നറിയിപ്പ്! സംഭരണം നിറഞ്ഞു ({percent}%) 🚨',
        'capacity-full': 'ഹേയ്! നിങ്ങളുടെ സംഭരണം പൂർണ്ണമായി നിറഞ്ഞു. പുതിയവയെ തടയാൻ നിങ്ങൾ ചില വീഡിയോകൾ മായ്‌ക്കേണ്ടതുണ്ട്. 🚨',
        'capacity-warning-full': 'ശ്രദ്ധിക്കുക! സംഭരണം ഏകദേശം നിറഞ്ഞു ({percent}%) - ചില വീഡിയോകൾ മായ്‌ക്കുന്നത് പരിഗണിക്കുക',
        'telegram-connected': 'Telegram ലേക്ക് കണക്റ്റുചെയ്‌തു',
        'telegram-disconnected': 'Telegram വിച്ഛേദിച്ചു',
        'telegram-message-sent': 'Telegram കണക്ഷൻ പരിശോധന വിജയിച്ചു!',
        'test-success': 'പരിശോധന വിജയിച്ചു',
        'test-failed': 'പരിശോധന പരാജയപ്പെട്ടു',
        'days-ago': 'ദിവസങ്ങൾക്ക് മുമ്പ്',
        'hours-ago': 'മണിക്കൂറുകൾക്ക് മുമ്പ്',
        'minutes-ago': 'മിനിറ്റുകൾക്ക് മുമ്പ്',
        'just-now': 'ഇപ്പോൾ തന്നെ',
        'results-text': 'വീഡിയോകൾ',
        'support-header-text': 'സപ്പോർട്ട്',
        'donate-header-text': 'സംഭാവന ചെയ്യുക',
        'stat-manual': 'മാനുവൽ ബ്ലോക്കുകൾ (Clify ബട്ടൺ)',
        'stat-auto': 'കീവേഡ് വഴി തടയപ്പെട്ടു'
    },
    kn: { // Kannada (ಕನ್ನಡ)
        'welcome-title': 'Clify ಗೆ ಸುಸ್ವಾಗತ! ⚡',
        'welcome-subtitle': 'ಅನಗತ್ಯ ವಿಷಯವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿರ್ಬಂಧಿಸುವ ಮೂಲಕ ನಿಮ್ಮ YouTube ಅನುಭವವನ್ನು ನಿಯಂತ್ರಿಸಿ',
        'tab-dash': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        'tab-blocked': 'ನಿರ್ಬಂಧಿತ ವೀಡಿಯೊಗಳು',
        'tab-keywords': 'ಕೀವರ್ಡ್‌ಗಳು',
        'tab-support': 'ಬೆಂಬಲ',
        'refresh-text': 'ರಿಫ್ರೆಶ್ ಮಾಡಿ',
        'theme-text': 'ಥೀಮ್',
        'stat-today': 'ಇಂದಿನ ನಿರ್ಬಂಧಗಳು',
        'stat-total': 'ಒಟ್ಟು ನಿರ್ಬಂಧಿತ',
        'stat-efficiency': 'ದಕ್ಷತೆ',
        'activity-title': 'ನಿರ್ಬಂಧಿಸುವ ಚಟುವಟಿಕೆ',
        'activity-subtitle': 'ಕಳೆದ 30 ದಿನಗಳು',
        'stat-keywords': 'ಸಕ್ರಿಯ ಕೀವರ್ಡ್‌ಗಳು',
        'stat-manual': 'ಮ್ಯಾನುವಲ್ ನಿರ್ಬಂಧಗಳು',
        'stat-auto': 'ಸ್ವಯಂಚಾಲಿತ ನಿರ್ಬಂಧಗಳು',
        'stat-shorts': 'Shorts ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ',
        'stat-lang': 'ಭಾಷಾ ನಿರ್ಬಂಧಗಳು',
        'recent-title': 'ಇತ್ತೀಚೆಗೆ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ',
        'view-all-btn': 'ಎಲ್ಲವನ್ನು ವೀಕ್ಷಿಸಿ',
        'blocked-title': 'ನಿರ್ಬಂಧಿತ ವೀಡಿಯೊಗಳು',
        'blocked-subtitle': 'ನಿಮ್ಮ YouTube ಫೀಡ್‌ನಿಂದ ನೀವು ನಿರ್ಬಂಧಿಸಿದ ಎಲ್ಲಾ ವೀಡಿಯೊಗಳನ್ನು ನಿರ್ವಹಿಸಿ',
        'col-title': 'ವೀಡಿಯೊ ಶೀರ್ಷಿಕೆ',
        'col-id': 'ವೀಡಿಯೊ ಐಡಿ',
        'col-reason': 'ಕಾರಣ',
        'col-date': 'ನಿರ್ಬಂಧಿಸಿದ ದಿನಾಂಕ',
        'col-actions': 'ಕ್ರಿಯೆಗಳು',
        'filter-all': 'ಎಲ್ಲಾ ಕಾರಣಗಳು',
        'filter-manual': 'ಮ್ಯಾನುವಲ್ ನಿರ್ಬಂಧ',
        'filter-keyword': 'ಕೀವರ್ಡ್ ಹೊಂದಾಣಿಕೆ',
        'filter-shorts': 'Shorts',
        'filter-language': 'ಭಾಷೆ',
        'sort-newest': 'ಹೊಸದು ಮೊದಲು',
        'sort-oldest': 'ಹಳೆಯದು ಮೊದಲು',
        'sort-title': 'ಶೀರ್ಷಿಕೆ ಅ-ಱ',
        'export-btn': 'ರಫ್ತು ಮಾಡಿ',
        'clear-all-btn': 'ಎಲ್ಲಾ ತೆರವುಗೊಳಿಸಿ',
        'loading-text': 'ನಿಮ್ಮ ನಿರ್ಬಂಧಿತ ವೀಡಿಯೊಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
        'empty-title': 'ಇನ್ನೂ ವೀಡಿಯೊಗಳು ನಿರ್ಬಂಧಿಸಲ್ಪಟ್ಟಿಲ್ಲ',
        'empty-subtitle': 'ಅನಗತ್ಯ ವೀಡಿಯೊಗಳನ್ನು ನಿರ್ಬಂಧಿಸುವ ಮೂಲಕ ನಿಮ್ಮ YouTube ಅನುಭವವನ್ನು ಶುಚಿಗೊಳಿಸಲು ಪ್ರಾರಂಭಿಸಿ',
        'empty-action': 'ಸ್ವಯಂಚಾಲಿತ ನಿರ್ಬಂಧಕ್ಕಾಗಿ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಸೇರಿಸಿ',
        'keywords-title': 'ಕೀವರ್ಡ್ ನಿರ್ವಾಹಕ',
        'keywords-subtitle': 'ನಿರ್ದಿಷ್ಟ ಕೀವರ್ಡ್‌ಗಳು ಅಥವಾ ವಾಕ್ಯಗಳನ್ನು ಒಳಗೊಂಡಿರುವ ವೀಡಿಯೊಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿರ್ಬಂಧಿಸಿ',
        'save-keywords': 'ಕೀವರ್ಡ್‌ಗಳನ್ನು ಉಳಿಸಿ',
        'clear-keywords': 'ಎಲ್ಲಾ ತೆರವುಗೊಳಿಸಿ',
        'keywords-count-label': 'ಕೀವರ್ಡ್ ಎಣಿಕೆ:',
        'keywords-format-label': 'ಸ್ವರೂಪ:',
        'help-title': 'ಕೀವರ್ಡ್‌ಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು',
        'help-line1': 'ಪ್ರತಿ ಸಾಲಿಗೆ ಒಂದು ಕೀವರ್ಡ್ ನಮೂದಿಸಿ ಅಥವಾ ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿ',
        'help-line2': 'ಉತ್ತಮ ನಿಖರತೆಗಾಗಿ ನಿರ್ದಿಷ್ಟ ವಾಕ್ಯಗಳನ್ನು ಬಳಸಿ',
        'help-line3': 'ಕೀವರ್ಡ್‌ಗಳು ಕೇಸ್-ಸೆನ್ಸಿಟಿವ್ ಅಲ್ಲ',
        'help-line4': 'ಬಹುಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ: ಇಂಗ್ಲಿಷ್, ಅರಬಿಕ್, ಹಿಂದಿ, ಬಂಗಾಳಿ, ಇತ್ಯಾದಿ',
        'help-line5': 'ಸಮಾನಾರ್ಥಕಗಳಿಗಾಗಿ ಪೈಪ್ | ಬಳಸಿ: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'ಗರಿಷ್ಠ 2000 ಕೀವರ್ಡ್‌ಗಳು ಬೆಂಬಲಿತ',
        'support-title': 'ಬೆಂಬಲ & ಸಹಾಯ',
        'support-subtitle': 'ಸಹಾಯ ಪಡೆಯಿರಿ, ಸಮಸ್ಯೆಗಳನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು Clify ಅನ್ನು ಪರಿಣಾಮಕಾರಿಯಾಗಿ ಬಳಸುವುದು ಹೇಗೆ ಎಂದು ತಿಳಿಯಿರಿ',
        'contact-title': 'ಬೆಂಬಲವನ್ನು ಸಂಪರ್ಕಿಸಿ',
        'contact-subtitle': 'ಸಮಸ್ಯೆಗಳು ಅಥವಾ ಸಲಹೆಗಳು ಇದೆಯೇ? Clify ನಿಂದ ಗರಿಷ್ಠ ಪಡೆಯಲು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾವು ಇಲ್ಲಿದ್ದೇವೆ',
        'name-label': 'ನಿಮ್ಮ ಹೆಸರು *',
        'email-label': 'ನಿಮ್ಮ ಇಮೇಲ್ *',
        'category-label': 'ಸಮಸ್ಯೆ ವರ್ಗ *',
        'category-bug': 'ಬಗ್ ವರದಿ',
        'category-feature': 'ವೈಶಿಷ್ಟ್ಯ ವಿನಂತಿ',
        'category-help': 'ಸಹಾಯ ಬೇಕಾಗಿದೆ',
        'category-suggestion': 'ಸಲಹೆ',
        'category-other': 'ಇತರೆ',
        'message-label': 'ನಿಮ್ಮ ಸಂದೇಶ *',
        'send-message': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
        'sending-message': 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...',
        'resources-title': 'ಸಹಾಯ ಸಂಪನ್ಮೂಲಗಳು',
        'resource-faq': 'FAQ & ಸಮಸ್ಯೆ ನಿವಾರಣೆ',
        'resource-faq-desc': 'ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು',
        'resource-guide': 'ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ',
        'resource-guide-desc': 'ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೇಗೆ ಬಳಸುವುದು ಎಂದು ತಿಳಿಯಿರಿ',
        'resource-bugs': 'ಬಗ್‌ಗಳನ್ನು ವರದಿ ಮಾಡಿ',
        'resource-bugs-desc': 'ಸಮಸ್ಯೆ ಕಂಡುಬಂದಿದೆಯೇ? ನಮಗೆ ತಿಳಿಸಿ',
        'resource-features': 'ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಸೂಚಿಸಿ',
        'resource-features-desc': 'ಸುಧಾರಣೆಗಾಗಿ ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
        'about-title': 'Clify ಬಗ್ಗೆ',
        'version-text': 'ಆವೃತ್ತಿ:',
        'about-description': 'ಗಮನವನ್ನು ಹರಿಸುವ YouTube ವಿಷಯವನ್ನು ಮರೆಮಾಡುವ ಮೂಲಕ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಲು Clify ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ. ಇದು ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸ್ಥಳೀಯವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಮತ್ತು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತದೆ - ಬಾಹ್ಯ ಸರ್ವರ್‌ಗಳಿಗೆ ಯಾವುದೇ ಡೇಟಾ ಕಳುಹಿಸಲಾಗುವುದಿಲ್ಲ',
        'feature-privacy': 'ಗೌಪ್ಯತೆ ಮೊದಲು',
        'feature-fast': 'ಮಿಂಚಿನ ವೇಗ',
        'feature-realtime': 'ರಿಯಲ್-ಟೈಮ್ ನಿರ್ಬಂಧ',
        'footer-made': 'ಗಮನ ಕೇಂದ್ರೀಕರಿಸಿದ YouTube ಅನುಭವಕ್ಕಾಗಿ ❤️ ನೊಂದಿಗೆ ಮಾಡಲಾಗಿದೆ',
        'validation-required': 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಪೂರಣ ಮಾಡಿ',
        'validation-message-length': 'ದಯವಿಟ್ಟು ಹೆಚ್ಚು ವಿವರವಾದ ಸಂದೇಶವನ್ನು ನೀಡಿ (ಕನಿಷ್ಠ 10 ಅಕ್ಷರಗಳು)',
        'contact-success-telegram': 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಮ್ಮ ಬೆಂಬಲ ತಂಡಕ್ಕೆ Telegram ಮೂಲಕ ಕಳುಹಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ',
        'contact-success-local': 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಉಳಿಸಲಾಗಿದೆ. ಇಂಟರ್ನೆಟ್‌ಗೆ ಸಂಪರ್ಕಗೊಂಡಾಗ ನಾವು ಅದನ್ನು ಪರಿಶೀಲಿಸುತ್ತೇವೆ',
        'contact-error': 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಕಳುಹಿಸುವಾಗ ದೋಷ ಉಂಟಾಗಿದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ನೇರವಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
        'capacity-text': 'ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ',
        'capacity-normal': 'ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ ಉತ್ತಮವಾಗಿ ಕಾಣುತ್ತಿದೆ! ಆ ಕಿರಿಕಿರಿ ವೀಡಿಯೊಗಳನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತಲೇ ಇರಿ. 😊',
        'capacity-warning': 'ಹೆಡ್ಸ್ ಅಪ್! ಸಂಗ್ರಹಣೆ ತುಂಬುತ್ತಿದೆ ({percent}%) 📦',
        'capacity-critical': 'ಎಚ್ಚರಿಕೆ! ಸಂಗ್ರಹಣೆ ತುಂಬಿದೆ ({percent}%) 🚨',
        'capacity-full': 'ಹೇ! ನಿಮ್ಮ ಸಂಗ್ರಹಣೆ ಪೂರ್ಣವಾಗಿ ತುಂಬಿದೆ. ಹೊಸವುಗಳನ್ನು ನಿರ್ಬಂಧಿಸಲು ನೀವು ಕೆಲವು ವೀಡಿಯೊಗಳನ್ನು ತೆರವುಗೊಳಿಸಬೇಕು. 🚨',
        'capacity-warning-full': 'ಹೆಡ್ಸ್ ಅಪ್! ಸಂಗ್ರಹಣೆ ಸುಮಾರು ತುಂಬಿದೆ ({percent}%) - ಕೆಲವು ವೀಡಿಯೊಗಳನ್ನು ತೆರವುಗೊಳಿಸುವುದನ್ನು ಪರಿಗಣಿಸಿ',
        'telegram-connected': 'Telegram ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ',
        'telegram-disconnected': 'Telegram ಸಂಪರ್ಕ ಕಡಿತಗೊಂಡಿದೆ',
        'telegram-message-sent': 'Telegram ಸಂಪರ್ಕ ಪರೀಕ್ಷೆ ಯಶಸ್ವಿಯಾಗಿದೆ!',
        'test-success': 'ಪರೀಕ್ಷೆ ಯಶಸ್ವಿಯಾಗಿದೆ',
        'test-failed': 'ಪರೀಕ್ಷೆ ವಿಫಲವಾಗಿದೆ',
        'days-ago': 'ದಿನಗಳ ಹಿಂದೆ',
        'hours-ago': 'ಗಂಟೆಗಳ ಹಿಂದೆ',
        'minutes-ago': 'ನಿಮಿಷಗಳ ಹಿಂದೆ',
        'just-now': 'ಇದೀಗ',
        'results-text': 'ವೀಡಿಯೊಗಳು',
        'support-header-text': 'ಬೆಂಬಲ',
        'donate-header-text': 'ದಾನ ಮಾಡಿ',
        'stat-manual': 'ಮ್ಯಾನುವಲ್ ನಿರ್ಬಂಧಗಳು (Clify ಬಟನ್)',
        'stat-auto': 'ಕೀವರ್ಡ್‌ನಿಂದ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ'
    },
    as: { // Assamese (অসমীয়া)
        'welcome-title': 'Clify-লৈ স্বাগতম! ⚡',
        'welcome-subtitle': 'অবাঞ্ছিত বিষয়বস্তু স্বয়ংক্রিয়ভাৱে ব্লক কৰি আপোনাৰ YouTube অভিজ্ঞতা নিয়ন্ত্ৰণ কৰক',
        'tab-dash': 'ডেশ্ববৰ্ড',
        'tab-blocked': 'ব্লক কৰা ভিডিঅ\'',
        'tab-keywords': 'কীৱৰ্ডসমূহ',
        'tab-support': 'সমৰ্থন',
        'refresh-text': 'ৰিফ্ৰেছ কৰক',
        'theme-text': 'থীম',
        'stat-today': 'আজিৰ ব্লকসমূহ',
        'stat-total': 'মুঠ ব্লক কৰা হৈছে',
        'stat-efficiency': 'দক্ষতা',
        'activity-title': 'ব্লকিং কাৰ্যকলাপ',
        'activity-subtitle': 'শেষৰ ৩০ দিন',
        'stat-keywords': 'সক্ৰিয় কীৱৰ্ডসমূহ',
        'stat-manual': 'মেনুৱেল ব্লকসমূহ',
        'stat-auto': 'স্বয়ংক্ৰিয় ব্লকসমূহ',
        'stat-shorts': 'Shorts ব্লক কৰা হৈছে',
        'stat-lang': 'ভাষা ব্লকসমূহ',
        'recent-title': 'সাম্প্ৰতিকতে ব্লক কৰা হৈছে',
        'view-all-btn': 'সকলো চাওক',
        'blocked-title': 'ব্লক কৰা ভিডিঅ\'',
        'blocked-subtitle': 'আপোনাৰ YouTube ফীডৰ পৰা আপুনি ব্লক কৰা সকলো ভিডিঅ\' পৰিচালনা কৰক',
        'col-title': 'ভিডিঅ\' শিৰোনাম',
        'col-id': 'ভিডিঅ\' আইডি',
        'col-reason': 'কাৰণ',
        'col-date': 'ব্লক কৰা তাৰিখ',
        'col-actions': 'কাৰ্য্য',
        'filter-all': 'সকলো কাৰণ',
        'filter-manual': 'মেনুৱেল ব্লক',
        'filter-keyword': 'কীৱৰ্ড মিল',
        'filter-shorts': 'Shorts',
        'filter-language': 'ভাষা',
        'sort-newest': 'নতুনকৈ প্ৰথম',
        'sort-oldest': 'পুৰণাকৈ প্ৰথম',
        'sort-title': 'শিৰোনাম অ-ঔ',
        'export-btn': 'ৰপ্তানি কৰক',
        'clear-all-btn': 'সকলো পৰিষ্কাৰ কৰক',
        'loading-text': 'আপোনাৰ ব্লক কৰা ভিডিঅ\' ল\'ড হৈ আছে...',
        'empty-title': 'এতিয়ালৈকে কোনো ভিডিঅ\' ব্লক কৰা হোৱা নাই',
        'empty-subtitle': 'অবাঞ্ছিত ভিডিঅ\' ব্লক কৰি আপোনাৰ YouTube অভিজ্ঞতা পৰিষ্কাৰ কৰিবলৈ আৰম্ভ কৰক',
        'empty-action': 'স্বয়ংক্ৰিয় ব্লকিংৰ বাবে কীৱৰ্ডসমূহ যোগ কৰক',
        'keywords-title': 'কীৱৰ্ড পৰিচালক',
        'keywords-subtitle': 'নিৰ্দিষ্ট কীৱৰ্ড বা বাক্যাংশ থকা ভিডিঅ\' স্বয়ংক্ৰিয়ভাৱে ব্লক কৰক',
        'save-keywords': 'কীৱৰ্ডসমূহ সংৰক্ষণ কৰক',
        'clear-keywords': 'সকলো পৰিষ্কাৰ কৰক',
        'keywords-count-label': 'কীৱৰ্ড গণনা:',
        'keywords-format-label': 'বিন্যাস:',
        'help-title': 'কীৱৰ্ড কেনেকৈ ব্যৱহাৰ কৰিব',
        'help-line1': 'প্ৰতি শাৰীত এটা কীৱৰ্ড লিখক বা কমাৰে পৃথক কৰক',
        'help-line2': 'উত্তম সঠিকতাৰ বাবে নিৰ্দিষ্ট বাক্যাংশ ব্যৱহাৰ কৰক',
        'help-line3': 'কীৱৰ্ডসমূহ কেছ-সংবেদনশীল নহয়',
        'help-line4': 'বহু ভাষাক সমৰ্থন কৰে: ইংৰাজী, আৰবী, হিন্দী, বাংলা, ইত্যাদি',
        'help-line5': 'সমাৰ্থকৰ বাবে পাইপ | ব্যৱহাৰ কৰক: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'সৰ্বাধিক ২০০০ কীৱৰ্ড সমৰ্থিত',
        'support-title': 'সমৰ্থন আৰু সহায়',
        'support-subtitle': 'সহায় লাভ কৰক, সমস্যাৰ কথা জনাওক আৰু Clify কেনেকৈ ফলপ্ৰসূভাৱে ব্যৱহাৰ কৰিব তাক শিকক',
        'contact-title': 'সমৰ্থনৰ সৈতে যোগাযোগ কৰক',
        'contact-subtitle': 'সমস্যা বা পৰামৰ্শ আছে নেকি? Clify ৰ পৰা সৰ্বাধিক উপকাৰ পাবলৈ আপোনাক সহায় কৰিবলৈ আমি ইয়াত আছো',
        'name-label': 'আপোনাৰ নাম *',
        'email-label': 'আপোনাৰ ইমেইল *',
        'category-label': 'সমস্যা শ্ৰেণী *',
        'category-bug': 'বাগ ৰিপৰ্ট',
        'category-feature': 'ফিচাৰ অনুৰোধ',
        'category-help': 'সহায়ৰ প্ৰয়োজন',
        'category-suggestion': 'পৰামৰ্শ',
        'category-other': 'অন্য',
        'message-label': 'আপোনাৰ বাৰ্তা *',
        'send-message': 'বাৰ্তা প্ৰেৰণ কৰক',
        'sending-message': 'প্ৰেৰণ কৰি আছে...',
        'resources-title': 'সহায় সম্পদ',
        'resource-faq': 'FAQ আৰু সমস্যা সমাধান',
        'resource-faq-desc': 'সাধাৰণ প্ৰশ্ন আৰু সমাধান',
        'resource-guide': 'ব্যৱহাৰকাৰী গাইড',
        'resource-guide-desc': 'সকলো ফিচাৰ কেনেকৈ ব্যৱহাৰ কৰিব তাক শিকক',
        'resource-bugs': 'বাগ ৰিপৰ্ট কৰক',
        'resource-bugs-desc': 'সমস্যা পাইছেনে? আমাক জনাওক',
        'resource-features': 'ফিচাৰ পৰামৰ্শ দিয়ক',
        'resource-features-desc': 'উন্নতিৰ বাবে আপোনাৰ ধাৰণা শ্বেয়াৰ কৰক',
        'about-title': 'Clify ৰ বিষয়ে',
        'version-text': 'সংস্কৰণ:',
        'about-description': 'Clify ৱে মনোযোগ বিচ্ছিন্ন কৰা YouTube বিষয়বস্তু লুকুৱাই ৰাখি মনোনিৱেশ কৰাত আপোনাক সহায় কৰে। ই আপোনাৰ ব্ৰাউজাৰত স্থানীয়ভাৱে কাম কৰে আৰু আপোনাৰ গোপনীয়তা সন্মান কৰে - কোনো তথ্য বাহ্যিক ছাৰ্ভাৰলৈ প্ৰেৰণ কৰা নহয়',
        'feature-privacy': 'গোপনীয়তা প্ৰথম',
        'feature-fast': 'বিজুলীৰ দৰে দ্ৰুত',
        'feature-realtime': 'ৰিয়েল-টাইম ব্লকিং',
        'footer-made': 'এক মনোনিৱেশিত YouTube অভিজ্ঞতাৰ বাবে ❤️ ৰে তৈয়াৰী',
        'validation-required': 'অনুগ্ৰহ কৰি সকলো প্ৰয়োজনীয় ক্ষেত্ৰ পূৰণ কৰক',
        'validation-message-length': 'অনুগ্ৰহ কৰি অধিক বৰ্ণনামূলক বাৰ্তা দিয়ক (অন্তত ১০টা আখৰ)',
        'contact-success-telegram': 'ধন্যবাদ! আপোনাৰ বাৰ্তা Telegram ৰ জৰিয়তে আমাৰ সমৰ্থন দললৈ প্ৰেৰণ কৰা হৈছে। আমি সোনকালে আপোনাৰ সৈতে যোগাযোগ কৰিম',
        'contact-success-local': 'ধন্যবাদ! আপোনাৰ বাৰ্তা সংৰক্ষণ কৰা হৈছে। আমি ইণ্টাৰনেটৰ সৈতে সংযোগ হোৱাৰ পিছত ইয়াক পৰীক্ষা কৰিম',
        'contact-error': 'ক্ষমা কৰিব, আপোনাৰ বাৰ্তা প্ৰেৰণ কৰোতে এটা ত্ৰুটি হৈছে। অনুগ্ৰহ কৰি পিছত পুনৰ চেষ্টা কৰক বা পোনপটীয়াকৈ আমাক যোগাযোগ কৰক',
        'capacity-text': 'আপোনাৰ সংৰক্ষণ',
        'capacity-normal': 'আপোনাৰ সংৰক্ষণ ভাল দেখা গৈছে! সেই বিৰক্তিকৰ ভিডিঅ\'বোৰ ব্লক কৰি থাকক। 😊',
        'capacity-warning': 'মন দিয়ক! সংৰক্ষণ ভৰি আছে ({percent}%) 📦',
        'capacity-critical': 'সতৰ্কবাণী! সংৰক্ষণ ভৰি ({percent}%) 🚨',
        'capacity-full': 'হেঁ! আপোনাৰ সংৰক্ষণ সম্পূৰ্ণৰূপে ভৰি গৈছে। নতুনবোৰ ব্লক কৰিবলৈ আপুনি কিছু ভিডিঅ\' পৰিষ্কাৰ কৰিব লাগিব। 🚨',
        'capacity-warning-full': 'মন দিয়ক! সংৰক্ষণ প্ৰায় ভৰি ({percent}%) - কিছু ভিডিঅ\' পৰিষ্কাৰ কৰিবলৈ বিবেচনা কৰক',
        'telegram-connected': 'Telegram ৰ সৈতে সংযোগ কৰা হৈছে',
        'telegram-disconnected': 'Telegram সংযোগ বিচ্ছিন্ন কৰা হৈছে',
        'telegram-message-sent': 'Telegram সংযোগ পৰীক্ষা সফল!',
        'test-success': 'পৰীক্ষা সফল',
        'test-failed': 'পৰীক্ষা বিফল',
        'days-ago': 'দিন আগতে',
        'hours-ago': 'ঘণ্টা আগতে',
        'minutes-ago': 'মিনিট আগতে',
        'just-now': 'এতিয়াই',
        'results-text': 'ভিডিঅ\'',
        'support-header-text': 'সমৰ্থন',
        'donate-header-text': 'দান কৰক',
        'stat-manual': 'মেনুৱেল ব্লকসমূহ (Clify বুটাম)',
        'stat-auto': 'কীৱৰ্ডৰ দ্বাৰা ব্লক কৰা হৈছে'
    },
    or: { // Odia (ଓଡ଼ିଆ)
        'welcome-title': 'Clify କୁ ସ୍ୱାଗତ! ⚡',
        'welcome-subtitle': 'ଅନାବଶ୍ୟକ ସାମଗ୍ରୀ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ବ୍ଲକ୍ କରି ଆପଣଙ୍କର YouTube ଅଭିଜ୍ଞତା ନିୟନ୍ତ୍ରଣ କରନ୍ତୁ',
        'tab-dash': 'ଡ୍ୟାସବୋର୍ଡ',
        'tab-blocked': 'ବ୍ଲକ୍ ହୋଇଥିବା ଭିଡିଓଗୁଡିକ',
        'tab-keywords': 'କିୱାର୍ଡଗୁଡିକ',
        'tab-support': 'ସହାୟତା',
        'refresh-text': 'ରିଫ୍ରେସ୍ କରନ୍ତୁ',
        'theme-text': 'ଥିମ୍',
        'stat-today': 'ଆଜିର ବ୍ଲକ୍‌ଗୁଡିକ',
        'stat-total': 'ମୋଟ ବ୍ଲକ୍ ହୋଇଛି',
        'stat-efficiency': 'ଦକ୍ଷତା',
        'activity-title': 'ବ୍ଲକ୍ କରିବାର କାର୍ଯ୍ୟକଳାପ',
        'activity-subtitle': 'ଶେଷ 30 ଦିନ',
        'stat-keywords': 'ସକ୍ରିୟ କିୱାର୍ଡଗୁଡିକ',
        'stat-manual': 'ମାନୁଆଲ୍ ବ୍ଲକ୍‌ଗୁଡିକ',
        'stat-auto': 'ସ୍ୱୟଂଚାଳିତ ବ୍ଲକ୍‌ଗୁଡିକ',
        'stat-shorts': 'Shorts ବ୍ଲକ୍ ହୋଇଛି',
        'stat-lang': 'ଭାଷା ବ୍ଲକ୍‌ଗୁଡିକ',
        'recent-title': 'ସାମ୍ପ୍ରତିକ ବ୍ଲକ୍ ହୋଇଛି',
        'view-all-btn': 'ସମସ୍ତ ଦେଖନ୍ତୁ',
        'blocked-title': 'ବ୍ଲକ୍ ହୋଇଥିବା ଭିଡିଓଗୁଡିକ',
        'blocked-subtitle': 'ଆପଣଙ୍କ YouTube ଫିଡ୍ ରୁ ଆପଣ ବ୍ଲକ୍ କରିଥିବା ସମସ୍ତ ଭିଡିଓଗୁଡିକ ପରିଚାଳନା କରନ୍ତୁ',
        'col-title': 'ଭିଡିଓ ଶିରୋନାମା',
        'col-id': 'ଭିଡିଓ ଆଇଡି',
        'col-reason': 'କାରଣ',
        'col-date': 'ବ୍ଲକ୍ କରାଯାଇଥିବା ତାରିଖ',
        'col-actions': 'କାର୍ଯ୍ୟଗୁଡିକ',
        'filter-all': 'ସମସ୍ତ କାରଣ',
        'filter-manual': 'ମାନୁଆଲ୍ ବ୍ଲକ୍',
        'filter-keyword': 'କିୱାର୍ଡ୍ ମେଳ',
        'filter-shorts': 'Shorts',
        'filter-language': 'ଭାଷା',
        'sort-newest': 'ନୂତନତମ ପ୍ରଥମେ',
        'sort-oldest': 'ପୁରାତନ ପ୍ରଥମେ',
        'sort-title': 'ଶିରୋନାମା ଅ-ଌ',
        'export-btn': 'ରପ୍ତାନି କରନ୍ତୁ',
        'clear-all-btn': 'ସମସ୍ତ କ୍ଲିଅର୍ କରନ୍ତୁ',
        'loading-text': 'ଆପଣଙ୍କ ବ୍ଲକ୍ ହୋଇଥିବା ଭିଡିଓଗୁଡିକ ଲୋଡ୍ ହେଉଛି...',
        'empty-title': 'ଏଯାଏଁ କୌଣସି ଭିଡିଓ ବ୍ଲକ୍ ହୋଇନାହିଁ',
        'empty-subtitle': 'ଅନାବଶ୍ୟକ ଭିଡିଓଗୁଡିକ ବ୍ଲକ୍ କରି ଆପଣଙ୍କ YouTube ଅଭିଜ୍ଞତା ସଫା କରିବା ଆରମ୍ଭ କରନ୍ତୁ',
        'empty-action': 'ସ୍ୱୟଂଚାଳିତ ବ୍ଲକିଂ ପାଇଁ କିୱାର୍ଡଗୁଡିକ ଯୋଡନ୍ତୁ',
        'keywords-title': 'କିୱାର୍ଡ୍ ପରିଚାଳକ',
        'keywords-subtitle': 'ନିର୍ଦ୍ଦିଷ୍ଟ କିୱାର୍ଡ୍ କିମ୍ବା ବାକ୍ୟାଂଶ ଥିବା ଭିଡିଓଗୁଡିକ ସ୍ୱୟଂଚାଳିତ ଭାବରେ ବ୍ଲକ୍ କରନ୍ତୁ',
        'save-keywords': 'କିୱାର୍ଡଗୁଡିକ ସେଭ୍ କରନ୍ତୁ',
        'clear-keywords': 'ସମସ୍ତ କ୍ଲିଅର୍ କରନ୍ତୁ',
        'keywords-count-label': 'କିୱାର୍ଡ୍ ଗଣନା:',
        'keywords-format-label': 'ଫର୍ମାଟ୍:',
        'help-title': 'କିୱାର୍ଡଗୁଡିକ କିପରି ବ୍ୟବହାର କରିବେ',
        'help-line1': 'ପ୍ରତି ଧାଡିରେ ଗୋଟିଏ କିୱାର୍ଡ୍ ପ୍ରବେଶ କରନ୍ତୁ କିମ୍ବା କମାରେ ଅଲଗା କରନ୍ତୁ',
        'help-line2': 'ଉନ୍ନତ ସଠିକତା ପାଇଁ ନିର୍ଦ୍ଦିଷ୍ଟ ବାକ୍ୟାଂଶ ବ୍ୟବହାର କରନ୍ତୁ',
        'help-line3': 'କିୱାର୍ଡଗୁଡିକ କେସ୍-ସେନ୍ସିଟିଭ୍ ନୁହଁନ୍ତି',
        'help-line4': 'ଏକାଧିକ ଭାଷାକୁ ସମର୍ଥନ କରେ: ଇଂରାଜୀ, ଆରବୀ, ହିନ୍ଦୀ, ବାଙ୍ଗଲା, ଇତ୍ୟାଦି',
        'help-line5': 'ସିନୋନିମ୍ ପାଇଁ ପାଇପ୍ | ବ୍ୟବହାର କରନ୍ତୁ: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'ସର୍ବାଧିକ 2000 କିୱାର୍ଡ୍ ସମର୍ଥିତ',
        'support-title': 'ସହାୟତା ଏବଂ ସାହାଯ୍ୟ',
        'support-subtitle': 'ସାହାଯ୍ୟ ପାଆନ୍ତୁ, ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ ଏବଂ Clify କିପରି ପ୍ରଭାବଶାଳୀ ଭାବରେ ବ୍ୟବହାର କରିବେ ତାହା ଶିଖନ୍ତୁ',
        'contact-title': 'ସହାୟତା ସଂପର୍କ କରନ୍ତୁ',
        'contact-subtitle': 'ସମସ୍ୟା କିମ୍ବା ପରାମର୍ଶ ଅଛି କି? Clify ରୁ ସର୍ବାଧିକ ଉପକାର ପାଇବାରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରିବାକୁ ଆମେ ଏଠାରେ ଅଛୁ',
        'name-label': 'ଆପଣଙ୍କ ନାମ *',
        'email-label': 'ଆପଣଙ୍କ ଇମେଲ୍ *',
        'category-label': 'ସମସ୍ୟା ବର୍ଗ *',
        'category-bug': 'ବଗ୍ ରିପୋର୍ଟ',
        'category-feature': 'ଫିଚର୍ ଅନୁରୋଧ',
        'category-help': 'ସାହାଯ୍ୟ ଆବଶ୍ୟକ',
        'category-suggestion': 'ପରାମର୍ଶ',
        'category-other': 'ଅନ୍ୟାନ୍ୟ',
        'message-label': 'ଆପଣଙ୍କ ବାର୍ତ୍ତା *',
        'send-message': 'ବାର୍ତ୍ତା ପଠାନ୍ତୁ',
        'sending-message': 'ପଠାଉଛି...',
        'resources-title': 'ସାହାଯ୍ୟ ଉତ୍ସ',
        'resource-faq': 'FAQ ଏବଂ ଟ୍ରବଲ୍‌ଶୁଟିଂ',
        'resource-faq-desc': 'ସାଧାରଣ ପ୍ରଶ୍ନ ଏବଂ ସମାଧାନ',
        'resource-guide': 'ଉପଭୋକ୍ତା ଗାଇଡ୍',
        'resource-guide-desc': 'ସମସ୍ତ ଫିଚର୍ କିପରି ବ୍ୟବହାର କରିବେ ତାହା ଶିଖନ୍ତୁ',
        'resource-bugs': 'ବଗ୍ ରିପୋର୍ଟ କରନ୍ତୁ',
        'resource-bugs-desc': 'ଗୋଟିଏ ସମସ୍ୟା ପାଇଛନ୍ତି କି? ଆମକୁ ଜଣାନ୍ତୁ',
        'resource-features': 'ଫିଚର୍ ସୁଚନା ଦିଅନ୍ତୁ',
        'resource-features-desc': 'ଉନ୍ନତି ପାଇଁ ଆପଣଙ୍କ ଧାରଣା ଶେୟାର୍ କରନ୍ତୁ',
        'about-title': 'Clify ବିଷୟରେ',
        'version-text': 'ସଂସ୍କରଣ:',
        'about-description': 'Clify ବିଚଳିତକାରୀ YouTube ବିଷୟବସ୍ତୁ ଲୁଚାଇ ରଖି ଫୋକସ୍‌ ରହିବାରେ ଆପଣଙ୍କୁ ସାହାଯ୍ୟ କରେ। ଏହା ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ସ୍ଥାନୀୟ ଭାବରେ କାମ କରେ ଏବଂ ଆପଣଙ୍କ ଗୋପନୀୟତାକୁ ସମ୍ମାନ କରେ - କୌଣସି ଡାଟା ବାହ୍ୟ ସର୍ଭରକୁ ପଠାଯାଏ ନାହିଁ',
        'feature-privacy': 'ଗୋପନୀୟତା ପ୍ରଥମେ',
        'feature-fast': 'ବିଜୁଳି ଗତି',
        'feature-realtime': 'ରିଆଲ୍-ଟାଇମ୍ ବ୍ଲକିଂ',
        'footer-made': 'ଏକ ଫୋକସ୍‌ ଯୁକ୍ତ YouTube ଅଭିଜ୍ଞତା ପାଇଁ ❤️ ସହିତ ତିଆରି',
        'validation-required': 'ଦୟାକରି ସମସ୍ତ ଆବଶ୍ୟକ କ୍ଷେତ୍ର ପୂରଣ କରନ୍ତୁ',
        'validation-message-length': 'ଦୟାକରି ଅଧିକ ବିସ୍ତୃତ ବାର୍ତ୍ତା ପ୍ରଦାନ କରନ୍ତୁ (ଅତିକମରେ 10 ଅକ୍ଷର)',
        'contact-success-telegram': 'ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ବାର୍ତ୍ତା ଆମ ସହାୟତା ଦଳକୁ Telegram ମାଧ୍ୟମରେ ପଠାଯାଇଛି। ଆମେ ଶୀଘ୍ର ଆପଣଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରିବୁ',
        'contact-success-local': 'ଧନ୍ୟବାଦ! ଆପଣଙ୍କ ବାର୍ତ୍ତା ସେଭ୍ ହୋଇଛି। ଇଣ୍ଟରନେଟ୍ ସହିତ ସଂଯୁକ୍ତ ହେବା ପରେ ଆମେ ଏହାକୁ ସମୀକ୍ଷା କରିବୁ',
        'contact-error': 'କ୍ଷମା କରିବେ, ଆପଣଙ୍କ ବାର୍ତ୍ତା ପଠାଉଥିବା ସମୟରେ ଏକ ତ୍ରୁଟି ଘଟିଛି। ଦୟାକରି ପରେ ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ କିମ୍ବା ସିଧାସଳଖ ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ',
        'capacity-text': 'ଆପଣଙ୍କ ସଂରକ୍ଷଣ',
        'capacity-normal': 'ଆପଣଙ୍କ ସଂରକ୍ଷଣ ଭଲ ଦେଖାଯାଉଛି! ସେହି ବିରକ୍ତିକର ଭିଡିଓଗୁଡିକ ବ୍ଲକ୍ କରିବା ଜାରି ରଖନ୍ତୁ। 😊',
        'capacity-warning': 'ମୁଣ୍ଡ ଉଠାନ୍ତୁ! ସଂରକ୍ଷଣ ପୂର୍ଣ୍ଣ ହେଉଛି ({percent}%) 📦',
        'capacity-critical': 'ସତର୍କତା! ସଂରକ୍ଷଣ ପୂର୍ଣ୍ଣ ({percent}%) 🚨',
        'capacity-full': 'ହେ! ଆପଣଙ୍କ ସଂରକ୍ଷଣ ସଂପୂର୍ଣ୍ଣ ଭାବରେ ପୂର୍ଣ୍ଣ ହୋଇଛି। ନୂଆଗୁଡିକ ବ୍ଲକ୍ କରିବା ପାଇଁ ଆପଣଙ୍କୁ କିଛି ଭିଡିଓ କ୍ଲିଅର୍ କରିବାକୁ ପଡିବ। 🚨',
        'capacity-warning-full': 'ମୁଣ୍ଡ ଉଠାନ୍ତୁ! ସଂରକ୍ଷଣ ପ୍ରାୟ ପୂର୍ଣ୍ଣ ({percent}%) - କିଛି ଭିଡିଓ କ୍ଲିଅର୍ କରିବା ବିଚାର କରନ୍ତୁ',
        'telegram-connected': 'Telegram ସହିତ ସଂଯୁକ୍ତ',
        'telegram-disconnected': 'Telegram ସଂଯୁକ୍ତ ନାହିଁ',
        'telegram-message-sent': 'Telegram ସଂଯୋଗ ପରୀକ୍ଷା ସଫଳ!',
        'test-success': 'ପରୀକ୍ଷା ସଫଳ',
        'test-failed': 'ପରୀକ୍ଷା ବିଫଳ',
        'days-ago': 'ଦିନ ପୂର୍ବେ',
        'hours-ago': 'ଘଣ୍ଟା ପୂର୍ବେ',
        'minutes-ago': 'ମିନିଟ୍ ପୂର୍ବେ',
        'just-now': 'ବର୍ତ୍ତମାନ',
        'results-text': 'ଭିଡିଓଗୁଡିକ',
        'support-header-text': 'ସହାୟତା',
        'donate-header-text': 'ଦାନ କରନ୍ତୁ',
        'stat-manual': 'ମାନୁଆଲ୍ ବ୍ଲକ୍‌ଗୁଡିକ (Clify ବଟନ୍)',
        'stat-auto': 'କିୱାର୍ଡ୍ ଦ୍ୱାରା ବ୍ଲକ୍ ହୋଇଛି'
    }, 
    hu: { // Hungarian (Magyar)
        'welcome-title': 'Üdvözöljük a Clify-ben! ⚡',
        'welcome-subtitle': 'Vegye át irányítását YouTube élménye felett, azáltal, hogy automatikusan letiltja a nem kívánt tartalmakat',
        'tab-dash': 'Irányítópult',
        'tab-blocked': 'Letiltott Videók',
        'tab-keywords': 'Kulcsszavak',
        'tab-support': 'Támogatás',
        'refresh-text': 'Frissítés',
        'theme-text': 'Téma',
        'stat-today': 'Mai Letiltások',
        'stat-total': 'Összesen Letiltva',
        'stat-efficiency': 'Hatékonyság',
        'activity-title': 'Letiltási Tevékenység',
        'activity-subtitle': 'Elmúlt 30 nap',
        'stat-keywords': 'Aktív Kulcsszavak',
        'stat-manual': 'Kézi Letiltások',
        'stat-auto': 'Automatikus Letiltások',
        'stat-shorts': 'Shorts Letiltva',
        'stat-lang': 'Nyelvi Letiltások',
        'recent-title': 'Legutóbb Letiltva',
        'view-all-btn': 'Összes Megtekintése',
        'blocked-title': 'Letiltott Videók',
        'blocked-subtitle': 'Kezelje az összes videót, amelyet letiltott YouTube hírfolyamából',
        'col-title': 'Videó Címe',
        'col-id': 'Videó ID',
        'col-reason': 'Ok',
        'col-date': 'Letiltás Dátuma',
        'col-actions': 'Műveletek',
        'filter-all': 'Minden Ok',
        'filter-manual': 'Kézi Letiltás',
        'filter-keyword': 'Kulcsszó Egyezés',
        'filter-shorts': 'Shorts',
        'filter-language': 'Nyelv',
        'sort-newest': 'Legújabb Először',
        'sort-oldest': 'Legrégebbi Először',
        'sort-title': 'Cím A-Z',
        'export-btn': 'Exportálás',
        'clear-all-btn': 'Összes Törlése',
        'loading-text': 'Letiltott videóid betöltése...',
        'empty-title': 'Még nincsenek letiltott videók',
        'empty-subtitle': 'Kezdje el megtisztítani YouTube élményét azáltal, hogy letiltja a nem kívánt videókat',
        'empty-action': 'Kulcsszavak Hozzáadása Automatikus Letiltáshoz',
        'keywords-title': 'Kulcsszó Kezelő',
        'keywords-subtitle': 'Automatikusan tiltson le olyan videókat, amelyek specifikus kulcsszavakat vagy kifejezéseket tartalmaznak',
        'save-keywords': 'Kulcsszavak Mentése',
        'clear-keywords': 'Összes Törlése',
        'keywords-count-label': 'Kulcsszavak Száma:',
        'keywords-format-label': 'Formátum:',
        'help-title': 'Hogyan kell kulcsszavakat használni',
        'help-line1': 'Adj meg egy kulcsszót soronként, vagy válaszd el vesszővel',
        'help-line2': 'Használj specifikus kifejezéseket a jobb pontosság érdekében',
        'help-line3': 'A kulcsszavak nem kis- és nagybetűérzékenyek',
        'help-line4': 'Több nyelvet támogat: Angol, Arab, Hindi, Bangla stb.',
        'help-line5': 'Használj pipe | szinonimákhoz: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximum 2000 kulcsszó támogatott',
        'support-title': 'Támogatás & Segítség',
        'support-subtitle': 'Segítség kérése, problémák jelentése és tanulás a Clify hatékony használatáról',
        'contact-title': 'Kapcsolatfelvétel Támogatással',
        'contact-subtitle': 'Problémái vagy javaslatai vannak? Itt vagyunk, hogy segítsünk a legtöbbet kihozni a Clify-ből.',
        'name-label': 'Neved *',
        'email-label': 'E-mailed *',
        'category-label': 'Probléma Kategória *',
        'category-bug': 'Hibajelentés',
        'category-feature': 'Funkció Kérés',
        'category-help': 'Segítségre Van Szükség',
        'category-suggestion': 'Javaslat',
        'category-other': 'Egyéb',
        'message-label': 'Üzeneted *',
        'send-message': 'Üzenet Küldése',
        'sending-message': 'Küldés...',
        'resources-title': 'Segítség Források',
        'resource-faq': 'GYIK & Hibaelhárítás',
        'resource-faq-desc': 'Gyakori kérdések és megoldások',
        'resource-guide': 'Felhasználói Kézikönyv',
        'resource-guide-desc': 'Tanulj meg minden funkciót használni',
        'resource-bugs': 'Hibák Jelentése',
        'resource-bugs-desc': 'Találtál egy hibát? Tudasd velünk',
        'resource-features': 'Funkciók Javaslása',
        'resource-features-desc': 'Oszd meg ötleteidet a fejlesztéshez',
        'about-title': 'A Clify-ről',
        'version-text': 'Verzió:',
        'about-description': 'A Clify segít fókuszáltan maradni azáltal, hogy elrejti a zavaró YouTube tartalmakat. Helyileg működik a böngésződben, és tiszteleben tartja a magánéletedet - semmilyen adatot nem küld külső szervereknek.',
        'feature-privacy': 'Adatvédelem Először',
        'feature-fast': 'Villámgyors',
        'feature-realtime': 'Valós Idejű Letiltás',
        'footer-made': 'Készült ❤️-vel egy fókuszáló YouTube élményért',
        'validation-required': 'Kérjük, töltsd ki az összes kötelező mezőt.',
        'validation-message-length': 'Kérjük, adj meg részletesebb üzenetet (legalább 10 karakter).',
        'contact-success-telegram': 'Köszönjük! Üzeneted el lett küldve támogatási csapatunknak Telegramon keresztül. Hamarosan jelentkezünk nálad.',
        'contact-success-local': 'Köszönjük! Üzeneted elmentve. Átnézzük, amikor csatlakozunk az internethez.',
        'contact-error': 'Sajnáljuk, hiba történt az üzeneted küldésekor. Kérjük, próbáld újra később, vagy vedd fel velünk a kapcsolatot közvetlenül.',
        'capacity-text': 'Tárolód',
        'capacity-normal': 'A tárolód jól néz ki! Folytasd azoknak az idegesítő videóknak a letiltását. 😊',
        'capacity-warning': 'Vigyázz! A tárhely egyre teltebb ({percent}%) 📦',
        'capacity-critical': 'Figyelem! Tárhely tele ({percent}%) 🚨',
        'capacity-full': 'Hé! A tárhelyed teljesen tele van. Néhány videót törölnöd kell, hogy újakat tilthass le. 🚨',
        'capacity-warning-full': 'Vigyázz! Tárhely majdnem tele ({percent}%) - fontold meg néhány videó törlését',
        'telegram-connected': 'Csatlakozva a Telegramhoz',
        'telegram-disconnected': 'Telegram Leválasztva',
        'telegram-message-sent': 'Telegram kapcsolat teszt sikeres!',
        'test-success': 'Teszt Sikeres',
        'test-failed': 'Teszt Sikertelen',
        'days-ago': 'napja',
        'hours-ago': 'órája',
        'minutes-ago': 'perce',
        'just-now': 'Épp most',
        'results-text': 'videó',
        'support-header-text': 'Támogatás',
        'donate-header-text': 'Adományozás',
        'stat-manual': 'Kézi Letiltások (Clify Gomb)',
        'stat-auto': 'Kulcsszó Által Letiltva'
    },
    ur: {
        'welcome-title': 'Clify میں خوش آمدید! ⚡',
        'welcome-subtitle': 'ناخواستہ مواد کو خود بخود بلاک کر کے اپنے YouTube تجربے پر کنٹرول حاصل کریں',
        'tab-dash': 'ڈیش بورڈ',
        'tab-blocked': 'بلاک شدہ ویڈیوز',
        'tab-keywords': 'کلیدی الفاظ',
        'tab-support': 'سپورٹ',
        'refresh-text': 'ریفریش',
        'theme-text': 'تھیم',
        'stat-today': 'آج کے بلاکس',
        'stat-total': 'کل بلاک شدہ',
        'stat-efficiency': 'کارکردگی',
        'activity-title': 'بلاکنگ سرگرمی',
        'activity-subtitle': 'پچھلے 30 دن',
        'stat-keywords': 'فعال کلیدی الفاظ',
        'stat-manual': 'مینوئل بلاکس',
        'stat-auto': 'آٹو بلاکس',
        'stat-shorts': 'شارٹس بلاک شدہ',
        'stat-lang': 'زبان کے بلاکس',
        'recent-title': 'حال ہی میں بلاک شدہ',
        'view-all-btn': 'سب دیکھیں',
        'blocked-title': 'بلاک شدہ ویڈیوز',
        'blocked-subtitle': 'اپنے YouTube فیڈ سے بلاک کی گئی تمام ویڈیوز کا انتظام کریں',
        'col-title': 'ویڈیو کا عنوان',
        'col-id': 'ویڈیو آئی ڈی',
        'col-reason': 'وجہ',
        'col-date': 'بلاک کی تاریخ',
        'col-actions': 'اعمال',
        'filter-all': 'تمام وجوہات',
        'filter-manual': 'مینوئل بلاک',
        'filter-keyword': 'کلیدی لفظ مماثلت',
        'filter-shorts': 'شارٹس',
        'filter-language': 'زبان',
        'sort-newest': 'نئے پہلے',
        'sort-oldest': 'پرانے پہلے',
        'sort-title': 'عنوان A-Z',
        'export-btn': 'ایکسپورٹ',
        'clear-all-btn': 'سب صاف کریں',
        'loading-text': 'آپ کی بلاک شدہ ویڈیوز لوڈ ہو رہی ہیں...',
        'empty-title': 'ابھی تک کوئی ویڈیو بلاک نہیں ہوئی',
        'empty-subtitle': 'ناخواستہ ویڈیوز بلاک کر کے اپنے YouTube تجربے کو صاف کرنا شروع کریں',
        'empty-action': 'آٹو بلاکنگ کے لیے کلیدی الفاظ شامل کریں',
        'keywords-title': 'کلیدی الفاظ مینیجر',
        'keywords-subtitle': 'مخصوص کلیدی الفاظ یا فقرے پر مشتمل ویڈیوز کو خود بخود بلاک کریں',
        'save-keywords': 'کلیدی الفاظ محفوظ کریں',
        'clear-keywords': 'سب صاف کریں',
        'keywords-count-label': 'کلیدی الفاظ کی تعداد:',
        'keywords-format-label': 'فارمیٹ:',
        'help-title': 'کلیدی الفاظ کیسے استعمال کریں',
        'help-line1': 'ایک لائن پر ایک کلیدی لفظ درج کریں یا کوما سے الگ کریں',
        'help-line2': 'بہتر درستگی کے لیے مخصوص فقرے استعمال کریں',
        'help-line3': 'کلیدی الفاظ کیس انسینسیٹو ہیں',
        'help-line4': 'کئی زبانوں کی حمایت کرتا ہے: اردو، انگریزی، عربی، ہندی، بنگالی، وغیرہ۔',
        'help-line5': 'مترادفات کے لیے | استعمال کریں: فلم|فيلم|फिल्म|সিনেমা',
        'help-line6': 'زیادہ سے زیادہ 2000 کلیدی الفاظ سپورٹ شدہ',
        'support-title': 'سپورٹ اور مدد',
        'support-subtitle': 'مدد حاصل کریں، مسائل کی رپورٹ کریں اور Clify کو مؤثر طریقے سے استعمال کرنا سیکھیں',
        'contact-title': 'سپورٹ سے رابطہ کریں',
        'contact-subtitle': 'مسائل یا تجاویز؟ ہم آپ کی Clify سے زیادہ سے زیادہ فائدہ اٹھانے میں مدد کے لیے یہاں موجود ہیں۔',
        'name-label': 'آپ کا نام *',
        'email-label': 'آپ کا ای میل *',
        'category-label': 'مسئلے کی قسم *',
        'category-bug': 'بگ رپورٹ',
        'category-feature': 'فیچر کی درخواست',
        'category-help': 'مدد درکار',
        'category-suggestion': 'تجویز',
        'category-other': 'دیگر',
        'message-label': 'آپ کا پیغام *',
        'send-message': 'پیغام بھیجیں',
        'sending-message': 'بھیج رہا ہے...',
        'resources-title': 'مدد کے وسائل',
        'resource-faq': 'FAQ اور مسئلہ حل',
        'resource-faq-desc': 'عام سوالات اور حل',
        'resource-guide': 'صارف گائیڈ',
        'resource-guide-desc': 'تمام خصوصیات استعمال کرنا سیکھیں',
        'resource-bugs': 'بگ رپورٹ کریں',
        'resource-bugs-desc': 'کوئی مسئلہ ملا؟ ہمیں بتائیں',
        'resource-features': 'فیچرز تجویز کریں',
        'resource-features-desc': 'بہتری کے لیے اپنے خیالات شیئر کریں',
        'about-title': 'Clify کے بارے میں',
        'version-text': 'ورژن:',
        'about-description': 'Clify آپ کو YouTube کے پریشان کن مواد کو چھپا کر فوکسڈ رہنے میں مدد کرتا ہے۔ یہ آپ کے براؤزر میں مقامی طور پر کام کرتا ہے اور آپ کی پرائیویسی کا احترام کرتا ہے - کوئی ڈیٹا بیرونی سرورز پر نہیں بھیجا جاتا۔',
        'feature-privacy': 'پرائیویسی پہلے',
        'feature-fast': 'بجلی کی طرح تیز',
        'feature-realtime': 'ریل ٹائم بلاکنگ',
        'footer-made': 'ایک فوکسڈ YouTube تجربے کے لیے ❤️ کے ساتھ بنایا گیا'
    },
    tr: {
        'welcome-title': 'Clify\'e Hoş Geldiniz! ⚡',
        'welcome-subtitle': 'İstenmeyen içeriği otomatik olarak engelleyerek YouTube deneyiminizin kontrolünü elinize alın',
        'tab-dash': 'Kontrol Paneli',
        'tab-blocked': 'Engellenen Videolar',
        'tab-keywords': 'Anahtar Kelimeler',
        'tab-support': 'Destek',
        'refresh-text': 'Yenile',
        'theme-text': 'Tema',
        'stat-today': 'Bugünkü Engellemeler',
        'stat-total': 'Toplam Engellenen',
        'stat-efficiency': 'Verimlilik',
        'activity-title': 'Engelleme Aktivitesi',
        'activity-subtitle': 'Son 30 Gün',
        'stat-keywords': 'Aktif Anahtar Kelimeler',
        'stat-manual': 'Manuel Engellemeler',
        'stat-auto': 'Otomatik Engellemeler',
        'stat-shorts': 'Shorts Engellendi',
        'stat-lang': 'Dil Engellemeleri',
        'recent-title': 'Son Engellenenler',
        'view-all-btn': 'Tümünü Gör',
        'blocked-title': 'Engellenen Videolar',
        'blocked-subtitle': 'YouTube akışınızdan engellediğiniz tüm videoları yönetin',
        'col-title': 'Video Başlığı',
        'col-id': 'Video Kimliği',
        'col-reason': 'Sebep',
        'col-date': 'Engellenme Tarihi',
        'col-actions': 'İşlemler',
        'filter-all': 'Tüm Sebepler',
        'filter-manual': 'Manuel Engelleme',
        'filter-keyword': 'Anahtar Kelime Eşleşmesi',
        'filter-shorts': 'Shorts',
        'filter-language': 'Dil',
        'sort-newest': 'Yeniden Eskiye',
        'sort-oldest': 'Eskiden Yeniye',
        'sort-title': 'Başlık A-Z',
        'export-btn': 'Dışa Aktar',
        'clear-all-btn': 'Tümünü Temizle',
        'loading-text': 'Engellenen videolarınız yükleniyor...',
        'empty-title': 'Henüz hiç video engellenmedi',
        'empty-subtitle': 'İstenmeyen videoları engelleyerek YouTube deneyiminizi temizlemeye başlayın',
        'empty-action': 'Otomatik Engelleme için Anahtar Kelimeler Ekle',
        'keywords-title': 'Anahtar Kelime Yöneticisi',
        'keywords-subtitle': 'Belirli anahtar kelimeler veya ifadeler içeren videoları otomatik olarak engelleyin',
        'save-keywords': 'Anahtar Kelimeleri Kaydet',
        'clear-keywords': 'Tümünü Temizle',
        'keywords-count-label': 'Anahtar Kelime Sayısı:',
        'keywords-format-label': 'Biçim:',
        'help-title': 'Anahtar kelimeler nasıl kullanılır',
        'help-line1': 'Satır başına bir anahtar kelime girin veya virgülle ayırın',
        'help-line2': 'Daha iyi doğruluk için belirli ifadeler kullanın',
        'help-line3': 'Anahtar kelimeler büyük/küçük harf duyarlı değildir',
        'help-line4': 'Çoklu dil desteği: Türkçe, İngilizce, Arapça, Hintçe, Bengalce, vb.',
        'help-line5': 'Eş anlamlılar için | kullanın: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksimum 2000 anahtar kelime desteklenir',
        'support-title': 'Destek ve Yardım',
        'support-subtitle': 'Yardım alın, sorun bildirin ve Clify\'ı etkili bir şekilde kullanmayı öğrenin',
        'contact-title': 'Destek ile İletişime Geçin',
        'contact-subtitle': 'Sorunlarınız veya önerileriniz mi var? Clify\'dan en iyi şekilde yararlanmanıza yardımcı olmak için buradayız.',
        'name-label': 'Adınız *',
        'email-label': 'E-postanız *',
        'category-label': 'Sorun Kategorisi *',
        'category-bug': 'Hata Bildirimi',
        'category-feature': 'Özellik İsteği',
        'category-help': 'Yardım Gerekiyor',
        'category-suggestion': 'Öneri',
        'category-other': 'Diğer',
        'message-label': 'Mesajınız *',
        'send-message': 'Mesaj Gönder',
        'sending-message': 'Gönderiliyor...',
        'resources-title': 'Yardım Kaynakları',
        'resource-faq': 'SSS ve Sorun Giderme',
        'resource-faq-desc': 'Sık sorulan sorular ve çözümler',
        'resource-guide': 'Kullanıcı Kılavuzu',
        'resource-guide-desc': 'Tüm özellikleri kullanmayı öğrenin',
        'resource-bugs': 'Hataları Bildir',
        'resource-bugs-desc': 'Bir sorun mu buldunuz? Bize bildirin',
        'resource-features': 'Özellik Öner',
        'resource-features-desc': 'İyileştirme fikirlerinizi paylaşın',
        'about-title': 'Clify Hakkında',
        'version-text': 'Sürüm:',
        'about-description': 'Clify, dikkat dağıtıcı YouTube içeriğini gizleyerek odaklanmanıza yardımcı olur. Tarayıcınızda yerel olarak çalışır ve gizliliğinize saygı duyar - hiçbir veri harici sunuculara gönderilmez.',
        'feature-privacy': 'Gizlilik Öncelikli',
        'feature-fast': 'Yıldırım Hızında',
        'feature-realtime': 'Gerçek Zamanlı Engelleme',
        'footer-made': 'Odaklanmış bir YouTube deneyimi için ❤️ ile yapıldı'
    },
    nl: {
        'welcome-title': 'Welkom bij Clify! ⚡',
        'welcome-subtitle': 'Neem controle over uw YouTube-ervaring door ongewenste inhoud automatisch te blokkeren',
        'tab-dash': 'Dashboard',
        'tab-blocked': 'Geblokkeerde Video\'s',
        'tab-keywords': 'Trefwoorden',
        'tab-support': 'Ondersteuning',
        'refresh-text': 'Vernieuwen',
        'theme-text': 'Thema',
        'stat-today': 'Blokkeringen Vandaag',
        'stat-total': 'Totaal Geblokkeerd',
        'stat-efficiency': 'Efficiëntie',
        'activity-title': 'Blokkeeractiviteit',
        'activity-subtitle': 'Laatste 30 dagen',
        'stat-keywords': 'Actieve Trefwoorden',
        'stat-manual': 'Handmatige Blokkeringen',
        'stat-auto': 'Auto Blokkeringen',
        'stat-shorts': 'Shorts Geblokkeerd',
        'stat-lang': 'Taalblokkeringen',
        'recent-title': 'Recentelijk Geblokkeerd',
        'view-all-btn': 'Alles Bekijken',
        'blocked-title': 'Geblokkeerde Video\'s',
        'blocked-subtitle': 'Beheer alle video\'s die u heeft geblokkeerd van uw YouTube-feed',
        'col-title': 'Videotitel',
        'col-id': 'Video-ID',
        'col-reason': 'Reden',
        'col-date': 'Datum Geblokkeerd',
        'col-actions': 'Acties',
        'filter-all': 'Alle Redenen',
        'filter-manual': 'Handmatige Blokkering',
        'filter-keyword': 'Trefwoord Overeenkomst',
        'filter-shorts': 'Shorts',
        'filter-language': 'Taal',
        'sort-newest': 'Nieuwste Eerst',
        'sort-oldest': 'Oudste Eerst',
        'sort-title': 'Titel A-Z',
        'export-btn': 'Exporteren',
        'clear-all-btn': 'Alles Wissen',
        'loading-text': 'Uw geblokkeerde video\'s laden...',
        'empty-title': 'Nog geen video\'s geblokkeerd',
        'empty-subtitle': 'Begin met het opruimen van uw YouTube-ervaring door ongewenste video\'s te blokkeren',
        'empty-action': 'Trefwoorden Toevoegen voor Automatisch Blokkeren',
        'keywords-title': 'Trefwoordbeheer',
        'keywords-subtitle': 'Blokkeer automatisch video\'s die specifieke trefwoorden of zinnen bevatten',
        'save-keywords': 'Trefwoorden Opslaan',
        'clear-keywords': 'Alles Wissen',
        'keywords-count-label': 'Aantal Trefwoorden:',
        'keywords-format-label': 'Formaat:',
        'help-title': 'Hoe trefwoorden te gebruiken',
        'help-line1': 'Voer één trefwoord per regel in of scheid met komma\'s',
        'help-line2': 'Gebruik specifieke zinnen voor betere nauwkeurigheid',
        'help-line3': 'Trefwoorden zijn niet hoofdlettergevoelig',
        'help-line4': 'Ondersteunt meerdere talen: Nederlands, Engels, Arabisch, Hindi, Bengaals, etc.',
        'help-line5': 'Gebruik | voor synoniemen: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximaal 2000 trefwoorden ondersteund',
        'support-title': 'Ondersteuning & Help',
        'support-subtitle': 'Krijg hulp, rapporteer problemen en leer hoe u Clify effectief kunt gebruiken',
        'contact-title': 'Contact Opnemen met Ondersteuning',
        'contact-subtitle': 'Problemen of suggesties? We zijn hier om u te helpen het meeste uit Clify te halen.',
        'name-label': 'Uw Naam *',
        'email-label': 'Uw E-mail *',
        'category-label': 'Probleemcategorie *',
        'category-bug': 'Bugrapport',
        'category-feature': 'Functieverzoek',
        'category-help': 'Hulp Nodig',
        'category-suggestion': 'Suggestie',
        'category-other': 'Anders',
        'message-label': 'Uw Bericht *',
        'send-message': 'Bericht Verzenden',
        'sending-message': 'Verzenden...',
        'resources-title': 'Hulpbronnen',
        'resource-faq': 'FAQ & Probleemoplossing',
        'resource-faq-desc': 'Veelgestelde vragen en oplossingen',
        'resource-guide': 'Gebruikershandleiding',
        'resource-guide-desc': 'Leer alle functies te gebruiken',
        'resource-bugs': 'Bugs Rapporteren',
        'resource-bugs-desc': 'Een probleem gevonden? Laat het ons weten',
        'resource-features': 'Functies Voorstellen',
        'resource-features-desc': 'Deel uw ideeën voor verbetering',
        'about-title': 'Over Clify',
        'version-text': 'Versie:',
        'about-description': 'Clify helpt u gefocust te blijven door afleidende YouTube-inhoud te verbergen. Het werkt lokaal in uw browser en respecteert uw privacy - er worden geen gegevens naar externe servers verzonden.',
        'feature-privacy': 'Privacy Eerst',
        'feature-fast': 'Bliksemsnel',
        'feature-realtime': 'Realtime Blokkeren',
        'footer-made': 'Gemaakt met ❤️ voor een gefocuste YouTube-ervaring'
    },
    pl: {
        'welcome-title': 'Witamy w Clify! ⚡',
        'welcome-subtitle': 'Przejmij kontrolę nad swoim doświadczeniem YouTube, automatycznie blokując niechciane treści',
        'tab-dash': 'Pulpit',
        'tab-blocked': 'Zablokowane Filmy',
        'tab-keywords': 'Słowa Kluczowe',
        'tab-support': 'Wsparcie',
        'refresh-text': 'Odśwież',
        'theme-text': 'Motyw',
        'stat-today': 'Dzisiejsze Blokady',
        'stat-total': 'Razem Zablokowanych',
        'stat-efficiency': 'Wydajność',
        'activity-title': 'Aktywność Blokowania',
        'activity-subtitle': 'Ostatnie 30 dni',
        'stat-keywords': 'Aktywne Słowa Kluczowe',
        'stat-manual': 'Ręczne Blokady',
        'stat-auto': 'Automatyczne Blokady',
        'stat-shorts': 'Zablokowane Shorts',
        'stat-lang': 'Blokady Językowe',
        'recent-title': 'Ostatnio Zablokowane',
        'view-all-btn': 'Pokaż Wszystkie',
        'blocked-title': 'Zablokowane Filmy',
        'blocked-subtitle': 'Zarządzaj wszystkimi filmami, które zablokowałeś ze swojego kanału YouTube',
        'col-title': 'Tytuł Filmu',
        'col-id': 'ID Filmu',
        'col-reason': 'Powód',
        'col-date': 'Data Zablokowania',
        'col-actions': 'Akcje',
        'filter-all': 'Wszystkie Powody',
        'filter-manual': 'Ręczna Blokada',
        'filter-keyword': 'Dopasowanie Słowa Kluczowego',
        'filter-shorts': 'Shorts',
        'filter-language': 'Język',
        'sort-newest': 'Najnowsze Najpierw',
        'sort-oldest': 'Najstarsze Najpierw',
        'sort-title': 'Tytuł A-Z',
        'export-btn': 'Eksportuj',
        'clear-all-btn': 'Wyczyść Wszystko',
        'loading-text': 'Ładowanie zablokowanych filmów...',
        'empty-title': 'Jeszcze nie zablokowano żadnych filmów',
        'empty-subtitle': 'Zacznij czyścić swoje doświadczenie YouTube, blokując niechciane filmy',
        'empty-action': 'Dodaj Słowa Kluczowe do Automatycznego Blokowania',
        'keywords-title': 'Menedżer Słów Kluczowych',
        'keywords-subtitle': 'Automatycznie blokuj filmy zawierające określone słowa kluczowe lub frazy',
        'save-keywords': 'Zapisz Słowa Kluczowe',
        'clear-keywords': 'Wyczyść Wszystko',
        'keywords-count-label': 'Liczba Słów Kluczowych:',
        'keywords-format-label': 'Format:',
        'help-title': 'Jak używać słów kluczowych',
        'help-line1': 'Wprowadź jedno słowo kluczowe na linię lub oddziel przecinkami',
        'help-line2': 'Używaj konkretnych fraz dla lepszej dokładności',
        'help-line3': 'Słowa kluczowe nie są wrażliwe na wielkość liter',
        'help-line4': 'Obsługuje wiele języków: Polski, Angielski, Arabski, Hindi, Bengalski, itp.',
        'help-line5': 'Użyj | dla synonimów: film|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maksymalnie 2000 słów kluczowych obsługiwanych',
        'support-title': 'Wsparcie i Pomoc',
        'support-subtitle': 'Uzyskaj pomoc, zgłoś problemy i naucz się efektywnie używać Clify',
        'contact-title': 'Skontaktuj się z Wsparciem',
        'contact-subtitle': 'Problemy lub sugestie? Jesteśmy tutaj, aby pomóc Ci w pełni wykorzystać Clify.',
        'name-label': 'Twoje Imię *',
        'email-label': 'Twój Email *',
        'category-label': 'Kategoria Problemu *',
        'category-bug': 'Zgłoszenie Błędu',
        'category-feature': 'Prośba o Funkcję',
        'category-help': 'Potrzebna Pomoc',
        'category-suggestion': 'Sugestia',
        'category-other': 'Inne',
        'message-label': 'Twoja Wiadomość *',
        'send-message': 'Wyślij Wiadomość',
        'sending-message': 'Wysyłanie...',
        'resources-title': 'Zasoby Pomocy',
        'resource-faq': 'FAQ i Rozwiązywanie Problemów',
        'resource-faq-desc': 'Częste pytania i rozwiązania',
        'resource-guide': 'Przewodnik Użytkownika',
        'resource-guide-desc': 'Naucz się używać wszystkich funkcji',
        'resource-bugs': 'Zgłoś Błędy',
        'resource-bugs-desc': 'Znalazłeś problem? Daj nam znać',
        'resource-features': 'Zaproponuj Funkcje',
        'resource-features-desc': 'Podziel się swoimi pomysłami na ulepszenia',
        'about-title': 'O Clify',
        'version-text': 'Wersja:',
        'about-description': 'Clify pomaga Ci się skupić, ukrywając rozpraszające treści YouTube. Działa lokalnie w Twojej przeglądarce i szanuje Twoją prywatność - żadne dane nie są wysyłane na zewnętrzne serwery.',
        'feature-privacy': 'Prywatność na Pierwszym Miejscu',
        'feature-fast': 'Błyskawicznie Szybki',
        'feature-realtime': 'Blokowanie w Czasie Rzeczywistym',
        'footer-made': 'Stworzone z ❤️ dla skupionego doświadczenia YouTube'
    },
    th: {
        'welcome-title': 'ยินดีต้อนรับสู่ Clify! ⚡',
        'welcome-subtitle': 'ควบคุมประสบการณ์ YouTube ของคุณโดยการบล็อกเนื้อหาที่ไม่ต้องการโดยอัตโนมัติ',
        'tab-dash': 'แดชบอร์ด',
        'tab-blocked': 'วิดีโอที่ถูกบล็อก',
        'tab-keywords': 'คำสำคัญ',
        'tab-support': 'สนับสนุน',
        'refresh-text': 'รีเฟรช',
        'theme-text': 'ธีม',
        'stat-today': 'การบล็อกวันนี้',
        'stat-total': 'ทั้งหมดที่ถูกบล็อก',
        'stat-efficiency': 'ประสิทธิภาพ',
        'activity-title': 'กิจกรรมการบล็อก',
        'activity-subtitle': '30 วันที่ผ่านมา',
        'stat-keywords': 'คำสำคัญที่ใช้งานอยู่',
        'stat-manual': 'การบล็อกด้วยมือ',
        'stat-auto': 'การบล็อกอัตโนมัติ',
        'stat-shorts': 'Shorts ที่ถูกบล็อก',
        'stat-lang': 'การบล็อกภาษา',
        'recent-title': 'ถูกบล็อกล่าสุด',
        'view-all-btn': 'ดูทั้งหมด',
        'blocked-title': 'วิดีโอที่ถูกบล็อก',
        'blocked-subtitle': 'จัดการวิดีโอทั้งหมดที่คุณบล็อกจากฟีด YouTube ของคุณ',
        'col-title': 'ชื่อวิดีโอ',
        'col-id': 'รหัสวิดีโอ',
        'col-reason': 'เหตุผล',
        'col-date': 'วันที่บล็อก',
        'col-actions': 'การดำเนินการ',
        'filter-all': 'ทุกเหตุผล',
        'filter-manual': 'บล็อกด้วยมือ',
        'filter-keyword': 'คำสำคัญตรงกัน',
        'filter-shorts': 'Shorts',
        'filter-language': 'ภาษา',
        'sort-newest': 'ใหม่ล่าสุดก่อน',
        'sort-oldest': 'เก่าที่สุดก่อน',
        'sort-title': 'ชื่อ A-Z',
        'export-btn': 'ส่งออก',
        'clear-all-btn': 'ล้างทั้งหมด',
        'loading-text': 'กำลังโหลดวิดีโอที่ถูกบล็อกของคุณ...',
        'empty-title': 'ยังไม่มีวิดีโอถูกบล็อก',
        'empty-subtitle': 'เริ่มทำความสะอาดประสบการณ์ YouTube ของคุณโดยการบล็อกวิดีโอที่ไม่ต้องการ',
        'empty-action': 'เพิ่มคำสำคัญสำหรับการบล็อกอัตโนมัติ',
        'keywords-title': 'ตัวจัดการคำสำคัญ',
        'keywords-subtitle': 'บล็อกวิดีโอที่มีคำสำคัญหรือวลีเฉพาะโดยอัตโนมัติ',
        'save-keywords': 'บันทึกคำสำคัญ',
        'clear-keywords': 'ล้างทั้งหมด',
        'keywords-count-label': 'จำนวนคำสำคัญ:',
        'keywords-format-label': 'รูปแบบ:',
        'help-title': 'วิธีใช้คำสำคัญ',
        'help-line1': 'ป้อนคำสำคัญหนึ่งคำต่อบรรทัดหรือคั่นด้วยเครื่องหมายจุลภาค',
        'help-line2': 'ใช้วลีเฉพาะสำหรับความแม่นยำที่ดีขึ้น',
        'help-line3': 'คำสำคัญไม่คำนึงถึงตัวพิมพ์ใหญ่-เล็ก',
        'help-line4': 'รองรับหลายภาษา: ไทย, อังกฤษ, อาหรับ, ฮินดี, เบงกาลี, ฯลฯ',
        'help-line5': 'ใช้ | สำหรับคำพ้องความหมาย: หนัง|فيلم|फिल्म|সিনেমา',
        'help-line6': 'รองรับคำสำคัญสูงสุด 2000 คำ',
        'support-title': 'สนับสนุนและช่วยเหลือ',
        'support-subtitle': 'รับความช่วยเหลือ, รายงานปัญหา, และเรียนรู้วิธีใช้ Clify อย่างมีประสิทธิภาพ',
        'contact-title': 'ติดต่อฝ่ายสนับสนุน',
        'contact-subtitle': 'มีปัญหาหรือข้อเสนอแนะ? เราอยู่ที่นี่เพื่อช่วยให้คุณได้รับประโยชน์สูงสุดจาก Clify',
        'name-label': 'ชื่อของคุณ *',
        'email-label': 'อีเมลของคุณ *',
        'category-label': 'หมวดหมู่ปัญหา *',
        'category-bug': 'รายงานข้อบกพร่อง',
        'category-feature': 'คำขอดคุณลักษณะ',
        'category-help': 'ต้องการความช่วยเหลือ',
        'category-suggestion': 'ข้อเสนอแนะ',
        'category-other': 'อื่นๆ',
        'message-label': 'ข้อความของคุณ *',
        'send-message': 'ส่งข้อความ',
        'sending-message': 'กำลังส่ง...',
        'resources-title': 'แหล่งข้อมูลช่วยเหลือ',
        'resource-faq': 'FAQ และการแก้ปัญหา',
        'resource-faq-desc': 'คำถามทั่วไปและวิธีแก้ไข',
        'resource-guide': 'คู่มือผู้ใช้',
        'resource-guide-desc': 'เรียนรู้วิธีใช้คุณสมบัติทั้งหมด',
        'resource-bugs': 'รายงานข้อบกพร่อง',
        'resource-bugs-desc': 'พบปัญหา? แจ้งให้เราทราบ',
        'resource-features': 'เสนอคุณลักษณะ',
        'resource-features-desc': 'แบ่งปันความคิดของคุณเพื่อการปรับปรุง',
        'about-title': 'เกี่ยวกับ Clify',
        'version-text': 'เวอร์ชัน:',
        'about-description': 'Clify ช่วยให้คุณมีสมาธิโดยการซ่อนเนื้อหา YouTube ที่ทำให้เสียสมาธิ ทำงานในเบราว์เซอร์ของคุณในท้องถิ่นและเคารพความเป็นส่วนตัวของคุณ - ไม่มีการส่งข้อมูลไปยังเซิร์ฟเวอร์ภายนอก',
        'feature-privacy': 'ความเป็นส่วนตัวมาก่อน',
        'feature-fast': 'เร็วเหมือนสายฟ้า',
        'feature-realtime': 'การบล็อกแบบเรียลไทม์',
        'footer-made': 'สร้างด้วย ❤️ สำหรับประสบการณ์ YouTube ที่มีสมาธิ'
    },
    vi: {
        'welcome-title': 'Chào mừng đến với Clify! ⚡',
        'welcome-subtitle': 'Kiểm soát trải nghiệm YouTube của bạn bằng cách tự động chặn nội dung không mong muốn',
        'tab-dash': 'Bảng điều khiển',
        'tab-blocked': 'Video đã chặn',
        'tab-keywords': 'Từ khóa',
        'tab-support': 'Hỗ trợ',
        'refresh-text': 'Làm mới',
        'theme-text': 'Chủ đề',
        'stat-today': 'Lượt chặn hôm nay',
        'stat-total': 'Tổng số đã chặn',
        'stat-efficiency': 'Hiệu suất',
        'activity-title': 'Hoạt động chặn',
        'activity-subtitle': '30 ngày qua',
        'stat-keywords': 'Từ khóa hoạt động',
        'stat-manual': 'Chặn thủ công',
        'stat-auto': 'Chặn tự động',
        'stat-shorts': 'Shorts đã chặn',
        'stat-lang': 'Chặn ngôn ngữ',
        'recent-title': 'Mới chặn gần đây',
        'view-all-btn': 'Xem tất cả',
        'blocked-title': 'Video đã chặn',
        'blocked-subtitle': 'Quản lý tất cả video bạn đã chặn từ nguồn cấp dữ liệu YouTube của bạn',
        'col-title': 'Tiêu đề video',
        'col-id': 'ID video',
        'col-reason': 'Lý do',
        'col-date': 'Ngày chặn',
        'col-actions': 'Hành động',
        'filter-all': 'Tất cả lý do',
        'filter-manual': 'Chặn thủ công',
        'filter-keyword': 'Khớp từ khóa',
        'filter-shorts': 'Shorts',
        'filter-language': 'Ngôn ngữ',
        'sort-newest': 'Mới nhất trước',
        'sort-oldest': 'Cũ nhất trước',
        'sort-title': 'Tiêu đề A-Z',
        'export-btn': 'Xuất',
        'clear-all-btn': 'Xóa tất cả',
        'loading-text': 'Đang tải video đã chặn của bạn...',
        'empty-title': 'Chưa có video nào bị chặn',
        'empty-subtitle': 'Bắt đầu dọn dẹp trải nghiệm YouTube của bạn bằng cách chặn video không mong muốn',
        'empty-action': 'Thêm từ khóa để chặn tự động',
        'keywords-title': 'Trình quản lý từ khóa',
        'keywords-subtitle': 'Tự động chặn video chứa từ khóa hoặc cụm từ cụ thể',
        'save-keywords': 'Lưu từ khóa',
        'clear-keywords': 'Xóa tất cả',
        'keywords-count-label': 'Số lượng từ khóa:',
        'keywords-format-label': 'Định dạng:',
        'help-title': 'Cách sử dụng từ khóa',
        'help-line1': 'Nhập một từ khóa mỗi dòng hoặc phân tách bằng dấu phẩy',
        'help-line2': 'Sử dụng cụm từ cụ thể để chính xác hơn',
        'help-line3': 'Từ khóa không phân biệt chữ hoa chữ thường',
        'help-line4': 'Hỗ trợ đa ngôn ngữ: Tiếng Việt, Anh, Ả Rập, Hindi, Bengal, v.v.',
        'help-line5': 'Sử dụng | cho từ đồng nghĩa: phim|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Hỗ trợ tối đa 2000 từ khóa',
        'support-title': 'Hỗ trợ & Trợ giúp',
        'support-subtitle': 'Nhận trợ giúp, báo cáo sự cố và tìm hiểu cách sử dụng Clify hiệu quả',
        'contact-title': 'Liên hệ hỗ trợ',
        'contact-subtitle': 'Có vấn đề hoặc đề xuất? Chúng tôi ở đây để giúp bạn tận dụng tối đa Clify.',
        'name-label': 'Tên của bạn *',
        'email-label': 'Email của bạn *',
        'category-label': 'Danh mục vấn đề *',
        'category-bug': 'Báo cáo lỗi',
        'category-feature': 'Yêu cầu tính năng',
        'category-help': 'Cần trợ giúp',
        'category-suggestion': 'Đề xuất',
        'category-other': 'Khác',
        'message-label': 'Tin nhắn của bạn *',
        'send-message': 'Gửi tin nhắn',
        'sending-message': 'Đang gửi...',
        'resources-title': 'Tài nguyên trợ giúp',
        'resource-faq': 'FAQ & Khắc phục sự cố',
        'resource-faq-desc': 'Câu hỏi thường gặp và giải pháp',
        'resource-guide': 'Hướng dẫn sử dụng',
        'resource-guide-desc': 'Tìm hiểu cách sử dụng tất cả các tính năng',
        'resource-bugs': 'Báo cáo lỗi',
        'resource-bugs-desc': 'Tìm thấy sự cố? Cho chúng tôi biết',
        'resource-features': 'Đề xuất tính năng',
        'resource-features-desc': 'Chia sẻ ý tưởng của bạn để cải thiện',
        'about-title': 'Về Clify',
        'version-text': 'Phiên bản:',
        'about-description': 'Clify giúp bạn tập trung bằng cách ẩn nội dung YouTube gây mất tập trung. Nó hoạt động cục bộ trong trình duyệt của bạn và tôn trọng quyền riêng tư của bạn - không có dữ liệu nào được gửi đến máy chủ bên ngoài.',
        'feature-privacy': 'Quyền riêng tư trên hết',
        'feature-fast': 'Cực kỳ nhanh',
        'feature-realtime': 'Chặn thời gian thực',
        'footer-made': 'Được tạo ra bằng ❤️ cho trải nghiệm YouTube tập trung'
    },
        fi: { // Finnish (Suomi)
        'welcome-title': 'Tervetuloa Clifyyn! ⚡',
        'welcome-subtitle': 'Ota hallinta YouTube-kokemukseesi estämällä automaattisesti ei-toivottu sisältö',
        'tab-dash': 'Kojelauta',
        'tab-blocked': 'Estetyt Videot',
        'tab-keywords': 'Avainsanat',
        'tab-support': 'Tuki',
        'refresh-text': 'Päivitä',
        'theme-text': 'Teema',
        'stat-today': 'Tämän Päivän Estot',
        'stat-total': 'Yhteensä Estetty',
        'stat-efficiency': 'Tehokkuus',
        'activity-title': 'Estotoiminta',
        'activity-subtitle': 'Viimeiset 30 päivää',
        'stat-keywords': 'Aktiiviset Avainsanat',
        'stat-manual': 'Manuaaliset Estot',
        'stat-auto': 'Automaattiset Estot',
        'stat-shorts': 'Shorts Estetty',
        'stat-lang': 'Kieliestot',
        'recent-title': 'Äskettäin Estetty',
        'view-all-btn': 'Näytä Kaikki',
        'blocked-title': 'Estetyt Videot',
        'blocked-subtitle': 'Hallitse kaikkia videoita, jotka olet estänyt YouTube-syötteestäsi',
        'col-title': 'Videon Otsikko',
        'col-id': 'Videon ID',
        'col-reason': 'Syy',
        'col-date': 'Estetty Päivämäärä',
        'col-actions': 'Toiminnot',
        'filter-all': 'Kaikki Syyt',
        'filter-manual': 'Manuaalinen Esto',
        'filter-keyword': 'Avainsana Täsmäys',
        'filter-shorts': 'Shorts',
        'filter-language': 'Kieli',
        'sort-newest': 'Uusimmat Ensin',
        'sort-oldest': 'Vanhimmat Ensin',
        'sort-title': 'Otsikko A-Ö',
        'export-btn': 'Vie',
        'clear-all-btn': 'Tyhjennä Kaikki',
        'loading-text': 'Ladataan estettyjä videoitasi...',
        'empty-title': 'Ei vielä estettyjä videoita',
        'empty-subtitle': 'Aloita YouTube-kokemuksesi siivoaminen estämällä ei-toivottuja videoita',
        'empty-action': 'Lisää Avainsanoja Automaattista Estoa Varten',
        'keywords-title': 'Avainsanahallinta',
        'keywords-subtitle': 'Estä automaattisesti videot, jotka sisältävät tiettyjä avainsanoja tai lauseita',
        'save-keywords': 'Tallenna Avainsanat',
        'clear-keywords': 'Tyhjennä Kaikki',
        'keywords-count-label': 'Avainsanojen Määrä:',
        'keywords-format-label': 'Muoto:',
        'help-title': 'Kuinka käyttää avainsanoja',
        'help-line1': 'Syötä yksi avainsana per rivi tai erottele pilkuilla',
        'help-line2': 'Käytä tiettyjä lauseita paremman tarkkuuden saamiseksi',
        'help-line3': 'Avainsanat eivät ole kirjainkokoriippuvaisia',
        'help-line4': 'Tukee useita kieliä: Englanti, Arabia, Hindi, Bangla jne.',
        'help-line5': 'Käytä putkea | synonyymeille: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Enintään 2000 avainsanaa tuettu',
        'support-title': 'Tuki & Apu',
        'support-subtitle': 'Saa apua, ilmoita ongelmista ja opi käyttämään Clifyä tehokkaasti',
        'contact-title': 'Ota Yhteyttä Tukeen',
        'contact-subtitle': 'Ongelmia tai ehdotuksia? Olemme täällä auttamassa sinua saamaan maksimi irti Clifystä.',
        'name-label': 'Nimesi *',
        'email-label': 'Sähköpostisi *',
        'category-label': 'Ongelma Kategoria *',
        'category-bug': 'Virheraportti',
        'category-feature': 'Ominaisuustoive',
        'category-help': 'Tarvitsen Apua',
        'category-suggestion': 'Ehdotus',
        'category-other': 'Muu',
        'message-label': 'Viestisi *',
        'send-message': 'Lähetä Viesti',
        'sending-message': 'Lähetetään...',
        'resources-title': 'Apu Resurssit',
        'resource-faq': 'UKK & Vianetsintä',
        'resource-faq-desc': 'Yleisiä kysymyksiä ja ratkaisuja',
        'resource-guide': 'Käyttäjäopas',
        'resource-guide-desc': 'Opi käyttämään kaikkia ominaisuuksia',
        'resource-bugs': 'Ilmoita Virheistä',
        'resource-bugs-desc': 'Löysitkö virheen? Kerro meille',
        'resource-features': 'Ehdotus Ominaisuuksia',
        'resource-features-desc': 'Jaa ideoituksesi parannuksiksi',
        'about-title': 'Tietoja Clifystä',
        'version-text': 'Versio:',
        'about-description': 'Clify auttaa sinua pysymään keskittyneenä piilottamalla häiritsevää YouTube-sisältöä. Se toimii paikallisesti selaimessasi ja kunnioittaa yksityisyyttäsi - mitään tietoja ei lähetetä ulkoisille palvelimille.',
        'feature-privacy': 'Yksityisyys Ensimmäisenä',
        'feature-fast': 'Salaman Nopea',
        'feature-realtime': 'Reaaliaikainen Esto',
        'footer-made': 'Tehty ❤️:llä keskittyneelle YouTube-kokemukselle',
        'validation-required': 'Täytäthän kaikki pakolliset kentät.',
        'validation-message-length': 'Anna tarkempi viesti (vähintään 10 merkkiä).',
        'contact-success-telegram': 'Kiitos! Viestisi on lähetetty tukitiimillemme Telegramin kautta. Otamme yhteyttä pian.',
        'contact-success-local': 'Kiitos! Viestisi on tallennettu. Tarkistamme sen, kun olemme yhteydessä internetiin.',
        'contact-error': 'Valitettavesti viestisi lähetyksessä tapahtui virhe. Yritä myöhemmin uudelleen tai ota meihin suoraan yhteyttä.',
        'capacity-text': 'Tallennustilasi',
        'capacity-normal': 'Tallennustilasi näyttää hyvältä! Jatka niiden ärsyttävien videoiden estämistä. 😊',
        'capacity-warning': 'Huomio! Tallennustila täyttyy ({percent}%) 📦',
        'capacity-critical': 'Varoitus! Tallennustila täynnä ({percent}%) 🚨',
        'capacity-full': 'Hei! Tallennustilasi on täysin täynnä. Sinun täytyy tyhjentää joitain videoita, jotta voit estää uusia. 🚨',
        'capacity-warning-full': 'Huomio! Tallennustila melkein täynnä ({percent}%) - harkitse joidenkin videoiden tyhjentämistä',
        'telegram-connected': 'Yhdistetty Telegramiin',
        'telegram-disconnected': 'Telegram Yhteys Katkaistu',
        'telegram-message-sent': 'Telegram-yhteyden testi onnistui!',
        'test-success': 'Testi Onnistui',
        'test-failed': 'Testi Epäonnistui',
        'days-ago': 'päivää sitten',
        'hours-ago': 'tuntia sitten',
        'minutes-ago': 'minuuttia sitten',
        'just-now': 'Juuri nyt',
        'results-text': 'videota',
        'support-header-text': 'Tuki',
        'donate-header-text': 'Lahjoita',
        'stat-manual': 'Manuaaliset Estot (Clify Painike)',
        'stat-auto': 'Estetty Avainsanalla'
    },
        cs: { // Czech (Čeština)
        'welcome-title': 'Vítejte v Clify! ⚡',
        'welcome-subtitle': 'Převzete kontrolu nad svým YouTube zážitkem automatickým blokováním nežádoucího obsahu',
        'tab-dash': 'Nástěnka',
        'tab-blocked': 'Blokovaná Videa',
        'tab-keywords': 'Klíčová Slova',
        'tab-support': 'Podpora',
        'refresh-text': 'Obnovit',
        'theme-text': 'Motiv',
        'stat-today': 'Dnešní Blokace',
        'stat-total': 'Celkem Blokováno',
        'stat-efficiency': 'Efektivita',
        'activity-title': 'Blokovací Aktivita',
        'activity-subtitle': 'Posledních 30 dní',
        'stat-keywords': 'Aktivní Klíčová Slova',
        'stat-manual': 'Manuální Blokace',
        'stat-auto': 'Automatické Blokace',
        'stat-shorts': 'Shorts Blokováno',
        'stat-lang': 'Jazykové Blokace',
        'recent-title': 'Nedávno Blokováno',
        'view-all-btn': 'Zobrazit Vše',
        'blocked-title': 'Blokovaná Videa',
        'blocked-subtitle': 'Spravujte všechna videa, která jste zablokovali ze svého YouTube kanálu',
        'col-title': 'Název Videa',
        'col-id': 'ID Videa',
        'col-reason': 'Důvod',
        'col-date': 'Datum Blokace',
        'col-actions': 'Akce',
        'filter-all': 'Všechny Důvody',
        'filter-manual': 'Manuální Blokace',
        'filter-keyword': 'Shoda Klíčového Slova',
        'filter-shorts': 'Shorts',
        'filter-language': 'Jazyk',
        'sort-newest': 'Nejnovější První',
        'sort-oldest': 'Nejstarší První',
        'sort-title': 'Název A-Z',
        'export-btn': 'Exportovat',
        'clear-all-btn': 'Vymazat Vše',
        'loading-text': 'Načítání blokovaných videí...',
        'empty-title': 'Zatím žádná videa neblokována',
        'empty-subtitle': 'Začněte čistit svůj YouTube zážitek blokováním nežádoucích videí',
        'empty-action': 'Přidat Klíčová Slova pro Automatické Blokování',
        'keywords-title': 'Správce Klíčových Slov',
        'keywords-subtitle': 'Automaticky blokovat videa obsahující specifická klíčová slova nebo fráze',
        'save-keywords': 'Uložit Klíčová Slova',
        'clear-keywords': 'Vymazat Vše',
        'keywords-count-label': 'Počet Klíčových Slov:',
        'keywords-format-label': 'Formát:',
        'help-title': 'Jak používat klíčová slova',
        'help-line1': 'Zadejte jedno klíčové slovo na řádek nebo oddělujte čárkami',
        'help-line2': 'Používejte specifické fráze pro lepší přesnost',
        'help-line3': 'Klíčová slova nejsou citlivá na velikost písmen',
        'help-line4': 'Podporuje více jazyků: Angličtina, Arabština, Hindština, Bengálština atd.',
        'help-line5': 'Použijte svislítko | pro synonyma: movie|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maximálně 2000 klíčových slov podporováno',
        'support-title': 'Podpora & Nápověda',
        'support-subtitle': 'Získejte pomoc, nahlaste problémy a naučte se efektivně používat Clify',
        'contact-title': 'Kontaktovat Podporu',
        'contact-subtitle': 'Máte problémy nebo návrhy? Jsme tu, abychom vám pomohli vytěžit z Clify maximum.',
        'name-label': 'Vaše Jméno *',
        'email-label': 'Váš E-mail *',
        'category-label': 'Kategorie Problému *',
        'category-bug': 'Hlášení Chyby',
        'category-feature': 'Požadavek na Funkci',
        'category-help': 'Potřebuji Pomoc',
        'category-suggestion': 'Návrh',
        'category-other': 'Ostatní',
        'message-label': 'Vaše Zpráva *',
        'send-message': 'Odeslat Zprávu',
        'sending-message': 'Odesílání...',
        'resources-title': 'Zdroje Nápovědy',
        'resource-faq': 'Často Kladené Otázky & Řešení Problémů',
        'resource-faq-desc': 'Běžné otázky a řešení',
        'resource-guide': 'Uživatelský Průvodce',
        'resource-guide-desc': 'Naučte se používat všechny funkce',
        'resource-bugs': 'Nahlásit Chyby',
        'resource-bugs-desc': 'Našli jste chybu? Dejte nám vědět',
        'resource-features': 'Navrhnout Funkce',
        'resource-features-desc': 'Sdílejte své nápady na vylepšení',
        'about-title': 'O Clify',
        'version-text': 'Verze:',
        'about-description': 'Clify vám pomáhá zůstat soustředěný skrytím rušivého obsahu YouTube. Funguje lokálně ve vašem prohlížeči a respektuje vaše soukromí - žádná data se neodesílají na externí servery.',
        'feature-privacy': 'Soukromí na Prvním Místě',
        'feature-fast': 'Bleskově Rychlý',
        'feature-realtime': 'Blokování v Reálném Čase',
        'footer-made': 'Vytvořeno s ❤️ pro soustředěný YouTube zážitek',
        'validation-required': 'Vyplňte prosím všechna povinná pole.',
        'validation-message-length': 'Poskytněte prosím podrobnější zprávu (alespoň 10 znaků).',
        'contact-success-telegram': 'Děkujeme! Vaše zpráva byla odeslána našemu podpůrnému týmu přes Telegram. Brzy se vám ozveme.',
        'contact-success-local': 'Děkujeme! Vaše zpráva byla uložena. Projdeme ji, když budeme připojeni k internetu.',
        'contact-error': 'Omlouváme se, při odesílání zprávy došlo k chybě. Zkuste to prosím později nebo nás kontaktujte přímo.',
        'capacity-text': 'Vaše Úložiště',
        'capacity-normal': 'Vaše úložiště vypadá skvěle! Pokračujte v blokování těch otravných videí. 😊',
        'capacity-warning': 'Pozor! Úložiště se plní ({percent}%) 📦',
        'capacity-critical': 'Upozornění! Úložiště plné ({percent}%) 🚨',
        'capacity-full': 'Hej! Vaše úložiště je zcela plné. Musíte vymazat některá videa, abyste mohli blokovat nová. 🚨',
        'capacity-warning-full': 'Pozor! Úložiště téměř plné ({percent}%) - zvažte vymazání některých videí',
        'telegram-connected': 'Připojeno k Telegramu',
        'telegram-disconnected': 'Telegram Odpojen',
        'telegram-message-sent': 'Test připojení k Telegramu úspěšný!',
        'test-success': 'Test Úspěšný',
        'test-failed': 'Test Neúspěšný',
        'days-ago': 'dny nazpět',
        'hours-ago': 'hodiny nazpět',
        'minutes-ago': 'minuty nazpět',
        'just-now': 'Právě teď',
        'results-text': 'videí',
        'support-header-text': 'Podpora',
        'donate-header-text': 'Přispět',
        'stat-manual': 'Manuální Blokace (Clify Tlačítko)',
        'stat-auto': 'Blokováno Klíčovým Slovem'
    },
    uk: {
        'welcome-title': 'Ласкаво просимо до Clify! ⚡',
        'welcome-subtitle': 'Возьміть контроль над своїм досвідом YouTube, автоматично блокуючи небажаний контент',
        'tab-dash': 'Панель керування',
        'tab-blocked': 'Заблоковані відео',
        'tab-keywords': 'Ключові слова',
        'tab-support': 'Підтримка',
        'refresh-text': 'Оновити',
        'theme-text': 'Тема',
        'stat-today': 'Сьогоднішні блокування',
        'stat-total': 'Всього заблоковано',
        'stat-efficiency': 'Ефективність',
        'activity-title': 'Активність блокувань',
        'activity-subtitle': 'Останні 30 днів',
        'stat-keywords': 'Активні ключові слова',
        'stat-manual': 'Ручні блокування',
        'stat-auto': 'Авто блокування',
        'stat-shorts': 'Shorts заблоковано',
        'stat-lang': 'Мовні блокування',
        'recent-title': 'Нещодавно заблоковано',
        'view-all-btn': 'Переглянути всі',
        'blocked-title': 'Заблоковані відео',
        'blocked-subtitle': 'Керуйте всіма відео, які ви заблокували зі своєї стрічки YouTube',
        'col-title': 'Назва відео',
        'col-id': 'ID відео',
        'col-reason': 'Причина',
        'col-date': 'Дата блокування',
        'col-actions': 'Дії',
        'filter-all': 'Усі причини',
        'filter-manual': 'Ручне блокування',
        'filter-keyword': 'Збіг ключових слів',
        'filter-shorts': 'Shorts',
        'filter-language': 'Мова',
        'sort-newest': 'Спочатку нові',
        'sort-oldest': 'Спочатку старі',
        'sort-title': 'Назва А-Я',
        'export-btn': 'Експорт',
        'clear-all-btn': 'Очистити все',
        'loading-text': 'Завантаження ваших заблокованих відео...',
        'empty-title': 'Поки що немає заблокованих відео',
        'empty-subtitle': 'Почніть очищати свій досвід YouTube, блокуючи небажані відео',
        'empty-action': 'Додати ключові слова для автоматичного блокування',
        'keywords-title': 'Менеджер ключових слів',
        'keywords-subtitle': 'Автоматично блокують відео, що містять певні ключові слова або фрази',
        'save-keywords': 'Зберегти ключові слова',
        'clear-keywords': 'Очистити все',
        'keywords-count-label': 'Кількість ключових слів:',
        'keywords-format-label': 'Формат:',
        'help-title': 'Як використовувати ключові слова',
        'help-line1': 'Введіть одне ключове слово в рядок або розділіть комами',
        'help-line2': 'Використовуйте конкретні фрази для кращої точності',
        'help-line3': 'Ключові слова нечутливі до регістру',
        'help-line4': 'Підтримує кілька мов: Українська, Англійська, Арабська, Гінді, Бенгальська тощо',
        'help-line5': 'Використовуйте | для синонімів: фільм|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Максимум 2000 ключових слів підтримується',
        'support-title': 'Підтримка та допомога',
        'support-subtitle': 'Отримайте допомогу, повідомте про проблеми та навчіться ефективно використовувати Clify',
        'contact-title': 'Зв\'язатися з підтримкою',
        'contact-subtitle': 'Проблеми чи пропозиції? Ми тут, щоб допомогти вам отримати максимальну віддачу від Clify.',
        'name-label': 'Ваше ім\'я *',
        'email-label': 'Ваш email *',
        'category-label': 'Категорія проблеми *',
        'category-bug': 'Звіт про помилку',
        'category-feature': 'Запит функції',
        'category-help': 'Потрібна допомога',
        'category-suggestion': 'Пропозиція',
        'category-other': 'Інше',
        'message-label': 'Ваше повідомлення *',
        'send-message': 'Надіслати повідомлення',
        'sending-message': 'Надсилання...',
        'resources-title': 'Ресурси допомоги',
        'resource-faq': 'FAQ та усунення несправностей',
        'resource-faq-desc': 'Поширені питання та рішення',
        'resource-guide': 'Посібник користувача',
        'resource-guide-desc': 'Навчіться використовувати всі функції',
        'resource-bugs': 'Повідомити про помилки',
        'resource-bugs-desc': 'Знайшли проблему? Повідомте нам',
        'resource-features': 'Запропонувати функції',
        'resource-features-desc': 'Поділіться своїми ідеями щодо вдосконалення',
        'about-title': 'Про Clify',
        'version-text': 'Версія:',
        'about-description': 'Clify допомагає вам залишатися зосередженим, приховуючи відволікаючий контент YouTube. Він працює локально у вашому браузері та поважає вашу конфіденційність - жодні дані не надсилаються на зовнішні сервери.',
        'feature-privacy': 'Конфіденційність на першому місці',
        'feature-fast': 'Блискавично швидкий',
        'feature-realtime': 'Блокування в реальному часі',
        'footer-made': 'Зроблено з ❤️ для зосередженого досвіду YouTube'
    },
    sw: {
        'welcome-title': 'Karibu kwenye Clify! ⚡',
        'welcome-subtitle': 'Chukua udhibiti wa uzoefu wako wa YouTube kwa kuzuia automatikali maudhui yasiyotakiwa',
        'tab-dash': 'Dashibodi',
        'tab-blocked': 'Video Zilizozuiwa',
        'tab-keywords': 'Maneno Muhimu',
        'tab-support': 'Usaidizi',
        'refresh-text': 'Onyesha Upya',
        'theme-text': 'Mandhari',
        'stat-today': 'Vizuizi Vya Leo',
        'stat-total': 'Jumla Iliyozuiwa',
        'stat-efficiency': 'Ufanisi',
        'activity-title': 'Shughuli ya Kuzuia',
        'activity-subtitle': 'Siku 30 Zilizopita',
        'stat-keywords': 'Maneno Muhimu Yanayotumika',
        'stat-manual': 'Vizuizi vya Mikono',
        'stat-auto': 'Vizuizi vya Automatikali',
        'stat-shorts': 'Shorts Zilizozuiwa',
        'stat-lang': 'Vizuizi vya Lugha',
        'recent-title': 'Imezuiwa Hivi Karibuni',
        'view-all-btn': 'Onyesha Zote',
        'blocked-title': 'Video Zilizozuiwa',
        'blocked-subtitle': 'Dhibiti video zote ulizozuia kutoka kwenye mkondo wako wa YouTube',
        'col-title': 'Kichwa cha Video',
        'col-id': 'Kitambulisho cha Video',
        'col-reason': 'Sababu',
        'col-date': 'Tarehe Iliyozuiwa',
        'col-actions': 'Vitendo',
        'filter-all': 'Sababu Zote',
        'filter-manual': 'Kuzuia kwa Mikono',
        'filter-keyword': 'Kulingana kwa Neno Muhimu',
        'filter-shorts': 'Shorts',
        'filter-language': 'Lugha',
        'sort-newest': 'Mpya Zaidi Kwanza',
        'sort-oldest': 'Kale Zaidi Kwanza',
        'sort-title': 'Kichwa A-Z',
        'export-btn': 'Hamisha',
        'clear-all-btn': 'Futa Zote',
        'loading-text': 'Inapakia video zako zilizozuiwa...',
        'empty-title': 'Hakuna video zilizozuiwa bado',
        'empty-subtitle': 'Anza kusafisha uzoefu wako wa YouTube kwa kuzuia video zisizotakiwa',
        'empty-action': 'Ongeza Maneno Muhimu ya Kuzuia Automatikali',
        'keywords-title': 'Meneja wa Maneno Muhimu',
        'keywords-subtitle': 'Zuia automatikali video zenye maneno muhimu au misamiati maalum',
        'save-keywords': 'Hifadhi Maneno Muhimu',
        'clear-keywords': 'Futa Zote',
        'keywords-count-label': 'Hesabu ya Maneno Muhimu:',
        'keywords-format-label': 'Muundo:',
        'help-title': 'Jinsi ya kutumia maneno muhimu',
        'help-line1': 'Weka neno moja muhimu kwa kila mstari au tengeneza kwa vitone',
        'help-line2': 'Tumia misamiati maalum kwa usahihi bora',
        'help-line3': 'Maneno muhimu hayatofautishi herufi kubwa na ndogo',
        'help-line4': 'Inasaidia lugha nyingi: Kiswahili, Kiingereza, Kiarabu, Kihindi, Kibengali, n.k.',
        'help-line5': 'Tumia | kwa visawe: filamu|فيلم|फिल्म|সিনেমা',
        'help-line6': 'Maneno muhimu hadi 2000 yanasaidiwa',
        'support-title': 'Usaidizi na Msaada',
        'support-subtitle': 'Pata usaidizi, ripoti matatizo na ujifunze jinsi ya kutumia Clify kwa ufanisi',
        'contact-title': 'Wasiliana na Usaidizi',
        'contact-subtitle': 'Matatizo au mapendekezo? Tuko hapa kukusaidia kupata faida kubwa kutoka kwa Clify.',
        'name-label': 'Jina Lako *',
        'email-label': 'Barua Pepe Yako *',
        'category-label': 'Kategoria ya Tatizo *',
        'category-bug': 'Ripoti ya Hitilafu',
        'category-feature': 'Ombi la Kipengele',
        'category-help': 'Inahitaji Msaada',
        'category-suggestion': 'Pendekezo',
        'category-other': 'Nyingine',
        'message-label': 'Ujumbe Wako *',
        'send-message': 'Tuma Ujumbe',
        'sending-message': 'Inatuma...',
        'resources-title': 'Rasilimali za Msaada',
        'resource-faq': 'Maswali Yanayoulizwa Mara kwa Mara & Utatuzi wa Matatizo',
        'resource-faq-desc': 'Maswali ya kawaida na suluhisho',
        'resource-guide': 'Mwongozo wa Mtumiaji',
        'resource-guide-desc': 'Jifunze jinsi ya kutumia vipengele vyote',
        'resource-bugs': 'Ripoti Hitilafu',
        'resource-bugs-desc': 'Umepata tatizo? Tuarifu',
        'resource-features': 'Pendekeza Vipengele',
        'resource-features-desc': 'Shiriki mawazo yako ya kuboresha',
        'about-title': 'Kuhusu Clify',
        'version-text': 'Toleo:',
        'about-description': 'Clify inakusaidia kukaa ukizingatia kwa kuficha maudhui ya YouTube yanayovuruga. Inafanya kazi ndani ya kivinjari chako na inaheshimu faragha yako - hakuna data inayotumwa kwa seva za nje.',
        'feature-privacy': 'Faragha Kwanza',
        'feature-fast': 'Haraka Kama Umeme',
        'feature-realtime': 'Kuzuia kwa Wakati Halisi',
        'footer-made': 'Imetengenezwa kwa ❤️ kwa uzoefu uliozingatiwa wa YouTube'
    }
};
// Language names for the dropdown (to show in the selector)
const languageNames = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'nl': 'Nederlands',
    'it': 'Italiano',
    'pt': 'Português',
    'bn': 'বাংলা',
    'hi': 'हिन्दी',
    'zh': '中文',
    'ja': '日本語',
    'ko': '한국어',
    'ru': 'Русский',
    'th': 'ไทย',
    'id': 'Bahasa Indonesia',
    'ar': 'العربية',
    'ur': 'اردو',
    'tr': 'Türkçe',
    'hu': 'Magyar',
    'fi': 'Suomi',
    'cs': 'Čeština',
    'pl': 'Polski',
    'vi': 'Tiếng Việt',
    'uk': 'Українська',
    'sw': 'Kiswahili',
    'sv': 'Svenska',
    'ms': 'Bahasa Malaysia',
    'af': 'Afrikaans',
    'no': 'Norsk',
    'ro': 'Română',
    'da': 'Dansk',
    'tl': 'Filipino',
    'ne': 'नेपाली',
    'he': 'עברית',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'ml': 'മലയാളം',
    'kn': 'ಕನ್ನಡ',
    'as': 'অসমীয়া',
    'or': 'ଓଡ଼ିଆ'
};
// Global state
let currentLanguage = 'en';
let blockedLanguages = [];
let searchCache = [];

// Enhanced Search System
class EnhancedSearch {
    constructor() {
        this.searchIndex = new Map();
        this.fuse = null;
        this.isIndexed = false;
        this.searchCache = new Map();
        this.debounceTimer = null;
    }

    async initialize() {
        await this.buildSearchIndex();
        this.initializeFuzzySearch();
        console.log('Enhanced search system initialized');
    }

    async buildSearchIndex() {
        try {
            const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
            const blockedVideos = response?.blockedVideosMap || {};
            
            this.searchIndex.clear();
            
            Object.values(blockedVideos).forEach((video, index) => {
                const searchableText = this.normalizeText(
                    `${video.title} ${video.id} ${video.reason} ${video.timestamp}`
                );
                
                this.searchIndex.set(index, {
                    id: video.id,
                    title: video.title,
                    videoId: video.id,
                    reason: video.reason,
                    timestamp: video.timestamp,
                    ts: video.ts,
                    searchableText: searchableText,
                    originalData: video,
                    matchingKeywords: video.matchingKeywords || [],
                    keywordCount: video.keywordCount || 0
                });
            });
            
            this.isIndexed = true;
            console.log(`Search index built with ${this.searchIndex.size} items`);
            
        } catch (error) {
            console.error('Error building search index:', error);
        }
    }

    initializeFuzzySearch() {
        // Simple fuzzy search implementation
        this.fuse = {
            search: (query, items, options = {}) => {
                const normalizedQuery = this.normalizeText(query);
                if (!normalizedQuery) return items;

                const results = [];
                const threshold = options.threshold || 0.3;

                items.forEach((item, index) => {
                    const score = this.calculateSimilarity(normalizedQuery, item.searchableText);
                    if (score >= threshold) {
                        results.push({
                            item: item,
                            score: score,
                            index: index
                        });
                    }
                });

                // Sort by score (descending)
                return results.sort((a, b) => b.score - a.score).map(result => result.item);
            }
        };
    }

    normalizeText(text) {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
            .replace(/\s+/g, ' ') // Collapse multiple spaces
            .trim();
    }

    calculateSimilarity(query, text) {
        if (query === text) return 1.0;
        if (text.includes(query)) return 0.8;
        
        const queryWords = query.split(' ');
        const textWords = text.split(' ');
        
        let matches = 0;
        queryWords.forEach(qWord => {
            if (textWords.some(tWord => tWord.includes(qWord) || qWord.includes(tWord))) {
                matches++;
            }
        });
        
        return matches / queryWords.length;
    }

    search(query, filters = {}) {
        if (!this.isIndexed || !query.trim()) {
            return this.getAllVideos(filters);
        }

        const cacheKey = `${query}-${JSON.stringify(filters)}`;
        if (this.searchCache.has(cacheKey)) {
            return this.searchCache.get(cacheKey);
        }

        const normalizedQuery = this.normalizeText(query);
        const allItems = Array.from(this.searchIndex.values());
        
        // Apply filters first
        let filteredItems = this.applyFilters(allItems, filters);
        
        // Then search
        let results = this.fuse.search(normalizedQuery, filteredItems);
        
        // If no fuzzy results, try partial matching
        if (results.length === 0) {
            results = this.partialMatchSearch(normalizedQuery, filteredItems);
        }

        // Sort results
        results = this.sortResults(results, filters.sortBy || 'newest');

        this.searchCache.set(cacheKey, results);
        return results;
    }

    applyFilters(items, filters) {
        let filtered = items;
        
        if (filters.reason && filters.reason !== 'all') {
            filtered = filtered.filter(item => item.reason === filters.reason);
        }
        
        if (filters.dateRange && filters.dateRange !== 'all') {
            filtered = this.filterByDateRange(filtered, filters.dateRange);
        }
        
        return filtered;
    }

    filterByDateRange(items, dateRange) {
        const now = Date.now();
        const ranges = {
            'today': 24 * 60 * 60 * 1000,
            'week': 7 * 24 * 60 * 60 * 1000,
            'month': 30 * 24 * 60 * 60 * 1000,
            'year': 365 * 24 * 60 * 60 * 1000
        };
        
        if (ranges[dateRange]) {
            const cutoff = now - ranges[dateRange];
            return items.filter(item => item.ts >= cutoff);
        }
        
        return items;
    }

    partialMatchSearch(query, items) {
        const queryWords = query.split(' ');
        return items.filter(item => {
            return queryWords.some(word => 
                item.searchableText.includes(word) ||
                item.title.toLowerCase().includes(word) ||
                item.videoId.includes(word) ||
                item.reason.includes(word)
            );
        });
    }

    sortResults(items, sortBy) {
        const sorted = [...items];
        
        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => b.ts - a.ts);
            case 'oldest':
                return sorted.sort((a, b) => a.ts - b.ts);
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'reason':
                return sorted.sort((a, b) => a.reason.localeCompare(b.reason));
            default:
                return sorted;
        }
    }

    getAllVideos(filters = {}) {
        const allItems = Array.from(this.searchIndex.values());
        const filtered = this.applyFilters(allItems, filters);
        return this.sortResults(filtered, filters.sortBy || 'newest');
    }

    async refreshIndex() {
        this.searchCache.clear();
        await this.buildSearchIndex();
    }

    getSearchSuggestions(query) {
        if (!query.trim() || !this.isIndexed) return [];
        
        const normalizedQuery = this.normalizeText(query);
        const allItems = Array.from(this.searchIndex.values());
        const suggestions = new Set();
        
        allItems.forEach(item => {
            // Suggest matching titles
            if (item.title.toLowerCase().includes(normalizedQuery)) {
                suggestions.add(item.title.substring(0, 50));
            }
            
            // Suggest matching reasons
            if (item.reason.toLowerCase().includes(normalizedQuery)) {
                suggestions.add(item.reason);
            }
            
            // Suggest matching video IDs
            if (item.videoId.includes(normalizedQuery)) {
                suggestions.add(item.videoId);
            }
        });
        
        return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
    }
}

// Initialize enhanced search
const enhancedSearch = new EnhancedSearch();

// Enhanced Stats Manager
class StatsManager {
    constructor() {
        this.stats = {
            totalBlocks: 0,
            todayBlocks: 0,
            manualBlocks: 0,
            keywordBlocks: 0,
            shortsBlocks: 0,
            languageBlocks: 0,
            activeKeywords: 0,
            dailyActivity: {},
            lastUpdated: null
        };
    }

    async loadStats() {
        try {
            const statsResponse = await sendMessageToYouTube({ type: "getStats" });
            
            if (statsResponse && statsResponse.success !== false) {
                this.stats = this.mergeStats(this.stats, statsResponse);
                console.log('Clify: Stats loaded from content script:', this.stats);
            } else {
                await this.loadFromLocalStorage();
                console.log('Clify: Stats loaded from local storage:', this.stats);
            }
            
            this.stats.lastUpdated = new Date().toISOString();
            return this.stats;
            
        } catch (error) {
            console.error('Clify: Error loading stats:', error);
            await this.loadFromLocalStorage();
            return this.stats;
        }
    }

    async loadFromLocalStorage() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['ClifyStats', 'blockedVideos', 'keywords'], (result) => {
                const blockedVideos = result.blockedVideos || {};
                const storedStats = result.ClifyStats || {};
                const keywords = result.keywords || [];
                
                const videoArray = Object.values(blockedVideos);
                const today = new Date().toISOString().slice(0, 10);
                
                this.stats = {
                    totalBlocks: videoArray.length,
                    todayBlocks: videoArray.filter(v => 
                        new Date(v.ts).toISOString().slice(0, 10) === today
                    ).length,
                    manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                    keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                    shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                    languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                    activeKeywords: keywords.length,
                    dailyActivity: storedStats.dailyActivity || this.generateEmptyActivityChart(),
                    lastUpdated: new Date().toISOString()
                };
                
                resolve(this.stats);
            });
        });
    }

    mergeStats(existing, newStats) {
        return {
            totalBlocks: newStats.totalBlocks || existing.totalBlocks,
            todayBlocks: newStats.todayBlocks || existing.todayBlocks,
            manualBlocks: newStats.manualBlocks || existing.manualBlocks,
            keywordBlocks: newStats.keywordBlocks || existing.keywordBlocks,
            shortsBlocks: newStats.shortsBlocks || existing.shortsBlocks,
            languageBlocks: newStats.languageBlocks || existing.languageBlocks,
            activeKeywords: newStats.activeKeywords || existing.activeKeywords,
            dailyActivity: newStats.dailyActivity || existing.dailyActivity,
            lastUpdated: new Date().toISOString()
        };
    }

    generateEmptyActivityChart() {
        const activity = {};
        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            activity[date.toISOString().slice(0, 10)] = 0;
        }
        return activity;
    }

    getStats() {
        return this.stats;
    }

    calculateEfficiency() {
        if (this.stats.totalBlocks === 0) return 0;
        const activeDays = Object.values(this.stats.dailyActivity).filter(count => count > 0).length;
        return Math.min(100, Math.round((this.stats.totalBlocks / Math.max(1, activeDays)) * 10));
    }
}

const statsManager = new StatsManager();

// Admin Notification System
class AdminNotificationSystem {
    constructor() {
        this.notificationIcon = null;
        this.unreadCount = 0;
        this.adminMessages = [];
        this.lastChecked = null;
    }

    init() {
        console.log('Initializing Admin Notification System...');
        this.createNotificationIcon();
        this.loadStoredMessages();
        this.startPolling();
        this.requestNotificationPermission();
        console.log('Admin Notification System initialized');
    }

    createNotificationIcon() {
        const headerRight = document.querySelector('.header-right');
        if (!headerRight) {
            console.error('Header right not found');
            return;
        }

        // Remove any existing notification icons first
        const existingIcons = document.querySelectorAll('.notification-icon-header');
        existingIcons.forEach(icon => icon.remove());

        this.notificationIcon = document.createElement('div');
        this.notificationIcon.className = 'notification-icon-header';
        this.notificationIcon.innerHTML = `
            <div class="notification-bell" id="notificationBell" title="Admin Messages">
                <i class="fas fa-bell"></i>
                <span class="notification-badge" id="notificationBadge">0</span>
            </div>
            <div class="notification-dropdown" id="notificationDropdown">
                <div class="notification-header">
                    <h4>Notifications</h4>
                    <button class="mark-all-read" id="markAllRead" title="Mark all messages as read">Mark all read</button>
                </div>
                <div class="notification-list" id="notificationList">
                    <!-- Messages will appear here -->
                </div>
                <div class="notification-footer">
                    <a href="https://t.me/Clifybydd" target="_blank" class="telegram-link">
                        <span>Get All Informations</span>
                    </a>
                </div>
            </div>
        `;

        // Insert at the beginning of header-right
        headerRight.insertBefore(this.notificationIcon, headerRight.firstChild);

        // Add event listeners
        const notificationBell = document.getElementById('notificationBell');
        if (notificationBell) {
            notificationBell.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown();
            });
            
            // Add hover effect
            notificationBell.style.cursor = 'pointer';
        } else {
            console.error('Notification bell not found');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.notificationIcon && !this.notificationIcon.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Mark all read button
        const markAllReadBtn = document.getElementById('markAllRead');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.markAllAsRead();
            });
            
            markAllReadBtn.style.cursor = 'pointer';
        }

        console.log('Notification icon created successfully');
    }

    async loadStoredMessages() {
        const stored = await this.getStoredData('adminMessages');
        this.adminMessages = stored || [];
        this.updateUnreadCount();
        this.renderMessages();
    }

    async fetchAdminMessages() {
        try {
            const response = await this.fetchFromTelegram();
            
            if (response && response.messages) {
                const newMessages = response.messages.filter(newMsg => 
                    !this.adminMessages.find(existingMsg => existingMsg.id === newMsg.id)
                );

                if (newMessages.length > 0) {
                    this.adminMessages = [...newMessages, ...this.adminMessages];
                    this.unreadCount += newMessages.length;
                    await this.saveStoredData('adminMessages', this.adminMessages);
                    this.updateUnreadCount();
                    this.renderMessages();
                    
                    newMessages.forEach(msg => {
                        this.showDesktopNotification(msg);
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch admin messages:', error);
        }
    }

    async fetchFromTelegram() {
        try {
            const mockMessages = [
                {
                    id: '1',
                    title: 'Clify v7.1.0 Update Live! 🚀',
                    message: 'Some New Features has come.',
                    timestamp: Date.now() - 300000,
                    read: false,
                    type: 'update',
                    link: 'https://github.com/diptodesign/Clify/releases/download/V7.0.1/Clify.7.1.zip'
                },
                {
                    id: '2', 
                    title: 'Some Colors Have Changed',
                    message: 'We have changed some colors.',
                    timestamp: Date.now() - 1800000,
                    read: false,
                    type: 'feature',
                    link: '#blocked-videos'
                },
                {
                    id: '3',
                    title: 'Something is coming',
                    message: 'New feature are going to come.',
                    timestamp: Date.now() - 3600000,
                    read: false,
                    type: 'improvement',
                    link: '#extra'
                }
            ];

            console.log('Fetched mock messages with links:', mockMessages.length);
            return { messages: mockMessages };
        } catch (error) {
            console.error('Telegram fetch error:', error);
            return { messages: [] };
        }
    }

    showDesktopNotification(message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`Clify Update: ${message.title}`, {
                body: message.message,
                icon: '/icons/icon128.png',
                tag: 'Clify-admin'
            });
        }
    }

    toggleDropdown() {
        try {
            const dropdown = document.getElementById('notificationDropdown');
            const list = document.getElementById('notificationList');
            
            if (!dropdown) {
                console.error('Notification dropdown not found');
                return;
            }
            
            dropdown.classList.toggle('show');
            
            // Auto-scroll to top when opening
            if (dropdown.classList.contains('show') && list) {
                list.scrollTop = 0;
            }
            
            console.log('Dropdown toggled, show:', dropdown.classList.contains('show'));
        } catch (error) {
            console.error('Error toggling dropdown:', error);
        }
    }

    hideDropdown() {
        try {
            const dropdown = document.getElementById('notificationDropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        } catch (error) {
            console.error('Error hiding dropdown:', error);
        }
    }

    renderMessages() {
        const list = document.getElementById('notificationList');
        if (!list) {
            console.error('Notification list not found');
            return;
        }

        // Sort messages by timestamp (newest first)
        const sortedMessages = [...this.adminMessages].sort((a, b) => b.timestamp - a.timestamp);

        if (sortedMessages.length === 0) {
            list.innerHTML = `
                <div class="empty-notifications">
                    <i class="fas fa-inbox"></i>
                    <p>No messages yet</p>
                    <p style="font-size: 12px; margin-top: 8px; opacity: 0.7;">Check back later for updates</p>
                </div>
            `;
            return;
        }

        list.innerHTML = sortedMessages.map(msg => `
            <div class="notification-item ${msg.read ? 'read' : 'unread'}" data-id="${msg.id}" data-link="${msg.link || ''}">
                <div class="notification-icon">
                    <i class="fas fa-${this.getMessageIcon(msg.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">
                        ${msg.title}
                        ${msg.link ? '<i class="fas fa-external-link-alt link-indicator" style="margin-left: 8px; font-size: 10px; opacity: 0.6;"></i>' : ''}
                    </div>
                    <div class="notification-message">${msg.message}</div>
                    <div class="notification-time">${this.formatTime(msg.timestamp)}</div>
                </div>
                ${!msg.read ? '<div class="unread-dot"></div>' : ''}
            </div>
        `).join('');

        // Add click handlers for all messages
        list.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const messageId = item.getAttribute('data-id');
                const link = item.getAttribute('data-link');
                
                // Mark as read
                this.markAsRead(messageId);
                
                // Handle link if present
                if (link) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleMessageLink(link);
                }
                
                // Close dropdown after click
                this.hideDropdown();
            });
            
            // Add hover effect for clickable messages
            if (item.getAttribute('data-link')) {
                item.style.cursor = 'pointer';
                item.title = 'Click to open link';
            }
        });

        console.log('Rendered', sortedMessages.length, 'messages with links');
    }

    handleMessageLink(link) {
        try {
            console.log('Handling message link:', link);
            
            if (!link) return;
            
            if (link.startsWith('http')) {
                // External link - open in new tab
                window.open(link, '_blank', 'noopener,noreferrer');
                console.log('Opened external link:', link);
            } else if (link.startsWith('#')) {
                // Internal link - scroll to section
                const targetSection = document.querySelector(link);
                if (targetSection) {
                    // Switch to the appropriate tab first
                    const tabName = link.substring(1); // Remove the #
                    if (tabName && typeof switchToTab === 'function') {
                        switchToTab(tabName);
                    }
                    
                    // Scroll to section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    console.log('Scrolled to internal section:', link);
                } else {
                    console.warn('Internal section not found:', link);
                }
            } else {
                console.warn('Unknown link type:', link);
            }
        } catch (error) {
            console.error('Error handling message link:', error);
        }
    }

    getMessageIcon(type) {
        const icons = {
            info: 'info-circle',
            warning: 'exclamation-triangle',
            update: 'rocket',
            feature: 'star',
            improvement: 'bolt',
            announcement: 'bullhorn',
            alert: 'bell'
        };
        return icons[type] || 'bell';
    }

    markAsRead(messageId) {
        const message = this.adminMessages.find(msg => msg.id === messageId);
        if (message && !message.read) {
            message.read = true;
            this.unreadCount--;
            this.updateUnreadCount();
            this.saveStoredData('adminMessages', this.adminMessages);
            this.renderMessages();
        }
    }

    markAllAsRead() {
        this.adminMessages.forEach(msg => msg.read = true);
        this.unreadCount = 0;
        this.updateUnreadCount();
        this.saveStoredData('adminMessages', this.adminMessages);
        this.renderMessages();
    }

    updateUnreadCount() {
        const badge = document.getElementById('notificationBadge');
        if (badge) {
            badge.textContent = this.unreadCount > 0 ? this.unreadCount : '';
            badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
        }
    }

    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        if (diff < 60000) { // Less than 1 minute
            return 'Just now';
        } else if (diff < 3600000) { // Less than 1 hour
            const minutes = Math.floor(diff / 60000);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400000) { // Less than 1 day
            const hours = Math.floor(diff / 3600000);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diff < 604800000) { // Less than 1 week
            const days = Math.floor(diff / 86400000);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return new Date(timestamp).toLocaleDateString();
        }
    }

    startPolling() {
        setInterval(() => {
            this.fetchAdminMessages();
        }, 5 * 60 * 1000);

        this.fetchAdminMessages();
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    async getStoredData(key) {
        return new Promise(resolve => {
            chrome.storage.local.get([key], result => {
                resolve(result[key]);
            });
        });
    }

    async saveStoredData(key, data) {
        return new Promise(resolve => {
            chrome.storage.local.set({ [key]: data }, resolve);
        });
    }
}

class YouTubeIntegration {
    constructor() {
        this.isConnected = false;
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    async sendMessageToContentScript(message) {
        for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
            try {
                const tabs = await new Promise(resolve => {
                    chrome.tabs.query({url: "*://*.youtube.com/*"}, resolve);
                });
                
                if (tabs.length === 0) {
                    throw new Error('No YouTube tabs available');
                }

                const activeTab = tabs.find(tab => tab.active);
                const targetTab = activeTab || tabs[0];
                
                return new Promise((resolve, reject) => {
                    chrome.tabs.sendMessage(targetTab.id, message, (response) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        } else {
                            this.isConnected = true;
                            resolve(response);
                        }
                    });
                });
                
            } catch (error) {
                console.warn(`Clify: YouTube connection attempt ${attempt + 1} failed:`, error);
                
                if (attempt < this.maxRetries) {
                    await this.delay(Math.pow(2, attempt) * 1000);
                } else {
                    return this.handleFallbackStorage(message);
                }
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async handleFallbackStorage(message) {
        return new Promise((resolve) => {
            chrome.storage.local.get(['blockedVideos', 'keywords', 'ClifyStats'], (result) => {
                const blockedVideos = result.blockedVideos || {};
                const videoArray = Object.values(blockedVideos);
                const today = new Date().toISOString().slice(0, 10);
                
                switch (message.type) {
                    case "getStats":
                        const stats = {
                            totalBlocks: videoArray.length,
                            todayBlocks: videoArray.filter(v => 
                                new Date(v.ts).toISOString().slice(0, 10) === today
                            ).length,
                            manualBlocks: videoArray.filter(v => v.reason === 'manual').length,
                            keywordBlocks: videoArray.filter(v => v.reason === 'keyword').length,
                            shortsBlocks: videoArray.filter(v => v.reason === 'shorts').length,
                            languageBlocks: videoArray.filter(v => v.reason === 'language').length,
                            activeKeywords: (result.keywords || []).length,
                            dailyActivity: result.ClifyStats?.dailyActivity || {},
                            success: true
                        };
                        resolve(stats);
                        break;
                        
                    case "getBlockedVideos":
                        resolve({ blockedVideosMap: blockedVideos, success: true });
                        break;
                        
                    case "getKeywords":
                        chrome.storage.sync.get({keywords: []}, (syncResult) => {
                            resolve({ keywords: syncResult.keywords, success: true });
                        });
                        break;
                        
                    case "saveKeywords":
                        chrome.storage.sync.set({keywords: message.keywords}, () => {
                            resolve({ success: true });
                        });
                        break;
                        
                    case "clearAllVideos":
                        chrome.storage.local.set({ blockedVideos: {} }, () => {
                            // Also clear from sync storage for consistency
                            chrome.storage.sync.set({ keywords: [] }, () => {
                                resolve({ success: true });
                            });
                        });
                        break;
                        
                    case "unblockVideo":
                        delete blockedVideos[message.videoId];
                        chrome.storage.local.set({ blockedVideos }, () => {
                            resolve({ success: true });
                        });
                        break;
                        
                    default:
                        resolve({ success: false, error: 'Unknown message type' });
                }
            });
        });
    }
}

const youTubeIntegration = new YouTubeIntegration();

async function sendMessageToYouTube(message) {
    try {
        const response = await youTubeIntegration.sendMessageToContentScript(message);
        return response;
    } catch (error) {
        console.error('Message failed:', error);
        throw error;
    }
}

// Enhanced Helper Functions with Safe Element Access
function $(selector, context) {
    context = context || document;
    try {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
            return null;
        }
        return element;
    } catch (error) {
        console.error(`Error querying selector ${selector}:`, error);
        return null;
    }
}

function $$(selector, context) {
    context = context || document;
    try {
        const elements = context.querySelectorAll(selector);
        return Array.from(elements);
    } catch (error) {
        console.error(`Error querying selector ${selector}:`, error);
        return [];
    }
}

function safeElement(selector, callback) {
    const element = $(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Modern Notification System
function initNotificationSystem() {
    let container = $('#notificationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificationContainer';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

function showNotification(message, type = "success", options = {}) {
    const container = initNotificationSystem();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-text">
                <div class="notification-title">${options.title || getDefaultTitle(type)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="notification-progress"></div>
    `;

    container.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => hideNotification(notification));

    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.animation = `notificationProgress ${options.duration || 4000}ms linear forwards`;

    setTimeout(() => {
        if (notification.parentNode) {
            hideNotification(notification);
        }
    }, options.duration || 4000);

    return notification;
}

function hideNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hiding');
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

function getDefaultTitle(type) {
    const titles = {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information'
    };
    return titles[type] || 'Notification';
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || 'fas fa-bell';
}

function showSuccess(message, options = {}) {
    return showNotification(message, 'success', options);
}

function showError(message, options = {}) {
    return showNotification(message, 'error', { duration: 6000, ...options });
}

function showWarning(message, options = {}) {
    return showNotification(message, 'warning', { duration: 6000, ...options });
}

function showInfo(message, options = {}) {
    return showNotification(message, 'info', options);
}

// KEYWORD BADGE FUNCTIONS
function getKeywordColor(keyword) {
    // Simple hash function for consistent colors
    let hash = 0;
    for (let i = 0; i < keyword.length; i++) {
        hash = keyword.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Map to color classes 1-10
    const colorIndex = (Math.abs(hash) % 10) + 1;
    return `color-${colorIndex}`;
}

// Function to render inline keyword badges
function renderInlineKeywordBadges(keywords, maxDisplay = 3) {
    if (!keywords || keywords.length === 0) return '';
    
    const displayKeywords = keywords.slice(0, maxDisplay);
    const remainingCount = keywords.length - maxDisplay;
    
    const badges = displayKeywords.map(keyword => {
        const colorClass = getKeywordColor(keyword);
        // Shorten long keywords for better inline display
        const displayText = keyword.length > 10 ? keyword.substring(0, 8) + '..' : keyword;
        return `<span class="keyword-badge ${colorClass}" title="Blocked by: ${escapeHtml(keyword)}">${escapeHtml(displayText)}</span>`;
    }).join('');
    
    let moreBadge = '';
    if (remainingCount > 0) {
        moreBadge = `<span class="keyword-badge color-1" title="${remainingCount} more keywords">+${remainingCount}</span>`;
    }
    
    return `
        <span class="keyword-badges">
            ${badges}
            ${moreBadge}
        </span>
    `;
}

// Enhanced dashboard functions
async function loadDashboardData() {
    try {
        console.log('Loading dashboard data...');
        
        const stats = await statsManager.loadStats();
        const keywordsResponse = await sendMessageToYouTube({ type: "getKeywords" });
        const keywords = keywordsResponse?.keywords || [];
        
        updateDashboardUI(stats, keywords);
        
        console.log('Dashboard data loaded successfully:', stats);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError("Failed to load dashboard data. Using cached information.");
        
        // Try to load from local storage as fallback
        try {
            const stats = await statsManager.loadFromLocalStorage();
            updateDashboardUI(stats, []);
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            // Set minimal default UI
            updateDashboardUI({
                totalBlocks: 0,
                todayBlocks: 0,
                manualBlocks: 0,
                keywordBlocks: 0,
                shortsBlocks: 0,
                languageBlocks: 0,
                activeKeywords: 0,
                dailyActivity: {}
            }, []);
        }
    }
}

function updateDashboardUI(stats, keywords) {
    safeElement("#kpi_today", el => el.textContent = stats.todayBlocks.toLocaleString());
    safeElement("#kpi_total", el => el.textContent = stats.totalBlocks.toLocaleString());
    
    const efficiency = statsManager.calculateEfficiency();
    safeElement("#blockingRate", el => el.textContent = efficiency + '%');
    
    safeElement("#activeKeywords", el => el.textContent = keywords.length.toLocaleString());
    safeElement("#manualBlocksCount", el => el.textContent = stats.manualBlocks.toLocaleString());
    safeElement("#autoBlocksCount", el => el.textContent = stats.keywordBlocks.toLocaleString());
    safeElement("#shortsBlocksCount", el => el.textContent = stats.shortsBlocks.toLocaleString());
    safeElement("#langBlocksCount", el => el.textContent = stats.languageBlocks.toLocaleString());
    
    safeElement("#blockedCount", el => el.textContent = stats.totalBlocks.toLocaleString());
    
    updateActivityChart(stats.dailyActivity);
    updateCapacityDisplay(stats.totalBlocks);
    
    updateRecentList();
}

async function updateRecentList() {
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        const recentVideos = videos
            .sort((a, b) => b.ts - a.ts)
            .slice(0, 10);
        
        const recentList = $("#recentList");
        if (!recentList) return;
        
        if (recentVideos.length === 0) {
            recentList.innerHTML = `
                <div class="recent-item" style="text-align: center; color: var(--text-muted);">
                    <i class="fas fa-inbox" style="font-size: 24px; margin-bottom: 8px;"></i>
                    <div>No videos blocked yet</div>
                    <div style="font-size: 12px; margin-top: 4px;">Start blocking videos to see them here</div>
                </div>
            `;
        } else {
            recentList.innerHTML = recentVideos.map(video => {
                const hasKeywords = video.matchingKeywords && video.matchingKeywords.length > 0;
                const keywordBadges = hasKeywords ? renderInlineKeywordBadges(video.matchingKeywords, 2) : '';
                
                return `
                    <div class="recent-item">
                        <div class="recent-info">
                            <div class="title-main-row" style="margin-bottom: 4px;">
                                <div class="recent-title" title="${escapeHtml(video.title)}">
                                    ${escapeHtml(video.title.length > 35 ? video.title.substring(0, 35) + '...' : video.title)}
                                </div>
                                ${keywordBadges}
                            </div>
                            <div class="recent-meta">
                                <span class="reason-badge ${video.reason}" style="font-size: 9px; padding: 2px 6px;">
                                    ${getReasonDisplayText(video.reason)}
                                </span>
                                <span style="font-size: 11px;">${formatTimeAgo(video.ts)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    } catch (error) {
        console.error('Error updating recent list:', error);
        const recentList = $("#recentList");
        if (recentList) {
            recentList.innerHTML = `
                <div class="recent-item" style="text-align: center; color: var(--text-muted);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 8px;"></i>
                    <div>Failed to load recent videos</div>
                    <div style="font-size: 12px; margin-top: 4px;">Try refreshing the page</div>
                </div>
            `;
        }
    }
}

function updateActivityChart(dailyActivity) {
    const activityBars = $("#activityBars");
    if (!activityBars) return;
    
    const dates = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().slice(0, 10));
    }
    
    const maxCount = Math.max(...dates.map(date => dailyActivity[date] || 0), 1);
    
    activityBars.innerHTML = dates.map(date => {
        const count = dailyActivity[date] || 0;
        const height = maxCount > 0 ? Math.max(6, (count / maxCount) * 100) : 6;
        return `
            <div class="activity-bar" data-count="${count}" 
                 style="height: ${height}%" 
                 title="${date}: ${count} blocks">
            </div>
        `;
    }).join('');
}

function updateCapacityDisplay(totalBlocks) {
    const capacityElement = $("#capacityDisplay");
    if (!capacityElement) return;
    
    const maxCapacity = 500000;
    const usagePercent = Math.min(100, Math.round((totalBlocks / maxCapacity) * 100));
    
    let capacityState = 'normal';
    let fillClass = '';
    let message = 'Your storage is looking great! Keep blocking those annoying videos. 😊';
    
    if (usagePercent >= 95) {
        capacityState = 'critical';
        fillClass = 'danger';
        message = 'Hey! Your storage is completely full. You need to clear some videos to block new ones. 🚨';
    } else if (usagePercent >= 85) {
        capacityState = 'warning';
        fillClass = 'warning';
        message = 'Heads up! Your storage is getting full (' + usagePercent + '%). Consider clearing some older blocked videos to make space. 📦';
    } else if (usagePercent >= 70) {
        capacityState = 'notice';
        message = 'Just letting you know - your storage is ' + usagePercent + '% full. You\'re doing great blocking those videos! 👍';
    }
    
    capacityElement.innerHTML = `
        <div class="capacity-info ${capacityState}">
            <div class="capacity-label">Your Hidden Videos:</div>
            <div class="capacity-value">${totalBlocks} / ${maxCapacity}</div>
            <div class="capacity-bar-container">
                <div class="capacity-bar">
                    <div class="capacity-fill ${fillClass}" style="width: ${usagePercent}%"></div>
                </div>
                <span class="capacity-percent">${usagePercent}%</span>
            </div>
            <div class="capacity-message">${message}</div>
        </div>
    `;
}

// Enhanced Search System Functions
function initEnhancedSearch() {
    enhancedSearch.initialize();
    setupSearchEventListeners();
    setupAdvancedFilters();
    setupQuickFilters();
}

function setupSearchEventListeners() {
    const searchInput = $('#search');
    const clearSearch = $('#clearSearch');
    const suggestionsContainer = $('#searchSuggestions');

    if (!searchInput || !suggestionsContainer) return;

    // Real-time search with debouncing
    searchInput.addEventListener('input', debounce(async (e) => {
        const query = e.target.value.trim();
        await handleSearch(query);
        showSearchSuggestions(query);
    }, 300));

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                navigateSuggestions(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateSuggestions(-1);
                break;
            case 'Enter':
                e.preventDefault();
                selectSuggestion();
                break;
            case 'Escape':
                hideSuggestions();
                break;
        }
    });

    // Clear search
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            handleSearch('');
            hideSuggestions();
            searchInput.focus();
        });
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            hideSuggestions();
        }
    });
}

function setupAdvancedFilters() {
    const advancedToggle = $('#advancedSearchToggle');
    const advancedPanel = $('#advancedSearch');
    
    if (advancedToggle && advancedPanel) {
        advancedToggle.addEventListener('click', () => {
            advancedPanel.classList.toggle('collapsed');
            advancedToggle.innerHTML = advancedPanel.classList.contains('collapsed') 
                ? '<i class="fas fa-chevron-down"></i>'
                : '<i class="fas fa-chevron-up"></i>';
        });
    }

    // Advanced filter change handlers
    const advancedFilters = ['#advancedReasonFilter', '#advancedSortFilter', '#advancedDateRangeFilter'];
    advancedFilters.forEach(filterId => {
        const filter = $(filterId);
        if (filter) {
            filter.addEventListener('change', () => {
                syncAdvancedFilters();
                handleSearch($('#search')?.value || '');
            });
        }
    });
}

function syncAdvancedFilters() {
    // Sync advanced filters with main filters
    const advancedReason = $('#advancedReasonFilter')?.value;
    const advancedSort = $('#advancedSortFilter')?.value;
    const advancedDate = $('#advancedDateRangeFilter')?.value;

    if (advancedReason) $('#reasonFilter').value = advancedReason;
    if (advancedSort) $('#sortFilter').value = advancedSort;
    if (advancedDate) $('#dateRangeFilter').value = advancedDate;
}

function setupQuickFilters() {
    const quickFilters = $$('.quick-filter');
    quickFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter');
            const filterValue = this.getAttribute('data-value');
            
            // Toggle active state
            quickFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Apply quick filter
            applyQuickFilter(filterType, filterValue);
        });
    });
}

function applyQuickFilter(type, value) {
    const searchInput = $('#search');
    let query = '';
    
    switch (type) {
        case 'reason':
            $('#reasonFilter').value = value;
            query = value;
            break;
        case 'date':
            $('#dateRangeFilter').value = 'today';
            query = `today`;
            break;
    }
    
    if (searchInput) {
        searchInput.value = query;
        handleSearch(query);
    }
}

async function handleSearch(query = '') {
    const startTime = performance.now();
    
    try {
        // Get current filters
        const reasonFilter = $('#reasonFilter')?.value || 'all';
        const sortFilter = $('#sortFilter')?.value || 'newest';
        const dateRangeFilter = $('#dateRangeFilter')?.value || 'all';
        
        const filters = {
            reason: reasonFilter,
            sortBy: sortFilter,
            dateRange: dateRangeFilter
        };
        
        // Perform search
        const results = await enhancedSearch.search(query, filters);
        
        // Update UI
        updateSearchResults(results, query);
        updateResultsInfo(results.length, query, performance.now() - startTime);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    }
}

function updateSearchResults(results, query) {
    const tableBody = $("#videosTableBody");
    const emptyState = $("#emptyState");
    const loadingState = $("#loadingState");
    
    if (loadingState) loadingState.classList.remove('show');
    
    if (!tableBody) return;
    
    if (results.length === 0) {
        if (emptyState) emptyState.classList.add('show');
        tableBody.innerHTML = '';
        
        const noResults = document.createElement('tr');
        noResults.innerHTML = `
            <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 32px; margin-bottom: 16px; opacity: 0.5;"></i>
                <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">
                    No videos found
                </div>
                <div style="font-size: 14px;">
                    ${query ? `No results for "${query}"` : 'No blocked videos yet'}
                </div>
            </td>
        `;
        tableBody.appendChild(noResults);
        
    } else {
        if (emptyState) emptyState.classList.remove('show');
        
        // Render results with INLINE keyword badges
        tableBody.innerHTML = results.map(video => {
            const hasKeywords = video.matchingKeywords && video.matchingKeywords.length > 0;
            const keywordBadges = hasKeywords ? renderInlineKeywordBadges(video.matchingKeywords) : '';
            
            return `
                <tr data-block-reason="${video.reason}">
                    <td class="col-title">
                        <div class="title-with-badges">
                            <div class="title-main-row">
                                <span class="video-title-text">
                                    ${highlightText(video.title, query)}
                                </span>
                                ${keywordBadges}
                            </div>
                            ${hasKeywords ? `
                                <div class="keyword-summary">
                                    <i class="fas fa-filter"></i>
                                    Blocked by ${video.keywordCount} keyword${video.keywordCount !== 1 ? 's' : ''}
                                </div>
                            ` : ''}
                        </div>
                    </td>
                    <td class="col-id">
                        ${highlightText(video.videoId, query)}
                    </td>
                    <td class="col-reason">
                        <span class="reason-badge ${video.reason}">
                            ${highlightText(getReasonDisplayText(video.reason), query)}
                        </span>
                    </td>
                    <td class="col-date">
                        <div class="date-time-display">
                            <div class="full-date">${formatLocalDateTime(video.ts)}</div>
                            <div class="relative-time">${formatTimeAgo(video.ts)}</div>
                        </div>
                    </td>
                    <td class="col-actions">
                        <button class="control-btn small unblock-btn" data-video-id="${video.videoId}" title="Unblock video">
                            <i class="fas fa-undo"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
        
        // Re-attach event listeners
        attachUnblockListeners();
        attachKeywordBadgeListeners();
    }
}

function highlightText(text, query) {
    if (!query || !text) return escapeHtml(text);
    
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();
    
    if (!normalizedText.includes(normalizedQuery)) {
        return escapeHtml(text);
    }
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<mark class="search-highlight">$1</mark>');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function showSearchSuggestions(query) {
    const suggestionsContainer = $('#searchSuggestions');
    if (!suggestionsContainer) return;
    
    if (!query || query.length < 2) {
        hideSuggestions();
        return;
    }
    
    const suggestions = enhancedSearch.getSearchSuggestions(query);
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
            ${highlightText(suggestion, query)}
        </div>
    `).join('');
    
    suggestionsContainer.classList.add('show');
    
    // Add click handlers
    $$('.suggestion-item', suggestionsContainer).forEach(item => {
        item.addEventListener('click', function() {
            const suggestion = this.getAttribute('data-suggestion');
            $('#search').value = suggestion;
            handleSearch(suggestion);
            hideSuggestions();
        });
    });
}

function hideSuggestions() {
    const suggestionsContainer = $('#searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('show');
    }
}

function navigateSuggestions(direction) {
    const suggestions = $$('.suggestion-item');
    const activeSuggestion = $('.suggestion-item.active');
    
    let nextIndex = 0;
    
    if (activeSuggestion) {
        const currentIndex = suggestions.indexOf(activeSuggestion);
        nextIndex = (currentIndex + direction + suggestions.length) % suggestions.length;
        activeSuggestion.classList.remove('active');
    }
    
    suggestions[nextIndex]?.classList.add('active');
}

function selectSuggestion() {
    const activeSuggestion = $('.suggestion-item.active');
    if (activeSuggestion) {
        const suggestion = activeSuggestion.getAttribute('data-suggestion');
        $('#search').value = suggestion;
        handleSearch(suggestion);
        hideSuggestions();
    }
}

function updateResultsInfo(count, query, duration) {
    const resultsInfo = $('#resultsInfo');
    if (!resultsInfo) return;
    
    let infoText = `<span class="results-count">${count}</span> videos`;
    
    if (query) {
        infoText += ` for "${query}"`;
    }
    
    infoText += ` • ${duration.toFixed(0)}ms`;
    
    resultsInfo.innerHTML = infoText;
}

function attachUnblockListeners() {
    $$('.unblock-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const videoId = this.getAttribute('data-video-id');
            if (confirm('Are you sure you want to unblock this video?')) {
                try {
                    await sendMessageToYouTube({ 
                        type: "unblockVideo", 
                        videoId: videoId 
                    });
                    showSuccess("Video unblocked successfully!");
                    
                    // Refresh search index and results
                    await enhancedSearch.refreshIndex();
                    handleSearch($('#search')?.value || '');
                    loadDashboardData();
                    
                } catch (error) {
                    showError("Failed to unblock video");
                }
            }
        });
    });
}

function attachKeywordBadgeListeners() {
    $$('.keyword-badge').forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.stopPropagation();
            const keyword = this.textContent.replace(/^\+(.+)/, ''); // Remove + prefix from "more" badges
            if (keyword && !keyword.startsWith('+')) {
                // Set search to this keyword
                const searchInput = $('#search');
                if (searchInput) {
                    searchInput.value = keyword;
                    handleSearch(keyword);
                }
            }
        });
        
        // Make badges clickable
        badge.style.cursor = 'pointer';
    });
}

// Blocked videos table functions
async function renderBlockedTable() {
    const tableBody = $("#videosTableBody");
    const loadingState = $("#loadingState");
    const emptyState = $("#emptyState");
    
    if (!tableBody) return;
    
    if (loadingState) loadingState.classList.add('show');
    if (emptyState) emptyState.classList.remove('show');
    tableBody.innerHTML = '';
    
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        if (videos.length === 0) {
            if (emptyState) emptyState.classList.add('show');
        } else {
            videos.sort((a, b) => b.ts - a.ts);
            
            tableBody.innerHTML = videos.map(video => {
                const hasKeywords = video.matchingKeywords && video.matchingKeywords.length > 0;
                const keywordBadges = hasKeywords ? renderInlineKeywordBadges(video.matchingKeywords) : '';
                
                return `
                    <tr data-block-reason="${video.reason}">
                        <td class="col-title">
                            <div class="title-with-badges">
                                <div class="title-main-row">
                                    <span class="video-title-text">
                                        ${escapeHtml(video.title)}
                                    </span>
                                    ${keywordBadges}
                                </div>
                                ${hasKeywords ? `
                                    <div class="keyword-summary">
                                        <i class="fas fa-filter"></i>
                                        Blocked by ${video.keywordCount} keyword${video.keywordCount !== 1 ? 's' : ''}
                                </div>
                            ` : ''}
                            </div>
                        </td>
                        <td class="col-id">${video.id}</td>
                        <td class="col-reason">
                            <span class="reason-badge ${video.reason}">${getReasonDisplayText(video.reason)}</span>
                        </td>
                        <td class="col-date">
                            <div class="date-time-display">
                                <div class="full-date">${formatLocalDateTime(video.ts)}</div>
                                <div class="relative-time">${formatTimeAgo(video.ts)}</div>
                            </div>
                        </td>
                        <td class="col-actions">
                            <button class="control-btn small unblock-btn" data-video-id="${video.id}" title="Unblock video">
                                <i class="fas fa-undo"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            attachUnblockListeners();
            attachKeywordBadgeListeners();
        }
        
        safeElement("#resultsCount", el => {
            el.textContent = videos.length;
        });
        
    } catch (error) {
        console.error('Error rendering blocked table:', error);
        showError("Failed to load blocked videos");
    } finally {
        if (loadingState) loadingState.classList.remove('show');
    }
}

// Enhanced debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Enhanced Features with Shorts Removal
function initEnhancedFeaturesPanel() {
    const enhancedSection = $("#enhanced");
    if (!enhancedSection) return;
    
    chrome.storage.sync.get(['Clify_enhanced_config'], function(result) {
        const config = result.Clify_enhanced_config || {};
        
        safeElement('#toggleShorts', el => el.checked = config.removeShorts !== false);
        safeElement('#toggleAnnotations', el => el.checked = config.annotationRemoval !== false);
        safeElement('#toggleTheaterMode', el => el.checked = config.theaterMode || false);
        safeElement('#toggleAutoPlay', el => el.checked = config.autoPlayNext || false);
        safeElement('#playbackSpeed', el => el.value = config.playbackSpeed || 1.0);
    });
    
    safeElement('#toggleShorts', el => {
        el.addEventListener('change', function() {
            saveEnhancedSettings();
            sendMessageToYouTube({ 
                type: "toggleShortsRemoval", 
                enabled: this.checked 
            }).then(() => {
                if (this.checked) {
                    showSuccess("Shorts removal activated! All Shorts will be removed.");
                } else {
                    showInfo("Shorts removal disabled");
                }
            });
        });
    });
    
    safeElement('#saveEnhancedFeatures', el => {
        el.addEventListener('click', function() {
            saveEnhancedSettings();
        });
    });
    
    safeElement('#resetEnhancedFeatures', el => {
        el.addEventListener('click', function() {
            if (confirm('Reset all enhanced features to defaults?')) {
                resetEnhancedSettings();
            }
        });
    });
}

function saveEnhancedSettings() {
    const config = {
        removeShorts: safeElement('#toggleShorts')?.checked !== false,
        annotationRemoval: safeElement('#toggleAnnotations')?.checked || false,
        theaterMode: safeElement('#toggleTheaterMode')?.checked || false,
        autoPlayNext: safeElement('#toggleAutoPlay')?.checked || false,
        playbackSpeed: parseFloat(safeElement('#playbackSpeed')?.value) || 1.0
    };
    
    chrome.storage.sync.set({ Clify_enhanced_config: config }, function() {
        sendMessageToYouTube({ 
            type: "saveEnhancedConfig", 
            config: config 
        }).then(() => {
            showSuccess("Enhanced features saved successfully!");
        }).catch(error => {
            showError("Failed to save settings: " + error.message);
        });
    });
}

function resetEnhancedSettings() {
    const defaultConfig = {
        removeShorts: true,
        annotationRemoval: true,
        theaterMode: false,
        autoPlayNext: false,
        playbackSpeed: 1.0
    };
    
    chrome.storage.sync.set({ Clify_enhanced_config: defaultConfig }, function() {
        chrome.storage.sync.get(['Clify_enhanced_config'], function(result) {
            const config = result.Clify_enhanced_config || {};
            
            safeElement('#toggleShorts', el => el.checked = config.removeShorts !== false);
            safeElement('#toggleAnnotations', el => el.checked = config.annotationRemoval !== false);
            safeElement('#toggleTheaterMode', el => el.checked = config.theaterMode || false);
            safeElement('#toggleAutoPlay', el => el.checked = config.autoPlayNext || false);
            safeElement('#playbackSpeed', el => el.value = config.playbackSpeed || 1.0);
        });
        
        sendMessageToYouTube({ 
            type: "saveEnhancedConfig", 
            config: defaultConfig 
        }).then(() => {
            showSuccess("Settings reset to defaults!");
        });
    });
}

// uBlock Integration Functions
async function checkUblockStatus() {
    try {
        const ublockExtensionId = 'ddkjiahejlhfcafbddmgiahcpbblcofd';
        
        const result = await new Promise(resolve => {
            chrome.management.get(ublockExtensionId, (extensionInfo) => {
                if (chrome.runtime.lastError) {
                    resolve({ installed: false, enabled: false });
                } else {
                    resolve({ 
                        installed: true, 
                        enabled: extensionInfo.enabled,
                        name: extensionInfo.name
                    });
                }
            });
        });
        
        if (result.installed && result.enabled) {
            showSuccess(`✅ ${result.name} is installed and active!`);
            safeElement('#ublockStatus', el => {
                el.textContent = 'Active';
            });
        } else if (result.installed && !result.enabled) {
            showWarning(`⚠️ ${result.name} is installed but disabled. Please enable it.`);
            safeElement('#ublockStatus', el => {
                el.textContent = 'Disabled';
            });
        } else {
            showError('❌ uBlock Origin Lite is not installed. Click "Get uBlock" button to install it.');
            safeElement('#ublockStatus', el => {
                el.textContent = 'Not Installed';
            });
        }
        
    } catch (error) {
        console.error('Error checking uBlock status:', error);
        showError('Failed to check uBlock status');
    }
}

// FIXED Telegram Contact Form Handler - UPDATED TO USE SUPPORT CHANNEL
async function sendToTelegram(formData) {
    try {
        const telegramMessage = `
📧 *Clify Support Message*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Category:* ${formData.category}
*Message:*
${formData.message}

*Time:* ${new Date().toLocaleString()}
*User ID:* ${await getUserId()}
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        
        console.log('Sending to Telegram Support Channel:', TELEGRAM_CONFIG.supportChannelId);
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.supportChannelId, // Support channel for contact form
                text: telegramMessage,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Telegram API error:', response.status, errorData);
            
            // Try fallback to admin channel if support channel fails
            if (response.status === 400 || response.status === 403) {
                console.log('Trying fallback to admin channel...');
                return await sendToTelegramFallback(formData);
            }
            
            throw new Error(`Telegram API returned ${response.status}`);
        }

        const result = await response.json();
        console.log('Telegram message sent successfully to support channel:', result);
        return true;
        
    } catch (error) {
        console.error('Failed to send message to Telegram support channel:', error);
        
        // Fallback: Save to local storage for later retry
        await saveMessageToLocal(formData);
        throw new Error('Message saved locally. Will retry when online.');
    }
}

// Fallback function for Telegram
async function sendToTelegramFallback(formData) {
    try {
        const telegramMessage = `
📧 *Clify Support Message (Fallback)*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Category:* ${formData.category}
*Message:*
${formData.message}

*Time:* ${new Date().toLocaleString()}
*User ID:* ${await getUserId()}
        `.trim();

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
        
        console.log('Trying fallback to admin channel:', TELEGRAM_CONFIG.adminChannelId);
        
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.adminChannelId, // Admin channel as fallback
                text: telegramMessage,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });

        if (!response.ok) {
            throw new Error(`Fallback also failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('Telegram message sent successfully to admin channel (fallback):', result);
        return true;
        
    } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw fallbackError;
    }
}

// Helper function to get user ID
async function getUserId() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['Clify_user_id', 'last_user_id'], (result) => {
            if (result.Clify_user_id) {
                resolve(result.Clify_user_id);
            } else {
                // Generate new serial user ID: ClifyU + 6-digit number
                const generateSerialUserId = () => {
                    return new Promise((resolveSerial) => {
                        chrome.storage.local.get(['last_user_id'], (storageResult) => {
                            let lastId = storageResult.last_user_id || 0;
                            lastId++;
                            
                            // Ensure it's 6 digits with leading zeros
                            const newId = lastId.toString().padStart(6, '0');
                            const userId = `ClifyU${newId}`;
                            
                            // Save the last used ID
                            chrome.storage.local.set({ 
                                last_user_id: lastId,
                                Clify_user_id: userId 
                            }, () => {
                                resolveSerial(userId);
                            });
                        });
                    });
                };
                
                generateSerialUserId().then(resolve);
            }
        });
    });
}

// Fallback function to save messages locally
async function saveMessageToLocal(formData) {
    return new Promise((resolve) => {
        chrome.storage.local.get(['pending_messages'], (result) => {
            const pendingMessages = result.pending_messages || [];
            pendingMessages.push({
                ...formData,
                timestamp: Date.now(),
                attempts: 0
            });
            
            chrome.storage.local.set({ pending_messages: pendingMessages }, () => {
                console.log('Message saved locally for retry:', formData);
                resolve(true);
            });
        });
    });
}

// Function to retry pending messages
async function retryPendingMessages() {
    try {
        const result = await new Promise(resolve => {
            chrome.storage.local.get(['pending_messages'], resolve);
        });
        
        const pendingMessages = result.pending_messages || [];
        if (pendingMessages.length === 0) return;

        console.log(`Retrying ${pendingMessages.length} pending messages...`);
        
        const successfulMessages = [];
        const failedMessages = [];

        for (const message of pendingMessages) {
            try {
                // Limit retry attempts
                if (message.attempts >= 3) {
                    failedMessages.push(message);
                    continue;
                }

                const success = await sendToTelegram(message);
                if (success) {
                    successfulMessages.push(message);
                } else {
                    message.attempts = (message.attempts || 0) + 1;
                    failedMessages.push(message);
                }
                
                // Small delay between retries
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                message.attempts = (message.attempts || 0) + 1;
                failedMessages.push(message);
            }
        }

        // Update storage with remaining failed messages
        await new Promise(resolve => {
            chrome.storage.local.set({ pending_messages: failedMessages }, resolve);
        });

        if (successfulMessages.length > 0) {
            console.log(`Successfully sent ${successfulMessages.length} pending messages`);
            showSuccess(`Sent ${successfulMessages.length} pending messages`);
        }
        
    } catch (error) {
        console.error('Error retrying pending messages:', error);
    }
}

// Initialize message retry system
function initMessageRetrySystem() {
    // Retry pending messages on dashboard load
    retryPendingMessages();
    
    // Retry every 5 minutes
    setInterval(retryPendingMessages, 5 * 60 * 1000);
    
    // Also retry when coming online
    window.addEventListener('online', retryPendingMessages);
}

// Enhanced contact form handler
function initContactForm() {
    const contactForm = $('#contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = $('#submitBtn');
        const btnText = submitBtn?.querySelector('.btn-text');
        const btnLoading = submitBtn?.querySelector('.btn-loading');
        const formStatus = $('#formStatus');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'flex';
        if (submitBtn) submitBtn.disabled = true;
        if (formStatus) formStatus.innerHTML = '';
        
        try {
            const formData = {
                name: safeElement('#name')?.value.trim() || '',
                email: safeElement('#email')?.value.trim() || '',
                category: safeElement('#category')?.value || 'other',
                message: safeElement('#message')?.value.trim() || ''
            };
            
            // Validation
            if (!formData.name || !formData.email || !formData.message) {
                throw new Error('Please fill in all required fields');
            }
            
            if (formData.message.length < 10) {
                throw new Error('Please provide a more detailed message (at least 10 characters)');
            }
            
            if (!formData.email.includes('@') || !formData.email.includes('.')) {
                throw new Error('Please enter a valid email address');
            }
            
            // Send to Telegram
            const success = await sendToTelegram(formData);
            
            if (success) {
                if (formStatus) {
                    formStatus.innerHTML = '<div class="notification success" style="margin: 0;">Thank you! Your message has been sent successfully to our support team.</div>';
                }
                contactForm.reset();
                showSuccess('Message sent successfully! We will get back to you soon.');
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            
            if (formStatus) {
                formStatus.innerHTML = `<div class="notification error" style="margin: 0;">${error.message}</div>`;
            }
            
            if (error.message.includes('saved locally')) {
                showWarning('Message saved locally. We will send it when you are back online.');
                contactForm.reset();
            } else {
                showError(error.message);
            }
            
        } finally {
            if (btnText) btnText.style.display = 'flex';
            if (btnLoading) btnLoading.style.display = 'none';
            if (submitBtn) submitBtn.disabled = false;
        }
    });
}

// Enhanced Keywords Management with Multi-Language Support
function initKeywordsManager() {
    const saveBtn = $('#saveKw');
    const clearBtn = $('#clearKw');
    const textarea = $('#kw');
    
    if (!saveBtn || !clearBtn || !textarea) return;
    
    // Set placeholder with multi-language examples
    textarea.placeholder = `Enter keywords (one per line or commas)
Examples:
movie|فيلم|फिल्म|সিনেমা
song|اغنية|गाना|গান
clickbait|كليكبيت|क्लिकबेट|ক্লিকবেইট
sponsor|راعي|प्रायोजक|প্রायোজক
reaction|ردة فعل|प्रतिक्रिया|প্রতিক্রিয়া
prank|مقلب|प्रैंक|প্র্যাংক`;
    
    loadKeywords();
    
    saveBtn.addEventListener('click', saveKeywords);
    clearBtn.addEventListener('click', clearKeywords);
    
    textarea.addEventListener('input', updateKeywordCount);
}

async function loadKeywords() {
    try {
        const response = await sendMessageToYouTube({ type: "getKeywords" });
        const keywords = response?.keywords || [];
        const textarea = $('#kw');
        
        if (textarea) {
            textarea.value = keywords.join('\n');
            updateKeywordCount();
        }
    } catch (error) {
        console.error('Error loading keywords:', error);
    }
}

async function saveKeywords() {
    const textarea = $('#kw');
    if (!textarea) return;
    
    let keywords = textarea.value
        .split(/[\n,]/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
    
    // Enhanced multi-language keyword cleaning
    const seen = new Set();
    keywords = keywords.filter(k => {
        const normalized = k.toLocaleLowerCase();
        if (seen.has(normalized)) {
            return false;
        }
        seen.add(normalized);
        return true;
    });
    
    // Enforce limit with warning
    if (keywords.length > 5000) {
        keywords = keywords.slice(0, 5000);
        showWarning(`Limited to 5000 keywords (maximum supported). Using first 2000 keywords.`);
    }
    
    try {
        await sendMessageToYouTube({ 
            type: "saveKeywords", 
            keywords: keywords 
        });
        showSuccess(`Saved ${keywords.length} keywords! Multi-language support enabled.`);
        updateKeywordCount();
        
        // Log sample keywords for debugging
        console.log('Sample multi-language keywords saved:', keywords.slice(0, 5));
        
    } catch (error) {
        showError("Failed to save keywords: " + error.message);
    }
}

function clearKeywords() {
    if (confirm('Are you sure you want to clear all keywords?')) {
        const textarea = $('#kw');
        if (textarea) {
            textarea.value = '';
            updateKeywordCount();
            showInfo("Keywords cleared");
        }
    }
}

function updateKeywordCount() {
    const textarea = $('#kw');
    const countElement = $('#keywordCount');
    
    if (!textarea || !countElement) return;
    
    const keywords = textarea.value
        .split(/[\n,]/)
        .map(k => k.trim())
        .filter(k => k.length > 0);
    
    countElement.textContent = keywords.length;
}

// Quick Actions FAB
function initQuickActions() {
    const fab = $('#quickActions');
    if (!fab) {
        console.error('Quick Actions FAB not found');
        return;
    }

    let currentMenu = null;
    
    fab.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('FAB clicked, currentMenu:', currentMenu);
        
        if (currentMenu && document.body.contains(currentMenu)) {
            currentMenu.remove();
            currentMenu = null;
            return;
        }
        
        currentMenu = document.createElement('div');
        currentMenu.className = 'quick-actions-menu';
        currentMenu.style.display = 'flex';
        currentMenu.innerHTML = `
            <div class="quick-action-item" data-action="refresh">
                <i class="fas fa-sync-alt"></i>
                <span>Refresh Data</span>
            </div>
            <div class="quick-action-item" data-action="clear-all">
                <i class="fas fa-trash"></i>
                <span>Clear All Blocked</span>
            </div>
            <div class="quick-action-item" data-action="export">
                <i class="fas fa-download"></i>
                <span>Export Data</span>
            </div>
            <div class="quick-action-item" data-action="settings">
                <i class="fas fa-cog"></i>
                <span>Settings</span>
            </div>
        `;
        
        document.body.appendChild(currentMenu);
        
        // Add click handlers for menu items
        currentMenu.querySelectorAll('.quick-action-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const action = this.getAttribute('data-action');
                console.log('Quick action clicked:', action);
                handleQuickAction(action);
                if (currentMenu) {
                    currentMenu.remove();
                    currentMenu = null;
                }
            });
        });
        
        // Close menu when clicking outside
        setTimeout(() => {
            const closeMenu = (e) => {
                if (currentMenu && !currentMenu.contains(e.target) && e.target !== fab) {
                    currentMenu.remove();
                    currentMenu = null;
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 100);
    });
}

function handleQuickAction(action) {
    console.log('Handling quick action:', action);
    switch (action) {
        case 'refresh':
            const refreshBtn = $('#refreshBtn');
            if (refreshBtn) {
                refreshBtn.click();
                showSuccess("Refreshing data...");
            }
            break;
        case 'clear-all':
            if (confirm('Are you sure you want to clear ALL blocked videos?')) {
                clearAllVideos();
            }
            break;
        case 'export':
            exportBlockedVideos();
            break;
        case 'settings':
            switchToTab('enhanced');
            showInfo("Navigating to settings...");
            break;
        default:
            console.warn('Unknown quick action:', action);
    }
}

// Back to Top functionality
function initBackToTop() {
    const backToTopBtn = $('#backToTop');
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
            backToTopBtn.classList.remove('hiding');
        } else {
            backToTopBtn.classList.remove('show');
            backToTopBtn.classList.add('hiding');
        }
    });

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        smoothScrollToTop();
    });

    // Add keyboard support
    backToTopBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            smoothScrollToTop();
        }
    });
}

function smoothScrollToTop() {
    const startPosition = window.pageYOffset;
    const duration = 500;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        window.scrollTo(0, startPosition * (1 - easeInOutCubic(progress)));
        
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }
    
    requestAnimationFrame(scrollStep);
}

// Helper functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    const translations = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    
    if (days > 0) return `${days} ${translations['days-ago'] || 'days ago'}`;
    if (hours > 0) return `${hours} ${translations['hours-ago'] || 'hours ago'}`;
    if (minutes > 0) return `${minutes} ${translations['minutes-ago'] || 'minutes ago'}`;
    return translations['just-now'] || 'Just now';
}

function formatLocalDateTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getReasonDisplayText(reason) {
    const reasonTexts = {
        'manual': '🚫Manual',
        'keyword': '🔠Keyword', 
        'shorts': '📼Shorts',
        'language': '🌐Language'
    };
    return reasonTexts[reason] || reason;
}

function switchToTab(tabName) {
    $$('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    $$('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetSection = $(`#${tabName}`);
    const targetTab = $(`.tab[data-tab="${tabName}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetTab) targetTab.classList.add('active');
}

// Language functions
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
        lang = 'en';
    }
    
    currentLanguage = lang;
    
    Object.keys(TRANSLATIONS[lang]).forEach(key => {
        const elements = $$(`[id="${key}"]`);
        elements.forEach(element => {
            if (TRANSLATIONS[lang][key]) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = TRANSLATIONS[lang][key];
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = TRANSLATIONS[lang][key];
                } else {
                    element.textContent = TRANSLATIONS[lang][key];
                }
            }
        });
    });
    
    chrome.storage.sync.set({ lang: lang });
}

function initLanguageSelector() {
    const langSelect = $('#lang');
    if (!langSelect) return;
    
    chrome.storage.sync.get({ lang: 'en' }, function(result) {
        langSelect.value = result.lang;
        setLanguage(result.lang);
    });
    
    langSelect.addEventListener('change', function() {
        setLanguage(this.value);
    });
}

// Theme functions
function initTheme() {
    const themeBtn = $('#mode');
    if (!themeBtn) return;
    
    chrome.storage.sync.get({ theme: 'dark' }, function(result) {
        const isDark = result.theme === 'dark';
        document.body.classList.toggle('light-theme', !isDark);
        updateThemeButton(isDark);
    });
    
    themeBtn.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        document.body.classList.toggle('light-theme', !isLight);
        chrome.storage.sync.set({ theme: newTheme });
        updateThemeButton(!isLight);
    });
}

function updateThemeButton(isDark) {
    const themeBtn = $('#mode');
    const themeIcon = themeBtn?.querySelector('i');
    const themeText = $('#theme-text');
    
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeText) {
        themeText.textContent = isDark ? 'Dark' : 'Light';
    }
}

// Export functionality
function initExportButton() {
    const exportBtn = $('#btnExport');
    if (!exportBtn) return;
    
    exportBtn.addEventListener('click', exportBlockedVideos);
}

async function exportBlockedVideos() {
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const videos = Object.values(blockedVideos);
        
        if (videos.length === 0) {
            showWarning("No videos to export");
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: VERSION,
            totalVideos: videos.length,
            videos: videos.map(video => ({
                ...video,
                matchingKeywords: video.matchingKeywords || [],
                keywordCount: video.keywordCount || 0
            }))
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Clify-blocked-videos-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showSuccess(`Exported ${videos.length} blocked videos with keyword data`);
        
    } catch (error) {
        console.error('Export error:', error);
        showError("Failed to export videos");
    }
}

// Clear all functionality
function initClearAllButton() {
    const clearBtn = $('#btnUnblockAll');
    if (!clearBtn) return;
    
    clearBtn.addEventListener('click', clearAllVideos);
}

async function clearAllVideos() {
    if (!confirm('Are you sure you want to clear ALL blocked videos? This action cannot be undone.')) {
        return;
    }
    
    try {
        await sendMessageToYouTube({ type: "clearAllVideos" });
        showSuccess("All blocked videos cleared successfully!");
        renderBlockedTable();
        loadDashboardData();
        
        // Refresh search index
        await enhancedSearch.refreshIndex();
        
    } catch (error) {
        showError("Failed to clear videos: " + error.message);
    }
}

// Search and filter functionality
function initSearchAndFilter() {
    const searchInput = $('#search');
    const clearSearch = $('#clearSearch');
    const reasonFilter = $('#reasonFilter');
    const sortFilter = $('#sortFilter');
    const dateRangeFilter = $('#dateRangeFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            handleSearch();
        });
    }
    
    if (reasonFilter) {
        reasonFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
    
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', () => {
            handleSearch($('#search')?.value || '');
        });
    }
}

// Initialize everything
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            renderBlockedTable();
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable();
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            }
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}
// Add this function near the other initialization functions
function initSupportHeaderButton() {
    const supportHeaderBtn = $('#supportHeaderBtn');
    if (!supportHeaderBtn) {
        console.error('Support header button not found');
        return;
    }
    
    supportHeaderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Support header button clicked');
        switchToTab('support');
        showInfo('Navigating to Support section...');
    });
}

// Also update the main initDashboard function to include this:
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // ADD THIS LINE: Initialize support header button
    initSupportHeaderButton();
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            renderBlockedTable();
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable();
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            } else if (tabName === 'support') {
                // Handle support tab specific actions
                console.log('Support tab activated');
            }
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}
// Initialize Donate Header Button
function initDonateHeaderButton() {
    const donateHeaderBtn = $('#donateHeaderBtn');
    if (!donateHeaderBtn) {
        console.error('Donate header button not found');
        return;
    }
    
    donateHeaderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Donate header button clicked');
        
        // Hide all sections first
        $$('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show donate section
        const donateSection = $('#donate');
        if (donateSection) {
            donateSection.classList.add('active');
            
            // Remove active class from all tabs
            $$('.tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Initialize donation tab
            initDonationTab();
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            showInfo('Thank you for considering a donation! ❤️');
        } else {
            console.error('Donate section not found');
            showError('Donation section not available');
        }
    });
}

// Update tab switching to exclude donate
function switchToTab(tabName) {
    // Don't allow switching to 'donate' via tabs since it's a button
    if (tabName === 'donate') {
        return;
    }
    
    $$('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    $$('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    const targetSection = $(`#${tabName}`);
    const targetTab = $(`.tab[data-tab="${tabName}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetTab) targetTab.classList.add('active');
}

// Add donation functionality
function initDonationTab() {
    console.log('Initializing donation tab...');
    
    // Set default amount option as active
    $$('.amount-option').forEach(option => {
        option.addEventListener('click', function() {
            $$('.amount-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            updatePaymentAmounts(amount);
        });
    });
    
    // Set default payment method
    $$('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            $$('.payment-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.getAttribute('data-method');
            showPaymentDetails(method);
        });
    });
    
    // Custom amount input
    const customAmountInput = $('#customAmount');
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const amount = this.value || '5';
            updatePaymentAmounts(amount);
        });
    }
    
    // One-time donation button
    const oneTimeDonateBtn = $('#oneTimeDonate');
    if (oneTimeDonateBtn) {
        oneTimeDonateBtn.addEventListener('click', function() {
            const activeAmount = $('.amount-option.active');
            let amount = activeAmount?.getAttribute('data-amount');
            
            // If custom amount is entered
            if (!amount) {
                const customAmount = $('#customAmount')?.value;
                if (customAmount && customAmount > 0) {
                    amount = customAmount;
                } else {
                    showError('Please select or enter an amount');
                    return;
                }
            }
            
            const activeMethod = $('.payment-option.active');
            const method = activeMethod?.getAttribute('data-method');
            
            if (!method) {
                showError('Please select a payment method');
                return;
            }
            
            processDonation(amount, method);
        });
    }
    
    // Set defaults
    $$('.amount-option[data-amount="5"]')?.forEach(opt => opt.classList.add('active'));
    $$('.payment-option[data-method="paypal"]')?.forEach(opt => opt.classList.add('active'));
    showPaymentDetails('paypal');
}

// Helper functions
function updatePaymentAmounts(usdAmount) {
    const exchangeRate = 110; // 1 USD = 118 BDT (approx)
    const bdtAmount = Math.round(usdAmount * exchangeRate);
    
    // Update local currency amounts
    $$('#bkashAmount, #UpayAmount, #nagadAmount, #rocketAmount').forEach(el => {
        if (el) el.textContent = `৳${bdtAmount.toLocaleString()}`;
    });
}

function showPaymentDetails(method) {
    // Hide all method details
    $$('.method-details').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show selected method details
    $$(`.method-details[data-method="${method}"]`).forEach(detail => {
        detail.classList.add('active');
    });
}

function processDonation(amount, method) {
    console.log(`Processing ${method} donation: $${amount}`);
    
    // Show processing message
    showSuccess(`Processing ${method} donation of $${amount}...`);
    
    // Handle different payment methods
    switch(method) {
        case 'paypal':
            window.open(`https://paypal.me/diptodesign98?amount=${amount}`, '_blank', 'noopener,noreferrer');
            break;
        case 'bkash':
        case 'Upay':
        case 'nagad':
        case 'rocket':
            const bdtAmount = Math.round(amount * 118);
            showSuccess(`
                ${method.toUpperCase()} Payment:
                Amount: $${amount} (≈৳${bdtAmount})
                Please use the instructions shown above to complete the payment.
                Thank you for your support! ❤️
            `);
            break;
        default:
            showInfo(`Thank you for wanting to donate $${amount}! Please use the instructions for ${method}.`);
    }
}

// Add copy to clipboard function for payment details
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess(`Copied to clipboard: ${text}`);
    }).catch(err => {
        console.error('Copy failed:', err);
        showError('Failed to copy to clipboard');
    });
}

// Update main initialization
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // ADD THESE LINES: Initialize support and donate buttons
    initSupportHeaderButton();
    initDonateHeaderButton();
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            renderBlockedTable();
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable();
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            }
            // Donate is handled separately by the button
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}

// ADD THESE FUNCTIONS TO dashboard.js

// Enhanced Pagination System
class PaginationSystem {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 25;
        this.totalItems = 0;
        this.totalPages = 0;
        this.container = null;
        this.onPageChange = null;
    }

    init(container, onPageChange) {
        this.container = $(container);
        this.onPageChange = onPageChange;
        
        if (!this.container) {
            console.error('Pagination container not found');
            return;
        }

        this.setupEventListeners();
        this.updatePageSize();
    }

    setupEventListeners() {
        // First page
        safeElement('#firstPage', el => {
            el.addEventListener('click', () => this.goToPage(1));
        });

        // Previous page
        safeElement('#prevPage', el => {
            el.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        });

        // Next page
        safeElement('#nextPage', el => {
            el.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        });

        // Last page
        safeElement('#lastPage', el => {
            el.addEventListener('click', () => this.goToPage(this.totalPages));
        });

        // Page size selector
        safeElement('#pageSizeSelect', el => {
            el.addEventListener('change', (e) => {
                this.pageSize = parseInt(e.target.value);
                this.currentPage = 1;
                this.updatePagination();
                if (this.onPageChange) {
                    this.onPageChange(this.currentPage, this.pageSize);
                }
            });
        });
    }

    update(totalItems, currentPage = 1) {
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.totalPages = Math.ceil(totalItems / this.pageSize);
        
        this.updatePagination();
        this.updateVisibility();
    }

    updatePagination() {
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        
        // Update button states
        safeElement('#firstPage', el => el.disabled = this.currentPage <= 1);
        safeElement('#prevPage', el => el.disabled = this.currentPage <= 1);
        safeElement('#nextPage', el => el.disabled = this.currentPage >= this.totalPages);
        safeElement('#lastPage', el => el.disabled = this.currentPage >= this.totalPages);

        // Update page numbers
        this.renderPageNumbers();
        
        // Update info text
        const start = Math.min((this.currentPage - 1) * this.pageSize + 1, this.totalItems);
        const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
        
        safeElement('#currentRange', el => {
            el.textContent = `${start.toLocaleString()}-${end.toLocaleString()}`;
        });
        
        safeElement('#totalVideos', el => {
            el.textContent = this.totalItems.toLocaleString();
        });
        
        safeElement('#paginationInfo', el => {
            if (el) el.style.display = this.totalItems > 0 ? 'block' : 'none';
        });
    }

    renderPageNumbers() {
        const container = $('#pageNumbers');
        if (!container) return;

        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

        // Adjust if we're at the beginning
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        container.innerHTML = '';
        
        // Add page number buttons
        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.className = 'pagination-btn';
            if (i === this.currentPage) {
                button.classList.add('active');
            }
            button.textContent = i;
            button.title = `Go to page ${i}`;
            button.addEventListener('click', () => this.goToPage(i));
            container.appendChild(button);
        }
    }

    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) {
            return;
        }

        this.currentPage = page;
        this.updatePagination();
        
        if (this.onPageChange) {
            this.onPageChange(this.currentPage, this.pageSize);
        }
        
        // Scroll to top of table
        const tableContainer = $('.table-container');
        if (tableContainer) {
            tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateVisibility() {
        if (this.container) {
            this.container.style.display = this.totalItems > 0 ? 'flex' : 'none';
        }
    }

    updatePageSize() {
        const pageSizeSelect = $('#pageSizeSelect');
        if (pageSizeSelect) {
            this.pageSize = parseInt(pageSizeSelect.value);
        }
    }

    getCurrentPage() {
        return this.currentPage;
    }

    getPageSize() {
        return this.pageSize;
    }

    getOffset() {
        return (this.currentPage - 1) * this.pageSize;
    }
}

// Initialize pagination globally
const pagination = new PaginationSystem();

// ENHANCED PRO TIPS WITH TOOLTIPS
function initProTipsTooltips() {
    const tipsList = $('.search-tips-list');
    if (!tipsList) return;

    // Clear existing content
    tipsList.innerHTML = '';

    const tips = [
        {
            text: "Search by video title, ID, reason, or date",
            icon: "🔍",
            tooltip: "You can search using any of these criteria. The search is smart and will find partial matches too!"
        },
        {
            text: "Use quotes for exact matches: \"exact phrase\"",
            icon: "💬",
            tooltip: "Wrap your search in quotes to find exact phrases. Great for finding specific video titles."
        },
        {
            text: "Filter by time range using quick filters",
            icon: "⏱️",
            tooltip: "Click on the quick filters above to quickly filter by Today, Manual Blocks, Shorts, or Keyword Blocks."
        },
        {
            text: "Click suggestions for faster searching",
            icon: "⚡",
            tooltip: "Start typing and you'll see search suggestions. Click any suggestion to instantly search for it."
        },
        {
            text: "Keyword badges are clickable!",
            icon: "🎯",
            tooltip: "Click on any keyword badge in the table to instantly search for videos with that keyword."
        },
        {
            text: "Export your data anytime",
            icon: "💾",
            tooltip: "Use the Export button to backup your blocked videos list as a JSON file."
        },
        {
            text: "Clear search with the X button",
            icon: "❌",
            tooltip: "Click the X in the search box to quickly clear your search and show all blocked videos."
        },
        {
            text: "Sort by clicking column headers",
            icon: "⬆️",
            tooltip: "Click on any column header to sort by that column. Click again to reverse the sort order."
        }
    ];

    // Add tips with tooltips
    tipsList.innerHTML = tips.map(tip => `
        <li class="pro-tip-item" title="${tip.tooltip}">
            <span class="tip-icon">${tip.icon}</span>
            <span class="tip-text">${tip.text}</span>
            <span class="tip-hover-indicator">
                <i class="fas fa-info-circle"></i>
            </span>
        </li>
    `).join('');

    // Add CSS for tooltips
    if (!$('#pro-tips-styles')) {
        const style = document.createElement('style');
        style.id = 'pro-tips-styles';
        style.textContent = `
            .pro-tip-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                border-radius: 8px;
                background: var(--bg-secondary);
                margin-bottom: 6px;
                cursor: help;
                position: relative;
                transition: all 0.2s ease;
                border: 1px solid transparent;
            }
            
            .pro-tip-item:hover {
                background: var(--bg-hover);
                border-color: var(--primary);
                transform: translateX(4px);
            }
            
            .tip-icon {
                font-size: 16px;
                width: 24px;
                text-align: center;
            }
            
            .tip-text {
                flex: 1;
                font-size: 13px;
                color: var(--text-secondary);
            }
            
            .tip-hover-indicator {
                color: var(--text-muted);
                font-size: 12px;
                opacity: 0.6;
                transition: opacity 0.2s ease;
            }
            
            .pro-tip-item:hover .tip-hover-indicator {
                opacity: 1;
                color: var(--primary);
            }
            
            /* Tooltip styles for pro tips */
            .pro-tip-item[title] {
                position: relative;
            }
            
            .pro-tip-item[title]:hover::after {
                content: attr(title);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: var(--bg-glass);
                backdrop-filter: blur(10px);
                color: var(--text-primary);
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 12px;
                width: 280px;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                white-space: normal;
                line-height: 1.5;
                border: 1px solid var(--border-primary);
                pointer-events: none;
                opacity: 0;
                animation: fadeInTooltip 0.3s ease forwards;
                margin-bottom: 8px;
            }
            
            .pro-tip-item[title]:hover::before {
                content: '';
                position: absolute;
                bottom: calc(100% - 6px);
                left: 50%;
                transform: translateX(-50%);
                border: 6px solid transparent;
                border-top-color: var(--bg-glass);
                z-index: 1001;
                pointer-events: none;
                opacity: 0;
                animation: fadeInTooltip 0.3s ease forwards;
            }
            
            @keyframes fadeInTooltip {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            /* Pagination Styles */
            .pagination-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                background: var(--bg-glass);
                border: 1px solid var(--border-primary);
                border-top: none;
                border-radius: 0 0 var(--radius-lg) var(--radius-lg);
                backdrop-filter: blur(20px);
                margin-top: 0;
                flex-wrap: wrap;
                gap: 12px;
            }
            
            .pagination-info {
                font-size: 14px;
                color: var(--text-muted);
                flex: 1;
                min-width: 200px;
            }
            
            .pagination-controls {
                display: flex;
                align-items: center;
                gap: 4px;
                flex: 2;
                justify-content: center;
            }
            
            .page-numbers {
                display: flex;
                gap: 4px;
                margin: 0 8px;
            }
            
            .pagination-options {
                display: flex;
                align-items: center;
                gap: 8px;
                flex: 1;
                justify-content: flex-end;
                min-width: 150px;
            }
            
            .page-size-select {
                background: var(--bg-secondary);
                border: 1px solid var(--border-primary);
                color: var(--text-primary);
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 13px;
            }
            
            /* Make pagination responsive */
            @media (max-width: 768px) {
                .pagination-container {
                    flex-direction: column;
                    gap: 16px;
                }
                
                .pagination-info,
                .pagination-controls,
                .pagination-options {
                    width: 100%;
                    justify-content: center;
                }
                
                .pagination-info {
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// UPDATE THE SEARCH FUNCTION TO SUPPORT PAGINATION
async function handleSearch(query = '', page = 1, pageSize = 25) {
    const startTime = performance.now();
    
    try {
        // Get current filters
        const reasonFilter = $('#reasonFilter')?.value || 'all';
        const sortFilter = $('#sortFilter')?.value || 'newest';
        const dateRangeFilter = $('#dateRangeFilter')?.value || 'all';
        
        const filters = {
            reason: reasonFilter,
            sortBy: sortFilter,
            dateRange: dateRangeFilter
        };
        
        // Perform search
        const allResults = await enhancedSearch.search(query, filters);
        
        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedResults = allResults.slice(startIndex, endIndex);
        
        // Update UI
        updateSearchResults(paginatedResults, query);
        updateResultsInfo(allResults.length, query, performance.now() - startTime);
        
        // Update pagination
        pagination.update(allResults.length, page);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed. Please try again.');
    }
}

// UPDATE THE renderBlockedTable FUNCTION TO USE PAGINATION
async function renderBlockedTable(page = 1) {
    const tableBody = $("#videosTableBody");
    const loadingState = $("#loadingState");
    const emptyState = $("#emptyState");
    const paginationContainer = $("#paginationContainer");
    
    if (!tableBody) return;
    
    if (loadingState) loadingState.classList.add('show');
    if (emptyState) emptyState.classList.remove('show');
    if (paginationContainer) paginationContainer.style.display = 'none';
    
    tableBody.innerHTML = '';
    
    try {
        const response = await sendMessageToYouTube({ type: "getBlockedVideos" });
        const blockedVideos = response?.blockedVideosMap || {};
        const allVideos = Object.values(blockedVideos);
        
        if (allVideos.length === 0) {
            if (emptyState) emptyState.classList.add('show');
        } else {
            // Sort and paginate
            allVideos.sort((a, b) => b.ts - a.ts);
            
            const pageSize = pagination.getPageSize();
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedVideos = allVideos.slice(startIndex, endIndex);
            
            // Render paginated videos with INLINE keyword badges
            tableBody.innerHTML = paginatedVideos.map(video => {
                const hasKeywords = video.matchingKeywords && video.matchingKeywords.length > 0;
                const keywordBadges = hasKeywords ? renderInlineKeywordBadges(video.matchingKeywords) : '';
                
                return `
                    <tr data-block-reason="${video.reason}">
                        <td class="col-title">
                            <div class="title-with-badges">
                                <div class="title-main-row">
                                    <span class="video-title-text">
                                        ${escapeHtml(video.title)}
                                    </span>
                                    ${keywordBadges}
                                </div>
                                ${hasKeywords ? `
                                    <div class="keyword-summary">
                                        <i class="fas fa-filter"></i>
                                        Blocked by ${video.keywordCount} keyword${video.keywordCount !== 1 ? 's' : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </td>
                        <td class="col-id">${video.id}</td>
                        <td class="col-reason">
                            <span class="reason-badge ${video.reason}">${getReasonDisplayText(video.reason)}</span>
                        </td>
                        <td class="col-date">
                            <div class="date-time-display">
                                <div class="full-date">${formatLocalDateTime(video.ts)}</div>
                                <div class="relative-time">${formatTimeAgo(video.ts)}</div>
                            </div>
                        </td>
                        <td class="col-actions">
                            <button class="control-btn small unblock-btn" data-video-id="${video.id}" title="Unblock video">
                                <i class="fas fa-undo"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            attachUnblockListeners();
            attachKeywordBadgeListeners();
            
            // Show pagination if we have videos
            if (paginationContainer && allVideos.length > 0) {
                paginationContainer.style.display = 'flex';
                pagination.update(allVideos.length, page);
            }
        }
        
        safeElement("#resultsCount", el => {
            el.textContent = allVideos.length;
        });
        
    } catch (error) {
        console.error('Error rendering blocked table:', error);
        showError("Failed to load blocked videos");
    } finally {
        if (loadingState) loadingState.classList.remove('show');
    }
}

// UPDATE THE initDashboard FUNCTION TO INITIALIZE PAGINATION AND PRO TIPS
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // Initialize support and donate buttons
    initSupportHeaderButton();
    initDonateHeaderButton();
    
    // INITIALIZE PAGINATION SYSTEM
    setTimeout(() => {
        pagination.init('#paginationContainer', (page, pageSize) => {
            const searchQuery = $('#search')?.value || '';
            if (searchQuery.trim()) {
                handleSearch(searchQuery, page, pageSize);
            } else {
                renderBlockedTable(page);
            }
        });
        console.log('Pagination system initialized');
    }, 400);
    
    // INITIALIZE PRO TIPS WITH TOOLTIPS
    setTimeout(() => {
        initProTipsTooltips();
        console.log('Pro tips with tooltips initialized');
    }, 600);
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            const searchQuery = $('#search')?.value || '';
            if (searchQuery.trim()) {
                handleSearch(searchQuery, 1, pagination.getPageSize());
            } else {
                renderBlockedTable(1);
            }
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable(1);
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            }
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}// ENHANCED PRO TIPS AS SINGLE INFO ICON
function initProTipsTooltips() {
    const searchContainer = $('.search-container');
    if (!searchContainer) return;
    
    // Remove the old search tips section if it exists
    const oldTipsSection = $('.search-tips');
    if (oldTipsSection) {
        oldTipsSection.remove();
    }
    
    // Create info icon container
    const infoIcon = document.createElement('div');
    infoIcon.className = 'search-tips-info-icon';
    infoIcon.innerHTML = `
        <span class="info-icon">?</span>
        <div class="tips-tooltip-container">
            <div class="tips-header">
                <i class="fas fa-lightbulb"></i>
                <span>Search Tips</span>
            </div>
            <div class="tips-content">
                <div class="tip-item">
                    <span class="tip-icon">🔍</span>
                    <span class="tip-text">Search by video title, ID, reason, or date</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">💬</span>
                    <span class="tip-text">Use quotes for exact matches: "exact phrase"</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">⏱️</span>
                    <span class="tip-text">Filter by time range using quick filters</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">⚡</span>
                    <span class="tip-text">Click suggestions for faster searching</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">🎯</span>
                    <span class="tip-text">Keyword badges are clickable!</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">💾</span>
                    <span class="tip-text">Export your data anytime</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">❌</span>
                    <span class="tip-text">Clear search with the X button</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">⬆️⬇️</span>
                    <span class="tip-text">Click column headers to sort</span>
                </div>
            </div>
        </div>
    `;
    
    // Insert info icon next to search container
    searchContainer.parentNode.insertBefore(infoIcon, searchContainer.nextSibling);
    
    // Add CSS styles
    if (!$('#search-tips-styles')) {
        const style = document.createElement('style');
        style.id = 'search-tips-styles';
        style.textContent = `
            .search-tips-info-icon {
                position: relative;
                display: inline-flex;
                align-items: center;
                margin-top: 8px;
                margin-left: 8px;
            }
            
            .search-tips-info-icon .info-icon {
                font-size: 18px;
                cursor: help;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: #0A0F1C;
                transition: all 0.3s ease;
                border: 2px solid transparent;
                box-shadow: 0 2px 8px rgba(193, 241, 29, 0.3);
            }
            
            .search-tips-info-icon:hover .info-icon {
                transform: scale(1.1) rotate(10deg);
                box-shadow: 0 4px 12px rgba(193, 241, 29, 0.5);
                border-color: var(--primary);
            }
            
            .tips-tooltip-container {
                position: absolute;
                top: 100%;
                left: 0;
                margin-top: 10px;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-primary);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                width: 320px;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
            }
            
            .search-tips-info-icon:hover .tips-tooltip-container {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: all;
            }
            
            .tips-header {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 16px;
                border-bottom: 1px solid var(--border-primary);
                background: var(--bg-secondary);
                border-radius: var(--radius-lg) var(--radius-lg) 0 0;
            }
            
            .tips-header i {
                color: var(--primary);
                font-size: 18px;
            }
            
            .tips-header span {
                font-weight: 700;
                font-size: 16px;
                color: var(--text-primary);
            }
            
            .tips-content {
                max-height: 300px;
                overflow-y: auto;
                padding: 12px;
            }
            
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 10px;
                border-radius: var(--radius-md);
                margin-bottom: 6px;
                transition: all 0.2s ease;
            }
            
            .tip-item:hover {
                background: var(--bg-hover);
                transform: translateX(4px);
            }
            
            .tip-item:last-child {
                margin-bottom: 0;
            }
            
            .tip-icon {
                font-size: 16px;
                width: 24px;
                text-align: center;
                flex-shrink: 0;
                margin-top: 2px;
            }
            
            .tip-text {
                font-size: 13px;
                line-height: 1.4;
                color: var(--text-secondary);
                flex: 1;
            }
            
            /* Arrow for tooltip */
            .tips-tooltip-container::before {
                content: '';
                position: absolute;
                top: -6px;
                left: 20px;
                width: 12px;
                height: 12px;
                background: var(--bg-glass);
                border-left: 1px solid var(--border-primary);
                border-top: 1px solid var(--border-primary);
                transform: rotate(45deg);
            }
            
            /* Scrollbar styling */
            .tips-content::-webkit-scrollbar {
                width: 6px;
            }
            
            .tips-content::-webkit-scrollbar-track {
                background: var(--bg-secondary);
                border-radius: 3px;
            }
            
            .tips-content::-webkit-scrollbar-thumb {
                background: var(--primary);
                border-radius: 3px;
            }
            
            .tips-content::-webkit-scrollbar-thumb:hover {
                background: var(--primary-dark);
            }
            
            /* Responsive design */
            @media (max-width: 768px) {
                .search-tips-info-icon {
                    margin-left: 4px;
                }
                
                .tips-tooltip-container {
                    width: 280px;
                    left: -120px;
                }
                
                .tips-tooltip-container::before {
                    left: 130px;
                }
            }
            
            @media (max-width: 480px) {
                .tips-tooltip-container {
                    width: 250px;
                    left: -110px;
                }
                
                .tips-tooltip-container::before {
                    left: 120px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// UPDATE THE initDashboard FUNCTION
function initDashboard() {
    console.log('Clify v7.0.0: Initializing dashboard...');
    
    // Mark body as loaded to prevent FOUC
    document.body.classList.add('loaded');
    
    // Set version
    safeElement('#versionLabel', el => el.textContent = VERSION);
    safeElement('#footerVersion', el => el.textContent = VERSION);
    
    // Initialize systems
    initNotificationSystem();
    initLanguageSelector();
    initTheme();
    initKeywordsManager();
    initEnhancedFeaturesPanel();
    initContactForm();
    initExportButton();
    initClearAllButton();
    initSearchAndFilter();
    initBackToTop();
    
    // Initialize enhanced search system
    setTimeout(() => {
        initEnhancedSearch();
        console.log('Enhanced search system initialized');
    }, 300);
    
    // Initialize Quick Actions FAB
    setTimeout(() => {
        initQuickActions();
        console.log('Quick Actions FAB initialized');
    }, 500);
    
    // Initialize admin notifications
    setTimeout(() => {
        const adminNotifications = new AdminNotificationSystem();
        adminNotifications.init();
        console.log('Admin notifications initialized');
    }, 700);
    
    // Initialize message retry system
    initMessageRetrySystem();
    
    // Initialize support and donate buttons
    initSupportHeaderButton();
    initDonateHeaderButton();
    
    // INITIALIZE PAGINATION SYSTEM
    setTimeout(() => {
        pagination.init('#paginationContainer', (page, pageSize) => {
            const searchQuery = $('#search')?.value || '';
            if (searchQuery.trim()) {
                handleSearch(searchQuery, page, pageSize);
            } else {
                renderBlockedTable(page);
            }
        });
        console.log('Pagination system initialized');
    }, 400);
    
    // INITIALIZE PRO TIPS AS SINGLE INFO ICON
    setTimeout(() => {
        initProTipsTooltips();
        console.log('Pro tips info icon initialized');
    }, 600);
    
    // Load initial data
    setTimeout(() => {
        loadDashboardData();
        renderBlockedTable();
        console.log('Initial data loaded');
    }, 1000);
    
    // Set up refresh button
    safeElement('#refreshBtn', el => {
        el.addEventListener('click', () => {
            loadDashboardData();
            const searchQuery = $('#search')?.value || '';
            if (searchQuery.trim()) {
                handleSearch(searchQuery, 1, pagination.getPageSize());
            } else {
                renderBlockedTable(1);
            }
            showInfo("Data refreshed");
        });
    });
    
    // Set up tab switching
    $$('.tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.getAttribute('data-tab');
            switchToTab(tabName);
            
            if (tabName === 'blocked') {
                renderBlockedTable(1);
            } else if (tabName === 'keywords') {
                loadKeywords();
            } else if (tabName === 'enhanced') {
                checkUblockStatus();
            }
        });
    });
    
    console.log('Clify v7.0.0: Dashboard initialized successfully');
}
// Start the dashboard when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}