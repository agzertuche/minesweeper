import React from 'react';

const GameContext = React.createContext();

export default GameContext;
export const GameConsumer = GameContext.Consumer;
export const GameProvider = GameContext.Provider;
