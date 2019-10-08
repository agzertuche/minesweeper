import React, { useState, useContext } from 'react';
import useInterval from '../../hooks/useInterval';
import { GameContext } from '../../contexts/game';
import { GAME_STATUS } from '../../utils/enums';
import { Counter } from '../Counter';

function Timer({ delay = 1000 }) {
  const [timer, setTimer] = useState(0);
  const [gameState] = useContext(GameContext);

  useInterval(
    () => {
      setTimer(timer + 1);
    },
    gameState.status === GAME_STATUS.PLAYING ? delay : null,
  );

  return <Counter count={timer} />;
}

export default Timer;
