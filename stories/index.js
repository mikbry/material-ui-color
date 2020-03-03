/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorPicker from '../src';

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
  .add('palette', () => <ColorPicker palette={{ red: '#ff0000', blue: '#0000ff' }} />)
  .add('controlled', () => <Controlled value="#fff" />);
