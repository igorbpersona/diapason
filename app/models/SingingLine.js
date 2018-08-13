function SingingLine(x, y, w, h, color)
{
	this.x = x; //position of the line in the x axis
	this.y = y; //position of the line in the y axis
	this.w = w; //width
	this.h = h; //height
	this.color = color; //color

	this.draw = function()
	{
		fill(this.color);
		noStroke();
		rect(this.x, this.y, this.w, this.h);
	}
}