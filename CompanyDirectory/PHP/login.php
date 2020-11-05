<?php
session_start();
if (! empty($_POST) && $_POST['user'] === 'Username' && $_POST['pass'] === 'Password')
{
    $_SESSION['logged_in'] = true;
    header('Location: ..//index.html');
}
else
  {
    alert("Error incorrect Username or Password")/*displays error message*/
  }
?>