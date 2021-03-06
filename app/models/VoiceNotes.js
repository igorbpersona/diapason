function VoiceNotes(xToSing, sheet, octaves)
{
	this.loadNotes = function() {
		let notes = [];
		for (let i = 0; i < this.sheet.length; i++) {
			let octaveIndex = 0;
			if (this.sheet[i][SHEET_INDEX_OCTAVE] === this.octaves[1]) {
                octaveIndex = 1;
			}

			notes[i] = new VoiceNote(
				this.sheet[i],
				this.xToSing,
				this.sheet[this.sheet.length - 1][SHEET_INDEX_START],
				octaveIndex
			);
		}
		return notes;
	};


	this.draw = function()
	{
		for (let i = 0; i < this.notes.length; i++) {
			//draw note
			this.notes[i].draw();
		}

		//check if some note can be removed from array
		if (this.notes.length > 0 && this.notes[this.notes.length - 1].hasPassed()) {
			this.notes.splice(this.notes.length - 1);
		}

		//returns true if there are notes to pass still, false otherwise
		return true;// TODO: return (this.notes.length !== 0);

	};

	this.xToSing = xToSing;
    this.sheet = sheet;
    this.octaves = octaves;
    this.notes = this.loadNotes(); //array of notes
}
