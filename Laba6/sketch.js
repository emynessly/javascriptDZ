let sound; // Переменная где будет находится аудио-дорожка
let isInitialised; // Состояние, которое обозначает инициализированы ли значения или нет
let isLoaded = false;
let amplitude;
let amplitudes = [];

let barColors = []; // Массив цветов столбцов
let cols = 50; /* количество столбцов индикатора */
 
let fft;
let rot = 0;

let currentMoon = '#FFFFFF'; // объявление переменной луны в которой находится ее текущий цвет

let output = [];
let startX;
let startY;
let spectrumWidth;

let speedSlider;
let rangeSlider;


function preload()  // подготовка данных для работы
{
    img = loadImage('assets/Labyrinth.png', () =>{  // загрузка картинки
        console.log("Image is loaded!");
        isLoadedV = true;
    });
    soundFormats('mp3', 'wav'); // Определяем аудио форматы, поддерживаемые плеером
    sound = loadSound('assets/Miracle_Musical_Labyrinth.mp3', () =>{  // загрузка музыки
        console.log("sound is loaded!"); // Загружаем музыку и при успешной загрузке выводим в консоль сообщение, что музыка загрузилась
        isLoaded = true;
    });
    isInitialised = false; // музыка не играет
    sound.setVolume(0.07); // Устанавливаем громкость на 7%
    
    noiseStep = 0.01;
	progress = 0;
}


function setup()
{
    createCanvas(1094, 1094);
    textAlign(CENTER); // Центрируем следующий текст по центру
    textSize(32);
    
    startX = 0;
    startY = height/2+90;
    spectrumWidth = width;
    
    amplitude = new p5.Amplitude();

    for (let i = 0; i < cols; i++) {  // устанавливаем цвет для каждой колонки
        let redValue = map(i, 0, cols, 255, 0); // генерация оттенка 
        // console.log(redValue);
        barColors[i] = color(redValue, 255, 0); // устанавливаем цвет
    }

    fft = new p5.FFT();
    
    speedSlider = createSlider(0.1, 2, 1, 0.1);  // ползунок изменяющий скорость
    speedSlider.position(width - 150, 40);
    rangeSlider = createSlider(30, 400, 100, 10);  // ползунок изменяющий диапазон отрисовки штриха
    rangeSlider.position(width - 150, 70);
}

function noiseLine(energy, range){  // функция создания штриха, отвечающего за высокие ноты
    push();
	translate(width/2 + 273.5, height/2 + 273.5);
	noFill();
	stroke('#dddddd');
	strokeWeight(4);
	beginShape();
	for(let i = 0; i < 100; i++) // отрисовка штриха
	{
		let x = map(noise(i * noiseStep + progress), 0, 1, -range, range);
		let y = map(noise(i * noiseStep + progress + 200), 0, 1, -range, range);

		vertex(x, y);
	}
	endShape();

	if (energy > 5)
		progress += 0.05;
	pop();
}

function rotatingBlocks(energy)  // функция создания крутящися квадратов, отвечающих за низкие ноты
{
	if (energy > 100)  // поворот квадратов
		rot += 0.01;

	let tmp = map(energy, 0, 255, 20, 100);

	push();
	rectMode(CENTER);
	translate(width/2, height/2);
	rotate(rot);
	fill('#dddddd');

	let incr = width / 9;

	for(let i = 0; i < 4; i++)  // отрисовка квадратов
		rect(i * incr - width/6, 0, tmp, tmp);

	pop();
}

function draw()
{
    let speed = speedSlider.value();
    let range = rangeSlider.value();
    
    sound.rate(speed);
    
    if (!sound.isPlaying()){
        image(img, 0, 0); // вывод картинки
        fill('#FFFFFF');
        text("Press space", width/2, height/2-37);
    }
    else 
    {
        image(img, 0, 0); // перерисовка изображения
        
        fft.analyze();
        let bass = fft.getEnergy("bass");
	    let treble = fft.getEnergy("treble");
        rotatingBlocks(bass);
        noiseLine(treble, range);

        stroke('#dddddd');
        strokeWeight(2);
        if(frameCount % 2 == 0) // частота обновления волны
            addWave();
//           console.log(output);
        for (let i = 0; i < output.length; i++) // отрисовка новой волны
        {
            let tmp = output;
            noFill();
            beginShape();

            for(let j = 0; j < tmp.length; j++)
            {
                vertex(tmp[j].x, tmp[j].y);
            }
            endShape();
        }
        noStroke();
        
    }
}

function keyPressed()
{
    if (!isInitialised)
    {
        isInitialised = true;
        if (isLoaded)
            sound.loop(0); // loop - функция для зацикливания. 0 -  откуда начинается зацикливание по времени
    } else {
        if (key == ' ') // включение/выключение музыки по пробелу
        {
            if (sound.isPaused())
                sound.play();
            else
                sound.pause();
        }
    }
}

function addWave(){
    let tmp = fft.waveform();
//     console.log(tmp);
    let small_scale = 70, bigScale = 160; // сила колебания волны
    let wape_output = [];
    let x, y;
    // проход по массиву tmp
    for(let i = 0; i < tmp.length; i++)
    {
        if (i % 20 == 0)  // обработка каждого 20 значения массива
        {
            x = map(i, 0, 1024, startX, startX + spectrumWidth);
            y = map(tmp[i], -1, 1, -bigScale, bigScale);
            if(i < 1024 * 1/4 || i > 1024 * 3/4)
                y = map(tmp[i], -1, 1, -small_scale, small_scale);  // слабое колебание
            else
                y = map(tmp[i], -1, 1, -bigScale, bigScale);  // сильное колебание
            wape_output.push({x: x, y: startY + y});  // добавление координат в массив
        }
    }
    output=wape_output;
//    console.log(wape_output);
}