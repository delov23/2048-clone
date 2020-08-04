const generateNumber = () => {
    if (Math.random() < 0.7) {
        return 2;
    }

    return 4;
};

const generateTile = (oldBoard, onError = () => {}) => {
    const emptySpaces = oldBoard.flatMap((row, rowIndex) => {
        const validEntries = row.reduce((acc, curr, currIndex) => {
            if (curr === 0) {
                return [...acc, [rowIndex, currIndex]];
            }
            return acc;
        }, []);

        return validEntries;
    });

    try {
        const [rndRow, rndCol] = emptySpaces[
            Math.floor(Math.random() * emptySpaces.length)
        ];
        oldBoard[rndRow][rndCol] = generateNumber();
    } catch (e) {
        onError(e);
    }

    return oldBoard;
};

export default generateTile;
