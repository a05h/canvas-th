//init

var canvas = document.getElementById('canvas');

var buttonClear = document.getElementById('button-clear');
buttonClear.addEventListener('click', clearCanvas, false);

var paletteWhite = document.getElementById('palette-white');
paletteWhite.addEventListener('click', setColorWhite, false);
var paletteRed = document.getElementById('palette-red');
paletteRed.addEventListener('click', setColorRed, false);
var paletteBlue = document.getElementById('palette-blue');
paletteBlue.addEventListener('click', setColorBlue, false);
var paletteGreen = document.getElementById('palette-green');
paletteGreen.addEventListener('click', setColorGreen, false);

var primaryColor = document.getElementById('primary-color');
primaryColor.addEventListener('click', setPrimaryColor, false);
var secondaryColor = document.getElementById('secondary-color');
secondaryColor.addEventListener('click', setSecondaryColor, false);

var instrumentBrush = document.getElementById('instrument-brush');
instrumentBrush.addEventListener('click', pickInstrumentBrush, false);
var instrumentEraser = document.getElementById('instrument-eraser');
instrumentEraser.addEventListener('click', pickInstrumentEraser, false);
var instrumentColorpicker = document.getElementById('instrument-colorpicker');
instrumentColorpicker.addEventListener('click', pickInstrumentColorpicker, false);

var brushWidthContainer = document.getElementById('brush-width-container');
brushWidthContainer.addEventListener('click', setBrushSize, false);
var brushWidthElement = document.getElementById('brush-width-element');

var brushValue = document.getElementById('brush-value');

var eraserWidthContainer = document.getElementById('eraser-width-container');
eraserWidthContainer.addEventListener('click', setEraserSize, false);
var eraserWidthElement = document.getElementById('eraser-width-element');

var brush = canvas.getContext('2d');
var eraser = canvas.getContext('2d');

var canvasContainer = document.getElementById('canvas-container');
var paintStyle = getComputedStyle(canvasContainer);
canvas.width = parseInt(paintStyle.getPropertyValue('width'));
canvas.height = parseInt(paintStyle.getPropertyValue('height'));

const colorWhite = '#F6F6F6';
const colorRed = '#E61932';
const colorBlue = '#565BCF';
const colorGreen = '#6BB438';

//draw events

var mouse = {x: 0, y: 0};
var onPaint = function() {
    brush.lineTo(mouse.x, mouse.y);
    brush.stroke();
};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener('mousedown', function(e) {
    brush.beginPath();
    brush.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

function drawResetArea() {
  canvas.removeEventListener('mousemove', onPaint, false);
};

//basic values

brush.lineWidth = 10;
brush.lineJoin = 'round';
brush.lineCap = 'round';
brush.strokeStyle = '#1A1919';
instrumentBrush.style.backgroundColor = '#6868AC';

//clear

function clearCanvas() {
  brush.clearRect(0, 0, canvas.width, canvas.height);
};

//brush size

function setBrushSize(clickArea) {
  //draw control element
  var width = window.getComputedStyle(brushWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  brushWidthElement.style.width = ((clickArea.pageX - brushWidthContainer.offsetLeft) / width) * 100 + "%";
  //set brush value
  if (clickArea.pageX >= 742) {
    var thisClick = (clickArea.pageX - 742) / 5;
  } else if (clickArea.pageX >= 83 && clickArea.pageX < 741) {
    var thisClick = (clickArea.pageX - 83) / 5;
  } else {
    var thisClick = (clickArea.pageX - 22) / 5;
  };
  brush.lineWidth = thisClick;
  brushValue.innerHTML = parseFloat(thisClick).toFixed(1);
};

function setEraserSize(clickArea) {
  //draw control element
  var width = window.getComputedStyle(eraserWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  eraserWidthElement.style.width = ((clickArea.pageX - eraserWidthContainer.offsetLeft) / width) * 100 + "%";
};

//palette

function defaultPaletteChoice() {
  paletteWhite.style.border = 'none';
  paletteWhite.style.width = '20px';
  paletteWhite.style.height = '20px';

  paletteRed.style.border = 'none';
  paletteRed.style.width = '20px';
  paletteRed.style.height = '20px';

  paletteBlue.style.border = 'none';
  paletteBlue.style.width = '20px';
  paletteBlue.style.height = '20px';

  paletteGreen.style.border = 'none';
  paletteGreen.style.width = '20px';
  paletteGreen.style.height = '20px';
};

function setColorWhite() {
  brush.strokeStyle = colorWhite;
  defaultPaletteChoice();
  paletteWhite.style.border = '2px #CFB5B5 solid';
  paletteWhite.style.width = '16px';
  paletteWhite.style.height = '16px';
  primaryColor.style.backgroundColor = colorWhite;
};

function setColorRed() {
  brush.strokeStyle = colorRed;
  defaultPaletteChoice();
  paletteRed.style.border = '2px #CFB5B5 solid';
  paletteRed.style.width = '16px';
  paletteRed.style.height = '16px';
  primaryColor.style.backgroundColor = colorRed;
};

function setColorBlue() {
  brush.strokeStyle = colorBlue;
  defaultPaletteChoice();
  paletteBlue.style.border = '2px #CFB5B5 solid';
  paletteBlue.style.width = '16px';
  paletteBlue.style.height = '16px';
  primaryColor.style.backgroundColor = colorBlue;
};

function setColorGreen() {
  brush.strokeStyle = colorGreen;
  defaultPaletteChoice();
  paletteGreen.style.border = '2px #CFB5B5 solid';
  paletteGreen.style.width = '16px';
  paletteGreen.style.height = '16px';
  primaryColor.style.backgroundColor = colorGreen;
};

//colorpicker

function setPrimaryColor() {

};

function setSecondaryColor() {

};

//instruments

function defaultInstrumentChoice() {
  instrumentBrush.style.backgroundColor = '#CFB5B5';
  instrumentEraser.style.backgroundColor = '#CFB5B5';
  instrumentColorpicker.style.backgroundColor = '#CFB5B5';
};

function pickInstrumentBrush() {
  defaultInstrumentChoice();
  instrumentBrush.style.backgroundColor = '#6868AC';
};

function pickInstrumentEraser() {
  defaultInstrumentChoice();
  instrumentEraser.style.backgroundColor = '#6868AC';
};

function pickInstrumentColorpicker() {
  defaultInstrumentChoice();
  instrumentColorpicker.style.backgroundColor = '#6868AC';
};
