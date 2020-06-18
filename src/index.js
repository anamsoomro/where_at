console.log("working")
console.log(api_key)


function initMap () {

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
      zoom: 2,
      center: {lat: 0, lng: 0}
    });



  map.addListener('bounds_changed', () => {
    console.log("moving")
  })

  map.addListener('click', function(event) {
    let guess = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
    // let lat = event.latLng.lat()
    // let lon = event.latLng.lng()
    // console.log({lat, lon});
    // console.log(calcDistance({lat,lon}, {lat: location.lat(), lon: location.lng()} ));
    // console.log((event.latLng));
    // console.log((location));
    let poly = new google.maps.Polyline({
      path: [location, guess],
      map: map,
      strokeColor: '#547881',
      strokeOpacity: 1.0,
      strokeWeight: 3
    })

    let msg = document.getElementById('msg')
    msg.innerText = calcDistance( )




  });


  

}




// function calcDistance (pointA, pointB) { // point = {lat: lat, lon: lon}
//   // This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points.
//   // Haversine formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
//   // c = 2 ⋅ atan2( √a, √(1−a) )
//   // d = R ⋅ c
//   // where	φ is latitude, λ is longitude, R is earth’s radius 
//   // const R = 6371e3; // mean r of earth in metres
//   const R = 3958.8; // mean r of earth in miles

//   // convert to radians
//   const phi1 = pointA.lat * Math.PI/180; 
//   const phi2 = pointB.lat * Math.PI/180;

//   const deltaPhi = (pointB.lat-pointA.lat) * Math.PI/180;
//   const deltaLambda = (pointB.lon-pointA.lon) * Math.PI/180;

//   const a = Math.sin(deltaPhi/2) * Math.sin(deltaPhi/2) + // squared
//             Math.cos(phi1) * Math.cos(phi2) *
//             Math.sin(deltaLambda/2) * Math.sin(deltaLambda/2); // squared
//   // the great circle is the plane in which the two points and center go through the sphere
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // great circle distance in radians

//   const d = R * c; // in miles
//   return d
// }

function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng()-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

