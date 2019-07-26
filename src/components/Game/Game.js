import React from 'react';
import './Game.scss';
import { Grid } from '../Grid';
import { Counter } from '../Counter';

// TODO: game status => playing, paused, gameover
// TODO: game stats => record, time
// TODO: game theme => default, dark, halloween

function Game() {
  // TODO: review if we can replace this function using fill method from array
  const createBoard = size => {
    let cells = [];
    for (let row = 0; row < size; row++) {
      cells[row] = [];
      for (let column = 0; column < size; column++) {
        cells[row].push({
          row,
          column,
          value: 0,
        });
      }
    }
    return cells;
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
    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
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

  const cells = placeMines(createBoard(16), 40);

  return (
    <main>
      <header>
        <Counter>Bomb counter</Counter>
        <Counter>Timer counter</Counter>
      </header>
      <section>
        <Grid size={16} cells={cells} />
      </section>
      <footer>Footer</footer>
    </main>
  );
}

export default Game;
