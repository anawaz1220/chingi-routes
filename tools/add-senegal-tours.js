/**
 * add-senegal-tours.js
 * ─────────────────────────────────────────────────────────────────────────
 * Reads Leo's Senegal/Gambia GeoJSON files and patches data/tours.js:
 *   - Replaces the Senegal "comingSoon" group with real tour data
 *   - Injects stop coordinates and routeCoords per day
 *
 * Run:  node tools/add-senegal-tours.js
 * ─────────────────────────────────────────────────────────────────────────
 */

const fs   = require('fs');
const path = require('path');

const GEOJSON_DIR = path.join(__dirname, '..', 'data', 'chingitours client udpated trips');
const TOURS_FILE  = path.join(__dirname, '..', 'data', 'tours.js');

// ── Tour definitions (meta only — stops/routes come from GeoJSONs) ──────
const SENEGAL_TOURS = [
  {
    id:       'senegal-boat',
    name:     'Boat Tour',
    duration: '7 Days',
    color:    '#1abc9c',
    file:     'Boat tour.geojson',
    dayTitles: {
      1: 'Day 1 – Dakar',
      2: 'Day 2 – Kayar & Lompoul Desert',
      3: 'Day 3 – Lompoul to Podor',
      4: 'Day 4 – Dagana',
      5: 'Day 5 – Richard Toll & Rosso',
      6: 'Day 6 – Djoudj & Saint-Louis',
      7: 'Day 7 – Langue de Barbarie & Return to Dakar',
    }
  },
  {
    id:       'senegal-gambia-dindefelo',
    name:     'Dindefelo Tour',
    duration: '12 Days',
    color:    '#e91e63',
    file:     'Dindefelo Tour.geojson',
    dayTitles: {
      1:  'Day 1 – Dakar',
      2:  'Day 2 – Bandia & Saly Portudal',
      3:  'Day 3 – Kaolack & Niokolo-Koba',
      4:  'Day 4 – Kédougou',
      5:  'Day 5 – Dindefelo Highlands & Bassari Land',
      6:  'Day 6 – Niokolo-Koba & Mako',
      7:  'Day 7 – Basse Santa Su',
      8:  'Day 8 – Janjanbureh & River Gambia',
      9:  'Day 9 – Soma, Juffure & Banjul',
      10: 'Day 10 – Kachikally & Delta du Saloum',
      11: 'Day 11 – Joal Fadiouth & Mbour',
      12: 'Day 12 – Return to Dakar',
    }
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────

function r6(n) { return Math.round(n * 1e6) / 1e6; }

function buildTourJS(tourMeta) {
  const geojsonPath = path.join(GEOJSON_DIR, tourMeta.file);
  const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

  // Index Points by day
  const stopsByDay = {};
  for (const f of geojson.features) {
    if (!f.geometry || f.geometry.type !== 'Point') continue;
    const day = parseInt(f.properties.Day, 10);
    if (!stopsByDay[day]) stopsByDay[day] = [];
    const [lng, lat] = f.geometry.coordinates;
    stopsByDay[day].push({ name: f.properties.name.trim(), coords: [r6(lat), r6(lng)] });
  }

  // Index LineStrings by day
  const routeByDay = {};
  for (const f of geojson.features) {
    if (!f.geometry || f.geometry.type !== 'LineString') continue;
    const day = parseInt(f.properties.Day, 10);
    // Convert [lng,lat] → [lat,lng]
    routeByDay[day] = f.geometry.coordinates.map(([lng, lat]) => [r6(lat), r6(lng)]);
  }

  // Determine all days
  const allDays = new Set([
    ...Object.keys(stopsByDay).map(Number),
    ...Object.keys(routeByDay).map(Number)
  ]);
  const sortedDays = [...allDays].sort((a, b) => a - b);

  // Build days array JS
  const daysLines = [];
  for (const dayNum of sortedDays) {
    const stops = stopsByDay[dayNum] || [];
    const route = routeByDay[dayNum];
    const title = tourMeta.dayTitles[dayNum] || `Day ${dayNum}`;

    const stopsJS = stops.map(s =>
      `          { name: ${JSON.stringify(s.name)}, coords: [${s.coords}] }`
    ).join(',\n');

    const routeJS = route && route.length >= 2
      ? `\n          routeCoords: ${JSON.stringify(route)}, routeFallback: false,`
      : '';

    daysLines.push(
`        {
          day: ${dayNum}, title: ${JSON.stringify(title)}, description: '',
          stops: [\n${stopsJS || '          // travel day — no new stop'}
          ],${routeJS}
        }`
    );
  }

  return (
`      {
        id: ${JSON.stringify(tourMeta.id)},
        name: ${JSON.stringify(tourMeta.name)},
        duration: ${JSON.stringify(tourMeta.duration)},
        color: ${JSON.stringify(tourMeta.color)},
        days: [
${daysLines.join(',\n')}
        ]
      }`
  );
}

// ── Build replacement Senegal group ──────────────────────────────────────

const toursJS = SENEGAL_TOURS.map(buildTourJS).join(',\n');

const senegalGroup =
`  {
    id: "senegal",
    name: "Senegal",
    flag: "🇸🇳",
    tours: [
${toursJS}
    ]
  }`;

// ── Patch tours.js ───────────────────────────────────────────────────────

let src = fs.readFileSync(TOURS_FILE, 'utf8');

// Replace the existing Senegal coming-soon block
const oldSenegal = /\{\s*\n\s*id:\s*["']senegal["'],\s*\n\s*name:\s*["']Senegal["'],\s*\n\s*flag:\s*["']🇸🇳["'],\s*\n\s*comingSoon:\s*true,\s*\n\s*tours:\s*\[\]\s*\n\s*\}/;

if (!oldSenegal.test(src)) {
  console.error('❌  Could not find Senegal coming-soon block. Check tours.js format.');
  process.exit(1);
}

src = src.replace(oldSenegal, senegalGroup);
fs.writeFileSync(TOURS_FILE, src);

console.log('✅  Senegal group updated in data/tours.js');
console.log('   Tours added:');
SENEGAL_TOURS.forEach(t => console.log(`     - ${t.name} (${t.duration})`));
console.log('\nTest locally, then commit and push.');
