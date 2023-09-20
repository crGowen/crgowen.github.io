import ChessPiece, { 
    Position,
    PlayerColour
} from "./ChessPiece";

export default class Queen extends ChessPiece {
    public readonly pieceMoves = [
        { translations: ["up"]          },
        { translations: ["down"]        },
        { translations: ["right"]       },
        { translations: ["left"]        },
        { translations: ["upRight"]     },
        { translations: ["upLeft"]      },
        { translations: ["downRight"]   },
        { translations: ["downLeft"]    }
    ];

    constructor(colour: PlayerColour, position: Position) {
        super("queen", colour, position);
    }
}