// document.querySelector("input").value;
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
let painting = false;

ctx.strokeStyle = "#222";
ctx.lineWidth = "2.5";

function startPainting() {

}
function stopPainting() {
    painting = false;
}

function onMouseDown(event) {
    painting = true;
    console.log(event);
}

function onMouseMove(event) {
    //전체 윈도우의 좌표 clientX, clientY
    // 캔버스 안에서의 가로세로 값은 offsetX, Y
    if(painting==true) {
        const x = event.offsetX;
        const y = event.offsetY;
        console.log(x, y);
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

//
// (function() {
//
//
//
//     let getSize = function () {
//
//     };
//
//     function init() {
//
//     }
//     init();
//
// })();
