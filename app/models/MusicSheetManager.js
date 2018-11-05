function MusicSheetManager(challengeId, xToSing)
{
    //SHEET FORMAT: [start, end, note, octave]
    this.loadChallenge = function(challengeId)
    {
        let text = "";
        challengeId = parseInt(challengeId);

        switch (challengeId) {
            case (SCALE_MARIANA):
                document.getElementById("challenge").innerHTML = "Mariana";
                console.log("MARIANA");
                text = "{" +
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
                    "    [33000, 33600, \"C\", 3]," +
                    "    [34000, 34600, \"B\", 3]," +
                    "    [35000, 37000, \"A\", 3]," +
                    "    [39000, 41000, \"G#\", 2]," +
                    "    [43000, 45000, \"G\", 2]," +
                    "    [47000, 49000, \"F\", 2]," +
                    "    [51000, 53000, \"E\", 2]," +
                    "    [55000, 57000, \"D\", 3]," +
                    "    [59000, 61000, \"C\", 3]" +
                    "  ]" +
                    "}";
                break;
            case (SCALE_ESTAMOS_ERRADOS):
                document.getElementById("challenge").innerHTML = "Estamos errados";
                console.log("ESTAMOS ERRADOS");

                text = "{" +
                    "  \"name\": \"EstamosErrados\"," +
                    "  \"type\": \"scale\"," +
                    "  \"sheet\": [" +
                    "    [3000, 4000, \"E\", 3]," +
                    "    [4010, 5000, \"F#\", 3]," +
                    "    [5500, 6000, \"G\", 3]," +
                    "    [6500, 7000, \"A\", 3]," +
                    "    [7500, 8000, \"B\", 3]," +
                    "    [8500, 9000, \"C\", 4]," +
                    "    [9500, 10000, \"D\", 4]," +
                    "    [10500, 11000, \"C\", 4]," +
                    "    [11500, 12000, \"B\", 3]," +
                    "    [12500, 13000, \"A\", 3]," +
                    "    [13500, 14000, \"G\", 4]," +
                    "    [14500, 15000, \"F#\", 4]," +
                    "    [15500, 16000, \"E\", 4]," +
                    "    [16500, 17000, \"A\", 4]," +
                    "    [17500, 18000, \"E\", 4]," +
                    "    [18500, 19000, \"E\", 4]," +
                    "    [19500, 20500, \"A\", 3]" +
                    "  ]" +
                    "}";
                break;

            default:
                alert("ERROR: ESCALA NÃO ENCONTRADA");
                console.log("ERROR: ESCALA NÃO ENCONTRADA");
                return null;
        }


        let jsonSheet = JSON.parse(text);

        this.name = jsonSheet.name;
        this.type = jsonSheet.type;
        this.sheet = jsonSheet.sheet;
        this.octaves = this.populateOctaves();

        return challengeId;
    };

    this.draw = function()
    {
        return this.voiceNotes.draw();
    };

    //returns a 2 position array with the octaves ordered used in the challenge
    this.populateOctaves = function()
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

    this.getOctaves = function()
    {
        return this.octaves;
    };

    this.name = null;
    this.type = null;
    this.sheet = null;
    this.octaves = null;
    this.challengeId = this.loadChallenge(challengeId);
    this.voiceNotes = new VoiceNotes(xToSing, this.sheet, this.octaves);
}
