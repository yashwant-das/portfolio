export const DEBUG = window.location.search.includes('debug=true');

export function debugLog(...args: unknown[]) {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
}

export function handleError(
  error: Error | string | unknown,
  context: string = '',
  fallback: unknown = null
): unknown {
  const message = context
    ? `${context}: ${error instanceof Error ? error.message : String(error)}`
    : error instanceof Error
      ? error.message
      : String(error);
  console.error('[ERROR]', message, error instanceof Error ? error : '');
  return fallback;
}

export function prefersReducedMotion(): boolean {
  const query = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  return !!(query && query.matches);
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string = '',
  textContent: string = ''
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}
