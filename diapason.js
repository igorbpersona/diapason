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

var singingTimeLine = {
	x: 360,
	w: 2,
	h: canvasHeight,
	color: '#444444',
};

var voiceDot = {
	radius: singleNoteBarHeight,
	color: '#000000',
	x: singingTimeLine.x + singingTimeLine.w / 2,
	y: canvasHeight,
	hittingNote: false
}

var voiceHistory = [];

var voiceNotes = {
	notes: [],
	speed: 1
};

function setup() {
	createCanvas(canvasWidth, canvasHeight);

	mic = new p5.AudioIn();
	mic.start();

	fft = new p5.FFT();
	fft.setInput(mic);

	textOutput = document.getElementById('output');

	loadVoiceNotes();
}

function draw() {
	background(199,199,199);

	drawSingingTimeLine();
	drawVoiceNotes();
	drawNotesBar();
	drawVoiceDot();
	drawVoiceHistory();
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

	console.log("loadedVoiceNotes:");
	console.log(voiceNotes);
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


function drawSingingTimeLine() {
	fill(singingTimeLine.color);
	noStroke();
	rect(singingTimeLine.x, 0, singingTimeLine.w, singingTimeLine.h);
}

function drawVoiceHistory() {
	noFill();
	stroke(255, 90, 10);
	beginShape();
	for (var i = 0; i < voiceHistory.length; i++) {
		vertex(singingTimeLine.x - i, voiceHistory[i]);
	}
	endShape();
}

function drawVoiceDot() {
	var vol = mic.getLevel();
	voiceDot.y = map(vol, -0.005, 1, canvasHeight, 0);

	var spectrum = fft.analyze();
	var text = textOutput.innerHTML;

	var biggest = spectrum[0];
	var biggestIndex = 0;
	for (var i = 0; i < spectrum.length; i++) {
		if (spectrum[i] > biggest) {
			biggest = spectrum[i];
			biggestIndex = i;
		}
		// text += spectrum[i];
	}

	textOutput.innerHTML = "["+biggestIndex+"]: " + biggest + "<br>";

	voiceDot.y = map(biggestIndex, 0, 50, canvasHeight, 0);


	if (voiceDot.hittingNote) {
		voiceDot.color = '#FFFF00';
	} else {
		voiceDot.color = '#000000';
	}

	fill(voiceDot.color);
	stroke(255);
	ellipse(voiceDot.x, voiceDot.y, voiceDot.radius);
	voiceHistory.unshift(voiceDot.y);
	if (voiceHistory.length >= singingTimeLine.x) {
		voiceHistory.pop();
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

			if (voiceNotes.notes[i].x <= singingTimeLine.x) {
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

