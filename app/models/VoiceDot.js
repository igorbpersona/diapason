function VoiceDot(x, y, r, color, maxPySize)
{
	//"constructor"
	this.x = x; //x position
	this.y = y; //y position
	this.r = r; //radius
	this.color = color; //color
	this.py = []; //previous positions of the y axis array (voice history)
	this.py.push(y);
	this.maxPySize = maxPySize; //maximum size of py array to store values
	this.hittingNote = false; //flag that tells if dot is hitting a note

	//Draws the voiceDot in the canvas according to the microphone fft spectrum passed
	this.draw = function(freq, octaves, volume)
	{
		this.hittingNote = false;
		this.y = height;
		if (volume > MINIMUM_VOLUME_TO_CONSIDER) {
            //map the frequency to a position on the y axis
            let approximation = getNoteApproximation(freq);

            let note1 = approximation[APPROXIMATION_NOTE1_INDEX];
            let octave1 = approximation[APPROXIMATION_OCTAVE1_INDEX];
            let note2 = approximation[APPROXIMATION_NOTE2_INDEX];
            let octave2 = approximation[APPROXIMATION_OCTAVE2_INDEX];

            let freq1 = FREQUENCY_NOTES_MAP[note1][octave1];
            let freq2 = FREQUENCY_NOTES_MAP[note2][octave2];

            let octaveIndex1 = 0;
            let octaveIndex2 = 0;
            if (octave1 === octaves[1]) {
                octaveIndex1 = 1;
            }
            if (octave2 === octaves[1]) {
                octaveIndex2 = 1;
            }

            let positionNote1 = getNoteYPostion(note1, octaveIndex1);
            let positionNote2 = getNoteYPostion(note2, octaveIndex2);

            console.log(freq);
            console.log(freq + " " + freq2 + " " + freq1 + " " + positionNote2 + " " + positionNote1);
            this.y = map(freq, freq2, freq1, positionNote2, positionNote1);
            if (positionNote1 === positionNote2) {
            	this.y = positionNote1;
			}

            let topVariation1 = positionNote1 - ACCEPTABLE_VARIATION;
            let bottomVariation1 = positionNote1 + ACCEPTABLE_VARIATION;
            let topVariation2 = positionNote2 - ACCEPTABLE_VARIATION;
            let bottomVariation2 = positionNote2 + ACCEPTABLE_VARIATION;

            console.log("y: " + this.y);
            console.log("top: " + topVariation1 + " | " + topVariation2);
            console.log("bottom: " + bottomVariation1 + " | " + bottomVariation2);
            if (((this.y <= bottomVariation1) && (this.y >= topVariation1)) ||
                ((this.y <= bottomVariation2) && (this.y >= topVariation2))
			) {
				this.hittingNote = true;
			}
			console.log(this.hittingNote);
            console.log();


            //adjust dot to be centered
            this.y += (SINGLE_NOTE_BAR_HEIGHT/2)
        }

		//change dot color
		if (this.hittingNote) {
			this.color = COLOR_HITTING_NOTE;
		} else {
			this.color = COLOR_MISSING_NOTE;
		}

		//draw dot
		stroke(255);
		fill(this.color);
		ellipse(this.x, this.y, this.r);

		//update py
		this.py.unshift(this.y);
		if (this.py.length >= this.maxPySize) {
			this.py.pop();
		}
	};

	this.drawVoiceHistory = function(x)
	{
		noFill();
		stroke(255, 90, 10);
		beginShape();
		for (var i = 0; i < this.py.length; i++) {
			vertex(x - i, this.py[i]);
		}
		endShape();
	};


	//Compare the note of the voiceDot with the note given
	this.hittingNote = function(note)
	{
		//TODO: compare notes, maybe find range to smooth the comparation
		//TODO: for example, if note given is 440Hz, return true for 437~443Hz Dot
		if (this.y === 0) {
			return true;
		}

		return false;
	}

}