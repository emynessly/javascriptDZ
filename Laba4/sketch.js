let myScatter;

let myChar;
let studentData;
let myBar;

function preload(){
	studentData = loadTable('students.csv', 'csv', 'header');
}
function setup() {
	createCanvas(800, 800);
	console.log(studentData);
	myBar = new Bar(10, 10, 700, 700);
	myBar.setupAxis(0, 110, 0, 120, 10, 10);
	let gender = studentData.getColumn('gender');
	let quiz = studentData.getColumn('quiz');
	let project = studentData.getColumn('project');
	let exam = studentData.getColumn('exam');
	let finalMark = studentData.getColumn('finalMark');
	let genderM = 0;
	let quizM = 0;
	let projectM = 0;
	let examM = 0;
	let finalMarkM = 0;
	let genderF = 0;
	let quizF = 0;
	let projectF = 0;
	let examF = 0;
	let finalMarkF = 0;
	for (let i = 0; i < gender.length; i++){
		if (gender[i] == 'F') { // подсчет женщин
			genderF++;
			if (quiz[i] >= 50){
				quizF ++;
			}
			if (project[i] >= 50){
				projectF ++;
			}
			if (exam[i] >= 50){
				examF ++;
			}
			if (finalMark[i] >= 50){
				finalMarkF ++;
			}
		} else if (gender[i] == 'M'){ // подсчет мужчин
			genderM++;
			if (quiz[i] >= 50){
				quizM ++;
			}
			if (project[i] >= 50){
				projectM ++;
			}
			if (exam[i] >= 50){
				examM ++;
			}
			if (finalMark[i] >= 50){
				finalMarkM ++;
			}
		}
	}
/*	genderFperc = (genderF * 100)/(genderF+genderM);
	// console.log(genderFperc);
	genderMperc = (genderM * 100)/(genderF+genderM);
	finalMarkFperc = ((finalMarkF * 100)/genderF);
	console.log(finalMarkFperc);
	finalMarkMperc = ((finalMarkM * 100)/genderM); */
	
	let labels = ['female', '\n\n female \n quiz \n > 50', '\n\n female \n project \n > 50', '\n\n female \n exam \n > 50', '\n\n female \n final mark \n > 50', 
				 'male', '\n\n male \n quiz \n > 50', '\n\n male \n project \n > 50', '\n\n male \n exam \n > 50', '\n\n male \n final mark \n > 50'];
	let colors = ['pink','#f694a5', '#f07f93', '#e86980', '#de4d67', 'cyan', '#01d9d9', '#00c6c6', '#00b2b2', '#009e9e'];
	let info = [genderF, quizF, projectF, examF, finalMarkF, genderM, quizM, projectM, examM, finalMarkM];
	myBar.addBars(info, labels, colors);
	
//	myBar.addBar(genderFperc, 10, 10, 'red');
//	myBar.addBar(30, 10, 10, 'blue'); 
	/**
	myChar = new Chart(10, 10, 700, 700);
	myChar.setupAxis(0, 100, 0, 100, 10, 10);
	
	let quizMarks = studentData.getColumn('quiz');
	let projectMarks = studentData.getColumn('project');
	
	myChar.drawLines(quizMarks, projectMarks, 1, 'red');
	**/
	
	/**
	myScatter = new Scatter(10, 10, 700, 700); // Создается график с параметрами 700 на 700 площадью и с 10, 10 координат откуда мы начинаем
	console.log(studentData);
	console.log(studentData.getRow(0));
	console.log(studentData.findRow('Xander', 'firstName')); // Нахождение первого элемента
	console.log(studentData.findRows('Xander', 'firstName')); // Нахождение всех элементов
	console.log(studentData.getColumn('finalMark'));
	
	let quizMarks = studentData.getColumn('quiz');
	let projectMarks = studentData.getColumn('project');
    myScatter.setupAxis(0, 100, 0, 100, 10, 10);  // Установка осей(xBegin, xEnd, yBegin, yEnd, xTick, yTick)
	
	myScatter.addDataPoints(quizMarks, projectMarks, 5, 'red');
	myScatter.lineOfBestFit(quizMarks, projectMarks, 'blue');
	**/

	/*
	var xPoints = []; // Массив координат точек по X
	var yPoints = []; // Массив координат точек по Y
	// Радомные координаты для 100 точек
	for (var i = 0; i <= 100; i += 10) {
		xPoints.push(random(0, 100)); 
		yPoints.push(random(0, 100));
	}
	myScatter.addDataPoints(xPoints, yPoints, 10, 'red'); // Добавление точек с размером 10 и цветом "Red". Важно: Метод отрисывовывает все точки
	myScatter.lineOfBestFit(xPoints, yPoints, 'blue'); // Отрисовка "апроксимации"(линия, которая ближе всего ко всем точкам)
	*/
}

