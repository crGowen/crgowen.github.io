import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class Bishop extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["upRight"]     },
        { translations: ["upLeft"]      },
        { translations: ["downRight"]   },
        { translations: ["downLeft"]    }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("bishop", colour, position);
    }
}