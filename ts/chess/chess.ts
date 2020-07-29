class ChessSquare {
    private neighbours: any;
    private currentOccupant: any; // occupant of this square (in terms of chess piece)
    private domElem:Element;
    private rank: number; // rank as in chessboard rank

    constructor(elem:Element, n:number){
        this.domElem = elem;
        this.currentOccupant = null;
        this.rank = n;

        this.neighbours = {
            up: null,
            down: null,
            left: null,
            right: null,
            upLeft: null,
            upRight: null,
            downLeft: null,
            downRight: null
        }
    }

    // record that this and n are both neigbours via direction dir (e.g. the square 5,5 will have 8 neighbours: 4,5 via left, 6,5 via right, 4,4 via upLeft, etc...)
    setNeighbour (dir:string, n:ChessSquare, addToBoth:boolean) {
        this.neighbours[dir] = n;

        if (addToBoth) {
            switch(dir) {
                case "left":
                    n.setNeighbour("right", this, false);
                    break;
                case "right":
                    n.setNeighbour("left", this, false);
                    break;
                case "up":
                    n.setNeighbour("down", this, false);
                    break;
                case "down":
                    n.setNeighbour("up", this, false);
                    break;
                case "upLeft":
                    n.setNeighbour("downRight", this, false);
                    break;
                case "upRight":
                    n.setNeighbour("downLeft", this, false);
                    break;
                case "downLeft":
                    n.setNeighbour("upRight", this, false);
                    break;
                case "downRight":
                    n.setNeighbour("upLeft", this, false);
                    break;
            }
        }
    }

    getRank() {
        return this.rank;
    }

    getNeighbour (dir:string) {
        return this.neighbours[dir];
    }

    setOccupant(p:any){
        this.currentOccupant = p;
    }

    getOccupant() {
        return this.currentOccupant;
    }

    getDomElem(){
        return this.domElem;
    }

    /* function to determine whether or not is possible for a chess piece to land on this square, given the conditions imposed by the current player (callerOwner), and whether or not the selected potential move
    can capture on this square (usually true, the except is that a pawn cannot capture on the square directly front of it), and whether a piece can move to a square (WITHOUT) capturing (again, usually true but
    the pawn is the exception because a pawn can move diagonally without capturing a piece) */ 
    verifySquareIsPossibleMove(callerOwner: ChessPlayer, allowCapture: boolean, allowNoCapture:boolean) {
        if (!this.currentOccupant && allowNoCapture) return "tt";
        else if (!this.currentOccupant) return "ff"; 
        else if (this.currentOccupant.owner === callerOwner) return "ff";
        else if (this.currentOccupant.getType === "epp") return "tt";
        else if (this.currentOccupant.getType !== "epp" && allowCapture) return "tf";        
        else return "ff";
    }

    applyCssModifier(mod:string, on:boolean) {
        if (on) this.getDomElem().classList.add(mod);
        else this.getDomElem().classList.remove(mod);
    }

    clearAllModifiers() { // except the chess pieces themseleves, that must be done with another function
        var modifiersArray = ["chessApp__square--possibleMove",
        "chessApp__square--selectedPiece",
        "chessApp__square--hoverEnable",
        "chessApp__square--movingAi"];

        modifiersArray.forEach(mod => {
            this.applyCssModifier(mod, false);
        });
    }
}

class ChessPiece {
    protected owner: ChessPlayer;
    protected sq: ChessSquare;
    protected type: string;
    protected isOnBoard:boolean;
    protected hasMoved:boolean; //used to correctly implement Castling
    protected markedForRemove: boolean;

    possibleMoves: ChessSquare [];

    constructor(o:ChessPlayer, s:ChessSquare, t:string) {
        this.owner = o;
        this.sq = s;
        this.type = t;
        this.possibleMoves = [];
        this.isOnBoard = true;
        this.hasMoved = false;
        this.markedForRemove = false;

        s.setOccupant(this);
        this.addPieceToSquare();
    }

    // check that a piece is in imminent danger of being captured. most often this is used at the start of every turn to assess if the king is in check, and again when choosing a move
    // since illegal moves (which expose the king to capture) have be removed from the UI and the player prevented from doing them
    checkForDanger() {
        var checkDangerInDirection = (dir:string, ...attackers:string[]) => {
            let square = this.sq.getNeighbour(dir);

            let res:number = 0;
    
            while(square) {
                let hasBlockingPiece = false;
                if (square.getOccupant()) attackers.forEach(e => {
                    if (square.getOccupant().getType()===e && square.getOccupant().getOwner().getTeam()!=this.owner.getTeam()) {
                        res = verifyValueOfAttacker(res, square.getOccupant().getValue());
                    }
                    if (square.getOccupant().getType()!=="epp") hasBlockingPiece = true;
                });
    
                square = square.getNeighbour(dir);

                if (hasBlockingPiece) {
                    return res;
                }        
            }
            return res;
        };

        var getKnightSpace = (n1:string, n2:string) => {
            let square = this.sq.getNeighbour(n1);
            if (square) square = square.getNeighbour(n2);
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="knight" && square.getOccupant().getOwner().getTeam()!=this.owner.getTeam()) return square.getOccupant().getValue();
            
            return 0;
        };

        var checkPawnSquares = () => {
            let square = this.sq.getNeighbour(this.owner.getPawnDir() + "Left");
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="pawn" && square.getOccupant().getOwner().getTeam()!=this.owner.getTeam()) return square.getOccupant().getValue();

