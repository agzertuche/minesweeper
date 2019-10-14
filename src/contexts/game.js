import React, { useState } from 'react';
import { DIFFICULTY, GAME_STATUS } from '../utils/enums';

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = props => {
  const [state, setState] = useState({
    difficulty: DIFFICULTY.BEGGINER,
    status: GAME_STATUS.PLAYING,
    time: 0,
    records: [],
  });
  return (
    <GameContext.Provider value={[state, setState]}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
