import React, { useState, useContext } from 'react';
import './Game.scss';
import { Board } from '../Board';
import { Counter } from '../Counter';
import { Timer } from '../Timer';
import { CONFIG } from '../../utils/enums';
import { GameContext } from '../../contexts/game';
import useTheme from '../../hooks/useTheme';

// TODO: game stats => record, time
const themes = {
  light: {
    background: '#f2f2f2',
    color: '#333333',
  },
  default: {
    background: '#333333',
    color: '#f2f2f2',
  },
  halloween: {
    background: '#eb6123',
    color: 'black',
  },
  gamer: {
    background: '#663399',
    color: 'yellow',
  },
};

function Game() {
  const [theme, setTheme] = useState(themes.default);
  const [gameState, setGameState] = useContext(GameContext);
  const { mines, size } = CONFIG[gameState.difficulty];

  useTheme(theme);

  return (
    <main>
      <header>
        <div>
          {Object.keys(themes).map(themeName => (
            <label key={themeName} htmlFor={themeName}>
              <input
                defaultChecked={themeName === 'default'}
                type="radio"
                name="theme"
                id={themeName}
                value={themeName}
                onChange={() => setTheme(themes[themeName])}
              />
              {themeName}
              <br></br>
            </label>
          ))}
        </div>
        <div>
          {Object.getOwnPropertySymbols(CONFIG).map(difficulty => {
            const difficultyString = difficulty.toString();
            return (
              <label key={difficultyString} htmlFor={difficultyString}>
                <input
                  defaultChecked={difficultyString === 'Symbol(BEGGINER)'}
                  type="radio"
                  name="difficulty"
                  id={difficultyString}
                  value={difficultyString}
                  onChange={() => {
                    setGameState(prevGameState => {
                      return {
                        ...prevGameState,
                        difficulty,
                      };
                    });
                  }}
                />
                {difficultyString}
                <br></br>
              </label>
            );
          })}
        </div>
        <Counter count={mines} />
        <Timer />
      </header>
      <section>
        <Board mines={mines} size={size} />
      </section>
    </main>
  );
}

export default Game;
