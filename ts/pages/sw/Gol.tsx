import Page, { PageEntry } from "../../Page";
import { useState, useEffect, useRef } from "react";

export default function Gol() {    
    const dims = {x: 40, y: 28};
    const [golGrid, setGolGrid] = useState<boolean[][]>(GolController.getInitialGrid(dims));
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFast, setIsFast] = useState(false);
    const golController = useRef(new GolController(dims, setGolGrid, setIsPlaying));

    useEffect(() => {
        const clickHandler = (evt: MouseEvent) => {
            evt.stopPropagation();
            const id = (evt.target as HTMLElement).id;

            const prefix = "golsq-";
            if (id.includes(prefix) && !isPlaying) {
                const withoutPrefix = id.substring(prefix.length);
                const [x, y] = withoutPrefix.split(",").map(x => parseInt(x));
                golController.current.toggleSq(x, y);
            }
        };

        window.addEventListener("click", clickHandler);

        return () => window.removeEventListener("click", clickHandler);
    }, []);

    const sharedParagraphStyle = {
        fontWeight: "normal",
        fontSize: '0.9rem',
        marginBottom: '0.3rem'
    };

    return (
        <Page width="wide">
            <PageEntry>
                <div className="golContainer">
                    <GolGrid grid={golGrid} inputBlock={isPlaying} />
                    <div className={`appBtnRow`}>
                        <div className="appBtn" onClick={() => {isPlaying
                            ? golController.current.stop()
                            : golController.current.start();
                            setIsPlaying(!isPlaying);
                        }}>
                            {isPlaying ? "Stop" : "Start"}
                        </div>
                        <div className="appBtn" onClick={() => {isFast
                            ? golController.current.slow()
                            : golController.current.fast();
                            setIsFast(!isFast);
                        }}>
                            {isFast ? "Slow Down" : "Speed Up"}
                        </div>
                        <div className={`app${isPlaying ? "Inactive" : ""}Btn`} onClick={() => !isPlaying ? golController.current.randomise() : {}}>
                            Randomise
                        </div>
                        <div className={`app${isPlaying ? "Inactive" : ""}Btn`} onClick={() => !isPlaying ? golController.current.clear() : {}}>
                            Clear
                        </div>
                    </div>
                </div>
            </PageEntry>
            <PageEntry>
                <h1 style={{
                fontWeight: "normal",
                fontSize: '1.4rem',
                marginBottom: '0.2rem'
                }}>Conway's Game of Life</h1>
                <p style={sharedParagraphStyle}>
                    The 'Game of Life' is a cellular evolution simulation created by John Horton Conway in 1970. The rules are simple: each cell can either be alive or dead; at the end of each iteration (or generation): a live cell will remain alive only if it has 2 or 3 live neighbours - no more and no less, whilst a dead cell can only become alive if it has exactly 3 live neighbours. A cell's neighbours are any other cells that border it (including diagonally), so all cells - except for edge-cells - have 8 neighbours. Technically the Game of Life should have an infinite grid, but for a web application like this, that would be... impractical.
                </p>
                <p style={sharedParagraphStyle}>
                    Read more on Wikipedia <a style={{color: "steelblue", textDecoration: "underline"}}href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                <p style={sharedParagraphStyle}>
                    Update: On 11 April 2020, John Horton Conway passed away from complications due to COVID-19 at the age of 82. His legacy includes not just the Game of Life, but great contributions into various areas of mathematics: group theory, number theory, knot theory; as well as philosophy in metaphysics. With his broad impact, it's easy to see why Conway was known as a 'magical genius'.
                </p>                
            </PageEntry>
        </Page>
    );
}

function GolGrid(props: {grid: boolean[][], inputBlock: boolean}) {
    return <div className="golGrid">
        {props.grid.map((col, i) => <GolCol key={i} col={col} x={i} inputBlock={props.inputBlock} />)}
    </div>
}

function GolCol (props: {col: boolean[], x: number, inputBlock: boolean}) {
    return <div className="golCol">
        {props.col.map((active, i) => <GolSq key={i} pos={{x: props.x, y: i}} active={active} inputBlock={props.inputBlock} />)}
    </div>
}

