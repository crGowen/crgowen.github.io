
export type PieceType = "pawn" | "pawnGhost" | "rook" | "knight" | "bishop" | "queen" | "king"; // "pawnGhost" used for en-passant capture
export type PlayerColour = "blue" | "red";
export type Position = {
    file: number;
    rank: number;
};

type BoardTranslation = "up" | "down" | "right" | "left" | "upRight" | "upLeft" | "downRight" | "downLeft" | "forward";
    // "forward" for pawns, as the direction it can travel is conditional based on colour

type ChessMove = {
    translations: BoardTranslation[];
    repeat?: boolean; // default to "true"
    allowCapture?: "no" | "yes" | "only"; // default to "yes"
};

export default abstract class ChessPiece {
    protected type: PieceType;
    protected readonly colour: PlayerColour;

    protected position: Position;

    protected abstract readonly pieceMoves: ChessMove[];

    constructor(type: PieceType, colour: PlayerColour, position: Position) {
        this.type = type;
        this.colour = colour;
        this.position = {...position};
    }

    public getInfo() {
        return {
            type: this.type,
            colour: this.colour,
            position: this.position,
            m: this.pieceMoves
        };
    }

    public setPosition(position: Position) {
        this.position = {...position};
    }

}