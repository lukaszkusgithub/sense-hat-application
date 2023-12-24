<?php include '../components/header.php'; ?>

<link rel="stylesheet" href="../css/charts.css">
<?php include '../components/header_end.php'; ?>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <select id="sensor-select" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option selected disabled>Choose sensor</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="pressure">Pressure</option>
                    <option value="rpy">Roll Pitch Yaw</option>
                </select>
            </li>
            <li class="nav-item">
                <select id="file-select" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                    <option selected disabled>Choose day</option>
                </select>
            </li>
        </ul>
    </div>
</nav>


<div class="container">
    <canvas id="chart" width="400" height="200"></canvas>
</div>

<script src="../js/chart.js"></script>


<?php include '../components/footer.php'; ?>