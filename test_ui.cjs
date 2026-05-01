const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Navigate to bookings page
  await page.goto('http://localhost:4000/admin/bookings', { waitUntil: 'networkidle0' });
  
  console.log("Page loaded");

  // Wait for the button
  try {
    await page.waitForSelector('button[title="Confirm Booking"]', { timeout: 5000 });
    console.log("Found Confirm Booking button.");
    
    // Click it
    await page.click('button[title="Confirm Booking"]');
    console.log("Clicked Confirm Booking button.");
    
    // Wait for modal to appear (textarea should be visible)
    await page.waitForSelector('textarea', { timeout: 3000 });
    console.log("Modal opened successfully.");
    
    await page.screenshot({ path: 'modal_success.png' });
  } catch (e) {
    console.log("Error:", e.message);
    await page.screenshot({ path: 'error.png' });
  }

  await browser.close();
})();
