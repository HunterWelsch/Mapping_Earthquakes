// Add console.log to check if the code is working
console.log("working")

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
    accessToken: api_key
});

// Create title layer (map background)
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: api_key
});

// Create a base layer that holds both maps
let baseMap = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center,zoom level and default layer
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// Add the layer control to the map
L.control.layers(baseMap).addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/UM7550/Mapping_Earthquakes/master/torontoNeighborhoods.json";

// Grabbing the GeoJSON data
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with retrieved data
    L.geoJSON(data).addTo(map)
});