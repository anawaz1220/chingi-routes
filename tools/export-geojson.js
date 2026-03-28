/**
 * export-geojson.js
 * Exports one GeoJSON file per tour for manual route editing in geojson.io
 *
 * Each file contains:
 *   - One LineString per day (straight lines — to be corrected by client)
 *   - One Point per stop (with name, day, sequence metadata)
 *
 * IMPORTANT: When editing in geojson.io, only update LineString geometries.
 * Do NOT rename any properties.
 *
 * Run: node tools/export-geojson.js
 * Output: tools/geojson/<tour-id>.geojson
 */

const fs   = require('fs');
const path = require('path');

// Load tours.js (strip routeCoords to avoid huge data, we only need stops)
const toursPath  = path.join(__dirname, '..', 'data', 'tours.js');
const toursCode  = fs.readFileSync(toursPath, 'utf8');
const patchedCode = toursCode.replace(/^\s*(const|let)\s+/gm, 'var ');
eval(patchedCode); // defines TOUR_GROUPS

const outDir = path.join(__dirname, 'geojson');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

for (const group of TOUR_GROUPS) {
  if (group.comingSoon) continue;

  for (const tour of group.tours) {
    const features = [];
    let seq = 1;

    // Collect all stops (deduplicated by name across days)
    const seenStops = new Set();
    const allStops  = [];

    for (const day of tour.days) {
      for (const stop of day.stops) {
        const key = stop.name;
        if (!seenStops.has(key)) {
          seenStops.add(key);
          allStops.push({ ...stop, seq, day: day.day, dayTitle: day.title });
          seq++;
        }
      }
    }

    // Point features — one per unique stop
    for (const stop of allStops) {
      features.push({
        type: 'Feature',
        properties: {
          type:     'stop',
          name:     stop.name,
          seq:      stop.seq,
          day:      stop.day,
          dayTitle: stop.dayTitle
        },
        geometry: {
          type:        'Point',
          coordinates: [stop.coords[1], stop.coords[0]]  // GeoJSON: [lng, lat]
        }
      });
    }

    // LineString features — one per day (straight lines to be corrected)
    let prevCoord = null;
    for (const day of tour.days) {
      const sc = day.stops.map(s => s.coords);
      if (!sc.length) continue;

      const lineCoords = prevCoord ? [prevCoord, ...sc] : sc;
      prevCoord = sc[sc.length - 1];

      if (lineCoords.length < 2) continue;

      features.push({
        type: 'Feature',
        properties: {
          type:     'route',
          day:      day.day,
          dayTitle: day.title,
          note:     'EDIT THIS: trace the actual road/track path'
        },
        geometry: {
          type: 'LineString',
          // GeoJSON: [lng, lat]
          coordinates: lineCoords.map(([lat, lng]) => [lng, lat])
        }
      });
    }

    const geojson = {
      type: 'FeatureCollection',
      properties: {
        tourId:   tour.id,
        tourName: tour.name,
        duration: tour.duration,
        color:    tour.color
      },
      features
    };

    const outFile = path.join(outDir, `${tour.id}.geojson`);
    fs.writeFileSync(outFile, JSON.stringify(geojson, null, 2));
    console.log(`✓  ${tour.name.padEnd(30)} → ${outFile}`);
  }
}

console.log('\nDone. Share the files in tools/geojson/ with the client.');
console.log('Ask them to: 1) open each file in geojson.io  2) edit LineString geometries  3) send back.');
