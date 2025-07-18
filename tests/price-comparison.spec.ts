import { test, expect, chromium } from '@playwright/test';

test('Compare iPhone 15 Plus price on Flipkart vs Amazon', async () => {
  // 1) Launch browser and contexts
  const browser = await chromium.launch({ headless: false });
  const flipkartContext = await browser.newContext();
  const amazonContext = await browser.newContext();
  const flipkartPage = await flipkartContext.newPage();
  const amazonPage = await amazonContext.newPage();
  const productName = 'iphone 15 plus';

  // 2) Go to both homepages in parallel
  await Promise.all([
    flipkartPage.goto('https://www.flipkart.com'),
    amazonPage.goto('https://www.amazon.in')
  ]);

  // 3) Dismiss any Flipkart login popup
  await flipkartPage.locator('button:has-text("✕")').click({ timeout: 2000 }).catch(() => {});

  // 4) Perform searches, waiting for navigation
  await flipkartPage.fill('input[name="q"]', productName);
  await Promise.all([
    flipkartPage.waitForNavigation({ waitUntil: 'load' }),
    flipkartPage.press('input[name="q"]', 'Enter')
  ]);

  await amazonPage.fill('#twotabsearchtextbox', productName);
  await Promise.all([
    amazonPage.waitForNavigation({ waitUntil: 'load' }),
    amazonPage.press('#twotabsearchtextbox', 'Enter')
  ]);

  // 5) Click first Flipkart result (may open in new tab or same tab)
  const flipkartFirstProduct = flipkartPage.getByText(new RegExp(productName, 'i')).first();
  await expect(flipkartFirstProduct).toBeVisible({ timeout: 10000 });

  // Remember how many pages we have before click
  const pagesBefore = flipkartContext.pages().length;
  await flipkartFirstProduct.click();

  // Wait a short moment for a new tab to open (if it does)
  await flipkartContext.waitForEvent('page', { timeout: 3000 }).catch(() => {});

  // Determine which page has the product
  const flipkartPages = flipkartContext.pages();
  const flipkartProductPage = flipkartPages.length > pagesBefore
    ? flipkartPages[flipkartPages.length - 1]
    : flipkartPage;

  await flipkartProductPage.waitForLoadState('domcontentloaded');

  // 6) Click first Amazon result (same tab)
  const amazonFirstProduct = amazonPage.locator(
    'div[data-component-type="s-search-result"] >> a.a-link-normal'
  ).first();
  await expect(amazonFirstProduct).toBeVisible({ timeout: 10000 });

  await Promise.all([
    amazonPage.waitForNavigation({ waitUntil: 'load' }),
    amazonFirstProduct.click()
  ]);

  // 7) Extract Flipkart price (first ₹ on the page)
  const fkPriceText = await flipkartProductPage.locator('text=₹').first().textContent({ timeout: 10000 });
  const flipkartPrice = parseFloat(fkPriceText!.replace(/[^\d.]/g, ''));

  // 8) Extract Amazon price
  const amazonWhole = await amazonPage.locator('.a-price-whole').first().textContent({ timeout: 10000 });
  const amazonFrac  = await amazonPage.locator('.a-price-fraction').first().textContent({ timeout: 10000 });
  const amazonPrice = parseFloat(`${amazonWhole!.replace(/[^\d]/g, '')}.${amazonFrac!.replace(/[^\d]/g, '')}`);

  // 9) Log and compare
  console.log(`🟦 Flipkart Price: ₹${flipkartPrice}`);
  console.log(`🟧 Amazon  Price: ₹${amazonPrice}`);

  expect(flipkartPrice).toBeGreaterThan(0);
  expect(amazonPrice).toBeGreaterThan(0);

  if (flipkartPrice < amazonPrice) {
    console.log('✅ Flipkart is cheaper.');
  } else {
    throw new Error(`❌ Test failed: Flipkart ₹${flipkartPrice} vs Amazon ₹${amazonPrice}`);
  }

  await browser.close();
});
