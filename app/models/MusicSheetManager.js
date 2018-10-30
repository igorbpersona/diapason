function MusicSheetManager(challangeId, xToSing)
{
    //SHEET FORMAT: [start, end, note, octave]
    this.loadChallange = function()
    {
        //TODO: get challange on db
        let text = "{" +
            "  \"name\": \"Mariana\"," +
            "  \"type\": \"scale\"," +
            "  \"sheet\": [" +
            "    [3000, 5000, \"C\", 3]," +
            "    [5001, 9000, \"D\", 3]," +
            "    [11000, 13000, \"E\", 3]," +
            "    [15000, 17000, \"F\", 3]," +
            "    [19000, 21000, \"G\", 3]," +
            "    [23000, 25000, \"G#\", 3]," +
            "    [27000, 29000, \"A\", 3]," +
            "    [31000, 33000, \"B\", 3]," +
            "    [35000, 37000, \"A\", 3]," +
            "    [39000, 41000, \"G#\", 3]," +
            "    [43000, 45000, \"G\", 3]," +
            "    [47000, 49000, \"F\", 3]," +
            "    [51000, 53000, \"E\", 3]," +
            "    [55000, 57000, \"D\", 3]," +
            "    [59000, 61000, \"C\", 3]" +
            "  ]" +
            "}";

        let jsonSheet = JSON.parse(text);

        this.name = jsonSheet.name;
        this.type = jsonSheet.type;
        this.sheet = jsonSheet.sheet;
    };

    this.draw = function(elapsedTime)
    {
        return this.voiceNotes.draw(elapsedTime);
    };

    this.challangeId = challangeId;
    this.name = null;
    this.type = null;
    this.sheet = null;
    this.challange = this.loadChallange(this.challangeId);
    this.voiceNotes = new VoiceNotes(xToSing, this.sheet);
}
