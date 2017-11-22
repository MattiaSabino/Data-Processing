d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);    
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 138.7).style("fill", "#41ae76").style("stroke", "black")
    
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 180.7).style("fill", "#238b45").style("stroke", "black")  
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 222.7).style("fill", "#005824").style("stroke", "black")
        
        d3.select("svg").append("rect").attr("height", 29).attr("width", 22).attr("x", 13).attr("y", 258.7).style("fill", "#C0C0C0").style("stroke", "black")

        d3.select("#kleur3").style("fill", "#66c2a4")
        
        d3.select("#kleur2").style("fill", "#99d8c9")
        
        d3.select("#kleur1").style("fill", "#ccece6")
        
        var rect1 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119,1).attr("x", 46,5).attr("y", 180.7).style("fill", "none").style("stroke","black")
        d3.select("svg").append("text").attr("x", parseFloat(rect1.attr("x"))+5 ).attr("y", parseFloat(rect1.attr("y")) +19).text("1000000")
        
        var rect2 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119,1).attr("x", 46,5).attr("y", 222.7).style("fill", "none").style("stroke","black")
        d3.select("svg").append("text").attr("x", parseFloat(rect2.attr("x"))+5 ).attr("y", parseFloat(rect2.attr("y")) +19).text("10000000")
        
        var rect7 = d3.select("svg").append("rect").attr("height", 29).attr("width", 119,1).attr("x", 46,5).attr("y", 258.7).style("fill", "none").style("stroke","black")
        d3.select("svg").append("text").attr("x", parseFloat(rect7.attr("x"))+5 ).attr("y", parseFloat(rect7.attr("y")) +19).text("Unknown")
        
        var rect3 = d3.select("#tekst4")
        d3.select("svg").append("text").attr("x", parseFloat(rect3.attr("x"))+5 ).attr("y", parseFloat(rect3.attr("y")) +19).text("100000")
        
        var rect4 = d3.select("#tekst3")
        d3.select("svg").append("text").attr("x", parseFloat(rect4.attr("x"))+5 ).attr("y", parseFloat(rect4.attr("y")) +19).text("10000")

        var rect5 = d3.select("#tekst2")
        d3.select("svg").append("text").attr("x", parseFloat(rect5.attr("x"))+5 ).attr("y", parseFloat(rect5.attr("y")) +19).text("1000")
        
        var rect6 = d3.select("#tekst1")
        d3.select("svg").append("text").attr("x", parseFloat(rect6.attr("x"))+5 ).attr("y", parseFloat(rect6.attr("y")) +19).text("100")
        
});

