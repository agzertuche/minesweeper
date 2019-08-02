import React from 'react';
import { Cell } from '../Cell';
import './Board.scss';
import useMinesweeper from '../../hooks/useMinesweeper';
import { CELL_STATUS } from '../../utils/enums';

function Board({ size, mines }) {
  const [cells, onCellRevealed] = useMinesweeper(size, mines);

  const missingBombs = () => {
    const flags = cells.flat().reduce((acc, curr) => {
      if (curr.status === CELL_STATUS.FLAGGED) {
        acc++;
      }
      return acc;
    }, 0);

    return mines - flags;
  };

  const handleReveal = (row, column) => {
    onCellRevealed(row, column);
  };

  return (
    <>
      <div>{`mising bombs: ${missingBombs()}`}</div>
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
    </>
  );
}

export default Board;