function GolSq (props: { pos: {x:number, y:number}, active: boolean,  inputBlock: boolean }) {
    const {x, y} = props.pos;
    const id = `golsq-${x.toString()},${y.toString()}`
    const activeAppend = props.active ? " golSqActive" : "";
    const inputBlockedAppend = props.inputBlock ? "Blocked" : "";
    return <div id={id} className={`golSq${inputBlockedAppend}${activeAppend}`}></div>
}

class GolController {
    private isPlaying: boolean;
    private grid: boolean[][];
    private dims: {x: number, y: number};
    private reactGridSetter: (x: boolean[][]) => void;
    private reactPlayStateSetter: (x: boolean) => void;
    private iterationInterval: number;

    public static getInitialGrid(dims: {x:number, y: number}) {
        const {x, y} = dims;
        return [...Array(x).keys()].map(_ => 
            [...Array(y).keys()].map(_ => false));
    }

    constructor(dims: {x: number, y: number},
        reactGridSetter: (x: boolean[][]) => void,
        reactPlayStateSetter: (x: boolean) => void) {
        this.dims = dims;
        this.grid = GolController.getInitialGrid(this.dims);
        this.reactGridSetter = reactGridSetter;
        this.reactPlayStateSetter = reactPlayStateSetter;
        this.isPlaying = false;
        this.iterationInterval = 220;
    }

    private updateDomGrid(circumventShallowCopy = true) {
        const newGrid = circumventShallowCopy ? [...this.grid] : this.grid;
        this.reactGridSetter(newGrid);
    }

    private updatePlayState() {
        this.reactPlayStateSetter(this.isPlaying);
    }

    private iterate() {
        if (!this.isPlaying) return;

        const countLivingNeighbours = (x: number, y: number) => {
            const leftAvailable = x !== 0;
            const rightAvailable = x !== this.dims.x - 1;
            const topAvailable = y !== 0;
            const bottomAvailable = y !== this.dims.y - 1;

            let count = 0;

            if (leftAvailable) {
                count += this.grid[x-1][y] ? 1 : 0;
                if (topAvailable) count += this.grid[x-1][y-1] ? 1 : 0;
                if (bottomAvailable) count += this.grid[x-1][y+1] ? 1 : 0;
            }
            if (rightAvailable) {
                count += this.grid[x+1][y] ? 1 : 0;
                if (topAvailable) count += this.grid[x+1][y-1] ? 1 : 0;
                if (bottomAvailable) count += this.grid[x+1][y+1] ? 1 : 0;
            }
            if (topAvailable) count += this.grid[x][y-1] ? 1 : 0;
            if (bottomAvailable) count += this.grid[x][y+1] ? 1 : 0;

            return count;
        };

        let gridChange = false;
    
        const nextGen = this.grid.map((row, x) => row.map((alive, y) => {
            const numNeighbours = countLivingNeighbours(x, y);
            
            const becomeAlive = !alive && numNeighbours === 3;
            const remainAlive = alive && (numNeighbours === 3 || numNeighbours === 2);

            const aliveNextGen = becomeAlive || remainAlive;
            gridChange = gridChange || (aliveNextGen !== this.grid[x][y]);
            return aliveNextGen;
        }));

        if (!gridChange) this.stop();
        else {
            this.grid = nextGen;
            window.setTimeout(() => this.iterate(), this.iterationInterval);
            this.updateDomGrid();
        }
    }

    public fast() {
        this.iterationInterval = 80;
    }

    public slow() {
        this.iterationInterval = 220;
    }

    public start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.updatePlayState();
        window.setTimeout(() => this.iterate(), 80);
    }

    public stop() {
        this.isPlaying = false;
        this.updatePlayState();
    }
    
    public toggleSq(x: number, y: number) {
        if (this.isPlaying) return;
        this.grid[x][y] = !this.grid[x][y];
        this.updateDomGrid();
    }

    public randomise() {
        if (this.isPlaying) return;
        const aliveThreshold = 0.70;
        this.grid = this.grid.map(x => x.map(_ => Math.random() >= aliveThreshold));
        this.updateDomGrid();
    }

    public clear() {
        if (this.isPlaying) return;
        this.grid = this.grid.map(x => x.map(_ => false));
        this.updateDomGrid();
    }
}