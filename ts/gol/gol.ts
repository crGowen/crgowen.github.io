class GolController {

    private static grid:GolCell [][]; // ID is in format x,y but the cell grid is indexed with [y][x]

    private static gridInputIsLocked = true;

    private static iterationActive =  false;

    private static hasChangedBetweenIterations:boolean;

    public static golIterationInterval = 200;

    static lockGridInput(){
        GolController.gridInputIsLocked = true;
        for (let y = 0; y < GolController.grid.length; y++) {
            for (let x = 0; x < GolController.grid[0].length; x++) {
                short.byId(`c${x},${y}`).classList.remove("golApp__cell--hoverEnabled");
            }
        }
    }

    static unlockGridInput(){
        GolController.gridInputIsLocked = false;
        for (let y = 0; y < GolController.grid.length; y++) {
            for (let x = 0; x < GolController.grid[0].length; x++) {
                short.byId(`c${x},${y}`).classList.add("golApp__cell--hoverEnabled");
            }
        }
    }

    static play() {
        GolController.iterationActive = !GolController.iterationActive;

        if (GolController.iterationActive) {
            GolController.lockGridInput();
            short.byId("golPlayBtn").innerText = "pause"
            short.byId("golClrBtn").classList.add("golBtnRow__btn--disabled");
            short.byId("golRandBtn").classList.add("golBtnRow__btn--disabled");
            GolController.golIteration();
        } else {
            short.byId("golPlayBtn").innerText = "play";
            short.byId("golClrBtn").classList.remove("golBtnRow__btn--disabled");
            short.byId("golRandBtn").classList.remove("golBtnRow__btn--disabled");
            GolController.unlockGridInput();
        }        
    }

    static clear() {
        GolController.lockGridInput();

        if (GolController.iterationActive) return;
        for (let y = 0; y < GolController.grid.length; y++) {
            for (let x = 0; x < GolController.grid[0].length; x++) {
                GolController.grid[y][x].clear();
            }
        }

        GolController.unlockGridInput();
    }

    static randomise() {
        if (GolController.iterationActive) return;

        GolController.clear();

        GolController.lockGridInput();

        for (let y = 0; y < GolController.grid.length; y++) {
            for (let x = 0; x < GolController.grid[0].length; x++) {
                GolController.grid[y][x].randomise();
            }
        } 
        
        GolController.unlockGridInput();
    }

    static loadApp(wide:number, high:number) {
        var domElem:any;

        GolController.grid = [];

        // ID is in format x,y but the cell grid is indexed with [y][x]
        for (let y = 0; y < high; y++) {
            GolController.grid[y] = [];
            for (let x = 0; x < wide; x++) {
                domElem = short.create("div", `c${x},${y}`, ["golApp__cell", "golApp__cell--inactive", "golApp__cell--hoverEnabled"]);
                short.byId("golAppCon").appendChild(domElem);

                GolController.grid[y][x] = new GolCell(domElem);

                // connect neighbours
                if (x > 0) {
                    GolController.grid[y][x].addNeighbour(GolController.grid[y][x - 1], true);
                    if (y > 0) GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x - 1], true);
                }

                if (y > 0) {
                    GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x], true);
                    if (x < wide - 1) GolController.grid[y][x].addNeighbour(GolController.grid[y - 1][x + 1], true);
                }
            }
        }

        short.byId("golAppCon").addEventListener("click", GolController.toggleCell);

        GolController.unlockGridInput();
    }

    static toggleCell(event:Event) {
        let elem = event.target as Element;
        if(elem.id[0] !== "c") return;
        if (GolController.gridInputIsLocked) return;
        GolController.lockGridInput();
        let dims = elem.id.substring(1).split(',');
        let x = Number(dims[0]);
        let y = Number(dims[1]);

        // ID is in format x,y but the cell grid is indexed with [y][x]
        GolController.grid[y][x].toggle();
        GolController.unlockGridInput();
    }

    static golIteration() {        
        if (GolController.iterationActive) {
            GolController.hasChangedBetweenIterations = false;

            for (let y = 0; y < GolController.grid.length; y++) {
                for (let x = 0; x < GolController.grid[0].length; x++) {
                    GolController.grid[y][x].prepareFate();
                }

            }

            for (let y = 0; y < GolController.grid.length; y++) {
                for (let x = 0; x < GolController.grid[0].length; x++) {
                    GolController.grid[y][x].liveOrDie();
                }

            }

            if (!GolController.hasChangedBetweenIterations && GolController.iterationActive) {
                GolController.play();
            }
            
            window.setTimeout(GolController.golIteration, GolController.golIterationInterval);
        }
    }

    static setHasChanged(b:boolean) {
        GolController.hasChangedBetweenIterations = b;
    }
}

class GolCell {
    private domElem:Element;
    private isAlive:boolean;
    private borderingActives: number;
    private nextGenFate: boolean;

    private neighbours: GolCell [];

    constructor(arg:Element) {
        this.neighbours = [];
        this.isAlive = false;
        this.borderingActives = 0;
        this.domElem = arg;
    }

    private updateNeighbours() {
        this.neighbours.forEach(e => {
            e.incrementBorderingActives(this.isAlive);
        });
    }

    private incrementBorderingActives(isIncreased:boolean) {
        isIncreased ? this.borderingActives++ : this.borderingActives--;
    }

    private updateStyle() {
        this.isAlive ?
        this.domElem.classList.replace("golApp__cell--inactive", "golApp__cell--active")
        :
        this.domElem.classList.replace("golApp__cell--active", "golApp__cell--inactive");
    }

    addNeighbour (n:GolCell, addToBoth:boolean) {
        this.neighbours.push(n);
        if (addToBoth) n.addNeighbour(this, false);
    }

    toggle() {
        this.isAlive = !this.isAlive;

        this.updateNeighbours();

        this.updateStyle();
    }

    prepareFate() {
        this.nextGenFate = (
            (!this.isAlive && this.borderingActives===3) 
            ||
            (this.isAlive && (this.borderingActives===3 || this.borderingActives===2))
        );
    }

    liveOrDie() {
        let previousGen = this.isAlive;
        this.isAlive = this.nextGenFate;

        if (this.isAlive != previousGen) {
            this.updateNeighbours();
            GolController.setHasChanged(true);
        }

        this.updateStyle();
    }

    clear() {
        this.isAlive = false;
        this.borderingActives = 0;

        this.updateStyle();
    }

    randomise() {
        if (Math.random() <= 0.3) {            
            this.toggle();
        }
    }
}