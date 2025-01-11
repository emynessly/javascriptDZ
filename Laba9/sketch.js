let sound; // Переменная где будет находится аудио-дорожка
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
let speed = 1;
let range = 100;
let circlesAppear = false;
let lineAppear = false;

let songsList = ["Introduction To The Snow", "Isle Unto Thyself", "Black Rainbows", "White Ball", "Murders", "宇宙ステーションのレベル7", "The Mind Electric", "Labyrinth"];
let currentSongIndex = 0;

const updateSpeed = () => {
    speed = speedSlider.value;  // присвоение переменной speed значения из ползунка speedSlider
};

const updateRange = () => {
    range = rangeSlider.value;  // присвоение переменной range значения из ползунка rangeSlider
};

function preload()  // подготовка данных для работы
{
    img = loadImage('assets/Hawaii Part II.png', () =>{  // загрузка картинки
        console.log("Image is loaded!");  // при успешной загрузке картинки, в консоль выводится сообщение
        isLoadedV = true;
    });

    loadSong(currentSongIndex);  // загрузка файла по индексу
    
    noiseStep = 0.01;
	progress = 0;
}


function loadSong(index) {
    if (sound) { // если песня играет,
        sound.stop();  // то остановить ее
    }
    sound = loadSound(`assets/${songsList[index]}`+'.mp3', () => {
        console.log("sound is loaded!"); // Загружаем музыку и при успешной загрузке выводим в консоль сообщение, что музыка загрузилась
        isLoaded = true;
        sound.setVolume(0.07); // Устанавливаем громкость на 7%
    });
}


