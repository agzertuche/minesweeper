import React from 'react';
import { Cell } from '../Cell';
import './Board.scss';
import useMinesweeper from './useMinesweeper';

function Board({ size, mines }) {
  //TODO: add active cell I think it will simplify minesweeper logic + hooks
  const [cells, setCells, onCellRevealed] = useMinesweeper(size, mines);

  const handleReveal = (row, column) => {
    setCells(cells => [...onCellRevealed(row, column)]);
  };

  return (
    <section className={`columns-${cells.length}`}>
      {cells.map(cell => {
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
