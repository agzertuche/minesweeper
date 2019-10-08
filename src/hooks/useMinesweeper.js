import { useState, useContext, useEffect } from 'react';
import { CELL_STATUS, GAME_STATUS } from '../utils/enums';
import { GameContext } from '../contexts/game';

export default function useMinesweeper({ size = 9, mines = 10 } = {}) {
  const [gameState, setGameState] = useContext(GameContext);
  const [userBoard, setUserBoard] = useState(() => board({ size, mines }));

  useEffect(() => {
    const hiddenCells = userBoard
      .flat()
      .filter(c => c.status === CELL_STATUS.HIDDEN);
    if (hiddenCells.length === mines) {
      setGameState(prevGameState => ({
        ...prevGameState,
        status: GAME_STATUS.COMPLETED,
      }));
    }
  }, [mines, setGameState, userBoard]);

  const newGame = () => {
    setUserBoard([...board({ size, mines })]);
    setGameState(prevGameState => ({
      ...prevGameState,
      status: GAME_STATUS.PLAYING,
    }));
  };

  const onCellRevealed = (x, y) => {
    const revealCell = (row, col) => {
      // check if cell is outside the board
      if (
        row < 0 ||
        row >= userBoard.length ||
        col < 0 ||
        col >= userBoard[0].length
      ) {
        return;
      }

      const cell = userBoard[row][col];

      if (
        cell.status === CELL_STATUS.FLAGGED ||
        cell.status === CELL_STATUS.QUESTIONED
      ) {
        return;
      }

      if (cell.status === CELL_STATUS.REVEALED) {
        return;
      }

      cell.status = CELL_STATUS.REVEALED;

      if (cell.value === 9) {
        setGameState(state => ({ ...state, status: GAME_STATUS.GAMEOVER }));
        userBoard.map(c1 =>
          c1.map(c2 => {
            if (c2.value === 9) {
              c2.status = CELL_STATUS.REVEALED;
            }
            return c2;
          }),
        );
        cell.status = CELL_STATUS.EXPLODED;
        return;
      }

      // stop revealing cells if it has value grather than zero
      if (cell.value > 0) {
        return;
      }

      // recursively reveal neighboard cells
      revealCell(row - 1, col - 1);
      revealCell(row - 1, col);
      revealCell(row - 1, col + 1);
      revealCell(row + 1, col - 1);
      revealCell(row + 1, col);
      revealCell(row + 1, col + 1);
      revealCell(row, col - 1);
      revealCell(row, col + 1);
    };

    revealCell(x, y);
    setUserBoard([...userBoard]);
  };

  return { onCellRevealed, gameState, userBoard, setUserBoard, newGame };
}

const board = ({ size, mines }) => {
  const getRandomNumber = max => Math.floor(Math.random() * 1000 + 1) % max;
  const updateNeighborCells = (x, y) => {
    const rows = cells.length;
    for (let i = Math.max(0, x - 1); i <= Math.min(rows - 1, x + 1); i++) {
      const columns = cells[i].length;
      for (let j = Math.max(0, y - 1); j <= Math.min(columns - 1, y + 1); j++) {
        const cell = cells[i][j];
        if (i === x && j === y) {
          continue;
        } else if (cell.value !== 9) {
          cell.value++;
        }
      }
    }
  };

  // create inital cells array
  const cells = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      status: CELL_STATUS.HIDDEN,
      value: 0,
    })),
  );

  // place mines randomly on board
  let placedMines = 0;
  while (placedMines < mines) {
    const row = getRandomNumber(cells.length);
    const column = getRandomNumber(cells.length);
    const currentCell = cells[row][column];

    // check if the randomly selected cell has already a bomb 💣
    if (currentCell.value === 9) {
      continue;
    }

    // if not place a bomb 💣
    currentCell.value = 9;
    placedMines++;
    updateNeighborCells(row, column);
  }

  return cells;
};
