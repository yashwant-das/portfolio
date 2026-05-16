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
  
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const SOCIAL_ICON_PATHS = {
    github: '<path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.292 3.438 9.787 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.082-.729.082-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.235-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.553 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.839 1.233 1.911 1.233 3.221 0 4.61-2.804 5.624-5.476 5.921.43.371.823 1.104.823 2.226 0 1.606-.014 2.898-.014 3.293 0 .32.216.694.825.576C20.565 22.08 24 17.584 24 12.297 24 5.67 18.627.297 12 .297Z"/>',
    linkedin: '<path d="M22.225 0H1.771A1.77 1.77 0 0 0 0 1.771v20.452A1.77 1.77 0 0 0 1.771 24h20.452A1.77 1.77 0 0 0 24 22.223V1.771A1.77 1.77 0 0 0 22.225 0ZM7.12 20.452H3.555V9h3.565v11.452ZM5.339 7.433a2.063 2.063 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125Zm15.108 13.019h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.372-1.852 3.604 0 4.27 2.372 4.27 5.459v6.284Z"/>',
    medium: '<path d="M2.01 6.3c.02-.2-.057-.4-.205-.53L0 4.08V3.78h6.261l4.775 10.483L14.9 3.78H21l-.002.3-1.6 1.53a.322.322 0 0 0-.12.31v10.72a.322.322 0 0 0 .12.31l1.56 1.53V18h-7.62v-.29l1.62-1.58c.16-.16.16-.21.16-.44V8.96l-4.5 9.06h-.61L5.04 8.96v6.03c-.04.32.06.64.29.87l2.11 2.56v.29H0v-.29l2.11-2.56c.225-.23.33-.55.27-.87V6.3Z"/>',
    x: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
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
   * Gets the system preference for color scheme
   * @returns {string} 'dark' or 'light'
   */
  function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return THEME_CONFIG.DEFAULT_THEME;
  }

  /**
   * Checks if user has manually set a theme preference
   * @returns {boolean} True if user has manually set preference
   */
  function hasManualPreference() {
    if (!themeStorage) return false;
    return themeStorage.getItem(THEME_CONFIG.STORAGE_KEY + '_manual') === 'true';
  }

  /**
   * Sets the theme (light/dark mode)
   * @param {string} mode - Theme mode ('light' or 'dark')
   * @param {boolean} isManual - Whether this is a manual user selection (default: false)
   */
  function setTheme(mode, isManual = false) {
    // Validate theme mode
    if (!THEME_CONFIG.VALID_THEMES.includes(mode)) {
      debugLog(`Invalid theme: ${mode}. Defaulting to '${THEME_CONFIG.DEFAULT_THEME}'`);
      mode = THEME_CONFIG.DEFAULT_THEME;
    }

    root.setAttribute('data-theme', mode);
    
    // Update theme-color meta tag for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', mode === 'dark' ? '#000000' : '#ffffff');
    }
    
    // Persist theme preference and manual flag
    if (themeStorage) {
      try {
        themeStorage.setItem(THEME_CONFIG.STORAGE_KEY, mode);
        if (isManual) {
          // Check if manual selection matches system preference - if so, clear manual flag
          // This allows users to revert to automatic mode by selecting the system preference
          const systemPref = getSystemPreference();
          if (mode === systemPref) {
            themeStorage.removeItem(THEME_CONFIG.STORAGE_KEY + '_manual');
            debugLog('Manual selection matches system preference, clearing manual flag');
          } else {
            themeStorage.setItem(THEME_CONFIG.STORAGE_KEY + '_manual', 'true');
          }
        } else {
          // Clear manual flag when updating automatically (system preference change)
          themeStorage.removeItem(THEME_CONFIG.STORAGE_KEY + '_manual');
        }
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

  // Initialize theme with system preference detection
  const storedTheme = themeStorage ? themeStorage.getItem(THEME_CONFIG.STORAGE_KEY) : null;
  const hasManual = hasManualPreference();
  const systemPreference = getSystemPreference();
  
  // Use stored theme if user has manually set it, otherwise use system preference
  const initTheme = hasManual && storedTheme ? storedTheme : systemPreference;
  setTheme(initTheme, hasManual);

  // Listen for system preference changes
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Use addEventListener if available (modern browsers), fallback to addListener
    if (colorSchemeQuery.addEventListener) {
      colorSchemeQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!hasManualPreference()) {
          const newPreference = e.matches ? 'dark' : THEME_CONFIG.DEFAULT_THEME;
          setTheme(newPreference, false);
          debugLog('System preference changed to:', newPreference);
        }
      });
    } else if (colorSchemeQuery.addListener) {
      // Fallback for older browsers
      colorSchemeQuery.addListener((e) => {
        if (!hasManualPreference()) {
          const newPreference = e.matches ? 'dark' : THEME_CONFIG.DEFAULT_THEME;
          setTheme(newPreference, false);
          debugLog('System preference changed to:', newPreference);
        }
      });
    }
  }

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(next, true); // Mark as manual selection
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

  // Show loading skeletons before fetching content
  showLoadingSkeletons();
  
  // Fetch content from Contentful CMS
  fetchContent();

  // ============================================================================
  // Image Optimization Utilities
  // ============================================================================


  // ============================================================================
  // Content Fetching
  // ============================================================================

  /**
   * Fetches portfolio data from local JSON file
   * @returns {Promise<void>}
   */
  async function fetchContent() {
    try {
      const res = await fetch('data/content.json', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`Failed to load data/portfolio-data.json: ${res.status}`);
      }
      const data = await res.json();
      debugLog('Portfolio data loaded successfully:', data);
      applyContent(data);
    } catch (err) {
      handleError(err, 'Failed to load portfolio data. Content may not display correctly');
      // Hide skeletons even on error so users can see the error state
      hideLoadingSkeletons();
    }
  }


  // ============================================================================
  // Content Application
  // ============================================================================

  /**
   * Shows loading skeleton screens
   */
  function showLoadingSkeletons() {
    const skeletons = document.querySelectorAll('.loading-container');
    skeletons.forEach(skeleton => {
      skeleton.classList.remove('hidden');
    });
  }

  /**
   * Hides loading skeleton screens
   */
  function hideLoadingSkeletons() {
    const skeletons = document.querySelectorAll('.loading-container');
    skeletons.forEach(skeleton => {
      skeleton.classList.add('hidden');
    });
  }

  /**
   * Applies portfolio data to the DOM
   * @param {Object} data - Portfolio data object
   */
  function applyContent(data) {
    // Hide loading skeletons first, even if data is invalid
    hideLoadingSkeletons();
    
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
    if (data.resume && typeof data.resume === 'string' && data.resume.trim()) {
      const resumeLink = document.getElementById('resume-link');
      if (resumeLink) {
        resumeLink.href = data.resume;
        resumeLink.removeAttribute('style');
      }
    }

    // Avatar - always show image, set alt text if name exists
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg) {
      avatarImg.style.display = '';
      if (data.name) {
        avatarImg.alt = `Portrait of ${data.name}`;
      } else {
        avatarImg.alt = 'Profile photo';
      }
    }

    // About
    const aboutBody = document.getElementById('about-body');
    if (aboutBody) {
      // Only update if the field exists in data (handles partial updates gracefully)
      if ('about' in data) {
        aboutBody.textContent = data.about || '';
      }
    }

    // Experience
    const experienceList = document.getElementById('experience-list');
    if (experienceList && 'experience' in data) {
      // Only clear if we have valid data to populate, or if explicitly empty/null
      if (Array.isArray(data.experience) && data.experience.length > 0) {
        experienceList.innerHTML = '';
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

          // Render highlights based on format (list or paragraphs)
          if (exp.highlights && exp.highlights.length > 0) {
            const ul = document.createElement('ul');
            ul.className = 'highlights';
            exp.highlights.forEach(h => {
              const liH = document.createElement('li');
              liH.textContent = h;
              ul.appendChild(liH);
            });
            li.appendChild(ul);
          }
          experienceList.appendChild(li);
        });
      } else {
        // Field exists but is empty/null - clear to allow hideEmptySections to detect it
        experienceList.innerHTML = '';
      }
    }

    // Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && 'projects' in data) {
      // Only clear if we have valid data to populate, or if explicitly empty/null
      if (Array.isArray(data.projects) && data.projects.length > 0) {
        projectsGrid.innerHTML = '';
        data.projects.forEach(p => {
          const card = document.createElement('article');
          card.className = 'project-card';
          const h3 = document.createElement('h3'); h3.textContent = p.title || '';
          const desc = document.createElement('p'); desc.textContent = p.description || '';
          const tags = document.createElement('ul'); tags.className = 'tags';
          // Sort tags alphabetically
          const sortedTags = Array.isArray(p.tags) 
            ? [...p.tags].sort((a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: 'base' }))
            : [];
          sortedTags.forEach(t => { const li = document.createElement('li'); li.textContent = t; tags.appendChild(li); });
          const linkNodes = [];
          if (p.live) {
            const a = document.createElement('a');
            a.href = p.live;
            a.setAttribute('aria-label', 'Live demo');
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
            // Add external link icon
            const icon = document.createElementNS(SVG_NS, 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('width', '16');
            icon.setAttribute('height', '16');
            icon.setAttribute('aria-hidden', 'true');
            icon.innerHTML = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';
            const text = document.createElement('span');
            text.className = 'link-text';
            text.textContent = 'Live Demo';
            a.appendChild(icon);
            a.appendChild(text);
            linkNodes.push(a);
          }
          if (p.code) {
            const a = document.createElement('a');
            a.href = p.code;
            a.setAttribute('aria-label', 'Source code');
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
            // Add code icon
            const icon = document.createElementNS(SVG_NS, 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('width', '16');
            icon.setAttribute('height', '16');
            icon.setAttribute('aria-hidden', 'true');
            icon.innerHTML = '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>';
            const text = document.createElement('span');
            text.className = 'link-text';
            text.textContent = 'Source Code';
            a.appendChild(icon);
            a.appendChild(text);
            linkNodes.push(a);
          }
          card.append(h3, desc, tags);
          if (linkNodes.length) {
            const links = document.createElement('div');
            links.className = 'links';
            linkNodes.forEach(node => links.appendChild(node));
            card.appendChild(links);
          }
          projectsGrid.appendChild(card);
        });
      } else {
        // Field exists but is empty/null - clear to allow hideEmptySections to detect it
        projectsGrid.innerHTML = '';
      }
    }

    // Skills - Categorized
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && 'skills' in data) {
      skillsContainer.innerHTML = '';
      // Only populate if skills data exists and has entries
      if (data.skills && (
        (Array.isArray(data.skills) && data.skills.length > 0) ||
        (typeof data.skills === 'object' && Object.keys(data.skills).length > 0)
      )) {
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
    }

    // Education
    const educationList = document.getElementById('education-list');
    if (educationList && 'education' in data) {
      // Only clear if we have valid data to populate, or if explicitly empty/null
      if (Array.isArray(data.education) && data.education.length > 0) {
        educationList.innerHTML = '';
        data.education.forEach(ed => {
          const li = document.createElement('li');
          const degree = document.createElement('span'); degree.className = 'degree'; degree.textContent = ed.degree || '';
          const school = document.createElement('span'); school.className = 'school'; school.textContent = ed.school || '';
          const period = document.createElement('span'); period.className = 'period'; period.textContent = ed.period || '';
          li.append(degree, school, period);
          educationList.appendChild(li);
        });
      } else {
        // Field exists but is empty/null - clear to allow hideEmptySections to detect it
        educationList.innerHTML = '';
      }
    }

    // Avatar - optimize for LCP
    if (data.avatar) {
      const img = document.querySelector('.avatar img');
      if (img) {
        img.src = data.avatar;
        // Set fetchPriority for modern browsers (with fallback)
        if ('fetchPriority' in img) {
          img.fetchPriority = 'high';
        }
      }
    }

    // Name, subtitle, and hero summary
    if (data.name) {
      const el = document.getElementById('hero-name');
      if (el) {
        el.textContent = data.name;
        el.removeAttribute('style');
      }
    }
    if (data.subtitle) {
      const el = document.getElementById('hero-subtitle');
      if (el) {
        el.textContent = data.subtitle;
        el.removeAttribute('style');
      }
    }
    if (data.heroSummary) {
      const el = document.querySelector('.hero-summary');
      if (el) {
        el.textContent = data.heroSummary;
        el.removeAttribute('style');
      }
    }
    // Show hero CTA buttons if we have hero content or a resume link
    const hasHeroContent = !!(data.name || data.subtitle || data.heroSummary);
    const hasResume = !!(data.resume && typeof data.resume === 'string' && data.resume.trim());
    if (hasHeroContent || hasResume) {
      const heroCta = document.querySelector('.hero-cta');
      if (heroCta) {
        heroCta.removeAttribute('style');
      }
    }

    // Contact and socials
    // Hide contact skeleton and show contact card when content is loaded
    const contactSkeleton = document.getElementById('contact-skeleton');
    const contactCard = document.querySelector('.contact-card');
    if (contactSkeleton) {
      contactSkeleton.classList.add('hidden');
    }
    if (contactCard) {
      contactCard.removeAttribute('style');
    }
    
    if (data.email) {
      const emailBtn = document.getElementById('contact-email');
      const emailText = document.getElementById('contact-email-text');
      if (emailBtn) {
        emailBtn.href = `mailto:${data.email}`;
        emailBtn.setAttribute('aria-label', `Send email to ${data.email}`);
      }
      if (emailText) {
        emailText.textContent = data.email;
      }
      
      // Initialize copy-to-clipboard functionality
      initCopyEmail(data.email);
    }
    // Handle social links
    const ul = document.getElementById('social-list');
    const socialSection = ul ? ul.closest('.social-section') : null;
    const socialIntro = socialSection ? socialSection.querySelector('.social-intro') : null;
    
    if (data.socials && typeof data.socials === 'object') {
      if (ul) {
        ul.innerHTML = '';
        for (const [label, href] of Object.entries(data.socials)) {
          if (!href) continue;
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = href;
          a.setAttribute('aria-label', label);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          
          const iconNode = createSocialIcon(label);
          if (iconNode) a.appendChild(iconNode);
          
          const textNode = document.createElement('span');
          textNode.className = 'social-label';
          textNode.textContent = label;
          a.appendChild(textNode);
          li.appendChild(a);
          ul.appendChild(li);
        }
        
        // Show/hide social section based on whether there are links
        if (ul.childElementCount > 0) {
          if (socialSection) socialSection.style.display = '';
          if (socialIntro) socialIntro.style.display = '';
        } else {
          if (socialSection) socialSection.style.display = 'none';
          if (socialIntro) socialIntro.style.display = 'none';
        }
      }
    } else {
      // Hide social section if no social links
      if (socialSection) socialSection.style.display = 'none';
      if (socialIntro) socialIntro.style.display = 'none';
      if (ul) ul.style.display = 'none';
    }
    
    // Hide sections that don't have content
    hideEmptySections(data);
  }

  /**
   * Hides sections that don't have content and their corresponding navigation links
   * @param {Object} data - Portfolio data object
   */
  function hideEmptySections(data) {
    if (!data || typeof data !== 'object') return;
    
    // Map of section IDs to their content check functions
    const sectionChecks = {
      'about': () => {
        const aboutBody = document.getElementById('about-body');
        return aboutBody && aboutBody.textContent && aboutBody.textContent.trim().length > 0;
      },
      'experience': () => {
        const experienceList = document.getElementById('experience-list');
        return experienceList && experienceList.children.length > 0;
      },
      'projects': () => {
        const projectsGrid = document.getElementById('projects-grid');
        return projectsGrid && projectsGrid.children.length > 0;
      },
      'skills': () => {
        const skillsContainer = document.getElementById('skills-container');
        return skillsContainer && skillsContainer.children.length > 0;
      },
      'education': () => {
        const educationList = document.getElementById('education-list');
        return educationList && educationList.children.length > 0;
      }
      // Note: 'contact' section is always shown
    };
    
    // Hide sections and their nav links if they have no content
    Object.entries(sectionChecks).forEach(([sectionId, hasContent]) => {
      const section = document.getElementById(sectionId);
      const navLink = document.querySelector(`#site-nav a[href="#${sectionId}"]`);
      
      if (!hasContent()) {
        // Hide the section
        if (section) {
          section.style.display = 'none';
        }
        // Hide the navigation link
        if (navLink && navLink.parentElement) {
          navLink.parentElement.style.display = 'none';
        }
      } else {
        // Ensure section and nav link are visible if they have content
        if (section) {
          section.style.display = '';
        }
        if (navLink && navLink.parentElement) {
          navLink.parentElement.style.display = '';
        }
      }
    });
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
   * Scrolls to a section smoothly or instantly, accounting for fixed header
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
    // Use scroll-margin-top from CSS, but also calculate offset for better control
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 72; // Fallback to CSS variable value
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: behavior
    });
  }

  /**
   * Checks if user prefers reduced motion
   * @returns {boolean} True if reduced motion is preferred
   */
  function prefersReducedMotion() {
    return !!(reduceMotionQuery && reduceMotionQuery.matches);
  }

  /**
   * Initializes copy-to-clipboard functionality for email
   * @param {string} email - Email address to copy
   */
  function initCopyEmail(email) {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn || !email) return;

    copyBtn.addEventListener('click', async () => {
      try {
        // Use modern Clipboard API if available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Show visual feedback - toggle icons
        copyBtn.classList.add('copied');
        copyBtn.setAttribute('aria-label', 'Email copied!');
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.setAttribute('aria-label', 'Copy email address');
        }, 2000);

        debugLog('Email copied to clipboard:', email);
      } catch (err) {
        handleError(err, 'Failed to copy email to clipboard');
        // Fallback: show email in alert if copy fails
        alert(`Email: ${email}`);
      }
    });

    // Keyboard support
    copyBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyBtn.click();
      }
    });
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
