/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    10.2 - File Separation
 */

var parseTime = d3.timeParse("%Y/%m/%d");
var formatTime = d3.timeFormat("%Y/%m/%d");

// Event listeners
$("#coin-select").on("change", update);
$("#var-select").on("change", update);

// Add jQuery UI slider
$("#date-slider").slider({
  range: true,
  max: parseTime("2019/4/31").getTime(),
  min: parseTime("2019/1/1").getTime(),
  step: 86400000, // One day
  values: [parseTime("2019/1/1").getTime(), parseTime("2019/12/31").getTime()],
  slide: function(event, ui) {
    $("#dateLabel1").text(formatTime(new Date(ui.values[0])));
    $("#dateLabel2").text(formatTime(new Date(ui.values[1])));
    update();
  }
});

d3.csv("../brews.csv").then(function(data) {
  // Prepare and clean data
  console.log(data);
  filteredDataArray = data.map(beer => {
    let filteredData = {};
    let date = parseTime(beer.date.replace(/-/g, "/"));
    // console.log(beer);
    filteredData["totalSales"] = beer.totalSales;
    filteredData["date"] = date;

    return filteredData;
  });

  // Run the visualization for the first time
  update();
});
