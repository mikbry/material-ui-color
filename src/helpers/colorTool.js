/* eslint-disable no-bitwise */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
import cssColors from './cssColors';

// Inspiration : https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
const getHexa = _n => {
  let n = _n;
  if (n < 0) {
    n = 0xffffffff + n + 1;
  }
  let hexa = `00000000${n.toString(16).toUpperCase()}`.substr(-8);
  if (hexa.startsWith('00')) {
    hexa = hexa.substring(2);
  }
  return hexa;
};

const getCssHexa = n => {
  let hex = getHexa(n);
  if (hex.length === 8) {
    hex = hex.substring(2) + hex[0] + hex[1];
  }
  return hex;
};

const getRgb = c => [(c & 0xff0000) >> 16, (c & 0x00ff00) >> 8, c & 0x0000ff];

const rgbToInt = _rgb => {
  const rgb = _rgb.map(_c => {
    let c = _c || 0;
    if (c < 0) c = 0;
    if (c > 255) c = 255;
    return c;
  });
  return (rgb[3] << 24) | (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
};

const fromRgb = _rgb => {
  if (!_rgb || _rgb.length < 3 || _rgb.length > 4) {
    return {};
  }
  const rgb = _rgb.map((v, i) =>
    // eslint-disable-next-line no-nested-ternary
    typeof v === 'string'
      ? v[v.length - 1] !== '%'
        ? Math.round(Number(v) * (i === 3 ? 255 : 1))
        : Math.round((Number(v.substring(0, v.length - 1)) / 100) * 255)
      : Math.round(i === 3 ? v * 255 : v),
  );
  const value = rgbToInt(rgb);
  return { format: 'rgb', value, rgb, alpha: rgb[3] };
};

const fromCssHexa = hex => {
  let alpha;
  let value = parseInt(hex.substring(1), 16);
  const rgb = [];
  if (hex.length === 7 || hex.length === 9) {
    const padding = hex.length === 9 ? 8 : 0;
    // #RRGGBB format
    rgb[0] = (value >> (16 + padding)) & 0xff;
    rgb[1] = (value >> (8 + padding)) & 0xff;
    rgb[2] = (value >> padding) & 0xff;
    if (hex.length === 9) {
      // #RRGGBBAA format
      alpha = value & 0xff;
      rgb[3] = alpha;
      value = rgbToInt(rgb);
    }
  } else if (hex.length === 4 || hex.length === 5) {
    const padding = hex.length === 5 ? 4 : 0;
    // #RGB format
    rgb[0] = (value >> (8 + padding)) & 0xf;
    rgb[1] = (value >> (4 + padding)) & 0xf;
    rgb[2] = (value >> padding) & 0xf;
    rgb[0] |= rgb[0] << 4;
    rgb[1] |= rgb[1] << 4;
    rgb[2] |= rgb[2] << 4;
    if (hex.length === 5) {
      // #RGBA format
      alpha = value & 0xf;
      alpha |= alpha << 4;
      rgb[3] = alpha;
    }
    value = rgbToInt(rgb);
  } else {
    // unknown format
    return {};
  }
  return { format: 'hex', value, rgb, alpha };
};

const fromHsl = _hsl => {
  if (!_hsl || _hsl.length < 3 || _hsl.length > 4) {
    return {};
  }
  let rgb;
  const hsl = _hsl;
  let h = hsl[0];
  if (typeof h === 'string') {
    // Handle css unit for hsl
    if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
    else if (h.indexOf('rad') > -1) h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
    else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
    if (h >= 360) h %= 360;
    h = parseFloat(h, 10);
  }
  let s = hsl[1];
  if (typeof s === 'string') s = parseFloat(s.indexOf('%') > -1 ? s.substring(0, s.length - 1) : s, 10);
  let l = hsl[2];
  if (typeof l === 'string') l = parseFloat(l.indexOf('%') > -1 ? l.substring(0, l.length - 1) : l, 10);
  hsl[0] = h;
  hsl[1] = s;
  hsl[2] = l;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(h) || isNaN(s) | isNaN(l)) return {};

  s /= 100;
  l /= 100;
  const c = s * (1 - Math.abs(2 * l - 1));
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  if (s === 0) {
    rgb = [l, l, l];
    m = 0;
  } else if (h >= 0 && h < 60) {
    rgb = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    rgb = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    rgb = [0, c, x];
  } else if (h >= 180 && h < 240) {
    rgb = [0, x, c];
  } else if (h >= 240 && h < 300) {
    rgb = [x, 0, c];
  } else if (h >= 300 && h < 360) {
    rgb = [c, 0, x];
  }
  rgb[0] = Math.round((rgb[0] + m) * 255);
  rgb[1] = Math.round((rgb[1] + m) * 255);
  rgb[2] = Math.round((rgb[2] + m) * 255);
  let alpha = hsl[3];
  if (alpha !== undefined) {
    if (typeof alpha === 'string') {
      alpha =
        alpha.indexOf('%') > -1 ? parseFloat(alpha.substring(0, alpha.length - 1), 10) / 100 : parseFloat(alpha, 10);
    }
    alpha *= 255;
    rgb[3] = alpha;
  }
  const value = rgbToInt(rgb);
  return { format: 'hsl', value, rgb, hsl, alpha };
};

