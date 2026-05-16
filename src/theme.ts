import { debugLog, handleError } from './utils.js';

const THEME_CONFIG = {
  VALID_THEMES: ['light', 'dark'],
  STORAGE_KEY: 'theme',
  DEFAULT_THEME: 'light',
};

const root = document.documentElement;

const themeStorage = (() => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
  try {
    const probe = '__theme-probe__';
    localStorage.setItem(probe, probe);
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return null;
  }
})();

function getSystemPreference(): string {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return THEME_CONFIG.DEFAULT_THEME;
}

function hasManualPreference(): boolean {
  if (!themeStorage) return false;
  return themeStorage.getItem(THEME_CONFIG.STORAGE_KEY + '_manual') === 'true';
}

function setTheme(mode: string, isManual = false) {
  if (!THEME_CONFIG.VALID_THEMES.includes(mode)) {
    debugLog(`Invalid theme: ${mode}. Defaulting to '${THEME_CONFIG.DEFAULT_THEME}'`);
    mode = THEME_CONFIG.DEFAULT_THEME;
  }

  root.setAttribute('data-theme', mode);

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', mode === 'dark' ? '#000000' : '#ffffff');
  }

  if (themeStorage) {
    try {
      themeStorage.setItem(THEME_CONFIG.STORAGE_KEY, mode);
      if (isManual) {
        const systemPref = getSystemPreference();
        if (mode === systemPref) {
          themeStorage.removeItem(THEME_CONFIG.STORAGE_KEY + '_manual');
          debugLog('Manual selection matches system preference, clearing manual flag');
        } else {
          themeStorage.setItem(THEME_CONFIG.STORAGE_KEY + '_manual', 'true');
        }
      } else {
        themeStorage.removeItem(THEME_CONFIG.STORAGE_KEY + '_manual');
      }
    } catch (err) {
      handleError(err, 'Failed to save theme preference');
    }
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const isDark = mode === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

export function initTheme() {
  const storedTheme = themeStorage ? themeStorage.getItem(THEME_CONFIG.STORAGE_KEY) : null;
  const hasManual = hasManualPreference();
  const systemPreference = getSystemPreference();

  const initThemeValue = hasManual && storedTheme ? storedTheme : systemPreference;
  setTheme(initThemeValue, hasManual);

  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (!hasManualPreference()) {
        const newPreference = e.matches ? 'dark' : THEME_CONFIG.DEFAULT_THEME;
        setTheme(newPreference, false);
        debugLog('System preference changed to:', newPreference);
      }
    };

    if (colorSchemeQuery.addEventListener) {
      colorSchemeQuery.addEventListener('change', onChange);
    } else if ('addListener' in colorSchemeQuery) {
      (colorSchemeQuery as MediaQueryList).addListener(onChange);
    }
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const next = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  }
}
