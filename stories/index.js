/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ColorPicker, ColorButton, ColorField } from '../src';

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

const Controlled = ({ value }) => {
  const [color, setColor] = useState(value);
  const handleChange = newValue => {
    setColor(newValue);
    action('changed')(newValue);
  };
  return (
    <div>
      <ColorPicker value={color} />
      <button onClick={() => handleChange('rgb(255, 0, 0)')}>set rgb(255, 0, 0)</button>
    </div>
  );
};

storiesOf('ColorPicker', module)
  .add('basic', () => <ColorPicker />)
  .add('palette', () => <ColorPicker palette={palette} />)
  .add('deferred', () => <ColorPicker palette={palette} deferred value="red" />)
  .add('controlled', () => <Controlled value="#fff" />);

storiesOf('ColorButton', module)
  .add('empty', () => <ColorButton color="" />)
  .add('red', () => <ColorButton color="red" />);

const style = { margin: '48px' };

storiesOf('ColorInput', module)
  .add('default', () => (
    <div style={style}>
      <ColorField color="" />
    </div>
  ))
  .add('hex', () => (
    <div style={style}>
      <ColorField color="red" type="hex" margin="dense" size="small" />
    </div>
  ))
  .add('rgb', () => (
    <div style={style}>
      <ColorField color="red" type="rgb" margin="dense" size="small" />
    </div>
  ))
  .add('hsv', () => (
    <div style={style}>
      <ColorField color="red" type="hsv" margin="dense" size="small" />
    </div>
  ))
  .add('hsl', () => (
    <div style={style}>
      <ColorField color="red" type="hsl" margin="dense" size="small" />
    </div>
  ));

storiesOf('ColorPalette', module).add('basic', () => <ColorPicker />);
