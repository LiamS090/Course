//Globals variables
var loc =null;
var locId =null;
var dep =null;
var depId = null;
var table = document.getElementById('resultsTable');

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
                var resultArr = result['data'];
                resultArr.forEach(function (data) {

                  $('#resultsTable > tbody:last-child').append("<tr class='classRow'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
                });
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

          for(var i = table.rows.length - 1; i > 0; i--)
          {
              table.deleteRow(i);
          }

          console.log(result);
          var resultArr = result['data'];
          resultArr.forEach(function (data) {
  
            $('#resultsTable > tbody:last-child').append("<tr class='classRow'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
          });
        }  
      })
    }
  })
})  

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
          
        $('#resultsTable > tbody:last-child').append("<tr class='classRow'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
      });
    }  
  })
})
// displaying information in modal closest tr

  var fname; // firstname textbox
  var lname; //lastname textbox
  var email;
  var job;
  $('#resultsTable tbody').on('click', function () {
    var $row = $(this).closest("tr");
      fname =  $row.find("td ._1").text();
      lname = $row.find("td ._2").text();
      $("#firstName").val($(fname).val());
      $("#lastName").val($(lname).val());
      $("#email").val($(email).val());
      $("#jobTitle").val($(job).val());
      $("#editor").modal("show");
      console.log(fname);
      console.log(lname);
  });
  //save change button click evnet
  $("#btnsubmit").click(function () {
      $(fname).val($("#firstName").val());
      $(lname).val($("#lastName").val());
      $("#editor").modal("hide");
  })

// creating search functionailty 








