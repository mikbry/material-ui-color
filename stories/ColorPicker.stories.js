/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ColorPicker } from '../src';

const paletteObj = {
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
  darkBlue: 'darkBlue',
};

export default {
  title: 'Components|ColorPicker',
  component: ColorPicker,
};

const style = { margin: '48px' };

export const Basic = () => (
  <div style={style}>
    <ColorPicker defaultValue="#000" />
  </div>
);
Basic.story = {
  parameters: { defaultValue: '#000' },
};

export const Palette = () => (
  <div style={style}>
    <ColorPicker defaultValue="transparent" palette={paletteObj} />
  </div>
);
Palette.story = {
  parameters: { defaultValue: 'transparent', palette: paletteObj },
};

export const Deferred = () => (
  <div style={style}>
    <ColorPicker defaultValue="red" deferred palette={paletteObj} />
  </div>
);
Deferred.story = {
  parameters: { defaultValue: 'red', palette: paletteObj, deferred: true },
};

// eslint-disable-next-line react/prop-types
const Controller = ({ value }) => {
  const [color, setColor] = useState(value);
  const handleChange = newValue => {
    setColor(newValue);
    action('changed')(newValue);
  };
  return (
    <div style={style}>
      <ColorPicker value={color} onChange={handleChange} />
      <button onClick={() => handleChange('rgb(255, 0, 0)')}>set rgb(255, 0, 0)</button>
    </div>
  );
};

export const Controlled = () => (
  <div style={style}>
    <Controller value="#fff" />
  </div>
);
Controlled.story = {
  parameters: { defaultValue: 'red', palette: paletteObj, deferred: true },
};
