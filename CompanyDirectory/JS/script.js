//Globals variables
var loc =null;
var locId =null;
var dep =null;
var depId = null;


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
      loc = result['data'][0];
      locId = $('#locationSel').val();
      console.log(loc);

        //populating departments dropdown
      $.ajax({
        url: "PHP/getDepartmentByID.php",
        type: 'POST',
        dataType: 'json',
        data: {
          locId: locId,
        },

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

          department = result['data'][0]['name'];
          depId = result['data'][0]['id'];
          $('#department').val(department);
          console.log(department);
          console.log(depId);

            // getting Personnel

          $.ajax({
            url: "PHP/getPersonelByDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
              depId:depId,
            },
            success: function(result) {
  
              console.log(result);

            }  
          })
        }
      })      
    }
  })  
})

var locMenu = document.getElementById('locationSel');
locMenu.addEventListener('change', function(e) {
  locId = $('#locationSel').val();
      //populating departments dropdown
  $.ajax({
    url: "PHP/getDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locId: locId,
    },
    
    success: function(result) {
    
      console.log(result);
      $('#departmentSel').empty();
      $('#Department').empty();
               
      $.each(result.data, function(index) {
               
        $('#departmentSel').append($("<option>", {
          value: result.data[index].id,
          text: result.data[index].name
        })); 
      });
    
        department = result['data'][0]['name'];
        depId = result['data'][0]['id'];
        $('#department').val(department);
        console.log(department);
        console.log(depId);
       
        // getting Personnel

      $.ajax({
        url: "PHP/getPersonelByDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
          depId:depId,
        },
        success: function(result) {
          
          console.log(result);
        
        }      
      })
    }
  })
})  
     
