import React from 'react';
import Tile from '../Tile';

import styles from './Table.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import themify from '../../utils/themify';

const Table = ({ board }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <main className={styles.wrapper}>
            <table className={styles[themify(theme, 'table')]}>
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex.toString()}>
                            {row.map((number, colIndex) => (
                                <td
                                    key={
                                        rowIndex.toString() +
                                        colIndex.toString()
                                    }
                                    className={styles.cell}
                                >
                                    <Tile number={number} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Table;
