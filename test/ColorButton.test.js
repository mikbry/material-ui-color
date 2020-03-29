/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import ColorButton from '../src/components/ColorButton';
import 'jest-styled-components';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('ColorButton no value', () => {
  const tree = renderer.create(<ColorButton />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule('background-color', 'white');
});

test('ColorButton color=red', () => {
  const tree = renderer.create(<ColorButton color="red" />).toJSON();
  expect(tree).toHaveStyleRule('background-color', 'red');
});

it('ColorButton onClick', () => {
  const onClick = jest.fn();
  act(() => {
    render(<ColorButton onClick={onClick} />, container);
  });
  const button = document.querySelector('.MuiButton-root');
  act(() => {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onClick).toHaveBeenCalledTimes(1);
});
