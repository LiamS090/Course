//

//logout function
var logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', function(e) {
  $.ajax({
    url: "./PHP/logout.php",
    type: 'POST',
  })
})

//populating the location dropdown
$(document).ready(function(){
  $.ajax({
    url: "PHP/getLocations.php",
    type: 'POST',
    dataType: 'json',

    success: function(result) {

      console.log(result);
            
       
      $.each(result.data, function(index) {
                 
      $('#locationSel').append($("<option>", {
      value: result.data[index].id,
      text: result.data[index].name
      })); 
      $('#Location').append($("<option>", {
        value: result.data[index].id,
        text: result.data[index].name
        })); 
    }); 
    var location = result['data'][0];
    $('#locationsBtn').val(location);
    console.log(location);
    }
  })


  //populating departments dropdown
  $.ajax({
    url: "PHP/getAllDepartments.php",
    type: 'POST',
    dataType: 'json',

    success: function(result) {

      console.log(result);
            
       
      $.each(result.data, function(index) {
                 
      $('#departmentSel').append($("<option>", {
      value: result.data[index].id,
      text: result.data[index].name
      })); 
      $('#Department').append($("<option>", {
        value: result.data[index].id,
        text: result.data[index].name
        })); 
    }); 
    var department = result['data'][0]['name'];
    $('#department').val(department);
    console.log(department);
    }
  })
})          