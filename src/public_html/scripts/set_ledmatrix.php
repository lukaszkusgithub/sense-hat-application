<?php
$color = $_POST['color'];
$x = $_POST['x'];
$y = $_POST['y'];

$command = "python3 ../../python_scripts/set_ledmatrix.py " . escapeshellarg($color) . " " . escapeshellarg($x) . " " . escapeshellarg($y);
$output = array();
exec($command, $output, $returnVar);

if ($returnVar === 0) {
    echo "Kolor zaktualizowany na Sense HAT";
} else {
    echo "Błąd podczas aktualizacji koloru na Sense HAT";
    print_r($output);
}
?>