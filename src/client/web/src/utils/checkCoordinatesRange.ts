const checkCoordinatesRange = (x: number, y: number) => {
    return x >= 0 && x < 7 && y >= 0 && y < 5;
}

export default checkCoordinatesRange;