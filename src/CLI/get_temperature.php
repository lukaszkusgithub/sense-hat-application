<?php

header('Content-Type: application/json');


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $command = "python3 ../python_scripts/read_temperature.py";

    $arguments = $_GET;

    if (isset($arguments)) {
        foreach ($arguments as $key => $value) {

            switch ($key) {
                case 'u':
                    $command = $command . " -u " . $value;
                    break;
            }
        }
    }
    echo shell_exec($command);
}


?>