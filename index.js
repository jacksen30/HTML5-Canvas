const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// Resizes canvas to be the full width and height of the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Line styling
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

// globalCompositeOperation - determines how shapes and images are drawn onto the canvas. Source is what your drawing / Destination is whats already on the canvas.
ctx.globalCompositeOperation = 'luminosity'; /* Other interesting values to try: lighter copy xor destination-over multiply darken overlay color-burn */

// isDrawing is to be used to toggle drawing function - mouse movement only draws when mouse button is held down
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// initalize hue and direction variables that will be used to adjust color and line size while drawing
let hue = 0;
let direction = true;


function draw(e) {
    if(!isDrawing) {
        return; // Prevents the function running when it is not a mouseDown event
    }
    
    /* console.log(e); */ //Can be uncommented for debugging purposes

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    // Start line from
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    // End line at
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offfsetX, e.offsetY]; //Object destructuring - Updates lastX & lastY to where the line last ended

    //Increments the hue for each move along lastX / lastY - If statement resets the hue every time it reaches 360
    hue++; 
    if (hue >= 360) {
        hue = 0;
    }

    // Acts as a conditional toggle for the direction variable
    if (ctx.lineWidth >= 100 || ctx.lineWidth <=1) {
        direction = !direction;
    }
    // If direction = true lineWidth increments / false lineWidth decrements
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}


// Listens for mousedown event on the canvas and updates the boolean value of the isDrawing variable to true
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // Updates the lastX and LastY to the location where the mousedown event happened - Draw function will start from here
    [lastX, lastY] = [e.offfsetX, e.offsetY];
});

// Listens for any mousemove event on the canvas 
canvas.addEventListener('mousemove', draw);
// Listens for mouseup event on the canvas and updates the boolean value of the isDrawing variable to false
canvas.addEventListener('mouseup', () => isDrawing = false);
// Listens for a mouseout event (where mouse leaves the canvas) and updates isDrawing variable to false
canvas.addEventListener('mouseout', () => isDrawing = false);

