import React, { useState } from 'react';
import './Cell.scss';

export const STATUS = Object.freeze({
  FLAGGED: Symbol('FLAGGED'),
  QUESTIONED: Symbol('QUESTIONED'),
  REVEALED: Symbol('REVEALED'),
  HIDDEN: Symbol('HIDDEN'),
});

function Cell({ value, row, column, children }) {
  const [status, setStatus] = useState(STATUS.HIDDEN);

  const updateStatus = event => {
    event.preventDefault();
    setStatus(prevStatus => {
      switch (prevStatus) {
        case STATUS.FLAGGED:
          return STATUS.QUESTIONED;
        case STATUS.QUESTIONED:
          return STATUS.HIDDEN;
        case STATUS.HIDDEN:
          return STATUS.FLAGGED;
        default:
          return prevStatus;
      }
    });
  };

  const reveal = () => {
    if (status === STATUS.FLAGGED || status === STATUS.QUESTIONED) {
      return;
    }

    setStatus(STATUS.REVEALED);
    if (hasMine()) {
      // ! TODO: trigger game over
    }
  };

  const hasMine = () => {
    return value === 9;
  };

  const printValue = () => {
    if (status === STATUS.REVEALED) {
      return value === 0 ? '' : hasMine() ? '💣' : value;
    }

    if (status === STATUS.FLAGGED) {
      return '🚩';
    }

    if (status === STATUS.QUESTIONED) {
      return '❓';
    }

    return;
  };

  return (
    <button
      type="button"
      className="cell"
      onClick={e => reveal(e)}
      onContextMenu={e => updateStatus(e)}
      disabled={status === STATUS.REVEALED}
    >
      {printValue()}
    </button>
  );
}

export default Cell;
