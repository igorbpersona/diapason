function MusicSheetManager(challengeId, xToSing)
{
    //SHEET FORMAT: [start, end, note, octave]
    this.loadChallenge = function(challengeId)
    {
        let text = "";
        let song = null;
        challengeId = parseInt(challengeId);

        switch (challengeId) {
            case (SCALE_MARIANA):
                document.getElementById("challenge").innerHTML = "Mariana";
                console.log("MARIANA");
                text = "{" +
                    "  \"name\": \"Mariana\"," +
                    "  \"type\": \"scale\"," +
                    "  \"author\": \"\"," +
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
                    "  \"author\": \"\"," +
                    "  \"sheet\": [" +
                    "    [3000, 4000, \"E\", 3]," +
                    "    [4010, 5000, \"F#\", 3]," +
                    "    [5500, 6000, \"G\", 3]," +
                    "    [6500, 7000, \"A\", 3]," +
                    "    [7500, 8000, \"B\", 3]," +
                    "    [8500, 9000, \"C\", 2]," +
                    "    [9500, 10000, \"D\", 2]," +
                    "    [10500, 11000, \"C\", 2]," +
                    "    [11500, 12000, \"B\", 3]," +
                    "    [12500, 13000, \"A\", 3]," +
                    "    [13500, 14000, \"G\", 2]," +
                    "    [14500, 15000, \"F#\", 2]," +
                    "    [15500, 16000, \"E\", 2]," +
                    "    [16500, 17000, \"A\", 2]," +
                    "    [17500, 18000, \"E\", 2]," +
                    "    [18500, 19000, \"E\", 2]," +
                    "    [19500, 20500, \"A\", 3]" +
                    "  ]" +
                    "}";
                break;

            case (MUSIC_MAN_IN_THE_BOX_ALICE_IN_CHAINS):
                document.getElementById("challenge").innerHTML = "Man in the box - Alice in Chains";
                console.log("MAN IN THE BOX - ALICE IN CHAINS");

                text = "{" +
                    "  \"name\": \"Man in the Box\"," +
                    "  \"type\": \"music\"," +
                    "  \"author\": \"Alice in Chains\"," +
                    "  \"sheet\": [" +
                    //Intro
                    "    [24650, 25740, \"B\", 2]," +
                    "    [25900, 27000, \"D\", 3]," +
                    "    [27050, 28000, \"E\", 3]," +
                    "    [28050, 29000, \"A\", 2]," +
                    // "    [21100, 21600, \"B\", 2]," +
                    // "    [21700, 22300, \"G\", 2]," +
                    // "    [22400, 22900, \"A\", 2]," +
                    // "    [23000, 23500, \"G\", 2]," +
                    // "    [23600, 24000, \"E\", 3]," +
                    // "    [29500, 29950, \"B\", 2]," +
                    // "    [30000, 30210, \"D\", 3]," +
                    // "    [30220, 30500, \"E\", 3]," +
                    // "    [30600, 31000, \"A\", 2]," +
                    // "    [31100, 31600, \"B\", 2]," +
                    // "    [31700, 32300, \"G\", 2]," +
                    // "    [32400, 32900, \"A\", 2]," +
                    "    [33000, 33500, \"G\", 2]," +
                    "    [33600, 34000, \"E\", 2]" +
                    //Verse
                    "  ]" +
                    "}";

                song = loadSound('../../media/sounds/songs/ManInTheBox_AliceInChains.mp3');
                break;
            default:
                alert("ERROR: ESCALA NÃO ENCONTRADA");
                console.log("ERROR: ESCALA NÃO ENCONTRADA");
                return song;
        }


        let jsonSheet = JSON.parse(text);

        this.name = jsonSheet.name;
        this.type = jsonSheet.type;
        this.author = jsonSheet.author;
        this.sheet = jsonSheet.sheet;
        this.octaves = this.populateOctaves();

        return song;
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

    this.pauseSong = function()
    {
        this.song.pause();
    };

    this.playSong = function()
    {
        this.song.play();
    };

    this.name = null;
    this.type = null;
    this.author = null;
    this.sheet = null;
    this.octaves = null;
    this.song = this.loadChallenge(challengeId);
    this.voiceNotes = new VoiceNotes(xToSing, this.sheet, this.octaves);
}