            square = this.sq.getNeighbour(this.owner.getPawnDir() + "Right");
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="pawn" && square.getOccupant().getOwner().getTeam()!=this.owner.getTeam()) return square.getOccupant().getValue();

            return 0;
        }

        var checkKingSquare = (dir:string) => {
            let square = this.sq.getNeighbour(dir);
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="king" && square.getOccupant().getOwner().getTeam()!=this.owner.getTeam()) return square.getOccupant().getValue();
            
            return 0;
        };

        var verifyValueOfAttacker = (res:number, func:number) => {
            if (func > 0) {
                if (res === 0) res = func;
                else res = Math.min(res, func);
            }

            return res;
        };

        let result = 0;
        
        result = verifyValueOfAttacker(result, checkDangerInDirection("up", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("down", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("left", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("right", "rook", "queen"));

        result = verifyValueOfAttacker(result, checkDangerInDirection("upLeft", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("upRight", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("downLeft", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkDangerInDirection("downRight", "bishop", "queen"));
        
        result = verifyValueOfAttacker(result, getKnightSpace("left", "upLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("left", "downLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("up", "upLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("up", "upRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("right", "upRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("right", "downRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("down", "downLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("down", "downRight"));

        result = verifyValueOfAttacker(result, checkPawnSquares());

        result = verifyValueOfAttacker(result, checkKingSquare("left"));
        result = verifyValueOfAttacker(result, checkKingSquare("right"));
        result = verifyValueOfAttacker(result, checkKingSquare("down"));
        result = verifyValueOfAttacker(result, checkKingSquare("up"));
        result = verifyValueOfAttacker(result, checkKingSquare("upLeft"));
        result = verifyValueOfAttacker(result, checkKingSquare("upRight"));
        result = verifyValueOfAttacker(result, checkKingSquare("downLeft"));
        result = verifyValueOfAttacker(result, checkKingSquare("downRight"));

        return result;
    }

    // similar as above but checks for FRIENDLY pieces instead. This function is only used by the AI to help it make smarter moves. This function leads to emergent behaviour that makes the AI both better
    // at developing its pieces, as well as getting checkmate (especially in sitations where something like a "Scholar's Mate" is available)
    checkForCover() {
        var checkCoverInDirection = (dir:string, ...attackers:string[]) => {
            let square = this.sq.getNeighbour(dir);

            let res:number = 0;
    
            while(square) {
                let hasBlockingPiece = false;
                if (square.getOccupant()) attackers.forEach(e => {
                    if (square.getOccupant().getType()===e && square.getOccupant().getOwner().getTeam()===this.owner.getTeam()) {
                        res = verifyValueOfAttacker(res, square.getOccupant().getValue());
                    }
                    if (square.getOccupant().getType()!=="epp") hasBlockingPiece = true;
                });
    
                square = square.getNeighbour(dir);

                if (hasBlockingPiece) {
                    return res;
                }        
            }
            return res;
        };

        var getKnightSpace = (n1:string, n2:string) => {
            let square = this.sq.getNeighbour(n1);
            if (square) square = square.getNeighbour(n2);
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="knight" && square.getOccupant().getOwner().getTeam()===this.owner.getTeam()) return square.getOccupant().getValue();
            
            return 0;
        };

        var checkPawnSquares = () => {
            let square = this.sq.getNeighbour(this.owner.getPawnDir() + "Left");
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="pawn" && square.getOccupant().getOwner().getTeam()===this.owner.getTeam()) return square.getOccupant().getValue();

            square = this.sq.getNeighbour(this.owner.getPawnDir() + "Right");
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="pawn" && square.getOccupant().getOwner().getTeam()===this.owner.getTeam()) return square.getOccupant().getValue();

            return 0;
        }

        var checkKingSquare = (dir:string) => {
            let square = this.sq.getNeighbour(dir);
            if (square)
                if (square.getOccupant()) 
                    if (square.getOccupant().getType()==="king" && square.getOccupant().getOwner().getTeam()===this.owner.getTeam()) return square.getOccupant().getValue();
            
            return 0;
        };

        var verifyValueOfAttacker = (res:number, func:number) => {
            if (func > 0) {
                if (res === 0) res = func;
                else res = Math.min(res, func);
            }

            return res;
        };

        let result = 0;
        
        result = verifyValueOfAttacker(result, checkCoverInDirection("up", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("down", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("left", "rook", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("right", "rook", "queen"));

        result = verifyValueOfAttacker(result, checkCoverInDirection("upLeft", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("upRight", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("downLeft", "bishop", "queen"));
        result = verifyValueOfAttacker(result, checkCoverInDirection("downRight", "bishop", "queen"));
        
        result = verifyValueOfAttacker(result, getKnightSpace("left", "upLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("left", "downLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("up", "upLeft"));
        result = verifyValueOfAttacker(result, getKnightSpace("up", "upRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("right", "upRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("right", "downRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("down", "upRight"));
        result = verifyValueOfAttacker(result, getKnightSpace("down", "downRight"));

        result = verifyValueOfAttacker(result, checkPawnSquares());

        result = verifyValueOfAttacker(result, checkKingSquare("left"));
        result = verifyValueOfAttacker(result, checkKingSquare("right"));
        result = verifyValueOfAttacker(result, checkKingSquare("down"));
        result = verifyValueOfAttacker(result, checkKingSquare("up"));
        result = verifyValueOfAttacker(result, checkKingSquare("upLeft"));
        result = verifyValueOfAttacker(result, checkKingSquare("upRight"));
        result = verifyValueOfAttacker(result, checkKingSquare("downLeft"));
        result = verifyValueOfAttacker(result, checkKingSquare("downRight"));

        return result;
    }

    // is overwritted by each class which extends ChessPiece: generates a list of moves which are *potentially* possible, these possible moves are then sent into a second step of verification
    // (verifyMoves functions) which eliminates any possible moves that actually are illegal (that is, they expose the king to capture)
    generatePossibleMoves() {
        // to be overridden
    }

    checkHasMoved() {
        return this.hasMoved;
    }

    checkRemovalMarked() {
        return this.markedForRemove;
    }

    // pieces are stored on the board using css and background images, this function takes care of removing any pieces from a square
    removePieceFromSquare() {
        var elem = this.sq.getDomElem();
        var removeModifier = (piece:string) => {
            this.sq.applyCssModifier("chessApp__square--" + piece, false);
        };

        removeModifier("bluePawn");
        removeModifier("blueRook");
        removeModifier("blueKnight");
        removeModifier("blueBishop");
        removeModifier("blueQueen");
        removeModifier("blueKing");
        removeModifier("redPawn");
        removeModifier("redRook");
        removeModifier("redKnight");
        removeModifier("redBishop");
        removeModifier("redQueen");
        removeModifier("redKing");
    }

    // the opposite to that above, note that epp types - En Passant "ghosts" (a temporary 'piece' that is placed on the board to make it easier to get the AI and UI to recognise an
    // en passant capture opportunity) - are not visible on the board, so we can just return instead of adding a css background to the square
    addPieceToSquare() {
        if (this.type==="epp") return;
        this.removePieceFromSquare();

        var modifier = "chessApp__square--" + this.owner.getTeam();
        modifier += this.type[0].toUpperCase();
        modifier += this.type.substring(1);

        this.sq.applyCssModifier(modifier, true);
    }

    applyPossibleMoveCssModifiers(on:boolean) {
        for (let i = 0; i < this.possibleMoves.length; i++) {
            if (on) this.possibleMoves[i].applyCssModifier("chessApp__square--possibleMove", true);
            else this.possibleMoves[i].applyCssModifier("chessApp__square--possibleMove", false);
        }

        this.applyUniqueStyling(on);
    }

    applyUniqueStyling(on:boolean) {
        // to be overridden by extending classes
    }

    /* function to move the piece to the select square,
    there is a distinction made by "trueMove", when the AI is evaluating possible moves + when the game is verifying if a move is actually
    legal, the most effective and efficient way to do it is to actually perform the move, test/evaluate, then revert to the pieces, trueMove is used to ensure these
    fake moves don't actually have severe unintended consequences (also, if a move is fake the UI doesn't need to show the pieces moving around on the board, obviously) */ 
    moveTo(s:ChessSquare, trueMove:boolean) {
        if (trueMove) {
            this.removePieceFromSquare();
            this.applyPossibleMoveCssModifiers(false);
            this.sq.applyCssModifier("chessApp__square--selectedPiece", false);
            this.hasMoved = true;
        }

        this.isOnBoard = true;

        if (this.sq) {
            this.sq.setOccupant(null);
        }

        if (s.getOccupant() !== null) s.getOccupant().leaveBoard(this, trueMove);
        this.sq = s;
        s.setOccupant(this);

        this.handleUniquePieceMove(s, trueMove);
        
        if (trueMove) this.addPieceToSquare();    
    }

    handleUniquePieceMove(s:ChessSquare, trueMove:boolean) {
        // to be overrided where necessary
    }

    handleUniquePieceRemoval(remover: any, trueMove:boolean) {
        // to be overrided where necessary
    }

    handleUniqueMoveVerifications() {
        // to be overrided where necessary
    }

    handleUniqueVerifyCleanup() {
        // to be overrided where necessary
    }

    // used to take pieces off of the board, in the case of trueMove==true: the pieces are marked to be permanantely deleted
    // however, if trueMove==false, the pieces are kind of just 'held in hand', ready to be placed back onto the board once the move has been tested and evaluated
    leaveBoard(remover:any, trueMove:boolean) {
        if (!this.isOnBoard) return;

        if (trueMove) {
            this.markedForRemove = true;
            this.removePieceFromSquare();
        }

        this.handleUniquePieceRemoval(remover, trueMove);

        this.sq.setOccupant(null);
        this.sq = null;
        this.isOnBoard = false;        
    }

    getOnBoard() {
        return this.isOnBoard;
    }

    getOwner() {
        return this.owner;
    }

    getType() {
        return this.type;
    }

    /* these function is overridden for each piece and is used by the AI to plan it's moves
    effectively, each piece has intrinsic value and some pieces have extra value that is gained from it's
    position on the board (e.g. in the case of a pawn: as the pawn gets closer to promotion it's value exponentially climbs to be equal to a queen's instrinsic value).

    The AI will make decisions about sacrificing its pieces to take enemy pieces: these sacrifice decisions are guided by the values of each piece on the board, provided by this getValue() function
    (for example: unless a pawn is on the 7th or 8th rank it isn't worth sacrificing a bishop to capture it)
    */
    getValue() {
        // to be overridden!
    }

    // used to flip the rank for each player's perspective, e.g. for the player whose pawns are going UP the top rank needs to be rank 8 and the bottom rank 1
    // (that last part is correct: rank *ONE*, because this function also changes the rank scale from 0-7 to 1-8)
    rankCleaned() {
        if (this.owner.getPawnDir() === "up") {
            return 8 - this.sq.getRank();
        } else {
            return 1 + this.sq.getRank();
        }
    }

    /* used for pieces like queen,rook,bishop that have the ability to go "infinitely" far in a direction to populate their possible move list
    it repeatedly tries each square in the given direction until it either finds a piece blocking the way or the edge of the board
    
    this function was originally RECURSIVE (I know, wow!), but the interaction with the ChessSquare object is much tidier this way...
    still, it was nice to use recursion for the first time this year! I'll make a note of it when it comes up next year.
    */
    protected checkPossibleMovesInDirection(dir:string) {
        let square = this.sq.getNeighbour(dir);

        while(square) {
            let res = square.verifySquareIsPossibleMove(this.owner, true, true); 
            if (res[0]==="t") {
                this.possibleMoves.push(square);
            }
            
            if (res[1]==="t") {
                square = square.getNeighbour(dir);
            } else square = false;
        }
    }

    // AI works out the score for each move that is possible and verified to not be illegal
    // using the previously defined CheckForDanger and CheckForCover to evaluate how good each move is
    protected aiEvalMove() {
        let score = 500;

        for (let y = 0; y < ChessController.board.length; y++) {
            for (let x = 0; x < ChessController.board[y].length; x++) {

                let examinePiece = ChessController.board[y][x].getOccupant()

                if (examinePiece) {
                    if ((examinePiece.getOwner().getTeam() === this.getOwner().getTeam())) {
                        if (examinePiece.getType() !== "epp")
                            score += examinePiece.getValue();

                        let dangerVal = examinePiece.checkForDanger();
                        if (dangerVal) {
                            score -= 1.1 * examinePiece.getValue();

                            let coverVal = examinePiece.checkForCover();
                            if (coverVal)
                                score += Math.min(Math.max(dangerVal - coverVal, 0), 0.9 * examinePiece.getValue());
                        

                        }

                    } else {
                        if (examinePiece.getType() !== "epp")
                            score -= examinePiece.getValue();

                        let dangerVal = examinePiece.checkForDanger();
                        if (dangerVal) {
                            score += 0.10 * examinePiece.getValue();
                        }
                    }
                }
            }
        }

        return score;
    }

    // remove all moves for which the king would be exposed (REQUIRED FOR PINNED PIECES)
    protected verifyPossibleMoves() {
        this.handleUniqueMoveVerifications();
        let startingSq = this.sq;
        let sparePiece;

        for (let i = 0; i < this.possibleMoves.length; i++) {
            sparePiece = this.possibleMoves[i].getOccupant();
            this.moveTo(this.possibleMoves[i], false);

            let res = this.owner.getKing().checkForDanger();

            if (!res && this.owner.getIsAi()) {
                let score = this.aiEvalMove() + Math.floor(Math.random() * (this.owner.getAiFudge() + Math.max(ChessController.aiRestlessness, 0)) );

                if (score > this.owner.getAiBestDecision().score) {
                    this.owner.setAiBestDecision(this, this.possibleMoves[i], score);
                }
            }

            this.handleUniqueVerifyCleanup();

            if (sparePiece) {
                sparePiece.moveTo(this.possibleMoves[i], false);
            } 

            if (res) {
                this.possibleMoves.splice(i, 1);
                i--;
            }
        }

        this.moveTo(startingSq, false);
    }
}

class ChessPlayer {
    private team:string;
    private pieces:any;
    private myKing: King;
    private pawnDir:string;
    private eppGhost:EppGhost;
    private isAiControlled:boolean;
    private aiBestDecision: {piece: any, sq: ChessSquare, score:number};
    private aiFudge:number;

    constructor(t:string) {
        this.team = t;
        if (t === "blue") this.pawnDir = "up";
        else this.pawnDir = "down";
        this.pieces = [];
        this.isAiControlled = false;
        this.aiBestDecision = {piece:null, sq:null, score:0};
        this.eppGhost = null;
        this.aiFudge = 0;
    }

    getNumPieces() {
        return this.pieces.length;
    }

    addEppGhost(p:Pawn, s:ChessSquare){
        this.eppGhost = new EppGhost(p, s);
    }

    setAiBestDecision(p: any, s: ChessSquare, res:number) {
        this.aiBestDecision = {piece: p, sq: s, score: res};
    }

    getAiBestDecision() {
        return this.aiBestDecision;
    }

    removeEppGhost() {
        if (!this.eppGhost) return;
        this.eppGhost.forceRemove();
        this.eppGhost = null;
    }

    setAi(b:boolean) {
        this.isAiControlled = b;
        if (b) this.aiFudge = 15;
    }

    getIsAi() {
        return this.isAiControlled;
    }

    getAiFudge() {
        return this.aiFudge;
    }

    getTeam() {
        return this.team;
    }
    
    addPiece(pieceName:string, loc:ChessSquare) {
        var s = pieceName.toString().toLowerCase();
        var p;
        switch (s) {
            case "pawn":
            case "p":
                p = new Pawn(this, loc);
                break;
            case "rook":
            case "r":
                p = new Rook(this, loc);
                break;
            case "knight":
            case "k":
                p = new Knight(this, loc);
                break;
            case "bishop":
            case "b":
                p = new Bishop(this, loc);
                break;
            case "queen":
            case "q":
                p = new Queen(this, loc);
                break;
            case "king":
                p = new King(this, loc);
                this.myKing = p;
                break;
            default:
                return;
        }

        this.pieces.push(p);
    }

    getPawnDir() {
        return this.pawnDir;
    }

    getKing() {
        return this.myKing;
    }

    getPossibleMoves() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].generatePossibleMoves();
        }
    }

    clearPlayer() {
        while (this.pieces.length) {
            this.pieces[0].leaveBoard(null, true);
            this.pieces[0] = null;
            this.pieces.splice(0, 1);
        }
    }

    beginTurn() {
        // permanently delete any pieces marked for removal
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].markedForRemove) {
                this.pieces[i] = null;
                this.pieces.splice(i, 1);
                i--;
            }
        }

        if (this.getKing().checkForDanger() && !this.isAiControlled) ChessController.showMsgBoxTemp("Your king is in check!");

        this.removeEppGhost();

        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].sq.applyCssModifier("chessApp__square--hoverEnable", true);
        }

        this.aiBestDecision = {piece: null, sq: null, score: -100000};

        this.getPossibleMoves();

        let moveIsPossible = false;
        for (let i = 0; i < this.pieces.length && !moveIsPossible; i++) {
            moveIsPossible = ( this.pieces[i].possibleMoves.length > 0 );
        }

        if (!moveIsPossible) {
            ChessController.toggleMsgBox(true, "Checkmate!");
            return;
        }

        if (this.isAiControlled) {
            if (this.aiBestDecision.score < 210 - this.pieces.length * 30) { // no good move is available and the game looks hopeless
                ChessController.toggleMsgBox(true, `${this.team[0].toUpperCase()}${this.team.substring(1)} resigned!`);
                return;
            }

            if(ChessController.aiRestlessness >= 100) {
                /* AI gets restless if the game doesn't meaningfully progress after a certain amount of time, as the AI
                gets restless it will be willing to make increasingly aggressive moves to try break the deadlock
                if the AI cannot break the deadlock the game will eventually end as a draw */ 
                ChessController.toggleMsgBox(true, `Game ends as a draw.`);
                return
            }

            this.aiBestDecision.sq.applyCssModifier("chessApp__square--movingAi", true);
            this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--movingAi", true);

            ChessController.timeoutHandle =  setTimeout(() => {
                this.aiBestDecision.sq.applyCssModifier("chessApp__square--movingAi", false);
                this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--movingAi", false);

                if (this.aiBestDecision.piece.getType() === "king") {
                    if (this.aiBestDecision.sq === this.aiBestDecision.piece.castleMoves["left"]) {
                        this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        this.aiBestDecision.piece.castle("left");
                    } else if (this.aiBestDecision.sq === this.aiBestDecision.piece.castleMoves["right"]) {
                        this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        this.aiBestDecision.piece.castle("right");
                    } else {
                        this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        this.aiBestDecision.piece.moveTo(this.aiBestDecision.sq, true); 
                    }
                } else {
                    this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                    this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                    this.aiBestDecision.piece.moveTo(this.aiBestDecision.sq, true);                    
                }
                ChessController.selectedPiece = this.aiBestDecision.piece;
                ChessController.endTurn();
            }, 2000);
        } else {
            ChessController.timeoutHandle = setTimeout(() => {ChessController.unlockBoardInput();}, 200);
        }

        
    }

    endTurn() {
        for (let i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].type === "pawn") this.pieces[i].checkPromotion();
        }
    }
}

class Pawn extends ChessPiece {
    private eppSpot: ChessSquare;
    private eppId: string;

    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "pawn");
        this.eppSpot = null;
        this.eppId = null;
    }

    generatePossibleMoves() {
        this.eppSpot = null;
        this.eppId = null;
        this.possibleMoves = [];
    
        // check diagonal squares, which are for capturing other pieces
        let square = this.sq.getNeighbour(this.owner.getPawnDir() + "Left");
        if (square) {
                let res = square.verifySquareIsPossibleMove(this.owner, true, false);
                if (res[0]==="t")
                    this.possibleMoves.push(square);
        }

        square = this.sq.getNeighbour(this.owner.getPawnDir() + "Right");
        if (square) {
                let res = square.verifySquareIsPossibleMove(this.owner, true, false);
                if (res[0]==="t")
                    this.possibleMoves.push(square);
        }

        // check the square right ahead
        square = this.sq.getNeighbour(this.owner.getPawnDir());
        if (square) {                
                let res = square.verifySquareIsPossibleMove(this.owner, false, true);
                if (res[0] === "t" ) {
                    this.possibleMoves.push(square);
                    if (!this.hasMoved) {
                        // if this is the pawn's first move check the square even further ahead
                        this.eppSpot = square; // prepare the ghost for en-passant-capture
                        square = square.getNeighbour(this.owner.getPawnDir());
                        if (square) {
                            res = square.verifySquareIsPossibleMove(this.owner, false, true);
                            if (res[0] === "t") {
                                this.possibleMoves.push(square);
                                this.eppId = square.getDomElem().id;                               
                            } else {
                                this.eppSpot = null;
                                this.eppId = null;
                            }
                        }
                    }                    
                }
        }

        this.verifyPossibleMoves();
    }

    getValue() {
        return 35 + Math.pow(0.762 * this.rankCleaned(), 3);
    }

    handleUniquePieceMove(s:ChessSquare, trueMove:boolean) {
        if (this.eppId === s.getDomElem().id) {
            this.owner.addEppGhost(this, this.eppSpot);
        }
    }

    handleUniqueVerifyCleanup() {
        this.owner.removeEppGhost();
    }

    private promoteToQueen() {
        let sq = this.sq;
        this.leaveBoard(null, true);
        this.owner.addPiece("queen", sq);
    }

    // if the piece is on the last rank, it is promoted into a queen (this is checked at the end of each turn)
    checkPromotion () {
        if (this.markedForRemove) return;
        if (!this.sq.getNeighbour(this.owner.getPawnDir() ) ) this.promoteToQueen();
    }
    
}

class EppGhost extends ChessPiece {
    private parentPiece:Pawn;

    constructor(p:Pawn, s:ChessSquare) {
        super(p.getOwner(), s, "epp");
        this.markedForRemove = true;
        this.parentPiece = p;
    }

    forceRemove() {
        if (this.sq) {
            this.sq.setOccupant(null);
            this.sq = null;
        }
        this.isOnBoard = false;

        this.markedForRemove = true;

    }

    getValue() {
        // DOESN'T WORK IF THE PARENT PIECE WAS ELIMINATED!
        if (this.parentPiece.getOnBoard())
            return this.parentPiece.getValue();
        else
            return 0;
    }

    handleUniquePieceMove(s:ChessSquare, trueMove:boolean) {
        this.parentPiece.moveTo(s.getNeighbour(this.parentPiece.getOwner().getPawnDir()), trueMove);
    }

    handleUniquePieceRemoval(remover:any, trueMove:boolean) {
        if (remover) {
            if (remover.getType() === "pawn") this.parentPiece.leaveBoard(remover, trueMove);
        }
    }
}

class Rook extends ChessPiece {
    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "rook");
    }

    generatePossibleMoves() {
        this.possibleMoves = [];
        
        this.checkPossibleMovesInDirection("up");
        this.checkPossibleMovesInDirection("down");
        this.checkPossibleMovesInDirection("left");
        this.checkPossibleMovesInDirection("right");

        this.verifyPossibleMoves();
    }

    getValue() {
        return 100 + 8 * this.rankCleaned();
    }
}

class Knight extends ChessPiece {
    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "knight");
    }

    generatePossibleMoves() {

        var getKnightSpace = (n1:string, n2:string) => {
            let square = this.sq.getNeighbour(n1);
            if (square) square = square.getNeighbour(n2);
            if (square) {
                    let res = square.verifySquareIsPossibleMove(this.owner, true, true);
                    if (res[0]==="t")
                        this.possibleMoves.push(square);
            }
        };

        this.possibleMoves = [];
    
        getKnightSpace("left", "upLeft");
        getKnightSpace("left", "downLeft");
        getKnightSpace("up", "upLeft");
        getKnightSpace("up", "upRight");
        getKnightSpace("right", "upRight");
        getKnightSpace("right", "downRight");
        getKnightSpace("down", "downLeft");
        getKnightSpace("down", "downRight");

        this.verifyPossibleMoves();
    }

    getValue() {
        var additive = 0;
        if (this.rankCleaned() > 1) additive = 14;

        return 100 + 3 * this.rankCleaned() + additive;
    }
}

