import React from 'react';

import styles from './Tile.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import themify from '../../utils/themify';

const NUMBERS_COLOURS = {
    2: '',
    4: '',
    8: '',
    16: '',
    32: '',
    64: '',
    128: '',
    256: '',
    512: '',
    1024: '',
    2048: '',
    4096: '',
    8192: '',
};

const Tile = ({ number }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div style={{ backgroundColor: number <= 8192 ? NUMBERS_COLOURS[number] : '' }} className={styles[themify(theme, 'tile')]}>
            {number > 0 && number}
        </div>
    );
};

export default Tile;
