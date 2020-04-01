/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ColorInput } from '../src';

export default {
  title: 'Components|ColorInput',
  parameters: { component: ColorInput, componentSubtitle: 'Displays a button filled with a color' },
};

const style = { margin: '48px' };

export const Basic = () => (
  <div style={style}>
    <ColorInput defaultValue="red" />
  </div>
);
Basic.story = {
  parameters: { defaultValue: 'red' },
};

export const Hex = () => (
  <div style={style}>
    <ColorInput defaultValue="red" format="hex" margin="dense" size="small" />
  </div>
);
Hex.story = {
  parameters: { color: '', format: 'hex', margin: 'dense', size: 'small' },
};

export const Rgb = () => (
  <div style={style}>
    <ColorInput defaultValue="red" format="rgb" margin="dense" size="small" />
  </div>
);
Rgb.story = {
  parameters: { color: '', format: 'rgb', margin: 'dense', size: 'small' },
};

export const Hsl = () => (
  <div style={style}>
    <ColorInput defaultValue="red" format="hsl" margin="dense" size="small" />
  </div>
);
Hsl.story = {
  parameters: { color: '', format: 'hsl', margin: 'dense', size: 'small' },
};

export const Hsv = () => (
  <div style={style}>
    <ColorInput defaultValue="red" format="hsv" margin="dense" size="small" />
  </div>
);
Hsv.story = {
  parameters: { color: '', format: 'hsv', margin: 'dense', size: 'small' },
};
