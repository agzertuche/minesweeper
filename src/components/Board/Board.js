import React from 'react';
import { Cell } from '../Cell';
import './Board.scss';
import useMinesweeper from '../../hooks/useMinesweeper';
import { CELL_STATUS, GAME_STATUS } from '../../utils/enums';

function Board({ size, mines }) {
  const {
    onCellRevealed,
    gameState,
    userBoard,
    setUserBoard,
    newGame,
  } = useMinesweeper(size, mines);

  const missingBombs = () => {
    const flags = userBoard.flat().reduce((acc, curr) => {
      if (curr.status === CELL_STATUS.FLAGGED) {
        acc++;
      }
      return acc;
    }, 0);

    return mines - flags;
  };

  const updateCellStatus = (event, row, column) => {
    event.preventDefault();

    setUserBoard(prevBoard => {
      const cell = prevBoard[row][column];
      switch (cell.status) {
        case CELL_STATUS.FLAGGED:
          cell.status = CELL_STATUS.QUESTIONED;
          break;
        case CELL_STATUS.QUESTIONED:
          cell.status = CELL_STATUS.HIDDEN;
          break;
        case CELL_STATUS.HIDDEN:
          cell.status = CELL_STATUS.FLAGGED;
          break;
        default:
          break;
      }

      return [...prevBoard];
    });
  };

  return (
    <>
      <div>
        {`mising bombs: ${missingBombs()}`}
        <button onClick={newGame}>asdf</button>
      </div>
      <section
        className={`columns-${userBoard.length} ${
          gameState.status === GAME_STATUS.GAMEOVER ? 'gameover' : undefined
        }`}
      >
        {userBoard.map((cell, row) => {
          return cell.map(({ status, value }, column) => (
            <Cell
              key={`${row},${column}`}
              status={status}
              onContextMenu={e => updateCellStatus(e, row, column)}
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
