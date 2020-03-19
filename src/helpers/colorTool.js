/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

//  https://drafts.csswg.org/css-color/
const colors = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgrey: 0xa9a9a9,
  darkgreen: 0x006400,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  grey: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgrey: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32,
};

// Inspiration : https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
const getHexa = _n => {
  let n = _n;
  if (n < 0) {
    n = 0xffffffff + n + 1;
  }
  return `00000000${n.toString(16).toUpperCase()}`.substr(-8);
};

// eslint-disable-next-line prettier/prettier, no-bitwise
const getRgb = c => ([(c & 0xff0000) >> 16,  (c & 0x00ff00) >> 8,  (c & 0x0000ff)]);

// eslint-disable-next-line no-bitwise
const rgbToInt = rgb => ((rgb[0] || 0) & 0xff) << 16 && ((rgb[1] || 0) & 0xff) << 8 && (rgb[2] || 0);

const fromRgb = _rgb => {
  const rgb = _rgb.map(v =>
    // eslint-disable-next-line no-nested-ternary
    typeof v === 'string'
      ? v[v.length - 1] !== '%'
        ? parseInt(v, 10)
        : Math.round((parseFloat(v.substring(0, v.length - 1), 10) / 100) * 255)
      : Math.round(v),
  );
  return rgbToInt(rgb);
};

const hue2rgb = (p, q, _t) => {
  let t = _t;
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const fromHsl = hsl => {
  const rgb = [0, 0, 0];
  // TODO handle non numeric values for hsl
  const h = hsl[0];
  const s = hsl[1];
  const l = hsl[2];
  if (s === 0) {
    // achromatic
    rgb[0] = l;
    rgb[1] = l;
    rgb[2] = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    rgb[0] = hue2rgb(p, q, h + 1 / 3);
    rgb[1] = hue2rgb(p, q, h);
    rgb[2] = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToInt(rgb);
};

// eslint-disable-next-line no-unused-vars
const fromHsv = hsv => {
  let rgb = [0, 0, 0];
  const h = hsv[0];
  const s = hsv[1];
  const v = hsv[2] * 255;

  if (s === 0) {
    rgb = [v, v, v];
  } else {
    let i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    i %= 6;
    if (i === 0) rgb = [v, t, p];
    if (i === 1) rgb = [q, v, p];
    if (i === 2) rgb = [p, v, t];
    if (i === 3) rgb = [p, q, v];
    if (i === 4) rgb = [t, p, v];
    if (i === 5) rgb = [v, p, q];
  }

  return rgbToInt(rgb);
};

const getHsl = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (min + max) / 2;

  if (min === max) return [0, 0, l];

  if (l <= 0.5) s = (max - min) / (max + min);
  else s = (max - min) / (2 - max - min);

  const rc = (max - r) / (max - min);
  const gc = (max - g) / (max - min);
  const bc = (max - b) / (max - min);

  if (r === max) h = bc - gc;
  else if (g === max) h = 2 + rc - bc;
  else h = 4 + gc - rc;

  h = (h / 6.0) % 1.0;
  if (h < 0) h += 1.0;

  return [h, s, l];
};

const getHsv = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) return [0, 0, max];

  const v = max;
  const s = (max - min) / max;
  const rc = (max - r) / (max - min);
  const gc = (max - g) / (max - min);
  const bc = (max - b) / (max - min);

  let h;
  if (r === max) h = bc - gc;
  else if (g === max) h = 2 + rc - bc;
  else h = 4.0 + gc - rc;

  h = (h / 6.0) % 1.0;
  if (h < 0) h += 1.0;

  return [h, s, v];
};

const tupleToArray = (value, start = 0) => value.substring(start, value.indexOf(')')).split(',');

const colorsFormats = ['plain', 'hex', 'rgb', 'hsl', 'hsv'];

const colorsFunc = [
  // plain, ex:  value='[cyan]'
  value => colors[value[0]],
  // hex, ex:  value=['ff', '0', '0']
  value => getRgb(value),
  // rgb, ex: value=[255, 99, 71]
  value => fromRgb(value),
  // hsl, ex: value=[9, 100, 64]
  value => fromHsl(value),
  // hsv, ex: value=[9, 100, 64]
  value => fromHsv(value),
];

