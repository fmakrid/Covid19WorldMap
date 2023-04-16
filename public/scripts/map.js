//Creates the map and initializes it
$(document).ready(function ($) {
	$("#world-map-gdp").vectorMap({
		map: "world_mill_en",
		zoomButtons: false,
		zoomOnScroll: false,
		series: {
			regions: [
				{
					values: gdpData,
					scale: ["#FFFFFF", "#C23030", "#3D0000", "#000000"],
					normalizeFunction: "polynomial",
					attribute: "fill",
				},
			],
		},
		backgroundColor: "",
		onRegionTipShow: function (e, el, code) {
			el.html(
				el.html() +
					" Cases " +
					$("#world-map-gdp").vectorMap("get", "mapObject").series
						.regions[0].values[code]
			);
		},
	});
});
