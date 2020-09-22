$('#countrySel').addEventListener('change', function () {
    $.ajax({
      url: "Gazetteer\PHP\countryInfo.php",
      type: 'POST',
      dataType: 'json',
      data: {
        data : $('#countrySel').val()
      },
      success: function(result) {
  
        console.log(result);
  
        if (result.status.name == "ok") {
  
          $('#txtCountry').html(result['data'][0]['country']);
          $('#txtCapital').html(result['data'][0]['capital']);
          $('#txtPop').html(result['data'][0]['population']);
          $('#txtCounty').html(result['data'][0]['county']);
          $('#txtPolU').html(result['data'][0]['political_union']);
          $('#txtArea').html(result['data'][0]['areaInSqKm']);
          $('#txtLat').html(result['data'][0]['lat']);
          $('#txtLong').html(result['data'][0]['lng']);
          $('#txtCurrency').html(result['data'][0]['currency']);
        }
      },
    });
  });