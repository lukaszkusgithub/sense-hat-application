let myChart;

function createChart(jsonData, folderName) {
	const labels = jsonData.map(function (entry) {
		const date = luxon.DateTime.fromFormat(
			entry.date,
			"yyyy-MM-dd HH:mm:ss"
		);
		return date.toFormat("yyyy-MM-dd HH:mm:ss");
	});

	const values = jsonData.map(function (entry) {
		return parseFloat(entry.value);
	});

	const config = {
		type: "scatter",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Values",
					data: values,
					borderColor: "rgb(176,0,32)",
					borderWidth: 2,
					pointRadius: 1,
					pointBackgroundColor: "rgba(22, 22, 22, 1)",
				},
			],
		},

		options: {
			scales: {
				x: {
					type: "time",
					time: {
						parser: "yyyy-MM-dd HH:mm:ss",
						unit: "second",
						displayFormats: {
							second: "HH:mm:ss",
						},
					},
					position: "bottom",
				},
			},
			layout: {
				padding: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 10,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: true,
					text: folderName,
					color: "rgb(22, 22, 22)",
					font: {
						size: 44,
						weight: "bold",
					},
				},
			},
			canvas: {
				width: "60%",
			},
		},
	};

	const ctx = document.getElementById("chart").getContext("2d");

	if (myChart) {
		myChart.destroy();
	}

	myChart = new Chart(ctx, config);
}

function get_files_list(folderName) {
	const selectElement = $("#file-select");
	selectElement.empty();
	const defaultoption = $(`<option selected disabled>`).text("Choose date");

	selectElement.append(defaultoption);

	$.ajax({
		url: "../scripts/list_files.php?folder=" + folderName,
		type: "GET",
		dataType: "json",
		success: function (files) {
			files.forEach(function (file) {
				const match = file.match(/\d{4}-\d{2}-\d{2}/);

				const optionText = match ? match[0] : file;

				const option = $(`<option value="${file}">`).text(optionText);
				selectElement.append(option);
			});
		},
		error: function (error) {
			console.log("Błąd pobierania danych:", error);
		},
	});
}

$(document).ready(function () {
	let folderName = "";

	$("#sensor-select").on("change", function () {
		folderName = $(this).val();
		get_files_list(folderName);
	});

	$("#file-select").on("change", function () {
		if (folderName != "") {
			const selectedFile = $(this).val();
			const filePath = `../../data/${folderName}/${selectedFile}`;
			console.log(filePath);
			$.ajax({
				url: filePath,
				type: "GET",
				dataType: "json",
				success: function (jsonData) {
					createChart(jsonData, folderName);
				},
				error: function (error) {
					console.log("Error loading data:", error);
				},
			});
		}
	});
});
