var map;
var spotlightShape;
var sidebar;
var pointLayer;

$(document).ready(function() {

    // Initialize map & layers
    map = L.map('map').setView([50.1109, 8.6821], 15);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    pointLayer = L.geoJSON(pointData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, pointStyle);
        }
    }).addTo(map);

    sidebar = L.control.sidebar('sidebar').addTo(map);

    var dynamicCenterCircle;
    var dynamicCenterRectangle;

    // Attach a change listener to the shape selector box
    $("#shape-selector").on("change", function() {

        $(map).spotlight("off");

        var spotlightValue = $("#shape-selector").val();

        if (spotlightValue == "circle") {

            dynamicCenterCircle = function (center) {
                return turf.circle(
                    center,
                    $("#circle-radius-input").val(),
                    {"steps": 128, "units": "meters"}
                );
            }

            $(map).spotlight("on", pointLayer, dynamicCenterCircle, spotlightStyle, highlightStyle);

        } else if (spotlightValue == "rectangle") {

            dynamicCenterRectangle = function (center) {
                return turf.transformRotate(
                    turf.envelope(
                        turf.featureCollection([
                            turf.destination(center, $("#rectangle-height-input").val()/2, 0, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-width-input").val()/2, 90, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-height-input").val()/2, 180, {"units": "meters"}),
                            turf.destination(center, $("#rectangle-width-input").val()/2, -90, {"units": "meters"})
                        ])
                    ),
                    $("#rectangle-rotation-input").val()
                );
            }

            $(map).spotlight("on", pointLayer, dynamicCenterRectangle, spotlightStyle, highlightStyle);

        }

        $(".shape-params").hide();
        $("#"+spotlightValue+"-params").show();

    });

});