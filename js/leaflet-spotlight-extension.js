L.Map.include({

    _spotlightRegistry: {},

    addSpotlight: function(spotlight) {
//        console.log("adding spotlight");
        this._spotlightRegistry[spotlight.id] = spotlight.options;
//        console.log(this._spotlightRegistry);
    },

    removeSpotlight: function(spotlight) {
//        console.log("removing spotlight");
        delete this._spotlightRegistry[spotlight.id];
//        console.log(this._spotlightRegistry);
    }

});

L.SpotlightHandler = L.Handler.extend({

    addHooks: function() {
//        L.DomEvent.on(document, 'mousemove', this._refreshSpotlights, this);
//        this._map.addEventListener('mousemove', function(ev) {console.log(ev)})
        this._map.addEventListener('mousemove', this._refreshSpotlights);
    },

//    removeHooks: function() {
//        L.DomEvent.off(document, 'mousemove', this._refreshSpotlights, this);
//    },

    _refreshSpotlights: function(ev) {

        // Create a mousemove event listener for this spotlight
        for (var spotlightId in this._spotlightRegistry) {

            var currentSpotlight = this._spotlightRegistry[spotlightId];

            // On each mouse movement, remove the spotlight & highlighted features layer for this._map spotlightId
            if (this.hasLayer(currentSpotlight.spotlightHighlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightHighlightLayer);
            }
            if (this.hasLayer(currentSpotlight.spotlightLayer)) {
                this.removeLayer(currentSpotlight.spotlightLayer);
            }

            // Find which points are highlighted by seeing if they are within the spotlight
            var highlightedPoints = turf.pointsWithinPolygon(
                this._spotlightRegistry[spotlightId].targetLayer.toGeoJSON(),
                currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat])
            );

            // Add the highlighted features to the map as a layer
            if (typeof currentSpotlight.highlightStyle !== "function") {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle)
                    }
                }).addTo(this);
            } else {
                currentSpotlight.spotlightHighlightLayer = L.geoJSON(highlightedPoints, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, currentSpotlight.highlightStyle(feature))
                    }
                }).addTo(this);
            }

            // Add the spotlight to the map as a layer
            currentSpotlight.spotlightLayer = L.geoJSON(currentSpotlight.spotlightShape([ev.latlng.lng, ev.latlng.lat]), {
                style: currentSpotlight.spotlightStyle
            }).addTo(this);

        }

    }

});

L.Map.addInitHook('addHandler', 'spotlight', L.SpotlightHandler);

L.Spotlight = L.Class.extend({

    options: {
        highlightStyle: 1,
        spotlightShape: 1,
        spotlightStyle: 1,
        targetLayer: 1
    },

    initialize: function(id, options) {
        this.id = id;
        L.setOptions(this, options);
    },

    addTo: function(map) {
//        console.log(this);
        map.addSpotlight(this);
    }

});

L.spotlight = function(id, options) {
    return new L.Spotlight(id, options);
};