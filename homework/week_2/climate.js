/*  Mattia Sabino Caso
** 11017368
**
** Data-processing.
** Graph of the temperature of De Bilt in year 2000.
*/

// storing the txt element in a var called filename
var filename = 'KNMI_20001231.txt';

// creating a variable and storing the XML function in it
var xhttp = new XMLHttpRequest(); 

// checking if state is 4 and 200
xhttp.onreadystatechange = function(){
    if(xhttp.readyState == 4 && xhttp.status == 200) {
        
        // if so storing the response in a var 
        var response = this.response;
        
        // pushing this response
        draw(response);
    }
}		

// getting the content of the file
xhttp.open("GET", filename, true); 
xhttp.send();


// calling the function draw with the data in it
draw = function(data) {
    
    // making an empty list for the x and y points
    var dataPoints = [];

    // getting the rawdata and naming it x
    var x = data 

    // splitting the raw data per line
    var dates = x.split('\n');
       
    // looping over every date with it's temperature
    for (i = 0; i < dates.length; i++) {

        // splitting date and temperature
        var x = dates[i].split(',');    
        
        // selecting the date and calling it date1
        var date1 = x[0];
        
        // slicing the dates and inserting commas 
        var formattedDate = date1.slice(0, 4) + "," + 
                                     date1.slice(4, 6) + "," + 
                                     date1.slice(6, 8);
        
        // giving the date a javscript date
        var date = new Date(formattedDate);
                  
        /* pushing the date and the numeric value of the 
        ** degrees in the list
        */ 
        dataPoints.push({
        x: date,
        y: Number(x[1])
        });       
    }

    
    function createTransform(domain, range){
    /* domain is a two-element array of the data bounds 
    ** [domain_min, domain_max]
    ** range is a two-element array of the screen bounds 
    ** [range_min, range_max]
    ** this gives you two equations to solve:
    ** range_min = alpha * domain_min + beta
    ** range_max = alpha * domain_max + beta 
    */
    
        var domain_min = domain[0]
        var domain_max = domain[1]
        var range_min = range[0]
        var range_max = range[1]

        // formulas to calculate the alpha and the beta
        var alpha = (range_max - range_min) / (domain_max -
                          domain_min)
        var beta = range_max - alpha * domain_max

        /* returns the function for the linear transformation 
        ** (y= a * x + b)
        */
        return function(x){
        return alpha * x + beta;
        }
    }

    
    // getting the first date and formatting it in milliseconds
    var seconds = dataPoints[0]['x'].getTime();
  
    // doing the same for the last date
    var seconds2 = dataPoints[365]['x'].getTime();
    
    // setting the y of the degrees from -50 to 300
    var domainY = [-50, 300];
    
    // putts the range based on the measures of the graph
    var rangeY = [450, 80];

    // making the xdomains by using the vars made before
    var domainX = [seconds, seconds2];
    
    // putting the range based on the measures of the graph
    var rangeX = [80, 750];

    // creating the Try and Trx formulas
    var trY = createTransform(domainY, rangeY)
    var trX = createTransform(domainX, rangeX)

    // creating an empty list for the cordinates
    var cords = [];

    // pushing all the cordinates in the cords list
    for (i = 0; i < dates.length; i++){
            
        // formatting all the dates in milliseconds    
        var seconds3 = dataPoints[i]['x'].getTime();
        cords.push({
        x: trX(seconds3),
        y: trY(dataPoints[i]['y']) 
        });        
    }  
     
     // selecting the canvas to draw in
    var canvas = document.getElementById('canvas');
    
    // getting the 2d attr.
    if (canvas.getContext('2d')){
        var ctx = canvas.getContext('2d');
       
       /* drawing the graph lines according to the points
       ** the -1 is based on the last step that can't be made
       ** because the last point +1 is nothing
       */
        for (i = 0; i < dates.length -1; i++){
            ctx.beginPath();
            ctx.moveTo(cords[i]['x'], cords[i]['y']);
            ctx.lineTo(cords[i+1]['x'], cords[i+1]['y']);
            ctx.stroke();    
        }
        
        // draws the y axis
        ctx.beginPath();
        ctx.moveTo(80,80);
        ctx.lineTo(80,450);
        ctx.stroke(); 
        
        // draws the x axis
        ctx.beginPath();
        ctx.moveTo(80,450);
        ctx.lineTo(750,450);
        ctx.stroke(); 
        
        // writes the title, name and source
        ctx.font = "18px Arial";
        ctx.fillText('Maximum temperature in De Bilt (2000)',
                        76,20);
                        
        ctx.font = "12px Arial";
        ctx.fillText('Mattia Sabino Caso, 11017368',
                        76,40);
        
        ctx.font = "8px Arial";
        ctx.fillText('Data Source: http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi',
                        76,60);
        
        //  450 - 80 = 370, and there are 7 spaces, so 370/7
        z = 370/7;
        
        // start value, top of the y axis
        s = 300;
        
        // position on the y axis of the first value
        t = 85;
        
        // position on the y axis of the first _
        g = 79;
        
        // loop of the 8 values
        for (i = 0; i < 8; i++){
            
            // writes the text
            ctx.font = "12px Arial";
            ctx.fillText(s,46,t);
         
            // writes the stripe
            ctx.font = "12px Arial";
            ctx.fillText(' _',70,g);
            
            // formulas to decide the position of the next text
            t = t + z;
            g = g + z
            
            // formula to decide the value
            s = s - 50;
        }
        
        // writing the 2000 text and rotrating it
        ctx.save();
        ctx.translate(45,485);
        ctx.rotate(-0.23*Math.PI);
        ctx.font = "12px Arial";
        ctx.fillText('2000     --' , 0, 0);
        ctx.restore()
        
        // position of the first text and stripe
        a = 0;
        
        // 750 - 80 = 670, and 12 spaces so 670/12
        b = 670/12
        
        // list of the months
        var year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                         'Aug', 'Sep', ' Oct', 'Nov', 'Dec', '2001'];
     
        // loop to write all the months of the year
        for (i = 0; i < 13; i++){
            
            // rotates the month and writes the correct month
            ctx.save();
            ctx.translate(85,485);
            ctx.rotate(-0.5*Math.PI);
            ctx.font = "12px Arial";
            ctx.fillText(year[i] , 0, a);
            ctx.restore()
            
            // writes and rotates the stripe
            ctx.save();
            ctx.translate(79,460);
            ctx.rotate(-0.5*Math.PI);
            ctx.font = "12px Arial";
            ctx.fillText(' _' , 0, a);
            ctx.restore()
             
             // formula to write the months and the stripes
            a=a+b;
        }    
    }   
}
        