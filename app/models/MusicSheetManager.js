function MusicSheetManager(challengeId, xToSing)
{
    //SHEET FORMAT: [start, end, note, octave]
    this.loadChallenge = function()
    {
        //TODO: get challenge on db
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
            "    [30000, 32000, \"B\", 3]," +
            "    [33000, 33600, \"C\", 4]," +
            "    [34000, 34600, \"B\", 3]," +
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
        this.octaves = this.getOctaves();
    };

    this.draw = function(elapsedTime)
    {
        return this.voiceNotes.draw(elapsedTime);
    };

    //returns a 2 position array with the octaves ordered used in the challenge
    this.getOctaves = function()
    {
        let octave = this.sheet[0][SHEET_INDEX_OCTAVE];

        for (let i = 1; i < this.sheet.length; i++) {
            if (this.sheet[i][SHEET_INDEX_OCTAVE] < octave) {
                return [this.sheet[i][SHEET_INDEX_OCTAVE], octave];

            } else if (this.sheet[i][SHEET_INDEX_OCTAVE] > octave) {
                return [octave, this.sheet[i][SHEET_INDEX_OCTAVE]];
            }
        }

        return [octave, null];
    };

    this.challengeId = challengeId;
    this.name = null;
    this.type = null;
    this.sheet = null;
    this.octaves = null;
    this.challenge = this.loadChallenge(this.challengeId);
    this.voiceNotes = new VoiceNotes(xToSing, this.sheet);
}
