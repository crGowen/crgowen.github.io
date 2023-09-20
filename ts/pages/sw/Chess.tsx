import Page, { PageEntry } from "../../Page";
import { useState } from "react";

type SqOccupant = string;

export default function Chess() {
    const initialChessBoard = new Array(8).fill(new Array(8).fill("empty"));
    console.log(initialChessBoard);
    const [chessBoard] = useState(initialChessBoard);

    const sharedParagraphStyle = {
        fontWeight: "normal",
        fontSize: '0.9rem',
        marginBottom: '0.3rem'
    };

    return (
        <Page width="wide">
            <PageEntry>
                <div className="chessContainer">
                    <ChessBoard board={chessBoard} inputBlock={false} />
                    <div className={`appBtnRow`}>
                        <div className="appBtn" onClick={() => {
                            console.log("clickerino");
                        }}>
                            {true ? "Stop" : "Start"}
                        </div>
                    </div>
                </div>
            </PageEntry>
            <PageEntry>
                <h1 style={{
                fontWeight: "normal",
                fontSize: '1.4rem',
                marginBottom: '0.2rem'
                }}>Chess</h1>
                <p style={sharedParagraphStyle}>
                    Work in Progress
                </p>
            </PageEntry>
        </Page>
    );
}

function ChessBoard(props: {board: SqOccupant[][], inputBlock: boolean}) {
    return <div className="chessBoard">
        {props.board.map((file, i) => <ChessFile key={i} file={file} x={i} inputBlock={props.inputBlock} />)}
    </div>
}

function ChessFile (props: {file: SqOccupant[], x: number, inputBlock: boolean}) {
    return <div className="chessFile">
        {props.file.map((occupant, i) => <ChessSq key={i} pos={{x: props.x, y: i}} occupant={occupant} inputBlock={props.inputBlock} />)}
    </div>
}

function ChessSq (props: { pos: {x:number, y:number}, occupant: SqOccupant,  inputBlock: boolean }) {
    const {x, y} = props.pos;
    const sqColourAppend = (x+y)%2 ? " darkSq" : "";
    const id = `chess-sq-${x.toString()},${y.toString()}`;
    //Do something with the occupant
    console.log(props.occupant);
    const inputBlockedAppend = props.inputBlock ? "Blocked" : "";
    return <div id={id} className={`chessSq${inputBlockedAppend}${sqColourAppend}`}></div>
}