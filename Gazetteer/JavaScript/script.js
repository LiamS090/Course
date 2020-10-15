//adding map 
function init(){	

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
    

  
  var map = L.map('map',{layers: [esriMap], center: [51, 0.4], zoom: 5});
  //Base layers definition and addition
  var baseLayers = {
    "toPo": toPoMap,
    "Thunder Forest Dark": thunderMap,
    "Esri": esriMap
  };
  var overlayMaps = { "Clouds": clouds, "Temperature": temp, "Pressure": pressure, "Wind": wind, "Rain":rain };


   // Create additional Control placeholders
function addControlPlaceholders(map) {
  var corners = map._controlCorners,
      l = 'leaflet-',
      container = map._controlContainer;

  function createCorner(vSide, hSide) {
      var className = l + vSide + ' ' + l + hSide;

      corners[vSide + hSide] = L.DomUtil.create('div', className, container);
  }

  createCorner('verticalcenter', 'left');
  createCorner('verticalcenter', 'right');
}
addControlPlaceholders(map);


   //Add baseLayers to map as control layers
   L.control.layers(baseLayers, overlayMaps, {position: 'verticalcenterright'}).addTo(map);


// changing zoom postion

map.zoomControl.remove();

//Modal btn functionality
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
});

  // changing icon

  var cityIcon = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'orange-dark',
    shape: 'circle',
    prefix: 'fa'
  });

  var capIcon = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'orange',
    shape: 'penta',
    prefix: 'fa'
  });
  
  //Global variables 

  var lat = null;
  var lng = null;
  var north;
  var south;
  var east;
  var west;
  var capMarker;
  var cityMarker1;
  var cityMarker2;
  var cityMarker3;
  var cityMarker4;
  var cityMarker5;
  var cityMarker6;
  var cityMarker7;
  var cityMarker8;
  var countryCode;
  var countryName;
  var border;
 
  

  // on document ready

  $(document).ready(function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        map.spin(true);
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
            
          }

          //populating select box
          $.ajax({
            url: "PHP/codeName.php",
            type: 'POST',
            dataType: 'json',
            data: {
              countryCode: countryCode,
            },
            success: function(result) {

              console.log(result);
              console.log(countryCode);
        
              $('#countrySel').html('');
        
              $.each(result.data, function(index) {
                  
                $('#countrySel').append($("<option>", {
                value: result.data[index].code,
                text: result.data[index].name
                }));  
              });
            }
          })  
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
              north = result['data'][0]['north'];
              south = result['data'][0]['south'];
              east = result['data'][0]['east'];
              west = result['data'][0]['west'];
              console.log(north);
              countryName = (result['data'][0]['countryName']);

              if (result.status.name == "ok") {
                
                $('#countrySel').val(result['data']['countryCode']);
                $('#txtCountry').html(result['data'][0]['countryName']);
                $('#txtCap').html(result['data'][0]['capital']);
                var pop = numeral(result['data'][0]['population']).format('0,0');
                $('#txtPop').html(pop);
                $('#currency').html(result['data'][0]['currencyCode']);
                $('#txtCode').html(result['data'][0]['countryCode']);
                var area = numeral(result['data'][0]['areaInSqKm']).format('0,0');
                $('#txtArea').html(area);
                $('#txtCont').html(result['data'][0]['continentName']);

              }

              $.ajax({
                url: "PHP/countryBorder.php",
                type: 'POST',
                dataType: 'json',
                data: {
                  countryName : countryName,
                },
                success: function(result) {
                
                  console.log(result);

                  if (result.status.name == "ok") {
                                    
                    if (map.hasLayer(border)) {
                      map.removeLayer(border);
                    }
  
                    border = L.geoJson(result.data,{
                      color: 'white',
                      weight: 3,
                      opacity: 0.75
                    }).addTo(map);         
  
                    map.fitBounds(border.getBounds());
  
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
                    
                        var link = "https://";
                        var capital = result['data']['cities']['features'][0]['properties']['name'];
                        var capitalLink = result['data']['cities']['features'][0]['properties']['wikipedia'];
                        document.getElementById("capLink").setAttribute("href",link+capitalLink);
                        $('#cap').html(capital);
                        var pop1 = numeral(result['data']['cities']['features'][0]['properties']['population']).format('0,0');
                        $('#capPop').html(pop1);
                        var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                        var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                        capMarker = L.marker([lat1, lng1], {icon:capIcon}).addTo(map);
                        capMarker.bindTooltip(capital).openTooltip();



                        var city1 = (result['data']['cities']['features'][1]['properties']['name'])
                        var city1Link = result['data']['cities']['features'][1]['properties']['wikipedia'];
                        document.getElementById('cityLink1').setAttribute('href',link+city1Link);
                        $('#city01').html(city1);
                        var pop01 = numeral(result['data']['cities']['features'][1]['properties']['population']).format('0,0');
                        $('#pop01').html(pop01);
                        var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                        var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                        cityMarker1 = L.marker([lat2, lng2], {icon: cityIcon}).addTo(map);
                        cityMarker1.bindTooltip(city1).openTooltip();

                        var city2 = (result['data']['cities']['features'][2]['properties']['name']);
                        var city2Link = result['data']['cities']['features'][2]['properties']['wikipedia'];
                        document.getElementById('cityLink2').setAttribute('href',link+city2Link);
                        $('#city02').html(city2);
                        var pop02 = numeral(result['data']['cities']['features'][2]['properties']['population']).format('0,0');
                        $('#pop02').html(pop02);
                        var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                        var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                        cityMarker2 = L.marker([lat3, lng3], {icon: cityIcon}).addTo(map);
                        cityMarker2.bindTooltip(city2).openTooltip();

                        var city3 = (result['data']['cities']['features'][3]['properties']['name']);
                        var city3Link = result['data']['cities']['features'][3]['properties']['wikipedia'];
                        document.getElementById('cityLink3').setAttribute('href',link+city3Link);
                        $('#city03').html(city3);
                        var pop03 = numeral(result['data']['cities']['features'][3]['properties']['population']).format('0,0');
                        $('#pop03').html(pop03);
                        var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                        var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                        cityMarker3 = L.marker([lat4, lng4], {icon: cityIcon}).addTo(map);
                        cityMarker3.bindTooltip(city3).openTooltip();

                        var city4 = (result['data']['cities']['features'][4]['properties']['name']);
                        var city4Link = result['data']['cities']['features'][4]['properties']['wikipedia'];
                        document.getElementById('cityLink4').setAttribute('href',link+city4Link);
                        $('#city04').html(city4);
                        var pop04 = numeral(result['data']['cities']['features'][4]['properties']['population']).format('0,0');
                        $('#pop04').html(pop04);
                        var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                        var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                        cityMarker4 = L.marker([lat5, lng5], {icon: cityIcon}).addTo(map);
                        cityMarker4.bindTooltip(city4).openTooltip();

                        var city5 = (result['data']['cities']['features'][5]['properties']['name']);
                        var city5Link = result['data']['cities']['features'][5]['properties']['wikipedia'];
                        document.getElementById('cityLink5').setAttribute('href',link+city5Link);
                        $('#city05').html(city5);
                        var pop05 = numeral(result['data']['cities']['features'][5]['properties']['population']).format('0,0');
                        $('#pop05').html(pop05);
                        var lat6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][1]);
                        var lng6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][0]);
                        cityMarker5 = L.marker([lat6, lng6], {icon:cityIcon}).addTo(map);
                        cityMarker5.bindTooltip(city5).openTooltip();

                        var city6 = (result['data']['cities']['features'][6]['properties']['name']);
                        var city6Link = result['data']['cities']['features'][6]['properties']['wikipedia'];
                        document.getElementById('cityLink6').setAttribute('href',link+city6Link);
                        $('#city06').html(city6);
                        var pop06 = numeral(result['data']['cities']['features'][6]['properties']['population']).format('0,0');
                        $('#pop06').html(pop06);
                        var lat7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][1]);
                        var lng7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][0]);
                        cityMarker6 = L.marker([lat7, lng7], {icon: cityIcon}).addTo(map);
                        cityMarker6.bindTooltip(city6).openTooltip();

                        var city7 = (result['data']['cities']['features'][7]['properties']['name']);
                        var city7Link = result['data']['cities']['features'][7]['properties']['wikipedia'];
                        document.getElementById('cityLink7').setAttribute('href',link+city7Link);
                        $('#city07').html(city7);
                        var pop07 = numeral(result['data']['cities']['features'][7]['properties']['population']).format('0,0');
                        $('#pop07').html(pop07);
                        var lat8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][1]);
                        var lng8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][0]);
                        cityMarker7 = L.marker([lat8, lng8], {icon: cityIcon}).addTo(map);
                        cityMarker7.bindTooltip(city7).openTooltip();

                        var city8 = (result['data']['cities']['features'][8]['properties']['name']);
                        var city8Link = result['data']['cities']['features'][8]['properties']['wikipedia'];
                        document.getElementById('cityLink8').setAttribute('href',link+city8Link);
                        $('#city08').html(city8);
                        var pop08 = numeral(result['data']['cities']['features'][8]['properties']['population']).format('0,0');
                        $('#pop08').html(pop08);
                        var lat9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][1]);
                        var lng9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][0]);
                        cityMarker8 = L.marker([lat9, lng9], {icon: cityIcon}).addTo(map);
                        cityMarker8.bindTooltip(city8).openTooltip();

                        var city9 = (result['data']['cities']['features'][9]['properties']['name']);
                        var city9Link = result['data']['cities']['features'][9]['properties']['wikipedia'];
                        document.getElementById('cityLink9').setAttribute('href',link+city9Link);
                        $('#city09').html(city9);
                        var pop09 = numeral(result['data']['cities']['features'][9]['properties']['population']).format('0,0');
                        $('#pop09').html(pop09);
                        var lat10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][1]);
                        var lng10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][0]);
                        cityMarker9 = L.marker([lat10, lng10], {icon: cityIcon}).addTo(map);
                        cityMarker9.bindTooltip(city9).openTooltip();
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

                          function checkTime(i) {
                            if (i < 10) {
                              i = "0" + i;
                            }
                            return i;
                          }
    
                          if (result.status.name == "ok") {
    
                            $('#Time').html(result['data']['time']);
                            $('#TimeZone').html(result['data']['gmtOffset']);
                            var d = new Date(result['data']['sunrise']);
                            var h = d.getHours();
                            var m = d.getMinutes();
                            m = checkTime(m);
                            $('#Sunrise').html(h + ":" + m);
                            var d1 = new Date(result['data']['sunset']);
                            var h1 = d1.getHours();
                            var m1 = d1.getMinutes();
                            m1 = checkTime(m1);
                            $('#Sunset').html(h1 + ":" + m1)
                        
                          }
                          // wiki info
                          $.ajax({
                            url: "PHP/getWikiInfo.php",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                              north: north,
                              south: south,
                              east: east,
                              west: west,
                            },
                            success: function(result) {
      
                              console.log(result);
        
                              if (result.status.name == "ok") {
                                var link = "http://"        
                                $('#title0').html(result['data'][0]['title']);
                                $('#summary0').html(result['data'][0]['summary']);
                                var link0 = result['data'][0]['wikipediaUrl'];
                                document.getElementById("link00").setAttribute("href",link+link0);
                                $('#link0').html(link0);

                                $('#title1').html(result['data'][1]['title']);
                                $('#summary1').html(result['data'][1]['summary']);
                                var link1 = result['data'][1]['wikipediaUrl'];
                                document.getElementById("link01").setAttribute("href",link+link1);
                                $('#link1').html(link1);

                                $('#title2').html(result['data'][2]['title']);
                                $('#summary2').html(result['data'][2]['summary']);
                                var link2 = result['data'][2]['wikipediaUrl'];
                                document.getElementById("link02").setAttribute("href",link+link2);
                                $('#link2').html(link2);

                                map.spin(false);
                            
                              }
                            else {
                            $('#title0').html("not enough information");
                            $('#summary0').html();


                            $('#title1').html();
                            $('#summary1').html();


                            $('#title2').html();
                            $('#summary2').html();

                            map.spin(false);
                          }
                            },
                            error: function (jqXHR, exception) {
                              var msg = '';
                              if (jqXHR.status === 0) {
                                  msg = 'Not connect.\n Verify Network.';
                              } else if (jqXHR.status == 404) {
                                  msg = 'Requested page not found. [404]';
                              } else if (jqXHR.status == 500) {
                                  msg = 'Internal Server Error [500].';
                              } else if (exception === 'parsererror') {
                                  msg = 'Requested JSON parse failed.';
                              } else if (exception === 'timeout') {
                                  msg = 'Time out error.';
                              } else if (exception === 'abort') {
                                  msg = 'Ajax request aborted.';
                              } else {
                                  msg = 'Uncaught Error.\n' + jqXHR.responseText;
                              }
                              console.log(msg);
                            }  
                          })
                        }
                      })
                    }
                  })  
                }
              })
            }
          })
        }  
      })
    },
         
        function (error) {
          console.log("An error occurred obtaining position.");
      });
    }
  });

  
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
            north = result['data'][0]['north'];
            south = result['data'][0]['south'];
            east = result['data'][0]['east'];
            west = result['data'][0]['west'];
            console.log(north);
            countryName = result['data'][0]['countryName'];
    
            if (result.status.name == "ok") {

              var countryName = (result['data'][0]['countryName']);
              $('#txtCountry').html(result['data'][0]['countryName']);
              $('#txtCap').html(result['data'][0]['capital']);
              var pop = numeral(result['data'][0]['population']).format('0,0');
              $('#txtPop').html(pop);
              $('#currency').html(result['data'][0]['currencyCode']);
              $('#txtCode').html(result['data'][0]['countryCode']);
              var area = numeral(result['data'][0]['areaInSqKm']).format('0,0');
              $('#txtArea').html(area);
              $('#txtCont').html(result['data'][0]['continentName']);
              $('#base').html(result['data'][0]['currencyCode']);
            }
            
            $.ajax({
              url: "PHP/countryBorder.php",
              type: 'POST',
              dataType: 'json',
              data: {
                countryName : countryName,
              },
              success: function(result) {
              
                console.log(result);

                if (result.status.name == "ok") {
                                  
                  if (map.hasLayer(border)) {
                    map.removeLayer(border);
                  }

                  border = L.geoJson(result.data,{
                    color: 'white',
                    weight: 3,
                    opacity: 0.75
                  }).addTo(map);         

                  map.fitBounds(border.getBounds());

                }  
            
                $.ajax({
                  url: "PHP/cityFromCountryCode.php",
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    countryCode: countryCode,
                  },
                  success: function(result) {
                    
                    console.log(countryCode);
                    console.log(result);

                    if (result.status.name == "ok") {

                      var link = "http://"
                      var capital = (result['data']['cities']['features'][0]['properties']['name']);
                      var capitalLink = result['data']['cities']['features'][0]['properties']['wikipedia'];
                      document.getElementById("capLink").setAttribute("href",link+capitalLink);
                      $('#cap').html(capital);
                      var pop1 = numeral(result['data']['cities']['features'][0]['properties']['population']).format('0,0');
                      $('#capPop').html(pop1);
                      var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                      var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                      capMarker.setLatLng([lat1, lng1]).update();
                      capMarker.bindTooltip(capital).openTooltip();

                      var city1 = (result['data']['cities']['features'][1]['properties']['name'])
                      var city1Link = result['data']['cities']['features'][1]['properties']['wikipedia'];
                      document.getElementById('cityLink1').setAttribute('href',link+city1Link);
                      $('#city01').html(city1);
                      var pop01 = numeral(result['data']['cities']['features'][1]['properties']['population']).format('0,0');
                      $('#pop01').html(pop01);
                      var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                      var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                      cityMarker1.setLatLng([lat2, lng2]).update();
                      cityMarker1.bindTooltip(city1).openTooltip();

                      var city2 = (result['data']['cities']['features'][2]['properties']['name']);
                      var city2Link = result['data']['cities']['features'][2]['properties']['wikipedia'];
                      document.getElementById('cityLink2').setAttribute('href',link+city2Link);
                      $('#city02').html(city2);
                      var pop02 = numeral(result['data']['cities']['features'][2]['properties']['population']).format('0,0');
                      $('#pop02').html(pop02);
                      var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                      var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                      cityMarker2.setLatLng([lat3, lng3]).update();
                      cityMarker2.bindTooltip(city2).openTooltip();

                      var city3 = (result['data']['cities']['features'][3]['properties']['name']);
                      var city3Link = result['data']['cities']['features'][3]['properties']['wikipedia'];
                      document.getElementById('cityLink3').setAttribute('href',link+city3Link);
                      $('#city03').html(city3);
                      var pop03 = numeral(result['data']['cities']['features'][3]['properties']['population']).format('0,0');
                      $('#pop03').html(pop03);
                      var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                      var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                      cityMarker3.setLatLng([lat4, lng4]).update();
                      cityMarker3.bindTooltip(city3).openTooltip();

                      var city4 = (result['data']['cities']['features'][4]['properties']['name']);
                      var city4Link = result['data']['cities']['features'][4]['properties']['wikipedia'];
                      document.getElementById('cityLink4').setAttribute('href',link+city4Link);
                      $('#city04').html(city4);
                      var pop04 = numeral(result['data']['cities']['features'][4]['properties']['population']).format('0,0');
                      $('#pop04').html(pop04);
                      var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                      var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                      cityMarker4.setLatLng([lat5, lng5]).update();
                      cityMarker4.bindTooltip(city4).openTooltip();

                      var city5 = (result['data']['cities']['features'][5]['properties']['name']);
                      var city5Link = result['data']['cities']['features'][5]['properties']['wikipedia'];
                      document.getElementById('cityLink5').setAttribute('href',link+city5Link);
                      $('#city05').html(city5);
                      var pop05 = numeral(result['data']['cities']['features'][5]['properties']['population']).format('0,0');
                      $('#pop05').html(pop05);
                      var lat6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][1]);
                      var lng6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][0]);
                      cityMarker5.setLatLng([lat6, lng6]).update();
                      cityMarker5.bindTooltip(city5).openTooltip();

                      var city6 = (result['data']['cities']['features'][6]['properties']['name']);
                      var city6Link = result['data']['cities']['features'][6]['properties']['wikipedia'];
                      document.getElementById('cityLink6').setAttribute('href',link+city6Link);
                      $('#city06').html(city6);
                      var pop06 = numeral(result['data']['cities']['features'][6]['properties']['population']).format('0,0');
                      $('#pop06').html(pop06);
                      var lat7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][1]);
                      var lng7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][0]);
                      cityMarker6.setLatLng([lat7, lng7]).update();
                      cityMarker6.bindTooltip(city6).openTooltip();

                      var city7 = (result['data']['cities']['features'][7]['properties']['name']);
                      var city7Link = result['data']['cities']['features'][7]['properties']['wikipedia'];
                      document.getElementById('cityLink7').setAttribute('href',link+city7Link);
                      $('#city07').html(city7);
                      var pop07 = numeral(result['data']['cities']['features'][7]['properties']['population']).format('0,0');
                      $('#pop07').html(pop07);
                      var lat8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][1]);
                      var lng8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][0]);
                      cityMarker7.setLatLng([lat8, lng8]).update();
                      cityMarker7.bindTooltip(city7).openTooltip();

                      var city8 = (result['data']['cities']['features'][8]['properties']['name']);
                      var city8Link = result['data']['cities']['features'][8]['properties']['wikipedia'];
                      document.getElementById('cityLink8').setAttribute('href',link+city8Link);
                      $('#city08').html(city8);
                      var pop08 = numeral(result['data']['cities']['features'][8]['properties']['population']).format('0,0');
                      $('#pop08').html(pop08);
                      var lat9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][1]);
                      var lng9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][0]);
                      cityMarker8.setLatLng([lat9, lng9]).update();
                      cityMarker8.bindTooltip(city8).openTooltip();

                      var city9 = (result['data']['cities']['features'][9]['properties']['name']);
                      var city9Link = result['data']['cities']['features'][9]['properties']['wikipedia'];
                      document.getElementById('cityLink9').setAttribute('href',link+city9Link);
                      $('#city09').html(city9);
                      var pop09 = numeral(result['data']['cities']['features'][9]['properties']['population']).format('0,0');
                      $('#pop09').html(pop09);
                      var lat10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][1]);
                      var lng10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][0]);
                      cityMarker9.setLatLng([lat10, lng10]).update();
                      cityMarker9.bindTooltip(city9).openTooltip();
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

                        function checkTime(i) {
                          if (i < 10) {
                            i = "0" + i;
                          }
                          return i;
                        }
  
                        if (result.status.name == "ok") {
  
                          $('#Time').html(result['data']['time']);
                          $('#TimeZone').html(result['data']['gmtOffset']);
                          var d = new Date(result['data']['sunrise']);
                          var h = d.getHours();
                          var m = d.getMinutes();
                          m = checkTime(m);
                          $('#Sunrise').html(h + ":" + m);
                          var d1 = new Date(result['data']['sunset']);
                          var h1 = d1.getHours();
                          var m1 = d1.getMinutes();
                          m1 = checkTime(m1);
                          $('#Sunset').html(h1 + ":" + m1)
                     
                        }
                           // wiki info
                        $.ajax({
                          url: "PHP/getWikiInfo.php",
                          type: 'POST',
                          dataType: 'json',
                          data: {
                            north: north,
                            south: south,
                            east: east,
                            west: west,
                          },
                          success: function(result) {
    
                            console.log(result);
        
                            if (result.status.name == "ok") {
                              var link = "http://"        
                              $('#title0').html(result['data'][0]['title']);
                              $('#summary0').html(result['data'][0]['summary']);
                              var link0 = result['data'][0]['wikipediaUrl'];
                              document.getElementById("link00").setAttribute("href",link+link0);
                              $('#link0').html(link0);

                              $('#title1').html(result['data'][1]['title']);
                              $('#summary1').html(result['data'][1]['summary']);
                              var link1 = result['data'][1]['wikipediaUrl'];
                              document.getElementById("link01").setAttribute("href",link+link1);
                              $('#link1').html(link1);

                              $('#title2').html(result['data'][2]['title']);
                              $('#summary2').html(result['data'][2]['summary']);
                              var link2 = result['data'][2]['wikipediaUrl'];
                              document.getElementById("link02").setAttribute("href",link+link2);
                              $('#link2').html(link2);

                              map.spin(false);
                           
                            }
                            else {
                              $('#title0').html("not enough information");
                              $('#summary0').html();
  
  
                              $('#title1').html();
                              $('#summary1').html();
  
  
                              $('#title2').html();
                              $('#summary2').html();
  
                              map.spin(false);
                            }
                          },
                          error: function (jqXHR, exception) {
                            var msg = '';
                            if (jqXHR.status === 0) {
                                msg = 'Not connect.\n Verify Network.';
                            } else if (jqXHR.status == 404) {
                                msg = 'Requested page not found. [404]';
                            } else if (jqXHR.status == 500) {
                                msg = 'Internal Server Error [500].';
                            } else if (exception === 'parsererror') {
                                msg = 'Requested JSON parse failed.';
                            } else if (exception === 'timeout') {
                                msg = 'Time out error.';
                            } else if (exception === 'abort') {
                                msg = 'Ajax request aborted.';
                            } else {
                                msg = 'Uncaught Error.\n' + jqXHR.responseText;
                            }
                            console.log(msg);
                          }  
                        })   
                      }
                    })
                  }
                })
              }
            })
          }
        })
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
          north = result['data'][0]['north'];
          south = result['data'][0]['south'];
          east = result['data'][0]['east'];
          west = result['data'][0]['west'];
          console.log(north);
          countryName = result['data'][0]['countryName'];
  
          if (result.status.name == "ok") {

            var countryName = (result['data'][0]['countryName']);
            $('#txtCountry').html(result['data'][0]['countryName']);
            $('#txtCap').html(result['data'][0]['capital']);
            var pop = numeral(result['data'][0]['population']).format('0,0');
            $('#txtPop').html(pop);
            $('#currency').html(result['data'][0]['currencyCode']);
            $('#txtCode').html(result['data'][0]['countryCode']);
            countryCode = (result['data'][0]['countryCode']);
            var area = numeral(result['data'][0]['areaInSqKm']).format('0,0');
            $('#txtArea').html(area);
            $('#txtCont').html(result['data'][0]['continentName']);
            $('#base').html(result['data'][0]['currencyCode']);
          }
            
          $.ajax({
            url: "PHP/countryBorder.php",
            type: 'POST',
            dataType: 'json',
            data: {
              countryName : countryName,
            },
            success: function(result) {
            
              console.log(result);

              if (result.status.name == "ok") {
                                
                if (map.hasLayer(border)) {
                  map.removeLayer(border);
                }

                border = L.geoJson(result.data,{
                  color: 'white',
                  weight: 3,
                  opacity: 0.75
                }).addTo(map);         

                map.fitBounds(border.getBounds());

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
       
                    var link = "http://"
                    var capital = (result['data']['cities']['features'][0]['properties']['name']);
                    var capitalLink = result['data']['cities']['features'][0]['properties']['wikipedia'];
                    document.getElementById("capLink").setAttribute("href",link+capitalLink);
                    $('#cap').html(capital);
                    var pop1 = numeral(result['data']['cities']['features'][0]['properties']['population']).format('0,0');
                    $('#capPop').html(pop1);
                    var lat1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][1]);
                    var lng1 = (result['data']['cities']['features'][0]['geometry']['coordinates'][0]);
                    capMarker.setLatLng([lat1, lng1]).update();
                    capMarker.bindTooltip(capital).openTooltip();


                    var city1 = (result['data']['cities']['features'][1]['properties']['name'])
                    var city1Link = result['data']['cities']['features'][1]['properties']['wikipedia'];
                    document.getElementById('cityLink1').setAttribute('href',link+city1Link);
                    $('#city01').html(city1);
                    var pop01 = numeral(result['data']['cities']['features'][1]['properties']['population']).format('0,0');
                    $('#pop01').html(pop01);
                    var lat2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][1]);
                    var lng2 = (result['data']['cities']['features'][1]['geometry']['coordinates'][0]);
                    cityMarker1.setLatLng([lat2, lng2]).update();
                    cityMarker1.bindTooltip(city1).openTooltip();
 
                    var city2 = (result['data']['cities']['features'][2]['properties']['name']);
                    var city2Link = result['data']['cities']['features'][2]['properties']['wikipedia'];
                    document.getElementById('cityLink2').setAttribute('href',link+city2Link);
                    $('#city02').html(city2);
                    var pop02 = numeral(result['data']['cities']['features'][2]['properties']['population']).format('0,0');
                    $('#pop02').html(pop02);
                    var lat3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][1]);
                    var lng3 = (result['data']['cities']['features'][2]['geometry']['coordinates'][0]);
                    cityMarker2.setLatLng([lat3, lng3]).update();
                    cityMarker2.bindTooltip(city2).openTooltip();

                    var city3 = (result['data']['cities']['features'][3]['properties']['name']);
                    var city3Link = result['data']['cities']['features'][3]['properties']['wikipedia'];
                    document.getElementById('cityLink3').setAttribute('href',link+city3Link);
                    $('#city03').html(city3);
                    var pop03 = numeral(result['data']['cities']['features'][3]['properties']['population']).format('0,0');
                    $('#pop03').html(pop03);
                    var lat4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][1]);
                    var lng4 = (result['data']['cities']['features'][3]['geometry']['coordinates'][0]);
                    cityMarker3.setLatLng([lat4, lng4]).update();
                    cityMarker3.bindTooltip(city3).openTooltip();

                    var city4 = (result['data']['cities']['features'][4]['properties']['name']);
                    var city4Link = result['data']['cities']['features'][4]['properties']['wikipedia'];
                    document.getElementById('cityLink4').setAttribute('href',link+city4Link);
                    $('#city04').html(city4);
                    var pop04 = numeral(result['data']['cities']['features'][4]['properties']['population']).format('0,0');
                    $('#pop04').html(pop04);
                    var lat5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][1]);
                    var lng5 = (result['data']['cities']['features'][4]['geometry']['coordinates'][0]);
                    cityMarker4.setLatLng([lat5, lng5]).update();
                    cityMarker4.bindTooltip(city4).openTooltip();

                    var city5 = (result['data']['cities']['features'][5]['properties']['name']);
                    var city5Link = result['data']['cities']['features'][5]['properties']['wikipedia'];
                    document.getElementById('cityLink5').setAttribute('href',link+city5Link);
                    $('#city05').html(city5);
                    var pop05 = numeral(result['data']['cities']['features'][5]['properties']['population']).format('0,0');
                    $('#pop05').html(pop05);
                    var lat6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][1]);
                    var lng6 = (result['data']['cities']['features'][5]['geometry']['coordinates'][0]);
                    cityMarker5.setLatLng([lat6, lng6]).update();
                    cityMarker5.bindTooltip(city5).openTooltip();
 
                    var city6 = (result['data']['cities']['features'][6]['properties']['name']);
                    var city6Link = result['data']['cities']['features'][6]['properties']['wikipedia'];
                    document.getElementById('cityLink6').setAttribute('href',link+city6Link);
                    $('#city06').html(city6);
                    var pop06 = numeral(result['data']['cities']['features'][6]['properties']['population']).format('0,0');
                    $('#pop06').html(pop06);
                    var lat7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][1]);
                    var lng7 = (result['data']['cities']['features'][6]['geometry']['coordinates'][0]);
                    cityMarker6.setLatLng([lat7, lng7]).update();
                    cityMarker6.bindTooltip(city6).openTooltip();

                    var city7 = (result['data']['cities']['features'][7]['properties']['name']);
                    var city7Link = result['data']['cities']['features'][7]['properties']['wikipedia'];
                    document.getElementById('cityLink7').setAttribute('href',link+city7Link);
                    $('#city07').html(city7);
                    var pop07 = numeral(result['data']['cities']['features'][7]['properties']['population']).format('0,0');
                    $('#pop07').html(pop07);
                    var lat8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][1]);
                    var lng8 = (result['data']['cities']['features'][7]['geometry']['coordinates'][0]);
                    cityMarker7.setLatLng([lat8, lng8]).update();
                    cityMarker7.bindTooltip(city7).openTooltip();

                    var city8 = (result['data']['cities']['features'][8]['properties']['name']);
                    var city8Link = result['data']['cities']['features'][8]['properties']['wikipedia'];
                    document.getElementById('cityLink8').setAttribute('href',link+city8Link);
                    $('#city08').html(city8);
                    var pop08 = numeral(result['data']['cities']['features'][8]['properties']['population']).format('0,0');
                    $('#pop08').html(pop08);
                    var lat9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][1]);
                    var lng9 = (result['data']['cities']['features'][8]['geometry']['coordinates'][0]);
                    cityMarker8.setLatLng([lat9, lng9]).update();
                    cityMarker8.bindTooltip(city8).openTooltip();

                    var city9 = (result['data']['cities']['features'][9]['properties']['name']);
                    var city9Link = result['data']['cities']['features'][9]['properties']['wikipedia'];
                    document.getElementById('cityLink9').setAttribute('href',link+city9Link);
                    $('#city09').html(city9);
                    var pop09 = numeral(result['data']['cities']['features'][9]['properties']['population']).format('0,0');
                    $('#pop09').html(pop09);
                    var lat10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][1]);
                    var lng10 = (result['data']['cities']['features'][9]['geometry']['coordinates'][0]);
                    cityMarker9.setLatLng([lat10, lng10]).update();
                    cityMarker9.bindTooltip(city9).openTooltip();
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
 
                      function checkTime(i) {
                        if (i < 10) {
                          i = "0" + i;
                        }
                        return i;
                      }

                      if (result.status.name == "ok") {

                        $('#Time').html(result['data']['time']);
                        $('#TimeZone').html(result['data']['gmtOffset']);
                        var d = new Date(result['data']['sunrise']);
                        var h = d.getHours();
                        var m = d.getMinutes();
                        m = checkTime(m);
                        $('#Sunrise').html(h + ":" + m);
                        var d1 = new Date(result['data']['sunset']);
                        var h1 = d1.getHours();
                        var m1 = d1.getMinutes();
                        m1 = checkTime(m1);
                        $('#Sunset').html(h1 + ":" + m1)
                      }
                        // wiki info
                      $.ajax({
                        url: "PHP/getWikiInfo.php",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                          north: north,
                          south: south,
                          east: east,
                          west: west,
                        },
                        success: function(result) {
    
                          console.log(result);
        
                          if (result.status.name == "ok") {
                            var link = "http://"        
                            $('#title0').html(result['data'][0]['title']);
                            $('#summary0').html(result['data'][0]['summary']);
                            var link0 = result['data'][0]['wikipediaUrl'];
                            document.getElementById("link00").setAttribute("href",link+link0);
                            $('#link0').html(link0);

                            $('#title1').html(result['data'][1]['title']);
                            $('#summary1').html(result['data'][1]['summary']);
                            var link1 = result['data'][1]['wikipediaUrl'];
                            document.getElementById("link01").setAttribute("href",link+link1);
                            $('#link1').html(link1);

                            $('#title2').html(result['data'][2]['title']);
                            $('#summary2').html(result['data'][2]['summary']);
                            var link2 = result['data'][2]['wikipediaUrl'];
                            document.getElementById("link02").setAttribute("href",link+link2);
                            $('#link2').html(link2);

                            map.spin(false);
                           
                          }
                          else {
                            $('#title0').html("not enough information");
                            $('#summary0').html();


                            $('#title1').html();
                            $('#summary1').html();


                            $('#title2').html();
                            $('#summary2').html();

                            map.spin(false);
                          }
                        },
                        error: function (jqXHR, exception) {
                          var msg = '';
                          if (jqXHR.status === 0) {
                              msg = 'Not connect.\n Verify Network.';
                          } else if (jqXHR.status == 404) {
                              msg = 'Requested page not found. [404]';
                          } else if (jqXHR.status == 500) {
                              msg = 'Internal Server Error [500].';
                          } else if (exception === 'parsererror') {
                              msg = 'Requested JSON parse failed.';
                          } else if (exception === 'timeout') {
                              msg = 'Time out error.';
                          } else if (exception === 'abort') {
                              msg = 'Ajax request aborted.';
                          } else {
                              msg = 'Uncaught Error.\n' + jqXHR.responseText;
                          }
                        }  
                      })    
                    }
                  })
                }
              })
            }
          })
        }  
      })
    });
    

//closing init  
}
