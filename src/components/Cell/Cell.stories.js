import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import Cell, { STATUS } from './Cell';

const cellWithMine = { value: 9 };
const cellEmpty = { value: 0 };
const cellWithValue = { value: 5 };

storiesOf('Cell', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Cell cell={object('cell', { ...cellEmpty })} />;
  })
  .add('without props', () => <Cell />)
  .add('with mine', () => <Cell {...cellWithMine} />)
  .add('empty', () => <Cell {...cellEmpty} />)
  .add('with value', () => <Cell {...cellWithValue} />);
