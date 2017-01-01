// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

//init

var canvas = document.getElementById('canvas');

var primaryRgbaValue = document.getElementById('primary-rgba-value');
var secondaryRgbaValue = document.getElementById('secondary-rgba-value');

var showCoordinateX = document.getElementById('main-coordinate-x-value');
var showCoordinateY = document.getElementById('main-coordinate-y-value');

var primaryColorpickerBox = document.getElementById('primary-colorpicker-box');

var primaryColor = document.getElementById('primary-color');
primaryColor.addEventListener('click', function() {
  if (primaryColorpickerBox.style.display === 'none') {
    primaryColorpickerBox.style.display = 'block';
    if (secondaryColorpickerBox.style.display = 'block') {
      secondaryColorpickerBox.style.display = 'none';
    }
  } else {
    primaryColorpickerBox.style.display = 'none';
  }
}, false);

var secondaryColorpickerBox = document.getElementById('secondary-colorpicker-box');
var secondaryColor = document.getElementById('secondary-color');
secondaryColor.addEventListener('click', function() {
  if (secondaryColorpickerBox.style.display === 'none') {
    secondaryColorpickerBox.style.display = 'block';
    if (primaryColorpickerBox.style.display = 'block') {
      primaryColorpickerBox.style.display = 'none';
    }
  } else {
    secondaryColorpickerBox.style.display = 'none';
  }
}, false);

var instrumentBrush = document.getElementById('instrument-brush');
instrumentBrush.addEventListener('click', pickInstrumentBrush, false);
var instrumentEraser = document.getElementById('instrument-eraser');
instrumentEraser.addEventListener('click', pickInstrumentEraser, false);
var instrumentColorpicker = document.getElementById('instrument-colorpicker');
instrumentColorpicker.addEventListener('click', pickInstrumentColorpicker, false);

var brushValue = document.getElementById('brush-value');
var eraserValue = document.getElementById('eraser-value');

var brushWidthContainer = document.getElementById('brush-width-container');
brushWidthContainer.addEventListener('click', setBrushSize, false);
var brushWidthElement = document.getElementById('brush-width-element');

var eraserWidthContainer = document.getElementById('eraser-width-container');
eraserWidthContainer.addEventListener('click', setEraserSize, false);
var eraserWidthElement = document.getElementById('eraser-width-element');

var transparentValue = document.getElementById('transparent-value');
var aliasingValue = document.getElementById('aliasing-value');

var transparentWidthContainer = document.getElementById('transparent-width-container');
transparentWidthContainer.addEventListener('click', setTransparentPercent, false);
var transparentWidthElement = document.getElementById('transparent-width-element');

var aliasingWidthContainer = document.getElementById('aliasing-width-container');
aliasingWidthContainer.addEventListener('click', setAliasingPercent, false);
var aliasingWidthElement = document.getElementById('aliasing-width-element');

var context = canvas.getContext('2d');

var canvasContainer = document.getElementById('canvas-container');
var paintStyle = getComputedStyle(canvasContainer);
canvas.width = parseInt(paintStyle.getPropertyValue('width'));
canvas.height = parseInt(paintStyle.getPropertyValue('height'));

const colorWhite = '#F6F6F6';
const colorRed = '#E61932';
const colorBlue = '#565BCF';
const colorGreen = '#6BB438';

//basic and current values

context.rect(0, 0, canvas.width, canvas.height);
context.fillStyle = "#FFFFFF";
context.fill();

var isInstrument = "brush";
var currentPrimaryColor = 'rgba(26,24,24,1)';
var currentSecondaryColor = '#FFFFFF';
var currentBrushWidth = 10;
var currentEraserWidth = 10;
var currentBrushType = 'round';

context.lineWidth = 10;
context.lineJoin = 'round'; //round || bevel || miter
context.lineCap = 'round'; //round || square || butt
context.strokeStyle = '#1A1919';

instrumentBrush.style.backgroundColor = '#6868AC';
primaryColor.style.backgroundColor = currentPrimaryColor;
secondaryColor.style.backgroundColor = currentSecondaryColor;

function rgbaCheck() {
  primaryRgbaValue.innerHTML = hexToRgba(currentPrimaryColor,1).replace("rgb", "").replace("rgba", "");
  secondaryRgbaValue.innerHTML = hexToRgba(currentSecondaryColor,1).replace("rgb", "").replace("rgba", "");
};

//draw events

var mouse = {x: 0, y: 0};
var onPaint = function() {
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
};

canvas.addEventListener('mousemove', function(event) {
  //isn't works in firefox without 'event' as function parameter
  mouse.x = event.pageX - this.offsetLeft;
  mouse.y = event.pageY - this.offsetTop;
  var coordX = event.pageX - this.offsetLeft;
  var coordY = event.pageY - this.offsetTop;
  showCoordinateX.innerHTML = coordX;
  showCoordinateY.innerHTML = coordY;
}, false);