class Bishop extends ChessPiece {
    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "bishop");
    }

    generatePossibleMoves() {
        this.possibleMoves = [];
        
        this.checkPossibleMovesInDirection("upLeft");
        this.checkPossibleMovesInDirection("upRight");
        this.checkPossibleMovesInDirection("downLeft");
        this.checkPossibleMovesInDirection("downRight");

        this.verifyPossibleMoves();

    }

    getValue() {
        var additive = 0;
        if (this.rankCleaned() > 1) additive = 18;
        return 120 + 2 * this.rankCleaned() + additive;
    }
}

class Queen extends ChessPiece {
    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "queen");
    }

    generatePossibleMoves() {
        this.possibleMoves = [];

        this.checkPossibleMovesInDirection("up");
        this.checkPossibleMovesInDirection("down");
        this.checkPossibleMovesInDirection("left");
        this.checkPossibleMovesInDirection("right");

        this.checkPossibleMovesInDirection("upLeft");
        this.checkPossibleMovesInDirection("upRight");
        this.checkPossibleMovesInDirection("downLeft");
        this.checkPossibleMovesInDirection("downRight");

        this.verifyPossibleMoves();
    }

    getValue() {
        return 265 + 2 * this.rankCleaned();
    }
}

class King extends ChessPiece {
    castleMoves: any;
    constructor(o:ChessPlayer, s:ChessSquare) {
        super(o, s, "king");
        this.castleMoves = {left: null, right: null};
    }

