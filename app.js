// document.querySelector("input").value;
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

// canvas pixel manipulation 안주면 동작을 안험, css세팅한 값으로 줌.
canvas.width = 500;
canvas.height= 600;

ctx.strokeStyle = "#222";
ctx.lineWidth = "2.5";

//color control
const colors = document.getElementsByClassName("controls__color");
//colors = Array.from(colors);
colors.forEach(color => color.addEventListener("click", changeColor));

function changeColor(event) {
    console.log(event);
}

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    // 전체 윈도우의 좌표 clientX, clientY
    // 캔버스 안에서의 가로세로 값은 offsetX, Y
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
        // ctx.closePath(); //path를 끝내버림선이 끊겨, 시작점은 오로지 비긴패스 위치,
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}
