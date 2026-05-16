import { test, expect } from '@playwright/test';

const EXPECTED_SECTIONS = [
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'certifications',
  'contact',
];

const RESPONSIVE_VIEWPORTS = [
  { name: 'mobile-compact', width: 360, height: 800 },
  { name: 'mobile-standard', width: 390, height: 844 },
  { name: 'mobile-large', width: 430, height: 932 },
  { name: 'foldable-small-tablet', width: 600, height: 960 },
  { name: 'tablet-portrait', width: 820, height: 1180 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero-name')).toBeVisible();
  });

  test('should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/);
  });

  test('should display all main sections', async ({ page }) => {
    for (const sectionId of EXPECTED_SECTIONS) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible();
    }
  });

  test('should render the redesigned hero from portfolio data', async ({ page }) => {
    await expect(page.locator('.hero-eyebrow')).toContainText('Portfolio');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('John Doe');
    await expect(page.locator('#hero-subtitle')).toHaveText('Senior Full Stack Engineer');
    await expect(page.locator('.hero-summary')).toContainText(
      'Building the future of web applications'
    );
    await expect(page.locator('.avatar img')).toHaveAttribute('src', 'assets/avatars/avatar.svg');
    await expect(page.locator('.hero-meta')).toBeVisible();
    await expect(page.locator('#resume-link')).toBeVisible();
  });

  test('should toggle dark mode correctly', async ({ page }) => {
    const html = page.locator('html');
    const themeToggle = page.locator('#theme-toggle');

    const initialTheme = await html.getAttribute('data-theme');

    await themeToggle.click();
    const toggledTheme = await html.getAttribute('data-theme');
    expect(toggledTheme).not.toBe(initialTheme);

    await themeToggle.click();
    const finalTheme = await html.getAttribute('data-theme');
    expect(finalTheme).toBe(initialTheme);
  });

  test('should render certifications from JSON', async ({ page }) => {
    const certList = page.locator('#certifications-list');
    await expect(certList).toBeVisible();

    const certItems = certList.locator('.timeline-item');
    await expect(certItems.first()).toBeVisible();

    await expect(page.getByText('Professional Scrum Master I (PSM I)')).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    const navLinks = page.locator('#site-nav a');
    await expect(navLinks).toHaveCount(EXPECTED_SECTIONS.length);

    const projectsLink = page.locator('#site-nav a[href="#projects"]');
    await projectsLink.click();
    await expect(projectsLink).toHaveClass(/is-active/);
    await expect(projectsLink).toHaveAttribute('aria-current', 'page');
  });

  test('should open and close mobile navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await expect(page.locator('#hero-name')).toBeVisible();

    const nav = page.locator('#site-nav');
    const toggle = page.locator('#nav-toggle');

    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).not.toHaveClass(/open/);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(nav).toHaveClass(/open/);

    await nav.locator('a[href="#contact"]').click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(nav).not.toHaveClass(/open/);
  });

  test('should copy email and expose social links', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permission setup is Chromium-specific here.');

    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    const email = 'john.doe@example.com';
    await expect(page.locator('#contact-email')).toHaveAttribute('href', `mailto:${email}`);
    await expect(page.locator('#social-list a')).toHaveCount(3);

    await page.locator('#copy-email-btn').click();
    await expect(page.locator('#copy-email-btn')).toHaveClass(/copied/);
    await expect(page.locator('#copy-email-btn')).toHaveAttribute('aria-label', 'Email copied!');
    await expect(page.evaluate(() => navigator.clipboard.readText())).resolves.toBe(email);
  });

  for (const viewport of RESPONSIVE_VIEWPORTS) {
    test(`should avoid horizontal overflow at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.reload();
      await expect(page.locator('#hero-name')).toBeVisible();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBe(0);
    });
  }
});
