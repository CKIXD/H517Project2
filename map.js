tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

tooltip1 = d3.select("body").append("div")
.attr("class", "tooltip1")
.style("opacity", 0);

//Width and height of map
var width = 960,
	height = 700,
	active = d3.select(null),
	states_info =[];


// D3 Projection
var projection = d3.geoAlbersUsa()
 //   .translate([width/2, height/2])    // translate to center of screen
	.scale([1500]);          // scale things down so see entire US

 
var zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

        
// Define path generator
var path = d3.geoPath().projection(null);              // path generator that will convert GeoJSON to SVG paths
  //  .projection(projection);  // tell path generator to use albersUsa projection

// Define linear scale for output
//var color = d3.scaleLinear()
//   .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);
//var color = d3.scale.quantize().range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"]);

//var color = d3.scaleQuantize().range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);

//Create SVG element and append map to the SVG
var svg = d3.select("svg")
.append("svg")
.attr("width", width)
.attr("height", height)
.on("click", stopped, true)
// .call(zoom); // delete this line to disable free zooming

svg.append("rect")
    .attr("class", "background")
    .style("fill", "black")
    .attr("width", width)
    .attr("height", height)
.on("click", reset)

var g = svg.append("g");

svg.call(zoom);


///////////////////////   Legend    //////////////////////////  
// var legendText = ["Within Indiana", "Outside Indiana"];
// var legendColors = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];
// 
// var legend = svg.append("g")
// .attr("id", "legend");
// 
// var legenditem = legend.selectAll(".legenditem")
// .data(d3.range(8))
// .enter()
// .append("g")
// .attr("class", "legenditem")
// .attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });
// 
// legenditem.append("rect")
// .attr("x", width - 240)
// .attr("y", -7)
// .attr("width", 30)
// .attr("height", 6)
// .attr("class", "rect")
// .style("fill", function(d, i) { return legendColors[i]; });
// 
// legenditem.append("text")
// .attr("x", width - 240)
// .attr("y", -10)
// .style("text-anchor", "middle")
// .text(function(d, i) { return legendText[i]; });



//////////////////////////   end legend   /////////////////////// 


//queue files
// d3.queue()
// .defer(d3.json, "https://d3js.org/us-10m.v1.json")
// .defer(d3.csv,"data/Data.csv")
// .await(ready)
// 
// 
// function ready(error, data, places){
// console.log(data)}

//var adj_cnties= ['18011', '18057', '18095', '18081','18109','18145','18059','18063']

var non_metro_indy=[],
	answers =0,
	adjacent_cnty =0,
	unansewred=0,
	 other_cnty = 0;
var marion_cnty = 0;
var other_state =0;
var MO = 0;
var KY = 0;
var OH = 0;
var MI =0;
var IL = 0;
var KS = 0;
var other_state_country = 0;
var place=[];
var AZ = HI= NC = VA = WI = 1;
var CA = CO = GA =2;
var adj_counties=[]
//////////////////////////// Load IN county data ////////////////////////

// d3.csv("data/in_counties.csv", function(error,d){
// 
//
// console.log(color.domain);
// if (error) { //If error is not null, something went wrong.
// console.log(error); //Log the error.
// } else { //If no error, the file loaded correctly. Yay!
// console.log("Survey answers",d); //Log the data.
// }
// for (var i=0; i<d.length; i++){
// for (var j=0; i<adj_cnties.length; j++){
// var record = d[i];
//
// if(adj_cnties [j] != record[i].id){
// obj = {
// id: record.id,
// county:record.name
// };
// non_metro_indy.push(obj);
// }
// console.log(non_metro_indy);
// }}});


    
//////////////////////////// Load SLE data ////////////////////////

 d3.csv("data/visitors.csv", function(error, data) {
  if (error) throw error;

  // Coerce the data to numbers.
 //  data.forEach(function(d) {
//     d.state = +d.state;
//     d.id = +d.id;
//     d.name = +d.Name;
//   });
  states_info = data;
  console.log("US state info:",states_info);
  });
  
