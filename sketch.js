let barCharts = [];
let data;
let cleanData = [];
let numRows;

function preload() {
	data = loadTable("data/graduates.csv", "csv", "header");
	data2 = loadTable("data/graduatesCollege.csv", "csv", "header");
	
	openSans = loadFont('fonts/Open_Sans/static/OpenSans-Regular.ttf');
}

function setup() {
	
	createCanvas(1600, 800);
	
	textAlign(LEFT, CENTER);
	angleMode(DEGREES);

	numRows = data.rows.length;
	

	cleanData = data.rows.map((row) => row.obj);
	cleanData2 = data2.rows.map((row) => row.obj);

	let barChart01 = {
		data: cleanData,
		title: "Female Graduates of all Universities 2010-2019",
		yValue: ["Female"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 100,
		xPos: 550,
		yPos: 450,
		barWidth: 12,
		barColour: ["#49A078"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 25,
		labelRotation: 90,
		labelColour: "#1F2421 ",
		percentBar: false,
	};

	let barChart02 = {
		data: cleanData,
		title: "Male and Female University Graduates 2010-2019",
		yValue: ["Male","Female"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 100,
		xPos: 150,
		yPos: 450,
		barWidth: 12,
		barColour: ["#49A078", "#216869"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 11,
		labelRotation: 45,
		labelColour: "#1F2421",
		percentBar: true,
	};

	let barChart03 = {
		data: cleanData,
		title: "Male and Female University Graduates 2010-2019",
		yValue: ["Male","Female"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 100,
		xPos: 150,
		yPos: 250,
		barWidth: 12,
		barColour: ["#49A078", "#216869"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 11,
		labelRotation: 45,
		labelColour: "#1F2421",
		percentBar: false,
	};

	let barChart04 = {
		data: cleanData,
		title: "Error Example Graph. 100% graph with only one yValue",
		yValue: ["Male"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 100,
		xPos: 550,
		yPos: 250,
		barWidth: 12,
		barColour: ["#49A078"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 11,
		labelRotation: 90,
		labelColour: "#1F2421",
		percentBar: true,
	};

	let barChart05 = {
		data: cleanData2,
		title: "Graduates from all higher education types from 2010-2019",
		yValue: ["University", "College", "Institute of Technology"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 200,
		xPos: 550,
		yPos: 750,
		barWidth: 12,
		barColour: ["#9CC5A1", "#49A078", "#216869"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 25,
		labelRotation: 15,
		labelColour: "#1F2421",
		
	};

	let Chart06 = {
		data: cleanData2,
		title: "Insitute of Technology graduates per year 2010-2019",
		yValue: ["Institute of Technology"],
		xValue: "Graduation Year",
		chartWidth: 200,
		chartHeight: 100,
		xPos: 150,
		yPos: 650,
		barWidth: 12,
		barColour: ["#49A078"],
		axisLineColour: "#1F2421",
		labelTextSize: 9,
		labelPadding: 11,
		labelRotation: 90,
		labelColour: "#1F2421",
		percentBar: false,
	};

	

	
	barCharts.push(new BarChart(barChart01));
	barCharts.push(new BarChart(barChart02));
	barCharts.push(new BarChart(barChart03));
	barCharts.push(new BarChart(barChart04));
	barCharts.push(new HorizontalBarChart(barChart05));
	barCharts.push(new ScatterChart(Chart06));

}

function draw() {
	background('#DCE1DE')
	barCharts.forEach((bar) => bar.render());
}