function draw() {
	noLoop();
}

//constructor to draw a scatter diagram
//the x and y coordinates set the canvas location and the width and height size
function Scatter(x, y, width, height) {
	//save parameter values as properties
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	//setup the axis take smallest and largest possible values for the axis
	//also how far apart the scale should the ticks be for each axis.
	this.setupAxis = function(xMin, xMax, yMin, yMax, xTickSpacing, yTickSpacing) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;

		//set the drawing properties for the axis
		stroke(0);
		strokeWeight(1);
		fill(0);

		//we need some padding before the axis line for the ticks and labels
		//we can just set the padding for the xAxis -labled y as it relates to the
		//height of the diagram
		var yPadding = 15;
		//create a property for the height of the actual plot and it start y. not including
		//the padding
		this.plotHeight = this.height - yPadding;
		this.plotY = this.y;

		//the x padding is more tricky we don't know how wide the label is so
		//lets check each tick and find the widest
		var widestYTick = 0;
		for (var i = yMin; i <= yMax; i += yTickSpacing) {
			if (textWidth(i) > widestYTick) {
				widestYTick = textWidth(i);
			}
		}

		//set the x padding to be the widest label plus 5 for the tick
		var xPadding = widestYTick + 5;

		//create a width property and an x value for the plot without the padding
		this.plotWidth = this.width - xPadding;
		this.plotX = this.x + xPadding;

		//plot the x axis
		line(this.plotX, this.plotY + this.plotHeight, this.plotX + this.plotWidth,
			this.plotY + this.plotHeight);

		//plot the y axis
		line(this.plotX, this.plotY, this.plotX, this.plotY + this.plotHeight);


		//draw the x ticks
		//how far apart are the ticks on the screen
		var scaledXTickSpacing = map(xTickSpacing, 0, xMax, 0, this.plotWidth);
		var xTickValue = xMin;
		//align the text so it is in the centre of each tick
		textAlign(CENTER, TOP);
		//iterate through the ticks, draw the line and a label
		for (let i = this.plotX; i <= (this.plotX + this.plotWidth + 1); i +=
			scaledXTickSpacing) {
			line(i, this.plotY + this.plotHeight, i, this.plotY + this.plotHeight +
				yPadding * 0.66);
			text(xTickValue, i, this.plotY + this.plotHeight + yPadding * 0.66);
			xTickValue += xTickSpacing;
		}

		//draw the y ticks
		var scaledYTickSpacing = map(yTickSpacing, 0, yMax, 0, this.plotHeight);
		var yTickValue = yMax;
		textAlign(RIGHT, CENTER);
		for (let i = this.plotY; i < (this.plotY + this.plotHeight + 1); i +=
			scaledYTickSpacing) {
			line(this.plotX, i, this.plotX - 5, i);
			text(yTickValue, this.plotX - 5, i);
			yTickValue -= yTickSpacing;
		}
	};

	//Add a single data point to the diagram the x and y value set the location
	//and the colour and size the look of the point
	this.addDataPoint = function(xValue, yValue, size, colour) {
		//if the data point is in the correct range for the graph add a point

		if (xValue >= this.xMin && xValue <= this.xMax &&
			yValue >= this.yMin && yValue <= this.yMax) {
			//use map to scale the point to the right location on the axis
			var pointX = round(map(xValue, this.xMin, this.xMax, this.plotX,
				this.plotWidth + this.plotX));
			var pointY = round(map(yValue, this.yMin, this.yMax, this.plotHeight +
				this.plotY, this.plotY));

			//switch the colour and plot
			fill(colour);
			noStroke();
			ellipse(pointX, pointY, size);
		}
	};

	//add arrays of x and y datapoints
	this.addDataPoints = function(xValues, yValues, size, colour) {
		if (xValues.length == yValues.length) {
			for (var i = 0; i < xValues.length; i++) {
				this.addDataPoint(xValues[i], yValues[i], size, colour);
			}
		} else {
			console.log("Error: the data point arrays aren't the same length");
		}
	};

	//draw a line of best fit from arrays of x and y data values
	this.lineOfBestFit = function(xValues, yValues, colour) {
		//if the two data arrays are the same length use the least squares forumula to
		//work out the m (gradient) and b(intercept) values.
		if (xValues.length == yValues.length) {
			var sumX = 0;
			var sumY = 0;
			var sumXY = 0;
			var sumX2 = 0;
			for (var i = 0; i < xValues.length; i++) {
				sumX += parseFloat(xValues[i]);
				sumY += parseFloat(yValues[i]);
				sumXY += parseFloat(xValues[i]) * parseFloat(yValues[i]);
				sumX2 += parseFloat(xValues[i]) * parseFloat(xValues[i]);
			}

			var m = (xValues.length * sumXY - sumX * sumY) / (xValues.length * sumX2 -
				sumX * sumX);
			var b = (sumY - m * sumX) / xValues.length;
			console.log("y=" + m + "x+" + b);

			var scaleB = map(b, this.yMin, this.yMax, this.plotHeight +
				this.plotY, this.plotY);

			//if x is negative add plotY to the final param if positive take away
			if (m >= 0) {
				let endY = scaleB - (m * this.plotWidth) - this.plotY;
			} else {
				let endY = scaleB - (m * this.plotWidth) + this.plotY;
			}
			stroke(colour);
			line(this.plotX, scaleB, this.plotX + this.plotWidth, endY);
		} else {
			console.log("Error: the data point arrays aren't the same length");
		}
	};
}

