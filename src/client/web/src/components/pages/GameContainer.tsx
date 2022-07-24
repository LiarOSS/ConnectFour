import React, {useEffect, useState} from "react";

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

interface Col {
    x: number,
    fields: Field[],
    selected: {
        [Players.Red]: number,
        [Players.Yellow]: number,
        [Players.None]: number
    }
}

interface Row {
    y: number,
    fields: Field[],
    selected: {
        [Players.Red]: number,
        [Players.Yellow]: number
        [Players.None]: number
    }
}

const colors = {
    [Players.Red]: "bg-red-600",
    [Players.None]: "bg-white",
    [Players.Yellow]: "bg-yellow-400",
}

const GameContainer = () => {
    const [circleHeight, setCircleHeight] = useState(0);
    const [fields, setFields] = useState<Field[][]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [cols, setCols] = useState<Col[]>([]);
    const [player, setPlayer] = useState<Players>(Players.Red);

    const windowResize = () => {
        const height = Math.round(window.innerWidth / 3 * 2 / 7);
        setCircleHeight(height);
    }

    useEffect(() => {
        windowResize()
        window.addEventListener("resize", windowResize)
    }, [])

    useEffect(() => {
        const generatedFields = [];
        const genCols: Col[] = [];
        const genRows: Row[] = [];
        for (let x = 0; x < 7; x++) {
            const col: Field[] = [];
            genCols[x] = {
                x,
                selected: {
                    [Players.Red]: 0,
                    [Players.Yellow]: 0,
                    [Players.None]: 7,
                },
                fields: []
            }
            for (let y = 0; y < 5; y++) {
                const field = {
                    x,
                    y,
                    selected: Players.None
                }
                genCols[x].fields.push(field)
                col.push(field)
                if (!genRows[y]) {
                    genRows[y] = {
                        y,
                        selected: {
                            [Players.Red]: 0,
                            [Players.Yellow]: 0,
                            [Players.None]: 5,
                        },
                        fields: []
                    }
                }
                genRows[y].fields.push(field);
            }
            generatedFields.push(col);
        }
        setFields(generatedFields);
        setCols(genCols);
        setRows(genRows);
    }, [])

    const setFieldCol = (x: number, y: number) => {
        let newCols = [...cols];
        newCols[x].fields[y].selected = player
        newCols[x].selected[player]++;
        if (newCols[x].selected[player] >= 4) {
            console.log("maybe win")
        }
        newCols[x].selected[Players.None]--;
        setCols(newCols)
    }

    const setFieldRow = (x: number, y: number) => {
        let newRows = [...rows];
        newRows[y].fields[x].selected = player
        newRows[y].selected[player]++;
        if (newRows[y].selected[player] >= 4) {
            console.log("maybe win")
        }
        newRows[y].selected[Players.None]--;
        setRows(newRows)
    }

    const setField = (x: number, y: number) => {
        if (fields[x][y].selected !== Players.None) return;
        let newFields = [...fields];
        for (let i = newFields[x].length - 1; i >= 0; i--) {
            if (newFields[x][i].selected === Players.None) {
                newFields[x][i].selected = player;
                setFieldCol(x, i);
                setFieldRow(x, i);
                break;
            }
        }
        setFields(newFields);
        if (Players.Red === player) {
            setPlayer(Players.Yellow)
        }
        if (Players.Yellow === player) {
            setPlayer(Players.Red)
        }
    }

    return (
        <div className="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 bg-blue-700 w-2/3 grid grid-cols-7">
            {
                fields.map((col, index) => <div className="h-full grid grid-cols-1" key={"col-" + index}>
                    {
                        col.map((field) => <div className="p-6" style={{height: circleHeight + "px"}}
                                                key={`field-${field.x}-${field.y}`}>
                            <div
                                className={`bg-white rounded-full h-full w-full cursor-pointer ${colors[field.selected]}`}
                                onClick={() => {
                                    setField(field.x, field.y)
                                }}>

                            </div>
                        </div>)
                    }
                </div>)
            }
        </div>
    )
}


export default GameContainer;