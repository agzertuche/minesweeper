import React from 'react';
import { Cell } from '../Cell';
import './Grid.scss';

// TODO: Size
// TODO: array of cells

function Grid({ size }) {
  let cells = [];
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      cells.push(
        <Cell row={row} column={column} value={column + row}>
          {column + row}
        </Cell>,
      );
    }
  }
  return (
    <section className={`columns-${size}`}>{cells.map(cell => cell)}</section>
  );
}

export default Grid;
