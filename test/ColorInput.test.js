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
import ColorInput from '../src/components/ColorInput';

test('ColorInput should render correctly', () => {
  const { asFragment } = render(<ColorInput defaultValue="darkBlue" />);
  expect(asFragment()).toMatchSnapshot();
});

test('ColorInput plain set props', () => {
  const { getByTestId, rerender } = render(<ColorInput defaultValue="" />);
  expect(getByTestId('colorinput-input').value).toBe('');
  expect(getByTestId('colorinput-label').textContent).toBe('Color');
  rerender(<ColorInput defaultValue="red" />);
  expect(getByTestId('colorinput-input').value).toBe('red');
  expect(getByTestId('colorinput-label').textContent).toBe('Color');
});

test('ColorInput hex', () => {
  const { getByTestId } = render(<ColorInput defaultValue="red" format="hex" />);
  expect(getByTestId('colorinput-input').value).toBe('FF0000');
  expect(getByTestId('colorinput-label').textContent).toBe('HEX');
});

test('ColorInput rgb', () => {
  const { getAllByTestId } = render(<ColorInput defaultValue="red" format="rgb" />);
  const inputs = getAllByTestId('colorinput-input');
  const labels = getAllByTestId('colorinput-label');
  expect(inputs.length).toBe(3);
  expect(labels.length).toBe(3);
  expect(inputs[0].value).toBe('255');
  expect(labels[0].textContent).toBe('R');
  expect(inputs[1].value).toBe('0');
  expect(labels[1].textContent).toBe('G');
  expect(inputs[2].value).toBe('0');
  expect(labels[2].textContent).toBe('B');
});

test('ColorInput hsl', () => {
  const { getAllByTestId } = render(<ColorInput defaultValue="red" format="hsl" />);
  const inputs = getAllByTestId('colorinput-input');
  const labels = getAllByTestId('colorinput-label');
  expect(inputs.length).toBe(3);
  expect(labels.length).toBe(3);
  expect(inputs[0].value).toBe('0');
  expect(labels[0].textContent).toBe('H');
  expect(inputs[1].value).toBe('100');
  expect(labels[1].textContent).toBe('S');
  expect(inputs[2].value).toBe('51');
  expect(labels[2].textContent).toBe('L');
});

test('ColorInput hsv', () => {
  const { getAllByTestId } = render(<ColorInput defaultValue="red" format="hsv" />);
  const inputs = getAllByTestId('colorinput-input');
  const labels = getAllByTestId('colorinput-label');
  expect(inputs.length).toBe(3);
  expect(labels.length).toBe(3);
  expect(inputs[0].value).toBe('0');
  expect(labels[0].textContent).toBe('H');
  expect(inputs[1].value).toBe('100');
  expect(labels[1].textContent).toBe('S');
  expect(inputs[2].value).toBe('100');
  expect(labels[2].textContent).toBe('V');
});

test('ColorInput onChange uncontrolled', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { getByTestId, findByTestId } = render(<ColorInput value="red" onChange={onChange} />);
  let input = getByTestId('colorinput');
  input = await findByTestId('colorinput-input');
  expect(input.value).toBe('red');
  fireEvent.change(input, { target: { value: 'blue' } });
  expect(onChange).toHaveBeenCalledTimes(1);
  input = await findByTestId('colorinput-input');
  expect(input.value).toBe('red');
  expect(value).toBe('blue');
});

test('ColorInput onChange controlled', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    // Should not be called
    value = newValue;
  });
  const { getByTestId, findByTestId } = render(<ColorInput defaultValue="red" onChange={onChange} />);
  let input = getByTestId('colorinput');
  input = await findByTestId('colorinput-input');
  expect(input.value).toBe('red');
  fireEvent.change(input, { target: { value: 'blue' } });
  expect(onChange).toHaveBeenCalledTimes(0);
  input = await findByTestId('colorinput-input');
  expect(input.value).toBe('blue');
  expect(value).toBe(undefined);
});
