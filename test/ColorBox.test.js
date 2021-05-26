/* eslint-disable react/jsx-filename-extension */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ColorBox from '../src/components/ColorBox';
import * as ColorTool from '../src/helpers/colorTool';

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

// See : https://github.com/testing-library/react-testing-library/issues/268
class FakeMouseEvent extends MouseEvent {
  constructor(type, values) {
    const { pageX, pageY, offsetX, offsetY, x, y, key, touches, ...mouseValues } = values;
    super(type, mouseValues);

    Object.assign(this, {
      offsetX: offsetX || 0,
      offsetY: offsetY || 0,
      pageX: pageX || 0,
      pageY: pageY || 0,
      x: x || 0,
      y: y || 0,
      touches,
      key,
    });
  }
}

const originalclientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
const originalclientHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientHeight');
const originalgetBoundingClientRect = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'getBoundingClientRect');
beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: 308 });
  Object.defineProperty(HTMLElement.prototype, 'clientHeight', { configurable: true, value: 116 });
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ left: 22, top: 90 }),
  });
});

afterAll(() => {
  if (originalclientWidth) Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalclientWidth);
  if (originalclientHeight) Object.defineProperty(HTMLElement.prototype, 'clientHeight', originalclientHeight);
  if (originalgetBoundingClientRect)
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', originalgetBoundingClientRect);
});

test('ColorBox should render correctly', () => {
  const { asFragment } = render(<ColorBox defaultValue="darkblue" />);
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
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 0) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '282px',
    top: '56px',
  });
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

test('ColorBox HSL props', async () => {
  const { findByTestId } = render(<ColorBox defaultValue="#830A0A7D" hslGradient />);
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 0) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '221px',
    top: '99px',
  });
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

test('ColorBox error display', () => {
  const color = ColorTool.validateColor('#ffx');
  const { getByTestId } = render(<ColorBox value={color} />);
  const span = getByTestId('colorbox-error');
  expect(span.textContent).toBe('Not an hex value');
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

test('ColorBox hsvgradient cursor changes', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorBox value="#7A0E30" onChange={onChange} />);
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 81) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '273px',
    top: '60px',
  });
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('mousemove', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(0);
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(0);
  fireEvent(
    component,
    new FakeMouseEvent('mousemove', {
      bubbles: true,
      pageX: 25,
      pageY: 42,
      buttons: 1,
    }),
  );
  fireEvent(
    component,
    new FakeMouseEvent('mousemove', {
      bubbles: true,
      pageX: 1000,
      pageY: 1000,
      buttons: 1,
    }),
  );
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: -500,
      pageY: -600,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(value.name).toBe('white');
});

test('ColorBox hslgradient cursor changes', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorBox value="#7A0E30" onChange={onChange} hslGradient />);
  let component = await findByTestId('hsvgradient-color');
  const left = 22;
  const top = 90;
  const width = 308;
  const height = 116;
  expect(component.clientWidth).toEqual(width);
  expect(component.clientHeight).toEqual(height);
  expect(component.getBoundingClientRect()).toEqual({ left, top });
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 81) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '224px',
    top: '91px',
  });
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(0);
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: 0,
      pageY: 0,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(value.name).toBe('white');
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: 0,
      pageY: 600,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(value.name).toBe('white');
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(2);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: 500,
      pageY: 600,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(value.name).toBe('black');
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(3);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: 500,
      pageY: 0,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(4);
  expect(value.name).toBe('black');
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(4);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: left + (width - 1) / 2,
      pageY: 600,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(5);
  expect(value.hex).toBe('FF0051');
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(5);
  fireEvent(
    component,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: left + (width - 1) / 2,
      pageY: 0,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(6);
  expect(value.hex).toBe('808080');
});

test('ColorBox hsvgradient touch move', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorBox value="#7A0E30" onChange={onChange} />);
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 81) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '273px',
    top: '60px',
  });
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('touchmove', {
      bubbles: true,
      touches: [{ pageX: 25, pageY: 42 }],
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
  fireEvent(
    component,
    new FakeMouseEvent('touchmove', {
      bubbles: true,
      touches: [{ pageX: -500, pageY: -600 }],
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(value.name).toBe('white');
});

test('ColorBox hsvgradient focus/blur', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorBox value="#7A0E30" onChange={onChange} />);
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 81) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '273px',
    top: '60px',
  });
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowRight',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(0);
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowRight',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
  fireEvent(
    component,
    new FocusEvent('blur', {
      bubbles: true,
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
});

test('ColorBox hsvgradient keys', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const { findByTestId } = render(<ColorBox value="#7A0E30" onChange={onChange} />);
  let component = await findByTestId('hsvgradient-color');
  expect(component).toHaveStyle({ background: 'rgb(255, 0, 81) none repeat scroll 0%' });
  component = await findByTestId('hsvgradient-cursor');
  expect(component).toHaveStyle({
    left: '273px',
    top: '60px',
  });
  expect(value).toBe(undefined);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowRight',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(0);
  fireEvent(
    component,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowRight',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(1);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowLeft',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(2);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowUp',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(3);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'ArrowDown',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(4);
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'A',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(4);
  expect(value.name).toBe('color-7A0E30');
  fireEvent(
    component,
    new FakeMouseEvent('keydown', {
      bubbles: true,
      key: 'Tab',
    }),
  );
  expect(onChange).toHaveBeenCalledTimes(4);
});

test('ColorBox sliders onChange', async () => {
  let value;
  const onChange = jest.fn().mockImplementation(newValue => {
    value = newValue;
  });
  const color = {
    raw: 'red',
    name: 'red',
    css: {
      backgroundColor: 'red',
    },
    value: 16711680,
    format: 'plain',
    hex: 'FF0000',
    alpha: undefined,
    rgb: [255, 0, 0],
    hsv: [0, 100, 100],
    hsl: [0, 100, 51],
  };
  const { getAllByTestId, findByTestId } = render(<ColorBox value={color} onChange={onChange} />);
  const inputs = getAllByTestId('colorinput-input');
  expect(inputs.length).toBe(4);
  let component = await findByTestId('hueslider');
  let span = component.querySelector('.MuiSlider-track');
  expect(span).toHaveStyle('width: 0%');
  span = component.querySelector('.MuiSlider-thumb');
  expect(span).toHaveStyle('left: 0%');
  fireEvent(
    span,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  fireEvent(
    span,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: -500,
      pageY: -600,
    }),
  );
  expect(value.name).toBe('red');
  expect(onChange).toHaveBeenCalledTimes(1);

  component = await findByTestId('alphaslider');
  span = component.querySelector('.MuiSlider-track');
  expect(span).toHaveStyle('width: 100%');
  span = component.querySelector('.MuiSlider-thumb');
  expect(span).toHaveStyle('left: 100%');
  fireEvent(
    span,
    new FakeMouseEvent('mousedown', {
      bubbles: true,
    }),
  );
  fireEvent(
    span,
    new FakeMouseEvent('mouseup', {
      bubbles: true,
      pageX: -500,
      pageY: -600,
    }),
  );
  expect(value.name).toBe('red');
  expect(onChange).toHaveBeenCalledTimes(2);
});
