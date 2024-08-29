// Define functions to determine colors based on indices
function rentColor(rentIndex) {
    return rentIndex > 60 ? "red" :
      rentIndex > 50 ? "orange" :
        rentIndex > 40 ? "yellow" :
          rentIndex > 30 ? "green" :
            rentIndex > 20 ? "purple" :
              rentIndex > 10 ? "blue" :
                "white";
}

function groceryColor(groceryIndex) {
    return groceryIndex > 120 ? "red" :
    groceryIndex > 100 ? "orange" :
    groceryIndex > 80 ? "yellow" :
    groceryIndex > 60 ? "green" :
    groceryIndex > 40 ? "purple" :
    groceryIndex > 20 ? "blue" :
                "white";
}

function resturantColor(resturantpriceIndex) {
    return resturantpriceIndex > 90 ? "red" :
    resturantpriceIndex > 70 ? "orange" :
    resturantpriceIndex > 50 ? "yellow" :
    resturantpriceIndex > 30 ? "green" :
    resturantpriceIndex > 10 ? "purple" :
                "white";
}

function costoflivingColor(costoflivingIndex) {
    return costoflivingIndex > 100 ? "red" :
    costoflivingIndex > 80 ? "orange" :
    costoflivingIndex > 60 ? "yellow" :
    costoflivingIndex > 40 ? "green" :
    costoflivingIndex > 20 ? "purple" :
                "white";
}

function localpurchasingpowerColor(localpurchasingpowerIndex) {
    return localpurchasingpowerIndex > 150 ? "red" :
    localpurchasingpowerIndex > 120 ? "orange" :
    localpurchasingpowerIndex > 90 ? "yellow" :
    localpurchasingpowerIndex > 60 ? "green" :
    localpurchasingpowerIndex > 30 ? "purple" :
                "white";
}

function costoflivingplusrentColor(costoflivingplusrentIndex) {
    return costoflivingplusrentIndex > 70 ? "red" :
    costoflivingplusrentIndex > 50 ? "orange" :
    costoflivingplusrentIndex > 30 ? "yellow" :
    costoflivingplusrentIndex > 10 ? "green" :
                "white";
}

// Create the map object
let myMap = L.map("map", {
    center: [20, 0],
    zoom: 2
});

// Add the tile layer
let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load GeoJSON data
d3.json("data/countries.geojson").then(function (geojsonData) {
    // Load cost data
    d3.json("data/cost.json").then(function (costData) {
        // Create mappings from country names to indices
        const rentIndexMap = new Map();
        const groceriesIndexMap = new Map();
        const resturantIndexMap = new Map();
        const costoflivingIndexMap = new Map();
        const localpurchasingpowerIndexMap = new Map();
        const costoflivingplusrentIndexMap = new Map();

        costData.forEach(country => {
            rentIndexMap.set(country.Country, country["Rent Index"]);
            groceriesIndexMap.set(country.Country, country["Groceries Index"]);
            resturantIndexMap.set(country.Country, country["Restaurant Price Index"]);
            costoflivingIndexMap.set(country.Country, country["Cost of Living Index"]);
            localpurchasingpowerIndexMap.set(country.Country, country["Local Purchasing Power Index"]);
            costoflivingplusrentIndexMap.set(country.Country, country["Cost of Living Plus Rent Index"]);
        });

        // Create GeoJSON layers for rent index and groceries index
        const rentGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the rent index for the current country
                const rentIndex = rentIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: rentColor(rentIndex), // Fill color based on rent index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const rentIndex = rentIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Rent Index: ${rentIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });

        const groceryGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the groceries index for the current country
                const groceriesIndex = groceriesIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: groceryColor(groceriesIndex), // Fill color based on groceries index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const groceriesIndex = groceriesIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Grocery Index: ${groceriesIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });
        const resturantGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the groceries index for the current country
                const resturantIndex = resturantIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: resturantColor(resturantIndex), // Fill color based on groceries index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const resturantIndex = resturantIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Resturant Index: ${resturantIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });

        const costoflivingGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the groceries index for the current country
                const costoflivingIndex = costoflivingIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: resturantColor(costoflivingIndex), // Fill color based on groceries index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const costoflivingIndex = costoflivingIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Cost of living Index: ${costoflivingIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });

        const localpurchasingpowerGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the groceries index for the current country
                const localpurchasingpowerIndex = localpurchasingpowerIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: resturantColor(localpurchasingpowerIndex), // Fill color based on groceries index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const localpurchasingpowerIndex = localpurchasingpowerIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Local purchasing power Index: ${localpurchasingpowerIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });

        // Create GeoJSON layers for rent index and groceries index
        const costoflivingplusrentGeoJsonLayer = L.geoJSON(geojsonData, {
            style: function (feature) {
                // Get the rent index for the current country
                const costoflivingplusrentIndex = costoflivingplusrentIndexMap.get(feature.properties.sovereignt) || 0;
                return {
                    color: "black",      // Outline color
                    weight: 2,          // Outline thickness
                    fillColor: rentColor(costoflivingplusrentIndex), // Fill color based on rent index
                    fillOpacity: 0.5    // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                const costoflivingplusrentIndex = costoflivingplusrentIndexMap.get(feature.properties.sovereignt) || "N/A";
                const popupContent = `
                    <h3>${feature.properties.sovereignt}</h3>
                    <p>Cost of living plus Rent Index: ${costoflivingplusrentIndex}</p>
                `;
                layer.bindPopup(popupContent);
            }
        });

        // Add baseMaps and overlayMaps
        let baseMaps = {
            'Street Map': streetMap
        };

        let overlayMaps = {
            "Rent Index": rentGeoJsonLayer,
            "Groceries Index": groceryGeoJsonLayer,
            'Resturant Price Index': resturantGeoJsonLayer,
            "Cost of living Index" : costoflivingGeoJsonLayer,
            "Local Purchasing Power": localpurchasingpowerGeoJsonLayer,
            "Cost of living plus rent Index": costoflivingplusrentGeoJsonLayer
        };

        // Add control layers
        L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
    });
});
