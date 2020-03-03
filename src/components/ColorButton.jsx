/* eslint-disable react/jsx-props-no-spreading */
/**
 * Copyright (c) Mik BRY
 * mik@mikbry.com
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import * as Colors from '../helpers/colors';

const useStyles = makeStyles(theme => {
  const light = theme.palette.type === 'light';
  const borderColor = light ? '#767676' : '#767676';
  return {
    root: {
      width: '16px',
      height: '16px',
      border: `2px solid ${borderColor}`,
      cursor: 'pointer',
      borderRadius: '4px',
    },
  };
});

const ColorButton = ({ color: c, size, borderWidth = null, forwardRef, className, tooltip, ...props }) => {
  const color = typeof c === 'string' ? Colors.parse(c) : c;
  const classes = useStyles();
  let style = color.css;
  if (!style) {
    style = { backgroundColor: c };
  }
  if (size) {
    style.width = `${size}px`;
    style.height = `${size}px`;
  }
  if (borderWidth !== null) {
    style.border = `${borderWidth}px solid`;
  }

  let component = (
    <IconButton color="primary" aria-label={color.value || c} className={className}>
      <span ref={forwardRef} className={classes.root} {...props} style={style} />
    </IconButton>
  );
  if (tooltip) {
    component = <Tooltip title={tooltip}>{component}</Tooltip>;
  }
  return component;
};

export default ColorButton;
