$(document).ready(function () {
	$(".nav-item").bind("click", function (event) {
		// event.preventDefault();
		console.log("asd");
		var clickedItem = $(this);
		$(".nav-item").each(function () {
			$(this).removeClass("active");
		});
		clickedItem.addClass("active");
	});
});
