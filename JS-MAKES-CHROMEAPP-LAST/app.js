const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const lineColor = document.getElementById("color");
const lineColorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.getElementById("mode-btn");
const removeBtn = document.getElementById("remove-btn");
const eraseBtn = document.getElementById("eraser-btn");
const addFile = document.getElementById("file");
const CANVAS_WIDTH = 800;
const CANVAS_HEGIHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

/*움직이는 마우스로 선 그리기*/
// ctx.lineWidth = 2;

// const colors = [
//   "#c0392b",
//   "#e67e22",
//   "#f1c40f",
//   "#27ae60",
//   "#2980b9",
//   "#2c3e50",
//   "#8e44ad",
// ];

// function onClick(event) {
//   ctx.beginPath();
//   ctx.moveTo(400, 400);
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick);

/* 마우스로 선 그리기 */

let isPainting = false; //Checking it is painting or not.
let isFilling = false; //Checking it is filling or not.

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function onMouseDown() {
  isPainting = true;
}

function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onLineColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  lineColor.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
  }
}

function onRemoveClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
}

function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
    fileInput.value = null;
  };
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
document.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
lineColor.addEventListener("change", onLineColorChange);

lineColorOptions.forEach((lineColor) =>
  lineColor.addEventListener("click", onColorClick)
);

modeBtn.addEventListener("click", onModeClick);
removeBtn.addEventListener("click", onRemoveClick);
eraseBtn.addEventListener("click", onEraseClick);
addFile.addEventListener("change", onFileChange);
