// ── Basemap tile layers ────────────────────────────────────────────────────

const BASEMAPS = {
  light: L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
  ),
  dark: L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
  ),
  satellite: L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { attribution: '&copy; <a href="https://www.esri.com/">Esri</a>', maxZoom: 19 }
  )
};

let activeBasemap = 'light';

// ── Map ───────────────────────────────────────────────────────────────────

const map = L.map('map', { center: [19.0, -12.5], zoom: 6, zoomControl: false });
BASEMAPS.light.addTo(map);
L.control.zoom({ position: 'topright' }).addTo(map);

// ── State ─────────────────────────────────────────────────────────────────

// tourLayers[id] = { normal: {group, bounds}, highlighted: {group, bounds} }
const tourLayers = {};
let activeGroupId = null;
let activeTourId  = null;

// ── Helper: collect ordered unique stops across all days ──────────────────

function collectUniqueStops(tour) {
  const stops = [];
  const seen  = new Set();
  tour.days.forEach(day => {
    day.stops.forEach(stop => {
      const key = stop.coords.join(',');
      if (!seen.has(key)) {
        seen.add(key);
        stops.push({
          name: stop.name,
          coords: stop.coords,
          seq: stops.length + 1,
          day: day.day,         // day number (1, 2, 3…)
          dayTitle: day.title   // e.g. "Day 2 – Desert & Oasis"
        });
      }
    });
  });
  return stops;
}

// ── Helper: build route segments (day segments with prevCoord carry-over) ─
// Uses pre-computed routeCoords (from ORS) when available, else straight line.

function buildSegments(tour) {
  const segments = [];
  let prevCoord = null;
  tour.days.forEach(day => {
    const sc = day.stops.map(s => s.coords);
    if (!sc.length) return;

    let coords;
    const rc = (typeof ROUTE_COORDS !== 'undefined') && ROUTE_COORDS[tour.id] && ROUTE_COORDS[tour.id][day.day];
    if (rc && rc.length >= 2) {
      coords = rc;
    } else {
      // Straight-line fallback
      coords = prevCoord ? [prevCoord, ...sc] : sc;
    }

    if (coords.length >= 2) segments.push({ coords, day, fallback: !day.routeCoords });
    prevCoord = sc[sc.length - 1];
  });
  return segments;
}

// ── Helper: create numbered divIcon ──────────────────────────────────────

function createNumberedIcon(num, color) {
  const d  = 20;
  const fs = num > 9 ? 8 : 10;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${d}px;height:${d}px;background:${color};
      border:2.5px solid #fff;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      color:#fff;font-size:${fs}px;font-weight:800;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
      font-family:-apple-system,BlinkMacSystemFont,sans-serif;
    ">${num}</div>`,
    iconSize: [d, d],
    iconAnchor: [d / 2, d / 2],
    tooltipAnchor: [0, -(d / 2) - 4]
  });
}

// ── Helper: create start/end pin icon ────────────────────────────────────

function createPinIcon(color, label) {
  return L.divIcon({
    className: '',
    html: `<svg width="24" height="32" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
      <filter id="ps" x="-30%" y="-10%" width="160%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.35)"/>
      </filter>
      <path d="M12 1C6.48 1 2 5.48 2 11c0 7.59 10 20 10 20s10-12.41 10-20C22 5.48 17.52 1 12 1z"
            fill="${color}" stroke="#fff" stroke-width="1.5" filter="url(#ps)"/>
      <text x="12" y="12.5" text-anchor="middle" dominant-baseline="middle"
            fill="#fff" font-size="10" font-weight="800"
            font-family="-apple-system,BlinkMacSystemFont,sans-serif">${label}</text>
    </svg>`,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    tooltipAnchor: [0, -34]
  });
}

// ── Normal layer (all-tours view) ─────────────────────────────────────────
// Thin lines (weight 2), small dots (radius 5), no numbers/arrows

