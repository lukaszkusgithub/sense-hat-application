<?php include '../components/header.php'; ?>

<div class="led-container">
    <div class="container-fluid">
        <?php
        function rgb_to_hex($rgb)
        {
            $rgb = array_map(function ($x) {
                return min(255, max(0, $x));
            }, $rgb);

            return sprintf("#%02x%02x%02x", $rgb[0], $rgb[1], $rgb[2]);
        }


        $numColumns = 8;
        $numRows = 8;

        $command = "python3 ../../python_scripts/read_ledmatrix.py";

        $colors_json = shell_exec($command);

        $colors = json_decode($colors_json, true);


        if ($colors !== null) {
            for ($row = 0; $row < $numRows; $row++) {
                echo '<div class="row">';
                for ($col = 0; $col < $numColumns; $col++) {
                    $id = 'led-box-' . $col . '-' . $row;
                    $text = "LED $id";

                    $index = $row * $numColumns + $col;

                    $color = $colors[$index];

                    $hex_color = rgb_to_hex($color);


                    echo '<div class="col">';
                    echo '<div  class="led-box" style="background-color: ' . $hex_color . '; color: #fff" id="' . $id . '" >';
                    // echo '<div onclick="changeColor(this)" class="led-box" style="background-color: ' . $hex_color . '; color: #fff" id="' . $id . '" >';
                    echo '<input class="color-picker" type="color" value="' . $hex_color . '">';
                    echo '<div class="led-text">' . $hex_color . '</div>';
                    echo '</div>';
                    echo '</div>';
                }

                echo '</div>';
            }
        } else {
            echo "Błąd dekodowania JSON.";
        }
        ?>
    </div>
</div>

<script src="../js/matrixled.js"></script>


<?php include '../components/footer.php'; ?>