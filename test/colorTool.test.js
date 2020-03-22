/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as ColorTool from '../src/helpers/colorTool';

// <snip : css_colors : https://gist.github.com/bobspace/2712980
const CSS_COLOR_NAMES = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BlanchedAlmond',
  'Blue',
  'BlueViolet',
  'Brown',
  'BurlyWood',
  'CadetBlue',
  'Chartreuse',
  'Chocolate',
  'Coral',
  'CornflowerBlue',
  'Cornsilk',
  'Crimson',
  'Cyan',
  'DarkBlue',
  'DarkCyan',
  'DarkGoldenRod',
  'DarkGray',
  'DarkGrey',
  'DarkGreen',
  'DarkKhaki',
  'DarkMagenta',
  'DarkOliveGreen',
  'DarkOrange',
  'DarkOrchid',
  'DarkRed',
  'DarkSalmon',
  'DarkSeaGreen',
  'DarkSlateBlue',
  'DarkSlateGray',
  'DarkSlateGrey',
  'DarkTurquoise',
  'DarkViolet',
  'DeepPink',
  'DeepSkyBlue',
  'DimGray',
  'DimGrey',
  'DodgerBlue',
  'FireBrick',
  'FloralWhite',
  'ForestGreen',
  'Fuchsia',
  'Gainsboro',
  'GhostWhite',
  'Gold',
  'GoldenRod',
  'Gray',
  'Grey',
  'Green',
  'GreenYellow',
  'HoneyDew',
  'HotPink',
  'IndianRed',
  'Indigo',
  'Ivory',
  'Khaki',
  'Lavender',
  'LavenderBlush',
  'LawnGreen',
  'LemonChiffon',
  'LightBlue',
  'LightCoral',
  'LightCyan',
  'LightGoldenRodYellow',
  'LightGray',
  'LightGrey',
  'LightGreen',
  'LightPink',
  'LightSalmon',
  'LightSeaGreen',
  'LightSkyBlue',
  'LightSlateGray',
  'LightSlateGrey',
  'LightSteelBlue',
  'LightYellow',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'MediumAquaMarine',
  'MediumBlue',
  'MediumOrchid',
  'MediumPurple',
  'MediumSeaGreen',
  'MediumSlateBlue',
  'MediumSpringGreen',
  'MediumTurquoise',
  'MediumVioletRed',
  'MidnightBlue',
  'MintCream',
  'MistyRose',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Olive',
  'OliveDrab',
  'Orange',
  'OrangeRed',
  'Orchid',
  'PaleGoldenRod',
  'PaleGreen',
  'PaleTurquoise',
  'PaleVioletRed',
  'PapayaWhip',
  'PeachPuff',
  'Peru',
  'Pink',
  'Plum',
  'PowderBlue',
  'Purple',
  'RebeccaPurple',
  'Red',
  'RosyBrown',
  'RoyalBlue',
  'SaddleBrown',
  'Salmon',
  'SandyBrown',
  'SeaGreen',
  'SeaShell',
  'Sienna',
  'Silver',
  'SkyBlue',
  'SlateBlue',
  'SlateGray',
  'SlateGrey',
  'Snow',
  'SpringGreen',
  'SteelBlue',
  'Tan',
  'Teal',
  'Thistle',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'WhiteSmoke',
  'Yellow',
  'YellowGreen',
];
// snip>

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

  color = ColorTool.parse(0xf0f8ff);
  expect(color.name).toEqual('aliceblue');
  color = ColorTool.parse(0xf4a460);
  expect(color.name).toEqual('sandybrown');
});

test('ColorTool parse css color keywords', () => {
  let color = ColorTool.parse('transparent');
  expect(color.raw).toEqual('transparent');
  expect(color.hex).toEqual('000000');
  CSS_COLOR_NAMES.forEach(name => {
    color = ColorTool.parse(name);
    expect(color.name).toEqual(name);
  });
});

