<?php include '../../components/header.php'; ?>

<?php include '../../components/header_end.php'; ?>

<?php include '../../components/navbar_sensors.html'; ?>

<div id="sensor-container">
    <h2>Roll Pitch Yaw </h2>
    <?php include '../../components/dropdown_select.html'; ?>
    <?php include '../../components/dropdown_select_time.html'; ?>
    <select class="form-select form-select-lg mb-3 unit" aria-label=".form-select-lg example">
        <option disabled selected>Select unit</option>
        <option value="rad">Rad</option>
        <option value="degree">Degree</option>
    </select>

    <div class=".container">
        <table class="table" id="measurement-table-rpy">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Roll</th>
                    <th scope="col">Pitch</th>
                    <th scope="col">Yaw</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>

<script src="../../js/rpy.js"></script>

<?php include '../../components/footer.php'; ?>