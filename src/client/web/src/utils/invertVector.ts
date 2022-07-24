const invertVector = (vector: [number, number]): [number, number] => {
    let x = vector[0];
    let y = vector[1];
    if (x === 1 || x === -1) {
        x = x * -1
    }
    if (y === 1 || y === -1) {
        y = y * -1
    }
    return [x, y]
}

export default invertVector;