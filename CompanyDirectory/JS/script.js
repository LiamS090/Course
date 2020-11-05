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
        $('#departmentNewLocation').append($("<option>", {
          value: result.data[index].id,
          text: result.data[index].name
        }));
        $('#editDepartmentLocation').append($("<option>", {
          value: result.data[index].id,
          text: result.data[index].name
        }));
      }); 
      loc = result['data'][0]['name'];
      locId = result['data'][0]['id'];


          //populating departments dropdown and editor in editor
      $.ajax({
        url: "PHP/getAllDepartments.php",
        type: 'POST',
        dataType: 'json',
        data: {},

        success: function(result) {

          console.log(result);
           
          $.each(result.data, function(index) {                  
 
            $('#department').append($("<option>", {
              value: result.data[index].id,
              text: result.data[index].name
            }));

            $('#departmentDel').append($("<option>", {
              value: result.data[index].id,
              text: result.data[index].name
            }));

            $('#departmentUpdate').append($("<option>", {
              value: result.data[index].id,
              text: result.data[index].name
            }));


              // getting Personnel
          });

          $.ajax({
            url: "PHP/getDepartmentByID.php",
            type: 'POST',
            dataType: 'json',
            data: {
              locationsId:locId,
            },
    
            success: function(result) {
    
              console.log(result);
               
              $.each(result.data, function(index) {
    
                $('#departmentSel').append($("<option>", {
                  value: result.data[index].id,
                  text: result.data[index].name
                  }));

                  department = result['data'][0]['name'];
                  depId = result['data'][0]['id'];
                  document.getElementById('departmentSel').value = depId;

              })  

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
               
          $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='" + data.id + "'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");
        });
      }
    })
     
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

//getting personel by location
var locMenu = document.getElementById('locationSel');
locMenu.addEventListener('change', function(e) {

  var locationsId = $('#locationSel').val();

  if (locationsId == 'All') {
    $('#departmentSel').find('option').remove();
    document.getElementById('departmentSel').value = 'No Department selected';
    $.ajax({
      url: "PHP/getAllPersonel.php",
      type: 'POST',
      dataType: 'json',
      data: {},
      success: function(result) {

      console.log(result);

      for(var i = table.rows.length - 1; i > 0; i--)
      {
         table.deleteRow(i);
      }

      var resultArr = result['data'];
      resultArr.forEach(function (data) {

        $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='"+ data.id +"'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");             });               
      }
    })  
  }
  else {
    $.ajax({
      url: "PHP/getDepartmentByID.php",
      type: 'POST',
      dataType: 'json',
      data: {
        locationsId:locationsId,
      },

      success: function(result) {

        console.log(result);

        $('#departmentSel').find('option').remove();
      
        $.each(result.data, function(index) {

          $('#departmentSel').append($("<option>", {
            value: result.data[index].id,
            text: result.data[index].name
            }));
            

          department = result['data'][0]['name'];
          depId = result['data'][0]['id'];
          document.getElementById('departmentSel').value = depId;

        })  

        $.ajax({
          url: "PHP/getPersonelByDepartment.php",
          type: 'POST',
          dataType: 'json',
          data: {
            depId:depId,
          },
          success: function(result) {

          console.log(result);

          for(var i = table.rows.length - 1; i > 0; i--)
          {
             table.deleteRow(i);
          }

          var resultArr = result['data'];
          resultArr.forEach(function (data) {

            $('#resultsTable > tbody:last-child').append("<tr class='classRow' id='"+ data.id +"'><td class='_1'>" + data.firstName + "</td><td class='_2'>" + data.lastName + "</td><td class='_3'>" + data.email + "</td><td>" + data.jobTitle + "</td></tr>");             });               
          }  
        })
      }
    })
  }   
})  

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

//Changing department in editor to match location selected
var locationEdit = document.getElementById('Location');
locationEdit.addEventListener('change', function(e) {

  var locationValue = $('#Location').val();

  $.ajax({
    url: "PHP/getDepartmentByID.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationsId:locationValue,
    },

    success: function(result) {

      console.log(result);

      $('#DepartmentEdit').find('option').remove();
    
      $.each(result.data, function(index) {

        $('#DepartmentEdit').append($("<option>", {
          value: result.data[index].id,
          text: result.data[index].name
        }));
      })
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
function ConfirmDeletePersonnel()
{

  var x = confirm("Are you sure you want to delete this personnel?");
  if (x) {
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
    return true;
  }   
  else
    return false;
}

// creating search functionailty 
searchBtn.addEventListener('click', function () {
  var word1 = $('#searchBox').val().trim();
  console.log(word1);
  $.ajax({
    url: "PHP/search.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name1:word1,
      name2:word1,
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
  fName = document.getElementById('firstNa').value; 
  lName = document.getElementById('lastNa').value;
  email = document.getElementById('ema').value;
  job = document.getElementById('jobT').value;
  departID = document.getElementById('department').value;


  $.ajax({
    url: "PHP/insertNewP.php",
    type: 'POST',
    dataType: 'json',
    data: {
      depID: departID,
      fname: fName,
      lname: lName,
      email: email,
      job: job,
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

console.log(locaName);
  $.ajax({
    url: "PHP/insertLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
      name: locaName,
    },
    success: function(result) {
      console.log(result);
    }
  })
       // to refresh table
       location.href = location.href;
})  

// creating a new department
var newDepartment = document.getElementById('saveNewDepartment');
newDepartment.addEventListener('click', function () {

  locaID = document.getElementById('departmentNewLocation').value;
  department = document.getElementById('depa').value;

  $.ajax({
    url: "PHP/insertDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locaID,
      name: department,
    },
    success: function(result) {
      console.log(result);


    }
  }) 
       // to refresh table
       location.href = location.href; 
})  

// deleteing department
function ConfirmDeleteDepartment()
{

  department = document.getElementById('departmentDel').value;
  var x = confirm("Are you sure you want to delete?");
  if (x) {
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

      return true;
  }    
  else
    return false;
}
// update department
var updateDepart = document.getElementById('updateDepartment');
updateDepart.addEventListener('click', function(e) {

  department = document.getElementById('departmentUpdate').value;
  newLocationId = document.getElementById('editDepartmentLocation').value;

  $.ajax({
    url: "PHP/updateDepartment.php",
    type: 'POST',
    dataType: 'json',
    data: {
      id: department,
      locationId:newLocationId,
    },
      success: function(result) {
        console.log(result);
      }
  }) 
    // to refresh table
    location.href = location.href;   
})










