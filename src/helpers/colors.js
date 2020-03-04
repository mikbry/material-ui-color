/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const parse = (raw, type) => {
  let color = { raw };

  if (raw === 'red') {
    color = {
      type: 'plain',
      hex: 'FF0000',
      rgb: [255, 0, 0],
      hsv: [0, 0, 0],
      hsl: [0, 0, 0],
      value: raw,
      raw,
      css: { backgroundColor: raw },
    };
  } else {
    // TODO find raw type
    color.type = 'unknown';
    // TODO get hexa
    color.hex = raw;
    // TODO get rgb
    color.rgb = [0, 0, 0];
    // TODO get hsv
    color.hsv = [0, 0, 0];
    // TODO get hsl
    color.hsl = [0, 0, 0];
    if (!type) {
      color.value = raw || 'none';
    }
    // WIP get css EG if none create a checkered pattern, if an error display a red cross
    if (!raw) {
      color.css = {
        background: `
      linear-gradient(45deg, #ccc 25%, transparent 25%), 
      linear-gradient(135deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(135deg, transparent 75%, #ccc 75%)`,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 4px 0, 4px -4px, 0px 4px',
        backgroundColor: 'white',
      };
    }
  }

  return color;
};

const getComponents = (_color, type) => {
  // eslint-disable-next-line no-unused-vars
  const color = typeof _color === 'string' ? parse(_color) : _color;
  const components = {};
  // TODO set values
  if (type === 'rgb') {
    components.r = { value: color.rgb[0], type: 'integer', min: 0, max: 255, name: 'R' };
    components.g = { value: color.rgb[1], type: 'integer', min: 0, max: 255, name: 'G' };
    components.b = { value: color.rgb[2], type: 'integer', min: 0, max: 255, name: 'B' };
  } else if (type === 'hsv') {
    components.h = { value: color.hsv[0], type: 'integer', min: 0, max: 255, name: 'H', unit: '°' };
    components.s = { value: color.hsv[1], type: 'integer', min: 0, max: 255, name: 'S', unit: '%' };
    components.v = { value: color.hsv[2], type: 'integer', min: 0, max: 255, name: 'V', unit: '%' };
  } else if (type === 'hsl') {
    components.h = { value: color.hsl[0], type: 'integer', min: 0, max: 255, name: 'H', unit: '°' };
    components.s = { value: color.hsl[1], type: 'integer', min: 0, max: 255, name: 'S', unit: '%' };
    components.l = { value: color.hsl[2], type: 'integer', min: 0, max: 255, name: 'L', unit: '%' };
  } else if (type === 'hex') {
    components.hex = { value: color.hex, type: 'hex', name: 'HEX', unit: '#' };
  } else {
    components.hex = { value: color.value };
  }
  return components;
};

export { parse, getComponents };
