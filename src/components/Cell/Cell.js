import React from 'react';
import { CELL_STATUS } from '../../utils/enums';
import './Cell.scss';

function Cell({ status, children, ...eventHandlers }) {
  function hasMine() {
    return children === 9;
  }

  function printValue() {
    if (status === CELL_STATUS.EXPLODED) {
      return '💥';
    }

    if (status === CELL_STATUS.FLAGGED) {
      return '🚩';
    }

    if (status === CELL_STATUS.QUESTIONED) {
      return '❓';
    }

    if (status === CELL_STATUS.REVEALED) {
      return children === 0 ? '' : hasMine() ? '💣' : children;
    }
  }

  return (
    <button
      type="button"
      disabled={
        status === CELL_STATUS.REVEALED || status === CELL_STATUS.EXPLODED
      }
      className={status === CELL_STATUS.EXPLODED ? 'exploded' : null}
      {...eventHandlers}
    >
      {printValue()}
    </button>
  );
}

export default Cell;
