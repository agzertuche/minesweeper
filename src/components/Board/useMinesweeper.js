import { useState, useEffect } from 'react';
import { CELL_STATUS } from '../../enums';

export default function useMinesweeper(size, mines) {
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const createBoard = size => {
      for (let row = 0; row < size; row++) {
        _cells[row] = [];
        for (let column = 0; column < size; column++) {
          _cells[row].push({
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
        const row = getRandomNumber(_cells.length);
        const column = getRandomNumber(_cells.length);

        if (_cells[row][column].value === 9) {
          continue;
        }

        _cells[row][column].value = 9;
        placedMines++;
        updateNeighborCells(row, column);
      }
    };

    const updateNeighborCells = (row, column) => {
      const rows = _cells.length;
      for (
        let i = Math.max(0, row - 1);
        i <= Math.min(rows - 1, row + 1);
        i++
      ) {
        const columns = _cells[i].length;
        for (
          let j = Math.max(0, column - 1);
          j <= Math.min(columns - 1, column + 1);
          j++
        ) {
          const cell = _cells[i][j];
          if (i === row && j === column) {
            continue;
          } else if (cell.value !== 9) {
            cell.value++;
          }
        }
      }
    };

    let _cells = [];
    createBoard(size);
    placeMines(mines);
    setCells(_cells);
  }, [size, mines]);

  const onCellRevealed = (x, y) => {
    const revealCell = (row, col) => {
      // check if cell is outside the board
      if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length) {
        return;
      }

      const cell = cells[row][col];

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
        // TODO: trigger game over
        console.warn('game over');
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
    setCells([...cells]);
  };

  return [cells, onCellRevealed];
}
