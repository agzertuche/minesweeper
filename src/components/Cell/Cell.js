import React, { useState } from 'react';
import './Cell.scss';
import { CELL_STATUS } from '../../enums';

function Cell({ row, column, status, value, onRevealed, children }) {
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
      className="cell"
      onClick={() => onRevealed(row, column)}
      disabled={status === CELL_STATUS.REVEALED}
    >
      {printValue()}
    </button>
  );
}

export default Cell;
