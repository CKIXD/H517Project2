
let buttonWidth = (TL_WIDTH - FILTER_LEFTMARGIN - BUTTON_PADDING * 4) / 5;

let filterSvg = d3.select("svg#filters");

filterSvg.append("text")
	.text("Filters:")
	.attr("x", TL_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

// Draw the Museum Membership filters line
filterSvg.append("text")
	.text("Museum Member:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;
	
filterSvg.append('rect')
	.attr('id', 'filterbuttonmemberyes')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN)
	.attr("y", 0)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.on("click", function(d) {
		filter_mm_yes = !filter_mm_yes;
		d3.select("#filterbuttonmemberyes")
			.attr("fill-opacity", (filter_mm_yes ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonmemberyeslabel')
	.attr('class', 'filterbuttonlabel')
	.text('Yes')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth / 2)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonmemberno')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + buttonWidth + BUTTON_PADDING)
	.attr("y", 0)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.on("click", function(d) {
		filter_mm_no = !filter_mm_no;
		d3.select("#filterbuttonmemberno")
			.attr("fill-opacity", (filter_mm_no ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonmembernolabel')
	.attr('class', 'filterbuttonlabel')
	.text('No')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth * 1.5 + BUTTON_PADDING)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonmemberformer')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + (buttonWidth + BUTTON_PADDING) * 2)
	.attr("y", 0)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.on("click", function(d) {
		filter_mm_former = !filter_mm_former;
		d3.select("#filterbuttonmemberformer")
			.attr("fill-opacity", (filter_mm_former ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonmemberformerlabel')
	.attr('class', 'filterbuttonlabel')
	.text('Former')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth * 2.5 + BUTTON_PADDING * 2)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

// Draw the Age filters line
filterSvg.append("text")
	.text("Ages Represented:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonage0to5')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.attr("fill-opacity", 0.2)
	.on("click", function(d) {
		filter_age_0to5 = !filter_age_0to5;
		d3.select("#filterbuttonage0to5")
			.attr("fill-opacity", (filter_age_0to5 ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonage0to5label')
	.attr('class', 'filterbuttonlabel')
	.text('0-5')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth / 2)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonage6to12')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + buttonWidth + BUTTON_PADDING)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.attr("fill-opacity", 0.2)
	.on("click", function(d) {
		filter_age_6to12 = !filter_age_6to12;
		d3.select("#filterbuttonage6to12")
			.attr("fill-opacity", (filter_age_6to12 ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonage6to12label')
	.attr('class', 'filterbuttonlabel')
	.text('6-12')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth * 1.5 + BUTTON_PADDING)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonage13to18')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + (buttonWidth + BUTTON_PADDING) * 2)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.attr("fill-opacity", 0.2)
	.on("click", function(d) {
		filter_age_13to18 = !filter_age_13to18;
		d3.select("#filterbuttonage13to18")
			.attr("fill-opacity", (filter_age_13to18 ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonage13to18label')
	.attr('class', 'filterbuttonlabel')
	.text('13-18')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth * 2.5 + BUTTON_PADDING * 2)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;


// Draw the Came From filters line
filterSvg.append("text")
	.text("Came From:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING) + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttoncamefrommarion')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING))
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	.on("click", function(d) {
		filter_cf_marion = !filter_cf_marion;
		d3.select("#filterbuttoncamefrommarion")
			.attr("fill-opacity", (filter_cf_marion ? 1 : .2));
		refreshSurveyData();
	})
	;
filterSvg.append('text')
	.attr('id', 'filterbuttoncamefrommarionlabel')
	.attr('class', 'filterbuttonlabel')
	.text('Marion County')
	.attr('x', FILTER_LEFTMARGIN + buttonWidth / 2)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING) + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;


function filterCheck(record) {
	let retval = true;
	
	if (!filter_mm_yes) {
		if (record.current_member == "Yes") {
			retval = false;
		}
	}
	if (!filter_mm_no) {
		if (record.current_member == "No") {
			retval = false;
		}
	}
	if (!filter_mm_former) {
		if (record.current_member == "I am a former member") {
			retval = false;
		}
	}
	
	if (retval && filter_age_0to5) {
		retval = (record.age_group1.substring(0,1) == "A" ||
			record.children_age_group1.substring(0,1) == "0" ||
			record.children_age_group2.substring(0,1) == "3");
	}
	if (retval && filter_age_6to12) {
		retval = (record.age_group2.substring(0,1) == "A" ||
			record.age_group3.substring(0,1) == "A" ||
			record.children_age_group3.substring(0,1) == "6" ||
			record.children_age_group4.substring(0,1) == "9");
	}
	if (retval && filter_age_13to18) {
		retval = (record.age_group4.substring(0,1) == "A" ||
			record.children_age_group5.substring(0,1) == "1");
	}

	if (!filter_cf_marion) {
		if (record.live_IN_county.substring(0,1) == "M") {
			retval = false;
		}
	}
		
	return retval;
}