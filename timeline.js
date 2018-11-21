
// Declare global constants for this module.
const TL_HEIGHT = 500;
const TL_WIDTH = 1000; // MAYBE: How do I resize this dynamically? Do I need to create a viewport?
const TL_LEFTMARGIN = 100;
const TL_ROWHEIGHT = 25; // TODO: Make sure this is appropriate to selected font and weather icons.

// Declare global variables for this module.
let tlXScale = d3.scale.linear();
let tlYScale = d3.scale.linear();

// Draws the static parts of the timeline graph based on the loaded timeline weather data.
// TODO: Style the text
function drawTimeline() {
	// Create the SVG
	timeline = d3.select("body")
		.append("svg")
		.attr("id", "timeline")
		.attr("height", TL_HEIGHT)
		.attr("width", TL_WIDTH)
		;
		
	// TODO: Draw the key for the chart lines.
	
	// Create a dictionary to map weather condition descriptors to characters
	let weatherDict = {
		"Clear": "\uf00d",
		"Mostly Cloudy": "\uf013",
		"Mostly Sunny": "\uf00c",
		"Partly Cloudy": "\uf041",
		"Partly Sunny": "\uf002",
		"Rain": "\uf019",
		"Thunderstorms": "\uf016"
	};
			
	// Load the timeline data and draw the items that depend upon it.
	d3.csv("TimelineData.csv", function(data) {
		timelineDays = data;
		
		let colWidth = (TL_WIDTH - TL_LEFTMARGIN) / timelineDays.length;
		
		// Draw the left margin labels.
		timeline.append("text")
			.text("Weather")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 1 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("High Temp")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 2 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("n")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 14 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Day")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 15 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Date")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 16 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Month")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 17 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Select")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 18 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		
		// Setting up scales.
		// See https://www.safaribooksonline.com/library/view/interactive-data-visualization/9781449340223/ch07.html
		tlXScale.domain([0, timelineDays.length-1])
			.range([TL_LEFTMARGIN + 0.5 * colWidth, TL_WIDTH - 0.5 * colWidth]);
		tlYScale.domain([0, 100])
			.range([13 * TL_ROWHEIGHT, 2.5 * TL_ROWHEIGHT])
			
		// Setting up Y axis.
		// See https://www.oreilly.com/library/view/interactive-data-visualization/9781449340223/ch08.html
		let yAxis = d3.svg.axis()
			.scale(tlYScale)
			.orient('left');
		timeline.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(' + (TL_LEFTMARGIN - 0.5 * colWidth) + ',0)')
			.call(yAxis);
		// TODO: Can I make the tick labels show "%"?
		
		// For each date of the survey:
		for (let i=0; i < timelineDays.length; i++) {
			// Show the weather
			timeline.append("text")
				.text(weatherDict[timelineDays[i].Condition10amTo8pm])
				.attr("x", tlXScale(i))
				.attr("y", 1 * TL_ROWHEIGHT)
				.attr("class", "weathericon")
				.attr('text-anchor','middle')
				.append("title")
				.text(timelineDays[i].Condition10amTo8pm)
				;
				
			// Show the High Temp
			// MAYBE: Color some or part the column according to this value.
			timeline.append("text")
				.text(function(d) {
					return timelineDays[i].HighTemp;
				})
				.attr("x", tlXScale(i))
				.attr("y", 2 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Day of the Week
			timeline.append("text")
				.text(function(d) {
					return timelineDays[i].Day;
				})
				.attr("x", tlXScale(i))
				.attr("y", 15 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Date
			timeline.append("text")
				.text(function(d) {
					return timelineDays[i].Date.substring(8,10);
				})
				.attr("x", tlXScale(i))
				.attr("y", 16 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Month
			// TODO: Group the columns together by month, like in the mockup.
			timeline.append("text")
				.text(function(d) {
					return timelineDays[i].Date.substring(5,7);
				})
				.attr("x", tlXScale(i))
				.attr("y", 17 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// TODO: Create a selection checkbox.
			
			// MAYBE: Create column highlight hoverbars?
		}

	});
	
}

// Based on the current filters:
	// TODO: Display n for each date
	// TODO: Draw the chart lines