    castle (dir:string) {
        let sparePiece = null;
        if (dir==="left") {
            sparePiece = this.castleMoves["left"].getOccupant();
            this.moveTo(this.sq.getNeighbour("left").getNeighbour("left"), true);
            sparePiece.moveTo(this.sq.getNeighbour("right"), true);
        }

        if (dir==="right") {
            sparePiece = this.castleMoves["right"].getOccupant();
            this.moveTo(this.sq.getNeighbour("right").getNeighbour("right"), true);
            sparePiece.moveTo(this.sq.getNeighbour("left"), true);
        }

    }

    applyUniqueStyling(on: boolean) {
        if (this.castleMoves["left"]) {
            if (on) this.castleMoves["left"].getDomElem().classList.add("chessApp__square--possibleMove");
            else this.castleMoves["left"].getDomElem().classList.remove("chessApp__square--possibleMove");
        }

        if (this.castleMoves["right"]) {
            if (on) this.castleMoves["right"].getDomElem().classList.add("chessApp__square--possibleMove");
            else this.castleMoves["right"].getDomElem().classList.remove("chessApp__square--possibleMove");
        }
    }

    handleUniqueMoveVerifications() {
        // Need to remove all epp ghosts between moves!

        let startingSq = this.sq;
        let sparePiece;

        const aiCastlingScore = 60;

        if (this.castleMoves["left"]) {
            sparePiece = this.castleMoves["left"].getOccupant();
            this.moveTo(this.sq.getNeighbour("left").getNeighbour("left"), false);
            sparePiece.moveTo(this.sq.getNeighbour("right"), false);

            let res = this.owner.getKing().checkForDanger();

            if (!res && this.owner.getIsAi()) {
                let score = aiCastlingScore + this.aiEvalMove() + Math.floor(Math.random() * this.owner.getAiFudge());

                if (score > this.owner.getAiBestDecision().score) {
                    this.owner.setAiBestDecision(this, this.castleMoves["left"], score);
                }
            }

            sparePiece.moveTo(this.castleMoves["left"], false);
            if (res) {
                this.castleMoves["left"] = null;
            }
            this.moveTo(startingSq, false);
        }

        if (this.castleMoves["right"]) {
            sparePiece = this.castleMoves["right"].getOccupant();
            this.moveTo(this.sq.getNeighbour("right").getNeighbour("right"), false);
            sparePiece.moveTo(this.sq.getNeighbour("left"), false);

            let res = this.owner.getKing().checkForDanger();

            if (!res && this.owner.getIsAi()) {
                let score = aiCastlingScore + this.aiEvalMove() + Math.floor(Math.random() * this.owner.getAiFudge());

                if (score > this.owner.getAiBestDecision().score) {
                    this.owner.setAiBestDecision(this, this.castleMoves["right"], score);
                }
            }

            sparePiece.moveTo(this.castleMoves["right"], false);
            if (res) {
                this.castleMoves["right"] = null;
            }
            this.moveTo(startingSq, false);
        }
    }

