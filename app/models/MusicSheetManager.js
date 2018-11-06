function MusicSheetManager(challengeId, xToSing)
{
    //SHEET FORMAT: [start, end, note, octave]
    this.loadChallenge = function(challengeId)
    {
        let jsonSheet = null;
        let song = null;
        challengeId = parseInt(challengeId);

        switch (challengeId) {
            case (SCALE_MARIANA):
                jsonSheet = this.loadJsonSheet("/app/inc/sheets/scales/mariana.json");
                break;

            case (SCALE_ESTAMOS_ERRADOS):
                jsonSheet = this.loadJsonSheet("/app/inc/sheets/scales/estamosErrados.json");
                break;

            case (MUSIC_MAN_IN_THE_BOX_ALICE_IN_CHAINS):
                jsonSheet = this.loadJsonSheet("/app/inc/sheets/musics/manInTheBox_AliceInChains.json");
                song = loadSound('../../media/sounds/songs/ManInTheBox_AliceInChains.mp3');
                break;

            default:
                alert("ERROR: ESCALA NÃO ENCONTRADA");
                return song;
        }

        this.name = jsonSheet.name;
        this.type = jsonSheet.type;
        this.author = jsonSheet.author;
        this.sheet = jsonSheet.sheet;
        this.octaves = this.populateOctaves();

        let challengeName = this.name;
        if (this.author !== "") {
            challengeName += " - " + this.author;
        }

        document.getElementById("challenge").innerHTML =  challengeName;

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

    this.loadJsonSheet = function(path)
    {
        let jsonSheet = null;

        jQuery.ajax({
            url: path,
            dataType: "json",
            async: false,
            success: function(response) {
                jsonSheet = response;
            }
        });

        return jsonSheet;
    };

    this.getOctaves = function()
    {
        return this.octaves;
    };

    this.pauseSong = function()
    {
        if (this.song) {
            this.song.pause();
        }
    };

    this.playSong = function()
    {
        if (this.song) {
            this.song.play();
        }
    };

    this.name = null;
    this.type = null;
    this.author = null;
    this.sheet = null;
    this.octaves = null;
    this.song = this.loadChallenge(challengeId);
    this.voiceNotes = new VoiceNotes(xToSing, this.sheet, this.octaves);
}
