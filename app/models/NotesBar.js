function NotesBar(noteHeight, notes)
{
	this.noteHeight = noteHeight; //single note height
	this.notes = notes; //array of notes

	this.draw = function(canvasHeight)
	{
		var j = 0;
		for (var i = 0; i <= canvasHeight; i += this.noteHeight) {
			fill(PITCH_COLORS[j % PITCH_COLORS.length]);
			noStroke();
			rect(0, i, 28, this.noteHeight);

			textSize(FONT_SIZE);
			fill("#FFFFFF");
			noStroke();
			text(this.notes[j % this.notes.length], 2, this.noteHeight + i - 4);
			j++;
		}
	}
}