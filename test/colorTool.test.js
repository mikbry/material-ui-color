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

  color = ColorTool.parse('#FFF');
  expect(color.raw).toEqual('#FFF');
  expect(color.hex).toEqual('FFFFFF');

  color = ColorTool.parse('#FFFE');
  expect(color.raw).toEqual('#FFFE');
  expect(color.hex).toEqual('FFFFFFEE');
});

test('ColorTool parse css color keywords', () => {
  let color = ColorTool.parse('transparent');
  expect(color.raw).toEqual('transparent');
  expect(color.hex).toEqual('00000000');
  CSS_COLOR_NAMES.forEach(name => {
    color = ColorTool.parse(name);
    expect(color.name).toEqual(name);
  });
});

test('ColorTool parse errors', () => {
  let color = ColorTool.parse('redbull');
  expect(color.raw).toEqual('redbull');
  expect(color.value).toEqual(0);

  color = ColorTool.parse(0xff00000000);
  expect(color.raw).toEqual(0xff00000000);
  expect(color.hex).toEqual('000000');

  color = ColorTool.parse(-10);
  expect(color.raw).toEqual(-10);
  expect(color.hex).toEqual('FFFFF6');

  color = ColorTool.parse('#XZRT');
  expect(color.raw).toEqual('#XZRT');
  expect(color.hex).toEqual('000000');
  expect(color.error).toEqual('Not an hex value');

  color = ColorTool.parse('#F');
  expect(color.raw).toEqual('#F');
  expect(color.hex).toEqual('000000');
  expect(color.error).toEqual('Wrong format');
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
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100%)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255 0 153 / 1)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255 0 153 / 100%)');
  expect(rgb.hex).toEqual('FF0099');
  // Functional syntax with floats value
  rgb = ColorTool.parse('rgb(255, 0, 153, 1.0)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100.0%)');
  expect(rgb.hex).toEqual('FF0099');
  rgb = ColorTool.parse('rgb(2.55e2, 0e0, 1.53e2, +1e2%)');
  expect(rgb.hex).toEqual('FF0099');

  // TODO RGBA variations
  // Functional syntax
  rgb = ColorTool.parse('rgba(51, 170, 51, .1)');
  expect(rgb.hex).toEqual('33AA331A');
  rgb = ColorTool.parse('rgba(51, 170, 51, .4)');
  expect(rgb.hex).toEqual('33AA3366');
  rgb = ColorTool.parse('rgba(51, 170, 51, .7)');
  expect(rgb.hex).toEqual('33AA33B3');
  rgb = ColorTool.parse('rgba(51, 170, 51,  1)');
  expect(rgb.hex).toEqual('33AA33');
  // Whitespace syntax
  rgb = ColorTool.parse('rgba(51 170 51 / 0.4)');
  expect(rgb.hex).toEqual('33AA3366');
  rgb = ColorTool.parse('rgba(51 170 51 / 40%) ');
  expect(rgb.hex).toEqual('33AA3366');

  // Functional syntax with floats value
  rgb = ColorTool.parse('rgba(255, 0, 153.6, 1)');
  expect(rgb.hex).toEqual('FF009A');
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
  expect(hsl.hex).toEqual('0000FF');
  hsl = ColorTool.parse('hsla(240 100% 50% / .05)');
  expect(hsl.hex).toEqual('0000FF0C');
  hsl = ColorTool.parse('hsla(240 100% 50% / 5%)');
  expect(hsl.hex).toEqual('0000FF0C');

  // other gradient
  hsl = ColorTool.parse('hsl(140 60% 10% ) ');
  expect(hsl.hex).toEqual('0A2914');
  hsl = ColorTool.parse('hsl(250 60% 10% ) ');
  expect(hsl.hex).toEqual('0F0A29');
  hsl = ColorTool.parse('hsl(310 60% 10% ) ');
  expect(hsl.hex).toEqual('290A24');

  // Out of border values
  hsl = ColorTool.parse('hsl(470 60% 50% / 15%) ');
  expect(hsl.hex).toEqual('4DCC3326');
  hsl = ColorTool.parse('hsl(-70 60% 50% / 15%) ');
  expect(hsl.hex).toEqual('CC333326');
  hsl = ColorTool.parse('hsl(-70 -60% 150% / 15%) ');
  expect(hsl.hex).toEqual('FFFFFF26');

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
  expect(color.hex).toEqual('FF0000');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: 1 });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0, a: 1 });
  expect(color.hex).toEqual('FF0000');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: '0%' });
  expect(color.raw).toEqual({ r: 0xff, g: 0, b: 0, a: '0%' });
  expect(color.hex).toEqual('FF000000');

  color = ColorTool.parse({ r: '0', g: 0, b: 0, a: '1' });
  expect(color.hex).toEqual('000000FF');

  // parse non valid rgb object
  color = ColorTool.parse({ r: 'a', g: 0, b: 0 });
  expect(color.hex).toEqual('000000');

  color = ColorTool.parse({ r: '0xff', b: 0 });
  expect(color.hex).toEqual('000000');

  color = ColorTool.parse({ r: 'a', g: 0, b: 0, a: '1' });
  expect(color.hex).toEqual('000000FF');

  color = ColorTool.parse({ r: 0xff, g: 0, b: 0, a: 'b' });
  expect(color.hex).toEqual('FF0000');
});

test('ColorTool parse hsl objects', () => {
  let hsl = ColorTool.parse({ h: '180', s: '100%', l: '50%' });
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse({ h: '180deg', s: 100, l: 50 });
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse({ h: '180deg', s: 100, l: 50, a: 1 });
  expect(hsl.hex).toEqual('00FFFF');

  // parse non valid hsl object
  hsl = ColorTool.parse({ h: 'a', s: 0, l: 0 });
  expect(hsl.hex).toEqual('000000');
  hsl = ColorTool.parse({ h: '180', s: 100 });
  expect(hsl.hex).toEqual('000000');
});

