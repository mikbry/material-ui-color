/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ColorBox } from '../src';

const palette = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: 'yellow',
  cyan: 'cyan',
  lime: 'lime',
  gray: 'gray',
  orange: 'orange',
  purple: 'purple',
  black: 'black',
  white: 'white',
  pink: 'pink',
  darkblue: 'darkblue',
};

export default {
  title: 'Components|ColorBox',
  parameters: { component: ColorBox, componentSubtitle: 'Displays a button filled with a color' },
};

export const Basic = () => (
  <div>
    <ColorBox defaultValue="#000" palette={palette} />
  </div>
);
Basic.story = {
  parameters: { defaultValue: '#000', palette },
};
