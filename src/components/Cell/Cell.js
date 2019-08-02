import React from 'react';
import './Cell.scss';
import { CELL_STATUS } from '../../utils/enums';

function Cell({ status, children, ...eventHandlers }) {
  const hasMine = () => {
    return children === 9;
  };
  const printValue = () => {
    if (status === CELL_STATUS.EXPLODED) {
      return '💥';
    }

    if (status === CELL_STATUS.REVEALED) {
      return children === 0 ? '' : hasMine() ? '💣' : children;
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
      disabled={
        status === CELL_STATUS.REVEALED || status === CELL_STATUS.EXPLODED
      }
      className={status === CELL_STATUS.EXPLODED && 'exploded'}
      {...eventHandlers}
    >
      {printValue()}
    </button>
  );
}

export default Cell;
