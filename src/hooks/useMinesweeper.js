import { useState, useEffect, useRef, useContext } from 'react';
import { CELL_STATUS, GAME_STATUS } from '../utils/enums';
import { GameContext } from '../contexts/game';

const createBoard = size => {
  let arr = [];
  for (let row = 0; row < size; row++) {
    arr[row] = [];
    for (let column = 0; column < size; column++) {
      arr[row].push({
        row,
        column,
        status: CELL_STATUS.HIDDEN,
      });
    }
  }
  return arr;
};

export default function useMinesweeper(size, mines) {
  const [gameState, setGameState] = useContext(GameContext);
  const [userBoard, setUserBoard] = useState(() => createBoard(size));
  const updatedCells = useRef([]);

  useEffect(() => {
    const createBoard = size => {
      for (let row = 0; row < size; row++) {
        updatedCells.current[row] = [];
        for (let column = 0; column < size; column++) {
          updatedCells.current[row].push({
            row,
            column,
            status: CELL_STATUS.HIDDEN,
            value: 0,
          });
        }
      }
    };

    const placeMines = mines => {
      const getRandomNumber = max => Math.floor(Math.random() * 1000 + 1) % max;

      let placedMines = 0;
      while (placedMines < mines) {
        const row = getRandomNumber(updatedCells.current.length);
        const column = getRandomNumber(updatedCells.current.length);

        if (updatedCells.current[row][column].value === 9) {
          continue;
        }

        updatedCells.current[row][column].value = 9;
        placedMines++;
        updateNeighborCells(row, column);
      }
    };

    const updateNeighborCells = (row, column) => {
      const rows = updatedCells.current.length;
      for (
        let i = Math.max(0, row - 1);
        i <= Math.min(rows - 1, row + 1);
        i++
      ) {
        const columns = updatedCells.current[i].length;
        for (
          let j = Math.max(0, column - 1);
          j <= Math.min(columns - 1, column + 1);
          j++
        ) {
          const cell = updatedCells.current[i][j];
          if (i === row && j === column) {
            continue;
          } else if (cell.value !== 9) {
            cell.value++;
          }
        }
      }
    };

    createBoard(size);
    placeMines(mines);
    setUserBoard(updatedCells.current);
  }, [size, mines]);

  const newGame = () => {
    // TODO: 1. create new board
    // TODO: 2. update game status

    setGameState(GAME_STATUS.PLAYING);
  };

  const onCellRevealed = (x, y) => {
    const revealCell = (row, col) => {
      // check if cell is outside the board
      if (
        row < 0 ||
        row >= updatedCells.current.length ||
        col < 0 ||
        col >= updatedCells.current[0].length
      ) {
        return;
      }

      const cell = updatedCells.current[row][col];

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
        updatedCells.current = updatedCells.current.map(c1 =>
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
    setUserBoard([...updatedCells.current]);
  };

  return { onCellRevealed, gameState, userBoard, setUserBoard };
}
