// Initialize map & layers
var map = L.map(
    'map', {
        spotlight: true, // This one enables spotlight on the map
        scrollWheelZoom:false,
        zoomControl: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragging: false
     }).setView([50.11703222529853, 8.679703474044802], 18);

// Alternate method of enabling spotlight
//map.spotlight.enable();

// Define default style for points (small black dot)
var pointStyle = {
    radius: 2,
    opacity: 0,
    fillColor: "#000000",
    fillOpacity: 1
}

// Add layer to map
var pointLayer = L.geoJSON(pointData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, pointStyle);
    }
}).addTo(map);

// Define functions which takes a leaflet latlng as input and returns a turf polygon geometry (in this case, two offset circles=
dynamicCenterCircle1 = function (center) {
    return turf.circle(
        turf.destination(center, 10, 90, {"units": "meters"}),
        25,
        {"steps": 128, "units": "meters"}
    );
};
dynamicCenterCircle2 = function (center) {
    return turf.circle(
        turf.destination(center, 10, -90, {"units": "meters"}),
        25,
        {"steps": 128, "units": "meters"}
    );
};

// Define a style for the spotlight polygons themselves (in this case, a black ring)
var mySpotlightStyle = {
    color: "#000000",
    fillOpacity: 0
};

// Define functions which take a leaflet point and returns a marker options object using the feature's properties
function myMarkerOptions1(feature) {
    if (feature.properties.id % 2. == 0) {
        return {
            icon: L.icon({
                iconUrl: '../img/marker-icon-blue.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
        }
    } else {
        return {
            icon: L.icon({
                iconUrl: '../img/marker-icon-blue.png',
                iconSize: [0, 0] // Effectively makes the marker "invisible"
            })
        }
    }
};
function myMarkerOptions2(feature) {
    if (feature.properties.id % 2. != 0) {
        return {
            icon: L.icon({
                iconUrl: '../img/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
            })
        }
    } else {
        return {
            icon: L.icon({
                iconUrl: '../img/marker-icon-red.png',
                iconSize: [0, 0] // Effectively makes the marker "invisible"
            })
        }
    }
};

// Define spotlight objects
var mySpotlight1 = L.spotlight({
    spotlightType: "marker",
    markerOptions: myMarkerOptions1,
    spotlightShape: dynamicCenterCircle1,
    spotlightStyle: mySpotlightStyle,
    targetLayer: pointLayer
});
var mySpotlight2 = L.spotlight({
    spotlightType: "marker",
    markerOptions: myMarkerOptions2,
    spotlightShape: dynamicCenterCircle2,
    spotlightStyle: mySpotlightStyle,
    targetLayer: pointLayer
});

// Make buttons control both spotlights
var toggleButton1 = document.getElementById("toggle-spotlight1-button");
toggleButton1.addEventListener("click", function(e) {
    if (!map.hasSpotlight(mySpotlight1)) {
        mySpotlight1.addTo(map);
    } else {
        map.removeSpotlight(mySpotlight1)
    }
});
var toggleButton2 = document.getElementById("toggle-spotlight2-button");
toggleButton2.addEventListener("click", function(e) {
    if (!map.hasSpotlight(mySpotlight2)) {
        mySpotlight2.addTo(map);
    } else {
        map.removeSpotlight(mySpotlight2)
    }
});