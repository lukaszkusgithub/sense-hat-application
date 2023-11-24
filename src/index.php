<?php include 'public_html/components/header.php'; ?>

<h1>IoT System</h1>

<!-- <div>
    <h2>Sensor Data</h2>
    <?php
    // Wywołaj skrypt Pythona do odczytu danych z sensorów
    exec('python3 ../python_scripts/read_sensors.py', $output);

    // Wyświetl dane
    foreach ($output as $line) {
        echo "<p>$line</p>";
    }
    ?>
</div>

<div>
    <h2>Perform Action</h2>
    <?php
    // Wywołaj skrypt Pythona do wykonania akcji
    exec('python3 ../python_scripts/perform_action.py', $output);

    // Wyświetl wynik wykonanej akcji
    foreach ($output as $line) {
        echo "<p>$line</p>";
    }
    ?>
</div> -->

<?php include 'public_html/components/footer.php'; ?>