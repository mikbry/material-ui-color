/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import renderer from 'react-test-renderer';
import Tooltip from '@material-ui/core/Tooltip';
import ColorButton from '../src/components/ColorButton';

let mount = null;
beforeEach(() => {
  // setup a DOM element as a render target
  mount = createMount();
});

afterEach(() => {
  // cleanup on exiting
  mount.cleanUp();
  mount = null;
});

test('ColorButton should renders correctly', () => {
  const tree = renderer.create(<ColorButton color="darkBlue" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('ColorButton set props', () => {
  const wrapper = mount(<ColorButton color="" />);
  let button = wrapper.find(ColorButton);
  expect(button.props().color).toBe('');
  expect(button.props().size).toBe(24);
  expect(button.props().borderWidth).toBe(0);
  expect(button.props().borderColor).toBe(null);
  expect(button.props().forwardRef).toBe(null);
  expect(button.props().tooltip).toBe(null);
  expect(button).toHaveStyleRule('background-color', 'white');
  expect(button).toHaveStyleRule('border', '0px solid #767676');
  wrapper.setProps({ color: 'red', size: 48, borderWidth: 2, borderColor: 'red' });
  button = wrapper.find(ColorButton);
  expect(button.props().color).toBe('red');
  expect(button.props().size).toBe(48);
  expect(button.props().borderWidth).toBe(2);
  expect(button.props().borderColor).toBe('red');
  expect(button).toHaveStyleRule('background-color', 'red');
  expect(button).toHaveStyleRule('width', '48px');
  expect(button).toHaveStyleRule('height', '48px');
  expect(button).toHaveStyleRule('border', '2px solid red');
});

test('ColorButton onClick', () => {
  const onClick = jest.fn();
  const wrapper = mount(<ColorButton color="" onClick={onClick} />);
  const button = wrapper.find(ColorButton);
  button.simulate('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('ColorButton toolitip props', () => {
  const wrapper = mount(<ColorButton color="darkBlue" tooltip="darkBlue" />);
  const button = wrapper.find(ColorButton);
  expect(button.props().tooltip).toBe('darkBlue');
  const tooltip = wrapper.find(Tooltip);
  expect(tooltip.props().title).toBe('darkBlue');
});
