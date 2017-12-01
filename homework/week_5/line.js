/*  Mattia Sabino Caso
** 11017368
**
** Data-processing.
** 
*/

// De margines goed zetten.
var margin = {
    top: 20,
    right: 80,
    bottom: 80,
    left: 50
  };
  
// De breedte en hoogte goed zetten.
var width = 1200 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// De maanden op de xaxis goed zetten.
var parseDate = d3.time.format("%d-%b-%y").parse,
      bisectDate = d3.bisector(function(d) { 
      return d.Maand; }).left;

// De ranges goed zetten.
var x = d3.time.scale().range([0, width]);
    y = d3.scale.linear().range([height, 0]); 
    z = d3.scale.ordinal(d3.schemeCategory10);

// Xaxis.
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

// Yaxis.
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Punten van de lijn definieren.
var	lijn = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Neerslag2013); });	
var	lijn2 = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Max2013); });
var	lijn3 = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Min2013); });   
var	lijn4 = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Neerslag2012); });	
var	lijn5 = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Max2012); });  
var	lijn6 = d3.svg.line()
	.x(function(d) { return x(d.Maand); })
	.y(function(d) { return y(d.Min2012); });
     
 
// Maken van de svg.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");     
    
// Div voor de tooltip definen.
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);     

// Focus maken voor interactieve deel.
var focus = svg.append("g")                                
    .style("display", "none");                             
    
    
