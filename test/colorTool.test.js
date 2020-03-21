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
  /* rgb = ColorTool.parse('rgb(255, 0, 153, 1)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100%)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255 0 153 / 1)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255 0 153 / 100%)');
  expect(rgb.hex).toEqual('FF0099FF'); */
  // Functional syntax with floats value
  /* rgb = ColorTool.parse('rgb(255, 0, 153, 1.0)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(255, 0, 153, 100.0%)');
  expect(rgb.hex).toEqual('FF0099FF');
  rgb = ColorTool.parse('rgb(1e2, .5e1, .5e0, +.25e2%)');
  expect(rgb.hex).toEqual('FF0099FF'); */

  // TODO RGBA variations
  /* Hexadecimal syntax
    #3a30                    //   0% opaque green
    #3A3F                    // full opaque green 
    #33aa3300                //   0% opaque green 
    #33AA3380                //  50% opaque green 

  // Functional syntax
    rgba(51, 170, 51, .1)    //  10% opaque green
    rgba(51, 170, 51, .4)    //  40% opaque green
    rgba(51, 170, 51, .7)    //  70% opaque green
    rgba(51, 170, 51,  1)    // full opaque green 

  // Whitespace syntax
    rgba(51 170 51 / 0.4)    // 40% opaque green
    rgba(51 170 51 / 40%)    //  40% opaque green

  // Functional syntax with floats value
    rgba(255, 0, 153.6, 1)
    rgba(1e2, .5e1, .5e0, +.25e2%) */

  // TODO error syntax
  /*
      rgb()
      rgb(0, 0,)
      rgb(0, 0, 0,
      rgb(aa, aa, aa)
      rgb(x, x, x)
      same for rgba
    */
});

test('ColorTool parse css hsl / hsla', () => {
  let hsl = ColorTool.parse('hsl(180,100%,50%)');
  // console.log('hsl=', hsl);
  expect(hsl.hex).toEqual('00FFFF');
  hsl = ColorTool.parse('hsl(180deg,0%,50%)');
  // console.log('hsl=', hsl);
  expect(hsl.hex).toEqual('808080');
  // Same color = lavender
  /* These examples all specify the same color: a lavender.
  hsl(270,60%,70%)
  hsl(270, 60%, 70%)
  hsl(270 60% 70%)
  hsl(270deg, 60%, 70%)
  hsl(4.71239rad, 60%, 70%)
  hsl(.75turn, 60%, 70%) */

  /* These examples all specify the same color: a lavender that is 15% opaque.
hsl(270, 60%, 50%, .15)
hsl(270, 60%, 50%, 15%)
hsl(270 60% 50% / .15)
hsl(270 60% 50% / 15%) */
  // TODO parse other css hsl / hsla
  /*
    hsl(180deg,100%,50%)
    hsl(180deg 100% 50%)
    hsl(3.14rad,100%,50%)
    hsl(3.14rad 100% 50%)
    hsl(0.5turn,100%,50%)
    hsl(0.5turn 100% 50%)
    hsla(240, 100%, 50%, .05)
    hsla(240, 100%, 50%, .4)
    hsla(240, 100%, 50%, .7)
    hsla(240, 100%, 50%, 1)
    hsla(240 100% 50% / .05)
    hsla(240 100% 50% / 5%)
 */
  // TODO parse non valid css hsl
});

test('ColorTool parse rgb objects', () => {
  // TODO
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
