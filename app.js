const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;
let painting = false;
let filling = false;

// canvas pixel manipulation 안주면 동작을 안험, css에 세팅한 값으로 줌.
canvas.width = CANVAS_WIDTH;
canvas.height= CANVAS_HEIGHT;

const INITIAL_COLOR ="#222";
ctx.fillStyle = "#fff";  // 배경
ctx.strokeStyle = INITIAL_COLOR; // 라인
ctx.lineWidth   = "2.5";
ctx.fillRect(0,0, canvas.width, canvas.height);

function handleColorClick(event) {
    let color =  event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(filling === true) {
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(0,0, canvas.width, canvas.height);
    } else {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveImg(event) {
    event.preventDefault();
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "myDrawing.png";
    link.click();
}

function handleClearCanvas() {
    console.log('clear');
    ctx.strokeStyle = INITIAL_COLOR;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function handleRageChange(event) {
    ctx.lineWidth = event.target.value;
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

const colors = document.getElementsByClassName("controls__color");
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(range) {
    range.addEventListener("input", handleRageChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(save) {
    save.addEventListener("click", handleSaveImg);
}

if(clearBtn) {
    clearBtn.addEventListener("click", handleClearCanvas);
}