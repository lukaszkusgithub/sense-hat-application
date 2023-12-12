function addLeadingZero(number) {
	return number < 10 ? "0" + number : number;
}

function updateTable(response, selectedUnit) {
	$("#measurement-table-pressure tbody").empty();

	const hPa_to_mmHg_Scaller = 0.75006157584566;

	$("#measurement-table-pressure tbody").append(`
			<tr>
				<th scope="row">1</th>
				<td>${
					selectedUnit === "mmHg"
						? response[0].value * hPa_to_mmHg_Scaller
						: response[0].value
				}</td>
				<td>${selectedUnit}</td>
				<td>${response[0].date}</td>
			</tr>
		`);

	for (let i = 1; i < Math.min(response.length); i++) {
		$("#measurement-table-pressure tbody").append(`
				<tr>
					<th scope="row">${i + 1}</th>
					<td>${
						selectedUnit === "mmHg"
							? response[i].value * hPa_to_mmHg_Scaller
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
	if (
		selectedValue > 0 &&
		(selectedUnit == "mmHg" || selectedUnit == "hPa")
	) {
		$.ajax({
			type: "GET",
			url: "../../scripts/get_pressure.php",
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
