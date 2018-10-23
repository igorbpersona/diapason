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
let timeTaken = 0;
let sec = 0;
var sheetManager = null;

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

	sheetManager = new MusicSheetManager("ID");
	sheetManager.loadChallange();
}

function draw()
{
	background("#93a29b");
    t1 = Date.now();
    timeTaken += t1 - t0;
    t0 = Date.now();

	if (timeTaken >= 1000) {
        sec++;
        console.log("Tempo: " + timeTaken + " Total: " + sec + "s");
        timeTaken = 0;
    }

    keepChallange = diapason.iterate();

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