function setup()
{
    createCanvas(1094, 1094);
    textAlign(CENTER);  // Центрируем следующий текст по центру
    textSize(32);
    textFont('Helvetica');
    // задаем начальные значения координат для отрисовки волны
    startX = 0;
    startY = height/2+90;
    spectrumWidth = width;
    
    amplitude = new p5.Amplitude();
    fft = new p5.FFT();

    for (let i = 0; i < cols; i++) {  // устанавливаем цвет для каждой колонки
        let redValue = map(i, 0, cols, 255, 0); // генерация оттенка 
        // console.log(redValue);
        barColors[i] = color(redValue, 255, 0); // устанавливаем цвет
    }

    const playButton = document.getElementById("playButton");  // привязываем переменную playButton к кнопке playButton из html-файла по id
    playButton.addEventListener("click", () => {
    if (isLoaded){
        if (sound.isPlaying()){  // если песня играет,
            sound.pause();       // то песня останавливается
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';  // и иконка кнопки playButton меняется на Play
        } else {           // в ином случае
            sound.play();  // песня начинает воспроизводиться,
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';  // а иконка кнопки playButton меняется на Pause
        }
    }
    })

    const nextButton = document.getElementById("nextButton");  // привязываем переменную nextButton к кнопке nextButton из html-файла по id
    nextButton.addEventListener("click", () => {
        currentSongIndex++;  // значение увеличивается на единицу
        if (currentSongIndex >= songsList.length) currentSongIndex = 0;  // проверка, если значение currentSongIndex превышает или равно длине списка песен
        //console.log(currentSongIndex, songsList.length);
        loadSong(currentSongIndex);  // загрузка песни с текущим номером
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';  // иконка кнопки playButton меняется на Play
    })

    const prevButton = document.getElementById("prevButton");  // привязываем переменную prevButton к кнопке prevButton из html-файла по id
    prevButton.addEventListener("click", () => {
        currentSongIndex--;  // значение уменьшается на единицу
        if (currentSongIndex < 0) currentSongIndex = 7;  // проверка, если значение currentSongIndex меньше нуля
        //console.log(currentSongIndex, songsList.length);
        loadSong(currentSongIndex);  // загрузка песни с текущим номером
        playButton.innerHTML = '<i class="fa-solid fa-play"></i>';  // иконка кнопки playButton меняется на Play
    })

    const circlesButton = document.getElementById("circlesButton");  // привязываем переменную circlesButton к кнопке circlesButton из html-файла по id
    circlesButton.addEventListener("click", () => {
        if (!circlesAppear){  // если у переменной значение false
            circlesAppear = true;  // переменной присваивается значение true (включается вывод кругов)
            circlesButton.innerHTML = '<i class="fa-solid fa-circle"></i>';  // иконка изменяется на закрашенный круг
        } else {  // в ином случае
            circlesAppear = false;  // переменной присваивается значение false (выключается вывод кругов)
            circlesButton.innerHTML = '<i class="fa-regular fa-circle"></i>';  // иконка изменяется на пустой круг
        }   
    })

    const lineButton = document.getElementById("lineButton");  // привязываем переменную lineButton к кнопке lineButton из html-файла по id
    lineButton.addEventListener("click", () => {
        if (!lineAppear){  // если у переменной значение false
            lineAppear = true;  // переменной присваивается значение true (включается вывод штриха)
            lineButton.innerHTML = '<i class="fa-solid fa-slash"></i>';  // иконка изменяется на диагональную линию
        } else {  // в ином случае
            lineAppear = false;  // переменной присваивается значение false (выключается вывод штриха)
            lineButton.innerHTML = '<i class="fa-solid fa-window-minimize"></i>';  // иконка изменяется на горизонтальную линию
        }   
    })

    durationSlider = createSlider(0, 1, 0, 0.01); // создание ползунка отвечающего за перемотку
    durationSlider.position(338, 660);
    durationSlider.size(427);
    durationSlider.input(updateDuration); // значение, полученное из функции updateDuration присваивается durationSlider
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

function rotatingCircles(energy)  // функция создания крутящися кругов, отвечающих за низкие ноты
{
	if (energy > 100)  // поворот кружков
		rot += 0.01;

	let tmp = map(energy, 0, 255, 20, 100);

	push();
	rectMode(CENTER);
	translate(width/4, height/4);
	rotate(rot);
	fill('#2d2d2d');
    strokeWeight(5);
    stroke('#dddddd');

	let incr = width / 9;

	for(let i = 0; i < 4; i++)  // отрисовка кружков
		ellipse(i * incr - width/6, 0, tmp, tmp);
	pop();
}

function updateDuration() {  // функция, меняющая прогресс ползунка durationSlider по клику, если песня звучит
    if (sound.isPlaying()) {
        sound.jump(durationSlider.value() * sound.duration());
    }
}

function draw()
{
    image(img, 0, 0); // вывод картинки
    speedSlider.addEventListener('input', updateSpeed);  // присвоение ползунку speedSlider значения из функции updateSpeed
    rangeSlider.addEventListener('input', updateRange);  // присвоение ползунку rangeSlider значения из функции updateRange

    durationSlider.value(sound.currentTime() / sound.duration());  // обновление ползунка durationSlider в зависимости от значения пройденного времени песни
    
    sound.rate(speed);  // изменение скорости воспроизведения в зависимости от значения speed
    
    if (!sound.isPlaying()){  // если песня не проигрывается
        if (durationSlider.value() == 1){  // если значение ползунка достигло 1
            loadSong(currentSongIndex);  // загрузить текущую песню повторно
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';  // сменить иконку кнопки на Play
        }
    }
    else 
    {
        fill('#FFFFFF');
        textFont('Courier New');
        text(songsList[currentSongIndex], width/2, height/2-37);  // вывод названия песни на экран
       
        fft.analyze();
        let bass = fft.getEnergy("bass");  // присвоение переменной bass значения
	    let treble = fft.getEnergy("treble");  // присвоение переменной treble значения

        if (circlesAppear)
            rotatingCircles(bass);  // вывод кругов по кнопке
        if (lineAppear)
            noiseLine(treble, range);  // вывод штриха по кнопке

        let freqs = fft.analyze();
        let d = freqs.length;
      
        // создание колонок
        let barWidth = width / cols + 7.85; // изменение ширины колонки

        for (let i = 0; i < cols; i++) { // организация прохода по колонкам
            let avg = 0;
            let count = 0;

            for (let j = i * Math.floor(d / cols); j < (i + 1) * Math.floor(d / cols); j++) { // проход по массиву значений freqs
                if (j < freqs.length) {
                    avg += freqs[j];
                    count++;
                }
            }

            if (count > 0) {  // отрисовка колонок
                avg = avg / count; // вычисление среднего значения
                let h = map(avg, 0, 255, 0, height/2); // установка высоты колонки
                let currentColor = barColors[i]; // установка цвета колонки

                fill(currentColor); // закрашивание колонки
                rect(i * barWidth, height - h, barWidth - 6, h); // вывод колонки
            }
        } // конец создания колонок

        // создание круга (луны)
        fill(currentMoon);  // заполнение круга текущим цветом
        let level = amplitude.getLevel();
        amplitudes.push(level);  // добавляет элемент в конец массива
        amplitudes.shift();  // удаляет первое значение из массива
        let size = map(level, 0, 0.20, 100, 200);
        ellipse(729, 210, size+40, size+40);  // отрисовка самого круга

        // создания волны по центру
        stroke('#dddddd');
        strokeWeight(2);
        if(frameCount % 2 == 0) // частота обновления волны
            addWave();
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

function mousePressed() {  // изменение цвета луны по лкм
    let level = amplitude.getLevel();
    let size = map(level, 0, 0.20, 100, 200);
    console.log(amplitude);

    if (mouseButton === LEFT && 
        (mouseX >= (729 - (size/2)) && mouseX <= (729 + (size/2))) && 
        (mouseY >= (210 - (size/2)) && mouseY <= (210 + (size/2)))) {
        currentMoon=color(random(255), random(255), random(255));  // меняет цвет луны на рандомный
    } else if (mouseButton === RIGHT && 
        (mouseX >= (729 - (size/2)) && mouseX <= (729 + (size/2))) && 
        (mouseY >= (210 - (size/2)) && mouseY <= (210 + (size/2)))) {
        currentMoon=color(255, 255, 255);  // возвращает луне первоначальный цвет (белый)
    }
}

function addWave(){  // создание волны посередине
    let tmp = fft.waveform();
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

}