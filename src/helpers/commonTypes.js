/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { arrayOf, objectOf, shape, array, number, string, oneOfType } from 'prop-types';

const color = oneOfType([
  shape({
    css: shape({
      // TODO
    }),
    value: number,
    hex: string,
    raw: oneOfType([string, array, number, shape]),
    name: string,
    alpha: number,
    rgb: arrayOf(number),
    hsv: arrayOf(number),
    hsl: arrayOf(number),
  }),
  string,
  number,
]);

const palette = objectOf(string);

const inputFormats = arrayOf(string);

export { color, palette, inputFormats };
