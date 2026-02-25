// Color scheme - one color per tour
const tourColors = {
    "Adrar Tour Standard": "#e74c3c",   // Red
    "Adrar Tour Short": "#1abc9c"       // Teal
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

// Style function for GeoJSON route features
function getRouteStyle(feature) {
    const tour = feature.properties.tour;
    const color = tourColors[tour] || '#333333';

    return {
        color: color,
        weight: 4,
        opacity: 0.9,
        // Add shadow effect using CSS filter (Leaflet will apply this via SVG)
        className: 'route-line-shadow'
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
        // Create GeoJSON layer for routes
        const routesLayer = L.geoJSON(data, {
            style: getRouteStyle,
            onEachFeature: onEachFeature,
            filter: function(feature) {
                // Only show LineString features (routes)
                return feature.geometry.type === 'LineString';
            }
        }).addTo(map);

        // Create location markers (Point features)
        const locationsLayer = L.geoJSON(data, {
            filter: function(feature) {
                // Only show Point features (locations)
                return feature.geometry.type === 'Point';
            },
            pointToLayer: function(feature, latlng) {
                const tour = feature.properties.tour;
                const color = tourColors[tour] || '#333333';

                return L.circleMarker(latlng, {
                    radius: 6,
                    fillColor: color,
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function(feature, layer) {
                if (feature.properties && feature.properties.location) {
                    // Show location name on hover with tooltip
                    layer.bindTooltip(feature.properties.location, {
                        permanent: false,
                        direction: 'top',
                        className: 'location-tooltip'
                    });
                }
            }
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
