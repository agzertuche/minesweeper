import React, { useState, useEffect } from 'react';
import './Cell.scss';
import { CELL_STATUS } from '../../enums';

function Cell({ row, column, status: initialStatus, value, onRevealed }) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const flagCell = event => {
    event.preventDefault();
    setStatus(prevStatus => {
      switch (prevStatus) {
        case CELL_STATUS.FLAGGED:
          return CELL_STATUS.QUESTIONED;
        case CELL_STATUS.QUESTIONED:
          return CELL_STATUS.HIDDEN;
        case CELL_STATUS.HIDDEN:
          return CELL_STATUS.FLAGGED;
        default:
          return prevStatus;
      }
    });
  };

  const reveal = () => {
    if (status === CELL_STATUS.FLAGGED || status === CELL_STATUS.QUESTIONED) {
      return;
    }

    onRevealed(row, column);
  };

  const hasMine = () => {
    return value === 9;
  };

  const printValue = () => {
    if (status === CELL_STATUS.REVEALED) {
      return value === 0 ? '' : hasMine() ? '💣' : value;
    }

    if (status === CELL_STATUS.FLAGGED) {
      return '🚩';
    }

    if (status === CELL_STATUS.QUESTIONED) {
      return '❓';
    }
  };

  return (
    <button
      type="button"
      onClick={reveal}
      onContextMenu={e => flagCell(e)}
      disabled={status === CELL_STATUS.REVEALED}
    >
      {printValue()}
    </button>
  );
}

export default Cell;