    generatePossibleMoves() {
        var checkNeighbour = (dir:string) => {
            let square = this.sq.getNeighbour(dir);
            if (square) {
                let res = square.verifySquareIsPossibleMove(this.owner, true, true);
                if (res[0]==="t")
                    this.possibleMoves.push(square);
            }                 
        };

        var checkCastle = (dir:string, sq:ChessSquare):any => {
            let square = sq.getNeighbour(dir);
            if (square){
                if (!square.getOccupant()) checkCastle(dir, square);
                else if (square.getOccupant().getType() === "rook" && !square.getOccupant().checkHasMoved()) this.castleMoves[dir] = square;
                else return;
            }
        };

        this.castleMoves = {left: null, right: null};
        this.possibleMoves = [];

        checkNeighbour("left");
        checkNeighbour("right");
        checkNeighbour("down");
        checkNeighbour("up");
        checkNeighbour("upLeft");
        checkNeighbour("upRight");
        checkNeighbour("downLeft");
        checkNeighbour("downRight");

        if (!this.hasMoved) {
            checkCastle("left", this.sq);
            checkCastle("right", this.sq);
        }

        this.verifyPossibleMoves();
    }

    applyCastleMoveCssModifiers(on:boolean) {
        for (let i = 0; i < this.possibleMoves.length; i++) {
            if (on) this.castleMoves[i].getDomElem().classList.add("chessApp__square--possibleMove");
            else this.castleMoves[i].getDomElem().classList.remove("chessApp__square--possibleMove");
        }
    }

