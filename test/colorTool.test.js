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
  expect(color.raw).toEqual('red');

  color = ColorTool.parse(0xff0000);
  expect(color.raw).toEqual(0xff0000);
  expect(color.hex).toEqual('FF0000');
});

test('ColorTool parse hsl', () => {
  let hsl = ColorTool.parse('hsl(180,100%,50%)');
  // console.log('hsl=', hsl);
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(180deg,0%,50%)');
  // console.log('hsl=', hsl);
  expect(hsl.raw).toBeUndefined();
  // TODO parse other css hsl
  /*
    hsl(180deg,100%,50%)
    hsl(180deg 100% 50%)
    hsl(3.14rad,100%,50%)
    hsl(3.14rad 100% 50%)
    hsl(0.5turn,100%,50%)
    hsl(0.5turn 100% 50%)
 */
});
