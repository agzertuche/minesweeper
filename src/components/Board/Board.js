import React, { useContext } from 'react';
import { Cell } from '../Cell';
import { Counter } from '../Counter';
import { Timer } from '../Timer';
import { CELL_STATUS, GAME_STATUS, CONFIG } from '../../utils/enums';
import { GameContext } from '../../contexts/game';
import useMinesweeper from '../../hooks/useMinesweeper';

import './Board.scss';

function Board() {
  const { onCellRevealed, board, setBoard, startNewGame } = useMinesweeper();
  const [gameState] = useContext(GameContext);

  function onCellMarked(event, row, column) {
    event.preventDefault();

    setBoard(prevBoard => {
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
  }

  function missingBombs() {
    const { mines } = CONFIG.DIFFICULTY[gameState.difficulty];
    const flags = board.flat().filter(x => x.status === CELL_STATUS.FLAGGED);

    return mines - flags.length;
  }

  return (
    <>
      <div className="stats">
        <Counter label="Mines: " count={missingBombs()} />
        <button onClick={startNewGame}>
          {
            {
              PLAYING: '🧐',
              PAUSED: '😯',
              GAMEOVER: '🤯',
              COMPLETED: '😎',
            }[gameState.status.description]
          }
        </button>
        <Timer />
      </div>
      <div
        className={`board columns-${board.length} ${
          gameState.status === GAME_STATUS.GAMEOVER ||
          gameState.status === GAME_STATUS.COMPLETED
            ? 'gameover'
            : undefined
        }`}
      >
        {board.map((cell, row) => {
          return cell.map(({ status, value }, column) => (
            <Cell
              key={`${row},${column}`}
              status={status}
              onContextMenu={e => onCellMarked(e, row, column)}
              onClick={() => onCellRevealed(row, column)}
            >
              {value}
            </Cell>
          ));
        })}
      </div>
    </>
  );
}

export default Board;
