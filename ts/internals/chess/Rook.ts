import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class Rook extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["up"]      },
        { translations: ["down"]    },
        { translations: ["right"]   },
        { translations: ["left"]    }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("rook", colour, position);
    }
}