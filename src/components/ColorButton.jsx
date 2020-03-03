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

const useStyles = makeStyles(theme => {
  const light = theme.palette.type === 'light';
  const borderColor = light ? '#767676' : '#767676';
  return {
    root: {
      width: '16px',
      height: '16px',
      // margin: '8px 8px 8px 8px',
      border: `2px solid ${borderColor}`,
      cursor: 'pointer',
      borderRadius: '4px',
    },
  };
});

const ColorButton = ({ color, forwardRef, ...props }) => {
  const classes = useStyles();
  return (
    <IconButton color="primary" aria-label={color.value}>
      <span ref={forwardRef} className={classes.root} {...props} style={color.css} />
    </IconButton>
  );
};

export default ColorButton;
