
A Ready to Use Poyline Generator on Map based on React-Native-Maps Module.
Click to Draw a polyline and Zoom In and Zoom Out.

Installation
npm install polyline-creator


Dependencies

react-native-maps
(Please follow instructions on how to install here(https://github.com/airbnb/react-native-maps/blob/master/docs/installation.md))

Usage.


<PolylineCreator.PolylineMap/> renders the Map.


Methods.

PolylineCreator.Data() get the coordinates of all the points(Polylines) drawn on the Map

PolylineCreator.ZoomIn(factor) Zoom in  the Map in intervals of factor Provided
factor is a number ranging from 1 to 100.
Every time the methods is triggered, the Map zooms factor provided
Example: PolylineCreator.ZoomIn(50) the Map Zooms in 50 Scale


PolylineCreator.ZoomOut(100) Zoom out  the Map in intervals of factor Provided
factor is a number ranging from 1 to 100.
Every time the methods is triggered, the Map zooms factor provided
Example: PolylineCreator.ZoomOut(50) the Map Zooms in 50 Scale


PolylineCreator.reset()

Resets the Map to Initial state.
