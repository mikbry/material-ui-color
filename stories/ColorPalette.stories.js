/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ColorPalette } from '../src';

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
  title: 'Components|ColorPalette',
  component: ColorPalette,
};

const style = { margin: '48px' };

export const Basic = () => (
  <div style={style}>
    <ColorPalette palette={palette} />
  </div>
);
Basic.story = {
  parameters: { palette },
};
