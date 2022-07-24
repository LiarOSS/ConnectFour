import React, {useEffect, useState} from "react";
import checkCoordinatesRange from "../../utils/checkCoordinatesRange";
import invertVector from "../../utils/invertVector";
import Winner from "../ui/Winner";

enum Players {
    None,
    Red,
    Yellow
}

interface Field {
    x: number,
    y: number,
    selected: Players
}

const colors = {
    [Players.Red]: "bg-red-600",
    [Players.None]: "bg-white",
    [Players.Yellow]: "bg-yellow-400",
}

const playerNames = {
    [Players.Red]: "Red",
    [Players.Yellow]: "Yellow",
}

const GameContainer = () => {
    const [circleHeight, setCircleHeight] = useState(0);
    const [fields, setFields] = useState<Field[][]>([]);
    const [winner, setWinner] = useState<Exclude<Players, Players.None> | null>(null);
    const [playerFields, setPlayerFields] = useState<Record<Exclude<Players, Players.None>, Field[]>>({
        [Players.Red]: [],
        [Players.Yellow]: []
    });
    const [player, setPlayer] = useState<Exclude<Players, Players.None>>(Players.Red);

    const windowResize = () => {
        let height;
        if (window.innerWidth > 640) {
            height = Math.round(window.innerWidth / 3 * 2 / 7);
        } else {
            height = Math.round(window.innerWidth / 7);
        }
        setCircleHeight(height);
    }

    useEffect(() => {
        windowResize()
        window.addEventListener("resize", windowResize)
    }, [])

    useEffect(() => {
        const generatedFields = [];
        for (let x = 0; x < 7; x++) {
            const col: Field[] = [];
            for (let y = 0; y < 5; y++) {
                const field = {
                    x,
                    y,
                    selected: Players.None
                }
                col.push(field)
            }
            generatedFields.push(col);
        }
        setFields(generatedFields);
    }, [])

    const setField = (x: number, y: number) => {
        if (fields[x][y].selected !== Players.None) return;
        let newFields = [...fields];
        for (let i = newFields[x].length - 1; i >= 0; i--) {
            if (newFields[x][i].selected === Players.None) {
                newFields[x][i].selected = player;
                const newPlayerFields = playerFields[player];
                newPlayerFields.push(newFields[x][i])
                setPlayerFields({
                    ...playerFields,
                    [player]: newPlayerFields
                })
                if (newPlayerFields.length >= 4) {
                    checkWin(x, i, player)
                }
                break;
            }
        }
        setFields(newFields);
        if (Players.Red === player) {
            setPlayer(Players.Yellow)
        } else if (Players.Yellow === player) {
            setPlayer(Players.Red)
        }
    }

    const checkNext = (x: number, y: number, vectors: Array<[number, number]>, p: Exclude<Players, Players.None>) => {
        for (let vector of vectors) {
            const chain = checkChain(x, y, vector, p)
            const invertedVector = invertVector(vector);
            const invertedChain = checkChain(x, y, invertedVector, p)
            if (chain + invertedChain >= 3) {
                setWinner(p);
                return;
            }
        }
    }

    const checkChain = (x: number, y: number, vector: [number, number], p: Exclude<Players, Players.None>) => {
        let next = checkNextField(x, y, vector, p);
        let newX = x + vector[0];
        let newY = y + vector[1];
        let chain = 0;
        while (next) {
            chain++;
            next = checkNextField(newX, newY, vector, p);
            newX = newX + vector[0];
            newY = newY + vector[1];
        }
        return chain;
    }

    const checkNextField = (x: number, y: number, vector: [number, number], p: Exclude<Players, Players.None>) => {
        const newX = x + vector[0];
        const newY = y + vector[1];
        return checkCoordinatesRange(newX, newY) && fields[newX][newY].selected === p
    }

    const checkWin = (x: number, y: number, p: Exclude<Players, Players.None>) => {
        const checkVector: Array<[number, number]> = [[1, 1], [1, 0], [0, 1], [-1, 0], [0, -1], [-1, -1], [1, -1], [-1, 1]];
        checkNext(x, y, checkVector, p);
    }

    return (
        <>
            {
                winner && <Winner name={playerNames[winner]} color={colors[winner]}/>
            }
            <div
                className="mx-auto mt-6 sm:border-8 border-blue-800 bg-blue-700 w-full sm:w-2/3 grid grid-cols-7">
                {
                    fields.map((col, index) => <div className="h-full grid grid-cols-1" key={"col-" + index}>
                        {
                            col.map((field) => <div className="p-1 sm:p-3 relative"
                                                    style={{height: circleHeight + "px"}}
                                                    key={`field-${field.x}-${field.y}`}>
                                <div
                                    className={`bg-white sm:border-8 border-blue-800 rounded-full h-full w-full ${winner ? "cursor-default" : "cursor-pointer"} ${colors[field.selected]}`}
                                    onClick={() => {
                                        if (!winner) {
                                            setField(field.x, field.y)
                                        }
                                    }}>
                                </div>
                            </div>)
                        }
                    </div>)
                }
            </div>
            <div className="mx-auto w-64">
                <button
                    className="uppercase bg-blue-700 p-6 border-8 border-blue-800 rounded-2xl text-2xl w-64 mt-8 font-extrabold text-blue-900"
                    onClick={() => {
                        window.location.reload();
                    }}>
                    reset
                </button>
            </div>
        </>
    )
};


export default GameContainer;