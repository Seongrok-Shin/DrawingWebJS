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
const addText = document.getElementById("text");
const saveBtn = document.getElementById("save-btn");
const fontSize = document.getElementById("font-size");

const CANVAS_WIDTH = 800;
const CANVAS_HEGIHT = 800;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.fontSize = fontSize.value;
ctx.lineCap = "round";
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
} //When the user move mouse, it is drawn the line where they want to draw on canvas.
function onMouseDown() {
  isPainting = true;
} //If mouse click, the state changes to do painting.

function onMouseUp() {
  isPainting = false;
  ctx.beginPath();
} //If mouse unclick, the state changes to do not painting.

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
} //If user want to change line width, the user can change the line width with the changable bar.

function onLineColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
} //To create options for the user can choose.

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  lineColor.value = colorValue;
} // If user click a color what the user want to use, the line color will be changed.

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🪣Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "✏️Draw";
  }
} //To change mode to fill or draw.

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
  }
}

function onRemoveClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
} // To remove all via fill white color.

function onEraseClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "🪣Fill";
} // To erase the line.

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEGIHT);
    addFile.value = null;
  };
} // To put chosen image.

function onDoubleClick(event) {
  const text = addText.value;
  if (text !== "") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = (ctx.fontSize | 0) + "px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
  }
} // To put written text on box

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
} // To save the image what the user drew.

function onFontSizeChange(event) {
  ctx.fontSize = event.target.value;
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

canvas.addEventListener("dblclick", onDoubleClick);

saveBtn.addEventListener("click", onSaveClick);
fontSize.addEventListener("change", onFontSizeChange);
