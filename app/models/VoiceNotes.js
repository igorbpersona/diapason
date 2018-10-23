function VoiceNotes(challange, speed, xToSing)
{
	//Main function to return notes array from scale given
	this.loadScale = function(challange)
	{
		switch(challange) {
			case SCALE_MARIANA:
				return this.marianaScale();
			case SCALE_ESTAMOS_ERRADOS:
				return this.estamosErradosScale();
			default:
				return [];
		}
	};

	this.loadNotes = function(challangeNotes, octave) {
		let notes = [];
		for (let i = 0; i < challangeNotes.length; i++) {
			notes[i] = new VoiceNote(challangeNotes[i], octave, this.xToSing);
		}
		return notes;
	};

	// returns array notes of mariana scale
	this.marianaScale = function()
	{
		let notes = [C, D, E, F, G, G_SUS, A, B];
		return this.loadNotes(notes, 4);
	};

	// returns array notes of estamos errados scale
	this.estamosErradosScale = function()
	{
		let notes = [C, D, E, F_SUS, G, A, B];
		return this.loadNotes(notes, 4);
	};

	this.draw = function()
	{
		for (let i = 0; i < this.notes.length; i++) {
			//draw note
			this.notes[i].draw(this.speed);
		}

		//check if some note can be removed from array
		if (this.notes.length > 0 && this.notes[this.notes.length - 1].hasPassed()) {
			this.notes.splice(this.notes.length - 1);
		}

		//returns true if there are notes to pass still, false otherwise
		return true;// this.notes.length !== 0;

	};


	this.notes = this.loadScale(challange); //array of notes
	this.speed = speed; //single note height
	this.xToSing = xToSing;
}
