/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColorPalette from '../src/components/ColorPalette';

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

test('ColorPalette should render correctly', () => {
  const { asFragment } = render(<ColorPalette palette={palette} />);
  expect(asFragment()).toMatchSnapshot();
});

test('ColorPalette props', () => {
  const { getAllByTestId } = render(<ColorPalette palette={palette} />);
  const buttons = getAllByTestId('colorbutton');
  expect(buttons.length).toBe(13);
  fireEvent.click(buttons[0]);
});

test('ColorPalette onSelect', () => {
  let value;
  let color;
  const onSelect = jest.fn().mockImplementation((newValue, newColor) => {
    value = newValue;
    color = newColor;
  });
  const { getAllByTestId } = render(<ColorPalette palette={palette} onSelect={onSelect} />);
  const buttons = getAllByTestId('colorbutton');
  fireEvent.click(buttons[0]);
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(value).toBe('red');
  expect(color).toBe('#ff0000');
});
