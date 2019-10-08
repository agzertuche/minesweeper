import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const refCallback = useRef();

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      refCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
