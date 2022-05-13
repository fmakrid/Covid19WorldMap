$(document).ready(function($){
    $("#world-map-gdp").vectorMap({
        map: "world_mill_en",
        zoomButtons : false,
        series: {
          regions: [
            {
              values: gdpData,
              scale: ["#FFFFFF","#C23030", "#3D0000","#000000"],
              normalizeFunction: "linear",
              attribute: 'fill',
            },
          ],
        },
        backgroundColor: "",
        onRegionTipShow: function (e, el, code) {
          el.html(el.html() + " (Cases per day - " + gdpData[code] + ")");
        },
      });
});

