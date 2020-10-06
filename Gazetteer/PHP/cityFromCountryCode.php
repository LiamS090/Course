<?php

	// @param: countryCode (ISO2)
	// @param: maxRows


	$executionStartTime = microtime(true);

	$url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=eng&country=' . $_REQUEST['countryCode'] . '&username=lrscott09&style=full';

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result = curl_exec($ch);

	curl_close($ch);

	$decode1 = json_decode($result,true);	

	$url = 'http://api.geonames.org/citiesJSON?north=' . $decode1['geonames'][0]['north'] . '&south=' . $decode1['geonames'][0]['south'] . '&east=' . $decode1['geonames'][0]['east'] . '&west=' . $decode1['geonames'][0]['west'] . '&lang=en&username=lrscott09&maxRows=100';

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result = curl_exec($ch);

	curl_close($ch);

	$decode2 = json_decode($result,true);	

	$featureCollection = ["type"=>"FeatureCollection","features"=>array()];
	$temp = [];
	$t = [];

	foreach ($decode2['geonames'] as $city) {

		if ($city['countrycode'] == strtoupper($_REQUEST['countryCode'])) {

			$t["type"] = "Feature";

			$t['properties']['countryCode'] = $city['countrycode'];
			$t['properties']['name'] = $city['name'];
			$t['properties']['wikipedia'] = $city['wikipedia'];
			$t['properties']['population'] = $city['population'];

			$t['geometry']['type'] = 'Point';
			$t['geometry']['coordinates'] = [$city['lng'],$city['lat']];
			
			array_push($temp, $t);
		
		}
		
	}

	$featureCollection['features'] = $temp;	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data']['cities'] = $featureCollection;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>
