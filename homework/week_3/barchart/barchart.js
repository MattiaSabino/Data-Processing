/*  Mattia Sabino Caso
** 11017368
**
** Data-processing.
** Graph of the avarage rainfall of De Bilt in year 2015.
*/

// Setting the margins, width and height.
var margin = {top: 25, right: 100, bottom: 25, left: 50},
      width = 600 
      height = 400

// Using a scale function for the y Axis.
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);              
var y = d3.scale.linear()
    .range([height, 0]);
  
// Orienting the x Axis.  
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  
// Giving the chart his attributes.
var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + 
        margin.top + ")");

// Defining the d3 tip toolbox.        
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<strong>Rainfall:</strong> <span \
                    style='color:red'>" + d.Neerslag + "</span>";
})    

// Calling the the tip on the chart.
chart.call(tip);

// Loading the json file and using 'data' as callback.
d3.json("neerslag.json", function(error, data) {   
    data.forEach (function type(d) {       
        
        // Making a number of d.Neerslag.
        d.Neerslag = +d.Neerslag        
    });  
    
    // Setting the domains for the x and the y.
    y.domain([0, d3.max(data, function(d) { 
                                        return d.Neerslag;})]);
    x.domain(data.map(function(d) {return d.Maand;}));
   
   // Creating the width of the recangles.
    var bar = chart.selectAll("g")
            .data(data)
        .enter().append("g")
            .attr("transform", function(d) { 
                                    return "translate(" + 
                                    x(d.Maand) + ", 0)"; });
            
    // Creating the rectangles giving it the tip functions.
    bar.append("rect")
        .attr("y", function(d) { return y(d.Neerslag);})
        .attr("height", function(d) { return height - 
                                               y(d.Neerslag);})
        .attr("width", x.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);  

    // Creating the x Axis and writing Month at the end.
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call (xAxis)
    .append("text")
        .attr("y", 6)
        .attr("x", 650)
        .style("text-anchor", "end")
        .text("Month");
      
    // Creating the y Axis and writing Rainfall (mm) on top.
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .style("text-anchor", "end")
        .text("Rainfall (mm)");                   
});
