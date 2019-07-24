import React from 'react';
import './App.scss';
import { Grid } from '../Grid';
import { Counter } from '../Counter';

// TODO: game status => playing, paused, gameover
// TODO: game stats => record, time
// TODO: game theme => default, dark, halloween

function App() {
  return (
    <main>
      <header>
        <Counter>Bomb counter</Counter>
        <Counter>Timer counter</Counter>
      </header>
      <section>
        <Grid size={9} />
        <Grid size={16} />
        <Grid size={24} />
      </section>
      <footer>Footer</footer>
    </main>
  );
}

export default App;
