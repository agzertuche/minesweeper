import React, { useState } from 'react';
import Button from '../Button/Button';

function Cell({ x, y, hasMine, value }) {
  // state => isFlagged, isRevealed
  const [isRevealed, setRevealed] = useState(false);

  function handleRevealed() {
    setRevealed(true);
  }

  return (
    <div onClick={() => handleRevealed()}>
      <Button>{isRevealed ? 'flagged' : value}</Button>
    </div>
  );
}

export default Cell;