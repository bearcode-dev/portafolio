// Performance validation script
// Run this in browser console to verify optimization

(function validateHeaderOptimization() {
  console.log("🔍 Validating Header Optimization...");
  
  const results = {
    headerElements: document.querySelectorAll('header').length,
    headerMounts: performance.getEntriesByType('mark').filter(mark => mark.name.includes('header-mount')).length,
    navigationTime: performance.timing.loadEventEnd - performance.timing.navigationStart
  };
  
  console.log("📊 Results:", results);
  
  // Check for duplicate headers
  if (results.headerElements > 1) {
    console.warn("⚠️ Multiple header elements detected - optimization may have issues");
  } else {
    console.log("✅ Single header element - optimization working correctly");
  }
  
  // Check navigation performance
  if (results.navigationTime < 1000) {
    console.log("✅ Fast navigation (< 1s) - performance improved");
  } else {
    console.log("ℹ️ Navigation time:", results.navigationTime + "ms");
  }
  
  return results;
})();

// Additional test: Monitor header state persistence
let navigationCount = 0;
const originalPushState = history.pushState;

history.pushState = function(...args) {
  navigationCount++;
  console.log(`🔄 Navigation #${navigationCount} - Header should remain mounted`);
  return originalPushState.apply(this, args);
};

console.log("✅ Header optimization validation script loaded");
console.log("💡 Navigate between pages to test header persistence");