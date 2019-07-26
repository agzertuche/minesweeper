import React from 'react';
import { Cell } from '../Cell';
import './Grid.scss';

// TODO: Size
// TODO: array of cells

function Grid({ size, cells }) {
  return (
    <section className={`columns-${size}`}>
      {cells.map(row =>
        row.map(({ row, column, value }) => (
          <Cell
            key={`${row},${column}`}
            row={row}
            column={column}
            value={value}
          ></Cell>
        )),
      )}
    </section>
  );
}

export default Grid;
