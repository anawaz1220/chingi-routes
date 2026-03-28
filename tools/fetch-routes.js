/**
 * fetch-routes.js
 * ───────────────────────────────────────────────────────────────────────────
 * Pre-computes road-following route geometries using OpenRouteService (ORS).
 * Outputs a tours-routed.js file that mirrors tours.js but with a `routeCoords`
 * array per day — ready to drop into the main app.
 *
 * SETUP:
 *   1. Get a free API key at https://openrouteservice.org/dev/#/login
 *   2. Replace ORS_API_KEY below (or set env var: ORS_API_KEY=your_key)
 *   3. Run:  node tools/fetch-routes.js
 *
 * OUTPUT:
 *   tools/tours-routed.json  — JSON with routeCoords per day segment
 *
 * NOTES:
 *   - ORS free tier: 2 000 requests/day, 40 requests/minute.
 *   - Profile "driving-car" is used for paved road sections.
 *   - If ORS cannot find a route (off-road desert / train track), the script
 *     falls back to straight-line coords and flags the segment as "fallback".
 *   - Review fallback segments manually before deploying.
 * ───────────────────────────────────────────────────────────────────────────
 */

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

// ── Config ────────────────────────────────────────────────────────────────

const ORS_API_KEY = process.env.ORS_API_KEY || 'YOUR_ORS_API_KEY_HERE';
const ORS_PROFILE = 'driving-car';                 // or 'foot-walking'
const DELAY_MS    = 1600;                          // ~37 req/min (stay under 40)
const OUT_FILE    = path.join(__dirname, 'tours-routed.json');

// ── Segments that are NOT drivable roads — skip ORS, keep straight line ──
// Format: "tourId|dayIndex"  (dayIndex = 0-based)
const FORCE_STRAIGHT = new Set([
  // Iron ore train — no road routing possible
  'adrar-short|2',          // Day 3: Chinguetti → Choum → Nouadhibou (train)
  'adrar-standard|5',       // Day 6: Ben Aicha → Choum Tunnel → Choum → Nouadhibou
  'adrar-extended|11',      // Day 12: Choum Tunnel → Choum → Nouadhibou
  'adrar-tagant-aoukar|13', // Day 14: Choum Tunnel → Choum → Nouadhibou
  // Deep desert / camel tracks — ORS unlikely to have data
  'adrar-extended|4',       // Day 5: Jraif → Sebkha Chemchane → El Beyyed → Rak
  'adrar-extended|5',       // Day 6: Bir Ziri → El Ghallaouiya → Trig Sbil
  'camel-tour|1',           // Day 2: Tifoujar Pass → Singing Dune
  'camel-tour|2',           // Day 3: Toungad → Zweigiya
  'camel-tour|3',           // Day 4: Terjit → Pass Tourvine
  'camel-tour|4',           // Day 5: Ichiv
  'camel-tour|5',           // Day 6: Ichiv rest
  'camel-tour|6',           // Day 7: Mhaireth → Zarga Desert
]);

// ── Helpers ───────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Calls ORS Directions API.
 * coords: [[lat,lng], [lat,lng], ...]  (ORS wants [lng,lat])
 * Returns decoded LineString coordinate array [[lat,lng],...] or null on error.
 */
function orsRoute(coords) {
  return new Promise((resolve) => {
    // ORS expects [lng, lat]
    const waypoints = coords.map(([lat, lng]) => [lng, lat]);

    const body = JSON.stringify({
      coordinates: waypoints,
      instructions: false,
      geometry_simplify: false
    });

    const options = {
      hostname: 'api.openrouteservice.org',
      path: `/v2/directions/${ORS_PROFILE}/geojson`,
      method: 'POST',
      headers: {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.features && json.features[0]) {
            // GeoJSON coords are [lng, lat] — convert back to [lat, lng]
            const raw = json.features[0].geometry.coordinates;
            resolve(raw.map(([lng, lat]) => [
              Math.round(lat * 1e6) / 1e6,
              Math.round(lng * 1e6) / 1e6
            ]));
          } else {
            console.warn('  ⚠ ORS returned no route:', json.error || data.slice(0, 120));
            resolve(null);
          }
        } catch (e) {
          console.warn('  ⚠ ORS parse error:', e.message);
          resolve(null);
        }
      });
    });

    req.on('error', (e) => {
      console.warn('  ⚠ ORS request error:', e.message);
      resolve(null);
    });

    req.write(body);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (ORS_API_KEY === 'YOUR_ORS_API_KEY_HERE') {
    console.error('❌  Set your ORS API key in ORS_API_KEY or as env var.');
    process.exit(1);
  }

  // Load tours data
  const toursPath = path.join(__dirname, '..', 'data', 'tours.js');
  const toursCode = fs.readFileSync(toursPath, 'utf8');
  // Replace const/let with var so eval leaks into this scope
  const patchedCode = toursCode.replace(/^\s*(const|let)\s+/gm, 'var ');
  // eslint-disable-next-line no-eval
  eval(patchedCode);  // defines TOUR_GROUPS in this scope

  const result = [];
  let totalSegments = 0;
  let routedCount   = 0;
  let fallbackCount = 0;

  for (const group of TOUR_GROUPS) {
    if (group.comingSoon) continue;

    const groupOut = { id: group.id, tours: [] };

    for (const tour of group.tours) {
      console.log(`\n▶ ${tour.name}`);
      const tourOut = { id: tour.id, days: [] };
      let prevCoord = null;

      for (let di = 0; di < tour.days.length; di++) {
        const day = tour.days[di];
        const stopCoords = day.stops.map(s => s.coords);
        if (!stopCoords.length) { tourOut.days.push({ day: day.day, routeCoords: [], fallback: false }); continue; }

        const segCoords = prevCoord ? [prevCoord, ...stopCoords] : stopCoords;
        prevCoord = stopCoords[stopCoords.length - 1];

        const segKey = `${tour.id}|${di}`;
        totalSegments++;

        if (segCoords.length < 2 || FORCE_STRAIGHT.has(segKey)) {
          // Straight line / non-routable
          console.log(`  Day ${day.day}: straight-line (forced)`);
          tourOut.days.push({ day: day.day, routeCoords: segCoords, fallback: true });
          fallbackCount++;
          continue;
        }

        console.log(`  Day ${day.day}: routing ${segCoords.length} waypoints via ORS…`);
        await sleep(DELAY_MS);

        const routed = await orsRoute(segCoords);
        if (routed && routed.length > 1) {
          console.log(`    ✓ ${routed.length} coords returned`);
          tourOut.days.push({ day: day.day, routeCoords: routed, fallback: false });
          routedCount++;
        } else {
          console.log(`    ✗ fallback to straight-line`);
          tourOut.days.push({ day: day.day, routeCoords: segCoords, fallback: true });
          fallbackCount++;
        }
      }

      groupOut.tours.push(tourOut);
    }
    result.push(groupOut);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));

  console.log(`\n✅  Done.`);
  console.log(`   Total segments : ${totalSegments}`);
  console.log(`   ORS routed     : ${routedCount}`);
  console.log(`   Straight-line  : ${fallbackCount}`);
  console.log(`   Output file    : ${OUT_FILE}`);
  console.log('\nNext step: run  node tools/apply-routes.js  to merge into tours.js');
}

main().catch(console.error);
