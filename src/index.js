console.log("working")
console.log(api_key)


function initMap () {
  console.log("called");

  // const location = {lat: 51.9851, lng: 5.8987}
  const location = new google.maps.LatLng(51.9851, 5.8987)

  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('view-map'), {
      position: location,
      pov: {
        heading: 0,
        pitch: 0
      },
      visible: true
    });

  var map = new google.maps.Map(
    document.getElementById('guess-map'), {
      zoom: 4,
      center: location
    });

  map.addListener('bounds_changed', () => {
    console.log("moving")
  })

  map.addListener('click', function(mapsMouseEvent) {
    let lat = mapsMouseEvent.latLng.lat()
    let lon = mapsMouseEvent.latLng.lng()
    // console.log(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng());
    console.log({lat, lon});

    console.log(calcDistance({lat,lon}, {lat: location.lat(), lon: location.lng()} ));
  });


  

}




function calcDistance (pointA, pointB) { // point = {lat: lat, lon: lon}
  // This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points.
  // Haversine formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  // c = 2 ⋅ atan2( √a, √(1−a) )
  // d = R ⋅ c
  // where	φ is latitude, λ is longitude, R is earth’s radius 
  // const R = 6371e3; // mean r of earth in metres
  const R = 3958.8; // mean r of earth in miles

  // convert to radians
  const phi1 = pointA.lat * Math.PI/180; 
  const phi2 = pointB.lat * Math.PI/180;

  const deltaPhi = (pointB.lat-pointA.lat) * Math.PI/180;
  const deltaLambda = (pointB.lon-pointA.lon) * Math.PI/180;

  const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) + // squared
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2); // squared
  // the great circle is the plane in which the two points and center go through the sphere
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // great circle distance in radians

  const d = R * c; // in metres
  return d
}


