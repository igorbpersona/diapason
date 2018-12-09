const MUSIC_NOTES_ARRAY = [
    'B',
    'A#',
    'A',
    'G#',
    'G',
    'F#',
    'F',
    'E',
    'D#',
    'D',
    'C#',
    'C'
];

// Notes
const C 	= 11;
const C_SUS = 10;
const D 	= 9;
const D_SUS = 8;
const E 	= 7;
const F 	= 6;
const F_SUS = 5;
const G 	= 4;
const G_SUS = 3;
const A 	= 2;
const A_SUS = 1;
const B 	= 0;


//height of a single note on notesBar
const SINGLE_NOTE_BAR_HEIGHT = 20;

//canvas quantity of notes to be displayed in the notesBar
const NUM_OF_NOTES_TO_SHOW = 24;

//position in the x axis of the singing line
const SINGING_LINE_X = 360;
const SINGING_LINE_Y = 0;
const SINGING_LINE_W = 2;

// How many values will be used to find the mode
const SMOOTHNESS_LEVEL = 4;

// Height variation in pixels that is acceptable for the note singed to be considered in tune
const ACCEPTABLE_VARIATION = 2;


// Colors for pitches order by MUSIC_NOTES_ARRAY
const PITCH_COLORS = [
	'#f2d538',
	'#f5992d',
	'#f93321',
	'#cf1119',
	'#fc002d',
	'#cb007c',
	'#b603cb',
	'#840ac2',
	'#0016bd',
	'#00c873',
	'#00c72e',
	'#a5c431'
];

const SCALE_MARIANA = 1;
const SCALE_ESTAMOS_ERRADOS = 2;
const MUSIC_MAN_IN_THE_BOX_ALICE_IN_CHAINS = 3;

const FONT_SIZE = 13;

//aproximation of number of miliseconds passed in an iteration of the Diapason
const ITERATION_MILISECONDS = 17.5;//16.8;

//indexes for notes sheet arrays
const SHEET_INDEX_START = 0;
const SHEET_INDEX_END = 1;
const SHEET_INDEX_NOTE = 2;
const SHEET_INDEX_OCTAVE = 3;

//indexes for approximation of frequencies voiceDot
const APPROXIMATION_NOTE1_INDEX = 0;
const APPROXIMATION_OCTAVE1_INDEX = 1;
const APPROXIMATION_NOTE2_INDEX = 2;
const APPROXIMATION_OCTAVE2_INDEX = 3;

//voice dot
const COLOR_HITTING_NOTE = "#F0F010";
const COLOR_MISSING_NOTE = "#202020";

//Matrix frequencies => octave x note
/*
*  octave:     |  0    | 1    | 2    | 3    4  ....
*  note:     B |  Fb0  | FB1  |      |
*           A# |  FA#0 | FA#1 |      |
*            A |  FA0  | FA1  |      |
*          ...
*
* */
const FREQUENCY_NOTES_MAP = [
  [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13], // B
  [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62], // A#
  [27.50, 55.00, 110.00, 220.00, 440.00, 880.00, 1760.00, 3520.00, 7040.00], // A
  [25.96, 51.91, 103.83, 207.65, 415.30, 830.61, 1661.22, 3322.44, 6644.88], // G#
  [24.50, 49.00, 98.00, 196.00, 392.00, 783.99, 1567.98, 3135.96, 6271.93], // G
  [23.12, 46.25, 92.50, 185.00, 369.99, 739.99, 1479.98, 2959.96, 5919.91], // F#
  [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65], // F
  [20.60, 41.20, 82.41, 164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04], // E
  [19.45, 38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03], // D#
  [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.63], // D
  [17.32, 34.65, 69.30, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92], // C#
  [16.35, 32.70, 65.41, 130.81, 261.63, 523.25, 1046.50, 2093.00, 4186.01], // C
];

const MINIMUM_VOLUME_TO_CONSIDER = 0.15;


function getNoteYPostion(note, octaveIndex)
{
    let secondOctaveStarter = SINGLE_NOTE_BAR_HEIGHT * MUSIC_NOTES_ARRAY.length;

    if (octaveIndex === 1) {
        return note * SINGLE_NOTE_BAR_HEIGHT;
    }

    return secondOctaveStarter + note * SINGLE_NOTE_BAR_HEIGHT;
}
