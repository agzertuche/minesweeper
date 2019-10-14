import React, { useContext } from 'react';
import useInterval from '../../hooks/useInterval';
import { GameContext } from '../../contexts/game';
import { GAME_STATUS } from '../../utils/enums';
import { Counter } from '../Counter';

function Timer({ delay = 1000 }) {
  const [gameState, setGameState] = useContext(GameContext);

  useInterval(
    () => {
      setGameState(prevGameState => ({
        ...prevGameState,
        time: prevGameState.time + 1,
      }));
    },
    gameState.status === GAME_STATUS.PLAYING ? delay : null,
  );

  return <Counter label="Timer: " count={gameState.time} />;
}

export default Timer;
