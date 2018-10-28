function VoiceNote(noteData, xToSing, challangeTotalTime)
{
	this.draw = function(elapsedTime)
	{
		if (this.x < width) {
			//if note passed entirely the canvas
			if (this.hasPassed()) {
				return;
			}

			//Draw
			fill(PITCH_COLORS[this.note]);
			rect(this.x, this.y, this.tts, SINGLE_NOTE_BAR_HEIGHT);

			fill("#FFFFFF");
			noStroke();
			textSize(FONT_SIZE);
			text(MUSIC_NOTES_ARRAY[this.note], this.x + 4, this.y + FONT_SIZE + 2);

			if ((this.x <= this.xToSing) && (this.x + this.tts) >= this.xToSing) {
				this.sing = true;
				console.log(this.noteText + " " + elapsedTime);
				//this.hitNote();
			}
			
		}

		//updates note position
        this.x--;
	};

	//check if note has already completely passed by the canvas
	this.hasPassed = function() {
        return ((this.x + this.tts) <= 0);
	};

	this.getStarterXAxis = function()
	{
		let conversion = (this.challangeTotalTime / ITERATION_MILISECONDS);
		return map(this.start, 0, this.challangeTotalTime, 0, conversion);
	};

    this.getYAxis = function()
    {
        return this.note * SINGLE_NOTE_BAR_HEIGHT; //TODO: use octave
    };

	this.getNoteWidth = function()
	{
		let diff = this.end - this.start;
        console.log("########## Note width ##########");
        console.log("start: " + this.start);
        console.log("end: " + this.end);
        console.log("width: " + parseInt(diff / ITERATION_MILISECONDS));
        console.log("");
		return parseInt(diff / ITERATION_MILISECONDS);
	};

	this.getNote = function()
	{
		for (let i = 0; i < MUSIC_NOTES_ARRAY.length; i++) {
			if (this.noteText === MUSIC_NOTES_ARRAY[i]) {
				return i;
			}
		}
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

    this.noteText = noteData[SHEET_INDEX_NOTE];
    this.note = this.getNote();
    this.octave = noteData[SHEET_INDEX_OCTAVE];
    this.start = noteData[SHEET_INDEX_START];
    this.end = noteData[SHEET_INDEX_END];
    this.challangeTotalTime = challangeTotalTime;
    this.x = this.getStarterXAxis();
    this.y = this.getYAxis();
    this.tts = this.getNoteWidth(); //stands for Time To Sing, it's the Note width TODO: calculate this based on start and end
    this.xToSing = xToSing; // x axis moment to sing
    this.sing = false; //flag to know if note needs to be singed now
}