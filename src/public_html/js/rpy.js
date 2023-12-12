function addLeadingZero(number) {
	return number < 10 ? "0" + number : number;
}

function updateTable(response, selectedUnit) {
	$("#measurement-table-rpy tbody").empty();

	const degreeToRadianScaller = 0.0174532925;

	$("#measurement-table-rpy tbody").append(`
			<tr>
				<th scope="row">1</th>
				<td>${
					selectedUnit == "rad"
						? response[0].roll.value * degreeToRadianScaller
						: response[0].roll.value
				}</td>
				<td>${
					selectedUnit == "rad"
						? response[0].pitch.value * degreeToRadianScaller
						: response[0].pitch.value
				}</td>
				<td>${
					selectedUnit == "rad"
						? response[0].yaw.value * degreeToRadianScaller
						: response[0].yaw.value
				}</td>
				<td>${selectedUnit}</td>
				<td>${response[0].date}</td>
			</tr>
		`);

	for (let i = 1; i < Math.min(response.length); i++) {
		$("#measurement-table-rpy tbody").append(`
				<tr>
					<th scope="row">${i + 1}</th>
					<td>${
						selectedUnit == "rad"
							? response[i].roll.value * degreeToRadianScaller
							: response[i].roll.value
					}</td>
					<td>${
						selectedUnit == "rad"
							? response[i].pitch.value * degreeToRadianScaller
							: response[i].pitch.value
					}</td>
					<td>${
						selectedUnit == "rad"
							? response[i].yaw.value * degreeToRadianScaller
							: response[i].yaw.value
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
		(selectedUnit == "rad" || selectedUnit == "degree")
	) {
		$.ajax({
			type: "GET",
			url: "../../scripts/get_rpy.php",
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
