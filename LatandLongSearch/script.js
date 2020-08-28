	$('#search').click(function() {

		$.ajax({
			url: "LatLongSearch.php",
			type: 'POST',
			dataType: 'json',
			data: {
				lat: $('#Lat').val(),
				lng: $('#Long').val()
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					$('#Code').html(result['data'][0]['countryCode']);
					$('#Lang').html(result['data'][0]['languages'])
					$('#Name').html(result['data'][0]['countryName'])


				}
			
			},
			
		}); 
	

	});