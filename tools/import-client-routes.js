/**
 * import-client-routes.js
 * ───────────────────────────────────────────────────────────────────────────
 * Converts client-edited GeoJSON files into tours-routed.json so that
 * apply-routes.js can patch data/tours.js with the hand-drawn routes.
 *
 * Run:  node tools/import-client-routes.js
 * Then: node tools/apply-routes.js
 * ───────────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const CLIENT_DIR  = 'D:\\Personel\\Freelance\\Fiverr\\Chingi Tours\\Trips Update\\Old filxed + new region routes';
const TOURS_PATH  = path.join(__dirname, '..', 'data', 'tours.js');
const OUT_FILE    = path.join(__dirname, 'tours-routed.json');

// ── Load tours structure ──────────────────────────────────────────────────
const toursCode   = fs.readFileSync(TOURS_PATH, 'utf8');
const patchedCode = toursCode.replace(/^\s*(const|let)\s+/gm, 'var ');
eval(patchedCode); // defines TOUR_GROUPS

// ── Map tour id → geojson filename ───────────────────────────────────────
const TOUR_FILES = {
  'adrar-short':         'Adrar short.geojson',
  'adrar-standard':      'adrar-standard.geojson',
  'adrar-extended':      'adrar-extended.geojson',
  'adrar-tagant-aoukar': 'adrar-tagant-aoukar.geojson',
  'camel-tour':          'camel-tour.geojson',
};

// ── Build output ──────────────────────────────────────────────────────────
const result = [];
let imported  = 0;
let skipped   = 0;

for (const group of TOUR_GROUPS) {
  if (group.comingSoon) continue;

  const groupOut = { id: group.id, tours: [] };

  for (const tour of group.tours) {
    const filename = TOUR_FILES[tour.id];
    if (!filename) {
      console.warn(`⚠  No client file mapped for tour: ${tour.id}`);
      continue;
    }

    const geojsonPath = path.join(CLIENT_DIR, filename);
    if (!fs.existsSync(geojsonPath)) {
      console.warn(`⚠  File not found: ${filename}`);
      continue;
    }

    const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

    // Index client LineStrings by day number
    // Handles: "6 & 7" → assigns to all mentioned days
    // Handles: day numbers beyond tour's max day → concatenates onto last valid day
    const maxTourDay = Math.max(...tour.days.map(d => d.day));
    const clientRoutes = {};
    for (const feature of geojson.features) {
      if (!feature.geometry || feature.geometry.type !== 'LineString') continue;
      const dayRaw = String(feature.properties.day || '');

      // GeoJSON coords are [lng, lat] — convert to [lat, lng] for our app
      const coords = feature.geometry.coordinates.map(([lng, lat]) => [
        Math.round(lat * 1e6) / 1e6,
        Math.round(lng * 1e6) / 1e6,
      ]);

      // Extract all day numbers mentioned (handles "6 & 7", "6", "7" etc.)
      const dayNums = [...dayRaw.matchAll(/\d+/g)].map(m => parseInt(m[0], 10));
      if (!dayNums.length) continue;

      for (const day of dayNums) {
        if (day <= maxTourDay) {
          // Assign or append to this day
          clientRoutes[day] = clientRoutes[day]
            ? [...clientRoutes[day], ...coords]
            : coords;
        } else {
          // Day exceeds tour length — concatenate onto last valid day
          console.log(`  Day ${day}: beyond tour max (${maxTourDay}), appending to day ${maxTourDay}`);
          clientRoutes[maxTourDay] = clientRoutes[maxTourDay]
            ? [...clientRoutes[maxTourDay], ...coords]
            : coords;
        }
      }
    }

    console.log(`\n▶ ${tour.name}`);
    const tourOut = { id: tour.id, days: [] };

    for (const day of tour.days) {
      const coords   = clientRoutes[day.day];
      const isStraight = !coords || coords.length <= 2;

      if (!coords) {
        // No geometry for this day (e.g. rest day) — skip, leave existing
        console.log(`  Day ${day.day}: no client route — leaving existing`);
        skipped++;
        continue;
      }

      if (isStraight) {
        console.log(`  Day ${day.day}: straight line (2 pts) — flagged as fallback`);
      } else {
        console.log(`  Day ${day.day}: ✓ ${coords.length} client coords`);
        imported++;
      }

      tourOut.days.push({
        day:         day.day,
        routeCoords: coords,
        fallback:    isStraight,
      });
    }

    groupOut.tours.push(tourOut);
  }

  result.push(groupOut);
}

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));

console.log(`\n✅  Done.`);
console.log(`   Imported  : ${imported} client-drawn routes`);
console.log(`   Skipped   : ${skipped} days (no geometry — existing routes preserved)`);
console.log(`   Output    : ${OUT_FILE}`);
console.log('\nNext: run  node tools/apply-routes.js  to patch data/tours.js');
