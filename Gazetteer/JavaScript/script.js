//adding map 
function init(){	
  var baseLayer = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=9jezmYY0cQ8EaEjXnXeO',{ attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'});
  var map = L.map('map',{layers: [baseLayer], center: [-23.88, -62.75], zoom: 6});
  L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=9jezmYY0cQ8EaEjXnXeO', {
    
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(map);


// changing zoom postion

  map.zoomControl.setPosition('bottomleft');

// changing icon

  var redIcon = L.icon({
    iconUrl: './pictures/map-icon.png',
  
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  
  //locating user on start-up 
  var abc = null;
  var lat = null;
  var lng = null;

  $(document).ready(function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        // this is just a marker placed in that position
        var abc = L.marker([position.coords.latitude, position.coords.longitude], {icon: redIcon}).addTo(map);
        // move the map to have the location in its center
        map.panTo(new L.LatLng(lat, lng));
      },   
        function (error) {
          console.log("An error occurred obtaining position.");
        })
      // Getting country code from geonames
    $.ajax({
      url: "PHP/getCountryCode.php",
      type: 'POST',
      dataType: 'json',
      data: {
        lat : lat,
        lng : lng
      },
      success: function(result) {

        console.log(result);
         
        if (result.status.name == "ok") {
          $('countrySel').val(result['data'[0]['countryCode']]);
        }
      }
    })
  }
  });
    // displaying country information
  var selectBox = document.getElementById('countrySel');
  selectBox.addEventListener('change', function(e) {
    $.ajax({
      url: "PHP/countryInfo.php",
      type: 'POST',
      dataType: 'json',
      data: {
        country : $('#countrySel').val(),
      },
      success: function(result) {

        console.log(result);

        if (result.status.name == "ok") {

          $('#txtCountry').html(result['data'][0]['countryName']);
          $('#txtCap').html(result['data'][0]['capital']);
          $('#txtPop').html(result['data'][0]['population']);
          $('#txtfips').html(result['data'][0]['fipsCode']);
          $('#txtiso').html(result['data'][0]['isoAlpha3']);
          $('#txtArea').html(result['data'][0]['areaInSqKm']);
          $('#txtCont').html(result['data'][0]['continentName']);
        }
      }
    });
  });

  // Show an element
  var show = function (elem) {
    elem.classList.add('is-visible');
  };
  
  // Hide an element
  var hide = function (elem) {
    elem.classList.remove('is-visible');
  };
  
  // Toggle element visibility
  var toggle = function (elem) {
    elem.classList.toggle('is-visible');
  };
  
  // Listen for click events
  document.addEventListener('click', function (event) {
  
    // Make sure clicked element is our toggle
    if (!event.target.classList.contains('toggle')) return;
    event.preventDefault();
  
  
    var content = document.querySelector(event.target.hash);
    if (!content) return;
    toggle(content);
  
  }, false);

  //getting country information on click
  map.on('click', function(e) {
    
  })

}
