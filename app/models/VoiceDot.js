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
	this.draw = function(spectrum)
	{
		//console.log("passed spectrum: " + spectrum[0]);
		//find which frequency  are used the most
		var biggest = spectrum[0];
		var biggestIndex = 0;
		for (var i = 0; i < spectrum.length; i++) {
			if (spectrum[i] > biggest) {
				biggest = spectrum[i];
				biggestIndex = i;
			}
		}

		//debug
		textOutput.innerHTML = "["+biggestIndex+"]: " + biggest + "<br>";

		//map the frequency to a position on the y axis
		this.y = map(biggestIndex, 0, 100, 540, 10);

		//change dot color
		if (this.hittingNote) {
			this.color = '#FFFF00';
		} else {
			this.color = '#000000';
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
	}

	this.drawVoiceHistory = function(x)
	{
		noFill();
		stroke(255, 90, 10);
		beginShape();
		for (var i = 0; i < this.py.length; i++) {
			vertex(x - i, this.py[i]);
		}
		endShape();
	}

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