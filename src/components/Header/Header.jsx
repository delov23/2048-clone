import React, { useContext } from 'react';
import styles from './Header.module.css';
import themify from '../../utils/themify';
import { ThemeContext, LIGHT_THEME } from '../../context/ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={styles[themify(theme, 'header')]}>
            <h2 className={styles.logo}>2048</h2>
            <button className={styles.toggleBtn} onClick={toggleTheme}>{theme === LIGHT_THEME ? '🌚' : '☀️'}</button>
        </div>
    );
};

export default Header;
