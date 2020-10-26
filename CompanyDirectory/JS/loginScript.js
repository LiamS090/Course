var login = document.getElementById('login');
var user = $('.user').val();
var pass = $('.pass').val();
login.addEventListener('click', function(e) {
  $.ajax({
    url: "./PHP/login.php",
    type: 'POST',
    data: {
      user: $('#user').val(),
      pass: $('#pass').val(),
    },
  })
})
