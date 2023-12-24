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

		const jsonFilePath = "../../../data/rpy/" + fileName;

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
