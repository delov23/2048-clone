import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header';
import Table from '../../components/Table';
import { LIGHT_THEME, ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import generateTile from '../../utils/generateTile';
import handleDirection, { DIRECTIONS } from '../../utils/handleDirection';

const Game = () => {
    const [board, setBoard] = useState([]);
    // improve gameOver logic! (when there are no equals next to each other)
    const [gameOver, setGameOver] = useState(false);
    const { theme } = useContext(ThemeContext);

    const onError = () => {
        setGameOver(true);
    };

    const handleLeft = useCallback(() => {
        setBoard(handleDirection(DIRECTIONS.LEFT, onError));
    }, []);

    const handleRight = useCallback(() => {
        setBoard(handleDirection(DIRECTIONS.RIGHT, onError));
    }, []);

    const handleUp = useCallback(() => {
        setBoard(handleDirection(DIRECTIONS.UP, onError));
    }, []);

    const handleDown = useCallback(() => {
        setBoard(handleDirection(DIRECTIONS.DOWN, onError));
    }, [])

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
                    handleDown();
                }
            }
        },
        [gameOver, handleLeft, handleRight, handleUp, handleDown]
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
