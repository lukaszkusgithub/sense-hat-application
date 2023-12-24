<?php

$folderName = isset($_GET['folder']) ? $_GET['folder'] : '';

if (empty($folderName)) {
    echo json_encode(['error' => 'Nie podano nazwy folderu.']);
    exit;
}

$folderPath = '../../data/' . $folderName;

if (!is_dir($folderPath)) {
    echo json_encode(['error' => 'Podany folder nie istnieje.']);
    exit;
}


$files = scandir($folderPath);
$files = array_diff($files, array('..', '.'));

$files = array_values($files);

header('Content-Type: application/json');
echo json_encode($files);
