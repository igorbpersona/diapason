function preload()
{
	sound = loadSound('media/sounds/samples/440_sine.wav');
	highestFrequencies = [];
}

function setup()
{
	var canvas = createCanvas(800, 500);
	canvas.mouseClicked(togglePlay);

	fft = new p5.FFT();
	sound.amp(0.2);

	noLoop();
}

function draw()
{
	background(0);

	var spectrum = fft.analyze();

	analyzeSpectrum(spectrum);

	noStroke();
	fill(0,255,0); // spectrum is green
	for (var i = 0; i< spectrum.length; i++) {
    	var x = map(i, 0, spectrum.length, 0, width);
    	var h = -height + map(spectrum[i], 0, 255, height, 0);
    	rect(x, height, width / spectrum.length, h)
  	}
}

function togglePlay()
{
	if (sound.isPlaying()) {
		sound.pause();
		noLoop();
		printResume();
	} else {
		sound.loop();
		loop();
	}
}

function analyzeSpectrum(spectrum)
{
	var sequenceOfZeros = 0;
	var textOutput = "";
	var indexPeak = 0;
	var highestValue = 0;
	var highestValuesText = "";
	var f = [];

	p = createP('');

	for (var i = 0; i < spectrum.length; i++) {
		/*if (sequenceOfZeros > 20) {
			break;
		}*/

		if (spectrum[i] == 0) {
			sequenceOfZeros++;
		} else {
			textOutput += spectrum[i].toString() + ", ";

			if (spectrum[i] > highestValue) {
				//clear highest
				highestValuesText = "";
				f = [];

				highestValue = spectrum[i];
				highestValuesText += i.toString() + "(" + spectrum[i].toString() + "), ";
				f.push(i);

			} else if (spectrum[i] == highestValue) {
				highestValuesText += i.toString() + "(" + spectrum[i].toString() + "), ";
				f.push(i);
			}
		}

	}

	p.html(textOutput + " => " + highestValuesText);

	for (var i = 0; i < f.length; i++) {
		highestFrequencies.push(f[i]);
	}
}


function printResume()
{
	var length = highestFrequencies.length;
	var moda = 0;
	var soma = 0;

	createP("****************RESUMO*********************");

	for (var i = 0; i < highestFrequencies.length; i++) {
		createP(i.toString() + ": " + highestFrequencies[i].toString());
		soma += highestFrequencies[i];
	}


	createP("****************MEDIA*********************");
	createP((soma/length).toString());

	createP("****************MEDIANA*********************");
	createP((highestFrequencies[length/2]).toString());

	createP("****************MODA*********************");
	createP(mode(highestFrequencies).toString());

	createP("***************FIM RESUMO******************");
}

function mode(arr) {
    var numMapping = {};
    var greatestFreq = 0;
    var mode;
    arr.forEach(function findMode(number) {
        numMapping[number] = (numMapping[number] || 0) + 1;

        if (greatestFreq < numMapping[number]) {
            greatestFreq = numMapping[number];
            mode = number;
        }
    });
    return +mode;
}