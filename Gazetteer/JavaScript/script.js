//adding map 
function init(){	
  // spinner
  //topo tile
  var toPoLink = '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a>';
	var toPoURL = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
	var toPoAttrib = '&copy; ' + toPoLink;
		
	//thunderForest tiles
  var thunderURL = 'https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=7cf8c5e07fa540a19da09129a568d6bf';
  var thunderAttrib = '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  

	//ersi Toner tiles
	var esriURL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  var esriAttrib = 'Tiles &copy; Esri';

  //weather
  var clouds = L.OWM.clouds({showLegend: true, opacity: 0.5, appId: '4c7f6d1d7a20eaf6e49b6d2c74950a7c'});
  var temp = L.OWM.temperature({showLegend: true, opacity: 0.5, appId: '4c7f6d1d7a20eaf6e49b6d2c74950a7c'});
  var pressure = L.OWM.pressure({showLegend: true, opacity: 0.5, appId: '4c7f6d1d7a20eaf6e49b6d2c74950a7c'});
  var wind = L.OWM.wind({showLegend: true, opacity: 0.5, appId: '4c7f6d1d7a20eaf6e49b6d2c74950a7c'});
  var rain = L.OWM.rain({showLegend: true, opacity: 0.5, appId: '4c7f6d1d7a20eaf6e49b6d2c74950a7c'});
  //creating the map tiles
  var toPoMap = L.tileLayer(toPoURL, {attribution: toPoAttrib});
  var thunderMap = L.tileLayer(thunderURL, {attribution: thunderAttrib});
  var esriMap = L.tileLayer(esriURL,{
    attribution: esriAttrib,
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
  });
    

  
  var map = L.map('map',{layers: [esriMap], center: [54, 0.7], zoom: 6});
  //Base layers definition and addition
  var baseLayers = {
    "toPo": toPoMap,
    "Thunder Forest Dark": thunderMap,
    "Esri": esriMap
  };
  var overlayMaps = { "Clouds": clouds, "Temperature": temp, "Pressure": pressure, "Wind": wind, "Rain":rain };
  //adding spinner
  map.spin(true);
   //Add baseLayers to map as control layers
   L.control.layers(baseLayers, overlayMaps, {position:'bottomright'}).addTo(map);


// changing zoom postion

  map.zoomControl.setPosition('bottomleft');

 //adding geojson file
  var countryBorder;

  function applyCountryBorder(map, countryname) {
    jQuery
      .ajax({
        type: "GET",
        dataType: "json",
        url:
          "https://nominatim.openstreetmap.org/search?country=" +
          countryname.trim() +
          "&polygon_geojson=1&format=json"
      })
      .then(function(data) {
        /*const latLngs = L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,2) 
        L.polyline(latLngs, {
          color: "red",
          weight: 8,
          opacity: 1
        }).addTo(map);*/
        
        if(countryBorder) {
          map.removeLayer(countryBorder); // remove the old polygon...
        }

        countryBorder = L.geoJSON(data[0].geojson, {
          color: "red",
          weight: 8,
          opacity: 1,
          fillOpacity: 0.0 
        }).addTo(map);
      });
  }
  // changing icon

  var UserIcon = L.icon({
    iconUrl: './images/userIcon.png',
  
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  var cityIcon = L.icon({
    iconUrl: './images/cityIcon.png',
  
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  var capIcon = L.icon({
    iconUrl: "./images/capIcon.png",
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  
  //Global variables 

  var lat = null;
  var lng = null;
  var lat1;
  var lng1;
  var capMarker;
  var cityMarker1;
  var cityMarker2;
  var cityMarker3;
  var cityMarker4;
  var countryCode;
 


  // on document ready

  $(document).ready(function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        console.log(lat);
        console.log(lng);
        
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
            countryCode = (result['data']['countryCode']);
            $('#countrySel').val(result['data']['countryCode']);
          }

          //getting info

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
                var countryName = (result['data'][0]['countryName']);
                $('#txtCountry').html(result['data'][0]['countryName']);
                $('#txtCap').html(result['data'][0]['capital']);
                $('#txtPop').html(result['data'][0]['population']);
                $('#currency').html(result['data'][0]['currencyCode']);
                $('#txtCode').html(result['data'][0]['countryCode']);
                $('#txtArea').html(result['data'][0]['areaInSqKm']);
                $('#txtCont').html(result['data'][0]['continentName']);
                applyCountryBorder(map, countryName);
              }
            
              $.ajax({
                url: "PHP/cityFromCountryCode.php",
                type: 'POST',
                dataType: 'json',
                data: {
                  countryCode: countryCode,
                },
                success: function(result) {
          
                  console.log(result);
                  console.log(countryCode);
                  if (result.status.name == "ok") {
          
                    $('#city01').html(result['data']['cities']['features'][0]['properties']['name']);
                    $('#pop01').html(result['data']['cities']['features'][0]['properties']['population']);
                    var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                    var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                    capMarker = L.marker([lat1, lng1], {icon:capIcon, title: "Capital City"}).addTo(map);
                    $('#city02').html(result['data']['cities']['features'][1]['properties']['name']);
                    $('#pop02').html(result['data']['cities']['features'][1]['properties']['population']);
                    var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                    var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                    cityMarker1 = L.marker([lat2, lng2], {icon: cityIcon}).addTo(map);
                    $('#city03').html(result['data']['cities']['features'][2]['properties']['name']);
                    $('#pop03').html(result['data']['cities']['features'][2]['properties']['population']);
                    var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                    var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                    cityMarker2 = L.marker([lat3, lng3], {icon: cityIcon}).addTo(map);
                    $('#city04').html(result['data']['cities']['features'][3]['properties']['name']);
                    $('#pop04').html(result['data']['cities']['features'][3]['properties']['population']);
                    var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                    var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                    cityMarker3 = L.marker([lat4, lng4], {icon: cityIcon}).addTo(map);
                    $('#city05').html(result['data']['cities']['features'][4]['properties']['name']);
                    $('#pop05').html(result['data']['cities']['features'][4]['properties']['population']);
                    var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                    var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                    cityMarker4 = L.marker([lat5, lng5], {icon: cityIcon}).addTo(map);
                  }
        // timeinfo
                  $.ajax({
                    url: "PHP/timezone.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                      lat: lat,
                      lng: lng
                    },
                    success: function(result) {
  
                      console.log(result);
    
                      if (result.status.name == "ok") {
    
                        $('#Time').html(result['data']['time']);
                        $('#TimeZone').html(result['data']['gmtOffset']);
                        $('#Sunrise').html(result['data']['sunrise']);
                        $('#Sunset').html(result['data']['sunset']);
                        map.spin(false);
                        
                      }
                    }
                  })
                }
              })
            }
          });
        }
      });  
        // this is just a marker placed in that position
        var userLoc = L.marker([position.coords.latitude, position.coords.longitude], {icon: UserIcon, title: "Your Location"}).addTo(map);
 
        // move the map to have the location in its center
        map.panTo(new L.LatLng(lat, lng));
      },   
        function (error) {
          console.log("An error occurred obtaining position.");
        })
    }
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

  //displaying country infomration when country is clicked
  map.on('click', function(e) {
    map.spin(true);
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log(lat);
    console.log(lng);

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
          $('#countrySel').val(result['data']['countryCode']);
          countryCode = (result['data']['countryCode']);
          map.panTo(new L.LatLng(lat, lng));
        }

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

              var countryName = (result['data'][0]['countryName']);
              $('#txtCountry').html(result['data'][0]['countryName']);
              $('#txtCap').html(result['data'][0]['capital']);
              $('#txtPop').html(result['data'][0]['population']);
              $('#currency').html(result['data'][0]['currencyCode']);
              $('#txtCode').html(result['data'][0]['countryCode']);
              $('#txtArea').html(result['data'][0]['areaInSqKm']);
              $('#txtCont').html(result['data'][0]['continentName']);
              $('#base').html(result['data'][0]['currencyCode']);
              applyCountryBorder(map, countryName);
            }
            
            $.ajax({
              url: "PHP/cityFromCountryCode.php",
              type: 'POST',
              dataType: 'json',
              data: {
                countryCode: countryCode,
              },
              success: function(result) {
        
                console.log(result);
                console.log(countryCode);
                if (result.status.name == "ok") {
        
                  $('#city01').html(result['data']['cities']['features'][0]['properties']['name']);
                  $('#pop01').html(result['data']['cities']['features'][0]['properties']['population']);
                  var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                  var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                  capMarker.setLatLng([lat1, lng1]).update();
                  $('#city02').html(result['data']['cities']['features'][1]['properties']['name']);
                  $('#pop02').html(result['data']['cities']['features'][1]['properties']['population']);
                  var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                  var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                  cityMarker1.setLatLng([lat2, lng2]).update();
                  $('#city03').html(result['data']['cities']['features'][2]['properties']['name']);
                  $('#pop03').html(result['data']['cities']['features'][2]['properties']['population']);
                  var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                  var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                  cityMarker2.setLatLng([lat3, lng3]).update();
                  $('#city04').html(result['data']['cities']['features'][3]['properties']['name']);
                  $('#pop04').html(result['data']['cities']['features'][3]['properties']['population']);
                  var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                  var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                  cityMarker3.setLatLng([lat4, lng4]).update();
                  $('#city05').html(result['data']['cities']['features'][4]['properties']['name']);
                  $('#pop05').html(result['data']['cities']['features'][4]['properties']['population']);
                  var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                  var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                  cityMarker4.setLatLng([lat5, lng5]).update();
                }
                   // timeinfo
                $.ajax({
                  url: "PHP/timezone.php",
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    lat: lat,
                    lng: lng
                  },
                  success: function(result) {

                    console.log(result);
  
                    if (result.status.name == "ok") {
  
                      $('#Time').html(result['data']['time']);
                      $('#TimeZone').html(result['data']['gmtOffset']);
                      $('#Sunrise').html(result['data']['sunrise']);
                      $('#Sunset').html(result['data']['sunset']);
                      map.spin(false);
                    }
                  }
                })
              }
            })
          }
        });
      }
    })
  });
    // displaying country information when country is selected from selectBox
    var selectBox = document.getElementById('countrySel');
    selectBox.addEventListener('change', function(e) {
      map.spin(true);

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

            var countryName = (result['data'][0]['countryName']);
            $('#txtCountry').html(result['data'][0]['countryName']);
            $('#txtCap').html(result['data'][0]['capital']);
            $('#txtPop').html(result['data'][0]['population']);
            $('#currency').html(result['data'][0]['currencyCode']);
            $('#txtCode').html(result['data'][0]['countryCode']);
            countryCode = (result['data'][0]['countryCode']);
            $('#txtArea').html(result['data'][0]['areaInSqKm']);
            $('#txtCont').html(result['data'][0]['continentName']);
            $('#base').html(result['data'][0]['currencyCode']);
            applyCountryBorder(map, countryName);
          }
            

          $.ajax({
            url: "PHP/cityFromCountryCode.php",
            type: 'POST',
            dataType: 'json',
            data: {
              countryCode: countryCode,
            },
            success: function(result) {
      
              console.log(result);
              console.log(countryCode);
              if (result.status.name == "ok") {
      
                $('#city01').html(result['data']['cities']['features'][0]['properties']['name']);
                $('#pop01').html(result['data']['cities']['features'][0]['properties']['population']);
                var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                capMarker.setLatLng([lat1, lng1]).update();
                $('#city02').html(result['data']['cities']['features'][1]['properties']['name']);
                $('#pop02').html(result['data']['cities']['features'][1]['properties']['population']);
                var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                cityMarker1.setLatLng([lat2, lng2]).update();
                $('#city03').html(result['data']['cities']['features'][2]['properties']['name']);
                $('#pop03').html(result['data']['cities']['features'][2]['properties']['population']);
                var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                cityMarker2.setLatLng([lat3, lng3]).update();
                $('#city04').html(result['data']['cities']['features'][3]['properties']['name']);
                $('#pop04').html(result['data']['cities']['features'][3]['properties']['population']);
                var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                cityMarker3.setLatLng([lat4, lng4]).update();
                $('#city05').html(result['data']['cities']['features'][4]['properties']['name']);
                $('#pop05').html(result['data']['cities']['features'][4]['properties']['population']);
                var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                cityMarker4.setLatLng([lat5, lng5]).update();
                map.flyTo(new L.LatLng(lat1, lng1));
              }
                     // timeinfo
              $.ajax({
                url: "PHP/timezone.php",
                type: 'POST',
                dataType: 'json',
                data: {
                  lat: lat,
                  lng: lng
                },
                success: function(result) {

                  console.log(result);

                  if (result.status.name == "ok") {

                    $('#Time').html(result['data']['time']);
                    $('#TimeZone').html(result['data']['gmtOffset']);
                    $('#Sunrise').html(result['data']['sunrise']);
                    $('#Sunset').html(result['data']['sunset']);
                    map.spin(false);
                  }
                }
              })
            }
          })
        }
      });
    });

//closing init  
}
