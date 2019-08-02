import React, { useState } from 'react';
import './Game.scss';
import { Board } from '../Board';
import { Counter } from '../Counter';
import { Timer } from '../Timer';
import { GAME_STATUS, DIFFICULTY, CONFIG } from '../../utils/enums';

// ! TODO: game status => playing, paused, gameover, completed/win
// TODO: game stats => record, time
// TODO: game theme => default, dark, halloween

function Game() {
  const [status, setStatus] = useState(GAME_STATUS.PAUSED);
  const [difficulty, setDifficulty] = useState(DIFFICULTY.BEGGINER);

  const { mines, size } = CONFIG[difficulty];

  const newGame = () => {
    setDifficulty(
      difficulty === DIFFICULTY.BEGGINER
        ? DIFFICULTY.INTERMEDIATE
        : difficulty === DIFFICULTY.INTERMEDIATE
        ? DIFFICULTY.ADVANCED
        : difficulty === DIFFICULTY.ADVANCED
        ? DIFFICULTY.BEGGINER
        : DIFFICULTY.BEGGINER,
    );
  };

  return (
    <main>
      <header>
        <Counter count={mines} />
        <button onClick={newGame}>New Game</button>
        <Timer />
      </header>
      <section>
        <Board mines={mines} size={size} />
      </section>
      <footer>{status.toString()}</footer>
    </main>
  );
}

export default Game;
