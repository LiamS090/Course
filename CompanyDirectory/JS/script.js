//Globals variables
var loc =null;  //selected location
var locId =null; // selected location ID
var department =null;  // selected department
var depId = null;  //selected department ID
var table = document.getElementById('resultsTable');  // table
var searchBtn = document.getElementById('searchBtn'); //search button
var fname; // firstname textbox and new entry
var lname; //lastname textbox and new entry
var email; //email textbox and new entry
var job;  //job title textbox and new entry
var personID;  // selected person ID
var depEdit;  // department name when editing and new entry
var persID;  // new entry person ID
var departID;  // new entry department ID
var locaID;  // new entry location ID
var locaName; // new entry location name

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
        $('#locationDel').append($("<option>", {
          value: result.data[index].id,
          text: result.data[index].name
        }));
      }); 
      loc = result['data'][0]['name'];
      locId = result['data'][0]['id'];
      document.getElementById('locationSel').value = locId;
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

            $('#departmentDel').append($("<option>", {
              value: result.data[index].id,
              text: result.data[index].name
            }));

            department = result['data'][0]['name'];
            depId = result['data'][0]['id'];
            document.getElementById('departmentSel').value = depId;
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

                $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='"+ data.id +"'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");             });
                  
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
  var locationSeleted = 'None Selected';
  $('#locationSel').val(locationSeleted);
   
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

//getting personel by location before department selected
var locMenu = document.getElementById('locationSel');
locMenu.addEventListener('change', function(e) {

  locId = $('#locationSel').val();
  var departmentSel = 'None Selected';
  $('#departmentSel').val(departmentSel);

  $.ajax({
    url: "PHP/getDepartmentById.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locId:locId,
    },
    success: function(result) {

      console.log(result);

      depId1 = result['data'][0]['id'];
      depId2 = result['data'][1]['id'];

   
      $.ajax({
        url: "PHP/getPersonelByLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
          depId1:depId1,
          depId2:depId2,
        },
        success: function(result) {
           
          for(var i = table.rows.length - 1; i > 0; i--)
          {
            table.deleteRow(i);
          }
           
          console.log(result);
          var resultArr = result['data'];
          resultArr.forEach(function (data) {
             
            $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='"+ data.id +"'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
          });
        }  
      })
    }
  })
});

//Displaying personnel details on click + editor
$(document).on('click','.classRow',function(){
  personID = $(this).attr("id");

  console.log(personID);

  $.ajax({
    url: "PHP/getPersonelByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      personID: personID,
    },

    success: function(result) {
      console.log(result);

      document.getElementById('txtFirstName').value = result['data'][0]['firstName'];
      document.getElementById('txtLastName').value = result['data'][0]['lastName'];
      document.getElementById('txtEmail').value = result['data'][0]['email'];
      document.getElementById('txtJobTitle').value = result['data'][0]['jobTitle'];

      depId = result['data'][0]['departmentID'];
      $('#persDetails').modal('show');

 
    }
  })    
});

// updating table with new information from editor
var updateFunc = document.getElementById('btnSubmit');
updateFunc.addEventListener('click', function(e) {


  fName = document.getElementById('txtFirstName').value; 
  lName = document.getElementById('txtLastName').value;
  email = document.getElementById('txtEmail').value;
  job = document.getElementById('txtJobTitle').value;
  department = document.getElementById('Department').value;

  $.ajax({
    url: "PHP/update.php",
    type: 'POST',
    dataType: 'json',
    data: {
      personID: personID,
      fname: fName,
      lname: lName,
      email: email,
      job: job,
      depID: department,
    },
    success: function(result) {
      console.log(result);
    }
  })   
        // to refresh table
        location.href = location.href 
})

// deleting entry from modal after click
var deleteFunc = document.getElementById('btnDelete');
deleteFunc.addEventListener('click', function(e) {
  $.ajax({
    url: "PHP/deletePersonnel.php",
    type: 'POST',
    dataType: 'json',
    data: {
      personID: personID,
    },
    success: function(result) {
      console.log(result);
    }
  }) 
    // to refresh table
    location.href = location.href;   
})
 

// creating search functionailty 
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
      console.log(word1);
           
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

// creating new personnel
var newPerson = document.getElementById('saveNewPerson');
newPerson.addEventListener('click', function () {
  var persID = document.getElementById('perID').value;
  fName = document.getElementById('firstNa').value; 
  lName = document.getElementById('lastNa').value;
  email = document.getElementById('ema').value;
  job = document.getElementById('jobT').value;
  departID = document.getElementById('DepartmentID').value;


  $.ajax({
    url: "PHP/insertNewP.php",
    type: 'POST',
    dataType: 'json',
    data: {
      personID: persID,
      fname: fName,
      lname: lName,
      email: email,
      job: job,
      depID: departID,
    },
    success: function(result) {
      console.log(result);

      
    }
  })    
      // to refresh table
      location.href = location.href; 
})

// creating a new location
var newLocation = document.getElementById('saveNewLocation');
newLocation.addEventListener('click', function () {

  locaName = document.getElementById('loca').value;
  locaID = document.getElementById('LocationID').value;
console.log(locaID);
console.log(locaName);
  $.ajax({
    url: "PHP/insertLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locaID,
      name: locaName,
    },
    success: function(result) {
      console.log(result);
    }
  })
       // to refresh table
       location.href = location.href 
})  

// creating a new department
var newDepartment = document.getElementById('saveNewDepartment');
newDepartment.addEventListener('click', function () {

  locaID = document.getElementById('newLocationID').value;
  departID = document.getElementById('newDepartmentID').value;
  department = document.getElementById('depa').value;

  $.ajax({
    url: "PHP/insertDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locaID,
      depID: departID,
      name: department,
    },
    success: function(result) {
      console.log(result);


    }
  }) 
  location.href = location.href; 
})  

// deleteing department
var deleteDepart = document.getElementById('btnDeleteDepartment');
deleteDepart.addEventListener('click', function(e) {


  department = document.getElementById('departmentDel').value;

  $.ajax({
    url: "PHP/deleteDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: department,
    },
      success: function(result) {
        console.log(result);
      }
  }) 
    // to refresh table
    location.href = location.href;   
})

// deleteing location
var deleteLocation = document.getElementById('btnDeleteLocation');
deleteLocation.addEventListener('click', function(e) {

  locationID = document.getElementById('locationDel').value;
  $.ajax({
    url: "PHP/deleteLocationByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: locationID,
    },
      success: function(result) {
        console.log(result);
      }
  }) 
    // to refresh table
    location.href = location.href;   
})