function buildNormalLayer(tour) {
  const lg      = L.layerGroup();
  const allC    = [];
  const seen    = new Set();
  const segments = buildSegments(tour);

  segments.forEach(({ coords, day }) => {
    // Shadow
    L.polyline(coords, {
      color: '#000', weight: 4, opacity: 0.1,
      lineCap: 'round', lineJoin: 'round', interactive: false
    }).addTo(lg);

    // Route line (50% thinner)
    L.polyline(coords, {
      color: tour.color, weight: 2, opacity: 0.88,
      lineCap: 'round', lineJoin: 'round'
    }).bindPopup(`
      <div class="popup-inner">
        <span class="popup-tour-badge" style="background:${tour.color}">${tour.name}</span>
        <div class="popup-day-title">${day.title}</div>
        <div class="popup-description">${day.description}</div>
      </div>`, { maxWidth: 260 }
    ).addTo(lg);
  });

  // Location dots (deduplicated)
  tour.days.forEach(day => {
    day.stops.forEach(stop => {
      const key = stop.coords.join(',');
      if (seen.has(key)) return;
      seen.add(key);
      L.circleMarker(stop.coords, {
        radius: 5, fillColor: tour.color, color: '#fff',
        weight: 2, opacity: 1, fillOpacity: 0.88
      }).bindTooltip(stop.name, {
        permanent: false, direction: 'top',
        className: 'location-tooltip', offset: [0, -4]
      }).addTo(lg);
      allC.push(stop.coords);
    });
  });

  const bounds = allC.length ? L.latLngBounds(allC).pad(0.08) : null;
  return { group: lg, bounds };
}

// ── Highlighted layer (single tour selected) ──────────────────────────────
// Thick lines (weight 4), arrows, numbered stops, start/end pins

function buildHighlightedLayer(tour) {
  const lg       = L.layerGroup();
  const allC     = [];
  const segments = buildSegments(tour);

  segments.forEach(({ coords, day }) => {
    // Shadow
    L.polyline(coords, {
      color: '#000', weight: 8, opacity: 0.13,
      lineCap: 'round', lineJoin: 'round', interactive: false
    }).addTo(lg);

    // Main route line
    const pl = L.polyline(coords, {
      color: tour.color, weight: 4, opacity: 0.92,
      lineCap: 'round', lineJoin: 'round'
    });
    pl.bindPopup(`
      <div class="popup-inner">
        <span class="popup-tour-badge" style="background:${tour.color}">${tour.name}</span>
        <div class="popup-day-title">${day.title}</div>
        <div class="popup-description">${day.description}</div>
      </div>`, { maxWidth: 260 }
    );
    pl.addTo(lg);

    // Directional arrows (requires leaflet-polylinedecorator)
    if (typeof L.polylineDecorator !== 'undefined') {
      L.polylineDecorator(pl, {
        patterns: [{
          offset: '15%',
          repeat: '30%',
          symbol: L.Symbol.arrowHead({
            pixelSize: 11,
            polygon: false,
            pathOptions: {
              color: tour.color,
              opacity: 0.45,
              weight: 2.5,
              fill: false
            }
          })
        }]
      }).addTo(lg);
    }

    coords.forEach(c => allC.push(c));
  });

  // Numbered + start/end markers on unique ordered stops
  const orderedStops = collectUniqueStops(tour);
  const total = orderedStops.length;

  orderedStops.forEach((stop, i) => {
    let marker;
    const isFirst = i === 0;
    const isLast  = i === total - 1;

    const tooltipText = `${stop.name} · Day ${stop.day}`;
    const popupHtml = `
      <div class="popup-inner">
        <span class="popup-tour-badge" style="background:${tour.color}">${tour.name}</span>
        <div class="popup-day-title">${stop.dayTitle}</div>
        <div class="popup-description">${stop.name}</div>
      </div>`;

    if (isFirst) {
      marker = L.marker(stop.coords, {
        icon: createPinIcon('#27ae60', 'S'),
        zIndexOffset: 1000
      });
    } else if (isLast) {
      marker = L.marker(stop.coords, {
        icon: createPinIcon('#e74c3c', 'E'),
        zIndexOffset: 1000
      });
    } else {
      marker = L.marker(stop.coords, {
        icon: createNumberedIcon(stop.seq, tour.color)
      });
    }

    marker
      .bindTooltip(tooltipText, {
        permanent: false, direction: 'top',
        className: 'location-tooltip', offset: [0, -4]
      })
      .bindPopup(popupHtml, { maxWidth: 260 })
      .addTo(lg);
  });

  const bounds = allC.length ? L.latLngBounds(allC).pad(0.08) : null;
  return { group: lg, bounds };
}

