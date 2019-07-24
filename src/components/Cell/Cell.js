import React, { useState } from 'react';
import Button from '../Button/Button';

const STATUS = Object.freeze({
  FLAGGED: Symbol('FLAGGED'),
  QUESTIONED: Symbol('QUESTIONED'),
  REVEALED: Symbol('REVEALED'),
  NONE: Symbol('NONE'),
});

function Cell({ value, row, column, children }) {
  const [status, setStatus] = useState(STATUS.NONE);

  // TODO: status: flagged, questioned, revealed
  // TODO: value: [0-9]

  function handleClick() {
    setStatus(STATUS.REVEALED);
  }

  return (
    <div onClick={() => handleClick()}>
      <Button>
        {status !== STATUS.NONE ? status.toString() : value}
        {value === 9 ? '💣' : value === 0 ? '' : value}
        {children}
      </Button>
    </div>
  );
}

export default Cell;
