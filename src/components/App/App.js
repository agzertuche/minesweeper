import React from 'react';
import './App.scss';
import Cell from '../Cell/Cell';

// TODO: game status => playing, paused, gameover
// TODO: game stats => record, time, difficulty
// TODO: game theme => default, dark, halloween

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cell />
      </header>
    </div>
  );
}

export default App;
