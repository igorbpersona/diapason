function VoiceNote(note, octave, start, end, xToSing)
{
	this.note = note;
	this.octave = octave;
	this.start = start;
	this.end = end;
	this.x = width + (note * width/4);
	this.y = map(note, 0, MUSIC_NOTES_ARRAY.length, 0, height);
	this.tts = width/4; //stands for Time To Sing, it's the Note width TODO: calculate this based on start and end
	this.xToSing = xToSing; // x axis moment to sing
	this.sing = false; //flag to know if note needs to be singed now

	this.draw = function(speed)
	{
		if (this.x < width) {
			//if note passed entirely the canvas
			if (this.x + this.tts <= 0) {
				//removes first element from array
				return;
			}

			//Draw
			fill(PITCH_COLORS[this.note]);
			rect(this.x, this.y, this.tts, SINGLE_NOTE_BAR_HEIGHT);

			fill("#FFFFFF");
			noStroke();
			textSize(FONT_SIZE);
			text(MUSIC_NOTES_ARRAY[this.note], this.x + 4, this.y + FONT_SIZE + 2);


			this.x -= speed;

			if (this.x <= this.xToSing) {
				this.sing = true;
				//this.hitNote();
			}
			
		} else {
			//bring note closer to canvas
			this.x -= speed;
		}
	};

	//check if note has already completely passed by the canvas
	this.hasPassed = function() {
        return ((this.x + this.tts) <= 0);
	};

	/*this.hitNote = function(i) {
		var bottomLimit = voiceNotes.notes[i].y + 14;
		var topLimit = voiceNotes.notes[i].y - 14;

		if ((voiceDot.y <= bottomLimit) && (voiceDot.y >= topLimit)) {
			voiceDot.hittingNote = true;
		} else {
			voiceDot.hittingNote = false;
		}
	}*/
}