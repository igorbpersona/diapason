//Variable to know if draw function is being called
var isLooping = true;

var textOutput;

var canvasWidth = window.innerWidth * 0.982;
var canvasHeight = 0;

var keepChallenge = true;
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
    //set up text output
	textOutput = document.getElementById('output');

	//load and set up scale (voice notes)
	let url = new URL(window.location.href);
	let challenge_id = parseInt(url.searchParams.get("challenge_id"));

	diapason = new Diapason(challenge_id, SMOOTHNESS_LEVEL);
	diapason.setUp();

	canvasHeight = diapason.getCanvasHeight();

    //Set up canvas
    canvas = createCanvas(canvasWidth, canvasHeight);

	//Start Diapason paused
    noLoop();
    isLooping = false;
}

function draw()
{
	background("#93a29b");

    t1 = Date.now();
    elapsedTime += t1 - t0;
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

    keepChallenge = diapason.iterate();

    if (!keepChallenge) {
		window.location.href = "/resume.html?challenge_id=" + diapason.challenge + "&points=" + diapason.points;
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