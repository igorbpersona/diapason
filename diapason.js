const musicNotes = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
];

const singleNoteBarHeight = 20;

var mic;
var startButton;
var fft;

var textOutput;

var canvasWidth = window.innerWidth * 0.982;
var canvasHeight = singleNoteBarHeight * 27;

//Instantiate singing line
var singingLine = new SingingLine(
		360,
		0,
		2,
		canvasHeight,
		'#444444'
	);

//Instantiate voice dot at the bottom
var voiceDot = new VoiceDot(
		singingLine.x + singingLine.w / 2,
		canvasHeight,
		singleNoteBarHeight,
		'#333333',
		singingLine.x
	);

//Instantiate notesBar on the left of the screen
var notesBar = new NotesBar(
		singleNoteBarHeight,
		musicNotes
	);

var voiceNotes = {
	notes: [],
	speed: 1
};

function setup()
{
	createCanvas(canvasWidth, canvasHeight);

	mic = new p5.AudioIn();
	mic.start();

	fft = new p5.FFT();
	fft.setInput(mic);

	textOutput = document.getElementById('output');

	loadVoiceNotes();
}

function draw()
{
	background(199,199,199);
	singingLine.draw();
	drawVoiceNotes();
	notesBar.draw(canvasHeight); //TODO: Put this into html so it can be redered just one time
	voiceDot.draw(fft.analyze());
	voiceDot.drawVoiceHistory(singingLine.x);
}

function loadVoiceNotes() {
	for (var i = 0; i < 10; i++) {
		var voiceNote = {
			x: canvasWidth + (i * canvasWidth/4),
			y: map(i, 0, 9, canvasHeight, 0),
			ttl: canvasWidth/4,
			sing: false
		};

		voiceNotes.notes[i] = voiceNote;
	}
}

function drawNotesBar() {
	for (var i = 0; i <= canvasHeight; i += singleNoteBarHeight) {
		fill(50, 110, map(i, 0, canvasHeight, 0, 255));
		stroke(10, 10, 10);
		rect(0, i, 28, singleNoteBarHeight);

		textSize(16);
		fill(255, 255, 255);
		noStroke();
		text(musicNotes[(i / singleNoteBarHeight) % musicNotes.length], 2, i - 2);
	}
}


function drawVoiceNote(i) {
	if (voiceNotes.notes[i].x < canvasWidth) {
		//if note passed entirely the canvas
		if (voiceNotes.notes[i].x + voiceNotes.notes[i].ttl <= 0) {
			//removes first element from array
			voiceNotes.notes.shift();

			//end diapason!
			if (voiceNotes.notes.length <= 0) {
				return false;
			}
		} else {
			//Draw
			fill(50, 110, map(voiceNotes.notes[i].y, 0, canvasHeight, 0, 255));
			stroke(10, 10, 10);
			rect(voiceNotes.notes[i].x, voiceNotes.notes[i].y, voiceNotes.notes[i].ttl, singleNoteBarHeight);
			voiceNotes.notes[i].x -= voiceNotes.speed;

			if (voiceNotes.notes[i].x <= singingLine.x) {
				voiceNotes.notes[i].sing = true;
				hitNote(i);
			}
			return true;
		}
	} else {
		//bring note closer to be singed
		voiceNotes.notes[i].x -= voiceNotes.speed;
		return true;
	}
}

function drawVoiceNotes() {
	var keepDrawing = true;

	for (var i = 0; i < voiceNotes.notes.length; i++) {
		if (keepDrawing) {
			keepDrawing = drawVoiceNote(i);
		}
	}
}

function hitNote(i) {
	var bottomLimit = voiceNotes.notes[i].y + 14;
	var topLimit = voiceNotes.notes[i].y - 14;

	if ((voiceDot.y <= bottomLimit) && (voiceDot.y >= topLimit)) {
		voiceDot.hittingNote = true;
	} else {
		voiceDot.hittingNote = false;
	}
}