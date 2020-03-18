/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as ColorTool from '../src/helpers/colorTool';

test('ColorTool init', () => {
  expect(ColorTool).toBeDefined();
});

test('ColorTool parse simple', () => {
  let color = ColorTool.parse();
  expect(color.raw).toBeUndefined();

  color = ColorTool.parse('red');
  console.log('red=', color);
  expect(color.raw).toEqual('red');
});