    getValue() {
        return 250;
    }
}

class ChessController {
    static inputState: string;
    static currentPlayer: number;
    static selectedPiece: any;
    static timeoutHandle: any;

    static aiRestlessness: number;
    static numPiecesPrevTurn: number;

    static players : ChessPlayer[];

    static boardInputIsLocked = true;

    static board: ChessSquare [][];

    static lockBoardInput() {
        ChessController.boardInputIsLocked = true;
    }

    static unlockBoardInput() {

        ChessController.boardInputIsLocked = false
    }

    static initApp() {
        this.inputState = 'na';
        this.lockBoardInput();
        var domElem:any;
        ChessController.board = [];
        ChessController.players = [];

        // generate board
        for (let y = 0; y < 8; y++) {
            ChessController.board[y] = [];
            for (let x = 0; x < 8; x++) {
                domElem = short.create("div", `m${x},${y}`, ["chessApp__square"]);
                (x + y) % 2 ? domElem.classList.add("chessApp__square--dark") : domElem.classList.add("chessApp__square--light");
                short.byId("chessAppCon").appendChild(domElem);

                ChessController.board[y][x] = new ChessSquare(domElem, y);

                if (x > 0) {
                    ChessController.board[y][x].setNeighbour("left", ChessController.board[y][x - 1], true);
                    if (y > 0) ChessController.board[y][x].setNeighbour("upLeft", ChessController.board[y - 1][x - 1], true);
                }

                if (y > 0) {
                    ChessController.board[y][x].setNeighbour("up", ChessController.board[y - 1][x], true);
                    if (x < 7) ChessController.board[y][x].setNeighbour("upRight", ChessController.board[y - 1][x + 1], true);
                }
            }
        }

        ChessController.players.push(new ChessPlayer("blue"));
        ChessController.players.push(new ChessPlayer("red"));

        short.byId("chessAppCon").addEventListener("click", ChessController.clickOnSquare);
    }

