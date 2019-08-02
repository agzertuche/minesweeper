import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Game } from './components/Game';
import * as serviceWorker from './serviceWorker';
import { GameProvider } from './contexts/game';

ReactDOM.render(
  <GameProvider>
    <Game />
  </GameProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
