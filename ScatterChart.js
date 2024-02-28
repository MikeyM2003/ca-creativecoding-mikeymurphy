class ScatterChart {
	constructor(obj) {
		//this is the actual data from the csv file
		this.data = obj.data;


		//sets the title of the bar chart
		this.title = obj.title;
		//this sets what data is on the y value of the bar and then the x value of the bar
		this.yValue = obj.yValue;
		this.xValue = obj.xValue;

		//sets the size of the chart
		this.chartWidth = obj.chartWidth;
		this.chartHeight = obj.chartHeight;

		//position of the start of the chart
		this.xPos = obj.xPos;
		this.yPos = obj.yPos;

		//this decides if the bar chart is a 100% bar chart or not
		this.percentBar = obj.percentBar;

		//Colour of lines of chart and outline of bars
		this.axisLineColour = obj.axisLineColour;

		//width and colour of bars
		this.barWidth = obj.barWidth;
		this.barColour = obj.barColour;

		//label font size, padding between chart and where the text starts, what angle the text is at, colour of text
		this.labelTextSize = obj.labelTextSize;
		this.labelPadding = obj.labelPadding;
		this.labelRotation = obj.labelRotation;
		this.labelColour = obj.labelColour;

		this.labels = this.data.map((d) => d[this.xValue]);


		this.totals = [];
		for (let i = 0; i < this.data.length; i++) {
			let total = 0;
			for (let j = 0; j < this.yValue.length; j++) {
				total += +this.data[i][this.yValue[j]];
			}
			
			this.totals.push(total);
		}

		this.dataMax = max(this.totals);

		if(this.percentBar & this.yValue.length < 2){
			console.warn("ERROR: ONLY ONE Y VALUE IN PERCENT BAR CHART WITH X VALUE OF: " + this.xValue + " AND Y VALUE OF: " + this.yValue)
		}
	}

	render() {
		
		push();
		translate(this.xPos, this.yPos);
		stroke(this.axisLineColour);
		line(0, 0, 0, -this.chartHeight);
		line(0, 0, this.chartWidth, 0);
		push()
		textFont(openSans);
		textAlign(CENTER)
		textSize(this.labelTextSize);
		fill(this.labelColour);
		noStroke();
		text(this.title, this.chartWidth/2, -this.chartHeight-this.labelPadding);
	pop()
		let gap =
			(this.chartWidth - this.data.length * this.barWidth) /
			(this.data.length + 1);

		push();
		translate(gap, 0);
		//vertex shape is started here
		beginShape();
			vertex(0,0);
		for (let i = 0; i < this.data.length; i++) {
			let scale;

			scale = this.chartHeight / this.dataMax;

			// draw vertex points

			push();
			
			for (let j = 0; j < this.yValue.length; j++) {
				let barHeight = this.data[i][this.yValue[j]] * scale;						
				vertex((this.barWidth+gap)*(i+1), -barHeight);
			
				translate(0, -barHeight);
				
			}
			
			pop();
			// draw label
			push();

			translate(this.barWidth / 2, this.labelPadding);
			rotate(this.labelRotation);
			textFont(openSans)
			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			text(this.labels[i], 0, 0);

			pop();

			translate(gap + this.barWidth, 0);
		}
		
		pop();
		//draws the end point of the vertex which creates the line graph shape 
		vertex(this.chartWidth, 0);
		noFill();
		stroke(this.barColour);
		endShape();

		let tickGap = this.chartHeight / 5;
		let tickIncrement = this.dataMax / 5;
		for (let i = 0; i <= 5; i++) {
			stroke(this.axisLineColour);
			line(0, -tickGap * i, -20, -tickGap * i);
			textFont(openSans)
			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			textAlign(RIGHT, CENTER);
			text((tickIncrement * i).toFixed(2), -20, -tickGap * i);
		}

		pop();
	}
}
