import React, { useState, useContext } from 'react';
import { Board } from '../Board';
import { Select } from '../Select';
import useTheme from '../../hooks/useTheme';
import { GameContext } from '../../contexts/game';
import { CONFIG, DIFFICULTY, THEME } from '../../utils/enums';
import './Game.scss';

function Game() {
  const [gameState, setGameState] = useContext(GameContext);
  const [theme, setTheme] = useState(CONFIG.THEME[THEME.DARK]);

  useTheme(theme);

  return (
    <main>
      <header>
        <Select
          label="Theme"
          options={THEME}
          onChange={e => setTheme(CONFIG.THEME[THEME[e.target.value]])}
        />
        <Select
          label="Difficulty"
          options={DIFFICULTY}
          onChange={e => {
            const selectedDifficulty = e.target.value;
            setGameState(prevGameState => {
              return {
                ...prevGameState,
                difficulty: DIFFICULTY[selectedDifficulty],
              };
            });
          }}
        />
      </header>
      <section>
        <Board />
      </section>
      {gameState.records.length > 0 && (
        <footer>
          <div>Personal records:</div>
          {gameState.records.map(record => (
            <div key={record}>{record}</div>
          ))}
        </footer>
      )}
    </main>
  );
}

export default Game;