    static clickOnSquare(event:Event) {
        if (ChessController.boardInputIsLocked) return;
        
        var elem = event.target as Element;
        
        if (elem.id[0] === "z") elem = elem.parentElement;
        if (elem.id[0] !== "m") return;
        

        var dims = elem.id.substring(1).split(",");
        ChessController.processInput(ChessController.board[Number(dims[1])][Number(dims[0])] );           

    }

    static prepareBoardPieces() {
        // prepare blue
        for (let i = 0; i < 8; i++) {
            ChessController.players[0].addPiece("pawn", ChessController.board[6][i]);
        }

        ChessController.players[0].addPiece("rook", ChessController.board[7][0]);
        ChessController.players[0].addPiece("rook", ChessController.board[7][7]);

        ChessController.players[0].addPiece("knight", ChessController.board[7][1]);
        ChessController.players[0].addPiece("knight", ChessController.board[7][6]);

        ChessController.players[0].addPiece("bishop", ChessController.board[7][2]);
        ChessController.players[0].addPiece("bishop", ChessController.board[7][5]);

        ChessController.players[0].addPiece("queen", ChessController.board[7][3]);
        ChessController.players[0].addPiece("king", ChessController.board[7][4]);

        // prepare red
        for (let i = 0; i < 8; i++) {
            ChessController.players[1].addPiece("pawn", ChessController.board[1][i]);
        }

        ChessController.players[1].addPiece("rook", ChessController.board[0][0]);
        ChessController.players[1].addPiece("rook", ChessController.board[0][7]);

        ChessController.players[1].addPiece("knight", ChessController.board[0][1]);
        ChessController.players[1].addPiece("knight", ChessController.board[0][6]);

        ChessController.players[1].addPiece("bishop", ChessController.board[0][2]);
        ChessController.players[1].addPiece("bishop", ChessController.board[0][5]);

        ChessController.players[1].addPiece("queen", ChessController.board[0][3]);
        ChessController.players[1].addPiece("king", ChessController.board[0][4]);

    }

    static startPvpGame() {
        ChessController.players[0].setAi(false);
        ChessController.players[1].setAi(false);

        short.byId("chessMidBtn").innerText = "end game"
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");


        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    }
    