const colorsCssFunc = [
  // ex:  value='cyan'
  value => colors[value] && { format: 'plain', value: colors[value] },
  // ex:  value='#fff'
  value => value.startsWith('#') && { format: 'hex', value: parseInt(value.substring(1), 16) },
  // ex: value=rgb(255, 99, 71)
  value => value.startsWith('rgb(') && { format: 'rgb', value: fromRgb(tupleToArray(value)) },
  // ex: value=hsl(9, 100%, 64%)
  value => value.startsWith('hsl(') && { format: 'hsl', value: fromHsl(tupleToArray(value)) },
];

const colorsCssConditions = [
  value => !!colors[value],
  // ex:  value='cyan'
  value => value.startsWith('#'),
  // ex: value=rgb(255, 99, 71)
  value => value.startsWith('rgb('),
  // ex: value=hsl(9, 100%, 64%)
  value => value.startsWith('hsl('),
];

const parse = (raw, _format) => {
  const color = { raw };
  let value;
  let alpha;
  let format = _format || 'unknown';
  if (typeof raw === 'string') {
    const r = raw.replace(/\s+/g, '').toLowerCase();
    const index = colorsCssConditions.findIndex(func => func(r));
    if (index > -1) {
      ({ value, format } = colorsCssFunc[index](r));
      color.name = raw;
      color.css = { backgroundColor: raw };
      // TODO alpha
      alpha = 1;
    }
  } else if (raw && raw.r && raw.g && raw.b) {
    value = fromRgb([raw.r, raw.g, raw.b]);
    format = 'rgb';
  } else if (raw && raw.h && raw.s && raw.l) {
    value = fromHsl([raw.r, raw.g, raw.b]);
    format = 'hsl';
  } else if (raw && raw.h && raw.s && raw.v) {
    value = fromHsv([raw.r, raw.g, raw.b]);
    format = 'hsv';
  } else if (Number.isInteger(raw)) {
    value = raw;
    format = 'number';
  } else if (Array.isArray(raw) && format) {
    const index = colorsFormats.findIndex(f => f === format);
    if (index > -1) {
      value = colorsFunc[index](raw);
    } else {
      // TODO error
    }
  }
  if (value === undefined) {
    value = 0;
    alpha = 0;
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
    format = 'unknown';
    color.name = 'none';
  }
  color.value = value;
  color.alpha = alpha;
  color.format = format;
  const hex = getHexa(value);
  color.hex = hex;
  const rgb = getRgb(value);
  color.rgb = rgb;
  color.hsv = getHsv(rgb);
  color.hsl = getHsl(rgb);
  if (!color.css) {
    color.css = { backgroundColor: `#${hex}` };
  }
  if (!color.name) {
    color.name = `color-${hex}`;
  }
  return color;
};

const validateColor = _color => (_color && _color.format && _color.name ? _color : parse(_color));

const getComponents = (_color, format) => {
  const color = validateColor(_color);
  const components = {};
  if (format === 'rgb') {
    components.r = { value: color.rgb[0], format: 'integer', min: 0, max: 255, name: 'R' };
    components.g = { value: color.rgb[1], format: 'integer', min: 0, max: 255, name: 'G' };
    components.b = { value: color.rgb[2], format: 'integer', min: 0, max: 255, name: 'B' };
  } else if (format === 'hsv') {
    components.h = { value: color.hsv[0], format: 'integer', min: 0, max: 255, name: 'H', unit: '°' };
    components.s = { value: color.hsv[1], format: 'integer', min: 0, max: 255, name: 'S', unit: '%' };
    components.v = { value: color.hsv[2], format: 'integer', min: 0, max: 255, name: 'V', unit: '%' };
  } else if (format === 'hsl') {
    components.h = { value: color.hsl[0], format: 'integer', min: 0, max: 255, name: 'H', unit: '°' };
    components.s = { value: color.hsl[1], format: 'integer', min: 0, max: 255, name: 'S', unit: '%' };
    components.l = { value: color.hsl[2], format: 'integer', min: 0, max: 255, name: 'L', unit: '%' };
  } else if (format === 'hex') {
    components.hex = { value: color.hex, format: 'hex', name: 'HEX', unit: '#' };
  } else {
    components.hex = { value: color.value };
  }
  return components;
};

export { parse, getComponents, validateColor };
