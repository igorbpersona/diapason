function NotesBar(noteHeight, notes)
{
	this.noteHeight = noteHeight; //single note height
	this.notes = notes; //array of notes

	this.draw = function(canvasHeight)
	{
		for (var i = 0; i <= canvasHeight; i += this.noteHeight) {
			fill(50, 110, map(i, 0, canvasHeight, 0, 255));
			stroke(10, 10, 10);
			rect(0, i, 28, this.noteHeight);

			textSize(16);
			fill(255, 255, 255);
			noStroke();
			text(this.notes[(i / this.noteHeight) % this.notes.length], 2, i - 2);
		}
	}
}