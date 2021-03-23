# `material-ui-color` picker and other components

[![Build Status][action-image]][action-url]
[![codecov][codecov-image]][codecov-url]
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![minisize][min-image]][min-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![peer dependency status][peer-deps-svg]][peer-deps-url]
[![Downloads][downloads-image]][downloads-url]

[action-image]: https://github.com/mikbry/material-ui-color/workflows/Build%20and%20Deploy/badge.svg
[action-url]: https://mikbry.github.io/material-ui-color/
[codecov-image]: https://codecov.io/gh/mikbry/material-ui-color/branch/master/graph/badge.svg?token=K4P0vnM5fh
[codecov-url]: https://codecov.io/gh/mikbry/material-ui-color
[npm-image]: https://img.shields.io/npm/v/material-ui-color.svg
[npm-url]: https://npmjs.org/package/material-ui-color
[license-image]: https://img.shields.io/github/license/mikbry/material-ui-color
[License-url]:https://github.com/mikbry/material-ui-color/blob/master/LICENSE
[min-image]:https://badgen.net/bundlephobia/min/material-ui-color
[min-url]:https://bundlephobia.com/result?p=material-ui-color
[deps-svg]: https://david-dm.org/mikbry/material-ui-color.svg
[deps-url]: https://david-dm.org/mikbry/material-ui-color
[dev-deps-svg]: https://david-dm.org/mikbry/material-ui-color/dev-status.svg
[dev-deps-url]: https://david-dm.org/mikbry/material-ui-color#info=devDependencies
[peer-deps-svg]: https://david-dm.org/mikbry/material-ui-color/peer-status.svg
[peer-deps-url]: https://david-dm.org/mikbry/material-ui-color#info=peerDependencies
[downloads-image]: http://img.shields.io/npm/dm/material-ui-color.svg
[downloads-url]: http://npm-stat.com/charts.html?package=material-ui-color

> Collections of color components for [material-ui](https://github.com/mui-org/material-ui). No dependencies, small, highly customizable and theming support !

![Video of ColorPicker](./images/muicc-v0-2.webp)

## Contents

- [Why another ColorPicker?](#why-another-colorpicker)
- [Documentation](#documentation)
- [Requirements](#requirements)
- [Install](#install)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contribute](#contribute)
- [License](#license)

## Why another ColorPicker ?

- Fully compatible with Material-UI : theming and low level components
- Highly customizable ColorPicker : gradient picker, palette, input format, deferred mode
-  Small in size (<30kb) without any direct dependencies
- Use modern React hook and coding conventions
- Documentation made with Storybook, using Component Story Format and MDX

## Documentation

Full documentation is available here :

https://mikbry.github.io/material-ui-color/

### Examples 

> You can find examples [here](EXAMPLES.md) and [here](/examples).

Also in codesanbox

- Javascript : https://codesandbox.io/s/material-ui-color-qb4vm?file=/src/App.jsx

- Typescript : https://codesandbox.io/s/material-ui-color-picker-qvcg3?file=/src/App.tsx


## Requirements
- Works on modern browsers supporting ES6+ (Not compatible with IE)
- React and Material-UI frameworks

## Install

```bash
yarn add material-ui-color
```

Or using npm
```bash
npm install material-ui-color
```

## Usage

you need to have in your dependencies:

```
    "@material-ui/core": "^4.11.2",
    "material-ui-popup-state": "^1.7.1",
    "prop-types": "^15.7.2",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
```

`material-ui-color` bring 5 components.

### `<ColorPicker/>`

A popover component to display a color tool box. It uses `ColorBox` and `material-ui-popup-state`.

```javascript
import { ColorPicker } from 'material-ui-color';

export const Container = () => (
  <div>
    <ColorPicker defaultValue="transparent"/>
  </div>
);
```

At first it display a button + an input

[ColorPicker documentation](https://mikbry.github.io/material-ui-color/?path=/story/components-colorpicker--basic)

### `<ColorBox />`

A component to display a color tool box
```javascript
import { ColorBox } from 'material-ui-color';

export const Container = () => (
  <div>
    <ColorBox defaultValue="transparent"/>
  </div>
);
```

[ColorBox documentation](https://mikbry.github.io/material-ui-color/?path=/story/components-colorbox--basic)

### `<ColorInput />`

An input component to display/edit color values in different format (plain, hex, rgb, hsl, hsv).

```javascript
import { ColorInput } from 'material-ui-color';

export const Container = () => (
  <div>
    <ColorInput defaultValue="red"/>
  </div>
);
```

[ColorInput documentation](https://mikbry.github.io/material-ui-color/?path=/story/components-colorinput--basic)

### `<ColorPalette />`

A component to display a grid of color buckets.

```javascript
import { ColorPalette } from 'material-ui-color';

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

export const Container = () => (
  <div>
    <ColorPalette palette={palette} />
  </div>
);
```

[ColorPalette documentation](https://mikbry.github.io/material-ui-color/?path=/story/components-colorpalette--basic)

### `<ColorButton />`

Displays a button filled with a color

```javascript
import { ColorButton } from 'material-ui-color';

export const Container = () => (
  <div>
    <ColorButton color="red"/>
  </div>
);
```

[ColorButton documentation](https://mikbry.github.io/material-ui-color/?path=/story/components-colorbutton--basic)

## Roadmap

### v1.0.0 - [Current version](https://github.com/mikbry/material-ui-color/releases/tag/v1.0.0)
- remove `styled-components` to have less dependencies and reduce size
- display wrong color using a red checked box
- bugs fixes

## Contribute

Contributions welcome! Read the [contribution guidelines](CONTRIBUTING.md) first.


## License

Released under MIT License
