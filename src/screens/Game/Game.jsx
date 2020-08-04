import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { LIGHT_THEME, ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import handleDirection from '../../utils/handleDirection';

const Game = () => {
    const [board, setBoard] = useState([]);
    // improve gameOver logic! (when there are no equals next to each other)
    const [gameOver, setGameOver] = useState(false);
    const { theme } = useContext(ThemeContext);

    const generateNumber = useCallback(() => {
        if (Math.random() < 0.7) {
            return 2;
        }

        return 4;
    }, []);

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

        try {
            const [rndRow, rndCol] = emptySpaces[
                Math.floor(Math.random() * emptySpaces.length)
            ];
            oldBoard[rndRow][rndCol] = generateNumber();
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

    const handleRight = useCallback(() => {
        setBoard((previousBoard) => {
            let newBoard = [];

            for (let row = 0; row < 4; row++) {
                let withoutZeros = previousBoard[row].filter(
                    (number) => number > 0
                );
            
                let resultWithoutZeros = [];
                for (let i = withoutZeros.length - 1; i > 0; i--) {
                    if (withoutZeros[i] === withoutZeros[i - 1]) {
                        resultWithoutZeros.unshift(withoutZeros[i] * 2);
                        i -= 1;
                    } else {
                        resultWithoutZeros.unshift(withoutZeros[i]);
                    }
                }

                if (withoutZeros[0] !== withoutZeros[1]) {
                    resultWithoutZeros.unshift(withoutZeros[0]);
                }

                const toLength = 4 - resultWithoutZeros.length;
                for (let i = 0; i < toLength; i++) {
                    resultWithoutZeros.unshift(0);
                }

                newBoard.push(resultWithoutZeros);
            }

            const finalBoard = generateTile(newBoard);
            return finalBoard;
        });
    }, []);

    const handleUp = useCallback(() => {
        setBoard((previousBoard) => {
            let newBoard = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];

            for (let col = 0; col < 4; col++) {
                let withoutZeros = [];
                for (let row = 0; row < 4; row++) {
                    if (previousBoard[row][col] > 0) {
                        withoutZeros.push(previousBoard[row][col]);
                    }
                }

                let resultWithoutZeros = [];
                for (let i = 0; i < withoutZeros.length - 1; i++) {
                    if (withoutZeros[i] === withoutZeros[i + 1]) {
                        resultWithoutZeros.push(withoutZeros[i] * 2);
                        withoutZeros[i] = undefined;
                        withoutZeros[i + 1] = withoutZeros[i] * 2;
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

                console.log(resultWithoutZeros)

                const toLength = 4 - resultWithoutZeros.length;
                for (let i = 0; i < toLength; i++) {
                    resultWithoutZeros.push(0);
                }

                for (let row = 0; row < 4; row++) {
                    newBoard[row][col] = resultWithoutZeros.shift();
                }
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
                } else if (event.keyCode === 38) {
                    handleUp();
                } else if (event.keyCode === 39) {
                    handleRight();
                } else if (event.keyCode === 40) {
                }
            }
        },
        [gameOver]
    );

    useEffect(() => {
        const newBoard = generateTile([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);

        setBoard(newBoard);

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div
            style={{
                backgroundColor:
                    theme === LIGHT_THEME
                        ? 'var(--light-bg)'
                        : 'var(--dark-bg)',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Table board={board} />
            {gameOver && 'Game Over'}
        </div>
    );
};

export default Game;
