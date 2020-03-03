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
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Colors from '../helpers/colors';

const useStyles = makeStyles(() => {
  const size = '140px';
  return {
    root: {
      width: size,
      display: 'flex',
      flexDirection: 'row',
    },
    value: {
      margin: '8px',
      textAlign: 'center',
    },
  };
});

const ColorField = ({ color: c, type: t, margin, size, forwardRef, ...props }) => {
  const color = typeof c === 'string' ? Colors.parse(c) : c;
  const type = t || color.type || 'plain';
  const classes = useStyles();
  let field;
  if (type === 'plain') {
    field = <TextField defaultValue={color.value} {...props} margin={margin} size={size} />;
  } else {
    const components = Colors.getComponents(color, type);
    const names = Object.keys(components);
    field = (
      <div className={classes.root} ref={forwardRef} {...props}>
        {names.map(cn => (
          <Input
            label={components[cn].name}
            className={classes.value}
            defaultValue={components[cn].value}
            margin={margin}
            size={size}
            placeholder={components[cn].name}
            inputProps={{ 'aria-label': 'description', style: { textAlign: 'center' } }}
            startAdornment={
              names.length === 1 &&
              components[cn].unit && <InputAdornment position="start">{components[cn].unit}</InputAdornment>
            }
          />
        ))}
      </div>
    );
  }
  return field;
};

export default ColorField;
