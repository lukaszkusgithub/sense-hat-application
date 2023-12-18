<?php include '../../components/header.php'; ?>

<?php include '../../components/header_end.php'; ?>

<?php include '../../components/navbar_sensors.html'; ?>

<div id="sensor-container">
    <h2>Temperature </h2>
    <?php include '../../components/dropdown_select.html'; ?>
    <?php include '../../components/dropdown_select_time.html'; ?>
    <select class="form-select form-select-lg mb-3 unit" aria-label=".form-select-lg example">
        <option disabled selected>Select unit</option>
        <option value="C">C</option>
        <option value="F">F</option>
    </select>

    <div class=".container">
        <table class="table" id="measurement-table-temperature">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Value</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>


<script src="../../js/temperature.js"></script>

<?php include '../../components/footer.php'; ?>