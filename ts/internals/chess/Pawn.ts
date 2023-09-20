import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class Pawn extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["forward"],            repeat: false,      allowCapture: "no"      },
        { translations: ["forward", "right"],   repeat: false,      allowCapture: "only"    },
        { translations: ["forward", "left"],    repeat: false,      allowCapture: "only"    }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("pawn", colour, position);
    }
}