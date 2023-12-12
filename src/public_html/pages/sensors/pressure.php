<?php include '../../components/header.php'; ?>

<?php include '../../components/navbar_sensors.html'; ?>

<div id="sensor-container">
    <h2>Pressure </h2>
    <?php include '../../components/dropdown_select.html'; ?>
    <select class="form-select form-select-lg mb-3 unit" aria-label=".form-select-lg example">
        <option selected>Select unit</option>
        <option value="hPa">hPa</option>
        <option value="mmHg">mmHg</option>
    </select>

    <div class=".container">
        <table class="table" id="measurement-table-pressure">
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

<script src="../../js/pressure.js"></script>

<?php include '../../components/footer.php'; ?>