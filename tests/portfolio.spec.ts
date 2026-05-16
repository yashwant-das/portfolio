import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Portfolio/);
  });

  test('should display all main sections', async ({ page }) => {
    const sections = [
      'about',
      'experience',
      'projects',
      'skills',
      'education',
      'certifications',
      'contact',
    ];
    for (const sectionId of sections) {
      const section = page.locator(`#${sectionId}`);
      await expect(section).toBeVisible();
    }
  });

  test('should toggle dark mode correctly', async ({ page }) => {
    const html = page.locator('html');
    const themeToggle = page.locator('#theme-toggle');

    // Initial state check
    const initialTheme = await html.getAttribute('data-theme');

    // Toggle
    await themeToggle.click();
    const toggledTheme = await html.getAttribute('data-theme');
    expect(toggledTheme).not.toBe(initialTheme);

    // Toggle back
    await themeToggle.click();
    const finalTheme = await html.getAttribute('data-theme');
    expect(finalTheme).toBe(initialTheme);
  });

  test('should render certifications from JSON', async ({ page }) => {
    const certList = page.locator('#certifications-list');
    await expect(certList).toBeVisible();

    // Check if at least one certification is rendered
    const certItems = certList.locator('.timeline-item');
    await expect(certItems.first()).toBeVisible();

    // Check for specific certification name from our mock data
    await expect(page.getByText('Professional Scrum Master I (PSM I)')).toBeVisible();
  });

  test('should have functional navigation links', async ({ page }) => {
    const navLinks = page.locator('#site-nav a');
    await expect(navLinks).toHaveCount(7); // Including certifications

    // Click 'Projects' link and check active state
    const projectsLink = page.locator('#site-nav a[href="#projects"]');
    await projectsLink.click();
    await expect(projectsLink).toHaveClass(/is-active/);
    await expect(projectsLink).toHaveAttribute('aria-current', 'page');
  });
});
