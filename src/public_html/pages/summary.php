<?php include '../components/header.php'; ?>

<?php include '../components/header_end.php'; ?>

<link rel="stylesheet" type="text/css" href="../css/sensors.css">
<link rel="stylesheet" type="text/css" href="../css/settings.css">

<div id="settings">
    <form>
        <h2>Settings</h2>
        <div>
            <div class="column">
                <h3>Temperature:</h3>
                <input type="radio" id="celsius" name="temp" value="C" checked>
                <label for="celsius">Celsius</label><br>
    
                <input type="radio" id="fahrenheit" name="temp" value="F">
                <label for="fahrenheit">Fahrenheit</label><br>
            </div>
    
            <div class="column">
                <h3>Humidity:</h3>
                <input type="radio" id="percent" name="hum" value="%" checked>
                <label for="procent">%</label><br>
    
                <input type="radio" id="units" name="hum" value="units">
                <label for="units">units</label><br>
            </div>
    
            <div class="column">
                <h3>RPY:</h3>
                <input type="radio" id="deg" name="rpy" value="deg" checked>
                <label for="deg">Degrees</label><br>
    
                <input type="radio" id="rad" name="rpy" value="rad">
                <label for="rad">Radians</label><br>
            </div>
    
            <div class="column">
                <h3>Pressure:</h3>
                <input type="radio" id="hPa" name="pressure" value="hPa" checked>
                <label for="hPa">hPa</label><br>
    
                <input type="radio" id="mmHg" name="pressure" value="mmHg">
                <label for="mmHg">mmHg</label><br>
            </div>
        </div>
    </form>
    <button id="settings_confirm_btn">Confirm</button> 
</div>

<div>
    <button id="settings_btn">Settings</button> 
</div>

<div id="pressure_container" class="sensor-container">
    <p>Pressure: <span id="pressure_value"></span> <span id="pressure_unit"></span></p>
</div>

<div id="humidity_container" class="sensor-container">
    <p>Humidity: <span id="humidity_value"></span> <span id="humidity_unit"></span></p>
</div>

<div id="temperature_container" class="sensor-container">
    <p>Temperature: <span id="temperature_value"></span> <span id="temperature_unit"></span></p>
</div>

<div id="rpy_container" class="sensor-container">
    <p>Roll: <span id="roll_value"></span> <span id="roll_unit"></span></p>
    <p>Pitch: <span id="pitch_value"></span> <span id="pitch_unit"></span></p>
    <p>Yaw: <span id="yaw_value"></span> <span id="yaw_unit"></span></p>
</div>

<script src="../js/summary.js"></script>

<?php include '../components/footer.php'; ?>