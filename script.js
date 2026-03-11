// ── Basemap tile layers ────────────────────────────────────────────────────

const BASEMAPS = {
  light: L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }
  ),
  dark: L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }
  ),
  satellite: L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
      maxZoom: 19
    }
  )
};

let activeBasemap = 'light';

// ── Map initialisation ────────────────────────────────────────────────────

const map = L.map('map', {
  center: [19.0, -12.5],
  zoom: 6,
  zoomControl: false
});

BASEMAPS.light.addTo(map);

// Custom zoom placement (top-right)
L.control.zoom({ position: 'topright' }).addTo(map);

// ── State ──────────────────────────────────────────────────────────────────

// tourLayers[tourId] = { group: L.LayerGroup, bounds: L.LatLngBounds }
const tourLayers = {};
let activeGroupId = null;
let activeTourId  = null;

// ── Route layer builder ───────────────────────────────────────────────────

function buildTourLayer(tour) {
  const layerGroup = L.layerGroup();
  const allCoords  = [];
  let prevCoord    = null;   // last coord of the previous day

  tour.days.forEach(day => {
    const stopCoords = day.stops.map(s => s.coords);
    if (stopCoords.length === 0) return;

    // Route segment: from previous day's last stop → today's stops
    const segCoords = prevCoord ? [prevCoord, ...stopCoords] : stopCoords;

    if (segCoords.length >= 2) {
      // Shadow polyline (drawn first so it sits below)
      L.polyline(segCoords, {
        color: '#000000',
        weight: 7,
        opacity: 0.15,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false
      }).addTo(layerGroup);

      // Main coloured route line
      const routeLine = L.polyline(segCoords, {
        color: tour.color,
        weight: 4,
        opacity: 0.92,
        lineCap: 'round',
        lineJoin: 'round'
      });

      routeLine.bindPopup(`
        <div class="popup-inner">
          <span class="popup-tour-badge" style="background:${tour.color}">
            ${tour.name}
          </span>
          <div class="popup-day-title">${day.title}</div>
          <div class="popup-description">${day.description}</div>
        </div>
      `, { maxWidth: 260 });

      routeLine.addTo(layerGroup);
    }

    // Location dot markers (deduplicated within this tour)
    stopCoords.forEach((coord, i) => {
      const key = coord.join(',');
      const stop = day.stops[i];

      const marker = L.circleMarker(coord, {
        radius: 6,
        fillColor: tour.color,
        color: '#ffffff',
        weight: 2.5,
        opacity: 1,
        fillOpacity: 0.9
      });

      marker.bindTooltip(stop.name, {
        permanent: false,
        direction: 'top',
        className: 'location-tooltip',
        offset: [0, -4]
      });

      marker.addTo(layerGroup);
      allCoords.push(coord);
    });

    prevCoord = stopCoords[stopCoords.length - 1];
  });

  const bounds = allCoords.length > 0
    ? L.latLngBounds(allCoords).pad(0.08)
    : null;

  return { group: layerGroup, bounds };
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

function showTours(tourIds, flyBounds) {
  getAllTourIds().forEach(id => {
    if (tourLayers[id]) map.removeLayer(tourLayers[id].group);
  });

  const boundsArr = [];
  tourIds.forEach(id => {
    if (tourLayers[id]) {
      map.addLayer(tourLayers[id].group);
      if (tourLayers[id].bounds) boundsArr.push(tourLayers[id].bounds);
    }
  });

  if (flyBounds && boundsArr.length > 0) {
    const combined = boundsArr.reduce((acc, b) => acc.extend(b), L.latLngBounds([]));
    if (combined.isValid()) {
      map.flyToBounds(combined, { padding: [40, 40], duration: 1.2 });
    }
  }
}

// ── Sidebar interactions ──────────────────────────────────────────────────

function resetSelection() {
  activeGroupId = null;
  activeTourId  = null;

  // UI state
  document.querySelectorAll('.group-header').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));
  document.getElementById('btn-show-all').classList.add('active');

  showTours(getAllTourIds(), true);
}

