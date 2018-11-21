
// Declare global constants for this module.
const TL_HEIGHT = 500;
const TL_WIDTH = 1000; // TODO: How do I resize this dynamically? Do I need to create a viewport?
const TL_LEFTMARGIN = 50;
const TL_ROWHEIGHT = 25;

// Declare global variables for this module.
let tlXScale = d3.scale.linear();
let tlYScale = d3.scale.linear();

// Draws the static parts of the timeline graph based on the loaded timeline weather data.
function drawTimeline() {
	// Create the SVG
	timeline = d3.select("body")
		.append("svg")
		.attr("id", "timeline")
		.attr("height", TL_HEIGHT)
		.attr("width", TL_WIDTH)
		;
		
	d3.csv("TimelineData.csv", function(data) {
		timelineDays = data;
		
		tlXScale.domain([0, timelineDays.length-1])
			.range([TL_LEFTMARGIN, TL_WIDTH - TL_LEFTMARGIN]);
		tlYScale.domain([0, 100])
			.range([14 * TL_ROWHEIGHT, 3 * TL_ROWHEIGHT])
			
		let yAxis = d3.svg.axis()
			.scale(tlYScale)
			.orient('left');
		timeline.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(' + TL_LEFTMARGIN + ',0)')
			.call(yAxis);
		// TODO: Can I make the tick labels show "%"?

		// For each date of the survey:
			// TODO: Draw the weather
			// TODO: Display the temp
			// TODO: Display the day of the week
			// TODO: Display the date
			// TODO: Display a selection checkbox
			
		// TODO: Draw the month bars

		// TODO: Draw the chart line key
	});
	
}

// Based on the current filters:
	// TODO: Display n for each date
	// TODO: Draw the chart lines


