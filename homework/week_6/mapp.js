/*  Mattia Sabino Caso
** 11017368
**
** Data-processing.
** 
*/

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var margin = {top: 30, right: 100, bottom: 25, left: 25},
      width = 250 
      height = 200

// Using a scale function for the x Axis.
var x = d3.scaleBand()
    .rangeRound([0, width], .1);              
var y = d3.scaleLinear()
    .range([height, 0]);
  
// Orienting the x Axis.  
var xAxis = d3.axisBottom(x)
var yAxis = d3.axisLeft(y)
    .ticks(10);
  
// Giving the chart his attributes.
var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + 
        margin.top + ")"); 
 
 // Appending a scg path of the Netherlands.
d3.xml("testt.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);
             
// Coloring all the provinces lightblue.             
var provincies = d3.selectAll(".land")
                        .style("fill", "lightblue")
 
 // Loading the datasets.
d3.queue()
    .defer(d3.json, "1.json")
    .defer(d3.json, "2.json")
    .await(datasets)
    
function datasets(error, michelin, michelinTotaal) { 
    
    var array = []
    michelin.forEach(function(m){
    
    m.Michelin1 += m.Michelin1
    m.Michelin2 += m.Michelin2
    m.Michelin3 += m.Michelin3
    array.push(m.Provincie)
    });
    
    var array2 = []
    michelinTotaal.forEach(function(t){
    t.MichelinTotaal += t.MichelinTotaal
    array2.push(t.Provincie)   
    });


    // Setting the domains for the x and the y.
    y.domain([0, d3.max(michelinTotaal, function(t) {return t.MichelinTotaal + 5;})]);
    x.domain(michelinTotaal.map(function(t) {return t.Provincie;}));
    
   // Creating the width of the recangles.
    var bar = chart.selectAll("g")
            .data(michelinTotaal)
        .enter().append("g")
            .attr("id", "prov")
            .attr("transform", function(t) {
                                    return "translate(" + 
                                    x(t.Provincie) + ", 0)"; })

    // Creating the rectangles giving it the tip functions.
    bar.append("rect")
        .attr("y", function(t) { return y(t.MichelinTotaal);})
        .attr("height", function(t) { return height - y(t.MichelinTotaal);})
        .attr("width", x.bandwidth())
        .attr("id", function(t) {return t.Provincie})
        .style("fill","lightblue")
  
    // Creating the x Axis and writing Provincies at the end.
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call (xAxis)
    .append("text")
        .attr("y", -30)
        .attr('x', 10)
        .style("text-anchor", "end")
        .text("Provincies")
    .selectAll("#prov")
        .attr("dx", "-2.5em")
        .attr("transform", "rotate(-60)" );
    
    // Creating the y Axis and writing Michelinsterren on top.
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
    .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -30)
        .attr('x', 10)
        .style("text-anchor", "end")
        .text("Michelinsterren"); 
    
    // If a province is clicked then:
    provincies.on('click', function() {
        
        // Make the rect of that province blue.
        d3.selectAll("rect")
            .style("fill", "lightblue")
        
        var h = michelin[array.indexOf(d3.select(this).attr("title"))];
        var z = michelinTotaal[array2.indexOf(d3.select(this).attr("title"))];

        // Make a pop up with the data of that province.
        d3.select("#" + h.Provincie)
            .style("fill", "blue")
        div.transition()		
            .duration(200)		
            .style("opacity", .8)
        div.html(h.Provincie.bold() + "<br/>" + "3 Sterren: " + h.Michelin3 + 
                    "<br/>" + "2 Sterren: "  + h.Michelin2 + "<br/>" + "1 Ster: "  + h.Michelin1)	
            .style("left", (d3.event.pageX) + "px")		
    });
    
    // On mouseover hover.
    provincies.on('mouseover', function() {   
        d3.select(this).style("fill", "blue");
    });  
    provincies.on('mouseout', function() {  
        d3.select(this).style("fill", "lightblue");
    });   

// If button is clicked rects have to disappear or appear.
var counter = -1;
d3.select("#change").on("click", function() {
    
    counter = counter +1;

    if (counter % 2 == 0) {
        d3.selectAll("rect")
            .style("opacity",0)
    }
    if (counter % 2 == 1) {
        d3.selectAll("rect")
            .style("opacity",1)
    }
});

// When link button is clicked pop up with the story.
d3.select("#link").on("click", function() {
    alert("Je kan in de kaart van Nederland een provincie aanklikken en door dat te doen wordt er in de barcahrt een rect gekleurd en kun je de totaal aantal michelinsterren van die provincie zien, ook komt er een kleine pop up in de kaart met het totaal aantal michelinsterren gecategorariseert in 1, 2 of 3 sterren. Door op de knop Remove/Show Rects te klikken, verdwijnen of verschijnen de balken.");
});

};  
});  
 


    


  

  
 

              
    
    

  
  
  



