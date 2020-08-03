import React from 'react'

import styles from './Tile.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import themify from '../../utils/themify';

const Tile = ({ number }) => {
    const { theme } = useContext(ThemeContext);

    return <div className={styles[themify(theme, 'tile')]}>{number > 0 && number}</div>
}

export default Tile;