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

const useStyles = makeStyles(() => ({
  root: {
    width: '24px',
    height: '24px',
    margin: '4px 8px 8px 0px',
    border: '2px solid black',
    borderColor: '#212121',
    cursor: 'pointer',
    borderRadius: '4px',
  },
}));

const ColorPickerBox = ({ color, forwardRef, ...props }) => {
  const classes = useStyles();
  return <div ref={forwardRef} className={classes.root} {...props} style={color.css} />;
};

export default ColorPickerBox;
