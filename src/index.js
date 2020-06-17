console.log("working")
console.log(api_key)


function initMap () {
  console.log("called");

  const location = {lat: 51.9851, lng: 5.8987}

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
}


