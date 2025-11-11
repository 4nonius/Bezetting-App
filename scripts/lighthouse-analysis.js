// Script om Lighthouse analyse uit te voeren
// Gebruik: node scripts/lighthouse-analysis.js

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

async function runLighthouse() {
  console.log('Starting Lighthouse analysis...');
  
  // Launch Chrome
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
    port: chrome.port,
  };

  try {
    // Run Lighthouse
    const runnerResult = await lighthouse('http://localhost:3000', options);
    
    // Save HTML report
    const reportPath = path.join(__dirname, '../lighthouse-report.html');
    fs.writeFileSync(reportPath, runnerResult.report);
    console.log(`✅ Lighthouse report saved to: ${reportPath}`);
    
    // Extract scores
    const scores = runnerResult.lhr.categories;
    console.log('\n📊 Lighthouse Scores:');
    console.log('===================');
    console.log(`Performance: ${Math.round(scores.performance.score * 100)}`);
    console.log(`Accessibility: ${Math.round(scores.accessibility.score * 100)}`);
    console.log(`Best Practices: ${Math.round(scores['best-practices'].score * 100)}`);
    console.log(`SEO: ${Math.round(scores.seo.score * 100)}`);
    console.log(`PWA: ${Math.round(scores.pwa.score * 100)}`);
    
    // Extract metrics
    const metrics = runnerResult.lhr.audits;
    console.log('\n📈 Performance Metrics:');
    console.log('======================');
    console.log(`First Contentful Paint: ${metrics['first-contentful-paint'].displayValue}`);
    console.log(`Largest Contentful Paint: ${metrics['largest-contentful-paint'].displayValue}`);
    console.log(`Total Blocking Time: ${metrics['total-blocking-time'].displayValue}`);
    console.log(`Cumulative Layout Shift: ${metrics['cumulative-layout-shift'].displayValue}`);
    console.log(`Speed Index: ${metrics['speed-index'].displayValue}`);
    
  } catch (error) {
    console.error('❌ Error running Lighthouse:', error);
  } finally {
    await chrome.kill();
  }
}

// Check if server is running
const http = require('http');
const checkServer = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
};

// Main
(async () => {
  console.log('Checking if server is running...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ Server is not running on http://localhost:3000');
    console.log('Please run: npm start');
    process.exit(1);
  }
  
  await runLighthouse();
})();


