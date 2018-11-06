function Diapason(challengeId, smoothnessLevel)
{
    this.setUp = function()
    {
        //set up microphone
        this.mic = new p5.AudioIn();
        this.mic.start();

        this.lowPass = new p5.LowPass();
        this.lowPass.disconnect();
        this.mic.connect(this.lowPass);

        this.fft = new p5.FFT();
        this.fft.setInput(this.lowPass);

        this.inputAmplitude = new p5.Amplitude();
        this.inputAmplitude.setInput(this.lowPass);

        this.sheetManager = new MusicSheetManager(challengeId, SINGING_LINE_X);

        //set up notes bar
        this.notesBar = new NotesBar(
            SINGLE_NOTE_BAR_HEIGHT,
            MUSIC_NOTES_ARRAY,
            this.sheetManager.octaves
        );

        //set up singing line
        this.singingLine = new SingingLine(
            SINGING_LINE_X,
            SINGING_LINE_Y,
            SINGING_LINE_W,
            this.getCanvasHeight(),
            '#444444'
        );

        //set up voice dot
        this.voiceDot = new VoiceDot(
            this.singingLine.x + this.singingLine.w / 2,
            height,
            SINGLE_NOTE_BAR_HEIGHT,
            '#333333',
            this.singingLine.x
        );
    };

    this.iterate = function()
    {
        // array of float values from -1 to 1
        let timeDomain = this.fft.waveform(1024, 'float32'); //computes amplitude values along the time domain. The array indices correspond to samples across a brief moment in time. Each value represents amplitude of the waveform at that sample of time.
        let corrBuff = autoCorrelate(timeDomain);
        let fundamentalFreq = findFrequency(corrBuff);

        this.freqArray[this.iteration] = parseInt(fundamentalFreq);

        if (this.iteration === this.smoothnessLevel) {
            this.currFreq = smoothFrequency(this.freqArray);
            this.iteration = -1;
        }

        this.singingLine.draw();
        let keepGoing = this.sheetManager.draw();
        if (!keepGoing) {
            return false;
        }
        this.notesBar.draw(height);
        this.voiceDot.draw(
            this.currFreq,
            this.sheetManager.getOctaves(),
            this.inputAmplitude.getLevel()
        );
        this.voiceDot.drawVoiceHistory(this.singingLine.x);

        this.iteration++;
        return true;
    };

    this.getCanvasHeight = function()
    {
        if (this.sheetManager.octaves[1] == null) {
            return SINGLE_NOTE_BAR_HEIGHT * MUSIC_NOTES_ARRAY.length;
        }
        return SINGLE_NOTE_BAR_HEIGHT * MUSIC_NOTES_ARRAY.length * 2;
    };

    this.playDiapason = function()
    {
        this.sheetManager.playSong();
    };

    this.pauseDiapason = function()
    {
        this.sheetManager.pauseSong();
    };

    this.challenge = challengeId; //Challenge id
    this.points = 0; //points earned in challenge
    this.iteration = 0;
    this.smoothnessLevel = smoothnessLevel;

    this.mic = null;
    this.fft = null;
    this.lowPass = null;
    this.inputAmplitude = null;

    this.freqArray = [];
    this.currFreq = 0;

    //Instantiate singing line
    this.singingLine = null;

    //Instantiate voice dot at the bottom
    this.voiceDot = null;

    //Instantiate notes bar on the left of the screen
    this.notesBar = null;

    //Instantiate sheet manager
    this.sheetManager = null;
}