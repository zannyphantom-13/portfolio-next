import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const sites = [
  { slug: 'vista-real-estate', url: 'https://vista-real-estate.onrender.com/' },
  { slug: 'bella-cucina', url: 'https://restaurant-website-kappa-jade.vercel.app/' },
  { slug: 'sharp-edge-barbershop', url: 'https://sharp-edge.onrender.com/' },
  { slug: 'common-finds-lts', url: 'https://common-find-lts.onrender.com/' },
  { slug: 'florida-roof-design', url: 'https://floridaroofdesign.onrender.com/' },
  { slug: 'zealmart-world', url: 'https://www.zealmartworld.com.ng/' },
  { slug: 'jd-good-hair', url: 'https://jd-goodhair.com.ng/' },
  { slug: 'the-electric-plug', url: 'https://www.theelectricplug.com/' },
  { slug: 'lg-trusted-edge', url: 'https://www.lgtrustedge.com.ng/' },
  { slug: 'skillift-services', url: 'https://www.skiliftservices.com/en' },
  { slug: 'mac-christar-limited', url: 'https://www.mac-christarlimited.com/' },
  { slug: 'mayjay-electronics', url: 'https://www.mayjay-electronics.com.ng/' }
];

const outDir = path.join(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
  // After scrolling back to top, wait for lazy images to fully load
  await new Promise(r => setTimeout(r, 3000));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const site of sites) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    // Pretend to be a real browser to avoid bot detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Navigating to ${site.url}...`);
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 45000 });

      // Dismiss any popups or cookie banners
      try {
        await page.keyboard.press('Escape');
      } catch {}

      // Auto-scroll to trigger lazy loading of all images
      await autoScroll(page);

      // Wait for all images to fully load
      await page.evaluate(async () => {
        const images = Array.from(document.images);
        await Promise.all(
          images
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve;
            }))
        );
      });

      // Capture only the viewport (above the fold) for a clean hero shot
      const filePath = path.join(outDir, `${site.slug}.png`);
      await page.screenshot({ path: filePath, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: 900 } });
      console.log(`✅ Saved screenshot for ${site.slug}`);
    } catch (err) {
      console.error(`❌ Failed ${site.slug}: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('\nDone!');
})();
