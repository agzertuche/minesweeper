export const DIFFICULTY = Object.freeze({
  BEGGINER: Symbol('BEGGINER'),
  INTERMEDIATE: Symbol('INTERMEDIATE'),
  ADVANCED: Symbol('ADVANCED'),
});

export const GAME_STATUS = Object.freeze({
  PLAYING: Symbol('PLAYING'),
  PAUSED: Symbol('PAUSED'),
  GAMEOVER: Symbol('GAMEOVER'),
});

export const THEME = Object.freeze({
  LIGHT: Symbol('LIGHT'),
  DARK: Symbol('DARK'),
  HALLOWEEN: Symbol('HALLOWEEN'),
});

export const CELL_STATUS = Object.freeze({
  FLAGGED: Symbol('FLAGGED'),
  QUESTIONED: Symbol('QUESTIONED'),
  REVEALED: Symbol('REVEALED'),
  HIDDEN: Symbol('HIDDEN'),
});
