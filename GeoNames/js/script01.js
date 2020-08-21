$('#btnRun').click(function() {

    $.ajax({
        url: "libs/php/Country.php",
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#selCountry').val(),
            lang: $('#selLanguage').val()
        },

        success: function(result) {

            console.log(result);

            if (result.status.name == "ok") {

                $('#txtID').html(result['data'][0]['geonameId']);
                $('#txtCapital').html(result['data'][0]['capital']);
                $('#txtCurrency').html(result['data'][0]['currency']);
                $('#txtPopulation').html(result['data'][0]['population']);
                $('#txtArea').html(result['data'][0]['areaInSqKm']);

            }
        
        },