// ── Visibility control ─────────────────────────────────────────────────────

function getAllTourIds() {
  return TOUR_GROUPS.flatMap(g => g.tours.map(t => t.id));
}

function getTourById(id) {
  for (const g of TOUR_GROUPS) {
    const t = g.tours.find(t => t.id === id);
    if (t) return t;
  }
  return null;
}

function getGroupById(id) {
  return TOUR_GROUPS.find(g => g.id === id) || null;
}

function showTours(tourIds, flyBounds, highlightId = null) {
  // Remove all layers
  TOUR_GROUPS.forEach(g => g.tours.forEach(t => {
    const l = tourLayers[t.id];
    if (!l) return;
    if (map.hasLayer(l.normal.group))      map.removeLayer(l.normal.group);
    if (map.hasLayer(l.highlighted.group)) map.removeLayer(l.highlighted.group);
  }));

  const boundsArr = [];
  tourIds.forEach(id => {
    const l = tourLayers[id];
    if (!l) return;
    if (id === highlightId) {
      map.addLayer(l.highlighted.group);
      if (l.highlighted.bounds) boundsArr.push(l.highlighted.bounds);
    } else {
      map.addLayer(l.normal.group);
      if (l.normal.bounds) boundsArr.push(l.normal.bounds);
    }
  });

  if (flyBounds && boundsArr.length > 0) {
    const combined = boundsArr.reduce((a, b) => a.extend(b), L.latLngBounds([]));
    if (combined.isValid()) map.flyToBounds(combined, { padding: [40, 40], duration: 1.2 });
  }
}

// ── Sidebar interactions ───────────────────────────────────────────────────

function resetSelection() {
  activeGroupId = null;
  activeTourId  = null;
  document.querySelectorAll('.group-header').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));
  document.getElementById('btn-show-all').classList.add('active');
  showTours(getAllTourIds(), true, null);
}

function selectGroup(groupId) {
  const group = getGroupById(groupId);
  if (!group || group.comingSoon) return;
  activeGroupId = groupId;
  activeTourId  = null;
  document.getElementById('btn-show-all').classList.remove('active');
  document.querySelectorAll('.group-header').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-group-id="${groupId}"]`)?.classList.add('active');
  showTours(group.tours.map(t => t.id), true, null);
}

function selectTour(tourId) {
  if (!getTourById(tourId)) return;
  activeTourId = tourId;
  document.getElementById('btn-show-all').classList.remove('active');
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tour-id="${tourId}"]`)?.classList.add('active');
  showTours([tourId], true, tourId);  // highlighted mode
}

// ── Build sidebar HTML ─────────────────────────────────────────────────────

