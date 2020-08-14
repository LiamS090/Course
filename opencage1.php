<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	include('openCage/AbstractGeocoder.php');
	include('openCage/Geocoder.php');

	// $geocoder = new \OpenCage\Geocoder\Geocoder('cedfc5fa75ca8a3d13f56c5f07c6e14');
    $geocoder = new \OpenCage\Geocoder\Geocoder('cedfc5fa75ca8a3d13f56c5f07c6e147');
    
    // $result = $geocoder->geocode($_REQUEST['q'],['language'=>$_REQUEST['lang']]);
	$result = $geocoder->geocode($_POST['q'],['language'=>$_REQUEST['lang']]);

?>