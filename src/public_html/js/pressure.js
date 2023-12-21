function updateTable(response, selectedUnit) {
	$("#measurement-table-pressure tbody").empty();
	console.log("update")
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

function getFormattedDate() {
	const today = new Date();

	const year = today.getFullYear();
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

function getMeasurment() {
	var selectedValue = $(".form-select").val();
	var selectedUnit = $(".unit").val();

	if (selectedValue > 0 && (selectedUnit == "C" || selectedUnit == "F")) {
		const todayFormatted = getFormattedDate();

		const fileName = `measurements-${todayFormatted}.json`;

		const jsonFilePath = "../../../data/pressure/" + fileName;

		$.ajax({
			type: "GET",
			url: jsonFilePath,
			dataType: "json",
			success: function (response) {
				const limit = selectedValue;
				const limitedData = response.slice(0, limit);
				updateTable(limitedData, selectedUnit);
			},
			error: function (error) {
				console.error("Błąd podczas wczytywania pliku JSON", error);
			},
		});
	}
}

$(document).ready(function () {
	let intervalId;

	$(".select-time").change(function () {
		var selectedTime = $(this).val();

		if (intervalId) {
			clearInterval(intervalId);
		}

		intervalId = setInterval(getMeasurment, selectedTime);
	});
});
