import React, { useEffect } from 'react';

const Game = () => {
    const handleKeyPress = () => {};

    useEffect(() => {
        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return <div></div>;
};

export default Game;
