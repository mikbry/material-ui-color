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
  darkblue: 'darkblue',
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
  const { findByTestId } = render(<ColorPicker defaultValue="red" />);
  let input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('red');
  fireEvent.change(input, { target: { value: 'blue' } });
  expect(onChange).toHaveBeenCalledTimes(0);
  input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('blue');
  expect(value).toBe(undefined);
});

test('ColorPicker disableTextfield', async () => {
  const { findByTestId } = render(<ColorPicker value="red" disableTextfield />);
  expect(await findByTestId('colorpicker-noinput')).toBeTruthy();
});

test('ColorPicker disablePlainColor', async () => {
  const { findByTestId } = render(<ColorPicker value="red" disablePlainColor />);
  const input = (await findByTestId('colorpicker-input')).querySelector('input');
  expect(input.value).toBe('#FF0000');
});

test('ColorPicker disableTextfield click', async () => {
  const onOpen = jest.fn();
  const { findByTestId } = render(<ColorPicker value="#ff0a" disableTextfield onOpen={onOpen} />);
  const button = await findByTestId('colorpicker-noinput');
  fireEvent.click(button);
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test('ColorPicker colorbutton click', async () => {
  const onOpen = jest.fn();
  const { findByTestId, rerender } = render(<ColorPicker value="rgb(0,0,0)" disableTextfield />);
  let button = await findByTestId('colorpicker-button');
  fireEvent.click(button);
  expect(onOpen).toHaveBeenCalledTimes(0);
  rerender(<ColorPicker value="red" disableTextfield onOpen={onOpen} />);
  button = await findByTestId('colorpicker-button');
  fireEvent.click(button);
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test('ColorPicker deferred', async () => {
  const onOpen = jest.fn();
  const onChange = jest.fn();
  const doPopup = box => <div>{box}</div>;

  const { findAllByTestId, getByText, rerender } = render(
    <ColorPicker value="red" palette={palette} openAtStart deferred doPopup={doPopup} onChange={onChange} />,
  );
  let buttons = await findAllByTestId('colorbutton');
  expect(buttons.length).toBe(13);
  fireEvent.click(buttons[2]);
  let button = getByText('Set');
  fireEvent.click(button);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onOpen).toHaveBeenCalledTimes(0);

  rerender(
    <ColorPicker
      value="red"
      palette={palette}
      openAtStart
      deferred
      doPopup={doPopup}
      onOpen={onOpen}
      onChange={onChange}
    />,
  );
  buttons = await findAllByTestId('colorbutton');
  expect(buttons.length).toBe(13);
  fireEvent.click(buttons[2]);
  button = getByText('Set');
  fireEvent.click(button);
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test('ColorPicker open', async () => {
  const onChange = jest.fn();
  const doPopup = box => <div>{box}</div>;

  const { findAllByTestId, rerender } = render(<ColorPicker value={1234} palette={palette} doPopup={doPopup} />);
  let buttons = await findAllByTestId('colorbutton');
  expect(buttons.length).toBe(13);
  fireEvent.click(buttons[2]);
  expect(onChange).toHaveBeenCalledTimes(0);
  rerender(<ColorPicker value="red" palette={palette} openAtStart doPopup={doPopup} onChange={onChange} />);
  buttons = await findAllByTestId('colorbutton');
  fireEvent.click(buttons[6]);
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('ColorPicker hideTextfield', async () => {
  const { queryAllByTestId } = render(<ColorPicker value="red" hideTextfield />);
  expect(await queryAllByTestId('colorpicker-input')).toEqual([]);
  expect(await queryAllByTestId('colorpicker-noinput')).toEqual([]);
});
