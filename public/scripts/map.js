jQuery(document).ready(function($){
    $("#world-map-gdp").vectorMap({
        map: "world_mill_en",
        series: {
          regions: [
            {
              values: gdpData,
              scale: ["#C8EEFF", "#0071A4"],
              normalizeFunction: "polynomial",
            },
          ],
        },
        backgroundColor: "",
        onRegionTipShow: function (e, el, code) {
          el.html(el.html() + " (GDP - " + gdpData[code] + ")");
        },
      });
});