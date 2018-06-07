<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require './RestCountries.php';
$restCountries = new RestCountries;

// Fields to display
$fields = [
  "name", 
  "alpha2Code", 
  "alpha3Code", 
  "flag", 
  "region", 
  "subregion", 
  "population", 
  "languages"];

// Limit number of countries to display
$max = 50;

// Response to send back
$response = [];

// Check if query parameters exist
$name = (isset($_GET['name'])) ? htmlspecialchars(trim($_GET['name'])) : '';
$sort = (isset($_GET['sort'])) ? htmlspecialchars(trim($_GET['sort'])) : '';

if ($name != '') {
    $result = $restCountries->fields($fields)->byCodes($name);
    $result = json_decode($result);
    array_push($response, $result);
    
    if (!$result) {
      $result = $restCountries->fields($fields)->byName($name);
      $response = json_decode($result);
    }
    
    if ($result) {
      // Default sorting by name
      usort($response, "name_sort_result");

      // Check if population sorting is needed
      if ($sort == "true") {
        usort($response, "population_sort_result");
      }

      foreach ($response as $item) {

        // Simplify language output
        foreach ($item->languages as $lan) {
          $lan_str .= $lan->name . ", ";
        }
        $item->languages = rtrim(trim($lan_str), ',');
        $lan_str = "";

        // Format number of population
        $item->population = number_format($item->population);

        // Combine codes
        $item->alpha2Code = $item->alpha2Code." (".$item->alpha3Code.")";
      }

      // Apply limit of displayed countries
      $response = array_slice($response, 0, $max);
      
      // Send JSON response
      echo json_encode($response);

    } else {
      http_response_code(404);
      echo json_encode(array('message' => 'no country found'));
    }
  } else {
    http_response_code(404);
    echo json_encode(array('message' => 'search field is empty'));  
  }

// Sort by name function
function name_sort_result($x, $y) {  
  return strcmp($x->name, $y->name);
}

// Sort by population function
function population_sort_result($x, $y) {  
        if ($x->population <= $y->population)
            return 1;
        else
            return -1;
}