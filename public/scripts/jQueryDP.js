$("document").ready(function ($) {
	$("#date").datepicker({
		showOtherMonths: true,
		selectOtherMonths: true,
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		//Minimum date based on first Covid-19 case in database, starts from 0, month 1 is February
		minDate: new Date(2020, 1, 25),
		//Maximum date based on first Covid-19 case in database, start from 0, month 10 is November
		maxDate: new Date(2020, 10, 21),
	});
});
//Prints date when a date is selected or changed
$(function () {
	$("#date").on("change", function () {
		var selectedDate = $(this).val();
		var pickedDate = selectedDate;
		$.ajax({
			type: "GET",
			url: `https://api.covid19.philippos-makridis.dev/api/data/?date="${pickedDate}"`,
		})
			.done(function (data) {
				var mapObj = $("#world-map-gdp").vectorMap("get", "mapObject");
				const gdpDataClean = Object.create(null);

				for (var i of data) {
					var test = i.iso2;
					var test2 = i.cases;
					gdpDataClean[test] = test2;
				}
				var stuffIWant = gdpDataClean;
				console.log(stuffIWant);
				mapObj.series.regions[0].setValues(stuffIWant);
			})
			.fail(function (xhr, textStatus, errorThrown) {
				alert(xhr.responseText);
			});
	});
});
