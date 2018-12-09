
// TODO: Draw different-shaped points for the line data.

// TODO: Draw the point shapes on the key lines.

// TODO: Select easily distinguishable line colors, without regard to colorblindness. (That's what the shapes are for.)

// TODO: Draw the line for % plan to return to visit the SLE

// TODO: Draw the line for % considering / becoming members

// TODO: Allow the user to select the outside time cutoff (30 / 60 / 90).
	
// TODO: See if I can make the y-axis labels show %

// TODO: Group the columns together by month, like in the mockup.
				
// TODO: Create a selection checkbox.
			
// MAYBE: Create column highlight hoverbars?
			
	

const TL_PRIMARYREASONCOLOR = "red"; // "#3f2199";
const TL_OUTSIDETIMECOLOR = "blue"; // "#667f42";
const TL_RECOMMENDCOLOR = "green"; // "#395f97";

// Declare global variables for this module.
let timeline; // The SVG area for the timeline graph.
let timelineDays; // An array containing all data displayed on the timeline.
let SLE_data; // An array containing all the survey data.
let timelineKey; // The SVG area for the timeline's key.
let tlXScale = d3.scaleLinear();
let tlYScale = d3.scaleLinear();
let tlSurveyDates = {};

// Draws the static parts of the timeline graph based on the loaded timeline weather data.
function drawTimelineStaticParts() {
	/*
	// Create the SVG
	timeline = d3.select("body")
		.append("svg")
		.attr("id", "timeline")
		.attr("height", TL_ROWHEIGHT * 19)
		.attr("width", TL_WIDTH)
		;
	*/
	// Select the timeline SVG
	timeline = d3.select("svg#timeline");
		
	// Create a dictionary to map weather condition descriptors to characters
	let weatherDict = {
		"Fair": "\uf00d",
		"Partly Cloudy": "\uf002",
		"Mostly Cloudy": "\uf041",
		"Cloudy": "\uf013",
		"Stormy": "\uf016"
		//"Mostly Sunny": "\uf00c",
		//"Partly Sunny": "\uf002",
		//"Rain": "\uf019",
	};
			
	// Load the timeline data and draw the items that depend upon it.
	d3.csv("data/TimelineData.csv", function(data) {
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
			.text("Temp")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 2 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Dew Point")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 3 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("n")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 15 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Day")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 16 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Date")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 17 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Month")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 18 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
		timeline.append("text")
			.text("Select")
			.attr("x", TL_LEFTMARGIN - 0.5 * colWidth)
			.attr("y", 19 * TL_ROWHEIGHT)
			.attr('text-anchor','end')
			;
			
		// Setting up scales.
		// See https://www.safaribooksonline.com/library/view/interactive-data-visualization/9781449340223/ch07.html
		tlXScale.domain([0, timelineDays.length-1])
			.range([TL_LEFTMARGIN + 0.5 * colWidth, TL_WIDTH - 0.5 * colWidth]);
		tlYScale.domain([0, 100])
			.range([13.5 * TL_ROWHEIGHT, 4 * TL_ROWHEIGHT])
			
		// Setting up Y axis.
		let yAxis = d3.axisLeft(tlYScale);
		timeline.append('g')
			.attr('class', 'axis')
			.attr('transform', 'translate(' + (TL_LEFTMARGIN - 0.5 * colWidth) + ',0)')
			.call(yAxis);
		
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
				
			// Show the Avg Temp
			// MAYBE: Color some or part the column according to this value.
			timeline.append("text")
				.text(timelineDays[i].AvgTemp)
				.attr("x", tlXScale(i))
				.attr("y", 2 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Avg Dew Point
			timeline.append("text")
				.text(timelineDays[i].AvgDewPoint)
				.attr("x", tlXScale(i))
				.attr("y", 3 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Day of the Week
			timeline.append("text")
				.text(timelineDays[i].Day)
				.attr("x", tlXScale(i))
				.attr("y", 16 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Date
			timeline.append("text")
				.text(timelineDays[i].TimelineDate.substring(8,10))
				.attr("x", tlXScale(i))
				.attr("y", 17 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
				
			// Show the Month
			timeline.append("text")
				.text(timelineDays[i].TimelineDate.substring(5,7))
				.attr("x", tlXScale(i))
				.attr("y", 18 * TL_ROWHEIGHT)
				.attr('text-anchor','middle')
				;
		}

	});
	
	// Select the timeline SVG
	timelineKeys = d3.select("svg#timelineKeys");
	
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", .75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", .75 * TL_ROWHEIGHT)
		.attr("stroke", TL_PRIMARYREASONCOLOR)
		.attr('class', 'graphline')
		;
	timelineKeys.append("text")
		.text("% of respondents who said the outdoor exhibit was their primary reason for coming.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 1 * TL_ROWHEIGHT)
		.attr("fill", TL_PRIMARYREASONCOLOR)
		;
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 1.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 1.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_OUTSIDETIMECOLOR)
		.attr('class', 'graphline')
		;
	timelineKeys.append("text")
		.text("% of respondents who stayed in the outside exhibit longer than XXX minutes.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 2 * TL_ROWHEIGHT)
		.attr("fill", TL_OUTSIDETIMECOLOR)
		;
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 2.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 2.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_RECOMMENDCOLOR)
		.attr('class', 'graphline')
		;
	timelineKeys.append("text")
		.text("% of respondents who would recommend the exhibit to other families.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 3 * TL_ROWHEIGHT)
		.attr("fill", TL_RECOMMENDCOLOR)
		;
	

}

// Pre-processes the survey data for each date.
function loadTimelineSurveyData() {
	let intDate;
	
	// Initialize a dictionary to group the survey records by date.
	for (let i=0; i < timelineDays.length; i++) {
		intDate = new Date(timelineDays[i].TimelineDate).getTime();
		timelineDays[i].IntDate = intDate;
		tlSurveyDates[intDate] = [];
	}
	
	for (let i=0; i < SLE_data.length; i++) {
		intDate = new Date(SLE_data[i].end_date.substring(0,10)).getTime();
		tlSurveyDates[intDate].push(SLE_data[i]);
	}
}

function drawTimelineGraphs() {
	timeline.selectAll(".graphelement").remove();
	
	for (let i=0; i < timelineDays.length; i++) {
	//for (let i=0; i < 1; i++) {
		// Filter the data by selected demographics.
		let unfilteredDayRecs = tlSurveyDates[timelineDays[i].IntDate];
		let dayRecs = [];
		for (let j=0; j < unfilteredDayRecs.length; j++) {
			if (filterCheck(unfilteredDayRecs[j])) {
				dayRecs.push(unfilteredDayRecs[j]);
			}
		}
		
		// Display n for each date
		timeline.append("text")
			.text(dayRecs.length)
			.attr("x", tlXScale(i))
			.attr("y", 15 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			.attr("class", "graphelement")
			;
			
		let SLE_primary_reason_responded = 0;
		let SLE_primary_reason_yes = 0;
		
		let outside_time_responded = 0;
		let outside_time_30 = 0;
		let outside_time_60 = 0;
		let outside_time_90 = 0;
		
		let recommendCount = 0;
		let recommendSum = 0;
		
		for (let j=0; j < dayRecs.length; j++) {
			// Gather data for "% came for SLE" (based on SLE_primary_reason)
			if (dayRecs[j].SLE_primary_reason != "N/A") {
				SLE_primary_reason_responded++;
				if (dayRecs[j].SLE_primary_reason.substring(0,1) == "Y") {
					SLE_primary_reason_yes++;
				}
			}
			
			// Gather data for "% spent >X minutes outside" (based on outside_time)
			switch(dayRecs[j].outside_time.substring(0,1)) {
				case "L":
					outside_time_responded++;
					break;
				case "3":
					outside_time_responded++;
					outside_time_30++;
					break;
				case "6":
					outside_time_responded++;
					outside_time_60++;
					break;
				case "M":
					outside_time_responded++;
					outside_time_90++;
					break;
			}
			
			// Gather data for "% recommend SLE to others" (based on SLE_primary_reason)
			if (!isNaN(dayRecs[j].recommend) && dayRecs[j].recommend != "") {
				recommendCount++;
				recommendSum += Number(dayRecs[j].recommend);
			}
			
		}
		
		timelineDays[i].SLE_primary_reason_percent =
			Math.round(SLE_primary_reason_yes / SLE_primary_reason_responded * 100);
		timelineDays[i].outside30 =
			Math.round((outside_time_30 + outside_time_60 + outside_time_90) / outside_time_responded * 100);
		timelineDays[i].outside60 =
			Math.round((outside_time_60 + outside_time_90) / outside_time_responded * 100);
		timelineDays[i].outside90 =
			Math.round((outside_time_90) / outside_time_responded * 100);
		timelineDays[i].recommendPercent =
			Math.round((recommendSum / recommendCount) / 5 * 100);

		/* Drew these during development for comparison to the drawn line.
		timeline.append("text")
			.text(timelineDays[i].SLE_primary_reason_percent)
			.attr("x", tlXScale(i))
			.attr("y", 4 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			;
		
		timeline.append("text")
			.text(timelineDays[i].outside30)
			.attr("x", tlXScale(i))
			.attr("y", 4 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			;
		timeline.append("text")
			.text(timelineDays[i].outside60)
			.attr("x", tlXScale(i))
			.attr("y", 5 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			;
		timeline.append("text")
			.text(timelineDays[i].outside90)
			.attr("x", tlXScale(i))
			.attr("y", 6 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			;
		
		timeline.append("text")
			.text(timelineDays[i].recommendPercent)
			.attr("x", tlXScale(i))
			.attr("y", 4 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			;
		*/

	}
	
	// Draw SLE_primary_reason_percent as a line.
	let SLEPrimaryReasonPathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.SLE_primary_reason_percent); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.SLE_primary_reason_percent); });
	timeline.append('path')
		.attr('id', 'timelineSLEprimaryreason')
		.attr('class', 'graphline graphelement')
		.attr('stroke', TL_PRIMARYREASONCOLOR)
		.attr('d', SLEPrimaryReasonPathGenerator(timelineDays));
		
	// Draw dots for SLE_primary_reason_percent.
	timeline.selectAll(".tldot")
		.data(timelineDays)
		.enter()
		.append("circle")
		.attr("class", "tldot graphelement")
		.attr("r", 3)
		.attr("cx", function(d) { return tlXScale(d.Index); })
		.attr("cy", function(d) { return tlYScale(d.SLE_primary_reason_percent); })
		.style("fill", TL_PRIMARYREASONCOLOR)
		;
	
	// Draw the line for outsideX
	let outsideTimePathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.outside90); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.outside90); });
	timeline.append('path')
		.attr('id', 'timelineOutsideTime')
		.attr('class', 'graphline graphelement')
		.attr('stroke', TL_OUTSIDETIMECOLOR)
		.attr('d', outsideTimePathGenerator(timelineDays));
	
	// Draw recommendPercent as a line.
	let recommendPathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.recommendPercent); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.recommendPercent); });
	timeline.append('path')
		.attr('id', 'timelineRecommend')
		.attr('class', 'graphline graphelement')
		.attr('stroke', TL_RECOMMENDCOLOR)
		.attr('d', recommendPathGenerator(timelineDays));
}
