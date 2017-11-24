/*  Mattia Sabino Caso
** 11017368
**
** Data-processing.
** Graph of the 10 countries with the highest 
** GBP(PPP) confronted with their Life Expectation.
*/

// Setting the margins, width and height.
var margin = {top: 25, right: 200, bottom: 25, left: 50},
      width = 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

// Using a scale function for the y Axis.
var x = d3.scale.linear()
    .range([0, width]);    
var y = d3.scale.linear()
    .range([height, 0]);

// Using a scale function to scale the dots.
var z = d3.scale.linear()
    .range([25,50])
    
// Using the 10 colors
var color = d3.scale.category10();
  
// Orienting the x Axis.  
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");   
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
  
// Giving the chart his attributes.
var chart = d3.select("body").append("svg")
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
        return "<span style='color:lightblue'>" + d.Country + "</span><strong>: Population:</strong> <span \
                    style='color:lightblue'>" + d.Population + "</span>";
})    

// Calling the the tip on the chart.
chart.call(tip);

        
// Loading the json file and using 'data' as callback.
d3.json("world.json", function(error, data) { 
    if (error) throw error;
    
    // Converting the data from string to number.
    data.forEach (function type(d) {          
        d.PPP =+ d.PPP
        d.Life =+ d.Life
        d.Population =+ d.Population  
    });  
        
    // Setting the domains for the x, the y and the dots.
    y.domain([d3.min(data, function(d) { return d.Life;}) - 5, d3.max(data, function(d) { return d.Life;})+5]);                               
    x.domain([d3.min(data, function(d) { return d.PPP;}) - 10000, d3.max(data, function(d) { return d.PPP;}) + 10000]);
    z.domain([d3.min(data, function(d) { return d.Population;}), d3.max(data, function(d) { return d.Population;})]);
    
    // Creating the x Axis and writing GBP(PPP in $) at the end.
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call (xAxis)
    .append("text")
        .attr("y", -5)
        .attr("x", 750)
        .style("text-anchor", "end")
        .text("GPB(PPP in $)")

    chart.append("g")
        .append("text")
            .attr("y", -5)
            .attr('x', 920)
            .style("text-anchor", "end")
            .text("LEGENDA")
      
    // Creating the y Axis and writing Life expectation (in years) on top.
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr('x', 10)
        .style("text-anchor", "end")
        .text("Life Expectation (in years)");       

// Creating the dots and giving the the functions in order to place and scale them
chart.selectAll(".dot")
        .data(data)
    .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) {return z(d.Population); })
        .attr("cx", function(d) { return x(d.PPP); })
        .attr("cy", function(d) { return y(d.Life); })
        .style("fill", function(d) { return color(d.Country); }) 
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide); 

var legend = chart.selectAll(".legend")
        .data(color.domain())
    .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// Creating the colors of the legenda.    
legend.append("rect")
    .attr("x", 900)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);
    
// Creating the texts of the legenda.
legend.append("text")
    .attr("x", 890)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });      
});
