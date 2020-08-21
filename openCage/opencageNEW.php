<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	include('openCage/AbstractGeocoder.php');
	include('openCage/Geocoder.php');


    $geocoder = new \OpenCage\Geocoder\Geocoder('dc655c16b67d40b08137e68ddfb757ce');
    

	$result = $geocoder->geocode('51.952659, 7.632473',['language'=>$_REQUEST['lang']]);

	header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($result['results'], JSON_UNESCAPED_UNICODE);

?>