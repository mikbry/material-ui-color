/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ColorPicker, ColorButton, ColorBox, ColorInput, ColorPalette } from '../src';

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
  darkBlue: 'darkBlue',
};

// eslint-disable-next-line react/prop-types
const Controlled = ({ value }) => {
  const [color, setColor] = useState(value);
  const handleChange = newValue => {
    setColor(newValue);
    action('changed')(newValue);
  };
  return (
    <div>
      <ColorPicker value={color} onChange={handleChange} />
      <button onClick={() => handleChange('rgb(255, 0, 0)')}>set rgb(255, 0, 0)</button>
    </div>
  );
};

storiesOf('ColorPicker', module)
  .add('basic', () => <ColorPicker defaultValue="#000" />)
  .add('palette', () => <ColorPicker palette={palette} defaultValue="transparent" />)
  .add('deferred', () => <ColorPicker palette={palette} deferred defaultValue="red" />)
  .add('controlled', () => <Controlled value="#fff" />);

storiesOf('ColorButton', module)
  .add('empty', () => <ColorButton color="" />)
  .add('red', () => <ColorButton color="red" />);

const style = { margin: '48px' };

storiesOf('ColorInput', module)
  .add('default', () => (
    <div style={style}>
      <ColorInput defaultValue="red" />
    </div>
  ))
  .add('hex', () => (
    <div style={style}>
      <ColorInput defaultValue="red" format="hex" margin="dense" size="small" />
    </div>
  ))
  .add('rgb', () => (
    <div style={style}>
      <ColorInput defaultValue="red" format="rgb" margin="dense" size="small" />
    </div>
  ))
  .add('hsv', () => (
    <div style={style}>
      <ColorInput defaultValue="red" format="hsv" margin="dense" size="small" />
    </div>
  ))
  .add('hsl', () => (
    <div style={style}>
      <ColorInput defaultValue="red" format="hsl" margin="dense" size="small" />
    </div>
  ));

storiesOf('ColorPalette', module).add('basic', () => <ColorPalette palette={palette} />);

storiesOf('ColorBox', module).add('basic', () => <ColorBox defaultValue="#000" deferred palette={palette} />);
