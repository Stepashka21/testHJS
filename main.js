const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 60;
canvas.height = 400;

let context = canvas.getContext("2d");
let start_background_color = "white";
context.fillStyle = start_background_color;
context.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let rangeValue = "2"; 
let is_drawing = false;


let restory_array = [];
let index = -1;

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo( event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  event.preventDefault();
}

function draw(event) {
  if( is_drawing ){
    context.lineTo( event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.strokeStyle = draw_color;
    context.lineWidth = rangeValue;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
  }
}

function stop(event) {
  if(is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  if (event.type != 'mouseout') { 
    restory_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }
  console.log(restory_array)
}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);  

  restory_array = [];
  index = -1;
}

function undo_last(){
  if (index <= 0) {
    clear_canvas()
  } else {
    index -= 1;
    restory_array.pop();
    context.putImageData(restory_array[index], 0, 0);
  }
}

function updateRangeValue(value) {
  rangeValue = value; 
  document.getElementById("textInput").value = rangeValue; // Установите значение текстового поля равным rangeValue
}

// Дополнительно, если изменять rangeValue в textInput то оно меняется
document.getElementById("textInput").addEventListener("input", function() {
  rangeValue = this.value; 
  document.getElementById("rangeInput").value = rangeValue; // Установите значение input type="range" равным rangeValue
});

function addText() {
  let laText = "Hey!";
  context.fillStyle = "red"
  context.font = "bold 24px sans-serif"
  context.fillText(laText, 100, 100);
}