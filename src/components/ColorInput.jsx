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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
    },
  };
});

const ColorInput = ({ defaultValue, type: t, margin, size, forwardRef, className, ...props }) => {
  const color = typeof defaultValue === 'string' ? Colors.parse(defaultValue) : defaultValue;
  const type = t || color.type || 'plain';
  const classes = useStyles();
  let field;
  if (type === 'plain') {
    console.log('color', color);
    field = <TextField defaultValue={color.value} {...props} margin={margin} size={size} />;
  } else {
    const components = Colors.getComponents(color, type);
    const names = Object.keys(components);
    field = (
      <div className={`${className || ''} ${classes.root}`} ref={forwardRef} {...props}>
        {names.map(cn => (
          <FormControl key={cn} className={classes.value}>
            <InputLabel htmlFor={cn}>{components[cn].name}</InputLabel>
            <Input
              id={cn}
              label={components[cn].name}
              defaultValue={components[cn].value}
              margin={margin}
              size={size}
              placeholder={components[cn].name}
              inputProps={{ 'aria-label': 'description' }}
              startAdornment={
                names.length === 1 &&
                components[cn].unit && <InputAdornment position="start">{components[cn].unit}</InputAdornment>
              }
            />
          </FormControl>
        ))}
      </div>
    );
  }
  return field;
};

export default ColorInput;
