<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/getAll.php

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	

	$query='SELECT * FROM personnel p WHERE departmentID = ' . $_REQUEST['depId'];
	
	$result = $conn->query($query);
	
	if (!$result) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
   echo"<table border='1'>";
   echo"
     <tr>
       <th>id</th>
       <th>FirstName</th>
       <th>LastName</th>
       <th>jobTitle</th>
       <th>email</th>
      </tr>";
   while($row = mysqli_fetch_assoc($result)) {
	echo"
	  <tr>
	    <td>{$row['id']}</td>
	    <td>{$row['firstName']}</td>
	    <td>{$row['lastName']}</td>
	    <td>{$row['jobTitle']}</td>
	    <td>{$row['email']}</td>
      </tr>\n";
   }

      echo "</table>";

	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $data;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>