    static startPvcGame() {
        ChessController.players[0].setAi(false);
        ChessController.players[1].setAi(false);
        let tRand = Math.floor((Math.random() - 0.005) * 2);
        ChessController.players[ tRand].setAi(true);
        ChessController.aiRestlessness = -160;
        ChessController.numPiecesPrevTurn = 0;

        if (tRand === 1) ChessController.showMsgBoxTemp("You are BLUE");
        else ChessController.showMsgBoxTemp("You are RED");

        short.byId("chessMidBtn").innerText = "end game"
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");


        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    }

    static startCvcGame() {
        ChessController.players[0].setAi(true);
        ChessController.players[1].setAi(true);
        ChessController.aiRestlessness = -160;
        ChessController.numPiecesPrevTurn = 0;

        short.byId("chessMidBtn").innerText = "end game"
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");


        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    }
    
    static endGame() {
        ChessController.clearBoardModifiers();

        ChessController.players[0].clearPlayer();
        ChessController.players[1].clearPlayer();
        clearTimeout(ChessController.timeoutHandle);

        ChessController.inputState = "na";
        ChessController.toggleMsgBox(false);

        short.byId("chessMidBtn").innerText = "player vs. CPU"
        short.byId("chessLeftBtn").classList.remove("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.remove("chessBtnRow__btn--disabled");
        
    }

    static beginTurn() {
        ChessController.selectedPiece = null;
        ChessController.inputState = "pS";
        ChessController.lockBoardInput();
        
        let numPiecesThisTurn = ChessController.players[0].getNumPieces() + ChessController.players[1].getNumPieces();

        if (numPiecesThisTurn !== ChessController.numPiecesPrevTurn && ChessController.aiRestlessness > 0){
            ChessController.aiRestlessness = 0;
            ChessController.numPiecesPrevTurn = numPiecesThisTurn;
        } else {
            ChessController.aiRestlessness += 4;
        }

        ChessController.timeoutHandle = setTimeout(() => {ChessController.players[ChessController.currentPlayer].beginTurn();}, 200);
    }

    static endTurn() {
        ChessController.clearBoardModifiers();
        ChessController.selectedPiece.getOwner().endTurn();
        ChessController.currentPlayer = (ChessController.currentPlayer + 1) % 2;


        ChessController.timeoutHandle = setTimeout(() => {ChessController.beginTurn(); }, 200);
    }

    static processInput(sq: ChessSquare) {
        ChessController.lockBoardInput();
        switch(ChessController.inputState) {
            case "pS":
                // player is selecting a piece
                ChessController.pieceSelection(sq);
                break;
            case "mC":
                // player has selected piece, is choosing where to move it
                ChessController.moveChoice(sq);
                break;
        }
    }

    static pieceSelection(sq: ChessSquare) {
        if (sq.getOccupant() && sq.getOccupant().getOwner().getTeam() === ChessController.players[this.currentPlayer].getTeam()) {
            ChessController.selectedPiece = sq.getOccupant();

            ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", true);
            ChessController.selectedPiece.applyPossibleMoveCssModifiers(true);

            ChessController.inputState = "mC";
        }
        ChessController.unlockBoardInput();
    }

    static moveChoice(sq: ChessSquare) {
        if (ChessController.selectedPiece.sq === sq) { 
            ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
            ChessController.selectedPiece.applyPossibleMoveCssModifiers(false);
            ChessController.inputState = "pS";
            ChessController.selectedPiece = null;
            
            ChessController.unlockBoardInput();

            return;
        }

        if (ChessController.selectedPiece.getType() === "king") {
            if (sq === ChessController.selectedPiece.castleMoves["left"]) {
                ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                ChessController.selectedPiece.applyPossibleMoveCssModifiers(false);
                ChessController.selectedPiece.castle("left");
                ChessController.endTurn();
                return;
            }
            if (sq === ChessController.selectedPiece.castleMoves["right"]) {
                ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                ChessController.selectedPiece.applyPossibleMoveCssModifiers(false);
                ChessController.selectedPiece.castle("right");
                ChessController.endTurn();
                return;
            }
        }
        
        let selectedMove: ChessSquare = null;
        for (let i = 0; i < ChessController.selectedPiece.possibleMoves.length && !selectedMove; i++) {
            if (ChessController.selectedPiece.possibleMoves[i] === sq) {  
                              
                selectedMove = sq;
            }
        }

        if (!selectedMove) {
            ChessController.unlockBoardInput();
            return;            
        }

        ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
        ChessController.selectedPiece.applyPossibleMoveCssModifiers(false);
        ChessController.selectedPiece.moveTo(selectedMove, true);

        ChessController.endTurn();
        return;
    }

    static leftBtn(){
        if (ChessController.inputState=="na") {
            ChessController.startPvpGame();
        }
    }

    static middleBtn(){
        if (ChessController.inputState=="na") {
            ChessController.startPvcGame(); 
        } else {
            ChessController.endGame();
        }
    }

    static rightBtn(){
        if (ChessController.inputState=="na") {
            ChessController.startCvcGame();   
        }
    }

    static showMsgBoxTemp(msg:string){
        ChessController.toggleMsgBox(true, msg);
        ChessController.timeoutHandle = setTimeout(()=>{ChessController.toggleMsgBox(false);}, 2500)
    }

    static toggleMsgBox(on:boolean, msg = ""){
        if (on) {
            if (!msg) return;
            short.byId("chessMsgBox").innerText = msg;
            short.byId("chessMsgBox").classList.add("chessApp__msgBox--visible");
        }
        else short.byId("chessMsgBox").classList.remove("chessApp__msgBox--visible");
    }

    static clearBoardModifiers() {
        ChessController.board.forEach(a => {
            a.forEach (e => {
                e.clearAllModifiers();
            });
        });
    }
}