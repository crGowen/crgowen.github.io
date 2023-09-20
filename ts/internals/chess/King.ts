import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class King extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["up"],         repeat: false },
        { translations: ["down"],       repeat: false },
        { translations: ["right"],      repeat: false },
        { translations: ["left"],       repeat: false },
        { translations: ["upRight"],    repeat: false },
        { translations: ["upLeft"],     repeat: false },
        { translations: ["downRight"],  repeat: false },
        { translations: ["downLeft"],   repeat: false }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("king", colour, position);
    }
}