// Laden van de data en error checken.
d3.json("Neerslag.json", function(error, data) {
    if (error) throw error;    
    
    // Overal een te gebruiken value van maken.
	data.forEach(function(d) {
        d.Maand = parseDate(d.Maand);
        d.Neerslag2013 = +d.Neerslag2013;
        d.Min2013 = +d.Min2013;
        d.Max2013 = +d.Max2013;
        d.Neerslag2012 = +d.Neerslag2012;
        d.Min2012 = +d.Min2012;
        d.Max2012 = +d.Max2012;  
    });
    
    // De domeinen defineren voor de grafiek.
    x.domain(d3.extent(data, function(d) { 
                 return d.Maand; }));
    y.domain([0, d3.max(data, function(d) { 
                 return Math.max(d.Min2012, d.Max2012); })]);

    // Als het dropdown menu wordt aangeklikt.
    d3.selectAll(".dropdown-menu li a").on("click", function() {

    // Geeft de lijnen een mooie opacity. 
    var opacity_voorlijn = .9;
    
    // Maakt een lijn.
    svg.append("path")		
		.attr("class", "lijn1")
		.style("stroke", "black")
        .style("fill", "none")
		.attr("d", lijn(data));

    svg.append("path")	
		.attr("class", "lijn1")
		.style("stroke", "red")
        .style("fill", "none")
		.attr("d", lijn2(data));

    svg.append("path")		
		.attr("class", "lijn1")
		.style("stroke", "blue")
        .style("fill", "none")
		.attr("d", lijn3(data));
        
    svg.append("path")		
		.attr("class", "lijn2")
		.style("stroke", "black")
        .style("fill", "none")
		.attr("d", lijn4(data));
        
    svg.append("path")	
		.attr("class", "lijn2")
		.style("stroke", "red")
        .style("fill", "none")
		.attr("d", lijn5(data));
           
    svg.append("path")		
		.attr("class", "lijn2")
		.style("stroke", "blue")
        .style("fill", "none")
		.attr("d", lijn6(data));
         
    // Maakt de cirkel.
    focus.append("circle")
        .attr("class", "y")  
        .attr("id", 'lijn2')        
        .style("fill", "none")                             
        .style("stroke", "blue")                           
        .attr("r", 5);
        
    // Maakt de tekst voor bij de cirkel.
    focus.append("text")
        .attr("class", "y")
        .attr("id", 'lijn2')
        .attr("dx", 10)
        .attr("dy", "-.3em");
                    
    focus.append("circle")
        .attr("class", "y1")  
        .attr("id", 'lijn2')        
        .style("fill", "none")                                                       
        .attr("r", 5);
    
    focus.append("text")
        .attr("class", "y1")
        .attr("id", 'lijn2')
        .attr("dx", 10)
        .attr("dy", "-.3em");
             
    focus.append("circle")
        .attr("class", "y2")  
        .attr("id", 'lijn2')        
        .style("fill", "none")                             
        .style("stroke", "black")                           
        .attr("r", 5);
    
    focus.append("text")
        .attr("class", "y2")
        .attr("id", 'lijn2')
        .attr("dx", 10)
        .attr("dy", "-.3em");
                   
    focus.append("circle")
        .attr("class", "y3")  
        .attr("id", 'lijn1')        
        .style("fill", "none")                                                       
        .attr("r", 5);
    
    focus.append("text")
        .attr("class", "y3")
        .attr("id", 'lijn1')
        .attr("dx", 10)
        .attr("dy", "-.3em");
                 
    focus.append("circle")
        .attr("class", "y4")  
        .attr("id", 'lijn1')        
        .style("fill", "none")                             
        .style("stroke", "blue")                           
        .attr("r", 5);
    
    focus.append("text")
        .attr("class", "y4")
        .attr("id", 'lijn1')
        .attr("dx", 10)
        .attr("dy", "-.3em");
                  
    focus.append("circle")
        .attr("class", "y5")  
        .attr("id", 'lijn1')        
        .style("fill", "none")                             
        .style("stroke", "black")                           
        .attr("r", 5);

    focus.append("text")
        .attr("class", "y5")
        .attr("id", 'lijn1')
        .attr("dx", 10)
        .attr("dy", "-.3em");
        
    // Maakt een rechthoek om de moude te pakken.              
    svg.append("rect")                                     
        .attr("width", width)                              
        .attr("height", height)                            
        .style("fill", "none")                             
        .style("pointer-events", "all")                    
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);                       

    // Functie voor bij het bewegen van de mouse.
    function mousemove() {                                 
        var x0 = x.invert(d3.mouse(this)[0]),              
            i = bisectDate(data, x0, 1),                   
            d0 = data[i - 1],                             
            d1 = data[i],                                  
            d = x0 - d0.Maand > d1.Maand - x0 ? d1 : d0;    
        
        // Selecteert de cirkel aan de hand van de volgende waardes.
        focus.select("circle.y")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Neerslag2012) + ")")
            .style('fill', 'black')
           
        // Selecteert de tekst aan de hand van de volgende waardes.
		focus.select("text.y")           
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Neerslag2012) + ")")
		    .text("Gemiddelde Neerslag: " + d.Neerslag2012 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
            
        focus.select("circle.y1")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Min2012) + ")")
            .style('fill', 'blue')
            
		focus.select("text.y1")           
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Min2012) + ")")
		    .text("Minimum Neerslag: " + d.Min2012 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
                        
        focus.select("circle.y2")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Max2012) + ")")
            .style('fill', 'red')
            
		focus.select("text.y2")            
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Max2012) + ")")
		    .text("Maximum Neerslag: " + d.Max2012 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
      
        focus.select("circle.y3")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Neerslag2013) + ")")
            .style('fill', 'black')
            
		focus.select("text.y3")            
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Neerslag2013) + ")")
		    .text("Gemiddelde Neerslag: " + d.Neerslag2013 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
            
        focus.select("circle.y4")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Min2013) + ")")
            .style('fill', 'blue')
            
		focus.select("text.y4")           
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Min2013) + ")")
		    .text("Minimum Neerslag: " + d.Min2013 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
            
            
        focus.select("circle.y5")  
            .attr("transform",                           
                  "translate(" + x(d.Maand) + "," +     
                                 y(d.Max2013) + ")")
            .style('fill', 'red')
      
		focus.select("text.y5")
		    .attr("transform",
		          "translate(" + x(d.Maand) + "," +
		                         y(d.Max2013) + ")")
		    .text("Maximum Neerslag: " + d.Max2013 + 'mm')
            .style("fill", 'black')
            .style("font-weight", "bold")
   };    

    // Als 2013 wordt geklikt
    if (d3.select(this).text() == 2013) {   
        d3.selectAll(".lijn2").remove();
        d3.selectAll("#lijn2").remove()
    }

    // Als 2012 wordt aangeklikt.
    if (d3.select(this).text() == 2012) {
        d3.selectAll(".lijn1").remove();
        d3.selectAll("#lijn1").remove()
    }
})      
        
   // Maakt de xaxis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .append("text")
        .attr("y", -7)
        .attr("x", 1100)
        .style("text-anchor", "end")
        .text("Maanden")
    .selectAll("text")
        .attr("dx", "-2.5em")
        .attr("transform", "rotate(-60)" );

    // Maakt de yaxis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
       .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Neerslag (in mm)")   
});
$('.dropdown-toggle').dropdown();
