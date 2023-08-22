const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

const canvasWidth = 1024;
const canvasHeight = 576;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let prevTime = 0;

function animate(){
    window.requestAnimationFrame(animate);

    handleControls()

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    player.uptade();
    // player2.uptade();

    let delta = (performance.now() - prevTime) / 1000;
    let fps = 1/delta;

    prevTime = performance.now();
}

animate()