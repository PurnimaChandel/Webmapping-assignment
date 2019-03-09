
  var equakeMapLink = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
 var earthquakes = L.geoJSON ([],{
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, {
          stroke: false,
          fillOpacity: 0.75,
          color: "white",
          fillColor: getColor(feature.properties.mag),
          radius: feature.properties.mag*3
        })
      }
      })
      .bindPopup(function(layer){
      return("<h3>"+layer.feature.properties.place+
      "</h3><hr><p>"+layer.feature.properties.mag+"</p><hr>"+
      "</h3><p>"+ new Date(layer.feature.properties.time)+"</p>");
      });
 
 d3.json(equakeMapLink, function(data) {
    earthquakes.addData(data.features);
 });
 
 function getColor(mag)
   {
       switch(parseInt(mag)){
           case 0: return '#b7f34d';
           case 1: return '#e1f34d';
           case 2: return '#f3db4d';
           case 3: return '#f3ba4d';
           case 4: return '#f0a76b';
           default: return '#f06b6b';
       }
   }
 // Adding tile layer to the map
  var street_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
 });
 
 var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
 });
 
 
 var  base_maps = {"street map": street_map, "dark map": darkmap};
 var overlay_maps = {Earthquakes: earthquakes};
 var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 5,
    layers : [street_map, earthquakes]
  });
 L.control.layers(base_maps,overlay_maps,{
    collapsed: false
 }).addTo(myMap);
 
   CreateLegend();
   function CreateLegend()
   {
   var legend = L.control({ position: "bottomright" });
 
   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend");
     var labels = ["0-1","1-2","2-3","3-4","4-5","5+"];
     var legends = [];
     //div.innerHTML = legendInfo;
 
     for(var i=0;i<labels.length;i++) {
       legends.push("<li style=\"list-style-type:none;\"><div style=\"background-color: " + getColor(i) + "\">&nbsp;</div> "+
                                                        "<div>"+ labels[i]+"</div></li>");
     }
 
     div.innerHTML += "<ul class='legend'>" + legends.join("") + "</ul>";
     return div;
   };
 
   // Adding legend to the map
   legend.addTo(myMap);
   }