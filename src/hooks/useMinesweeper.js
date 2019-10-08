import { useState, useContext, useEffect } from 'react';
import { CELL_STATUS, GAME_STATUS, CONFIG } from '../utils/enums';
import { GameContext } from '../contexts/game';

export default function useMinesweeper() {
  const [gameState, setGameState] = useContext(GameContext);
  const [board, setBoard] = useState(() => createBoard());

  useEffect(() => {
    const isCompleted = board
      .flat()
      .filter(c => c.value !== 9)
      .every(c => c.status === CELL_STATUS.REVEALED);

    if (isCompleted) {
      setGameState(prevGameState => ({
        ...prevGameState,
        status: GAME_STATUS.COMPLETED,
      }));
    }
  }, [setGameState, board]);

  function newGame() {
    setBoard([...createBoard()]);
    setGameState(prevGameState => ({
      ...prevGameState,
      status: GAME_STATUS.PLAYING,
    }));
  }

  function onCellRevealed(x, y) {
    const revealCell = (row, col) => {
      // check if cell is outside the board
      if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
        return;
      }

      const cell = board[row][col];

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
        board.map(c1 =>
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
    setBoard([...board]);
  }

  function createBoard() {
    const { mines, size } = CONFIG[gameState.difficulty];

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

    function getRandomNumber(max) {
      return Math.floor(Math.random() * 1000 + 1) % max;
    }

    function updateNeighborCells(x, y) {
      const rows = cells.length;
      for (let i = Math.max(0, x - 1); i <= Math.min(rows - 1, x + 1); i++) {
        const columns = cells[i].length;
        for (
          let j = Math.max(0, y - 1);
          j <= Math.min(columns - 1, y + 1);
          j++
        ) {
          const cell = cells[i][j];
          if (i === x && j === y) {
            continue;
          } else if (cell.value !== 9) {
            cell.value++;
          }
        }
      }
    }

    return cells;
  }

  return {
    onCellRevealed,
    gameState,
    board,
    setBoard,
    newGame,
  };
}
