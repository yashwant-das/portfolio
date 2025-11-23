(function() {
  'use strict';

  // ============================================================================
  // Configuration Constants
  // ============================================================================

  /**
   * Debug mode flag - enable by adding ?debug=true to URL
   * @type {boolean}
   */
  const DEBUG = window.location.search.includes('debug=true');

  /**
   * Contentful API configuration constants
   * @type {Object}
   */
  const CONTENTFUL_CONFIG = {
    MAX_ENTRIES: 1000,
    INCLUDE_DEPTH: 10,
    DEFAULT_ENVIRONMENT: 'master',
    API_BASE_URL: 'https://cdn.contentful.com'
  };

  /**
   * Theme configuration
   * @type {Object}
   */
  const THEME_CONFIG = {
    VALID_THEMES: ['light', 'dark'],
    STORAGE_KEY: 'theme',
    DEFAULT_THEME: 'light'
  };

  /**
   * Intersection Observer configuration for navigation highlighting
   * @type {Object}
   */
  const NAV_CONFIG = {
    ROOT_MARGIN: '-40% 0px -50% 0px',
    THRESHOLD_STEP: 0.05,
    THRESHOLD_MAX: 1.0
  };

  /**
   * Social icon dimensions
   * @type {Object}
   */
  const ICON_CONFIG = {
    SOCIAL_SIZE: 20,
    SVG_VIEWBOX: '0 0 24 24'
  };

  // ============================================================================
  // DOM Element References
  // ============================================================================

  const root = document.documentElement;
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const themeToggle = document.getElementById('theme-toggle');
  const yearEl = document.getElementById('year');
  const reduceMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  
  // Contentful API configuration
  // Try to load config.js dynamically if it wasn't loaded by the script tag
  let contentfulConfig = window.CONTENTFUL_CONFIG || {};
  
  // If config.js failed to load, try to load it dynamically as a script element
  if (!contentfulConfig.spaceId && !contentfulConfig.accessToken) {
    // Check if we're on GitHub Pages and config.js might not be loaded yet
    if (window.location.hostname.includes('github.io')) {
      const script = document.createElement('script');
      script.src = 'config.js';
      script.async = false; // Load synchronously to ensure config is available
      script.onerror = () => {
        debugLog('config.js failed to load. Using fallback data.');
      };
      script.onload = () => {
        contentfulConfig = window.CONTENTFUL_CONFIG || {};
        if (contentfulConfig.spaceId && contentfulConfig.accessToken) {
          debugLog('config.js loaded dynamically, retrying Contentful fetch');
          // Retry fetching content if config is now available
          fetchContent();
        }
      };
      document.head.appendChild(script);
    }
  }
  
  const CONTENTFUL_SPACE_ID = contentfulConfig.spaceId;
  const CONTENTFUL_ACCESS_TOKEN = contentfulConfig.accessToken;
  const CONTENTFUL_ENVIRONMENT = contentfulConfig.environment || CONTENTFUL_CONFIG.DEFAULT_ENVIRONMENT;
  const CONTENTFUL_API_BASE = `${CONTENTFUL_CONFIG.API_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}`;
  
  // Log Contentful configuration status (only in debug mode)
  debugLog('Contentful Config:', {
    hasConfig: !!window.CONTENTFUL_CONFIG,
    spaceId: CONTENTFUL_SPACE_ID ? `${CONTENTFUL_SPACE_ID.substring(0, 8)}...` : 'missing',
    hasAccessToken: !!CONTENTFUL_ACCESS_TOKEN,
    environment: CONTENTFUL_ENVIRONMENT
  });
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SOCIAL_ICON_PATHS = {
    github: '<path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.292 3.438 9.787 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.839 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.476 5.921.43.371.823 1.104.823 2.226 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 22.08 24 17.584 24 12.297 24 5.67 18.627.297 12 .297Z"/>',
    linkedin: '<path d="M22.225 0H1.771A1.77 1.77 0 0 0 0 1.771v20.452A1.77 1.77 0 0 0 1.771 24h20.452A1.77 1.77 0 0 0 24 22.223V1.771A1.77 1.77 0 0 0 22.225 0ZM7.12 20.452H3.555V9h3.565v11.452ZM5.339 7.433a2.063 2.063 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125Zm15.108 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.372-1.852 3.604 0 4.27 2.372 4.27 5.459v6.284Z"/>',
    medium: '<path d="M2.01 6.3c.02-.2-.057-.4-.205-.53L0 4.08V3.78h6.261l4.775 10.483L14.9 3.78H21l-.002.3-1.6 1.53a.322.322 0 0 0-.12.31v10.72a.322.322 0 0 0 .12.31l1.56 1.53V18h-7.62v-.29l1.62-1.58c.16-.16.16-.21.16-.44V8.96l-4.5 9.06h-.61L5.04 8.96v6.03c-.04.32.06.64.29.87l2.11 2.56v.29H0v-.29l2.11-2.56c.225-.23.33-.55.27-.87V6.3Z"/>'
  };

  // ============================================================================
  // Utility Functions
  // ============================================================================

  /**
   * Debug logging utility - only logs when DEBUG mode is enabled
   * @param {...*} args - Arguments to log
   */
  function debugLog(...args) {
    if (DEBUG) {
      console.log('[DEBUG]', ...args);
    }
  }

  /**
   * Standardized error handler
   * @param {Error|string} error - Error object or error message
   * @param {string} context - Context where error occurred
   * @param {*} fallback - Fallback value to return
   * @returns {*} Fallback value or null
   */
  function handleError(error, context = '', fallback = null) {
    const message = context ? `${context}: ${error.message || error}` : (error.message || error);
    console.error('[ERROR]', message, error instanceof Error ? error : '');
    return fallback;
  }

  /**
   * Creates a DOM element with optional class and text content
   * @param {string} tag - HTML tag name
   * @param {string} [className] - CSS class name
   * @param {string} [textContent] - Text content
   * @returns {HTMLElement} Created element
   */
  function createElement(tag, className = '', textContent = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
  }

  // ============================================================================
  // Theme Management
  // ============================================================================

  /**
   * Initialize theme storage with availability check
   * @returns {Storage|null} localStorage if available, null otherwise
   */
  const themeStorage = (() => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
    try {
      const probe = '__theme-probe__';
      localStorage.setItem(probe, probe);
      localStorage.removeItem(probe);
      return localStorage;
    } catch (_) {
      return null;
    }
  })();

  /**
   * Sets the theme (light/dark mode)
   * @param {string} mode - Theme mode ('light' or 'dark')
   */
  function setTheme(mode) {
    // Validate theme mode
    if (!THEME_CONFIG.VALID_THEMES.includes(mode)) {
      debugLog(`Invalid theme: ${mode}. Defaulting to '${THEME_CONFIG.DEFAULT_THEME}'`);
      mode = THEME_CONFIG.DEFAULT_THEME;
    }

    root.setAttribute('data-theme', mode);
    
    // Persist theme preference
    if (themeStorage) {
      try {
        themeStorage.setItem(THEME_CONFIG.STORAGE_KEY, mode);
      } catch (err) {
        handleError(err, 'Failed to save theme preference');
      }
    }
    
    // Update theme toggle button state
    if (themeToggle) {
      const isDark = mode === 'dark';
      themeToggle.setAttribute('aria-pressed', String(isDark));
      // Icons are now handled by CSS with SVG, no need to update text content
    }
  }

  // Initialize theme
  const storedTheme = themeStorage ? themeStorage.getItem(THEME_CONFIG.STORAGE_KEY) : null;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initTheme = storedTheme || (prefersDark ? 'dark' : THEME_CONFIG.DEFAULT_THEME);
  setTheme(initTheme);

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Year display
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Nav: mobile toggle
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close menu on link click
    siteNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (siteNav.classList.contains('open')) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  const supportsHistory = typeof history !== 'undefined' && typeof history.pushState === 'function';

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      scrollToSection(target, { behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      if (supportsHistory) {
        history.pushState({ id }, '', `#${id}`);
      } else {
        window.location.hash = id;
      }
    });
  });

  window.addEventListener('popstate', (event) => {
    const id = event && event.state && event.state.id
      ? event.state.id
      : window.location.hash.replace('#', '');
    if (!id) return;
    const target = document.getElementById(id);
    if (target) scrollToSection(target, { behavior: 'auto' });
  });

  // ============================================================================
  // Initialization
  // ============================================================================

  // Fetch content from Contentful CMS
  fetchContent();

  // ============================================================================
  // Content Fetching
  // ============================================================================

  /**
   * Fetches content from Contentful CMS or falls back to JSON file
   * @returns {Promise<void>}
   */
  async function fetchContent() {
    let data = null;
    
    // Try to fetch from Contentful first if configured
    const isFileProtocol = window.location.protocol === 'file:';
    const isContentfulConfigured = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN;
    
    if (isContentfulConfigured && !isFileProtocol) {
      try {
        data = await fetchContentfulData();
        if (data) {
          debugLog('Contentful data loaded successfully:', data);
          applyContent(data);
          return; // Successfully loaded from Contentful
        } else {
          debugLog('Contentful data is empty or invalid');
        }
      } catch (err) {
        handleError(err, 'Failed to load content from Contentful. Falling back to JSON file');
      }
    } else {
      if (!isContentfulConfigured) {
        debugLog('Contentful not configured. Loading fallback JSON file.');
      } else if (isFileProtocol) {
        debugLog('Skipping Contentful fetch while viewing the file directly. Loading fallback JSON file.');
      }
    }
    
    // Fallback: Load from JSON file
    try {
      const fallbackRes = await fetch('fallback-data.json', { cache: 'no-store' });
      if (!fallbackRes.ok) {
        throw new Error(`Failed to load fallback-data.json: ${fallbackRes.status}`);
      }
      data = await fallbackRes.json();
      debugLog('Fallback data loaded successfully:', data);
      applyContent(data);
    } catch (err) {
      handleError(err, 'Failed to load fallback data. Content may not display correctly');
      // HTML structure remains, but content won't be populated
    }
  }

  /**
   * Fetches data from Contentful Content Delivery API
   * @returns {Promise<Object>} Transformed portfolio data
   * @throws {Error} If API request fails
   */
  async function fetchContentfulData() {
    const url = `${CONTENTFUL_API_BASE}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&limit=${CONTENTFUL_CONFIG.MAX_ENTRIES}&include=${CONTENTFUL_CONFIG.INCLUDE_DEPTH}`;
    debugLog('Fetching from Contentful:', url.replace(CONTENTFUL_ACCESS_TOKEN, '***'));
    
    const entriesRes = await fetch(url);

    if (!entriesRes.ok) {
      const errorText = await entriesRes.text();
      throw new Error(`Contentful entries API error: ${entriesRes.status} - ${errorText}`);
    }

    const entriesData = await entriesRes.json();
    debugLog('Contentful entries received:', entriesData.total, 'entries');

    // Create asset lookup map from includes
    const assetMap = new Map();
    if (entriesData.includes && entriesData.includes.Asset) {
      entriesData.includes.Asset.forEach(asset => {
        if (asset.fields && asset.fields.file) {
          let url = asset.fields.file.url;
          // Handle Contentful CDN URLs
          if (url.startsWith('//')) {
            url = `https:${url}`;
          } else if (!url.startsWith('http')) {
            // If relative URL, prepend https:// (double slash)
            url = `https://${url}`;
          }
          assetMap.set(asset.sys.id, {
            url: url,
            title: asset.fields.title || '',
            description: asset.fields.description || ''
          });
        }
      });
    }

    // Transform Contentful entries to our data structure
    const transformedData = transformContentfulEntries(entriesData.items, assetMap);
    debugLog('Transformed data:', transformedData);
    return transformedData;
  }

  // ============================================================================
  // Rich Text Processing
  // ============================================================================

  /**
   * Extracts plain text from Contentful Rich text field
   * @param {Object|string} richTextField - Rich text document object or plain string
   * @returns {string} Extracted plain text
   * @example
   * extractRichTextPlainText({ nodeType: 'document', content: [...] })
   * // Returns: "Plain text content"
   */
  function extractRichTextPlainText(richTextField) {
    if (!richTextField) return '';
    
    // If it's already a string, return as-is
    if (typeof richTextField === 'string') {
      return richTextField;
    }
    
    // If it's Rich text structure
    if (richTextField.nodeType === 'document' && richTextField.content) {
      /**
       * Recursively extracts text from Rich text nodes
       * @param {Object} node - Rich text node
       * @returns {string} Extracted text
       */
      function extractText(node) {
        if (!node) return '';
        
        if (node.nodeType === 'text') {
          return node.value || '';
        }
        
        if (node.content && Array.isArray(node.content)) {
          return node.content.map(extractText).join('');
        }
        
        return '';
      }
      
      return extractText(richTextField).trim();
    }
    
    return '';
  }

  /**
   * Parses Contentful Rich text and extracts list items
   * Handles multiple formats: Rich text lists, arrays, or plain strings
   * @param {Object|Array|string} richTextField - Rich text document, array, or string
   * @returns {Array<string>} Array of list item strings
   * @example
   * parseRichTextToList({ nodeType: 'document', content: [{ nodeType: 'unordered-list', ... }] })
   * // Returns: ["Item 1", "Item 2"]
   */
  function parseRichTextToList(richTextField) {
    if (!richTextField) return [];
    
    // If it's already an array (from old Text field with multiple values), return as-is
    if (Array.isArray(richTextField)) {
      return richTextField;
    }
    
    // If it's a string (from old Text field), return as single-item array
    if (typeof richTextField === 'string') {
      return richTextField ? [richTextField] : [];
    }
    
    // If it's Rich text structure (Contentful Rich text format)
    if (richTextField.nodeType === 'document' && richTextField.content) {
      const items = [];
      
      // Recursively extract text from Rich text nodes
      function extractText(node) {
        if (!node) return '';
        
        if (node.nodeType === 'text') {
          return node.value || '';
        }
        
        if (node.content && Array.isArray(node.content)) {
          return node.content.map(extractText).join('');
        }
        
        return '';
      }
      
      // Find list nodes (unordered-list or ordered-list)
      function findLists(nodes) {
        const results = [];
        if (!Array.isArray(nodes)) return results;
        
        nodes.forEach(node => {
          if (node.nodeType === 'unordered-list' || node.nodeType === 'ordered-list') {
            // Extract items from list
            if (node.content && Array.isArray(node.content)) {
              node.content.forEach(listItem => {
                if (listItem.nodeType === 'list-item') {
                  const text = extractText(listItem);
                  if (text.trim()) {
                    results.push(text.trim());
                  }
                }
              });
            }
          } else if (node.content) {
            // Recursively search in nested content
            results.push(...findLists(node.content));
          }
        });
        
        return results;
      }
      
      const listItems = findLists(richTextField.content);
      
      // If we found list items, return them
      if (listItems.length > 0) {
        return listItems;
      }
      
      // If no lists found, extract all text content as a single item
      const allText = extractText(richTextField);
      return allText ? [allText] : [];
    }
    
    return [];
  }

  // ============================================================================
  // Data Transformation
  // ============================================================================

  /**
   * Transforms Contentful entries into portfolio data structure
   * @param {Array<Object>} entries - Array of Contentful entry objects
   * @param {Map<string, Object>} assetMap - Map of asset IDs to asset data
   * @returns {Object} Transformed portfolio data
   */
  function transformContentfulEntries(entries, assetMap) {
    if (!Array.isArray(entries)) {
      handleError('Entries must be an array', 'transformContentfulEntries');
      return { experience: [], projects: [], skills: {}, education: [] };
    }

    const data = {
      experience: [],
      projects: [],
      skills: {},
      education: []
    };

    entries.forEach(entry => {
      const contentType = entry.sys?.contentType?.sys?.id;
      const fields = entry.fields || {};
      debugLog('Processing entry:', contentType, entry.sys?.id);

      switch (contentType) {
        case 'portfolio':
          // Portfolio is a single entry - map to top-level data
          data.name = fields.name || '';
          data.subtitle = fields.subtitle || '';
          data.email = fields.email || '';
          data.website = fields.website || '';
          data.resume = fields.resume || '';
          data.about = extractRichTextPlainText(fields.about) || '';
          data.heroSummary = extractRichTextPlainText(fields.heroSummary) || '';
          
          // Handle avatar asset
          if (fields.avatar && fields.avatar.sys && assetMap.has(fields.avatar.sys.id)) {
            data.avatar = assetMap.get(fields.avatar.sys.id).url;
          }
          
          // Handle socials (can be object or JSON string)
          if (fields.socials) {
            let socialsObj = fields.socials;
            if (typeof socialsObj === 'string') {
              try {
                socialsObj = JSON.parse(socialsObj);
              } catch (e) {
                debugLog('Failed to parse socials JSON:', e);
                socialsObj = null;
              }
            }
            if (socialsObj && typeof socialsObj === 'object') {
              data.socials = {};
              data.socialIcons = {}; // Store custom icons separately
              Object.entries(socialsObj).forEach(([key, value]) => {
                if (!value) return;
                // Support both simple format {"LinkedIn": "url"} and advanced {"LinkedIn": {"url": "...", "icon": "..."}}
                if (typeof value === 'string') {
                  data.socials[key] = value;
                } else if (typeof value === 'object' && value.url) {
                  data.socials[key] = value.url;
                  if (value.icon) {
                    data.socialIcons[key] = value.icon;
                  }
                }
              });
            }
          }
          
          // Handle social icons as separate asset references (alternative approach)
          if (fields.socialIcons && Array.isArray(fields.socialIcons)) {
            if (!data.socialIcons) data.socialIcons = {};
            fields.socialIcons.forEach(iconRef => {
              if (iconRef && iconRef.sys && iconRef.fields) {
                const label = iconRef.fields.label || '';
                const iconAsset = iconRef.fields.icon;
                if (label && iconAsset && iconAsset.sys && assetMap.has(iconAsset.sys.id)) {
                  data.socialIcons[label] = assetMap.get(iconAsset.sys.id).url;
                }
              }
            });
          }
          break;

        case 'experience':
          const experience = {
            role: fields.role || '',
            company: fields.company || '',
            period: fields.period || '',
            highlights: parseRichTextToList(fields.highlights)
          };
          
          // Handle logo asset
          if (fields.logo && fields.logo.sys && assetMap.has(fields.logo.sys.id)) {
            experience.logo = assetMap.get(fields.logo.sys.id).url;
          }
          
          data.experience.push(experience);
          break;

        case 'project':
          const project = {
            title: fields.title || '',
            description: fields.description || '',
            tags: parseRichTextToList(fields.tags),
            live: fields.liveUrl || '',
            code: fields.codeUrl || ''
          };
          data.projects.push(project);
          break;

        case 'skillCategory':
          const categoryName = fields.categoryName || 'Other';
          const skills = parseRichTextToList(fields.skills);
          if (skills.length > 0) {
            data.skills[categoryName] = skills;
          }
          break;

        case 'education':
          const education = {
            degree: fields.degree || '',
            school: fields.school || '',
            period: fields.period || ''
          };
          data.education.push(education);
          break;
      }
    });

    // Sort experience by date (most recent first)
    data.experience.sort((a, b) => {
      /**
       * Extracts the end year from a period string for sorting
       * Handles formats like "04/2021 — 06/2024" or "2020 — 2023"
       * @param {string} period - Period string containing dates
       * @returns {number} End year (0 if not found)
       */
      const getEndYear = (period) => {
        if (!period || typeof period !== 'string') return 0;
        // Match all 4-digit years in the string
        const matches = period.match(/\d{4}/g);
        // Use the last match (end date) for "most recent first" sorting
        // If only one year found, use it (could be single year format)
        return matches && matches.length > 0 ? parseInt(matches[matches.length - 1], 10) : 0;
      };
      return getEndYear(b.period) - getEndYear(a.period);
    });

    return data;
  }

  // ============================================================================
  // Content Application
  // ============================================================================

  /**
   * Applies portfolio data to the DOM
   * @param {Object} data - Portfolio data object
   */
  function applyContent(data) {
    if (!data || typeof data !== 'object') {
      handleError('Invalid data provided to applyContent', 'applyContent');
      return;
    }

    // Page title and meta description
    if (data.name) {
      const titleEl = document.getElementById('page-title');
      if (titleEl) {
        const subtitle = data.subtitle ? ` — ${data.subtitle}` : '';
        titleEl.textContent = `${data.name}${subtitle} Portfolio`;
      }
      const descEl = document.getElementById('page-description');
      if (descEl) {
        descEl.setAttribute('content', `Portfolio of ${data.name} — projects, experience, skills, and contact.`);
      }
    }

    // Structured data (JSON-LD)
    if (data.name) {
      const structuredDataEl = document.getElementById('structured-data');
      if (structuredDataEl) {
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name || "",
          "url": data.website || "",
          "jobTitle": data.subtitle || "",
          "sameAs": data.socials ? Object.values(data.socials).filter(url => url) : []
        };
        structuredDataEl.textContent = JSON.stringify(structuredData);
      }
    }

    // Logo mark and text
    if (data.name) {
      const logoMark = document.getElementById('logo-mark');
      const logoText = document.getElementById('logo-text');
      if (logoMark) {
        // Generate initials from name (first letter of first and last word)
        const nameParts = data.name.trim().split(/\s+/);
        const initials = nameParts.length >= 2 
          ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
          : nameParts[0][0].toUpperCase();
        logoMark.textContent = initials;
      }
      if (logoText) {
        logoText.textContent = data.name;
      }
    }

    // Footer name
    if (data.name) {
      const footerName = document.getElementById('footer-name');
      if (footerName) footerName.textContent = data.name;
    }

    // Resume link
    if (data.resume) {
      const resumeLink = document.getElementById('resume-link');
      if (resumeLink) {
        resumeLink.href = data.resume;
        resumeLink.style.display = '';
      }
    }

    // Avatar alt text
    if (data.name) {
      const avatarImg = document.getElementById('avatar-img');
      if (avatarImg) {
        avatarImg.alt = `Portrait of ${data.name}`;
      }
    }

    // About
    if (data.about) {
      const aboutBody = document.getElementById('about-body');
      if (aboutBody) aboutBody.textContent = data.about;
    }

    // Experience
    if (Array.isArray(data.experience)) {
      const list = document.getElementById('experience-list');
      if (list) {
        list.innerHTML = '';
        data.experience.forEach(exp => {
          const li = document.createElement('li');
          li.className = 'timeline-item';
          const meta = document.createElement('div');
          meta.className = 'timeline-meta';
          
          if (exp.logo) {
            const img = document.createElement('img');
            img.className = 'company-logo';
            img.src = exp.logo;
            img.alt = `${exp.company} logo`;
            img.loading = 'lazy';
            // Size controlled by CSS for responsive behavior
            meta.appendChild(img);
          }
          
          const metaContent = document.createElement('div');
          metaContent.className = 'timeline-meta-content';
          const role = document.createElement('span'); role.className = 'role'; role.textContent = exp.role || '';
          const company = document.createElement('span'); company.className = 'company'; company.textContent = exp.company || '';
          const period = document.createElement('span'); period.className = 'period'; period.textContent = exp.period || '';
          metaContent.append(role, company, period);
          meta.appendChild(metaContent);
          li.appendChild(meta);

          const ul = document.createElement('ul'); ul.className = 'highlights';
          (exp.highlights || []).forEach(h => { const liH = document.createElement('li'); liH.textContent = h; ul.appendChild(liH); });
          li.appendChild(ul);
          list.appendChild(li);
        });
      }
    }

    // Projects
    if (Array.isArray(data.projects)) {
      const grid = document.getElementById('projects-grid');
      if (grid) {
        grid.innerHTML = '';
        data.projects.forEach(p => {
          const card = document.createElement('article');
          card.className = 'project-card';
          const h3 = document.createElement('h3'); h3.textContent = p.title || '';
          const desc = document.createElement('p'); desc.textContent = p.description || '';
          const tags = document.createElement('ul'); tags.className = 'tags';
          (p.tags || []).forEach(t => { const li = document.createElement('li'); li.textContent = t; tags.appendChild(li); });
          const linkNodes = [];
          if (p.live) {
            const a = document.createElement('a');
            a.href = p.live;
            a.textContent = 'Live Demo';
            a.setAttribute('aria-label', 'Live demo');
            linkNodes.push(a);
          }
          if (p.code) {
            const a = document.createElement('a');
            a.href = p.code;
            a.textContent = 'Source Code';
            a.setAttribute('aria-label', 'Source code');
            linkNodes.push(a);
          }
          card.append(h3, desc, tags);
          if (linkNodes.length) {
            const links = document.createElement('div');
            links.className = 'links';
            linkNodes.forEach(node => links.appendChild(node));
            card.appendChild(links);
          }
          grid.appendChild(card);
        });
      }
    }

    // Skills - Categorized
    const skillsContainer = document.getElementById('skills-container');
    // Only clear and populate if skills data exists and has entries
    if (skillsContainer && data.skills && (
      (Array.isArray(data.skills) && data.skills.length > 0) ||
      (typeof data.skills === 'object' && Object.keys(data.skills).length > 0)
    )) {
      skillsContainer.innerHTML = '';
      
      // Handle both old array format and new categorized object format
    if (Array.isArray(data.skills)) {
        // Legacy format: single category
        const category = document.createElement('div');
        category.className = 'skill-category';
        const h3 = document.createElement('h3');
        h3.textContent = 'Technical Skills';
        const ul = document.createElement('ul');
        ul.className = 'skills';
        data.skills.forEach(s => {
          const li = document.createElement('li');
          li.textContent = s;
          ul.appendChild(li);
        });
        category.append(h3, ul);
        skillsContainer.appendChild(category);
      } else if (typeof data.skills === 'object') {
        // New categorized format
        Object.entries(data.skills).forEach(([categoryName, skills]) => {
          if (!Array.isArray(skills) || skills.length === 0) return;
          
          const category = document.createElement('div');
          category.className = 'skill-category';
          const h3 = document.createElement('h3');
          h3.textContent = categoryName;
          const ul = document.createElement('ul');
          ul.className = 'skills';
          skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            ul.appendChild(li);
          });
          category.append(h3, ul);
          skillsContainer.appendChild(category);
        });
      }
    }

    // Education
    if (Array.isArray(data.education)) {
      const ul = document.getElementById('education-list');
      if (ul) {
        ul.innerHTML = '';
        data.education.forEach(ed => {
          const li = document.createElement('li');
          const degree = document.createElement('span'); degree.className = 'degree'; degree.textContent = ed.degree || '';
          const school = document.createElement('span'); school.className = 'school'; school.textContent = ed.school || '';
          const period = document.createElement('span'); period.className = 'period'; period.textContent = ed.period || '';
          li.append(degree, school, period);
          ul.appendChild(li);
        });
      }
    }

    // Avatar
    if (data.avatar) {
      const img = document.querySelector('.avatar img');
      if (img) img.src = data.avatar;
    }

    // Name, subtitle, and hero summary
    if (data.name) {
      const el = document.getElementById('hero-name');
      if (el) el.textContent = data.name;
    }
    if (data.subtitle) {
      const el = document.getElementById('hero-subtitle');
      if (el) el.textContent = data.subtitle;
    }
    if (data.heroSummary) {
      const el = document.querySelector('.hero-summary');
      if (el) el.textContent = data.heroSummary;
    }

    // Contact and socials
    if (data.email) {
      const el = document.getElementById('contact-email');
      if (el) { el.textContent = data.email; el.href = `mailto:${data.email}`; }
    }
    if (data.socials && typeof data.socials === 'object') {
      const ul = document.getElementById('social-list');
      if (ul) {
        ul.innerHTML = '';
        for (const [label, href] of Object.entries(data.socials)) {
          if (!href) continue;
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = href;
          a.setAttribute('aria-label', label);
          
          // Use custom icon from Contentful if available, otherwise use default
          const customIconUrl = data.socialIcons && data.socialIcons[label];
          const iconNode = customIconUrl 
            ? createCustomSocialIcon(customIconUrl, label)
            : createSocialIcon(label);
          if (iconNode) a.appendChild(iconNode);
          
          const textNode = document.createElement('span');
          textNode.className = 'social-label';
          textNode.textContent = label;
          a.appendChild(textNode);
          li.appendChild(a);
          ul.appendChild(li);
        }
        if (!ul.childElementCount) {
          ul.style.display = 'none';
        } else {
          ul.style.display = '';
        }
      }
    } else {
      const ul = document.getElementById('social-list');
      if (ul) ul.style.display = 'none';
    }
  }

  // Cursor-based dynamic highlight for Liquid Glass background
  let rafId = null;
  window.addEventListener('pointermove', (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty('--cursor-x', x + '%');
      root.style.setProperty('--cursor-y', y + '%');
      rafId = null;
    });
  }, { passive: true });

  // Scroll-aware nav active state like tabs
  const sections = ['about','experience','projects','skills','education','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = new Map();
  document.querySelectorAll('#site-nav a[href^="#"]').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    navLinks.set(id, a);
  });
  // Observe visibility ratios and pick the most visible section
  const visibility = new Map();
  const fallbackSectionId = sections.length ? sections[0].id : null;
  const initialSectionId = window.location.hash.replace('#', '');
  let currentActive = null;
  if (initialSectionId && navLinks.has(initialSectionId)) {
    navLinks.get(initialSectionId).classList.add('is-active');
    currentActive = initialSectionId;
  } else if (fallbackSectionId && navLinks.has(fallbackSectionId)) {
    navLinks.get(fallbackSectionId).classList.add('is-active');
    currentActive = fallbackSectionId;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      visibility.set(entry.target.id, entry.intersectionRatio);
    });
    // Pick section with max visibility ratio
    let activeId = fallbackSectionId || null;
    let maxRatio = -1;
    visibility.forEach((ratio, id) => {
      if (ratio > maxRatio) { maxRatio = ratio; activeId = id; }
    });
    if (activeId && activeId !== currentActive) {
      if (currentActive && navLinks.has(currentActive)) {
        navLinks.get(currentActive).classList.remove('is-active');
      }
      const link = navLinks.get(activeId);
      if (link) {
        link.classList.add('is-active');
        currentActive = activeId;
      }
    }
  }, { rootMargin: NAV_CONFIG.ROOT_MARGIN, threshold: buildThresholdList() });
  sections.forEach(sec => io.observe(sec));

  // ============================================================================
  // Navigation & Scrolling
  // ============================================================================

  /**
   * Builds threshold list for Intersection Observer
   * @returns {Array<number>} Array of threshold values
   */
  function buildThresholdList() {
    const thresholds = [];
    for (let i = 0; i <= NAV_CONFIG.THRESHOLD_MAX; i += NAV_CONFIG.THRESHOLD_STEP) {
      thresholds.push(i);
    }
    return thresholds;
  }

  /**
   * Scrolls to a section smoothly or instantly
   * @param {HTMLElement} element - Target element to scroll to
   * @param {Object} [options={}] - Scroll options
   * @param {string} [options.behavior='auto'] - Scroll behavior ('smooth' or 'auto')
   */
  function scrollToSection(element, options = {}) {
    if (!element || !(element instanceof HTMLElement)) {
      handleError('Invalid element provided to scrollToSection', 'scrollToSection');
      return;
    }
    const behavior = options.behavior || 'auto';
    element.scrollIntoView({ behavior, block: 'start' });
  }

  /**
   * Checks if user prefers reduced motion
   * @returns {boolean} True if reduced motion is preferred
   */
  function prefersReducedMotion() {
    return !!(reduceMotionQuery && reduceMotionQuery.matches);
  }

  // ============================================================================
  // Social Icons
  // ============================================================================

  /**
   * Creates a social icon SVG element from predefined paths
   * @param {string} label - Social platform label (e.g., "LinkedIn", "GitHub")
   * @returns {HTMLElement|null} Span element containing SVG icon, or null if not found
   */
  function createSocialIcon(label) {
    if (!label || typeof label !== 'string') return null;
    
    const normalized = label.trim().toLowerCase();
    const iconKey = Object.keys(SOCIAL_ICON_PATHS).find(name => normalized.includes(name));
    if (!iconKey) return null;
    
    const span = document.createElement('span');
    span.className = 'social-icon';
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', ICON_CONFIG.SVG_VIEWBOX);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.innerHTML = SOCIAL_ICON_PATHS[iconKey];
    span.appendChild(svg);
    return span;
  }

  /**
   * Creates a custom social icon from an image URL
   * @param {string} iconUrl - URL of the icon image
   * @param {string} label - Social platform label for alt text
   * @returns {HTMLElement|null} Span element containing image icon, or null if URL invalid
   */
  function createCustomSocialIcon(iconUrl, label) {
    if (!iconUrl || typeof iconUrl !== 'string') return null;
    
    const span = document.createElement('span');
    span.className = 'social-icon';
    const img = document.createElement('img');
    img.src = iconUrl;
    img.alt = `${label} icon`;
    img.setAttribute('aria-hidden', 'true');
    img.style.width = `${ICON_CONFIG.SOCIAL_SIZE}px`;
    img.style.height = `${ICON_CONFIG.SOCIAL_SIZE}px`;
    span.appendChild(img);
    return span;
  }

  // ============================================================================
  // Scroll to Top Button
  // ============================================================================

  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    function handleScroll() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = requestAnimationFrame(handleScroll);
    }, { passive: true });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
      const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    });
  }

  // ============================================================================
  // Section Fade-in Animation on Scroll
  // ============================================================================

  function initSectionAnimations() {
    const sections = document.querySelectorAll('.section');
    
    if (sections.length === 0) return;
    
    // Create Intersection Observer for fade-in animations
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to improve performance
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all sections
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
    
    // Check if sections are already visible (for initial load)
    const checkInitialVisibility = () => {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          section.classList.add('visible');
        }
      });
    };
    
    // Run check after a short delay to ensure content is loaded
    setTimeout(checkInitialVisibility, 100);
  }
  
  // Initialize section animations after content is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSectionAnimations);
  } else {
    // If DOM is already loaded, wait for content to be applied
    setTimeout(initSectionAnimations, 500);
  }
})();
