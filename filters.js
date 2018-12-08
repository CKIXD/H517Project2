
let buttonWidth = (TL_WIDTH - FILTER_LEFTMARGIN - BUTTON_PADDING * 4) / 5;

let filterSvg = d3.select("svg#filters");

filterSvg.append("text")
	.text("Filters:")
	.attr("x", TL_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

// Museum Membership filters
filterSvg.append("text")
	.text("Museum Member:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;
	
filterSvg.append('rect')
	.attr('id', 'filterbuttonmemberyes')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + BUTTON_PADDING)
	.attr("y", 0)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "red")
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonmemberyeslabel')
	.attr('class', 'filterbuttonlabel')
	.text('Yes')
	.attr('x', FILTER_LEFTMARGIN + BUTTON_PADDING + buttonWidth / 2)
	.attr("y", BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

// Age filters
filterSvg.append("text")
	.text("Ages Represented:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING))
	.attr('text-anchor','end')
	;

// Came From filters
filterSvg.append("text")
	.text("Came From:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", 3 * (BUTTON_HEIGHT + BUTTON_PADDING))
	.attr('text-anchor','end')
	;

/*
filterSvg.append('rect')
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
filterSvg.append('text')
	.attr('id', 'buttontotallabel')
	.attr('class', 'graphbuttonlabel')
	.text('Total')
	.attr('x', buttonPadding + buttonWidth / 2)
	.attr('y', graphHeight + buttonPadding + buttonHeight / 2 + 
		buttonLabelYAdjust)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none');
*/