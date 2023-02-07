const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

/* 사람 그리기 */
// ctx.fillRect(215, 200, 15, 100);
// ctx.fillRect(215, 200, 100, 15);
// ctx.fillRect(350, 200, 15, 100);
// ctx.fillRect(260, 200, 60, 200);
// ctx.fillRect(260, 200, 100, 15);

// ctx.arc(290, 150, 50, 0, 2 * Math.PI);
// ctx.fill();
// ctx.beginPath();

// ctx.arc(270, 140, 5, Math.PI, 2 * Math.PI);
// ctx.arc(310, 140, 5, Math.PI, 2 * Math.PI);
// ctx.fillStyle = "white";
// ctx.fill();

// ctx.beginPath();
// ctx.arc(290, 170, 5, 0, Math.PI);
// ctx.fillStyle = "white";
// ctx.fill();

/* 마우스 클릭으로 그림 그리기 */
// ctx.lineWidth = 2;

// function onClick(event) {
//   ctx.moveTo(0, 0);
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("click", onClick);
