const DIFFICULTY = Object.freeze({
  BEGGINER: Symbol('BEGGINER'),
  INTERMEDIATE: Symbol('INTERMEDIATE'),
  ADVANCED: Symbol('ADVANCED'),
});

export const CONFIG = Object.freeze({
  BEGGINER: {
    mines: 10,
    size: 9,
  },
  INTERMEDIATE: {
    mines: 40,
    size: 16,
  },
  ADVANCED: {
    mines: 99,
    size: 24,
  },
});

const STATUS = Object.freeze({
  PLAYING: Symbol('PLAYING'),
  PAUSED: Symbol('PAUSED'),
  GAMEOVER: Symbol('GAMEOVER'),
});

const THEME = Object.freeze({
  LIGHT: Symbol('LIGHT'),
  DARK: Symbol('DARK'),
  HALLOWEEN: Symbol('HALLOWEEN'),
});