test('ColorTool parse css rgb / rgba', () => {
  // Hexadecimal syntax
  let rgb = ColorTool.parse('#ff0099');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('#FF0099');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('#f09');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('#f09');
  expect(rgb.hex).toEqual('FF0099');
  // Functional syntax
  rgb = ColorTool.parse('rgb(255,0,153)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255, 0, 153.0)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(100%,0%,60%)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(100%, 0%,  60%)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(100%, 0,  60%)'); // // TODO ERROR! Don't mix numbers and percentages.
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255 0 153)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255   0       153)');
  expect(rgb.hex).toEqual('FF0099');

  // Hexadecimal syntax with alpha value
  rgb = ColorTool.parse('#ff0099aa');
  expect(rgb.hex).toEqual('FF0099AA');
  rgb = ColorTool.parse('#FF0099AA');
  expect(rgb.hex).toEqual('FF0099AA');
  rgb = ColorTool.parse('#f09a');
  expect(rgb.hex).toEqual('FF0099AA');
  rgb = ColorTool.parse('#F09A');
  expect(rgb.hex).toEqual('FF0099AA');
  // Functional syntax with alpha value
  rgb = ColorTool.parse('rgb(255, 0, 153, 1)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100%)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255 0 153 / 1)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255 0 153 / 100%)');
  expect(rgb.hex).toEqual('FF0099FF');
  // Functional syntax with floats value
  rgb = ColorTool.parse('rgb(255, 0, 153, 1.0)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100.0%)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(2.55e2, 0e0, 1.53e2, +1e2%)');
  expect(rgb.hex).toEqual('FF0099FF');

  // TODO RGBA variations
  // Functional syntax
  rgb = ColorTool.parse('rgba(51, 170, 51, .1)');
  expect(rgb.hex).toEqual('33AA331A');
  rgb = ColorTool.parse('rgba(51, 170, 51, .4)');
  expect(rgb.hex).toEqual('33AA3366');
  rgb = ColorTool.parse('rgba(51, 170, 51, .7)');
  expect(rgb.hex).toEqual('33AA33B3');
  rgb = ColorTool.parse('rgba(51, 170, 51,  1)');
  expect(rgb.hex).toEqual('33AA33FF');
  // Whitespace syntax
  rgb = ColorTool.parse('rgba(51 170 51 / 0.4)');
  expect(rgb.hex).toEqual('33AA3366');
  rgb = ColorTool.parse('rgba(51 170 51 / 40%) ');
  expect(rgb.hex).toEqual('33AA3366');

  // Functional syntax with floats value
  rgb = ColorTool.parse('rgba(255, 0, 153.6, 1)');
  expect(rgb.hex).toEqual('FF009AFF');
  rgb = ColorTool.parse('rgba(1e2, .5e1, .5e0, +.25e2%)');
  expect(rgb.hex).toEqual('64050140');

  // error syntax
  rgb = ColorTool.parse('rgb()');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgba()');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgb(');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgba(');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgb(255,)');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgba(255,)');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgb(aa, b, c)');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgba(aa, b, c, d)');
  expect(rgb.hex).toEqual('000000');
  rgb = ColorTool.parse('rgba(0, 0, 0, d)');
  expect(rgb.hex).toEqual('000000');
});

