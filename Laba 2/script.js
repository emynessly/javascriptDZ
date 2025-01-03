const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const colorBox = document.getElementById('colorBox');

const updateBackgroundColor = () => {
       colorBox.style.backgroundColor = 'rgb(' + redSlider.value + ',' + greenSlider.value + ',' + blueSlider.value + ')';
};

redSlider.addEventListener('input', updateBackgroundColor);
greenSlider.addEventListener('input', updateBackgroundColor);
blueSlider.addEventListener('input', updateBackgroundColor);

const buttonReset = document.getElementById('button1');
const buttonRandom = document.getElementById('button2');

buttonReset.addEventListener("click", function(){
      colorBox.style.backgroundColor = '#FFFFFF';
      redSlider.value = 255;
      greenSlider.value = 255;
      blueSlider.value = 255;
});

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

buttonRandom.addEventListener("click", function(){
      let red = getRandomInt(0, 255);
      let green = getRandomInt(0, 255);
      let blue = getRandomInt(0, 255);
      colorBox.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
      redSlider.value = red;
      greenSlider.value = green;
      blueSlider.value = blue;

});