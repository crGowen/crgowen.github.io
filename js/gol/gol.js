var GolController = (function () {
    function GolController() {
    }
    GolController.lockGridInput = function () {
        GolController.gridInputIsLocked = true;
        for (var y = 0; y < GolController.grid.length; y++) {
            for (var x = 0; x < GolController.grid[0].length; x++) {
                short.byId("c" + x + "," + y).classList.remove("golApp__cell--hoverEnabled");
            }
        }
    };
    GolController.unlockGridInput = function () {
        GolController.gridInputIsLocked = false;
        for (var y = 0; y < GolController.grid.length; y++) {
            for (var x = 0; x < GolController.grid[0].length; x++) {
                short.byId("c" + x + "," + y).classList.add("golApp__cell--hoverEnabled");
            }
        }
    };
    GolController.play = function () {
        GolController.iterationActive = !GolController.iterationActive;
        if (GolController.iterationActive) {
            GolController.lockGridInput();
            short.byId("golPlayBtn").innerText = "pause";
            short.byId("golClrBtn").classList.add("golBtnRow__btn--disabled");
            short.byId("golRandBtn").classList.add("golBtnRow__btn--disabled");
            GolController.golIteration();
        }
        else {
            short.byId("golPlayBtn").innerText = "play";
            short.byId("golClrBtn").classList.remove("golBtnRow__btn--disabled");
            short.byId("golRandBtn").classList.remove("golBtnRow__btn--disabled");
            GolController.unlockGridInput();
        }
    };
    GolController.clear = function () {
        GolController.lockGridInput();
        if (GolController.iterationActive)
            return;
        for (var y = 0; y < GolController.grid.length; y++) {
            for (var x = 0; x < GolController.grid[0].length; x++) {
                GolController.grid[y][x].clear();
            }
        }
        GolController.unlockGridInput();
    };
    GolController.randomise = function () {
        if (GolController.iterationActive)
            return;
        GolController.clear();
        GolController.lockGridInput();
        for (var y = 0; y < GolController.grid.length; y++) {
            for (var x = 0; x < GolController.grid[0].length; x++) {
                GolController.grid[y][x].randomise();
            }
        }
        GolController.unlockGridInput();
    };
    GolController.loadApp = function (wide, high) {
        var domElem;
        GolController.grid = [];
        for (var y = 0; y < high; y++) {
            GolController.grid[y] = [];
            for (var x = 0; x < wide; x++) {
                domElem = short.create("div", "c" + x + "," + y, ["golApp__cell", "golApp__cell--inactive", "golApp__cell--hoverEnabled"]);
                short.byId("golAppCon").appendChild(domElem);
                GolController.grid[y][x] = new GolCell(domElem);
                if (x > 0) {
                    GolController.grid[y][x].addNeighbour(GolController.grid[y][x - 1], true);
                    if (y > 0)
                        GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x - 1], true);
                }
                if (y > 0) {
                    GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x], true);
                    if (x < wide - 1)
                        GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x + 1], true);
                }
            }
        }
        short.byId("golAppCon").addEventListener("click", GolController.toggleCell);
        GolController.unlockGridInput();
    };
    GolController.toggleCell = function (event) {
        var elem = event.target;
        if (elem.id[0] !== "c")
            return;
        if (GolController.gridInputIsLocked)
            return;
        GolController.lockGridInput();
        var dims = elem.id.substring(1).split(',');
        var x = Number(dims[0]);
        var y = Number(dims[1]);
        GolController.grid[y][x].toggle();
        GolController.unlockGridInput();
    };
    GolController.golIteration = function () {
        if (GolController.iterationActive) {
            GolController.hasChangedBetweenIterations = false;
            for (var y = 0; y < GolController.grid.length; y++) {
                for (var x = 0; x < GolController.grid[0].length; x++) {
                    GolController.grid[y][x].prepareFate();
                }
            }
            for (var y = 0; y < GolController.grid.length; y++) {
                for (var x = 0; x < GolController.grid[0].length; x++) {
                    GolController.grid[y][x].liveOrDie();
                }
            }
            if (!GolController.hasChangedBetweenIterations && GolController.iterationActive) {
                GolController.play();
            }
            window.setTimeout(GolController.golIteration, GolController.golIterationInterval);
        }
    };
    GolController.setHasChanged = function (b) {
        GolController.hasChangedBetweenIterations = b;
    };
    GolController.gridInputIsLocked = true;
    GolController.iterationActive = false;
    GolController.golIterationInterval = 200;
    return GolController;
}());
var GolCell = (function () {
    function GolCell(arg) {
        this.neighbours = [];
        this.isAlive = false;
        this.borderingActives = 0;
        this.domElem = arg;
    }
    GolCell.prototype.updateNeighbours = function () {
        var _this = this;
        this.neighbours.forEach(function (e) {
            e.incrementBorderingActives(_this.isAlive);
        });
    };
    GolCell.prototype.incrementBorderingActives = function (isIncreased) {
        isIncreased ? this.borderingActives++ : this.borderingActives--;
    };
    GolCell.prototype.updateStyle = function () {
        this.isAlive ?
            this.domElem.classList.replace("golApp__cell--inactive", "golApp__cell--active")
            :
                this.domElem.classList.replace("golApp__cell--active", "golApp__cell--inactive");
    };
    GolCell.prototype.addNeighbour = function (n, addToBoth) {
        this.neighbours.push(n);
        if (addToBoth)
            n.addNeighbour(this, false);
    };
    GolCell.prototype.toggle = function () {
        this.isAlive = !this.isAlive;
        this.updateNeighbours();
        this.updateStyle();
    };
    GolCell.prototype.prepareFate = function () {
        this.nextGenFate = ((!this.isAlive && this.borderingActives === 3)
            ||
                (this.isAlive && (this.borderingActives === 3 || this.borderingActives === 2)));
    };
    GolCell.prototype.liveOrDie = function () {
        var previousGen = this.isAlive;
        this.isAlive = this.nextGenFate;
        if (this.isAlive != previousGen) {
            this.updateNeighbours();
            GolController.setHasChanged(true);
        }
        this.updateStyle();
    };
    GolCell.prototype.clear = function () {
        this.isAlive = false;
        this.borderingActives = 0;
        this.updateStyle();
    };
    GolCell.prototype.randomise = function () {
        if (Math.random() <= 0.3) {
            this.toggle();
        }
    };
    return GolCell;
}());
//# sourceMappingURL=gol.js.map