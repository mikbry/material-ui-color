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
import ColorPicker from '../src/components/ColorPicker';

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

test('ColorPicker should render correctly', () => {
  const { asFragment } = render(<ColorPicker palette={palette} />);
  expect(asFragment()).toMatchSnapshot();
});

test('ColorPicker onChange uncontrolled', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorPicker value="red" onChange={onChange} />);
  let input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('red');
  fireEvent.change(input, { target: { value: 'blue' } });
  expect(onChange).toHaveBeenCalledTimes(1);
  input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('red');
  expect(value).toBe('blue');
});

test('ColorPicker onChange controlled', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    // Should not be called
    value = newValue;
  });
  const { findByTestId } = render(<ColorPicker defaultValue="red" onChange={onChange} />);
  let input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('red');
  fireEvent.change(input, { target: { value: 'blue' } });
  expect(onChange).toHaveBeenCalledTimes(0);
  input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('blue');
  expect(value).toBe(undefined);
});
