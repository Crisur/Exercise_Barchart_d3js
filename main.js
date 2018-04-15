// Exercise 1. Cristina Urbano Navas
//Display a barchart (start from barchart refactor sample):

 //- Adding space between columns.
 //-  Adding colors to each bar.
 //-  Adding a legend
 //-  Showing the chart vertically.

//Initialization of variables
let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

//Variable for adding color to the barchart
var colors = d3.scaleOrdinal().range(["#6F257F", "#CA0D59","#FF8C00"]);

//Functions calls
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();

// 1. let's start by selecting the SVG Node
function setupCanvasSize() {
  margin = {top: 100, left: 180, bottom: 120, right: 130};
  width = 960 - margin.left - margin.right;
  height = 800 - margin.top - margin.bottom;
}

function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
              ;
}

//Axis X Scale
function setupXScale()
{
  x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.2)
    .domain(totalSales.map(function(d, i) {
      return d.product;
    }));

}

//Axis Y Scale
function setupYScale()
{
  var maxSales = d3.max(totalSales, function(d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
    .range([height,0])
    .domain([0, maxSales]);    
}

function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
}

function appendYAxis() {   
  // Add the Y Axis
  svg.append("g")   
  .call(d3.axisLeft(y));
}

function appendChartBars()
{
  // Let's select all the rectangles inside that svg
  var rects = svg.selectAll('rect')
    .data(totalSales);

    // Now it's time to append to the list of Rectangles we already have
    var newRects = rects.enter();

    newRects.append('rect')
        .attr('x', function(d, i) {
            return x(d.product);
        })
        .attr('y', function(d) {
            return y(d.sales);
        })     
        .attr('height', function(d, i) {
            return height - y(d.sales);
        })
        .attr('width', x.bandwidth)
        .style("fill", function(d) { 
            return colors(d.product); 
        });
    
    //Add a legend
    var legend = svg.selectAll(".legend")
        .data(totalSales.map(function(d, i) {
            return d.product;
        }))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width + 20)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { 
            return colors(d); 
        });

    legend.append("text")
        .attr("x", width + 80)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

}
