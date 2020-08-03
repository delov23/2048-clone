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

    const [gameOver, setGameOver] = useState(false);

    const generateTile = useCallback((oldBoard) => {
        const emptySpaces = oldBoard.flatMap((row, rowIndex) => {
            const validEntries = row.reduce((acc, curr, currIndex) => {
                if (curr === 0) {
                    return [...acc, [rowIndex, currIndex]];
                }
                return acc;
            }, []);

            return validEntries;
        });

        const randomSpace =
            emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        try {
            oldBoard[randomSpace[0]][randomSpace[1]] = generateNumber();
        } catch (e) {
            setGameOver(true);
        }

        return oldBoard;
    }, []);

    const handleLeft = useCallback(() => {
        setBoard((previousBoard) => {
            let newBoard = [];

            for (let row = 0; row < 4; row++) {
                let withoutZeros = previousBoard[row].filter(
                    (number) => number > 0
                );
                let resultWithoutZeros = [];
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

                const toLength = 4 - resultWithoutZeros.length;
                for (let i = 0; i < toLength; i++) {
                    resultWithoutZeros.push(0);
                }

                newBoard.push(resultWithoutZeros);
            }

            const finalBoard = generateTile(newBoard);
            return finalBoard;
        });
    }, []);

    const handleKeyPress = useCallback(
        (event) => {
            if (!gameOver) {
                // Left - 37, Up - 38, Right - 39, Down - 49
                if (event.keyCode === 37) {
                    handleLeft();
                }
            }
        },
        [handleLeft, gameOver]
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
            {gameOver && 'Game Over'}
        </>
    );
};

export default Game;
