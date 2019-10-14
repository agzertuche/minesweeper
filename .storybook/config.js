import { configure } from '@storybook/react';
import '../src/index.scss';

configure(require.context('../src/components', true, /\.stories\.js$/), module);
