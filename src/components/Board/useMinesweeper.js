import { setCells, useState, useEffect, useRef } from 'react';
import { CELL_STATUS } from '../../enums';

export default function useMinesweeper(size, mines) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    // TODO: review if we can replace this function using fill method from array
    const createBoard = size => {
      let arr = [];
      for (let row = 0; row < size; row++) {
        arr[row] = [];
        for (let column = 0; column < size; column++) {
          arr[row].push({
            row,
            column,
            status: CELL_STATUS.HIDDEN,
            value: 0,
          });
        }
      }
      return arr;
    };

    const placeMines = (board = Array.fill(9), mines = 10) => {
      const getRandomNumber = max => Math.floor(Math.random() * 1000 + 1) % max;

      let placedMines = 0;
      while (placedMines < mines) {
        const row = getRandomNumber(board.length);
        const column = getRandomNumber(board.length);

        if (board[row][column].value === 9) {
          continue;
        }

        board[row][column].value = 9;
        placedMines++;
        updateNeighborCells(board, row, column);
      }

      return board;
    };

    const updateNeighborCells = (board, row, column) => {
      const rows = board.length;
      for (
        let i = Math.max(0, row - 1);
        i <= Math.min(rows - 1, row + 1);
        i++
      ) {
        const columns = board[i].length;
        for (
          let j = Math.max(0, column - 1);
          j <= Math.min(columns - 1, column + 1);
          j++
        ) {
          const cell = board[i][j];
          if (i === row && j === column) {
            continue;
          } else if (cell.value !== 9) {
            cell.value++;
          }
        }
      }
    };

    console.log({ cells });
    setCells(placeMines(createBoard(9), 10));
    // setCells(() => placeMines(createBoard(size), mines));
  }, [cells]);

  const onCellRevealed = (row, col) => {
    // check if cell is outside the board
    if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length) {
      return;
    }

    if (
      cells[row][col].status === CELL_STATUS.FLAGGED ||
      cells[row][col].status === CELL_STATUS.QUESTIONED
    ) {
      return;
    }

    // const cell = cells[row][col];
    if (cells[row][col].status === CELL_STATUS.REVEALED) {
      return;
    }

    // console.log('cells[row][col]', cells[row][col]);
    cells[row][col].status = CELL_STATUS.REVEALED;

    if (cells[row][col].value === 9) {
      // TODO: trigger game over
      console.warn('game over');
      return;
    }

    // stop revealing cells if it has value grather than zero
    if (cells[row][col].value > 0) {
      return;
    }

    // recursively reveal neighboard cells
    // onCellRevealed(row - 1, col - 1);
    onCellRevealed(row - 1, col);
    // onCellRevealed(row - 1, col + 1);
    // onCellRevealed(row + 1, col - 1);
    onCellRevealed(row + 1, col);
    // onCellRevealed(row + 1, col + 1);
    onCellRevealed(row, col - 1);
    onCellRevealed(row, col + 1);

    // setCells(cells);
    console.log('onReveledCell');
    // return cells;
  };

  return [cells, onCellRevealed];
}