test('ColorTool parse css hsl / hsla', () => {
  let hsl = ColorTool.parse('hsl(180,100%,50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(180deg,0%,50%)');
  expect(hsl.hex).toEqual('808080');
  // Same color = lavender
  hsl = ColorTool.parse('hsl(270,60%,70%)');
  expect(hsl.name).toEqual('color-B385E0');
  hsl = ColorTool.parse('hsl(270 60% 70%)');
  expect(hsl.name).toEqual('color-B385E0');
  hsl = ColorTool.parse('hsl(270deg, 60%, 70%)');
  expect(hsl.name).toEqual('color-B385E0');
  hsl = ColorTool.parse('hsl(4.71239rad, 60%, 70%)');
  expect(hsl.name).toEqual('color-B385E0');
  hsl = ColorTool.parse('hsl(.75turn, 60%, 70%)');
  expect(hsl.name).toEqual('color-B385E0');

  // These examples all specify the same color: a lavender that is 15% opaque.

  hsl = ColorTool.parse('hsl(270, 60%, 50%, .15)');
  expect(hsl.hex).toEqual('8033CC26');
  hsl = ColorTool.parse('hsl(270, 60%, 50%, 15%)');
  expect(hsl.hex).toEqual('8033CC26');
  hsl = ColorTool.parse('hsl(270 60% 50% / .15)');
  expect(hsl.hex).toEqual('8033CC26');
  hsl = ColorTool.parse('hsl(270 60% 50% / 15%) ');
  expect(hsl.hex).toEqual('8033CC26');

  // parse other css hsl / hsla
  hsl = ColorTool.parse('hsl(180deg,100%,50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(180deg 100% 50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(3.14rad,100%,50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(3.14rad 100% 50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(0.5turn,100%,50%)');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(0.5turn,100%,50%)');
  expect(hsl.hex).toEqual('00FFFF');

  hsl = ColorTool.parse('hsla(240, 100%, 50%, .05)');
  expect(hsl.hex).toEqual('0000FF0C');
  hsl = ColorTool.parse('hsla(240, 100%, 50%, .4)');
  expect(hsl.hex).toEqual('0000FF66');
  hsl = ColorTool.parse('hsla(240, 100%, 50%, .7)');
  expect(hsl.hex).toEqual('0000FFB2');
  hsl = ColorTool.parse('hsla(240, 100%, 50%, 1)');
  expect(hsl.hex).toEqual('0000FFFF');
  hsl = ColorTool.parse('hsla(240 100% 50% / .05)');
  expect(hsl.hex).toEqual('0000FF0C');
  hsl = ColorTool.parse('hsla(240 100% 50% / 5%)');
  expect(hsl.hex).toEqual('0000FF0C');

  // parse non valid css hsl
  hsl = ColorTool.parse('hsl()');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsla()');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsl(');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsla(');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsl(255,)');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsla(255,)');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsl(aa, b, c)');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsla(aa, b, c, d)');
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse('hsla(0, 0, 0, d)');
  expect(hsl.hex).toEqual('000000');
});

test('ColorTool parse rgb objects', () => {
  let color = ColorTool.parse({ r: 0xff, g: 0, b: 0 });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0 });
  expect(color.hex).toEqual('FF0000');

  color = ColorTool.parse({ r: '0xf0', g: '0xf8', b: '0xFF' });
  expect(color.name).toEqual('aliceblue');
  color = ColorTool.parse({ r: '0xf4', g: '0xa4', b: 0x60 });
  expect(color.name).toEqual('sandybrown');

  color = ColorTool.parse({ r: 0xffff, g: -100, b: -1000 });
  expect(color.raw).toEqual({ r: 0xffff, g: -100, b: -1000 }); // TODO normalize result ?
  expect(color.hex).toEqual('FF0000');

  color = ColorTool.parse({ r: 'aa', g: 'bb', b: 'cc' });
  expect(color.raw).toEqual({ r: 'aa', g: 'bb', b: 'cc' }); // TODO normalize result ?
  expect(color.hex).toEqual('000000');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: '100%' });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0, a: '100%' });
  expect(color.hex).toEqual('FF0000FF');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: 1 });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0, a: 1 });
  expect(color.hex).toEqual('FF0000FF');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: '0%' });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0, a: '0%' });
  expect(color.hex).toEqual('FF000000');
});

test('ColorTool parse hsl objects', () => {
  // TODO
});

test('ColorTool parse hsv objects', () => {
  // TODO
});

test('ColorTool parse rgb array', () => {
  // TODO
});

test('ColorTool parse hsl array', () => {
  // TODO
});

test('ColorTool parse hsv array', () => {
  // TODO
});
