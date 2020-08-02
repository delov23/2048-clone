import React from 'react';
import Tile from '../Tile';

import styles from './Table.module.css'

const Table = ({ board }) => {
    return (
        <table className={styles.table}>
            <tbody>
                {board.map((row, rowIndex) => (
                    <tr key={rowIndex.toString()}>
                        {row.map((number, colIndex) => (
                            <td key={rowIndex.toString() + colIndex.toString()} className={styles.cell}><Tile number={number} /></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
