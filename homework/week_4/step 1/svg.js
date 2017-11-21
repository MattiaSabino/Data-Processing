d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);    
    
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 138.7).style("fill", "#41ae76").style("stroke", "black")
    
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 180.6).style("fill", "#238b45").style("stroke", "black")  
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 222.6).style("fill", "#005824").style("stroke", "black")

        d3.select("#kleur3").style("fill", "#66c2a4")
        
        d3.select("#kleur2").style("fill", "#99d8c9")
        
        d3.select("#kleur1").style("fill", "#ccece6")
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 119,1).attr("x", 46,5).attr("y", 180,6).style("fill", "none").style("stroke","black")
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 119,1).attr("x", 46,5).attr("y", 222.6).style("fill", "none").style("stroke","black")
        
        d3.select("g").append("text").style("fill","black").text("hallo")
        
     

        
});

//<rect id="kleur2" x="13" y="56.9" class="st1" width="21" height="29"></rect>