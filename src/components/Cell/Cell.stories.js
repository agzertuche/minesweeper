import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import Cell from './Cell';
import { CELL_STATUS } from '../../utils/enums';
import './Cell.scss';

const onContextMenu = e => console.log('context menu');
const onClick = () => console.log('click');

const cellWithMine = {
  children: 9,
  status: CELL_STATUS.HIDDEN,
  onContextMenu,
  onClick,
};
const cellEmpty = { children: 0, status: CELL_STATUS.HIDDEN };
const cellWithValue = { children: 5, status: CELL_STATUS.REVEALED };

storiesOf('Cell', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Cell cell={object('cell', { ...cellWithMine })} />;
  })
  .add('without props', () => <Cell />)
  .add('with mine', () => <Cell {...cellWithMine} />)
  .add('empty', () => <Cell {...cellEmpty} />)
  .add('with value', () => <Cell {...cellWithValue} />);
