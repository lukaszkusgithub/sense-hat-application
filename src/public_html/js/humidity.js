function updateTable(response, selectedUnit) {
	$("#measurement-table-humidity tbody").empty();

	$("#measurement-table-humidity tbody").append(`
			<tr>
				<th scope="row">1</th>
				<td>${
					selectedUnit === "units"
						? response[0].value / 100
						: response[0].value
				}</td>
				<td>${selectedUnit}</td>
				<td>${response[0].date}</td>
			</tr>
		`);

	for (let i = 1; i < Math.min(response.length); i++) {
		$("#measurement-table-humidity tbody").append(`
				<tr>
					<th scope="row">${i + 1}</th>
					<td>${
						selectedUnit === "units"
							? response[i].value / 100
							: response[i].value
					}</td>
					<td>${selectedUnit}</td>
					<td>${response[i].date}</td>
				</tr>
			`);
	}
}

function getMeasurment() {
	var selectedValue = $(".form-select").val();
	var selectedUnit = $(".unit").val();

	if (selectedValue > 0 && (selectedUnit == "%" || selectedUnit == "units")) {
		$.ajax({
			type: "GET",
			url: "../../scripts/get_humidity.php",
			data: { limit: selectedValue },
			dataType: "json",
			success: function (response) {
				updateTable(response, selectedUnit);
			},
			error: function (error) {
				console.error("Błąd podczas wywoływania funkcji PHP", error);
			},
		});
	}
}

setInterval(getMeasurment, 1000);
