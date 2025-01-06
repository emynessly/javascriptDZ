let sound; // Переменная где будет находится аудио-дорожка
let isInitialised; // Состояние, которое обозначает инициализированы ли значения или нет
let isLoaded = false;
let amplitude;
let amplitudes = [];

let barColors = []; // Массив цветов столбцов
let cols = 50; /* количество столбцов индикатора */
 
let fft;

let currentMoon = '#FFFFFF'; // объявление переменной луны в которой находится ее текущий цвет


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
    sound.setVolume(0.07); // Устанавливаем громкость на 10%
}


function setup()
{
    createCanvas(1094, 1094);
    textAlign(CENTER); // Центрируем следующий текст по центру
    textSize(32);
    
    amplitude = new p5.Amplitude();

    for (let i = 0; i < cols; i++) {  // устанавливаем цвет для каждой колонки
        let redValue = map(i, 0, cols, 255, 0); // генерация оттенка 
        // console.log(redValue);
        barColors[i] = color(redValue, 255, 0); // устанавливаем цвет
    }
    
    for (let i = 0; i < 512; i++)
        amplitudes.push(0);
     
    fft = new p5.FFT();
}

function draw()
{
    if (!sound.isPlaying()){
        image(img, 0, 0);
        fill('#FFFFFF');
        text("Press space", width/2, height/2-37);

    }
    else 
    {
        image(img, 0, 0); // перерисовка изображения
        /* Индикатор */
        let freqs = fft.analyze();
        let d = freqs.length;
      
        let barWidth = width / cols + 7.85;

        for (let i = 0; i < cols; i++) { /* формирует номер колонки */
            let avg = 0;
            let count = 0;

            for (let j = i * Math.floor(d / cols); j < (i + 1) * Math.floor(d / cols); j++) { /* проход по массиву значений freqs */
                if (j < freqs.length) {
                    avg += freqs[j];
                    count++;
                }
            }

            if (count > 0) {
                avg = avg / count;
                let h = map(avg, 0, 255, 0, height);
                let currentColor = barColors[i];

                fill(currentColor);
                rect(i * barWidth, height - h, barWidth - 6, h);
            }
        }
        
        
        /* белый круг */
        fill(currentMoon);
        let level = amplitude.getLevel();
        amplitudes.push(level);
        amplitudes.shift();
        let size = map(level, 0, 0.20, 100, 200);
        ellipse(729, 210, size+40, size+40); 
        
        noFill();
        stroke("#FFFFFF");
        beginShape();
        for(let i = 0; i < amplitudes.length; i++)
        {
            let h = map(amplitudes[i], 0, 0.20, 0, 100);
            vertex(i * 2.15, height/2.3 - h * 5);
        }
        endShape();
    }
}

function keyPressed()
{
    if (!isInitialised)
    {
        isInitialised = true;
        if (isLoaded)
            sound.loop(0); // loop - функция для зацикливания. 0 -  откуда начинается зацикливание по времени
    }
    else
    {
        if (key == ' ') // включение/выключение музыки по пробелу
        {
            if (sound.isPaused())
                sound.play();
            else
                sound.pause();
        }
    }
}

function mousePressed() {  // изменение цвета луны по лкм
        let level = amplitude.getLevel();
        let size = map(level, 0, 0.20, 100, 200);
        console.log(size);
        if (mouseButton === LEFT && 
            (mouseX >= (729 - (size/2)) && mouseX <= (729 + (size/2))) && 
            (mouseY >= (210 - (size/2)) && mouseY <= (210 + (size/2)))) {
            currentMoon=color(random(255), random(255), random(255));  // меняем цвет луны
        }
}