//Globals variables
var loc =null;
var locId =null;
var dep =null;
var depId = null;
var table = document.getElementById('resultsTable');
var searchBtn = document.getElementById('searchBtn');
var fname; // firstname textbox
var lname; //lastname textbox
var email; //email textbox
var job;  //job title textbox

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

          //populating departments dropdown and editor in editor
      $.ajax({
        url: "PHP/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        data: {},

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

            department = result['data'][0]['name'];
            depId = result['data'][0]['id'];
            $('#department').val(department);
            console.log(department);
            console.log(depId);
              // getting Personnel
          });
          $.ajax({
            url: "PHP/getPersonelByDepartment.php",
            type: 'POST',
            dataType: 'json',
            data: {
              depId:depId,
            },
            success: function(result) {
  
              console.log(result);
              var resultArr = result['data'];
              resultArr.forEach(function (data) {

                $('#resultsTable > tbody:last-child').append("<tr class='classRow'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
              });
                  
            }  
          })
        }
      })      
    }
  });
});

    

   ////getting personnel when department dropdown changes but same location
var depMenu = document.getElementById('departmentSel');
depMenu.addEventListener('change', function(e) {
  depId = $('#departmentSel').val();
   
  $.ajax({
    url: "PHP/getPersonelByDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      depId:depId,
    },
    success: function(result) {
           
      for(var i = table.rows.length - 1; i > 0; i--)
     {
        table.deleteRow(i);
     }
           
      console.log(result);
      var resultArr = result['data'];
      resultArr.forEach(function (data) {
             
        $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='" + data.id + "'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
      });
    }  
  })
});

var locMenu = document.getElementById('locationSel');
locMenu.addEventListener('change', function(e) {
  locId = $('#departmentSel').val();
   
  $.ajax({
    url: "PHP/getPersonelByLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locId:locId,
    },
    success: function(result) {
           
      for(var i = table.rows.length - 1; i > 0; i--)
     {
        table.deleteRow(i);
     }
           
      console.log(result);
      var resultArr = result['data'];
      resultArr.forEach(function (data) {
             
        $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='" + data.id + "'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
      });
    }  
  })
});
 

// creating search functionailty 
console.log(searchBtn);
searchBtn.addEventListener('click', function () {
  var word1 = $('#searchBox').val().trim();
  $.ajax({
    url: "PHP/search.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name:word1,
    },
    success: function(result) {
           
      for(var i = table.rows.length - 1; i > 0; i--)
     {
        table.deleteRow(i);
     }
           
      console.log(result);
      var resultArr = result['data'];
      resultArr.forEach(function (data) {
             
        $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='" + data.id + "'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
      });
    }  
  })
})