/*
TODO: This is all code from Carl's Project 1 that he's looking through to see if it's useful here.

let buttonWidth = (graphWidth - 4 * buttonPadding) / 3;
let keyButtonWidth = buttonWidth / 2;
	
function resetElements() {
	map.selectAll('.death')
		.attr('fill','none')
		.attr('fill-opacity', 1);
		
	graph.selectAll('.graphline')
		.attr('stroke','none')
		.attr('stroke-opacity',1);
		
	graph.selectAll('.graphkeybutton')
		.attr('visibility','hidden')
		.attr('fill-opacity', 1);
		
	maleOpacity = 1;
	femaleOpacity = 1;
	
	for (let i=0; i < ageRanges.length; i++) {
		ageRanges[i].opacity = 1;
	}
}

function displayTotal() {
	resetElements();
	
	map.selectAll('.death').attr('fill','red');
		
	graph.select('#graphlinetotal')
		.attr('stroke','red')
		.attr('opacity','1');
}

function displayGender() {
	resetElements();
	
	map.selectAll('.male').attr('fill','blue');
	map.selectAll('.female').attr('fill','magenta');
	
	graph.select('#graphlinegendermale').attr('stroke','blue');
	graph.select('#graphlinegenderfemale').attr('stroke','magenta');
	
	graph.select('#buttongendermale').attr('visibility','visible');
	graph.select('#buttongendermalelabel').attr('visibility','visible');
	graph.select('#buttongenderfemale').attr('visibility','visible');
	graph.select('#buttongenderfemalelabel').attr('visibility','visible');
}

function displayAge() {
	resetElements();
	
	for (let i=0; i < ageRanges.length; i++) {
		map.selectAll('.age' + i)
			.attr('fill', ageRanges[i].color);
		graph.select('#graphlineage' + i)
			.attr('stroke', ageRanges[i].color);
		graph.select('#buttonage' + i)
			.attr('visibility','visible');
		graph.select('#buttonagelabel' + i)
			.attr('visibility','visible');
	}
}

// Draw all the graph lines in advance.
function drawDeathsGraphLines() {
	let graphTotalPathGenerator = d3.svg.line()
		.x(function(d) { return graphXScale(d.day); })
		.y(function(d) { return graphYScale(d.total); });

	graph.append('path')
		.attr('id', 'graphlinetotal')
		.attr('class', 'graphline')
		.attr('d', graphTotalPathGenerator(deathDays));
}

// Draw the overall structure of the graph.
function drawDeathsGraph() {

	// Create hover bars
	let hoverbarWidth = graphWidth / (deathDays.length - 1);

	graph.selectAll("rect.deathhoverbar")
		.data(deathDays)
		.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return graphXScale(i) - hoverbarWidth / 2;
		})
		.attr("y", padding)
		.attr('width', hoverbarWidth)
		.attr("height", graphHeight - padding * 2)
		.attr("fill", "black")
		.attr("fill-opacity", "0")
		.attr("stroke", "none")
		.attr("stroke-width", "0")
		.attr("id", function(d) { return d.deathdate; })
		.attr("class", "deathhoverbar")
		.on("mouseover", function(d) {
			d3.selectAll('.death')
				.filter(function(d2) {
					return d2.deathday > d.day;
				})
				.attr('visibility','hidden');
		})
		.on("mouseout", function(d) {
			map.selectAll(".death").attr("visibility","visible");
		})
		.append("title")
		.text(function(d) {
			return d.deathdate + ": " + d.total + 
				(d.total==1 ? " death" : " deaths");
		});
		
	// Draw the buttons.
	let buttonLabelYAdjust = 5;
	
	// Total Deaths
	graph.append('rect')
		.attr('id', 'buttontotal')
		.attr('class', 'graphbutton')
		.attr("x", buttonPadding)
		.attr("y", graphHeight + buttonPadding)
		.attr("width", buttonWidth)
		.attr("height", buttonHeight)
		.attr("fill", "red")
		.on('click', function(d) {
			displayTotal();
		});
	graph.append('text')
		.attr('id', 'buttontotallabel')
		.attr('class', 'graphbuttonlabel')
		.text('Total')
		.attr('x', buttonPadding + buttonWidth / 2)
		.attr('y', graphHeight + buttonPadding + buttonHeight / 2 + 
			buttonLabelYAdjust)
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.style('pointer-events','none');
		
	// By Gender
	graph.append('rect')
		.attr('id', 'buttongender')
		.attr('class', 'graphbutton')
		.attr("x", buttonPadding * 2 + buttonWidth)
		.attr("y", graphHeight + buttonPadding)
		.attr("width", buttonWidth)
		.attr("height", buttonHeight)
		.attr("fill", "blue")
		.on('click', function(d) {
			displayGender();
		});
	graph.append('text')
		.attr('id', 'buttongenderlabel')
		.attr('class', 'graphbuttonlabel')
		.text('By Gender')
		.attr('x', buttonPadding * 2 + buttonWidth * 1.5)
		.attr('y', graphHeight + buttonPadding + buttonHeight / 2 + 
			buttonLabelYAdjust)
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.style('pointer-events','none');
		
	// By Age
	graph.append('rect')
		.attr('id', 'buttonage')
		.attr('class', 'graphbutton')
		.attr("x", buttonPadding * 3 + buttonWidth * 2)
		.attr("y", graphHeight + buttonPadding)
		.attr("width", buttonWidth)
		.attr("height", buttonHeight)
		.attr("fill", "green")
		.on('click', function(d) {
			displayAge();
		});
	graph.append('text')
		.attr('id', 'buttonagelabel')
		.attr('class', 'graphbuttonlabel')
		.text('By Age')
		.attr('x', buttonPadding * 3 + buttonWidth * 2.5)
		.attr('y', graphHeight + buttonPadding + buttonHeight / 2 + 
			buttonLabelYAdjust)
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.style('pointer-events','none');
		
	// By Gender: Male Key
	graph.append('rect')
		.attr('id', 'buttongendermale')
		.attr('class', 'graphbutton graphkeybutton male')
		.attr("x", graphWidth - (keyButtonWidth + buttonPadding))
		.attr("y", buttonPadding)
		.attr("width", keyButtonWidth)
		.attr("height", buttonHeight)
		.attr("fill", "blue")
		.on('click', function(d) {
			maleOpacity = (maleOpacity == 1 ? .2 : 1);
			d3.selectAll('.male').attr('fill-opacity', maleOpacity);
			d3.selectAll('.male').attr('stroke-opacity', maleOpacity);
		});
	graph.append('text')
		.attr('id', 'buttongendermalelabel')
		.attr('class', 'graphbuttonlabel graphkeybutton')
		.text('Male')
		.attr('x', graphWidth - (keyButtonWidth / 2 + buttonPadding))
		.attr('y', buttonPadding + buttonHeight / 2 + 
			buttonLabelYAdjust)
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.style('pointer-events','none');
		
	// By Gender: Female Key
	graph.append('rect')
		.attr('id', 'buttongenderfemale')
		.attr('class', 'graphbutton graphkeybutton female')
		.attr("x", graphWidth - (keyButtonWidth + buttonPadding))
		.attr("y", buttonPadding * 2 + buttonHeight)
		.attr("width", keyButtonWidth)
		.attr("height", buttonHeight)
		.attr("fill", "magenta")
		.on('click', function(d) {
			femaleOpacity = (femaleOpacity == 1 ? .2 : 1);
			d3.selectAll('.female').attr('fill-opacity', femaleOpacity);
			d3.selectAll('.female').attr('stroke-opacity', femaleOpacity);
		});
	graph.append('text')
		.attr('id', 'buttongenderfemalelabel')
		.attr('class', 'graphbuttonlabel graphkeybutton')
		.text('Female')
		.attr('x', graphWidth - (keyButtonWidth / 2 + buttonPadding))
		.attr('y', buttonPadding * 2 + buttonHeight * 1.5 + 
			buttonLabelYAdjust)
		.attr('text-anchor','middle')
		.attr('fill', 'white')
		.style('pointer-events','none');

	// By Age Key Buttons
	for (let i=0; i < ageRanges.length; i++) {
		graph.append('rect')
			.attr('id', 'buttonage' + i)
			.attr('class', 'graphbutton graphkeybutton age' + i)
			.attr("x", graphWidth - (keyButtonWidth + buttonPadding))
			.attr("y", buttonPadding * (i + 1) + buttonHeight * i)
			.attr("width", keyButtonWidth)
			.attr("height", buttonHeight)
			.attr("fill", ageRanges[i].color)
			.on('click', function(d) {
				ageRanges[i].opacity = (ageRanges[i].opacity == 1 ? .1 : 1);
				d3.selectAll('.age' + i)
					.attr('fill-opacity', ageRanges[i].opacity);
				d3.selectAll('.age' + i)
					.attr('stroke-opacity', ageRanges[i].opacity);
			});
		graph.append('text')
			.attr('id', 'buttonagelabel' + i)
			.attr('class', 'graphbuttonlabel graphkeybutton')
			.text(ageRanges[i].label)
			.attr('x', graphWidth - (keyButtonWidth / 2 + buttonPadding))
			.attr('y', buttonPadding * (i + 1) +
				buttonHeight * i + buttonHeight / 2 +
				buttonLabelYAdjust)
			.attr('text-anchor','middle')
			.attr('fill', 'white')
			.style('pointer-events','none');
	}
}		

// Load the death data and add it to the map and the graph.
function loadDeaths() {

	// Load the coordinates and demographics for each death. These are
	// assumed to be provided in the order in which the victim died, for
	// purposes of correlating to deathdays.csv.
	d3.csv("deaths_age_sex.csv", function(data) {
		for (let i=0; i < data.length; i++) {
			deaths.push(
				{
					x: data[i].x,
					y: data[i].y,
					age: +data[i].age,
					gender: +data[i].gender==1 ? "female" : "male"
				}
			);
		}
		
		// Load the number of deaths for each date, and update
		// each death record with the day and date on which it occurred.
		d3.csv("deathdays.csv", function(data) {
			let deathId = 0;
			for (let day = 0; day < data.length; day++) {
			
				let totalCount = +data[day].deaths;
				let maleCount = 0;
				let femaleCount = 0;
				let ageCount = [0,0,0,0,0,0];
				
				// Find the highest number of deaths on any day,
				// to set the vertical scale.
				if (maxDeaths < totalCount) {
					maxDeaths = totalCount;
				}
				
				for (let i=0; i < totalCount; i++) {
					// Update the individual death records with the day
					// and date of death.
					deaths[deathId].deathday = day;
					deaths[deathId].deathdate = data[day].date;
					
					// Count the deaths on each deathDay by demographic.
					if (deaths[deathId].gender == "male") {
						maleCount++;
					} else {
						femaleCount++;
					}
					ageCount[deaths[deathId].age]++;
					
					// Increment to the next individual death record.
					deathId++;
				}
				
				deathDays.push ({
					day: day,
					deathdate: data[day].date,
					total: totalCount,
					male: maleCount,
					female: femaleCount,
					age: ageCount
				});
				
			}

			drawDeathsMap();
			drawDeathsGraphLines();
			drawDeathsGraph();
			
			displayTotal();
		});
		
	});
}
*/

