
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
	.attr("fill", "black")
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
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttonages0')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + BUTTON_PADDING)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING)
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	;
filterSvg.append('text')
	.attr('id', 'filterbuttonages0label')
	.attr('class', 'filterbuttonlabel')
	.text('0-2')
	.attr('x', FILTER_LEFTMARGIN + BUTTON_PADDING + buttonWidth / 2)
	.attr("y", BUTTON_HEIGHT + BUTTON_PADDING + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;


// Came From filters
filterSvg.append("text")
	.text("Came From:")
	.attr("x", FILTER_LEFTMARGIN - BUTTON_PADDING)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING) + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','end')
	;

filterSvg.append('rect')
	.attr('id', 'filterbuttoncamefrommarion')
	.attr('class', 'filterbutton')
	.attr("x", FILTER_LEFTMARGIN + BUTTON_PADDING)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING))
	.attr("width", buttonWidth)
	.attr("height", BUTTON_HEIGHT)
	.attr("fill", "black")
	;
filterSvg.append('text')
	.attr('id', 'filterbuttoncamefrommarionlabel')
	.attr('class', 'filterbuttonlabel')
	.text('Marion County')
	.attr('x', FILTER_LEFTMARGIN + BUTTON_PADDING + buttonWidth / 2)
	.attr("y", 2 * (BUTTON_HEIGHT + BUTTON_PADDING) + BUTTON_LABEL_Y_ADJUST)
	.attr('text-anchor','middle')
	.attr('fill', 'white')
	.style('pointer-events','none')
	;

