
// TODO: Create a selection checkbox for each date.
			
// TODO: Allow the user to select the outside time cutoff (30 / 60 / 90).
	
// MAYBE: Create column highlight hoverbars?

// MAYBE: Color columns by weather condition? n?

// MAYBE: See if I can make the y-axis labels show %
	// https://bl.ocks.org/mbostock/3371592
	

const TL_PRIMARYREASONCOLOR = "indigo"; // "#3f2199";
const TL_OUTSIDETIMECOLOR = "blue"; // "#667f42";
const TL_RECOMMENDCOLOR = "green"; // "#395f97";
const TL_PLANRETURNCOLOR = "orange";
const TL_MEMBERINTERESTCOLOR = "red";
const TL_SYMBOLSIZE = 40;

// Declare global variables for this module.
let timeline; // The SVG area for the timeline graph.
let timelineDays; // An array containing all data displayed on the timeline.
let SLE_data; // An array containing all the survey data.
let timelineKey; // The SVG area for the timeline's key.
let tlXScale = d3.scaleLinear();
let tlYScale = d3.scaleLinear();
let tlSurveyDates = {};

let primaryReasonOpacity = 1;
let outsideOpacity = 1;
let recommendOpacity = 1;
let planReturnOpacity = 1;
let memberInterestOpacity = 1;

