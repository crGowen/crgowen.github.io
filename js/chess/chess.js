var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChessSquare = (function () {
    function ChessSquare(elem, n) {
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
        };
    }
    ChessSquare.prototype.setNeighbour = function (dir, n, addToBoth) {
        this.neighbours[dir] = n;
        if (addToBoth) {
            switch (dir) {
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
    };
    ChessSquare.prototype.getRank = function () {
        return this.rank;
    };
    ChessSquare.prototype.getNeighbour = function (dir) {
        return this.neighbours[dir];
    };
    ChessSquare.prototype.setOccupant = function (p) {
        this.currentOccupant = p;
    };
    ChessSquare.prototype.getOccupant = function () {
        return this.currentOccupant;
    };
    ChessSquare.prototype.getDomElem = function () {
        return this.domElem;
    };
    ChessSquare.prototype.verifySquareIsPossibleMove = function (callerOwner, allowCapture, allowNoCapture) {
        if (!this.currentOccupant && allowNoCapture)
            return "tt";
        else if (!this.currentOccupant)
            return "ff";
        else if (this.currentOccupant.owner === callerOwner)
            return "ff";
        else if (this.currentOccupant.getType === "epp")
            return "tt";
        else if (this.currentOccupant.getType !== "epp" && allowCapture)
            return "tf";
        else
            return "ff";
    };
    ChessSquare.prototype.applyCssModifier = function (mod, on) {
        if (on)
            this.getDomElem().classList.add(mod);
        else
            this.getDomElem().classList.remove(mod);
    };
    ChessSquare.prototype.clearAllModifiers = function () {
        var _this = this;
        var modifiersArray = ["chessApp__square--possibleMove",
            "chessApp__square--selectedPiece",
            "chessApp__square--hoverEnable",
            "chessApp__square--movingAi"];
        modifiersArray.forEach(function (mod) {
            _this.applyCssModifier(mod, false);
        });
    };
    return ChessSquare;
}());
var ChessPiece = (function () {
    function ChessPiece(o, s, t) {
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
    ChessPiece.prototype.checkForDanger = function () {
        var _this = this;
        var checkDangerInDirection = function (dir) {
            var attackers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                attackers[_i - 1] = arguments[_i];
            }
            var square = _this.sq.getNeighbour(dir);
            var res = 0;
            var _loop_1 = function () {
                var hasBlockingPiece = false;
                if (square.getOccupant())
                    attackers.forEach(function (e) {
                        if (square.getOccupant().getType() === e && square.getOccupant().getOwner().getTeam() != _this.owner.getTeam()) {
                            res = verifyValueOfAttacker(res, square.getOccupant().getValue());
                        }
                        if (square.getOccupant().getType() !== "epp")
                            hasBlockingPiece = true;
                    });
                square = square.getNeighbour(dir);
                if (hasBlockingPiece) {
                    return { value: res };
                }
            };
            while (square) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return res;
        };
        var getKnightSpace = function (n1, n2) {
            var square = _this.sq.getNeighbour(n1);
            if (square)
                square = square.getNeighbour(n2);
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "knight" && square.getOccupant().getOwner().getTeam() != _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var checkPawnSquares = function () {
            var square = _this.sq.getNeighbour(_this.owner.getPawnDir() + "Left");
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "pawn" && square.getOccupant().getOwner().getTeam() != _this.owner.getTeam())
                        return square.getOccupant().getValue();
            square = _this.sq.getNeighbour(_this.owner.getPawnDir() + "Right");
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "pawn" && square.getOccupant().getOwner().getTeam() != _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var checkKingSquare = function (dir) {
            var square = _this.sq.getNeighbour(dir);
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "king" && square.getOccupant().getOwner().getTeam() != _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var verifyValueOfAttacker = function (res, func) {
            if (func > 0) {
                if (res === 0)
                    res = func;
                else
                    res = Math.min(res, func);
            }
            return res;
        };
        var result = 0;
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
    };
    ChessPiece.prototype.checkForCover = function () {
        var _this = this;
        var checkCoverInDirection = function (dir) {
            var attackers = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                attackers[_i - 1] = arguments[_i];
            }
            var square = _this.sq.getNeighbour(dir);
            var res = 0;
            var _loop_2 = function () {
                var hasBlockingPiece = false;
                if (square.getOccupant())
                    attackers.forEach(function (e) {
                        if (square.getOccupant().getType() === e && square.getOccupant().getOwner().getTeam() === _this.owner.getTeam()) {
                            res = verifyValueOfAttacker(res, square.getOccupant().getValue());
                        }
                        if (square.getOccupant().getType() !== "epp")
                            hasBlockingPiece = true;
                    });
                square = square.getNeighbour(dir);
                if (hasBlockingPiece) {
                    return { value: res };
                }
            };
            while (square) {
                var state_2 = _loop_2();
                if (typeof state_2 === "object")
                    return state_2.value;
            }
            return res;
        };
        var getKnightSpace = function (n1, n2) {
            var square = _this.sq.getNeighbour(n1);
            if (square)
                square = square.getNeighbour(n2);
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "knight" && square.getOccupant().getOwner().getTeam() === _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var checkPawnSquares = function () {
            var square = _this.sq.getNeighbour(_this.owner.getPawnDir() + "Left");
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "pawn" && square.getOccupant().getOwner().getTeam() === _this.owner.getTeam())
                        return square.getOccupant().getValue();
            square = _this.sq.getNeighbour(_this.owner.getPawnDir() + "Right");
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "pawn" && square.getOccupant().getOwner().getTeam() === _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var checkKingSquare = function (dir) {
            var square = _this.sq.getNeighbour(dir);
            if (square)
                if (square.getOccupant())
                    if (square.getOccupant().getType() === "king" && square.getOccupant().getOwner().getTeam() === _this.owner.getTeam())
                        return square.getOccupant().getValue();
            return 0;
        };
        var verifyValueOfAttacker = function (res, func) {
            if (func > 0) {
                if (res === 0)
                    res = func;
                else
                    res = Math.min(res, func);
            }
            return res;
        };
        var result = 0;
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
    };
    ChessPiece.prototype.generatePossibleMoves = function () {
    };
    ChessPiece.prototype.checkHasMoved = function () {
        return this.hasMoved;
    };
    ChessPiece.prototype.checkRemovalMarked = function () {
        return this.markedForRemove;
    };
    ChessPiece.prototype.removePieceFromSquare = function () {
        var _this = this;
        var elem = this.sq.getDomElem();
        var removeModifier = function (piece) {
            _this.sq.applyCssModifier("chessApp__square--" + piece, false);
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
    };
    ChessPiece.prototype.addPieceToSquare = function () {
        if (this.type === "epp")
            return;
        this.removePieceFromSquare();
        var modifier = "chessApp__square--" + this.owner.getTeam();
        modifier += this.type[0].toUpperCase();
        modifier += this.type.substring(1);
        this.sq.applyCssModifier(modifier, true);
    };
    ChessPiece.prototype.applyPossibleMoveCssModifiers = function (on) {
        for (var i = 0; i < this.possibleMoves.length; i++) {
            if (on)
                this.possibleMoves[i].applyCssModifier("chessApp__square--possibleMove", true);
            else
                this.possibleMoves[i].applyCssModifier("chessApp__square--possibleMove", false);
        }
        this.applyUniqueStyling(on);
    };
    ChessPiece.prototype.applyUniqueStyling = function (on) {
    };
    ChessPiece.prototype.moveTo = function (s, trueMove) {
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
        if (s.getOccupant() !== null)
            s.getOccupant().leaveBoard(this, trueMove);
        this.sq = s;
        s.setOccupant(this);
        this.handleUniquePieceMove(s, trueMove);
        if (trueMove)
            this.addPieceToSquare();
    };
    ChessPiece.prototype.handleUniquePieceMove = function (s, trueMove) {
    };
    ChessPiece.prototype.handleUniquePieceRemoval = function (remover, trueMove) {
    };
    ChessPiece.prototype.handleUniqueMoveVerifications = function () {
    };
    ChessPiece.prototype.handleUniqueVerifyCleanup = function () {
    };
    ChessPiece.prototype.leaveBoard = function (remover, trueMove) {
        if (!this.isOnBoard)
            return;
        if (trueMove) {
            this.markedForRemove = true;
            this.removePieceFromSquare();
        }
        this.handleUniquePieceRemoval(remover, trueMove);
        this.sq.setOccupant(null);
        this.sq = null;
        this.isOnBoard = false;
    };
    ChessPiece.prototype.getOnBoard = function () {
        return this.isOnBoard;
    };
    ChessPiece.prototype.getOwner = function () {
        return this.owner;
    };
    ChessPiece.prototype.getType = function () {
        return this.type;
    };
    ChessPiece.prototype.getValue = function () {
    };
    ChessPiece.prototype.rankCleaned = function () {
        if (this.owner.getPawnDir() === "up") {
            return 8 - this.sq.getRank();
        }
        else {
            return 1 + this.sq.getRank();
        }
    };
    ChessPiece.prototype.checkPossibleMovesInDirection = function (dir) {
        var square = this.sq.getNeighbour(dir);
        while (square) {
            var res = square.verifySquareIsPossibleMove(this.owner, true, true);
            if (res[0] === "t") {
                this.possibleMoves.push(square);
            }
            if (res[1] === "t") {
                square = square.getNeighbour(dir);
            }
            else
                square = false;
        }
    };
    ChessPiece.prototype.aiEvalMove = function () {
        var score = 500;
        for (var y = 0; y < ChessController.board.length; y++) {
            for (var x = 0; x < ChessController.board[y].length; x++) {
                var examinePiece = ChessController.board[y][x].getOccupant();
                if (examinePiece) {
                    if ((examinePiece.getOwner().getTeam() === this.getOwner().getTeam())) {
                        if (examinePiece.getType() !== "epp")
                            score += examinePiece.getValue();
                        var dangerVal = examinePiece.checkForDanger();
                        if (dangerVal) {
                            score -= 1.1 * examinePiece.getValue();
                            var coverVal = examinePiece.checkForCover();
                            if (coverVal)
                                score += Math.min(Math.max(dangerVal - coverVal, 0), 0.9 * examinePiece.getValue());
                        }
                    }
                    else {
                        if (examinePiece.getType() !== "epp")
                            score -= examinePiece.getValue();
                        var dangerVal = examinePiece.checkForDanger();
                        if (dangerVal) {
                            score += 0.10 * examinePiece.getValue();
                        }
                    }
                }
            }
        }
        return score;
    };
    ChessPiece.prototype.verifyPossibleMoves = function () {
        this.handleUniqueMoveVerifications();
        var startingSq = this.sq;
        var sparePiece;
        for (var i = 0; i < this.possibleMoves.length; i++) {
            sparePiece = this.possibleMoves[i].getOccupant();
            this.moveTo(this.possibleMoves[i], false);
            var res = this.owner.getKing().checkForDanger();
            if (!res && this.owner.getIsAi()) {
                var score = this.aiEvalMove() + Math.floor(Math.random() * (this.owner.getAiFudge() + Math.max(ChessController.aiRestlessness, 0)));
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
    };
    return ChessPiece;
}());
var ChessPlayer = (function () {
    function ChessPlayer(t) {
        this.team = t;
        if (t === "blue")
            this.pawnDir = "up";
        else
            this.pawnDir = "down";
        this.pieces = [];
        this.isAiControlled = false;
        this.aiBestDecision = { piece: null, sq: null, score: 0 };
        this.eppGhost = null;
        this.aiFudge = 0;
    }
    ChessPlayer.prototype.getNumPieces = function () {
        return this.pieces.length;
    };
    ChessPlayer.prototype.addEppGhost = function (p, s) {
        this.eppGhost = new EppGhost(p, s);
    };
    ChessPlayer.prototype.setAiBestDecision = function (p, s, res) {
        this.aiBestDecision = { piece: p, sq: s, score: res };
    };
    ChessPlayer.prototype.getAiBestDecision = function () {
        return this.aiBestDecision;
    };
    ChessPlayer.prototype.removeEppGhost = function () {
        if (!this.eppGhost)
            return;
        this.eppGhost.forceRemove();
        this.eppGhost = null;
    };
    ChessPlayer.prototype.setAi = function (b) {
        this.isAiControlled = b;
        if (b)
            this.aiFudge = 15;
    };
    ChessPlayer.prototype.getIsAi = function () {
        return this.isAiControlled;
    };
    ChessPlayer.prototype.getAiFudge = function () {
        return this.aiFudge;
    };
    ChessPlayer.prototype.getTeam = function () {
        return this.team;
    };
    ChessPlayer.prototype.addPiece = function (pieceName, loc) {
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
    };
    ChessPlayer.prototype.getPawnDir = function () {
        return this.pawnDir;
    };
    ChessPlayer.prototype.getKing = function () {
        return this.myKing;
    };
    ChessPlayer.prototype.getPossibleMoves = function () {
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].generatePossibleMoves();
        }
    };
    ChessPlayer.prototype.clearPlayer = function () {
        while (this.pieces.length) {
            this.pieces[0].leaveBoard(null, true);
            this.pieces[0] = null;
            this.pieces.splice(0, 1);
        }
    };
    ChessPlayer.prototype.beginTurn = function () {
        var _this = this;
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].markedForRemove) {
                this.pieces[i] = null;
                this.pieces.splice(i, 1);
                i--;
            }
        }
        if (this.getKing().checkForDanger() && !this.isAiControlled)
            ChessController.showMsgBoxTemp("Your king is in check!");
        this.removeEppGhost();
        for (var i = 0; i < this.pieces.length; i++) {
            this.pieces[i].sq.applyCssModifier("chessApp__square--hoverEnable", true);
        }
        this.aiBestDecision = { piece: null, sq: null, score: -100000 };
        this.getPossibleMoves();
        var moveIsPossible = false;
        for (var i = 0; i < this.pieces.length && !moveIsPossible; i++) {
            moveIsPossible = (this.pieces[i].possibleMoves.length > 0);
        }
        if (!moveIsPossible) {
            ChessController.toggleMsgBox(true, "Checkmate!");
            return;
        }
        if (this.isAiControlled) {
            if (this.aiBestDecision.score < 210 - this.pieces.length * 30) {
                ChessController.toggleMsgBox(true, "" + this.team[0].toUpperCase() + this.team.substring(1) + " resigned!");
                return;
            }
            if (ChessController.aiRestlessness >= 100) {
                ChessController.toggleMsgBox(true, "Game ends as a draw.");
                return;
            }
            this.aiBestDecision.sq.applyCssModifier("chessApp__square--movingAi", true);
            this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--movingAi", true);
            ChessController.timeoutHandle = setTimeout(function () {
                _this.aiBestDecision.sq.applyCssModifier("chessApp__square--movingAi", false);
                _this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--movingAi", false);
                if (_this.aiBestDecision.piece.getType() === "king") {
                    if (_this.aiBestDecision.sq === _this.aiBestDecision.piece.castleMoves["left"]) {
                        _this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        _this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        _this.aiBestDecision.piece.castle("left");
                    }
                    else if (_this.aiBestDecision.sq === _this.aiBestDecision.piece.castleMoves["right"]) {
                        _this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        _this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        _this.aiBestDecision.piece.castle("right");
                    }
                    else {
                        _this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                        _this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                        _this.aiBestDecision.piece.moveTo(_this.aiBestDecision.sq, true);
                    }
                }
                else {
                    _this.aiBestDecision.piece.sq.applyCssModifier("chessApp__square--selectedPiece", false);
                    _this.aiBestDecision.piece.applyPossibleMoveCssModifiers(false);
                    _this.aiBestDecision.piece.moveTo(_this.aiBestDecision.sq, true);
                }
                ChessController.selectedPiece = _this.aiBestDecision.piece;
                ChessController.endTurn();
            }, 2000);
        }
        else {
            ChessController.timeoutHandle = setTimeout(function () { ChessController.unlockBoardInput(); }, 200);
        }
    };
    ChessPlayer.prototype.endTurn = function () {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces[i].type === "pawn")
                this.pieces[i].checkPromotion();
        }
    };
    return ChessPlayer;
}());
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(o, s) {
        var _this = _super.call(this, o, s, "pawn") || this;
        _this.eppSpot = null;
        _this.eppId = null;
        return _this;
    }
    Pawn.prototype.generatePossibleMoves = function () {
        this.eppSpot = null;
        this.eppId = null;
        this.possibleMoves = [];
        var square = this.sq.getNeighbour(this.owner.getPawnDir() + "Left");
        if (square) {
            var res = square.verifySquareIsPossibleMove(this.owner, true, false);
            if (res[0] === "t")
                this.possibleMoves.push(square);
        }
        square = this.sq.getNeighbour(this.owner.getPawnDir() + "Right");
        if (square) {
            var res = square.verifySquareIsPossibleMove(this.owner, true, false);
            if (res[0] === "t")
                this.possibleMoves.push(square);
        }
        square = this.sq.getNeighbour(this.owner.getPawnDir());
        if (square) {
            var res = square.verifySquareIsPossibleMove(this.owner, false, true);
            if (res[0] === "t") {
                this.possibleMoves.push(square);
                if (!this.hasMoved) {
                    this.eppSpot = square;
                    square = square.getNeighbour(this.owner.getPawnDir());
                    if (square) {
                        res = square.verifySquareIsPossibleMove(this.owner, false, true);
                        if (res[0] === "t") {
                            this.possibleMoves.push(square);
                            this.eppId = square.getDomElem().id;
                        }
                        else {
                            this.eppSpot = null;
                            this.eppId = null;
                        }
                    }
                }
            }
        }
        this.verifyPossibleMoves();
    };
    Pawn.prototype.getValue = function () {
        return 35 + Math.pow(0.762 * this.rankCleaned(), 3);
    };
    Pawn.prototype.handleUniquePieceMove = function (s, trueMove) {
        if (this.eppId === s.getDomElem().id) {
            this.owner.addEppGhost(this, this.eppSpot);
        }
    };
    Pawn.prototype.handleUniqueVerifyCleanup = function () {
        this.owner.removeEppGhost();
    };
    Pawn.prototype.promoteToQueen = function () {
        var sq = this.sq;
        this.leaveBoard(null, true);
        this.owner.addPiece("queen", sq);
    };
    Pawn.prototype.checkPromotion = function () {
        if (this.markedForRemove)
            return;
        if (!this.sq.getNeighbour(this.owner.getPawnDir()))
            this.promoteToQueen();
    };
    return Pawn;
}(ChessPiece));
var EppGhost = (function (_super) {
    __extends(EppGhost, _super);
    function EppGhost(p, s) {
        var _this = _super.call(this, p.getOwner(), s, "epp") || this;
        _this.markedForRemove = true;
        _this.parentPiece = p;
        return _this;
    }
    EppGhost.prototype.forceRemove = function () {
        if (this.sq) {
            this.sq.setOccupant(null);
            this.sq = null;
        }
        this.isOnBoard = false;
        this.markedForRemove = true;
    };
    EppGhost.prototype.getValue = function () {
        if (this.parentPiece.getOnBoard())
            return this.parentPiece.getValue();
        else
            return 0;
    };
    EppGhost.prototype.handleUniquePieceMove = function (s, trueMove) {
        this.parentPiece.moveTo(s.getNeighbour(this.parentPiece.getOwner().getPawnDir()), trueMove);
    };
    EppGhost.prototype.handleUniquePieceRemoval = function (remover, trueMove) {
        if (remover) {
            if (remover.getType() === "pawn")
                this.parentPiece.leaveBoard(remover, trueMove);
        }
    };
    return EppGhost;
}(ChessPiece));
var Rook = (function (_super) {
    __extends(Rook, _super);
    function Rook(o, s) {
        return _super.call(this, o, s, "rook") || this;
    }
    Rook.prototype.generatePossibleMoves = function () {
        this.possibleMoves = [];
        this.checkPossibleMovesInDirection("up");
        this.checkPossibleMovesInDirection("down");
        this.checkPossibleMovesInDirection("left");
        this.checkPossibleMovesInDirection("right");
        this.verifyPossibleMoves();
    };
    Rook.prototype.getValue = function () {
        return 100 + 8 * this.rankCleaned();
    };
    return Rook;
}(ChessPiece));
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(o, s) {
        return _super.call(this, o, s, "knight") || this;
    }
    Knight.prototype.generatePossibleMoves = function () {
        var _this = this;
        var getKnightSpace = function (n1, n2) {
            var square = _this.sq.getNeighbour(n1);
            if (square)
                square = square.getNeighbour(n2);
            if (square) {
                var res = square.verifySquareIsPossibleMove(_this.owner, true, true);
                if (res[0] === "t")
                    _this.possibleMoves.push(square);
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
    };
    Knight.prototype.getValue = function () {
        var additive = 0;
        if (this.rankCleaned() > 1)
            additive = 14;
        return 100 + 3 * this.rankCleaned() + additive;
    };
    return Knight;
}(ChessPiece));
var Bishop = (function (_super) {
    __extends(Bishop, _super);
    function Bishop(o, s) {
        return _super.call(this, o, s, "bishop") || this;
    }
    Bishop.prototype.generatePossibleMoves = function () {
        this.possibleMoves = [];
        this.checkPossibleMovesInDirection("upLeft");
        this.checkPossibleMovesInDirection("upRight");
        this.checkPossibleMovesInDirection("downLeft");
        this.checkPossibleMovesInDirection("downRight");
        this.verifyPossibleMoves();
    };
    Bishop.prototype.getValue = function () {
        var additive = 0;
        if (this.rankCleaned() > 1)
            additive = 18;
        return 120 + 2 * this.rankCleaned() + additive;
    };
    return Bishop;
}(ChessPiece));
var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(o, s) {
        return _super.call(this, o, s, "queen") || this;
    }
    Queen.prototype.generatePossibleMoves = function () {
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
    };
    Queen.prototype.getValue = function () {
        return 265 + 2 * this.rankCleaned();
    };
    return Queen;
}(ChessPiece));
var King = (function (_super) {
    __extends(King, _super);
    function King(o, s) {
        var _this = _super.call(this, o, s, "king") || this;
        _this.castleMoves = { left: null, right: null };
        return _this;
    }
    King.prototype.castle = function (dir) {
        var sparePiece = null;
        if (dir === "left") {
            sparePiece = this.castleMoves["left"].getOccupant();
            this.moveTo(this.sq.getNeighbour("left").getNeighbour("left"), true);
            sparePiece.moveTo(this.sq.getNeighbour("right"), true);
        }
        if (dir === "right") {
            sparePiece = this.castleMoves["right"].getOccupant();
            this.moveTo(this.sq.getNeighbour("right").getNeighbour("right"), true);
            sparePiece.moveTo(this.sq.getNeighbour("left"), true);
        }
    };
    King.prototype.applyUniqueStyling = function (on) {
        if (this.castleMoves["left"]) {
            if (on)
                this.castleMoves["left"].getDomElem().classList.add("chessApp__square--possibleMove");
            else
                this.castleMoves["left"].getDomElem().classList.remove("chessApp__square--possibleMove");
        }
        if (this.castleMoves["right"]) {
            if (on)
                this.castleMoves["right"].getDomElem().classList.add("chessApp__square--possibleMove");
            else
                this.castleMoves["right"].getDomElem().classList.remove("chessApp__square--possibleMove");
        }
    };
    King.prototype.handleUniqueMoveVerifications = function () {
        var startingSq = this.sq;
        var sparePiece;
        var aiCastlingScore = 60;
        if (this.castleMoves["left"]) {
            sparePiece = this.castleMoves["left"].getOccupant();
            this.moveTo(this.sq.getNeighbour("left").getNeighbour("left"), false);
            sparePiece.moveTo(this.sq.getNeighbour("right"), false);
            var res = this.owner.getKing().checkForDanger();
            if (!res && this.owner.getIsAi()) {
                var score = aiCastlingScore + this.aiEvalMove() + Math.floor(Math.random() * this.owner.getAiFudge());
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
            var res = this.owner.getKing().checkForDanger();
            if (!res && this.owner.getIsAi()) {
                var score = aiCastlingScore + this.aiEvalMove() + Math.floor(Math.random() * this.owner.getAiFudge());
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
    };
    King.prototype.generatePossibleMoves = function () {
        var _this = this;
        var checkNeighbour = function (dir) {
            var square = _this.sq.getNeighbour(dir);
            if (square) {
                var res = square.verifySquareIsPossibleMove(_this.owner, true, true);
                if (res[0] === "t")
                    _this.possibleMoves.push(square);
            }
        };
        var checkCastle = function (dir, sq) {
            var square = sq.getNeighbour(dir);
            if (square) {
                if (!square.getOccupant())
                    checkCastle(dir, square);
                else if (square.getOccupant().getType() === "rook" && !square.getOccupant().checkHasMoved())
                    _this.castleMoves[dir] = square;
                else
                    return;
            }
        };
        this.castleMoves = { left: null, right: null };
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
    };
    King.prototype.applyCastleMoveCssModifiers = function (on) {
        for (var i = 0; i < this.possibleMoves.length; i++) {
            if (on)
                this.castleMoves[i].getDomElem().classList.add("chessApp__square--possibleMove");
            else
                this.castleMoves[i].getDomElem().classList.remove("chessApp__square--possibleMove");
        }
    };
    King.prototype.getValue = function () {
        return 250;
    };
    return King;
}(ChessPiece));
var ChessController = (function () {
    function ChessController() {
    }
    ChessController.lockBoardInput = function () {
        ChessController.boardInputIsLocked = true;
    };
    ChessController.unlockBoardInput = function () {
        ChessController.boardInputIsLocked = false;
    };
    ChessController.initApp = function () {
        this.inputState = 'na';
        this.lockBoardInput();
        var domElem;
        ChessController.board = [];
        ChessController.players = [];
        for (var y = 0; y < 8; y++) {
            ChessController.board[y] = [];
            for (var x = 0; x < 8; x++) {
                domElem = short.create("div", "m" + x + "," + y, ["chessApp__square"]);
                (x + y) % 2 ? domElem.classList.add("chessApp__square--dark") : domElem.classList.add("chessApp__square--light");
                short.byId("chessAppCon").appendChild(domElem);
                ChessController.board[y][x] = new ChessSquare(domElem, y);
                if (x > 0) {
                    ChessController.board[y][x].setNeighbour("left", ChessController.board[y][x - 1], true);
                    if (y > 0)
                        ChessController.board[y][x].setNeighbour("upLeft", ChessController.board[y - 1][x - 1], true);
                }
                if (y > 0) {
                    ChessController.board[y][x].setNeighbour("up", ChessController.board[y - 1][x], true);
                    if (x < 7)
                        ChessController.board[y][x].setNeighbour("upRight", ChessController.board[y - 1][x + 1], true);
                }
            }
        }
        ChessController.players.push(new ChessPlayer("blue"));
        ChessController.players.push(new ChessPlayer("red"));
        short.byId("chessAppCon").addEventListener("click", ChessController.clickOnSquare);
    };
    ChessController.clickOnSquare = function (event) {
        if (ChessController.boardInputIsLocked)
            return;
        var elem = event.target;
        if (elem.id[0] === "z")
            elem = elem.parentElement;
        if (elem.id[0] !== "m")
            return;
        var dims = elem.id.substring(1).split(",");
        ChessController.processInput(ChessController.board[Number(dims[1])][Number(dims[0])]);
    };
    ChessController.prepareBoardPieces = function () {
        for (var i = 0; i < 8; i++) {
            ChessController.players[0].addPiece("pawn", ChessController.board[6][i]);
        }
        ChessController.players[0].addPiece("rook", ChessController.board[7][0]);
        ChessController.players[0].addPiece("rook", ChessController.board[7][7]);
        ChessController.players[0].addPiece("knight", ChessController.board[7][1]);
        ChessController.players[0].addPiece("knight", ChessController.board[7][6]);
        ChessController.players[0].addPiece("bishop", ChessController.board[7][2]);
        ChessController.players[0].addPiece("bishop", ChessController.board[7][5]);
        ChessController.players[0].addPiece("king", ChessController.board[7][3]);
        ChessController.players[0].addPiece("queen", ChessController.board[7][4]);
        for (var i = 0; i < 8; i++) {
            ChessController.players[1].addPiece("pawn", ChessController.board[1][i]);
        }
        ChessController.players[1].addPiece("rook", ChessController.board[0][0]);
        ChessController.players[1].addPiece("rook", ChessController.board[0][7]);
        ChessController.players[1].addPiece("knight", ChessController.board[0][1]);
        ChessController.players[1].addPiece("knight", ChessController.board[0][6]);
        ChessController.players[1].addPiece("bishop", ChessController.board[0][2]);
        ChessController.players[1].addPiece("bishop", ChessController.board[0][5]);
        ChessController.players[1].addPiece("king", ChessController.board[0][3]);
        ChessController.players[1].addPiece("queen", ChessController.board[0][4]);
    };
    ChessController.startPvpGame = function () {
        ChessController.players[0].setAi(false);
        ChessController.players[1].setAi(false);
        short.byId("chessMidBtn").innerText = "end game";
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");
        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    };
    ChessController.startPvcGame = function () {
        ChessController.players[0].setAi(false);
        ChessController.players[1].setAi(false);
        var tRand = Math.floor((Math.random() - 0.005) * 2);
        ChessController.players[tRand].setAi(true);
        ChessController.aiRestlessness = -160;
        ChessController.numPiecesPrevTurn = 0;
        if (tRand === 1)
            ChessController.showMsgBoxTemp("You are BLUE");
        else
            ChessController.showMsgBoxTemp("You are RED");
        short.byId("chessMidBtn").innerText = "end game";
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");
        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    };
    ChessController.startCvcGame = function () {
        ChessController.players[0].setAi(true);
        ChessController.players[1].setAi(true);
        ChessController.aiRestlessness = -160;
        ChessController.numPiecesPrevTurn = 0;
        short.byId("chessMidBtn").innerText = "end game";
        short.byId("chessLeftBtn").classList.add("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.add("chessBtnRow__btn--disabled");
        ChessController.prepareBoardPieces();
        ChessController.currentPlayer = 0;
        ChessController.beginTurn();
    };
    ChessController.endGame = function () {
        ChessController.clearBoardModifiers();
        ChessController.players[0].clearPlayer();
        ChessController.players[1].clearPlayer();
        clearTimeout(ChessController.timeoutHandle);
        ChessController.inputState = "na";
        ChessController.toggleMsgBox(false);
        short.byId("chessMidBtn").innerText = "player vs. CPU";
        short.byId("chessLeftBtn").classList.remove("chessBtnRow__btn--disabled");
        short.byId("chessRightBtn").classList.remove("chessBtnRow__btn--disabled");
    };
    ChessController.beginTurn = function () {
        ChessController.selectedPiece = null;
        ChessController.inputState = "pS";
        ChessController.lockBoardInput();
        var numPiecesThisTurn = ChessController.players[0].getNumPieces() + ChessController.players[1].getNumPieces();
        if (numPiecesThisTurn !== ChessController.numPiecesPrevTurn && ChessController.aiRestlessness > 0) {
            ChessController.aiRestlessness = 0;
            ChessController.numPiecesPrevTurn = numPiecesThisTurn;
        }
        else {
            ChessController.aiRestlessness += 4;
        }
        ChessController.timeoutHandle = setTimeout(function () { ChessController.players[ChessController.currentPlayer].beginTurn(); }, 200);
    };
    ChessController.endTurn = function () {
        ChessController.clearBoardModifiers();
        ChessController.selectedPiece.getOwner().endTurn();
        ChessController.currentPlayer = (ChessController.currentPlayer + 1) % 2;
        ChessController.timeoutHandle = setTimeout(function () { ChessController.beginTurn(); }, 200);
    };
    ChessController.processInput = function (sq) {
        ChessController.lockBoardInput();
        switch (ChessController.inputState) {
            case "pS":
                ChessController.pieceSelection(sq);
                break;
            case "mC":
                ChessController.moveChoice(sq);
                break;
        }
    };
    ChessController.pieceSelection = function (sq) {
        if (sq.getOccupant() && sq.getOccupant().getOwner().getTeam() === ChessController.players[this.currentPlayer].getTeam()) {
            ChessController.selectedPiece = sq.getOccupant();
            ChessController.selectedPiece.sq.applyCssModifier("chessApp__square--selectedPiece", true);
            ChessController.selectedPiece.applyPossibleMoveCssModifiers(true);
            ChessController.inputState = "mC";
        }
        ChessController.unlockBoardInput();
    };
    ChessController.moveChoice = function (sq) {
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
        var selectedMove = null;
        for (var i = 0; i < ChessController.selectedPiece.possibleMoves.length && !selectedMove; i++) {
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
    };
    ChessController.leftBtn = function () {
        if (ChessController.inputState == "na") {
            ChessController.startPvpGame();
        }
    };
    ChessController.middleBtn = function () {
        if (ChessController.inputState == "na") {
            ChessController.startPvcGame();
        }
        else {
            ChessController.endGame();
        }
    };
    ChessController.rightBtn = function () {
        if (ChessController.inputState == "na") {
            ChessController.startCvcGame();
        }
    };
    ChessController.showMsgBoxTemp = function (msg) {
        ChessController.toggleMsgBox(true, msg);
        ChessController.timeoutHandle = setTimeout(function () { ChessController.toggleMsgBox(false); }, 2500);
    };
    ChessController.toggleMsgBox = function (on, msg) {
        if (msg === void 0) { msg = ""; }
        if (on) {
            if (!msg)
                return;
            short.byId("chessMsgBox").innerText = msg;
            short.byId("chessMsgBox").classList.add("chessApp__msgBox--visible");
        }
        else
            short.byId("chessMsgBox").classList.remove("chessApp__msgBox--visible");
    };
    ChessController.clearBoardModifiers = function () {
        ChessController.board.forEach(function (a) {
            a.forEach(function (e) {
                e.clearAllModifiers();
            });
        });
    };
    ChessController.boardInputIsLocked = true;
    return ChessController;
}());
//# sourceMappingURL=chess.js.map