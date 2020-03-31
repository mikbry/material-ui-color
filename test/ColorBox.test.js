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
import ColorBox from '../src/components/ColorBox';

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

const originalclientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const originalclientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight');

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 308 });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 116 });
});

afterAll(() => {
  if (originalclientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalclientWidth);
  if (originalclientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalclientHeight);
});

test('ColorBox should render correctly', () => {
  const { asFragment } = render(<ColorBox defaultValue="darkBlue" />);
  expect(asFragment()).toMatchSnapshot();
});

test('ColorBox props', async () => {
  const { getAllByTestId, findByTestId } = render(<ColorBox defaultValue="#830A0A7D" />);
  const inputs = getAllByTestId('colorinput-input');
  expect(inputs.length).toBe(4);
  expect(inputs[0].value).toBe('830A0A7D');
  expect(inputs[1].value).toBe('131');
  expect(inputs[2].value).toBe('10');
  expect(inputs[3].value).toBe('10');
  const labels = getAllByTestId('colorinput-label');
  expect(labels.length).toBe(4);
  expect(labels[0].textContent).toBe('HEX');
  expect(labels[1].textContent).toBe('R');
  expect(labels[2].textContent).toBe('G');
  expect(labels[3].textContent).toBe('B');
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyleRule('background', 'rgb(255,0,0) none repeat scroll 0% 0%');
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle('left: 282px');
  expect(component).toHaveStyle('top: 56px');
  component = await findByTestId('hueslider');
  let span = component.querySelector('.MuiSlider-track');
  expect(span).toHaveStyle('width: 0%');
  span = component.querySelector('.MuiSlider-thumb');
  expect(span).toHaveStyle('left: 0%');
  component = await findByTestId('alphaslider');
  span = component.querySelector('.MuiSlider-track');
  expect(span).toHaveStyle('width: 49%');
  span = component.querySelector('.MuiSlider-thumb');
  expect(span).toHaveStyle('left: 49%');
});

test('ColorBox palette onChange', () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { getAllByTestId } = render(<ColorBox value="darkblue" palette={palette} onChange={onChange} />);
  const buttons = getAllByTestId('colorbutton');
  expect(buttons.length).toBe(13);
  fireEvent.click(buttons[0]);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(value.name).toBe('red');
  expect(value.raw).toBe('#ff0000');
});

test('ColorBox deferred', () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { getAllByTestId, getByText } = render(<ColorBox value="darkblue" deferred onChange={onChange} />);
  const inputs = getAllByTestId('colorinput-input');
  fireEvent.change(inputs[0], { target: { value: 'FF0000' } });
  expect(onChange).toHaveBeenCalledTimes(0);
  const button = getByText('Set');
  fireEvent.click(button);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(value.name).toBe('red');
  expect(value.raw).toBe('#FF0000');
});