function Chart(x, y, width, height) {
	//save parameter values as properties
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	//setup the axis take smallest and largest possible values for the axis
	//also how far apart the scale should the ticks be for each axis.
	this.setupAxis = function(xMin, xMax, yMin, yMax, xTickSpacing, yTickSpacing) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;

		//set the drawing properties for the axis
		stroke(0);
		strokeWeight(1);
		fill(0);

		//we need some padding before the axis line for the ticks and labels
		//we can just set the padding for the xAxis -labled y as it relates to the
		//height of the diagram
		var yPadding = 15;
		//create a property for the height of the actual plot and it start y. not including
		//the padding
		this.plotHeight = this.height - yPadding;
		this.plotY = this.y;

		//the x padding is more tricky we don't know how wide the label is so
		//lets check each tick and find the widest
		var widestYTick = 0;
		for (var i = yMin; i <= yMax; i += yTickSpacing) {
			if (textWidth(i) > widestYTick) {
				widestYTick = textWidth(i);
			}
		}

		//set the x padding to be the widest label plus 5 for the tick
		var xPadding = widestYTick + 5;

		//create a width property and an x value for the plot without the padding
		this.plotWidth = this.width - xPadding;
		this.plotX = this.x + xPadding;

		//plot the x axis
		line(this.plotX, this.plotY + this.plotHeight, this.plotX + this.plotWidth,
			this.plotY + this.plotHeight);

		//plot the y axis
		line(this.plotX, this.plotY, this.plotX, this.plotY + this.plotHeight);


		//draw the x ticks
		//how far apart are the ticks on the screen
		var scaledXTickSpacing = map(xTickSpacing, 0, xMax, 0, this.plotWidth);
		var xTickValue = xMin;
		//align the text so it is in the centre of each tick
		textAlign(CENTER, TOP);
		//iterate through the ticks, draw the line and a label
		for (let i = this.plotX; i <= (this.plotX + this.plotWidth + 1); i +=
			scaledXTickSpacing) {
			line(i, this.plotY + this.plotHeight, i, this.plotY + this.plotHeight +
				yPadding * 0.66);
			text(xTickValue, i, this.plotY + this.plotHeight + yPadding * 0.66);
			xTickValue += xTickSpacing;
		}

		//draw the y ticks
		var scaledYTickSpacing = map(yTickSpacing, 0, yMax, 0, this.plotHeight);
		var yTickValue = yMax;
		textAlign(RIGHT, CENTER);
		for (let i = this.plotY; i < (this.plotY + this.plotHeight + 1); i +=
			scaledYTickSpacing) {
			line(this.plotX, i, this.plotX - 5, i);
			text(yTickValue, this.plotX - 5, i);
			yTickValue -= yTickSpacing;
		}
	};
	
	this.addDataPoint = function(xValue, yValue, size, colour) {
		//if the data point is in the correct range for the graph add a point

		if (xValue >= this.xMin && xValue <= this.xMax &&
			yValue >= this.yMin && yValue <= this.yMax) {
			//use map to scale the point to the right location on the axis
			var pointX = round(map(xValue, this.xMin, this.xMax, this.plotX,
				this.plotWidth + this.plotX));
			var pointY = round(map(yValue, this.yMin, this.yMax, this.plotHeight +
				this.plotY, this.plotY));

			//switch the colour and plot
			fill(colour);
			noStroke();
			ellipse(pointX, pointY, size);
		}
	};
	
	this.drawLines = function(xValues, yValues, size, colour){
		if (xValues.length == yValues.length) {
			for (var i = 0; i < xValues.length; i++) {
				this.addDataPoint(xValues[i], yValues[i], size, colour);
				if (i != 0)
				{
					stroke(colour);
					strokeWeight(size/2);
					let pointPrevX = round(map(xValues[i-1], this.xMin, this.xMax, this.plotX, this.plotWidth + this.plotX));
					let pointPrevY = round(map(yValues[i-1], this.yMin, this.yMax, this.plotHeight + this.plotY, this.plotY));
					
					let pointX = round(map(xValues[i], this.xMin, this.xMax, this.plotX, this.plotWidth + this.plotX));
					let pointY = round(map(yValues[i], this.yMin, this.yMax, this.plotHeight + this.plotY, this.plotY));
					line(pointPrevX, pointPrevY, pointX, pointY);
				}
			}
		} else {
			console.log("Error: the data point arrays aren't the same length");
		}
	};
}
	

