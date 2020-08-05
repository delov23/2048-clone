import generateTile from './generateTile';

export const DIRECTIONS = {
    LEFT: 'l',
    RIGHT: 'r',
    UP: 'u',
    DOWN: 'd',
};

const mapColToRow = (resultMatrix, rowArray, colIndex) => {
    let result = [...resultMatrix];

    for (let i = 0; i < 4; i++) {
        if (!result[i]) {
            result[i] = [];
        }

        result[i][colIndex] = rowArray.shift();
    }

    return result;
};

const removeZeros = (arr, direction, { previousBoard, col }) => {
    if (direction === DIRECTIONS.LEFT || direction === DIRECTIONS.RIGHT) {
        return arr.filter((number) => number > 0);
    } else {
        const result = [];
        
        for (let row = 0; row < 4; row++) {
            if (previousBoard[row][col] > 0) {
                result.push(previousBoard[row][col]);
            }
        }
        
        return result;
    }
};

const sumAlike = (arr) => {
    const { length } = arr;
    let result = [];

    for (let i = 0; i < length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            result.push(arr[i] * 2);
            arr[i] = undefined;
            arr[i + 1] = arr[i] * 2;
            i += 1;
        } else {
            result.push(arr[i]);
        }
    }

    if (arr[length - 2] !== arr[length - 1]) {
        result.push(arr[length - 1]);
    }

    return result;
};

const padZeros = (arr, direction) => {
    const toLength = 4 - arr.length;
    for (let i = 0; i < toLength; i++) {
        if (direction === DIRECTIONS.RIGHT) {
            arr.unshift(0);
        } else {
            arr.push(0);
        }
    }

    return arr;
};

const handleDirection = (direction) => (previousBoard, onError) => {
    let newBoard = [];

    const reversed =
        direction === DIRECTIONS.RIGHT || direction === DIRECTIONS.DOWN;
    const vertical =
        direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN;

    for (let i = 0; i < 4; i++) {
        let withoutZeros = removeZeros(previousBoard[i], direction, {
            previousBoard,
            col: i,
        });
        if (reversed) {
            withoutZeros = withoutZeros.reverse();
        }

        let resultWithoutZeros = sumAlike(withoutZeros);
        if (reversed) {
            resultWithoutZeros = resultWithoutZeros.reverse();
        }

        let result = padZeros(resultWithoutZeros, direction);
        if (vertical) {
            newBoard = mapColToRow(newBoard, result, i);
        } else {
            newBoard.push(result);
        }
    }

    const finalBoard = generateTile(newBoard, onError);
    return finalBoard;
};

export default handleDirection;
