/**
 * apply-routes.js
 * ───────────────────────────────────────────────────────────────────────────
 * Reads the output of fetch-routes.js (tours-routed.json) and patches
 * each day in data/tours.js with a `routeCoords` property.
 *
 * The map's script.js will then use routeCoords (if present) instead of
 * the straight stop-to-stop interpolation.
 *
 * Run:  node tools/apply-routes.js
 * ───────────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const ROUTED_FILE = path.join(__dirname, 'tours-routed.json');
const TOURS_FILE  = path.join(__dirname, '..', 'data', 'tours.js');

if (!fs.existsSync(ROUTED_FILE)) {
  console.error('❌  tours-routed.json not found. Run fetch-routes.js first.');
  process.exit(1);
}

const routed = JSON.parse(fs.readFileSync(ROUTED_FILE, 'utf8'));

// Build a lookup: tourId → { dayNumber → routeCoords[] }
const lookup = {};
for (const group of routed) {
  for (const tour of group.tours) {
    lookup[tour.id] = {};
    for (const day of tour.days) {
      lookup[tour.id][day.day] = { coords: day.routeCoords, fallback: day.fallback };
    }
  }
}

// Patch tours.js by string-replacement of each day's coords block
let src = fs.readFileSync(TOURS_FILE, 'utf8');

// For each routed entry, inject routeCoords after the stops array
// Strategy: regex replace per tour+day — append routeCoords field
let patchCount = 0;

for (const [tourId, days] of Object.entries(lookup)) {
  for (const [dayNum, { coords, fallback }] of Object.entries(days)) {
    if (!coords || coords.length < 2) continue;
    const coordsJson = JSON.stringify(coords);
    const fallbackStr = fallback ? 'true' : 'false';
    const tag = `/* ORS day=${dayNum} tour=${tourId} */`;

    // Find existing tag and replace, or inject after stops block
    if (src.includes(tag)) {
      // Replace tag line AND the routeCoords line that follows it
      const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const updateRe = new RegExp(`${escapedTag}\\n[^\\n]*routeCoords:[^\\n]*`);
      src = src.replace(
        updateRe,
        `${tag}\n            routeCoords: ${coordsJson}, routeFallback: ${fallbackStr},`
      );
      patchCount++;
    } else {
      // Inject after the last stop in this day's stops array
      // We look for the day block by day number + tour id pattern
      // Simple approach: find "day: N," inside the tour section and inject after "stops: [...]"
      const dayPattern = new RegExp(
        `(id:\\s*["']${tourId}["'][\\s\\S]*?day:\\s*${dayNum},[\\s\\S]*?stops:\\s*\\[[^\\]]*\\])(,?)`,
        'g'
      );
      src = src.replace(dayPattern, (match, p1, p2) => {
        patchCount++;
        return `${p1},\n            ${tag}\n            routeCoords: ${coordsJson}, routeFallback: ${fallbackStr}${p2}`;
      });
    }
  }
}

fs.writeFileSync(TOURS_FILE, src);
console.log(`✅  Patched ${patchCount} day segments in data/tours.js`);
console.log('   Review the file, then commit and push.');
