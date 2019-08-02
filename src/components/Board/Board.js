import React, { useState } from 'react';
import { Cell } from '../Cell';
import './Board.scss';
import useMinesweeper from '../../hooks/useMinesweeper';
import { CELL_STATUS } from '../../utils/enums';

function Board({ size, mines }) {
  const { cells, onCellRevealed, gameState } = useMinesweeper(size, mines);
  const [userBoard, setUserBoard] = useState([]);

  const missingBombs = () => {
    const flags = cells.flat().reduce((acc, curr) => {
      if (curr.status === CELL_STATUS.FLAGGED) {
        acc++;
      }
      return acc;
    }, 0);

    return mines - flags;
  };

  const updateCellStatus = event => {
    event.preventDefault();
    setUserBoard(prevStatus => {
      switch (prevStatus) {
        case CELL_STATUS.FLAGGED:
          return CELL_STATUS.QUESTIONED;
        case CELL_STATUS.QUESTIONED:
          return CELL_STATUS.HIDDEN;
        case CELL_STATUS.HIDDEN:
          return CELL_STATUS.FLAGGED;
        default:
          return prevStatus;
      }
    });
  };

  return (
    <>
      <div>{`mising bombs: ${missingBombs()}`}</div>
      <section className={`columns-${cells.length}`}>
        {cells.map(cell => {
          return cell.map(({ row, column, status, value }) => (
            <Cell
              key={`${row},${column}`}
              status={status}
              onContextMenu={e => updateCellStatus(e)}
              onClick={() => onCellRevealed(row, column)}
            >
              {value}
            </Cell>
          ));
        })}
      </section>
      <div>{`status: ${gameState.status.toString()}`}</div>
    </>
  );
}

export default Board;
