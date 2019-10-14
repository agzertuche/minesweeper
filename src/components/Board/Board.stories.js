import React from 'react';
import Board from './Board';

export default {
  title: 'Board',
  component: Board,
};

export const Default = () => <Board size={9} mines={10} />;
export const empty = () => <Board mines={20} size={40} />;
