let ageA = [];
let ageB = [];

function hasAgeData(x) {
	if (x == "" || x == "N/A" ) {
		return false;
	} else {
		return true;
	}
}

function drawAgesGraph(data) {
	
	ageA = [0, 0, 0];
	ageB = [0, 0, 0];
	let recordCountA = 0;
	let recordCountB = 0;
	
	// Count the number of records that include each age group.
	data.forEach(function(d) {
		
		if (filterCheck(d)) {
			if (d.current_member == "Yes") {
				recordCountA++;
				
				// Count the groups that had 0-5 year olds.
				if (hasAgeData(d.age_group1) ||
					hasAgeData(d.children_age_group1) ||
					hasAgeData(d.children_age_group2)) {
						ageA[0]++;
				}
			} else if (d.current_member == "No") {
				recordCountB++;
				
				// Count the groups that had 0-5 year olds.
				if (hasAgeData(d.age_group1) ||
					hasAgeData(d.children_age_group1) ||
					hasAgeData(d.children_age_group2)) {
						ageB[0]++;
				}
			}
		}
	});
	
	// Convert the record counts into percentages.
	for (let i=0; i < 3; i++) {
		if (recordCountA > 0) {
			ageA[i] = Math.round(ageA[i] / recordCountA * 100);
		}
		if (recordCountB > 0) {
			ageB[i] = Math.round(ageB[i] / recordCountB * 100);
		}
	}


/*
	  let sumArray = [];
	  let id_Array = [];
	  current_member_Array = [],
	  children_age_group1_Array = [],
	  children_age_group2_Array = [],
	  children_age_group3_Array = [],
	  children_age_group4_Array = [],
	  children_age_group5_Array = [],
	  no_children_Array = [],
	  live_IN_county_Array = [],
	  heard_of_SLE_Array = [],
	  heard_of_SLE_SM_Array = [],
	  heard_of_SLE_museum_ad_Array = [],
	  heard_of_SLE_website_Array = [],
	  heard_of_SLE_story_Array = [],
	  heard_of_SLE_tv_Array = [],
	  heard_of_SLE_BB_Array = [],
	  heard_of_SLE_online_ad_Array = [],
	  heard_of_SLE_other_Array = [];


	data.forEach(function(d) {
		id_Array.push(d.id);
		current_member_Array.push(d.current_member); //push all jan values into jan array
		children_age_group1_Array.push(d.children_age_group1);
		children_age_group2_Array.push(d.children_age_group2);
		children_age_group3_Array.push(d.children_age_group3);
		children_age_group4_Array.push(d.children_age_group4);
		children_age_group5_Array.push(d.children_age_group5);
		no_children_Array.push(d.no_children);
		live_IN_county_Array.push(d.live_IN_county);
		heard_of_SLE_Array.push(d.heard_of_SLE);
		heard_of_SLE_SM_Array.push(d.heard_of_SLE_SM);
		heard_of_SLE_museum_ad_Array.push(d.heard_of_SLE_museum_ad);
		heard_of_SLE_website_Array.push(d.heard_of_SLE_website);
		heard_of_SLE_story_Array.push(d.heard_of_SLE_story);
		heard_of_SLE_tv_Array.push(d.heard_of_SLE_tv);
		heard_of_SLE_BB_Array.push(d.heard_of_SLE_BB);
		heard_of_SLE_online_ad_Array.push(d.heard_of_SLE_online_ad);
		heard_of_SLE_other_Array.push(d.heard_of_SLE_other);
	});
//	console.log(children_age_group1_Array);



	let children_age_group1_Array_Sum = getSumOfArray(current_member_Array, children_age_group1_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4); //get sum of jan array
	let children_age_group2_Array_Sum = getSumOfArray(current_member_Array, children_age_group2_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4);
	let children_age_group3_Array_Sum = getSumOfArray(current_member_Array, children_age_group3_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4);
	let children_age_group4_Array_Sum = getSumOfArray(current_member_Array, children_age_group4_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4);
	let children_age_group5_Array_Sum = getSumOfArray(current_member_Array, children_age_group5_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4);
	let no_children_Array_Sum = getSumOfArray(current_member_Array, no_children_Array, live_IN_county_Array, ageB1, ageB2, ageB3, ageB4);



	//sumArray.push(children_age_group1_Array_Sum ,children_age_group2_Array_Sum ,children_age_group3_Array_Sum, children_age_group4_Array_Sum, no_childeren_Array_Sum   );

	ageA = [children_age_group1_Array_Sum[0], children_age_group2_Array_Sum[0], children_age_group3_Array_Sum[0], children_age_group4_Array_Sum[0], children_age_group5_Array_Sum[0], no_children_Array_Sum[0]];
	//let newListA = [ a/766 for a in A];
//	console.log(ageA);
	ageB = [children_age_group1_Array_Sum[1], children_age_group2_Array_Sum[1], children_age_group3_Array_Sum[1], children_age_group4_Array_Sum[1], children_age_group5_Array_Sum[1], no_children_Array_Sum[1]];
	//let newListB = [ a/b for a, b in (B,t)];
//	console.log(ageB);

//	console.log(children_age_group1_Array_Sum[0]); //here is your array you want

	function getSumOfArray(array1, array2, array3, Marion, Adjacent, Elsewhere, Out) {


		let thisSum = [0, 0];


		for (let i = 0; i < array2.length; i++) {
			if (Marion && Adjacent && Elsewhere && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (!(Marion || Adjacent || Elsewhere || Out)) {
				thisSum[0] = 0;
				thisSum[1] = 0;
			} else if (Marion && Adjacent && Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Adjacent && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Indiana, but not in the Indy metro area")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Elsewhere && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Adjacent && Elsewhere && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Adjacent) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "Indiana, but not in the Indy metro area")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Adjacent && Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "Indiana, but not in the Indy metro area")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Adjacent && Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Another state or country (please specify)" || array3[i] == "Marion County, Indiana")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Adjacent && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana" || array3[i] == "Indiana, but not in the Indy metro area")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Elsewhere && Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Marion) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Indiana, but not in the Indy metro area" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Adjacent) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana" || array3[i] == "Indiana, but not in the Indy metro area" || array3[i] == "Another state or country (please specify)")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Elsewhere) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana" || array3[i] == "Another state or country (please specify)" || array3[i] == "A county adjacent to Marion County")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			} else if (Out) {
				if (!(array2[i] == 'null' || array2[i] == "N/A" || array2[i] == "" || array3[i] == "Marion County, Indiana" || array3[i] == "A county adjacent to Marion County" || array3[i] == "Indiana, but not in the Indy metro area")) {
					if (array1[i] == "Yes")
						thisSum[0] += 1;
					else
						thisSum[1] += 1;
				}
			}

		}

		thisSum[0] = Math.round((thisSum[0] / 687) * 100);
		thisSum[1] = Math.round((thisSum[1] / 687) * 100);


		return thisSum;
	}
*/



	let trace1 = {
//		x: ['0-2', '3-5', '6-8', '9-12', '13-18', 'No Children'],
		x: ['0-5', '6-12', '13-18'],
		y: ageA,
		name: 'Members',
		marker: {
			color: '#2c7fb8'
		},
		type: 'bar'
	};

	let trace2 = {
//		x: ['0-2', '3-5', '6-8', '9-12', '13-18', 'No Children'],
		x: ['0-5', '6-12', '13-18'],
		y: ageB,
		name: 'Non-members',
		marker: {
			color: '#e34a33'
		},
		type: 'bar'
	};

	let plotData = [trace1, trace2];

	let layout = {
		title: 'What ages were represented in your group?',
		xaxis: {
			tickfont: {
				size: 14,
				color: '#636363'
			}
		},
		 yaxis:{ title: 'Percentage of respondents',
		range: [0,100]
		},

		xaxis: {
			title: 'Age Group',
			titlefont: {
				size: 16,
				color: '#636363'
			},
			tickfont: {
				size: 14,
				color: "#636363"
			}
		},
		legend: {
			x: 0,
			y: 1.0,
			bgcolor: '#f0f0f0',
			bordercolor: '#f0f0f0'
		},
		barmode: 'group',
		bargap: 0.15,
		bargroupgap: 0.1
	};

	Plotly.newPlot('agebarchart', plotData, layout);

}


/*  d3.csv("SurveyData.csv", function(error, csv_data) {
 let data = d3.nest()
  .key(function(d) { return d.current_member;})
  .rollup(function(d) { 
   return d3.sum(d, function(g) {return g.value == null ? 0 : 1 });
  }).entries(csv_data);
*/
//A=[70, 23, 29, 27, 42, 93];
//B=[73, 25, 29, 30, 49, 81];

//About//
//Dataset retrived from: http://vis.ninja/teaching/H517/project1/cholera_data/deaths.age.mf//
//Data filtered and parsed with Excel//
//Graphing done in Plotly.js built on top of D3.js and stack.gl//
//Color blindness safe with the help of Color Brewer 2.0, http://colorbrewer2.org/#type=sequential&scheme=PuBu&n=3//