function buildSidebar() {
  const nav = document.getElementById('tour-list');
  nav.innerHTML = '';

  TOUR_GROUPS.forEach((group, idx) => {
    const isFirst     = idx === 0;       // Mauritania: expanded by default
    const isComingSoon = !!group.comingSoon;

    const groupEl = document.createElement('div');
    groupEl.className = 'tour-group';

    // Group header
    const header = document.createElement('div');
    header.className = 'group-header' + (isFirst ? ' expanded' : '');
    header.dataset.groupId = group.id;

    const countLabel = isComingSoon
      ? '<span class="group-count coming-soon-badge">Soon</span>'
      : `<span class="group-count">${group.tours.length} tours</span>`;

    header.innerHTML = `
      <span class="group-flag">${group.flag}</span>
      <span class="group-name">${group.name}</span>
      ${countLabel}
      <span class="group-chevron">▶</span>
    `;

    const itemsEl = document.createElement('div');
    itemsEl.className = 'tour-items' + (isFirst ? ' visible' : '');

    if (isComingSoon) {
      // Coming soon message (no tours, no map interaction)
      itemsEl.innerHTML = `
        <div class="coming-soon-msg">
          <span class="cs-icon">✈️</span>
          <div>
            <div class="cs-title">Coming Soon</div>
            <div class="cs-sub">Tours for ${group.name} are being prepared.</div>
          </div>
        </div>`;

      header.addEventListener('click', () => {
        header.classList.toggle('expanded');
        itemsEl.classList.toggle('visible');
      });
    } else {
      // Real group: expand + filter map
      group.tours.forEach(tour => {
        const item = document.createElement('div');
        item.className = 'tour-item';
        item.dataset.tourId = tour.id;
        item.innerHTML = `
          <span class="tour-color-dot" style="background:${tour.color};box-shadow:0 0 0 1.5px ${tour.color}66;"></span>
          <div class="tour-info">
            <div class="tour-item-name">${tour.name}</div>
            <div class="tour-item-duration">${tour.duration}</div>
          </div>`;
        item.addEventListener('click', e => { e.stopPropagation(); selectTour(tour.id); });
        itemsEl.appendChild(item);
      });

      header.addEventListener('click', () => {
        const isExpanded = header.classList.contains('expanded');
        if (isExpanded && activeGroupId === group.id && activeTourId === null) {
          // Second click while group is active → collapse & reset
          header.classList.remove('expanded');
          itemsEl.classList.remove('visible');
          resetSelection();
          return;
        }
        header.classList.add('expanded');
        itemsEl.classList.add('visible');
        selectGroup(group.id);
      });
    }

    groupEl.appendChild(header);
    groupEl.appendChild(itemsEl);
    nav.appendChild(groupEl);
  });
}

// ── Basemap switcher ───────────────────────────────────────────────────────

function initLayerSwitcher() {
  const toggleBtn = document.getElementById('layer-toggle');
  const optionsEl = document.getElementById('layer-options');

  toggleBtn.addEventListener('click', e => { e.stopPropagation(); optionsEl.classList.toggle('visible'); });
  document.addEventListener('click', () => optionsEl.classList.remove('visible'));

  document.querySelectorAll('.layer-opt').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const key = btn.dataset.layer;
      if (key === activeBasemap) return;
      map.removeLayer(BASEMAPS[activeBasemap]);
      BASEMAPS[key].addTo(map);
      BASEMAPS[key].bringToBack();
      activeBasemap = key;
      document.querySelectorAll('.layer-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      optionsEl.classList.remove('visible');
    });
  });
}

// ── Mobile sidebar toggle ─────────────────────────────────────────────────

function initMobileToggle() {
  const btn     = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');
  btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  map.on('click', () => { if (window.innerWidth <= 680) sidebar.classList.remove('open'); });
}

// ── Show All button ────────────────────────────────────────────────────────

document.getElementById('btn-show-all').addEventListener('click', resetSelection);

// ── Bootstrap ─────────────────────────────────────────────────────────────

function init() {
  TOUR_GROUPS.forEach(group => {
    group.tours.forEach(tour => {
      tourLayers[tour.id] = {
        normal:      buildNormalLayer(tour),
        highlighted: buildHighlightedLayer(tour)
      };
    });
  });

  buildSidebar();
  initLayerSwitcher();
  initMobileToggle();

  showTours(getAllTourIds(), true, null);
}

init();
