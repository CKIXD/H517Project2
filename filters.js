
let filterSvg = d3.select("svg#filters");

filterSvg.append("text")
	.text("TODO: Draw Filters Here")
	.attr("x", 50)
	.attr("y", 50)
	.attr("fill", "red")
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