function changeColor(element) {
	var newColor = prompt("Wprowadź nowy kolor w formie HEX:", "#ffffff");
	if (newColor !== null) {
		$(element).css("background-color", newColor);

		var textElement = $(element).find(".led-text");

		textElement.text(newColor);

		var idParts = element.id.split("-");
		var x = idParts[2];
		var y = idParts[3];

		$.ajax({
			type: "POST",
			url: "../scripts/set_ledmatrix.php",
			data: { color: newColor.substring(1), x: x, y: y },
			success: function (response) {
				console.log(response);
			},
			error: function (error) {
				console.error("Błąd podczas wywoływania funkcji PHP", error);
			},
		});
	}
}

$(document).ready(function () {
	$(".color-picker").on("change", function () {
		const newColor = this.value;

		const parentContainer = this.parentElement;

		var textElement = $(parentContainer).find(".led-text");

		textElement.text(newColor);

		var idParts = parentContainer.id.split("-");
		var x = idParts[2];
		var y = idParts[3];

		$.ajax({
			type: "POST",
			url: "../scripts/set_ledmatrix.php",
			data: { color: newColor.substring(1), x: x, y: y },
			success: function (response) {
				console.log(response);
			},
			error: function (error) {
				console.error("Błąd podczas wywoływania funkcji PHP", error);
			},
		});
	});
});
