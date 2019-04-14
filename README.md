# leaflet-spotlight

A Leaflet plugin for creating a "highlight" effect on features near the user's cursor.

## Dependencies

* `Leaflet >= 1.1.0`
* `turf.js >= 5.1.6`

## Installation

Import the library into your HTML document. Make sure that it is imported AFTER Leaflet and turf.js

```
<script src="src/leaflet-spotlight-extension.min.js"></script>
```

## Examples

Detailed examples for various use cases can be found in the
[examples](https://github.com/iboates/leaflet-spotlight/tree/master/examples) folder.

<p align="center">
<img src="gif/spotlight_1.gif" width="400" vertical-align="middle">
</p>
A simple spotlight highlighting all points [(Demo)](https://iboates.github.io/examples/00_simple/index) [(Source)](https://github.com/iboates/leaflet-spotlight/tree/master/examples/00_simple) [(Toggleable version demo)](https://iboates.github.io/examples/00_simple/index) [(Toggleable version source)](https://github.com/iboates/leaflet-spotlight/tree/master/examples/01_toggleable)

<p align="center">
<img src="gif/spotlight_2.gif" width="400" vertical-align="middle">
</p>
A (toggleable) simple marker-based spotlight highlighting all points [(Demo)](https://iboates.github.io/examples/01_toggleable_marker/index) [(Source)](https://github.com/iboates/leaflet-spotlight/tree/master/examples/01_toggleable_marker)

<p align="center">
<img src="gif/spotlight_3.gif" width="400" vertical-align="middle">
</p>

A (toggleable) pair of spotlights, each of which selectively highlights points based on their attributes [(Demo)](https://iboates.github.io/examples/02_multiple_spotlights/index) [(Source)](https://github.com/iboates/leaflet-spotlight/tree/master/examples/02_multiple_spotlights)


<p align="center">
<img src="gif/spotlight_4.gif" width="400" vertical-align="middle">
</p>
A (toggleable) pair of marker-based spotlights, each of which selectively highlights points based on their attributes [(Demo)](https://iboates.github.io/examples/02_multiple_spotlights_marker/index) [(Source)](https://github.com/iboates/leaflet-spotlight/tree/master/examples/02_multiple_spotlights_marker)
