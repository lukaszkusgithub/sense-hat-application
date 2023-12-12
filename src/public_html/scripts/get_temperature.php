<?php

header('Content-Type: application/json');


$command = "python3 ../../python_scripts/read_temperature.py";

$newMeasurement = shell_exec($command);

$newMeasurementArray = json_decode($newMeasurement, true);

$currentDate = date('Y-m-d');

$fileName = 'measurments-' . $currentDate . '.json';

$filePath = "../../data/temperature/" . $fileName;


if (!file_exists($filePath)) {
  $initialData = [];
  file_put_contents($filePath, json_encode($initialData, JSON_PRETTY_PRINT));
}

$measurements = json_decode(file_get_contents($filePath), true);

array_unshift($measurements, $newMeasurementArray);

$json_data = json_encode($measurements, JSON_PRETTY_PRINT);

file_put_contents($filePath, $json_data);

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 20;

$measurements = array_slice($measurements, 0, $limit);

$json_data = json_encode($measurements, JSON_PRETTY_PRINT);

echo $json_data;

?>