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
  EXPLODED: Symbol('EXPLODED'),
});

export const CONFIG = Object.freeze({
  [DIFFICULTY.BEGGINER]: {
    mines: 10,
    size: 9,
  },
  [DIFFICULTY.INTERMEDIATE]: {
    mines: 40,
    size: 16,
  },
  [DIFFICULTY.ADVANCED]: {
    mines: 99,
    size: 24,
  },
});