function selectGroup(groupId) {
  const group = getGroupById(groupId);
  if (!group) return;

  activeGroupId = groupId;
  activeTourId  = null;

  document.getElementById('btn-show-all').classList.remove('active');
  document.querySelectorAll('.group-header').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));

  document.querySelector(`[data-group-id="${groupId}"]`)?.classList.add('active');

  const tourIds = group.tours.map(t => t.id);
  showTours(tourIds, true);
}

function selectTour(tourId) {
  const tour = getTourById(tourId);
  if (!tour) return;

  activeTourId = tourId;

  document.getElementById('btn-show-all').classList.remove('active');
  document.querySelectorAll('.tour-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-tour-id="${tourId}"]`)?.classList.add('active');

  showTours([tourId], true);
}

// ── Build sidebar HTML ─────────────────────────────────────────────────────

function buildSidebar() {
  const nav = document.getElementById('tour-list');
  nav.innerHTML = '';

  TOUR_GROUPS.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'tour-group';

    // Group header
    const header = document.createElement('div');
    header.className = 'group-header expanded';
    header.dataset.groupId = group.id;
    header.innerHTML = `
      <span class="group-flag">${group.flag}</span>
      <span class="group-name">${group.name}</span>
      <span class="group-count">${group.tours.length} tours</span>
      <span class="group-chevron">▶</span>
    `;

    // Group click: expand/collapse + fly to group
    header.addEventListener('click', () => {
      const isExpanded = header.classList.contains('expanded');
      const itemsEl = groupEl.querySelector('.tour-items');

      if (isExpanded && activeGroupId === group.id && activeTourId === null) {
        // Second click while group already active → collapse & reset
        header.classList.remove('expanded');
        itemsEl.classList.remove('visible');
        resetSelection();
        return;
      }

      header.classList.add('expanded');
      itemsEl.classList.add('visible');
      selectGroup(group.id);
    });

    // Tour items container
    const itemsEl = document.createElement('div');
    itemsEl.className = 'tour-items visible'; // expanded by default

    group.tours.forEach(tour => {
      const item = document.createElement('div');
      item.className = 'tour-item';
      item.dataset.tourId = tour.id;
      item.innerHTML = `
        <span class="tour-color-dot" style="background:${tour.color}; box-shadow: 0 0 0 1.5px ${tour.color}55;"></span>
        <div class="tour-info">
          <div class="tour-item-name">${tour.name}</div>
          <div class="tour-item-duration">${tour.duration}</div>
        </div>
      `;

      item.addEventListener('click', e => {
        e.stopPropagation();
        selectTour(tour.id);
      });

      itemsEl.appendChild(item);
    });

    groupEl.appendChild(header);
    groupEl.appendChild(itemsEl);
    nav.appendChild(groupEl);
  });
}

// ── Basemap switcher ───────────────────────────────────────────────────────

function initLayerSwitcher() {
  const toggleBtn  = document.getElementById('layer-toggle');
  const optionsEl  = document.getElementById('layer-options');

  toggleBtn.addEventListener('click', e => {
    e.stopPropagation();
    optionsEl.classList.toggle('visible');
  });

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

// ── Mobile sidebar toggle ──────────────────────────────────────────────────

function initMobileToggle() {
  const btn     = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');

  btn.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Close sidebar when clicking map on mobile
  map.on('click', () => {
    if (window.innerWidth <= 680) sidebar.classList.remove('open');
  });
}

// ── Show All Tours button ─────────────────────────────────────────────────

document.getElementById('btn-show-all').addEventListener('click', resetSelection);

// ── Bootstrap ─────────────────────────────────────────────────────────────

function init() {
  // Build tour layers from data
  TOUR_GROUPS.forEach(group => {
    group.tours.forEach(tour => {
      tourLayers[tour.id] = buildTourLayer(tour);
    });
  });

  buildSidebar();
  initLayerSwitcher();
  initMobileToggle();

  // Show all tours initially (no fly, just fit bounds)
  showTours(getAllTourIds(), true);
}

init();
