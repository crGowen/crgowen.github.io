import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class Knight extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["up", "up", "right"],      repeat: false },
        { translations: ["up", "up", "left"],       repeat: false },
        { translations: ["down", "down", "right"],  repeat: false },
        { translations: ["down", "down", "left"],   repeat: false },
        { translations: ["right", "right", "up"],   repeat: false },
        { translations: ["right", "right", "down"], repeat: false },
        { translations: ["left", "left", "up"],     repeat: false },
        { translations: ["left", "left", "down"],   repeat: false }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("knight", colour, position);
    }
}