const fromHsv = hsv => {
  if (!hsv || hsv.length < 3 || hsv.length > 4) {
    return {};
  }
  let rgb;
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

  const value = rgbToInt(rgb);
  return { format: 'hsl', value, rgb, hsv };
};

const getHsl = rgb => {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = (cmin + cmax) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    s = Math.round(+(s * 100).toFixed(1));

    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  l = Math.round(l + l * 100);
  const hsl = [h, s, l];
  if (rgb.length === 4) {
    hsl[3] = rgb[3] / 255;
  }
  return hsl;
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

const tupleToArray = value => {
  const tuple = value.substring(value.indexOf('(') + 1, value.indexOf(')'));
  if (tuple.indexOf(',') > -1) {
    return tuple.split(',');
  }
  if (tuple.indexOf(' ') > -1) {
    return tuple.split(' ').filter(e => e.length > 0 && e !== '/');
  }
  return undefined;
};

const colorsFormats = ['plain', 'hex', 'rgb', 'hsl', 'hsv'];

const colorsFunc = [
  value => cssColors[value[0]],
  value => getRgb(value),
  value => fromRgb(value),
  value => fromHsl(value),
  value => fromHsv(value),
];

const colorsCssFunc = [
  value => ({ format: 'plain', value: cssColors[value] }),
  value => fromCssHexa(value),
  value => fromRgb(tupleToArray(value)),
  value => fromHsl(tupleToArray(value)),
];

const colorsCssConditions = [
  value => cssColors[value] !== undefined,
  value => value.startsWith('#'),
  value => value.startsWith('rgb(') || value.startsWith('rgba('),
  value => value.startsWith('hsl(') || value.startsWith('hsla('),
];

const parse = (raw, _format) => {
  const color = { raw };
  let value;
  let alpha;
  let rgb;
  let hsl;
  let format = _format || 'unknown';
  if (raw === 'transparent') {
    value = undefined;
    color.name = raw;
    format = 'plain';
  } else if (typeof raw === 'string') {
    const r = raw.trim().toLocaleLowerCase();
    const index = colorsCssConditions.findIndex(func => func(r));
    if (index > -1) {
      ({ value, format, rgb, hsl, alpha } = colorsCssFunc[index](r));
      if (format === 'plain') color.name = raw;
      // Check if raw is css valid
      if (format) color.css = { backgroundColor: raw };
    }
  } else if (raw && raw.r && raw.g && raw.b) {
    value = fromRgb([raw.r, raw.g, raw.b, raw.a]);
    format = 'rgb';
  } else if (raw && raw.h && raw.s && raw.l) {
    ({ value, rgb, hsl } = fromHsl([raw.r, raw.g, raw.b]));
  } else if (raw && raw.h && raw.s && raw.v) {
    value = fromHsv([raw.r, raw.g, raw.b, raw.a]);
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
    if (raw !== 'transparent') {
      format = 'unknown';
      color.name = 'none';
    }
  }
  color.value = value;
  color.alpha = alpha === undefined ? 1 : alpha;
  color.format = format;
  const hex = getCssHexa(value);
  color.hex = hex;
  rgb = rgb || getRgb(value);
  color.rgb = rgb;
  color.hsv = getHsv(rgb);
  color.hsl = hsl || getHsl(rgb);
  if (!color.css) {
    color.css = { backgroundColor: `#${hex}` };
  }
  if (!color.name) {
    // find color name
    color.name = Object.keys(cssColors).find(n => cssColors[n] === value) || `color-${hex}`;
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
