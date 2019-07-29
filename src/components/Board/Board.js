import React from 'react';
import { Cell } from '../Cell';
import './Board.scss';
import useMinesweeper from './useMinesweeper';

function Board({ size, mines }) {
  const [cells, onCellRevealed] = useMinesweeper(size, mines);

  const handleReveal = (row, column) => {
    onCellRevealed(row, column);
  };

  console.log('board', { cells });
  return (
    <section className={`columns-${cells.length}`}>
      {cells.map(cell => {
        console.log('cells', { cell });
        return cell.map(({ row, column, status, value }) => (
          <Cell
            key={`${row},${column}`}
            row={row}
            column={column}
            status={status}
            value={value}
            onRevealed={() => handleReveal(row, column)}
          >
            {value}
          </Cell>
        ));
      })}
    </section>
  );
}

export default Board;
