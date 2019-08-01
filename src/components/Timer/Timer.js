import React, { useState, useRef, useEffect } from 'react';

//TODO: improve timer based on https://overreacted.io/making-setinterval-declarative-with-react-hooks/

function Timer({ delay = 1000 }) {
  const [timer, setTimer] = useState(0);
  const timerHandler = useRef(null);

  useEffect(() => {
    if (delay !== null) {
      timerHandler.current = setInterval(() => {
        setTimer(time => time + 1);
      }, delay);
    }
    return () => {
      clearInterval(timerHandler.current);
    };
  }, [delay, timer]);

  return (
    <div>{timer < 10 ? `00${timer}` : timer < 100 ? `0${timer}` : timer}</div>
  );
}

export default Timer;
