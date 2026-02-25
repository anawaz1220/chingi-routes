// Color palettes for the two tours
const colorPalettes = {
    "Adrar Tour Standard": {
        "Day 1": "#e74c3c",   // Red
        "Day 2": "#e67e22",   // Orange
        "Day 3": "#f1c40f",   // Yellow
        "Day 4": "#2ecc71",   // Green
        "Day 5": "#3498db",   // Blue
        "Day 6": "#9b59b6",   // Purple
        "Day 7": "#c0392b"    // Dark Red
    },
    "Adrar Tour Short": {
        "Day 1": "#1abc9c",   // Teal
        "Day 2": "#16a085",   // Dark Teal
        "Day 3": "#00bcd4",   // Cyan
        "Day 4": "#0097a7"    // Dark Cyan
    }
};

// Initialize the map
const map = L.map('map', {
    zoomControl: true,
    attributionControl: true
});

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Style function for GeoJSON features
function getStyle(feature) {
    const tour = feature.properties.tour;
    const day = feature.properties.day;
    const color = colorPalettes[tour] ? colorPalettes[tour][day] : '#333333';

    return {
        color: color,
        weight: 4,
        opacity: 0.8
    };
}

// Popup content generator
function createPopupContent(feature) {
    const props = feature.properties;
    return `
        <div class="popup-tour-name">${props.tour}</div>
        <div class="popup-day">${props.day}</div>
        <div class="popup-description">${props.description}</div>
    `;
}

// Bind popup to each feature
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(createPopupContent(feature));
    }
}

// Load GeoJSON data and add to map
fetch('data/routes.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load routes data');
        }
        return response.json();
    })
    .then(data => {
        // Create GeoJSON layer
        const routesLayer = L.geoJSON(data, {
            style: getStyle,
            onEachFeature: onEachFeature
        }).addTo(map);

        // Fit map bounds to all routes
        const bounds = routesLayer.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds, {
                padding: [30, 30]
            });
        }
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
        // Fallback: center on Mauritania if data fails to load
        map.setView([20.5, -13.5], 6);
    });
