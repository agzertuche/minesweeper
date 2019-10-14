export const DIFFICULTY = Object.freeze({
  BEGGINER: Symbol('BEGGINER'),
  INTERMEDIATE: Symbol('INTERMEDIATE'),
  ADVANCED: Symbol('ADVANCED'),
});

export const GAME_STATUS = Object.freeze({
  PLAYING: Symbol('PLAYING'),
  PAUSED: Symbol('PAUSED'),
  GAMEOVER: Symbol('GAMEOVER'),
  COMPLETED: Symbol('COMPLETED'),
});

export const THEME = Object.freeze({
  DARK: Symbol('DARK'),
  LIGHT: Symbol('LIGHT'),
  HALLOWEEN: Symbol('HALLOWEEN'),
  GAMER: Symbol('GAMER'),
});

export const CELL_STATUS = Object.freeze({
  FLAGGED: Symbol('FLAGGED'),
  QUESTIONED: Symbol('QUESTIONED'),
  REVEALED: Symbol('REVEALED'),
  HIDDEN: Symbol('HIDDEN'),
  EXPLODED: Symbol('EXPLODED'),
});

export const CONFIG = Object.freeze({
  DIFFICULTY: {
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
  },
  THEME: {
    [THEME.LIGHT]: {
      background: '#f2f2f2',
      color: '#333333',
    },
    [THEME.DARK]: {
      background: '#333333',
      color: '#f2f2f2',
    },
    [THEME.HALLOWEEN]: {
      background: '#eb6123',
      color: 'black',
    },
    [THEME.GAMER]: {
      background: '#663399',
      color: 'yellow',
    },
  },
});