d3.csv("data/Data.csv", function(error,d){

if (error) { //If error is not null, something went wrong.
console.log(error); //Log the error.
} else { //If no error, the file loaded correctly. Yay!
console.log("Survey answers",d); //Log the data.
}

for (var i=0; i<d.length; i++){
		var record = d[i];
		var obj1 = {
		in_state: record.live_IN_county,
		out_state: record.live_outside_IN
		};
		place.push(obj1);
		



  
if(record.live_IN_county != 'N/A'){
  answers+=1;
  if (record.live_IN_county == 'A county adjacent to Marion County'){
  adjacent_cnty+=1;
  }
		   else if (record.live_IN_county == 'Indiana, but not in the Indy metro area'){
		   other_cnty+=1;
		   }
		   else if (record.live_IN_county == 'Another state or country (please specify)')
		   {
		   other_state_country++;
		   }
		   if (record.live_outside_IN == 'kansas' || record.live_outside_IN == 'Kansas'){
		   KS+=1;
		   }
		   else if (record.live_outside_IN== 'Ky' || record.live_outside_IN== 'KY' || record.live_outside_IN== 'Kentucky')
		   {
		   KY+=1;
		   }
		   else if (record.live_outside_IN == 'ohio' || record.live_outside_IN == 'Ohio'  || record.live_outside_IN =='Cincinnati, Oh' || record.live_outside_IN =='Cincinnati, oh' || record.live_outside_IN =='Cincinnati, OH')
		   {
		   OH+=1;
		   }
		   else if (record.live_outside_IN == 'illinois' || record.live_outside_IN =='Bloomington, IL' || record.live_outside_IN == 'Illinois' || record.live_outside_IN == 'il' || record.live_outside_IN == 'IL' || record.live_outside_IN == 'Il')
		   {
		   IL+=1;
		   }
		   else if (record.live_outside_IN == 'Michigan' || record.live_outside_IN =='Michigan ' || record.live_outside_IN == 'MI')
		   {
		   MI+=1;
		   }
		   else if (record.live_outside_IN == 'Missouri' || record.live_outside_IN =='MO ' || record.live_outside_IN == 'missouri')
		   {
		   MO+=1;
		   }//end other state condition
		   else if (record.live_IN_county == 'Marion County, Indiana')
		   {
		   marion_cnty+=1;
		   }
	else {
	unansewred+=1; }
  }//end outer if statement
}//end of for loop
var in_state = marion_cnty + adjacent_cnty +adjacent_cnty; 
console.log("not answered", unansewred);
console.log("answered", answers);
console.log("from Marion: ", marion_cnty);
console.log("adjacent_cnty",adjacent_cnty);
console.log("indiana but not in indy metro", other_cnty);
console.log("from Kentacky: ", KY);
console.log("from Illinois: ", IL);
console.log("from Ohio: ", OH);
console.log("from MI: ", MI);
console.log("from MO: ", MO);
console.log("from Kansas: ", KS);
console.log("Results: From Indiana:",in_state,"Outside Indiana",other_state_country++);

    
     
////// load JSON data ////////

d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
// for (var i = 0; i < us.length; i++) {
// var dataState = us[i].objects.state;
// console.log("state name",dataState);
// }

console.log("US map" , us);
  if (error) throw error;
  var counties = topojson.feature(us, us.objects.counties).features;
  console.log("counties", counties);
  var states = topojson.feature(us, us.objects.states).features
    console.log("states", states);
    
// IN counties
var indianaCounties = counties.filter(function(d) { return d.id.substr(0,2) =='18'; });
var marionCounty = counties.filter(function(d) { return d.id.substr(0,5) =='18097'; });
var adjacentCounties = counties.filter(function(d) { return d.id.substr(0,2) =='18095'; });

//var adjacent_Counties = counties.filter(function(d) { for(var i=0; i<=adj_cnties.length; i++){ console.log(adj_cnties[i]); return +d.id.substr(0,5) == adj_cnties[i];} });

var cnty1 = counties.filter(function(d) { return d.id.substr(0,5) =='18057'; });
var cnty2=  counties.filter(function(d) { return d.id.substr(0,5) =='18095'; });
var cnty3=  counties.filter(function(d) { return d.id.substr(0,5) =='18081'; });
var cnty4=  counties.filter(function(d) { return d.id.substr(0,5) =='18109'; });
var cnty5=  counties.filter(function(d) { return d.id.substr(0,5) =='18145'; });
var cnty6=  counties.filter(function(d) { return d.id.substr(0,5) =='18059'; });
var cnty7=  counties.filter(function(d) { return d.id.substr(0,5) =='18063'; });
var cnty8 = counties.filter(function(d) { return d.id.substr(0,5) =='18011'; }); 

adj_counties = [cnty1, cnty2, cnty3, cnty4, cnty5, cnty6, cnty7, cnty8];


var IN_state = states.filter(function(d) { return d.id.substr(0,2) =='18'; });
var KS_state = states.filter(function(d) { return d.id.substr(0,2) =='20'; });
var KY_state = states.filter(function(d) { return d.id.substr(0,2) =='21'; });
var IL_state = states.filter(function(d) { return d.id.substr(0,2) =='17'; });
var OH_state = states.filter(function(d) { return d.id.substr(0,2) =='39'; });
var MI_state = states.filter(function(d){ return d.id.substr(0,2)=='26';});
var MO_state = states.filter(function(d){ return d.id.substr(0,2)=='29';});
var AZ_state = states.filter(function(d) { return d.id.substr(0,2) =='04'; });
var HI_state = states.filter(function(d) { return d.id.substr(0,2) =='15'; });
var NC_state = states.filter(function(d) { return d.id.substr(0,2) =='37'; });
var VA_state = states.filter(function(d) { return d.id.substr(0,2) =='51'; });
var WI_state  = states.filter(function(d) { return d.id.substr(0,2) =='04'; });
var CA_state  = states.filter(function(d) { return d.id.substr(0,2) =='06'; });
var CO_state  = states.filter(function(d) { return d.id.substr(0,2) =='08'; });
var GA_state = states.filter(function(d) { return d.id.substr(0,2) =='13'; });


//  /////// draw map ///////
function draw_map(){

// svg.selectAll("path")
//  .attr("class", "states")
//    .data(states)
//    .enter()
//    .append("path")
//    .attr("d", path)
//      .attr("class", "feature")
//     .on("click", clicked);
//                 
//         


///////////// //// draw marion county      


 //// draw States ////  
 
   svg.append("g")
      .attr("class", "states")
    .selectAll("path")
    .data(states)
    .enter().append("path")
      .attr("d", path)
    .on("click", clicked)
      .on("mouseover", function(d,i) {
       d3.select(this).classed("selected",true)
      console.log(d.id);
 			tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
	    	            //if(states_info[i].id == d.id){
        	       			 tooltip.html("No Visitors from "+ states_info[i].Name+" yet!")
        	        
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
        	            //}
                })
                .on("mouseout", function(d) {
 			d3.select(this).classed("selected",false)
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })
                
        

 svg.append("g")
      .attr("class", "states KS")
    .selectAll("path")
    .data(KS_state)
    .enter().append("path")
      .attr("d", path)
  .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +KS+ " Visitors from Kansas </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    }) 
      
svg.append("g")
      .attr("class", "states IL")
    .selectAll("path")
    .data(IL_state)
    .enter().append("path")
    .attr("d", path)   .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +IL+ " Visitors from Illinois </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })   


svg.append("g")
      .attr("class", "OH")
    .selectAll("path")
    .data(OH_state)
    .enter().append("path")
    .attr("d", path)   .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +OH+ " Visitors from Ohio </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })   

//  ***** Adding a label ******
// svg.append("g")
//       .attr("class", "states OH")
//     .data(OH_state)
//     .enter().append("path")
// //       .attr("d", path).append("text")
// //       .attr("class", "state-label")
// //       .attr("x", width * 0.35)
// //       .attr("y", height * 0.4)
// //      .text('Ohio');
      
svg.append("g")
      .attr("class", "states IL")
    .selectAll("path")
    .data(KY_state)
    .enter().append("path")
      .attr("d", path) .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +KY+ " Visitors from Kentucky </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  svg.append("g")
  .attr("class", "states MI")
.selectAll("path")
.data(MI_state)
.enter().append("path")
  .attr("d", path) .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +MI+ " Visitors from Michigan </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

svg.append("g")
  .attr("class", "states KS")
.selectAll("path")
.data(MO_state)
.enter().append("path")
  .attr("d", path) .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +MO+ " Visitors from Missouri </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
svg.append("g")
  .attr("class", "AZ")
.selectAll("path")
.data(AZ_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +AZ+ " Visitors from Arizona </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
svg.append("g")
  .attr("class", "AZ")
.selectAll("path")
.data(HI_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +HI+ " Visitor(s) from Hawaii </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
svg.append("g")
  .attr("class", "AZ")
.selectAll("path")
.data(NC_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +NC+ " Visitor(s) from North Carolina </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  


svg.append("g")
  .attr("class", "AZ")
.selectAll("path")
.data(VA_state)
.enter().append("path").attr("d", path).on("mouseover", function() {
     console.log(VA_state);
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +VA+ " Visitor(s) from Virginia </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
  svg.append("g")
  .attr("class", "CA")
.selectAll("path")
.data(CA_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +CA+ " Visitor(s) from California </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
    svg.append("g")
  .attr("class", "CA")
.selectAll("path")
.data(CO_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +CO+ " Visitor(s) from Colorado </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  
svg.append("g")
  .attr("class", "CA")
.selectAll("path")
.data(GA_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +GA+ " Visitor(s) from Georgia </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  svg.append("g")
  .attr("class", "CA")
.selectAll("path")
.data(IN_state)
.enter().append("path")
  .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +in_state+ " Visitor(s) from Indiana </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  

  


//// draw IN counties  

svg.append("g")
  .attr("class", "counties non_metro_indy")
.selectAll("path")
    .data(indianaCounties)
    .enter().append("path")
      .attr("d", path)
      // .on("mouseover",function(d){
//       d3.select(this).classed("selected",true)})
//       .on("mouseout",function(d){
//         d3.select(this).classed("selected",false)})
.on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +other_cnty+ " from non-indy Metro Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  
       

  
        
svg.append("g")
      .attr("class", "counties marion")
    .selectAll("path")
    .data(marionCounty)
    .enter().append("path")
      .attr("d", path).on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +marion_cnty+ " Visitors from Marion County </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  
//       .on("mouseover",function(d){
//       d3.select(this).classed("selected",true)})
//       .on("mouseout",function(d){
//         d3.select(this).classed("selected",false)})
        
        
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty1)
    .enter().append("path")
      .attr("d", path)
.on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })  
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty2)
    .enter().append("path")
      .attr("d", path)
       .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
      
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty3)
    .enter().append("path")
      .attr("d", path)
         .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
        
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty4)
    .enter().append("path")
      .attr("d", path)
       .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
 
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty5)
    .enter().append("path")
      .attr("d", path)
         .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
        
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty6)
    .enter().append("path")
      .attr("d", path)
       .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    

svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty7)
    .enter().append("path")
      .attr("d", path)
       .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    

        
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(cnty8)
    .enter().append("path")
      .attr("d", path)
        .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
svg.append("g")
  .attr("class", "counties adjacentCounties")
.selectAll("path")
    .data(adj_counties)
    .enter().append("path")
      .attr("d", path)
        .on("mouseover", function() {
     
 					tooltip.transition()
	                	.duration(200)
	    	            .style("opacity", 1);
        	        tooltip.html("<b>" +adjacent_cnty+ " from Adjacent Counties </b>" )
    	                .style("left", (d3.event.pageX) + "px")
        	            .style("top", (d3.event.pageY) + "px");
                })
                .on("mouseout", function() {

                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                    })    
//// draw IN counties' borders                        
  svg.append("path")
      .attr("class", "county-borders")
      .attr("d", path(topojson.mesh(us, indianaCounties, function(a, b) { return a !== b; })))
      .attr("class","mesh")
      .attr("d","path");
 }//end of map drawing function 

draw_map();

 
  }); //end of json function
}); //end of data function
function clicked(d) {
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2,
      scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

  svg.transition()
      .duration(750)
      // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
      .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
}

function reset() {
  active.classed("active", false);
  active = d3.select(null);

  svg.transition()
      .duration(750)
      // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
      .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
}

function zoomed() {
  g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
  // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
  g.attr("transform", d3.event.transform); // updated for d3 v4
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}
//Bind data and create one path per GeoJSON feature

// d3.select(".indianaCounties").selectAll('path').style("fill", function(d) { return colorScale(other_cnty); }).on('mouseover', function() { console.log("Visitors from Indy adjacent counties: " + adjacent_cnty)})
// .on("click",function(d){
//       d3.select(this).classed("selected",true)})
//       .on("mouseout",function(d){
//         d3.select(this).classed("selected",false)})  
// d3.select(".illinoisState").selectAll('path').style("fill", function(d) { return colorScale(il); }).on('mouseover', function() { console.log("Visitors from Illinois State " +il)})


