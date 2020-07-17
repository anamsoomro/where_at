console.log("working")
console.log(api_key)




function initMap () {
  let location = new google.maps.LatLng(51.9851, 5.8987)
  let panorama = new google.maps.StreetViewPanorama(
    document.getElementById('view-map'), {
      position: location,
      disableDefaultUI: true
    }
  );

  let map = new google.maps.Map(
    document.getElementById('guess-map'), {
      zoom: 2,
      center: {lat: 0, lng: 0}, 
      disableDefaultUI: true
    }
  );
  
  let markerBounds = new google.maps.LatLngBounds();
  markerBounds.extend(location)

  map.addListener('bounds_changed', () => {
    console.log("moving")
  })

  let marker = false
  let guess
  let guessed = false
  map.addListener('click', function(event) {
    guessed = true
    guess = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
    marker && marker.setMap(null) // remove prev marker if exists
    marker = new google.maps.Marker({
      position: guess,
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: google.maps.Animation.DROP,
    });
    let submit = document.getElementById('submit')
    submit.addEventListener('click', () => {
      marker && marker.setMap(null) // remove prev marker if exists
      let poly = new google.maps.Polyline({
        path: [location, guess],
        map: map,
        strokeColor: '#547881',
        strokeOpacity: 1.0,
        strokeWeight: 3
      })

      let midpoint = calcMidpoint(guess, location)
      let infowindow = new google.maps.InfoWindow({
        content: `You were off by ${calcDistance(location, guess)} miles.`,
        map: map,
        position: midpoint
      });
      let msg = document.getElementById('msg')
      msg.innerText = `You were off by ${calcDistance(location, guess)} miles.`
      markerBounds.extend(guess)
      map.fitBounds(markerBounds)
      document.getElementById('guess-map').style.pointerEvents = "none"
    })
  });
}

let playAgain = document.getElementById('play-again')
playAgain.addEventListener('click', () => {
  let msg = document.getElementById('msg')
  msg.innerText = ``
  document.getElementById('guess-map').style.pointerEvents = "auto"
  initMap()
})



function calcDistance(mk1, mk2) {
  //   // This uses the ‘haversine’ formula to calculate the great-circle distance between two points – that is, the shortest distance over the earth’s surface – giving an ‘as-the-crow-flies’ distance between the points.
  //   // Haversine formula:	a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  //   // c = 2 ⋅ atan2( √a, √(1−a) )
  //   // d = R ⋅ c
  //   // where	φ is latitude, λ is longitude, R is earth’s radius 
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)
  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return Math.floor(d);
}

function calcMidpoint(mk1, mk2){
  let lat = (mk1.lat() + mk2.lat())/2
  let lon = (mk1.lng() + mk2.lng())/2
  return new google.maps.LatLng(lat, lon)
}