canvas.addEventListener('mousedown', function(event) {
  if (primaryColorpickerBox.style.display === 'block' || secondaryColorpickerBox.style.display === 'block') {
    hideColorpickerBoxes();
  }
  switch (isInstrument) {
    case "eraser":
      context.strokeStyle = currentSecondaryColor;
      context.lineWidth = currentEraserWidth;
      context.lineCap = 'round';
      break;
    case "colorpicker":
      mouse.x = event.pageX - this.offsetLeft;
      mouse.y = event.pageY - this.offsetTop;
      var pixel = context.getImageData(mouse.x, mouse.y, 1, 1);
      var data = pixel.data;
      var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')';
      context.strokeStyle = "rgba(0, 0, 0, 0)"
      currentPrimaryColor = rgba;
      primaryColor.style.backgroundColor = currentPrimaryColor;
      break;
    case "brush":
    default:
      context.strokeStyle = currentPrimaryColor;
      context.lineWidth = currentBrushWidth;
      context.lineCap = currentBrushType;
      break;
  };
  context.beginPath();
  context.moveTo(mouse.x, mouse.y);
  canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
}, false);

function drawResetArea() {
  canvas.removeEventListener('mousemove', onPaint, false);
};

//clear

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#FFFFFF";
  context.fill();
};

//save canvas as png

function saveAsPng() {
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href = image;
};

//brush size

function setBrushSize(clickArea) {
  //draw control element
  var width = window.getComputedStyle(brushWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  var brushWidthValue = brushWidthElement.style.width = ((clickArea.pageX - brushWidthContainer.offsetLeft) / width) * 100 + "%";
  currentBrushWidth = parseInt(brushWidthValue) / 5;
  brushValue.innerHTML = parseFloat(currentBrushWidth).toFixed(1);
};

//eraser size

function setEraserSize(clickArea) {
  //draw control element
  var width = window.getComputedStyle(eraserWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  var eraserWidthValue = eraserWidthElement.style.width = ((clickArea.pageX - eraserWidthContainer.offsetLeft) / width) * 100 + "%";
  currentEraserWidth = parseInt(eraserWidthValue) / 2;
  eraserValue.innerHTML = parseFloat(currentEraserWidth).toFixed(1);
};

//transparent value

function setTransparentPercent(clickArea) {
  //draw control element
  var width = window.getComputedStyle(transparentWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  var transparentWidthValue = transparentWidthElement.style.width = ((clickArea.pageX - transparentWidthContainer.offsetLeft) / width) * 100 + "%";
};

//aliasing value

function setAliasingPercent(clickArea) {
  //draw control element
  var width = window.getComputedStyle(aliasingWidthContainer).getPropertyValue('width'); //100px
  width = parseFloat(width.substr(null)); //100
  var aliasingWidthValue = aliasingWidthElement.style.width = ((clickArea.pageX - aliasingWidthContainer.offsetLeft) / width) * 100 + "%";
};

//palette

function setColorWhite() {
  context.strokeStyle = colorWhite;
  currentPrimaryColor = colorWhite;
  defaultPaletteChoice();
  paletteWhite.style.border = '2px #CFB5B5 solid';
  paletteWhite.style.width = '16px';
  paletteWhite.style.height = '16px';
  primaryColor.style.backgroundColor = colorWhite;
  rgbaCheck();
  hideColorpickerBoxes();
};

function setColorRed() {
  context.strokeStyle = colorRed;
  currentPrimaryColor = colorRed;
  defaultPaletteChoice();
  paletteRed.style.border = '2px #CFB5B5 solid';
  paletteRed.style.width = '16px';
  paletteRed.style.height = '16px';
  primaryColor.style.backgroundColor = colorRed;
  rgbaCheck();
  hideColorpickerBoxes();
};

function setColorBlue() {
  context.strokeStyle = colorBlue;
  currentPrimaryColor = colorBlue;
  defaultPaletteChoice();
  paletteBlue.style.border = '2px #CFB5B5 solid';
  paletteBlue.style.width = '16px';
  paletteBlue.style.height = '16px';
  primaryColor.style.backgroundColor = colorBlue;
  rgbaCheck();
  hideColorpickerBoxes();
};

function setColorGreen() {
  context.strokeStyle = colorGreen;
  currentPrimaryColor = colorGreen;
  defaultPaletteChoice();
  paletteGreen.style.border = '2px #CFB5B5 solid';
  paletteGreen.style.width = '16px';
  paletteGreen.style.height = '16px';
  primaryColor.style.backgroundColor = colorGreen;
  rgbaCheck();
  hideColorpickerBoxes();
};

//instruments

function pickInstrumentBrush() {
  defaultInstrumentChoice();
  isInstrument = "brush";
  instrumentBrush.style.backgroundColor = '#6868AC';
};

function pickInstrumentEraser() {
  defaultInstrumentChoice();
  isInstrument = "eraser";
  instrumentEraser.style.backgroundColor = '#6868AC';
};

function pickInstrumentColorpicker() {
  defaultInstrumentChoice();
  isInstrument = "colorpicker";
  instrumentColorpicker.style.backgroundColor = '#6868AC';
};
