//Variable to know if draw function is being called
var isLooping = true;

var textOutput;

var canvasWidth = window.innerWidth * 0.982;
var canvasHeight = SINGLE_NOTE_BAR_HEIGHT * NUM_OF_NOTES_TO_SHOW;

var keepChallange = true;
var diapason = null;

var canvas = null;

let t0 = 0;
let t1 = 0;
let elapsedTime = 0;
let totalTimeElapsed = 0;
let sec = -1;

//Main function before start to drawing, loads and set up variables
function setup()
{
	//Set up canvas
	canvas = createCanvas(canvasWidth, canvasHeight);

	//set up text output
	textOutput = document.getElementById('output');

	//load and set up scale (voice notes)
	let url = new URL(window.location.href);
	let challange_id = parseInt(url.searchParams.get("challange_id"));

	diapason = new Diapason(challange_id, SPEED, SMOOTHNESS_LEVEL);
	diapason.setUp();
}

function draw()
{
	background("#93a29b");

    t1 = Date.now();
    elapsedTime += t1 - t0;
    //console.log(totalTimeElapsed);
    t0 = Date.now();

	if (elapsedTime >= 1000) {
        sec++;
        textOutput.innerHTML = "Elapsed time: " + sec + "s";
        elapsedTime = 0;
    }

    if (elapsedTime > 30) {
        totalTimeElapsed += ITERATION_MILISECONDS;
    } else {
        totalTimeElapsed += elapsedTime;

    }

    keepChallange = diapason.iterate(totalTimeElapsed);

    if (!keepChallange) {
		window.location.href = "/resume.html?challange_id=" + diapason.challange + "&points=" + diapason.points;
	}
}

function toggleLoop()
{
    if (isLooping) {
        noLoop();
        isLooping = false;
        document.getElementById("btn-toggle-loop").innerHTML = "Play";

    } else {
        loop();
        isLooping = true;
        document.getElementById("btn-toggle-loop").innerHTML = "Pause";
    }
}