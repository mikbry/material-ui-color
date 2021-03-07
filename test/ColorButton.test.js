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

test('ColorButton should render correctly', () => {
  const { asFragment } = render(<ColorButton color="darkblue" />);
  expect(asFragment()).toMatchSnapshot();
});

/**
 * Test if computed styles of element contains specified styles.
 * @param el      - the HTMLElement to test
 * @param style   - a subset of style rules, that must be contained
 */
function toHaveComputedStyle(el, style) {
  const computedStyle = getComputedStyle(el);
  const obj = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < computedStyle.length; i++) {
    const key = computedStyle.item(i);
    obj[key] = computedStyle.getPropertyValue(key);
  }
  expect(obj).toMatchObject(style);
}

/* TODO JsDom cannot cascade stylesheets yet, which results in different styles for browser and jest tests:
 * https://github.com/jsdom/jsdom/issues/1696
 * https://github.com/facebook/jest/issues/8464
 * https://stackoverflow.com/questions/59396539/why-does-getcomputedstyle-in-a-jest-test-return-different-results-to-computed
 * In contrary styled-components saves its css class rules, and looks them up in their own scheme.
 */
test('ColorButton set props', async () => {
  const { findByTestId, rerender } = render(<ColorButton color="" />);
  let button = await findByTestId('colorbutton');
  /* expect(button).toHaveStyle({
    'background-color': 'white',
    'border-width': '0',
  }); */
  rerender(<ColorButton color="red" size={48} borderWidth={2} borderColor="red" />);
  button = await findByTestId('colorbutton');
  expect(button).toHaveStyle({
    // 'background-color': 'red',
    width: '48px',
    height: '48px',
    // 'border-width': '2px',
    // 'border-style': 'solid',
    // 'border-color': 'red',
  });
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
  const { getByTestId, queryByText } = render(<ColorButton color="" tooltip="tooltip-darkblue" />);
  const button = getByTestId('colorbutton');
  let tooltip = queryByText('tooltip-darkblue');
  expect(tooltip).toBeNull();
  fireEvent.mouseOver(button);
  tooltip = queryByText('tooltip-darkblue');
  // Can't test tooltip added in DOM...
});
