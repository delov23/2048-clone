import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import Table from '../../components/Table';

const Game = () => {
    const [board, setBoard] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    const generateTile = useCallback((oldBoard) => {
        const emptySpaces = oldBoard.flatMap((row, rowIndex) => {
            const validEntries = row
                .filter((col) => col === 0)
                .map((col, colIndex) => [rowIndex, colIndex]);

            return validEntries;
        });

        const randomSpace =
            emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        let newBoard = [...oldBoard];
        newBoard[randomSpace[0]][randomSpace[1]] = generateNumber();
        return newBoard;
    }, []);

    const handleLeft = useCallback(() => {
        setBoard((previousBoard) => {
            let newBoard = [];

            for (let row = 0; row < 4; row++) {
                let withoutZeros = previousBoard[row].filter((number) => number > 0);
                let resultWithoutZeros = [];
                console.log('Without zeros', withoutZeros);
                for (let i = 0; i < withoutZeros.length - 1; i++) {
                    if (withoutZeros[i] === withoutZeros[i + 1]) {
                        resultWithoutZeros.push(withoutZeros[i] * 2);
                        i += 1;
                    } else {
                        resultWithoutZeros.push(withoutZeros[i]);
                    }
                }

                if (
                    withoutZeros[withoutZeros.length - 2] !==
                    withoutZeros[withoutZeros.length - 1]
                ) {
                    resultWithoutZeros.push(
                        withoutZeros[withoutZeros.length - 1]
                    );
                }

                let result = [...resultWithoutZeros];
                for (let i = 0; i < 4 - resultWithoutZeros.length; i++) {
                    result.push(0);
                }

                console.log('Result', result);

                newBoard.push(result);
            }

            const finalBoard = generateTile(newBoard);
            return finalBoard;
        });
    }, [generateTile]);

    const handleKeyPress = useCallback(
        (event) => {
            // Left - 37, Up - 38, Right - 39, Down - 49
            if (event.keyCode === 37) {
                handleLeft();
            }
        },
        [handleLeft]
    );

    const generateNumber = () => {
        if (Math.random() < 0.7) {
            return 2;
        }

        return 4;
    };

    useEffect(() => {
        const newBoard = generateTile(board);
        setBoard(newBoard);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <>
            <Header />
            <Table board={board} />
        </>
    );
};

export default Game;