function Bar(x,y, width, height){
		//save parameter values as properties
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	//setup the axis take smallest and largest possible values for the axis
	//also how far apart the scale should the ticks be for each axis.
	this.setupAxis = function(xMin, xMax, yMin, yMax, xTickSpacing, yTickSpacing) {
		this.xMin = xMin;
		this.xMax = xMax;
		this.yMin = yMin;
		this.yMax = yMax;

		//set the drawing properties for the axis
		stroke(0);
		strokeWeight(1.5);
		fill(0);

		//we need some padding before the axis line for the ticks and labels
		//we can just set the padding for the xAxis -labled y as it relates to the
		//height of the diagram
		var yPadding = 15;
		//create a property for the height of the actual plot and it start y. not including
		//the padding
		this.plotHeight = this.height - yPadding;
		this.plotY = this.y;

		//the x padding is more tricky we don't know how wide the label is so
		//lets check each tick and find the widest
		var widestYTick = 0;
		for (var i = yMin; i <= yMax; i += yTickSpacing) {
			if (textWidth(i) > widestYTick) {
				widestYTick = textWidth(i);
			}
		}

		//set the x padding to be the widest label plus 5 for the tick
		var xPadding = widestYTick + 5;

		//create a width property and an x value for the plot without the padding
		this.plotWidth = this.width - xPadding;
		this.plotX = this.x + xPadding;

		//plot the x axis
		line(this.plotX, this.plotY + this.plotHeight, this.plotX + this.plotWidth,
			this.plotY + this.plotHeight);

		//plot the y axis
		line(this.plotX, this.plotY, this.plotX, this.plotY + this.plotHeight);


		//draw the x ticks
		//how far apart are the ticks on the screen
		this.scaledXTickSpacing = map(xTickSpacing, 0, xMax, 0, this.plotWidth);
		var xTickValue = xMin;
		//align the text so it is in the centre of each tick
		textAlign(CENTER, TOP);
		textSize(15);
		//iterate through the ticks, draw the line and a label
		for (let i = this.plotX; i <= (this.plotX + this.plotWidth + 1); i +=
			this.scaledXTickSpacing) {
			line(i, this.plotY + this.plotHeight, i, this.plotY + this.plotHeight +
				yPadding * 0.66);
			text(xTickValue, i, this.plotY + this.plotHeight + yPadding * 0.66);
			xTickValue += xTickSpacing;
		}

		//draw the y ticks
		this.scaledYTickSpacing = map(yTickSpacing, 0, yMax, 0, this.plotHeight);
		var yTickValue = yMax;
		textAlign(RIGHT, CENTER);
		textSize(15);
		for (let i = this.plotY; i < (this.plotY + this.plotHeight + 1); i +=
			this.scaledYTickSpacing) {
			line(this.plotX, i, this.plotX - 5, i);
			text(yTickValue, this.plotX - 5, i);
			yTickValue -= yTickSpacing;
		}
	};

	this.addBars = function(info, labels, colors){  // Добавление информации в диаграмму из массивов
		for (var i = 0; i<info.length; i++){
			this.addBar(10+i*10, info[i], 6, colors[i], labels[i]);
		}
	};
	
	this.addBar = function(xValue, yValue, width, colour, label){
		// проверка попадания значений в область диаграммы
		if (xValue >= this.xMin && xValue <= this.xMax && yValue >= this.yMin && yValue <= this.yMax) {
			// вычисление координат x и y для вывода информации
			var pointX = round(map(xValue, this.xMin, this.xMax, this.plotX, this.plotWidth + this.plotX));
			var pointY = round(map(yValue, this.yMin, this.yMax, this.plotHeight + this.plotY, this.plotY));
		//	var widthB = round(map(width / 2, this.xMin, this.xMax, this.plotX, this.plotWidth + this.plotX));
			
			fill(colour);
			rect(pointX - (width/2) * this.scaledXTickSpacing/10, // вывод на экран столбца
				 pointY, 
				 width*this.scaledXTickSpacing/10, 
				 this.plotHeight-pointY+this.scaledYTickSpacing/7+2);
			
			fill(0);
			textAlign(CENTER);
			textSize(15.5);
			text(label, pointX, this.plotHeight + 45); // названия столбцов
			//console.log(yValue);
			text(yValue, pointX, pointY - 10);  // числовые значения
		}
	};
}