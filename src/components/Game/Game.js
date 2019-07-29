import React, { useState } from 'react';
import './Game.scss';
import { Board } from '../Board';
import { Counter } from '../Counter';
import { GAME_STATUS, DIFFICULTY } from '../../enums';

// TODO: game status => playing, paused, gameover
// TODO: game stats => record, time
// TODO: game theme => default, dark, halloween

function Game() {
  const [status, setStatus] = useState(GAME_STATUS.PAUSED);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.BEGGINER);

  const CONFIG = Object.freeze({
    [DIFFICULTY.BEGGINER]: {
      mines: 10,
      size: 9,
    },
    [DIFFICULTY.INTERMEDIATE]: {
      mines: 40,
      size: 16,
    },
    [DIFFICULTY.ADVANCED]: {
      mines: 99,
      size: 24,
    },
  });

  return (
    <main>
      <header>
        <Counter>Bomb counter</Counter>
        <Counter>Timer counter</Counter>
      </header>
      <section>
        <Board {...CONFIG[difficulty]} />
      </section>
      <footer>{status.toString()}</footer>
    </main>
  );
}

export default Game;
