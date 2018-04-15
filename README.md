# MÓDULO 7. DATA VISUALIZATION
## Cristina Urbano Navas

#### A *data.js* file is generated with the data to be displayed. This file contains the following:

```javascript 
var totalSales = [
    { product: 'Hoodie', sales: 7 },
    { product: 'Jacket', sales: 6 },
    { product: 'Snuggie', sales: 9 },
    ]; 
```
### Next, the style file *styles.css* is generated, used later to generate the visualization:

```css 

.axis text {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.legend {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 60%;
} 

```

### The html page *index.html* is generated, from where the d3.min.js library will be called, along with the style, data and generation code files of the visualization.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
  </body>
  <link rel="stylesheet" href="./styles.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.5.0/d3.min.js" charset="utf-8"></script>
  <script src="./data.js"></script>
  <script src="./main.js"></script>
</html>
```

### Finally, the file *main.js* is created, in charge of performing the visualization of the data.

#### 1. Variables initialization

```javascript 
let margin = null,
    width = null,
    height = null;

let svg = null;
let x, y = null; // scales

//Adding colors to the barchart
var colors = d3.scaleOrdinal().range(["#6F257F", "#CA0D59","#FF8C00"]);
```
#### 2. Calls are made to all functions.

```javascript 
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars(); 
```

#### 3. The functions that the SVG node selects with the desired size are created.

```javascript 

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
```

#### 4. The functions are generated to scale the X axis and the Y axis, according to the data to be displayed:

```javascript
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

```
#### 5. The X axis and the Y axis are added to the SVG

```javascript
function appendXAxis() {
  // Add the X Axis at the bottom
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
}

function appendYAxis() {   
  // Add the Y Axis in the left
  svg.append("g")   
  .call(d3.axisLeft(y));
}

```
#### 6. Finally, the function that paints the data in the graph and adds a legend:

```javascript
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

```



