import React, { useState, useContext } from 'react';
import './Game.scss';
import { Board } from '../Board';
import { Counter } from '../Counter';
import { Timer } from '../Timer';
import { GAME_STATUS, DIFFICULTY, CONFIG } from '../../utils/enums';
import { GameProvider, GameContext } from '../../contexts/game';

// ! TODO: game status => playing, paused, gameover, completed/win
// TODO: game stats => record, time
// TODO: game theme => default, dark, halloween

function Game() {
  // const [difficulty, setDifficulty] = useState(DIFFICULTY.BEGGINER);
  const [state, setState] = useContext(GameContext);

  const { mines, size } = CONFIG[state.difficulty];

  const newGame = () => {
    setState(state => ({
      ...state,
      difficulty:
        state.difficulty === DIFFICULTY.BEGGINER
          ? DIFFICULTY.INTERMEDIATE
          : state.difficulty === DIFFICULTY.INTERMEDIATE
          ? DIFFICULTY.ADVANCED
          : state.difficulty === DIFFICULTY.ADVANCED
          ? DIFFICULTY.BEGGINER
          : DIFFICULTY.BEGGINER,
    }));
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
    </main>
  );
}

export default Game;
