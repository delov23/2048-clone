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

    const handleKeyPress = (event) => {
        // Left - 37, Up - 38, Right - 39, Down - 49
        if (event.keyCode === 37) {
            handleLeft();
        }
    };

    // right?
    const handleLeft = () => {
        let success = false;

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === board[row][col + 1]) {
                    board[row][col] *= 2; 
                    board[row][col + 1] = 0;
                    success = true;
                    col += 1;
                }
            }
        }

        if (success) {
            generateTile();
        } else {

        }
    }

    // const handleUp = () => {

    // }

    // const handleDown = () => {

    // }

    // const handleRight = () => {

    // }

    const generateTile = useCallback(() => {
        const emptySpaces = board.flatMap((row, rowIndex) => {
            const validEntries = row.map((col, colIndex) => {
                if (col === 0) return [rowIndex, colIndex];
            });

            return validEntries;
        });

        const randomSpace =
            emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
        board[randomSpace[0]][randomSpace[1]] = generateNumber();
        setBoard([...board]);
    }, [board]);

    const generateNumber = () => {
        if (Math.random() < 0.7) {
            return 2;
        }

        return 4;
    };

    useEffect(() => {
        generateTile();
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
