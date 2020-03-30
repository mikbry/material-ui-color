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
import ColorButton from '../src/components/ColorButton';

test('ColorButton should renders correctly', () => {
  const { asFragment } = render(<ColorButton color="darkBlue" />);
  expect(asFragment()).toMatchSnapshot();
});

test('ColorButton set props', async () => {
  const { findByTestId, rerender } = render(<ColorButton color="" />);
  let button = await findByTestId('colorbutton');
  expect(button).toHaveStyleRule('background-color', 'white');
  expect(button).toHaveStyleRule('border', '0px solid #767676');
  rerender(<ColorButton color="red" size={48} borderWidth={2} borderColor="red" />);
  button = await findByTestId('colorbutton');
  expect(button).toHaveStyleRule('background-color', 'red');
  expect(button).toHaveStyleRule('width', '48px');
  expect(button).toHaveStyleRule('height', '48px');
  expect(button).toHaveStyleRule('border', '2px solid red');
});

test('ColorButton onClick', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<ColorButton color="" onClick={onClick} />);
  const button = getByTestId('colorbutton');
  button.focus();
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('ColorButton toolitip props', () => {
  const { getByTestId, queryByText } = render(<ColorButton color="" tooltip="tooltip-darkBlue" />);
  const button = getByTestId('colorbutton');
  let tooltip = queryByText('tooltip-darkBlue');
  expect(tooltip).toBeNull();
  fireEvent.mouseOver(button);
  tooltip = queryByText('tooltip-darkBlue');
  // Can't test tooltip added in DOM...
});
