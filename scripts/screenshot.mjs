import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Manual definition since we can't easily import from lib/data.js in this pure Node script without transpilation
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

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const site of sites) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    console.log(`Navigating to ${site.url}...`);
    try {
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });
      // Give it a second to run animations
      await new Promise(r => setTimeout(r, 2000));
      
      const filePath = path.join(outDir, `${site.slug}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved screenshot for ${site.slug}`);
    } catch (err) {
      console.error(`Failed to screenshot ${site.slug}: ${err.message}`);
    }
    await page.close();
  }
  await browser.close();
  console.log('Done!');
})();
