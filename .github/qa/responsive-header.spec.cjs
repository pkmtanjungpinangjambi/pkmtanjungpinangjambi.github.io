const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'https://pkmtanjungpinangjambi.vercel.app';

const pages = [
  '/',
  '/profil.html',
  '/pelayanan.html',
  '/informasi.html',
  '/jadwal.html',
  '/tarif.html',
  '/kontak.html',
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet-landscape', width: 1024, height: 768 },
  { name: 'tablet-portrait', width: 768, height: 1024 },
  { name: 'mobile-large', width: 480, height: 900 },
  { name: 'mobile-small', width: 390, height: 844 },
];

for (const viewport of viewports) {
  test.describe(`${viewport.name} ${viewport.width}x${viewport.height}`, () => {
    for (const path of pages) {
      test(`header fits without horizontal overflow on ${path}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const response = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' });
        expect(response, `No response for ${BASE_URL}${path}`).not.toBeNull();
        expect(response.status(), `HTTP error on ${path}`).toBeLessThan(400);

        const result = await page.evaluate(() => {
          const header = document.querySelector('.site-header');
          const nav = document.querySelector('.nav');
          const toggle = document.querySelector('.nav-toggle');
          const brand = document.querySelector('.site-header .brand');
          const html = document.documentElement;

          const rect = (element) => {
            if (!element) return null;
            const box = element.getBoundingClientRect();
            return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height };
          };

          const visible = (element) => {
            if (!element) return false;
            const style = getComputedStyle(element);
            const box = element.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0;
          };

          const describeOverflow = (element) => ({
            tag: element.tagName,
            id: element.id || '',
            className: typeof element.className === 'string' ? element.className : '',
            text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
            rect: rect(element),
          });

          const headerElements = [...document.querySelectorAll('.site-header, .site-header *')]
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return box.width > 0 && box.height > 0 && (box.left < -1 || box.right > window.innerWidth + 1);
            })
            .slice(0, 20)
            .map(describeOverflow);

          const documentElements = [...document.querySelectorAll('body *')]
            .filter((element) => {
              const box = element.getBoundingClientRect();
              return box.width > 0 && box.height > 0 && (box.left < -1 || box.right > window.innerWidth + 1);
            })
            .sort((a, b) => {
              const ar = a.getBoundingClientRect();
              const br = b.getBoundingClientRect();
              return Math.max(Math.abs(br.left), Math.abs(br.right - window.innerWidth)) -
                Math.max(Math.abs(ar.left), Math.abs(ar.right - window.innerWidth));
            })
            .slice(0, 10)
            .map(describeOverflow);

          const interactiveOverflow = [...document.querySelectorAll('.nav a, .nav button')]
            .filter((element) => visible(element))
            .map((element) => ({
              text: element.textContent.trim(),
              rect: rect(element),
            }))
            .filter((item) => item.rect.left < -1 || item.rect.right > window.innerWidth + 1);

          return {
            scrollWidth: html.scrollWidth,
            clientWidth: html.clientWidth,
            header: rect(header),
            brand: rect(brand),
            navVisible: visible(nav),
            toggleVisible: visible(toggle),
            toggleRect: rect(toggle),
            headerElements,
            documentElements,
            interactiveOverflow,
          };
        });

        expect(
          result.scrollWidth,
          `Document overflows horizontally on ${path} (scrollWidth=${result.scrollWidth}, clientWidth=${result.clientWidth}; offenders=${JSON.stringify(result.documentElements)})`,
        ).toBeLessThanOrEqual(result.clientWidth + 2);
        expect(result.header).not.toBeNull();
        expect(result.brand).not.toBeNull();
        expect(result.brand.left, `Header brand starts off-screen on ${path}`).toBeGreaterThanOrEqual(-1);
        expect(result.brand.right, `Header brand extends beyond viewport on ${path}`).toBeLessThanOrEqual(viewport.width + 1);
        expect(
          result.headerElements,
          `Header children overflow on ${path}: ${JSON.stringify(result.headerElements)}`,
        ).toHaveLength(0);
        expect(
          result.interactiveOverflow,
          `Navigation controls overflow on ${path}: ${JSON.stringify(result.interactiveOverflow)}`,
        ).toHaveLength(0);

        if (result.toggleVisible) {
          expect(result.toggleRect).not.toBeNull();
          expect(result.toggleRect.width, `Menu toggle is too small on ${path}`).toBeGreaterThanOrEqual(40);
          expect(result.toggleRect.height, `Menu toggle is too small on ${path}`).toBeGreaterThanOrEqual(40);

          const toggle = page.locator('.nav-toggle').first();
          await toggle.click();
          await expect(page.locator('.nav.open')).toBeVisible();
          await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        }
      });
    }
  });
}

// One focused interaction test per responsive mode prevents regressions in
// the dropdown behavior without requiring visual changes to the existing UI.
for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`dropdown caret interaction remains usable at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const response = await page.goto(`${BASE_URL}/profil.html`, { waitUntil: 'load' });
    expect(response.status()).toBeLessThan(400);

    const toggle = page.locator('.nav-toggle').first();
    if (await toggle.isVisible()) {
      await toggle.click();
      await expect(page.locator('.nav.open')).toBeVisible();
    }

    const caret = page.locator('.nav .dropdown-caret-btn').first();
    await expect(caret).toBeVisible();
    await caret.click();
    await expect(caret).toHaveAttribute('aria-expanded', 'true');
    await expect(caret.locator('..')).toHaveClass(/open/);
  });
}
