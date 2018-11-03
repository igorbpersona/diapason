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
	this.draw = function(freq)
	{
		//map the frequency to a position on the y axis
		let approximation = this.getNoteApproximation(freq);
		this.y = map(freq, 1, 1000, height, -10);

		//change dot color
		if (this.hittingNote) {
			this.color = COLOR_HITTING_NOTE;
		} else {
			this.color = COLOR_MISSING_NOTE;
		}

		//draw dot
		//console.log("Will draw a ellipse with values [" + this.x + ", " + this.y + ", " + this.r + "]");
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

	this.getNoteApproximation = function(freq)
	{
		let octave = 0;
		for (let i = 0; i < FREQUENCY_NOTES_MAP[C].length; i++) {
            if (freq > FREQUENCY_NOTES_MAP[C][i]) {
                octave++;
            } else if (freq < FREQUENCY_NOTES_MAP[C][i]) {
            	if (i !== 0) {
                    octave--;
            		break;
				}
			} else {
            	return [C, i];
			}
        }

        for (let i = MUSIC_NOTES_ARRAY.length - 2; i >= 0; i--) {
			if (freq <= FREQUENCY_NOTES_MAP[i][octave]) {
				//returns a note, an octave and the difference between the frequency and the closest note
                return [i, octave];
            }
        }

        return [C, octave + 1];
	};

	//Compare the note of the voiceDot with the note given
	/*this.hittingNote = function(note)
	{
		//TODO: compare notes, maybe find range to smooth the comparation
		//TODO: for example, if note given is 440Hz, return true for 437~443Hz Dot
		if (this.y == 0) {
			return true;
		}

		return false;
	}*/

}