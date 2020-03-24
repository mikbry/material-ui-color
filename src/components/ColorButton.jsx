/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import * as ColorTool from '../helpers/colorTool';

const buildButton = (color, size = 24, borderWidth, _borderColor) =>
  withStyles(theme => {
    const style = color.css || { backgroundColor: ColorTool.getCssColor(color) };
    let l = color.hsl[2] - 10;
    if (l < 30) l = color.hsl[2] + 50;
    const a = color.alpha || 0.2;
    const hoverColor = `hsl(${color.hsl[0]}, ${color.hsl[1]}%, ${l}%, ${a})`;
    const light = theme.palette.type === 'light';
    const borderColor = _borderColor || light ? '#767676' : '#767676';
    return {
      root: {
        ...style,
        width: size,
        minWidth: size,
        height: size,
        padding: '0px',
        backgroundColor: style.backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        cursor: 'pointer',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: hoverColor,
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },
    };
  })(Button);

export default ({ color: c, size, borderWidth = 0, forwardRef, className, tooltip, ...props }) => {
  const color = ColorTool.validateColor(c);
  const ColorButton = buildButton(color, size, borderWidth);

  let component = <ColorButton variant="contained" aria-label={color.name || c} className={className} {...props} />;
  if (tooltip) {
    component = <Tooltip title={tooltip}>{component}</Tooltip>;
  }
  return component;
};
