class BarChart {
	constructor(obj) {
		//this is the actual data from the csv file
		this.data = obj.data;

		//this sets the bar chart title
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

		//this maps the data so it can be used in the chart
		this.labels = this.data.map((d) => d[this.xValue]);

	
		//this calculates the total of both yValues if there have been two entered into the array
		this.totals = [];
		for (let i = 0; i < this.data.length; i++) {
			let total = 0;
			for (let j = 0; j < this.yValue.length; j++) {
				total += +this.data[i][this.yValue[j]];
			}
			
			this.totals.push(total);
		}

		this.dataMax = max(this.totals);


		//this is an error message in the case of only one yValue being put into the array
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
		
		for (let i = 0; i < this.data.length; i++) {
			let scale;

			scale = this.chartHeight / this.dataMax;

			// draw bar

			push();
			//this will run check the lenght of the yValue array and if there are more than one data values in it then it will draw the next one on top of the previous.

			for (let j = 0; j < this.yValue.length; j++) {
				let barHeight = this.data[i][this.yValue[j]] * scale;

				//this checks if the user has entered true as the value for percentBar, if they have then it will change the scale of the bars to match that of a 100% bar chart
				if (this.percentBar) {
					barHeight =
						(this.data[i][this.yValue[j]] / this.totals[i]) * this.chartHeight;
					
					}
				fill(this.barColour[j % this.barColour.length]);
				rect(0, 0, this.barWidth, -barHeight);
				translate(0, -barHeight);
				
			}
			pop();
			// draw label
			push();

			translate(this.barWidth / 2, this.labelPadding);
			rotate(this.labelRotation);
			textFont(openSans);
			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			text(this.labels[i], 0, 0);

			pop();

			translate(gap + this.barWidth, 0);
		}
		pop();

		let tickGap = this.chartHeight / 5;
		let tickIncrement = this.dataMax / 5;
		for (let i = 0; i <= 5; i++) {
			stroke(this.axisLineColour);
			line(0, -tickGap * i, -this.labelPadding/2, -tickGap * i);
			textFont(openSans)
			textSize(this.labelTextSize);
			fill(this.labelColour);
			noStroke();
			textAlign(RIGHT, CENTER);
			text((tickIncrement * i).toFixed(2), -this.labelPadding, -tickGap * i);
		}

		pop();
	}
}