function dimLine(classSelector, opacity) {
	d3.selectAll(classSelector).attr('fill-opacity', opacity);
	d3.selectAll(classSelector).attr('stroke-opacity', opacity);
}


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
			
		let mayDays = 0;
		let juneDays = 0;
		let julyDays = 0;
		
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
				
			switch (timelineDays[i].TimelineDate.substring(5,7)) {
				case "05":
					mayDays++;
					break;
				case "06":
					juneDays++;
					break;
				case "07":
					julyDays++;
					break;
				default:
			}
		}
		
		// Draw the month bars.
		timeline.append('rect')
			.attr('id', 'maymonthbar')
			.attr('class', 'monthbar')
			.attr("x", TL_LEFTMARGIN)
			.attr("y", 17 * TL_ROWHEIGHT + 7)
			.attr("width", colWidth * mayDays)
			.attr("height", TL_ROWHEIGHT)
			.attr("fill", "lightblue")
			;
		timeline.append('text')
			.attr('id', 'maymonthbarlabel')
			.attr('class', 'monthbarlabel')
			.text('May')
			.attr('x', TL_LEFTMARGIN + colWidth * mayDays / 2)
			.attr("y", 18 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			.attr('fill', 'black')
			;

		timeline.append('rect')
			.attr('id', 'junemonthbar')
			.attr('class', 'monthbar')
			.attr("x", TL_LEFTMARGIN + colWidth * mayDays)
			.attr("y", 17 * TL_ROWHEIGHT + 7)
			.attr("width", colWidth * juneDays)
			.attr("height", TL_ROWHEIGHT)
			.attr("fill", "lightgreen")
			;
		timeline.append('text')
			.attr('id', 'junemonthbarlabel')
			.attr('class', 'monthbarlabel')
			.text('June')
			.attr('x', TL_LEFTMARGIN + colWidth * mayDays + colWidth * juneDays / 2)
			.attr("y", 18 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			.attr('fill', 'black')
			;

		timeline.append('rect')
			.attr('id', 'julymonthbar')
			.attr('class', 'monthbar')
			.attr("x", TL_LEFTMARGIN + colWidth * mayDays + colWidth * juneDays)
			.attr("y", 17 * TL_ROWHEIGHT + 7)
			.attr("width", colWidth * julyDays)
			.attr("height", TL_ROWHEIGHT)
			.attr("fill", "yellow")
			;
		timeline.append('text')
			.attr('id', 'julymonthbarlabel')
			.attr('class', 'monthbarlabel')
			.text('July')
			.attr('x', TL_LEFTMARGIN + colWidth * mayDays +
				colWidth * juneDays + colWidth * julyDays / 2)
			.attr("y", 18 * TL_ROWHEIGHT)
			.attr('text-anchor','middle')
			.attr('fill', 'black')
			;

	});
	
	// Draw the timeline keys
	timelineKeys = d3.select("svg#timelineKeys");
	
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", .75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", .75 * TL_ROWHEIGHT)
		.attr("stroke", TL_PRIMARYREASONCOLOR)
		.attr('class', 'graphline primaryreason')
		.on("click", function(d) {
			primaryReasonOpacity = (primaryReasonOpacity == 1 ? .2 : 1);
			dimLine(".primaryreason", primaryReasonOpacity);
		})
		;
	timelineKeys.append("path")
		.attr("transform", "translate(" + TL_LEFTMARGIN / 2 + "," +
				.75 * TL_ROWHEIGHT + ")")
		.attr('d', d3.symbol().type(d3.symbolCircle).size(TL_SYMBOLSIZE))
		.style("fill", TL_PRIMARYREASONCOLOR)
		.attr('class', 'primaryreason')
		.style('pointer-events','none');
		;
	timelineKeys.append("text")
		.text("% of respondents who said the outdoor exhibit was their primary reason for coming.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 1 * TL_ROWHEIGHT)
		.attr("fill", TL_PRIMARYREASONCOLOR)
		.attr('class', 'primaryreason')
		.on("click", function(d) {
			primaryReasonOpacity = (primaryReasonOpacity == 1 ? .2 : 1);
			dimLine(".primaryreason", primaryReasonOpacity);
		})
		;
		
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 1.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 1.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_OUTSIDETIMECOLOR)
		.attr('class', 'graphline outside')
		.on("click", function(d) {
			outsideOpacity = (outsideOpacity == 1 ? .2 : 1);
			dimLine(".outside", outsideOpacity);
		})
		;
	timelineKeys.append("path")
		.attr("transform", "translate(" + TL_LEFTMARGIN / 2 + "," +
				1.75 * TL_ROWHEIGHT + ")")
		.attr('d', d3.symbol().type(d3.symbolCross).size(TL_SYMBOLSIZE))
		.style("fill", TL_OUTSIDETIMECOLOR)
		.attr('class', 'outside')
		.style('pointer-events','none');
		;
	timelineKeys.append("text")
		.text("% of respondents who stayed in the outside exhibit longer than XXX minutes.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 2 * TL_ROWHEIGHT)
		.attr("fill", TL_OUTSIDETIMECOLOR)
		.attr('class', 'outside')
		.on("click", function(d) {
			outsideOpacity = (outsideOpacity == 1 ? .2 : 1);
			dimLine(".outside", outsideOpacity);
		})
		;
		
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 2.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 2.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_RECOMMENDCOLOR)
		.attr('class', 'graphline recommend')
		.on("click", function(d) {
			recommendOpacity = (recommendOpacity == 1 ? .2 : 1);
			dimLine(".recommend", recommendOpacity);
		})
		;
	timelineKeys.append("path")
		.attr("transform", "translate(" + TL_LEFTMARGIN / 2 + "," +
				2.75 * TL_ROWHEIGHT + ")")
		.attr('d', d3.symbol().type(d3.symbolTriangle).size(TL_SYMBOLSIZE))
		.style("fill", TL_RECOMMENDCOLOR)
		.attr('class', 'recommend')
		.style('pointer-events','none');
		;
	timelineKeys.append("text")
		.text("% likelihood of respondents to recommend the exhibit.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 3 * TL_ROWHEIGHT)
		.attr("fill", TL_RECOMMENDCOLOR)
		.attr('class', 'recommend')
		.on("click", function(d) {
			recommendOpacity = (recommendOpacity == 1 ? .2 : 1);
			dimLine(".recommend", recommendOpacity);
		})
		;
	
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 3.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 3.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_PLANRETURNCOLOR)
		.attr('class', 'graphline planreturn')
		.on("click", function(d) {
			planReturnOpacity = (planReturnOpacity == 1 ? .2 : 1);
			dimLine(".planreturn", planReturnOpacity);
		})
		;
	timelineKeys.append("path")
		.attr("transform", "translate(" + TL_LEFTMARGIN / 2 + "," +
				3.75 * TL_ROWHEIGHT + ")")
		.attr('d', d3.symbol().type(d3.symbolSquare).size(TL_SYMBOLSIZE))
		.style("fill", TL_PLANRETURNCOLOR)
		.attr('class', 'planreturn')
		.style('pointer-events','none');
		;
	timelineKeys.append("text")
		.text("% likelihood of respondents to return.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 4 * TL_ROWHEIGHT)
		.attr("fill", TL_PLANRETURNCOLOR)
		.attr('class', 'planreturn')
		.on("click", function(d) {
			planReturnOpacity = (planReturnOpacity == 1 ? .2 : 1);
			dimLine(".planreturn", planReturnOpacity);
		})
		;
	
	timelineKeys.append("line")
		.attr("x1", 10)
		.attr("y1", 4.75 * TL_ROWHEIGHT)
		.attr("x2", TL_LEFTMARGIN - 10)
		.attr("y2", 4.75 * TL_ROWHEIGHT)
		.attr("stroke", TL_MEMBERINTERESTCOLOR)
		.attr('class', 'graphline memberinterest')
		.on("click", function(d) {
			memberInterestOpacity = (memberInterestOpacity == 1 ? .2 : 1);
			dimLine(".memberinterest", memberInterestOpacity);
		})
		;
	timelineKeys.append("path")
		.attr("transform", "translate(" + TL_LEFTMARGIN / 2 + "," +
				4.75 * TL_ROWHEIGHT + ")")
		.attr('d', d3.symbol().type(d3.symbolStar).size(TL_SYMBOLSIZE))
		.style("fill", TL_MEMBERINTERESTCOLOR)
		.attr('class', 'memberinterest')
		.style('pointer-events','none');
		;
	timelineKeys.append("text")
		.text("% of respondents interested in membership.")
		.attr("x", TL_LEFTMARGIN)
		.attr("y", 5 * TL_ROWHEIGHT)
		.attr("fill", TL_MEMBERINTERESTCOLOR)
		.attr('class', 'memberinterest')
		.on("click", function(d) {
			memberInterestOpacity = (memberInterestOpacity == 1 ? .2 : 1);
			dimLine(".memberinterest", memberInterestOpacity);
		})
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
		
		let planReturnCount = 0;
		let planReturnSum = 0;
		
		let member_interest_responded = 0;
		let member_interest_yes = 0;
		
		for (let j=0; j < dayRecs.length; j++) {
			// Gather data for "% came for SLE"
			if (dayRecs[j].SLE_primary_reason != "N/A") {
				SLE_primary_reason_responded++;
				if (dayRecs[j].SLE_primary_reason.substring(0,1) == "Y") {
					SLE_primary_reason_yes++;
				}
			}
			
			// Gather data for "% spent >X minutes outside"
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
			
			// Gather data for "% recommend SLE to others"
			if (!isNaN(dayRecs[j].recommend) && dayRecs[j].recommend != "") {
				recommendCount++;
				recommendSum += Number(dayRecs[j].recommend);
			}
			
			// Gather data for "% plan to return"
			if (!isNaN(dayRecs[j].return) && dayRecs[j].return != "") {
				planReturnCount++;
				planReturnSum += Number(dayRecs[j].return);
			}
			
			// Gather data for "interested in membership"
			let memberVal = dayRecs[j].member_for_SLE;
			if (memberVal != "N/A" && memberVal != "") {
				member_interest_responded++;
				if ((memberVal.substring(0,6) == "I am c") ||
					(memberVal.substring(0,6) == "I will")) {
					member_interest_yes++;
				}
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
		timelineDays[i].planReturnPercent =
			Math.round((planReturnSum / planReturnCount) / 5 * 100);
		timelineDays[i].member_interest_percent =
			Math.round(member_interest_yes / member_interest_responded * 100);

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
		.attr('class', 'graphline graphelement primaryreason')
		.attr('stroke', TL_PRIMARYREASONCOLOR)
		.attr('stroke-opacity', primaryReasonOpacity)
		.attr('d', SLEPrimaryReasonPathGenerator(timelineDays));
	timeline.append('path')
		.attr('id', 'timelineSLEprimaryreasongap')
		.attr('class', 'graphline graphelement primaryreason')
		.attr('stroke', TL_PRIMARYREASONCOLOR)
		.attr('stroke-opacity', primaryReasonOpacity)
		.attr("stroke-dasharray", "2 4")
		.attr('d', SLEPrimaryReasonPathGenerator(
			timelineDays.filter(SLEPrimaryReasonPathGenerator.defined())
		));
		
	// Draw dots for SLE_primary_reason_percent using D3 symbols.
	timeline.selectAll(".sleprimarydot")
		.data(timelineDays)
		.enter()
		.append("path")
		.filter(function(d) { return !isNaN(d.SLE_primary_reason_percent); })
		.attr("class", "sleprimarydot graphelement primaryreason")
		.attr("transform", function(d) {
			return "translate(" + tlXScale(d.Index) + "," +
				tlYScale(d.SLE_primary_reason_percent) + ")";
		})
		.attr('d', d3.symbol().type(d3.symbolCircle).size(TL_SYMBOLSIZE))
		.style("fill", TL_PRIMARYREASONCOLOR)
		.attr('fill-opacity', primaryReasonOpacity)
		;
	
	// Draw the line for outsideX
	let outsideTimePathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.outside90); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.outside90); });
	timeline.append('path')
		.attr('id', 'timelineOutsideTime')
		.attr('class', 'graphline graphelement outside')
		.attr('stroke', TL_OUTSIDETIMECOLOR)
		.attr('stroke-opacity', outsideOpacity)
		.attr('d', outsideTimePathGenerator(timelineDays));
	timeline.append('path')
		.attr('id', 'timelineOutsideTimegap')
		.attr('class', 'graphline graphelement outside')
		.attr('stroke', TL_OUTSIDETIMECOLOR)
		.attr('stroke-opacity', outsideOpacity)
		.attr("stroke-dasharray", "2 4")
		.attr('d', outsideTimePathGenerator(
			timelineDays.filter(outsideTimePathGenerator.defined())
		));
	
	// Draw dots for outsideX using D3 symbols.
	timeline.selectAll(".outsidedot")
		.data(timelineDays)
		.enter()
		.append("path")
		.filter(function(d) { return !isNaN(d.outside90); })
		.attr("class", "outsidedot graphelement outside")
		.attr("transform", function(d) {
			return "translate(" + tlXScale(d.Index) + "," +
				tlYScale(d.outside90) + ")";
		})
		.attr('d', d3.symbol().type(d3.symbolCross).size(TL_SYMBOLSIZE))
		.style("fill", TL_OUTSIDETIMECOLOR)
		.attr('fill-opacity', outsideOpacity)
		;
	
	// Draw recommendPercent as a line.
	let recommendPathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.recommendPercent); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.recommendPercent); });
	timeline.append('path')
		.attr('id', 'timelineRecommend')
		.attr('class', 'graphline graphelement recommend')
		.attr('stroke', TL_RECOMMENDCOLOR)
		.attr('stroke-opacity', recommendOpacity)
		.attr('d', recommendPathGenerator(timelineDays));
	timeline.append('path')
		.attr('id', 'timelineRecommendgap')
		.attr('class', 'graphline graphelement recommend')
		.attr('stroke', TL_RECOMMENDCOLOR)
		.attr('stroke-opacity', recommendOpacity)
		.attr("stroke-dasharray", "2 4")
		.attr('d', recommendPathGenerator(
			timelineDays.filter(recommendPathGenerator.defined())
		));
		
	// Draw dots for recommendPercent using D3 symbols.
	timeline.selectAll(".recommenddot")
		.data(timelineDays)
		.enter()
		.append("path")
		.filter(function(d) { return !isNaN(d.recommendPercent); })
		.attr("class", "recommenddot graphelement recommend")
		.attr("transform", function(d) {
			return "translate(" + tlXScale(d.Index) + "," +
				tlYScale(d.recommendPercent) + ")";
		})
		.attr('d', d3.symbol().type(d3.symbolTriangle).size(TL_SYMBOLSIZE))
		.style("fill", TL_RECOMMENDCOLOR)
		.attr('fill-opacity', recommendOpacity)
		;
			
	// Draw returnPercent as a line.
	let planReturnPathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.planReturnPercent); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.planReturnPercent); });
	timeline.append('path')
		.attr('id', 'timelinePlanReturn')
		.attr('class', 'graphline graphelement planreturn')
		.attr('stroke', TL_PLANRETURNCOLOR)
		.attr('stroke-opacity', planReturnOpacity)
		.attr('d', planReturnPathGenerator(timelineDays));
	timeline.append('path')
		.attr('id', 'timelinePlanReturnGap')
		.attr('class', 'graphline graphelement planreturn')
		.attr('stroke', TL_PLANRETURNCOLOR)
		.attr('stroke-opacity', planReturnOpacity)
		.attr("stroke-dasharray", "2 4")
		.attr('d', planReturnPathGenerator(
			timelineDays.filter(planReturnPathGenerator.defined())
		));
		
	// Draw dots for planReturnPercent using D3 symbols.
	timeline.selectAll(".planreturndot")
		.data(timelineDays)
		.enter()
		.append("path")
		.filter(function(d) { return !isNaN(d.planReturnPercent); })
		.attr("class", "planreturndot graphelement planreturn")
		.attr("transform", function(d) {
			return "translate(" + tlXScale(d.Index) + "," +
				tlYScale(d.planReturnPercent) + ")";
		})
		.attr('d', d3.symbol().type(d3.symbolSquare).size(TL_SYMBOLSIZE))
		.style("fill", TL_PLANRETURNCOLOR)
		.attr('fill-opacity', planReturnOpacity)
		;
			
	// Draw member interest as a line.
	let memberInterestPathGenerator = d3.line()
		.defined(function(d) { return !isNaN(d.member_interest_percent); })
		.x(function(d) { return tlXScale(d.Index); })
		.y(function(d) { return tlYScale(d.member_interest_percent); });
	timeline.append('path')
		.attr('id', 'timelineMemberInterest')
		.attr('class', 'graphline graphelement memberinterest')
		.attr('stroke', TL_MEMBERINTERESTCOLOR)
		.attr('stroke-opacity', memberInterestOpacity)
		.attr('d', memberInterestPathGenerator(timelineDays));
	timeline.append('path')
		.attr('id', 'timelineMemberInterestGap')
		.attr('class', 'graphline graphelement memberinterest')
		.attr('stroke', TL_MEMBERINTERESTCOLOR)
		.attr('stroke-opacity', memberInterestOpacity)
		.attr("stroke-dasharray", "2 4")
		.attr('d', memberInterestPathGenerator(
			timelineDays.filter(memberInterestPathGenerator.defined())
		));
		
	// Draw dots for planReturnPercent using D3 symbols.
	timeline.selectAll(".memberinterestdot")
		.data(timelineDays)
		.enter()
		.append("path")
		.filter(function(d) { return !isNaN(d.member_interest_percent); })
		.attr("class", "memberinterestdot graphelement memberinterest")
		.attr("transform", function(d) {
			return "translate(" + tlXScale(d.Index) + "," +
				tlYScale(d.member_interest_percent) + ")";
		})
		.attr('d', d3.symbol().type(d3.symbolStar).size(TL_SYMBOLSIZE))
		.style("fill", TL_MEMBERINTERESTCOLOR)
		.attr('fill-opacity', memberInterestOpacity)
		;
			
}