test('ColorTool parse hsv objects', () => {
  let hsv = ColorTool.parse({ h: '240', s: '8%', v: '98%' });
  expect(hsv.hex).toEqual('E6E6FA');
  hsv = ColorTool.parse({ h: 240, s: 8, v: 98 });
  expect(hsv.hex).toEqual('E6E6FA');
  hsv = ColorTool.parse({ h: 240, s: 8, v: 98, a: 1 });
  expect(hsv.hex).toEqual('E6E6FA');
});

test('ColorTool parse rgb array', () => {
  let color = ColorTool.parse([0xff, 0, 0], 'rgb');
  expect(color.raw).toEqual([0xff, 0, 0]);
  expect(color.hex).toEqual('FF0000');

  color = ColorTool.parse(['0xf0', '0xf8', '0xFF'], 'rgb');
  expect(color.name).toEqual('aliceblue');
  color = ColorTool.parse(['0xf4', '0xa4', 0x60], 'rgb');
  expect(color.name).toEqual('sandybrown');
});

test('ColorTool parse hsl array', () => {
  let hsl = ColorTool.parse(['180', '100%', '50%'], 'hsl');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse(['180deg', 100, 50], 'hsl');
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse(['180deg', 100, 50, 1], 'hsl');
  expect(hsl.hex).toEqual('00FFFF');
});

test('ColorTool parse hsv array', () => {
  let hsv = ColorTool.parse(['240', '8%', '98%'], 'hsv');
  expect(hsv.hex).toEqual('E6E6FA');
  hsv = ColorTool.parse([240, 8, 98], 'hsv');
  expect(hsv.hex).toEqual('E6E6FA');
  hsv = ColorTool.parse([240, 8, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('E6E6FA');

  // s = 0
  hsv = ColorTool.parse([240, 0, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('FAFAFA');

  hsv = ColorTool.parse([0, 50, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('FA7D7D');
  hsv = ColorTool.parse([70, 50, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('E5FA7D');
  hsv = ColorTool.parse([130, 50, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('7DFA92');
  hsv = ColorTool.parse([190, 50, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('7DE5FA');
  hsv = ColorTool.parse([320, 50, 98, 1], 'hsv');
  expect(hsv.hex).toEqual('FA7DD0');

  hsv = ColorTool.parse([320, 50, 98, '10%'], 'hsv');
  expect(hsv.hex).toEqual('FA7DD019');

  hsv = ColorTool.parse([320, 50, 98, '0.1'], 'hsv');
  expect(hsv.hex).toEqual('FA7DD019');

  // Parse non valid array
  hsv = ColorTool.parse([], 'hsv');
  expect(hsv.error).toEqual('Not a valid size');
  hsv = ColorTool.parse([0, 1, 2, 3, 4, 5], 'hsv');
  expect(hsv.error).toEqual('Not a valid size');
});

test('ColorTool parse csscolor/hex array', () => {
  let color = ColorTool.parse(['red'], 'plain');
  expect(color.name).toEqual('red');
  color = ColorTool.parse(['#f00'], 'hex');
  expect(color.name).toEqual('red');
});

test('ColorTool parse unknown array', () => {
  const unknown = ColorTool.parse(['240', '8%', '98%']);
  expect(unknown.error).toEqual('unkown format');
});

test('ColorTool getComponents hex', () => {
  const components = ColorTool.getComponents('red', 'hex');
  expect(components.hex.name).toEqual('HEX');
  expect(components.hex.format).toEqual('hex');
  expect(components.hex.value).toEqual('FF0000');
  expect(components.hex.unit).toEqual('#');
});

test('ColorTool getComponents unknown', () => {
  const components = ColorTool.getComponents('red');
  expect(components.value).toEqual(16711680);
  expect(components.format).toEqual('unknown');
});

test('ColorTool getCssColor unknown', () => {
  const csscolor = ColorTool.getCssColor({ value: 16711680 });
  expect(csscolor).toEqual(undefined);
});

test('ColorTool getCssColor alpha=1', () => {
  const csscolor = ColorTool.getCssColor({ value: 16711680, alpha: 1 }, 'hex');
  expect(csscolor).toEqual('#FF0000');
});

test('ColorTool getCssColor alpha=0.5', () => {
  const csscolor = ColorTool.getCssColor({ value: 16711680, alpha: 0.5 }, 'hex');
  expect(csscolor).toEqual('#FF00007F');
});

test('ColorTool validateColor translate', () => {
  const translate = value => {
    if (value === 'red') {
      return 'rouge';
    }
    if (value === 'Not an hex value') {
      return 'Valeur non hexa';
    }
    if (value === 'Wrong format') {
      return 'Format non valide';
    }
    return value;
  };

  let color = ColorTool.validateColor('rouge', false, translate, 'frFR');
  expect(color.raw).toEqual('red');
  expect(color.hex).toEqual('FF0000');
  color = ColorTool.validateColor('red');
  expect(color.raw).toEqual('red');
  expect(color.hex).toEqual('FF0000');
  color = ColorTool.validateColor('#FFX0', false, translate);
  expect(color.raw).toEqual('#FFX0');
  expect(color.error).toEqual('Valeur non hexa');
  color = ColorTool.validateColor({ error: 'Wrong format', format: 'unknown', name: '#ffu' }, false, translate);
  expect(color.error).toEqual('Format non valide');
});
